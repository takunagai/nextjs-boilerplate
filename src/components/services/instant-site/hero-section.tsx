import { ServiceHeroSection } from "../shared";

export function InstantSiteHeroSection() {
	return (
		<ServiceHeroSection
			title={
				<>
					<span className="text-primary font-extrabold">一夜城</span>
					<br />
					<span className="text-4xl md:text-5xl lg:text-6xl">
						半日で完成する
					</span>
					<br />
					<div className="flex items-center justify-center gap-4 flex-wrap">
						<span className="text-muted-foreground line-through text-2xl md:text-3xl">
							55,000円
						</span>
						<span className="text-red-600 font-extrabold text-4xl md:text-5xl lg:text-6xl">
							33,000円
						</span>
					</div>
					<span className="text-primary font-extrabold text-2xl md:text-3xl">
						ホームページ
					</span>
				</>
			}
			description={
				<div className="space-y-4">
					{/* 限定価格バナー */}
					<div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 border-2 border-red-200 shadow-lg dark:bg-red-950/20 dark:text-red-400 dark:border-red-800">
						<span className="animate-pulse text-base">🔥</span>
						<span>サービス開始記念</span>
						<span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
							2万円オフ
						</span>
						<span className="font-bold">今だけ税込33,000円</span>
					</div>
					<p className="text-xl md:text-2xl font-semibold text-foreground leading-relaxed">
						AI×プロの集中スプリントで
						<br />
						<span className="text-primary">「速い・安い・ちゃんと良い」</span>
						を実現
					</p>
					<div className="max-w-3xl space-y-3">
						<p className="text-base md:text-lg text-muted-foreground leading-relaxed">
							✨ 素材をご用意いただければ、経験豊富なプロが一気に構築
						</p>
						<p className="text-base md:text-lg text-muted-foreground leading-relaxed">
							🚀 Next.js × Cloudflare でランニングコスト0円を実現
						</p>
						<p className="text-base md:text-lg text-muted-foreground leading-relaxed">
							⚡ 当日公開・高品質・お手頃価格の三拍子
						</p>
					</div>
				</div>
			}
			contactButtonText="初回相談（ワンコイン）を予約"
			serviceMenuButtonText="料金詳細を見る"
			contactButtonHref="/contact?service=instant-site"
			serviceMenuButtonHref="#pricing"
			contactButtonClassName="shadow-lg hover:shadow-xl transition-all duration-300"
			serviceMenuButtonClassName="border-2 hover:border-primary/30 transition-all duration-300 shadow-md hover:shadow-lg"
		/>
	);
}