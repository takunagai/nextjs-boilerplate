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
const validateNoHtmlTags = (value: string | undefined, fieldName: string) => {
	if (!value || value.trim() === "") return true;
	const hasHtmlTags = /<[^>]*>/g.test(value);
	return !hasHtmlTags || `${fieldName}にHTMLタグを含めることはできません`;
};

const validateStringLength = (
	value: string | undefined,
	minLength: number,
	maxLength: number,
	fieldName: string,
) => {
	if (!value || value.trim() === "")
		return minLength === 0 || `${fieldName}を入力してください`;
	const trimmedLength = value.trim().length;
	if (trimmedLength < minLength || trimmedLength > maxLength) {
		if (minLength === 0) {
			return `${fieldName}は${maxLength}文字以内で入力してください`;
		}
		return `${fieldName}は${minLength}文字以上${maxLength}文字以内で入力してください`;
	}
	return true;
};

// 再利用可能なスキーマファクトリー
const createSafeTextSchema = (
	fieldName: string,
	minLength: number = 0,
	maxLength: number = 100,
	required: boolean = false,
) => {
	let schema = z.string().optional();

	if (required) {
		schema = z.string().min(1, { message: `${fieldName}を入力してください` });
	}

	return schema
		.refine((value) => validateNoHtmlTags(value, fieldName), {
			message: `${fieldName}にHTMLタグを含めることはできません`,
		})
		.refine(
			(value) => validateStringLength(value, minLength, maxLength, fieldName),
			{
				message:
					minLength === 0
						? `${fieldName}は${maxLength}文字以内で入力してください`
						: `${fieldName}は${minLength}文字以上${maxLength}文字以内で入力してください`,
			},
		);
};

// URL検証のためのカスタムスキーマ
const urlSchema = z
	.string()
	.optional()
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
	emailVisible: z.boolean().default(false),
	profileVisible: z.boolean().default(true),
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
	emailVisible: z.boolean(),
	profileVisible: z.boolean(),
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
			message: "正確な確認テキストを入力してください",
		}),
});

export type ProfileDeleteConfirmValues = z.infer<
	typeof profileDeleteConfirmSchema
>;
