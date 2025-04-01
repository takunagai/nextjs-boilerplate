"use client";

import { type VariantProps, cva } from "class-variance-authority";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { useScroll } from "@/hooks/useScroll";
import { APP } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { DesktopNavigation } from "./header/desktop-navigation";
import { MobileNavigation } from "./header/mobile-navigation";

// ヘッダーのバリアントを定義
const headerVariants = cva(
	"w-full border-b fixed top-0 left-0 right-0 z-50 transition-all ease-in-out duration-300",
	{
		variants: {
			variant: {
				default: "bg-background",
				primary: "bg-primary text-primary-foreground",
				secondary: "bg-secondary",
				transparent: "bg-transparent backdrop-blur-sm",
			},
			size: {
				default: "h-16",
				sm: "h-12",
				lg: "h-20",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
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
	items?: NavItem[];
	rightContent?: React.ReactNode;
	mobileMenuBreakpoint?: "sm" | "md" | "lg" | "xl";
	hideOnScroll?: boolean;
}

export function Header({
	className,
	variant,
	size,
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
	const [isDesktop, setIsDesktop] = React.useState(false);

	// スクロール状態を取得
	const { visible, isAtTop, direction } = useScroll({
		threshold: 5,
		throttleMs: 50,
	});

	// メニューが開いているときはスクロール非表示を無効化
	const shouldHide = hideOnScroll && !isOpen && !visible;

	// 背景透過の判定
	const transparentBackground = isAtTop && variant === "transparent";

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
			return "ease-out duration-200";
		}

		// 下方向スクロール時はゆっくり隠す
		if (direction === "down" && !isAtTop) {
			return "ease-in duration-300";
		}

		return "";
	}, [hideOnScroll, direction, isAtTop]);

	// 画面サイズの変更を監視し、デスクトップサイズかどうかを判定
	React.useEffect(() => {
		const checkIsDesktop = () => {
			// ブレークポイントに基づいてデスクトップかどうかを判定
			let breakpointWidth = 768; // デフォルトはmd (768px)
			switch (mobileMenuBreakpoint) {
				case "sm":
					breakpointWidth = 640;
					break;
				case "lg":
					breakpointWidth = 1024;
					break;
				case "xl":
					breakpointWidth = 1280;
					break;
				default:
					breakpointWidth = 768; // md
			}

			const isDesktopView = window.innerWidth >= breakpointWidth;
			setIsDesktop(isDesktopView);

			// デスクトップサイズになったらドロワーメニューを閉じる
			if (isDesktopView && isOpen) {
				setIsOpen(false);
			}
		};

		// 初期チェック
		checkIsDesktop();

		// リサイズイベントリスナーを追加
		window.addEventListener("resize", checkIsDesktop);

		// クリーンアップ
		return () => {
			window.removeEventListener("resize", checkIsDesktop);
		};
	}, [mobileMenuBreakpoint, isOpen]);

	// ナビゲーションアイテムにアクティブステートを追加
	const navItems = React.useMemo(() => {
		return items.map((item) => ({
			...item,
			active: item.active ?? pathname === item.href,
		}));
	}, [items, pathname]);

	const breakpointClass = React.useMemo(() => {
		switch (mobileMenuBreakpoint) {
			case "sm":
				return "sm:flex";
			case "md":
				return "md:flex";
			case "lg":
				return "lg:flex";
			case "xl":
				return "xl:flex";
			default:
				return "md:flex";
		}
	}, [mobileMenuBreakpoint]);

	return (
		<header
			className={cn(
				headerVariants({ variant, size }),
				scrolledClass,
				scrollAnimationClass,
				scrollDirectionEffect,
				className,
			)}
			{...props}
		>
			<div className="container mx-auto px-4 h-full">
				<div className="flex items-center justify-between h-full">
					{/* ロゴ */}
					<Link href="/" className="flex items-center gap-2">
						{logo}
						{logoText && (
							<span className="font-semibold text-lg">{logoText}</span>
						)}
					</Link>

					{/* デスクトップメニュー */}
					<DesktopNavigation
						items={navItems}
						rightContent={
							<div className="flex items-center gap-2">
								<ThemeSwitcher />
								{rightContent}
							</div>
						}
						breakpointClass={breakpointClass}
					/>

					{/* モバイルメニュートグル */}
					<MobileNavigation
						items={navItems}
						rightContent={
							<div className="flex items-center gap-2 mt-4">
								<ThemeSwitcher />
								{rightContent}
							</div>
						}
						isOpen={isOpen}
						setIsOpen={setIsOpen}
						isDesktop={isDesktop}
						breakpointClass={breakpointClass}
					/>
				</div>
			</div>
		</header>
	);
}
