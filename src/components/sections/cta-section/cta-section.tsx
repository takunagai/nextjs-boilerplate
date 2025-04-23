import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import Link from "next/link";
import { FaArrowUpRightFromSquare, FaArrowRight } from "react-icons/fa6";
import {
  ctaSectionVariants,
  ctaContentVariants,
  ctaButtonGroupVariants,
} from "./cta-section-variants";

export interface CTASectionProps extends React.HTMLAttributes<HTMLElement> {
  // バリアント
  layout?: "horizontal" | "vertical" | "card" | "banner";
  intent?: "primary" | "secondary" | "accent" | "muted" | "minimal";
  size?: "sm" | "md" | "lg";
  decoration?: "none" | "border" | "shadow" | "gradient";
  spacing?: "compact" | "regular" | "spacious";
  alignment?: "start" | "center" | "end";
  buttonOrientation?: "horizontal" | "vertical" | "responsive";
  
  // コンテンツ
  title?: string;
  description?: string;
  
  // プライマリボタン
  primaryButtonText?: string;
  primaryButtonHref?: string;
  primaryButtonExternal?: boolean;
  primaryButtonVariant?: "default" | "secondary" | "outline" | "ghost" | "link" | "destructive";
  primaryButtonSize?: "default" | "sm" | "lg" | "icon";
  primaryButtonIcon?: React.ReactNode;
  onPrimaryButtonClick?: () => void;
  
  // セカンダリボタン
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  secondaryButtonExternal?: boolean;
  secondaryButtonVariant?: "default" | "secondary" | "outline" | "ghost" | "link" | "destructive";
  secondaryButtonSize?: "default" | "sm" | "lg" | "icon";
  secondaryButtonIcon?: React.ReactNode;
  onSecondaryButtonClick?: () => void;
  
  // カスタムスタイリング
  containerWidth?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  containerPaddingX?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  containerPaddingY?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  
  // 背景設定
  backgroundImage?: string;
  overlayOpacity?: number;
  
  // 各要素へのクラス指定
  containerClassName?: string;
  contentClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  buttonGroupClassName?: string;
  primaryButtonClassName?: string;
  secondaryButtonClassName?: string;
}

