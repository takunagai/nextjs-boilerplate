import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { HeadingLevel } from "./components";
import { FeatureOverlay } from "./feature-overlay";
import { FeatureSimple } from "./feature-simple";
import { FeatureSplit } from "./feature-split";

/**
 * 基本的な特徴アイテムの型定義
 */
export interface FeatureItem {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly imageUrl?: string;
  readonly icon?: ReactNode;
  readonly buttonText?: string;
  readonly buttonUrl?: string;
  readonly customData?: Record<string, unknown>;
}

/**
 * 構造化されたスタイリングオプション
 */
export interface StylingOptions {
  heading?: {
    level?: HeadingLevel;
    className?: string;
  };
  description?: {
    className?: string;
  };
  icon?: {
    className?: string;
  };
  button?: {
    className?: string;
  };
  image?: {
    className?: string;
    containerClassName?: string;
  };
  content?: {
    blockClassName?: string;
  };
}

/**
 * デフォルト値定数（DRY原則）
 */
const FEATURE_ITEMS_DEFAULTS = {
  layout: "vertical",
  background: "none",
  spacing: "medium",
} as const;

/**
 * 特徴アイテムのバリアント定義
 */
export const featureItemsVariants = cva("w-full", {
  variants: {
    layout: {
      vertical: "flex flex-col gap-24 py-8",
      horizontal:
        "flex flex-col md:flex-row gap-8 items-center justify-between py-8",
      grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-8",
    },
    background: {
      none: "",
      light: "bg-secondary/20",
      dark: "bg-primary/5",
      accent: "bg-accent/10",
    },
    spacing: {
      none: "gap-0",
      small: "gap-8",
      medium: "gap-16",
      large: "gap-24",
      xlarge: "gap-32",
    },
  },
  defaultVariants: FEATURE_ITEMS_DEFAULTS,
});

// 子コンポーネント共通props
interface ChildComponentProps {
  item: FeatureItem;
  headingLevel?: HeadingLevel;
  headingClassName?: string;
  descriptionClassName?: string;
  iconClassName?: string;
  buttonClassName?: string;
  imageClassName?: string;
  imageContainerClassName?: string;
  contentBlockClassName?: string;
}

export interface FeatureItemsProps
  extends VariantProps<typeof featureItemsVariants> {
  items: FeatureItem[];
  variant?: "split" | "overlay" | "simple";
  className?: string;
  alternateLayout?: boolean;
  overlayStyle?: "dark" | "light" | "gradient";
  overlayHeight?: "auto" | "full" | "half" | "third";
  renderItem?: (item: FeatureItem, index: number) => ReactNode;

  /** 構造化されたスタイリング設定 */
  styling?: StylingOptions;
}

/**
 * FeatureItems - 特徴アイテム一覧表示コンポーネント
 *
 * @see docs/examples/components/feature-items-examples.tsx - 使用例
 * @see docs/guides/components/feature-items.md - ベストプラクティスガイド
 */
export const FeatureItems = ({
  items,
  // 定数オブジェクトを参照してDRYを実現
  layout = FEATURE_ITEMS_DEFAULTS.layout,
  background = FEATURE_ITEMS_DEFAULTS.background,
  spacing = FEATURE_ITEMS_DEFAULTS.spacing,
  variant = "split",
  className,
  alternateLayout = true,
  overlayStyle = "dark",
  overlayHeight,
  renderItem,
  styling,
}: FeatureItemsProps) => {
  const containerClass = cn(
    featureItemsVariants({ layout, background, spacing }),
    className,
  );

  // スタイリングオプションを統合
  const resolvedStyling: Required<StylingOptions> = {
    heading: {
      level: styling?.heading?.level,
      className: styling?.heading?.className,
    },
    description: {
      className: styling?.description?.className,
    },
    icon: {
      className: styling?.icon?.className,
    },
    button: {
      className: styling?.button?.className,
    },
    image: {
      className: styling?.image?.className,
      containerClassName: styling?.image?.containerClassName,
    },
    content: {
      blockClassName: styling?.content?.blockClassName,
    },
  };

  // 子コンポーネント共通propsを生成
  const createChildProps = (
    item: FeatureItem,
    additionalProps = {},
  ): ChildComponentProps & typeof additionalProps => ({
    item,
    headingLevel: resolvedStyling.heading.level,
    headingClassName: resolvedStyling.heading.className,
    descriptionClassName: resolvedStyling.description.className,
    iconClassName: resolvedStyling.icon.className,
    buttonClassName: resolvedStyling.button.className,
    imageClassName: resolvedStyling.image.className,
    imageContainerClassName: resolvedStyling.image.containerClassName,
    contentBlockClassName: resolvedStyling.content.blockClassName,
    ...additionalProps,
  });

  // バリアント別レンダリング関数
  const renderVariant = (item: FeatureItem, index: number) => {
    const baseProps = { key: item.id };

    switch (variant) {
      case "overlay":
        return (
          <FeatureOverlay
            {...baseProps}
            {...createChildProps(item, { overlayStyle, overlayHeight })}
          />
        );
      case "simple":
        return <FeatureSimple {...baseProps} {...createChildProps(item)} />;
      default: // split
        return (
          <FeatureSplit
            {...baseProps}
            {...createChildProps(item, {
              isReversed: alternateLayout ? index % 2 === 1 : false,
            })}
          />
        );
    }
  };

  return (
    <div className={containerClass}>
      {items.map((item, index) =>
        renderItem ? renderItem(item, index) : renderVariant(item, index),
      )}
    </div>
  );
};

export { FeatureSplit, FeatureOverlay, FeatureSimple };
