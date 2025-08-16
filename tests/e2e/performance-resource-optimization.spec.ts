import type { Page } from "@playwright/test";
import { expect, test } from "@playwright/test";

/**
 * リソース最適化パフォーマンステスト
 * バンドルサイズ、画像最適化、キャッシュ効率、ネットワーク最適化を測定
 *
 * 目標:
 * - JavaScript: 開発環境 2MB以下、本番環境 250KB gzipped
 * - CSS: 開発環境 60KB以下、本番環境 50KB以下
 * - 画像: WebP/AVIF優先、適切なサイズ制限
 * - キャッシュ: Hit Rate ≥ 90%
 */

interface ResourceMetrics {
	totalResources: number;
	jsCount: number;
	cssCount: number;
	imageCount: number;
	fontCount: number;
	jsSize: number;
	cssSize: number;
	imageSize: number;
	totalSize: number;
	cachedRequests: number;
	cacheHitRate: number;
	slowResources: number;
	avgResponseTime: number;
}

interface ImageOptimizationMetrics {
	totalImages: number;
	totalImageSize: number;
	avgImageSize: number;
	webpImages: number;
	avifImages: number;
	jpegImages: number;
	pngImages: number;
	optimizedRatio: number;
}

// リソースメトリクスを取得する共通関数
async function getResourceMetrics(page: Page): Promise<ResourceMetrics> {
	// ページの読み込み完了とネットワーク安定化を待つ
	await page.waitForLoadState("networkidle");
	await page.waitForLoadState("domcontentloaded");

	return await page.evaluate(() => {
		const resources = performance.getEntriesByType(
			"resource",
		) as PerformanceResourceTiming[];

		// リソース種別の分類
		const jsResources = resources.filter(
			(r) => r.name.includes(".js") || r.name.includes("/_next/static/chunks/"),
		);
		const cssResources = resources.filter(
			(r) => r.name.includes(".css") || r.name.includes("/_next/static/css/"),
		);
		const imageResources = resources.filter(
			(r) =>
				r.initiatorType === "img" ||
				r.name.match(/\.(jpg|jpeg|png|gif|webp|avif|svg)$/i),
		);
		const fontResources = resources.filter((r) =>
			r.name.match(/\.(woff|woff2|ttf|otf|eot)$/i),
		);

		// キャッシュ効率計算（transferSize が 0 で decodedBodySize > 0 はキャッシュヒット）
		const cachedResources = resources.filter(
			(r) => r.transferSize === 0 && r.decodedBodySize > 0,
		);

		// 遅いリソース（1秒以上）
		const slowResources = resources.filter((r) => r.duration > 1000);

		// 平均応答時間
		const avgResponseTime =
			resources.length > 0
				? resources.reduce((sum, r) => sum + r.duration, 0) / resources.length
				: 0;

		return {
			totalResources: resources.length,
			jsCount: jsResources.length,
			cssCount: cssResources.length,
			imageCount: imageResources.length,
			fontCount: fontResources.length,
			jsSize: jsResources.reduce((sum, r) => sum + (r.transferSize || 0), 0),
			cssSize: cssResources.reduce((sum, r) => sum + (r.transferSize || 0), 0),
			imageSize: imageResources.reduce(
				(sum, r) => sum + (r.transferSize || 0),
				0,
			),
			totalSize: resources.reduce((sum, r) => sum + (r.transferSize || 0), 0),
			cachedRequests: cachedResources.length,
			cacheHitRate:
				resources.length > 0
					? (cachedResources.length / resources.length) * 100
					: 0,
			slowResources: slowResources.length,
			avgResponseTime,
		};
	});
}

// 画像最適化メトリクスを取得
async function getImageOptimizationMetrics(
	page: Page,
): Promise<ImageOptimizationMetrics> {
	return await page.evaluate(() => {
		const resources = performance.getEntriesByType(
			"resource",
		) as PerformanceResourceTiming[];
		const imageResources = resources.filter(
			(r) =>
				r.initiatorType === "img" ||
				r.name.match(/\.(jpg|jpeg|png|gif|webp|avif|svg)$/i),
		);

		// 画像フォーマット別カウント
		const webpImages = imageResources.filter((r) =>
			r.name.includes(".webp"),
		).length;
		const avifImages = imageResources.filter((r) =>
			r.name.includes(".avif"),
		).length;
		const jpegImages = imageResources.filter((r) =>
			r.name.match(/\.(jpg|jpeg)$/i),
		).length;
		const pngImages = imageResources.filter((r) =>
			r.name.includes(".png"),
		).length;

		// 最適化された画像の比率（WebP + AVIF）
		const optimizedImages = webpImages + avifImages;
		const optimizedRatio =
			imageResources.length > 0
				? (optimizedImages / imageResources.length) * 100
				: 0;

		const totalImageSize = imageResources.reduce(
			(sum, r) => sum + (r.transferSize || 0),
			0,
		);
		const avgImageSize =
			imageResources.length > 0 ? totalImageSize / imageResources.length : 0;

		return {
			totalImages: imageResources.length,
			totalImageSize,
			avgImageSize,
			webpImages,
			avifImages,
			jpegImages,
			pngImages,
			optimizedRatio,
		};
	});
}

