import { ServiceHeroSection } from "../shared";

export function WebDevHeroSection() {
	return (
		<ServiceHeroSection
			title={
				<>
					<span className="text-primary">AIと経験</span>を活かして、
					<br />
					良いものを<span className="text-primary">手が届く価格</span>で
				</>
			}
			description={
				<>
					<p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed mb-4">
						「制作会社は高すぎる...」「でも品質は諦めたくない...」
						<br />
						そんなあなたのお悩みに、新しい選択肢をご提案します。
					</p>
					<p className="text-base md:text-lg text-muted-foreground max-w-3xl leading-relaxed">
						15年のウェブ制作経験とAIを組み合わせることで、
						<br />
						制作時間を短縮しながら、丁寧な仕上がりをお約束します。
					</p>
				</>
			}
			contactButtonText="まずは相談してみる"
			serviceMenuButtonText="サービス詳細"
		/>
	);
}
