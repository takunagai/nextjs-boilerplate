import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { FaGears, FaPlug, FaUsers, FaCartShopping } from "react-icons/fa6";

const customizations = [
	{
		icon: <FaGears className="w-8 h-8 text-blue-500" />,
		title: "管理画面カスタマイズ",
		description: "使いやすい管理画面で運用効率を最大化",
		features: [
			"直感的なコンテンツ編集画面",
			"カスタムフィールド設計",
			"ユーザー権限管理",
			"編集ガイド・ヘルプ機能"
		]
	},
	{
		icon: <FaPlug className="w-8 h-8 text-green-600" />,
		title: "プラグイン開発",
		description: "独自機能をプラグインで実現",
		features: [
			"カスタム投稿タイプ作成",
			"独自フォーム機能",
			"API連携プラグイン",
			"パフォーマンス最適化"
		]
	},
	{
		icon: <FaUsers className="w-8 h-8 text-purple-600" />,
		title: "会員システム",
		description: "登録・ログイン・権限管理を完全カスタマイズ",
		features: [
			"会員登録・ログイン機能",
			"会員限定コンテンツ",
			"プロフィール管理",
			"メール配信システム"
		]
	},
	{
		icon: <FaCartShopping className="w-8 h-8 text-orange-600" />,
		title: "ECサイト機能",
		description: "WooCommerceで本格的なオンラインショップ",
		features: [
			"商品管理・在庫管理",
			"決済システム連携",
			"配送設定・税計算",
			"顧客管理・注文管理"
		]
	},
];

export function WordPressCustomizationSection() {
	return (
		<section className="py-16 md:py-24">
			<Container>
				<SectionHeader
					title="カスタマイズ・拡張機能"
					description="WordPressの柔軟性を活かした独自機能開発"
				/>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{customizations.map((item, index) => (
						<div
							key={index}
							className="group bg-card border rounded-lg p-6 hover:shadow-lg transition-all duration-300"
						>
							<div className="space-y-4">
								<div className="flex items-center space-x-3">
									{item.icon}
									<h3 className="text-xl font-semibold">{item.title}</h3>
								</div>
								<p className="text-muted-foreground leading-relaxed">
									{item.description}
								</p>
								<ul className="space-y-2">
									{item.features.map((feature, featureIndex) => (
										<li key={featureIndex} className="text-sm flex items-center">
											<span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
											{feature}
										</li>
									))}
								</ul>
							</div>
						</div>
					))}
				</div>

				<div className="mt-12 bg-blue-500/5 border border-blue-500/20 rounded-lg p-8">
					<h3 className="text-xl font-bold text-center mb-6">開発実績</h3>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
						<div>
							<div className="text-2xl font-bold text-blue-500">50+</div>
							<div className="text-sm text-muted-foreground">カスタムテーマ</div>
						</div>
						<div>
							<div className="text-2xl font-bold text-green-600">30+</div>
							<div className="text-sm text-muted-foreground">プラグイン開発</div>
						</div>
						<div>
							<div className="text-2xl font-bold text-purple-600">20+</div>
							<div className="text-sm text-muted-foreground">ECサイト構築</div>
						</div>
						<div>
							<div className="text-2xl font-bold text-orange-600">15+</div>
							<div className="text-sm text-muted-foreground">会員システム</div>
						</div>
					</div>
				</div>
			</Container>
		</section>
	);
}