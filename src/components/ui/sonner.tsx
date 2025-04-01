"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";
import { useThemeToggle } from "@/hooks/use-theme-toggle";

/**
 * Sonnerトースト通知用のコンポーネント
 * テーマに合わせてスタイルを自動調整します
 */
const Toaster = (props: ToasterProps) => {
	const { theme, mounted } = useThemeToggle();

	// マウント前は何も表示しない
	if (!mounted) {
		return null;
	}

	// テーマに合わせてスタイルを適用
	return (
		<Sonner
			theme={theme as ToasterProps["theme"]}
			className="toaster group"
			toastOptions={{
				classNames: {
					toast:
						"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
					description: "group-[.toast]:text-muted-foreground",
					actionButton:
						"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
					cancelButton:
						"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
				},
			}}
			{...props}
		/>
	);
};

export { Toaster };
