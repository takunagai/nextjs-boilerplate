import { Container } from "@/components/ui/container";
import { FaCheck, FaClock, FaCamera, FaImage } from "react-icons/fa6";

const pricingInfo = {
	base: 5500,
	hourly: 5500,
	includes: [
		"撮影データ全て納品",
		"基本的な画像補正込み",
		"著作権譲渡",
		"商用利用可能",
		"RAWデータ提供可",
	],
};

const examples = [
	{
		title: "プロフィール写真撮影",
		duration: "1時間",
		photos: "50枚程度",
		price: "11,000円",
		description: "ビジネス用プロフィール写真の撮影",
	},
	{
		title: "商品撮影（10点）",
		duration: "2時間",
		photos: "100枚程度",
		price: "16,500円",
		description: "ECサイト用の商品写真撮影",
	},
	{
		title: "料理撮影（20品）",
		duration: "3時間",
		photos: "150枚程度",
		price: "22,000円",
		description: "メニュー用の料理写真撮影",
	},
	{
		title: "店舗撮影",
		duration: "2時間",
		photos: "80枚程度",
		price: "16,500円",
		description: "店舗の内装・外観撮影",
	},
];

export function PricingPlans() {
	return (
		<section className="bg-gray-50 py-16 dark:bg-gray-900 sm:py-24">
			<Container as="section">
				<div className="text-center">
					<h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
						料金プラン
					</h2>
					<p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
						シンプルで分かりやすい料金体系
					</p>
				</div>

				{/* 基本料金 */}
				<div className="mx-auto mt-12 max-w-3xl">
					<div className="overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-gray-800">
						<div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 text-white">
							<h3 className="text-2xl font-bold">基本料金体系</h3>
							<p className="mt-2">撮影から画像補正まで込みの料金です</p>
						</div>

						<div className="p-8">
							<div className="mb-8 flex items-baseline justify-center">
								<span className="text-2xl text-gray-600 dark:text-gray-400">
									基本料金
								</span>
								<span className="mx-3 text-4xl font-bold text-gray-900 dark:text-white">
									{pricingInfo.base.toLocaleString()}円
								</span>
								<span className="text-2xl text-gray-600 dark:text-gray-400">
									+
								</span>
								<span className="mx-3 text-4xl font-bold text-gray-900 dark:text-white">
									{pricingInfo.hourly.toLocaleString()}円
								</span>
								<span className="text-2xl text-gray-600 dark:text-gray-400">
									/時間
								</span>
							</div>

							{/* 含まれるサービス */}
							<div className="mb-8">
								<h4 className="mb-4 text-center text-lg font-semibold text-gray-900 dark:text-white">
									料金に含まれるもの
								</h4>
								<div className="grid gap-3 sm:grid-cols-2">
									{pricingInfo.includes.map((item, index) => (
										<div key={index} className="flex items-center">
											<FaCheck className="mr-3 h-5 w-5 text-green-500" />
											<span className="text-gray-700 dark:text-gray-300">
												{item}
											</span>
										</div>
									))}
								</div>
							</div>

							{/* 注記 */}
							<div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
								<p className="text-sm text-blue-800 dark:text-blue-200">
									※ 交通費は実費請求となります（都内は無料）
									<br />※ 早朝・深夜・休日の撮影は料金が異なる場合があります
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* 料金例 */}
				<div className="mt-16">
					<h3 className="mb-8 text-center text-2xl font-bold text-gray-900 dark:text-white">
						料金例
					</h3>
					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
						{examples.map((example, index) => (
							<div
								key={index}
								className="rounded-xl bg-white p-6 shadow-md transition-shadow hover:shadow-lg dark:bg-gray-800"
							>
								<h4 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
									{example.title}
								</h4>

								<div className="mb-4 space-y-2 text-sm">
									<div className="flex items-center text-gray-600 dark:text-gray-400">
										<FaClock className="mr-2 h-4 w-4" />
										<span>撮影時間: {example.duration}</span>
									</div>
									<div className="flex items-center text-gray-600 dark:text-gray-400">
										<FaCamera className="mr-2 h-4 w-4" />
										<span>撮影枚数: {example.photos}</span>
									</div>
								</div>

								<p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
									{example.description}
								</p>

								<div className="border-t border-gray-200 pt-4 dark:border-gray-700">
									<p className="text-center">
										<span className="text-sm text-gray-600 dark:text-gray-400">
											料金目安
										</span>
										<span className="ml-2 text-2xl font-bold text-gray-900 dark:text-white">
											{example.price}
										</span>
									</p>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* お見積もりCTA */}
				<div className="mt-12 text-center">
					<p className="mb-4 text-lg text-gray-600 dark:text-gray-400">
						詳細なお見積もりは、お気軽にお問い合わせください
					</p>
					<a
						href="#contact"
						className="inline-flex items-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-medium text-white transition-all hover:from-blue-700 hover:to-purple-700 hover:shadow-lg"
					>
						無料でお見積もり
					</a>
				</div>
			</Container>
		</section>
	);
}
