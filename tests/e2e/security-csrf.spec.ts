import { expect, test } from "@playwright/test";

/**
 * CSRF（Cross-Site Request Forgery）脆弱性テスト
 * クロスサイトリクエストフォージェリ攻撃に対する防御機能をテスト
 */

// CSRFテスト用のページオブジェクト
class CsrfTestPage {
	constructor(private page: any) {}

	// CSRFトークンを取得
	async getCsrfToken(): Promise<{ token: string; cookies: any }> {
		const response = await this.page.request.get("/api/csrf-token");
		const body = await response.json();
		const cookies = await this.page.context().cookies();

		return {
			token: body.csrfToken,
			cookies,
		};
	}

	// 登録フォームへ移動
	async gotoRegister() {
		await this.page.goto("/register");
		await this.page.waitForLoadState("domcontentloaded");
	}

	// APIエンドポイントに直接リクエスト送信
	async postToRegisterApi(
		data: any,
		options: {
			csrfToken?: string;
			origin?: string;
			referer?: string;
			cookies?: any;
		} = {},
	) {
		const headers: Record<string, string> = {
			"Content-Type": "application/json",
		};

		// CSRFトークンヘッダー設定
		if (options.csrfToken) {
			headers["x-csrf-token"] = options.csrfToken;
		}

		// Originヘッダー設定
		if (options.origin) {
			headers.origin = options.origin;
		}

		// Refererヘッダー設定
		if (options.referer) {
			headers.referer = options.referer;
		}

		// コンテキストを作成（Cookieを含める場合）
		let requestContext = this.page.request;
		if (options.cookies) {
			requestContext = await this.page.context().request;
		}

		return await requestContext.post("/api/auth/register", {
			data: JSON.stringify(data),
			headers,
		});
	}

	// ホスト名を取得
	getHost(): string {
		const url = new URL(this.page.url());
		return url.host;
	}

	// オリジンを取得
	getOrigin(): string {
		const url = new URL(this.page.url());
		return url.origin;
	}
}

