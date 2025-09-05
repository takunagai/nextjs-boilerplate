import React from "react";

// Blob形状のSVGパターンを定義
export const BlobMasks = () => (
	<svg className="absolute w-0 h-0" aria-hidden="true">
		<defs>
			{/* ウェブ開発用Blob - より技術的で構造的な形状 */}
			<clipPath id="blob-web" clipPathUnits="objectBoundingBox">
				<path d="M0.85,0.15 C0.95,0.25 1,0.4 0.95,0.55 C0.92,0.7 0.85,0.85 0.7,0.9 C0.55,0.95 0.4,0.92 0.25,0.85 C0.1,0.78 0.05,0.65 0.08,0.5 C0.1,0.35 0.15,0.2 0.3,0.1 C0.45,0.05 0.65,0.05 0.85,0.15" />
			</clipPath>

			{/* コンサルティング用Blob - 対話的で柔らかな形状 */}
			<clipPath id="blob-consulting" clipPathUnits="objectBoundingBox">
				<path d="M0.8,0.1 C0.92,0.15 0.98,0.3 0.95,0.45 C0.92,0.6 0.85,0.75 0.75,0.85 C0.65,0.95 0.5,0.98 0.35,0.92 C0.2,0.86 0.08,0.75 0.05,0.6 C0.02,0.45 0.05,0.3 0.15,0.18 C0.25,0.06 0.4,0.02 0.55,0.05 C0.7,0.08 0.75,0.08 0.8,0.1" />
			</clipPath>

			{/* クリエイティブ用Blob - 創造的で流動的な形状 */}
			<clipPath id="blob-creative" clipPathUnits="objectBoundingBox">
				<path d="M0.75,0.08 C0.88,0.12 0.95,0.22 0.98,0.35 C1,0.48 0.96,0.62 0.88,0.72 C0.8,0.82 0.68,0.88 0.55,0.9 C0.42,0.92 0.28,0.88 0.18,0.78 C0.08,0.68 0.02,0.55 0.02,0.42 C0.02,0.29 0.08,0.18 0.18,0.1 C0.28,0.02 0.42,0 0.55,0.02 C0.65,0.04 0.7,0.06 0.75,0.08" />
			</clipPath>

			{/* グラデーション効果（オプション） */}
			<linearGradient
				id="blob-gradient-blue"
				x1="0%"
				y1="0%"
				x2="100%"
				y2="100%"
			>
				<stop offset="0%" stopColor="rgba(59, 130, 246, 0.1)" />
				<stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
			</linearGradient>

			<linearGradient
				id="blob-gradient-green"
				x1="0%"
				y1="0%"
				x2="100%"
				y2="100%"
			>
				<stop offset="0%" stopColor="rgba(34, 197, 94, 0.1)" />
				<stop offset="100%" stopColor="rgba(34, 197, 94, 0)" />
			</linearGradient>

			<linearGradient
				id="blob-gradient-purple"
				x1="0%"
				y1="0%"
				x2="100%"
				y2="100%"
			>
				<stop offset="0%" stopColor="rgba(168, 85, 247, 0.1)" />
				<stop offset="100%" stopColor="rgba(168, 85, 247, 0)" />
			</linearGradient>
		</defs>
	</svg>
);

// Blob形状を適用するための型定義
export type BlobShape = "web" | "consulting" | "creative";

// Blob形状を返すヘルパー関数
export const getBlobClipPath = (shape: BlobShape): string => {
	return `url(#blob-${shape})`;
};

// Tailwind用のクラス名を返すヘルパー関数
export const getBlobClass = (shape: BlobShape): string => {
	const baseClass = "relative overflow-hidden";
	const shapeClasses = {
		web: "[clip-path:url(#blob-web)]",
		consulting: "[clip-path:url(#blob-consulting)]",
		creative: "[clip-path:url(#blob-creative)]",
	};
	return `${baseClass} ${shapeClasses[shape]}`;
};
