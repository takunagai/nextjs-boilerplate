import type { Metadata } from "next";
import Image from "next/image";
import {
	FaBriefcase,
	FaCode,
	FaEnvelope,
	FaLightbulb,
	FaRocket,
	FaUser,
} from "react-icons/fa6";
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
import { SocialLinks } from "@/components/ui/social-links";
import {
	Timeline,
	TimelineContent,
	TimelineDate,
	TimelineDescription,
	TimelineIcon,
	TimelineItem,
	TimelineTitle,
} from "@/components/ui/timeline";
import { META } from "@/lib/constants";
import { createBreadcrumbs } from "@/lib/utils";

export const metadata: Metadata = generateMetadata({
	title: "プロフィール",
	description:
		"あなたの「できたらいいな」を一緒に実現する、AI 活用パートナー永井拓也のプロフィールをご紹介します。",
	keywords: [
		"プロフィール",
		"永井拓也",
		"AI活用",
		"ウェブ制作",
		"コンサルティング",
		"クリエイティブ",
	],
	canonical: "/about",
});

export const viewport = generateViewport();

export default function AboutPage() {
	// パンくずリストの基本データを定義
	const breadcrumbItems = [
		{ title: "ホーム", path: "/" },
		{ title: "プロフィール", path: "/about", current: true },
	];

	// UI表示用とJSON-LD用のデータを生成
	const { ui: uiBreadcrumbs, jsonLd: jsonLdBreadcrumbs } =
		createBreadcrumbs(breadcrumbItems);

	return (
		<>
			<ArticleJsonLd
				title="プロフィール"
				description="あなたの「できたらいいな」を一緒に実現する、AI 活用パートナー永井拓也のプロフィールをご紹介します。"
				url={`${META.SITE_URL}/about`}
				images={[`${META.SITE_URL}/dummy-images/profile-placeholder.jpg`]}
				datePublished="2023-01-01T00:00:00Z"
				dateModified="2024-01-01T00:00:00Z"
				authorName="ながたく (Taku Nagai)"
			/>
			<BreadcrumbJsonLd items={jsonLdBreadcrumbs} />

			<Container paddingY={"none"}>
				<Breadcrumb items={uiBreadcrumbs} />
			</Container>

			<Container width="md" className="space-y-16" paddingY="lg">
				{/* プロフィールヘッダー */}
				<header className="text-center space-y-8">
					<div className="space-y-4">
						<div className="mx-auto h-40 w-40 rounded-full overflow-hidden shadow-lg">
							<Image
								src="/dummy-images/profile-placeholder.jpg"
								alt="プロフィール画像"
								width={160}
								height={160}
								className="object-cover"
								priority
							/>
						</div>
						<div className="space-y-2">
							<h1 className="text-4xl font-bold tracking-tight">ながたく (Taku Nagai)</h1>
							<p className="text-2xl text-primary font-medium">
								ウェブデザイナー・AI活用コンサルタント
							</p>
							<p className="text-muted-foreground">
								📍 兵庫県川西市<br />
								(北摂、大阪北エリア、オンライン対応可)
							</p>
						</div>
					</div>
					<div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
						<Badge variant="secondary" className="text-sm">
							15年のウェブ制作経験
						</Badge>
						<Badge variant="secondary" className="text-sm">
							AI活用コンサルティング
						</Badge>
						<Badge variant="secondary" className="text-sm">
							クリエイティブ支援
						</Badge>
						<Badge variant="secondary" className="text-sm">
							ワンストップ対応
						</Badge>
					</div>
				</header>

				{/* メインメッセージ */}
				<section className="space-y-6">
					<h2 className="text-3xl font-bold text-foreground mb-4 border-l-4 border-primary pl-6">はじめまして</h2>
					<div className="prose prose-lg max-w-none">
						<p className="text-lg leading-8 mb-4">
							15年以上ウェブ制作に携わってきた経験と、最新の AI
							技術を組み合わせて、あなたのビジネスの
							<span className="font-semibold text-primary">「できたらいいな」</span>を
							<span className="font-semibold text-primary">「できた！」</span>
							に変えるお手伝いをしています。
						</p>
						<p className="text-lg leading-8">
							技術の話も、できるだけ分かりやすく。一緒に、
							<span className="font-semibold text-primary">AI の可能性</span>
							を探していきましょう。
						</p>
					</div>
				</section>

				{/* 私の強み */}
				<section className="space-y-8">
					<h2 className="text-3xl font-bold text-foreground mb-8 border-l-4 border-primary pl-6">私の強み</h2>
					<div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							<div className="border-l-2 border-muted pl-6">
								<h3 className="text-xl font-bold mb-3 text-foreground">
									1. 総合的な制作スキル
								</h3>
								<ul className="space-y-2 text-muted-foreground leading-7">
									<li>• 企画から運用まで、ワンストップで対応</li>
									<li>• デザインもコーディングも分かるから、話が早い</li>
									<li>• 15年の経験で培った「勘所」</li>
								</ul>
							</div>
							<div className="border-l-2 border-muted pl-6">
								<h3 className="text-xl font-bold mb-3 text-foreground">
									2. AI ツールの実践的な知識
								</h3>
								<ul className="space-y-2 text-muted-foreground leading-7">
									<li>• ChatGPT、Claude、Midjourney など主要ツールを日常使用</li>
									<li>• 最新情報を常にキャッチアップ</li>
									<li>• 「使える AI 活用法」を熟知</li>
								</ul>
							</div>
							<div className="border-l-2 border-muted pl-6">
								<h3 className="text-xl font-bold mb-3 text-foreground">
									3. 翻訳者としてのコミュニケーション力
								</h3>
								<ul className="space-y-2 text-muted-foreground leading-7">
									<li>• 難しい技術用語を、分かりやすい言葉に</li>
									<li>• お客様の「なんとなく」を具体的な形に</li>
									<li>• IT が苦手な方にも安心してもらえる説明</li>
								</ul>
							</div>
							<div className="border-l-2 border-muted pl-6">
								<h3 className="text-xl font-bold mb-3 text-foreground">
									4. 柔軟な対応力
								</h3>
								<ul className="space-y-2 text-muted-foreground leading-7">
									<li>• 予算に合わせた最適なプラン提案</li>
									<li>• スピード重視から品質重視まで、ニーズに対応</li>
									<li>• 「できません」より「こうしたらできます」</li>
								</ul>
							</div>
						</div>
					</div>
				</section>

				{/* スキル・使用ツール */}
				<section className="space-y-8">
					<h2 className="text-3xl font-bold text-foreground mb-8 border-l-4 border-primary pl-6">スキル・使用ツール</h2>
					<div>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							<div className="space-y-4">
								<h3 className="text-xl font-bold text-primary border-b border-primary/20 pb-2">
									ウェブ制作
								</h3>
								<div className="flex flex-wrap gap-2">
									<Badge variant="outline" className="text-xs">HTML / CSS / JavaScript</Badge>
									<Badge variant="outline" className="text-xs">WordPress</Badge>
									<Badge variant="outline" className="text-xs">Next.js</Badge>
									<Badge variant="outline" className="text-xs">Figma</Badge>
									<Badge variant="outline" className="text-xs">Adobe Creative Cloud</Badge>
								</div>
							</div>
							<div className="space-y-4">
								<h3 className="text-xl font-bold text-primary border-b border-primary/20 pb-2">
									AI ツール
								</h3>
								<div className="flex flex-wrap gap-2">
									<Badge variant="outline" className="text-xs">ChatGPT Plus</Badge>
									<Badge variant="outline" className="text-xs">Claude Pro</Badge>
									<Badge variant="outline" className="text-xs">Midjourney</Badge>
									<Badge variant="outline" className="text-xs">DALL-E</Badge>
									<Badge variant="outline" className="text-xs">Stable Diffusion</Badge>
									<Badge variant="outline" className="text-xs">GitHub Copilot</Badge>
								</div>
							</div>
							<div className="space-y-4">
								<h3 className="text-xl font-bold text-primary border-b border-primary/20 pb-2">
									その他
								</h3>
								<div className="flex flex-wrap gap-2">
									<Badge variant="outline" className="text-xs">SEO / アクセス解析</Badge>
									<Badge variant="outline" className="text-xs">SNS マーケティング</Badge>
									<Badge variant="outline" className="text-xs">プロジェクト管理</Badge>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* 経歴とAI サービスを始めた理由 */}
				<section className="space-y-8">
					<div className="border-l-4 border-primary pl-6">
						<h2 className="text-3xl font-bold text-foreground mb-8">
							経歴
						</h2>
					</div>

					<Timeline className="ml-6">
						{/* 印刷営業、グラフィックデザイナーの経験 */}
						<TimelineItem variant="primary">
							<TimelineIcon variant="primary">
								<FaBriefcase className="h-4 w-4" />
							</TimelineIcon>
							<TimelineContent variant="card">
								<div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2 gap-2">
									<TimelineTitle>印刷営業、グラフィックデザイナーの経験</TimelineTitle>
									<TimelineDate>〜0000年</TimelineDate>
								</div>
								<div className="text-gray-700 dark:text-gray-300">
									<ul className="space-y-1">
										<li>
											• 食品パッケージ(軟包材)の印刷営業を担当
										</li>
										<li>
											• 大手デザイン会社で有名通販カタログの制作を担当
										</li>
									</ul>
								</div>
							</TimelineContent>
						</TimelineItem>

						{/* ウェブデザイナー兼 ECショップ運営の経験 */}
						<TimelineItem variant="primary">
							<TimelineIcon variant="primary">
								<FaBriefcase className="h-4 w-4" />
							</TimelineIcon>
							<TimelineContent variant="card">
								<div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2 gap-2">
									<TimelineTitle>ウェブデザイナー兼 ECショップ運営の経験</TimelineTitle>
									<TimelineDate>〜0000年</TimelineDate>
								</div>
								<div className="text-gray-700 dark:text-gray-300">
									<ul className="space-y-1">
										<li>
											• 寝具の卸会社で ECショップの店長を担当
										</li>
										<li>
											• ECサイトの立ち上げ、商品撮影、コピー作成、バックエンド業務などを経験
										</li>
										<li>
											• 繁盛期は月商700万円くらい
										</li>
									</ul>
								</div>
							</TimelineContent>
						</TimelineItem>

						{/* フリーランスのウェブデザイナー */}
						<TimelineItem variant="primary">
							<TimelineIcon variant="primary">
								<FaCode className="h-4 w-4" />
							</TimelineIcon>
							<TimelineContent variant="card">
								<div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2 gap-2">
									<TimelineTitle>フリーランスのウェブデザイナー</TimelineTitle>
									<TimelineDate>〜2009年</TimelineDate>
								</div>
								<div className="text-gray-700 dark:text-gray-300">
									<ul className="space-y-1">
										<li>
											• 小中規模のウェブサイト(WordPressメイン)の制作を請負
										</li>
										<li>
											• 涼感寝具のECサイトを期間限定で運営
										</li>
										<li>
											• React/Next.js を学び、Jamstack サイトを制作
										</li>
									</ul>
								</div>
							</TimelineContent>
						</TimelineItem>

						{/* AI の導入 */}
						<TimelineItem variant="success">
							<TimelineIcon variant="success">
								<FaLightbulb className="h-4 w-4" />
							</TimelineIcon>
							<TimelineContent variant="card">
								<div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2 gap-2">
									<TimelineTitle>AI の導入</TimelineTitle>
									<TimelineDate>〜0000年</TimelineDate>
								</div>
								<div className="text-gray-700 dark:text-gray-300">
									<ul className="space-y-1">
										<li>• ChatGPT(gpt-3)の登場に衝撃を受け、AI関連情報を追い続ける</li>
										<li>• 様々なジャンルの AIツールを試用、効率的な使い方などを研究</li>
										<li>• コーディングを始めとする様々な作業にAIエージェントを本格的に活用</li>
									</ul>
								</div>
							</TimelineContent>
						</TimelineItem>
					</Timeline>
				</section>

				{/* 大切にしていること */}
				<section className="space-y-8">
					<h2 className="text-3xl font-bold text-foreground mb-8 border-l-4 border-primary pl-6">大切にしていること</h2>
					<div>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							<div className="space-y-4">
								<h3 className="text-xl font-bold text-foreground border-b border-primary/20 pb-2">
									お客様との関係
								</h3>
								<ul className="space-y-3 text-muted-foreground leading-7">
									<li>
										•{" "}
										<span className="font-semibold text-foreground">
											対等なパートナーとして
										</span>
									</li>
									<li>• 一方的な提案ではなく、一緒に考える</li>
									<li>• お客様の強みを引き出すサポート</li>
								</ul>
							</div>
							<div className="space-y-4">
								<h3 className="text-xl font-bold text-foreground border-b border-primary/20 pb-2">
									仕事への姿勢
								</h3>
								<ul className="space-y-3 text-muted-foreground leading-7">
									<li>
										•{" "}
										<span className="font-semibold text-foreground">誠実さ</span>
									</li>
									<li>• できることとできないことを正直に</li>
									<li>• 納期と品質の約束は必ず守る</li>
								</ul>
							</div>
							<div className="space-y-4">
								<h3 className="text-xl font-bold text-foreground border-b border-primary/20 pb-2">
									AI との向き合い方
								</h3>
								<ul className="space-y-3 text-muted-foreground leading-7">
									<li>
										•{" "}
										<span className="font-semibold text-foreground">
											道具として使いこなす
										</span>
									</li>
									<li>• AI に振り回されない</li>
									<li>• あくまで人間が主役</li>
								</ul>
							</div>
						</div>
					</div>
				</section>

				{/* お問い合わせセクション */}
				<Card className="border-primary/10 overflow-hidden shadow-sm">
					<div className="bg-primary/5 p-6">
						<div className="flex items-center gap-2">
							<FaEnvelope className="h-5 w-5 text-primary" />
							<CardTitle>お問い合わせ・SNS</CardTitle>
						</div>
						<CardDescription className="mt-2">
							お気軽にお声がけください！まずは無料相談から
						</CardDescription>
					</div>
					<CardContent className="pt-6">
						<div className="space-y-6">
							{/* 直接相談セクション */}
							<div className="text-center pb-4 border-b">
								<h3 className="font-medium mb-3">📞 直接相談</h3>
								<a
									href="/contact"
									className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
								>
									無料相談を予約する
								</a>
							</div>
							
							{/* SNSリンクセクション */}
							<div>
								<SocialLinks className="pt-0" />
							</div>
						</div>
					</CardContent>
				</Card>
			</Container>
		</>
	);
}
