"use server";

/**
 * プロフィール管理のサーバーアクション
 *
 * セキュリティ考慮事項：
 * - 認証チェック（auth()による）
 * - 入力データのバリデーション（Zodスキーマ）
 * - CSRF保護（middlewareで実装済み）
 * - XSS防止（バリデーションスキーマで実装済み）
 *
 * パフォーマンス最適化：
 * - Revalidation によるキャッシュ無効化
 * - 適切なキャッシュタグ設定
 * - 認証チェックの統一化
 */

import { revalidatePath, revalidateTag } from "next/cache";
import { auth } from "@/lib/auth";
import {
	ActionError,
	createFormSchema,
	safeAction,
	validateAction,
} from "@/lib/server";
import {
	profileUpdateSchema,
	profileDeleteConfirmSchema,
	type ProfileUpdateFormValues,
} from "@/lib/validation/profile-schema";
import type { UserProfile } from "@/lib/auth/types";

// キャッシュタグ定数
const CACHE_TAGS = {
	PROFILE: (userId: string) => `profile-${userId}`,
	USER_PROFILES: "user-profiles",
} as const;

// 認証チェックヘルパー関数
async function requireAuth() {
	const session = await auth();
	if (!session?.user?.id) {
		throw new ActionError("認証が必要です", "AUTHENTICATION_ERROR");
	}
	return { ...session, user: { ...session.user, id: session.user.id } };
}

// フォーム用のスキーマ作成
const ProfileUpdateFormSchema = createFormSchema(profileUpdateSchema);
const ProfileDeleteFormSchema = createFormSchema(profileDeleteConfirmSchema);

/**
 * プロフィール情報を取得するサーバーアクション
 *
 * @returns プロフィール情報またはエラー
 */
