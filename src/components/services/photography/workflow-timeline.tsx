"use client";

import { Container } from "@/components/ui/container";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
	FaMessage,
	FaFile,
	FaCalendar,
	FaCamera,
	FaPencil,
	FaPaperPlane,
} from "react-icons/fa6";

const steps = [
	{
		id: 1,
		title: "お問い合わせ",
		description: "フォームまたはメールでご相談内容をお送りください",
		icon: FaMessage,
		duration: "即日",
		role: "client",
		details: [
			"撮影内容のご相談",
			"希望日程の確認",
			"予算のご相談",
			"参考イメージの共有",
		],
	},
	{
		id: 2,
		title: "ヒアリング・お見積もり",
		description: "詳細をお伺いし、お見積もりをご提示します",
		icon: FaFile,
		duration: "1-2営業日",
		role: "us",
		details: [
			"撮影内容の詳細確認",
			"撮影場所の決定",
			"必要カット数の確認",
			"お見積もり作成・送付",
		],
	},
	{
		id: 3,
		title: "日程調整・ご契約",
		description: "撮影日程を決定し、正式にご契約いただきます",
		icon: FaCalendar,
		duration: "1-2営業日",
		role: "both",
		details: [
			"撮影日時の決定",
			"契約書の取り交わし",
			"撮影準備のご案内",
			"前金のお支払い（必要な場合）",
		],
	},
	{
		id: 4,
		title: "撮影当日",
		description: "プロ機材を使用して丁寧に撮影を行います",
		icon: FaCamera,
		duration: "契約時間",
		role: "us",
		details: [
			"機材セッティング",
			"テスト撮影",
			"本番撮影",
			"撮影データの確認",
		],
	},
	{
		id: 5,
		title: "画像編集・補正",
		description: "撮影データの選定と基本的な補正を行います",
		icon: FaPencil,
		duration: "2-3営業日",
		role: "us",
		details: [
			"写真セレクト",
			"基本補正（明るさ・色味等）",
			"必要に応じて追加編集",
			"最終チェック",
		],
	},
	{
		id: 6,
		title: "納品・お支払い",
		description: "編集済みデータを納品し、残金をお支払いいただきます",
		icon: FaPaperPlane,
		duration: "即日",
		role: "both",
		details: [
			"オンライン納品",
			"納品データの確認",
			"残金のお支払い",
			"アフターフォロー",
		],
	},
];

export function WorkflowTimeline() {
	const [activeStep, setActiveStep] = useState<number | null>(null);

	return (
		<section className="py-16 sm:py-24">
			<Container as="section">
				<div className="text-center">
					<h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
						ご依頼から納品までの流れ
					</h2>
					<p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
						スムーズな撮影のための6つのステップ
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
			</Container>
		</section>
	);
}