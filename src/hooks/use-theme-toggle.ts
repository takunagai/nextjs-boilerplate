"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

/**
 * テーマ切り替え機能を提供するカスタムフック
 * @returns テーマの状態と切り替え機能
 */
export function useThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // コンポーネントがマウントされたことを検知
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // テーマを切り替える関数
  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };
  
  return {
    // 実際のテーマ値（resolvedThemeはシステム設定も反映した最終的なテーマ）
    theme: resolvedTheme,
    // 設定されたテーマ（ユーザーが明示的に選択したテーマ）
    selectedTheme: theme,
    // テーマ切り替え関数
    toggleTheme,
    // マウント状態
    mounted
  };
}
