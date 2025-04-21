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
				// 必要に応じて特定のパスを禁止できます
				// disallow: ["/admin/", "/private/"],
			},
			{
				// ニュースページを明示的に許可
				userAgent: "*",
				allow: ["/news", "/news/*"],
			},
		],
		sitemap: `${META.SITE_URL}/sitemap.xml`,
	};
}
