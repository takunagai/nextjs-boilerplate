import type { ComponentType } from "react";
import {
	FaCode,
	FaToolbox,
	FaBolt,
	FaRocket,
	FaWordpress,
	FaLifeRing,
} from "react-icons/fa6";

// サービス用アイコンの型定義
export type ServiceIconName =
	| "code"
	| "toolbox"
	| "bolt"
	| "rocket"
	| "wordpress"
	| "lifeRing";

export interface ServiceIcon {
	name: ServiceIconName;
	component: ComponentType<{ className?: string }>;
	description: string;
}

// サービスアイコンレジストリ
export const SERVICE_ICONS: Record<ServiceIconName, ServiceIcon> = {
	code: {
		name: "code",
		component: FaCode,
		description: "Web development and programming",
	},
	toolbox: {
		name: "toolbox",
		component: FaToolbox,
		description: "Repair and maintenance tools",
	},
	bolt: {
		name: "bolt",
		component: FaBolt,
		description: "Fast and instant services",
	},
	rocket: {
		name: "rocket",
		component: FaRocket,
		description: "Modern Jamstack development",
	},
	wordpress: {
		name: "wordpress",
		component: FaWordpress,
		description: "WordPress content management",
	},
	lifeRing: {
		name: "lifeRing",
		component: FaLifeRing,
		description: "Support and troubleshooting",
	},
};

// アイコン取得ヘルパー関数
export function getServiceIcon(
	name: ServiceIconName,
): ComponentType<{ className?: string }> {
	const icon = SERVICE_ICONS[name];
	if (!icon) {
		throw new Error(`Service icon "${name}" not found in registry`);
	}
	return icon.component;
}

// 利用可能なアイコン名一覧を取得
export function getAvailableServiceIcons(): ServiceIconName[] {
	return Object.keys(SERVICE_ICONS) as ServiceIconName[];
}

// アイコンの説明を取得
export function getServiceIconDescription(name: ServiceIconName): string {
	const icon = SERVICE_ICONS[name];
	return icon?.description || "Unknown icon";
}

// 開発時用: 使用されていないアイコンを検出
export function getUnusedServiceIcons(
	usedIcons: ServiceIconName[],
): ServiceIconName[] {
	const allIcons = getAvailableServiceIcons();
	return allIcons.filter((icon) => !usedIcons.includes(icon));
}
