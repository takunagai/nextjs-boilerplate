"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { submitContactForm } from "@/app/actions/contact-form";
import { isActionError, isActionSuccess } from "@/lib/server";
import type { ContactFormValues } from "@/lib/validation/contact-schema";
import { contactFormSchema } from "@/lib/validation/contact-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

/**
 * メールでのお問い合わせフォームコンポーネント
 * フォームの入力、バリデーション、送信処理を管理
 */
export function ContactEmailForm() {
	// フォーム状態の初期化
	const form = useForm<ContactFormValues>({
		resolver: zodResolver(contactFormSchema),
		defaultValues: {
			name: "",
			email: "",
			phoneContact: "不可",
			message: "",
		},
	});

	// 電話連絡可否の値を監視
	const phoneContact = form.watch("phoneContact");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<{
		type: "success" | "error" | null;
		message: string;
	}>({ type: null, message: "" });

	/**
	 * フォーム送信処理
	 * @param values フォームの入力値
	 */
	async function onSubmit(values: ContactFormValues) {
		setIsSubmitting(true);
		setSubmitStatus({ type: null, message: "" });

		try {
			// サーバーアクションを呼び出す
			const result = await submitContactForm(values);

			if (isActionSuccess(result)) {
				// 送信成功
				form.reset();
				setSubmitStatus({
					type: "success",
					message: result.data.message,
				});
			} else if (isActionError(result)) {
				// エラー処理
				if (
					result.error.code === "VALIDATION_ERROR" &&
					result.error.details?.fieldErrors
				) {
					// バリデーションエラーをフォームに設定
					const fieldErrors = result.error.details.fieldErrors as Record<
						string,
						string
					>;
					for (const [field, message] of Object.entries(fieldErrors)) {
						form.setError(field as keyof ContactFormValues, { message });
					}
					setSubmitStatus({
						type: "error",
						message: "入力内容に問題があります。修正してください。",
					});
				} else {
					// その他のエラー
					setSubmitStatus({
						type: "error",
						message:
							result.error.message ||
							"送信に失敗しました。後ほど再度お試しください。",
					});
				}
			}
		} catch (error) {
			// 予期しないエラー
			console.error("お問い合わせ送信エラー:", error);
			setSubmitStatus({
				type: "error",
				message: "送信に失敗しました。後ほど再度お試しください。",
			});
		} finally {
			setIsSubmitting(false);
		}
	}

	/**
	 * フォームフィールドをレンダリングする
	 * @param name フィールド名
	 * @param label ラベル
	 * @param type 入力タイプ
	 * @param placeholder プレースホルダー
	 * @param description 説明
	 */
	const renderFormField = ({
		name,
		label,
		type,
		placeholder,
		description,
	}: {
		name: keyof Omit<ContactFormValues, "phoneContact" | "phone">;
		label: string;
		type?: string;
		placeholder?: string;
		description?: string;
	}) => (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>
						{label} <span className="text-destructive">*</span>
					</FormLabel>
					<FormControl>
						{type === "textarea" ? (
							<Textarea placeholder={placeholder} rows={6} {...field} />
						) : (
							<Input type={type} placeholder={placeholder} {...field} />
						)}
					</FormControl>
					{description && (
						<FormDescription className="text-xs">{description}</FormDescription>
					)}
					<FormMessage />
				</FormItem>
			)}
		/>
	);

	return (
		<Card>
			<CardHeader>
				<CardTitle>メールフォーム</CardTitle>
				<CardDescription>
					以下のフォームに必要事項をご入力の上、送信ボタンをクリックしてください。
					<br />
					<span className="text-destructive">*</span> は必須項目です
				</CardDescription>
			</CardHeader>
			<CardContent>
				{/* 送信状態メッセージ */}
				{submitStatus.type && (
					<div
						className={`mb-6 p-4 rounded-lg ${
							submitStatus.type === "success"
								? "bg-green-50 text-green-700 border border-green-200"
								: "bg-red-50 text-red-700 border border-red-200"
						}`}
					>
						{submitStatus.message}
					</div>
				)}

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						{renderFormField({
							name: "name",
							label: "お名前",
							placeholder: "山田 太郎",
						})}

						{renderFormField({
							name: "email",
							label: "メールアドレス",
							type: "email",
							placeholder: "example@example.com",
						})}

						{/* 電話連絡の可否 */}
						<FormField
							control={form.control}
							name="phoneContact"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										電話連絡の可否 <span className="text-destructive">*</span>
									</FormLabel>
									<FormControl>
										<RadioGroup
											onValueChange={field.onChange}
											defaultValue={field.value}
											className="flex gap-4"
										>
											<div className="flex items-center space-x-2">
												<RadioGroupItem value="可" id="phone-yes" />
												<Label htmlFor="phone-yes" className="cursor-pointer">
													可
												</Label>
											</div>
											<div className="flex items-center space-x-2">
												<RadioGroupItem value="不可" id="phone-no" />
												<Label htmlFor="phone-no" className="cursor-pointer">
													不可
												</Label>
											</div>
										</RadioGroup>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* 電話番号（条件付き表示） */}
						{phoneContact === "可" && (
							<FormField
								control={form.control}
								name="phone"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											電話番号 <span className="text-destructive">*</span>
										</FormLabel>
										<FormControl>
											<Input type="tel" placeholder="03-1234-5678" {...field} />
										</FormControl>
										<FormDescription className="text-xs">
											ハイフン（-）ありで入力してください
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}

						{renderFormField({
							name: "message",
							label: "お問い合わせ内容",
							type: "textarea",
							placeholder: "お問い合わせ内容をご記入ください",
						})}

						<div className="pt-4">
							<Button type="submit" className="w-full" disabled={isSubmitting}>
								{isSubmitting ? "送信中..." : "送信する"}
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
