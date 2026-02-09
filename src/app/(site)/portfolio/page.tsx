import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import {
	BreadcrumbJsonLd,
	generateMetadata,
	generateViewport,
	WebsiteJsonLd,
} from "@/components/seo";
import { PortfolioFilter } from "@/components/portfolio/portfolio-filter";
import { PortfolioContent } from "@/components/portfolio/portfolio-content";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { META } from "@/lib/constants";
import {
	portfolioItems,
	portfolioFilterCategories,
	type PortfolioFilterCategory,
} from "@/lib/data/portfolio-data";

export const revalidate = 7200;
import { createBreadcrumbs } from "@/lib/utils";

export const metadata: Metadata = generateMetadata({
	title: "実績紹介",
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

interface PortfolioPageProps {
	searchParams?: Promise<{ category?: string }>;
}

export default async function PortfolioPage({
	searchParams,
}: PortfolioPageProps) {
	// Next.js 15のsearchParamsがPromiseの場合に対応
	const resolvedSearchParams = searchParams ? await searchParams : {};
	const selectedCategory = resolvedSearchParams?.category as
		| PortfolioFilterCategory
		| undefined;
	// パンくずリストのデータを定義
	const breadcrumbItems = [
		{ title: "ホーム", path: "/" },
		{ title: "実績紹介", path: "/portfolio", current: true },
	];
	const { ui: uiBreadcrumbs, jsonLd: jsonLdBreadcrumbs } =
		createBreadcrumbs(breadcrumbItems);

	// 選択されたカテゴリ情報を取得
	const selectedCategoryInfo = selectedCategory
		? portfolioFilterCategories.find((cat) => cat.id === selectedCategory)
		: null;

	return (
		<>
			<WebsiteJsonLd
				name={`実績紹介 | ${META.DEFAULT_TITLE}`}
				description={
					selectedCategoryInfo
						? `${selectedCategoryInfo.name}の制作実績をご紹介します。${selectedCategoryInfo.description}`
						: "これまでに制作したウェブサイト、ロゴデザイン、ECサイトなどの実績をご紹介します。"
				}
				url={`${META.SITE_URL}/portfolio${
					selectedCategory ? `?category=${selectedCategory}` : ""
				}`}
			/>
			<BreadcrumbJsonLd items={jsonLdBreadcrumbs} />
			<Container paddingY={"none"}>
				<Breadcrumb items={uiBreadcrumbs} />
			</Container>

			<PageHeader
				title="実績紹介"
				className="my-8"
				description={
					selectedCategoryInfo
						? `${selectedCategoryInfo.name}の制作実績をご紹介します。`
						: "これまでに制作したウェブサイト、ロゴデザイン、ECサイトなどの実績をご紹介します。"
				}
			/>
			<Container className="mt-8" width="lg">
				{/* フィルタリング機能 */}
				<Suspense
					fallback={
						<div className="flex flex-wrap justify-center gap-2">
							{portfolioFilterCategories.map((category) => (
								<div
									key={category.id}
									className="px-3 py-1 bg-muted rounded-full animate-pulse"
								>
									{category.name}
								</div>
							))}
						</div>
					}
				>
					<PortfolioFilter />
				</Suspense>

				{/* ポートフォリオコンテンツ */}
				<Suspense
					fallback={
						<div className="mt-10">
							<div className="h-8 bg-muted rounded animate-pulse mb-6" />
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								{Array.from({ length: 6 }).map((_, i) => (
									<div
										key={i}
										className="aspect-[2/3] bg-muted rounded animate-pulse"
									/>
								))}
							</div>
						</div>
					}
				>
					<PortfolioContent
						items={portfolioItems}
						filterCategory={selectedCategory}
					/>
				</Suspense>

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
