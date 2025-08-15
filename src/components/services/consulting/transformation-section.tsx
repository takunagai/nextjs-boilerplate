import { FaQuoteLeft } from "react-icons/fa6";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";

const transformations = [
	"AI への苦手意識がなくなった！",
	"作業時間が半分以下になった",
	"新しいビジネスアイデアが生まれた",
	"チームみんなが AI を使えるようになった",
];

export function ConsultingTransformationSection() {
	return (
		<section className="w-full py-16 md:py-24 bg-background">
			<Container width="2xl" paddingY="lg" paddingX="lg">
				<div className="text-center mb-12">
					<Heading as="h2" align="center" className="mb-4">
						受講後の変化
					</Heading>
					<p className="text-muted-foreground max-w-2xl mx-auto">
						受講者の皆さんから寄せられた嬉しい声をご紹介
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
					{transformations.map((transformation, index) => (
						<Card
							key={index}
							className="bg-gradient-to-br from-blue-50 to-green-50 border-blue-200 hover:shadow-lg transition-all duration-300"
						>
							<CardContent className="p-6">
								<div className="flex items-start gap-4">
									<div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
										<FaQuoteLeft className="w-4 h-4 text-blue-600" />
									</div>
									<p className="text-lg font-medium text-foreground">
										{transformation}
									</p>
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				<div className="text-center mt-12">
					<Heading as="h3" className="text-xl md:text-2xl">
						あなたも同じような変化を
						<span className="text-blue-600 font-bold">
							実感してみませんか？
						</span>
					</Heading>
				</div>
			</Container>
		</section>
	);
}
