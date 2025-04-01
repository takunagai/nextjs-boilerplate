"use client";

import { FEATURES, THEME } from "@/lib/constants";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";

/**
 * テーマプロバイダー
 * next-themesライブラリを使用してテーマの管理を行います
 */
export function ThemeProvider({
  children,
  disableTransitionOnChange = true, // デフォルトを true に設定
  ...props
}: ThemeProviderProps) {
  // 機能フラグがオフの場合はThemeProviderを使わず、子要素のみをレンダリング
  if (!FEATURES.THEME_SWITCHER) {
    return <>{children}</>;
  }

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={THEME.DEFAULT}
      enableSystem
      disableTransitionOnChange={disableTransitionOnChange}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
