"use client";

import Link from "next/link";
import type * as React from "react";

import { cn } from "@/lib/utils";
import type { NavItem } from "../header";

export interface DesktopNavigationProps {
	items: NavItem[];
	rightContent?: React.ReactNode;
	breakpointClass: string;
}

export function DesktopNavigation({
	items,
	rightContent,
	breakpointClass,
}: DesktopNavigationProps) {
	return (
		<div className={`hidden ${breakpointClass} items-center gap-6`}>
			<nav className="flex items-center gap-4">
				{items.map((item) => (
					<Link
						key={item.href}
						href={item.href}
						target={item.external ? "_blank" : undefined}
						rel={item.external ? "noopener noreferrer" : undefined}
						className={cn(
							"text-sm font-medium transition-colors hover:text-primary",
							item.active ? "text-foreground" : "text-muted-foreground",
						)}
					>
						{item.label}
					</Link>
				))}
			</nav>
			{rightContent && <div>{rightContent}</div>}
		</div>
	);
}
