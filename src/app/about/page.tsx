import { ArticleJsonLd, BreadcrumbJsonLd, generateMetadata, generateViewport } from "@/components/seo";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import { META } from "@/lib/constants";
import type { Metadata } from "next";
import Image from "next/image";
import { createBreadcrumbs } from "@/lib/utils";

export const metadata: Metadata = generateMetadata({
	title: "自己紹介",
	description: "フロントエンドエンジニアとしての経歴、スキル、実績についてご紹介します。",
	keywords: ["自己紹介", "プロフィール", "フロントエンドエンジニア", "スキル", "経歴"],
	canonical: "/about",
});

export const viewport = generateViewport();

export default function AboutPage() {
	// パンくずリストの基本データを定義
	const breadcrumbItems = [
		{ title: "ホーム", path: "/" },
		{ title: "自己紹介", path: "/about", current: true },
	];

	// UI表示用とJSON-LD用のデータを生成
	const { ui: uiBreadcrumbs, jsonLd: jsonLdBreadcrumbs } = createBreadcrumbs(breadcrumbItems);

	return (
		<>
			<ArticleJsonLd
				title="自己紹介"
				description="フロントエンドエンジニアとしての経歴、スキル、実績についてご紹介します。"
				url={`${META.SITE_URL}/about`}
				images={[`${META.SITE_URL}/dummy-images/profile-placeholder.jpg`]}
				datePublished="2023-01-01T00:00:00Z"
				dateModified="2023-01-01T00:00:00Z"
				authorName="山田 太郎"
			/>
			<BreadcrumbJsonLd items={jsonLdBreadcrumbs} />
			<Container size="md" paddingY="lg" paddingX="2xl">
				<Breadcrumb items={uiBreadcrumbs} />
				<div className="flex flex-col gap-8">
					{/* ヘッダーセクション */}
					<div className="flex flex-col md:flex-row gap-8 items-center">
						<div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-primary/20">
							<Image
								src="/dummy-images/profile-placeholder.jpg"
								alt="プロフィール画像"
								fill
								className="object-cover"
								priority
							/>
						</div>
						<div className="text-center md:text-left">
							<h1 className="text-4xl font-bold mb-2">山田 太郎</h1>
							<p className="text-xl text-muted-foreground mb-4">
								フロントエンドエンジニア
							</p>
							<div className="flex flex-wrap gap-2 justify-center md:justify-start">
								<Badge variant="outline">Next.js</Badge>
								<Badge variant="outline">React</Badge>
								<Badge variant="outline">TypeScript</Badge>
								<Badge variant="outline">Tailwind CSS</Badge>
							</div>
						</div>
					</div>

					<Separator />

					{/* 自己紹介セクション */}
					<Card>
						<CardHeader>
							<CardTitle>自己紹介</CardTitle>
							<CardDescription>私についての簡単な紹介です</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="leading-7 mb-4">
								はじめまして、山田太郎と申します。フロントエンドエンジニアとして5年間の経験があり、
								モダンなWebアプリケーション開発に情熱を持っています。
								Next.js、React、TypeScriptを中心としたスタックを使用して、
								パフォーマンスが高く、アクセシブルで、ユーザーフレンドリーなウェブサイトの構築を得意としています。
							</p>
							<p className="leading-7">
								趣味は読書、ハイキング、写真撮影です。新しい技術を学ぶことが大好きで、
								常に最新のウェブ開発トレンドについて学んでいます。
							</p>
						</CardContent>
					</Card>

					{/* スキルセクション */}
					<Card>
						<CardHeader>
							<CardTitle>スキル</CardTitle>
							<CardDescription>技術スタックと専門知識</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<h3 className="text-lg font-semibold mb-3">フロントエンド</h3>
									<ul className="space-y-2">
										<li className="flex items-center gap-2">
											<Badge>Next.js</Badge>
											<span className="text-sm text-muted-foreground">上級</span>
										</li>
										<li className="flex items-center gap-2">
											<Badge>React</Badge>
											<span className="text-sm text-muted-foreground">上級</span>
										</li>
										<li className="flex items-center gap-2">
											<Badge>TypeScript</Badge>
											<span className="text-sm text-muted-foreground">中級</span>
										</li>
										<li className="flex items-center gap-2">
											<Badge>Tailwind CSS</Badge>
											<span className="text-sm text-muted-foreground">上級</span>
										</li>
									</ul>
								</div>
								<div>
									<h3 className="text-lg font-semibold mb-3">バックエンド</h3>
									<ul className="space-y-2">
										<li className="flex items-center gap-2">
											<Badge>Node.js</Badge>
											<span className="text-sm text-muted-foreground">中級</span>
										</li>
										<li className="flex items-center gap-2">
											<Badge>PostgreSQL</Badge>
											<span className="text-sm text-muted-foreground">初級</span>
										</li>
										<li className="flex items-center gap-2">
											<Badge>REST API</Badge>
											<span className="text-sm text-muted-foreground">中級</span>
										</li>
										<li className="flex items-center gap-2">
											<Badge>GraphQL</Badge>
											<span className="text-sm text-muted-foreground">初級</span>
										</li>
									</ul>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* 経歴セクション */}
					<Card>
						<CardHeader>
							<CardTitle>経歴</CardTitle>
							<CardDescription>これまでの職歴と学歴</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-6">
								<div>
									<div className="flex justify-between items-start mb-1">
										<h3 className="text-lg font-semibold">
											株式会社テックイノベーション
										</h3>
										<span className="text-sm text-muted-foreground">
											2020年 - 現在
										</span>
									</div>
									<p className="text-muted-foreground mb-2">
										シニアフロントエンドエンジニア
									</p>
									<p className="text-sm">
										大規模なWebアプリケーションの開発と保守を担当。
										Next.jsとTypeScriptを使用したプロジェクトのリード。
										パフォーマンス最適化とアクセシビリティ改善に注力。
									</p>
								</div>
								<Separator />
								<div>
									<div className="flex justify-between items-start mb-1">
										<h3 className="text-lg font-semibold">
											株式会社デジタルクリエイト
										</h3>
										<span className="text-sm text-muted-foreground">
											2018年 - 2020年
										</span>
									</div>
									<p className="text-muted-foreground mb-2">
										フロントエンドエンジニア
									</p>
									<p className="text-sm">
										Reactを使用したSPAの開発。
										UIコンポーネントライブラリの構築と保守。
										チームでのコードレビューとベストプラクティスの共有。
									</p>
								</div>
								<Separator />
								<div>
									<div className="flex justify-between items-start mb-1">
										<h3 className="text-lg font-semibold">東京工科大学</h3>
										<span className="text-sm text-muted-foreground">
											2014年 - 2018年
										</span>
									</div>
									<p className="text-muted-foreground mb-2">
										情報工学部 情報システム学科
									</p>
									<p className="text-sm">
										Webアプリケーション開発と情報システム設計を専攻。
										卒業プロジェクトでは学内イベント管理システムを開発。
									</p>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* お問い合わせセクション */}
					<Card>
						<CardHeader>
							<CardTitle>お問い合わせ</CardTitle>
							<CardDescription>ご連絡はこちらからお願いします</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="flex flex-col md:flex-row gap-4 justify-between">
								<div className="space-y-2">
									<p className="text-sm text-muted-foreground">メール</p>
									<p>
										<a
											href="mailto:example@example.com"
											className="text-primary hover:underline"
										>
											example@example.com
										</a>
									</p>
								</div>
								<div className="space-y-2">
									<p className="text-sm text-muted-foreground">SNS</p>
									<div className="flex gap-4">
										<a
											href="https://github.com/"
											target="_blank"
											rel="noopener noreferrer"
											className="text-primary hover:underline"
										>
											GitHub
										</a>
										<a
											href="https://twitter.com/"
											target="_blank"
											rel="noopener noreferrer"
											className="text-primary hover:underline"
										>
											Twitter
										</a>
										<a
											href="https://linkedin.com/"
											target="_blank"
											rel="noopener noreferrer"
											className="text-primary hover:underline"
										>
											LinkedIn
										</a>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</Container>
		</>
	);
}
