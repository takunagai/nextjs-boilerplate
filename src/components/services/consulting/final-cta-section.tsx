import Link from "next/link";
import { FaCalendarCheck } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";

export function ConsultingFinalCTASection() {
	return (
		<section className="w-full py-16 md:py-24 bg-gradient-to-br from-blue-600/10 via-blue-400/5 to-background">
			<Container width="2xl" paddingY="lg" paddingX="lg">
				<Card className="bg-background/80 backdrop-blur-sm border-blue-600/20 max-w-4xl mx-auto">
					<CardContent className="py-12 px-8 text-center">
						<Heading as="h2" className="text-2xl md:text-3xl mb-6">
							<span className="text-blue-600">AI の可能性</span>を、
							<br />
							一緒に探しませんか？
						</Heading>
						<p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
							まずは30分の無料相談から。
							<br />
							あなたの現状をお聞きして、最適なプランをご提案いたします。
						</p>
						<Button asChild size="lg" className="text-lg px-8 py-4">
							<Link href="/contact">
								30分無料相談を予約する
								<FaCalendarCheck className="w-5 h-5 ml-2" />
							</Link>
						</Button>
						<p className="text-sm text-muted-foreground mt-4">
							※ 相談は無料です。しつこい営業は一切いたしません。
						</p>
					</CardContent>
				</Card>
			</Container>
		</section>
	);
}
