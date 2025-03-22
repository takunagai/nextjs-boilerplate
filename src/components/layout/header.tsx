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

					{/* モバイルメニュートグル */}
					<div className={`${breakpointClass.replace("flex", "hidden")}`}>
						<Sheet open={isOpen} onOpenChange={setIsOpen}>
							<SheetTrigger asChild>
								<Button variant="ghost" size="icon" className="-mr-2">
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
