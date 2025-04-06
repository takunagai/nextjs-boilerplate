/**
 * サーバーアクションのエラーハンドリングユーティリティ
 * 
 * サーバーアクションでエラーを安全に処理し、一貫した形式で
 * クライアントに返すためのユーティリティ関数を提供します。
 */

import { z } from 'zod';
import { ActionError, formatZodErrors } from './validation';

/**
 * サーバーアクションの結果型
 */
export type ActionResult<T> = {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
};

/**
 * サーバーアクションを安全に実行するラッパー関数
 * 
 * @param fn - 実行する非同期関数
 * @returns ActionResult
 */
export async function safeAction<T>(
  fn: () => Promise<T>
): Promise<ActionResult<T>> {
  try {
    const data = await fn();
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Action error:', error);
    
    if (error instanceof ActionError) {
      return {
        success: false,
        error: {
          code: error.code,
          message: error.message,
          details: error.details,
        },
      };
    }

    if (error instanceof z.ZodError) {
      const fieldErrors = formatZodErrors(error);

      return {
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: '入力データが無効です',
          details: { fieldErrors },
        },
      };
    }

    return {
      success: false,
      error: {
        code: 'UNKNOWN_ERROR',
        message: error instanceof Error ? error.message : '不明なエラーが発生しました',
      },
    };
  }
}

/**
 * 結果が成功しているかどうかをチェックするヘルパー関数
 * 
 * @param result - アクション結果
 * @returns 成功かどうか
 */
export function isActionSuccess<T>(
  result: ActionResult<T>
): result is ActionResult<T> & { success: true; data: T } {
  return result.success === true;
}

/**
 * 結果がエラーかどうかをチェックするヘルパー関数
 * 
 * @param result - アクション結果
 * @returns エラーかどうか
 */
export function isActionError<T>(
  result: ActionResult<T>
): result is ActionResult<T> & { success: false; error: NonNullable<ActionResult<T>['error']> } {
  return result.success === false;
}
