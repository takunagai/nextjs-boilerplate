"use client";

import { useMemo } from "react";
import { ContentItems } from "@/components/services/content-items";
import {
	getPortfolioItemsByFilterCategory,
	type PortfolioFilterCategory,
	type PortfolioItem,
} from "@/lib/data/portfolio-data";

interface PortfolioContentProps {
	items: PortfolioItem[];
	filterCategory?: PortfolioFilterCategory | null;
}

export function PortfolioContent({ items, filterCategory }: PortfolioContentProps) {
	const filteredItems = useMemo(() => {
		if (!filterCategory) {
			return items;
		}
		return getPortfolioItemsByFilterCategory(filterCategory);
	}, [items, filterCategory]);

	const contentItems = useMemo(
		() =>
			filteredItems.map((item) => ({
				title: item.title,
				description: item.clientName || "",
				image: item.image,
				imageAlt: item.imageAlt || `${item.title}のイメージ`,
				tags: item.servicesTags,
				link: item.websiteUrl ? {
					href: item.websiteUrl,
					text: "詳細を見る →",
				} : item.link,
			})),
		[filteredItems],
	);

	return (
		<div className="mt-10">
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-2xl font-bold">主な制作実績</h2>
				<span className="text-sm text-muted-foreground">
					{filteredItems.length} 件の実績
				</span>
			</div>
			
			{filteredItems.length === 0 ? (
				<div className="text-center py-12 text-muted-foreground">
					<p className="text-lg mb-2">該当する実績がありません</p>
					<p className="text-sm">他のカテゴリを選択してください</p>
				</div>
			) : (
				<ContentItems
					items={contentItems}
					columns={3}
					className="gap-6"
					aspectRatio="2/3"
				/>
			)}
		</div>
	);
}