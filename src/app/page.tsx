import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Next.js Boilerplate - モダンなWebアプリケーション開発の出発点",
	description:
		"Next.js、TypeScript、Tailwind CSSを使用した最新のWebアプリケーション開発のためのボイラープレート",
};

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center">
			{/* ヒーローセクション */}
			<section className="relative py-20 md:py-32 overflow-hidden w-full">
				<div className="absolute inset-0 bg-gradient-to-b from-background to-background/80 z-10" />
				<div className="absolute inset-0 bg-grid-pattern opacity-10" />
				<div className="container relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col items-center text-center max-w-3xl mx-auto">
						<h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
							モダンな<span className="text-primary">Web開発</span>の
							<br />
							新しいスタンダード
						</h1>
						<p className="text-xl text-muted-foreground mb-8 max-w-2xl">
							Next.js、TypeScript、Tailwind
							CSSを組み合わせた最新のボイラープレートで、
							高速で美しいWebアプリケーションを構築しましょう。
						</p>
						<div className="flex flex-col sm:flex-row gap-4">
							<Button asChild size="lg" className="gap-2">
								<Link href="/docs">
									ドキュメントを見る
									<ArrowRight className="h-4 w-4" />
								</Link>
							</Button>
							<Button asChild variant="outline" size="lg" className="gap-2">
								<Link href="/contact">お問い合わせ</Link>
							</Button>
						</div>
					</div>
				</div>
			</section>

			{/* 特徴セクション */}
			<section className="py-16 md:py-24 bg-muted/50 w-full">
				<div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-bold mb-4">主な特徴</h2>
						<p className="text-muted-foreground max-w-2xl mx-auto">
							最新のWeb開発技術を組み合わせた、高速で柔軟なフレームワークを提供します。
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{features.map((feature) => (
							<div
								key={feature.id}
								className="bg-background rounded-lg p-6 shadow-sm border"
							>
								<div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
									{feature.icon({ className: "h-6 w-6 text-primary" })}
								</div>
								<h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
								<p className="text-muted-foreground">{feature.description}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* 使用技術セクション */}
			<section className="py-16 md:py-24 w-full">
				<div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-bold mb-4">使用技術</h2>
						<p className="text-muted-foreground max-w-2xl mx-auto">
							最新のWeb開発ツールとライブラリを組み合わせて、最高のユーザー体験を実現します。
						</p>
					</div>

					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
						{technologies.map((tech) => (
							<div key={tech.id} className="flex flex-col items-center">
								<div className="w-16 h-16 relative mb-4">
									<Image
										src={tech.logo}
										alt={`${tech.name} ロゴ`}
										fill
										className="object-contain"
									/>
								</div>
								<span className="font-medium text-center">{tech.name}</span>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* CTAセクション */}
			<section className="py-16 md:py-24 bg-primary text-primary-foreground w-full">
				<div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col md:flex-row items-center justify-between gap-8">
						<div className="max-w-2xl">
							<h2 className="text-3xl md:text-4xl font-bold mb-4">
								今すぐ始めましょう
							</h2>
							<p className="text-primary-foreground/80 text-lg">
								このボイラープレートを使って、モダンなWebアプリケーションの開発をスタートしましょう。
								詳細なドキュメントとサンプルコードが用意されています。
							</p>
						</div>
						<div className="flex flex-col sm:flex-row gap-4">
							<Button asChild size="lg" variant="secondary" className="gap-2">
								<a
									href="https://github.com/yourusername/nextjs-boilerplate"
									target="_blank"
									rel="noopener noreferrer"
								>
									GitHubで見る
									<ExternalLink className="h-4 w-4" />
								</a>
							</Button>
							<Button
								asChild
								size="lg"
								variant="outline"
								className="bg-transparent text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/10"
							>
								<Link href="/docs/getting-started">使い方を学ぶ</Link>
							</Button>
						</div>
					</div>
				</div>
			</section>

			{/* 機能リストセクション */}
			<section className="py-16 md:py-24 bg-muted/30 w-full">
				<div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-16">
						<div>
							<h2 className="text-3xl md:text-4xl font-bold mb-6">
								すべての機能
							</h2>
							<p className="text-muted-foreground mb-8">
								このボイラープレートには、モダンなWeb開発に必要なすべての機能が含まれています。
								高速なパフォーマンス、優れたDX、そして美しいUIを実現するための機能を提供します。
							</p>
							<Button asChild variant="outline" className="gap-2">
								<Link href="/docs/features">
									すべての機能を見る
									<ArrowRight className="h-4 w-4" />
								</Link>
							</Button>
						</div>
						<div>
							<ul className="space-y-4">
								{featureList.map((feature) => (
									<li key={feature.id} className="flex items-start gap-3">
										<CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
										<div>
											<h3 className="font-semibold">{feature.title}</h3>
											<p className="text-muted-foreground">
												{feature.description}
											</p>
										</div>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}

// ダミーデータ
const features = [
	{
		id: "performance",
		title: "高速パフォーマンス",
		description:
			"Next.jsのApp Routerを使用した高速なページ読み込みと優れたユーザー体験を実現します。",
		icon: ({ className }: { className?: string }) => (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				className={className}
				aria-labelledby="performance-icon-title"
				role="img"
			>
				<title id="performance-icon-title">高速パフォーマンスアイコン</title>
				<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
			</svg>
		),
	},
	{
		id: "type-safety",
		title: "型安全性",
		description:
			"TypeScriptによる型安全なコーディングで、バグを減らし開発効率を向上させます。",
		icon: ({ className }: { className?: string }) => (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				className={className}
				aria-labelledby="type-safety-icon-title"
				role="img"
			>
				<title id="type-safety-icon-title">型安全性アイコン</title>
				<path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
				<path d="m9 12 2 2 4-4" />
			</svg>
		),
	},
	{
		id: "modern-ui",
		title: "モダンUI",
		description:
			"Tailwind CSSとshadcn/uiを使用した美しく、カスタマイズ可能なUIコンポーネント。",
		icon: ({ className }: { className?: string }) => (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				className={className}
				aria-labelledby="modern-ui-icon-title"
				role="img"
			>
				<title id="modern-ui-icon-title">モダンUIアイコン</title>
				<rect width="18" height="18" x="3" y="3" rx="2" />
				<path d="M7 7h10" />
				<path d="M7 12h10" />
				<path d="M7 17h10" />
			</svg>
		),
	},
];

const technologies = [
	{ id: "nextjs", name: "Next.js", logo: "/tech/nextjs.svg" },
	{ id: "react", name: "React", logo: "/tech/react.svg" },
	{ id: "typescript", name: "TypeScript", logo: "/tech/typescript.svg" },
	{ id: "tailwindcss", name: "Tailwind CSS", logo: "/tech/tailwindcss.svg" },
	{ id: "shadcn", name: "shadcn/ui", logo: "/tech/shadcn.svg" },
	{ id: "biome", name: "Biome", logo: "/tech/biome.svg" },
];

const featureList = [
	{
		id: "app-router",
		title: "App Router",
		description:
			"Next.jsの最新のApp Routerを使用した効率的なルーティングシステム",
	},
	{
		id: "server-components",
		title: "サーバーコンポーネント",
		description:
			"パフォーマンスを向上させるReactサーバーコンポーネントのサポート",
	},
	{
		id: "form-validation",
		title: "フォームバリデーション",
		description: "react-hook-formとzodを使用した型安全なフォーム処理",
	},
	{
		id: "accessible-ui",
		title: "アクセシブルなUI",
		description:
			"shadcn/uiとRadixを使用したアクセシビリティに優れたUIコンポーネント",
	},
	{
		id: "testing",
		title: "テスト環境",
		description: "Vitestを使用した高速なテスト実行環境",
	},
	{
		id: "code-quality",
		title: "コード品質",
		description: "Biomeによるリンティングとフォーマット",
	},
];
