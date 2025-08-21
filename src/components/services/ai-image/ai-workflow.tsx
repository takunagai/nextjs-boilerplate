"use client";

import { Container } from "@/components/ui/container";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
	FaMessage,
	FaFile,
	FaCalendar,
	FaRobot,
	FaPencil,
	FaPaperPlane,
} from "react-icons/fa6";

const steps = [
	{
		id: 1,
		title: "お問い合わせ・ヒアリング",
		description: "制作内容や要望を詳しくお聞かせください",
		icon: FaMessage,
		duration: "即日",
		role: "client",
		details: [
			"制作内容の詳細確認",
			"参考画像・イメージの共有",
			"予算・納期のご相談",
			"技術的実現可能性の確認",
		],
	},
	{
		id: 2,
		title: "お見積もり・企画提案",
		description: "最適な制作プランとお見積もりをご提示",
		icon: FaFile,
		duration: "1営業日",
		role: "us",
		details: [
			"制作手法・技術の選定",
			"詳細お見積もり作成",
			"制作スケジュール提案",
			"サンプル案の提示（必要時）",
		],
	},
	{
		id: 3,
		title: "ご契約・制作開始",
		description: "正式ご依頼後、制作作業を開始します",
		icon: FaCalendar,
		duration: "即日",
		role: "both",
		details: [
			"契約書の取り交わし",
			"制作仕様の最終確認",
			"スケジュール・進行方法の決定",
			"着手金のお支払い（必要時）",
		],
	},
	{
		id: 4,
		title: "AI生成・制作実行",
		description: "最新AI技術を使用して画像を制作",
		icon: FaRobot,
		duration: "1-3日",
		role: "us",
		details: [
			"AIツールでの初期生成",
			"複数バリエーション作成",
			"品質チェック・選定",
			"進捗報告（必要時）",
		],
	},
	{
		id: 5,
		title: "プロ後処理・調整",
		description: "Photoshop等でプロ品質に仕上げ",
		icon: FaPencil,
		duration: "1-2日",
		role: "us",
		details: [
			"画質向上・自然な仕上げ",
			"色調・明度の精密調整",
			"合成・レタッチ作業",
			"最終品質チェック",
		],
	},
	{
		id: 6,
		title: "納品・お支払い",
		description: "完成画像を納品し、お支払いを完了",
		icon: FaPaperPlane,
		duration: "即日",
		role: "both",
		details: [
			"完成画像の納品",
			"修正対応（必要時）",
			"残金のお支払い",
			"著作権譲渡書の発行",
		],
	},
];

export function AIWorkflow() {
	const [activeStep, setActiveStep] = useState<number | null>(null);

	return (
		<section className="py-16 sm:py-24">
			<Container as="section">
				<div className="text-center">
					<h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
						制作フロー
					</h2>
					<p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
						透明性の高い6ステップで安心して制作をお任せください
					</p>
				</div>

				{/* タイムライン */}
				<div className="mt-12">
					<div className="relative">
						{/* 縦線（モバイル） / 横線（デスクトップ） */}
						<div className="absolute left-8 top-0 h-full w-0.5 bg-gray-300 dark:bg-gray-700 lg:left-0 lg:right-0 lg:top-1/2 lg:h-0.5 lg:w-full" />

						{/* ステップ */}
						<div className="relative space-y-8 lg:grid lg:grid-cols-6 lg:gap-8 lg:space-y-0">
							{steps.map((step, index) => (
								<div
									key={step.id}
									className="relative flex lg:flex-col"
									onMouseEnter={() => setActiveStep(step.id)}
									onMouseLeave={() => setActiveStep(null)}
								>
									{/* アイコン */}
									<div
										className={cn(
											"relative z-10 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full border-4 bg-white transition-all dark:bg-gray-900",
											step.role === "client"
												? "border-blue-500"
												: step.role === "us"
													? "border-purple-500"
													: "border-green-500",
											activeStep === step.id && "scale-110 shadow-lg",
										)}
									>
										<step.icon
											className={cn(
												"h-7 w-7",
												step.role === "client"
													? "text-blue-500"
													: step.role === "us"
														? "text-purple-500"
														: "text-green-500",
											)}
										/>
									</div>

									{/* コンテンツ */}
									<div className="ml-6 flex-1 lg:ml-0 lg:mt-4 lg:text-center">
										<h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
											{step.title}
										</h3>
										<p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
											{step.description}
										</p>
										<span
											className={cn(
												"inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
												step.role === "client"
													? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
													: step.role === "us"
														? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
														: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
											)}
										>
											{step.role === "client"
												? "お客様"
												: step.role === "us"
													? "当方"
													: "両者"}
											・{step.duration}
										</span>

										{/* 詳細（ホバー時） */}
										{activeStep === step.id && (
											<div className="absolute left-0 right-0 z-20 mt-2 rounded-lg bg-white p-4 shadow-xl dark:bg-gray-800 lg:left-1/2 lg:-translate-x-1/2">
												<ul className="space-y-1 text-left text-sm">
													{step.details.map((detail, detailIndex) => (
														<li
															key={detailIndex}
															className="flex items-start"
														>
															<span className="mr-2 text-gray-400">•</span>
															<span className="text-gray-600 dark:text-gray-400">
																{detail}
															</span>
														</li>
													))}
												</ul>
											</div>
										)}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* 凡例 */}
				<div className="mt-12 flex flex-wrap justify-center gap-6 text-sm">
					<div className="flex items-center">
						<div className="mr-2 h-4 w-4 rounded-full bg-blue-500" />
						<span className="text-gray-600 dark:text-gray-400">
							お客様のアクション
						</span>
					</div>
					<div className="flex items-center">
						<div className="mr-2 h-4 w-4 rounded-full bg-purple-500" />
						<span className="text-gray-600 dark:text-gray-400">
							当方の作業
						</span>
					</div>
					<div className="flex items-center">
						<div className="mr-2 h-4 w-4 rounded-full bg-green-500" />
						<span className="text-gray-600 dark:text-gray-400">
							両者で協力
						</span>
					</div>
				</div>

				{/* 制作期間の目安 */}
				<div className="mt-12 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 p-6 dark:from-purple-900/20 dark:to-blue-900/20">
					<div className="text-center">
						<h4 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
							制作期間の目安
						</h4>
						<div className="grid gap-4 md:grid-cols-3">
							<div>
								<div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
									1-3日
								</div>
								<div className="text-sm text-gray-600 dark:text-gray-400">
									ベーシック制作
								</div>
							</div>
							<div>
								<div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
									3-5日
								</div>
								<div className="text-sm text-gray-600 dark:text-gray-400">
									スタンダード制作
								</div>
							</div>
							<div>
								<div className="text-2xl font-bold text-green-600 dark:text-green-400">
									要相談
								</div>
								<div className="text-sm text-gray-600 dark:text-gray-400">
									プレミアム制作
								</div>
							</div>
						</div>
					</div>
				</div>
			</Container>
		</section>
	);
}