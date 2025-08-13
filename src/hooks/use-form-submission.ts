/**
 * フォーム送信処理の共通化フック
 */
import { useState } from "react";
import type { FieldErrors, FieldValues, Path, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

import { UI_FORM } from "@/lib/constants/ui";

// 送信結果の型定義
export interface SubmissionResult<T = unknown> {
	success: boolean;
	data?: T;
	error?: {
		message: string;
		code?: string;
		details?: {
			fieldErrors?: Record<string, string>;
		};
	};
}

// 成功時の結果型
export interface SuccessResult<T = unknown> extends SubmissionResult<T> {
	success: true;
	data?: T;
	error?: never;
}

// エラー時の結果型
export interface ErrorResult extends SubmissionResult<never> {
	success: false;
	data?: never;
	error: {
		message: string;
		code?: string;
		details?: {
			fieldErrors?: Record<string, string>;
		};
	};
}

// エラー処理オプションの型定義
export interface ErrorHandlingOptions {
	/** フィールドエラーをフォームに自動設定するか */
	autoSetFieldErrors?: boolean;
	/** エラートーストを自動表示するか */
	showErrorToast?: boolean;
	/** カスタムエラーメッセージ */
	customErrorMessage?: string;
}

// 成功処理オプションの型定義
export interface SuccessHandlingOptions {
	/** フォームを自動リセットするか */
	autoResetForm?: boolean;
	/** 成功トーストを自動表示するか */
	showSuccessToast?: boolean;
	/** カスタム成功メッセージ */
	customSuccessMessage?: string;
	/** 成功時のリダイレクト先 */
	redirectTo?: string;
}

// フック設定オプションの型定義
export interface UseFormSubmissionOptions<TFormData extends FieldValues> {
	/** React Hook Form のフォームオブジェクト */
	form: UseFormReturn<TFormData>;
	/** 送信処理関数 */
	submitFn: (data: TFormData) => Promise<SubmissionResult>;
	/** エラー処理オプション */
	errorHandling?: ErrorHandlingOptions;
	/** 成功処理オプション */
	successHandling?: SuccessHandlingOptions;
	/** 送信前の前処理 */
	onBeforeSubmit?: (data: TFormData) => void | Promise<void>;
	/** 送信後の後処理 */
	onAfterSubmit?: (result: SubmissionResult, data: TFormData) => void | Promise<void>;
}

// フックの戻り値の型定義
export interface UseFormSubmissionReturn<TFormData extends FieldValues> {
	/** 送信中かどうか */
	isSubmitting: boolean;
	/** 送信エラー */
	submitError: string | null;
	/** 送信状態（成功/エラー/null） */
	submitStatus: {
		type: "success" | "error" | null;
		message: string;
	};
	/** 送信処理を実行 */
	handleSubmit: (data: TFormData) => Promise<SubmissionResult>;
	/** エラー状態をリセット */
	resetError: () => void;
	/** 送信状態をリセット */
	resetStatus: () => void;
}

/**
 * フォーム送信処理の共通化フック
 * 
 * @example
 * ```tsx
 * const { isSubmitting, submitError, handleSubmit } = useFormSubmission({
 *   form,
 *   submitFn: async (data) => {
 *     const response = await fetch('/api/contact', {
 *       method: 'POST',
 *       body: JSON.stringify(data),
 *     });
 *     return { success: response.ok };
 *   },
 *   successHandling: {
 *     autoResetForm: true,
 *     showSuccessToast: true,
 *     customSuccessMessage: 'お問い合わせを送信しました',
 *   },
 * });
 * ```
 */
export function useFormSubmission<TFormData extends FieldValues>({
	form,
	submitFn,
	errorHandling = {},
	successHandling = {},
	onBeforeSubmit,
	onAfterSubmit,
}: UseFormSubmissionOptions<TFormData>): UseFormSubmissionReturn<TFormData> {
	// デフォルトオプション
	const {
		autoSetFieldErrors = true,
		showErrorToast = true,
		customErrorMessage = "送信に失敗しました。後ほど再度お試しください。",
	} = errorHandling;

	const {
		autoResetForm = false,
		showSuccessToast = true,
		customSuccessMessage = "送信が完了しました",
		redirectTo,
	} = successHandling;

	// 状態管理
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState<string | null>(null);
	const [submitStatus, setSubmitStatus] = useState<{
		type: "success" | "error" | null;
		message: string;
	}>({ type: null, message: "" });

	// エラー状態リセット
	const resetError = () => {
		setSubmitError(null);
	};

	// 送信状態リセット
	const resetStatus = () => {
		setSubmitStatus({ type: null, message: "" });
	};

	// フィールドエラーの設定
	const setFieldErrors = (fieldErrors: Record<string, string>) => {
		for (const [field, message] of Object.entries(fieldErrors)) {
			form.setError(field as Path<TFormData>, { message });
		}
	};

	// 送信処理
	const handleSubmit = async (data: TFormData): Promise<SubmissionResult> => {
		setIsSubmitting(true);
		setSubmitError(null);
		setSubmitStatus({ type: null, message: "" });

		try {
			// 送信前処理
			if (onBeforeSubmit) {
				await onBeforeSubmit(data);
			}

			// メイン送信処理
			const result = await submitFn(data);

			if (result.success) {
				// 成功処理
				const successMessage = (result.data as any)?.message || customSuccessMessage;
				setSubmitStatus({ type: "success", message: successMessage });

				if (autoResetForm) {
					form.reset();
				}

				if (showSuccessToast) {
					toast.success(successMessage);
				}

				// リダイレクト処理
				if (redirectTo && typeof window !== "undefined") {
					// クライアントサイドでのリダイレクト
					setTimeout(() => {
						window.location.href = redirectTo;
					}, 1000);
				}
			} else {
				// エラー処理
				const errorMessage = result.error?.message || customErrorMessage;
				setSubmitError(errorMessage);
				setSubmitStatus({ type: "error", message: errorMessage });

				// フィールドエラーの設定
				if (autoSetFieldErrors && result.error?.details?.fieldErrors) {
					setFieldErrors(result.error.details.fieldErrors);
				}

				if (showErrorToast) {
					toast.error(errorMessage);
				}
			}

			// 送信後処理
			if (onAfterSubmit) {
				await onAfterSubmit(result, data);
			}

			return result;
		} catch (error) {
			// 予期しないエラー
			console.error("フォーム送信エラー:", error);
			const errorMessage = "送信処理中にエラーが発生しました";
			
			setSubmitError(errorMessage);
			setSubmitStatus({ type: "error", message: errorMessage });

			if (showErrorToast) {
				toast.error(errorMessage);
			}

			const failureResult: SubmissionResult = {
				success: false,
				error: {
					message: errorMessage,
					code: "UNEXPECTED_ERROR",
				},
			};

			if (onAfterSubmit) {
				await onAfterSubmit(failureResult, data);
			}

			return failureResult;
		} finally {
			// デバウンス用の待機
			setTimeout(() => {
				setIsSubmitting(false);
			}, UI_FORM.SUBMIT_DEBOUNCE);
		}
	};

	return {
		isSubmitting,
		submitError,
		submitStatus,
		handleSubmit,
		resetError,
		resetStatus,
	};
}