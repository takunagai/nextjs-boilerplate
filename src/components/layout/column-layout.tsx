import React from "react";
import type { ReactNode, JSXElementConstructor } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * ColumnLayoutProps
 * - variant: 2カラム(左メイン/右メイン)・3カラム
 * - 子コンポーネントでカラムを指定
 * - サーバーコンポーネント（Next.js 15対応）
 */
export type ColumnLayoutProps = {
  /**
   * レイアウトバリエーション
   * - "2col-left": 左+メイン
   * - "2col-right": メイン+右
   * - "3col": 左+メイン+右
   */
  variant: "2col-left" | "2col-right" | "3col";
  /**
   * gapクラス（例: "gap-6 md:gap-8"）
   * デフォルト: "gap-6"
   */
  gap?: string;
  /** ラッパーの追加クラス */
  containerClassName?: string;
  /** 子要素（ColumnLayout.Left/Main/Rightコンポーネント） */
  children: ReactNode;
};

// 各カラムコンポーネントの共通Props
type ColumnProps = {
  children: ReactNode;
  className?: string;
};

// カスタムコンポーネント型
type ComponentWithDisplayName<P = unknown> = 
  | (JSXElementConstructor<P> & { displayName?: string })
  | (string & { displayName?: string });

// Tailwind CSS v4対応のレイアウト設定
const columnLayoutVariants = cva(
  // モバイルファースト: 最初は縦並びで、mdブレークポイントから横並びに変更
  "flex flex-col md:flex-row w-full",
  {
    variants: {
      variant: {
        "2col-left": "",
        "2col-right": "",
        "3col": "",
      },
    },
    defaultVariants: {
      variant: "2col-left",
    },
  }
);

/**
 * ColumnLayout（サーバーコンポーネント）
 * コンポーネント合成パターンを使用 - 子コンポーネントでレイアウト内容を定義
 * 
 * @example
 * <ColumnLayout variant="2col-left" gap="gap-6">
 *   <ColumnLayout.Left className="md:w-1/3">
 *     サイドバーコンテンツ
 *   </ColumnLayout.Left>
 *   <ColumnLayout.Main className="md:w-2/3">
 *     メインコンテンツ
 *   </ColumnLayout.Main>
 * </ColumnLayout>
 */
function ColumnLayout({
  variant,
  gap = "gap-6",
  containerClassName,
  children,
}: ColumnLayoutProps) {
  // 子要素からLeft, Main, Rightコンポーネントを抽出
  const childrenArray = Array.isArray(children) ? children : [children];
  
  // 各スロットのコンテンツを抽出
  let leftContent: ReactNode | null = null;
  let mainContent: ReactNode | null = null;
  let rightContent: ReactNode | null = null;

  // 子要素を走査して対応するスロットを特定
  for (const child of childrenArray) {
    // 型安全に子要素のタイプを確認
    if (!React.isValidElement(child)) continue;
    
    const component = child.type as ComponentWithDisplayName;
    
    const displayName = typeof component === "function" 
      ? component.displayName 
      : undefined;
    
    if (displayName === "ColumnLayout.Left") leftContent = child;
    if (displayName === "ColumnLayout.Main") mainContent = child;
    if (displayName === "ColumnLayout.Right") rightContent = child;
  }

  return (
    <div
      className={cn(
        columnLayoutVariants({ variant }),
        gap,
        containerClassName
      )}
    >
      {/* 各variantに応じてコンテンツを表示 */}
      {variant === "2col-left" && (
        <>
          {leftContent}
          {mainContent}
        </>
      )}
      
      {variant === "2col-right" && (
        <>
          {mainContent}
          {rightContent}
        </>
      )}
      
      {variant === "3col" && (
        <>
          {leftContent}
          {mainContent}
          {rightContent}
        </>
      )}
    </div>
  );
}

// 左カラムコンポーネント
function Left({ children, className }: ColumnProps) {
  return (
    <div className={cn("w-full md:w-1/3", className)}>
      {children}
    </div>
  );
}
Left.displayName = "ColumnLayout.Left";

// メインカラムコンポーネント
function Main({ children, className }: ColumnProps) {
  return (
    <div className={cn("w-full md:w-2/3", className)}>
      {children}
    </div>
  );
}
Main.displayName = "ColumnLayout.Main";

// 右カラムコンポーネント
function Right({ children, className }: ColumnProps) {
  return (
    <div className={cn("w-full md:w-1/3", className)}>
      {children}
    </div>
  );
}
Right.displayName = "ColumnLayout.Right";

// サブコンポーネントをメインコンポーネントに追加
ColumnLayout.Left = Left;
ColumnLayout.Main = Main;
ColumnLayout.Right = Right;

export default ColumnLayout;
