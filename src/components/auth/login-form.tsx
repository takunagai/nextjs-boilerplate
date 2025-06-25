"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LoginFormError } from "@/components/auth/login-form-error";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useLoginForm } from "@/hooks/useLoginForm";

/**
 * ログインフォームコンポーネント
 * フォームUIの表示と入力処理を担当
 */
export function LoginForm() {
	const router = useRouter();
	const { isAuthenticated } = useAuth();
	const { form, isLoading, error, handleLogin, resetError } = useLoginForm();

	// フォームフィールドの状態取得
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = form;

	// 既に認証済みの場合はダッシュボードへリダイレクト
	useEffect(() => {
		if (isAuthenticated) {
			router.push("/dashboard");
		}
	}, [isAuthenticated, router]);

	// 入力時にエラーをリセット
	useEffect(() => {
		const subscription = form.watch(() => resetError());
		return () => subscription.unsubscribe();
	}, [form, resetError]);

	/**
	 * ログイン処理の実行
	 */
	const onSubmit = handleSubmit(async (data) => {
		const result = await handleLogin(data);

		if (result.success) {
			router.push("/dashboard");
		}
	});

	return (
		<Card className="mx-auto w-full max-w-md">
			<CardHeader className="space-y-1">
				<CardTitle className="text-lg font-bold">
					メールアドレスでログイン
				</CardTitle>
			</CardHeader>

			<form onSubmit={onSubmit}>
				<CardContent className="space-y-4">
					{/* サーバーからのエラーメッセージ */}
					{error && <LoginFormError error={error} />}

					{/* メールアドレス入力フィールド */}
					<div className="space-y-2">
						<Label htmlFor="email">メールアドレス</Label>
						<Input
							id="email"
							type="email"
							placeholder="your@email.com"
							autoComplete="email"
							disabled={isLoading}
							aria-describedby={errors.email ? "email-error" : undefined}
							aria-invalid={errors.email ? "true" : "false"}
							{...register("email")}
						/>
						{errors.email && (
							<p 
								className="text-sm text-destructive" 
								role="alert"
								aria-live="polite"
								id="email-error"
							>
								{errors.email.message}
							</p>
						)}
					</div>

					{/* パスワード入力フィールド */}
					<div className="space-y-2">
						<div className="flex items-center justify-between">
							<Label htmlFor="password">パスワード</Label>
							<button
								type="button"
								className="text-xs text-muted-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 rounded"
								aria-label="パスワードをリセットする"
								onClick={() => {
									// TODO: パスワードリセットページへのリンク
									alert("パスワードリセット機能は近日公開予定です");
								}}
							>
								パスワードをお忘れですか？
							</button>
						</div>
						<Input
							id="password"
							type="password"
							autoComplete="current-password"
							disabled={isLoading}
							aria-describedby={errors.password ? "password-error" : undefined}
							aria-invalid={errors.password ? "true" : "false"}
							{...register("password")}
						/>
						{errors.password && (
							<p 
								className="text-sm text-destructive"
								role="alert"
								aria-live="polite"
								id="password-error"
							>
								{errors.password.message}
							</p>
						)}
					</div>
				</CardContent>

				<CardFooter className="flex flex-col space-y-4">
					<Button type="submit" className="w-full" disabled={isLoading}>
						{isLoading ? "ログイン中..." : "ログイン"}
					</Button>

					<div className="text-center text-sm">
						アカウントをお持ちでないですか？{" "}
						<button
							type="button"
							className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 rounded"
							aria-label="新しいアカウントを作成する"
							onClick={() => {
								// TODO: 登録ページへのリンク
								alert("アカウント登録機能は近日公開予定です");
							}}
						>
							新規登録
						</button>
					</div>
				</CardFooter>
			</form>
		</Card>
	);
}