test.describe("CSRF脆弱性テスト", () => {
	let csrfPage: CsrfTestPage;

	test.beforeEach(async ({ page }) => {
		csrfPage = new CsrfTestPage(page);
		await csrfPage.gotoRegister(); // ページを読み込んでOriginを確定
	});

	test.describe("CSRFトークンエンドポイント", () => {
		test("CSRFトークンが正常に生成される", async ({ page }) => {
			const tokenData = await csrfPage.getCsrfToken();

			// トークンが存在することを確認
			expect(tokenData.token).toBeTruthy();
			expect(typeof tokenData.token).toBe("string");
			expect(tokenData.token.length).toBeGreaterThan(10);

			// CSRFクッキーが設定されることを確認
			const csrfCookie = tokenData.cookies.find(
				(c: any) => c.name === "__csrf_token",
			);
			expect(csrfCookie).toBeTruthy();
			expect(csrfCookie.httpOnly).toBe(true);
			expect(csrfCookie.sameSite).toBe("Strict");
		});

		test("CSRFトークンは毎回異なる値が生成される", async ({ page }) => {
			const token1 = await csrfPage.getCsrfToken();
			const token2 = await csrfPage.getCsrfToken();

			// 異なるトークンが生成されることを確認
			expect(token1.token).not.toBe(token2.token);
		});
	});

	test.describe("CSRF保護（トークンベース）", () => {
		const validUserData = {
			name: "テスト ユーザー",
			email: "test.csrf@example.com",
			password: "password123",
		};

		test("CSRFトークンなしでのAPI呼び出しが拒否される", async ({ page }) => {
			const response = await csrfPage.postToRegisterApi(validUserData, {
				origin: csrfPage.getOrigin(),
			});

			expect(response.status()).toBe(403);

			const body = await response.json();
			expect(body.success).toBe(false);
			expect(body.error.code).toBe("CSRF_VALIDATION_FAILED");
			expect(body.error.message).toContain("CSRF");
		});

		test("無効なCSRFトークンでのAPI呼び出しが拒否される", async ({ page }) => {
			const response = await csrfPage.postToRegisterApi(validUserData, {
				csrfToken: "invalid-csrf-token-12345",
				origin: csrfPage.getOrigin(),
			});

			expect(response.status()).toBe(403);

			const body = await response.json();
			expect(body.success).toBe(false);
			expect(body.error.code).toBe("CSRF_VALIDATION_FAILED");
		});

		test("正しいCSRFトークンでのAPI呼び出しが成功する", async ({ page }) => {
			// 有効なCSRFトークンを取得
			const tokenData = await csrfPage.getCsrfToken();

			const response = await csrfPage.postToRegisterApi(validUserData, {
				csrfToken: tokenData.token,
				origin: csrfPage.getOrigin(),
				cookies: tokenData.cookies,
			});

			// この場合、CSRFは通過し、実際の登録処理のバリデーション結果を確認
			// (ユーザーが既に存在する場合など、別の理由で失敗する可能性あり)
			expect([200, 201, 400, 409]).toContain(response.status());

			// 403 (CSRF error) でなければ成功
			expect(response.status()).not.toBe(403);
		});
	});

	test.describe("CSRF保護（Originヘッダーベース）", () => {
		test("不正なOriginヘッダーでのリクエストが拒否される", async ({ page }) => {
			const tokenData = await csrfPage.getCsrfToken();

			const response = await csrfPage.postToRegisterApi(
				{
					name: "Test User",
					email: "test@example.com",
					password: "password123",
				},
				{
					csrfToken: tokenData.token,
					origin: "https://evil.com", // 不正なOrigin
					cookies: tokenData.cookies,
				},
			);

			expect(response.status()).toBe(403);

			const body = await response.json();
			expect(body.success).toBe(false);
			expect(body.error.message).toContain("CSRF");
		});

		test("Originヘッダーなしでのリクエストが拒否される", async ({ page }) => {
			const tokenData = await csrfPage.getCsrfToken();

			const response = await csrfPage.postToRegisterApi(
				{
					name: "Test User",
					email: "test@example.com",
					password: "password123",
				},
				{
					csrfToken: tokenData.token,
					// origin: 省略（Originヘッダーなし）
					cookies: tokenData.cookies,
				},
			);

			expect(response.status()).toBe(403);
		});
	});

	test.describe("CSRF保護の境界値テスト", () => {
		test("期限切れCSRFトークンが拒否される", async ({ page }) => {
			// 期限切れトークンのシミュレーション（手動生成）
			const expiredToken = "a".repeat(64); // 偽の期限切れトークン

			const response = await csrfPage.postToRegisterApi(
				{
					name: "Test User",
					email: "test@example.com",
					password: "password123",
				},
				{
					csrfToken: expiredToken,
					origin: csrfPage.getOrigin(),
				},
			);

			expect(response.status()).toBe(403);
		});

		test("空のCSRFトークンが拒否される", async ({ page }) => {
			const response = await csrfPage.postToRegisterApi(
				{
					name: "Test User",
					email: "test@example.com",
					password: "password123",
				},
				{
					csrfToken: "", // 空のトークン
					origin: csrfPage.getOrigin(),
				},
			);

			expect(response.status()).toBe(403);
		});

		test("異常に長いCSRFトークンが適切に処理される", async ({ page }) => {
			const longToken = "a".repeat(10000); // 異常に長いトークン

			const response = await csrfPage.postToRegisterApi(
				{
					name: "Test User",
					email: "test@example.com",
					password: "password123",
				},
				{
					csrfToken: longToken,
					origin: csrfPage.getOrigin(),
				},
			);

			expect(response.status()).toBe(403);
		});
	});

	test.describe("HTTPメソッド別CSRF保護", () => {
		test("GETリクエストはCSRF保護をスキップする", async ({ page }) => {
			// GETリクエストはCSRF検証をスキップするべき
			const response = await page.request.get("/api/csrf-token");

			// GETリクエストは成功する（CSRFトークンなしでも）
			expect(response.status()).toBe(200);
		});

		test("POSTリクエストはCSRF保護が必要", async ({ page }) => {
			// すでに他のテストで確認済みだが、明示的にテスト
			const response = await csrfPage.postToRegisterApi({
				name: "Test User",
				email: "test@example.com",
				password: "password123",
			}); // CSRFトークンなし

			expect(response.status()).toBe(403);
		});
	});

	test.describe("セキュリティヘッダー検証", () => {
		test("適切なセキュリティヘッダーが設定されている", async ({ page }) => {
			const response = await page.goto("/");
			const headers = response?.headers();

			// セキュリティヘッダーの確認
			expect(headers?.["x-content-type-options"]).toBe("nosniff");
			expect(headers?.["x-frame-options"]).toBe("DENY");
			expect(headers?.["x-xss-protection"]).toBe("1; mode=block");
		});

		test("CSRFトークンクッキーが適切な設定である", async ({ page }) => {
			const tokenData = await csrfPage.getCsrfToken();
			const csrfCookie = tokenData.cookies.find(
				(c: any) => c.name === "__csrf_token",
			);

			// セキュアクッキーの設定確認
			expect(csrfCookie.httpOnly).toBe(true);
			expect(csrfCookie.sameSite).toBe("Strict");
			expect(csrfCookie.path).toBe("/");

			// 開発環境ではsecureがfalse、本番環境ではtrue
			// この判定は環境によって異なるため、存在だけを確認
			expect(typeof csrfCookie.secure).toBe("boolean");
		});
	});

	test.describe("レート制限とCSRF", () => {
		test("短時間での大量リクエストがレート制限される", async ({ page }) => {
			const tokenData = await csrfPage.getCsrfToken();

			// 短時間で複数のリクエストを送信
			const promises = Array(25)
				.fill(null)
				.map(async (_, i) => {
					return csrfPage.postToRegisterApi(
						{
							name: `Test User ${i}`,
							email: `test${i}@example.com`,
							password: "password123",
						},
						{
							csrfToken: tokenData.token,
							origin: csrfPage.getOrigin(),
							cookies: tokenData.cookies,
						},
					);
				});

			const responses = await Promise.all(promises);

			// 一部のリクエストがレート制限（429）で拒否されることを確認
			const rateLimited = responses.filter((r) => r.status() === 429);
			expect(rateLimited.length).toBeGreaterThan(0);

			// レート制限エラーのレスポンスを確認
			if (rateLimited.length > 0) {
				const errorBody = await rateLimited[0].json();
				expect(errorBody.error).toContain("レート制限");
			}
		});
	});
});
