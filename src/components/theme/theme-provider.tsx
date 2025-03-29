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
    const currentTheme = storedTheme || defaultTheme;

    document.documentElement.classList.toggle("dark", currentTheme === "dark");

    if (!storedTheme) {
      localStorage.setItem(STORAGE_KEYS.THEME, defaultTheme);
    }
  }, [defaultTheme]);

  useEffect(() => {
    if (!disableTransitionOnChange) return;

    const className = "[&_*]:!transition-none";
    document.documentElement.classList.add(className);
    return () => document.documentElement.classList.remove(className);
  }, [disableTransitionOnChange]);

  return <>{children}</>;
}
