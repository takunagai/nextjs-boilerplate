import type { FeatureItem } from "@/components/ui/feature-items";
import type { BlobShape } from "@/components/ui/blob-mask";
import {
	FaChalkboardUser,
	FaCode,
	FaPaintbrush,
	FaRocket,
} from "react-icons/fa6";
import React from "react";

// サービス項目の型定義
export interface ServiceItem extends FeatureItem {
	blobShape: BlobShape;
	features?: string[];
}

// サービスデータ定義
export const services: ServiceItem[] = [
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
];;

// サービス別フローコメント
export const serviceComments = {
	"web-development": [
		"最新のAI技術を活用",
		"驚きの低価格を実現",
		"品質は妥協しません",
		"Next.js + AI APIで最先端開発",
		"WordPress × AI でパワーアップ",
		"効率的な制作で50～70% OFF",
		"高品質なWeb制作",
		"AI機能でサイトを強化",
		"最新技術をお手軽に",
		"レスポンシブデザイン対応",
		"SEO対策も万全",
		"高速ローディング",
	],
	creative: [
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
	],
	consulting: [
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
	],
} as const;;

// コメント取得ヘルパー関数
export function getCommentsForService(serviceId: string): readonly string[] {
	return serviceComments[serviceId as keyof typeof serviceComments] || serviceComments["web-development"];
}