import {
	BreadcrumbJsonLd,
	generateMetadata,
	generateViewport,
	WebsiteJsonLd,
} from "@/components/seo";
import { ContentItems } from "@/components/services/content-items";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { PageHeader } from "@/components/ui/page-header";
import { META } from "@/lib/constants";
import {
	portfolioItems,
	portfolioCategories,
	getAllServiceTags,
	getPortfolioItemsByTag,
} from "@/lib/data/portfolio-data";
import { createBreadcrumbs } from "@/lib/utils";
import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = generateMetadata({
	title: "ポートフォリオ",
	description:
		"これまでに制作したウェブサイト、ロゴデザイン、ECサイトなどの実績をご紹介します。",
	keywords: [
		"ポートフォリオ",
		"制作実績",
		"ウェブ制作",
		"ロゴデザイン",
		"写真撮影",
		"WordPress",
	],
	canonical: "/portfolio",
});

export const viewport = generateViewport();

export default function PortfolioPage() {
	// パンくずリストのデータを定義
	const breadcrumbItems = [
		{ title: "ホーム", path: "/" },
		{ title: "ポートフォリオ", path: "/portfolio", current: true },
	];
	const { ui: uiBreadcrumbs, jsonLd: jsonLdBreadcrumbs } =
		createBreadcrumbs(breadcrumbItems);

	// サービスタグ一覧を取得
	const serviceTags = getAllServiceTags();

	return (
		<>
			<WebsiteJsonLd
				name={`ポートフォリオ | ${META.DEFAULT_TITLE}`}
				description="これまでに制作したウェブサイト、ロゴデザイン、ECサイトなどの実績をご紹介します。"
				url={`${META.SITE_URL}/portfolio`}
			/>
			<BreadcrumbJsonLd items={jsonLdBreadcrumbs} />
			<Container className="mt-8">
				<Breadcrumb items={uiBreadcrumbs} />
			</Container>

			<PageHeader title="ポートフォリオ" />
			<Container className="mt-8" width="lg">
				<p className="text-2xl font-bold">
					お客様に合わせた最適なソリューションをご提供しています
				</p>

				{/* カテゴリー紹介 */}
				<div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					{portfolioCategories.map((category) => (
						<div
							key={category.id}
							className="p-4 border rounded-md bg-card hover:bg-accent/50 transition-colors"
						>
							<h2 className="text-lg font-semibold">{category.name}</h2>
							<p className="text-sm text-muted-foreground mt-1">
								{category.description}
							</p>
						</div>
					))}
				</div>

				{/* サービスタグフィルター */}
				<div className="mt-10">
					<h2 className="text-lg font-semibold mb-3">提供サービス:</h2>
					<div className="flex flex-wrap gap-2">
						{serviceTags.map((tag) => (
							<Badge key={tag} variant="outline" className="px-3 py-1">
								{tag}
							</Badge>
						))}
					</div>
				</div>

				{/* ポートフォリオアイテム */}
				<div className="mt-10">
					<h2 className="text-2xl font-bold mb-6">主な制作実績</h2>
					<ContentItems
						items={portfolioItems.map((item) => ({
							title: item.title,
							description: item.clientName || "",
							image: item.image,
							imageAlt: item.imageAlt || `${item.title}のイメージ`,
							link: item.link,
						}))}
						columns={3}
						className="gap-6"
						aspectRatio="2/3"
					/>
				</div>

				<div className="mt-12 py-6 px-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
					<div className="text-center">
						<span className="text-xl font-bold text-primary">
							お客様の課題に最適なソリューションを提供します
						</span>
						<p className="mt-2 text-base text-muted-foreground">
							新規プロジェクトのご相談・お見積りはお気軽にお問い合わせください。
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
