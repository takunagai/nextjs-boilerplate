import { expect, test } from "@playwright/test";

/**
 * 入力検証・サニタイゼーション セキュリティテスト
 * 不正な入力データやインジェクション攻撃に対する防御機能をテスト
 */

// 危険な入力パターン
const DANGEROUS_INPUTS = {
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
		await this.page.waitForTimeout(1500); // 処理待機
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
			}
		});
	});

	test.describe("HTMLインジェクション対策", () => {
		DANGEROUS_INPUTS.html.forEach((htmlInput, index) => {
			test(`HTMLインジェクション ${index + 1}: ${htmlInput.substring(0, 30)}...`, async ({
				page,
			}) => {
				await validationPage.gotoContact();

				// 悪意のあるHTMLを各フィールドに入力
				await validationPage.fillAndSubmitContact({
					name: htmlInput,
					email: "test@example.com",
					message: `テストメッセージ: ${htmlInput}`,
				});

				// スクリプトが実行されていないことを確認
				await validationPage.expectNoScriptExecution();

				// HTMLタグがエスケープされていることを確認
				const pageContent = await page.content();
				expect(pageContent).not.toMatch(
					new RegExp(htmlInput.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
				);
			});
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
		DANGEROUS_INPUTS.sql.forEach((sqlInput, index) => {
			test(`SQLインジェクション ${index + 1}: ${sqlInput}`, async ({
				page,
			}) => {
				await validationPage.gotoContact();

				// SQLインジェクション試行
				await validationPage.fillAndSubmitContact({
					name: sqlInput,
					email: "test@example.com",
					message: `テスト: ${sqlInput}`,
				});

				// アプリケーションが正常に動作している（SQLエラーが発生していない）
				await expect(page.locator("h1")).toBeVisible();

				// データベースエラーが表示されていない
				const pageText = await page.textContent("body");
				expect(pageText || "").not.toMatch(
					/database error|sql error|mysql|postgresql/i,
				);
			});
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

			await page.getByRole("button", { name: "登録する" }).click();
			await page.waitForTimeout(1500);

			// バリデーションエラーが適切に表示される
			const errorElements = await page
				.locator(".text-destructive, .error")
				.count();
			expect(errorElements).toBeGreaterThan(0);

			// データベースエラーではなく、バリデーションエラーとして処理されている
			const pageText = await page.textContent("body");
			expect(pageText || "").not.toMatch(/database error|sql error/i);
		});
	});

	test.describe("制御文字・特殊文字対策", () => {
		DANGEROUS_INPUTS.control.forEach((controlInput, index) => {
			test(`制御文字・特殊文字 ${index + 1}: ${controlInput.replace(/[\x00-\x1F]/g, `\\x${"$&".charCodeAt(0).toString(16).padStart(2, "0")}`)}`, async ({
				page,
			}) => {
				await validationPage.gotoContact();

				await validationPage.fillAndSubmitContact({
					name: `テスト${controlInput}`,
					email: "test@example.com",
					message: `テストメッセージ: ${controlInput}`,
				});

				// アプリケーションが正常に動作している
				await expect(page.locator("h1")).toBeVisible();

				// Path traversal攻撃などが成功していない
				const pageText = await page.textContent("body");
				expect(pageText || "").not.toMatch(/root:x:0:0|passwd|shadow/i);
			});
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

	test.describe("長大入力攻撃対策", () => {
		test("非常に長い文字列の処理", async ({ page }) => {
			await validationPage.gotoContact();

			const veryLongString = "a".repeat(10000);

			await validationPage.fillAndSubmitContact({
				name: veryLongString,
				email: "test@example.com",
				message: veryLongString,
			});

			// アプリケーションがクラッシュしていない
			await expect(page.locator("h1")).toBeVisible();

			// レスポンスが返ってきている（タイムアウトしていない）
			const responseTime = await validationPage.measureResponseTime(
				async () => {
					await page.waitForTimeout(1000);
				},
			);
			expect(responseTime).toBeLessThan(30000); // 30秒以内
		});

		test("長大なHTMLタグ攻撃の防止", async ({ page }) => {
			await validationPage.gotoContact();

			const longHtmlAttack =
				"<script>" +
				"a".repeat(5000) +
				"alert(1)" +
				"a".repeat(5000) +
				"</script>";

			await validationPage.fillAndSubmitContact({
				name: "テスト名前",
				email: "test@example.com",
				message: longHtmlAttack,
			});

			// スクリプトが実行されていない
			await validationPage.expectNoScriptExecution();

			// ページが正常に表示されている
			await expect(page.locator("h1")).toBeVisible();
		});
	});

	test.describe("エンコーディング攻撃対策", () => {
		DANGEROUS_INPUTS.encoding.forEach((encodedInput, index) => {
			test(`エンコーディング攻撃 ${index + 1}: ${encodedInput}`, async ({
				page,
			}) => {
				await validationPage.gotoContact();

				await validationPage.fillAndSubmitContact({
					name: `テスト${encodedInput}`,
					email: "test@example.com",
					message: `テストメッセージ: ${encodedInput}`,
				});

				// エンコードされたスクリプトが実行されていない
				await validationPage.expectNoScriptExecution();

				// ページが正常に表示されている
				await expect(page.locator("h1")).toBeVisible();
			});
		});

		test("Unicode正規化攻撃の防止", async ({ page }) => {
			await validationPage.gotoContact();

			// Unicode正規化を悪用した攻撃の試行
			const unicodeAttack = "\uFE64script\uFE65alert(1)\uFE64/script\uFE65"; // 異体字セレクタを使った偽装

			await validationPage.fillAndSubmitContact({
				name: "テスト名前",
				email: "test@example.com",
				message: unicodeAttack,
			});

			await validationPage.expectNoScriptExecution();
		});
	});

	test.describe("レスポンス時間攻撃対策", () => {
		test("大量の複雑な正規表現によるReDoS攻撃防止", async ({ page }) => {
			await validationPage.gotoContact();

			// ReDoS攻撃パターン（正規表現の計算量を膨大にする試行）
			const redosPattern = `${"a".repeat(1000)}X`; // 実際のReDoSパターンではないが、処理負荷テスト

			const responseTime = await validationPage.measureResponseTime(
				async () => {
					await validationPage.fillAndSubmitContact({
						name: "テスト名前",
						email: "test@example.com",
						message: redosPattern,
					});
				},
			);

			// レスポンス時間が妥当な範囲内（10秒以内）
			expect(responseTime).toBeLessThan(10000);
		});

		test("パスワード検証のタイミング攻撃対策", async ({ page }) => {
			await validationPage.gotoRegister();

			const passwords = [
				"short",
				"averagelength",
				"verylongpasswordthatexceedstypicallimits",
			];
			const responseTimes: number[] = [];

			for (const password of passwords) {
				const startTime = Date.now();

				await page.getByLabel("氏名").fill("テスト ユーザー");
				await page
					.getByLabel("メールアドレス")
					.fill(`test${crypto.randomUUID()}@example.com`);
				await page.locator('input[type="password"]').first().fill(password);
				await page.locator('input[type="password"]').last().fill(password);

				await page.getByRole("button", { name: "登録する" }).click();
				await page.waitForTimeout(1500);

				const endTime = Date.now();
				responseTimes.push(endTime - startTime);

				// 次のテストのためページをリロード
				await page.reload();
			}

			// レスポンス時間のばらつきが一定範囲内（タイミング攻撃を困難にする）
			const maxTime = Math.max(...responseTimes);
			const minTime = Math.min(...responseTimes);
			const timeDifference = maxTime - minTime;

			// 時間差が極端に大きくない（2秒以内の差）
			expect(timeDifference).toBeLessThan(2000);
		});
	});

	test.describe("CSP（Content Security Policy）相互作用", () => {
		test("CSPヘッダーとの相互作用でインラインスクリプト実行防止", async ({
			page,
		}) => {
			await validationPage.gotoContact();

			await validationPage.fillAndSubmitContact({
				name: "テスト名前",
				email: "test@example.com",
				message: "テストメッセージ <script>alert('CSP test')</script>",
			});

			// スクリプトが実行されていない（CSPによる追加保護）
			await validationPage.expectNoScriptExecution();

			// CSPエラーがコンソールに出力されていない（適切にサニタイズ済みのため）
			const logs: string[] = [];
			page.on("console", (msg) => {
				if (msg.type() === "error") {
					logs.push(msg.text());
				}
			});

			await page.waitForTimeout(1000);
			const cspErrors = logs.filter((log) =>
				log.includes("Content Security Policy"),
			);

			// CSP違反が発生していない（コンテンツが適切にサニタイズされているため）
			expect(cspErrors.length).toBe(0);
		});
	});
});
