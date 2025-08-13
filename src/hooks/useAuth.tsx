"use client";

import type { Session } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import type { AuthResult } from "@/lib/auth/auth-errors";
import { AUTH_ERROR_CODES, getAuthErrorMessage } from "@/lib/auth/auth-errors";

/**
 * ログイン認証情報の型
 */
export interface LoginCredentials {
	readonly email: string;
	readonly password: string;
}

/**
 * useAuthフックの戻り値型
 */
export interface UseAuthReturn {
	readonly session: Session | null;
	readonly status: "loading" | "authenticated" | "unauthenticated";
	readonly isLoading: boolean;
	readonly isAuthenticated: boolean;
	readonly user: Session["user"] | undefined;
	readonly login: (credentials: LoginCredentials) => Promise<AuthResult>;
	readonly logout: () => Promise<AuthResult>;
	readonly updateSession: () => Promise<AuthResult>;
}

/**
 * 認証状態と認証関連機能へのアクセスを提供するカスタムフック
 * クライアントコンポーネントで使用可能
 */
export function useAuth(): UseAuthReturn {
	const { data: session, status, update } = useSession();
	const isLoading = status === "loading";
	const isAuthenticated = status === "authenticated";

	/**
	 * ログイン関数
	 */
	const login = async (credentials: LoginCredentials): Promise<AuthResult> => {
		try {
			// 入力値の検証
			if (!credentials.email || !credentials.password) {
				return {
					success: false,
					error: AUTH_ERROR_CODES.EMPTY_CREDENTIALS,
					message: getAuthErrorMessage(AUTH_ERROR_CODES.EMPTY_CREDENTIALS),
				};
			}

			// NextAuthの認証処理を実行
			const result = await signIn("credentials", {
				redirect: false,
				...credentials,
			});

			// 認証結果を処理
			if (result?.error) {
				return {
					success: false,
					error: result.error,
					message: getAuthErrorMessage(result.error, credentials.email),
				};
			}

			return { success: true };
		} catch (error) {
			console.error("ログインエラー:", error);

			const errorCode =
				error instanceof Error && error.message.includes("fetch failed")
					? AUTH_ERROR_CODES.NETWORK_ERROR
					: AUTH_ERROR_CODES.UNKNOWN_ERROR;

			return {
				success: false,
				error: errorCode,
				message: getAuthErrorMessage(errorCode),
			};
		}
	};

	/**
	 * ログアウト関数
	 */
	const logout = async (): Promise<AuthResult> => {
		try {
			// クライアント側でリダイレクトを処理するため、redirect: false に設定
			await signOut({ redirect: false });
			return { success: true };
		} catch (error) {
			console.error("ログアウトエラー:", error);
			return {
				success: false,
				error: AUTH_ERROR_CODES.UNKNOWN_ERROR,
				message: "ログアウト処理中にエラーが発生しました",
			};
		}
	};

	/**
	 * セッション更新関数
	 */
	const updateSession = async (): Promise<AuthResult> => {
		try {
			await update();
			return { success: true };
		} catch (error) {
			console.error("セッション更新エラー:", error);
			return {
				success: false,
				error: AUTH_ERROR_CODES.UNKNOWN_ERROR,
				message: "セッション更新中にエラーが発生しました",
			};
		}
	};

	return {
		session,
		status,
		isLoading,
		isAuthenticated,
		user: session?.user,
		login,
		logout,
		updateSession,
	};
}
