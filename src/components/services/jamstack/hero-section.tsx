import { ServiceHeroSection } from "../shared";

export function JamstackHeroSection() {
	return (
		<ServiceHeroSection
			title={
				<>
					Next.js × Jamstackで、
					<br />
					<span className="text-primary">超高速サイト</span>を実現
				</>
			}
			description={
				<p className="text-lg text-muted-foreground leading-relaxed">
					静的生成×AIの力で、ページ表示速度3秒以内を実現。
					<br />
					SEO・セキュリティ・保守性を重視したモダンWeb開発で、
					<br className="hidden md:inline" />
					企業の競争力を向上させます。
				</p>
			}
			highlights={[
				"⚡ ページ表示速度 3秒以内保証",
				"🔒 セキュリティ脆弱性ゼロ設計",
				"📈 SEOスコア 90点以上達成",
				"💰 運用コスト月額1,000円以下",
			]}
			contactButtonText="無料技術相談を予約"
			backgroundGradient="from-green-600/10 via-green-400/5 to-background"
		/>
	);
}