import { vi } from "vitest";
import { APP, META } from "@/lib/constants";
import { generateMetadata, generateViewport } from "../meta-tags";

// 定数のモック
vi.mock("@/lib/constants", () => ({
	APP: {
		NAME: "Test App",
	},
	META: {
		DEFAULT_DESCRIPTION: "Test application description",
		OG_IMAGE: "/images/default-og.jpg",
		SITE_URL: "https://example.com",
	},
}));

describe("meta-tags", () => {
	describe("generateMetadata", () => {
		it("デフォルトメタデータを生成する", () => {
			const metadata = generateMetadata({});

			expect(metadata.title).toBe("Test App");
			expect(metadata.description).toBe("Test application description");
			expect(metadata.keywords).toBeUndefined();
		});

		it("カスタムタイトルでメタデータを生成する", () => {
			const metadata = generateMetadata({
				title: "Custom Page",
			});

			expect(metadata.title).toBe("Custom Page | Test App");
			expect(metadata.description).toBe("Test application description");
		});

		it("カスタム説明でメタデータを生成する", () => {
			const metadata = generateMetadata({
				title: "About",
				description: "About our company",
			});

			expect(metadata.title).toBe("About | Test App");
			expect(metadata.description).toBe("About our company");
		});

		it("キーワードを含むメタデータを生成する", () => {
			const metadata = generateMetadata({
				title: "Blog",
				keywords: ["react", "nextjs", "typescript"],
			});

			expect(metadata.title).toBe("Blog | Test App");
			expect(metadata.keywords).toEqual(["react", "nextjs", "typescript"]);
		});

		it("noIndexがtrueの場合、robots設定が追加される", () => {
			const metadata = generateMetadata({
				title: "Private Page",
				noIndex: true,
			});

			expect(metadata.robots).toEqual({
				index: false,
				follow: false,
			});
		});

		it("noIndexがfalseの場合、robots設定が追加されない", () => {
			const metadata = generateMetadata({
				title: "Public Page",
				noIndex: false,
			});

			expect(metadata.robots).toBeUndefined();
		});

		describe("OGP画像の処理", () => {
			it("デフォルトOGP画像のフルURLが生成される", () => {
				const metadata = generateMetadata({
					title: "Page",
				});

				expect(metadata.openGraph?.images).toEqual([
					{
						url: "https://example.com/images/default-og.jpg",
						width: 1200,
						height: 630,
						alt: "Page | Test App",
					},
				]);

				expect(metadata.twitter?.images).toEqual([
					"https://example.com/images/default-og.jpg",
				]);
			});

			it("カスタムOGP画像（相対パス）のフルURLが生成される", () => {
				const metadata = generateMetadata({
					title: "Custom",
					ogImage: "/images/custom-og.jpg",
				});

				expect(metadata.openGraph?.images).toEqual([
					{
						url: "https://example.com/images/custom-og.jpg",
						width: 1200,
						height: 630,
						alt: "Custom | Test App",
					},
				]);
			});

			it("カスタムOGP画像（絶対URL）がそのまま使用される", () => {
				const metadata = generateMetadata({
					title: "External",
					ogImage: "https://cdn.example.com/image.jpg",
				});

				expect(metadata.openGraph?.images).toEqual([
					{
						url: "https://cdn.example.com/image.jpg",
						width: 1200,
						height: 630,
						alt: "External | Test App",
					},
				]);
			});
		});

		describe("正規URLの処理", () => {
			it("canonicalが指定されていない場合、alternatesが設定されない", () => {
				const metadata = generateMetadata({
					title: "Page",
				});

				expect(metadata.alternates).toBeUndefined();
			});

			it("相対パスのcanonicalがフルURLに変換される", () => {
				const metadata = generateMetadata({
					title: "Page",
					canonical: "/about",
				});

				expect(metadata.alternates).toEqual({
					canonical: "https://example.com/about",
				});
			});

			it("絶対URLのcanonicalがそのまま使用される", () => {
				const metadata = generateMetadata({
					title: "Page",
					canonical: "https://other-domain.com/page",
				});

				expect(metadata.alternates).toEqual({
					canonical: "https://other-domain.com/page",
				});
			});
		});

		describe("OpenGraphメタデータ", () => {
			it("適切なOpenGraphメタデータが生成される", () => {
				const metadata = generateMetadata({
					title: "Blog Post",
					description: "Amazing blog post content",
				});

				expect(metadata.openGraph).toEqual({
					title: "Blog Post | Test App",
					description: "Amazing blog post content",
					url: "https://example.com",
					siteName: "Test App",
					images: [
						{
							url: "https://example.com/images/default-og.jpg",
							width: 1200,
							height: 630,
							alt: "Blog Post | Test App",
						},
					],
					locale: "ja_JP",
					type: "website",
				});
			});
		});

		describe("Twitterメタデータ", () => {
			it("適切なTwitterメタデータが生成される", () => {
				const metadata = generateMetadata({
					title: "News Article",
					description: "Breaking news content",
				});

				expect(metadata.twitter).toEqual({
					card: "summary_large_image",
					title: "News Article | Test App",
					description: "Breaking news content",
					images: ["https://example.com/images/default-og.jpg"],
				});
			});
		});

		describe("複合的なケース", () => {
			it("すべてのプロパティを含むメタデータを生成する", () => {
				const metadata = generateMetadata({
					title: "Complete Page",
					description: "Complete page description",
					keywords: ["complete", "test"],
					ogImage: "/images/complete.jpg",
					canonical: "/complete",
					noIndex: true,
				});

				expect(metadata.title).toBe("Complete Page | Test App");
				expect(metadata.description).toBe("Complete page description");
				expect(metadata.keywords).toEqual(["complete", "test"]);
				expect(metadata.robots).toEqual({
					index: false,
					follow: false,
				});
				expect(metadata.alternates).toEqual({
					canonical: "https://example.com/complete",
				});
				expect(metadata.openGraph?.images).toEqual([
					{
						url: "https://example.com/images/complete.jpg",
						width: 1200,
						height: 630,
						alt: "Complete Page | Test App",
					},
				]);
			});
		});
	});

	describe("generateViewport", () => {
		it("適切なビューポート設定を生成する", () => {
			const viewport = generateViewport();

			expect(viewport).toEqual({
				width: "device-width",
				initialScale: 1,
				maximumScale: 5,
				userScalable: true,
				themeColor: [
					{ media: "(prefers-color-scheme: light)", color: "#ffffff" },
					{ media: "(prefers-color-scheme: dark)", color: "#09090b" },
				],
			});
		});

		it("ライトモードのテーマカラーが設定される", () => {
			const viewport = generateViewport();

			const themeColors = Array.isArray(viewport.themeColor)
				? viewport.themeColor
				: [];
			const lightTheme = themeColors.find(
				(theme: any) => theme.media === "(prefers-color-scheme: light)",
			);
			expect(lightTheme?.color).toBe("#ffffff");
		});

		it("ダークモードのテーマカラーが設定される", () => {
			const viewport = generateViewport();

			const themeColors = Array.isArray(viewport.themeColor)
				? viewport.themeColor
				: [];
			const darkTheme = themeColors.find(
				(theme: any) => theme.media === "(prefers-color-scheme: dark)",
			);
			expect(darkTheme?.color).toBe("#09090b");
		});

		it("スケール設定が正しく設定される", () => {
			const viewport = generateViewport();

			expect(viewport.initialScale).toBe(1);
			expect(viewport.maximumScale).toBe(5);
			expect(viewport.userScalable).toBe(true);
		});

		it("幅設定が正しく設定される", () => {
			const viewport = generateViewport();

			expect(viewport.width).toBe("device-width");
		});
	});

	describe("エッジケース", () => {
		it("空のtitleでメタデータを生成する", () => {
			const metadata = generateMetadata({
				title: "",
			});

			// 空文字の場合でも適切に処理される
			expect(metadata.title).toBe(" | Test App");
		});

		it("undefinedなプロパティが適切に処理される", () => {
			const metadata = generateMetadata({
				title: "Test",
				description: undefined,
				keywords: undefined,
				ogImage: undefined,
				canonical: undefined,
				noIndex: undefined,
			});

			expect(metadata.title).toBe("Test | Test App");
			expect(metadata.description).toBe("Test application description"); // デフォルト値
			expect(metadata.keywords).toBeUndefined();
			expect(metadata.robots).toBeUndefined();
			expect(metadata.alternates).toBeUndefined();
		});

		it("空配列のキーワードが適切に処理される", () => {
			const metadata = generateMetadata({
				title: "Test",
				keywords: [],
			});

			expect(metadata.keywords).toEqual([]);
		});
	});
});
