import {
	BreadcrumbJsonLd,
	generateViewport,
	WebsiteJsonLd,
} from "@/components/seo";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { META } from "@/lib/constants";
import { portfolioItems } from "@/lib/data/portfolio-data";
import { createBreadcrumbs } from "@/lib/utils";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MdArrowBack, MdOutlineWeb } from "react-icons/md";

// 動的メタデータの生成
export async function generateMetadata({
	params,
}: {
	params: { id: string };
}): Promise<Metadata> {
	const portfolio = portfolioItems.find((item) => item.id === params.id);

	if (!portfolio) {
		return {
			title: "ポートフォリオが見つかりません",
			description: "指定されたポートフォリオが見つかりませんでした。",
		};
	}

	return {
		title: portfolio.title,
		description: portfolio.description || `${portfolio.title}の制作実績`,
		keywords: ["ポートフォリオ", "制作実績", portfolio.category],
		alternates: {
			canonical: `/portfolio/${params.id}`,
		}
	};
}

export const viewport = generateViewport();

// 静的パラメータの生成
export function generateStaticParams() {
	return portfolioItems.map((item) => ({
		id: item.id,
	}));
}

export default function PortfolioDetailPage({
	params,
}: {
	params: { id: string };
}) {
	const portfolio = portfolioItems.find((item) => item.id === params.id);

	// ポートフォリオが見つからない場合は404ページを表示
	if (!portfolio) {
		notFound();
	}

	// パンくずリストのデータを定義
	const breadcrumbItems = [
		{ title: "ホーム", path: "/" },
		{ title: "ポートフォリオ", path: "/portfolio" },
		{ title: portfolio.title, path: `/portfolio/${params.id}`, current: true },
	];
	const { ui: uiBreadcrumbs, jsonLd: jsonLdBreadcrumbs } =
		createBreadcrumbs(breadcrumbItems);

	// カテゴリー名を取得
	const getCategoryName = (categoryId: string) => {
		switch (categoryId) {
			case "web":
				return "ウェブサイト制作";
			case "design":
				return "デザイン";
			case "photo":
				return "写真撮影";
			case "logo":
				return "ロゴ制作";
			case "shop":
				return "ECサイト構築";
			case "other":
				return "その他";
			default:
				return categoryId;
		}
	};

	return (
		<>
			<WebsiteJsonLd
				name={`${portfolio.title} | ${META.DEFAULT_TITLE}`}
				description={portfolio.description || `${portfolio.title}の制作実績`}
				url={`${META.SITE_URL}/portfolio/${params.id}`}
			/>
			<BreadcrumbJsonLd items={jsonLdBreadcrumbs} />
			<Container className="mt-8">
				<Breadcrumb items={uiBreadcrumbs} />
			</Container>

			<Container className="my-8" width="lg">
				<Link
					href="/portfolio"
					className="inline-flex items-center text-primary hover:underline mb-6"
				>
					<MdArrowBack className="mr-1" />
					ポートフォリオ一覧に戻る
				</Link>

				<div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8">
					{/* 画像エリア */}
					<div 
						className="relative w-full aspect-[2/3]"
					>
						<Image
							src={portfolio.image}
							alt={portfolio.imageAlt || `${portfolio.title}のイメージ`}
							fill
							className="object-cover rounded-lg"
						/>
					</div>

					{/* 詳細情報エリア */}
					<div>
						<h1 className="text-3xl font-bold mb-4">{portfolio.title}</h1>
						<div className="mb-4">
							<span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
								{getCategoryName(portfolio.category)}
							</span>
						</div>
						
						{portfolio.description && (
							<p className="text-lg leading-relaxed mb-6">{portfolio.description}</p>
						)}

						{/* プロジェクト情報 */}
						<div className="space-y-4 mt-8">
							{portfolio.clientName && (
								<div className="grid grid-cols-[120px_1fr] gap-2">
									<span className="font-semibold text-muted-foreground">クライアント:</span>
									<span>{portfolio.clientName}</span>
								</div>
							)}
							
							{portfolio.websiteUrl && (
								<div className="grid grid-cols-[120px_1fr] gap-2">
									<span className="font-semibold text-muted-foreground">Webサイト:</span>
									<a 
										href={portfolio.websiteUrl} 
										target="_blank" 
										rel="noopener noreferrer"
										className="inline-flex items-center text-primary hover:underline"
									>
										<MdOutlineWeb className="mr-1" />
										{portfolio.websiteUrl.replace(/^https?:\/\//, '')}
									</a>
								</div>
							)}
							
							{portfolio.servicesTags && portfolio.servicesTags.length > 0 && (
								<div className="grid grid-cols-[120px_1fr] gap-2">
									<span className="font-semibold text-muted-foreground">提供サービス:</span>
									<div className="flex flex-wrap gap-2">
										{portfolio.servicesTags.map((tag) => (
											<Badge
												key={tag}
												variant="outline"
												className="px-2 py-0.5 text-xs"
											>
												{tag}
											</Badge>
										))}
									</div>
								</div>
							)}
						</div>
					</div>
				</div>

				{/* 関連ポートフォリオ */}
				<div className="mt-16">
					<h2 className="text-2xl font-bold mb-6">関連プロジェクト</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{portfolioItems
							.filter(
								(item) => 
									item.category === portfolio.category && 
									item.id !== portfolio.id
							)
							.slice(0, 3)
							.map((item) => (
								<div
									key={item.id}
									className="border rounded-md overflow-hidden hover:shadow-md transition-shadow bg-card"
								>
									<div
										className="relative w-full aspect-[2/3]"
									>
										<Image
											src={item.image}
											alt={item.imageAlt || `${item.title}のイメージ`}
											fill
											className="object-cover"
										/>
									</div>
									<div className="p-5">
										<h3 className="text-lg font-semibold mb-2">{item.title}</h3>
										<p className="text-muted-foreground">
											{item.clientName}
										</p>
										<Link
											href={`/portfolio/${item.id}`}
											className="inline-block mt-4 text-primary hover:underline font-medium"
										>
											詳細を見る →
										</Link>
									</div>
								</div>
							))}
					</div>
				</div>

				{/* お問い合わせCTA */}
				<div className="mt-16 py-8 px-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
					<div className="text-center">
						<span className="text-xl font-bold text-primary">
							あなたのプロジェクトも成功に導きます
						</span>
						<p className="mt-2 text-base text-muted-foreground">
							プロジェクトについてのご相談やお見積りはお気軽にお問い合わせください。
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
