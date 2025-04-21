"use client";

import Link from "next/link";
import type * as React from "react";
import { FaBars } from "react-icons/fa6";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import type { NavItem } from "../header";

export interface MobileNavigationProps {
	items: NavItem[];
	rightContent?: React.ReactNode;
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function MobileNavigation({
	items,
	rightContent,
	isOpen,
	setIsOpen,
}: MobileNavigationProps) {
	// 共通のリンクスタイル
	const linkStyles = {
		base: "transition-colors hover:text-primary focus:text-primary rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
		main: "text-base font-medium py-3.5",
		sub: "text-sm py-2.5 px-3",
	};

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="-mr-2 focus-visible:ring-2 focus-visible:ring-primary"
					aria-label="メニューを開く"
				>
					<FaBars className="size-5" />
				</Button>
			</SheetTrigger>
			<SheetContent side="right" className="px-6 py-8 flex flex-col gap-6">
				<SheetTitle className="sr-only">サイトナビゲーション</SheetTitle>
				<nav className="flex flex-col gap-1.5 w-full">
					{items.map((item) =>
						item.children?.length ? (
							<Accordion
								key={item.href}
								type="single"
								collapsible
								className="border-0 w-full"
							>
								<AccordionItem value={item.href} className="border-0">
									<AccordionTrigger className="py-3.5 px-0 text-base font-medium hover:no-underline data-[state=open]:text-primary">
										{item.label}
									</AccordionTrigger>
									<AccordionContent className="pt-2 pl-2">
										<div className="flex flex-col gap-2 pl-3 border-l border-muted data-[state=open]:animate-in data-[state=closed]:animate-out">
											{item.children.map((child) => (
												<Link
													key={child.href}
													href={child.href}
													target={child.external ? "_blank" : undefined}
													rel={
														child.external ? "noopener noreferrer" : undefined
													}
													onClick={() => setIsOpen(false)}
													className={cn(
														linkStyles.base,
														linkStyles.sub,
														child.active
															? "text-foreground"
															: "text-muted-foreground",
													)}
												>
													{child.label}
												</Link>
											))}
										</div>
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						) : (
							<Link
								key={item.href}
								href={item.href}
								target={item.external ? "_blank" : undefined}
								rel={item.external ? "noopener noreferrer" : undefined}
								onClick={() => setIsOpen(false)}
								className={cn(
									linkStyles.base,
									linkStyles.main,
									item.active ? "text-foreground" : "text-muted-foreground",
								)}
							>
								{item.label}
							</Link>
						),
					)}
				</nav>
				{rightContent && (
					<div className="mt-auto border-t pt-6">{rightContent}</div>
				)}
			</SheetContent>
		</Sheet>
	);
}
