import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { FaRocket, FaShield, FaSearchengin, FaDollarSign, FaMobile, FaCode } from "react-icons/fa6";

const features = [
	{
		icon: <FaRocket className="w-8 h-8 text-green-600" />,
		title: "超高速表示",
		description: "静的生成により平均読み込み時間を90%短縮。CDN配信でグローバル高速表示を実現。",
		benefits: ["LCPスコア 2.5秒以下", "CLS 0.1以下", "FIDスコア 100ms以下"]
	},
	{
		icon: <FaShield className="w-8 h-8 text-blue-600" />,
		title: "堅牢なセキュリティ",
		description: "サーバーサイド攻撃リスクを大幅削減。SSL証明書・CSRF対策・XSS対策を標準実装。",
		benefits: ["サーバー攻撃リスク ほぼゼロ", "自動SSL更新", "最新セキュリティパッチ適用"]
	},
	{
		icon: <FaSearchengin className="w-8 h-8 text-purple-600" />,
		title: "SEO最適化",
		description: "構造化データ・メタタグ・サイトマップ自動生成。検索エンジン最適化を徹底実装。",
		benefits: ["Core Web Vitals 最適化", "構造化データ自動生成", "サイトマップ自動更新"]
	},
	{
		icon: <FaDollarSign className="w-8 h-8 text-orange-600" />,
		title: "低運用コスト",
		description: "静的ホスティングで運用費を大幅削減。サーバー管理・メンテナンス不要で安心運用。",
		benefits: ["月額1,000円以下", "サーバー管理不要", "自動バックアップ"]
	},
	{
		icon: <FaMobile className="w-8 h-8 text-pink-600" />,
		title: "完全レスポンシブ",
		description: "モバイルファースト設計で全デバイス最適化。PWA対応でアプリライクな体験を提供。",
		benefits: ["全デバイス対応", "PWA対応", "オフライン表示"]
	},
	{
		icon: <FaCode className="w-8 h-8 text-indigo-600" />,
		title: "拡張性・保守性",
		description: "TypeScript・Component設計で将来の機能追加も安心。Git管理で変更履歴も完全管理。",
		benefits: ["TypeScript採用", "コンポーネント設計", "Git版本管理"]
	},
];

export function JamstackFeaturesSection() {
	return (
		<section className="py-16 md:py-24">
			<Container>
				<SectionHeader
					title="Jamstackが選ばれる6つの理由"
					description="従来のCMSでは実現できない、次世代Web技術の圧倒的メリット"
				/>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{features.map((feature, index) => (
						<div
							key={index}
							className="group relative bg-card border rounded-lg p-6 hover:shadow-lg transition-all duration-300"
						>
							<div className="space-y-4">
								<div className="flex items-center space-x-3">
									{feature.icon}
									<h3 className="text-xl font-semibold">{feature.title}</h3>
								</div>
								<p className="text-muted-foreground leading-relaxed">
									{feature.description}
								</p>
								<ul className="space-y-2">
									{feature.benefits.map((benefit, benefitIndex) => (
										<li key={benefitIndex} className="text-sm text-muted-foreground flex items-center">
											<span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
											{benefit}
										</li>
									))}
								</ul>
							</div>
							<div className="absolute inset-0 bg-gradient-to-br from-green-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
						</div>
					))}
				</div>
			</Container>
		</section>
	);
}