"use client";

import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
	FaPhone,
	FaRocket,
	FaDraftingCompass,
	FaPenNib,
	FaCode,
	FaCheckCircle,
	FaCloudUploadAlt,
	FaWrench,
} from "react-icons/fa";

const processSteps = [
	{
		id: 0,
		title: "初回相談の予約",
		duration: "ワンコイン",
		description: "目的/訴求/CV確認、素材最終チェック ※オンライン可",
		icon: FaPhone,
		role: "both",
		details: [
			"ビジネス目標の確認",
			"ターゲット顧客の明確化",
			"必要な素材の整理",
			"スケジュール調整",
		],
	},
	{
		id: 1,
		title: "キックオフ",
		duration: "30分",
		description: "ゴール（CV）・訴求軸・トーン&NG確認",
		icon: FaRocket,
		role: "both",
		details: [
			"コンバージョン目標設定",
			"メッセージング戦略",
			"ブランドトーン確認",
			"禁止事項・注意点の共有",
		],
	},
	{
		id: 2,
		title: "情報設計&ワイヤー",
		duration: "30〜60分",
		description: "セクション配列とコピー構成",
		icon: FaDraftingCompass,
		role: "us",
		details: [
			"ページ構成の設計",
			"セクション優先順位決定",
			"コンテンツ骨組み作成",
			"ユーザー導線の最適化",
		],
	},
	{
		id: 3,
		title: "ライティング&画像",
		duration: "90〜120分",
		description: "AI下地→プロ修正／画像生成・加工",
		icon: FaPenNib,
		role: "us",
		details: [
			"AIによる文章下書き",
			"プロライターによる修正",
			"AI画像生成・選定",
			"高品質フリー素材選択",
		],
	},
	{
		id: 4,
		title: "実装",
		duration: "90〜120分",
		description: "Next.js/Tailwindで実装、フォーム/OGP/スキーマ",
		icon: FaCode,
		role: "us",
		details: [
			"レスポンシブデザイン実装",
			"パフォーマンス最適化",
			"SEO設定（OGP・JSON-LD）",
			"お問い合わせフォーム設置",
		],
	},
	{
		id: 5,
		title: "品質確認",
		duration: "30分",
		description: "動作/表示/レスポンシブ/文言最終化",
		icon: FaCheckCircle,
		role: "us",
		details: [
			"全デバイスでの表示確認",
			"機能動作テスト",
			"文章・デザイン最終調整",
			"速度・SEO最終チェック",
		],
	},
	{
		id: 6,
		title: "公開&引き渡し",
		duration: "30分",
		description: "Cloudflare Pages公開、管理方法レクチャー",
		icon: FaCloudUploadAlt,
		role: "both",
		details: [
			"本番環境への公開",
			"管理画面の使い方説明",
			"更新方法のレクチャー",
			"運用開始のサポート",
		],
	},
	{
		id: 7,
		title: "微修正",
		duration: "7日以内",
		description: "公開後7日以内2回まで、CVR改善の微調整中心",
		icon: FaWrench,
		role: "us",
		details: [
			"文言の微調整",
			"デザインの細かな修正",
			"コンバージョン率改善",
			"ユーザビリティ向上",
		],
	},
];

