"use client";

import Link from "next/link";
import type * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
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
	const [openDropdown, setOpenDropdown] = useState<string | null>(null);
	const navRef = useRef<HTMLElement>(null);
	const triggerRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
	const menuRefs = useRef<Map<string, HTMLDivElement>>(new Map());

	const handleDropdownToggle = (itemHref: string) => {
		setOpenDropdown(openDropdown === itemHref ? null : itemHref);
	};

	const closeAndRestoreFocus = useCallback(
		(itemHref?: string) => {
			const href = itemHref ?? openDropdown;
			setOpenDropdown(null);
			if (href) {
				const trigger = triggerRefs.current.get(href);
				trigger?.focus();
			}
		},
		[openDropdown],
	);

	const handleDropdownClose = () => {
		setOpenDropdown(null);
	};

	// ドロップダウンが開いたら最初のメニュー項目にフォーカス
	useEffect(() => {
		if (!openDropdown) return;
		const menu = menuRefs.current.get(openDropdown);
		if (!menu) return;

		// レンダリング後にフォーカスを移動
		requestAnimationFrame(() => {
			const firstItem = menu.querySelector<HTMLElement>('[role="menuitem"]');
			firstItem?.focus();
		});
	}, [openDropdown]);

	// 外部クリックでドロップダウンを閉じる
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Element;
			if (target?.closest("[data-dropdown-trigger]")) {
				return;
			}
			if (navRef.current && !navRef.current.contains(target)) {
				setOpenDropdown(null);
			}
		};

		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	// Escapeキーでドロップダウンを閉じてトリガーにフォーカス復帰
	useEffect(() => {
		const handleEscapeKey = (event: KeyboardEvent) => {
			if (event.key === "Escape" && openDropdown) {
				event.preventDefault();
				closeAndRestoreFocus();
			}
		};

		document.addEventListener("keydown", handleEscapeKey);
		return () => {
			document.removeEventListener("keydown", handleEscapeKey);
		};
	}, [openDropdown, closeAndRestoreFocus]);

	// メニュー内のキーボードナビゲーション
	const handleMenuKeyDown = (event: React.KeyboardEvent, itemHref: string) => {
		const menu = menuRefs.current.get(itemHref);
		if (!menu) return;

		const menuItems = Array.from(
			menu.querySelectorAll<HTMLElement>('[role="menuitem"]'),
		);
		const currentIndex = menuItems.indexOf(
			document.activeElement as HTMLElement,
		);

		switch (event.key) {
			case "ArrowDown": {
				event.preventDefault();
				const nextIndex =
					currentIndex < menuItems.length - 1 ? currentIndex + 1 : 0;
				menuItems[nextIndex]?.focus();
				break;
			}
			case "ArrowUp": {
				event.preventDefault();
				const prevIndex =
					currentIndex > 0 ? currentIndex - 1 : menuItems.length - 1;
				menuItems[prevIndex]?.focus();
				break;
			}
			case "Home": {
				event.preventDefault();
				menuItems[0]?.focus();
				break;
			}
			case "End": {
				event.preventDefault();
				menuItems[menuItems.length - 1]?.focus();
				break;
			}
			case "Tab": {
				// フォーカストラップ: Tab でメニュー外に出ないようにする
				event.preventDefault();
				closeAndRestoreFocus(itemHref);
				break;
			}
		}
	};

	// トリガーボタンのキーボード操作
	const handleTriggerKeyDown = (
		event: React.KeyboardEvent,
		itemHref: string,
	) => {
		switch (event.key) {
			case "Enter":
			case " ": {
				event.preventDefault();
				handleDropdownToggle(itemHref);
				break;
			}
			case "ArrowDown": {
				// 下矢印キーでドロップダウンを開く
				event.preventDefault();
				if (openDropdown !== itemHref) {
					setOpenDropdown(itemHref);
				}
				break;
			}
		}
	};

	return (
		<div className="flex flex-row items-center gap-6">
			<nav ref={navRef} className="flex flex-row items-center gap-4">
				{items.map((item) => {
					// サブメニューがある場合はドロップダウンを表示
					if (item.children?.length) {
						const isOpen = openDropdown === item.href;
						return (
							<div key={item.href} className="relative">
								<button
									ref={(el) => {
										if (el) triggerRefs.current.set(item.href, el);
									}}
									className="flex flex-row items-center gap-1 text-sm font-medium transition-colors hover:text-primary focus:text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 rounded py-2"
									aria-haspopup="true"
									aria-expanded={isOpen}
									aria-label={`${item.label}のサブメニューを${isOpen ? "閉じる" : "開く"}`}
									id={`dropdown-trigger-${item.href}`}
									type="button"
									data-dropdown-trigger
									onClick={() => handleDropdownToggle(item.href)}
									onKeyDown={(e) => handleTriggerKeyDown(e, item.href)}
								>
									<span>{item.label}</span>
									<FaChevronDown
										className={cn(
											"h-3 w-3 opacity-70 transition-transform duration-150",
											isOpen && "rotate-180",
										)}
									/>
								</button>

								{/* サブメニュー */}
								<div
									ref={(el) => {
										if (el) menuRefs.current.set(item.href, el);
									}}
									className={cn(
										"absolute left-0 min-w-[12rem] py-2 bg-background border border-border rounded-md shadow-md mt-1 transition-all duration-150 z-50",
										isOpen ? "opacity-100 visible" : "opacity-0 invisible",
									)}
									role="menu"
									aria-labelledby={`dropdown-trigger-${item.href}`}
									onKeyDown={(e) => handleMenuKeyDown(e, item.href)}
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
											tabIndex={-1}
											onClick={handleDropdownClose}
										>
											<span className="flex items-center gap-2">
												{child.icon && child.icon}
												{child.label}
											</span>
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
							aria-label={
								item.external ? `${item.label} (外部リンク)` : undefined
							}
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
