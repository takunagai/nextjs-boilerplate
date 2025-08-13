import type { Metadata } from "next";
import { CreativeAITruthSection } from "@/components/services/creative/ai-truth-section";
import { CreativeFinalCTASection } from "@/components/services/creative/final-cta-section";
import { CreativeHeroSection } from "@/components/services/creative/hero-section";
import { CreativePricingSection } from "@/components/services/creative/pricing-section";
import { CreativeReasonsSection } from "@/components/services/creative/reasons-section";
import { CreativeRecommendedForSection } from "@/components/services/creative/recommended-for-section";
import { CreativeSampleGallerySection } from "@/components/services/creative/sample-gallery-section";
import { CreativeServiceMenuSection } from "@/components/services/creative/service-menu-section";

export const metadata: Metadata = {
	title:
		"AIを活用したクリエイティブサービス | AI × 人の感性でプロ級コンテンツ制作",
	description:
		"AIの創造力と人の感性を掛け合わせた革新的なクリエイティブサービス。ライティング、画像生成、動画制作、サウンド生成まで、高品質なのに驚きの低価格でご提供。テスター特別価格で先着10名様限定50%OFF。",
	keywords: [
		"AI クリエイティブ",
		"画像生成",
		"動画制作",
		"ライティング",
		"サウンド生成",
		"コンテンツ制作",
		"デザイン",
		"SNS投稿",
		"ブログ記事",
		"低価格",
		"高品質",
	],
	openGraph: {
		title:
			"AIを活用したクリエイティブサービス | AI × 人の感性でプロ級コンテンツ制作",
		description:
			"AIの創造力と人の感性を掛け合わせた革新的なクリエイティブサービス。高品質なのに驚きの低価格でご提供。",
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
			<CreativeAITruthSection />
			<CreativeRecommendedForSection />
			<CreativeServiceMenuSection />
			<CreativePricingSection />
			<CreativeReasonsSection />
			<CreativeSampleGallerySection />
			<CreativeFinalCTASection />
		</main>
	);
}
