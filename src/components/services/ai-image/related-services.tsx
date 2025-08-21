import { Container } from "@/components/ui/container";
import {
	FaVideo,
	FaMusic,
	FaMicrophone,
	FaRobot,
	FaGamepad,
	FaCode,
	FaArrowRight,
} from "react-icons/fa6";

const relatedServices = [
	{
		id: 1,
		title: "AI動画制作・編集",
		description:
			"AI技術を活用した動画制作、既存動画の高画質化、自動字幕生成などの動画編集サービス",
		icon: FaVideo,
		features: ["動画アップスケール", "ノイズ除去", "AI字幕生成", "シーン分析"],
		color: "from-red-500 to-pink-500",
		comingSoon: false,
	},
	{
		id: 2,
		title: "AI音楽・音声生成",
		description:
			"オリジナル楽曲の生成、音声合成、効果音制作など、音響分野でのAI活用サービス",
		icon: FaMusic,
		features: ["楽曲生成", "音声合成", "効果音制作", "音質向上"],
		color: "from-green-500 to-blue-500",
		comingSoon: true,
	},
	{
		id: 3,
		title: "AIボイス・ナレーション",
		description:
			"自然な日本語音声合成、多言語対応、感情表現豊かなAIボイスサービス",
		icon: FaMicrophone,
		features: ["自然な音声合成", "多言語対応", "感情表現", "カスタムボイス"],
		color: "from-purple-500 to-indigo-500",
		comingSoon: false,
	},
	{
		id: 4,
		title: "AI文章生成・翻訳",
		description:
			"マーケティングコピー、ブログ記事、技術文書などの高品質AI文章生成サービス",
		icon: FaRobot,
		features: ["コピーライティング", "技術文書作成", "多言語翻訳", "SEO最適化"],
		color: "from-yellow-500 to-orange-500",
		comingSoon: false,
	},
	{
		id: 5,
		title: "AI 3D・メタバース",
		description:
			"3Dモデル生成、バーチャル空間制作、VR/ARコンテンツ開発などの次世代サービス",
		icon: FaGamepad,
		features: ["3Dモデル生成", "VRコンテンツ", "メタバース構築", "ARアプリ"],
		color: "from-teal-500 to-cyan-500",
		comingSoon: true,
	},
	{
		id: 6,
		title: "AIアプリ・システム開発",
		description:
			"業務効率化AI、カスタムGPT、API連携など、ビジネス向けAIソリューション開発",
		icon: FaCode,
		features: ["業務自動化", "カスタムAI", "API開発", "システム連携"],
		color: "from-indigo-500 to-purple-500",
		comingSoon: false,
	},
];

export function RelatedServices() {
	return (
		<section className="py-16 sm:py-24">
			<Container as="section">
				<div className="text-center">
					<h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
						その他のAIサービス
					</h2>
					<p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
						AI画像制作以外にも、様々な分野でAI技術を活用したサービスを提供しています
					</p>
				</div>

				<div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
					{relatedServices.map((service) => (
						<div
							key={service.id}
							className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all hover:shadow-xl dark:bg-gray-800"
						>
							{/* Coming Soon ラベル */}
							{service.comingSoon && (
								<div className="absolute right-4 top-4">
									<span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-400">
										準備中
									</span>
								</div>
							)}

							{/* アイコン */}
							<div
								className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${service.color}`}
							>
								<service.icon className="h-8 w-8 text-white" />
							</div>

							{/* タイトル・説明 */}
							<h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
								{service.title}
							</h3>
							<p className="mb-6 text-gray-600 dark:text-gray-400">
								{service.description}
							</p>

							{/* 機能リスト */}
							<ul className="mb-6 space-y-2">
								{service.features.map((feature, index) => (
									<li
										key={index}
										className="flex items-center text-sm text-gray-600 dark:text-gray-400"
									>
										<span className="mr-2 h-1.5 w-1.5 rounded-full bg-gray-400" />
										{feature}
									</li>
								))}
							</ul>

							{/* CTAボタン */}
							<div className="flex items-center">
								{service.comingSoon ? (
									<span className="text-sm text-gray-500 dark:text-gray-500">
										近日公開予定
									</span>
								) : (
									<a
										href="#contact"
										className="group inline-flex items-center text-sm font-medium text-purple-600 transition-colors hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
									>
										詳細を見る
										<FaArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
									</a>
								)}
							</div>

							{/* 背景装飾 */}
							<div
								className={`absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-gradient-to-br opacity-10 transition-opacity group-hover:opacity-20 ${service.color}`}
							/>
						</div>
					))}
				</div>

				{/* サービス展開の説明 */}
				<div className="mt-16 rounded-2xl bg-gradient-to-r from-gray-50 to-blue-50 p-8 dark:from-gray-800 dark:to-blue-900/20">
					<div className="text-center">
						<h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
							総合的なAIソリューションパートナー
						</h3>
						<p className="mx-auto max-w-3xl text-gray-700 dark:text-gray-300">
							画像制作から始まり、動画、音声、文章、システム開発まで、
							AI技術を活用した幅広いサービスを段階的に展開しています。
							お客様のニーズに合わせたオーダーメイドのAIソリューションをご提案いたします。
						</p>
					</div>

					{/* サービス統計 */}
					<div className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-4">
						<div className="text-center">
							<div className="mb-2 text-2xl font-bold text-purple-600 dark:text-purple-400">
								6+
							</div>
							<div className="text-sm text-gray-600 dark:text-gray-400">
								AIサービス分野
							</div>
						</div>
						<div className="text-center">
							<div className="mb-2 text-2xl font-bold text-blue-600 dark:text-blue-400">
								15+
							</div>
							<div className="text-sm text-gray-600 dark:text-gray-400">
								AI技術活用
							</div>
						</div>
						<div className="text-center">
							<div className="mb-2 text-2xl font-bold text-green-600 dark:text-green-400">
								100+
							</div>
							<div className="text-sm text-gray-600 dark:text-gray-400">
								企業導入実績
							</div>
						</div>
						<div className="text-center">
							<div className="mb-2 text-2xl font-bold text-orange-600 dark:text-orange-400">
								24/7
							</div>
							<div className="text-sm text-gray-600 dark:text-gray-400">
								サポート体制
							</div>
						</div>
					</div>
				</div>

				{/* 企業向けCTA */}
				<div className="mt-12 text-center">
					<p className="mb-6 text-lg text-gray-600 dark:text-gray-400">
						企業向けの本格的なAI導入をお考えの方へ
					</p>
					<div className="flex flex-col justify-center gap-4 sm:flex-row">
						<a
							href="#contact"
							className="inline-flex items-center rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 text-sm font-medium text-white transition-all hover:from-purple-700 hover:to-blue-700 hover:shadow-lg"
						>
							AIコンサルティング相談
						</a>
						<a
							href="#contact"
							className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
						>
							事例・実績を見る
						</a>
					</div>
				</div>
			</Container>
		</section>
	);
}
