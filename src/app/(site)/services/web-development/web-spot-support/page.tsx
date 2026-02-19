import {
	ServicePageWrapper,
	createWebDevelopmentServiceConfig,
	generateServiceMetadata,
	serviceViewport,
} from "@/components/services/shared/service-page-wrapper";
import { WebSpotSupportHeroSection } from "@/components/services/web-spot-support/hero-section";
import { WebSpotSupportServicesSection } from "@/components/services/web-spot-support/services-section";
import { WebSpotSupportPricingSection } from "@/components/services/web-spot-support/pricing-section";
import { WebSpotSupportProcessSection } from "@/components/services/web-spot-support/process-section";
import { ServiceFAQ } from "@/components/services/shared/service-faq";
import { BackgroundImageCTA } from "@/components/ui/background-image-cta";
import { webSpotSupportFaqs } from "@/lib/data/web-spot-support-faq";

// ページ設定
const pageConfig = createWebDevelopmentServiceConfig(
	"web-spot-support",
	"Webお困りごとスポット対応 - 緊急対応・トラブル解決・部分修正",
	"Webサイトのトラブルやちょっとした修正に迅速対応。エラー修正・デザイン調整・機能追加・セキュリティ対策など、Web制作のプロが柔軟にサポート。単発依頼・緊急対応に最適。北摂・北大阪エリアを中心に全国対応。",
	[
		"Webトラブル解決",
		"サイト修正",
		"緊急対応",
		"エラー修正",
		"デザイン調整",
		"機能追加",
		"セキュリティ対策",
		"WordPress修正",
		"HTML CSS修正",
		"JavaScript修正",
		"サイト更新",
		"バグ修正",
		"レスポンシブ対応",
		"SEO修正",
		"スポット対応",
		"北摂",
		"大阪",
	],
	{ revalidate: 7200 }, // 2 hours
);

export const metadata = generateServiceMetadata(pageConfig);
export const viewport = serviceViewport;

// キャッシュ設定
export const revalidate = 7200; // 2 hours

export default function WebSpotSupportPage() {
	return (
		<ServicePageWrapper config={pageConfig}>
			<WebSpotSupportHeroSection />
			<WebSpotSupportServicesSection />
			<WebSpotSupportPricingSection />
			<WebSpotSupportProcessSection />
			<ServiceFAQ
				faqs={webSpotSupportFaqs}
				title="よくある質問"
				description="スポット対応サービスに関するご質問"
				footerText="お困りごとがございましたら、まずはお気軽にご相談ください"
				ctaText="今すぐ相談する"
				ctaHref="/contact?service=web-spot-support"
			/>
			<BackgroundImageCTA
				backgroundImage="/dummy-images/support-team-01.jpg"
				title="Webのお困りごと、すぐに解決します"
				description="小さな修正から緊急トラブルまで、Web制作のプロが迅速かつ丁寧に対応いたします。"
				primaryButtonText="今すぐ相談する"
				secondaryButtonText="料金を確認する"
				primaryButtonHref="/contact?service=web-spot-support"
				secondaryButtonHref="/services/web-development/web-spot-support#pricing"
			/>
		</ServicePageWrapper>
	);
}
