import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { CommonUserAttributes, UserRole } from "./types";

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
	// 開発環境での信頼するホスト設定
	trustHost: true,
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
				session.user.role = token.role as UserRole;
			}
			return session;
		},
		// 認可チェック（特定のルートへのアクセス制御）
		authorized: ({ auth, request }) => {
			const isLoggedIn = !!auth?.user;
			const { pathname } = request.nextUrl;

			// 公開ページ（認証不要）
			const PUBLIC_PATHS = [
				"/",
				"/login", 
				"/register",
				"/about",
				"/services",
				"/contact",
				"/api/auth"
			];

			const isPublicPath = PUBLIC_PATHS.some(path => 
				pathname === path || pathname.startsWith(path)
			);

			// 保護されたページ（認証必要）
			const PROTECTED_PATHS = ["/profile", "/dashboard"];
			const isProtectedPath = PROTECTED_PATHS.some(path =>
				pathname.startsWith(path)
			);

			// 保護されたパスで未認証の場合はリダイレクト
			if (isProtectedPath && !isLoggedIn) {
				return false;
			}

			return true;
		},
	},
};

// Auth.jsの初期化
export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
