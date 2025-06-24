import type { NextRequest } from "next/server";
import { CSRF_CONSTANTS, verifyCsrfToken } from "./csrf";

/**
 * API route内でCSRF検証を行うユーティリティ関数
 * @param request NextRequest オブジェクト
 * @returns 検証結果
 */
export function validateCsrfInApiRoute(request: NextRequest): {
	isValid: boolean;
	error?: string;
} {
	// GET、HEAD、OPTIONS、TRACEリクエストは検証をスキップ
	const safeMethods = ["GET", "HEAD", "OPTIONS", "TRACE"];
	if (safeMethods.includes(request.method)) {
		return { isValid: true };
	}

	try {
		// 1. Originヘッダーベースの基本検証
		const origin = request.headers.get("origin");
		const host = request.headers.get("host");

		if (!origin) {
			return {
				isValid: false,
				error: "Originヘッダーが存在しません",
			};
		}

		const originHost = new URL(origin).host;
		if (host !== originHost) {
			return {
				isValid: false,
				error: `Origin ${origin} がホスト ${host} と一致しません`,
			};
		}

		// 2. CSRFトークンベースの検証
		const csrfToken = request.headers.get(CSRF_CONSTANTS.HEADER_NAME);
		const csrfCookie = request.cookies.get(CSRF_CONSTANTS.COOKIE_NAME)?.value;

		if (!csrfToken || !csrfCookie) {
			return {
				isValid: false,
				error: "CSRFトークンまたはクッキーが存在しません",
			};
		}

		if (!verifyCsrfToken(csrfToken, csrfCookie)) {
			return {
				isValid: false,
				error: "CSRFトークンの検証に失敗しました",
			};
		}

		return { isValid: true };
	} catch (error) {
		return {
			isValid: false,
			error: `CSRF検証エラー: ${error instanceof Error ? error.message : "不明なエラー"}`,
		};
	}
}

/**
 * API route用のCSRF検証ミドルウェア関数
 * 検証に失敗した場合は適切なエラーレスポンスを返します
 */
export function withCsrfProtection<T extends NextRequest>(
	handler: (request: T) => Promise<Response>,
) {
	return async (request: T): Promise<Response> => {
		const validation = validateCsrfInApiRoute(request);

		if (!validation.isValid) {
			console.warn(`CSRF検証失敗: ${validation.error}`);

			return new Response(
				JSON.stringify({
					success: false,
					error: "CSRF検証に失敗しました",
					details: validation.error,
				}),
				{
					status: 403,
					headers: {
						"Content-Type": "application/json",
					},
				},
			);
		}

		return handler(request);
	};
}
