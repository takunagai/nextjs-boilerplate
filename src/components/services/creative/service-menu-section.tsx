"use client";

import { useState } from "react";
import {
	FaPenToSquare,
	FaImage,
	FaVideo,
	FaMusic,
	FaCircleCheck,
} from "react-icons/fa6";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";

interface ServiceItem {
	title: string;
	description: string;
	features: string[];
}

interface ServiceMenu {
	id: string;
	title: string;
	subtitle: string;
	icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
	iconColor: string;
	items: ServiceItem[];
}

const serviceMenus: ServiceMenu[] = [
	{
		id: "writing",
		title: "AI ライティング",
		subtitle: "もう記事作成に悩まない！SEO に強い文章を高速作成",
		icon: FaPenToSquare,
		iconColor: "text-blue-600",
		items: [
			{
				title: "ブログ記事作成（SEO 対策込み）",
				description: "2,000〜5,000文字の充実した内容",
				features: [
					"キーワード調査から構成まで AI が提案",
					"読みやすく、人間味のある文章に調整",
					"SEO最適化で検索順位アップ",
				],
			},
			{
				title: "SNS 投稿文作成",
				description: "各プラットフォームに最適化された投稿文",
				features: [
					"Twitter、Instagram、Facebook 用に最適化",
					"バズりやすい構成を AI が分析",
					"月間投稿カレンダー付き",
				],
			},
			{
				title: "商品説明文・LP コピー",
				description: "売れる文章で商品の魅力を最大化",
				features: [
					"売れる文章の型を AI が適用",
					"ターゲットに刺さる表現に調整",
					"コンバージョン率向上をサポート",
				],
			},
			{
				title: "メルマガ原稿",
				description: "開封率・クリック率を向上させる配信文",
				features: [
					"開封率を上げる件名を AI が提案",
					"読者の行動を促す構成",
					"継続的な関係構築をサポート",
				],
			},
		],
	},
	{
		id: "image",
		title: "画像生成",
		subtitle: "イメージを伝えるだけで、プロ級のビジュアルが完成",
		icon: FaImage,
		iconColor: "text-purple-600",
		items: [
			{
				title: "イメージ画像・イラスト制作",
				description: "Midjourney、DALL-E で高品質生成",
				features: [
					"「なんか変」な部分を修正・調整",
					"商用利用 OK の安心クオリティ",
					"様々なスタイルに対応",
				],
			},
			{
				title: "バリエーション展開",
				description: "一つのアイデアから多彩なパターンを生成",
				features: [
					"1つのデザインから複数パターン作成",
					"SNS 用にサイズ展開",
					"季節やキャンペーンに合わせたアレンジ",
				],
			},
			{
				title: "ロゴ制作",
				description: "ブランドの個性を表現するオリジナルロゴ",
				features: [
					"AI でアイデア出し → 人の手で仕上げ",
					"使いやすいデータ形式で納品",
					"簡易ブランドガイドライン付き",
				],
			},
		],
	},
	{
		id: "video",
		title: "動画生成",
		subtitle: "撮影不要！AI で魅力的な動画コンテンツを",
		icon: FaVideo,
		iconColor: "text-green-600",
		items: [
			{
				title: "ショート動画（〜60秒）",
				description: "SNS プラットフォーム向けの短時間動画",
				features: [
					"TikTok、Reels、Shorts 用に最適化",
					"AI で素材生成 → プロ編集ソフトで仕上げ",
					"月 10本パックでお得に",
				],
			},
			{
				title: "解説動画",
				description: "商品・サービスを分かりやすく説明",
				features: [
					"商品・サービスの説明動画",
					"AI ナレーション付き",
					"図解アニメーションで分かりやすく",
				],
			},
			{
				title: "プロモーション動画",
				description: "企業や商品の魅力を伝える PR動画",
				features: [
					"企業 PR、イベント告知用",
					"ストーリー性のある構成",
					"BGM・効果音込み",
				],
			},
		],
	},
	{
		id: "sound",
		title: "サウンド生成",
		subtitle: "オリジナル音源で、コンテンツに個性を",
		icon: FaMusic,
		iconColor: "text-orange-600",
		items: [
			{
				title: "BGM 作成",
				description: "シーンに合わせたオリジナル音楽",
				features: [
					"動画用、店舗用、Web サイト用",
					"ジャンル・雰囲気を指定するだけ",
					"ループ対応、尺調整可能",
				],
			},
			{
				title: "効果音作成",
				description: "印象的な演出を彩る効果音",
				features: [
					"ボタン音、通知音、演出音",
					"ゲームやアプリ用にも対応",
					"用途に合わせてカスタマイズ",
				],
			},
			{
				title: "ナレーション生成",
				description: "自然で聞き取りやすい AI 音声",
				features: [
					"自然な AI 音声（日本語・英語対応）",
					"感情表現も調整可能",
					"原稿作成もお任せ",
				],
			},
		],
	},
];

export function CreativeServiceMenuSection() {
	const [activeTab, setActiveTab] = useState("writing");

	const activeService = serviceMenus.find(
		(service) => service.id === activeTab,
	);

	return (
		<section id="service-menu" className="w-full py-16 md:py-24 bg-muted/30">
			<Container width="2xl" paddingY="lg" paddingX="lg">
				<div className="text-center mb-12">
					<Heading as="h2" align="center" className="mb-6">
						サービスメニュー
					</Heading>
					<p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
						AI
						の力を活用したクリエイティブサービスで、あなたのビジネスを加速させます
					</p>
				</div>

				{/* タブナビゲーション */}
				<div className="flex flex-wrap justify-center gap-4 mb-8">
					{serviceMenus.map((service) => {
						const IconComponent = service.icon;
						return (
							<Button
								key={service.id}
								variant={activeTab === service.id ? "default" : "outline"}
								size="lg"
								onClick={() => setActiveTab(service.id)}
								className="flex items-center gap-2 px-6 py-3"
							>
								<IconComponent
									className={`w-5 h-5 ${
										activeTab === service.id ? "text-white" : service.iconColor
									}`}
								/>
								{service.title}
							</Button>
						);
					})}
				</div>

				{/* アクティブサービスの詳細 */}
				{activeService && (
					<div className="space-y-8">
						{/* サービスヘッダー */}
						<div className="text-center">
							<Heading as="h3" className="text-2xl md:text-3xl mb-4">
								<span className={activeService.iconColor}>
									{activeService.title}
								</span>
							</Heading>
							<p className="text-lg text-muted-foreground font-medium">
								{activeService.subtitle}
							</p>
						</div>

						{/* サービス項目 */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{activeService.items.map((item, index) => (
								<Card
									key={index}
									className="h-full hover:shadow-lg transition-all duration-300"
								>
									<CardHeader>
										<CardTitle className="text-lg leading-tight">
											{item.title}
										</CardTitle>
										<p className="text-sm text-muted-foreground">
											{item.description}
										</p>
									</CardHeader>
									<CardContent>
										<ul className="space-y-2">
											{item.features.map((feature, featureIndex) => (
												<li
													key={featureIndex}
													className="flex items-start gap-2 text-sm"
												>
													<FaCircleCheck className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
													<span>{feature}</span>
												</li>
											))}
										</ul>
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				)}

				{/* CTA */}
				<div className="text-center mt-12">
					<div className="inline-block bg-gradient-to-r from-blue-600 to-orange-500 text-white px-8 py-4 rounded-full">
						<p className="text-lg font-bold">
							気になるサービスはありましたか？
							<br />
							詳しい内容はお気軽にお問い合わせください！
						</p>
					</div>
				</div>
			</Container>
		</section>
	);
}
