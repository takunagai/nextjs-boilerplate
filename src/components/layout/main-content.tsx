"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useAnnouncementBar } from "./announcement-bar-context";

export function MainContent({ children }: { children: ReactNode }) {
	const { isVisible, height } = useAnnouncementBar();
	const [mounted, setMounted] = useState(false);

	// ハイドレーション完了後にマウント状態を更新
	useEffect(() => {
		setMounted(true);
	}, []);

	// ヘッダーの高さ（h-16 = 64px）とお知らせバーの高さを合計
	// SSR時は固定値（64px）を使用、ハイドレーション後に動的値を使用
	const paddingTop = mounted && isVisible ? 64 + height : 64;

	return (
		<main className="flex-grow" style={{ paddingTop: `${paddingTop}px` }}>
			{children}
		</main>
	);
}
