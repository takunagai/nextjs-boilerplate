import {
	ArticleJsonLd,
	BreadcrumbJsonLd,
	generateMetadata,
	generateViewport,
} from "@/components/seo";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { META } from "@/lib/constants";
import { createBreadcrumbs } from "@/lib/utils";
import type { Metadata } from "next";
import Image from "next/image";
import {
	FaBriefcase,
	FaCode,
	FaEnvelope,
	FaGithub,
	FaGraduationCap,
	FaLinkedin,
	FaServer,
	FaTwitter,
	FaUser,
} from "react-icons/fa6";

export const metadata: Metadata = generateMetadata({
	title: "自己紹介",
	description:
		"フロントエンドエンジニアとしての経歴、スキル、実績についてご紹介します。",
	keywords: [
		"自己紹介",
		"プロフィール",
		"フロントエンドエンジニア",
		"スキル",
		"経歴",
	],
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
	const { ui: uiBreadcrumbs, jsonLd: jsonLdBreadcrumbs } =
		createBreadcrumbs(breadcrumbItems);

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

			<Container className="mt-8">
				<Breadcrumb items={uiBreadcrumbs} />
			</Container>

			<Container width="md" className="space-y-8" paddingY="lg">
				{/* プロフィールカード */}
				<div className="bg-card rounded-lg overflow-hidden shadow-sm border border-border">
					<div className="bg-primary/10 h-32 relative"></div>
					<div className="px-6 pb-6">
						<div className="flex flex-col md:flex-row gap-6">
							<div className="relative -mt-16">
								<div className="h-32 w-32 rounded-full border-4 border-background overflow-hidden shadow-md">
									<Image
										src="/dummy-images/profile-placeholder.jpg"
										alt="プロフィール画像"
										width={128}
										height={128}
										className="object-cover"
										priority
									/>
								</div>
							</div>
							<div className="pt-4 md:pt-0">
								<h1 className="text-3xl font-bold mb-1">山田 太郎</h1>
								<p className="text-xl text-muted-foreground mb-4">
									フロントエンドエンジニア
								</p>
								<div className="flex flex-wrap gap-2">
									<Badge className="bg-primary/10 text-primary hover:bg-primary/20">
										Next.js
									</Badge>
									<Badge className="bg-primary/10 text-primary hover:bg-primary/20">
										React
									</Badge>
									<Badge className="bg-primary/10 text-primary hover:bg-primary/20">
										TypeScript
									</Badge>
									<Badge className="bg-primary/10 text-primary hover:bg-primary/20">
										Tailwind CSS
									</Badge>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* 自己紹介セクション */}
				<section className="bg-card rounded-lg p-6 border border-border shadow-sm">
					<div className="flex items-center gap-2 mb-4">
						<FaUser className="h-5 w-5 text-primary" />
						<h2 className="text-2xl font-bold">自己紹介</h2>
					</div>
					<div className="space-y-4">
						<p className="leading-7">
							はじめまして、山田太郎と申します。フロントエンドエンジニアとして5年間の経験があり、
							モダンなWebアプリケーション開発に情熱を持っています。
						</p>
						<p className="leading-7">
							Next.js、React、TypeScriptを中心としたスタックを使用して、
							パフォーマンスが高く、アクセシブルで、ユーザーフレンドリーなウェブサイトの構築を得意としています。
						</p>
						<p className="leading-7">
							趣味は読書、ハイキング、写真撮影です。新しい技術を学ぶことが大好きで、
							常に最新のウェブ開発トレンドについて学んでいます。
						</p>
					</div>
				</section>

				{/* スキルセクション */}
				<section className="bg-card rounded-lg p-6 border border-border shadow-sm">
					<div className="flex items-center gap-2 mb-4">
						<FaCode className="h-5 w-5 text-primary" />
						<h2 className="text-2xl font-bold">スキル</h2>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
						<div>
							<div className="flex items-center gap-2 mb-4">
								<FaCode className="h-4 w-4 text-primary" />
								<h3 className="text-lg font-semibold">フロントエンド</h3>
							</div>
							<ul className="space-y-4">
								<li>
									<div className="flex justify-between mb-1">
										<span className="font-medium">Next.js</span>
										<span className="text-sm text-primary">上級</span>
									</div>
									<div className="w-full bg-muted rounded-full h-2">
										<div
											className="bg-primary h-2 rounded-full"
											style={{ width: "90%" }}
										></div>
									</div>
								</li>
								<li>
									<div className="flex justify-between mb-1">
										<span className="font-medium">React</span>
										<span className="text-sm text-primary">上級</span>
									</div>
									<div className="w-full bg-muted rounded-full h-2">
										<div
											className="bg-primary h-2 rounded-full"
											style={{ width: "85%" }}
										></div>
									</div>
								</li>
								<li>
									<div className="flex justify-between mb-1">
										<span className="font-medium">TypeScript</span>
										<span className="text-sm text-primary">中級</span>
									</div>
									<div className="w-full bg-muted rounded-full h-2">
										<div
											className="bg-primary h-2 rounded-full"
											style={{ width: "70%" }}
										></div>
									</div>
								</li>
								<li>
									<div className="flex justify-between mb-1">
										<span className="font-medium">Tailwind CSS</span>
										<span className="text-sm text-primary">上級</span>
									</div>
									<div className="w-full bg-muted rounded-full h-2">
										<div
											className="bg-primary h-2 rounded-full"
											style={{ width: "85%" }}
										></div>
									</div>
								</li>
							</ul>
						</div>

						<div>
							<div className="flex items-center gap-2 mb-4">
								<FaServer className="h-4 w-4 text-primary" />
								<h3 className="text-lg font-semibold">バックエンド</h3>
							</div>
							<ul className="space-y-4">
								<li>
									<div className="flex justify-between mb-1">
										<span className="font-medium">Node.js</span>
										<span className="text-sm text-primary">中級</span>
									</div>
									<div className="w-full bg-muted rounded-full h-2">
										<div
											className="bg-primary h-2 rounded-full"
											style={{ width: "65%" }}
										></div>
									</div>
								</li>
								<li>
									<div className="flex justify-between mb-1">
										<span className="font-medium">PostgreSQL</span>
										<span className="text-sm text-primary">初級</span>
									</div>
									<div className="w-full bg-muted rounded-full h-2">
										<div
											className="bg-primary h-2 rounded-full"
											style={{ width: "45%" }}
										></div>
									</div>
								</li>
								<li>
									<div className="flex justify-between mb-1">
										<span className="font-medium">REST API</span>
										<span className="text-sm text-primary">中級</span>
									</div>
									<div className="w-full bg-muted rounded-full h-2">
										<div
											className="bg-primary h-2 rounded-full"
											style={{ width: "75%" }}
										></div>
									</div>
								</li>
								<li>
									<div className="flex justify-between mb-1">
										<span className="font-medium">GraphQL</span>
										<span className="text-sm text-primary">初級</span>
									</div>
									<div className="w-full bg-muted rounded-full h-2">
										<div
											className="bg-primary h-2 rounded-full"
											style={{ width: "40%" }}
										></div>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</section>

				{/* 経歴セクション */}
				<section className="bg-card rounded-lg p-6 border border-border shadow-sm">
					<div className="flex items-center gap-2 mb-6">
						<FaBriefcase className="h-5 w-5 text-primary" />
						<h2 className="text-2xl font-bold">経歴</h2>
					</div>

					<div className="relative border-l-2 border-primary/20 ml-3 pl-8 mt-6">
						{/* 経歴アイテム1 */}
						<div className="mb-10 relative">
							{/* タイムラインドット */}
							<div className="absolute -left-[42px] bg-primary text-primary-foreground p-2 rounded-full border-4 border-background">
								<FaBriefcase className="h-4 w-4" />
							</div>

							<div className="bg-muted/30 rounded-lg p-5">
								<div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2 gap-2">
									<h3 className="text-lg font-semibold">
										株式会社テックイノベーション
									</h3>
									<span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded whitespace-nowrap">
										2020年 - 現在
									</span>
								</div>
								<p className="font-medium text-muted-foreground mb-2">
									シニアフロントエンドエンジニア
								</p>
								<p className="text-sm">
									大規模なWebアプリケーションの開発と保守を担当。
									Next.jsとTypeScriptを使用したプロジェクトのリード。
									パフォーマンス最適化とアクセシビリティ改善に注力。
								</p>
							</div>
						</div>

						{/* 経歴アイテム2 */}
						<div className="mb-10 relative">
							{/* タイムラインドット */}
							<div className="absolute -left-[42px] bg-primary text-primary-foreground p-2 rounded-full border-4 border-background">
								<FaBriefcase className="h-4 w-4" />
							</div>

							<div className="bg-muted/30 rounded-lg p-5">
								<div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2 gap-2">
									<h3 className="text-lg font-semibold">
										株式会社デジタルクリエイト
									</h3>
									<span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded whitespace-nowrap">
										2018年 - 2020年
									</span>
								</div>
								<p className="font-medium text-muted-foreground mb-2">
									フロントエンドエンジニア
								</p>
								<p className="text-sm">
									Reactを使用したSPAの開発。
									UIコンポーネントライブラリの構築と保守。
									チームでのコードレビューとベストプラクティスの共有。
								</p>
							</div>
						</div>

						{/* 経歴アイテム3 */}
						<div className="relative">
							{/* タイムラインドット */}
							<div className="absolute -left-[42px] bg-primary text-primary-foreground p-2 rounded-full border-4 border-background">
								<FaGraduationCap className="h-4 w-4" />
							</div>

							<div className="bg-muted/30 rounded-lg p-5">
								<div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2 gap-2">
									<h3 className="text-lg font-semibold">東京工科大学</h3>
									<span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded whitespace-nowrap">
										2014年 - 2018年
									</span>
								</div>
								<p className="font-medium text-muted-foreground mb-2">
									情報工学部 情報システム学科
								</p>
								<p className="text-sm">
									Webアプリケーション開発と情報システム設計を専攻。
									卒業プロジェクトでは学内イベント管理システムを開発。
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* お問い合わせセクション */}
				<Card className="border-primary/10 overflow-hidden shadow-sm">
					<div className="bg-primary/5 p-6">
						<div className="flex items-center gap-2">
							<FaEnvelope className="h-5 w-5 text-primary" />
							<CardTitle>お問い合わせ</CardTitle>
						</div>
						<CardDescription className="mt-2">
							ご連絡はこちらからお願いします
						</CardDescription>
					</div>
					<CardContent className="pt-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="space-y-3">
								<h3 className="font-medium">メール</h3>
								<a
									href="mailto:example@example.com"
									className="flex items-center gap-2 text-primary hover:underline"
								>
									<FaEnvelope className="h-4 w-4" />
									example@example.com
								</a>
							</div>
							<div className="space-y-3">
								<h3 className="font-medium">SNS</h3>
								<div className="flex flex-wrap gap-4">
									<a
										href="https://github.com/"
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center gap-1 text-primary hover:underline"
									>
										<FaGithub className="h-5 w-5" />
										GitHub
									</a>
									<a
										href="https://twitter.com/"
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center gap-1 text-primary hover:underline"
									>
										<FaTwitter className="h-5 w-5" />
										Twitter
									</a>
									<a
										href="https://linkedin.com/"
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center gap-1 text-primary hover:underline"
									>
										<FaLinkedin className="h-5 w-5" />
										LinkedIn
									</a>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</Container>
		</>
	);
}
