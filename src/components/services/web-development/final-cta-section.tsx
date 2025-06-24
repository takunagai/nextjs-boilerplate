import Link from "next/link";
import { FaCalendarCheck } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";

export function FinalCTASection() {
	return (
		<section className="w-full py-16 md:py-24 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
			<Container width="2xl" paddingY="lg" paddingX="lg">
				<Card className="bg-background/80 backdrop-blur-sm border-primary/20 max-w-4xl mx-auto">
					<CardContent className="py-12 px-8 text-center">
						<Heading as="h2" className="text-2xl md:text-3xl mb-6">
							<span className="text-primary">AI × 経験</span>で、
							<br />
							あなたのビジネスを次のステージへ。
						</Heading>
						<p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
							まずは無料相談から始めませんか？
							<br />
							あなたのプロジェクトに最適なプランをご提案いたします。
						</p>
						<Button asChild size="lg" className="text-lg px-8 py-4">
							<Link href="/contact">
								無料相談を予約する
								<FaCalendarCheck className="w-5 h-5 ml-2" />
							</Link>
						</Button>
						<p className="text-sm text-muted-foreground mt-4">
							※ 相談は無料です。お気軽にお問い合わせください。
						</p>
					</CardContent>
				</Card>
			</Container>
		</section>
	);
}
