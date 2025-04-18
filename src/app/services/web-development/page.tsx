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
import { META } from "@/lib/constants";
import { createBreadcrumbs } from "@/lib/utils";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

// ページ固有の定数を定義
const PAGE_PATH = "/services/web-development";
const PAGE_TITLE = "ウェブ制作";

export const metadata: Metadata = generateMetadata({
	title: PAGE_TITLE,
	description:
		"最新の技術とデザインを活かした高品質なウェブサイト制作サービスを提供します。コーポレートサイト、ECサイト、ブログなど様々なニーズに対応可能です。",
	keywords: [
		"ウェブ制作",
		"ウェブ開発",
		"ホームページ制作",
		"Webデザイン",
		"コーポレートサイト",
		"レスポンシブデザイン",
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
				description="最新の技術とデザインを活かした高品質なウェブサイト制作サービスを提供します。"
				url={`${META.SITE_URL}${PAGE_PATH}`}
			/>
			<BreadcrumbJsonLd items={jsonLdBreadcrumbs} />
			<Container className="mt-8">
				<Breadcrumb items={uiBreadcrumbs} />
			</Container>

			<div className="text-center">
				<h1 className="text-3xl font-bold mb-2">ウェブ制作サービス</h1>
				<p className="text-muted-foreground">
					お客様のビジネスを成功に導く高品質なウェブサイト制作
				</p>
			</div>

			<Container className="mt-8" paddingY="lg">
				<ColumnLayout variant="2col-right" gap="gap-12">
					<ColumnLayout.Main className="md:w-3/4">
						<div className="relative w-full h-64 md:h-80">
							<Image
								src="/dummy-images/street-photo-01.jpg"
								alt="ウェブ開発のイメージ"
								fill
								className="object-cover"
								priority
							/>
						</div>

						<h2 className="text-2xl font-bold mt-6">サービス概要</h2>
						<p className="text-muted-foreground mt-4">
							当社のウェブ制作サービスでは、お客様のビジネス目標を達成するための最適なウェブサイトを構築します。
							最新の技術とトレンドを取り入れながら、使いやすさとデザイン性を両立したサイト制作を行っています。
						</p>

						<h2 className="text-2xl font-bold mt-8">ウェブ制作の特徴</h2>
						<ContentItems
							items={[
								{
									title: "レスポンシブデザイン",
									description:
										"あらゆるデバイスで最適な表示を実現するレスポンシブデザインを標準対応。スマートフォン、タブレット、PCなど、どの環境でも美しく機能的なサイトをご提供します。",
									image: "/dummy-images/street-photo-01.jpg",
									imageAlt: "レスポンシブデザインのイメージ",
								},
								{
									title: "SEO対策",
									description:
										"検索エンジン最適化を考慮した構造設計により、Googleなどの検索エンジンで上位表示されやすいサイト構築を行います。メタタグの最適化や構造化データの実装も対応。",
									image: "/dummy-images/street-photo-02.jpg",
									imageAlt: "SEO対策のイメージ",
								},
								{
									title: "高速表示",
									description:
										"最新のNext.jsなどのフレームワークを活用し、高速表示を実現。ユーザー体験を向上させるとともに、離脱率の低減にも貢献します。",
									image: "/dummy-images/street-photo-03.jpg",
									imageAlt: "高速表示のイメージ",
								},
								{
									title: "セキュリティ対策",
									description:
										"HTTPS対応やセキュリティ脆弱性対策など、安全なウェブサイト運用に必要な対策を実施。お客様とユーザーの大切な情報を守ります。",
									image: "/dummy-images/street-photo-04.jpg",
									imageAlt: "セキュリティ対策のイメージ",
								},
							]}
							columns={2}
							className="mt-6"
							imageHeight={180}
						/>

						<h2 className="text-2xl font-bold mt-8">制作実績</h2>
						<p>
							これまで多くの企業様のウェブサイト制作をサポートしてきました。コーポレートサイト、ECサイト、ランディングページなど、様々なタイプのサイト制作に対応可能です。
						</p>

						<Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-0 mt-8">
							<CardContent className="py-6">
								<div className="text-center">
									<span className="text-xl font-bold text-primary">
										無料お見積り・ご相談受付中
									</span>
									<p className="mt-2 text-base text-muted-foreground">
										ウェブサイト制作についてのご質問やお見積りなど、お気軽にお問い合わせください。
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
