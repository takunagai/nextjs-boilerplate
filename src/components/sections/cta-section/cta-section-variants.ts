import { cva } from "class-variance-authority";

// CTAセクション全体のバリアント
export const ctaSectionVariants = cva(
  // ベースとなるスタイル
  "w-full",
  {
    variants: {
      layout: {
        horizontal: "flex flex-col md:flex-row items-center justify-between gap-8",
        vertical: "flex flex-col items-center text-center",
        card: "rounded-xl shadow-md flex flex-col",
        banner: "w-full flex flex-col",
      },
      intent: {
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        accent: "bg-accent text-accent-foreground",
        muted: "bg-muted text-muted-foreground",
        minimal: "bg-transparent border border-border",
      },
      size: {
        sm: "py-8 md:py-12",
        md: "py-12 md:py-16",
        lg: "py-16 md:py-24",
      },
      decoration: {
        none: "",
        border: "border border-border",
        shadow: "shadow-lg",
        gradient: "bg-linear-to-r from-primary to-primary-foreground/20",
      },
      spacing: {
        compact: "gap-4",
        regular: "gap-6",
        spacious: "gap-8",
      },
      alignment: {
        start: "items-start text-left",
        center: "items-center text-center",
        end: "items-end text-right",
      },
    },
    defaultVariants: {
      layout: "horizontal",
      intent: "primary",
      size: "md",
      decoration: "none",
      spacing: "regular",
      alignment: "start",
    },
  }
);

// コンテンツのバリアント
export const ctaContentVariants = cva("", {
  variants: {
    layout: {
      horizontal: "max-w-2xl",
      vertical: "w-full max-w-2xl",
      card: "w-full",
      banner: "w-full max-w-3xl",
    },
    size: {
      sm: "space-y-2",
      md: "space-y-4",
      lg: "space-y-6",
    },
  },
  defaultVariants: {
    layout: "horizontal",
    size: "md",
  },
});

// ボタングループのバリアント
export const ctaButtonGroupVariants = cva("flex gap-4", {
  variants: {
    layout: {
      horizontal: "mt-0",
      vertical: "mt-6",
      card: "mt-6",
      banner: "mt-6",
    },
    alignment: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
    },
    orientation: {
      horizontal: "flex-row",
      vertical: "flex-col",
      responsive: "flex-col sm:flex-row",
    },
  },
  defaultVariants: {
    layout: "horizontal",
    alignment: "start",
    orientation: "responsive",
  },
});
