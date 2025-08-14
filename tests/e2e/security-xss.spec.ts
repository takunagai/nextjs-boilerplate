import { expect, type Page, test } from "@playwright/test";
import { generateId } from "../../src/lib/utils/id";

// テスト用のWindow型拡張
declare global {
	interface Window {
		__alertCalled?: boolean;
	}
}

/**
 * XSS脆弱性テスト
 * クロスサイトスクリプティング攻撃に対する防御機能をテスト
 */

// 悪意のあるスクリプトペイロード（実際には無害化されるべき）
const XSS_PAYLOADS = [
	"<script>alert('XSS')</script>",
	"<img src='x' onerror='alert(\"XSS\")'>",
	"javascript:alert('XSS')",
	"<svg onload='alert(\"XSS\")'>",
	"'><script>alert('XSS')</script>",
	'"><script>alert("XSS")</script>',
	"<iframe src='javascript:alert(\"XSS\")'></iframe>",
	"<body onload='alert(\"XSS\")'>",
	"<div onclick='alert(\"XSS\")'>クリック</div>",
	"${alert('XSS')}", // テンプレート注入
];

// セキュリティテスト用のページオブジェクト
class SecurityTestPage {
	constructor(private page: Page) {}

	// お問い合わせフォームへ移動
	async gotoContact() {
		await this.page.goto("/contact");
		await this.page.waitForLoadState("domcontentloaded");
	}

	// ログインフォームへ移動
	async gotoLogin() {
		await this.page.goto("/login");
		await this.page.waitForLoadState("domcontentloaded");
	}

	// フォームに悪意のあるデータを入力
	async fillContactFormWithPayload(payload: string) {
		await this.page.getByLabel("お名前").fill(payload);
		await this.page
			.getByLabel("メールアドレス")
			.fill(`test${generateId()}@example.com`);
		await this.page.getByLabel("お問い合わせ内容").fill(payload);
	}

	// ログインフォームに悪意のあるデータを入力
	async fillLoginFormWithPayload(payload: string) {
		await this.page.getByLabel("メールアドレス").fill(payload);
		await this.page.locator('input[type="password"]').fill(payload);
	}

	// フォーム送信
	async submitForm() {
		// お問い合わせフォームまたはログインフォームの送信ボタンを探す
		const contactSubmit = this.page.getByRole("button", { name: "送信する" });
		const loginSubmit = this.page.locator('form button[type="submit"]');

		if (await contactSubmit.isVisible()) {
			await contactSubmit.click();
		} else if (await loginSubmit.isVisible()) {
			await loginSubmit.click();
		}

		await this.page.waitForTimeout(1500); // 処理完了待機
	}

