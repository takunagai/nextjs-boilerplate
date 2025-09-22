import type { Metadata } from "next";
import {
	BreadcrumbJsonLd,
	generateMetadata,
	generateViewport,
	WebsiteJsonLd,
} from "@/components/seo";
import { InstantSiteHeroSection } from "@/components/services/instant-site/hero-section";
import { TargetSection } from "@/components/services/instant-site/target-section";
import { WhyAffordableSection } from "@/components/services/instant-site/why-affordable-section";
import { DeliverableSection } from "@/components/services/instant-site/deliverable-section";
import { ProcessSection } from "@/components/services/instant-site/process-section";
import { PricingSection } from "@/components/services/instant-site/pricing-section";
import { TechSpecsSection } from "@/components/services/instant-site/tech-specs-section";
import { TestimonialsSection } from "@/components/services/instant-site/testimonials-section";
import { FAQSection } from "@/components/services/instant-site/faq-section";
import { BackgroundImageCTA } from "@/components/ui/background-image-cta";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { META } from "@/lib/constants";
import { createBreadcrumbs } from "@/lib/utils";

// ページ固有の定数を定義
const PAGE_PATH = "/services/web-development/instant-site";
const PAGE_TITLE = "一夜城 - インスタントホームページ制作";

export const metadata: Metadata = generateMetadata({
	title: PAGE_TITLE,
	description:
		"55,000円・当日公開。AI×プロの集中スプリントで「速い・安い・ちゃんと良い」を実現。半日〜1日で高品質なホームページを構築。Next.js × Cloudflare Pages でランニングコスト0円。北摂・北大阪エリアを中心に全国対応。",
	keywords: [
		"一夜城",
		"インスタント",
		"ホームページ制作",
		"即日公開",
		"55000円",
		"AI活用",
		"Next.js",
		"Cloudflare Pages",
		"ランニングコスト0円",
		"半日制作",
		"LP制作",
		"低価格",
		"高品質",
		"北摂",
		"大阪",
	],
	canonical: PAGE_PATH,
});

export const viewport = generateViewport();

// キャッシュ設定
export const revalidate = 7200; // 2 hours

export default function InstantSitePage() {
	// パンくずリストのデータを定義
	const breadcrumbItems = [
		{ title: "ホーム", path: "/" },
		{ title: "サービス", path: "/services" },
		{ title: "ウェブ制作・アプリ開発", path: "/services/web-development" },
		{ title: PAGE_TITLE, path: PAGE_PATH, current: true },
	];
	const { ui: uiBreadcrumbs, jsonLd: jsonLdBreadcrumbs } =
		createBreadcrumbs(breadcrumbItems);

	return (
		<>
			<WebsiteJsonLd
				name={`${PAGE_TITLE} | ${META.DEFAULT_TITLE}`}
				description="55,000円・当日公開。AI×プロの集中スプリントで高品質なホームページを半日〜1日で制作。ランニングコスト0円を実現。"
				url={`${META.SITE_URL}${PAGE_PATH}`}
			/>
			<BreadcrumbJsonLd items={jsonLdBreadcrumbs} />
			<Container paddingY={"none"}>
				<Breadcrumb items={uiBreadcrumbs} />
			</Container>

			<main className="flex min-h-screen flex-col">
				<InstantSiteHeroSection />
				<TargetSection />
				<WhyAffordableSection />
				<DeliverableSection />
				<ProcessSection />
				<PricingSection />
				<TechSpecsSection />
				<TestimonialsSection />
				<FAQSection />
				<BackgroundImageCTA
					backgroundImage="/dummy-images/street-photo-01.jpg"
					title="半日〜1日で、理想のホームページを"
					description="55,000円の明朗会計。AI×プロのタッグで「速い・安い・ちゃんと良い」を実現します。"
					primaryButtonText="初回相談（ワンコイン）を予約"
					secondaryButtonText="料金詳細を見る"
					primaryButtonHref="/contact?service=instant-site"
					secondaryButtonHref="/services/web-development/instant-site#pricing"
				/>
			</main>
		</>
	);
}