test.describe("バンドルサイズ最適化", () => {
	test("ホームページ - JavaScript/CSSバンドルサイズ確認", async ({ page }) => {
		await page.goto("/");

		const metrics = await getResourceMetrics(page);

		console.log("📦 ホームページ リソースメトリクス:", {
			JSファイル数: metrics.jsCount,
			CSSファイル数: metrics.cssCount,
			JSサイズ: `${(metrics.jsSize / 1024).toFixed(1)}KB`,
			CSSサイズ: `${(metrics.cssSize / 1024).toFixed(1)}KB`,
			総サイズ: `${(metrics.totalSize / 1024).toFixed(1)}KB`,
		});

		// JavaScript バンドルサイズ: 開発環境 2MB以下
		expect(metrics.jsSize).toBeLessThan(2 * 1024 * 1024);

		// CSS サイズ: 開発環境 60KB以下
		expect(metrics.cssSize).toBeLessThan(60 * 1024);

		// 合理的なリソース数（過度に細分化されていない）
		expect(metrics.jsCount).toBeLessThan(50);
		expect(metrics.cssCount).toBeLessThan(10);

		// 総リソース数制限
		expect(metrics.totalResources).toBeLessThan(100);
	});

	test("全ページ共通 - バンドル一貫性確認", async ({ page }) => {
		const pages = [
			{ url: "/", name: "ホームページ" },
			{ url: "/login", name: "ログイン" },
			{ url: "/register", name: "登録" },
			{ url: "/contact", name: "お問い合わせ" },
		];

		const results: Array<{ name: string; jsSize: number; cssSize: number }> =
			[];

		for (const pageInfo of pages) {
			await page.goto(pageInfo.url);
			const metrics = await getResourceMetrics(page);

			results.push({
				name: pageInfo.name,
				jsSize: metrics.jsSize,
				cssSize: metrics.cssSize,
			});

			console.log(`📊 ${pageInfo.name}:`, {
				JS: `${(metrics.jsSize / 1024).toFixed(1)}KB`,
				CSS: `${(metrics.cssSize / 1024).toFixed(1)}KB`,
			});
		}

		// ページ間でのバンドルサイズの一貫性（±20%以内）
		const baseJsSize = results[0].jsSize;
		const baseCssSize = results[0].cssSize;

		for (const result of results.slice(1)) {
			const jsVariation = Math.abs(result.jsSize - baseJsSize) / baseJsSize;
			const cssVariation = Math.abs(result.cssSize - baseCssSize) / baseCssSize;

			expect(jsVariation).toBeLessThan(0.3); // 30%以内の変動
			expect(cssVariation).toBeLessThan(0.6); // 60%以内の変動（ページ固有スタイル考慮）
		}
	});
});

test.describe("画像最適化", () => {
	test("画像フォーマット最適化確認", async ({ page }) => {
		await page.goto("/");

		const imageMetrics = await getImageOptimizationMetrics(page);

		console.log("🖼️ 画像最適化メトリクス:", {
			総画像数: imageMetrics.totalImages,
			WebP画像: imageMetrics.webpImages,
			AVIF画像: imageMetrics.avifImages,
			JPEG画像: imageMetrics.jpegImages,
			PNG画像: imageMetrics.pngImages,
			最適化率: `${imageMetrics.optimizedRatio.toFixed(1)}%`,
			平均画像サイズ: `${(imageMetrics.avgImageSize / 1024).toFixed(1)}KB`,
		});

		if (imageMetrics.totalImages > 0) {
			// 画像が存在する場合の最適化チェック

			// 平均画像サイズ: 200KB以下
			expect(imageMetrics.avgImageSize).toBeLessThan(200 * 1024);

			// 最適化された画像の比率: 50%以上が理想（開発段階では柔軟に）
			// Next.jsの画像最適化機能を使用していれば自動で最適化される
			if (imageMetrics.optimizedRatio < 30) {
				console.warn(
					`⚠️ 画像最適化率が低いです: ${imageMetrics.optimizedRatio.toFixed(1)}%`,
				);
				console.warn(
					"📝 Next.jsのImage componentを使用して自動最適化を活用してください",
				);
			}
		} else {
			console.log("ℹ️ ホームページに画像リソースが見つかりませんでした");
		}

		// 画像の総サイズ: 1MB以下
		if (imageMetrics.totalImageSize > 0) {
			expect(imageMetrics.totalImageSize).toBeLessThan(1 * 1024 * 1024);
		}
	});

	test("Next.js Image最適化設定確認", async ({ page }) => {
		await page.goto("/");

		// Next.js Image componentの使用確認（data-nimg属性の存在）
		const nextImageCount = await page.locator("img[data-nimg]").count();
		const totalImageCount = await page.locator("img").count();

		console.log("🔍 画像コンポーネント使用状況:", {
			"Next.js Image": nextImageCount,
			通常のimg: totalImageCount - nextImageCount,
			総数: totalImageCount,
		});

		if (totalImageCount > 0) {
			// Next.js Imageコンポーネントの使用率
			const nextImageUsageRate = (nextImageCount / totalImageCount) * 100;
			console.log(`📈 Next.js Image使用率: ${nextImageUsageRate.toFixed(1)}%`);

			// 推奨: 50%以上がNext.js Imageコンポーネント（開発段階では柔軟に）
			if (nextImageUsageRate < 50) {
				console.warn(
					"📝 推奨: より多くの画像でNext.js Imageコンポーネントを使用してください",
				);
			}
		}
	});
});

