import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { CommonUserAttributes, DBUser } from "./types";

// NextAuth型拡張
declare module "next-auth" {
	// CommonUserAttributesを継承して型の重複を削減
	interface User extends CommonUserAttributes {}

	interface Session {
		user: CommonUserAttributes;
	}

	// JWT型拡張（Next-Auth v5ではnext-auth内に統合されています）
	interface JWT extends CommonUserAttributes {
		picture?: string | null; // NextAuth内部では 'picture' を使用
	}
}

/**
 * 認証基盤の中核設定
 */
export const authConfig: NextAuthConfig = {
	// セッションを JWT で管理
	session: {
		strategy: "jwt",
	},
	// カスタムログインページ設定
	pages: {
		signIn: "/login",
	},
	// 認証プロバイダー設定
	providers: [
		// メールとパスワードによる認証
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "メールアドレス", type: "email" },
				password: { label: "パスワード", type: "password" },
			},
			async authorize(credentials) {
				// 注意: これはデモ目的の仮実装です
				// 実際の実装ではデータベースでユーザーを検索・検証する必要があります

				// 入力チェック
				if (!credentials?.email || !credentials?.password) {
					return null;
				}

				// テストデータを別ファイルから取得
				const { getTestUsers } = await import("./test-data");
				const testUsers = getTestUsers();

				// メールアドレスとパスワードが一致するユーザーを検索
				const user = testUsers.find(
					(user) =>
						user.email === credentials.email &&
						user.password === credentials.password,
				);

				// ユーザーが見つからなければnullを返す（認証失敗）
				if (!user) {
					console.log(
						"認証失敗: ユーザーが見つからないかパスワードが一致しません",
					);
					return null;
				}

				// 認証成功: パスワードを除外したユーザー情報を返す
				const { password, ...userWithoutPassword } = user;
				console.log("認証成功:", userWithoutPassword);
				return userWithoutPassword;
			},
		}),
		// 追加のプロバイダーはここに設定可能
		// GoogleProvider({
		//   clientId: process.env.GOOGLE_CLIENT_ID!,
		//   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		// }),
	],
	callbacks: {
		// JWTトークンにユーザー情報を追加
		jwt: async ({ token, user }) => {
			if (user) {
				token.id = user.id;
				token.role = user.role;
			}
			return token;
		},
		// セッションにユーザー情報を追加
		session: async ({ session, token }) => {
			if (token && session.user) {
				session.user.id = token.id as string;
				session.user.role = token.role as string;
			}
			return session;
		},
		// 認可チェック（特定のルートへのアクセス制御）
		authorized: ({ auth, request }) => {
			// 現時点ではシンプルな認可チェックのみ実装
			// 後でmiddlewareで詳細な制御を行う
			const isLoggedIn = !!auth?.user;
			// 認証関連のパス（ルートグループを使わないため URL に直接現れる）
			const PUBLIC_AUTH_PATHS = ["/login", "/register"] as const;
			const isOnAuthPage = PUBLIC_AUTH_PATHS.some((p) =>
				request.nextUrl.pathname.startsWith(p),
			);

			if (!isLoggedIn && !isOnAuthPage) {
				return false; // 非認証ユーザーは認証ページ以外アクセス不可
			}

			return true;
		},
	},
};

// Auth.jsの初期化
export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
