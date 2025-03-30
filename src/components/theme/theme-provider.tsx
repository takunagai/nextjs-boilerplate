"use client";

import { STORAGE_KEYS } from "@/lib/constants";
import { useEffect } from "react";

type Theme = "light" | "dark";

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme: Theme;
  disableTransitionOnChange?: boolean;
}

export function ThemeProvider({
  children,
  defaultTheme,
  disableTransitionOnChange = false,
}: ThemeProviderProps) {
  useEffect(() => {
    const storedTheme = localStorage.getItem(STORAGE_KEYS.THEME) as Theme;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // 保存されたテーマがあればそれを使用、なければシステム設定を確認し、それもなければデフォルトを使用
    let currentTheme: Theme;
    if (storedTheme) {
      currentTheme = storedTheme;
    } else if (prefersDark) {
      currentTheme = "dark";
    } else {
      currentTheme = defaultTheme;
    }

    document.documentElement.classList.toggle("dark", currentTheme === "dark");

    if (!storedTheme) {
      localStorage.setItem(STORAGE_KEYS.THEME, currentTheme);
    }
  }, [defaultTheme]);

  // システムテーマの変更を監視
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      // ユーザーが明示的にテーマを設定していない場合のみ適用
      if (!localStorage.getItem(STORAGE_KEYS.THEME)) {
        document.documentElement.classList.toggle("dark", e.matches);
      }
    };

    // イベントリスナーの追加（ブラウザ互換性対応）
    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
    
    // 古いブラウザ向け
    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  useEffect(() => {
    if (!disableTransitionOnChange) return;

    const className = "[&_*]:!transition-none";
    document.documentElement.classList.add(className);
    return () => document.documentElement.classList.remove(className);
  }, [disableTransitionOnChange]);

  return <>{children}</>;
}