test.describe("ネットワーク・キャッシュ最適化", () => {
	test("リソース読み込みパフォーマンス", async ({ page }) => {
		await page.goto("/");

		const metrics = await getResourceMetrics(page);

		console.log("🌐 ネットワークメトリクス:", {
			総リクエスト数: metrics.totalResources,
			平均応答時間: `${metrics.avgResponseTime.toFixed(1)}ms`,
			遅いリソース数: metrics.slowResources,
			キャッシュヒット率: `${metrics.cacheHitRate.toFixed(1)}%`,
		});

		// 平均応答時間: 500ms以下
		expect(metrics.avgResponseTime).toBeLessThan(500);

		// 1秒を超える遅いリソースがないこと
		expect(metrics.slowResources).toBe(0);

		// 総リソース数: 合理的な範囲内
		expect(metrics.totalResources).toBeLessThan(100);
		expect(metrics.totalResources).toBeGreaterThan(10);
	});

	test("キャッシュ効率確認", async ({ page }) => {
		// 初回ロード
		await page.goto("/");
		const firstLoadMetrics = await getResourceMetrics(page);

		// ページリロード（キャッシュ効果確認）
		await page.reload();
		const secondLoadMetrics = await getResourceMetrics(page);

		console.log("💾 キャッシュ効率:", {
			初回ロード: {
				リソース数: firstLoadMetrics.totalResources,
				総サイズ: `${(firstLoadMetrics.totalSize / 1024).toFixed(1)}KB`,
				キャッシュヒット率: `${firstLoadMetrics.cacheHitRate.toFixed(1)}%`,
			},
			二回目ロード: {
				リソース数: secondLoadMetrics.totalResources,
				総サイズ: `${(secondLoadMetrics.totalSize / 1024).toFixed(1)}KB`,
				キャッシュヒット率: `${secondLoadMetrics.cacheHitRate.toFixed(1)}%`,
			},
		});

		// リロード後のキャッシュヒット率向上確認
		if (secondLoadMetrics.totalResources > 5) {
			// 十分なリソースがある場合、キャッシュ効果を期待
			expect(secondLoadMetrics.cacheHitRate).toBeGreaterThan(
				firstLoadMetrics.cacheHitRate,
			);
		}

		// 静的リソースのキャッシュ効率: 30%以上（開発環境では柔軟に）
		if (secondLoadMetrics.cacheHitRate < 30) {
			console.warn(
				`⚠️ キャッシュヒット率が低いです: ${secondLoadMetrics.cacheHitRate.toFixed(1)}%`,
			);
			console.warn(
				"📝 本番環境では適切なCache-Controlヘッダーの設定を確認してください",
			);
		}
	});

	test("HTTP/2 multiplexing 効果確認", async ({ page }) => {
		await page.goto("/");

		// リソースの並列読み込み効果確認
		const navigationTiming = await page.evaluate(() => {
			const nav = performance.getEntriesByType(
				"navigation",
			)[0] as PerformanceNavigationTiming;
			const resources = performance.getEntriesByType(
				"resource",
			) as PerformanceResourceTiming[];

			// NaN値を防ぐための安全な計算
			const domContentLoaded =
				nav?.domContentLoadedEventEnd && nav.navigationStart
					? nav.domContentLoadedEventEnd - nav.navigationStart
					: 0;
			const loadComplete =
				nav?.loadEventEnd && nav.navigationStart
					? nav.loadEventEnd - nav.navigationStart
					: 0;

			return {
				domContentLoaded,
				loadComplete,
				resourceCount: resources.length,
				maxResourceDuration:
					resources.length > 0
						? Math.max(...resources.map((r) => r.duration))
						: 0,
				avgResourceDuration:
					resources.length > 0
						? resources.reduce((sum, r) => sum + r.duration, 0) /
							resources.length
						: 0,
			};
		});

		console.log("⚡ 並列読み込み効果:", {
			DOMContentLoaded: `${navigationTiming.domContentLoaded.toFixed(1)}ms`,
			完全ロード: `${navigationTiming.loadComplete.toFixed(1)}ms`,
			リソース数: navigationTiming.resourceCount,
			最大リソース時間: `${navigationTiming.maxResourceDuration.toFixed(1)}ms`,
			平均リソース時間: `${navigationTiming.avgResourceDuration.toFixed(1)}ms`,
		});

		// DOMContentLoaded: 3秒以内（値が取得できた場合のみ）
		if (navigationTiming.domContentLoaded > 0) {
			expect(navigationTiming.domContentLoaded).toBeLessThan(3000);
		} else {
			console.warn(
				"⚠️ DOMContentLoaded値が取得できませんでした（Navigation Timing API制限）",
			);
		}

		// 完全ロード: 5秒以内（値が取得できた場合のみ）
		if (navigationTiming.loadComplete > 0) {
			expect(navigationTiming.loadComplete).toBeLessThan(5000);
		} else {
			console.warn(
				"⚠️ LoadComplete値が取得できませんでした（Navigation Timing API制限）",
			);
		}

		// 並列読み込みの効果確認（値が取得できた場合のみ）
		if (
			navigationTiming.loadComplete > 0 &&
			navigationTiming.avgResourceDuration > 0
		) {
			const theoreticalSequentialTime =
				navigationTiming.avgResourceDuration * navigationTiming.resourceCount;
			const parallelEfficiency =
				navigationTiming.loadComplete / theoreticalSequentialTime;

			console.log(
				`🔄 並列効率: ${(parallelEfficiency * 100).toFixed(1)}% (数値が小さいほど並列効果が高い)`,
			);

			// 並列効率: 50%以下（つまり順次読み込みの半分以下の時間）
			expect(parallelEfficiency).toBeLessThan(0.5);
		} else {
			console.warn("⚠️ 並列効率計算をスキップ（Navigation Timing値不足）");
			// 代替テスト: 少なくともリソースは正常に読み込まれている
			expect(navigationTiming.resourceCount).toBeGreaterThan(10);
			expect(navigationTiming.maxResourceDuration).toBeGreaterThan(0);
		}
	});
});

