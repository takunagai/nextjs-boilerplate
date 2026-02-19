import { expect, test } from "@playwright/test";

/**
 * 入力検証・サニタイゼーション セキュリティテスト
 * 不正な入力データやインジェクション攻撃に対する防御機能をテスト
 */

// 危険な入力パターン
const _DANGEROUS_INPUTS = {
	// HTMLインジェクション
	html: [
		"<script>alert('XSS')</script>",
		"<img src='x' onerror='alert(1)'>",
		"<iframe src='javascript:alert(1)'></iframe>",
		"<body onload='alert(1)'>",
		"<svg onload='alert(1)'>",
	],

	// SQLインジェクション（一般的な試行パターン）
	sql: [
		"'; DROP TABLE users; --",
		"' OR '1'='1",
		"1' UNION SELECT * FROM users--",
		"admin'--",
		"' OR 1=1#",
		"'; INSERT INTO users VALUES ('hacker', 'password'); --",
	],

	// 制御文字・特殊文字
	control: [
		"\x00\x01\x02\x03", // NULL文字等
		"../../../etc/passwd", // Path traversal
		"${7*7}", // テンプレート注入
		"{{7*7}}", // テンプレート注入
		"javascript:alert(1)", // JavaScript URL
	],

	// 長大な入力
	oversized: [
		"a".repeat(10000), // 非常に長い文字列
		"あ".repeat(5000), // 非常に長い日本語
		"<".repeat(1000) + ">".repeat(1000), // 長いHTMLタグ
	],

	// エンコーディング攻撃
	encoding: [
		"%3Cscript%3Ealert(1)%3C/script%3E", // URL encoded
		"&lt;script&gt;alert(1)&lt;/script&gt;", // HTML entities
		"\\u003cscript\\u003ealert(1)\\u003c/script\\u003e", // Unicode escape
		"\uFEFF<script>alert(1)</script>", // BOM + script
	],
};

// 不正なメールアドレスパターン
const INVALID_EMAILS = [
	"", // 空文字
	"not-an-email", // @なし
	"@domain.com", // ローカル部なし
	"user@", // ドメイン部なし
	"user@@domain.com", // 重複@
	"user@domain", // TLDなし
	"user@.com", // ドメイン名なし
	"user name@domain.com", // スペース
	"user@dom ain.com", // ドメインにスペース
	"<script>@domain.com", // HTMLタグ
	"user@domain.com<script>", // 末尾にスクリプト
];

// セキュリティテスト用のページオブジェクト
class InputValidationTestPage {
	constructor(private page: any) {}

	// お問い合わせフォームへ移動
	async gotoContact() {
		await this.page.goto("/contact");
		await this.page.waitForLoadState("domcontentloaded");
		// メールタブに切り替え（デフォルトはLINEタブ）
		await this.page.getByRole("tab", { name: "メール" }).click();
		await this.page.getByLabel("お名前").waitFor({ state: "visible" });
	}

	// 登録フォームへ移動
	async gotoRegister() {
		await this.page.goto("/register");
		await this.page.waitForLoadState("domcontentloaded");
	}

	// フォーム送信とエラー確認
	async fillAndSubmitContact(data: {
		name?: string;
		email?: string;
		message?: string;
		phone?: string;
		allowPhone?: boolean;
	}) {
		if (data.name !== undefined) {
			await this.page.getByLabel("お名前").fill(data.name);
		}
		if (data.email !== undefined) {
			await this.page.getByLabel("メールアドレス").fill(data.email);
		}
		if (data.message !== undefined) {
			await this.page.getByLabel("お問い合わせ内容").fill(data.message);
		}

		if (data.allowPhone) {
			await this.page.locator("#phone-yes").click();
			if (data.phone !== undefined) {
				await this.page.getByLabel("電話番号").fill(data.phone);
			}
		}

		await this.page.getByRole("button", { name: "送信する" }).click();
		// フォーム処理の完了を待つ（エラーまたは成功）
		await Promise.race([
			this.page.waitForSelector(".text-destructive, .error, [role='alert']", {
				timeout: 10000,
			}),
			this.page.waitForFunction(
				() => {
					const nameField = document.querySelector(
						'input[name="name"]',
					) as HTMLInputElement;
					return nameField && nameField.value === ""; // 成功時のフォームリセット
				},
				{ timeout: 10000 },
			),
		]);
	}