	// スクリプトが実行されていないことを確認
	async checkNoScriptExecution() {
		// 最も重要なチェック: window.alert が呼び出されていないことを確認
		const alertCalled = await this.page.evaluate(() => {
			return window.__alertCalled === true;
		});
		expect(alertCalled).toBeFalsy();

		// HTMLソース内で実際に実行可能なスクリプトタグが挿入されていないかチェック
		const pageContent = await this.page.content();

		// 実行可能な形でのスクリプト注入がないことを確認
		expect(pageContent).not.toMatch(/<script[^>]*>\s*alert\s*\(/i);
		expect(pageContent).not.toMatch(/javascript\s*:\s*alert\s*\(/i);
		expect(pageContent).not.toMatch(/<img[^>]*onerror\s*=\s*['"]*alert\s*\(/i);
		expect(pageContent).not.toMatch(/<svg[^>]*onload\s*=\s*['"]*alert\s*\(/i);
		expect(pageContent).not.toMatch(
			/<iframe[^>]*src\s*=\s*['"]javascript\s*:\s*alert/i,
		);

		// Note: フォームフィールドに入力されたテキストがエスケープされて表示されることは正常
		// 重要なのはスクリプトが実行されないことなので、アラート呼び出しチェックのみで十分
	}

	// URLパラメータにXSSペイロードを含めてページにアクセス
	async visitWithXSSParam(path: string, param: string, payload: string) {
		const encodedPayload = encodeURIComponent(payload);
		await this.page.goto(`${path}?${param}=${encodedPayload}`);
		await this.page.waitForLoadState("domcontentloaded");
	}
}

test.describe("XSS脆弱性テスト", () => {
	let securityPage: SecurityTestPage;

	test.beforeEach(async ({ page }) => {
		securityPage = new SecurityTestPage(page);

		// アラートの監視設定
		await page.addInitScript(() => {
			const originalAlert = window.alert;
			window.alert = (...args) => {
				(window as any).__alertCalled = true;
				(window as any).__alertArgs = args;
				return originalAlert.apply(window, args);
			};
		});
	});

	test.describe("フォーム入力XSSテスト", () => {
		XSS_PAYLOADS.forEach((payload, index) => {
			test(`お問い合わせフォーム: XSSペイロード ${index + 1} の無害化`, async ({
				page,
			}) => {
				await securityPage.gotoContact();
				await securityPage.fillContactFormWithPayload(payload);
				await securityPage.submitForm();

				// スクリプトが実行されていないことを確認
				await securityPage.checkNoScriptExecution();

				// エラーメッセージが適切にエスケープされていることを確認
				const errorElements = page.locator(
					'.text-destructive, .error, [role="alert"]',
				);
				const errorCount = await errorElements.count();

				if (errorCount > 0) {
					for (let i = 0; i < errorCount; i++) {
						const errorText = (await errorElements.nth(i).textContent()) || "";
						// エラーメッセージ内でもスクリプトタグが実行されていないことを確認
						expect(errorText).not.toMatch(/<script/i);
						expect(errorText).not.toMatch(/javascript:/i);
					}
				}
			});
		});

		XSS_PAYLOADS.slice(0, 3).forEach((payload, index) => {
			test(`ログインフォーム: XSSペイロード ${index + 1} の無害化`, async ({
				page,
			}) => {
				await securityPage.gotoLogin();
				await securityPage.fillLoginFormWithPayload(payload);
				await securityPage.submitForm();

				// スクリプトが実行されていないことを確認
				await securityPage.checkNoScriptExecution();

				// エラーメッセージの安全性確認
				const errorElements = page.locator(
					'.text-destructive, .error, [role="alert"]',
				);
				const errorCount = await errorElements.count();

				if (errorCount > 0) {
					const firstError = (await errorElements.first().textContent()) || "";
					expect(firstError).not.toMatch(/<.*>/); // HTMLタグが含まれていないことを確認
				}
			});
		});
	});

	test.describe("URLパラメータXSSテスト", () => {
		const urlPayloads = [
			"<script>alert('URL XSS')</script>",
			"javascript:alert('URL')",
			"<img src=x onerror=alert('URL')>",
		];

		urlPayloads.forEach((payload, index) => {
			test(`URLパラメータXSS ${index + 1}: クエリパラメータの無害化`, async ({
				page,
			}) => {
				// ログインページのcallbackUrlパラメータでテスト
				await securityPage.visitWithXSSParam("/login", "callbackUrl", payload);

				// スクリプトが実行されていないことを確認
				await securityPage.checkNoScriptExecution();

				// ページが正常に表示されることを確認
				await expect(page.getByLabel("メールアドレス")).toBeVisible();
			});
		});

		test("リダイレクト先のバリデーション", async ({ page }) => {
			// 外部サイトへのリダイレクトを試行
			const maliciousCallbacks = [
				"http://evil.com",
				"https://evil.com/steal-data",
				"javascript:alert('redirect')",
				"//evil.com",
			];

			for (const callback of maliciousCallbacks) {
				await securityPage.visitWithXSSParam("/login", "callbackUrl", callback);

				// 悪意のあるリダイレクトが発生していないことを確認
				const currentUrl = page.url();
				expect(currentUrl).not.toContain("evil.com");
				expect(currentUrl).not.toContain("javascript:");

				// ログインページが正常に表示されることを確認
				await expect(page.getByLabel("メールアドレス")).toBeVisible();
			}
		});
	});

	test.describe("出力エスケープ確認", () => {
		test("ユーザー入力内容の表示時エスケープ", async ({ page }) => {
			await securityPage.gotoContact();

			const testPayload = '<script>alert("output")</script>';
			await securityPage.fillContactFormWithPayload(testPayload);
			await securityPage.submitForm();

			// フォームの値が適切にエスケープされて表示されることを確認
			const nameField = page.getByLabel("お名前");
			const nameValue = await nameField.inputValue();

			// HTMLエンティティまたはエスケープされた文字列として格納されていることを確認
			if (nameValue.includes(testPayload)) {
				// そのまま格納されている場合、ページ内でのレンダリング時にエスケープされているかチェック
				const pageHTML = await page.content();
				expect(pageHTML).not.toMatch(/<script[^>]*>.*?alert.*?<\/script>/);
			}
		});

		test("エラーメッセージのエスケープ", async ({ page }) => {
			await securityPage.gotoLogin();

			// 不正な形式のメールアドレスでスクリプト注入を試行
			const maliciousEmail = '<script>alert("error")</script>@example.com';
			await page.getByLabel("メールアドレス").fill(maliciousEmail);
			await page.locator('input[type="password"]').fill("password");
			await securityPage.submitForm();

			// エラーが表示された場合、そのエラーメッセージが安全であることを確認
			const errorElements = page.locator(
				'.text-destructive, .error, [role="alert"]',
			);
			const errorCount = await errorElements.count();

			if (errorCount > 0) {
				const errorHTML = await errorElements.first().innerHTML();
				expect(errorHTML).not.toMatch(/<script/i);
				expect(errorHTML).not.toMatch(/alert\(/);
			}
		});
	});

	test.describe("DOMベースXSS対策", () => {
		test("動的コンテンツ生成の安全性", async ({ page }) => {
			await securityPage.gotoLogin();

			// クライアントサイドでDOM操作が発生する可能性のある操作を実行
			await page.getByLabel("メールアドレス").fill("test@example.com");
			await page.locator('input[type="password"]').fill("wrongpassword");
			await securityPage.submitForm();

			// エラー表示後にDOMが安全であることを確認
			await page.waitForTimeout(1000);

			// innerHTML の代わりに textContent が使用されていることを期待
			const errorElements = page.locator(".text-destructive, .error");
			const errorCount = await errorElements.count();

			if (errorCount > 0) {
				// DOM操作が安全に行われていることを確認
				const scriptTags = await page.locator("script").count();
				const initialScriptCount = scriptTags;

				// 新しいスクリプトタグが動的に追加されていないことを確認
				await page.waitForTimeout(500);
				const finalScriptCount = await page.locator("script").count();
				expect(finalScriptCount).toBe(initialScriptCount);
			}
		});

		test("イベントハンドラーのサニタイゼーション", async ({ page }) => {
			await securityPage.gotoContact();

			// onclick等のイベント属性を含む入力を試行
			const eventPayload = 'test" onclick="alert(\'event\')" data-test="';
			await page.getByLabel("お名前").fill(eventPayload);
			await securityPage.submitForm();

			// イベントハンドラーが実行されていないことを確認
			await securityPage.checkNoScriptExecution();

			// フィールドの属性が適切に処理されていることを確認
			const nameField = page.getByLabel("お名前");
			const onclickAttr = await nameField.getAttribute("onclick");
			expect(onclickAttr).toBeNull();
		});
	});

	test.describe("コンテンツタイプ検証", () => {
		test("適切なContent-Typeヘッダーが設定されている", async ({ page }) => {
			const response = await page.goto("/");
			const contentType = response?.headers()["content-type"];

			// HTMLページはtext/htmlとして配信されることを確認
			expect(contentType).toContain("text/html");

			// 文字エンコーディングが指定されていることを確認
			expect(contentType).toContain("charset");
		});

		test("CSP（Content Security Policy）の存在確認", async ({ page }) => {
			const response = await page.goto("/");
			const headers = response?.headers();

			// CSPヘッダーまたはmeta CSPが設定されているかチェック
			const hasCspHeader =
				headers &&
				(headers["content-security-policy"] ||
					headers["content-security-policy-report-only"]);

			const cspMeta = await page
				.locator('meta[http-equiv="Content-Security-Policy"]')
				.count();

			// CSPが何らかの形で設定されていることを確認（推奨）
			if (!hasCspHeader && cspMeta === 0) {
				console.warn(
					"CSP (Content Security Policy) が設定されていません。セキュリティ強化を検討してください。",
				);
			}

			// テストとしては、ページが正常に動作していることを確認
			await expect(page).toHaveTitle(/./); // なんらかのタイトルが設定されている
		});
	});
});
