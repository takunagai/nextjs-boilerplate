"use client";

import { FaBars } from "react-icons/fa6";
import Link from "next/link";
import type * as React from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import type { NavItem } from "../header";

export interface MobileNavigationProps {
	items: NavItem[];
	rightContent?: React.ReactNode;
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	isDesktop?: boolean;
	breakpointClass?: string;
}

export function MobileNavigation({
	items,
	rightContent,
	isOpen,
	setIsOpen,
	isDesktop = false,
	breakpointClass = "md:flex",
}: MobileNavigationProps) {
	// ドロワーメニューを表示するかどうかの判定
	const showDrawer = !isDesktop;

	return (
		<div>
			<Sheet
				open={isOpen}
				onOpenChange={(open) => {
					// デスクトップサイズではドロワーメニューを開かない
					if (showDrawer) {
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
						<FaBars className="h-5 w-5" />
						<span className="sr-only">メニューを開く</span>
					</Button>
				</SheetTrigger>
				<SheetContent side="right" className="pt-6">
					<nav className="flex flex-col gap-4">
						{items.map((item) => (
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
	);
}
