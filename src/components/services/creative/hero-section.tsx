import { ServiceHeroSection } from "../shared";

export function CreativeHeroSection() {
	return (
		<ServiceHeroSection
			className="bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-indigo-950/30"
			title={
				<>
					<span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
						AI
					</span>{" "}
					の創造力 ×{" "}
					<span className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
						人の感性
					</span>
					で、
					<br />
					あなたのアイデアを
					<span className="bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400 bg-clip-text text-transparent font-extrabold">
						カタチ
					</span>
					に
				</>
			}
			description={
				<div className="space-y-4">
					<p className="text-lg md:text-xl text-foreground/80 max-w-3xl leading-relaxed font-medium">
						「時間がない」「スキルがない」「予算がない」...
						<span className="text-primary font-semibold">
							そんな悩み、AI で解決できます！
						</span>
					</p>
					<div className="max-w-3xl space-y-3">
						<p className="text-base md:text-lg text-muted-foreground leading-relaxed">
							✨ 最新の AI
							ツールを使いこなして、プロ級のコンテンツをスピーディーに
						</p>
						<p className="text-base md:text-lg text-muted-foreground leading-relaxed">
							🎯 でも AI 任せじゃありません。15年のクリエイティブ経験で、AI
							の「ちょっと変」を「ちょうどいい」に仕上げます
						</p>
					</div>
				</div>
			}
			contactButtonClassName="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 border-0"
			serviceMenuButtonClassName="border-2 border-purple-200 dark:border-purple-800 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm hover:bg-purple-50 dark:hover:bg-purple-950/50 hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
		/>
	);
}
