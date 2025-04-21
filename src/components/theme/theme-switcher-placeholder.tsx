"use client";

import { Button } from "@/components/ui/button";

export default function ThemeSwitcherPlaceholder() {
	return (
		<Button
			variant="ghost"
			size="icon"
			className="h-9 w-9"
			aria-label="テーマを読み込み中"
		>
			<span className="sr-only">テーマを読み込み中</span>
		</Button>
	);
}
