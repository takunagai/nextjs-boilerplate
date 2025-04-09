import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import Link from "next/link";
import { FaArrowRight, FaCircleCheck } from "react-icons/fa6";

type FeatureItem = {
	id: string;
	title: string;
	description: string;
};

interface FeatureListSectionProps {
	featureList: FeatureItem[];
}

export function FeatureListSection({ featureList }: FeatureListSectionProps) {
	return (
		<section className="py-16 md:py-24 bg-muted/30 w-full">
			<Container width="2xl" paddingY="xl" paddingX="lg">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-16">
					<div>
						<h2 className="text-3xl md:text-4xl font-bold mb-6">
							すべての機能
						</h2>
						<p className="text-muted-foreground mb-8">
							このボイラープレートには、モダンなWeb開発に必要なすべての機能が含まれています。
							高速なパフォーマンス、優れたDX、そして美しいUIを実現するための機能を提供します。
						</p>
						<Button asChild variant="outline" className="gap-2">
							<Link href="/docs/features">
								すべての機能を見る
								<FaArrowRight className="h-4 w-4" />
							</Link>
						</Button>
					</div>
					<div>
						<ul className="space-y-4">
							{featureList.map((feature) => (
								<li key={feature.id} className="flex items-start gap-3">
									<FaCircleCheck className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
									<div>
										<h3 className="font-semibold">{feature.title}</h3>
										<p className="text-muted-foreground">
											{feature.description}
										</p>
									</div>
								</li>
							))}
						</ul>
					</div>
				</div>
			</Container>
		</section>
	);
}
