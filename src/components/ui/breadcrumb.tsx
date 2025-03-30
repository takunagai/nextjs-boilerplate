import { BreadcrumbJsonLd } from "@/components/seo";
import { META } from "@/lib/constants";
import Link from "next/link";
import { FaChevronRight, FaHouse } from "react-icons/fa6";

export type BreadcrumbItem = {
	label: string;
	href: string;
	isCurrent?: boolean;
};

interface BreadcrumbProps {
	items: BreadcrumbItem[];
	showJsonLd?: boolean;
}

/**
 * パンくずリストコンポーネント
 * SEO対策としても重要な要素
 */
export function Breadcrumb({ items, showJsonLd = true }: BreadcrumbProps) {
	// 最初のアイテムがホームページでない場合は、ホームページを追加
	const breadcrumbItems: BreadcrumbItem[] =
		items[0]?.href === "/" ? items : [{ label: "ホーム", href: "/" }, ...items];

	// JSON-LD用のアイテム配列を作成
	const jsonLdItems = breadcrumbItems.map((item) => ({
		name: item.label,
		item: item.href.startsWith("http")
			? item.href
			: `${META.SITE_URL}${item.href}`,
	}));

	return (
		<>
			{showJsonLd && <BreadcrumbJsonLd items={jsonLdItems} />}
			<nav aria-label="パンくずリスト" className="py-3">
				<ol className="flex flex-wrap items-center gap-1 text-sm">
					{breadcrumbItems.map((item, index) => {
						const isLast = index === breadcrumbItems.length - 1;

						return (
							<li key={item.href} className="flex items-center">
								{index > 0 && (
									<FaChevronRight
										className="h-4 w-4 mx-1 text-muted-foreground"
										aria-hidden="true"
									/>
								)}

								{isLast ? (
									<span
										className="font-medium text-foreground"
										aria-current="page"
									>
										{item.label}
									</span>
								) : (
									<Link
										href={item.href}
										className="text-muted-foreground hover:text-foreground transition-colors flex items-center"
									>
										{index === 0 && (
											<FaHouse
												className="h-3.5 w-3.5 mr-1"
												aria-hidden="true"
											/>
										)}
										{item.label}
									</Link>
								)}
							</li>
						);
					})}
				</ol>
			</nav>
		</>
	);
}
