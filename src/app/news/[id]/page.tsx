import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { NewsJsonLd } from "@/components/seo/news-jsonld";
import { FaArrowLeft } from "react-icons/fa6";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import type { Metadata } from "next";
import { getNewsById, getAllNews } from "@/lib/data/news";
import { PageHeader } from "@/components/ui/page-header";

// 動的メタデータの生成（SEO対策）
export async function generateMetadata({
	params,
}: {
	params: Promise<{ id: string }>;
}): Promise<Metadata> {
	const resolvedParams = await params;
	const news = await getNewsById(resolvedParams.id);

	// 存在しない場合
	if (!news) {
		return {
			title: "お知らせが見つかりません",
			description: "指定されたお知らせは存在しないか、削除された可能性があります。",
		};
	}

	const formattedDate = format(news.date, "yyyy.MM.dd");

	return {
		title: news.title,
		description: `${formattedDate} - ${news.category}: ${news.title}`,
		openGraph: {
			title: news.title,
			description: `${formattedDate} - ${news.category}: ${news.title}`,
			type: "article",
			publishedTime: news.date.toISOString(),
		},
	};
}

// 静的パスを生成（ビルド時に静的に生成するパス）
export async function generateStaticParams() {
	const allNews = await getAllNews();
	return allNews.map((news) => ({
		id: news.id,
	}));
}

// 個別ページのメインコンポーネント
export default async function NewsDetailPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const resolvedParams = await params;
	const news = await getNewsById(resolvedParams.id);

	// 存在しない場合は404ページへ
	if (!news) {
		notFound();
	}

	const formattedDate = format(news.date, "yyyy年MM月dd日");
	const url = `${process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"}/news/${resolvedParams.id}`;

	// パンくずリストの項目
	const breadcrumbItems = [
		{ label: "ホーム", href: "/" },
		{ label: "お知らせ", href: "/news" },
		{ label: news.title, href: `/news/${resolvedParams.id}`, isCurrent: true },
	];

	return (
		<main className="pb-16">
			{/* 構造化データ（JSON-LD）を追加 */}
			<NewsJsonLd
				title={news.title}
				date={news.date}
				category={news.category}
				url={url}
			/>

			<Container width="md">
				{/* パンくずリスト */}
				<Breadcrumb items={breadcrumbItems} className="pt-4 pb-0" />

				<div className="py-8 md:py-12">
					{/* 戻るボタン */}
					<div className="mb-8">
						<Link href="/news">
							<Button variant="ghost" size="sm" className="gap-2">
								<FaArrowLeft size={12} />
								<span>お知らせ一覧に戻る</span>
							</Button>
						</Link>
					</div>

					{/* メタ情報 */}
					<div className="flex flex-wrap gap-3 items-center mb-4">
						<time
							dateTime={news.date.toISOString()}
							className="text-slate-500 font-medium"
						>
							{formattedDate}
						</time>
						<Badge variant="outline">{news.category}</Badge>
					</div>

					{/* タイトル */}
					<PageHeader title={news.title} />

					<Separator className="mb-8" />

					{/* 本文 */}
					<div className="prose prose-slate dark:prose-invert max-w-none">
						{news.content ? (
							<div dangerouslySetInnerHTML={{ __html: news.content }} />
						) : (
							<>
								<p>
									このページは「{news.title}」の詳細ページです。
									実際のプロジェクトでは、ここにマークダウンやリッチテキストコンテンツが入ります。
								</p>
								<p>
									現在表示されているのはダミーコンテンツです。実際のプロジェクトでは、
									データベースから取得した内容を表示するように実装してください。
								</p>
							</>
						)}
					</div>
				</div>
			</Container>
		</main>
	);
}
