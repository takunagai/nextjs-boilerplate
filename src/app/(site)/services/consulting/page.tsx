import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ColumnLayout from "@/components/layout/column-layout";
import {
	BreadcrumbJsonLd,
	generateMetadata,
	generateViewport,
	WebsiteJsonLd,
} from "@/components/seo";
import { ContentItems } from "@/components/services/content-items";
import { ServiceSidebar } from "@/components/services/service-sidebar";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { META } from "@/lib/constants";
import { createBreadcrumbs } from "@/lib/utils";

// ページ固有の定数を定義
const PAGE_PATH = "/services/consulting";
const PAGE_TITLE = "コンサルティング";

export const metadata: Metadata = generateMetadata({
	title: PAGE_TITLE,
	description:
		"ITコンサルティングサービスでビジネスの成長をサポートします。デジタル変革、システム導入、業務効率化など幅広い分野でのコンサルティングを提供しています。",
	keywords: [
		"コンサルティング",
		"ITコンサルティング",
		"デジタル変革",
		"DX",
		"システム導入",
		"業務効率化",
		"経営支援",
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
				description="ITコンサルティングサービスでビジネスの成長をサポートします。"
				url={`${META.SITE_URL}${PAGE_PATH}`}
			/>
			<BreadcrumbJsonLd items={jsonLdBreadcrumbs} />
			<div className="text-center">
				<PageHeader 
					title="コンサルティングサービス" 
					overlayBreadcrumbs={uiBreadcrumbs}
				/>
				<p className="text-muted-foreground">
					お客様のビジネス成長を支援するITコンサルティング
				</p>
			</div>

			<Container className="mt-8" paddingY="lg">
				<ColumnLayout variant="2col-right" gap="gap-12">
					<ColumnLayout.Main className="md:w-3/4">
						<div className="relative w-full h-64 md:h-80">
							<Image
								src="/dummy-images/street-photo-02.jpg"
								alt="コンサルティングのイメージ"
								fill
								className="object-cover"
								priority
							/>
						</div>

						<h2 className="text-2xl font-bold mt-6">サービス概要</h2>
						<p className="text-muted-foreground mt-4">
							当社のITコンサルティングサービスでは、お客様のビジネス課題を深く理解し、最適なソリューションを提案します。
							デジタル変革の推進から業務効率化、新規事業の立ち上げまで、幅広い分野でのコンサルティングを行っています。
						</p>

						<h2 className="text-2xl font-bold mt-8">コンサルティングの特徴</h2>
						<ContentItems
							items={[
								{
									title: "デジタル変革（DX）支援",
									description:
										"既存のビジネスプロセスをデジタル化し、効率性と競争力を向上させます。最新技術の導入から組織変革まで、包括的なDX支援を行います。",
									image: "/dummy-images/street-photo-01.jpg",
									imageAlt: "デジタル変革のイメージ",
								},
								{
									title: "システム導入支援",
									description:
										"お客様の業務に最適なシステムの選定から導入、運用まで一貫してサポート。既存システムとの連携も考慮した最適な導入計画を策定します。",
									image: "/dummy-images/street-photo-02.jpg",
									imageAlt: "システム導入のイメージ",
								},
								{
									title: "業務効率化",
									description:
										"現在の業務プロセスを分析し、無駄を削減して効率化を図ります。RPAやワークフローシステムの導入により、大幅な工数削減を実現します。",
									image: "/dummy-images/street-photo-03.jpg",
									imageAlt: "業務効率化のイメージ",
								},
								{
									title: "IT戦略立案",
									description:
										"中長期的なIT戦略の策定を支援します。ビジネス目標に合わせたITロードマップの作成により、計画的なIT投資を実現します。",
									image: "/dummy-images/street-photo-04.jpg",
									imageAlt: "IT戦略のイメージ",
								},
							]}
							columns={2}
							className="mt-6"
							imageHeight={180}
						/>

						<h2 className="text-2xl font-bold mt-8">コンサルティング実績</h2>
						<p>
							これまで様々な業界・規模の企業様にコンサルティングサービスを提供してきました。
							製造業、小売業、サービス業など、業界特有の課題に対応した実績があります。
						</p>

						<Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-0 mt-8">
							<CardContent className="py-6">
								<div className="text-center">
									<span className="text-xl font-bold text-primary">
										無料相談・お見積り受付中
									</span>
									<p className="mt-2 text-base text-muted-foreground">
										ITコンサルティングについてのご相談やお見積りなど、お気軽にお問い合わせください。
									</p>
									<Link
										href="/contact"
										className="inline-block mt-4 px-6 py-2 bg-primary text-background rounded font-bold shadow hover:bg-primary/90 transition"
									>
										お問い合わせはこちら
									</Link>
								</div>
							</CardContent>
						</Card>
					</ColumnLayout.Main>
					<ColumnLayout.Right className="md:w-1/4">
						<ServiceSidebar currentPath={PAGE_PATH} />
					</ColumnLayout.Right>
				</ColumnLayout>
			</Container>
		</>
	);
}