'use server';

/**
 * お問い合わせフォーム用サーバーアクション
 * 
 * お問い合わせフォームのデータを処理し、
 * メール送信、データベース保存などのサーバーサイド処理を行います。
 */

import { contactFormSchema, type ContactFormValues } from "@/lib/validation/contact-schema";
import { validateAction, safeAction, ActionError } from "@/lib/server";

/**
 * お問い合わせフォームを送信するサーバーアクション
 * 
 * @param formData - フォームデータ（未検証）
 * @returns 処理結果
 */
export async function submitContactForm(formData: unknown) {
  return safeAction(async () => {
    // 入力データのバリデーション
    const validData = await validateAction(contactFormSchema, formData);
    
    // ここで実際のメール送信処理やデータベース保存などを実装
    // 例: メール送信API呼び出しやデータベース操作
    
    // デモンストレーションのため、処理時間をシミュレーション
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("[Server Action] お問い合わせ受付:", validData);
    
    // 成功レスポンス
    return {
      message: "お問い合わせを受け付けました。3営業日以内に返信いたします。",
    };
  });
}

/**
 * メールアドレスの存在確認サーバーアクション
 * 
 * @param email - 確認するメールアドレス
 * @returns 確認結果
 */
export async function checkEmailExists(email: string) {
  return safeAction(async () => {
    // メールアドレスの形式チェック
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new ActionError(
        '有効なメールアドレスを入力してください',
        'VALIDATION_ERROR'
      );
    }
    
    // 実際のアプリケーションではデータベースやAPIを使って存在確認する
    // ここではデモ用に特定のドメインで確認
    const isRegistered = email?.endsWith('@example.com') || false;
    
    // 処理時間をシミュレーション
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      exists: isRegistered,
      message: isRegistered 
        ? 'このメールアドレスは既に登録されています'
        : 'このメールアドレスは使用可能です',
    };
  });
}
