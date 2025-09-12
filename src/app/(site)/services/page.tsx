import {
	BreadcrumbJsonLd,
	generateMetadata,
	generateViewport,
	WebsiteJsonLd,
} from "@/components/seo";

// Route Segment Config for caching
export const revalidate = 7200; // 2時間キャッシュ（静的コンテンツ）

import { ContentItems } from "@/components/services/content-items"; // 追加
import { ServiceCategories } from "@/components/sections/service-categories";
import { portfolioCategories } from "@/lib/data/portfolio-data";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { META } from "@/lib/constants";
import { createBreadcrumbs } from "@/lib/utils";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = generateMetadata({
	title: "サービス",
	description:
		"AI × 人の感性で実現する、ウェブ制作・アプリ開発、AIコンサル&サポート、クリエイティブサービスを提供しています。",
	keywords: [
		"サービス",
		"ウェブ制作",
		"アプリ開発",
		"コンサルティング",
		"AI",
		"クリエイティブ",
	],
	canonical: "/services",
});

export const viewport = generateViewport();

export default function ServicesPage() {
	// パンくずリストのデータを定義
	const breadcrumbItems = [
		{ title: "ホーム", path: "/" },
		{ title: "サービス", path: "/services", current: true },
	];
	const { ui: uiBreadcrumbs, jsonLd: jsonLdBreadcrumbs } =
		createBreadcrumbs(breadcrumbItems);

	return (
		<>
			<WebsiteJsonLd
				name={`サービス | ${META.DEFAULT_TITLE}`}
				description="AI × 人の感性で実現する、ウェブ制作・アプリ開発、AIコンサル&サポート、クリエイティブサービスを提供しています。"
				url={`${META.SITE_URL}/services`}
			/>
			<BreadcrumbJsonLd items={jsonLdBreadcrumbs} />
			<Container paddingY={"none"}>
				<Breadcrumb items={uiBreadcrumbs} />
			</Container>

			<Container className="mt-8 text-center" width="lg">
				<PageHeader title="サービス" />
				<p className="text-muted-foreground">
					最新のAI技術と人間の創造性を組み合わせ、お客様のビジネス課題を解決する革新的なソリューションを提供しています。ウェブ制作からコンサルティング、クリエイティブ制作まで、幅広いサービスでお客様の成功をサポートします。
				</p>
			</Container>

			<Container className="mt-8" width="lg">
				<div className="mt-8">
					<ContentItems
						items={[
							{
								title: "ウェブ制作・アプリ開発",
								description:
									"AI を活用した効率的な制作で、高品質かつお手頃な価格を実現。\nお客様のニーズに合わせ、最適な構成を提案いたします。",
								image: "/images/service-web.jpg",
								imageAlt: "ウェブ制作・アプリ開発のイメージ",
								link: {
									href: "/services/web-development",
									text: "詳細を見る →",
								},
							},
							{
								title: "AIコンサル＆サポート",
								description:
									"AI活用による省力化、高品質化、アイデア出しなどをアドバイス。\nご相談者様の状況に合わせ、柔軟なサポートを提供します。",
								image: "/images/service-consulting.jpg",
								imageAlt: "AIコンサル＆サポートのイメージ",
								link: {
									href: "/services/ai-consulting-and-support",
									text: "詳細を見る →",
								},
							},
							{
								title: "クリエイティブ",
								description:
									"文章、写真、イラスト、図解、動画、音楽、3D…。\nAI x デザイナーで、短時間かつお手頃価格で高品質に仕上げます。",
								image: "/images/service-creative.jpg",
								imageAlt: "AIクリエイティブのイメージ",
								link: {
									href: "/services/creative",
									text: "詳細を見る →",
								},
							},
						]}
						columns={3}
						className="gap-8"
						aspectRatio="3/2"
					/>
				</div>

				{/* サービスカテゴリー */}
				<div className="mt-16">
					<ServiceCategories
						categories={portfolioCategories}
						titleLevel="h2"
						maxWidth="xl"
					/>
				</div>

				<div className="mt-12 py-6 px-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
					<div className="text-center">
						<span className="text-xl font-bold text-primary">
							無料相談受付中！
						</span>
						<p className="mt-2 text-base text-muted-foreground">
							ご相談・お見積りはお気軽にお問い合わせください。
						</p>
						<Link
							href="/contact"
							className="inline-block mt-4 px-6 py-2 bg-primary text-background rounded font-bold shadow hover:bg-primary/90 transition"
						>
							お問い合わせはこちら
						</Link>
					</div>
				</div>
			</Container>
		</>
	);
}
