import type { Metadata } from "next";
import { PhotographyHero } from "@/components/services/photography/photography-hero";
import { ServiceStrengths } from "@/components/services/photography/service-strengths";
import { PhotographyGenres } from "@/components/services/photography/photography-genres";
import { TargetAudience } from "@/components/services/photography/target-audience";
import { ImageEditingService } from "@/components/services/photography/image-editing-service";
import { EquipmentSection } from "@/components/services/photography/equipment-section";
import { PricingPlans } from "@/components/services/photography/pricing-plans";
import { WorkflowTimeline } from "@/components/services/photography/workflow-timeline";
import { PhotographyGallery } from "@/components/services/photography/photography-gallery";
import { PhotographyFAQ } from "@/components/services/photography/photography-faq";
import { Testimonials } from "@/components/services/photography/testimonials";
import { PhotographyCTA } from "@/components/services/photography/photography-cta";

export const metadata: Metadata = {
	title: "写真撮影サービス | デザイナー視点のビジネス写真撮影",
	description:
		"プロ品質の写真撮影を適正価格で。人物・商品・料理・店舗写真まで、デザイナー視点で魅力的に撮影します。撮影から画像補正まで一括対応。",
	keywords: [
		"写真撮影",
		"商品撮影",
		"人物撮影",
		"料理撮影",
		"店舗撮影",
		"画像補正",
		"格安撮影",
		"ビジネス写真",
	],
	openGraph: {
		title: "写真撮影サービス | デザイナー視点のビジネス写真撮影",
		description:
			"プロ品質の写真撮影を適正価格で。デザイナー視点で魅力的に撮影します。",
		type: "website",
	},
};

export default function PhotographyServicePage() {
	return (
		<>
			<PhotographyHero />
			<ServiceStrengths />
			<PhotographyGenres />
			<TargetAudience />
			<ImageEditingService />
			<EquipmentSection />
			<PricingPlans />
			<WorkflowTimeline />
			<PhotographyGallery />
			<Testimonials />
			<PhotographyFAQ />
			<PhotographyCTA />
		</>
	);
}
