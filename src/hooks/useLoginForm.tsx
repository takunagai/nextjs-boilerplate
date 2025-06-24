"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "@/hooks/useAuth";

// ログインフォームのバリデーションスキーマ
const loginFormSchema = z.object({
	email: z
		.string()
		.min(1, "メールアドレスは必須です")
		.email("有効なメールアドレスを入力してください"),
	password: z.string().min(1, "パスワードは必須です"),
});

// ログインフォームの入力値の型
export type LoginFormInputs = z.infer<typeof loginFormSchema>;

/**
 * ログインフォームのロジックを管理するカスタムフック
 */
export function useLoginForm() {
	// フォーム状態管理
	const form = useForm<LoginFormInputs>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	// 認証フック
	const { login } = useAuth();

	// ローディング状態
	const [isLoading, setIsLoading] = useState(false);

	// エラーメッセージ
	const [error, setError] = useState<string | undefined>();

	// ログイン試行回数
	const [attempts, setAttempts] = useState(0);

	/**
	 * ログイン処理を実行する関数
	 * @param data フォームの入力値
	 */
	const handleLogin = async (data: LoginFormInputs) => {
		setIsLoading(true);
		setError(undefined);

		try {
			// 現在の試行回数を増加
			const currentAttempts = attempts + 1;
			setAttempts(currentAttempts);

			// ログイン処理の実行
			const result = await login({
				email: data.email,
				password: data.password,
			});

			// エラー処理
			if (!result.success) {
				setError(result.message);
			}

			return result;
		} catch (err) {
			console.error("ログイン処理エラー:", err);
			setError(
				"ログイン処理中にエラーが発生しました。時間をおいて再度お試しください。",
			);
			return { success: false, error: "unexpected-error" };
		} finally {
			setIsLoading(false);
		}
	};

	return {
		form,
		isLoading,
		error,
		attempts,
		handleLogin,
		resetError: () => setError(undefined),
	};
}
