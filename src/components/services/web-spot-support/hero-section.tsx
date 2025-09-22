import { ServiceHeroSection } from "../shared";

export function WebSpotSupportHeroSection() {
	return (
		<ServiceHeroSection
			title={
				<>
					Webのお困りごと、
					<br />
					<span className="text-primary">迅速解決</span>します
				</>
			}
			description={
				<p className="text-lg text-muted-foreground leading-relaxed">
					エラー修正・デザイン調整・機能追加など、
					<br />
					ちょっとした修正から緊急トラブルまで、
					<br className="hidden md:inline" />
					Web制作のプロが柔軟にサポートします。
				</p>
			}
			highlights={[
				"🚑 緊急対応: 24時間以内に初動",
				"💰 明朗料金: 事前見積もりで安心",
				"🔧 幅広い対応: HTMLからWordPressまで",
				"📈 再発防止: 根本原因を徹底解決",
			]}
			contactButtonText="今すぐ相談する"
			backgroundGradient="from-purple-600/10 via-purple-400/5 to-background"
		/>
	);
}