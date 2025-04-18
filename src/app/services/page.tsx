import {
	BreadcrumbJsonLd,
	generateMetadata,
	generateViewport,
	WebsiteJsonLd,
} from "@/components/seo";
import { ContentItems } from "@/components/services/content-items"; // 追加
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { META } from "@/lib/constants";
import { createBreadcrumbs } from "@/lib/utils";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = generateMetadata({
	title: "サービス",
	description:
		"ウェブ制作・アプリ開発・コンサルティングなど多彩なサービスを提供しています。",
	keywords: ["サービス", "ウェブ制作", "アプリ開発", "コンサルティング"],
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
				description="ウェブ制作・アプリ開発・コンサルティングなど多彩なサービスを提供しています。"
				url={`${META.SITE_URL}/services`}
			/>
			<BreadcrumbJsonLd items={jsonLdBreadcrumbs} />
			<Container className="mt-8">
				<Breadcrumb items={uiBreadcrumbs} />
			</Container>

			<div className="text-center">
				<h1 className="text-3xl font-bold mb-2">サービス</h1>
				<p className="text-muted-foreground">弊社のサービスをご紹介します。</p>
			</div>

			<Container className="mt-8" width="lg">
				<p className="text-2xl font-bold">
					お客様のビジネスを成功に導く多彩なサービスを提供しています。
				</p>
				<ul className="mt-6 list-disc list-inside space-y-2">
					<li>最新技術を活用した高品質なウェブサイト・アプリ開発</li>
					<li>UI/UX設計から運用・保守までワンストップ対応</li>
					<li>ビジネス課題を解決するコンサルティングサービス</li>
				</ul>

				<div className="mt-8">
					<ContentItems
						items={[
							{
								title: "ウェブ制作",
								description:
									"最新の技術とデザインを活かした高品質なウェブサイト制作サービスを提供します。コーポレートサイト、ECサイトなど様々なニーズに対応します。",
								image: "/dummy-images/street-photo-01.jpg",
								imageAlt: "ウェブ制作のイメージ",
								link: {
									href: "/services/web-development",
									text: "詳細を見る →",
								},
							},
							{
								title: "アプリ開発",
								description:
									"iOS/Android対応のネイティブアプリから、クロスプラットフォームアプリまで、幅広いモバイルアプリケーション開発サービスを提供します。",
								image: "/dummy-images/street-photo-02.jpg",
								imageAlt: "アプリ開発のイメージ",
								link: {
									href: "/services/app-development",
									text: "詳細を見る →",
								},
							},
							{
								title: "コンサルティング",
								description:
									"ビジネス課題を解決するためのITコンサルティングサービスを提供します。デジタルトランスフォーメーションの推進をサポートします。",
								image: "/dummy-images/street-photo-03.jpg",
								imageAlt: "コンサルティングのイメージ",
								link: {
									href: "/services/consulting",
									text: "詳細を見る →",
								},
							},
						]}
						columns={3}
						className="gap-6"
						imageHeight={200}
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
