/**
 * サンプルAPIルート
 *
 * サーバーサイドユーティリティを使用したAPIルートの実装例です。
 */

import {
	validateRequest,
	successResponse,
	errorResponse,
	createApiError,
} from "@/lib/server";
import type { NextRequest } from "next/server";
import { z } from "zod";

// リクエストのバリデーションスキーマ
const MessageSchema = z.object({
	name: z.string().min(1, { message: "名前は必須です" }),
	message: z.string().optional(),
});

type MessageInput = z.infer<typeof MessageSchema>;

/**
 * GET リクエストハンドラ
 */
export async function GET() {
	try {
		// サンプルデータを返す
		const data = {
			message: "こんにちは！このAPIは正常に動作しています。",
			timestamp: new Date().toISOString(),
		};

		return successResponse(data);
	} catch (error) {
		console.error("GET リクエストエラー:", error);

		return errorResponse(
			createApiError.internal("リクエスト処理中にエラーが発生しました"),
		);
	}
}

/**
 * POST リクエストハンドラ
 */
export async function POST(request: NextRequest) {
	try {
		// リクエストボディをJSONとして解析
		const body = await request.json().catch(() => ({}));

		// 新しいvalidateRequestユーティリティを使用したバリデーション
		const validatedData = await validateRequest(MessageSchema, body);

		// 処理実行（例: データベースへの保存など）
		// ここではサンプルレスポンスを返す
		return successResponse({
			message: `こんにちは、${validatedData.name}さん！メッセージを受け取りました。`,
			receivedAt: new Date().toISOString(),
		});
	} catch (error) {
		console.error("POST リクエストエラー:", error);

		// validateRequestから投げられたエラーは自動的に処理
		if (error instanceof z.ZodError) {
			return errorResponse(
				createApiError.validation("入力データが無効です", {
					fieldErrors: error.issues.reduce(
						(acc: Record<string, string>, err: z.ZodIssue) => {
							const path = err.path.join(".");
							acc[path] = err.message;
							return acc;
						},
						{} as Record<string, string>,
					),
				}),
			);
		}

		// リクエスト本文のパース中にエラーが発生した場合
		if (error instanceof SyntaxError) {
			return errorResponse(
				createApiError.validation("無効なJSONフォーマットです"),
			);
		}

		// その他のエラー
		return errorResponse(
			createApiError.internal("リクエスト処理中にエラーが発生しました"),
		);
	}
}
