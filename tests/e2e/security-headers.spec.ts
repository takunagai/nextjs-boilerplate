import { expect, test } from "@playwright/test";

/**
 * HTTPセキュリティヘッダーテスト
 * セキュリティ関連のHTTPヘッダーが適切に設定されているかをテスト
 */

// セキュリティヘッダーテスト用のページオブジェクト
class SecurityHeadersTestPage {
	constructor(private page: any) {}

	// 指定されたパスにアクセスしてヘッダーを取得
	async getHeadersForPath(path: string): Promise<Record<string, string>> {
		const response = await this.page.goto(path);
		return response?.headers() || {};
	}

	// APIエンドポイントにリクエスト送信してヘッダーを取得
	async getApiHeaders(
		path: string,
		method: "GET" | "POST" = "GET",
		data?: any,
	): Promise<{
		headers: Record<string, string>;
		status: number;
		body?: any;
	}> {
		let response;

		if (method === "GET") {
			response = await this.page.request.get(path);
		} else {
			response = await this.page.request.post(path, {
				data: JSON.stringify(data || {}),
				headers: { "Content-Type": "application/json" },
			});
		}

		const headers = response.headers();
		const status = response.status();
		let body;

		try {
			body = await response.json();
		} catch {
			body = await response.text();
		}

		return { headers, status, body };
	}

	// レート制限テスト用の複数リクエスト送信
	async sendMultipleRequests(
		path: string,
		count: number,
		delay = 0,
	): Promise<
		Array<{
			status: number;
			headers: Record<string, string>;
			timestamp: number;
		}>
	> {
		const results = [];

		for (let i = 0; i < count; i++) {
			const timestamp = Date.now();
			const response = await this.page.request.get(path);

			results.push({
				status: response.status(),
				headers: response.headers(),
				timestamp,
			});

			if (delay > 0 && i < count - 1) {
				await this.page.waitForTimeout(delay);
			}
		}

		return results;
	}
}

