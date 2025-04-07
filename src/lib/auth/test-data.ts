import type { DBUser } from "./types";

/**
 * テスト用のユーザーデータ
 * 開発環境でのみ使用し、本番環境では使用しないこと
 */
export const getTestUsers = (): DBUser[] => {
  // 本番環境では空の配列を返す（環境変数でオーバーライド可能）
  if (process.env.NODE_ENV === "production" && !process.env.ALLOW_TEST_USERS) {
    return [];
  }

  // テスト用ユーザーデータ
  return [
    {
      id: "1",
      name: "永井 拓也",
      email: "tak_na@icloud.com",
      password: "123456", // 実際の実装ではハッシュ化すること
      role: "admin",
    },
    {
      id: "2",
      name: "テストユーザー",
      email: "test@example.com",
      password: "123456", // 実際の実装ではハッシュ化すること
      role: "user",
    },
  ];
};
