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
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
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
	{
		id: "flexible-support",
		number: "4",
		title: "柔軟な対応",
		subtitle: "あなたの「こうしたい」に寄り添います",
		description:
			"大手にはできない、柔軟なサポート。載ってない相談もしてください。\n予算も納期も、できる限り調整します。",
		icon: FaHandshake,
		gradient: "from-orange-500 to-amber-600",
		lightGradient: "from-orange-500/20 via-amber-500/10 to-transparent",
	},
	{
		id: "guarantee",
		number: "5",
		title: "安心保証",
		subtitle: "満足いただけなければ全額返金",
		description: "自信があるから、できる保証。\nまずは気軽にご相談ください。",
		icon: FaShield,
		gradient: "from-red-500 to-rose-600",
		lightGradient: "from-red-500/20 via-rose-500/10 to-transparent",
	},
];

export function ReasonsSection() {
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
		<section className="w-full py-16 md:py-24 relative overflow-hidden bg-gray-900 dark:bg-black">
			{/* オーロラ背景 */}
			<div className="absolute inset-0">
				{/* アニメーションするグラデーションレイヤー */}
				<div className="absolute inset-0 opacity-50">
					<div className="aurora-1 absolute inset-0" />
					<div className="aurora-2 absolute inset-0" />
					<div className="aurora-3 absolute inset-0" />
				</div>
				
				{/* ノイズテクスチャ風オーバーレイ */}
				<div 
					className="absolute inset-0 opacity-30"
					style={{
						backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E")`,
					}}
				/>
			</div>

			<Container
				width="2xl"
				paddingY="lg"
				paddingX="lg"
				className="relative z-10"
			>
				<div className="text-center mb-12">
					<Heading as="h2" align="center" className="mb-4 text-white dark:text-white">
						選ばれる5つの理由
					</Heading>
					<p className="text-gray-300 dark:text-gray-400 max-w-2xl mx-auto">
						なぜ多くのお客様に選ばれているのか、その理由をご紹介します
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{reasons.map((reason, index) => {
						const IconComponent = reason.icon;
						const animationDelay = index * 0.5;
						
						return (
							<div
								key={reason.id}
								ref={(el) => {
									cardsRef.current[index] = el;
								}}
								className="group relative"
							>
								{/* オーロラカード */}
								<div
									className={cn(
										"h-full relative overflow-hidden",
										"rounded-2xl",
										"bg-gray-800/30 dark:bg-gray-900/30",
										"backdrop-blur-sm",
										"border border-white/10",
										"transition-all duration-700",
										"hover:scale-[1.02]",
										"hover:bg-gray-800/50 dark:hover:bg-gray-900/50",
									)}
								>
									{/* カード内部のオーロラエフェクト */}
									<div 
										className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
										style={{
											background: `
												radial-gradient(
													circle at 30% 20%,
													rgba(120, 119, 198, 0.3),
													transparent 50%
												),
												radial-gradient(
													circle at 70% 80%,
													rgba(255, 119, 198, 0.3),
													transparent 50%
												),
												radial-gradient(
													circle at 50% 50%,
													rgba(119, 198, 255, 0.3),
													transparent 70%
												)
											`,
											animation: `aurora-shift ${10 + animationDelay}s ease-in-out infinite`,
										}}
									/>

									{/* 数字（ソフトグロー付き） */}
									<div 
										className="absolute top-4 right-4 text-6xl font-bold text-white/5"
										style={{
											textShadow: `
												0 0 20px rgba(255, 255, 255, 0.1),
												0 0 40px rgba(120, 119, 198, 0.2),
												0 0 60px rgba(255, 119, 198, 0.1)
											`,
										}}
									>
										{reason.number}
									</div>

									<div className="relative p-8">
										{/* アイコン（グロウエフェクト） */}
										<div className="mb-6">
											<div 
												className={cn(
													"w-16 h-16 rounded-full",
													"bg-gradient-to-br from-purple-500/20 to-pink-500/20",
													"backdrop-blur-sm",
													"border border-white/20",
													"flex items-center justify-center",
													"group-hover:scale-110",
													"transition-all duration-500",
													"relative",
												)}
											>
												<IconComponent 
													className="w-8 h-8 text-white"
													style={{
														filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))",
													}}
												/>
												
												{/* アイコンの後ろのグロウ */}
												<div 
													className="absolute inset-0 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-500"
													style={{
														background: "radial-gradient(circle, rgba(120, 119, 198, 0.4), transparent 70%)",
														filter: "blur(20px)",
													}}
												/>
											</div>
										</div>

										{/* テキスト */}
										<h3 className="text-xl font-bold text-white mb-2">
											{reason.title}
										</h3>
										
										<p 
											className="text-sm font-semibold mb-4"
											style={{
												background: "linear-gradient(135deg, #667eea 0%, #f093fb 100%)",
												WebkitBackgroundClip: "text",
												WebkitTextFillColor: "transparent",
												backgroundClip: "text",
											}}
										>
											{reason.subtitle}
										</p>

										<p className="text-gray-300 dark:text-gray-400 text-sm leading-relaxed whitespace-pre-line">
											{reason.description}
										</p>
									</div>

									{/* 底部のオーロララインエフェクト */}
									<div 
										className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
										style={{
											background: `linear-gradient(
												90deg,
												transparent,
												rgba(120, 119, 198, 0.8) 20%,
												rgba(255, 119, 198, 0.8) 50%,
												rgba(119, 198, 255, 0.8) 80%,
												transparent
											)`,
											animation: `aurora-line ${3 + animationDelay}s ease-in-out infinite`,
										}}
									/>
								</div>
							</div>
						);
					})}
				</div>
			</Container>
		</section>
	);
}