export function ProcessSection() {
	const [activeStep, setActiveStep] = useState<number | null>(null);

	return (
		<section className="py-16 md:py-24">
			<Container>
				<SectionHeader
					title="制作フロー（半日〜1日）"
					description="集中スプリントで効率的に進行"
				/>

				{/* タイムライン */}
				<div className="mt-12">
					<div className="relative">
						{/* 縦線（モバイル） / 横線（デスクトップ） */}
						<div className="absolute left-8 top-0 h-full w-0.5 bg-primary/20 lg:left-0 lg:right-0 lg:top-1/2 lg:h-0.5 lg:w-full" />

						{/* ステップ */}
						<div className="relative space-y-8 lg:grid lg:grid-cols-4 lg:gap-6 lg:space-y-0">
							{/* 上段 */}
							{processSteps.slice(0, 4).map((step, index) => (
								<div
									key={step.id}
									className="relative flex lg:flex-col"
									onMouseEnter={() => setActiveStep(step.id)}
									onMouseLeave={() => setActiveStep(null)}
								>
									{/* アイコン */}
									<div
										className={cn(
											"relative z-10 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full border-4 bg-background transition-all",
											step.role === "both"
												? "border-primary"
												: "border-primary/60",
											activeStep === step.id && "scale-110 shadow-lg",
										)}
									>
										<step.icon
											className={cn(
												"h-7 w-7",
												step.role === "both"
													? "text-primary"
													: "text-primary/60",
											)}
										/>
									</div>

									{/* コンテンツ */}
									<div className="ml-6 flex-1 lg:ml-0 lg:mt-4 lg:text-center">
										<div className="mb-2 flex items-center lg:justify-center">
											<span className="mr-2 rounded-full bg-primary px-2 py-1 text-xs font-bold text-white lg:mr-0">
												{step.id}
											</span>
										</div>
										<h3 className="mb-1 text-lg font-semibold">{step.title}</h3>
										<p className="mb-2 text-sm text-muted-foreground">
											{step.description}
										</p>
										<span
											className={cn(
												"inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
												step.role === "both"
													? "bg-primary/10 text-primary"
													: "bg-primary/5 text-primary/70",
											)}
										>
											{step.role === "both" ? "打ち合わせ" : "制作作業"}・
											{step.duration}
										</span>

										{/* 詳細（ホバー時） */}
										{activeStep === step.id && (
											<div className="absolute left-0 right-0 z-20 mt-2 rounded-lg bg-background border border-primary/20 p-4 shadow-xl lg:left-1/2 lg:-translate-x-1/2">
												<ul className="space-y-1 text-left text-sm">
													{step.details.map((detail, detailIndex) => (
														<li key={detailIndex} className="flex items-start">
															<span className="mr-2 text-primary">•</span>
															<span className="text-muted-foreground">
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

						{/* 下段 */}
						<div className="relative mt-8 space-y-8 lg:mt-16 lg:grid lg:grid-cols-4 lg:gap-6 lg:space-y-0">
							{processSteps.slice(4, 8).map((step, index) => (
								<div
									key={step.id}
									className="relative flex lg:flex-col"
									onMouseEnter={() => setActiveStep(step.id)}
									onMouseLeave={() => setActiveStep(null)}
								>
									{/* アイコン */}
									<div
										className={cn(
											"relative z-10 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full border-4 bg-background transition-all",
											step.role === "both"
												? "border-primary"
												: "border-primary/60",
											activeStep === step.id && "scale-110 shadow-lg",
										)}
									>
										<step.icon
											className={cn(
												"h-7 w-7",
												step.role === "both"
													? "text-primary"
													: "text-primary/60",
											)}
										/>
									</div>

									{/* コンテンツ */}
									<div className="ml-6 flex-1 lg:ml-0 lg:mt-4 lg:text-center">
										<div className="mb-2 flex items-center lg:justify-center">
											<span className="mr-2 rounded-full bg-primary px-2 py-1 text-xs font-bold text-white lg:mr-0">
												{step.id}
											</span>
										</div>
										<h3 className="mb-1 text-lg font-semibold">{step.title}</h3>
										<p className="mb-2 text-sm text-muted-foreground">
											{step.description}
										</p>
										<span
											className={cn(
												"inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
												step.role === "both"
													? "bg-primary/10 text-primary"
													: "bg-primary/5 text-primary/70",
											)}
										>
											{step.role === "both" ? "打ち合わせ" : "制作作業"}・
											{step.duration}
										</span>

										{/* 詳細（ホバー時） */}
										{activeStep === step.id && (
											<div className="absolute left-0 right-0 z-20 mt-2 rounded-lg bg-background border border-primary/20 p-4 shadow-xl lg:left-1/2 lg:-translate-x-1/2">
												<ul className="space-y-1 text-left text-sm">
													{step.details.map((detail, detailIndex) => (
														<li key={detailIndex} className="flex items-start">
															<span className="mr-2 text-primary">•</span>
															<span className="text-muted-foreground">
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
						<div className="mr-2 h-4 w-4 rounded-full bg-primary" />
						<span className="text-muted-foreground">お客様との打ち合わせ</span>
					</div>
					<div className="flex items-center">
						<div className="mr-2 h-4 w-4 rounded-full bg-primary/60" />
						<span className="text-muted-foreground">当方の制作作業</span>
					</div>
				</div>

				{/* 成功の鍵 */}
				<div className="mt-12 rounded-lg bg-muted/50 p-6">
					<h3 className="mb-3 font-semibold">成功の鍵</h3>
					<ul className="space-y-2 text-sm text-muted-foreground">
						<li className="flex items-start">
							<span className="mr-2 text-primary">✓</span>
							事前準備（素材/ヒアリング）がスムーズであれば、当日完成が可能
						</li>
						<li className="flex items-start">
							<span className="mr-2 text-primary">✓</span>
							遅延要因の多くは素材の未確定。事前にご準備ください
						</li>
						<li className="flex items-start">
							<span className="mr-2 text-primary">✓</span>
							当日の意思決定がスムーズに進むよう、決裁者の同席を推奨
						</li>
					</ul>
				</div>
			</Container>
		</section>
	);
}
