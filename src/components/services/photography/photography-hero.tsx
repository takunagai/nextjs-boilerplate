"use client";

import { useHeroHeight } from "@/hooks/use-hero-height";
import { HeroContainer } from "@/components/ui/hero-container";
import { FaCamera, FaArrowRight } from "react-icons/fa6";
import Link from "next/link";

export function PhotographyHero() {
	const { paddingTop, heroStyle } = useHeroHeight();

	return (
		<section
			className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
			style={heroStyle}
		>
			{/* 背景装飾 */}
			<div className="absolute inset-0 -z-10">
				<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
					<div className="h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />
				</div>
				<div className="absolute right-0 top-0">
					<div className="h-64 w-64 rounded-full bg-purple-400/10 blur-3xl" />
				</div>
				<div className="absolute bottom-0 left-0">
					<div className="h-64 w-64 rounded-full bg-indigo-400/10 blur-3xl" />
				</div>
			</div>

			<HeroContainer className="relative z-10">
				<div className="mx-auto max-w-4xl text-center">
					{/* アイコン */}
					<div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg">
						<FaCamera className="h-10 w-10" />
					</div>

					{/* キャッチコピー */}
					<h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
						デザイナー目線で撮る、
						<br />
						<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
							ビジネスを魅せる写真
						</span>
					</h1>

					{/* サブキャッチ */}
					<p className="mb-8 text-lg text-gray-600 dark:text-gray-300 sm:text-xl">
						プロ品質の写真撮影を、もっと身近に、もっとリーズナブルに
					</p>

					{/* リード文 */}
					<p className="mx-auto mb-10 max-w-2xl text-base text-gray-600 dark:text-gray-400">
						Webデザイナーとしての経験を活かし、構図・色彩・バランスにこだわった写真撮影サービスを提供します。
						撮影から画像補正まで一括でお任せください。
					</p>

					{/* CTA ボタン */}
					<div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
						<Link
							href="#contact"
							className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 text-base font-medium text-white shadow-lg transition-all hover:from-blue-700 hover:to-purple-700 hover:shadow-xl"
						>
							無料相談を申し込む
							<FaArrowRight className="ml-2 h-5 w-5" />
						</Link>
						<Link
							href="#gallery"
							className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-8 py-3 text-base font-medium text-gray-700 transition-all hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
						>
							作品を見る
						</Link>
					</div>

					{/* 特徴 */}
					<div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
						<div className="rounded-lg bg-white/80 p-4 backdrop-blur-sm dark:bg-gray-800/80">
							<p className="text-sm font-semibold text-gray-900 dark:text-white">
								撮影料金
							</p>
							<p className="text-xs text-gray-600 dark:text-gray-400">
								5,500円/時間〜
							</p>
						</div>
						<div className="rounded-lg bg-white/80 p-4 backdrop-blur-sm dark:bg-gray-800/80">
							<p className="text-sm font-semibold text-gray-900 dark:text-white">
								画像補正
							</p>
							<p className="text-xs text-gray-600 dark:text-gray-400">
								基本補正無料
							</p>
						</div>
						<div className="rounded-lg bg-white/80 p-4 backdrop-blur-sm dark:bg-gray-800/80">
							<p className="text-sm font-semibold text-gray-900 dark:text-white">
								納品スピード
							</p>
							<p className="text-xs text-gray-600 dark:text-gray-400">
								最短翌日納品
							</p>
						</div>
					</div>
				</div>
			</HeroContainer>
		</section>
	);
}
