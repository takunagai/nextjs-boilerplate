/**
 * Header の状態管理フック
 * 複雑な状態ロジックを分離してパフォーマンス向上を図る
 */
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useIsClient, useLocalStorage, useMediaQuery } from "usehooks-ts";

import { useScroll } from "@/hooks/useScroll";
import type { HeaderLink } from "@/lib/constants/header-navigation";
import { useAnnouncementBar } from "@/components/layout/announcement-bar-context";
import type { NavItem } from "@/components/layout/header";

// メディアクエリ文字列の生成（メモ化対象）
const getMediaQueryString = (breakpoint: "sm" | "md" | "lg" | "xl"): string => {
	switch (breakpoint) {
		case "sm":
			return "(min-width: 640px)";
		case "lg":
			return "(min-width: 1024px)";
		case "xl":
			return "(min-width: 1280px)";
		default:
			return "(min-width: 768px)"; // md
	}
};

export interface UseHeaderStateOptions {
	items: HeaderLink[];
	mobileMenuBreakpoint: "sm" | "md" | "lg" | "xl";
	hideOnScroll: boolean;
}

export interface UseHeaderStateReturn {
	// 基本状態
	isClient: boolean;
	isDesktop: boolean;
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	pathname: string;
	
	// スクロール関連
	scrollState: {
		visible: boolean;
		isAtTop: boolean;
		direction: "up" | "down" | null;
	};
	
	// アナウンスバー関連
	announcementState: {
		isVisible: boolean;
		height: number;
	};
	
	// ナビゲーション
	navItems: NavItem[];
	
	// 計算されたスタイル状態
	shouldHide: boolean;
	headerTop: number;
}

/**
 * Header の状態管理フック
 */
export function useHeaderState({
	items,
	mobileMenuBreakpoint,
	hideOnScroll,
}: UseHeaderStateOptions): UseHeaderStateReturn {
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);
	
	// クライアントサイドでのレンダリングかを判定
	const isClient = useIsClient();
	
	// メディアクエリに基づいてデスクトップかどうかを判定
	const mediaQueryString = useMemo(
		() => getMediaQueryString(mobileMenuBreakpoint),
		[mobileMenuBreakpoint],
	);
	const isDesktop = useMediaQuery(mediaQueryString);
	
	// アナウンスバー状態
	const announcementState = useAnnouncementBar();
	
	// ローカルストレージに画面サイズ情報を保存（最適化済み）
	const [, setStoredViewportInfo] = useLocalStorage<{
		isDesktop: boolean;
		timestamp: number;
	}>("viewport-info", { isDesktop: false, timestamp: 0 });
	
	// 画面サイズ情報を更新（クライアントサイドのみ、必要時のみ更新）
	useEffect(() => {
		if (isClient && isDesktop !== undefined) {
			setStoredViewportInfo((prev) => {
				// 値が変わった場合のみ更新（無駄な更新を防止）
				if (prev.isDesktop === isDesktop) return prev;
				
				return {
					isDesktop,
					timestamp: Date.now(),
				};
			});
		}
	}, [isClient, isDesktop, setStoredViewportInfo]);
	
	// スクロール状態を取得
	const scrollState = useScroll({
		threshold: 5,
		throttleMs: 50,
	});
	
	// デスクトップサイズになったらドロワーメニューを閉じる
	useEffect(() => {
		if (isDesktop && isOpen) {
			setIsOpen(false);
		}
	}, [isDesktop, isOpen]);
	
	// ナビゲーションアイテムにアクティブステートを追加（メモ化）
	const navItems = useMemo(() => {
		// HeaderLinkからNavItemに変換する関数
		const convertToNavItem = (item: HeaderLink): NavItem => ({
			label: item.label,
			href: item.href,
			external: item.external,
			active: pathname === item.href,
			children: item.submenu?.map(convertToNavItem),
		});
		
		return items.map(convertToNavItem);
	}, [items, pathname]);
	
	// 計算された状態（メモ化）
	const shouldHide = useMemo(
		() => hideOnScroll && !isOpen && !scrollState.visible,
		[hideOnScroll, isOpen, scrollState.visible],
	);
	
	const headerTop = useMemo(
		() => (announcementState.isVisible ? announcementState.height : 0),
		[announcementState.isVisible, announcementState.height],
	);
	
	// setIsOpen のメモ化（正しい型で）
	const setIsOpenMemoized = useCallback<React.Dispatch<React.SetStateAction<boolean>>>((value) => {
		setIsOpen(value);
	}, []);
	
	return {
		// 基本状態
		isClient,
		isDesktop,
		isOpen,
		setIsOpen: setIsOpenMemoized,
		pathname,
		
		// スクロール関連
		scrollState,
		
		// アナウンスバー関連
		announcementState,
		
		// ナビゲーション
		navItems,
		
		// 計算されたスタイル状態
		shouldHide,
		headerTop,
	};
}