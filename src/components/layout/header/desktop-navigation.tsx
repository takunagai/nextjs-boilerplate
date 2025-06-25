"use client";

import Link from "next/link";
import type * as React from "react";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

import { keyboardHandlers } from "@/lib/accessibility/accessibility-utils";
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
	const [openDropdown, setOpenDropdown] = useState<string | null>(null);

	const handleDropdownToggle = (itemHref: string) => {
		setOpenDropdown(openDropdown === itemHref ? null : itemHref);
	};

	const handleDropdownClose = () => {
		setOpenDropdown(null);
	};

	return (
		<div className="flex flex-row items-center gap-6">
			<nav className="flex flex-row items-center gap-4">
				{items.map((item) => {
					// サブメニューがある場合はドロップダウンを表示
					if (item.children?.length) {
						const isOpen = openDropdown === item.href;
						return (
							<div key={item.href} className="relative group">
								{/* メインリンク */}
								<button
									className="flex flex-row items-center gap-1 text-sm font-medium transition-colors hover:text-primary focus:text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 rounded py-2"
									aria-haspopup="true"
									aria-expanded={isOpen}
									aria-label={`${item.label}のサブメニューを${isOpen ? '閉じる' : '開く'}`}
									type="button"
									onClick={() => handleDropdownToggle(item.href)}
									onKeyDown={keyboardHandlers.buttonKeys(() => handleDropdownToggle(item.href))}
								>
									<span>{item.label}</span>
									<FaChevronDown 
										className={cn(
											"h-3 w-3 opacity-70 transition-transform duration-150",
											isOpen && "rotate-180"
										)} 
									/>
								</button>

								{/* サブメニュー */}
								<div
									className={cn(
										"absolute left-0 min-w-[12rem] py-2 bg-background border border-border rounded-md shadow-md mt-1 transition-all duration-150 z-50",
										isOpen || "group-hover:opacity-100 group-focus-within:opacity-100 group-hover:visible group-focus-within:visible",
										isOpen 
											? "opacity-100 visible" 
											: "opacity-0 invisible"
									)}
									role="menu"
									aria-labelledby={`dropdown-${item.href}`}
								>
									{item.children.map((child) => (
										<Link
											key={child.href}
											href={child.href}
											target={child.external ? "_blank" : undefined}
											rel={child.external ? "noopener noreferrer" : undefined}
											className={cn(
												"block px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-inset",
												child.active
													? "text-foreground"
													: "text-muted-foreground",
											)}
											role="menuitem"
											onClick={handleDropdownClose}
											onKeyDown={keyboardHandlers.escapeKey(handleDropdownClose)}
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
								"text-sm font-medium transition-colors hover:text-primary focus:text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 rounded py-2",
								item.active ? "text-foreground" : "text-muted-foreground",
							)}
							aria-label={item.external ? `${item.label} (外部リンク)` : undefined}
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
