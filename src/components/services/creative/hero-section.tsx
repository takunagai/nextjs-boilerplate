import Link from "next/link";
import { FaArrowRight, FaCalendarCheck } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { HeroContainer } from "@/components/ui/hero-container";

export function CreativeHeroSection() {
	return (
		<HeroContainer className="bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-indigo-950/30">
			<Container width="2xl" paddingY="xl" paddingX="lg">
				<div className="flex flex-col items-center text-center max-w-4xl mx-auto">
					<h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-foreground">
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
					</h1>
					<div className="mb-8 space-y-4">
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
					<div className="flex flex-col sm:flex-row gap-4">
						<Button
							asChild
							size="lg"
							className="text-base px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 border-0"
						>
							<Link href="/contact">
								無料相談を予約する
								<FaCalendarCheck className="w-5 h-5 ml-2" />
							</Link>
						</Button>
						<Button
							asChild
							variant="outline"
							size="lg"
							className="text-base px-8 py-3 border-2 border-purple-200 dark:border-purple-800 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm hover:bg-purple-50 dark:hover:bg-purple-950/50 hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
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
