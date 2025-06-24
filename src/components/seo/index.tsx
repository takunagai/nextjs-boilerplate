/**
 * SEO関連コンポーネントのエクスポート
 */

// JSON-LD構造化データ
export {
	ArticleJsonLd,
	BreadcrumbJsonLd,
	FaqJsonLd,
	OrganizationJsonLd,
	WebsiteJsonLd,
} from "./json-ld";
export type { MetaTagsProps } from "./meta-tags";
// メタタグ生成
export { generateMetadata, generateViewport } from "./meta-tags";
