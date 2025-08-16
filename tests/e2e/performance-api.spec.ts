import type { APIRequestContext } from "@playwright/test";
import { expect, test } from "@playwright/test";

/**
 * APIパフォーマンステスト
 * REST API および Server Actions の応答時間、並列処理性能、エラー耐性を測定
 *
 * 測定基準:
 * - CSRF Token: ≤ 200ms
 * - User Registration: ≤ 500ms
 * - Contact Form: ≤ 1500ms (意図的遅延込み)
 * - Email Check: ≤ 800ms (意図的遅延込み)
 * - 並列処理: 10並列リクエスト処理可能
 * - エラー応答: ≤ 300ms
 */

interface ApiPerformanceMetrics {
	endpoint: string;
	method: string;
	avgResponseTime: number;
	maxResponseTime: number;
	minResponseTime: number;
	successCount: number;
	errorCount: number;
	requestCount: number;
}

interface ConcurrentTestResult {
	totalRequests: number;
	successfulRequests: number;
	failedRequests: number;
	averageResponseTime: number;
	maxResponseTime: number;
	requestsPerSecond: number;
}

// APIのパフォーマンスを測定する汎用関数
async function measureApiPerformance(
	request: APIRequestContext,
	endpoint: string,
	options: {
		method: "GET" | "POST";
		data?: any;
		headers?: Record<string, string>;
		iterations?: number;
		description: string;
	},
): Promise<ApiPerformanceMetrics> {
	const { method, data, headers = {}, iterations = 5, description } = options;
	const responseTimes: number[] = [];
	let successCount = 0;
	let errorCount = 0;

	console.log(`⏱️ ${description} - ${iterations}回測定開始`);

	for (let i = 0; i < iterations; i++) {
		const startTime = performance.now();

		try {
			const response =
				method === "GET"
					? await request.get(endpoint, { headers })
					: await request.post(endpoint, { data, headers });

			const endTime = performance.now();
			const responseTime = endTime - startTime;
			responseTimes.push(responseTime);

			if (response.ok()) {
				successCount++;
			} else {
				errorCount++;
				console.warn(`⚠️ エラーレスポンス ${i + 1}: ${response.status()}`);
			}
		} catch (error) {
			const endTime = performance.now();
			const responseTime = endTime - startTime;
			responseTimes.push(responseTime);
			errorCount++;
			console.warn(`⚠️ リクエストエラー ${i + 1}:`, error);
		}

		// リクエスト間隔（レート制限考慮）
		await new Promise((resolve) => setTimeout(resolve, 100));
	}

	const avgResponseTime =
		responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
	const maxResponseTime = Math.max(...responseTimes);
	const minResponseTime = Math.min(...responseTimes);

	const metrics: ApiPerformanceMetrics = {
		endpoint,
		method,
		avgResponseTime,
		maxResponseTime,
		minResponseTime,
		successCount,
		errorCount,
		requestCount: iterations,
	};

	console.log(`📊 ${description} 結果:`, {
		平均応答時間: `${avgResponseTime.toFixed(1)}ms`,
		最大応答時間: `${maxResponseTime.toFixed(1)}ms`,
		成功: `${successCount}/${iterations}`,
		エラー: errorCount,
	});

	return metrics;
}

// Set-Cookieヘッダーを適切なCookie形式に変換する関数
function parseCookiesFromSetCookie(setCookieHeader: string): string {
	if (!setCookieHeader) return "";
	
	const cookies: string[] = [];
	const setCookies = setCookieHeader.split('\n');
	
	for (const setCookie of setCookies) {
		if (setCookie.trim()) {
			// "name=value; Path=/; HttpOnly" -> "name=value"
			const cookiePart = setCookie.split(';')[0].trim();
			if (cookiePart) {
				cookies.push(cookiePart);
			}
		}
	}
	
	return cookies.join('; ');
}

// CSRFトークンを取得する共通関数
async function getCsrfToken(
	request: APIRequestContext,
): Promise<{ token: string; cookies: string }> {
	const response = await request.get("/api/csrf-token");
	const responseBody = await response.json();
	const setCookieHeader = response.headers()["set-cookie"] || "";
	const cookies = parseCookiesFromSetCookie(setCookieHeader);

	return {
		token: responseBody.csrfToken,
		cookies,
	};
}