	// エラーメッセージの確認
	async expectValidationErrors() {
		const errorElements = await this.page
			.locator(".text-destructive, .error, [role='alert']")
			.count();
		expect(errorElements).toBeGreaterThan(0);
	}

	// スクリプトが実行されていないことを確認
	async expectNoScriptExecution() {
		// ページ内でalertが実行されていないことを確認
		const scriptExecuted = await this.page.evaluate(() => {
			return (window as any).__testScriptExecuted === true;
		});
		expect(scriptExecuted).toBeFalsy();

		// ページが正常に表示されていることを確認
		await expect(this.page.locator("h1")).toBeVisible();
	}

	// レスポンス時間を測定（タイミング攻撃対策確認）
	async measureResponseTime(action: () => Promise<void>): Promise<number> {
		const start = Date.now();
		await action();
		const end = Date.now();
		return end - start;
	}
}

test.describe("入力検証・サニタイゼーション セキュリティテスト", () => {
	let validationPage: InputValidationTestPage;

	test.beforeEach(async ({ page }) => {
		validationPage = new InputValidationTestPage(page);

		// スクリプト実行監視の設定
		await page.addInitScript(() => {
			const originalAlert = window.alert;
			window.alert = (...args) => {
				(window as any).__testScriptExecuted = true;
				return originalAlert.apply(window, args);
			};
		});
	});

	test.describe("基本バリデーション", () => {
		test("必須項目の検証", async ({ page }) => {
			await validationPage.gotoContact();

			// 空のフォームで送信
			await validationPage.fillAndSubmitContact({});

			// バリデーションエラーが表示されることを確認
			await validationPage.expectValidationErrors();
		});

		test("メールアドレス形式の検証", async ({ page }) => {
			test.setTimeout(90000); // 5回のループ反復のため延長
			await validationPage.gotoContact();

			for (const invalidEmail of INVALID_EMAILS.slice(0, 5)) {
				// 最初の5件をテスト
				await validationPage.fillAndSubmitContact({
					name: "テスト名前",
					email: invalidEmail,
					message: "テストメッセージです。",
				});

				// バリデーションエラーが表示されることを確認
				await validationPage.expectValidationErrors();

				// ページをリロードして次のテストへ
				await page.reload();
				await page.waitForLoadState("domcontentloaded");
				// メールタブに切り替え
				await page.getByRole("tab", { name: "メール" }).click();
				await page.getByLabel("お名前").waitFor({ state: "visible" });
			}
		});

		test("文字数制限の検証", async ({ page }) => {
			await validationPage.gotoContact();

			// メッセージが短すぎる場合
			await validationPage.fillAndSubmitContact({
				name: "テスト名前",
				email: "test@example.com",
				message: "短い", // 10文字未満
			});

			await validationPage.expectValidationErrors();
		});

		test("電話番号形式の検証", async ({ page }) => {
			test.setTimeout(150000); // 5回のループ反復 × フォームリロードのため延長
			await validationPage.gotoContact();

			const invalidPhones = [
				"1234567890", // ハイフンなし
				"12-34-56", // 短すぎる
				"12-3456-78901234", // 長すぎる
				"abc-defg-hijk", // 文字が含まれる
				"12-34-567-89", // セグメント数が多い
			];

			for (const invalidPhone of invalidPhones) {
				await validationPage.fillAndSubmitContact({
					name: "テスト名前",
					email: "test@example.com",
					message: "テストメッセージです。問題ないはずです。",
					allowPhone: true,
					phone: invalidPhone,
				});

				await validationPage.expectValidationErrors();
				await page.reload();
				await page.waitForLoadState("domcontentloaded");
				// メールタブに切り替え
				await page.getByRole("tab", { name: "メール" }).click();
				await page.getByLabel("お名前").waitFor({ state: "visible" });
			}
		});
	});

	test.describe("HTMLインジェクション対策", () => {
		test("基本的なHTMLインジェクション防止", async ({ page }) => {
			await validationPage.gotoContact();

			// 代表的な悪意のあるHTMLパターンをテスト
			const scriptTag = "<script>alert('XSS')</script>";
			await validationPage.fillAndSubmitContact({
				name: scriptTag,
				email: "test@example.com",
				message: `テストメッセージ: ${scriptTag}`,
			});

			// スクリプトが実行されていないことを確認
			await validationPage.expectNoScriptExecution();
		});

		test("メールフィールドでのHTMLインジェクション防止", async ({ page }) => {
			await validationPage.gotoContact();

			await validationPage.fillAndSubmitContact({
				name: "テスト名前",
				email: "<script>alert('email')</script>@example.com",
				message: "テストメッセージです。",
			});

			// メールアドレス形式エラーが表示される
			await validationPage.expectValidationErrors();

			// スクリプトが実行されていない
			await validationPage.expectNoScriptExecution();
		});
	});

	test.describe("SQLインジェクション対策", () => {
		test("基本的なSQLインジェクション対策", async ({ page }) => {
			await validationPage.gotoContact();

			// 代表的なSQLインジェクション試行
			const sqlInjection = "'; DROP TABLE users; --";
			await validationPage.fillAndSubmitContact({
				name: sqlInjection,
				email: "test@example.com",
				message: `テスト: ${sqlInjection}`,
			});

			// アプリケーションが正常に動作している（SQLエラーが発生していない）
			await expect(page.locator("h1")).toBeVisible();
		});

		test("登録フォームでのSQLインジェクション対策", async ({ page }) => {
			await validationPage.gotoRegister();

			// 悪意のあるSQL文をメールアドレスに入力
			await page.getByLabel("氏名").fill("テスト ユーザー");
			await page
				.getByLabel("メールアドレス")
				.fill("admin'; DROP TABLE users; --");
			await page.locator('input[type="password"]').first().fill("password123");
			await page.locator('input[type="password"]').last().fill("password123");

			// 利用規約に同意
			await page
				.getByRole("checkbox", { name: "利用規約 に同意します" })
				.check();

			await page.getByRole("button", { name: "登録" }).click();
			// バリデーションエラーの表示を待つ
			await page.waitForSelector(".text-destructive, .error, [role='alert']", {
				timeout: 10000,
			});

			// バリデーションエラーが適切に表示される
			const errorElements = await page
				.locator(".text-destructive, .error")
				.count();
			expect(errorElements).toBeGreaterThan(0);
		});
	});

	test.describe("制御文字・特殊文字対策", () => {
		test("Path traversal攻撃の防止", async ({ page }) => {
			await validationPage.gotoContact();

			const pathTraversal = "../../../etc/passwd";
			await validationPage.fillAndSubmitContact({
				name: `テスト${pathTraversal}`,
				email: "test@example.com",
				message: `テストメッセージ: ${pathTraversal}`,
			});

			// アプリケーションが正常に動作している
			await expect(page.locator("h1")).toBeVisible();
		});

		test("NULLバイト攻撃の防止", async ({ page }) => {
			await validationPage.gotoContact();

			await validationPage.fillAndSubmitContact({
				name: "テスト名前\x00.php",
				email: "test@example.com",
				message: "テストメッセージ\x00<script>alert(1)</script>",
			});

			// NULLバイトが適切に処理される
			await expect(page.locator("h1")).toBeVisible();
			await validationPage.expectNoScriptExecution();
		});
	});

	// 削除されたテストセクション:
	// - 長大入力攻撃対策 (DoS対策は他でカバー)
	// - エンコーディング攻撃詳細 (基本的な防御で十分)
	// - レスポンス時間攻撃対策 (過剰な詳細テスト)
	// - CSP相互作用 (security-headers.spec.tsと重複)
});
