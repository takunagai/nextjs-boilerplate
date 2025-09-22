import {
	ServicePageWrapper,
	createWebDevelopmentServiceConfig,
	generateServiceMetadata,
	serviceViewport,
} from "@/components/services/shared/service-page-wrapper";
import { JamstackHeroSection } from "@/components/services/jamstack/hero-section";
import { JamstackFeaturesSection } from "@/components/services/jamstack/features-section";
import { JamstackProcessSection } from "@/components/services/jamstack/process-section";
import { JamstackPricingSection } from "@/components/services/jamstack/pricing-section";
import { JamstackTechStackSection } from "@/components/services/jamstack/tech-stack-section";
import { JamstackPortfolioSection } from "@/components/services/jamstack/portfolio-section";
import { JamstackFAQSection } from "@/components/services/jamstack/faq-section";
import { BackgroundImageCTA } from "@/components/ui/background-image-cta";

// ページ設定
const pageConfig = createWebDevelopmentServiceConfig(
	"jamstack",
	"Jamstackサイト制作(Next.js) - 高速・安全・SEO最適化",
	"Next.js × 静的生成でパフォーマンス最大化。AIと15年の経験でモダンなJamstackサイトを構築。高速表示・SEO強化・セキュリティ重視で企業サイト・ブログ・ポートフォリオに最適。北摂・北大阪エリアを中心に全国対応。",
	[
		"Jamstack",
		"Next.js",
		"静的サイト生成",
		"SSG",
		"高速表示",
		"SEO最適化",
		"React",
		"TypeScript",
		"Vercel",
		"Cloudflare",
		"モダン開発",
		"パフォーマンス",
		"セキュリティ",
		"企業サイト",
		"ブログ",
		"ポートフォリオ",
		"北摂",
		"大阪",
	],
	{ revalidate: 7200 } // 2 hours
);

export const metadata = generateServiceMetadata(pageConfig);
export const viewport = serviceViewport;

// キャッシュ設定
export const revalidate = 7200; // 2 hours

export default function JamstackPage() {
	return (
		<ServicePageWrapper config={pageConfig}>
			<JamstackHeroSection />
			<JamstackFeaturesSection />
			<JamstackProcessSection />
			<JamstackPricingSection />
			<JamstackTechStackSection />
			<JamstackPortfolioSection />
			<JamstackFAQSection />
			<BackgroundImageCTA
				backgroundImage="/dummy-images/modern-office-01.jpg"
				title="次世代Web技術で、未来を先取り"
				description="Jamstack×AIで実現する高速・安全・拡張性のあるWebサイト。貴社のデジタル変革をサポートします。"
				primaryButtonText="無料相談を予約"
				secondaryButtonText="制作事例を見る"
				primaryButtonHref="/contact?service=jamstack"
				secondaryButtonHref="/services/web-development/jamstack#portfolio"
			/>
		</ServicePageWrapper>
	);
}