export function CTASection({
  // バリアント
  layout = "horizontal",
  intent = "primary",
  size = "md",
  decoration = "none",
  spacing = "regular",
  alignment = "start",
  buttonOrientation = "responsive",
  
  // コンテンツ
  title = "今すぐ始めましょう",
  description = "このボイラープレートを使って、モダンなWebアプリケーションの開発をスタートしましょう。詳細なドキュメントとサンプルコードが用意されています。",
  
  // プライマリボタン
  primaryButtonText = "GitHubで見る",
  primaryButtonHref = "https://github.com/takunagai/nextjs-boilerplate",
  primaryButtonExternal = true,
  primaryButtonVariant = "secondary",
  primaryButtonSize = "lg",
  primaryButtonIcon,
  onPrimaryButtonClick,
  
  // セカンダリボタン
  secondaryButtonText = "使い方を学ぶ",
  secondaryButtonHref = "/docs/getting-started",
  secondaryButtonExternal = false,
  secondaryButtonVariant = "outline",
  secondaryButtonSize = "lg",
  secondaryButtonIcon,
  onSecondaryButtonClick,
  
  // カスタムスタイリング
  containerWidth = "2xl",
  containerPaddingX = "lg",
  containerPaddingY = "xl",
  
  // 背景設定
  backgroundImage,
  overlayOpacity = 0.5,
  
  // 各要素へのクラス指定
  className,
  containerClassName,
  contentClassName,
  titleClassName,
  descriptionClassName,
  buttonGroupClassName,
  primaryButtonClassName,
  secondaryButtonClassName,
  
  // その他のprops
  ...props
}: CTASectionProps) {
  // カスタム背景スタイル
  const backgroundStyle: React.CSSProperties = {};
  
  if (backgroundImage) {
    backgroundStyle.backgroundImage = `url(${backgroundImage})`;
    backgroundStyle.backgroundSize = "cover";
    backgroundStyle.backgroundPosition = "center";
  }
  
  // タイトルのサイズをバリアントに応じて設定
  const titleSizeClasses = {
    sm: "text-2xl md:text-3xl",
    md: "text-3xl md:text-4xl",
    lg: "text-4xl md:text-5xl",
  }[size];
  
  // 説明文のサイズをバリアントに応じて設定
  const descriptionOpacityClass = "opacity-80";
  
  // デフォルトのアイコン設定
  const defaultPrimaryIcon = primaryButtonExternal ? (
    <FaArrowUpRightFromSquare className="h-4 w-4" />
  ) : (
    <FaArrowRight className="h-4 w-4" />
  );
  
  const primaryIcon = primaryButtonIcon || defaultPrimaryIcon;
  
  const defaultSecondaryIcon = secondaryButtonExternal ? (
    <FaArrowUpRightFromSquare className="h-4 w-4" />
  ) : undefined;
  
  const secondaryIcon = secondaryButtonIcon || defaultSecondaryIcon;
  
  return (
    <section
      className={cn(
        ctaSectionVariants({
          layout,
          intent,
          size,
          decoration,
          spacing,
          alignment,
        }),
        "relative", // position: relativeを追加して子要素のabsoluteポジショニングの基準にする
        className
      )}
      style={Object.keys(backgroundStyle).length > 0 ? backgroundStyle : undefined}
      {...props}
    >
      {/* 背景オーバーレイ */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
          aria-hidden="true"
        />
      )}
      
      <Container
        width={containerWidth}
        paddingX={containerPaddingX}
        paddingY={containerPaddingY}
        className={cn("relative z-10", containerClassName)}
      >
        {/* テキストコンテンツ */}
        <div className={cn(
          ctaContentVariants({ layout, size }),
          contentClassName
        )}>
          <h2 className={cn(
            "font-bold",
            titleSizeClasses,
            titleClassName
          )}>
            {title}
          </h2>
          
          {description && (
            <p className={cn(
              "text-lg",
              descriptionOpacityClass,
              descriptionClassName
            )}>
              {description}
            </p>
          )}
        </div>
        
        {/* ボタングループ */}
        {(primaryButtonText || secondaryButtonText) && (
          <div className={cn(
            ctaButtonGroupVariants({
              layout,
              alignment,
              orientation: buttonOrientation,
            }),
            buttonGroupClassName
          )}>
            {primaryButtonText && (
              <Button
                variant={primaryButtonVariant}
                size={primaryButtonSize}
                onClick={onPrimaryButtonClick}
                className={cn("gap-2", primaryButtonClassName)}
                asChild={!!primaryButtonHref}
              >
                {primaryButtonHref ? (
                  primaryButtonExternal ? (
                    <a
                      href={primaryButtonHref}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {primaryButtonText}
                      {primaryIcon && (
                        <span aria-hidden="true">{primaryIcon}</span>
                      )}
                    </a>
                  ) : (
                    <Link href={primaryButtonHref}>
                      {primaryButtonText}
                      {primaryIcon && (
                        <span aria-hidden="true">{primaryIcon}</span>
                      )}
                    </Link>
                  )
                ) : (
                  <>
                    {primaryButtonText}
                    {primaryIcon && (
                      <span aria-hidden="true">{primaryIcon}</span>
                    )}
                  </>
                )}
              </Button>
            )}
            
            {secondaryButtonText && (
              <Button
                variant={secondaryButtonVariant}
                size={secondaryButtonSize}
                onClick={onSecondaryButtonClick}
                className={cn("gap-2", secondaryButtonClassName)}
                asChild={!!secondaryButtonHref}
              >
                {secondaryButtonHref ? (
                  secondaryButtonExternal ? (
                    <a
                      href={secondaryButtonHref}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {secondaryButtonText}
                      {secondaryIcon && (
                        <span aria-hidden="true">{secondaryIcon}</span>
                      )}
                    </a>
                  ) : (
                    <Link href={secondaryButtonHref}>
                      {secondaryButtonText}
                      {secondaryIcon && (
                        <span aria-hidden="true">{secondaryIcon}</span>
                      )}
                    </Link>
                  )
                ) : (
                  <>
                    {secondaryButtonText}
                    {secondaryIcon && (
                      <span aria-hidden="true">{secondaryIcon}</span>
                    )}
                  </>
                )}
              </Button>
            )}
          </div>
        )}
      </Container>
    </section>
  );
}
