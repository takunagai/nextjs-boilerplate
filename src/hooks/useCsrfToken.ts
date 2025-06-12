"use client";

import { useEffect, useState } from "react";

interface CsrfTokenResponse {
	success: boolean;
	csrfToken?: string;
	expiresAt?: number;
	error?: string;
}

interface UseCsrfTokenReturn {
	csrfToken: string | null;
	loading: boolean;
	error: string | null;
	refreshToken: () => Promise<void>;
}

/**
 * CSRFトークンを管理するカスタムフック
 */
export function useCsrfToken(): UseCsrfTokenReturn {
	const [csrfToken, setCsrfToken] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	/**
	 * CSRFトークンを取得する
	 */
	const fetchCsrfToken = async (): Promise<void> => {
		try {
			setLoading(true);
			setError(null);

			const response = await fetch("/api/csrf-token", {
				method: "GET",
				credentials: "include", // クッキーを含める
			});

			if (!response.ok) {
				throw new Error(`CSRFトークンの取得に失敗しました: ${response.status}`);
			}

			const data: CsrfTokenResponse = await response.json();

			if (data.success && data.csrfToken) {
				setCsrfToken(data.csrfToken);
			} else {
				throw new Error(data.error || "CSRFトークンの取得に失敗しました");
			}
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : "不明なエラーが発生しました";
			setError(errorMessage);
			console.error("CSRFトークン取得エラー:", err);
		} finally {
			setLoading(false);
		}
	};

	/**
	 * CSRFトークンを手動で更新する
	 */
	const refreshToken = async (): Promise<void> => {
		await fetchCsrfToken();
	};

	// 初回マウント時にCSRFトークンを取得
	useEffect(() => {
		fetchCsrfToken();
	}, []);

	return {
		csrfToken,
		loading,
		error,
		refreshToken,
	};
}

/**
 * フォーム送信時にCSRFトークンを含めるヘッダーを生成する
 */
export function createCsrfHeaders(csrfToken: string | null): HeadersInit {
	const headers: HeadersInit = {
		"Content-Type": "application/json",
	};

	if (csrfToken) {
		headers["x-csrf-token"] = csrfToken;
	}

	return headers;
}