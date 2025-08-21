import { Container } from "@/components/ui/container";
import { FaUser, FaBox, FaUtensils, FaBuilding } from "react-icons/fa6";
import Image from "next/image";

const genres = [
	{
		icon: FaUser,
		title: "人物写真",
		description: "プロフィール写真、スタッフ写真、宣材写真など",
		features: [
			"ビジネス用プロフィール",
			"チーム・スタッフ写真",
			"宣材・アーティスト写真",
			"SNS用ポートレート",
		],
		image: "/api/placeholder/400/300",
		alt: "人物写真の例",
	},
	{
		icon: FaBox,
		title: "商品写真",
		description: "EC用、カタログ用、広告用の商品撮影",
		features: [
			"ECサイト用商品写真",
			"カタログ・パンフレット用",
			"広告・バナー用素材",
			"360度回転写真",
		],
		image: "/api/placeholder/400/300",
		alt: "商品写真の例",
	},
	{
		icon: FaUtensils,
		title: "料理写真",
		description: "メニュー用、SNS用、Webサイト用の料理撮影",
		features: [
			"メニュー用写真",
			"SNS投稿用写真",
			"Webサイト用イメージ",
			"シズル感のある演出",
		],
		image: "/api/placeholder/400/300",
		alt: "料理写真の例",
	},
	{
		icon: FaBuilding,
		title: "店舗写真",
		description: "内装、外観、施設紹介用の撮影",
		features: [
			"店舗外観・エントランス",
			"内装・インテリア",
			"施設・設備紹介",
			"雰囲気を伝える空間撮影",
		],
		image: "/api/placeholder/400/300",
		alt: "店舗写真の例",
	},
];

export function PhotographyGenres() {
	return (
		<section className="bg-gray-50 py-16 dark:bg-gray-900 sm:py-24">
			<Container as="section">
				<div className="text-center">
					<h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
						撮影ジャンル
					</h2>
					<p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
						様々なビジネスシーンに対応した撮影を行います
					</p>
				</div>

				<div className="mt-12 grid gap-8 lg:grid-cols-2">
					{genres.map((genre, index) => (
						<div
							key={index}
							className="group overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:shadow-xl dark:bg-gray-800"
						>
							<div className="flex flex-col sm:flex-row">
								{/* 画像 */}
								<div className="relative h-48 sm:h-auto sm:w-1/3">
									<Image
										src={genre.image}
										alt={genre.alt}
										fill
										className="object-cover transition-transform group-hover:scale-105"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent sm:bg-gradient-to-r" />
								</div>

								{/* コンテンツ */}
								<div className="flex-1 p-6">
									<div className="mb-4 flex items-center">
										<div className="mr-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white">
											<genre.icon className="h-5 w-5" />
										</div>
										<h3 className="text-xl font-bold text-gray-900 dark:text-white">
											{genre.title}
										</h3>
									</div>

									<p className="mb-4 text-gray-600 dark:text-gray-400">
										{genre.description}
									</p>

									<ul className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
										{genre.features.map((feature, featureIndex) => (
											<li
												key={featureIndex}
												className="flex items-center text-gray-600 dark:text-gray-400"
											>
												<svg
													className="mr-2 h-4 w-4 text-blue-500"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
													/>
												</svg>
												{feature}
											</li>
										))}
									</ul>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* 注意事項 */}
				<div className="mt-8 rounded-lg bg-amber-50 p-6 dark:bg-amber-900/20">
					<p className="text-sm text-amber-800 dark:text-amber-200">
						<strong>ご注意：</strong>
						動きが激しい被写体（スポーツ等）や、暗い環境での大幅なズームが必要な撮影は、専門機材の関係で対応が難しい場合があります。事前にご相談ください。
					</p>
				</div>
			</Container>
		</section>
	);
}