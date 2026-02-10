import { strengths } from "@/lib/data/about-data";

export function StrengthsSection() {
	return (
		<section className="space-y-8">
			<h2 className="text-3xl font-bold text-foreground mb-8 border-l-4 border-primary pl-6">
				私の強み
			</h2>
			<div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{strengths.map((strength) => (
						<div key={strength.title} className="border-l-2 border-muted pl-6">
							<h3 className="text-xl font-bold mb-3 text-foreground">
								{strength.title}
							</h3>
							<ul className="space-y-2 text-muted-foreground leading-7">
								{strength.items.map((item) => (
									<li key={item}>• {item}</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
