"use client";

import Image from "next/image";
import Link from "next/link";
import { FaCaretDown } from "react-icons/fa6";
import { useIsClient } from "usehooks-ts";
import { ParticleBackground } from "@/components/background/particle-background";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { useHeroHeight } from "@/hooks/use-hero-height";

export function HeroSection() {
	const isClient = useIsClient();
	const { heroStyle, getScrollHeight } = useHeroHeight();

	// スムーズスクロール処理関数
	const handleScroll = () => {
		window.scrollTo({
			top: getScrollHeight(),
			behavior: "smooth",
		});
	};

	return (
		<section
			className="relative w-full flex items-center overflow-hidden"
			style={heroStyle}
		>
			{/* 深い紺色のグラデーション背景 */}
			<div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1f] to-[#1a1a3e] -z-30" />

			{/* パーティクル背景 */}
			<ParticleBackground className="-z-10" />

			<Container width="2xl" paddingY="xl" paddingX="lg" className="z-0">
				<div className="flex flex-col items-center text-center max-w-3xl mx-auto">
					<h1 className="text-4xl leading-[1.3] md:text-6xl font-bold tracking-tight mb-6 text-white">
						<span className="text-primary">AI</span> で「できたらいいな」を
						<br />
						「できた！」に
					</h1>
					<p className="text-xl text-white/90 mb-8 max-w-2xl">
						最新の AI × 15年の制作経験
						<br />
						あなたの「できない」「面倒」「時間がない」を解決します
					</p>
					<div className="flex flex-col sm:flex-row gap-4">
						<Button asChild size="lg">
							<Link href="/contact">
								まずは無料相談
								<FaCaretDown className="h-4 w-4" />
							</Link>
						</Button>
						<Button
							asChild
							variant="outline"
							size="lg"
							className="bg-white/10 text-white border-white/20 hover:bg-white/20"
						>
							<Link href="/services">サービスを見る</Link>
						</Button>
					</div>
				</div>
			</Container>

			{/* スクロールインジケーター - SSRでのハイドレーションエラー防止のためにisClientを使用 */}
			{isClient && (
				<button
					type="button"
					className="text-sm absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center hover:opacity-80 transition-opacity bg-transparent border-none cursor-pointer animate-pulse z-50"
					onClick={handleScroll}
					aria-label="Scroll to continue"
				>
					<span className="text-sm text-white">Scroll to continue.</span>
					<FaCaretDown className="h-5 w-5 text-white" />
				</button>
			)}
		</section>
	);
}
