"use client";

import Link from "next/link";
import { type ReactNode, memo } from "react";
import { type PortfolioCategory } from "@/lib/data/portfolio-data";

// ServiceCategoriesコンポーネントのProps型定義
export type ServiceCategoriesProps = {
  /** カテゴリーデータ */
  categories: PortfolioCategory[];
  
  /** セクションタイトル */
  title?: string;
  
  /** セクションの説明文 */
  description?: string;
  
  /** グリッド列数の自動調整（将来の拡張用・現在は未使用） */
  cardWidth?: "auto" | number;
  
  /** グリッドのギャップ（未使用・固定値使用） */
  gap?: "sm" | "md" | "lg";
  
  /** タイトルレベル（SEO/アクセシビリティ用） */
  titleLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  
  /** 追加のCSSクラス */
  className?: string;
  
  /** コンテナの最大幅制限 */
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "none";
};

// カテゴリーカード単体のコンポーネント（メモ化でパフォーマンス向上）
const ServiceCategoryCard = memo<{
  category: PortfolioCategory;
}>(({ category }) => {
  // 共通のクラス名とスタイル（グリッドレイアウト対応）
  const commonClassName = [
    "w-full",
    "h-full",
    "p-3 md:p-4",
    "border",
    "rounded-lg", 
    "bg-card",
    "hover:bg-accent/50",
    "transition-colors",
    "duration-200",
    "flex",
    "flex-col",
    category.serviceUrl && "cursor-pointer group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
  ].filter(Boolean).join(" ");

  // リンクの場合
  if (category.serviceUrl) {
    return (
      <Link
        href={category.serviceUrl}
        className={commonClassName}
        aria-label={`${category.name}サービスの詳細ページへ移動`}
      >
        <div className="flex items-start gap-2 md:gap-3 mb-2">
          {/* アイコン */}
          {category.icon && (
            <div 
              className="flex-shrink-0 mt-0.5" 
              aria-hidden="true"
            >
              {category.icon}
            </div>
          )}
          
          {/* カテゴリ名 */}
          <div className="flex-1 min-w-0">
            <h3 className="text-xs md:text-sm font-semibold leading-tight text-foreground group-hover:underline underline-offset-2">
              {category.name}
            </h3>
          </div>
        </div>
        
        {/* 説明文 */}
        <p className="text-xs text-muted-foreground leading-relaxed flex-1">
          {category.description}
        </p>
      </Link>
    );
  }

  // 通常のdivの場合
  return (
    <div
      className={commonClassName}
    >
      <div className="flex items-start gap-2 md:gap-3 mb-2">
        {/* アイコン */}
        {category.icon && (
          <div 
            className="flex-shrink-0 mt-0.5" 
            aria-hidden="true"
          >
            {category.icon}
          </div>
        )}
        
        {/* カテゴリ名 */}
        <div className="flex-1 min-w-0">
          <h3 className="text-xs md:text-sm font-semibold leading-tight text-foreground">
            {category.name}
          </h3>
        </div>
      </div>
      
      {/* 説明文 */}
      <p className="text-xs text-muted-foreground leading-relaxed flex-1">
        {category.description}
      </p>
    </div>
  );
});

ServiceCategoryCard.displayName = "ServiceCategoryCard";

// メインのServiceCategoriesコンポーネント
export const ServiceCategories = memo<ServiceCategoriesProps>(({
  categories,
  title = "あなたの「できたらいいな」に、全力でお応えします",
  description = "どんなご要望も、まずはお聞かせください。15年の経験とAIの力で、最適な解決策をご提案します。",
  cardWidth = 180,
  gap = "md",
  titleLevel = "h3",
  className = "",
  maxWidth = "2xl",
}) => {
  // 最大幅クラス計算（Tailwind safelistを考慮）
  const maxWidthClass = {
    "sm": "max-w-sm",
    "md": "max-w-md", 
    "lg": "max-w-lg",
    "xl": "max-w-xl",
    "2xl": "max-w-2xl",
    "none": ""
  }[maxWidth] || "";

  // タイトルコンポーネント
  const TitleComponent = titleLevel;

  return (
    <section 
      className={`mt-12 ${className}`}
      aria-labelledby="service-categories-title"
    >
      {/* ヘッダーセクション */}
      <div className="text-center mb-8">
        <TitleComponent 
          id="service-categories-title"
          className="text-2xl font-bold mb-3"
        >
          {title}
        </TitleComponent>
        
        {description && (
          <p className={`text-muted-foreground ${maxWidthClass} mx-auto`}>
            {description}
          </p>
        )}
      </div>

      {/* カテゴリーカードグリッド */}
      <div 
        className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4`}
        role="list"
        aria-label="利用可能なサービスカテゴリー一覧"
      >
        {categories.map((category) => (
          <div
            key={category.id}
            role="listitem"
            className="w-full"
          >
            <ServiceCategoryCard 
              category={category}
            />
          </div>
        ))}
      </div>
    </section>
  );
});

ServiceCategories.displayName = "ServiceCategories";