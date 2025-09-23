import type { FeatureItem } from "@/components/ui/feature-items";
import type { BlobShape } from "@/components/ui/blob-mask";
import {
	FaChalkboardUser,
	FaCode,
	FaLifeRing,
	FaPaintbrush,
	FaRocket,
	FaWordpress,
	FaWrench,
} from "react-icons/fa6";
import React from "react";

// サービス項目の型定義
export interface ServiceItem extends FeatureItem {
	blobShape: BlobShape;
	features?: string[];
	category?: "main" | "sub"; // メインサービスかサブサービスか
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
		category: "main",
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
		category: "main",
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
		category: "main",
		features: [
			"質の高い販促用コピー、ブログ記事の作成",
			"AI画像生成と編集技術で仕上げるオリジナル画像やロゴ制作",
			"動画、歌・BGM、3D などもご相談ください",
		],
	},
	{
		id: "jamstack",
		title: "Jamstackサイト制作(Next.js)",
		blobShape: "web",
		description:
			"Next.js + TypeScript で高速・安全・SEO最適化されたサイトを制作。\n静的生成とヘッドレスCMSで、パフォーマンスと管理性を両立します。",
		imageUrl: "/images/service-jamstack.jpg",
		icon: <FaRocket className="w-6 h-6 text-green-600" />,
		buttonText: "詳しく見る",
		buttonUrl: "/services/web-development/jamstack",
		category: "sub",
		features: [
			"高速表示・SEO最適化・セキュリティ強化",
			"ヘッドレスCMS連携で簡単コンテンツ管理",
			"CDN配信・自動デプロイで運用効率化",
		],
	},
	{
		id: "wordpress",
		title: "WordPressサイト制作",
		blobShape: "web",
		description:
			"柔軟なCMS機能とカスタムテーマ開発で、管理しやすく拡張性の高いサイトを構築。\nプラグイン開発・ECサイト・会員システムにも対応します。",
		imageUrl: "/images/service-wordpress.jpg",
		icon: <FaWordpress className="w-6 h-6 text-blue-500" />,
		buttonText: "詳しく見る",
		buttonUrl: "/services/web-development/wordpress",
		category: "sub",
		features: [
			"カスタムテーマ・プラグイン開発",
			"ECサイト・会員システム構築",
			"直感的な管理画面で運用効率化",
		],
	},
	{
		id: "web-spot-support",
		title: "Webお困りごとスポット対応",
		blobShape: "repair",
		description:
			"緊急のトラブル対応から小規模な修正まで、Webサイトのお困りごとを迅速解決。\n24時間以内対応・明朗料金で安心してご依頼いただけます。",
		imageUrl: "/images/service-web-spot-support.jpg",
		icon: <FaLifeRing className="w-6 h-6 text-purple-600" />,
		buttonText: "今すぐ相談",
		buttonUrl: "/services/web-development/web-spot-support",
		category: "sub",
		features: [
			"24時間以内の緊急対応・バグ修正",
			"小規模修正・デザイン調整・機能追加",
			"事前見積もり・追加料金なしの明朗会計",
		],
	},
	{
		id: "frontend-repair",
		title: "フロントエンドリペア",
		blobShape: "repair",
		description:
			"AI で作ったサイト、そのままで大丈夫？\nプロがコード品質とデザインを最終調整し、安心してリリースできる状態に仕上げます。",
		imageUrl: "/images/service-frontend-repair.jpg",
		icon: <FaWrench className="w-6 h-6 text-orange-600" />,
		buttonText: "無料診断を依頼",
		buttonUrl: "/services/web-development/frontend-repair",
		category: "sub",
		features: [
			"React/Next.js コードの品質向上とバグ修正",
			"レスポンシブデザインとUI/UXの改善",
			"デプロイ支援とパフォーマンス最適化",
		],
	},
];

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
	"frontend-repair": [
		"AIで作ったコードを安心品質に",
		"React/Next.js 専門のプロが対応",
		"無料診断で現状把握から",
		"コード品質とデザイン両面を改善",
		"¥30,000〜のお手頃価格",
		"デプロイまで完全サポート",
		"小規模案件も大歓迎",
		"最短24時間で診断完了",
		"プロのデザイナーが最終調整",
		"レスポンシブ対応もお任せ",
		"パフォーマンス最適化も実施",
		"安心のアフターサポート",
	],
	"jamstack": [
		"Next.js + TypeScript で最新技術",
		"静的生成で高速表示を実現",
		"SEO最適化とセキュリティ強化",
		"ヘッドレスCMSで管理が簡単",
		"CDN配信で世界中から高速アクセス",
		"自動デプロイで運用効率化",
		"スケーラブルなアーキテクチャ",
		"モダンなフロントエンド技術",
		"パフォーマンス最優先の設計",
		"JAMstack のベストプラクティス",
		"開発効率とUXを両立",
		"将来の拡張性も考慮した設計",
	],
	"wordpress": [
		"柔軟なCMS機能で管理が簡単",
		"カスタムテーマで完全オリジナル",
		"プラグイン開発で独自機能追加",
		"ECサイト・会員システム構築",
		"直感的な管理画面をカスタマイズ",
		"WordPress × AI でパワーアップ",
		"豊富な拡張性で将来も安心",
		"SEO対策・高速化も万全",
		"コンテンツ管理の効率化",
		"15年のWordPress開発実績",
		"運用しやすいサイト設計",
		"バックアップ・セキュリティ対策",
	],
	"web-spot-support": [
		"24時間以内の迅速対応",
		"緊急トラブルも即座に解決",
		"小さな修正でも大歓迎",
		"事前見積もりで安心料金",
		"追加料金は一切なし",
		"どんなお困りごとでもOK",
		"最短1時間で初期対応",
		"プロのエンジニアが担当",
		"デザイン調整もお任せ",
		"WordPress・HTML・CSS対応",
		"アフターサポートも充実",
		"¥5,000〜の明朗会計",
	],
} as const;

// コメント取得ヘルパー関数
export function getCommentsForService(serviceId: string): readonly string[] {
	return (
		serviceComments[serviceId as keyof typeof serviceComments] ||
		serviceComments["web-development"]
	);
}

// サービスカテゴリ別フィルタ関数
export function getMainServices(): ServiceItem[] {
	return services.filter((service) => service.category === "main");
}

export function getSubServices(): ServiceItem[] {
	return services.filter((service) => service.category === "sub");
}
