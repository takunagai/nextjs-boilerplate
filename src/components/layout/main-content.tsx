"use client";

import type { ReactNode } from "react";
import { useAnnouncementBar } from "./announcement-bar-context";

export function MainContent({ children }: { children: ReactNode }) {
	const { isVisible, height } = useAnnouncementBar();

	// ヘッダーの高さ（h-16 = 64px）とお知らせバーの高さを合計
	const paddingTop = isVisible ? 64 + height : 64;

	return (
		<main className="flex-grow" style={{ paddingTop: `${paddingTop}px` }}>
			{children}
		</main>
	);
}
