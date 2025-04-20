import { Heading, type HeadingRootProps } from "@/components/ui/heading";

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
} & Omit<HeadingRootProps, "children">;

export function PageHeader({
  title,
  description,
  as = "h1",
  size = "3xl",
  align = "center",
  className = "mb-8",
  ...rest
}: PageHeaderProps) {
  return (
    <Heading
      as={as}
      size={size}
      align={align}
      className={className}
      {...rest}
    >
      {title}
      {description && (
        <Heading.Lead className="text-muted-foreground">
          {description}
        </Heading.Lead>
      )}
    </Heading>
  );
}
