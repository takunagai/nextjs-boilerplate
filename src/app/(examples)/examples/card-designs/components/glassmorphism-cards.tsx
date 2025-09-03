"use client";

import { useEffect, useRef } from "react";
import {
	FaClock,
	FaDollarSign,
	FaHandshake,
	FaLayerGroup,
	FaShield,
} from "react-icons/fa6";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const reasons = [
	{
		id: "cost-performance",
		number: "1",
		title: "圧倒的なコスパ",
		subtitle: "AI 活用で制作費 50〜70% カット",
		description:
			"最新技術で効率化。でも品質は落としません。\n大手制作会社の半額以下で、同等以上のクオリティを。",
		icon: FaDollarSign,
		gradient: "from-emerald-500 to-teal-600",
		lightGradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
	},
	{
		id: "speed-delivery",
		number: "2",
		title: "スピード納品",
		subtitle: "通常の 1/3 の期間で完成",
		description: "AI が下準備、人が仕上げ。\nこの分業で、納期を大幅短縮。",
		icon: FaClock,
		gradient: "from-blue-500 to-cyan-600",
		lightGradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
	},
	{
		id: "comprehensive-skills",
		number: "3",
		title: "総合力",
		subtitle: "企画から運用まで、ワンストップ",
		description:
			"15年のウェブ制作経験で、デザイン・コーディング・運用まで全部お任せ。\nAI も使いこなすから、最新機能もバッチリ。",
		icon: FaLayerGroup,
		gradient: "from-purple-500 to-pink-600",
		lightGradient: "from-purple-500/20 via-pink-500/10 to-transparent",
	},
];

export function GlassmorphismCards() {
	const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			cardsRef.current.forEach((card) => {
				if (!card) return;

				const rect = card.getBoundingClientRect();
				const x = e.clientX - rect.left;
				const y = e.clientY - rect.top;

				card.style.setProperty("--mouse-x", `${x}px`);
				card.style.setProperty("--mouse-y", `${y}px`);
			});
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	return (
		<div className="relative">
			{/* 背景のグラデーション */}
			<div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 dark:from-blue-950/20 dark:via-purple-950/10 dark:to-pink-950/20 rounded-xl" />

			{/* アニメーション背景 */}
			<div className="absolute inset-0">
				<div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob dark:bg-purple-600" />
				<div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000 dark:bg-yellow-600" />
				<div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000 dark:bg-pink-600" />
			</div>

			<div className="relative z-10 p-8">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{reasons.map((reason, index) => {
						const IconComponent = reason.icon;
						return (
							<div
								key={reason.id}
								ref={(el) => {
									cardsRef.current[index] = el;
								}}
								className="group relative"
							>
								{/* グラスモーフィズムカード */}
								<Card
									className={cn(
										"h-full relative overflow-hidden",
										"bg-white/60 dark:bg-gray-900/60",
										"backdrop-blur-lg backdrop-saturate-150",
										"border border-white/20 dark:border-white/10",
										"shadow-xl",
										"transition-all duration-500",
										"hover:scale-[1.02] hover:shadow-2xl",
										"before:absolute before:inset-0",
										"before:bg-gradient-to-br before:opacity-0",
										"before:transition-opacity before:duration-500",
										"hover:before:opacity-100",
										`before:${reason.lightGradient}`,
									)}
								>
									{/* 光のエフェクト（ホバー時） */}
									<div
										className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
										style={{
											background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.1), transparent 40%)`,
										}}
									/>

									{/* 数字ウォーターマーク */}
									<div
										className={cn(
											"absolute -top-8 -right-8 text-[120px] font-bold",
											"bg-gradient-to-br text-transparent bg-clip-text",
											"opacity-10 group-hover:opacity-20 transition-opacity",
											reason.gradient,
										)}
									>
										{reason.number}
									</div>

									<CardHeader className="text-center pb-4 pt-8 relative z-10">
										{/* アイコン（グロウエフェクト付き） */}
										<div className="relative mx-auto mb-4">
											<div
												className={cn(
													"w-16 h-16 rounded-full flex items-center justify-center",
													"bg-gradient-to-br shadow-lg",
													"group-hover:shadow-xl group-hover:scale-110",
													"transition-all duration-300",
													reason.gradient,
												)}
											>
												<IconComponent className="w-8 h-8 text-white" />
											</div>
											{/* グロウエフェクト */}
											<div
												className={cn(
													"absolute inset-0 rounded-full",
													"bg-gradient-to-br blur-xl opacity-50",
													"group-hover:opacity-75 group-hover:blur-2xl",
													"transition-all duration-300",
													reason.gradient,
												)}
											/>
										</div>

										<CardTitle className="text-xl relative">
											{reason.title}
										</CardTitle>
										<p
											className={cn(
												"text-sm font-bold mt-2",
												"bg-gradient-to-r text-transparent bg-clip-text",
												reason.gradient,
											)}
										>
											{reason.subtitle}
										</p>
									</CardHeader>

									<CardContent className="relative z-10">
										<p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line text-center">
											{reason.description}
										</p>
									</CardContent>

									{/* 下部のグラデーションライン */}
									<div
										className={cn(
											"absolute bottom-0 left-0 right-0 h-1",
											"bg-gradient-to-r opacity-0 group-hover:opacity-100",
											"transition-opacity duration-500",
											reason.gradient,
										)}
									/>
								</Card>
							</div>
						);
					})}
				</div>
			</div>

			<style jsx>{`
				@keyframes blob {
					0% {
						transform: translate(0px, 0px) scale(1);
					}
					33% {
						transform: translate(30px, -50px) scale(1.1);
					}
					66% {
						transform: translate(-20px, 20px) scale(0.9);
					}
					100% {
						transform: translate(0px, 0px) scale(1);
					}
				}
				.animate-blob {
					animation: blob 7s infinite;
				}
				.animation-delay-2000 {
					animation-delay: 2s;
				}
				.animation-delay-4000 {
					animation-delay: 4s;
				}
			`}</style>
		</div>
	);
}
