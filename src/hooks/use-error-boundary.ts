"use client";

import { useCallback, useState } from "react";

/**
 * エラー境界の状態
 */
export interface ErrorBoundaryState {
	hasError: boolean;
	error: Error | null;
	errorInfo: string | null;
}

/**
 * エラーハンドリング用のカスタムフック
 *
 * @example
 * ```tsx
 * const { error, clearError, captureError } = useErrorBoundary();
 *
 * useEffect(() => {
 *   try {
 *     // 危険な処理
 *   } catch (err) {
 *     captureError(err as Error, 'Intersection Observer failed');
 *   }
 * }, [captureError]);
 * ```
 */
export function useErrorBoundary(
	onError?: (error: Error, errorInfo?: string) => void,
) {
	const [errorState, setErrorState] = useState<ErrorBoundaryState>({
		hasError: false,
		error: null,
		errorInfo: null,
	});

	const captureError = useCallback(
		(error: Error, errorInfo?: string) => {
			const newErrorState = {
				hasError: true,
				error,
				errorInfo: errorInfo || error.message,
			};

			setErrorState(newErrorState);

			// 外部エラーハンドラーを呼び出し
			onError?.(error, errorInfo);

			// 開発環境ではコンソールにログ出力
			if (process.env.NODE_ENV === "development") {
				console.error("AnimatedImage Error:", error);
				if (errorInfo) {
					console.error("Error Info:", errorInfo);
				}
			}
		},
		[onError],
	);

	const clearError = useCallback(() => {
		setErrorState({
			hasError: false,
			error: null,
			errorInfo: null,
		});
	}, []);

	const retryWithClearError = useCallback(
		(retryFn: () => void) => {
			clearError();
			try {
				retryFn();
			} catch (error) {
				captureError(error as Error, "Retry failed");
			}
		},
		[clearError, captureError],
	);

	return {
		...errorState,
		captureError,
		clearError,
		retryWithClearError,
	};
}
