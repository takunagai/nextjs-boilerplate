import { ServiceHeroSection } from "../shared/service-hero-section";

const featureCards = [
	{ title: "撮影料金", detail: "5,500円/時間〜" },
	{ title: "画像補正", detail: "基本補正無料" },
	{ title: "納品スピード", detail: "最短翌日納品" },
];

export function PhotographyHero() {
	return (
		<ServiceHeroSection
			title={
				<>
					デザイナー目線で撮る、
					<br />
					<span className="text-primary">ビジネスを魅せる写真</span>
				</>
			}
			description={
				<>
					<p className="mb-4 text-lg text-muted-foreground sm:text-xl">
						プロ品質の写真撮影を、もっと身近に、もっとリーズナブルに
					</p>
					<p className="text-base text-muted-foreground">
						Webデザイナーとしての経験を活かし、構図・色彩・バランスにこだわった写真撮影サービスを提供します。
						撮影から画像補正まで一括でお任せください。
					</p>
				</>
			}
			contactButtonText="無料相談を申し込む"
			serviceMenuButtonText="作品を見る"
			serviceMenuButtonHref="#gallery"
			backgroundGradient="from-blue-600/10 via-blue-400/5 to-background"
			decorationColors={{
				primary: "bg-blue-400/10",
				secondary: "bg-purple-400/10",
			}}
			bottomContent={
				<div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
					{featureCards.map((card) => (
						<div
							key={card.title}
							className="rounded-lg bg-card/80 p-4 backdrop-blur-sm"
						>
							<p className="text-sm font-semibold">{card.title}</p>
							<p className="text-xs text-muted-foreground">{card.detail}</p>
						</div>
					))}
				</div>
			}
		/>
	);
}
