import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";

export function PortfolioLinkSection() {
	return (
		<section className="w-full py-16 md:py-24 bg-background">
			<Container width="2xl" paddingY="lg" paddingX="lg">
				<div className="text-center">
					<Heading as="h2" align="center" className="mb-6">
						関連する実績
					</Heading>
					<p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
						AI を活用した制作事例をご覧いただけます。
						<br />
						どのような品質の制作ができるかをぜひご確認ください。
					</p>
					<Button asChild variant="outline" size="lg">
						<Link href="/portfolio">
							ウェブサイト・ポートフォリオを見る
							<FaArrowRight className="w-4 h-4 ml-2" />
						</Link>
					</Button>
				</div>
			</Container>
		</section>
	);
}