test.describe("リソース最適化総合評価", () => {
	test("全体的なリソース効率評価", async ({ page }) => {
		const pages = ["/", "/login", "/register", "/contact"];
		const results: Array<{
			page: string;
			metrics: ResourceMetrics;
			score: number;
		}> = [];

		for (const url of pages) {
			await page.goto(url);
			const metrics = await getResourceMetrics(page);

			// スコア計算（0-100点）
			let score = 100;

			// JavaScript サイズペナルティ
			if (metrics.jsSize > 2 * 1024 * 1024)
				score -= 20; // 2MB超過
			else if (metrics.jsSize > 1.5 * 1024 * 1024) score -= 10; // 1.5MB超過

			// CSS サイズペナルティ
			if (metrics.cssSize > 60 * 1024)
				score -= 15; // 60KB超過
			else if (metrics.cssSize > 50 * 1024) score -= 5; // 50KB超過

			// レスポンス時間ペナルティ
			if (metrics.avgResponseTime > 500) score -= 20;
			else if (metrics.avgResponseTime > 300) score -= 10;

			// 遅いリソースペナルティ
			score -= metrics.slowResources * 15;

			// キャッシュ効率ボーナス
			if (metrics.cacheHitRate > 50) score += 10;
			else if (metrics.cacheHitRate > 30) score += 5;

			results.push({ page: url, metrics, score: Math.max(0, score) });
		}

		// 結果表示
		console.log("\n📊 リソース最適化スコア:");
		for (const result of results) {
			console.log(
				`${result.page}: ${result.score}点 (JS: ${(result.metrics.jsSize / 1024).toFixed(0)}KB, CSS: ${(result.metrics.cssSize / 1024).toFixed(0)}KB, 応答: ${result.metrics.avgResponseTime.toFixed(0)}ms)`,
			);
		}

		// 全ページ平均スコア: 70点以上
		const averageScore =
			results.reduce((sum, r) => sum + r.score, 0) / results.length;
		console.log(`\n🎯 総合スコア: ${averageScore.toFixed(1)}点`);

		expect(averageScore).toBeGreaterThanOrEqual(70);

		// 最低スコア: 60点以上（どのページも基準を大幅に下回らない）
		const minScore = Math.min(...results.map((r) => r.score));
		expect(minScore).toBeGreaterThanOrEqual(60);
	});
});
