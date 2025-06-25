import Link from "next/link";
import { FaCalendarCheck, FaArrowRight } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { HeroContainer } from "@/components/ui/hero-container";

export function CreativeHeroSection() {
	return (
		<HeroContainer>
			<Container width="2xl" paddingY="xl" paddingX="lg">
				<div className="flex flex-col items-center text-center max-w-4xl mx-auto">
					<h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-foreground">
						<span className="text-primary">AI</span> の創造力 × 人の感性で、
						<br />
						あなたのアイデアを<span className="text-primary">カタチ</span>に
					</h1>
					<p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl leading-relaxed">
						「時間がない」「スキルがない」「予算がない」...そんな悩み、AI
						で解決できます！
						<br />
						最新の AI ツールを使いこなして、プロ級のコンテンツをスピーディーに。
						<br />
						でも AI 任せじゃありません。15年のクリエイティブ経験で、AI
						の「ちょっと変」を「ちょうどいい」に仕上げます。
					</p>
					<div className="flex flex-col sm:flex-row gap-4">
						<Button asChild size="lg" className="text-base px-8 py-3">
							<Link href="/contact">
								無料相談を予約する
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
