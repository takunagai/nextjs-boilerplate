import { BreadcrumbOverlay, type BreadcrumbOverlayItem } from "./breadcrumb-overlay";
import { PageHeader } from "./page-header";
import { cn } from "@/lib/utils";

export type HeroWithBreadcrumbProps = {
	/** パンくずリスト項目 */
	breadcrumbItems: BreadcrumbOverlayItem[];
	/** 見出しテキスト */
	title: React.ReactNode;
	/** サブ説明文（省略可） */
	description?: React.ReactNode;
	/** 追加CSSクラス */
	className?: string;
};

export function HeroWithBreadcrumb({
	breadcrumbItems,
	title,
	description,
	className,
}: HeroWithBreadcrumbProps) {
	return (
		<div className={cn("relative text-center", className)}>
			<BreadcrumbOverlay items={breadcrumbItems} />
			<PageHeader title={title} description={description} />
		</div>
	);
}