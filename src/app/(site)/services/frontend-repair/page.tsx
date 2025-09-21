import type { Metadata } from "next";
import {
	BreadcrumbJsonLd,
	generateMetadata,
	generateViewport,
	WebsiteJsonLd,
} from "@/components/seo";
import { FrontendRepairHeroSection } from "@/components/services/frontend-repair/hero-section";
import { ServiceOverviewSection } from "@/components/services/frontend-repair/service-overview-section";
import { RecommendedForSection } from "@/components/services/frontend-repair/recommended-for-section";
import { PricingSection } from "@/components/services/frontend-repair/pricing-section";
import { ProcessSection } from "@/components/services/frontend-repair/process-section";
import { FinalCTASection } from "@/components/services/frontend-repair/final-cta-section";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { META } from "@/lib/constants";
import { createBreadcrumbs } from "@/lib/utils";

// ページ固有の定数を定義
const PAGE_PATH = "/services/frontend-repair";
const PAGE_TITLE = "フロントエンドリペア";

export const metadata: Metadata = generateMetadata({
	title: PAGE_TITLE,
	description:
		"AI で作ったサイト、そのままで大丈夫？React/Next.js コードの品質向上、デザインブラッシュアップ、デプロイ支援まで。プロが最終調整して安心してリリースできる状態に仕上げます。まずは無料診断から。",
	keywords: [
		"フロントエンドリペア",
		"React",
		"Next.js",
		"コード修正",
		"バグ修正",
		"デザインブラッシュアップ",
		"AI生成コード",
		"品質向上",
		"レスポンシブ対応",
		"デプロイ支援",
		"無料診断",
		"TypeScript対応",
	],
	canonical: PAGE_PATH,
});

export const viewport = generateViewport();

export default function FrontendRepairPage() {
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
				description="AI で作ったサイトをプロが最終調整。React/Next.js コードの品質向上、デザインブラッシュアップ、デプロイ支援まで安心してお任せください。"
				url={`${META.SITE_URL}${PAGE_PATH}`}
			/>
			<BreadcrumbJsonLd items={jsonLdBreadcrumbs} />
			<Container paddingY={"none"}>
				<Breadcrumb items={uiBreadcrumbs} />
			</Container>

			<main className="flex min-h-screen flex-col">
				<FrontendRepairHeroSection />
				<ServiceOverviewSection />
				<RecommendedForSection />
				<PricingSection />
				<ProcessSection />
				<FinalCTASection />
			</main>
		</>
	);
}