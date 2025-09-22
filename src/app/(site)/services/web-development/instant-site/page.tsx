import {
	ServicePageWrapper,
	createWebDevelopmentServiceConfig,
	generateServiceMetadata,
	serviceViewport,
} from "@/components/services/shared/service-page-wrapper";
import { InstantSiteHeroSection } from "@/components/services/instant-site/hero-section";
import { TargetSection } from "@/components/services/instant-site/target-section";
import { WhyAffordableSection } from "@/components/services/instant-site/why-affordable-section";
import { DeliverableSection } from "@/components/services/instant-site/deliverable-section";
import { ProcessSection } from "@/components/services/instant-site/process-section";
import { PricingSection } from "@/components/services/instant-site/pricing-section";
import { TechSpecsSection } from "@/components/services/instant-site/tech-specs-section";
import { TestimonialsSection } from "@/components/services/instant-site/testimonials-section";
import { FAQSection } from "@/components/services/instant-site/faq-section";
import { BackgroundImageCTA } from "@/components/ui/background-image-cta";

// ページ設定
const pageConfig = createWebDevelopmentServiceConfig(
	"instant-site",
	"一夜城 - インスタントホームページ制作",
	"55,000円・当日公開。AI×プロの集中スプリントで「速い・安い・ちゃんと良い」を実現。半日〜1日で高品質なホームページを構築。Next.js × Cloudflare Pages でランニングコスト0円。北摂・北大阪エリアを中心に全国対応。",
	[
		"一夜城",
		"インスタント",
		"ホームページ制作",
		"即日公開",
		"55000円",
		"AI活用",
		"Next.js",
		"Cloudflare Pages",
		"ランニングコスト0円",
		"半日制作",
		"LP制作",
		"低価格",
		"高品質",
		"北摂",
		"大阪",
	],
	{ revalidate: 7200 } // 2 hours
);

export const metadata = generateServiceMetadata(pageConfig);
export const viewport = serviceViewport;

// キャッシュ設定
export const revalidate = 7200; // 2 hours

export default function InstantSitePage() {
	return (
		<ServicePageWrapper config={pageConfig}>
			<InstantSiteHeroSection />
			<TargetSection />
			<WhyAffordableSection />
			<DeliverableSection />
			<ProcessSection />
			<PricingSection />
			<TechSpecsSection />
			<TestimonialsSection />
			<FAQSection />
			<BackgroundImageCTA
				backgroundImage="/dummy-images/street-photo-01.jpg"
				title="半日〜1日で、理想のホームページを"
				description="55,000円の明朗会計。AI×プロのタッグで「速い・安い・ちゃんと良い」を実現します。"
				primaryButtonText="初回相談（ワンコイン）を予約"
				secondaryButtonText="料金詳細を見る"
				primaryButtonHref="/contact?service=instant-site"
				secondaryButtonHref="/services/web-development/instant-site#pricing"
			/>
		</ServicePageWrapper>
	);
}