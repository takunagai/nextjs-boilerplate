import { Container } from "@/components/ui/container";
import {
	FaCamera,
	FaLightbulb,
	FaCompactDisc,
	FaPalette,
} from "react-icons/fa6";

const equipment = [
	{
		icon: FaCamera,
		category: "カメラ・レンズ",
		items: [
			"一眼レフカメラ（フルサイズセンサー）",
			"標準ズームレンズ（24-70mm）",
			"単焦点レンズ（50mm, 85mm）",
			"マクロレンズ（商品撮影用）",
		],
	},
	{
		icon: FaLightbulb,
		category: "照明機材",
		items: [
			"LEDパネルライト（調光・調色可能）",
			"ライトボックス（商品撮影用）",
			"ストロボ・フラッシュ",
			"レフ板（銀・白・金）",
		],
	},
	{
		icon: FaCompactDisc,
		category: "撮影補助機材",
		items: ["三脚・一脚", "背景紙・背景布", "ターンテーブル", "撮影用小物"],
	},
	{
		icon: FaPalette,
		category: "編集環境",
		items: [
			"Adobe Creative Suite",
			"カラーキャリブレーション済みモニター",
			"高性能編集用PC",
			"各種AI編集ツール",
		],
	},
];

export function EquipmentSection() {
	return (
		<section className="py-16 sm:py-24">
			<Container as="section">
				<div className="text-center">
					<h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
						使用機材
					</h2>
					<p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
						プロ仕様の機材で高品質な撮影を実現
					</p>
				</div>

				<div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{equipment.map((category, index) => (
						<div
							key={index}
							className="rounded-xl bg-white p-6 shadow-md transition-shadow hover:shadow-lg dark:bg-gray-800"
						>
							{/* アイコン */}
							<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 text-blue-600 dark:from-blue-900/30 dark:to-purple-900/30 dark:text-blue-400">
								<category.icon className="h-6 w-6" />
							</div>

							{/* カテゴリ名 */}
							<h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
								{category.category}
							</h3>

							{/* 機材リスト */}
							<ul className="space-y-2">
								{category.items.map((item, itemIndex) => (
									<li
										key={itemIndex}
										className="text-sm text-gray-600 dark:text-gray-400"
									>
										• {item}
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				{/* 補足説明 */}
				<div className="mt-12 text-center">
					<p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400">
						撮影内容に応じて最適な機材を選定し、お客様のニーズに合わせた撮影を行います。
						特殊な機材が必要な場合は、事前にご相談ください。
					</p>
				</div>
			</Container>
		</section>
	);
}
