/**
 * メタデータに関する定数
 */

import { SITE_NAME } from './app';

/**
 * メタデータ設定
 */
export const META = {
  TITLE_TEMPLATE: `%s | ${SITE_NAME}`,
  DEFAULT_TITLE: SITE_NAME,
  DEFAULT_DESCRIPTION: "Next.js、TypeScript、Tailwind CSSを組み合わせた最新のボイラープレート",
  SITE_URL: "https://nextjs-boilerplate.example.com",
  OG_IMAGE: "/images/og-image.jpg",
  LOCALE: "ja_JP",
  TYPE: "website",
  TWITTER_HANDLE: "@yourhandle",
  TWITTER_CARD_TYPE: "summary_large_image",
  FAVICON: "/favicon.ico",
  APPLE_TOUCH_ICON: "/apple-touch-icon.png",
  MANIFEST: "/site.webmanifest",
} as const;
