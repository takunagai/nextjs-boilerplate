"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";
import { FEATURES } from "@/lib/constants";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // 機能フラグがOFFの場合はプロバイダーをスキップして直接子要素をレンダリング
  if (!FEATURES.THEME_SWITCHER) {
    return <>{children}</>;
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
