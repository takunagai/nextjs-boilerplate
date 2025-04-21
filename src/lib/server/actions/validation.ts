/**
 * サーバーアクション用バリデーションユーティリティ
 *
 * サーバーアクションの入力データをZodスキーマで検証するための
 * ユーティリティ関数と型定義を提供します。
 */

import { z } from "zod";

/**
 * サーバーアクションのエラーを表すカスタムエラークラス
 */
export class ActionError extends Error {
	code: string;
	details?: Record<string, unknown>;

	constructor(
		message: string,
		code: string,
		details?: Record<string, unknown>,
	) {
		super(message);
		this.name = "ActionError";
		this.code = code;
		this.details = details;
	}
}

/**
 * フィールドエラーの型定義
 */
export type FieldErrors = Record<string, string>;

/**
 * バリデーションエラーの詳細を生成する関数
 *
 * @param error - Zodのエラーオブジェクト
 * @returns フィールド名をキーとするエラーメッセージのオブジェクト
 */
export function formatZodErrors(error: z.ZodError): FieldErrors {
	return error.issues.reduce((acc, curr) => {
		const path = curr.path.join(".");
		acc[path] = curr.message;
		return acc;
	}, {} as FieldErrors);
}

/**
 * サーバーアクションの入力データをバリデーションする関数
 *
 * @param schema - zodスキーマ
 * @param data - バリデーション対象データ
 * @param options - バリデーションオプション
 * @returns バリデーション済みデータ
 */
export async function validateAction<T extends z.ZodType>(
	schema: T,
	data: unknown,
	options?: {
		errorMessage?: string; // カスタムエラーメッセージ
	},
): Promise<z.infer<T>> {
	try {
		return schema.parse(data);
	} catch (error) {
		if (error instanceof z.ZodError) {
			const fieldErrors = formatZodErrors(error);

			throw new ActionError(
				options?.errorMessage || "入力データが無効です",
				"VALIDATION_ERROR",
				{ fieldErrors },
			);
		}
		throw new ActionError("バリデーションエラー", "UNKNOWN_VALIDATION_ERROR");
	}
}

/**
 * 型安全なフォームスキーマを作成するためのヘルパー関数
 *
 * @param schema - Zodスキーマ
 * @returns 同じスキーマ（型推論のため）
 */
export function createFormSchema<T extends z.ZodType>(schema: T): T {
	return schema;
}

/**
 * フォームのデフォルト値を型安全に生成するヘルパー関数
 *
 * @param schema - Zodスキーマ
 * @param defaultValues - デフォルト値
 * @returns 型安全なデフォルト値
 */
export function formDefaults<T extends z.ZodType>(
	schema: T,
	defaultValues: Partial<z.infer<T>>,
): Partial<z.infer<T>> {
	return defaultValues;
}