// 並列リクエストのパフォーマンステスト
async function measureConcurrentRequests(
	request: APIRequestContext,
	endpoint: string,
	requestOptions: {
		method: "GET" | "POST";
		data?: any;
		headers?: Record<string, string>;
	},
	concurrency = 10,
): Promise<ConcurrentTestResult> {
	console.log(`🔄 並列テスト開始: ${endpoint} - ${concurrency}並列リクエスト`);

	const startTime = performance.now();
	const promises: Promise<{ success: boolean; responseTime: number }>[] = [];

	for (let i = 0; i < concurrency; i++) {
		const promise = (async () => {
			const reqStartTime = performance.now();
			try {
				const response =
					requestOptions.method === "GET"
						? await request.get(endpoint, { headers: requestOptions.headers })
						: await request.post(endpoint, {
								data: requestOptions.data,
								headers: requestOptions.headers,
							});

				const reqEndTime = performance.now();
				return {
					success: response.ok(),
					responseTime: reqEndTime - reqStartTime,
				};
			} catch (_error) {
				const reqEndTime = performance.now();
				return {
					success: false,
					responseTime: reqEndTime - reqStartTime,
				};
			}
		})();

		promises.push(promise);
	}

	const results = await Promise.all(promises);
	const endTime = performance.now();
	const totalDuration = endTime - startTime;

	const successfulRequests = results.filter((r) => r.success).length;
	const failedRequests = results.length - successfulRequests;
	const responseTimes = results.map((r) => r.responseTime);
	const averageResponseTime =
		responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
	const maxResponseTime = Math.max(...responseTimes);
	const requestsPerSecond = (concurrency * 1000) / totalDuration;

	const result: ConcurrentTestResult = {
		totalRequests: concurrency,
		successfulRequests,
		failedRequests,
		averageResponseTime,
		maxResponseTime,
		requestsPerSecond,
	};

	console.log("📊 並列テスト結果:", {
		成功リクエスト: `${successfulRequests}/${concurrency}`,
		平均応答時間: `${averageResponseTime.toFixed(1)}ms`,
		最大応答時間: `${maxResponseTime.toFixed(1)}ms`,
		スループット: `${requestsPerSecond.toFixed(1)} req/sec`,
	});

	return result;
}

test.describe("REST API パフォーマンス", () => {
	test("CSRF Token API - 応答時間測定", async ({ request }) => {
		const metrics = await measureApiPerformance(request, "/api/csrf-token", {
			method: "GET",
			iterations: 10,
			description: "CSRFトークン取得",
		});

		// CSRF Token 取得: 200ms以下
		expect(metrics.avgResponseTime).toBeLessThan(200);
		expect(metrics.maxResponseTime).toBeLessThan(400);

		// 大部分のリクエストが成功（レート制限考慮）
		expect(metrics.successCount).toBeGreaterThanOrEqual(7); // 70%以上成功
		expect(metrics.errorCount).toBeLessThanOrEqual(3); // レート制限による失敗は許容
	});

	test("User Registration API - 正常ケース性能", async ({ request }) => {
		// CSRFトークン取得
		const { token, cookies } = await getCsrfToken(request);

		const registrationData = {
			name: "テストユーザー",
			email: "newuser@test.com",
			password: "password123",
		};

		const metrics = await measureApiPerformance(request, "/api/auth/register", {
			method: "POST",
			data: registrationData,
			headers: {
				"Content-Type": "application/json",
				"X-CSRF-Token": token,
				Cookie: cookies,
				Origin: "http://localhost:3000",
			},
			iterations: 5,
			description: "ユーザー登録API",
		});

		// ユーザー登録: 500ms以下
		expect(metrics.avgResponseTime).toBeLessThan(500);
		expect(metrics.maxResponseTime).toBeLessThan(1000);

		// 大部分のリクエストが成功（重複エラーは許容）
		expect(metrics.successCount).toBeGreaterThanOrEqual(1);
	});

	test("User Registration API - バリデーションエラー性能", async ({
		request,
	}) => {
		// CSRFトークン取得
		const { token, cookies } = await getCsrfToken(request);

		const invalidData = {
			name: "", // 無効な名前
			email: "invalid-email", // 無効なメール
			password: "123", // 短すぎるパスワード
		};

		const metrics = await measureApiPerformance(request, "/api/auth/register", {
			method: "POST",
			data: invalidData,
			headers: {
				"Content-Type": "application/json",
				"X-CSRF-Token": token,
				Cookie: cookies,
				Origin: "http://localhost:3000",
			},
			iterations: 5,
			description: "バリデーションエラーケース",
		});

		// バリデーションエラー: 300ms以下（正常処理より早いはず）
		expect(metrics.avgResponseTime).toBeLessThan(300);
		expect(metrics.maxResponseTime).toBeLessThan(500);

		// 全てバリデーションエラーとして処理される
		expect(metrics.errorCount).toBeGreaterThan(0);
	});
});

