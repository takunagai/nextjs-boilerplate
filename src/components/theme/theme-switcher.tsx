"use client";

import { FEATURES } from "@/lib/constants";

export function ThemeSwitcher() {
  // 機能フラグがOFFの場合は何も表示しない
  if (!FEATURES.THEME_SWITCHER) {
    return null;
  }
  
  // 機能フラグがONの場合のみ、別ファイルのコンポーネントを読み込み
  const ThemeSwitcherContent = require('./theme-switcher-content').default;
  return <ThemeSwitcherContent />;
}
