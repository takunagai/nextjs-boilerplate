import { MetadataRoute } from "next";
import { META } from "@/lib/constants";

/**
 * サイトマップの生成
 * @returns サイトマップ設定
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // サイトのベースURL
  const baseUrl = META.SITE_URL;
  
  // 静的なページのリスト
  const staticPages = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ];

  // 動的に生成されるページがある場合は、ここで追加
  // 例: ブログ記事やプロダクトページなど
  // const dynamicPages = await fetchDynamicPages();

  return [
    ...staticPages,
    // ...dynamicPages,
  ];
}
