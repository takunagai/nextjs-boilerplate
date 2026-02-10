import { FaEnvelope } from "react-icons/fa6";
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from "@/components/ui/card";
import { SocialLinks } from "@/components/ui/social-links";
import { values } from "@/lib/data/about-data";

export function ValuesSection() {
	return (
		<>
			{/* 大切にしていること */}
			<section className="space-y-8">
				<h2 className="text-3xl font-bold text-foreground mb-8 border-l-4 border-primary pl-6">
					大切にしていること
				</h2>
				<div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{values.map((value) => (
							<div key={value.title} className="space-y-4">
								<h3 className="text-xl font-bold text-foreground border-b border-primary/20 pb-2">
									{value.title}
								</h3>
								<ul className="space-y-3 text-muted-foreground leading-7">
									<li>
										•{" "}
										<span className="font-semibold text-foreground">
											{value.highlight}
										</span>
									</li>
									{value.items.map((item) => (
										<li key={item}>• {item}</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* お問い合わせセクション */}
			<Card className="border-primary/10 overflow-hidden shadow-sm">
				<div className="bg-primary/5 p-6">
					<div className="flex items-center gap-2">
						<FaEnvelope className="h-5 w-5 text-primary" />
						<CardTitle>お問い合わせ・SNS</CardTitle>
					</div>
					<CardDescription className="mt-2">
						お気軽にお声がけください！まずは無料相談から
					</CardDescription>
				</div>
				<CardContent className="pt-6">
					<div className="space-y-6">
						<div className="text-center pb-4 border-b">
							<h3 className="font-medium mb-3">📞 直接相談</h3>
							<a
								href="/contact"
								className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
							>
								無料相談を予約する
							</a>
						</div>
						<div>
							<SocialLinks className="pt-0" />
						</div>
					</div>
				</CardContent>
			</Card>
		</>
	);
}
