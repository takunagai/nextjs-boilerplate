/**
 * プロフィール編集フォームコンポーネント
 *
 * WCAG 2.1 AA準拠のアクセシビリティ機能：
 * - セマンティックHTML構造
 * - 適切なARIA属性
 * - キーボードナビゲーション対応
 * - Screen readerサポート
 * - フォーカス管理
 * - 色以外での情報伝達
 */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AccessibleInput } from "@/components/accessibility/form/accessible-input";
import { AccessibleTextarea } from "@/components/accessibility/form/accessible-textarea";
import { AccessibleCheckbox } from "@/components/accessibility/form/accessible-checkbox";
import { FormErrorDisplay } from "@/components/accessibility/screen-reader";
import { useFormSubmission } from "@/hooks/use-form-submission";
import { updateProfile, uploadProfileImage } from "@/app/actions/profile";
import {
	profileUpdateSchema,
	type ProfileUpdateFormValues,
} from "@/lib/validation/profile-schema";
import type { UserProfile } from "@/lib/auth/types";

export interface ProfileEditFormProps {
	/** 現在のプロフィール情報 */
	initialProfile: UserProfile;
}

/**
 * プロフィール編集フォーム
 */
export function ProfileEditForm({ initialProfile }: ProfileEditFormProps) {
	// React 19 Compiler で自動最適化されるため、useCallback/useMemo は不要
	// ただし、useState の初期化は最適化可能
	const [uploadState, setUploadState] = useState<{
		isUploading: boolean;
		imageUrl: string;
	}>({
		isUploading: false,
		imageUrl: initialProfile.image || "",
	});

	// フォーム管理
	const form = useForm<ProfileUpdateFormValues>({
		resolver: zodResolver(profileUpdateSchema),
		defaultValues: {
			name: initialProfile.name || "",
			displayName: initialProfile.displayName || "",
			bio: initialProfile.bio || "",
			location: initialProfile.location || "",
			website: initialProfile.website || "",
			emailVisible: initialProfile.emailVisible || false,
			profileVisible: initialProfile.profileVisible !== false, // デフォルトtrue
		},
	});

	// フォーム送信処理
	const {
		handleSubmit,
		isSubmitting: isLoading,
		submitError: error,
	} = useFormSubmission({
		form,
		submitFn: async (data) => {
			const result = await updateProfile(data);
			return result;
		},
		// 成功時の処理は useFormSubmission で自動処理される
	});

	// プロフィール画像アップロード処理
	const handleImageUpload = async (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const file = event.target.files?.[0];
		if (!file) return;

		setUploadState((prev) => ({ ...prev, isUploading: true }));
		try {
			const formData = new FormData();
			formData.append("image", file);

			const result = await uploadProfileImage(formData);
			if (result.success && result.data?.imageUrl) {
				setUploadState((prev) => ({
					...prev,
					imageUrl: result.data?.imageUrl || "",
					isUploading: false,
				}));
			} else {
				setUploadState((prev) => ({ ...prev, isUploading: false }));
			}
		} catch (error) {
			console.error("画像アップロードエラー:", error);
			setUploadState((prev) => ({ ...prev, isUploading: false }));
		}
	};

	return (
		<div className="space-y-6">
			{/* プロフィール画像セクション */}
			<Card>
				<CardHeader>
					<CardTitle>プロフィール画像</CardTitle>
					<CardDescription>
						あなたのプロフィール画像を設定できます。JPEG、PNG、WebP形式で5MB以下のファイルが使用できます。
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center gap-4">
						{/* 現在の画像表示 */}
						<div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary border-2 border-muted overflow-hidden">
							{uploadState.imageUrl ? (
								<Image
									src={uploadState.imageUrl}
									alt={`${initialProfile.name || "ユーザー"}のプロフィール画像`}
									width={80}
									height={80}
									className="h-full w-full object-cover"
								/>
							) : (
								<span className="text-2xl font-semibold">
									{initialProfile.name?.[0] || "U"}
								</span>
							)}
						</div>

						{/* アップロードボタン */}
						<div>
							<input
								type="file"
								id="profile-image-upload"
								accept="image/jpeg,image/png,image/webp"
								onChange={handleImageUpload}
								disabled={uploadState.isUploading}
								className="sr-only"
								aria-describedby="profile-image-description"
							/>
							<label
								htmlFor="profile-image-upload"
								className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
								aria-describedby="profile-image-description"
							>
								{uploadState.isUploading ? "アップロード中..." : "画像を選択"}
							</label>
							<p
								id="profile-image-description"
								className="mt-1 text-xs text-muted-foreground"
							>
								JPEG、PNG、WebP形式、5MB以下
							</p>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* プロフィール情報編集フォーム */}
			<Card>
				<CardHeader>
					<CardTitle>基本情報</CardTitle>
					<CardDescription>
						公開されるプロフィール情報を編集できます。
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="space-y-6"
					>
						{/* 統一されたエラー表示 */}
						<FormErrorDisplay error={error} />

						{/* 名前（必須） */}
						<AccessibleInput
							label="名前"
							description="他のユーザーに表示される名前です"
							required
							{...form.register("name")}
							error={form.formState.errors.name?.message}
						/>

						{/* 表示名（任意） */}
						<AccessibleInput
							label="表示名"
							description="名前とは別の表示名を設定できます（任意）"
							placeholder="例: ニックネーム"
							{...form.register("displayName")}
							error={form.formState.errors.displayName?.message}
						/>

						<Separator />

						{/* 自己紹介 */}
						<AccessibleTextarea
							label="自己紹介"
							description="あなたについて簡単に紹介してください（500文字以内）"
							placeholder="例: エンジニアとして働いています。趣味は読書と映画鑑賞です。"
							rows={4}
							{...form.register("bio")}
							error={form.formState.errors.bio?.message}
						/>

						{/* 所在地 */}
						<AccessibleInput
							label="所在地"
							description="お住まいの地域を入力してください（任意）"
							placeholder="例: 東京都"
							{...form.register("location")}
							error={form.formState.errors.location?.message}
						/>

						{/* ウェブサイト */}
						<AccessibleInput
							label="ウェブサイト"
							description="個人サイトやブログのURLを入力してください（任意）"
							placeholder="https://example.com"
							type="url"
							{...form.register("website")}
							error={form.formState.errors.website?.message}
						/>

						<Separator />

						{/* プライバシー設定 */}
						<fieldset className="space-y-4">
							<legend className="text-sm font-medium">プライバシー設定</legend>

							<AccessibleCheckbox
								label="メールアドレスを公開する"
								description="チェックすると、他のユーザーにメールアドレスが表示されます"
								{...form.register("emailVisible")}
							/>

							<AccessibleCheckbox
								label="プロフィールを公開する"
								description="チェックを外すと、プロフィールが非公開になります"
								{...form.register("profileVisible")}
							/>
						</fieldset>

						{/* 送信ボタン */}
						<div className="flex gap-3 pt-4">
							<Button
								type="submit"
								disabled={isLoading}
								aria-describedby={isLoading ? "submit-status" : undefined}
							>
								{isLoading ? "更新中..." : "プロフィールを更新"}
							</Button>

							<Button
								type="button"
								variant="outline"
								onClick={() => form.reset()}
								disabled={isLoading}
							>
								リセット
							</Button>
						</div>

						{/* 送信状態の読み上げ */}
						{isLoading && (
							<p id="submit-status" className="sr-only" aria-live="polite">
								プロフィールを更新しています
							</p>
						)}
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
