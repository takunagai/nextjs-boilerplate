"use client";

import { useEffect, useState } from "react";

/**
 * WebGL対応状況とデバイス性能を検出するフック
 * パフォーマンス条件付きローディングのために使用
 */
export function useWebGLSupport() {
	const [webglSupport, setWebglSupport] = useState({
		isSupported: false,
		performanceLevel: "low" as "low" | "medium" | "high",
		shouldLoad3D: false,
		isLoading: true,
	});

	useEffect(() => {
		// サーバーサイドでは実行しない
		if (typeof window === "undefined") {
			setWebglSupport(prev => ({ ...prev, isLoading: false }));
			return;
		}

		const detectWebGLSupport = () => {
			try {
				// WebGLサポート確認
				const canvas = document.createElement("canvas");
				const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl") as WebGLRenderingContext | null;
				
				if (!gl) {
					return {
						isSupported: false,
						performanceLevel: "low" as const,
						shouldLoad3D: false,
					};
				}

				// パフォーマンスレベル判定
				let performanceLevel: "low" | "medium" | "high" = "medium";
				
				// GPU情報を取得
				const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
				const renderer = debugInfo 
					? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) 
					: "";

				// デバイス・ブラウザ別パフォーマンス判定
				const userAgent = navigator.userAgent.toLowerCase();
				const isDesktop = !(/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent));
				const isHighEndMobile = /iphone.*os 1[6-9]|ipad.*os 1[6-9]|android.*chrome/i.test(userAgent);

				// デスクトップの場合
				if (isDesktop) {
					// 統合GPU vs 専用GPU判定
					const isIntegratedGPU = /intel|amd.*integrated|apple m[0-9]/i.test(renderer);
					performanceLevel = isIntegratedGPU ? "medium" : "high";
				} 
				// 高性能モバイルの場合
				else if (isHighEndMobile) {
					performanceLevel = "medium";
				} 
				// その他モバイル
				else {
					performanceLevel = "low";
				}

				// メモリ使用量チェック（可能な場合）
				if ('memory' in performance) {
					const memInfo = (performance as any).memory;
					const availableMemory = memInfo.jsHeapSizeLimit / (1024 * 1024); // MB
					
					if (availableMemory < 500) {
						performanceLevel = "low";
					}
				}

				// 3D効果を有効にするかどうか決定
				const shouldLoad3D = performanceLevel !== "low";

				return {
					isSupported: true,
					performanceLevel,
					shouldLoad3D,
				};

			} catch (error) {
				console.warn("WebGL detection failed:", error);
				return {
					isSupported: false,
					performanceLevel: "low" as const,
					shouldLoad3D: false,
				};
			}
		};

		// 検出実行
		const result = detectWebGLSupport();
		
		setWebglSupport({
			...result,
			isLoading: false,
		});

	}, []);

	return webglSupport;
}

/**
 * パフォーマンスベースの3D効果有効判定フック
 * より簡単なインターフェース
 */
export function usePerformanceCheck() {
	const { shouldLoad3D, performanceLevel, isLoading } = useWebGLSupport();
	
	return {
		/** 3D効果をロードするかどうか */
		shouldLoad3D,
		/** パフォーマンスレベル */
		performanceLevel,
		/** 検出中かどうか */
		isLoading,
		/** 高性能デバイスかどうか */
		isHighPerformance: performanceLevel === "high",
		/** 中性能以上かどうか */
		isMediumOrBetter: performanceLevel !== "low",
	};
}