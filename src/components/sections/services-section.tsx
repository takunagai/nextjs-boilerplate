"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { type FeatureItem, FeatureItems } from "@/components/ui/feature-items";
import { Heading } from "@/components/ui/heading";
import { usePerformanceCheck } from "@/hooks/use-webgl-support";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
	FaArrowRight,
	FaChalkboardUser,
	FaCode,
	FaPaintbrush,
} from "react-icons/fa6";

// 動的インポート - エフェクトコンポーネント
const FlowingComments = dynamic(
	() =>
		import("@/components/effects/flowing-comments").then((mod) => ({
			default: mod.FlowingComments,
		})),
	{
		ssr: false,
		loading: () => (
			<div className="absolute inset-0 animate-pulse bg-gradient-to-r from-blue-50/20 to-purple-50/20" />
		),
	},
);

const LightweightBackground = dynamic(
	() =>
		import("@/components/background/lightweight-background").then((mod) => ({
			default: mod.LightweightBackground,
		})),
	{
		ssr: false,
		loading: () => (
			<div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50" />
		),
	},
);

// FeatureItem形式でサービスデータを定義
const services: FeatureItem[] = [
	{
		id: "web-development",
		title: "ウェブ制作・アプリ開発",
		description:
			"AI を活用した効率的な制作で、通常の 50〜70% OFF を実現。\n高品質なのに、驚きの低価格でお客様のニーズにお応えします。",
		imageUrl: "/dummy-images/web-development.jpg",
		icon: <FaCode className="w-6 h-6 text-blue-600" />,
		buttonText: "詳しく見る",
		buttonUrl: "/services/web-development",
		// 追加データ
		subtitle: "高品質なのに、驚きの低価格",
		features: [
			"Next.js + AI API での最新 Web アプリ",
			"WordPress サイトも AI 機能でパワーアップ",
			"既存サイトのリニューアルや単発の部分作業もお任せ",
		],
	},
	{
		id: "creative",
		title: "クリエイティブ",
		description:
			"文章も画像も動画も音楽も。\nAI x デザイナーで仕上げる二人三脚スタイルで、時間とスキルの壁を突破します。",
		imageUrl: "/dummy-images/creative.jpg",
		icon: <FaPaintbrush className="w-6 h-6 text-purple-600" />,
		buttonText: "詳しく見る",
		buttonUrl: "/services/creative",
		// 追加データ
		subtitle: "時間とスキルの壁を、AI で突破",
		features: [
			"質の高いブログ記事・SNS 投稿を効率的に作成",
			"オリジナル画像・ロゴ制作",
			"動画・BGM 制作もお手軽に",
		],
	},
	{
		id: "consulting",
		title: "プチコンサル＆レクチャー",
		description:
			"ご相談者様のレベルに合わせた解説を心がけます。\nAI の「？」を「！」に変えて、あなたのペースで実践的な AI 活用を。",
		imageUrl: "/dummy-images/consulting.jpg",
		icon: <FaChalkboardUser className="w-6 h-6 text-green-600" />,
		buttonText: "詳しく見る",
		buttonUrl: "/services/consulting",
		// 追加データ
		subtitle: "AI の「？」を「！」に変える",
		features: [
			"30分からのスポット相談",
			"実践的な AI 活用講座",
			"マンツーマンの継続サポート",
		],
	},
];

// 各サービス別のフローコメント
const WEB_DEV_COMMENTS = [
	"最新のAI技術を活用",
	"驚きの低価格を実現",
	"品質は妥協しません",
	"Next.js + AI APIで最先端開発",
	"WordPress × AI でパワーアップ",
	"効率的な制作で50〜70% OFF",
	"高品質なWeb制作",
	"AI機能でサイトを強化",
	"最新技術をお手軽に",
	"レスポンシブデザイン対応",
	"SEO対策も万全",
	"高速ローディング",
];

const CREATIVE_COMMENTS = [
	"AIとデザイナーの二人三脚",
	"ブログ記事作成もAIで効率化",
	"オリジナル画像・ロゴ制作",
	"動画・BGM制作もお手軽に",
	"クリエイティブ作業も効率化",
	"時間とスキルの壁を突破",
	"プロフェッショナルな仕上がり",
	"オリジナリティあふれる作品",
	"ブランディング支援",
	"ビジュアル表現の向上",
	"コンテンツ制作の効率化",
	"クリエイティブソリューション",
];

