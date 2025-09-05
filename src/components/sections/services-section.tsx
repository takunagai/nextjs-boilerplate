"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { AnimatedImage } from "@/components/ui/animated-image";
import {
	FaArrowRight,
	FaChalkboardUser,
	FaCode,
	FaPaintbrush,
} from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { type FeatureItem, FeatureItems } from "@/components/ui/feature-items";
import { Heading } from "@/components/ui/heading";
import { BlobMasks, type BlobShape } from "@/components/ui/blob-mask";
import { usePerformanceCheck } from "@/hooks/use-webgl-support";
import { portfolioCategories } from "@/lib/data/portfolio-data";

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

// FeatureItem形式を拡張してBlob形状を追加
interface ServiceItem extends FeatureItem {
	blobShape: BlobShape;
}

// サービスデータを定義
const services: ServiceItem[] = [
	{
		id: "web-development",
		title: "ウェブ制作・アプリ開発",
		blobShape: "web",
		description:
			"AI を活用した効率的な制作で、高品質かつお手頃な価格を実現。\nお客様のニーズに合わせ、最適な構成を提案いたします。",
		imageUrl: "/images/service-web.jpg",
		icon: <FaCode className="w-6 h-6 text-blue-600" />,
		buttonText: "詳しく見る",
		buttonUrl: "/services/web-development",
		features: [
			"高パフォーマンスな Next.js ウェブサイト/アプリ",
			"多彩な機能を活用できる WordPress サイト",
			"既存サイトのリニューアルや単発の部分作業もお任せ",
		],
	},
	{
		id: "consulting",
		title: "AIコンサル＆サポート",
		blobShape: "consulting",
		description:
			"AI活用による省力化、高品質化、アイデア出しなどをアドバイス。\nご相談者様の状況に合わせ、柔軟なサポートを提供します。",
		imageUrl: "/images/service-consulting.jpg",
		icon: <FaChalkboardUser className="w-6 h-6 text-green-600" />,
		buttonText: "詳しく見る",
		buttonUrl: "/services/ai-consulting-and-support",
		features: [
			"単発のスポット相談・レクチャー",
			"実践的な AI活用講座の講師",
			"用途別のワークフローの構築",
		],
	},
	{
		id: "creative",
		title: "クリエイティブ",
		blobShape: "creative",
		description:
			"文章、写真、イラスト、図解、動画、音楽、3D…。\nAI x デザイナーで、短時間かつお手頃価格で高品質に仕上げます。",
		imageUrl: "/images/service-creative.jpg",
		icon: <FaPaintbrush className="w-6 h-6 text-purple-600" />,
		buttonText: "詳しく見る",
		buttonUrl: "/services/creative",
		features: [
			"質の高い販促用コピー、ブログ記事の作成",
			"AI画像生成と編集技術で仕上げるオリジナル画像やロゴ制作",
			"動画、歌・BGM、3D などもご相談ください",
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
			{/* SVG定義を追加 */}
			<BlobMasks />

			<Container
				width="2xl"
				paddingY="lg"
				paddingX="lg"
				className="relative z-10"
			>
				<div className="text-center mb-16">
					<Heading as="h2" align="center" className="mb-4">
						サービス紹介
					</Heading>
					<p className="text-muted-foreground max-w-2xl mx-auto">
						複数サービスの組合せもOK。ここにないものでもご相談ください。
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
									<div className="relative w-full h-full [direction:ltr] order-1 md:order-none">
										<div
											className="aspect-[4/3] relative overflow-hidden"
											style={{ clipPath: `url(#blob-${item.blobShape})` }}
										>
											<AnimatedImage
												src={item.imageUrl}
												alt={`${item.title}のイメージ画像`}
												width={800}
												height={600}
												className="w-full h-full object-cover"
												sizes="(max-width: 768px) 100vw, 50vw"
												animation={{
													duration: 0.8,
													delay: index * 0.2,
													yOffset: 30,
													ease: "easeOut",
												}}
												intersection={{
													threshold: 0.15,
													rootMargin: "0px 0px -80px 0px",
													triggerOnce: true,
												}}
											/>
										</div>
									</div>
								)}
							</div>
						</div>
					)}
				/>

				{/* カテゴリー紹介 */}
				<div className="mt-12">
					<div className="text-center mb-8">
						<h3 className="text-2xl font-bold mb-3">
							あなたの「できたらいいな」に、全力でお応えします
						</h3>
						<p className="text-muted-foreground max-w-2xl mx-auto">
							どんなご要望も、まずはお聞かせください。15年の経験とAIの力で、最適な解決策をご提案します。
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
						{portfolioCategories.map((category) => (
							<div
								key={category.id}
								className="p-4 border rounded-md bg-card hover:bg-accent/50 transition-colors"
							>
								{category.serviceUrl ? (
									<Link href={category.serviceUrl} className="inline-block">
										<h2 className="text-lg font-semibold hover:underline cursor-pointer mb-2">
											{category.name}
										</h2>
									</Link>
								) : (
									<h2 className="text-lg font-semibold mb-2">
										{category.name}
									</h2>
								)}
								<p className="text-sm text-muted-foreground">
									{category.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</Container>
		</section>
	);
}
