import type { Metadata } from "next";
import { CreativeAITruthSection } from "@/components/services/creative/ai-truth-section";
import { BackgroundImageCTA } from "@/components/ui/background-image-cta";
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
			<BackgroundImageCTA
				backgroundImage="/dummy-images/street-photo-04.jpg"
				title="AI × 人の感性で、あなたのクリエイティブを加速"
				description="画像・動画・音声・テキスト制作を革新的な価格で。テスター特別価格50%OFF、先着10名様限定。"
				primaryButtonText="無料相談を予約"
				secondaryButtonText="サンプルを見る"
				primaryButtonHref="/contact"
				secondaryButtonHref="/services/creative#gallery"
			/>
		</main>
	);
}
