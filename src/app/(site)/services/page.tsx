import type { Metadata } from "next";
import Link from "next/link";
import {
	BreadcrumbJsonLd,
	generateMetadata,
	generateViewport,
	WebsiteJsonLd,
} from "@/components/seo";
import { ContentItems } from "@/components/services/content-items"; // 追加
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { META } from "@/lib/constants";
import { createBreadcrumbs } from "@/lib/utils";

export const metadata: Metadata = generateMetadata({
	title: "サービス",
	description:
		"AI × 人の感性で実現する、ウェブ制作・アプリ開発、プチコンサル&レクチャー、クリエイティブサービスを提供しています。",
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
				description="AI × 人の感性で実現する、ウェブ制作・アプリ開発、プチコンサル&レクチャー、クリエイティブサービスを提供しています。"
				url={`${META.SITE_URL}/services`}
			/>
			<BreadcrumbJsonLd items={jsonLdBreadcrumbs} />
			<Container className="mt-8">
				<Breadcrumb items={uiBreadcrumbs} />
			</Container>

			<div className="text-center">
				<PageHeader title="サービス" />
				<p className="text-muted-foreground">
					AI × 人の感性で実現する、革新的なサービスをご紹介します。
				</p>
			</div>

			<Container className="mt-8" width="lg">
				<p className="text-2xl font-bold">
					AI × 人の感性で、お客様のビジネスを次のレベルへ
				</p>
				<ul className="mt-6 list-disc list-inside space-y-2">
					<li>AI活用による高品質なのに驚きの低価格でのウェブ・アプリ開発</li>
					<li>AI初心者から上級者まで対応する個別指導・コンサルティング</li>
					<li>AIとクリエイティブの融合でプロ級コンテンツ制作</li>
				</ul>

				<div className="mt-8">
					<ContentItems
						items={[
							{
								title: "ウェブ制作・アプリ開発",
								description:
									"AI活用で高品質なのに驚きの低価格を実現。ウェブサイト・アプリ開発から運用・保守まで、全工程をワンストップで提供します。コーポレートサイト、ECサイト、モバイルアプリまで幅広く対応。",
								image: "/dummy-images/street-photo-01.jpg",
								imageAlt: "ウェブ制作・アプリ開発のイメージ",
								link: {
									href: "/services/web-development",
									text: "詳細を見る →",
								},
							},
							{
								title: "プチコンサル＆レクチャー",
								description:
									"AI初心者から上級者まで対応。あなたの疑問やビジネス課題をAIで解決するための個別指導・コンサルティングサービス。スポット相談から継続サポートまで、柔軟に対応します。",
								image: "/dummy-images/street-photo-02.jpg",
								imageAlt: "プチコンサル＆レクチャーのイメージ",
								link: {
									href: "/services/consulting",
									text: "詳細を見る →",
								},
							},
							{
								title: "AIを活用したクリエイティブ",
								description:
									"AIの創造力×人の感性で、ライティング・画像生成・動画制作・音声生成まで。プロ級のコンテンツを従来の半額以下の低価格で提供。テスター特別価格で先着10名様限定50%OFF。",
								image: "/dummy-images/street-photo-03.jpg",
								imageAlt: "AIクリエイティブのイメージ",
								link: {
									href: "/services/creative",
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
