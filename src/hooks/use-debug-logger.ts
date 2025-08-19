import { useCallback } from "react";

/**
 * 開発環境でのみデバッグログを出力するカスタムフック
 * 本番環境ではログ出力をスキップし、パフォーマンスに影響しない
 */
export const useDebugLogger = (context?: string) => {
	const log = useCallback(
		(message: string, data?: any) => {
			if (process.env.NODE_ENV === "development") {
				const prefix = context ? `[${context}]` : "";
				if (data) {
					console.log(`${prefix} ${message}`, data);
				} else {
					console.log(`${prefix} ${message}`);
				}
			}
		},
		[context],
	);

	const warn = useCallback(
		(message: string, data?: any) => {
			if (process.env.NODE_ENV === "development") {
				const prefix = context ? `[${context}]` : "";
				if (data) {
					console.warn(`${prefix} ${message}`, data);
				} else {
					console.warn(`${prefix} ${message}`);
				}
			}
		},
		[context],
	);

	const error = useCallback(
		(message: string, data?: any) => {
			if (process.env.NODE_ENV === "development") {
				const prefix = context ? `[${context}]` : "";
				if (data) {
					console.error(`${prefix} ${message}`, data);
				} else {
					console.error(`${prefix} ${message}`);
				}
			}
		},
		[context],
	);

	return { log, warn, error };
};