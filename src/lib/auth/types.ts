/**
 * 認証システムの型定義
 * NextAuthの型拡張に使用する共通の型を定義
 */

// ユーザー関連の共通属性を定義
export interface CommonUserAttributes {
	id?: string;
	name?: string | null;
	email?: string | null;
	image?: string | null;
	role?: string | null;
}

// データベースユーザーの型（パスワード含む）
export interface DBUser extends CommonUserAttributes {
	password: string;
}

// 認証システムでのユーザーロール
export type UserRole = "admin" | "user";

// NextAuthのセッション内のユーザー型
export interface SessionUser extends CommonUserAttributes {}

// 安全なユーザー情報（パスワード除外）
export type SafeUser = Omit<DBUser, "password">;
