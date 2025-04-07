/**
 * 認証システムのエラー定義
 * エラーコードとメッセージの一元管理
 */

// 認証エラーコード定義
export const AUTH_ERROR_CODES = {
  // 認証関連エラー
  INVALID_CREDENTIALS: "auth/invalid-credentials",
  EMPTY_CREDENTIALS: "auth/empty-credentials",
  ACCOUNT_NOT_FOUND: "auth/account-not-found",
  
  // ネットワーク関連エラー
  NETWORK_ERROR: "auth/network-error",
  SERVER_ERROR: "auth/server-error",
  
  // その他のエラー
  UNKNOWN_ERROR: "auth/unknown-error",
} as const;

// 認証エラーコードの型
export type AuthErrorCode = typeof AUTH_ERROR_CODES[keyof typeof AUTH_ERROR_CODES];

// 認証結果の型
export interface AuthResult {
  success: boolean;
  error?: AuthErrorCode | string;
  message?: string;
}

/**
 * エラーコードに対応するユーザーフレンドリーなメッセージを取得
 * @param code エラーコードまたはエラーメッセージ
 * @param email メールアドレス（メッセージのカスタマイズに使用）
 * @param attempts 試行回数（メッセージのカスタマイズに使用）
 */
export const getAuthErrorMessage = (
  code: AuthErrorCode | string | undefined,
  email?: string,
  attempts = 0
): string => {
  // 詳細なエラーメッセージ（3回以上失敗した場合）
  const getDetailedErrorMessage = () => {
    if (!email) return "";
    
    return `
1. パスワードが正しいか確認
2. Caps Lockがオンになっていないか確認
3. ${email.includes("@") ? "登録済みのメールアドレスか確認" : "メールアドレスの形式が正しいか確認"}`;
  };
  
  // コードに応じたメッセージを返す
  switch (code) {
    case AUTH_ERROR_CODES.INVALID_CREDENTIALS:
      return attempts >= 2
        ? `認証に失敗しました。以下をお試しください：${getDetailedErrorMessage()}`
        : "メールアドレスまたはパスワードが正しくありません";
        
    case AUTH_ERROR_CODES.EMPTY_CREDENTIALS:
      return "メールアドレスとパスワードを入力してください";
      
    case AUTH_ERROR_CODES.ACCOUNT_NOT_FOUND:
      return "アカウントが見つかりません";
      
    case AUTH_ERROR_CODES.NETWORK_ERROR:
      return "サーバーに接続できません。インターネット接続を確認してください";
      
    case AUTH_ERROR_CODES.SERVER_ERROR:
      return "サーバーエラーが発生しました。時間をおいて再度お試しください";
      
    default:
      // NextAuthからのエラーメッセージをハンドリング
      if (typeof code === "string") {
        if (code.includes("CredentialsSignin")) {
          return attempts >= 2
            ? `認証に失敗しました。以下をお試しください：${getDetailedErrorMessage()}`
            : "メールアドレスまたはパスワードが正しくありません";
        }
        
        if (code.includes("fetch failed")) {
          return "サーバーに接続できません。インターネット接続を確認してください";
        }
      }
      
      return code || "ログインに失敗しました。認証情報を確認してください";
  }
};
