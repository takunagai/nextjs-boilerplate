import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * 基本的なパンくずリストデータからUI表示用とJSON-LD用のデータを生成する
 * @param items パンくずリスト項目の配列（title, path, current）
 * @returns UI表示用とJSON-LD用のデータを含むオブジェクト
 */
export function createBreadcrumbs(
	items: Array<{
		title: string;
		path: string;
		current?: boolean;
	}>,
) {
	return {
		ui: items.map((item) => ({
			label: item.title,
			href: item.path,
			isCurrent: item.current,
		})),
		jsonLd: items.map((item) => ({
			name: item.title,
			href: item.path,
		})),
	};
}
