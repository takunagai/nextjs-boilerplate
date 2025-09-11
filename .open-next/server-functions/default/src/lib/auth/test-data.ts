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
			name: "一般ユーザー",
			email: "user@example.com",
			password: "password123", // 実際の実装ではハッシュ化すること
			role: "user",
		},
		{
			id: "2",
			name: "管理者ユーザー",
			email: "admin@example.com",
			password: "password123", // 実際の実装ではハッシュ化すること
			role: "admin",
		},
	];
};
