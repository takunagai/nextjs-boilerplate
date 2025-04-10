import { NewsList } from "@/components/news/news-list";
import { Container } from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "お知らせ",
	description:
		"当サイトに関するお知らせやプレスリリース、アップデート情報などをご覧いただけます。",
};

interface NewsItem {
	id: string;
	date: Date;
	category: string;
	title: string;
	link?: string;
}

// ダミーデータ（後でデータベースから取得する）
const getDummyNewsItems = (): NewsItem[] => {
	return [
		{
			id: "news-1",
			date: new Date("2025-03-14"),
			category: "プレスリリース",
			title:
				"株式会社ミラスタがSaaS連携クラウド「hubflow（ハブフロー）」β版を提供開始",
			link: "/news/news-1",
		},
		{
			id: "news-2",
			date: new Date("2025-02-23"),
			category: "プレスリリース",
			title:
				"SaaS連携クラウドサービス「hubflow」を提供するミラスタ、ラクスライトクラウド社と事業提携を締結",
			link: "/news/news-2",
		},
		{
			id: "news-3",
			date: new Date("2025-01-22"),
			category: "プレスリリース",
			title:
				"SaaS連携クラウドサービス「hubflow」を提供するミラスタ、サイボウズのオフィシャルパートナーに認定",
			link: "/news/news-3",
		},
		{
			id: "news-4",
			date: new Date("2024-12-15"),
			category: "アップデート",
			title: "hubflowの新機能「自動連携ワークフロー」をリリースしました",
			link: "/news/news-4",
		},
		{
			id: "news-5",
			date: new Date("2024-11-10"),
			category: "メンテナンス",
			title:
				"【完了】11月12日（火）2:00〜5:00にシステムメンテナンスを実施します",
			link: "/news/news-5",
		},
		{
			id: "news-6",
			date: new Date("2024-10-05"),
			category: "メディア掲載",
			title: "日経クラウドFirstに当社のサービスが紹介されました",
			link: "/news/news-6",
		},
	];
};

export default function NewsPage() {
	// データ取得（後でサーバーアクションに置き換え予定）
	const newsItems = getDummyNewsItems();

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
							<button
								type="button"
								className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors"
							>
								お知らせ
							</button>
							<button
								type="button"
								className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors"
							>
								プレスリリース
							</button>
							<button
								type="button"
								className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors"
							>
								アップデート
							</button>
							<button
								type="button"
								className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors"
							>
								メディア掲載
							</button>
						</div>
					</div>

					<Separator className="mb-8" />

					<NewsList items={newsItems} />
				</div>
			</Container>
		</main>
	);
}
