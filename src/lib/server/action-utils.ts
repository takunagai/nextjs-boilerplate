/**
 * Server Actions用ユーティリティ関数
 *
 * "use server"を含まない純粋なユーティリティ関数集です。
 * Server Actionsから呼び出される各種ヘルパー関数を提供します。
 */

import { z } from "zod";
import type {
	ActionResult,
	FormServerActionHandler,
} from "@/lib/types/actions";

/**
 * 成功結果を作成するヘルパー
 */
export function createSuccessResult<T>(
	data: T,
	message?: string,
): ActionResult<T> {
	return {
		success: true,
		data,
		message,
	};
}

/**
 * エラー結果を作成するヘルパー
 */
export function createErrorResult(
	error: string,
	fieldErrors?: Record<string, string[]>,
): ActionResult<never> {
	return {
		success: false,
		error,
		fieldErrors,
	};
}

/**
 * 一般的なServer Actionエラーの作成ヘルパー
 */
export const createActionError = {
	/**
	 * バリデーションエラー
	 */
	validation: (
		message = "入力データが無効です",
		fieldErrors?: Record<string, string[]>,
	) => createErrorResult(message, fieldErrors),

	/**
	 * 認証エラー
	 */
	unauthorized: (message = "認証が必要です") => createErrorResult(message),

	/**
	 * 権限エラー
	 */
	forbidden: (message = "この操作を行う権限がありません") =>
		createErrorResult(message),

	/**
	 * リソースが見つからないエラー
	 */
	notFound: (message = "リソースが見つかりません") =>
		createErrorResult(message),

	/**
	 * サーバー内部エラー
	 */
	internal: (message = "内部サーバーエラーが発生しました") =>
		createErrorResult(message),

	/**
	 * カスタムエラー
	 */
	custom: (message: string, fieldErrors?: Record<string, string[]>) =>
		createErrorResult(message, fieldErrors),
};

/**
 * Zodスキーマを使用した型安全なServer Action作成ヘルパー
 *
 * @param schema - 入力データのZodスキーマ
 * @param handler - バリデーション済みデータを処理するハンドラー
 * @returns FormData用のServer Actionハンドラー
 */
export function createSafeAction<T extends z.ZodSchema, U>(
	schema: T,
	handler: (data: z.infer<T>) => Promise<U>,
): FormServerActionHandler<U> {
	return async (_prevState: unknown, formData: FormData) => {
		try {
			// FormDataから通常のオブジェクトに変換
			const rawData = Object.fromEntries(formData);

			// Zodスキーマでバリデーション
			const validatedData = schema.parse(rawData);

			// ハンドラー実行
			const result = await handler(validatedData);

			return {
				success: true,
				data: result,
				message: "処理が完了しました",
			};
		} catch (error) {
			// Zodバリデーションエラーの処理
			if (error instanceof z.ZodError) {
				return {
					success: false,
					error: "入力データが正しくありません",
					fieldErrors: error.flatten().fieldErrors,
				};
			}

			console.error("Safe action execution failed:", error);
			return {
				success: false,
				error:
					"システムエラーが発生しました。しばらくしてから再度お試しください。",
			};
		}
	};
}