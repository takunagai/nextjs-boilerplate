import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FaArrowRight } from "react-icons/fa6";
import Link from "next/link";

export function HeroSection() {
	return (
		<section className="relative h-screen w-full flex items-center overflow-hidden">
			{/* モダンな背景グラデーション */}
			<div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-primary/10" />

			{/* アクセント装飾 - 右上の円形グラデーション */}
			<div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-70" />

			{/* アクセント装飾 - 左下の円形グラデーション */}
			<div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl opacity-60" />

			{/* 幾何学模様 - ドット */}
			<div
				className="absolute inset-0 opacity-20"
				style={{
					backgroundImage: "radial-gradient(circle at 1px 1px, var(--color-muted) 1px, transparent 1px)",
					backgroundSize: "40px 40px",
				}}
			/>

			<Container
				size="2xl"
				paddingY="xl"
				paddingX="lg"
				position="relative"
				zIndex="high"
			>
				<div className="flex flex-col items-center text-center max-w-3xl mx-auto">
					<h1 className="text-4xl leading-[1.3] md:text-6xl font-bold tracking-tight mb-6">
						モダンな<span className="text-primary">Web開発</span>の
						<br />
						新しいスタンダード
					</h1>
					<p className="text-xl text-muted-foreground mb-8 max-w-2xl">
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
								<FaArrowRight className="h-4 w-4" />
							</Link>
						</Button>
						<Button asChild variant="outline" size="lg" className="gap-2">
							<Link href="/contact">お問い合わせ</Link>
						</Button>
					</div>
				</div>
			</Container>
		</section>
	);
}