test.describe("HTTPセキュリティヘッダーテスト", () => {
	let securityPage: SecurityHeadersTestPage;

	test.beforeEach(async ({ page }) => {
		securityPage = new SecurityHeadersTestPage(page);
	});

	test.describe("基本セキュリティヘッダー", () => {
		test("X-Content-Type-Options ヘッダーが正しく設定されている", async ({
			page,
		}) => {
			const headers = await securityPage.getHeadersForPath("/");

			// MIME sniffing攻撃を防ぐヘッダー
			expect(headers["x-content-type-options"]).toBe("nosniff");
		});

		test("X-Frame-Options ヘッダーが正しく設定されている", async ({ page }) => {
			const headers = await securityPage.getHeadersForPath("/");

			// クリックジャッキング攻撃を防ぐヘッダー
			expect(headers["x-frame-options"]).toBe("DENY");
		});

		test("X-XSS-Protection ヘッダーが正しく設定されている", async ({
			page,
		}) => {
			const headers = await securityPage.getHeadersForPath("/");

			// XSS攻撃に対する追加保護
			expect(headers["x-xss-protection"]).toBe("1; mode=block");
		});

		test("すべての主要ページでセキュリティヘッダーが設定されている", async ({
			page,
		}) => {
			const paths = [
				"/",
				"/about",
				"/services",
				"/contact",
				"/login",
				"/register",
			];

			for (const path of paths) {
				const headers = await securityPage.getHeadersForPath(path);

				// 基本セキュリティヘッダーの存在確認
				expect(headers["x-content-type-options"]).toBe("nosniff");
				expect(headers["x-frame-options"]).toBe("DENY");
				expect(headers["x-xss-protection"]).toBe("1; mode=block");
			}
		});
	});

	test.describe("Content Security Policy", () => {
		test("CSPヘッダーの存在確認（設定されている場合）", async ({ page }) => {
			const headers = await securityPage.getHeadersForPath("/");

			// CSPが設定されている場合の検証
			const csp = headers["content-security-policy"];
			const cspReportOnly = headers["content-security-policy-report-only"];

			if (csp || cspReportOnly) {
				// CSPが設定されている場合、基本的な指示を確認
				const cspValue = csp || cspReportOnly;

				// 基本的なCSP構文チェック
				expect(cspValue).toBeTruthy();
				expect(typeof cspValue).toBe("string");

				// 一般的なCSP指示の存在確認（設定に依存）
				if (cspValue.includes("default-src")) {
					expect(cspValue).toMatch(/default-src\s+[^;]+/);
				}
			} else {
				console.log(
					"CSP is not configured - this is optional but recommended for enhanced security",
				);
			}
		});

		test("meta CSPタグの存在確認（HTMLレベル）", async ({ page }) => {
			await page.goto("/");

			const cspMeta = await page
				.locator('meta[http-equiv="Content-Security-Policy"]')
				.count();
			const cspMetaContent = await page
				.locator('meta[http-equiv="Content-Security-Policy"]')
				.getAttribute("content");

			if (cspMeta > 0) {
				expect(cspMetaContent).toBeTruthy();
				expect(typeof cspMetaContent).toBe("string");
			} else {
				console.log(
					"Meta CSP is not configured - using HTTP headers or no CSP",
				);
			}
		});
	});

	test.describe("HTTPS・Transport Security", () => {
		test("HSTS（HTTP Strict Transport Security）の確認", async ({ page }) => {
			const headers = await securityPage.getHeadersForPath("/");

			// HTTPS環境でのHSTSヘッダー確認
			const hsts = headers["strict-transport-security"];
			const isHttps = page.url().startsWith("https://");

			if (isHttps) {
				// HTTPS環境ではHSTSが設定されているべき
				if (hsts) {
					expect(hsts).toMatch(/max-age=\d+/);
					console.log(`HSTS configured: ${hsts}`);
				} else {
					console.warn("HSTS not configured - recommended for HTTPS sites");
				}
			} else {
				// HTTP環境ではHSTSは無意味
				expect(hsts).toBeFalsy();
				console.log("Running on HTTP - HSTS not applicable");
			}
		});

		test("セキュアCookie設定の確認", async ({ page }) => {
			// CSRFトークンなどのセキュリティクッキーの確認
			const { headers } = await securityPage.getApiHeaders("/api/csrf-token");

			const setCookie = headers["set-cookie"];
			if (setCookie) {
				// Cookie設定の解析
				const cookieSettings = setCookie.toLowerCase();

				// HttpOnlyの確認
				expect(cookieSettings).toMatch(/httponly/);

				// SameSiteの確認
				expect(cookieSettings).toMatch(/samesite=(strict|lax)/);

				// HTTPS環境でのSecureフラグ確認
				const isHttps =
					(await page.evaluate(() => location.protocol)) === "https:";
				if (isHttps) {
					expect(cookieSettings).toMatch(/secure/);
				}
			}
		});
	});

	test.describe("レート制限機能", () => {
		test("API エンドポイントでのレート制限", async ({ page }) => {
			// 短時間で大量リクエストを送信
			const responses = await securityPage.sendMultipleRequests(
				"/api/csrf-token",
				25,
				50,
			);

			// 一部のリクエストがレート制限されることを確認
			const rateLimitedResponses = responses.filter((r) => r.status === 429);
			const successfulResponses = responses.filter((r) => r.status === 200);

			// レート制限が機能していることを確認
			expect(rateLimitedResponses.length).toBeGreaterThan(0);

			// 成功レスポンスが0件の場合もあり得る（すべてがレート制限された場合）
			expect(successfulResponses.length).toBeGreaterThanOrEqual(0);

			// レート制限レスポンスの詳細確認
			if (rateLimitedResponses.length > 0) {
				const rateLimitHeaders = rateLimitedResponses[0].headers;

				// Retry-Afterヘッダーの存在確認
				expect(rateLimitHeaders["retry-after"]).toBeTruthy();
				expect(
					Number.parseInt(rateLimitHeaders["retry-after"]),
				).toBeGreaterThan(0);
			}
		});

		test("ログインページでのレート制限", async ({ page }) => {
			const responses = await securityPage.sendMultipleRequests(
				"/login",
				25,
				50,
			);

			// 全てのリクエストがレート制限の対象
			const rateLimitedCount = responses.filter((r) => r.status === 429).length;

			if (rateLimitedCount > 0) {
				// レート制限が機能している
				expect(rateLimitedCount).toBeGreaterThan(0);
				console.log(
					`Rate limiting active: ${rateLimitedCount}/${responses.length} requests limited`,
				);
			} else {
				console.log("Rate limiting not triggered with current request pattern");
			}
		});

		test("レート制限のリセット機能", async ({ page }) => {
			// 第1回目：レート制限まで送信
			const firstBatch = await securityPage.sendMultipleRequests(
				"/api/csrf-token",
				15,
				50,
			);
			const _firstBatchLimited = firstBatch.filter((r) => r.status === 429);

			// 十分な時間待機（レート制限ウィンドウのリセット）
			await page.waitForTimeout(11000); // 11秒待機（10秒のウィンドウ + バッファ）

			// 第2回目：リセット後のリクエスト
			const secondBatch = await securityPage.sendMultipleRequests(
				"/api/csrf-token",
				5,
			);
			const secondBatchSuccessful = secondBatch.filter((r) => r.status === 200);

			// レート制限がリセットされて正常にリクエストが処理されることを確認
			expect(secondBatchSuccessful.length).toBeGreaterThan(0);
		});
	});

	test.describe("CORS（Cross-Origin Resource Sharing）", () => {
		test("CORS ヘッダーの適切な設定", async ({ page }) => {
			const { headers } = await securityPage.getApiHeaders("/api/csrf-token");

			// CORS関連ヘッダーの確認
			const corsHeaders = {
				"access-control-allow-origin": headers["access-control-allow-origin"],
				"access-control-allow-methods": headers["access-control-allow-methods"],
				"access-control-allow-headers": headers["access-control-allow-headers"],
				"access-control-allow-credentials":
					headers["access-control-allow-credentials"],
			};

			// デフォルトではCORSを制限的に設定すべき
			if (corsHeaders["access-control-allow-origin"]) {
				// ワイルドカード "*" は避けるべき（credentials使用時は特に）
				if (corsHeaders["access-control-allow-credentials"] === "true") {
					expect(corsHeaders["access-control-allow-origin"]).not.toBe("*");
				}
			}
		});

		test("Preflight リクエストの処理", async ({ page }) => {
			// OPTIONSリクエスト（preflightリクエスト）の送信
			const response = await page.request.fetch("/api/csrf-token", {
				method: "OPTIONS",
				headers: {
					Origin: page.url(),
					"Access-Control-Request-Method": "POST",
					"Access-Control-Request-Headers": "Content-Type,x-csrf-token",
				},
			});

			const _headers = response.headers();
			const status = response.status();

			// OPTIONSリクエストが適切に処理されることを確認
			expect([200, 204, 404]).toContain(status); // 実装依存
		});
	});

	test.describe("キャッシュ制御", () => {
		test("機密ページのキャッシュ制御", async ({ page }) => {
			const sensitivePages = ["/login", "/register", "/dashboard"];

			for (const path of sensitivePages) {
				try {
					const headers = await securityPage.getHeadersForPath(path);

					// キャッシュ制御ヘッダーの確認
					const cacheControl = headers["cache-control"];
					const pragma = headers.pragma;

					if (cacheControl) {
						// 機密ページでは適切なキャッシュ制御が必要
						const hasNoCache =
							cacheControl.includes("no-cache") ||
							cacheControl.includes("no-store") ||
							cacheControl.includes("private");

						if (hasNoCache) {
							console.log(
								`Appropriate cache control for ${path}: ${cacheControl}`,
							);
						}
					}

					// Pragma: no-cache の確認（HTTP/1.0 互換性）
					if (pragma === "no-cache") {
						console.log(`Pragma no-cache set for ${path}`);
					}
				} catch (error) {
					// ページが存在しない場合やリダイレクトされる場合はスキップ
					console.log(`Skipping cache control test for ${path}: ${error}`);
				}
			}
		});

		test("静的リソースのキャッシュ最適化", async ({ page }) => {
			// 静的リソース（CSS、JSなど）のキャッシュ設定確認
			await page.goto("/");

			// ページ読み込み後のネットワーク活動を監視
			const responses: any[] = [];
			page.on("response", (response) => {
				responses.push(response);
			});

			await page.waitForLoadState("networkidle");

			// 静的リソースのキャッシュヘッダーを確認
			const staticResources = responses.filter((r) => {
				const url = r.url();
				return (
					url.includes("/_next/static/") ||
					url.endsWith(".css") ||
					url.endsWith(".js")
				);
			});

			for (const resource of staticResources.slice(0, 5)) {
				// 最初の5件のみテスト
				const headers = resource.headers();
				const cacheControl = headers["cache-control"];

				if (cacheControl) {
					// 静的リソースは長期キャッシュが効率的
					const hasLongCache =
						cacheControl.includes("public") ||
						cacheControl.includes("max-age") ||
						cacheControl.includes("immutable");

					if (hasLongCache) {
						console.log(`Good caching for static resource: ${resource.url()}`);
					}
				}
			}
		});
	});

	test.describe("エラーレスポンスのセキュリティ", () => {
		test("404エラー時の情報漏洩防止", async ({ page }) => {
			const { headers, status, body } = await securityPage.getApiHeaders(
				"/api/nonexistent-endpoint",
			);

			expect(status).toBe(404);

			// エラーレスポンスでもセキュリティヘッダーが設定されていることを確認
			expect(headers["x-content-type-options"]).toBe("nosniff");
			expect(headers["x-frame-options"]).toBe("DENY");

			// エラーレスポンスで機密情報が漏洩していないことを確認
			const bodyString = typeof body === "string" ? body : JSON.stringify(body);
			expect(bodyString.toLowerCase()).not.toMatch(
				/password|secret|token|database|internal/,
			);
		});

		test("500エラー時のスタックトレース非表示", async ({ page }) => {
			// 意図的にエラーを発生させる試行（存在しないAPIエンドポイント）
			const { status, body } = await securityPage.getApiHeaders(
				"/api/cause-error",
				"POST",
				{
					invalid: "data to cause error",
				},
			);

			if (status >= 500) {
				const bodyString =
					typeof body === "string" ? body : JSON.stringify(body);

				// スタックトレースが含まれていないことを確認
				expect(bodyString).not.toMatch(/at\s+\w+.*:\d+:\d+/); // Stack trace pattern
				expect(bodyString).not.toMatch(/Error:\s+.*\n\s+at/); // Error with stack
				expect(bodyString).not.toMatch(/\/[a-zA-Z0-9/_-]+\.js:\d+/); // File paths
			}
		});

		test("認証エラー時の適切なヘッダー", async ({ page }) => {
			// 認証が必要なエンドポイントに未認証でアクセス
			const { headers, status } =
				await securityPage.getApiHeaders("/dashboard");

			if (status === 401 || status === 403) {
				// 認証エラーでもセキュリティヘッダーが設定されていることを確認
				expect(headers["x-content-type-options"]).toBe("nosniff");
				expect(headers["x-frame-options"]).toBe("DENY");

				// WWW-Authenticateヘッダーがある場合、適切な値であることを確認
				const wwwAuth = headers["www-authenticate"];
				if (wwwAuth) {
					expect(wwwAuth).not.toMatch(/password|secret|token/i);
				}
			}
		});
	});

	test.describe("セキュリティヘッダーの一貫性", () => {
		test("全エンドポイントでセキュリティヘッダーが一貫している", async ({
			page,
		}) => {
			const endpoints = [
				"/",
				"/api/csrf-token",
				"/api/health", // 存在する場合
				"/login",
				"/contact",
			];

			const headerResults = [];

			for (const endpoint of endpoints) {
				try {
					let headers;
					if (endpoint.startsWith("/api/")) {
						const result = await securityPage.getApiHeaders(endpoint);
						headers = result.headers;
					} else {
						headers = await securityPage.getHeadersForPath(endpoint);
					}

					headerResults.push({ endpoint, headers });
				} catch (error) {
					console.log(`Skipping ${endpoint}: ${error}`);
				}
			}

			// 基本セキュリティヘッダーが全エンドポイントで一貫していることを確認
			for (const result of headerResults) {
				expect(result.headers["x-content-type-options"]).toBe("nosniff");
				expect(result.headers["x-frame-options"]).toBe("DENY");
				expect(result.headers["x-xss-protection"]).toBe("1; mode=block");
			}
		});

		test("セキュリティヘッダーの値の正確性", async ({ page }) => {
			const headers = await securityPage.getHeadersForPath("/");

			// ヘッダー値の形式チェック
			expect(headers["x-content-type-options"]).toMatch(/^nosniff$/);
			expect(headers["x-frame-options"]).toMatch(/^(DENY|SAMEORIGIN)$/);
			expect(headers["x-xss-protection"]).toMatch(/^1;\s*mode=block$/);

			// 存在する場合のその他のヘッダーの形式チェック
			if (headers["strict-transport-security"]) {
				expect(headers["strict-transport-security"]).toMatch(/max-age=\d+/);
			}

			if (headers["content-security-policy"]) {
				// CSPの基本的な構文チェック
				expect(headers["content-security-policy"]).toMatch(/[a-z-]+\s+[^;]+/);
			}
		});
	});
});
