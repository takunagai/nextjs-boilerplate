"use client";

import { STORAGE_KEYS } from "@/lib/constants";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const Toaster = ({ ...props }: ToasterProps) => {
	const [theme, setTheme] = useState<Theme>("light");
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		// localStorageからテーマを取得
		const storedTheme = localStorage.getItem(STORAGE_KEYS.THEME) as Theme;
		if (storedTheme) {
			setTheme(storedTheme);
		}
		setMounted(true);
	}, []);

	// マウント前はデフォルト表示
	if (!mounted) {
		return null;
	}

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
