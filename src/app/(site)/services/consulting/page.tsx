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
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { HeroWithBreadcrumb } from "@/components/ui/hero-with-breadcrumb";
import { META } from "@/lib/constants";
import { createBreadcrumbs } from "@/lib/utils";

const PAGE_PATH = "/services/consulting";
const PAGE_TITLE = "コンサルティング";

export const metadata: Metadata = generateMetadata({
	title: PAGE_TITLE,
	description:
		"ビジネス課題を解決するためのITコンサルティングサービスを提供します。デジタルトランスフォーメーションの推進をサポートし、企業の成長を支援します。",
	keywords: [
		"コンサルティング",
		"ITコンサルティング",
		"デジタルトランスフォーメーション",
		"DX",
		"ビジネス改善",
		"システム導入",
	],
	canonical: PAGE_PATH,
});

export const viewport = generateViewport();

export default function ConsultingPage() {
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
				description="ビジネス課題を解決するためのITコンサルティングサービスを提供します。"
				url={`${META.SITE_URL}${PAGE_PATH}`}
			/>
			<BreadcrumbJsonLd items={jsonLdBreadcrumbs} />

			<HeroWithBreadcrumb
				breadcrumbItems={uiBreadcrumbs}
				title="コンサルティングサービス"
				description="ビジネス成長を支援するITコンサルティング"
			/>

			<Container className="mt-8" paddingY="lg">
				<ColumnLayout variant="2col-right" gap="gap-12">
					<ColumnLayout.Main className="md:w-3/4">
						<div className="relative w-full h-64 md:h-80">
							<Image
								src="/dummy-images/street-photo-03.jpg"
								alt="コンサルティングのイメージ"
								fill
								className="object-cover"
								priority
							/>
						</div>

						<h2 className="text-2xl font-bold mt-6">サービス概要</h2>
						<p className="text-muted-foreground mt-4">
							当社のコンサルティングサービスでは、お客様のビジネス課題を分析し、最適なITソリューションを提案します。
							デジタルトランスフォーメーションの推進から、業務効率化、新規事業立ち上げまで、包括的なサポートを提供します。
						</p>

						<h2 className="text-2xl font-bold mt-8">コンサルティングの特徴</h2>
						<ContentItems
							items={[
								{
									title: "現状分析・課題抽出",
									description:
										"お客様のビジネス現状を詳細に分析し、潜在的な課題や改善点を明確にします。データドリブンなアプローチで、定量的な評価を行います。",
									image: "/dummy-images/street-photo-01.jpg",
									imageAlt: "現状分析のイメージ",
								},
								{
									title: "DX戦略立案",
									description:
										"デジタルトランスフォーメーションの戦略を策定し、段階的な実行計画を提案します。ROIを重視した現実的なロードマップを作成します。",
									image: "/dummy-images/street-photo-02.jpg",
									imageAlt: "DX戦略のイメージ",
								},
								{
									title: "システム導入支援",
									description:
										"最適なシステムの選定から導入、運用開始まで一貫してサポートします。既存システムとの連携も考慮した提案を行います。",
									image: "/dummy-images/street-photo-03.jpg",
									imageAlt: "システム導入のイメージ",
								},
								{
									title: "継続的改善",
									description:
										"導入後も継続的な改善提案を行い、お客様のビジネス成長をサポートします。定期的な効果測定と最適化を実施します。",
									image: "/dummy-images/street-photo-04.jpg",
									imageAlt: "継続的改善のイメージ",
								},
							]}
							columns={2}
							className="mt-6"
							imageHeight={180}
						/>

						<h2 className="text-2xl font-bold mt-8">実績・事例</h2>
						<p>
							製造業、小売業、サービス業など、様々な業界でのコンサルティング実績があります。
							売上向上、コスト削減、業務効率化など、具体的な成果をお客様と一緒に実現してきました。
						</p>

						<Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-0 mt-8">
							<CardContent className="py-6">
								<div className="text-center">
									<span className="text-xl font-bold text-primary">
										無料相談実施中
									</span>
									<p className="mt-2 text-base text-muted-foreground">
										コンサルティングサービスについてのご相談やお見積りなど、お気軽にお問い合わせください。
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