"use client";

import { useEffect, useRef } from "react";
import {
	FaClock,
	FaDollarSign,
	FaHandshake,
	FaLayerGroup,
	FaShield,
} from "react-icons/fa6";
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
		primaryColor: "rgb(34, 197, 94)",
		secondaryColor: "rgb(16, 185, 129)",
		darkPrimaryColor: "rgb(22, 163, 74)",
		darkSecondaryColor: "rgb(5, 150, 105)",
	},
	{
		id: "speed-delivery",
		number: "2",
		title: "スピード納品",
		subtitle: "通常の 1/3 の期間で完成",
		description: "AI が下準備、人が仕上げ。\nこの分業で、納期を大幅短縮。",
		icon: FaClock,
		primaryColor: "rgb(59, 130, 246)",
		secondaryColor: "rgb(6, 182, 212)",
		darkPrimaryColor: "rgb(37, 99, 235)",
		darkSecondaryColor: "rgb(14, 165, 233)",
	},
	{
		id: "comprehensive-skills",
		number: "3",
		title: "総合力",
		subtitle: "企画から運用まで、ワンストップ",
		description:
			"15年のウェブ制作経験で、デザイン・コーディング・運用まで全部お任せ。\nAI も使いこなすから、最新機能もバッチリ。",
		icon: FaLayerGroup,
		primaryColor: "rgb(168, 85, 247)",
		secondaryColor: "rgb(236, 72, 153)",
		darkPrimaryColor: "rgb(147, 51, 234)",
		darkSecondaryColor: "rgb(219, 39, 119)",
	},
];

export function SplitCards() {
	const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			cardsRef.current.forEach((card, index) => {
				if (!card) return;

				const rect = card.getBoundingClientRect();
				const x = e.clientX - rect.left;
				const y = e.clientY - rect.top;

				// カーソル位置に応じて分割線を動かす
				const moveX = (x / rect.width - 0.5) * 10;
				const moveY = (y / rect.height - 0.5) * 10;

				card.style.setProperty("--split-x", `${moveX}px`);
				card.style.setProperty("--split-y", `${moveY}px`);
			});
		};

		if (typeof window !== "undefined") {
			window.addEventListener("mousemove", handleMouseMove);
			return () => window.removeEventListener("mousemove", handleMouseMove);
		}
	}, []);

	return (
		<div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 p-8 rounded-xl">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{reasons.map((reason, index) => {
					const IconComponent = reason.icon;
					const isReversed = index % 2 === 1;

					return (
						<div
							key={reason.id}
							ref={(el) => {
								cardsRef.current[index] = el;
							}}
							className="group relative"
						>
							{/* スプリットカード */}
							<div
								className={cn(
									"h-full relative overflow-hidden",
									"rounded-2xl shadow-2xl",
									"transition-all duration-500",
									"hover:scale-[1.03] hover:shadow-3xl",
									"cursor-pointer",
								)}
								style={{
									minHeight: "320px",
								}}
							>
								{/* 上部セクション（鮮やかな色） */}
								<div
									className="absolute inset-0"
									style={{
										background: `linear-gradient(135deg, ${reason.primaryColor} 0%, ${reason.secondaryColor} 100%)`,
										clipPath: isReversed
											? `polygon(0 0, 100% 0, 100% 45%, 0 65%)`
											: `polygon(0 0, 100% 0, 100% 65%, 0 45%)`,
										transform: `translate(var(--split-x, 0), var(--split-y, 0))`,
										transition: "transform 0.3s ease-out",
									}}
								/>

								{/* ダークモード用の上部セクション */}
								<div
									className="absolute inset-0 opacity-0 dark:opacity-100"
									style={{
										background: `linear-gradient(135deg, ${reason.darkPrimaryColor} 0%, ${reason.darkSecondaryColor} 100%)`,
										clipPath: isReversed
											? `polygon(0 0, 100% 0, 100% 45%, 0 65%)`
											: `polygon(0 0, 100% 0, 100% 65%, 0 45%)`,
										transform: `translate(var(--split-x, 0), var(--split-y, 0))`,
										transition: "transform 0.3s ease-out",
									}}
								/>

								{/* 下部セクション（暗い色） */}
								<div
									className="absolute inset-0 bg-gray-900 dark:bg-gray-950"
									style={{
										clipPath: isReversed
											? `polygon(0 65%, 100% 45%, 100% 100%, 0 100%)`
											: `polygon(0 45%, 100% 65%, 100% 100%, 0 100%)`,
									}}
								/>

								{/* 数字（透かし風） */}
								<div
									className={cn(
										"absolute text-[150px] font-bold",
										"text-white/10 dark:text-white/5",
										"select-none pointer-events-none",
										isReversed ? "top-0 left-4" : "top-0 right-4",
									)}
									style={{
										lineHeight: 1,
									}}
								>
									{reason.number}
								</div>

								{/* アイコン（境界線上） */}
								<div
									className={cn(
										"absolute",
										"w-16 h-16 rounded-full",
										"bg-white dark:bg-gray-800",
										"shadow-xl",
										"flex items-center justify-center",
										"z-20",
										"transition-all duration-500",
										"group-hover:scale-110 group-hover:rotate-12",
									)}
									style={{
										top: "48%",
										left: "50%",
										transform: "translate(-50%, -50%)",
									}}
								>
									<IconComponent
										className="w-8 h-8"
										style={{
											color: reason.primaryColor,
										}}
									/>
								</div>

								{/* コンテンツ */}
								<div className="relative h-full p-8 pt-12 flex flex-col justify-between">
									{/* タイトル部分（上部） */}
									<div className="text-white">
										<h3 className="text-2xl font-bold mb-2">{reason.title}</h3>
										<p className="text-sm font-semibold opacity-90">
											{reason.subtitle}
										</p>
									</div>

									{/* 説明部分（下部） */}
									<div className="text-gray-300 dark:text-gray-400 mt-20">
										<p className="text-sm leading-relaxed whitespace-pre-line">
											{reason.description}
										</p>
									</div>
								</div>

								{/* ホバー時のグロウエフェクト */}
								<div
									className={cn(
										"absolute inset-0",
										"opacity-0 group-hover:opacity-30",
										"transition-opacity duration-500",
										"pointer-events-none",
									)}
									style={{
										background: `radial-gradient(circle at 50% 50%, ${reason.primaryColor}, transparent 70%)`,
									}}
								/>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
