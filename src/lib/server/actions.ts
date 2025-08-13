"use server";

/**
 * Server Actions実行関数
 *
 * Next.js 15 Server Actionsの実行関数のみを含むファイルです。
 * ユーティリティ関数は action-utils.ts に分離されています。
 */

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import type {
	ActionOptions,
	ActionResult,
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
