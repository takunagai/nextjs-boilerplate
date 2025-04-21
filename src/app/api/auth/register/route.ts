import { createApiError, createApiResponse, errorResponse } from '@/lib/server/api/response';
import { z } from 'zod';
import type { NextRequest } from 'next/server';

// 登録リクエストの検証スキーマ
const registerSchema = z.object({
  name: z.string().min(1, { error: '氏名は必須です' }),
  email: z.string().email({ error: '有効なメールアドレスを入力してください' }),
  password: z.string().min(8, { error: 'パスワードは8文字以上で入力してください' }),
});

// 新規ユーザー登録API
export async function POST(req: NextRequest) {
  try {
    // リクエストボディの取得とバリデーション
    const body = await req.json();
    const validationResult = registerSchema.safeParse(body);

    // バリデーションエラーの場合
    if (!validationResult.success) {
      return errorResponse(createApiError.validation('入力データが無効です', {
        errors: validationResult.error.issues,
      }));
    }

    const { name, email, password } = validationResult.data;

    // メールアドレスの重複チェック（仮実装）
    // 実際の実装ではデータベースで確認する
    if (email === 'test@example.com') {
      return errorResponse(createApiError.custom('EMAIL_IN_USE', 'このメールアドレスは既に登録されています'));
    }

    // ユーザー登録処理
    // ここでデータベースへの保存処理を実装
    // 今回は仮実装のため、成功レスポンスを返すだけ
    console.log('新規ユーザー登録:', { name, email });

    // 登録成功レスポンス
    return createApiResponse({
      success: true,
      message: 'ユーザーが正常に登録されました',
      data: {
        name,
        email,
      },
    });
  } catch (error) {
    console.error('ユーザー登録エラー:', error);
    return errorResponse(createApiError.internal());
  }
}
