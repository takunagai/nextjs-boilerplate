/**
 * プロフィール危険操作ゾーンコンポーネント
 * 
 * アカウント削除など、取り返しのつかない操作を扱うコンポーネント
 * WCAG 2.1 AA準拠のアクセシビリティ機能を実装
 */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AccessibleInput } from "@/components/accessibility/form/accessible-input";
import { useFormSubmission } from "@/hooks/use-form-submission";
import { deleteProfile, requestEmailChange } from "@/app/actions/profile";
import { profileDeleteConfirmSchema, type ProfileDeleteConfirmValues } from "@/lib/validation/profile-schema";

export interface ProfileDangerZoneProps {
	/** 現在のユーザーのメールアドレス */
	userEmail?: string | null;
}

/**
 * プロフィールの危険操作ゾーン
 */
export function ProfileDangerZone({ userEmail }: ProfileDangerZoneProps) {
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const [isEmailChangeDialogOpen, setIsEmailChangeDialogOpen] = useState(false);
	const [newEmail, setNewEmail] = useState("");
	const router = useRouter();

	// 削除確認フォーム
	const deleteForm = useForm<ProfileDeleteConfirmValues>({
		resolver: zodResolver(profileDeleteConfirmSchema),
		defaultValues: {
			confirmText: "",
		},
	});

	// プロフィール削除処理
	const { handleSubmit: handleDeleteSubmit, isSubmitting: isDeleting, submitError: deleteError } = useFormSubmission({
		form: deleteForm,
		submitFn: async (data) => {
			const result = await deleteProfile(data);
			if (result.success) {
				// 削除成功時はログアウトしてホームページにリダイレクト
				await signOut({ callbackUrl: "/" });
			}
			return result;
		},
	});

	// メールアドレス変更要求処理
	const handleEmailChange = async () => {
		if (!newEmail.trim()) return;

		try {
			const result = await requestEmailChange(newEmail);
			if (result.success) {
				setIsEmailChangeDialogOpen(false);
				setNewEmail("");
				// 成功メッセージは result.data.message に含まれる
			}
		} catch (error) {
			console.error("メールアドレス変更エラー:", error);
		}
	};

	return (
		<Card className="border-destructive/20">
			<CardHeader>
				<CardTitle className="text-destructive">危険操作</CardTitle>
				<CardDescription>
					以下の操作は取り返しがつきません。慎重に行ってください。
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				
				{/* メールアドレス変更 */}
				<div className="space-y-2">
					<h3 className="text-sm font-medium">メールアドレス変更</h3>
					<p className="text-sm text-muted-foreground">
						現在: {userEmail || "未設定"}
					</p>
					<Dialog open={isEmailChangeDialogOpen} onOpenChange={setIsEmailChangeDialogOpen}>
						<DialogTrigger asChild>
							<Button variant="outline" size="sm">
								メールアドレスを変更
							</Button>
						</DialogTrigger>
						<DialogContent aria-describedby="email-change-description">
							<DialogHeader>
								<DialogTitle>メールアドレス変更</DialogTitle>
								<DialogDescription id="email-change-description">
									新しいメールアドレスを入力してください。確認メールが送信されます。
								</DialogDescription>
							</DialogHeader>
							<div className="space-y-4">
								<AccessibleInput
									label="新しいメールアドレス"
									type="email"
									value={newEmail}
									onChange={(e) => setNewEmail(e.target.value)}
									placeholder="new@example.com"
									required
								/>
							</div>
							<DialogFooter>
								<Button 
									variant="outline" 
									onClick={() => setIsEmailChangeDialogOpen(false)}
								>
									キャンセル
								</Button>
								<Button onClick={handleEmailChange} disabled={!newEmail.trim()}>
									確認メールを送信
								</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>

				{/* アカウント削除 */}
				<div className="space-y-2">
					<h3 className="text-sm font-medium text-destructive">アカウント削除</h3>
					<p className="text-sm text-muted-foreground">
						アカウントを削除すると、すべてのデータが永久に失われます。この操作は取り消せません。
					</p>
					
					<Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
						<DialogTrigger asChild>
							<Button variant="destructive" size="sm">
								アカウントを削除
							</Button>
						</DialogTrigger>
						<DialogContent 
							className="sm:max-w-md"
							aria-describedby="delete-account-description"
						>
							<DialogHeader>
								<DialogTitle className="text-destructive">
									アカウント削除の確認
								</DialogTitle>
								<DialogDescription id="delete-account-description">
									この操作は取り返しがつきません。すべてのデータが永久に削除されます。
									続行するには「プロフィールを削除します」と正確に入力してください。
								</DialogDescription>
							</DialogHeader>

							<form onSubmit={deleteForm.handleSubmit(handleDeleteSubmit)} className="space-y-4">
								{/* エラー表示 */}
								{deleteError && (
									<div 
										role="alert" 
										className="p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive"
										aria-live="polite"
									>
										<p className="text-sm">{deleteError}</p>
									</div>
								)}

								<AccessibleInput
									label="確認テキスト"
									description="「プロフィールを削除します」と正確に入力してください"
									placeholder="プロフィールを削除します"
									required
									{...deleteForm.register("confirmText")}
									error={deleteForm.formState.errors.confirmText?.message}
								/>

								<DialogFooter className="flex gap-2">
									<Button 
										type="button"
										variant="outline" 
										onClick={() => setIsDeleteDialogOpen(false)}
										disabled={isDeleting}
									>
										キャンセル
									</Button>
									<Button 
										type="submit"
										variant="destructive" 
										disabled={isDeleting}
										aria-describedby={isDeleting ? "delete-status" : undefined}
									>
										{isDeleting ? "削除中..." : "削除を実行"}
									</Button>
								</DialogFooter>

								{/* 削除状態の読み上げ */}
								{isDeleting && (
									<p id="delete-status" className="sr-only" aria-live="polite">
										アカウントを削除しています
									</p>
								)}
							</form>
						</DialogContent>
					</Dialog>
				</div>
			</CardContent>
		</Card>
	);
}
