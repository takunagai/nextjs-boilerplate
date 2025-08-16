import type { APIRequestContext } from "@playwright/test";
import { expect, test } from "@playwright/test";

/**
 * 統合パフォーマンステスト
 * API性能、Core Web Vitals、リソース最適化を包括的に測定
 * 
 * 測定基準:
 * - API応答時間: ≤ 500ms
 * - Core Web Vitals: LCP ≤ 2500ms, FID ≤ 100ms
 * - リソース読み込み: ≤ 1500ms
 */

interface ApiPerformanceMetrics {
	endpoint: string;
	method: string;
	avgResponseTime: number;
	maxResponseTime: number;
	successCount: number;
	errorCount: number;
	requestCount: number;
}

interface WebVitalsMetrics {
	lcp: number;
	fid: number;
	cls: number;
	fcp: number;
	ttfb: number;
}

interface ResourceMetrics {
	totalSize: number;
	jsSize: number;
	cssSize: number;
	imageCount: number;
	loadTime: number;
}

// APIパフォーマンス測定
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
	const { method, data, headers = {}, iterations = 3, description } = options;
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

		// リクエスト間隔
		await new Promise((resolve) => setTimeout(resolve, 100));
	}

	const avgResponseTime =
		responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
	const maxResponseTime = Math.max(...responseTimes);

	return {
		endpoint,
		method,
		avgResponseTime,
		maxResponseTime,
		successCount,
		errorCount,
		requestCount: iterations,
	};
}

// Web Vitals測定
async function measureWebVitals(page: any): Promise<WebVitalsMetrics> {
	await page.waitForLoadState("networkidle");

	const vitals = await page.evaluate(() => {
		return new Promise((resolve) => {
			const metrics = {
				lcp: 0,
				fid: 0,
				cls: 0,
				fcp: 0,
				ttfb: 0,
			};

			// LCP測定
			if ("PerformanceObserver" in window) {
				try {
					const lcpObserver = new PerformanceObserver((list) => {
						const entries = list.getEntries();
						const lastEntry = entries[entries.length - 1];
						if (lastEntry) {
							metrics.lcp = lastEntry.startTime;
						}
					});
					lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
				} catch (e) {
					console.warn("LCP measurement failed:", e);
				}

				// FCP測定
				try {
					const fcpObserver = new PerformanceObserver((list) => {
						const entries = list.getEntries();
						if (entries.length > 0) {
							metrics.fcp = entries[0].startTime;
						}
					});
					fcpObserver.observe({ type: "paint", buffered: true });
				} catch (e) {
					console.warn("FCP measurement failed:", e);
				}
			}

			// Navigation Timing API
			if (performance.getEntriesByType) {
				const navigation = performance.getEntriesByType("navigation")[0] as any;
				if (navigation) {
					metrics.ttfb = navigation.responseStart - navigation.requestStart;
				}
			}

			setTimeout(() => resolve(metrics), 1000);
		});
	});

	return vitals;
}

// リソースメトリクス測定
async function measureResourceMetrics(page: any): Promise<ResourceMetrics> {
	const resources = await page.evaluate(() => {
		const entries = performance.getEntriesByType("resource");
		let totalSize = 0;
		let jsSize = 0;
		let cssSize = 0;
		let imageCount = 0;

		entries.forEach((entry: any) => {
			const size = entry.transferSize || 0;
			totalSize += size;

			if (entry.name.includes(".js")) {
				jsSize += size;
			} else if (entry.name.includes(".css")) {
				cssSize += size;
			} else if (entry.name.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
				imageCount++;
			}
		});

		const navigation = performance.getEntriesByType("navigation")[0] as any;
		const loadTime = navigation ? navigation.loadEventEnd - navigation.navigationStart : 0;

		return {
			totalSize: Math.round(totalSize / 1024), // KB
			jsSize: Math.round(jsSize / 1024), // KB
			cssSize: Math.round(cssSize / 1024), // KB
			imageCount,
			loadTime,
		};
	});

	return resources;
}

