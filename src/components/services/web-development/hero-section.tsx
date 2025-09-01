import { ServiceHeroSection } from "../shared";

export function WebDevHeroSection() {
	return (
		<ServiceHeroSection
			title={
				<>
					<span className="text-primary">AI</span> × 15年の制作経験で、
					<br />
					高品質なのに<span className="text-primary">お手頃価格</span>を実現
				</>
			}
			description={
				<p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
					最新の AI
					技術を駆使してリサーチ・コンテンツ作成・コーディングを効率化。
					<br />
					制作期間とコストを大幅に削減しながら、15年の経験で培った品質は妥協しません。
				</p>
			}
		/>
	);
}
