import {
	ServicePageWrapper,
	createWebDevelopmentServiceConfig,
	generateServiceMetadata,
	serviceViewport,
} from "@/components/services/shared/service-page-wrapper";
import { WordPressHeroSection } from "@/components/services/wordpress/hero-section";
import { WordPressFeaturesSection } from "@/components/services/wordpress/features-section";
import { WordPressProcessSection } from "@/components/services/wordpress/process-section";
import { WordPressPricingSection } from "@/components/services/wordpress/pricing-section";
import { WordPressCustomizationSection } from "@/components/services/wordpress/customization-section";
import { WordPressPortfolioSection } from "@/components/services/wordpress/portfolio-section";
import { WordPressFAQSection } from "@/components/services/wordpress/faq-section";
import { BackgroundImageCTA } from "@/components/ui/background-image-cta";

// ページ設定
const pageConfig = createWebDevelopmentServiceConfig(
	"wordpress",
	"WordPressサイト制作 - CMS・ブログに最適な柔軟性重視",
	"WordPressの柔軟性×AIの効率性で理想のサイトを実現。企業サイト・ブログ・オウンドメディアに最適。カスタムテーマ・プラグイン開発で独自性と機能性を両立。SEO・セキュリティ・保守性も万全。北摂・北大阪エリアを中心に全国対応。",
	[
		"WordPress",
		"CMS",
		"ブログ",
		"オウンドメディア",
		"カスタムテーマ",
		"プラグイン開発",
		"企業サイト",
		"ニュースサイト",
		"SEO最適化",
		"レスポンシブ",
		"管理画面カスタマイズ",
		"セキュリティ対策",
		"高速化",
		"保守サポート",
		"北摂",
		"大阪",
	],
	{ revalidate: 7200 }, // 2 hours
);

export const metadata = generateServiceMetadata(pageConfig);
export const viewport = serviceViewport;

// キャッシュ設定
export const revalidate = 7200; // 2 hours

export default function WordPressPage() {
	return (
		<ServicePageWrapper config={pageConfig}>
			<WordPressHeroSection />
			<WordPressFeaturesSection />
			<WordPressProcessSection />
			<WordPressPricingSection />
			<WordPressCustomizationSection />
			<WordPressPortfolioSection />
			<WordPressFAQSection />
			<BackgroundImageCTA
				backgroundImage="/dummy-images/office-workspace-01.jpg"
				title="WordPressで、コンテンツ発信を加速"
				description="柔軟なCMS×プロのカスタマイズで、運用しやすく効果的なWebサイトを構築します。"
				primaryButtonText="無料相談を予約"
				secondaryButtonText="制作事例を見る"
				primaryButtonHref="/contact?service=wordpress"
				secondaryButtonHref="/services/web-development/wordpress#portfolio"
			/>
		</ServicePageWrapper>
	);
}
