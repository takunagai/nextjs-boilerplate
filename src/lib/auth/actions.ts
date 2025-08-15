"use server";

/**
 * 認証関連のServer Actions
 *
 * 既存のAuth.js認証システムと並行して動作する
 * Server Actions ベースの認証機能を提供します。
 */

import { redirect } from "next/navigation";
import { z } from "zod";
import { createSafeAction } from "@/lib/server/action-utils";
import type { AuthActionResult } from "@/lib/types/actions";
import { signIn, signOut } from "./index";

/**
 * ログイン用のZodスキーマ
 */
const loginSchema = z.object({
	email: z
		.string()
		.min(1, { message: "メールアドレスを入力してください" })
		.email({ message: "有効なメールアドレスを入力してください" }),
	password: z
		.string()
		.min(1, { message: "パスワードを入力してください" })
		.min(6, { message: "パスワードは6文字以上で入力してください" }),
	redirectTo: z.string().optional(),
});

/**
 * Server Actions用ログインハンドラー
 *
 * @param data - バリデーション済みのログインデータ
 * @returns 認証結果
 */
async function handleLogin(
	data: z.infer<typeof loginSchema>,
): Promise<AuthActionResult> {
	try {
		const result = await signIn("credentials", {
			email: data.email,
			password: data.password,
			redirect: false,
		});

		if (result?.error) {
			throw new Error("認証に失敗しました");
		}

		// ログイン成功時のリダイレクト先を決定
		const redirectUrl = data.redirectTo || "/dashboard";

		return {
			success: true,
			data: { redirectUrl },
			message: "ログインしました",
			redirectUrl,
		};
	} catch (error) {
		console.error("Login action failed:", error);
		return {
			success: false,
			error: {
				code: "LOGIN_FAILED",
				message:
					error instanceof Error
						? error.message
						: "ログインに失敗しました。メールアドレスとパスワードを確認してください。",
			},
		};
	}
}

/**
 * Server Actions用ログインAction
 *
 * フォームから直接呼び出し可能な型安全なログインAction
 */
export const loginAction = createSafeAction(loginSchema, async (data) => {
	const result = await handleLogin(data);

	// 成功時は自動的にリダイレクト
	if (result.success && result.redirectUrl) {
		redirect(result.redirectUrl);
	}

	return result;
});

/**
 * Server Actions用ログアウトAction
 *
 * @param _prevState - 前の状態（未使用）
 * @param _formData - フォームデータ（未使用）
 * @returns ログアウト結果
 */
export async function logoutAction(
	_prevState: unknown,
	_formData: FormData,
): Promise<AuthActionResult> {
	try {
		await signOut({ redirect: false });

		return {
			success: true,
			data: { redirectUrl: "/" },
			message: "ログアウトしました",
			redirectUrl: "/",
		};
	} catch (error) {
		console.error("Logout action failed:", error);
		return {
			success: false,
			error: {
				code: "LOGOUT_FAILED",
				message: "ログアウトに失敗しました",
			},
		};
	}
}

/**
 * リダイレクト付きログアウトAction
 *
 * ログアウト後に自動的にホームページにリダイレクトします
 */
export async function logoutWithRedirectAction(
	_prevState: unknown,
	_formData: FormData,
): Promise<AuthActionResult> {
	const result = await logoutAction(_prevState, _formData);

	// 成功時は自動的にリダイレクト
	if (result.success && result.redirectUrl) {
		redirect(result.redirectUrl);
	}

	return result;
}

/**
 * 認証状態確認用のServer Action
 *
 * クライアントサイドから認証状態を確認する際に使用
 */
export async function checkAuthAction(): Promise<AuthActionResult> {
	try {
		// 認証状態の確認ロジックをここに実装
		// 現在はシンプルな成功レスポンスを返す
		return {
			success: true,
			data: { redirectUrl: undefined },
			message: "認証状態を確認しました",
		};
	} catch (error) {
		console.error("Auth check failed:", error);
		return {
			success: false,
			error: {
				code: "AUTH_CHECK_FAILED",
				message: "認証状態の確認に失敗しました",
			},
		};
	}
}
