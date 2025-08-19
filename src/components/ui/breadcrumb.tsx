import { cn } from "@/lib/utils";
import Link from "next/link";

export type BreadcrumbItem = {
	label: string;
	href: string;
	isCurrent?: boolean;
};

export type BreadcrumbProps = {
	items: BreadcrumbItem[];
	className?: string;
};

export function Breadcrumb({ items, className }: BreadcrumbProps) {
	// 項目が1つの場合（ホームのみ）は表示しない
	if (items.length <= 1) {
		return null;
	}

	return (
		<nav aria-label="パンくずリスト" className={cn("py-2", className)}>
			<ol className="flex flex-wrap items-center gap-y-1 text-xs text-balance">
				{items.map((item, i) => {
					const isFirst = i === 0;
					const isLast = i === items.length - 1;
					// 中間項目（最初と最後以外）で、項目数が3つ以上ある場合
					const isMobileHiddenItem = !isFirst && !isLast && items.length > 3;

					return (
						<li
							key={`breadcrumb-${item.href}`}
							className={cn(
								"flex items-center",
								// スマホサイズでの中間項目非表示
								isMobileHiddenItem && "hidden sm:flex",
							)}
						>
							{!item.isCurrent ? (
								// リンク項目
								<>
									<Link
										href={item.href}
										className="mx-0 text-muted-foreground hover:text-foreground transition-colors"
									>
										<span
											className={cn(
												// 長さに応じたテキスト省略
												item.label.length > 15
													? "overflow-hidden text-ellipsis whitespace-nowrap max-w-[8rem] md:max-w-[12rem] lg:max-w-none inline-block"
													: "inline-block",
											)}
										>
											{item.label}
										</span>
									</Link>
									{!isLast && (
										<span
											className="mx-2 text-muted-foreground"
											aria-hidden="true"
										>
											/
										</span>
									)}
								</>
							) : (
								// 現在のページ（最後の項目）
								<span
									className={cn(
										"font-medium",
										// 長さに応じたテキスト省略
										item.label.length > 20
											? "overflow-hidden text-ellipsis whitespace-nowrap max-w-[10rem] sm:max-w-[15rem] md:max-w-none inline-block"
											: "inline-block",
									)}
									aria-current="page"
								>
									{item.label}
								</span>
							)}
						</li>
					);
				})}

				{/* モバイルでのみ表示する省略記号（中間項目が3つ以上ある場合） */}
				{items.length > 3 && (
					<li className="flex sm:hidden items-center" aria-hidden="true">
						<span className="text-muted-foreground mx-2">/</span>
						<span className="text-muted-foreground">...</span>
						<span className="mx-2 text-muted-foreground">/</span>
					</li>
				)}
			</ol>
		</nav>
	);
}
