"use client";

import { FaBars } from "react-icons/fa6";
import Link from "next/link";
import type * as React from "react";

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
	SheetTrigger 
} from "@/components/ui/sheet";
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
						className="-mr-2 focus-visible:ring-2 focus-visible:ring-primary"
						onClick={(e) => {
							// デスクトップサイズではクリックイベントを無効化
							if (isDesktop) {
								e.preventDefault();
							}
						}}
						aria-label="メニューを開く"
					>
						<FaBars className="size-5" />
					</Button>
				</SheetTrigger>
				<SheetContent 
					side="right" 
					className="px-6 py-8 flex flex-col gap-6"
				>
					<SheetTitle className="sr-only">サイトナビゲーション</SheetTitle>
					<nav className="flex flex-col gap-1.5 w-full">
						{items.map((item) => {
							// サブメニューがある場合はアコーディオンを使用
							if (item.children?.length) {
								return (
									<Accordion
										key={item.href}
										type="single"
										collapsible
										className="border-0 w-full"
									>
										<AccordionItem 
											value={item.href} 
											className="border-0"
										>
											<AccordionTrigger 
												className="py-3.5 px-0 text-base font-medium hover:no-underline data-[state=open]:text-primary"
											>
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
																child.external
																	? "noopener noreferrer"
																	: undefined
															}
															onClick={() => setIsOpen(false)}
															className={cn(
																"text-sm transition-colors hover:text-primary focus:text-primary py-2.5 px-3 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
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
								);
							}

							// 通常のリンク
							return (
								<Link
									key={item.href}
									href={item.href}
									target={item.external ? "_blank" : undefined}
									rel={item.external ? "noopener noreferrer" : undefined}
									onClick={() => setIsOpen(false)}
									className={cn(
										"text-base font-medium transition-colors hover:text-primary focus:text-primary py-3.5 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
										item.active
											? "text-foreground"
											: "text-muted-foreground",
									)}
								>
									{item.label}
								</Link>
							);
						})}
					</nav>
					{rightContent && (
						<div className="mt-auto border-t pt-6">
							{rightContent}
						</div>
					)}
				</SheetContent>
			</Sheet>
		</div>
	);
}
