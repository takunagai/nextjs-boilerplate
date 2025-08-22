import { Container } from "@/components/ui/container";
import { FaCheck, FaStar, FaArrowRight } from "react-icons/fa6";
import Link from "next/link";

const basicEdits = [
	"明るさ・露出の調整",
	"色味・ホワイトバランス補正",
	"トリミング・角度調整",
	"シャープネス調整",
	"基本的なノイズ除去",
];

const aiEdits = [
	"不要な物体の除去",
	"見切れた部分の復元",
	"背景の差し替え",
	"人物の美肌補正",
	"オブジェクトの追加",
];

export function ImageEditingService() {
	return (
		<section className="bg-gradient-to-br from-gray-50 to-blue-50 py-16 dark:from-gray-900 dark:to-gray-800 sm:py-24">
			<Container as="section">
				<div className="text-center">
					<h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
						充実の画像補正サービス
					</h2>
					<p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
						撮影後の画像編集もお任せください
					</p>
				</div>

				<div className="mt-12 grid gap-8 lg:grid-cols-2">
					{/* 基本補正 */}
					<div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-800">
						<div className="mb-6">
							<span className="inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
								<FaCheck className="mr-2 h-4 w-4" />
								無料サービス
							</span>
						</div>

						<h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
							基本補正
						</h3>
						<p className="mb-6 text-gray-600 dark:text-gray-400">
							撮影したすべての写真に、以下の基本的な補正を無料で行います。
						</p>

						<ul className="space-y-3">
							{basicEdits.map((edit, index) => (
								<li key={index} className="flex items-start">
									<svg
										className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M5 13l4 4L19 7"
										/>
									</svg>
									<span className="text-gray-700 dark:text-gray-300">
										{edit}
									</span>
								</li>
							))}
						</ul>
					</div>

					{/* AI画像編集 */}
					<div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 p-8 text-white shadow-lg">
						{/* 背景装飾 */}
						<div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
						<div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />

						<div className="relative">
							<div className="mb-6">
								<span className="inline-flex items-center rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur-sm">
									<FaStar className="mr-2 h-4 w-4" />
									オプションサービス
								</span>
							</div>

							<h3 className="mb-4 text-2xl font-bold">
								AI活用による高度な編集
							</h3>
							<p className="mb-6 text-white/90">
								最新のAI技術を活用し、従来は難しかった編集も可能に。
							</p>

							<ul className="mb-8 space-y-3">
								{aiEdits.map((edit, index) => (
									<li key={index} className="flex items-start">
										<svg
											className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-white"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M5 13l4 4L19 7"
											/>
										</svg>
										<span className="text-white/90">{edit}</span>
									</li>
								))}
							</ul>

							<Link
								href="/services/image-editing"
								className="inline-flex items-center rounded-lg bg-white px-6 py-3 text-sm font-medium text-purple-600 transition-all hover:bg-gray-100"
							>
								詳しく見る
								<FaArrowRight className="ml-2 h-4 w-4" />
							</Link>
						</div>
					</div>
				</div>

				{/* 補足情報 */}
				<div className="mt-8 rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
					<p className="text-sm text-blue-800 dark:text-blue-200">
						<strong>ポイント：</strong>
						基本補正は撮影料金に含まれており、追加料金は一切かかりません。AI編集は必要に応じてオプションとしてご利用いただけます。
					</p>
				</div>
			</Container>
		</section>
	);
}
