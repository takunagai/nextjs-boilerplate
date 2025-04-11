import type { MetadataRoute } from "next";
import { META } from "@/lib/constants";
import { getAllNews } from "@/lib/data/news";

/**
 * サイトマップの生成
 * @returns サイトマップ設定
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
  ];

  // お知らせページの動的生成
  const allNews = await getAllNews();
  const newsPages = allNews.map((news) => ({
    url: `${baseUrl}/news/${news.id}`,
    lastModified: news.date,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...newsPages,
  ];
}