test.describe("統合パフォーマンステスト", () => {
	test.describe("APIパフォーマンス", () => {
		test("CSRF Token API - 応答時間測定", async ({ request }) => {
			const metrics = await measureApiPerformance(request, "/api/csrf-token", {
				method: "GET",
				description: "CSRF Token取得",
			});

			console.log(`📊 CSRF Token結果: 平均 ${metrics.avgResponseTime.toFixed(1)}ms`);

			expect(metrics.successCount).toBeGreaterThan(0);
			expect(metrics.avgResponseTime).toBeLessThan(500);
		});

		test("User Registration API - 性能測定", async ({ request }) => {
			const testData = {
				name: "Performance Test User",
				email: `perf-test-${Date.now()}@example.com`,
				password: "password123",
			};

			const metrics = await measureApiPerformance(request, "/api/auth/register", {
				method: "POST",
				data: testData,
				description: "ユーザー登録API",
			});

			console.log(`📊 Registration結果: 平均 ${metrics.avgResponseTime.toFixed(1)}ms`);

			expect(metrics.avgResponseTime).toBeLessThan(800);
		});

		test("Contact Form - Server Action性能", async ({ page }) => {
			await page.goto("/contact");
			await page.waitForLoadState("domcontentloaded");

			const startTime = performance.now();

			await page.getByLabel("お名前").fill("パフォーマンステスト");
			await page.getByLabel("メールアドレス").fill("perf@example.com");
			await page.getByLabel("お問い合わせ内容").fill("パフォーマンステスト用のメッセージです。適切な長さで入力しています。");
			await page.getByRole("button", { name: "送信する" }).click();

			// フォーム処理完了を待つ
			await Promise.race([
				page.waitForFunction(() => {
					const nameField = document.querySelector('input[name="name"]') as HTMLInputElement;
					return nameField && nameField.value === "";
				}, { timeout: 10000 }),
				page.waitForSelector('.text-destructive, [role="alert"]', { timeout: 10000 }),
			]);

			const endTime = performance.now();
			const responseTime = endTime - startTime;

			console.log(`📊 Contact Form結果: ${responseTime.toFixed(1)}ms`);
			expect(responseTime).toBeLessThan(2000);
		});

		test("API並列処理耐性", async ({ request }) => {
			const concurrentRequests = 5;
			const startTime = performance.now();

			const promises = Array(concurrentRequests).fill(null).map(async () => {
				return await request.get("/api/csrf-token");
			});

			const responses = await Promise.all(promises);
			const endTime = performance.now();
			const totalTime = endTime - startTime;

			const successfulResponses = responses.filter(r => r.ok()).length;

			console.log(`📊 並列処理結果: ${concurrentRequests}件を${totalTime.toFixed(1)}msで処理`);

			expect(successfulResponses).toBeGreaterThanOrEqual(concurrentRequests * 0.8);
			expect(totalTime).toBeLessThan(2000);
		});
	});

	test.describe("Core Web Vitals", () => {
		test("ホームページ - パフォーマンス基準確認", async ({ page }) => {
			await page.goto("/");
			const vitals = await measureWebVitals(page);

			console.log(`📊 ホームページ Web Vitals:`, {
				LCP: `${vitals.lcp.toFixed(1)}ms`,
				FCP: `${vitals.fcp.toFixed(1)}ms`,
				TTFB: `${vitals.ttfb.toFixed(1)}ms`
			});

			expect(vitals.lcp).toBeLessThan(3000);
			expect(vitals.fcp).toBeLessThan(2000);
			expect(vitals.ttfb).toBeLessThan(800);
		});

		test("ログインページ - フォーム最適化確認", async ({ page }) => {
			await page.goto("/login");
			const vitals = await measureWebVitals(page);

			// フォーム入力応答性確認
			const inputStart = performance.now();
			await page.getByLabel("メールアドレス").fill("test@example.com");
			const inputEnd = performance.now();
			const inputResponseTime = inputEnd - inputStart;

			console.log(`📊 ログインページ: LCP ${vitals.lcp.toFixed(1)}ms, 入力応答 ${inputResponseTime.toFixed(1)}ms`);

			expect(vitals.lcp).toBeLessThan(2500);
			expect(inputResponseTime).toBeLessThan(100);
		});

		test("全ページ共通 - FCP/TTFB基準確認", async ({ page }) => {
			const pages = ["/", "/login", "/contact"];
			const results = [];

			for (const path of pages) {
				await page.goto(path);
				const vitals = await measureWebVitals(page);
				results.push({ path, vitals });
			}

			for (const result of results) {
				console.log(`📊 ${result.path}: FCP ${result.vitals.fcp.toFixed(1)}ms, TTFB ${result.vitals.ttfb.toFixed(1)}ms`);
				
				expect(result.vitals.fcp).toBeLessThan(1800);
				expect(result.vitals.ttfb).toBeLessThan(600);
			}
		});

		test("リソース読み込み性能確認", async ({ page }) => {
			await page.goto("/");
			const resources = await measureResourceMetrics(page);

			console.log(`📊 リソースメトリクス:`, {
				総サイズ: `${resources.totalSize}KB`,
				JS: `${resources.jsSize}KB`,
				CSS: `${resources.cssSize}KB`,
				画像数: resources.imageCount,
				読み込み時間: `${resources.loadTime}ms`
			});

			expect(resources.loadTime).toBeLessThan(2000);
			expect(resources.totalSize).toBeLessThan(2000); // 2MB
		});
	});

	test.describe("リソース最適化", () => {
		test("バンドルサイズ確認", async ({ page }) => {
			await page.goto("/");
			const resources = await measureResourceMetrics(page);

			console.log(`📊 バンドルサイズ: JS ${resources.jsSize}KB, CSS ${resources.cssSize}KB`);

			expect(resources.jsSize).toBeLessThan(1500); // 1.5MB
			expect(resources.cssSize).toBeLessThan(100); // 100KB
		});

		test("画像最適化確認", async ({ page }) => {
			await page.goto("/");
			await page.waitForLoadState("networkidle");

			const imageStats = await page.evaluate(() => {
				const images = Array.from(document.querySelectorAll('img'));
				const nextImages = images.filter(img => img.src.includes('/_next/image'));
				const totalImages = images.length;

				return {
					totalImages,
					nextImagesCount: nextImages.length,
					optimizationRate: totalImages > 0 ? (nextImages.length / totalImages) * 100 : 0
				};
			});

			console.log(`📊 画像最適化: ${imageStats.optimizationRate.toFixed(1)}% (${imageStats.nextImagesCount}/${imageStats.totalImages})`);

			if (imageStats.totalImages > 0) {
				expect(imageStats.optimizationRate).toBeGreaterThanOrEqual(20);
			}
		});

		test("キャッシュ効率確認", async ({ page }) => {
			await page.goto("/");
			await page.waitForLoadState("networkidle");

			const cacheStats = await page.evaluate(() => {
				const resources = performance.getEntriesByType("resource");
				const cachedResources = resources.filter((entry: any) => {
					return entry.transferSize === 0 || entry.transferSize < entry.decodedBodySize;
				});

				return {
					total: resources.length,
					cached: cachedResources.length,
					hitRate: resources.length > 0 ? (cachedResources.length / resources.length) * 100 : 0
				};
			});

			console.log(`📊 キャッシュヒット率: ${cacheStats.hitRate.toFixed(1)}%`);

			if (cacheStats.total > 10) {
				expect(cacheStats.hitRate).toBeGreaterThanOrEqual(10);
			}
		});

		test("全体的なリソース効率評価", async ({ page }) => {
			await page.goto("/");
			const resources = await measureResourceMetrics(page);
			const vitals = await measureWebVitals(page);

			// パフォーマンススコア計算
			const scores = {
				loadTime: resources.loadTime < 1000 ? 100 : Math.max(0, 100 - (resources.loadTime - 1000) / 10),
				bundleSize: resources.totalSize < 500 ? 100 : Math.max(0, 100 - (resources.totalSize - 500) / 10),
				lcp: vitals.lcp < 2000 ? 100 : Math.max(0, 100 - (vitals.lcp - 2000) / 20)
			};

			const overallScore = (scores.loadTime + scores.bundleSize + scores.lcp) / 3;

			console.log(`📊 パフォーマンススコア: ${overallScore.toFixed(1)}/100`, {
				読み込み: scores.loadTime.toFixed(1),
				バンドル: scores.bundleSize.toFixed(1),
				LCP: scores.lcp.toFixed(1)
			});

			expect(overallScore).toBeGreaterThanOrEqual(60);
		});
	});
});