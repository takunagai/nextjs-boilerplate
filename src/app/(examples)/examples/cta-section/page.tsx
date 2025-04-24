import { CTASection } from "@/components/sections/cta-section";
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
				<CTASection className="bg-primary text-primary-foreground">
					<CTASection.Container>
						<CTASection.Content>
							<CTASection.Title>今すぐ始めましょう</CTASection.Title>
							<CTASection.Description>
								魅力的なCTAセクションで、ユーザーに次のアクションを促しましょう。
							</CTASection.Description>
						</CTASection.Content>
						<CTASection.Actions className="justify-center">
							<CTASection.PrimaryButton>詳細を見る</CTASection.PrimaryButton>
							<CTASection.SecondaryButton>
								お問い合わせ
							</CTASection.SecondaryButton>
						</CTASection.Actions>
					</CTASection.Container>
				</CTASection>
				<p className="mt-4 text-muted-foreground">
					デフォルト設定のCTAセクション。横並びレイアウトとプライマリカラーを使用しています。
				</p>

				<h2 className="text-2xl font-semibold mb-6">垂直レイアウト</h2>
				<CTASection
					layout="vertical"
					className="bg-primary text-primary-foreground"
				>
					<CTASection.Container>
						<CTASection.Content>
							<CTASection.Title>垂直レイアウトのCTA</CTASection.Title>
							<CTASection.Description>
								テキストとボタンが縦に並ぶレイアウトです。中央揃えになっているため、シンプルで目立つデザインに適しています。
							</CTASection.Description>
						</CTASection.Content>
						<CTASection.Actions className="justify-center">
							<CTASection.PrimaryButton icon={<FaArrowRight />}>
								今すぐ登録
							</CTASection.PrimaryButton>
							<CTASection.SecondaryButton>
								詳細を見る
							</CTASection.SecondaryButton>
						</CTASection.Actions>
					</CTASection.Container>
				</CTASection>

				<h2 className="text-2xl font-semibold mb-6">カードレイアウト</h2>
				<CTASection
					layout="card"
					className="bg-secondary text-secondary-foreground shadow-lg"
				>
					<CTASection.Container>
						<CTASection.Content>
							<CTASection.Title>
								プレミアムプランにアップグレード
							</CTASection.Title>
							<CTASection.Description>
								より多くの機能を利用するには、プレミアムプランへのアップグレードをご検討ください。月額わずか980円で、すべての機能にアクセスできます。
							</CTASection.Description>
						</CTASection.Content>
						<CTASection.Actions className="justify-start">
							<CTASection.PrimaryButton variant="default" icon={<FaStar />}>
								アップグレードする
							</CTASection.PrimaryButton>
							<CTASection.SecondaryButton variant="outline">
								プラン比較
							</CTASection.SecondaryButton>
						</CTASection.Actions>
					</CTASection.Container>
				</CTASection>

				<h2 className="text-2xl font-semibold mb-6">バナーレイアウト</h2>
				<CTASection
					layout="banner"
					className="bg-accent text-accent-foreground py-16 @lg:py-24"
				>
					<CTASection.Container>
						<CTASection.Content>
							<CTASection.Title>期間限定セール実施中！</CTASection.Title>
							<CTASection.Description>
								今なら年間プランが30%オフ。この機会をお見逃しなく。
							</CTASection.Description>
						</CTASection.Content>
						<CTASection.Actions className="justify-center">
							<CTASection.PrimaryButton variant="default">
								セール会場へ
							</CTASection.PrimaryButton>
							<CTASection.SecondaryButton variant="outline">
								詳細を見る
							</CTASection.SecondaryButton>
						</CTASection.Actions>
					</CTASection.Container>
				</CTASection>

				<h2 className="text-2xl font-semibold mb-6">背景画像付き</h2>
				<CTASection
					layout="vertical"
					className="bg-transparent text-white py-16 @lg:py-24"
					backgroundImage="/dummy-images/street-photo-03.jpg"
				>
					<CTASection.Container>
						<CTASection.Content>
							<CTASection.Title className="text-white">
								美しい背景画像を活用
							</CTASection.Title>
							<CTASection.Description className="text-white/80">
								背景画像を使用することで、より印象的なCTAセクションを作成できます。オーバーレイの不透明度もTailwindで調整可能です。
							</CTASection.Description>
						</CTASection.Content>
						<CTASection.Actions className="justify-center">
							<CTASection.PrimaryButton variant="default">
								詳細を見る
							</CTASection.PrimaryButton>
							<CTASection.SecondaryButton variant="outline">
								ギャラリーへ
							</CTASection.SecondaryButton>
						</CTASection.Actions>
					</CTASection.Container>
				</CTASection>

				<h2 className="text-2xl font-semibold mb-6">グラデーション背景</h2>
				<CTASection
					layout="horizontal"
					className="bg-gradient-to-r from-primary to-primary-foreground/20 text-primary-foreground"
				>
					<CTASection.Container>
						<CTASection.Content>
							<CTASection.Title>グラデーションスタイル</CTASection.Title>
							<CTASection.Description>
								グラデーション背景を使用したCTAセクションです。視覚的な魅力を高め、ユーザーの注目を集めることができます。
							</CTASection.Description>
						</CTASection.Content>
						<CTASection.Actions className="justify-center">
							<CTASection.PrimaryButton
								variant="secondary"
								icon={<FaDownload />}
							>
								ダウンロード
							</CTASection.PrimaryButton>
							<CTASection.SecondaryButton
								variant="outline"
								external={true}
								href="https://example.com/docs"
								icon={<FaArrowUpRightFromSquare />}
							>
								ドキュメント
							</CTASection.SecondaryButton>
						</CTASection.Actions>
					</CTASection.Container>
				</CTASection>

				<h2 className="text-2xl font-semibold mb-6">シンプルなCTA</h2>
				<CTASection
					layout="horizontal"
					className="bg-muted text-muted-foreground"
				>
					<CTASection.Container>
						<CTASection.Content>
							<CTASection.Title>お問い合わせはこちら</CTASection.Title>
							<CTASection.Description>
								ご質問やサポートが必要な場合は、お気軽にお問い合わせください。
							</CTASection.Description>
						</CTASection.Content>
						<CTASection.Actions className="justify-center">
							<CTASection.PrimaryButton variant="default">
								お問い合わせ
							</CTASection.PrimaryButton>
						</CTASection.Actions>
					</CTASection.Container>
				</CTASection>

				<h2 className="text-2xl font-semibold mb-6">高度なカスタマイズ</h2>
				<CTASection
					layout="vertical"
					className="bg-transparent border border-border p-8 py-16 @lg:py-24"
				>
					<CTASection.Container className="max-w-screen-xl text-center">
						<CTASection.Content className="space-y-6">
							<CTASection.Title className="text-3xl md:text-4xl font-extrabold">
								完全にカスタマイズ可能
							</CTASection.Title>
							<CTASection.Description className="text-lg opacity-80">
								CTASectionコンポーネントは、多様なプロパティを提供することで、あらゆるニーズに対応できるように設計されています。
							</CTASection.Description>
						</CTASection.Content>
						<CTASection.Actions className="flex-row justify-center gap-6 mt-6">
							<CTASection.PrimaryButton variant="default" size="lg">
								ドキュメントを読む
							</CTASection.PrimaryButton>
							<CTASection.SecondaryButton variant="outline" size="lg">
								コードを見る
							</CTASection.SecondaryButton>
						</CTASection.Actions>
					</CTASection.Container>
				</CTASection>
			</div>
		</>
	);
}
