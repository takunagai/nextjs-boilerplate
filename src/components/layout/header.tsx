"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

// ヘッダーのバリアントを定義
const headerVariants = cva("w-full border-b sticky top-0 z-50", {
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
});

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
	sticky?: boolean;
}

export function Header({
	className,
	variant,
	size,
	logo,
	logoText = "Next.js",
	items = [],
	rightContent,
	mobileMenuBreakpoint = "md",
	sticky = true,
	...props
}: HeaderProps) {
	const pathname = usePathname();
	const [isOpen, setIsOpen] = React.useState(false);
	const [isDesktop, setIsDesktop] = React.useState(false);

	// 画面サイズの変更を監視し、デスクトップサイズかどうかを判定
	React.useEffect(() => {
		const checkIsDesktop = () => {
			// ブレークポイントに基づいてデスクトップかどうかを判定
			let breakpointWidth = 768; // デフォルトはmd (768px)
			switch (mobileMenuBreakpoint) {
				case "sm": breakpointWidth = 640; break;
				case "lg": breakpointWidth = 1024; break;
				case "xl": breakpointWidth = 1280; break;
				default: breakpointWidth = 768; // md
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
		window.addEventListener('resize', checkIsDesktop);
		
		// クリーンアップ
		return () => {
			window.removeEventListener('resize', checkIsDesktop);
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
				sticky ? "sticky" : "",
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
					<div className={`hidden ${breakpointClass} items-center gap-6`}>
						<nav className="flex items-center gap-4">
							{navItems.map((item) => (
								<Link
									key={item.href}
									href={item.href}
									target={item.external ? "_blank" : undefined}
									rel={item.external ? "noopener noreferrer" : undefined}
									className={cn(
										"text-sm font-medium transition-colors hover:text-primary",
										item.active
											? "text-foreground"
											: "text-muted-foreground",
									)}
								>
									{item.label}
								</Link>
							))}
						</nav>
						{rightContent && <div>{rightContent}</div>}
					</div>

					{/* モバイルメニュートグル - デスクトップでは完全に非表示 */}
					<div className={`${breakpointClass.replace("flex", "hidden")} ${isDesktop ? "hidden" : "block"}`}>
						<Sheet 
							open={isOpen} 
							onOpenChange={(open) => {
								// デスクトップサイズではドロワーメニューを開かない
								if (!isDesktop) {
									setIsOpen(open);
								}
							}}
						>
							<SheetTrigger asChild>
								<Button 
									variant="ghost" 
									size="icon" 
									className="-mr-2"
									onClick={(e) => {
										// デスクトップサイズではクリックイベントを無効化
										if (isDesktop) {
											e.preventDefault();
										}
									}}
								>
									<Menu className="h-5 w-5" />
									<span className="sr-only">メニューを開く</span>
								</Button>
							</SheetTrigger>
							<SheetContent side="right" className="pt-6">
								<nav className="flex flex-col gap-4">
									{navItems.map((item) => (
										<Link
											key={item.href}
											href={item.href}
											target={item.external ? "_blank" : undefined}
											rel={item.external ? "noopener noreferrer" : undefined}
											onClick={() => setIsOpen(false)}
											className={cn(
												"text-base font-medium transition-colors hover:text-primary py-2",
												item.active
													? "text-foreground"
													: "text-muted-foreground",
											)}
										>
											{item.label}
										</Link>
									))}
								</nav>
								{rightContent && (
									<div className="mt-6 border-t pt-6">{rightContent}</div>
								)}
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</div>
		</header>
	);
}
