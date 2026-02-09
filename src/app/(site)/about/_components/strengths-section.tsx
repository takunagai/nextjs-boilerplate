const strengths = [
	{
		title: "1. 総合的な制作スキル",
		items: [
			"企画から運用まで、ワンストップで対応",
			"デザインもコーディングも分かるから、話が早い",
			"15年の経験で培った「勘所」",
		],
	},
	{
		title: "2. AI ツールの実践的な知識",
		items: [
			"ChatGPT、Claude、Midjourney など主要ツールを日常使用",
			"最新情報を常にキャッチアップ",
			"「使える AI 活用法」を熟知",
		],
	},
	{
		title: "3. 翻訳者としてのコミュニケーション力",
		items: [
			"難しい技術用語を、分かりやすい言葉に",
			"お客様の「なんとなく」を具体的な形に",
			"IT が苦手な方にも安心してもらえる説明",
		],
	},
	{
		title: "4. 柔軟な対応力",
		items: [
			"予算に合わせた最適なプラン提案",
			"スピード重視から品質重視まで、ニーズに対応",
			"「できません」より「こうしたらできます」",
		],
	},
];

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
