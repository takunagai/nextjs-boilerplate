import type { Metadata } from "next";
import { BackgroundImageCTA } from "@/components/ui/background-image-cta";
import { CreativeHeroSection } from "@/components/services/creative/hero-section";
import { WorkExamplesSection } from "@/components/services/creative/work-examples-section";
import { DesignerAISection } from "@/components/services/creative/designer-ai-section";
import { AILimitationsSection } from "@/components/services/creative/ai-limitations-section";
import { CreativeReasonsSection } from "@/components/services/creative/reasons-section";
import { CreativeServiceMenuSection } from "@/components/services/creative/service-menu-section";
import { CreativePricingSection } from "@/components/services/creative/pricing-section";
import { CreativeSampleGallerySection } from "@/components/services/creative/sample-gallery-section";

export const metadata: Metadata = {
	title:
		"AIクリエイティブサービス | デザイナーの経験 × AI の力で高品質デザイン素材を制作",
	description:
		"15年のデザイン経験とAI技術を組み合わせた革新的なクリエイティブサービス。ロゴデザイン、画像生成、写真補正から動画制作まで、プロクオリティの素材をお手頃価格で提供。制作過程のレクチャーも対応。",
	keywords: [
		"AI クリエイティブ",
		"デザイナー",
		"画像生成",
		"ロゴデザイン",
		"写真補正",
		"バナーデザイン",
		"インフォグラフィック",
		"パッケージデザイン",
		"Photoshop",
		"Illustrator",
		"Midjourney",
		"DALL-E",
		"高品質",
		"低価格",
	],
	openGraph: {
		title:
			"AIクリエイティブサービス | デザイナーの経験 × AI の力で高品質デザイン素材を制作",
		description:
			"15年のデザイン経験とAI技術を組み合わせて、プロクオリティのデザイン素材をお手頃価格で提供。",
		type: "website",
	},
	alternates: {
		canonical: "/services/creative",
	},
};

export default function CreativePage() {
	return (
		<main className="flex min-h-screen flex-col">
			<CreativeHeroSection />
			<WorkExamplesSection />
			<DesignerAISection />
			<AILimitationsSection />
			<CreativeReasonsSection />
			<CreativeServiceMenuSection />
			<CreativePricingSection />
			<CreativeSampleGallerySection />
			<BackgroundImageCTA
				backgroundImage="/dummy-images/creative-workspace.jpg"
				title="デザイナーの経験 × AI の力で、あなたのクリエイティブを加速"
				description="プロクオリティのデザイン素材を、従来より大幅にお手頃な価格で。制作過程のレクチャーも対応します。"
				primaryButtonText="無料相談を予約"
				secondaryButtonText="作品を見る"
				primaryButtonHref="/contact"
				secondaryButtonHref="/services/creative#gallery"
			/>
		</main>
	);
}