export async function getProfile() {
	return safeAction(async () => {
		// 統一された認証チェック
		const session = await requireAuth();

		// 実際のアプリケーションでは、データベースからプロフィール情報を取得
		// ここではシミュレーションとして、セッション情報を基にモックデータを返す
		const profile: UserProfile = {
			id: session.user.id,
			name: session.user.name || "",
			email: session.user.email || "",
			image: session.user.image,
			role: session.user.role,

			// 拡張プロフィール情報（実際にはDBから取得）
			displayName: session.user.name || "",
			bio: "",
			location: "",
			website: "",
			emailVisible: false,
			profileVisible: true,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		return { profile };
	});
}

/**
 * プロフィール情報を更新するサーバーアクション
 *
 * @param formData - 更新するプロフィールデータ
 * @returns 更新結果
 */
export async function updateProfile(formData: unknown) {
	return safeAction(async () => {
		// 統一された認証チェック
		const session = await requireAuth();
		const userId = session.user.id;

		// 入力データのバリデーション
		const validatedData = await validateAction(
			ProfileUpdateFormSchema,
			formData,
		);

		// データのサニタイゼーション（追加の安全対策）
		const sanitizedData: ProfileUpdateFormValues = {
			name: (validatedData.name || "").trim(),
			displayName: validatedData.displayName?.trim() || undefined,
			bio: validatedData.bio?.trim() || undefined,
			location: validatedData.location?.trim() || undefined,
			website: validatedData.website?.trim() || undefined,
			emailVisible: validatedData.emailVisible,
			profileVisible: validatedData.profileVisible,
		};

		// 実際のアプリケーションでは、データベースのプロフィール情報を更新
		// ここではシミュレーションとして遅延を入れる
		await new Promise((resolve) => setTimeout(resolve, 1000));

		console.log("プロフィール更新:", {
			userId,
			data: sanitizedData,
		});

		// キャッシュの無効化（Next.js の revalidation）
		revalidateTag(CACHE_TAGS.PROFILE(userId));
		revalidateTag(CACHE_TAGS.USER_PROFILES);
		revalidatePath("/profile");
		revalidatePath("/(app)/profile", "page");

		// 成功レスポンス
		const updatedProfile: UserProfile = {
			...sanitizedData,
			id: userId,
			email: session.user.email,
			image: session.user.image,
			role: session.user.role,
			updatedAt: new Date(),
		};

		return {
			message: "プロフィールを更新しました",
			profile: updatedProfile,
		};
	});
}

/**
 * プロフィール画像をアップロードするサーバーアクション
 *
 * @param formData - アップロードファイルを含むFormData
 * @returns アップロード結果
 */
export async function uploadProfileImage(formData: FormData) {
	return safeAction(async () => {
		// 統一された認証チェック
		const session = await requireAuth();
		const userId = session.user.id;

		const file = formData.get("image") as File;
		if (!file) {
			throw new ActionError(
				"画像ファイルを選択してください",
				"VALIDATION_ERROR",
			);
		}

		// ファイル形式チェック
		const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
		if (!allowedTypes.includes(file.type)) {
			throw new ActionError(
				"JPEG、PNG、WebP形式の画像のみアップロード可能です",
				"VALIDATION_ERROR",
			);
		}

		// ファイルサイズチェック（5MB制限）
		const maxSize = 5 * 1024 * 1024; // 5MB
		if (file.size > maxSize) {
			throw new ActionError(
				"ファイルサイズは5MB以下にしてください",
				"VALIDATION_ERROR",
			);
		}

		// 実際のアプリケーションでは、クラウドストレージに画像をアップロード
		// ここではシミュレーションとして遅延を入れる
		await new Promise((resolve) => setTimeout(resolve, 2000));

		// シミュレーション用のURL（実際にはアップロード先のURL）
		const imageUrl = `/api/images/profile/${userId}`;

		console.log("プロフィール画像アップロード:", {
			userId,
			fileName: file.name,
			fileSize: file.size,
			fileType: file.type,
		});

		// キャッシュの無効化
		revalidateTag(CACHE_TAGS.PROFILE(userId));
		revalidatePath("/profile");
		revalidatePath("/(app)/profile", "page");

		return {
			message: "プロフィール画像をアップロードしました",
			imageUrl,
		};
	});
}

/**
 * メールアドレスの変更を要求するサーバーアクション
 *
 * @param newEmail - 新しいメールアドレス
 * @returns 変更要求結果
 */
export async function requestEmailChange(newEmail: string) {
	return safeAction(async () => {
		// 統一された認証チェック
		const session = await requireAuth();
		const userId = session.user.id;

		// メールアドレス形式チェック
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(newEmail)) {
			throw new ActionError(
				"有効なメールアドレスを入力してください",
				"VALIDATION_ERROR",
			);
		}

		// 現在のメールアドレスと同じかチェック
		if (newEmail === session.user.email) {
			throw new ActionError(
				"現在のメールアドレスと同じです",
				"VALIDATION_ERROR",
			);
		}

		// 実際のアプリケーションでは、確認メールを送信
		await new Promise((resolve) => setTimeout(resolve, 1500));

		console.log("メールアドレス変更要求:", {
			userId,
			oldEmail: session.user.email,
			newEmail,
		});

		return {
			message:
				"確認メールを送信しました。メール内のリンクから変更を完了してください。",
		};
	});
}

/**
 * プロフィールを削除するサーバーアクション
 *
 * @param formData - 削除確認データ
 * @returns 削除結果
 */
export async function deleteProfile(formData: unknown) {
	return safeAction(async () => {
		// 統一された認証チェック
		const session = await requireAuth();
		const userId = session.user.id;

		// 確認テキストのバリデーション
		const _validatedData = await validateAction(
			ProfileDeleteFormSchema,
			formData,
		);

		// 実際のアプリケーションでは、データベースからプロフィールを削除
		// 関連データ（投稿、コメントなど）の処理も必要
		await new Promise((resolve) => setTimeout(resolve, 2000));

		console.log("プロフィール削除:", {
			userId,
			deletedAt: new Date(),
		});

		// キャッシュの無効化（削除後なので広範囲に）
		revalidateTag(CACHE_TAGS.PROFILE(userId));
		revalidateTag(CACHE_TAGS.USER_PROFILES);
		revalidatePath("/", "layout"); // 全体的なキャッシュクリア

		return {
			message: "プロフィールを削除しました",
		};
	});
}
