'use server';

/**
 * お問い合わせフォームのサーバーアクション
 * 
 * サーバーサイドユーティリティを使用したサーバーアクションの実装例です。
 */

import { z } from 'zod';
import { 
  validateAction, 
  safeAction, 
  ActionError,
  createFormSchema
} from '@/lib/server';

// お問い合わせフォームのバリデーションスキーマ
export const ContactFormSchema = createFormSchema(
  z.object({
    name: z.string().min(1, '名前は必須です'),
    email: z.string().email('有効なメールアドレスを入力してください'),
    message: z.string().min(10, 'メッセージは10文字以上で入力してください'),
  })
);

// スキーマから型を生成（型の安全性を確保）
export type ContactFormValues = z.infer<typeof ContactFormSchema>;

/**
 * お問い合わせフォームを送信するサーバーアクション
 * 
 * @param formData - フォームデータ（未検証）
 * @returns 処理結果
 */
export async function submitContactForm(formData: unknown) {
  // safeAction関数でエラーハンドリングをラップ
  return safeAction(async () => {
    // 入力データのバリデーション
    const validatedData = await validateAction(ContactFormSchema, formData);
    
    // ここでメール送信やデータベースへの保存などの処理を実行
    // この例ではシミュレーションのため遅延を入れる
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('お問い合わせフォーム送信:', validatedData);
    
    // 成功レスポンス
    return {
      message: 'お問い合わせありがとうございます。内容を確認次第、ご連絡いたします。',
    };
  });
}

/**
 * メールアドレスの存在確認をシミュレートするサーバーアクション
 * 
 * @param email - 確認するメールアドレス
 * @returns 確認結果
 */
export async function checkEmailExists(email: string) {
  return safeAction(async () => {
    // メールアドレスの形式チェック
    if (!z.string().email().safeParse(email).success) {
      throw new ActionError(
        '有効なメールアドレスを入力してください',
        'VALIDATION_ERROR'
      );
    }
    
    // 実際のアプリケーションでは、データベースやAPIを使って存在確認を行う
    // ここではシミュレーションとして特定のドメインをチェック
    const isRegistered = email.endsWith('@example.com');
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      exists: isRegistered,
      message: isRegistered 
        ? 'このメールアドレスは既に登録されています'
        : 'このメールアドレスは使用可能です',
    };
  });
}
