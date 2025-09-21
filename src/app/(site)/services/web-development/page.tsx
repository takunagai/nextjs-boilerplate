import type { Metadata } from "next";
import {
	BreadcrumbJsonLd,
	generateMetadata,
	generateViewport,
	WebsiteJsonLd,
} from "@/components/seo";
import { WebDevHeroSection } from "@/components/services/web-development/hero-section";
import { WhyChooseSection } from "@/components/services/web-development/why-choose-section";
import { StrengthsSection } from "@/components/services/web-development/strengths-section";
import { ServiceMenuSection } from "@/components/services/web-development/service-menu-section";
import { ProcessSection } from "@/components/services/web-development/process-section";
import { PricingSection } from "@/components/services/web-development/pricing-section";
import { FAQSection } from "@/components/services/web-development/faq-section";
import { FinalCTASection } from "@/components/services/web-development/final-cta-section";
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
		"AIと経験を活かして、良いものを手が届く価格で。15年のウェブ制作経験とAIを組み合わせることで、制作時間を短縮しながら丁寧な仕上がりをお約束します。WordPressからNext.jsまで幅広く対応。お試し価格で先着10名様。",
	keywords: [
		"AI",
		"ウェブ制作",
		"アプリ開発",
		"Next.js",
		"WordPress",
		"ホームページ制作",
		"リニューアル",
		"お手頃価格",
		"高品質",
		"経験豊富",
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
				description="AIと経験を活かして、良いものを手が届く価格で。15年のウェブ制作経験とAIを組み合わせて、丁寧な仕上がりをお約束します。"
				url={`${META.SITE_URL}${PAGE_PATH}`}
			/>
			<BreadcrumbJsonLd items={jsonLdBreadcrumbs} />
			<Container paddingY={"none"}>
				<Breadcrumb items={uiBreadcrumbs} />
			</Container>

			<main className="flex min-h-screen flex-col">
				<WebDevHeroSection />
				<WhyChooseSection />
				<StrengthsSection />
				<ServiceMenuSection />
				<ProcessSection />
				<PricingSection />
				<FAQSection />
				<FinalCTASection />
			</main>
		</>
	);
}
