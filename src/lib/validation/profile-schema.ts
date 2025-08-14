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
		}
	);

// 表示名のバリデーション
const displayNameSchema = z
	.string()
	.optional()
	.refine(
		(name) => {
			if (!name || name.trim() === "") return true;
			// HTMLタグの検出（基本的なXSS防止）
			const hasHtmlTags = /<[^>]*>/g.test(name);
			return !hasHtmlTags;
		},
		{
			message: "表示名にHTMLタグを含めることはできません",
		}
	)
	.refine(
		(name) => {
			if (!name || name.trim() === "") return true;
			return name.trim().length >= 1 && name.trim().length <= 50;
		},
		{
			message: "表示名は1文字以上50文字以内で入力してください",
		}
	);

// 自己紹介のバリデーション
const bioSchema = z
	.string()
	.optional()
	.refine(
		(bio) => {
			if (!bio || bio.trim() === "") return true;
			// HTMLタグの検出（基本的なXSS防止）
			const hasHtmlTags = /<[^>]*>/g.test(bio);
			return !hasHtmlTags;
		},
		{
			message: "自己紹介にHTMLタグを含めることはできません",
		}
	)
	.refine(
		(bio) => {
			if (!bio || bio.trim() === "") return true;
			return bio.trim().length <= 500;
		},
		{
			message: "自己紹介は500文字以内で入力してください",
		}
	);

// 所在地のバリデーション
const locationSchema = z
	.string()
	.optional()
	.refine(
		(location) => {
			if (!location || location.trim() === "") return true;
			// HTMLタグの検出
			const hasHtmlTags = /<[^>]*>/g.test(location);
			return !hasHtmlTags;
		},
		{
			message: "所在地にHTMLタグを含めることはできません",
		}
	)
	.refine(
		(location) => {
			if (!location || location.trim() === "") return true;
			return location.trim().length <= 100;
		},
		{
			message: "所在地は100文字以内で入力してください",
		}
	);

// メインのプロフィール編集スキーマ
export const profileEditSchema = z.object({
	// 基本情報
	name: z
		.string()
		.min(1, { message: "名前を入力してください" })
		.max(50, { message: "名前は50文字以内で入力してください" })
		.refine(
			(name) => {
				// HTMLタグの検出
				const hasHtmlTags = /<[^>]*>/g.test(name);
				return !hasHtmlTags;
			},
			{
				message: "名前にHTMLタグを含めることはできません",
			}
		),
	
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
	name: z
		.string()
		.min(1, { message: "名前を入力してください" })
		.max(50, { message: "名前は50文字以内で入力してください" })
		.refine(
			(name) => {
				const hasHtmlTags = /<[^>]*>/g.test(name);
				return !hasHtmlTags;
			},
			{
				message: "名前にHTMLタグを含めることはできません",
			}
		),
	
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
		.refine(
			(text) => text === "プロフィールを削除します",
			{
				message: "正確な確認テキストを入力してください",
			}
		),
});

export type ProfileDeleteConfirmValues = z.infer<typeof profileDeleteConfirmSchema>;