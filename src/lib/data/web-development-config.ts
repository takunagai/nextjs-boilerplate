import type { ComponentType } from "react";
import {
	getServiceIcon,
	type ServiceIconName,
} from "@/lib/icons/service-icons";

// Web Development サービスの型定義
export interface WebDevServiceItem {
	id: string;
	title: string;
	shortTitle: string;
	href: string;
	iconName: ServiceIconName;
	icon: ComponentType<{ className?: string }>;
	color: string;
	gradientFrom: string;
	description: string;
}

export interface WebDevNavigationConfig {
	title: string;
	titleIcon: ComponentType<{ className?: string }>;
	mainHref: string;
	contactHref: string;
	items: Array<{
		href: string;
		label: string;
		icon?: ComponentType<{ className?: string }>;
	}>;
}

export interface WebDevFooterConfig {
	title: string;
	description: string;
	items: WebDevServiceItem[];
}

// Web Development サービス一覧の定義
export const WEB_DEV_SERVICES: WebDevServiceItem[] = [
	{
		id: "web-development",
		title: "ウェブ制作・アプリ開発",
		shortTitle: "ウェブ制作",
		href: "/services/web-development",
		iconName: "code",
		icon: getServiceIcon("code"),
		color: "text-primary",
		gradientFrom: "from-primary/5",
		description: "フルカスタムの高品質なサイト制作",
	},
	{
		id: "frontend-repair",
		title: "フロントエンドリペア",
		shortTitle: "リペア",
		href: "/services/web-development/frontend-repair",
		iconName: "toolbox",
		icon: getServiceIcon("toolbox"),
		color: "text-blue-600",
		gradientFrom: "from-blue-600/5",
		description: "AI生成コードの品質向上・修正",
	},
	{
		id: "instant-site",
		title: "一夜城",
		shortTitle: "一夜城",
		href: "/services/web-development/instant-site",
		iconName: "bolt",
		icon: getServiceIcon("bolt"),
		color: "text-orange-600",
		gradientFrom: "from-orange-600/5",
		description: "55,000円・当日公開の高速制作",
	},
];

// ナビゲーション設定
export const WEB_DEV_NAVIGATION_CONFIG: WebDevNavigationConfig = {
	title: "ウェブ制作・アプリ開発",
	titleIcon: getServiceIcon("code"),
	mainHref: "/services/web-development",
	contactHref: "/contact?service=web-development",
	items: WEB_DEV_SERVICES.map((service) => ({
		href: service.href,
		label: service.id === "web-development" ? "トップ" : service.shortTitle,
		icon: service.id === "web-development" ? undefined : service.icon,
	})),
};

// フッター設定
export const WEB_DEV_FOOTER_CONFIG: WebDevFooterConfig = {
	title: "ウェブ制作・アプリ開発サービス",
	description:
		"AIと15年の経験を活かして、高品質なウェブサイト・アプリケーションをお手頃価格でご提供します。",
	items: WEB_DEV_SERVICES,
};

// 設定取得ヘルパー関数
export function getWebDevServiceById(
	id: string,
): WebDevServiceItem | undefined {
	return WEB_DEV_SERVICES.find((service) => service.id === id);
}

export function getWebDevServiceByHref(
	href: string,
): WebDevServiceItem | undefined {
	return WEB_DEV_SERVICES.find((service) => service.href === href);
}
