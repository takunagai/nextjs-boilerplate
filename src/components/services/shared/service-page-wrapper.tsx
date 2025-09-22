import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
	BreadcrumbJsonLd,
	generateMetadata,
	generateViewport,
	WebsiteJsonLd,
} from "@/components/seo";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { META } from "@/lib/constants";
import { createBreadcrumbs } from "@/lib/utils";

// サービスページ設定の型定義
interface ServicePageConfig {
	pagePath: string;
	pageTitle: string;
	description: string;
	keywords: string[];
	parentServiceTitle?: string;
	parentServicePath?: string;
	revalidate?: number;
}

interface ServicePageWrapperProps {
	config: ServicePageConfig;
	children: ReactNode;
}

// メタデータ生成ヘルパー
export function generateServiceMetadata(config: ServicePageConfig): Metadata {
	return generateMetadata({
		title: config.pageTitle,
		description: config.description,
		keywords: config.keywords,
		canonical: config.pagePath,
	});
}

// ビューポート生成ヘルパー
export const serviceViewport = generateViewport();

export function ServicePageWrapper({ config, children }: ServicePageWrapperProps) {
	// パンくずリストのデータを定義
	const breadcrumbItems = [
		{ title: "ホーム", path: "/" },
		{ title: "サービス", path: "/services" },
		...(config.parentServiceTitle && config.parentServicePath
			? [{ title: config.parentServiceTitle, path: config.parentServicePath }]
			: []),
		{ title: config.pageTitle, path: config.pagePath, current: true },
	];

	const { ui: uiBreadcrumbs, jsonLd: jsonLdBreadcrumbs } =
		createBreadcrumbs(breadcrumbItems);

	return (
		<>
			<WebsiteJsonLd
				name={`${config.pageTitle} | ${META.DEFAULT_TITLE}`}
				description={config.description}
				url={`${META.SITE_URL}${config.pagePath}`}
			/>
			<BreadcrumbJsonLd items={jsonLdBreadcrumbs} />
			<Container paddingY={"none"}>
				<Breadcrumb items={uiBreadcrumbs} />
			</Container>

			<main className="flex min-h-screen flex-col">
				{children}
			</main>
		</>
	);
}

// プリセット設定用のファクトリー関数
export function createWebDevelopmentServiceConfig(
	serviceId: string,
	pageTitle: string,
	description: string,
	keywords: string[],
	options?: { revalidate?: number }
): ServicePageConfig {
	return {
		pagePath: `/services/web-development/${serviceId}`,
		pageTitle,
		description,
		keywords,
		parentServiceTitle: "ウェブ制作・アプリ開発",
		parentServicePath: "/services/web-development",
		revalidate: options?.revalidate,
	};
}