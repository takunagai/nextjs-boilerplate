import { useCallback, useEffect, useRef } from "react";

interface UseParticleCanvasOptions {
	onResize?: (width: number, height: number) => void;
}

/**
 * パーティクル背景用のキャンバス操作を管理するフック
 * キャンバスサイズの設定、リサイズ処理、クリーンアップを担当
 */
export function useParticleCanvas(options: UseParticleCanvasOptions = {}) {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const { onResize } = options;

	// キャンバスサイズの設定
	const setCanvasSize = useCallback(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const width = window.innerWidth;
		const height = window.innerHeight;

		canvas.width = width;
		canvas.height = height;

		onResize?.(width, height);
	}, [onResize]);

	// 2Dコンテキストの取得
	const getContext = useCallback(() => {
		const canvas = canvasRef.current;
		if (!canvas) return null;
		return canvas.getContext("2d");
	}, []);

	// キャンバスの寸法取得
	const getDimensions = useCallback(() => {
		const canvas = canvasRef.current;
		if (!canvas) return { width: 0, height: 0 };
		return { width: canvas.width, height: canvas.height };
	}, []);

	// キャンバスクリア
	const clearCanvas = useCallback(() => {
		const canvas = canvasRef.current;
		const ctx = getContext();
		if (!canvas || !ctx) return;

		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}, [getContext]);

	// 初期化とクリーンアップ
	useEffect(() => {
		// 初期サイズ設定
		setCanvasSize();

		// リサイズイベントリスナー
		const handleResize = () => {
			setCanvasSize();
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [setCanvasSize]);

	return {
		canvasRef,
		getContext,
		getDimensions,
		clearCanvas,
		setCanvasSize,
	};
}
