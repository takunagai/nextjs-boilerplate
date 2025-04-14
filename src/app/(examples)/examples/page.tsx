import { Container } from "@/components/ui/container";
import Link from "next/link";

export default function ExamplesPage() {
	const examples = [
		{
			title: "リスト",
			description: "SimpleListとNumberedListのサンプルです。",
			href: "/examples/list",
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
	];

	return (
		<Container className="mt-8" paddingY="lg" paddingX="2xl">
			<h1 className="mb-8 text-3xl font-bold">サンプル一覧</h1>

			<ul className="space-y-4 list-disc pl-5">
				{examples.map((example) => (
					<li key={example.href} className="pl-2">
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
