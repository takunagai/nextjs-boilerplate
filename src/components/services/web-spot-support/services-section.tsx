import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import {
	FaBug,
	FaPalette,
	FaGears,
	FaShield,
	FaMobile,
	FaMagnifyingGlass,
} from "react-icons/fa6";

const services = [
	{
		icon: <FaBug className="w-8 h-8 text-red-600" />,
		title: "エラー・バグ修正",
		description: "404エラー、表示不具合、機能不全などのトラブルを迅速解決",
		examples: [
			"ページが表示されない",
			"フォームが送信できない",
			"レイアウトが崩れている",
		],
	},
	{
		icon: <FaPalette className="w-8 h-8 text-blue-600" />,
		title: "デザイン調整・修正",
		description: "色変更、レイアウト調整、フォント変更などのデザイン修正",
		examples: ["色を変えたい", "ボタンのデザインを変更", "画像を差し替えたい"],
	},
	{
		icon: <FaGears className="w-8 h-8 text-green-600" />,
		title: "機能追加・改修",
		description: "新しい機能の追加、既存機能の改修、プラグイン導入など",
		examples: [
			"お問い合わせフォーム追加",
			"SNSボタン追加",
			"スライダー機能追加",
		],
	},
	{
		icon: <FaShield className="w-8 h-8 text-purple-600" />,
		title: "セキュリティ対策",
		description: "マルウェア駆除、セキュリティ強化、バックアップ設定など",
		examples: ["サイトがハックされた", "SSL証明書設定", "セキュリティ強化"],
	},
	{
		icon: <FaMobile className="w-8 h-8 text-orange-600" />,
		title: "レスポンシブ対応",
		description: "スマートフォン・タブレット表示の修正、モバイル最適化",
		examples: [
			"スマホでレイアウトが崩れる",
			"タブレット表示がおかしい",
			"モバイル最適化",
		],
	},
	{
		icon: <FaMagnifyingGlass className="w-8 h-8 text-pink-600" />,
		title: "SEO・高速化対策",
		description: "ページ表示速度改善、SEO最適化、アナリティクス設定など",
		examples: ["ページ表示が遅い", "Googleアナリティクス設定", "SEO最適化"],
	},
];

export function WebSpotSupportServicesSection() {
	return (
		<section className="py-16 md:py-24">
			<Container>
				<SectionHeader
					title="対応サービス一覧"
					description="幅広いWebトラブル・修正ニーズに対応"
				/>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{services.map((service, index) => (
						<div
							key={index}
							className="group relative bg-card border rounded-lg p-6 hover:shadow-lg transition-all duration-300"
						>
							<div className="space-y-4">
								<div className="flex items-center space-x-3">
									{service.icon}
									<h3 className="text-xl font-semibold">{service.title}</h3>
								</div>
								<p className="text-muted-foreground leading-relaxed">
									{service.description}
								</p>
								<div>
									<h4 className="text-sm font-semibold mb-2">例:</h4>
									<ul className="space-y-1">
										{service.examples.map((example, exampleIndex) => (
											<li
												key={exampleIndex}
												className="text-sm text-muted-foreground flex items-center"
											>
												<span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
												{example}
											</li>
										))}
									</ul>
								</div>
							</div>
							<div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
						</div>
					))}
				</div>

				<div className="mt-12 bg-purple-600/5 border border-purple-600/20 rounded-lg p-8 text-center">
					<h3 className="text-xl font-bold mb-4">こんなお困りごともお気軽に</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
						<div>・ サイトが突然表示されなくなった</div>
						<div>・ デザインを少しだけ変更したい</div>
						<div>・ スマホ表示がおかしい</div>
						<div>・ 新しいページを追加したい</div>
						<div>・ WordPressの操作が分からない</div>
						<div>・ サイトを高速化したい</div>
					</div>
				</div>
			</Container>
		</section>
	);
}
