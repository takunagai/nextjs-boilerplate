/**
 * APIリクエストのバリデーションユーティリティ
 * 
 * Zodを使用したAPIリクエストのバリデーションヘルパー関数を提供します。
 * サーバーアクションとAPIルートの両方で使用できます。
 */

import { createApiError } from './response';
import { z, type ZodSchema } from 'zod';

/**
 * リクエストデータをバリデーションするユーティリティ関数
 * 
 * @param schema Zodスキーマ
 * @param data バリデーション対象のデータ
 * @returns バリデーション済みのデータ
 * @throws バリデーションエラー時にはZodErrorをスロー
 */
export async function validateRequest<T>(
  schema: ZodSchema<T>,
  data: unknown
): Promise<T> {
  try {
    // スキーマによるバリデーション実行
    const result = schema.safeParse(data);
    
    if (!result.success) {
      // バリデーションエラーを生成
      throw result.error;
    }
    
    return result.data;
  } catch (error) {
    console.error('[API Validation Error]', error);
    throw error; // エラーを再スロー（呼び出し元で処理）
  }
}

/**
 * リクエストデータをバリデーションし、エラーをAPI形式で返すユーティリティ関数
 * 
 * @param schema Zodスキーマ
 * @param data バリデーション対象のデータ
 * @returns [バリデーション済みデータ, null] または [null, APIエラー]
 */
export async function validateRequestWithError<T>(
  schema: ZodSchema<T>,
  data: unknown
): Promise<[T, null] | [null, ReturnType<typeof createApiError.validation>]> {
  try {
    const validatedData = await validateRequest(schema, data);
    return [validatedData, null];
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      // Zodエラーの場合はフィールドエラーを抽出
      const fieldErrors = error.issues.reduce((acc: Record<string, string>, err: z.ZodIssue) => {
        const path = err.path.join('.');
        acc[path] = err.message;
        return acc;
      }, {});
      
      return [null, createApiError.validation('入力データが無効です', { fieldErrors })];
    }
    
    // その他のエラー
    return [null, createApiError.validation('バリデーションに失敗しました')];
  }
}
