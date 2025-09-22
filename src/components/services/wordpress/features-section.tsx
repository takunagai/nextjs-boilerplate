import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { FaWordpress, FaPencil, FaMagnifyingGlass, FaShield, FaMobile, FaGears } from "react-icons/fa6";

const features = [
	{
		icon: <FaWordpress className="w-8 h-8 text-blue-500" />,
		title: "柔軟なCMS機能",
		description: "直感的な管理画面でコンテンツ更新が簡単。投稿・固定ページ・カスタム投稿タイプで多様なコンテンツに対応。",
		benefits: ["ドラッグ&ドロップエディタ", "メディアライブラリ管理", "リビジョン履歴"]
	},
	{
		icon: <FaPencil className="w-8 h-8 text-green-600" />,
		title: "カスタムテーマ開発",
		description: "既製テーマに頼らず、オリジナルデザインを完全再現。ブランドイメージを最大限に活かします。",
		benefits: ["完全オリジナルデザイン", "レスポンシブ対応", "高速表示最適化"]
	},
	{
		icon: <FaMagnifyingGlass className="w-8 h-8 text-purple-600" />,
		title: "SEO最適化",
		description: "検索エンジンに評価されるサイト構造・コンテンツ設計。アクセス数向上をサポートします。",
		benefits: ["構造化データ実装", "サイトマップ自動生成", "PageSpeed最適化"]
	},
	{
		icon: <FaShield className="w-8 h-8 text-red-600" />,
		title: "セキュリティ強化",
		description: "WordPressの脆弱性対策を徹底実装。定期的なセキュリティアップデートで安心運用。",
		benefits: ["マルウェア対策", "ログイン認証強化", "自動バックアップ"]
	},
	{
		icon: <FaMobile className="w-8 h-8 text-pink-600" />,
		title: "マルチデバイス対応",
		description: "PC・タブレット・スマートフォン全てで最適表示。モバイルファーストで設計します。",
		benefits: ["レスポンシブデザイン", "タッチ操作最適化", "モバイル高速化"]
	},
	{
		icon: <FaGears className="w-8 h-8 text-indigo-600" />,
		title: "拡張性・保守性",
		description: "将来の機能追加・アップデートを考慮した設計。長期的な運用コストを抑制します。",
		benefits: ["プラグイン対応", "カスタムフィールド", "多言語化対応"]
	},
];

export function WordPressFeaturesSection() {
	return (
		<section className="py-16 md:py-24">
			<Container>
				<SectionHeader
					title="WordPressが選ばれる6つの理由"
					description="CMSの王道WordPressの柔軟性を最大限に活用"
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
							<div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
						</div>
					))}
				</div>
			</Container>
		</section>
	);
}