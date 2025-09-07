"use client";

import { useEffect, useRef } from "react";
import {
	FaComments,
	FaDollarSign,
	FaHandshake,
	FaLayerGroup,
	FaPaintbrush,
} from "react-icons/fa6";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { cn } from "@/lib/utils";

const reasons = [
	{
		id: "pro-ai-strength",
		number: "1",
		title: "プロ × AI の強み",
		description: "ウェブデザイナーの経験でAIに的確な指示を出し、出力結果を丁寧に仕上げ。高品質な成果物を効率的に制作します。",
		icon: FaPaintbrush,
		gradient: "from-emerald-500 to-teal-600",
		lightGradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
	},
	{
		id: "cost-performance",
		number: "2",
		title: "圧倒的なコスパ",
		description: "AI活用で作業効率を大幅向上。短納期・低コストを実現しつつ、品質は一切妥協しない制作体制です。",
		icon: FaDollarSign,
		gradient: "from-blue-500 to-cyan-600",
		lightGradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
	},
	{
		id: "one-stop-service",
		number: "3",
		title: "ワンストップ対応",
		description: "様々なAIサービスを熟知し、デザインから実装、運用まで全て対応。複数業者への依頼が不要です。",
		icon: FaLayerGroup,
		gradient: "from-purple-500 to-pink-600",
		lightGradient: "from-purple-500/20 via-pink-500/10 to-transparent",
	},
	{
		id: "flexible-support",
		number: "4",
		title: "柔軟な対応",
		description: "ご依頼者様の要望を丁寧にヒアリング。最適なメニューと進め方をご提案し、理想を形にします。",
		icon: FaHandshake,
		gradient: "from-orange-500 to-amber-600",
		lightGradient: "from-orange-500/20 via-amber-500/10 to-transparent",
	},
	{
		id: "easy-consultation",
		number: "5",
		title: "気軽に相談可能",
		description: "小さな疑問から本格的なプロジェクトまで、気軽にご相談いただけます。まずはお話から始めましょう。",
		icon: FaComments,
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
					<Heading
						as="h2"
						align="center"
						className="mb-4 text-white dark:text-white"
					>
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
														filter:
															"drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))",
													}}
												/>

												{/* アイコンの後ろのグロウ */}
												<div
													className="absolute inset-0 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-500"
													style={{
														background:
															"radial-gradient(circle, rgba(120, 119, 198, 0.4), transparent 70%)",
														filter: "blur(20px)",
													}}
												/>
											</div>
										</div>

										{/* テキスト */}
										<h3 
											className="text-xl font-bold mb-4"
											style={{
												background:
													"linear-gradient(135deg, #667eea 0%, #f093fb 100%)",
												WebkitBackgroundClip: "text",
												WebkitTextFillColor: "transparent",
												backgroundClip: "text",
											}}
										>
											{reason.title}
										</h3>

										<p className="text-gray-300 dark:text-gray-400 text-sm leading-relaxed">
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
