import Link from "next/link";
import { FaArrowRight, FaCalendarCheck } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { HeroContainer } from "@/components/ui/hero-container";

export function WebDevHeroSection() {
	return (
		<HeroContainer>
			<Container width="2xl" paddingY="xl" paddingX="lg">
				<div className="flex flex-col items-center text-center max-w-4xl mx-auto">
					<h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-foreground">
						<span className="text-primary">AI</span> × 15年の制作経験で、
						<br />
						高品質なのに<span className="text-primary">お手頃価格</span>を実現
					</h1>
					<p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl leading-relaxed">
						最新の AI
						技術を駆使してリサーチ・コンテンツ作成・コーディングを効率化。
						<br />
						制作期間とコストを大幅に削減しながら、15年の経験で培った品質は妥協しません。
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
