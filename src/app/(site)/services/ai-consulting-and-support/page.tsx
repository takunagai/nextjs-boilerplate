import type { Metadata } from "next";
import {
	BreadcrumbJsonLd,
	generateMetadata,
	generateViewport,
	WebsiteJsonLd,
} from "@/components/seo";
import { ConsultingBenefitsSection } from "@/components/services/ai-consulting-and-support/benefits-section";
import { BackgroundImageCTA } from "@/components/ui/background-image-cta";
import { ConsultingHeroSection } from "@/components/services/ai-consulting-and-support/hero-section";
import { ConsultingPricingSection } from "@/components/services/ai-consulting-and-support/pricing-section";
import { ConsultingProblemsAndRecommendedSection } from "@/components/services/ai-consulting-and-support/problems-and-recommended-section";
import { ConsultingServiceMenuSection } from "@/components/services/ai-consulting-and-support/service-menu-section";
import { ConsultingTransformationSection } from "@/components/services/ai-consulting-and-support/transformation-section";
import { ConsultingWhyAISection } from "@/components/services/ai-consulting-and-support/why-ai-section";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { META } from "@/lib/constants";
import { createBreadcrumbs } from "@/lib/utils";

// ページ固有の定数を定義
const PAGE_PATH = "/services/ai-consulting-and-support";
const PAGE_TITLE = "AIコンサル＆サポート";

export const metadata: Metadata = generateMetadata({
	title: PAGE_TITLE,
	description:
		"AIの「？」を「！」に変える、あなた専用のサポーター。AI初心者から上級者まで、スポット相談、AIライティング指南、プロンプト作成講座、1対1コンサルなど、あなたのペースでAI活用法を学べるサービス。テスター特別価格で先着10名様限定受付中。",
	keywords: [
		"AI",
		"コンサルティング",
		"レクチャー",
		"ChatGPT",
		"Claude",
		"プロンプトエンジニアリング",
		"AIライティング",
		"AI学習",
		"AI活用",
		"スポット相談",
	],
	canonical: PAGE_PATH,
});

export const viewport = generateViewport();

export default function ConsultingPage() {
	// パンくずリストのデータを定義
	const breadcrumbItems = [
		{ title: "ホーム", path: "/" },
		{ title: "サービス", path: "/services" },
		{ title: PAGE_TITLE, path: PAGE_PATH, current: true },
	];
	const { ui: uiBreadcrumbs, jsonLd: jsonLdBreadcrumbs } =
		createBreadcrumbs(breadcrumbItems);

	return (
		<>
			<WebsiteJsonLd
				name={`${PAGE_TITLE} | ${META.DEFAULT_TITLE}`}
				description="AIの「？」を「！」に変える、あなた専用のサポーター。AI学習からビジネス活用まで幅広くサポート。"
				url={`${META.SITE_URL}${PAGE_PATH}`}
			/>
			<BreadcrumbJsonLd items={jsonLdBreadcrumbs} />
			<Container paddingY={"none"}>
				<Breadcrumb items={uiBreadcrumbs} />
			</Container>

			<main className="flex min-h-screen flex-col">
				<ConsultingHeroSection />
				<ConsultingProblemsAndRecommendedSection />
				<ConsultingWhyAISection />
				<ConsultingServiceMenuSection />
				<ConsultingPricingSection />
				<ConsultingTransformationSection />
				<ConsultingBenefitsSection />
				<BackgroundImageCTA
					backgroundImage="/dummy-images/photo-07.jpg"
					title="AIの「？」を「！」に変える、あなた専用サポーター"
					description="AI初心者から上級者まで、あなたのペースでAI活用法を学べます。テスター特別価格で先着10名様限定。"
					primaryButtonText="無料相談を予約"
					secondaryButtonText="学習メニューを見る"
					primaryButtonHref="/contact"
					secondaryButtonHref="/services/ai-consulting-and-support#services"
				/>
			</main>
		</>
	);
}
