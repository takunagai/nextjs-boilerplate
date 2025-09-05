"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
	portfolioFilterCategories,
	type PortfolioFilterCategory,
} from "@/lib/data/portfolio-data";

interface PortfolioFilterProps {
	className?: string;
}

export function PortfolioFilter({ className }: PortfolioFilterProps) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [isPending, startTransition] = useTransition();

	const currentFilter = searchParams.get(
		"category",
	) as PortfolioFilterCategory | null;

	const handleFilterChange = useCallback(
		(filterCategory: PortfolioFilterCategory | "all") => {
			startTransition(() => {
				const params = new URLSearchParams(searchParams);

				if (filterCategory === "all") {
					params.delete("category");
				} else {
					params.set("category", filterCategory);
				}

				// URLを更新（ページリロードなし）
				const newUrl = params.toString()
					? `?${params.toString()}`
					: "/portfolio";
				router.push(newUrl, { scroll: false });
			});
		},
		[router, searchParams],
	);

	const handleKeyDown = useCallback(
		(
			event: React.KeyboardEvent,
			filterCategory: PortfolioFilterCategory | "all",
		) => {
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				handleFilterChange(filterCategory);
			}
		},
		[handleFilterChange],
	);

	return (
		<div className={cn("flex flex-wrap justify-center gap-2", className)}>
			{/* すべて表示バッジ */}
			<Badge
				variant={currentFilter === null ? "default" : "outline"}
				className={cn(
					"px-3 py-1 cursor-pointer transition-all duration-200 select-none",
					"hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
					currentFilter === null
						? "bg-primary text-primary-foreground"
						: "hover:bg-muted",
					isPending && "opacity-50 cursor-wait",
				)}
				tabIndex={0}
				role="button"
				aria-label="すべてのポートフォリオを表示"
				aria-pressed={currentFilter === null}
				onClick={() => handleFilterChange("all")}
				onKeyDown={(e) => handleKeyDown(e, "all")}
			>
				すべて
			</Badge>

			{/* フィルタカテゴリバッジ */}
			{portfolioFilterCategories.map((category) => (
				<Badge
					key={category.id}
					variant={currentFilter === category.id ? "default" : "outline"}
					className={cn(
						"px-3 py-1 cursor-pointer transition-all duration-200 select-none",
						"hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
						currentFilter === category.id
							? "bg-primary text-primary-foreground"
							: "hover:bg-muted",
						isPending && "opacity-50 cursor-wait",
					)}
					tabIndex={0}
					role="button"
					aria-label={`${category.name}のポートフォリオを表示`}
					aria-pressed={currentFilter === category.id}
					onClick={() => handleFilterChange(category.id)}
					onKeyDown={(e) => handleKeyDown(e, category.id)}
				>
					{category.name}
				</Badge>
			))}
		</div>
	);
}
