import type { Metadata } from "next";
import { NewsList } from "@/components/news/news-list";
import { Container } from "@/components/ui/container";
import { NewsPagination } from "@/components/ui/news-pagination";
import { PageHeader } from "@/components/ui/page-header";
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

export const revalidate = 3600;

export const metadata: Metadata = {
	title: "お知らせ",
	description:
		"当サイトに関するお知らせやプレスリリース、アップデート情報などをご覧いただけます。",
};

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
					<PageHeader title="お知らせ" />

					{/* カテゴリフィルター */}
					<div className="mb-8">
						<div className="flex gap-2 overflow-x-auto pb-2" role="navigation" aria-label="カテゴリフィルター">
							<a
								href="/news"
								className={`px-3 py-2 rounded-full text-xs whitespace-nowrap transition-colors ${
									!selectedCategory
										? "bg-primary text-primary-foreground"
										: "bg-background hover:bg-muted text-muted-foreground border"
								}`}
								{...(!selectedCategory ? { "aria-current": "page" as const } : {})}
							>
								すべて
							</a>
							{categories.map((category) => (
								<a
									key={category}
									href={`/news?${QUERY_PARAMS.category}=${encodeURIComponent(category)}`}
									className={`px-3 py-2 rounded-full text-xs whitespace-nowrap transition-colors ${
										selectedCategory === category
											? "bg-primary text-primary-foreground"
											: "bg-background hover:bg-muted text-muted-foreground border"
									}`}
									{...(selectedCategory === category ? { "aria-current": "page" as const } : {})}
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
							<div className="mt-6 mb-6 text-sm text-muted-foreground text-center">
								<p role="status" aria-live="polite">
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
						<div className="py-12 text-center text-muted-foreground">
							<p className="mb-2 text-lg">該当するお知らせはありません</p>
							<p className="text-sm">別のカテゴリを選択してください</p>
						</div>
					)}
				</div>
			</Container>
		</main>
	);
}
