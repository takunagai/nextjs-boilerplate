/**
 * APIレスポンスヘルパー
 *
 * Next.jsのAPIルートで使用する標準化されたレスポンス形式を提供します。
 * 一貫したAPIレスポンス形式とエラーハンドリングにより、
 * クライアント側での処理が容易になります。
 */

import { NextResponse } from "next/server";

/**
 * APIエラーの型定義
 */
export type ApiError = {
	code: string; // エラーコード
	message: string; // エラーメッセージ
	details?: Record<string, unknown>; // 追加のエラー詳細（任意）
};

/**
 * API応答の標準形式
 */
export type ApiResponse<T> = {
	success: boolean; // 成功/失敗を示すフラグ
	data?: T; // 成功時のレスポンスデータ
	error?: ApiError; // エラー情報（エラー時のみ）
};

/**
 * 標準化されたAPIレスポンスを生成する関数
 *
 * @param data - レスポンスデータ（成功時）
 * @param options - レスポンスオプション
 * @returns NextResponse
 */
export function apiResponse<T>(
	data?: T,
	options?: {
		status?: number; // HTTPステータスコード
		error?: ApiError; // エラー情報
		headers?: HeadersInit; // レスポンスヘッダー
	},
) {
	const status = options?.error
		? options.status || 400
		: options?.status || 200;
	const body: ApiResponse<T> = {
		success: !options?.error,
		data: options?.error ? undefined : data,
		error: options?.error,
	};

	return NextResponse.json(body, {
		status,
		headers: options?.headers,
	});
}

/**
 * 成功レスポンスを生成する関数
 *
 * @param data - レスポンスデータ
 * @param options - レスポンスオプション
 * @returns NextResponse
 */
export function successResponse<T>(
	data: T,
	options?: {
		status?: number; // HTTPステータスコード（デフォルト: 200）
		headers?: HeadersInit; // レスポンスヘッダー
	},
) {
	return apiResponse<T>(data, {
		status: options?.status || 200,
		headers: options?.headers,
	});
}

/**
 * エラーレスポンスを生成する関数
 *
 * @param error - エラー情報
 * @param options - レスポンスオプション
 * @returns NextResponse
 */
export function errorResponse(
	error: ApiError,
	options?: {
		status?: number; // HTTPステータスコード（デフォルト: 400）
		headers?: HeadersInit; // レスポンスヘッダー
	},
) {
	return apiResponse(undefined, {
		error,
		status: options?.status || 400,
		headers: options?.headers,
	});
}

/**
 * 成功レスポンスを簡単に作成するためのヘルパー関数
 *
 * @param options - 成功レスポンスのオプション
 * @returns NextResponse
 */
export function createApiResponse<T>(options: {
	success: boolean;
	message?: string;
	data?: T;
	status?: number;
	headers?: HeadersInit;
}) {
	const { success, message, data, status, headers } = options;

	const responseBody = {
		success,
		message,
		data,
	};

	return NextResponse.json(responseBody, {
		status: status || (success ? 200 : 400),
		headers,
	});
}

/**
 * 一般的なエラーレスポンスの作成ヘルパー関数
 */
export const createApiError = {
	/**
	 * バリデーションエラー
	 */
	validation: (
		message = "入力データが無効です",
		details?: Record<string, unknown>,
	): ApiError => ({
		code: "VALIDATION_ERROR",
		message,
		details,
	}),

	/**
	 * 認証エラー
	 */
	unauthorized: (message = "認証が必要です"): ApiError => ({
		code: "UNAUTHORIZED",
		message,
	}),

	/**
	 * 権限エラー
	 */
	forbidden: (message = "この操作を行う権限がありません"): ApiError => ({
		code: "FORBIDDEN",
		message,
	}),

	/**
	 * リソースが見つからないエラー
	 */
	notFound: (message = "リソースが見つかりません"): ApiError => ({
		code: "NOT_FOUND",
		message,
	}),

	/**
	 * サーバー内部エラー
	 */
	internal: (message = "内部サーバーエラーが発生しました"): ApiError => ({
		code: "INTERNAL_SERVER_ERROR",
		message,
	}),

	/**
	 * カスタムエラー
	 */
	custom: (
		code: string,
		message: string,
		details?: Record<string, unknown>,
	): ApiError => ({
		code,
		message,
		details,
	}),
};
