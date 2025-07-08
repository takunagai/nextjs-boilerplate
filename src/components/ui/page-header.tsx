import { Heading, type HeadingRootProps } from "@/components/ui/heading";
import { Breadcrumb, type BreadcrumbItem } from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

/**
 * ページ用ヘッダーコンポーネント
 *
 * デフォルト: h1, 3xl, center, mb-8
 * title/description以外はHeadingの全propsに透過対応
 */
type PageHeaderProps = {
	/** 見出しテキスト */
	title: React.ReactNode;
	/** サブ説明文（省略可） */
	description?: React.ReactNode;
	/** オーバーレイ表示するパンくずリスト項目（省略可） */
	overlayBreadcrumbs?: BreadcrumbItem[];
} & Omit<HeadingRootProps, "children">;

export function PageHeader({
	title,
	description,
	overlayBreadcrumbs,
	as = "h1",
	size = "3xl",
	align = "center",
	className = "mb-8",
	...rest
}: PageHeaderProps) {
	return (
		<div className={cn("relative", overlayBreadcrumbs && "pb-4")}>
			{overlayBreadcrumbs && (
				<div className="absolute top-0 right-0 z-10">
					<Breadcrumb
						items={overlayBreadcrumbs}
						className="py-2"
						variant="overlay"
					/>
				</div>
			)}
			<Heading as={as} size={size} align={align} className={className} {...rest}>
				{title}
				{description && (
					<Heading.Lead className="text-muted-foreground">
						{description}
					</Heading.Lead>
				)}
			</Heading>
		</div>
	);
}
