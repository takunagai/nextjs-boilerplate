import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { FaReact, FaJs, FaGit, FaCloudflare } from "react-icons/fa6";
import {
	SiNextdotjs,
	SiTypescript,
	SiTailwindcss,
	SiVercel,
	SiNetlify,
	SiContentful,
	SiStrapi,
} from "react-icons/si";

const techCategories = [
	{
		category: "フロントエンド",
		description: "モダンで高性能なUI実装",
		technologies: [
			{
				name: "Next.js",
				icon: <SiNextdotjs className="w-8 h-8" />,
				description: "React フレームワーク",
			},
			{
				name: "React 19",
				icon: <FaReact className="w-8 h-8 text-blue-400" />,
				description: "UIライブラリ",
			},
			{
				name: "TypeScript",
				icon: <SiTypescript className="w-8 h-8 text-blue-600" />,
				description: "型安全な開発",
			},
			{
				name: "Tailwind CSS",
				icon: <SiTailwindcss className="w-8 h-8 text-cyan-500" />,
				description: "効率的なスタイリング",
			},
		],
	},
	{
		category: "バックエンド・CMS",
		description: "柔軟なコンテンツ管理",
		technologies: [
			{
				name: "Contentful",
				icon: <SiContentful className="w-8 h-8 text-blue-500" />,
				description: "ヘッドレスCMS",
			},
			{
				name: "Strapi",
				icon: <SiStrapi className="w-8 h-8 text-purple-600" />,
				description: "オープンソースCMS",
			},
			{
				name: "Sanity",
				icon: (
					<div className="w-8 h-8 bg-red-500 rounded text-white flex items-center justify-center text-xs font-bold">
						S
					</div>
				),
				description: "構造化コンテンツ",
			},
			{
				name: "GraphQL",
				icon: (
					<div className="w-8 h-8 bg-pink-500 rounded text-white flex items-center justify-center text-xs font-bold">
						G
					</div>
				),
				description: "効率的なAPI",
			},
		],
	},
	{
		category: "ホスティング・デプロイ",
		description: "高速・安全な配信環境",
		technologies: [
			{
				name: "Vercel",
				icon: <SiVercel className="w-8 h-8" />,
				description: "Next.js最適化",
			},
			{
				name: "Netlify",
				icon: <SiNetlify className="w-8 h-8 text-teal-500" />,
				description: "Jamstack特化",
			},
			{
				name: "Cloudflare",
				icon: <FaCloudflare className="w-8 h-8 text-orange-500" />,
				description: "CDN・セキュリティ",
			},
			{
				name: "GitHub Actions",
				icon: <FaGit className="w-8 h-8" />,
				description: "CI/CD自動化",
			},
		],
	},
];

const benefits = [
	"🚀 ビルド時間短縮・高速デプロイ",
	"🔧 開発者体験(DX)最優先の技術選定",
	"📈 将来性・拡張性を重視した構成",
	"🛡️ セキュリティ・パフォーマンス両立",
];

export function JamstackTechStackSection() {
	return (
		<section className="py-16 md:py-24">
			<Container>
				<SectionHeader
					title="技術スタック"
					description="最新技術と実績ある技術の最適な組み合わせ"
				/>

				<div className="space-y-12">
					{techCategories.map((category, categoryIndex) => (
						<div key={categoryIndex} className="space-y-6">
							<div className="text-center">
								<h3 className="text-2xl font-bold">{category.category}</h3>
								<p className="text-muted-foreground">{category.description}</p>
							</div>
							<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
								{category.technologies.map((tech, techIndex) => (
									<div
										key={techIndex}
										className="group bg-card border rounded-lg p-4 text-center hover:shadow-lg transition-all duration-300"
									>
										<div className="flex justify-center mb-3">{tech.icon}</div>
										<h4 className="font-semibold text-sm mb-1">{tech.name}</h4>
										<p className="text-xs text-muted-foreground">
											{tech.description}
										</p>
									</div>
								))}
							</div>
						</div>
					))}
				</div>

				<div className="mt-16 bg-green-600/5 border border-green-600/20 rounded-lg p-8">
					<h3 className="text-xl font-bold text-center mb-6">
						技術選定のメリット
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{benefits.map((benefit, index) => (
							<div key={index} className="flex items-center gap-3">
								<span className="text-lg">{benefit}</span>
							</div>
						))}
					</div>
				</div>
			</Container>
		</section>
	);
}
