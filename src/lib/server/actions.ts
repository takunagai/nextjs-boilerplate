"use server";

/**
 * 統合Server Actions基盤ユーティリティ
 *
 * Next.js 15 Server Actionsの型安全な実行とエラーハンドリングを提供します。
 * 既存のAPIレスポンス機能と並行して使用可能な設計です。
 */

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import type {
	ActionOptions,
	ActionResult,
	FormServerActionHandler,
	ServerActionHandler,
} from "@/lib/types/actions";

/**
 * Server Actionの安全な実行ヘルパー
 *
 * @param handler - 実行するServer Actionハンドラー
 * @param input - ハンドラーに渡す入力データ
 * @param options - 実行オプション（revalidation、redirectなど）
 * @returns 型安全なActionResult
 */
export async function executeServerAction<TInput, TOutput>(
	handler: ServerActionHandler<TInput, TOutput>,
	input: TInput,
	options?: ActionOptions,
): Promise<ActionResult<TOutput>> {
	try {
		const result = await handler(input, options);

		// 成功時の後処理
		if (result.success && options) {
			if (options.revalidatePath) {
				revalidatePath(options.revalidatePath);
			}
			if (options.revalidateTag) {
				revalidateTag(options.revalidateTag);
			}
			if (options.redirect) {
				redirect(options.redirect);
			}
		}

		return result;
	} catch (error) {
		console.error("Server Action execution failed:", error);
		return {
			success: false,
			error:
				"システムエラーが発生しました。しばらくしてから再度お試しください。",
		};
	}
}

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
