'use server';

/**
 * フォームサンプル用サーバーアクション
 * 
 * サーバーサイドユーティリティを使用したサンプルフォーム処理の実装例です。
 */

import { 
  validateAction,
  ActionError,
  type ActionResult
} from '@/lib/server';
import { formExampleSchema, type FormExampleValues } from '@/lib/validation/form-example-schema';

/**
 * 成功レスポンスを生成する関数
 */
function createSuccessResult<T>(data: T): ActionResult<T> {
  return {
    success: true,
    data
  };
}

/**
 * エラーレスポンスを生成する関数
 */
function createErrorResult<T>(
  message: string, 
  details?: Record<string, unknown>
): ActionResult<T> {
  return {
    success: false,
    error: {
      code: 'FORM_ERROR',
      message,
      details
    }
  };
}

/**
 * サンプルフォーム送信処理のサーバーアクション
 * 
 * @param formData フォームデータ
 * @returns 処理結果
 */
export async function submitExampleForm(
  formData: FormExampleValues
): Promise<ActionResult<{ message: string }>> {
  try {
    // バリデーション
    const validatedData = await validateAction(formExampleSchema, formData);
    
    // 処理時間のシミュレーション（実際の実装では削除）
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // TODO: ここで実際のデータ処理を行う（例: DB保存、メール送信など）
    console.log('サーバーアクションでの処理:', validatedData);
    
    // 成功レスポンス
    return createSuccessResult({
      message: 'フォームが正常に送信されました。',
    });
  } catch (error) {
    // エラーハンドリング
    console.error('サンプルフォーム送信エラー:', error);
    
    if (error instanceof ActionError && error.code === 'VALIDATION_ERROR') {
      return createErrorResult('入力内容を確認してください', error.details);
    }
    
    if (error instanceof Error) {
      return createErrorResult('フォーム送信に失敗しました');
    }
    
    return createErrorResult('予期しないエラーが発生しました');
  }
}

/**
 * メールアドレスの存在確認（サンプル）
 * 
 * @param email メールアドレス
 * @returns メールアドレスの存在確認結果
 */
export async function checkExampleEmail(
  email: string
): Promise<ActionResult<{ exists: boolean }>> {
  try {
    // メールアドレスフォーマットの簡易チェック
    if (!email || !email.includes('@')) {
      return createErrorResult('有効なメールアドレスを入力してください');
    }
    
    // 処理時間のシミュレーション（実際の実装では削除）
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // サンプル実装: example.com ドメインのメールアドレスは「既に存在する」とみなす
    const exists = email.endsWith('@example.com');
    
    return createSuccessResult({
      exists,
    });
  } catch (error) {
    console.error('メールアドレス確認エラー:', error);
    return createErrorResult('メールアドレスの確認中にエラーが発生しました');
  }
}
