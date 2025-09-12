"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { AnimatedImage } from "@/components/ui/animated-image";
import { Button } from "@/components/ui/button";
import type { ServiceItem } from "@/lib/data/services-data";
import { usePerformanceCheck } from "@/hooks/use-webgl-support";

// 動的インポート - エフェクトコンポーネント
const FlowingComments = dynamic(
	() =>
		import("@/components/effects/flowing-comments").then((mod) => ({
			default: mod.FlowingComments,
		})),
	{
		ssr: false,
		loading: () => (
			<div className="absolute inset-0 animate-pulse bg-gradient-to-r from-blue-50/20 to-purple-50/20" />
		),
	},
);

const LightweightBackground = dynamic(
	() =>
		import("@/components/background/lightweight-background").then((mod) => ({
			default: mod.LightweightBackground,
		})),
	{
		ssr: false,
		loading: () => (
			<div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50" />
		),
	},
);

interface ServiceItemProps {
	item: ServiceItem;
	index: number;
	comments: readonly string[];
}

export function ServiceItemComponent({ item, index, comments }: ServiceItemProps) {
	const { shouldLoad3D, isMediumOrBetter, isLoading } = usePerformanceCheck();

	return (
		<div className="relative overflow-hidden">
			{/* 各サービスエリアの背景エフェクト */}
			{!isLoading && shouldLoad3D && (
				<FlowingComments
					maxComments={isMediumOrBetter ? 15 : 10}
					comments={[...comments]}
				/>
			)}

			{/* ライトウェイト背景（3Dエフェクトが無効な場合） */}
			{!shouldLoad3D && !isLoading && (
				<LightweightBackground variant="gradient" opacity={0.3} />
			)}

			{/* カスタムサービスレイアウト */}
			<div
				className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center py-12 ${
					index % 2 === 1 ? "md:[direction:rtl]" : ""
				}`}
			>
				{/* テキストコンテンツ - モバイルでは下に表示 */}
				<div className="flex flex-col gap-6 max-w-xl [direction:ltr] relative z-20 order-2 md:order-none">
					<div className="flex items-center gap-3">
						{item.icon && (
							<div className="flex-shrink-0">{item.icon}</div>
						)}
						<h3 className="text-2xl md:text-3xl font-bold">
							{item.title}
						</h3>
					</div>

					{/* 説明文 */}
					<p className="text-foreground/80 leading-relaxed whitespace-pre-line">
						{item.description}
					</p>

					{/* 特徴リスト */}
					{item.features && Array.isArray(item.features) && (
						<ul className="space-y-3">
							{item.features.map((feature: string) => (
								<li
									key={feature}
									className="text-sm text-muted-foreground flex items-start gap-2"
								>
									<span className="text-primary">•</span>
									{feature}
								</li>
							))}
						</ul>
					)}

					{/* ボタン */}
					{item.buttonText && item.buttonUrl && (
						<div>
							<Button asChild variant="outline" size="lg">
								<Link href={item.buttonUrl}>
									{item.buttonText}
									<FaArrowRight className="w-4 h-4 ml-2" />
								</Link>
							</Button>
						</div>
					)}
				</div>

				{/* 画像 - モバイルでは上に表示 */}
				{item.imageUrl && (
					<div className="relative w-full h-full [direction:ltr] order-1 md:order-none">
						<div
							className="aspect-[4/3] relative overflow-hidden"
							style={{
								clipPath: `url(#blob-${item.blobShape})`,
							}}
						>
							<AnimatedImage
								src={item.imageUrl}
								alt={`${item.title}のイメージ画像`}
								width={800}
								height={600}
								className="w-full h-full object-cover"
								sizes="(max-width: 768px) 100vw, 50vw"
								animation={{
									duration: 0.8,
									delay: index * 0.2,
									yOffset: 30,
									ease: "easeOut",
								}}
								intersection={{
									threshold: 0.15,
									rootMargin: "0px 0px -80px 0px",
									triggerOnce: true,
								}}
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}