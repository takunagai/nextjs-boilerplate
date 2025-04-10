"use client";

import { type VariantProps, cva } from "class-variance-authority";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { useIsClient, useLocalStorage, useMediaQuery } from "usehooks-ts";

import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { Container } from "@/components/ui/container";
import { useScroll } from "@/hooks/useScroll";
import { APP } from "@/lib/constants";
import type { HeaderLink } from "@/lib/constants/header-navigation";
import { cn } from "@/lib/utils";
import { DesktopNavigation } from "./header/desktop-navigation";
import { MobileNavigation } from "./header/mobile-navigation";

// ヘッダーのバリアントを定義
const headerVariants = cva(
	"w-full fixed top-0 left-0 right-0 z-50 transition-all ease-in-out duration-300",
	{
		variants: {
			background: {
				default: "bg-background",
				primary: "bg-primary text-primary-foreground",
				secondary: "bg-secondary",
				transparent: "bg-transparent",
			},
			height: {
				default: "h-16",
				sm: "h-12",
				lg: "h-20",
			},
		},
		defaultVariants: {
			background: "default",
			height: "default",
		},
	},
);

// ナビゲーションリンク型定義
export interface NavItem {
	label: string;
	href: string;
	active?: boolean;
	external?: boolean;
	children?: NavItem[];
}

// ヘッダーのプロパティ型定義
export interface HeaderProps
	extends React.HTMLAttributes<HTMLElement>,
		VariantProps<typeof headerVariants> {
	logo?: React.ReactNode;
	logoText?: string;
	items?: HeaderLink[];
	rightContent?: React.ReactNode;
	mobileMenuBreakpoint?: "sm" | "md" | "lg" | "xl";
	hideOnScroll?: boolean;
}

export function Header({
	className,
	background,
	height,
	logo = (
		// ロゴが不要な場合は代入を削除
		<Image
			src="/images/logo.png"
			alt={APP.NAME}
			width={32}
			height={32}
			className="rounded-full"
			priority
		/>
	),
	logoText = APP.NAME,
	items = [],
	rightContent,
	mobileMenuBreakpoint = "md",
	hideOnScroll = true,
	...props
}: HeaderProps) {
	const pathname = usePathname();
	const [isOpen, setIsOpen] = React.useState(false);

	// クライアントサイドでのレンダリングかを判定
	const isClient = useIsClient();

	// メディアクエリに基づいてデスクトップかどうかを判定
	let mediaQueryString: string;
	switch (mobileMenuBreakpoint) {
		case "sm":
			mediaQueryString = "(min-width: 640px)";
			break;
		case "lg":
			mediaQueryString = "(min-width: 1024px)";
			break;
		case "xl":
			mediaQueryString = "(min-width: 1280px)";
			break;
		default:
			mediaQueryString = "(min-width: 768px)"; // md
	}

	const isDesktop = useMediaQuery(mediaQueryString);

	// ローカルストレージに画面サイズ情報を保存
	const [storedViewportInfo, setStoredViewportInfo] = useLocalStorage<{
		isDesktop: boolean;
		timestamp: number;
	}>("viewport-info", { isDesktop: false, timestamp: 0 });

	// 画面サイズ情報を更新（クライアントサイドのみ）
	React.useEffect(() => {
		if (isClient && isDesktop !== undefined) {
			setStoredViewportInfo({
				isDesktop,
				timestamp: Date.now(),
			});
		}
	}, [isClient, isDesktop, setStoredViewportInfo]);

	// スクロール状態を取得
	const { visible, isAtTop, direction } = useScroll({
		threshold: 5,
		throttleMs: 50,
	});

	// メニューが開いているときはスクロール非表示を無効化
	const shouldHide = hideOnScroll && !isOpen && !visible;

	// 背景透過の判定
	const transparentBackground = isAtTop && background === "transparent";

	// スクロール時の背景効果
	const scrolledClass =
		!isAtTop && !transparentBackground
			? "bg-background/90 backdrop-blur-sm shadow-sm"
			: "";

	// スクロール方向に基づくアニメーションクラス
	const scrollAnimationClass = React.useMemo(() => {
		if (!hideOnScroll) return "translate-y-0";

		if (shouldHide) {
			return "-translate-y-full";
		}

		return "translate-y-0";
	}, [hideOnScroll, shouldHide]);

	// スクロール方向に応じたアニメーション効果
	const scrollDirectionEffect = React.useMemo(() => {
		if (!hideOnScroll) return "";

		// 上方向スクロール時は早めに表示
		if (direction === "up") {
			return "ease-out duration-20";
		}

		// 下方向スクロール時はゆっくり隠す
		if (direction === "down" && !isAtTop) {
			return "ease-in duration-100";
		}

		return "";
	}, [hideOnScroll, direction, isAtTop]);

	// デスクトップサイズになったらドロワーメニューを閉じる
	React.useEffect(() => {
		if (isDesktop && isOpen) {
			setIsOpen(false);
		}
	}, [isDesktop, isOpen]);

	// ナビゲーションアイテムにアクティブステートを追加
	const navItems = React.useMemo(() => {
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

	return (
		<header
			className={cn(
				headerVariants({ background, height }),
				scrolledClass,
				scrollAnimationClass,
				scrollDirectionEffect,
				className,
			)}
			{...props}
		>
			<Container paddingX="md" paddingY="none" as="div" className="h-full">
				<div className="flex items-center justify-between h-full">
					{/* ロゴ部分 */}
					<div className="flex items-center gap-2">
						<Link href="/" className="flex items-center gap-2">
							{logo}
							{logoText && (
								<span className="font-bold text-lg tracking-tighter">
									{logoText}
								</span>
							)}
						</Link>
					</div>

					{/* ナビゲーションと右側コンテンツ */}
					{isClient ? (
						<div className="flex items-center justify-end gap-4">
							{isDesktop && <DesktopNavigation items={navItems} />}
							<div className="flex items-center gap-2">
								{rightContent}
								<ThemeSwitcher />
								{!isDesktop && (
									<MobileNavigation
										items={navItems}
										isOpen={isOpen}
										setIsOpen={setIsOpen}
									/>
								)}
							</div>
						</div>
					) : (
						// SSR時のスケルトンUI - レイアウトシフトを防止
						<div className="flex items-center justify-end gap-4">
							{/* デスクトップナビゲーションのスケルトン */}
							<div className="hidden md:flex items-center gap-4">
								{["menu-item-1", "menu-item-2", "menu-item-3"].map((id) => (
									<div
										key={id}
										className="h-4 w-16 bg-muted animate-pulse rounded"
									/>
								))}
							</div>
							{/* 右側コンテンツとテーマスイッチャーのスケルトン */}
							<div className="flex items-center gap-2">
								<div className="h-8 w-8 bg-muted animate-pulse rounded-full" />
								<div className="h-8 w-8 bg-muted animate-pulse rounded-full" />
							</div>
						</div>
					)}
				</div>
			</Container>
		</header>
	);
}
