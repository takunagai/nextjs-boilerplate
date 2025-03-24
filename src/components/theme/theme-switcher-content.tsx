"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Laptop } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeSwitcherContent() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // コンポーネントがマウントされるまでレンダリングを遅延
  useEffect(() => {
    setMounted(true);
  }, []);

  // 次のテーマに切り替える関数
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9">
        <span className="sr-only">テーマを読み込み中</span>
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-9 w-9 relative"
      onClick={toggleTheme}
      title={
        theme === "light"
          ? "ライトモード（クリックで切替）"
          : theme === "dark"
          ? "ダークモード（クリックで切替）"
          : "システム設定（クリックで切替）"
      }
    >
      {/* ライトモードのアイコン */}
      <Sun
        className={`h-5 w-5 transition-all ${
          theme === "light" ? "scale-100 rotate-0" : "scale-0 -rotate-90 absolute"
        }`}
      />
      
      {/* ダークモードのアイコン */}
      <Moon
        className={`h-5 w-5 transition-all ${
          theme === "dark" ? "scale-100 rotate-0" : "scale-0 -rotate-90 absolute"
        }`}
      />
      
      {/* システム設定のアイコン */}
      <Laptop
        className={`h-5 w-5 transition-all ${
          theme === "system" ? "scale-100 rotate-0" : "scale-0 -rotate-90 absolute"
        }`}
      />
      
      <span className="sr-only">
        テーマを切り替える（現在: 
        {theme === "light" ? "ライトモード" : theme === "dark" ? "ダークモード" : "システム設定"}）
      </span>
    </Button>
  );
}
