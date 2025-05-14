"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import Image from "next/image";
import Link from "next/link";
import { FaCaretDown } from "react-icons/fa6";
import { useIsClient } from "usehooks-ts";

export function HeroSection() {
	const isClient = useIsClient();

	// スムーズスクロール処理関数
	const handleScroll = () => {
		// ビューポートの高さを取得
		const viewportHeight = window.innerHeight;
		// 現在のスクロール位置からビューポート1つ分下にスクロール
		window.scrollTo({
			top: viewportHeight,
			behavior: "smooth",
		});
	};

	return (
		<section className="relative h-screen w-full flex items-center overflow-hidden">
			{/* 背景画像 */}
			<div className="absolute inset-0 -z-30">
				<Image
					src="/images/hero.jpg"
					alt="ヒーロー背景画像"
					fill
					priority
					className="object-cover"
					sizes="100vw"
				/>
				{/* オーバーレイ */}
				<div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
			</div>

			{/* モダンな背景グラデーション */}
			<div className="absolute inset-0 bg-gradient-to-br from-background/40 via-background/20 to-transparent -z-20" />

			{/* アクセント装飾 - 右上の円形グラデーション */}
			<div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-70 -z-10" />

			{/* アクセント装飾 - 左下の円形グラデーション */}
			<div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl opacity-60 -z-10" />

			{/* 幾何学模様 - ドット */}
			<div
				className="absolute inset-0 opacity-20 -z-10"
				style={{
					backgroundImage:
						"radial-gradient(circle at 1px 1px, white 1px, transparent 1px)",
					backgroundSize: "24px 24px",
				}}
			/>

			<Container width="2xl" paddingY="xl" paddingX="lg" className="z-0">
				<div className="flex flex-col items-center text-center max-w-3xl mx-auto">
					<h1 className="text-4xl leading-[1.3] md:text-6xl font-bold tracking-tight mb-6 text-white">
						モダンな<span className="text-primary">Web開発</span>の
						<br />
						新しいスタンダード
					</h1>
					<p className="text-xl text-white/90 mb-8 max-w-2xl">
						Next.js、TypeScript、Tailwind CSS
						を使用した最新のWebアプリケーション開発のためのボイラープレート
					</p>
					<div className="flex flex-col sm:flex-row gap-4">
						<Button asChild size="lg" className="gap-2">
							<Link
								href="https://github.com/takunagai/nextjs-boilerplate"
								target="_blank"
								rel="noopener noreferrer"
							>
								ドキュメントを見る
								<FaCaretDown className="h-4 w-4" />
							</Link>
						</Button>
						<Button
							asChild
							variant="outline"
							size="lg"
							className="gap-2 bg-white/10 text-white border-white/20 hover:bg-white/20"
						>
							<Link href="/contact">お問い合わせ</Link>
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
