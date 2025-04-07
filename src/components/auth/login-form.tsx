"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaCircleExclamation } from "react-icons/fa6";
import { toast } from "sonner";
import { z } from "zod";

// ログインフォームのバリデーションスキーマ
const loginSchema = z.object({
	email: z.string().email("有効なメールアドレスを入力してください"),
	password: z.string().min(6, "パスワードは6文字以上で入力してください"),
});

// フォーム入力の型定義
type LoginFormInputs = z.infer<typeof loginSchema>;

/**
 * ログインフォームコンポーネント
 * クライアントコンポーネント
 */
export function LoginForm() {
	const router = useRouter();
	const { login } = useAuth();
	const [isLoading, setIsLoading] = useState(false);
	const [loginError, setLoginError] = useState<string | null>(null);
	const [attempts, setAttempts] = useState(0);

	// フォームの初期化
	const form = useForm<LoginFormInputs>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	// フォーム送信ハンドラ
	const onSubmit = async (data: LoginFormInputs) => {
		setIsLoading(true);
		setLoginError(null);

		try {
			const result = await login({
				email: data.email,
				password: data.password,
			});

			if (result.success) {
				toast.success("ログインに成功しました");
				router.push("/dashboard");
				router.refresh();
			} else {
				// エラー回数をカウント
				setAttempts((prev) => prev + 1);

				// エラーメッセージを設定
				const errorMessage = getErrorMessage(result.error, data.email);
				setLoginError(errorMessage);
				toast.error(errorMessage);

				// パスワードフィールドをクリア
				form.setValue("password", "");
			}
		} catch (error) {
			console.error("ログインエラー:", error);
			setLoginError(
				"ログイン処理中に予期せぬエラーが発生しました。時間をおいて再度お試しください。",
			);
			toast.error("ログイン処理中にエラーが発生しました");
		} finally {
			setIsLoading(false);
		}
	};

	// エラーメッセージをユーザーフレンドリーに変換する関数
	const getErrorMessage = (
		error: string | undefined,
		email: string,
	): string => {
		if (error?.includes("CredentialsSignin")) {
			return attempts >= 2
				? `認証に失敗しました。以下をお試しください：
           1. パスワードが正しいか確認
           2. Caps Lockがオンになっていないか確認
           3. ${email.includes("@") ? "登録済みのメールアドレスか確認" : "メールアドレスの形式が正しいか確認"}`
				: "メールアドレスまたはパスワードが正しくありません";
		}

		if (error?.includes("fetch failed")) {
			return "サーバーに接続できません。インターネット接続を確認してください。";
		}

		return error || "ログインに失敗しました。認証情報を確認してください。";
	};

	// ヘルプメッセージの表示条件
	const showHelpMessage = attempts >= 3;

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				{loginError && (
					<Alert variant="destructive" className="animate-in fade-in-50">
						<FaCircleExclamation className="h-4 w-4" />
						<AlertTitle>ログインエラー</AlertTitle>
						<AlertDescription className="whitespace-pre-line text-sm">
							{loginError}
						</AlertDescription>
					</Alert>
				)}

				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>メールアドレス</FormLabel>
							<FormControl>
								<Input
									placeholder="example@example.com"
									disabled={isLoading}
									autoComplete="email"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>パスワード</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder="******"
									disabled={isLoading}
									autoComplete="current-password"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{showHelpMessage && (
					<Alert className="bg-muted">
						<AlertTitle>ログインのヒント</AlertTitle>
						<AlertDescription className="text-xs">
							テストアカウント：
							<br />
							Email: test@example.com
							<br />
							Password: 123456
						</AlertDescription>
					</Alert>
				)}

				<div className="flex items-center justify-between">
					<Link
						href="/auth/forgot-password"
						className="text-sm text-muted-foreground hover:text-primary"
					>
						パスワードをお忘れですか？
					</Link>
				</div>
				<Button type="submit" disabled={isLoading} className="w-full">
					{isLoading ? "処理中..." : "ログイン"}
				</Button>
				<div className="text-center text-sm">
					アカウントをお持ちでないですか？{" "}
					<Link
						href="/auth/register"
						className="font-medium text-primary hover:underline"
					>
						新規登録
					</Link>
				</div>
			</form>
		</Form>
	);
}
