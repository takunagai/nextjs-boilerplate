import {
	WebsiteJsonLd,
	generateMetadata,
	generateViewport,
} from "@/components/seo";
import { APP } from "@/lib/constants";
import type { Metadata } from "next";

import { FeatureListSection } from "@/components/home/feature-list-section";
import { FeaturesSection } from "@/components/home/features-section";
import { GallerySection } from "@/components/home/gallery-section";
import { HeroSection } from "@/components/home/hero-section";
import { TechnologiesSection } from "@/components/home/technologies-section";
import { CTASection } from "@/components/sections/cta-section";

export const metadata: Metadata = generateMetadata({
	title: "モダンなWebアプリケーション開発の出発点",
	description: APP.DESCRIPTION,
	keywords: [
		"Next.js",
		"React",
		"TypeScript",
		"Tailwind CSS",
		"ボイラープレート",
		"Web開発",
	],
	ogImage: "/images/og-image-home.jpg",
	canonical: "/",
});

export const viewport = generateViewport();

// ホームページコンポーネント
export default function Home() {
	return (
		<>
			<WebsiteJsonLd />
			<main className="flex min-h-screen flex-col items-center">
				<HeroSection />
				<GallerySection />
				<FeaturesSection features={features} />
				<TechnologiesSection technologies={technologies} />
				<CTASection />
				<FeatureListSection featureList={featureList} />
			</main>
		</>
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
			"TypeScriptとZodによる厳格な型チェックで、開発時のエラーを早期に発見し、安全なコードを実現します。",
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
			"Tailwind CSSとshadcn/uiを使用した美しく、アクセシブルなUIコンポーネントを提供します。",
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
				<rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
				<path d="M3 9h18" />
				<path d="M9 21V9" />
			</svg>
		),
	},
];

const technologies = [
	{ id: "nextjs", name: "Next.js", logo: "/dummy-images/tech/nextjs.svg" },
	{ id: "react", name: "React", logo: "/dummy-images/tech/react.svg" },
	{
		id: "typescript",
		name: "TypeScript",
		logo: "/dummy-images/tech/typescript.svg",
	},
	{
		id: "tailwindcss",
		name: "Tailwind CSS",
		logo: "/dummy-images/tech/tailwindcss.svg",
	},
	{ id: "shadcn", name: "shadcn/ui", logo: "/dummy-images/tech/shadcn.svg" },
	{ id: "zod", name: "Zod", logo: "/dummy-images/tech/zod.svg" },
	{
		id: "reacthookform",
		name: "React Hook Form",
		logo: "/dummy-images/tech/reacthookform.svg",
	},
	{ id: "biome", name: "Biome", logo: "/dummy-images/tech/biome.svg" },
	{ id: "vitest", name: "Vitest", logo: "/dummy-images/tech/vitest.svg" },
	{
		id: "playwright",
		name: "Playwright",
		logo: "/dummy-images/tech/playwright.svg",
	},
	{
		id: "postgres",
		name: "PostgreSQL",
		logo: "/dummy-images/tech/postgres.svg",
	},
	{
		id: "drizzle",
		name: "Drizzle ORM",
		logo: "/dummy-images/tech/drizzle.svg",
	},
];

const featureList = [
	{
		id: "app-router",
		title: "Next.js App Router",
		description: "最新のNext.js App Routerを使用した効率的なルーティング",
	},
	{
		id: "server-components",
		title: "Reactサーバーコンポーネント",
		description: "パフォーマンスとSEOを向上させるサーバーコンポーネント",
	},
	{
		id: "form-validation",
		title: "フォームバリデーション",
		description: "React Hook FormとZodによる型安全なフォーム処理",
	},
	{
		id: "ui-components",
		title: "UIコンポーネント",
		description: "shadcn/uiベースのアクセシブルなコンポーネント",
	},
	{
		id: "dark-mode",
		title: "ダークモード",
		description: "Tailwind CSS v4のネイティブダークモード機能",
	},
	{
		id: "seo",
		title: "SEO最適化",
		description: "メタデータ、構造化データ、サイトマップの最適化",
	},
];
