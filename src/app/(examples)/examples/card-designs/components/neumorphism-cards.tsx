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
		color: "emerald",
	},
	{
		id: "speed-delivery",
		number: "02",
		title: "スピード納品",
		subtitle: "通常の 1/3 の期間で完成",
		description: "AI が下準備、人が仕上げ。\nこの分業で、納期を大幅短縮。",
		icon: FaClock,
		color: "blue",
	},
	{
		id: "comprehensive-skills",
		number: "03",
		title: "総合力",
		subtitle: "企画から運用まで、ワンストップ",
		description:
			"15年のウェブ制作経験で、デザイン・コーディング・運用まで全部お任せ。\nAI も使いこなすから、最新機能もバッチリ。",
		icon: FaLayerGroup,
		color: "purple",
	},
];

// カラーマッピング
const colorClasses = {
	emerald: {
		text: "text-emerald-600 dark:text-emerald-400",
		bg: "bg-emerald-100/50 dark:bg-emerald-900/20",
	},
	blue: {
		text: "text-blue-600 dark:text-blue-400",
		bg: "bg-blue-100/50 dark:bg-blue-900/20",
	},
	purple: {
		text: "text-purple-600 dark:text-purple-400",
		bg: "bg-purple-100/50 dark:bg-purple-900/20",
	},
	orange: {
		text: "text-orange-600 dark:text-orange-400",
		bg: "bg-orange-100/50 dark:bg-orange-900/20",
	},
	red: {
		text: "text-red-600 dark:text-red-400",
		bg: "bg-red-100/50 dark:bg-red-900/20",
	},
};

export function NeumorphismCards() {
	return (
		<div className="bg-gray-50 dark:bg-gray-900/50 p-8 rounded-xl">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{reasons.map((reason) => {
					const IconComponent = reason.icon;
					const colorClass =
						colorClasses[reason.color as keyof typeof colorClasses];

					return (
						<div key={reason.id} className="group relative">
							{/* ネオモーフィズムカード */}
							<div
								className={cn(
									"h-full p-8 rounded-2xl",
									"bg-gray-50 dark:bg-gray-800",
									"transition-all duration-500",
									// ネオモーフィズムの影（ライトモード）
									"shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff]",
									// ダークモード用の影
									"dark:shadow-[20px_20px_60px_#1a1a1a,-20px_-20px_60px_#2a2a2a]",
									// ホバー時の浮き上がり効果
									"hover:shadow-[25px_25px_75px_#b0b0b0,-25px_-25px_75px_#ffffff]",
									"dark:hover:shadow-[25px_25px_75px_#151515,-25px_-25px_75px_#353535]",
									"hover:translate-y-[-2px]",
									"relative overflow-hidden",
								)}
							>
								{/* 背景の数字（刻印風） */}
								<div
									className={cn(
										"absolute top-4 right-4",
										"text-6xl font-bold",
										"opacity-[0.03]",
										"select-none",
										"dark:opacity-[0.05]",
									)}
									style={{
										textShadow: "inset 2px 2px 5px rgba(0,0,0,0.1)",
									}}
								>
									{reason.number}
								</div>

								{/* アイコン部分（押し込まれた凹み効果） */}
								<div className="mb-6">
									<div
										className={cn(
											"w-20 h-20 rounded-2xl",
											"flex items-center justify-center",
											"bg-gray-50 dark:bg-gray-800",
											// 内側の影で凹み効果
											"shadow-[inset_8px_8px_16px_#bebebe,inset_-8px_-8px_16px_#ffffff]",
											"dark:shadow-[inset_8px_8px_16px_#1a1a1a,inset_-8px_-8px_16px_#2a2a2a]",
											"group-hover:shadow-[inset_10px_10px_20px_#b0b0b0,inset_-10px_-10px_20px_#ffffff]",
											"dark:group-hover:shadow-[inset_10px_10px_20px_#151515,inset_-10px_-10px_20px_#353535]",
											"transition-all duration-500",
										)}
									>
										<div
											className={cn(
												"w-12 h-12 rounded-lg",
												"flex items-center justify-center",
												"transition-all duration-500",
												"group-hover:scale-110",
												colorClass.bg,
											)}
										>
											<IconComponent
												className={cn(
													"w-6 h-6",
													colorClass.text,
													"transition-all duration-500",
												)}
											/>
										</div>
									</div>
								</div>

								{/* テキスト部分 */}
								<div className="relative z-10">
									<h3 className="text-xl font-bold mb-2">{reason.title}</h3>

									<p
										className={cn(
											"text-sm font-semibold mb-4",
											colorClass.text,
										)}
									>
										{reason.subtitle}
									</p>

									<p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
										{reason.description}
									</p>
								</div>

								{/* ホバー時のアクセントライン */}
								<div
									className={cn(
										"absolute bottom-0 left-0 right-0 h-1",
										"opacity-0 group-hover:opacity-100",
										"transition-opacity duration-500",
										colorClass.bg,
									)}
								/>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
