import Link from "next/link";
import { FaArrowRight, FaCalendarCheck } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { HeroContainer } from "@/components/ui/hero-container";

export function ConsultingHeroSection() {
	return (
		<HeroContainer
			backgroundGradient="from-blue-600/10 via-blue-400/5 to-background"
			decorationColors={{
				primary: "bg-blue-500/10",
				secondary: "bg-green-500/10",
			}}
		>
			<Container width="2xl" paddingY="xl" paddingX="lg">
				<div className="flex flex-col items-center text-center max-w-4xl mx-auto">
					<h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-foreground">
						<span className="text-blue-600">AI</span> の「？」を「！」に変える、
						<br />
						あなた専用の<span className="text-green-600">サポーター</span>
					</h1>
					<p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl leading-relaxed">
						「AI って聞くけど、何から始めたらいいの？」「ChatGPT
						使ってみたけど、いまいち...」
						<br />
						そんなモヤモヤ、一緒に解決しましょう！難しい専門用語は使いません。
						<br />
						あなたのペースで、あなたのビジネスに合った AI 活用法を見つけます。
					</p>
					<div className="flex flex-col sm:flex-row gap-4">
						<Button asChild size="lg" className="text-base px-8 py-3">
							<Link href="/contact">
								30分無料相談を予約
								<FaCalendarCheck className="w-5 h-5 ml-2" />
							</Link>
						</Button>
						<Button
							asChild
							variant="outline"
							size="lg"
							className="text-base px-8 py-3"
						>
							<Link href="#service-menu">
								サービス内容を見る
								<FaArrowRight className="w-5 h-5 ml-2" />
							</Link>
						</Button>
					</div>
				</div>
			</Container>
		</HeroContainer>
	);
}
