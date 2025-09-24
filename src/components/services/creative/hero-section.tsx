import { ServiceHeroSection } from "../shared";

export function CreativeHeroSection() {
	return (
		<ServiceHeroSection
			className="bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 dark:from-violet-950/30 dark:via-purple-950/30 dark:to-pink-950/30"
			title={
				<>
					<span className="bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 bg-clip-text text-transparent">
						デザイナーの経験
					</span>{" "}
					×{" "}
					<span className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
						AI の力
					</span>
					で、
					<br />
					高品質な
					<span className="bg-gradient-to-r from-pink-600 to-rose-600 dark:from-pink-400 dark:to-rose-400 bg-clip-text text-transparent font-extrabold">
						デザイン素材
					</span>
					を創造
				</>
			}
			description={
				<div className="space-y-4">
					<p className="text-lg md:text-xl text-foreground/80 max-w-3xl leading-relaxed font-medium">
						AIは素晴らしいツールですが、
						<span className="text-primary font-semibold">
							的確な指示とセンス、仕上げの技術が必要
						</span>
						です。
					</p>
					<div className="max-w-3xl space-y-3">
						<p className="text-base md:text-lg text-muted-foreground leading-relaxed">
							🎨 Photoshop・Illustrator の高いスキル ×
							日々アップデートするAI知識
						</p>
						<p className="text-base md:text-lg text-muted-foreground leading-relaxed">
							✨ 「なんかAIっぽい」を「プロが作った」クオリティに仕上げます
						</p>
						<p className="text-base md:text-lg text-muted-foreground leading-relaxed">
							📖 制作過程のレクチャーも対応。スキルアップもお手伝いします
						</p>
					</div>
				</div>
			}
			contactButtonClassName="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 border-0"
			serviceMenuButtonClassName="border-2 border-purple-200 dark:border-purple-800 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm hover:bg-purple-50 dark:hover:bg-purple-950/50 hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
		/>
	);
}
