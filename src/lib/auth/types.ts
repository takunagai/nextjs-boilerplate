/**
 * 認証システムの型定義
 * NextAuthの型拡張に使用する共通の型を定義
 */

// 認証システムでのユーザーロール
export type UserRole = "admin" | "user";

// ユーザー関連の共通属性を定義（基本必須フィールド）
export interface CommonUserAttributes {
	id?: string; // セッション時は必須、フォーム時は任意
	name?: string | null; // セッション依存で null の可能性
	email?: string | null; // セッション依存で null の可能性
	image?: string | null; // 任意：プロフィール画像URL
	role?: UserRole | null; // 任意：ユーザー権限
}

// プロフィール情報の基底型（任意フィールドのみ）
export interface OptionalProfileFields {
	displayName?: string | null; // 表示名（nameとは別）
	bio?: string | null; // 自己紹介
	location?: string | null; // 所在地
	website?: string | null; // ウェブサイトURL
}

// プライバシー設定（デフォルト値を持つ）
export interface PrivacySettings {
	emailVisible: boolean; // メールアドレス公開設定（デフォルト: false）
	profileVisible: boolean; // プロフィール公開設定（デフォルト: true）
}

// システム管理フィールド（自動設定）
export interface SystemFields {
	createdAt: Date; // 作成日時
	updatedAt: Date; // 更新日時
}

// 完全なプロフィール情報（実運用時の型）
export interface UserProfile
	extends CommonUserAttributes,
		OptionalProfileFields,
		Partial<PrivacySettings>,
		Partial<SystemFields> {
	// 型制約：displayNameが設定されている場合は空文字列不可
	displayName?: (string & { length: number }) | null;
}

// フォーム入力用の型（システムフィールドを除外）
export type UserProfileInput = CommonUserAttributes &
	OptionalProfileFields &
	PrivacySettings;

// データベースユーザーの型（パスワード含む）
export interface DBUser extends CommonUserAttributes {
	password: string;
}

// NextAuthのセッション内のユーザー型
export interface SessionUser extends CommonUserAttributes {}

// 安全なユーザー情報（パスワード除外）
export type SafeUser = Omit<DBUser, "password">;
