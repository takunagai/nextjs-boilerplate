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
				authorName="永井 拓也"
			/>
			<BreadcrumbJsonLd items={jsonLdBreadcrumbs} />

			<Container className="mt-8">
				<Breadcrumb items={uiBreadcrumbs} />
			</Container>

			<Container width="md" className="space-y-8" paddingY="lg">
				{/* プロフィールカード */}
				<div className="bg-card rounded-lg overflow-hidden shadow-sm border border-border">
					<div className="bg-primary/10 h-32 relative" />
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
								<h1 className="text-3xl font-bold mb-1">永井 拓也（Taku）</h1>
								<p className="text-xl text-muted-foreground mb-2">
									AI活用パートナー
								</p>
								<p className="text-sm text-muted-foreground mb-4">
									📍 宝塚市（オンライン対応可）
								</p>
								<div className="flex flex-wrap gap-2">
									<Badge className="bg-primary/10 text-primary hover:bg-primary/20">
										15年のウェブ制作経験
									</Badge>
									<Badge className="bg-primary/10 text-primary hover:bg-primary/20">
										AI活用コンサル
									</Badge>
									<Badge className="bg-primary/10 text-primary hover:bg-primary/20">
										クリエイティブ支援
									</Badge>
									<Badge className="bg-primary/10 text-primary hover:bg-primary/20">
										ワンストップ対応
									</Badge>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* メインメッセージセクション */}
				<section className="bg-muted/30 rounded-lg p-6 border border-border shadow-sm">
					<div className="flex items-center gap-2 mb-4">
						<FaUser className="h-5 w-5 text-primary" />
						<h2 className="text-2xl font-bold">はじめまして</h2>
					</div>
					<div className="space-y-4">
						<p className="leading-7 text-lg">
							<span className="font-semibold text-primary">はじめまして、永井拓也（Taku）です。</span>
						</p>
						<p className="leading-7">
							15年以上ウェブ制作に携わってきた経験と、最新の AI 技術を組み合わせて、
							あなたのビジネスの<span className="font-semibold">「できたらいいな」</span>を<span className="font-semibold">「できた！」</span>に変えるお手伝いをしています。
						</p>
						<p className="leading-7">
							技術の話も、できるだけ分かりやすく。
							一緒に、<span className="font-semibold text-primary">AI の可能性</span>を探していきましょう。
						</p>
					</div>
				</section>

				{/* 私の強みセクション */}
				<section className="bg-card rounded-lg p-6 border border-border shadow-sm">
					<div className="flex items-center gap-2 mb-6">
						<FaCode className="h-5 w-5 text-primary" />
						<h2 className="text-2xl font-bold">私の強み</h2>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="bg-muted/30 rounded-lg p-4 border border-border">
							<h3 className="text-lg font-semibold mb-2">1. 総合的な制作スキル</h3>
							<ul className="space-y-1 text-sm text-muted-foreground">
								<li>• 企画から運用まで、ワンストップで対応</li>
								<li>• デザインもコーディングも分かるから、話が早い</li>
								<li>• 15年の経験で培った「勘所」</li>
							</ul>
						</div>
						<div className="bg-muted/30 rounded-lg p-4 border border-border">
							<h3 className="text-lg font-semibold mb-2">2. AI ツールの実践的な知識</h3>
							<ul className="space-y-1 text-sm text-muted-foreground">
								<li>• ChatGPT、Claude、Midjourney など主要ツールを日常使用</li>
								<li>• 最新情報を常にキャッチアップ</li>
								<li>• 「使える AI 活用法」を熟知</li>
							</ul>
						</div>
						<div className="bg-muted/30 rounded-lg p-4 border border-border">
							<h3 className="text-lg font-semibold mb-2">3. 翻訳者としてのコミュニケーション力</h3>
							<ul className="space-y-1 text-sm text-muted-foreground">
								<li>• 難しい技術用語を、分かりやすい言葉に</li>
								<li>• お客様の「なんとなく」を具体的な形に</li>
								<li>• IT が苦手な方にも安心してもらえる説明</li>
							</ul>
						</div>
						<div className="bg-muted/30 rounded-lg p-4 border border-border">
							<h3 className="text-lg font-semibold mb-2">4. 柔軟な対応力</h3>
							<ul className="space-y-1 text-sm text-muted-foreground">
								<li>• 予算に合わせた最適なプラン提案</li>
								<li>• スピード重視から品質重視まで、ニーズに対応</li>
								<li>• 「できません」より「こうしたらできます」</li>
							</ul>
						</div>
					</div>
				</section>

				{/* スキル・使用ツールセクション */}
				<section className="bg-card rounded-lg p-6 border border-border shadow-sm">
					<div className="flex items-center gap-2 mb-6">
						<FaServer className="h-5 w-5 text-primary" />
						<h2 className="text-2xl font-bold">スキル・使用ツール</h2>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div>
							<h3 className="text-lg font-semibold mb-4 text-primary">ウェブ制作</h3>
							<div className="space-y-2">
								<Badge className="mr-2 mb-2">HTML / CSS / JavaScript</Badge>
								<Badge className="mr-2 mb-2">WordPress</Badge>
								<Badge className="mr-2 mb-2">Next.js</Badge>
								<Badge className="mr-2 mb-2">Figma</Badge>
								<Badge className="mr-2 mb-2">Adobe Creative Cloud</Badge>
							</div>
						</div>
						<div>
							<h3 className="text-lg font-semibold mb-4 text-primary">AI ツール</h3>
							<div className="space-y-2">
								<Badge className="mr-2 mb-2">ChatGPT Plus</Badge>
								<Badge className="mr-2 mb-2">Claude Pro</Badge>
								<Badge className="mr-2 mb-2">Midjourney</Badge>
								<Badge className="mr-2 mb-2">DALL-E</Badge>
								<Badge className="mr-2 mb-2">Stable Diffusion</Badge>
								<Badge className="mr-2 mb-2">GitHub Copilot</Badge>
							</div>
						</div>
						<div>
							<h3 className="text-lg font-semibold mb-4 text-primary">その他</h3>
							<div className="space-y-2">
								<Badge className="mr-2 mb-2">SEO / アクセス解析</Badge>
								<Badge className="mr-2 mb-2">SNS マーケティング</Badge>
								<Badge className="mr-2 mb-2">プロジェクト管理</Badge>
							</div>
						</div>
					</div>
				</section>

				{/* 経歴＆AI サービス開始の理由セクション */}
				<section className="bg-card rounded-lg p-6 border border-border shadow-sm">
					<div className="flex items-center gap-2 mb-6">
						<FaBriefcase className="h-5 w-5 text-primary" />
						<h2 className="text-2xl font-bold">経歴とAI サービスを始めた理由</h2>
					</div>

					<div className="relative border-l-2 border-primary/20 ml-3 pl-8 mt-6">
						{/* ウェブ制作経験 */}
						<div className="mb-10 relative">
							<div className="absolute -left-[42px] bg-primary text-primary-foreground p-2 rounded-full border-4 border-background">
								<FaCode className="h-4 w-4" />
							</div>

							<div className="bg-muted/30 rounded-lg p-5">
								<div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2 gap-2">
									<h3 className="text-lg font-semibold">
										15年以上のウェブ制作経験
									</h3>
									<span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded whitespace-nowrap">
										2009年 - 現在
									</span>
								</div>
								<ul className="text-sm text-muted-foreground space-y-1">
									<li>• 企画・デザイン・コーディング・運用まで一貫して対応</li>
									<li>• 中小企業から個人事業主まで、幅広いクライアントをサポート</li>
									<li>• ユーザー目線を大切にした、使いやすいサイト作りが得意</li>
								</ul>
							</div>
						</div>

						{/* AI との出会い */}
						<div className="mb-10 relative">
							<div className="absolute -left-[42px] bg-primary text-primary-foreground p-2 rounded-full border-4 border-background">
								<FaUser className="h-4 w-4" />
							</div>

							<div className="bg-muted/30 rounded-lg p-5">
								<div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2 gap-2">
									<h3 className="text-lg font-semibold">
										AI との出会い
									</h3>
									<span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded whitespace-nowrap">
										2023年初頭 -
									</span>
								</div>
								<ul className="text-sm text-muted-foreground space-y-1">
									<li>• ChatGPT 登場初期から AI の可能性に注目</li>
									<li>• 日々進化する AI ツールを研究・実践</li>
									<li>• AI を「道具」として使いこなす方法を追求</li>
								</ul>
							</div>
						</div>

						{/* きっかけ */}
						<div className="mb-10 relative">
							<div className="absolute -left-[42px] bg-primary text-primary-foreground p-2 rounded-full border-4 border-background">
								<FaCode className="h-4 w-4" />
							</div>

							<div className="bg-muted/30 rounded-lg p-5">
								<h3 className="text-lg font-semibold mb-2">
									きっかけ：長年の課題
								</h3>
								<p className="text-sm text-muted-foreground">
									「もっと早く、もっと安く、でも品質は落とさずにサービスを提供できないか」
									<br />
									そんな時に出会ったのが AI でした。
								</p>
							</div>
						</div>

						{/* 発見 */}
						<div className="mb-10 relative">
							<div className="absolute -left-[42px] bg-primary text-primary-foreground p-2 rounded-full border-4 border-background">
								<FaCode className="h-4 w-4" />
							</div>

							<div className="bg-muted/30 rounded-lg p-5">
								<h3 className="text-lg font-semibold mb-2">
									発見：AI の可能性と限界
								</h3>
								<div className="text-sm text-muted-foreground space-y-2">
									<p>最初は半信半疑でした。でも使ってみて驚きました。</p>
									<ul className="space-y-1">
										<li>• リサーチが数時間→数分に</li>
										<li>• コンテンツ作成が1日→1時間に</li>
										<li>• コーディングの効率が3倍以上に</li>
									</ul>
									<p>でも同時に気づいたんです。AI にも「苦手なこと」があることに。</p>
								</div>
							</div>
						</div>

						{/* 確信 */}
						<div className="relative">
							<div className="absolute -left-[42px] bg-primary text-primary-foreground p-2 rounded-full border-4 border-background">
								<FaUser className="h-4 w-4" />
							</div>

							<div className="bg-muted/50 rounded-lg p-5 border-2 border-primary/20">
								<h3 className="text-lg font-semibold mb-2">
									確信：AI と人の最強コンビ
								</h3>
								<div className="text-sm text-muted-foreground space-y-2">
									<p>AI が作った「ちょっと変な部分」を、私の経験で調整する。この組み合わせなら、今までにない価値を提供できる。</p>
									<div className="text-center mt-3 p-3 bg-primary/10 rounded-lg">
										<p className="font-bold text-lg">
											<span className="text-primary">AI の効率</span> × <span className="text-primary">人間の感性</span> = <span className="text-primary">最高のサービス</span>
										</p>
									</div>
									<p>この方程式を確信して、AI サービス事業を立ち上げました。</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* 大切にしていることセクション */}
				<section className="bg-muted/30 rounded-lg p-6 border border-border shadow-sm">
					<div className="flex items-center gap-2 mb-6">
						<FaUser className="h-5 w-5 text-primary" />
						<h2 className="text-2xl font-bold">大切にしていること</h2>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div className="bg-card rounded-lg p-4 border border-border">
							<h3 className="text-lg font-semibold mb-3">お客様との関係</h3>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li>• <span className="font-semibold text-foreground">対等なパートナーとして</span></li>
								<li>• 一方的な提案ではなく、一緒に考える</li>
								<li>• お客様の強みを引き出すサポート</li>
							</ul>
						</div>
						<div className="bg-card rounded-lg p-4 border border-border">
							<h3 className="text-lg font-semibold mb-3">仕事への姿勢</h3>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li>• <span className="font-semibold text-foreground">誠実さ</span></li>
								<li>• できることとできないことを正直に</li>
								<li>• 納期と品質の約束は必ず守る</li>
							</ul>
						</div>
						<div className="bg-card rounded-lg p-4 border border-border">
							<h3 className="text-lg font-semibold mb-3">AI との向き合い方</h3>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li>• <span className="font-semibold text-foreground">道具として使いこなす</span></li>
								<li>• AI に振り回されない</li>
								<li>• あくまで人間が主役</li>
							</ul>
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
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="space-y-4">
								<div>
									<h3 className="font-medium mb-2">📞 直接相談</h3>
									<a
										href="/contact"
										className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition-colors"
									>
										無料相談を予約する
									</a>
								</div>
								<div>
									<h3 className="font-medium mb-2">📱 LINE</h3>
									<a
										href="https://line.me/ti/p/gwTCBKP8jY"
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center gap-2 text-primary hover:underline"
									>
										<span className="text-lg">💬</span>
										LINE でお気軽に相談
									</a>
								</div>
							</div>
							<div className="space-y-3">
								<h3 className="font-medium">SNS フォロー</h3>
								<div className="space-y-2">
									<a
										href="https://x.com/nagataku_ai"
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center gap-2 text-primary hover:underline"
									>
										<FaTwitter className="h-5 w-5" />
										@nagataku_ai（X）
									</a>
									<a
										href="https://www.instagram.com/nagataku33/"
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center gap-2 text-primary hover:underline"
									>
										<span className="text-lg">📷</span>
										@nagataku33（Instagram）
									</a>
								</div>
								<p className="text-xs text-muted-foreground mt-3">
									最新のAI情報やお役立ち情報を発信中！
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</Container>
		</>
	);
}
