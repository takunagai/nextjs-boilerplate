import { ServiceHeroSection } from "../shared";

export function FrontendRepairHeroSection() {
	return (
		<ServiceHeroSection
			title={
				<>
					フロントエンドの
					<span className="text-primary">"困った"</span>
					を
					<br />
					プロが整えます
				</>
			}
			description={
				<>
					<p className="text-lg md:text-xl mb-4">
						AI で作ったサイト、そのままで大丈夫？
					</p>
					<p className="text-base md:text-lg opacity-90">
						React / Next.js コード修正・デザインブラッシュアップ・デプロイ支援まで、
						<br />
						プロが最終調整して安心してリリースできる状態に仕上げます。
					</p>
				</>
			}
			contactButtonText="まずは無料診断を依頼する"
			backgroundGradient="from-orange-600/10 via-orange-400/5 to-background"
		/>
	);
}