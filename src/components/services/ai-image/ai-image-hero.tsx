"use client";

import { useHeroHeight } from "@/hooks/use-hero-height";
import { HeroContainer } from "@/components/ui/hero-container";
import { FaRobot, FaArrowRight, FaImage } from "react-icons/fa6";
import Link from "next/link";

export function AIImageHero() {
	const { paddingTop, heroStyle } = useHeroHeight();

	return (
		<section
			className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
			style={heroStyle}
		>
			{/* 背景装飾 */}
			<div className="absolute inset-0 -z-10">
				<div className="absolute left-1/4 top-1/4 -translate-x-1/2 -translate-y-1/2">
					<div className="h-96 w-96 rounded-full bg-purple-400/10 blur-3xl" />
				</div>
				<div className="absolute right-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2">
					<div className="h-64 w-64 rounded-full bg-blue-400/10 blur-3xl" />
				</div>
				<div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2">
					<div className="h-80 w-80 rounded-full bg-indigo-400/10 blur-3xl" />
				</div>
			</div>

			<HeroContainer className="relative z-10">
				<div className="mx-auto max-w-4xl text-center">
					{/* キャッチコピー */}
					<h1 className="mb-6 text-4xl font-bold tracking-tight leading-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
						想像を現実に変える、
						<br />
						<span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
							プロ品質のAI画像制作
						</span>
					</h1>

					{/* サブキャッチ */}
					<p className="mb-8 text-lg text-gray-600 dark:text-gray-300 sm:text-xl">
						デザイナーの技術とAIの力で、理想の画像を創造します
					</p>

					{/* リード文 */}
					<p className="mx-auto mb-10 max-w-2xl text-base text-gray-600 dark:text-gray-400">
						PhotoshopとAIを駆使し、写真加工から画像生成まで幅広く対応。
						「使える画像」に仕上げることにこだわり、あなたのビジネスを視覚的にサポートします。
					</p>

					{/* CTAボタン */}
					<div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
						<Link
							href="#contact"
							className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-3 text-base font-medium text-white shadow-lg transition-all hover:from-purple-700 hover:to-blue-700 hover:shadow-xl"
						>
							無料相談を申し込む
							<FaArrowRight className="ml-2 h-5 w-5" />
						</Link>
						<Link
							href="#gallery"
							className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-8 py-3 text-base font-medium text-gray-700 transition-all hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
						>
							<FaImage className="mr-2 h-5 w-5" />
							作品を見る
						</Link>
					</div>

					{/* 特徴 */}
					<div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
						<div className="rounded-lg bg-white/80 p-4 backdrop-blur-sm dark:bg-gray-800/80">
							<p className="text-sm font-semibold text-gray-900 dark:text-white">
								写真加工・補正
							</p>
							<p className="text-xs text-gray-600 dark:text-gray-400">
								アップスケール・復元
							</p>
						</div>
						<div className="rounded-lg bg-white/80 p-4 backdrop-blur-sm dark:bg-gray-800/80">
							<p className="text-sm font-semibold text-gray-900 dark:text-white">
								AI画像生成
							</p>
							<p className="text-xs text-gray-600 dark:text-gray-400">
								イラスト・モデル写真
							</p>
						</div>
						<div className="rounded-lg bg-white/80 p-4 backdrop-blur-sm dark:bg-gray-800/80">
							<p className="text-sm font-semibold text-gray-900 dark:text-white">
								プロ仕上げ
							</p>
							<p className="text-xs text-gray-600 dark:text-gray-400">
								自然な品質に調整
							</p>
						</div>
					</div>
				</div>
			</HeroContainer>
		</section>
	);
}