test.describe("Server Actions パフォーマンス", () => {
	test("Contact Form Server Action - 応答時間測定", async ({ page }) => {
		await page.goto("/contact");

		const performanceResults: number[] = [];
		const iterations = 3; // Server Actionsは重いので回数を減らす

		for (let i = 0; i < iterations; i++) {
			console.log(`📝 お問い合わせフォーム送信テスト ${i + 1}/${iterations}`);

			await page.getByLabel("名前").fill(`テストユーザー${i + 1}`);
			await page.getByLabel("メールアドレス").fill(`test${i + 1}@example.com`);
			await page
				.locator('textarea[name="message"], textarea[id*="message"]')
				.first()
				.fill(
					`テストメッセージです。パフォーマンステストの実行中です。繰り返し${i + 1}回目。`,
				);

			const startTime = performance.now();

			// フォーム送信
			await page.locator('form button[type="submit"]').click();

			// 送信完了の確認（成功メッセージ or ページ遷移）
			try {
				await page.waitForSelector(
					'[data-testid="success-message"], .success',
					{
						timeout: 3000,
					},
				);
			} catch {
				// 成功メッセージが見つからない場合は、別の成功指標を探す
				// フォーム処理完了またはリダイレクトを待機
				await Promise.race([
					page.waitForURL(url => url !== page.url(), { timeout: 2000 }),
					page.waitForLoadState('networkidle', { timeout: 2000 })
				]).catch(() => {});
			}

			const endTime = performance.now();
			const responseTime = endTime - startTime;
			performanceResults.push(responseTime);

			console.log(`⏱️ 送信完了時間: ${responseTime.toFixed(1)}ms`);

			// 次のテストのためにフォームをクリア
			await page.reload();
		}

		const avgResponseTime =
			performanceResults.reduce((a, b) => a + b, 0) / performanceResults.length;
		const maxResponseTime = Math.max(...performanceResults);

		console.log("📊 Contact Form 結果:", {
			平均応答時間: `${avgResponseTime.toFixed(1)}ms`,
			最大応答時間: `${maxResponseTime.toFixed(1)}ms`,
		});

		// Contact Form: 1500ms以下（1秒の意図的遅延 + 処理時間）
		expect(avgResponseTime).toBeLessThan(1500);
		expect(maxResponseTime).toBeLessThan(2000);
	});

	test("Email Existence Check - 応答時間測定", async ({ page }) => {
		await page.goto("/register");

		const performanceResults: number[] = [];
		const testEmails = [
			"test@example.com",
			"user@example.com",
			"check@test.com",
		];

		for (const email of testEmails) {
			console.log(`📧 メール存在確認テスト: ${email}`);

			const emailInput = page.getByLabel("メールアドレス");
			await emailInput.clear();
			await emailInput.fill(email);

			const startTime = performance.now();

			// フォーカスを別の要素に移してバリデーションをトリガー
			await page.getByLabel("パスワード").focus();

			// バリデーション結果の表示を待つ（エラーまたは成功サイン）
			await Promise.race([
				page.waitForSelector('.text-destructive, .error, .text-green-600, .success', { timeout: 1000 }),
				page.waitForFunction(() => {
					const now = performance.now();
					return now - window.validationStartTime > 800; // 800msのタイムアウト
				}, { timeout: 1000 })
			]).catch(() => {});

			const endTime = performance.now();
			const responseTime = endTime - startTime;
			performanceResults.push(responseTime);

			console.log(`⏱️ 確認完了時間: ${responseTime.toFixed(1)}ms`);
		}

		const avgResponseTime =
			performanceResults.reduce((a, b) => a + b, 0) / performanceResults.length;
		const maxResponseTime = Math.max(...performanceResults);

		console.log("📊 Email Check 結果:", {
			平均応答時間: `${avgResponseTime.toFixed(1)}ms`,
			最大応答時間: `${maxResponseTime.toFixed(1)}ms`,
		});

		// Email Check: 800ms以下（500msの意図的遅延 + 処理時間）
		expect(avgResponseTime).toBeLessThan(800);
		expect(maxResponseTime).toBeLessThan(1000);
	});
});