const CONSULTING_COMMENTS = [
	"30分からのスポット相談",
	"実践的なAI活用講座",
	"マンツーマンサポート",
	"初心者にも分かりやすく",
	"お客様のペースで進めます",
	"AIの「？」を「！」に変える",
	"迅速な対応を心がけます",
	"お客様の課題を解決",
	"カスタマイズレッスン",
	"継続的なサポート",
	"実用的なAIスキル習得",
	"ビジネス活用のコツ",
];

export function ServicesSection() {
	const { shouldLoad3D, isMediumOrBetter, isLoading } = usePerformanceCheck();

	// 各サービス別のコメント配列を取得する関数
	const getCommentsForService = (serviceId: string) => {
		switch (serviceId) {
			case "web-development":
				return WEB_DEV_COMMENTS;
			case "creative":
				return CREATIVE_COMMENTS;
			case "consulting":
				return CONSULTING_COMMENTS;
			default:
				return WEB_DEV_COMMENTS;
		}
	};

	return (
		<section className="w-full py-16 md:py-24 bg-background relative overflow-hidden">
			<Container
				width="2xl"
				paddingY="lg"
				paddingX="lg"
				className="relative z-10"
			>
				<div className="text-center mb-16">
					<Heading as="h2" align="center" className="mb-4">
						3つのサービス紹介
					</Heading>
					<p className="text-muted-foreground max-w-2xl mx-auto">
						AI を活用した効率的なサービスで、あなたの課題を解決します
					</p>
				</div>

				{/* 左右交互レイアウト */}
				<FeatureItems
					items={services}
					variant="split"
					alternateLayout={true}
					spacing="large"
					renderItem={(item, index) => (
						<div key={item.id} className="relative overflow-hidden">
							{/* 各サービスエリアの背景エフェクト */}
							{!isLoading && shouldLoad3D && (
								<FlowingComments
									maxComments={isMediumOrBetter ? 15 : 10}
									comments={getCommentsForService(item.id)}
								/>
							)}

							{/* ライトウェイト背景（3Dエフェクトが無効な場合） */}
							{!shouldLoad3D && !isLoading && (
								<LightweightBackground variant="gradient" opacity={0.3} />
							)}

							{/* カスタムサービスレイアウト */}
							<div
								className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center py-12 ${
									index % 2 === 1 ? "md:[direction:rtl]" : ""
								}`}
							>
								{/* テキストコンテンツ - モバイルでは下に表示 */}
								<div className="flex flex-col gap-6 max-w-xl [direction:ltr] relative z-20 order-2 md:order-none">
									<div className="flex items-center gap-3">
										{item.icon && (
											<div className="flex-shrink-0">{item.icon}</div>
										)}
										<h3 className="text-2xl md:text-3xl font-bold">
											{item.title}
										</h3>
									</div>

									{/* サブタイトル */}
									{item.subtitle && (
										<p className="text-lg font-semibold text-primary">
											{item.subtitle}
										</p>
									)}

									{/* 説明文 */}
									<p className="text-foreground/80 leading-relaxed whitespace-pre-line">
										{item.description}
									</p>

									{/* 特徴リスト */}
									{item.features && Array.isArray(item.features) && (
										<ul className="space-y-3">
											{(item.features as string[]).map((feature: string) => (
												<li
													key={feature}
													className="text-sm text-muted-foreground flex items-start gap-2"
												>
													<span className="text-primary">•</span>
													{feature}
												</li>
											))}
										</ul>
									)}

									{/* ボタン */}
									{item.buttonText && item.buttonUrl && (
										<div>
											<Button asChild variant="outline" size="lg">
												<Link href={item.buttonUrl}>
													{item.buttonText}
													<FaArrowRight className="w-4 h-4 ml-2" />
												</Link>
											</Button>
										</div>
									)}
								</div>

								{/* 画像 - モバイルでは上に表示 */}
								{item.imageUrl && (
									<div className="relative w-full h-full overflow-hidden rounded-lg [direction:ltr] order-1 md:order-none">
										<div className="aspect-[4/3] relative">
											<div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
												<div className="text-center text-muted-foreground">
													<div className="w-16 h-16 mx-auto mb-4 opacity-50">
														{item.icon}
													</div>
													<p className="text-sm">画像準備中</p>
													<p className="text-xs">{item.title}</p>
												</div>
											</div>
										</div>
									</div>
								)}
							</div>
						</div>
					)}
				/>
			</Container>
		</section>
	);
}
