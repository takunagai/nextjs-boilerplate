import { Container } from "@/components/ui/container";
import { FaBuilding, FaBagShopping, FaMugHot, FaMobile } from "react-icons/fa6";

const audiences = [
	{
		icon: FaBuilding,
		title: "起業したての方・中小企業",
		description:
			"限られた予算で質の高い写真素材が必要な方に最適です。Webサイトやパンフレット用の写真をリーズナブルに提供します。",
	},
	{
		icon: FaBagShopping,
		title: "ECサイト運営者",
		description:
			"商品の魅力を最大限に引き出す撮影で、売上アップをサポート。統一感のある商品写真で、プロフェッショナルなショップを演出します。",
	},
	{
		icon: FaMugHot,
		title: "飲食店オーナー",
		description:
			"料理の美味しさが伝わる写真で集客力アップ。メニュー用からSNS投稿用まで、用途に合わせた撮影を行います。",
	},
	{
		icon: FaMobile,
		title: "SNSマーケティング担当者",
		description:
			"統一感のあるビジュアルでブランディングを強化。定期的な撮影にも対応し、継続的なコンテンツ制作をサポートします。",
	},
];

export function TargetAudience() {
	return (
		<section className="py-16 sm:py-24">
			<Container as="section">
				<div className="text-center">
					<h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
						こんな方におすすめ
					</h2>
					<p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
						様々なビジネスニーズにお応えします
					</p>
				</div>

				<div className="mt-12 grid gap-6 sm:grid-cols-2">
					{audiences.map((audience, index) => (
						<div
							key={index}
							className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-blue-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-600"
						>
							{/* ホバー時の背景効果 */}
							<div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 transition-opacity group-hover:opacity-100 dark:from-blue-900/10 dark:to-purple-900/10" />

							<div className="relative">
								{/* アイコンとタイトル */}
								<div className="mb-4 flex items-start">
									<div className="mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 text-blue-600 dark:from-blue-900/30 dark:to-purple-900/30 dark:text-blue-400">
										<audience.icon className="h-6 w-6" />
									</div>
									<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
										{audience.title}
									</h3>
								</div>

								{/* 説明 */}
								<p className="text-gray-600 dark:text-gray-400">
									{audience.description}
								</p>
							</div>
						</div>
					))}
				</div>

				{/* CTA */}
				<div className="mt-12 text-center">
					<p className="mb-4 text-lg text-gray-600 dark:text-gray-400">
						あなたのビジネスに最適な撮影プランをご提案します
					</p>
					<a
						href="#contact"
						className="inline-flex items-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-medium text-white transition-all hover:from-blue-700 hover:to-purple-700 hover:shadow-lg"
					>
						まずは無料相談から
					</a>
				</div>
			</Container>
		</section>
	);
}
