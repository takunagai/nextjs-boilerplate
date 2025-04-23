import { CTASection } from "@/components/sections/cta-section/cta-section";
import { Metadata } from "next";
import {
	FaArrowRight,
	FaArrowUpRightFromSquare,
	FaDownload,
	FaStar,
} from "react-icons/fa6";

export const metadata: Metadata = {
	title: "CTAセクションのサンプル",
	description: "様々なスタイルのCTAセクションの実装例を紹介します。",
};

export default function CTASectionExamplesPage() {
	return (
		<>
			<div className="space-y-6 mb-12">
				<h1 className="text-4xl font-bold tracking-tight">
					CTAセクションのサンプル
				</h1>
				<p className="text-xl text-muted-foreground">
					CTASectionコンポーネントを使用した様々なデザインバリエーションのサンプルです。
				</p>
			</div>

			<div className="space-y-24">
				<h2 className="text-2xl font-semibold mb-6">デフォルトスタイル</h2>
				<CTASection />
				<p className="mt-4 text-muted-foreground">
					デフォルト設定のCTAセクション。横並びレイアウトとプライマリカラーを使用しています。
				</p>

				<h2 className="text-2xl font-semibold mb-6">垂直レイアウト</h2>
				<CTASection
					layout="vertical"
					title="垂直レイアウトのCTA"
					description="テキストとボタンが縦に並ぶレイアウトです。中央揃えになっているため、シンプルで目立つデザインに適しています。"
					primaryButtonText="今すぐ登録"
					primaryButtonIcon={<FaArrowRight />}
					secondaryButtonText="詳細を見る"
				/>

				<h2 className="text-2xl font-semibold mb-6">カードレイアウト</h2>
				<CTASection
					layout="card"
					intent="secondary"
					decoration="shadow"
					title="プレミアムプランにアップグレード"
					description="より多くの機能を利用するには、プレミアムプランへのアップグレードをご検討ください。月額わずか980円で、すべての機能にアクセスできます。"
					primaryButtonText="アップグレードする"
					primaryButtonVariant="default"
					primaryButtonIcon={<FaStar />}
					secondaryButtonText="プラン比較"
					secondaryButtonVariant="outline"
				/>

				<h2 className="text-2xl font-semibold mb-6">バナーレイアウト</h2>
				<CTASection
					layout="banner"
					intent="accent"
					size="lg"
					alignment="center"
					title="期間限定セール実施中！"
					description="今なら年間プランが30%オフ。この機会をお見逃しなく。"
					primaryButtonText="セール会場へ"
					primaryButtonVariant="default"
					secondaryButtonText="詳細はこちら"
					secondaryButtonVariant="secondary"
				/>

				<h2 className="text-2xl font-semibold mb-6">背景画像付き</h2>
				<CTASection
					layout="banner"
					intent="minimal"
					decoration="none"
					backgroundImage="/dummy-images/cta-background.jpg"
					overlayOpacity={0.7}
					title="美しい背景画像を活用"
					description="背景画像を使用することで、より印象的なCTAセクションを作成できます。オーバーレイの不透明度も調整可能です。"
					primaryButtonText="詳細を見る"
					primaryButtonVariant="default"
					secondaryButtonText="ギャラリーへ"
					secondaryButtonVariant="outline"
					titleClassName="text-white"
					descriptionClassName="text-white/80"
				/>

				<h2 className="text-2xl font-semibold mb-6">グラデーション背景</h2>
				<CTASection
					layout="horizontal"
					intent="primary"
					decoration="gradient"
					title="グラデーションスタイル"
					description="グラデーション背景を使用したCTAセクションです。視覚的な魅力を高め、ユーザーの注目を集めることができます。"
					primaryButtonText="ダウンロード"
					primaryButtonVariant="secondary"
					primaryButtonIcon={<FaDownload />}
					secondaryButtonText="ドキュメント"
					secondaryButtonVariant="outline"
					secondaryButtonExternal={true}
					secondaryButtonHref="https://example.com/docs"
					secondaryButtonIcon={<FaArrowUpRightFromSquare />}
				/>

				<h2 className="text-2xl font-semibold mb-6">シンプルなCTA</h2>
				<CTASection
					layout="horizontal"
					intent="muted"
					title="お問い合わせはこちら"
					description="ご質問やサポートが必要な場合は、お気軽にお問い合わせください。"
					primaryButtonText="お問い合わせ"
					primaryButtonVariant="default"
					secondaryButtonText={undefined}
				/>

				<h2 className="text-2xl font-semibold mb-6">高度なカスタマイズ</h2>
				<CTASection
					layout="vertical"
					intent="minimal"
					size="lg"
					decoration="border"
					spacing="spacious"
					alignment="center"
					buttonOrientation="horizontal"
					containerWidth="xl"
					containerPaddingY="lg"
					title="完全にカスタマイズ可能"
					description="CTASectionコンポーネントは、多様なプロパティを提供することで、あらゆるニーズに対応できるように設計されています。"
					primaryButtonText="ドキュメントを読む"
					primaryButtonVariant="default"
					primaryButtonSize="lg"
					secondaryButtonText="コードを見る"
					secondaryButtonVariant="outline"
					secondaryButtonSize="lg"
					titleClassName="text-3xl md:text-4xl font-extrabold"
					descriptionClassName="text-lg opacity-80"
					buttonGroupClassName="gap-6"
				/>
			</div>
		</>
	);
}
