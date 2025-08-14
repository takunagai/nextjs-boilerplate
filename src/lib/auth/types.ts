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

// プロフィール編集用の拡張ユーザー情報
export interface UserProfile extends CommonUserAttributes {
	// 基本情報
	displayName?: string | null; // 表示名（nameとは別）
	bio?: string | null; // 自己紹介
	location?: string | null; // 所在地
	website?: string | null; // ウェブサイトURL
	
	// 設定
	emailVisible?: boolean; // メールアドレス公開設定
	profileVisible?: boolean; // プロフィール公開設定
	
	// システム情報
	createdAt?: Date;
	updatedAt?: Date;
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
