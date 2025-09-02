import { ServiceHeroSection } from "../shared";

export function ConsultingHeroSection() {
	return (
		<ServiceHeroSection
			backgroundGradient="from-blue-600/10 via-blue-400/5 to-background"
			decorationColors={{
				primary: "bg-blue-500/10",
				secondary: "bg-green-500/10",
			}}
			title={
				<>
					<span className="text-blue-600">AI</span> で「できたらいいな」を
					<br />
					「できた！」に
				</>
			}
			description={
				<p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
					「AI って聞くけど、何から始めたらいいの？」「ChatGPT
					使ってみたけど、いまいち...」
					<br />
					そんなモヤモヤ、一緒に解決しましょう！難しい専門用語は使いません。
					<br />
					あなたのペースで、あなたのビジネスに合った AI 活用法を見つけます。
				</p>
			}
			contactButtonText="30分無料相談を予約"
		/>
	);
}
