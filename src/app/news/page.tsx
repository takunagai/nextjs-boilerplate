import { NewsList } from "@/components/news/news-list";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { NewsPagination } from "@/components/ui/news-pagination";
import {
	NEWS_PER_PAGE,
	PAGINATION_CONFIG,
	QUERY_PARAMS,
} from "@/lib/constants/news";
import type { NewsItem } from "@/lib/data/news";
import {
	getAllNews,
	getNewsByCategory,
	getNewsCategories,
} from "@/lib/data/news";
import { calculatePagination, getPaginatedItems } from "@/lib/utils/pagination";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "お知らせ",
	description:
		"当サイトに関するお知らせやプレスリリース、アップデート情報などをご覧いただけます。",
};

// カテゴリフィルタリングのためのサーバーアクション
async function getFilteredNews(category?: string) {
	"use server";

	if (!category || category === "all") {
		return await getAllNews();
	}

	return await getNewsByCategory(category);
}

export default async function NewsPage({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	// クエリパラメータの取得
	const resolvedSearchParams = await searchParams;
	const selectedCategory =
		typeof resolvedSearchParams[QUERY_PARAMS.category] === "string"
			? (resolvedSearchParams[QUERY_PARAMS.category] as string)
			: undefined;

	// ページ番号の取得（デフォルトは1ページ目）
	const pageParam = resolvedSearchParams[QUERY_PARAMS.page];
	const currentPage = pageParam ? Number.parseInt(pageParam as string, 10) : 1;

	// データ取得
	const [newsItems, categories] = await Promise.all([
		selectedCategory ? getNewsByCategory(selectedCategory) : getAllNews(),
		getNewsCategories(),
	]);

	// ページネーション計算
	const pagination = calculatePagination(
		newsItems.length,
		currentPage,
		NEWS_PER_PAGE,
		PAGINATION_CONFIG.siblingCount,
	);

	// 現在のページのニュース記事を取得
	const paginatedItems = getPaginatedItems(
		newsItems,
		pagination.currentPage,
		NEWS_PER_PAGE,
	);

	// リンクを追加したニュースアイテムを生成
	const newsItemsWithLinks = paginatedItems.map((item: NewsItem) => ({
		...item,
		link: `/news/${item.id}`,
	}));

	return (
		<main className="pb-16">
			<Container width="md">
				<div className="py-8 md:py-16">
					<Heading
						as="h1"
						align="center"
						borderPosition="between"
						borderClass="w-[10em] mx-auto border border-foreground/10"
						className="py-12"
					>
						お知らせ
						<Heading.Lead>
							当サイトに関するお知らせやプレスリリース、アップデート情報などをご覧いただけます。
						</Heading.Lead>
					</Heading>

					{/* カテゴリフィルター */}
					<div className="mb-8">
						<div className="flex gap-2 overflow-x-auto pb-2">
							<a
								href="/news"
								className={`px-3 py-2 rounded-full text-xs whitespace-nowrap transition-colors ${
									!selectedCategory
										? "bg-blue-600 text-white"
										: "bg-white hover:bg-slate-100 text-slate-700 border dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200"
								}`}
							>
								すべて
							</a>
							{categories.map((category) => (
								<a
									key={category}
									href={`/news?${QUERY_PARAMS.category}=${encodeURIComponent(category)}`}
									className={`px-3 py-2 rounded-full text-xs whitespace-nowrap transition-colors ${
										selectedCategory === category
											? "bg-blue-600 text-white"
											: "bg-white hover:bg-slate-100 text-slate-700 border dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200"
									}`}
								>
									{category}
								</a>
							))}
						</div>
					</div>

					{/* 記事リスト */}
					{newsItemsWithLinks.length > 0 ? (
						<>
							<NewsList items={newsItemsWithLinks} />

							{/* 結果件数 */}
							<div className="mt-6 mb-6 text-sm text-slate-500 dark:text-slate-400 text-center">
								<p>
									{pagination.totalItems}件中 {pagination.startIndex + 1}-
									{pagination.endIndex}件を表示
								</p>
							</div>

							{/* ページネーション */}
							<div className="flex justify-center mt-8">
								<NewsPagination
									totalPages={pagination.totalPages}
									currentPage={pagination.currentPage}
									siblingCount={PAGINATION_CONFIG.siblingCount}
									showEllipsis={PAGINATION_CONFIG.ellipsis}
									showEdges={PAGINATION_CONFIG.showEdges}
									items={pagination.items}
									hasPreviousPage={pagination.hasPreviousPage}
									hasNextPage={pagination.hasNextPage}
									baseUrl="/news"
									category={selectedCategory}
									className="mx-auto"
								/>
							</div>
						</>
					) : (
						<div className="py-12 text-center text-slate-500 dark:text-slate-400">
							<p className="mb-2 text-lg">該当するお知らせはありません</p>
							<p className="text-sm">別のカテゴリを選択してください</p>
						</div>
					)}
				</div>
			</Container>
		</main>
	);
}
