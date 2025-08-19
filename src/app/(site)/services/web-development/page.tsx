import type { Metadata } from "next";
import {
	BreadcrumbJsonLd,
	generateMetadata,
	generateViewport,
	WebsiteJsonLd,
} from "@/components/seo";
import { AffordableSection } from "@/components/services/web-development/affordable-section";
import { AIBenefitsSection } from "@/components/services/web-development/ai-benefits-section";
import { FinalCTASection } from "@/components/services/web-development/final-cta-section";
import { WebDevHeroSection } from "@/components/services/web-development/hero-section";
import { PortfolioLinkSection } from "@/components/services/web-development/portfolio-link-section";
import { PricingSection } from "@/components/services/web-development/pricing-section";
import { ProcessSection } from "@/components/services/web-development/process-section";
import { RecommendedForSection } from "@/components/services/web-development/recommended-for-section";
import { ServiceMenuSection } from "@/components/services/web-development/service-menu-section";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { META } from "@/lib/constants";
import { createBreadcrumbs } from "@/lib/utils";

// ページ固有の定数を定義
const PAGE_PATH = "/services/web-development";
const PAGE_TITLE = "ウェブ制作・アプリ開発";

export const metadata: Metadata = generateMetadata({
	title: PAGE_TITLE,
	description:
		"AI×15年の制作経験で高品質なのにお手頃価格を実現。Next.js + AI API での Web アプリ開発、WordPress + AI プラグインでのサイト制作、既存サイトのリニューアルまで対応。テスター特別価格で先着10名様限定受付中。",
	keywords: [
		"AI",
		"ウェブ制作",
		"アプリ開発",
		"Next.js",
		"WordPress",
		"AI API",
		"ホームページ制作",
		"リニューアル",
		"お手頃価格",
		"高品質",
	],
	canonical: PAGE_PATH,
});

export const viewport = generateViewport();

export default function WebDevelopmentPage() {
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
				description="AI×15年の制作経験で高品質なのにお手頃価格を実現。Next.js + AI API での Web アプリ開発から WordPress まで対応。"
				url={`${META.SITE_URL}${PAGE_PATH}`}
			/>
			<BreadcrumbJsonLd items={jsonLdBreadcrumbs} />
			<Container paddingY={"none"}>
				<Breadcrumb items={uiBreadcrumbs} />
			</Container>

			<main className="flex min-h-screen flex-col">
				<WebDevHeroSection />
				<AffordableSection />
				<RecommendedForSection />
				<ServiceMenuSection />
				<ProcessSection />
				<PricingSection />
				<AIBenefitsSection />
				<PortfolioLinkSection />
				<FinalCTASection />
			</main>
		</>
	);
}
