/**
 * SEO関連コンポーネントのエクスポート
 */

// メタタグ生成
export { generateMetadata, generateViewport } from "./meta-tags";
export type { MetaTagsProps } from "./meta-tags";

// JSON-LD構造化データ
export {
  WebsiteJsonLd,
  OrganizationJsonLd,
  ArticleJsonLd,
  BreadcrumbJsonLd,
  FaqJsonLd,
} from "./json-ld";