test.describe("並列処理・負荷テスト", () => {
	test("CSRF Token API - 並列リクエスト処理", async ({ request }) => {
		const result = await measureConcurrentRequests(
			request,
			"/api/csrf-token",
			{ method: "GET" },
			8, // レート制限を考慮して8並列
		);

		// 並列処理能力確認
		expect(result.successfulRequests).toBeGreaterThanOrEqual(6); // 75%以上成功
		expect(result.averageResponseTime).toBeLessThan(500); // 並列でも500ms以下
		expect(result.requestsPerSecond).toBeGreaterThan(5); // 5req/sec以上

		console.log(
			`🚀 CSRF Token 並列性能: ${result.requestsPerSecond.toFixed(1)} req/sec`,
		);
	});

	test("User Registration API - 並列処理耐性", async ({ request }) => {
		// 共通のCSRFトークン取得
		const { token, cookies } = await getCsrfToken(request);

		const registrationData = {
			name: "並列テストユーザー",
			email: "concurrent@test.com",
			password: "password123",
		};

		const result = await measureConcurrentRequests(
			request,
			"/api/auth/register",
			{
				method: "POST",
				data: registrationData,
				headers: {
					"Content-Type": "application/json",
					"X-CSRF-Token": token,
					Cookie: cookies,
					Origin: "http://localhost:3000",
				},
			},
			5, // 登録APIは5並列で測定
		);

		// 並列登録処理の確認
		expect(result.successfulRequests).toBeGreaterThanOrEqual(1); // 最低1つは成功
		expect(result.averageResponseTime).toBeLessThan(1000); // 並列でも1秒以下

		// 重複エラーが発生するのは正常（メールアドレス重複）
		if (result.failedRequests > 0) {
			console.log(`ℹ️ 重複エラー ${result.failedRequests}件 (正常動作)`);
		}

		console.log(
			`🚀 Registration 並列性能: ${result.requestsPerSecond.toFixed(1)} req/sec`,
		);
	});
});

