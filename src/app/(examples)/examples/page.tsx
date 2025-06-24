import Link from "next/link";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";

export default function ExamplesPage() {
	const examples = [
		{
			title: "カラムレイアウト",
			description: "2カラム（左+メイン、メイン+右）・3カラムのサンプルです。",
			href: "/examples/column-layout",
		},
		{
			title: "見出し",
			description: "見出しコンポーネントのサンプルです。",
			href: "/examples/heading",
		},
		{
			title: "リスト",
			description: "SimpleListとNumberedListのサンプルです。",
			href: "/examples/list",
		},
		{
			title: "テーブル",
			description:
				"様々なバリエーションを持つテーブルコンポーネントのサンプル集",
			href: "/examples/table",
		},
		{
			title: "FAQ",
			description: "FAQコンポーネントのサンプルです。",
			href: "/examples/faq",
		},
		{
			title: "特徴紹介セクション",
			description: "特徴を効果的に紹介するためのレイアウトコンポーネント",
			href: "/examples/feature-items",
		},
		{
			title: "ContentItems コンポーネント",
			description:
				"ContentItemsコンポーネントの全バリエーションを表示するサンプルページです。",
			href: "/examples/content-items",
		},
		{
			title: "CTAセクション",
			description: "様々なスタイルのCTAセクションのサンプル集",
			href: "/examples/cta-section",
		},
		{
			title: "地図",
			description: "様々なスタイルの地図コンポーネントのサンプル集",
			href: "/examples/map",
		},
		{
			title: "Masonryギャラリー",
			description: "Masonryギャラリーコンポーネントのサンプル集",
			href: "/examples/masonry-gallery",
		},
		{
			title: "カルーセル",
			description: "カルーセル (Embla Carousel) のサンプルです。",
			href: "/examples/carousel",
		},
		{
			title: "フォーム",
			description: "react-hook-formとzodを使用した入力フォームのサンプルです。",
			href: "/examples/form",
		},
		{
			title: "データ取得",
			description: "Next.jsのデータ取得パターンを示すサンプルです。",
			href: "/examples/data-fetching",
		},
		{
			title: "UIコンポーネント",
			description: "shadcn/uiコンポーネントのサンプル集です。",
			href: "/examples/ui-components",
		},
		{
			title: "スピナー（Spinner）",
			description: "読み込み状態を表示するためのスピナーコンポーネントです。",
			href: "/examples/spinner",
		},
		{
			title: "スケルトン（Skeleton）",
			description:
				"コンテンツ読み込み中に表示するプレースホルダーコンポーネントです。",
			href: "/examples/skeleton",
		},
		{
			title: "日付選択（DatePicker）",
			description: "カレンダーから日付を選択できる日付選択コンポーネントです。",
			href: "/examples/date-picker",
		},
		{
			title: "トースト（Toast）",
			description: "ユーザーへの通知を表示するトーストコンポーネントです。",
			href: "/examples/toast",
		},
	];

	return (
		<Container className="mt-8" paddingY="lg" paddingX="2xl">
			<PageHeader title="サンプル集" />

			<ul className="space-y-4 list-disc pl-5">
				{examples.map((example, index) => (
					<li key={`${example.href}-${index}`} className="pl-2">
						<h2 className="text-lg font-bold">
							<Link
								href={example.href}
								className="underline hover:text-blue-600"
							>
								{example.title}
							</Link>
						</h2>
						<p className="mt-1 text-gray-600">{example.description}</p>
					</li>
				))}
			</ul>
		</Container>
	);
}
