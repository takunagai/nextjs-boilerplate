import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge";

const techStack = {
	framework: {
		title: "フレームワーク",
		items: ["Next.js 15", "App Router", "React Server Components"],
	},
	styling: {
		title: "スタイリング",
		items: ["Tailwind CSS v4準拠", "レスポンシブデザイン", "ダークモード対応"],
	},
	deployment: {
		title: "デプロイ",
		items: ["Cloudflare Pages", "ビルドキャッシュ活用", "自動デプロイ"],
	},
	performance: {
		title: "パフォーマンス",
		items: ["画像最適化（AVIF/WebP）", "Lazy Loading", "Prefetch", "Minimal JS"],
	},
	seo: {
		title: "SEO対策",
		items: ["next/metadata", "JSON-LD", "サイトマップ", "robots.txt"],
	},
	analytics: {
		title: "分析",
		items: ["Cloudflare Analytics", "Core Web Vitals計測", "代替分析ツール対応"],
	},
};

const qualityStandards = [
	"読みやすさを重視した階層設計",
	"WCAG 2.1準拠のアクセシビリティ配慮",
	"Core Web Vitals スコア90点以上目標",
	"モバイルファーストの設計思想",
	"セキュアなフォーム実装",
	"商用利用可能な素材のみ使用",
];

export function TechSpecsSection() {
	return (
		<section className="py-16 md:py-24">
			<Container>
				<SectionHeader
					title="技術仕様"
					description="最新技術で高速・安全・保守性の高いサイトを構築"
				/>

				<div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{Object.entries(techStack).map(([key, section]) => (
						<div
							key={key}
							className="rounded-lg border bg-card p-6 hover:shadow-lg transition-shadow"
						>
							<h3 className="mb-4 font-semibold text-primary">{section.title}</h3>
							<ul className="space-y-2">
								{section.items.map((item) => (
									<li key={item} className="flex items-center text-sm">
										<span className="mr-2 text-primary">•</span>
										<span className="text-muted-foreground">{item}</span>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				<div className="mt-12 rounded-lg bg-primary/5 p-6">
					<h3 className="mb-4 font-semibold">品質基準</h3>
					<div className="grid gap-3 sm:grid-cols-2">
						{qualityStandards.map((standard) => (
							<div key={standard} className="flex items-start">
								<Badge variant="secondary" className="mr-2 mt-0.5">
									✓
								</Badge>
								<span className="text-sm text-muted-foreground">{standard}</span>
							</div>
						))}
					</div>
				</div>

				<div className="mt-8 rounded-lg border border-green-600/20 bg-green-50/50 p-6 dark:bg-green-950/20">
					<h3 className="mb-3 font-semibold">信頼と安心（リスク最小化）</h3>
					<ul className="space-y-2 text-sm text-muted-foreground">
						<li className="flex items-start">
							<span className="mr-2 text-green-600">✓</span>
							<span>
								<strong>公開前チェック：</strong>ステージングURLで最終確認
							</span>
						</li>
						<li className="flex items-start">
							<span className="mr-2 text-green-600">✓</span>
							<span>
								<strong>品質保証：</strong>読みやすさ・階層設計・アクセシビリティ配慮
							</span>
						</li>
						<li className="flex items-start">
							<span className="mr-2 text-green-600">✓</span>
							<span>
								<strong>透明性：</strong>返金/キャンセルポリシーの明確化
							</span>
						</li>
						<li className="flex items-start">
							<span className="mr-2 text-green-600">✓</span>
							<span>
								<strong>著作権：</strong>AI生成物は商用利用可のポリシー準拠素材のみ使用
							</span>
						</li>
					</ul>
				</div>
			</Container>
		</section>
	);
}