import { NewsList } from "@/components/news/news-list";
import { Container } from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import { getAllNews, getNewsCategories } from "@/lib/data/news";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "お知らせ",
	description:
		"当サイトに関するお知らせやプレスリリース、アップデート情報などをご覧いただけます。",
};

export default async function NewsPage() {
	// データ取得
	const [newsItems, categories] = await Promise.all([
		getAllNews(),
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
							<button
								type="button"
								className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm whitespace-nowrap"
							>
								ALL
							</button>
							{categories.map((category) => (
								<button
									key={category}
									type="button"
									className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors"
								>
									{category}
								</button>
							))}
						</div>
					</div>

					<Separator className="mb-8" />

					<NewsList items={newsItemsWithLinks} />
				</div>
			</Container>
		</main>
	);
}
