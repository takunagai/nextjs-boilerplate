import { format } from "date-fns";
import Link from "next/link";
import { IoArrowForward, IoInformationCircle } from "react-icons/io5";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { LATEST_NEWS_COUNT } from "@/lib/constants/news";
import type { NewsItem } from "@/lib/data/news";
import { getAllNews } from "@/lib/data/news";

interface LatestNewsSectionProps {
	className?: string;
}

/**
 * トップページに表示する最新のお知らせセクション
 * @returns お知らせセクションコンポーネント
 */
export async function LatestNewsSection({
	className: _className,
}: LatestNewsSectionProps) {
	// 最新のニュースを取得（件数は定数で設定）
	const allNews = await getAllNews();
	const latestNews = allNews.slice(0, LATEST_NEWS_COUNT);

	if (latestNews.length === 0) {
		return null;
	}

	return (
		<section className="w-full">
			<Container width="md">
				<div className="flex flex-row items-center gap-4">
					<h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center">
						<IoInformationCircle className="mr-1" />
						お知らせ
					</h2>
					<Button asChild variant="ghost" className="group">
						<Link
							href="/news"
							className="flex items-center text-muted-foreground underline"
						>
							お知らせ一覧へ
							<IoArrowForward className="transition-transform group-hover:translate-x-0.5" />
						</Link>
					</Button>
				</div>
				<ul className="divide-y divide-slate-200 dark:divide-slate-800">
					{latestNews.map((news: NewsItem) => (
						<li key={news.id} className="py-2 text-sm">
							<Link
								href={`/news/${news.id}`}
								className="block group no-underline"
								aria-label={`${news.title}の詳細を見る`}
							>
								<div className="flex flex-col md:flex-row md:items-center gap-1">
									<div className="flex items-center md:gap-3 md:w-auto md:min-w-52 md:flex-nowrap">
										<time
											dateTime={news.date.toISOString()}
											className="text-slate-500 font-medium min-w-24"
										>
											{format(news.date, "yyyy.MM.dd")}
										</time>
										<Badge
											variant="outline"
											className="text-xs whitespace-nowrap"
										>
											{news.category}
										</Badge>
									</div>
									<p className="font-medium text-slate-900 dark:text-slate-100 md:flex-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
										{news.title}
									</p>
								</div>
							</Link>
						</li>
					))}
				</ul>
			</Container>
		</section>
	);
}
