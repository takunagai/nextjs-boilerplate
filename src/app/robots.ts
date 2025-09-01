import type { MetadataRoute } from "next";
import { META } from "@/lib/constants";

/**
 * robots.txtの生成
 * @returns robots.txt設定
 */
export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: "*",
				allow: "/",
				disallow: [
					"/examples/", // 開発サンプルページ
					"/examples/*", // 開発サンプル詳細ページ
					"/login", // 認証ページ
					"/register", // 認証ページ
					"/dashboard/", // 認証後ダッシュボード
					"/dashboard/*", // 認証後ページ全般
					"/profile", // プロフィール編集
				],
			},
			{
				// ニュースページを明示的に許可
				userAgent: "*",
				allow: ["/news", "/news/*"],
			},
			{
				// サービス、ポートフォリオページを明示的に許可
				userAgent: "*",
				allow: ["/services", "/services/*", "/portfolio", "/about", "/contact"],
			},
		],
		sitemap: `${META.SITE_URL}/sitemap.xml`,
	};
}
