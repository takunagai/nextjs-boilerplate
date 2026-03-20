"use client";

import dynamic from "next/dynamic";

// 装飾的背景アニメーション: SSR不要・初期バンドルから除外
const WhalesAnimation = dynamic(
	() =>
		import("@/components/background/whales-animation").then(
			(m) => m.WhalesAnimation,
		),
	{ ssr: false },
);

export function LazyWhalesAnimation() {
	return <WhalesAnimation />;
}
