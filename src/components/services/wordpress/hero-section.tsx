import { ServiceHeroSection } from "../shared";

export function WordPressHeroSection() {
	return (
		<ServiceHeroSection
			title={
				<>
					WordPress × AIで、
					<br />
					<span className="text-primary">運用しやすい</span>サイトを実現
				</>
			}
			description={
				<p className="text-lg text-muted-foreground leading-relaxed">
					CMSの王道WordPressと最新AI技術の融合。
					<br />
					コンテンツ更新が簡単で、SEOに強く、拡張性の高いサイトを構築。
					<br className="hidden md:inline" />
					企業サイト・ブログ・オウンドメディアに最適です。
				</p>
			}
			highlights={[
				"📝 直感的なコンテンツ管理システム",
				"🚀 独自カスタマイズで差別化",
				"🔒 セキュリティ・高速化対策済み",
				"📈 SEO最適化で集客力アップ",
			]}
			contactButtonText="無料相談を予約"
			backgroundGradient="from-blue-600/10 via-blue-400/5 to-background"
		/>
	);
}