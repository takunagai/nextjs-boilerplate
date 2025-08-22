import { z } from "zod";

/**
 * プロフィール編集フォームのバリデーションスキーマ
 *
 * セキュリティ考慮事項：
 * - XSS防止のための文字制限
 * - URL形式の厳密な検証
 * - 入力文字数の適切な制限
 * - HTMLタグの無害化
 */

// 共通バリデーションヘルパー関数
const validateNoHtmlTags = (value: string | undefined) => {
	if (!value || value.trim() === "") return true;
	// HTMLタグや不完全なHTMLタグを検出する（<文字を含む場合すべて拒否）
	return !value.includes("<");
};

// 再利用可能なスキーマファクトリー
const createSafeTextSchema = (
	fieldName: string,
	_minLength = 0,
	maxLength = 100,
	required = false,
) => {
	if (required) {
		// 必須の場合
		return z
			.string()
			.min(1, { message: getRequiredMessage(fieldName) })
			.max(maxLength, {
				message: `${fieldName}は${maxLength}文字以内で入力してください`,
			})
			.refine((value: string) => validateNoHtmlTags(value), {
				message: "HTMLタグを含めることはできません",
			});
	} else {
		// オプショナルの場合
		return z
			.string()
			.optional()
			.refine(
				(value: string | undefined) => {
					if (!value || value.trim() === "") return true;
					return value.length <= maxLength;
				},
				{
					message: `${fieldName}は${maxLength}文字以内で入力してください`,
				},
			)
			.refine((value: string | undefined) => validateNoHtmlTags(value), {
				message: "HTMLタグを含めることはできません",
			});
	}
};

// フィールドごとの必須メッセージ
const getRequiredMessage = (fieldName: string) => {
	switch (fieldName) {
		case "名前":
			return "名前は必須です";
		default:
			return `${fieldName}を入力してください`;
	}
};

// URL検証のためのカスタムスキーマ
const urlSchema = z
	.string()
	.optional()
	.refine(
		(url) => {
			if (!url || url.trim() === "") return true;
			return url.length <= 2048;
		},
		{
			message: "URLは2048文字以内で入力してください",
		},
	)
	.refine(
		(url) => {
			if (!url || url.trim() === "") return true;
			try {
				const parsed = new URL(url);
				// HTTPSまたはHTTPのみ許可
				return parsed.protocol === "https:" || parsed.protocol === "http:";
			} catch {
				return false;
			}
		},
		{
			message: "有効なURL（http://またはhttps://で始まる）を入力してください",
		},
	);

// ファクトリー関数を使用したスキーマ定義
const displayNameSchema = createSafeTextSchema("表示名", 0, 50);
const bioSchema = createSafeTextSchema("自己紹介", 0, 500);
const locationSchema = createSafeTextSchema("所在地", 0, 100);

// メインのプロフィール編集スキーマ
export const profileEditSchema = z.object({
	// 基本情報
	name: createSafeTextSchema("名前", 1, 50, true),

	email: z
		.string()
		.email({ message: "有効なメールアドレスを入力してください" }),

	displayName: displayNameSchema,

	bio: bioSchema,

	location: locationSchema,

	website: urlSchema,

	// プライバシー設定
	emailVisible: z.boolean().optional().default(false),
	profileVisible: z.boolean().optional().default(true),
});

// プロフィール更新用スキーマ（必須項目を部分的に変更）
export const profileUpdateSchema = z.object({
	// 基本情報（nameとemail以外はオプショナル）
	name: createSafeTextSchema("名前", 1, 50, true),

	displayName: displayNameSchema,
	bio: bioSchema,
	location: locationSchema,
	website: urlSchema,

	// プライバシー設定
	emailVisible: z.boolean().optional().default(false),
	profileVisible: z.boolean().optional().default(true),
});

// 型の生成
export type ProfileEditFormValues = z.infer<typeof profileEditSchema>;
export type ProfileUpdateFormValues = z.infer<typeof profileUpdateSchema>;

// プロフィール削除確認用のスキーマ
export const profileDeleteConfirmSchema = z.object({
	confirmText: z
		.string()
		.min(1, { message: "確認テキストを入力してください" })
		.refine((text) => text === "プロフィールを削除します", {
			message:
				"正確な確認テキストを入力してください: 'プロフィールを削除します'",
		}),
});

export type ProfileDeleteConfirmValues = z.infer<
	typeof profileDeleteConfirmSchema
>;
