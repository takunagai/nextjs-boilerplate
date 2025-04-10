"use client";

import Link from "next/link";
import type * as React from "react";
import { FaChevronDown } from "react-icons/fa6";

import { cn } from "@/lib/utils";
import type { NavItem } from "../header";

export interface DesktopNavigationProps {
	items: NavItem[];
	rightContent?: React.ReactNode;
	breakpointClass?: string;
}

export function DesktopNavigation({
	items,
	rightContent,
	breakpointClass = "md:flex",
}: DesktopNavigationProps) {
	return (
		<div className="flex flex-row items-center gap-6">
			<nav className="flex flex-row items-center gap-4">
				{items.map((item) => {
					// サブメニューがある場合はドロップダウンを表示
					if (item.children?.length) {
						return (
							<div
								key={item.href}
								className="relative group"
							>
								{/* メインリンク */}
								<button 
									className="flex flex-row items-center gap-1 text-sm font-medium transition-colors hover:text-primary focus:text-primary py-2"
									aria-haspopup="true"
									aria-expanded="false"
									type="button"
								>
									<span>{item.label}</span>
									<FaChevronDown className="h-3 w-3 opacity-70" />
								</button>

								{/* サブメニュー（CSSのみでホバー制御） */}
								<div 
									className="absolute left-0 min-w-[12rem] py-2 bg-background border-border rounded-md shadow-md mt-1 
                                           opacity-0 invisible 
                                           group-hover:opacity-100 group-focus-within:opacity-100 
                                           group-hover:visible group-focus-within:visible 
                                           transition-all duration-150 z-50"
									role="menu"
								>
									{item.children.map((child) => (
										<Link
											key={child.href}
											href={child.href}
											target={child.external ? "_blank" : undefined}
											rel={child.external ? "noopener noreferrer" : undefined}
											className={cn(
												"block px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground outline-none",
												child.active
													? "text-foreground"
													: "text-muted-foreground",
											)}
											role="menuitem"
										>
											{child.label}
										</Link>
									))}
								</div>
							</div>
						);
					}

					// 通常のリンク
					return (
						<Link
							key={item.href}
							href={item.href}
							target={item.external ? "_blank" : undefined}
							rel={item.external ? "noopener noreferrer" : undefined}
							className={cn(
								"text-sm font-medium transition-colors hover:text-primary focus:text-primary py-2 outline-none",
								item.active ? "text-foreground" : "text-muted-foreground",
							)}
						>
							{item.label}
						</Link>
					);
				})}
			</nav>
			{rightContent && <div className="flex-shrink-0">{rightContent}</div>}
		</div>
	);
}
