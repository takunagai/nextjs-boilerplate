import { Badge } from "@/components/ui/badge";

const skillCategories = [
	{
		title: "ウェブ制作・ウェブ開発",
		skills: [
			"HTML / CSS / JavaScript",
			"WordPress",
			"Next.js",
			"Figma",
			"Git/GitHub",
			"Windsurf",
		],
	},
	{
		title: "AI ツール",
		skills: [
			"ChatGPT",
			"Claude Code",
			"Nano Banana",
			"Stable Diffusion",
			"Suno AI",
			"Vidu",
		],
	},
	{
		title: "その他",
		skills: ["Adobe Creative Cloud", "SEO / アクセス解析", "プロジェクト管理"],
	},
];

export function SkillsSection() {
	return (
		<section className="space-y-8">
			<h2 className="text-3xl font-bold text-foreground mb-8 border-l-4 border-primary pl-6">
				スキル・使用ツール
			</h2>
			<div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{skillCategories.map((category) => (
						<div key={category.title} className="space-y-4">
							<h3 className="text-xl font-bold text-primary border-b border-primary/20 pb-2">
								{category.title}
							</h3>
							<div className="flex flex-wrap gap-2">
								{category.skills.map((skill) => (
									<Badge key={skill} variant="outline" className="text-xs">
										{skill}
									</Badge>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
