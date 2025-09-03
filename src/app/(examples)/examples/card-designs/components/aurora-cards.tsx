import { FaClock, FaDollarSign, FaLayerGroup } from "react-icons/fa6";
import { cn } from "@/lib/utils";

const reasons = [
	{
		id: "cost-performance",
		number: "01",
		title: "圧倒的なコスパ",
		subtitle: "AI 活用で制作費 50〜70% カット",
		description:
			"最新技術で効率化。でも品質は落としません。\n大手制作会社の半額以下で、同等以上のクオリティを。",
		icon: FaDollarSign,
	},
	{
		id: "speed-delivery",
		number: "02",
		title: "スピード納品",
		subtitle: "通常の 1/3 の期間で完成",
		description: "AI が下準備、人が仕上げ。\nこの分業で、納期を大幅短縮。",
		icon: FaClock,
	},
	{
		id: "comprehensive-skills",
		number: "03",
		title: "総合力",
		subtitle: "企画から運用まで、ワンストップ",
		description:
			"15年のウェブ制作経験で、デザイン・コーディング・運用まで全部お任せ。\nAI も使いこなすから、最新機能もバッチリ。",
		icon: FaLayerGroup,
	},
];

export function AuroraCards() {
	return (
		<div className="relative overflow-hidden bg-gray-900 dark:bg-black p-8 rounded-xl">
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

			<div className="relative z-10">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{reasons.map((reason, index) => {
						const IconComponent = reason.icon;
						const animationDelay = index * 0.5;

						return (
							<div key={reason.id} className="group relative">
								{/* カード */}
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
										<h3 className="text-xl font-bold text-white mb-2">
											{reason.title}
										</h3>

										<p
											className="text-sm font-semibold mb-4"
											style={{
												background:
													"linear-gradient(135deg, #667eea 0%, #f093fb 100%)",
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
			</div>

			<style jsx>{`
				@keyframes aurora-shift {
					0%, 100% {
						transform: translateY(0) rotate(0deg);
						opacity: 0.5;
					}
					25% {
						transform: translateY(-20px) rotate(1deg);
						opacity: 0.8;
					}
					50% {
						transform: translateY(10px) rotate(-1deg);
						opacity: 0.6;
					}
					75% {
						transform: translateY(-10px) rotate(2deg);
						opacity: 0.9;
					}
				}

				@keyframes aurora-line {
					0%, 100% {
						transform: translateX(-100%);
					}
					50% {
						transform: translateX(100%);
					}
				}

				.aurora-1 {
					background: linear-gradient(135deg, 
						rgba(120, 119, 198, 0.3) 0%, 
						rgba(255, 119, 198, 0.2) 50%, 
						rgba(119, 198, 255, 0.3) 100%);
					animation: aurora-1-animation 15s ease-in-out infinite;
				}

				.aurora-2 {
					background: linear-gradient(225deg, 
						rgba(255, 119, 198, 0.3) 0%, 
						rgba(119, 198, 255, 0.2) 50%, 
						rgba(120, 119, 198, 0.3) 100%);
					animation: aurora-2-animation 20s ease-in-out infinite;
				}

				.aurora-3 {
					background: linear-gradient(45deg, 
						rgba(119, 198, 255, 0.3) 0%, 
						rgba(120, 119, 198, 0.2) 50%, 
						rgba(255, 119, 198, 0.3) 100%);
					animation: aurora-3-animation 25s ease-in-out infinite;
				}

				@keyframes aurora-1-animation {
					0%, 100% {
						transform: translateX(0) translateY(0) scale(1);
						opacity: 0.3;
					}
					33% {
						transform: translateX(100px) translateY(-100px) scale(1.2);
						opacity: 0.5;
					}
					66% {
						transform: translateX(-100px) translateY(50px) scale(0.9);
						opacity: 0.2;
					}
				}

				@keyframes aurora-2-animation {
					0%, 100% {
						transform: translateX(0) translateY(0) rotate(0deg);
						opacity: 0.3;
					}
					50% {
						transform: translateX(-150px) translateY(100px) rotate(180deg);
						opacity: 0.4;
					}
				}

				@keyframes aurora-3-animation {
					0%, 100% {
						transform: translateX(0) translateY(0) scale(1) rotate(0deg);
						opacity: 0.3;
					}
					25% {
						transform: translateX(50px) translateY(100px) scale(1.1) rotate(90deg);
						opacity: 0.4;
					}
					50% {
						transform: translateX(-100px) translateY(-50px) scale(1.2) rotate(180deg);
						opacity: 0.2;
					}
					75% {
						transform: translateX(100px) translateY(-100px) scale(0.8) rotate(270deg);
						opacity: 0.5;
					}
				}
			`}</style>
		</div>
	);
}
