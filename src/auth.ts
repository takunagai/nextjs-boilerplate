import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
// 他の認証プロバイダーをインポートすることもできる

// Auth.js v5の正しい設定
export const { handlers, signIn, signOut, auth } = NextAuth({
	debug: process.env.NODE_ENV === "development", // 開発環境ではデバッグ情報を表示
	providers: [
		GitHub({
			clientId: process.env.AUTH_GITHUB_ID ?? "",
			clientSecret: process.env.AUTH_GITHUB_SECRET ?? "",
		}),
	],
	// カスタムページを実装する場合は設定する
	// pages: {
	//   signIn: "/auth/signin",
	// },
	callbacks: {
		// 必要に応じてコールバックを追加
		async session({ session, token }) {
			// JWT からセッションに情報を渡す
			return session;
		},
		async jwt({ token, user }) {
			// ユーザーがログインするときに JWT に情報を追加
			if (user) {
				token.id = user.id;
			}
			return token;
		},
	},
});
