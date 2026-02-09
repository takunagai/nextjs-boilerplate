import { ServiceHeroSection } from "../shared/service-hero-section";

const featureCards = [
	{ title: "写真加工・補正", detail: "アップスケール・復元" },
	{ title: "AI画像生成", detail: "イラスト・モデル写真" },
	{ title: "プロ仕上げ", detail: "自然な品質に調整" },
];

export function AIImageHero() {
	return (
		<ServiceHeroSection
			title={
				<>
					想像を現実に変える、
					<br />
					<span className="text-primary">プロ品質のAI画像制作</span>
				</>
			}
			description={
				<>
					<p className="mb-4 text-lg text-muted-foreground sm:text-xl">
						デザイナーの技術とAIの力で、理想の画像を創造します
					</p>
					<p className="text-base text-muted-foreground">
						PhotoshopとAIを駆使し、写真加工から画像生成まで幅広く対応。
						「使える画像」に仕上げることにこだわり、あなたのビジネスを視覚的にサポートします。
					</p>
				</>
			}
			contactButtonText="無料相談を申し込む"
			serviceMenuButtonText="作品を見る"
			serviceMenuButtonHref="#gallery"
			backgroundGradient="from-purple-600/10 via-purple-400/5 to-background"
			decorationColors={{
				primary: "bg-purple-400/10",
				secondary: "bg-blue-400/10",
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
