import { SITE_NAME, META } from "@/lib/constants";
import type { Metadata } from "next";

/**
 * メタタグ生成のためのプロパティ
 */
export type MetaTagsProps = {
  /**
   * ページタイトル
   */
  title?: string;
  /**
   * ページの説明
   */
  description?: string;
  /**
   * キーワード
   */
  keywords?: string[];
  /**
   * OGP画像URL
   */
  ogImage?: string;
  /**
   * 正規URL
   */
  canonical?: string;
  /**
   * noindex設定
   */
  noIndex?: boolean;
};

/**
 * Next.jsのMetadata APIを使用してメタデータを生成する
 * @param props メタタグのプロパティ
 * @returns Metadata オブジェクト
 */
export function generateMetadata({
  title,
  description = META.DEFAULT_DESCRIPTION,
  keywords,
  ogImage = META.OG_IMAGE,
  canonical,
  noIndex = false,
}: MetaTagsProps): Metadata {
  // タイトルの生成
  const metaTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  
  // 完全なOGP画像URLの生成
  const ogImageUrl = ogImage.startsWith("http")
    ? ogImage
    : `${META.SITE_URL}${ogImage}`;
  
  // 完全な正規URLの生成
  const canonicalUrl = canonical
    ? canonical.startsWith("http")
      ? canonical
      : `${META.SITE_URL}${canonical}`
    : undefined;

  return {
    title: metaTitle,
    description,
    keywords,
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
    ...(canonicalUrl && {
      alternates: {
        canonical: canonicalUrl,
      },
    }),
    openGraph: {
      title: metaTitle,
      description,
      url: META.SITE_URL,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
      locale: "ja_JP",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description,
      images: [ogImageUrl],
    },
  };
}
