import { NewsList } from "@/components/news/news-list";
import { Container } from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import { getAllNews, getNewsCategories, getNewsByCategory } from "@/lib/data/news";
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
	searchParams: { category?: string };
}) {
	const selectedCategory = searchParams.category;
	
	// データ取得
	const [newsItems, categories] = await Promise.all([
		selectedCategory ? getNewsByCategory(selectedCategory) : getAllNews(),
		getNewsCategories(),
	]);

	// リンクを追加したニュースアイテムを生成
	const newsItemsWithLinks = newsItems.map((item) => ({
		...item,
		link: `/news/${item.id}`,
	}));

	return (
		<main className="pb-16">
			<Container width="md">
				<div className="py-8 md:py-16">
					<h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-slate-900 dark:text-slate-100">
						お知らせ
					</h1>
					<p className="text-center text-slate-500 dark:text-slate-400 mb-8">
						当サイトに関するお知らせやプレスリリース、アップデート情報などをご覧いただけます。
					</p>

					<div className="mb-8">
						<div className="flex gap-4 overflow-x-auto pb-2">
							<a
								href="/news"
								className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
									!selectedCategory
										? "bg-blue-600 text-white"
										: "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
								}`}
							>
								すべて
							</a>
							{categories.map((category) => (
								<a
									key={category}
									href={`/news?category=${encodeURIComponent(category)}`}
									className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
										selectedCategory === category
											? "bg-blue-600 text-white"
											: "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
									}`}
								>
									{category}
								</a>
							))}
						</div>
					</div>

					<Separator className="mb-8" />

					{newsItemsWithLinks.length > 0 ? (
						<NewsList items={newsItemsWithLinks} />
					) : (
						<div className="py-12 text-center text-slate-500">
							<p className="mb-2 text-lg">該当するお知らせはありません</p>
							<p className="text-sm">別のカテゴリを選択してください</p>
						</div>
					)}
				</div>
			</Container>
		</main>
	);
}
