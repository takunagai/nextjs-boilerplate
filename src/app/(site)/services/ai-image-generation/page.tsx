import type { Metadata } from "next";
import { AIImageHero } from "@/components/services/ai-image/ai-image-hero";
import { AIImageStrengths } from "@/components/services/ai-image/ai-image-strengths";
import { ServiceCapabilities } from "@/components/services/ai-image/service-capabilities";
import { UseCases } from "@/components/services/ai-image/use-cases";
import { QualityAssurance } from "@/components/services/ai-image/quality-assurance";
import { ProfessionalTools } from "@/components/services/ai-image/professional-tools";
import { AIPricingPlans } from "@/components/services/ai-image/ai-pricing-plans";
import { AIWorkflow } from "@/components/services/ai-image/ai-workflow";
import { AIPortfolioGallery } from "@/components/services/ai-image/ai-portfolio-gallery";
import { AITestimonials } from "@/components/services/ai-image/ai-testimonials";
import { AIFAQ } from "@/components/services/ai-image/ai-faq";
import { RelatedServices } from "@/components/services/ai-image/related-services";
import { AICta } from "@/components/services/ai-image/ai-cta";

export const metadata: Metadata = {
	title: "AI画像生成・画像補正サービス | プロ品質のAI画像制作",
	description:
		"デザイナーの技術とAIの力で理想の画像を創造。写真加工・画像補正からAI画像生成まで、プロ品質の仕上がりをお約束します。",
	keywords: [
		"AI画像生成",
		"画像補正",
		"写真加工",
		"AI画像",
		"画像編集",
		"アップスケール",
		"写真復元",
		"イラスト生成",
		"画像制作",
	],
	openGraph: {
		title: "AI画像生成・画像補正サービス | プロ品質のAI画像制作",
		description:
			"デザイナーの技術とAIの力で理想の画像を創造。プロ品質の仕上がりをお約束します。",
		type: "website",
	},
};

export default function AIImageGenerationPage() {
	return (
		<>
			<AIImageHero />
			<AIImageStrengths />
			<ServiceCapabilities />
			<UseCases />
			<QualityAssurance />
			<ProfessionalTools />
			<AIPricingPlans />
			<AIWorkflow />
			<AIPortfolioGallery />
			<AITestimonials />
			<AIFAQ />
			<RelatedServices />
			<AICta />
		</>
	);
}
