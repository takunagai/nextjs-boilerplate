import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import type { ReactNode } from "react";
import type { IconType } from "react-icons";

type Feature = {
	id: string;
	title: string;
	description: string;
	icon: IconType | (({ className }: { className?: string }) => ReactNode);
};

interface FeaturesSectionProps {
	features: Feature[];
}

export function FeaturesSection({ features }: FeaturesSectionProps) {
	return (
		<section className="py-16 md:py-24 bg-muted/50 w-full">
			<Container width="2xl" paddingY="xl" paddingX="lg">
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">主な特徴</h2>
					<p className="text-muted-foreground max-w-2xl mx-auto">
						最新のWeb開発技術を組み合わせた、高速で柔軟なフレームワークを提供します。
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{features.map((feature) => (
						<Card key={feature.id}>
							<CardHeader>
								<div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
									{feature.icon({ className: "h-6 w-6 text-primary" })}
								</div>
								<CardTitle className="text-xl">{feature.title}</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground">{feature.description}</p>
							</CardContent>
						</Card>
					))}
				</div>
			</Container>
		</section>
	);
}