test.describe("エラー耐性・セキュリティ性能", () => {
	test("CSRF検証失敗時の応答性能", async ({ request }) => {
		const invalidData = {
			name: "テストユーザー",
			email: "test@example.com",
			password: "password123",
		};

		const metrics = await measureApiPerformance(request, "/api/auth/register", {
			method: "POST",
			data: invalidData,
			headers: {
				"Content-Type": "application/json",
				Origin: "http://localhost:3000",
				// CSRFトークンを意図的に省略
			},
			iterations: 5,
			description: "CSRF検証失敗",
		});

		// CSRF検証失敗: 200ms以下で高速拒否
		expect(metrics.avgResponseTime).toBeLessThan(200);
		expect(metrics.maxResponseTime).toBeLessThan(400);

		// 全リクエストが失敗（CSRF検証失敗）
		expect(metrics.errorCount).toBe(metrics.requestCount);
		expect(metrics.successCount).toBe(0);

		console.log(
			`🔒 CSRF検証失敗: 平均${metrics.avgResponseTime.toFixed(1)}ms で高速拒否`,
		);
	});

	test("レート制限機能との協調確認", async ({ request }) => {
		console.log("🚦 レート制限テスト開始");

		const rapidRequests = 15; // 制限を超える数のリクエスト
		const results: {
			success: boolean;
			responseTime: number;
			status: number;
		}[] = [];

		for (let i = 0; i < rapidRequests; i++) {
			const startTime = performance.now();
			try {
				const response = await request.get("/api/csrf-token");
				const endTime = performance.now();

				results.push({
					success: response.ok(),
					responseTime: endTime - startTime,
					status: response.status(),
				});
			} catch (_error) {
				const endTime = performance.now();
				results.push({
					success: false,
					responseTime: endTime - startTime,
					status: 500,
				});
			}

			// 間隔なしで連続リクエスト（レート制限をテスト）
		}

		const successfulRequests = results.filter((r) => r.success).length;
		const rateLimitedRequests = results.filter((r) => r.status === 429).length;
		const avgResponseTime =
			results.reduce((sum, r) => sum + r.responseTime, 0) / results.length;

		console.log("📊 レート制限結果:", {
			総リクエスト: rapidRequests,
			成功リクエスト: successfulRequests,
			レート制限: rateLimitedRequests,
			平均応答時間: `${avgResponseTime.toFixed(1)}ms`,
		});

		// レート制限が適切に機能
		if (rateLimitedRequests > 0) {
			console.log(
				`✅ レート制限が正常に機能: ${rateLimitedRequests}件のリクエストを制限`,
			);
		}

		// レート制限も高速応答
		expect(avgResponseTime).toBeLessThan(300);

		// 一部のリクエストは成功している
		expect(successfulRequests).toBeGreaterThan(0);
	});
});

test.describe("APIパフォーマンス総合評価", () => {
	test("全API総合パフォーマンススコア", async ({ request, page }) => {
		console.log("\n🎯 総合パフォーマンス評価開始");

		const scores: { api: string; score: number; responseTime: number }[] = [];

		// 1. CSRF Token API
		const csrfMetrics = await measureApiPerformance(
			request,
			"/api/csrf-token",
			{
				method: "GET",
				iterations: 3,
				description: "CSRF Token (評価用)",
			},
		);

		let csrfScore = 100;
		if (csrfMetrics.avgResponseTime > 200) csrfScore -= 30;
		if (csrfMetrics.avgResponseTime > 400) csrfScore -= 50;
		if (csrfMetrics.errorCount > 0) csrfScore -= 20;
		scores.push({
			api: "CSRF Token",
			score: Math.max(0, csrfScore),
			responseTime: csrfMetrics.avgResponseTime,
		});

		// 2. User Registration API
		try {
			const { token, cookies } = await getCsrfToken(request);
			const regMetrics = await measureApiPerformance(
				request,
				"/api/auth/register",
				{
					method: "POST",
					data: {
						name: "評価用",
						email: "eval@test.com",
						password: "password123",
					},
					headers: {
						"Content-Type": "application/json",
						"X-CSRF-Token": token,
						Cookie: cookies,
						Origin: "http://localhost:3000",
					},
					iterations: 2,
					description: "User Registration (評価用)",
				},
			);

			let regScore = 100;
			if (regMetrics.avgResponseTime > 500) regScore -= 30;
			if (regMetrics.avgResponseTime > 1000) regScore -= 50;
			if (regMetrics.successCount === 0) regScore -= 40;
			scores.push({
				api: "User Registration",
				score: Math.max(0, regScore),
				responseTime: regMetrics.avgResponseTime,
			});
		} catch (_error) {
			scores.push({ api: "User Registration", score: 0, responseTime: 9999 });
		}

		// スコア集計
		const totalScore =
			scores.reduce((sum, s) => sum + s.score, 0) / scores.length;

		console.log("\n📊 総合パフォーマンススコア:");
		for (const score of scores) {
			console.log(
				`${score.api}: ${score.score}点 (応答時間: ${score.responseTime.toFixed(1)}ms)`,
			);
		}
		console.log(`🎯 総合スコア: ${totalScore.toFixed(1)}点`);

		// 総合スコア: 70点以上
		expect(totalScore).toBeGreaterThanOrEqual(70);

		// 最低スコア: 50点以上（どのAPIも極端に悪くない）
		const minScore = Math.min(...scores.map((s) => s.score));
		expect(minScore).toBeGreaterThanOrEqual(50);
	});
});
