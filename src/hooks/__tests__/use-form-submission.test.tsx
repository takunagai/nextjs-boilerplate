/**
 * useFormSubmission フックのテストファイル
 */
import { zodResolver } from "@hookform/resolvers/zod";
import { act, renderHook, waitFor } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { describe, expect, it, vi } from "vitest";

import { useFormSubmission } from "../use-form-submission";
import type { SubmissionResult } from "../use-form-submission";

// Toast のモック
vi.mock("sonner", () => ({
	toast: {
		success: vi.fn(),
		error: vi.fn(),
	},
}));

// テスト用のスキーマ
const testSchema = z.object({
	name: z.string().min(1, "名前は必須です"),
	email: z.string().email("有効なメールアドレスを入力してください"),
});

type TestFormData = z.infer<typeof testSchema>;

// テスト用のフォームフック
function useTestForm() {
	return useForm<TestFormData>({
		resolver: zodResolver(testSchema),
		defaultValues: {
			name: "",
			email: "",
		},
	});
}

describe("useFormSubmission", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("初期状態が正しく設定される", () => {
		const { result: formResult } = renderHook(() => useTestForm());
		const { result } = renderHook(() =>
			useFormSubmission({
				form: formResult.current,
				submitFn: vi.fn(),
			}),
		);

		expect(result.current.isSubmitting).toBe(false);
		expect(result.current.submitError).toBeNull();
		expect(result.current.submitStatus).toEqual({ type: null, message: "" });
	});

	it("成功時の処理が正常に動作する", async () => {
		const { result: formResult } = renderHook(() => useTestForm());
		const mockSubmitFn = vi.fn().mockResolvedValue({
			success: true,
			data: { message: "送信成功" },
		} as SubmissionResult);

		const { result } = renderHook(() =>
			useFormSubmission({
				form: formResult.current,
				submitFn: mockSubmitFn,
				successHandling: {
					autoResetForm: true,
					showSuccessToast: true,
				},
			}),
		);

		const testData = { name: "テスト太郎", email: "test@example.com" };

		// 送信処理を実行
		await act(async () => {
			await result.current.handleSubmit(testData);
		});

		// 状態の確認
		expect(result.current.submitStatus).toEqual({
			type: "success",
			message: "送信成功",
		});
		expect(toast.success).toHaveBeenCalledWith("送信成功");
		expect(mockSubmitFn).toHaveBeenCalledWith(testData);
	});

	it("エラー時の処理が正常に動作する", async () => {
		const { result: formResult } = renderHook(() => useTestForm());
		const mockSubmitFn = vi.fn().mockResolvedValue({
			success: false,
			error: {
				message: "送信失敗",
				code: "VALIDATION_ERROR",
				details: {
					fieldErrors: {
						email: "無効なメールアドレスです",
					},
				},
			},
		} as SubmissionResult);

		const { result } = renderHook(() =>
			useFormSubmission({
				form: formResult.current,
				submitFn: mockSubmitFn,
				errorHandling: {
					autoSetFieldErrors: true,
					showErrorToast: true,
				},
			}),
		);

		const testData = { name: "テスト太郎", email: "invalid-email" };

		// 送信処理を実行
		await act(async () => {
			await result.current.handleSubmit(testData);
		});

		// 状態の確認
		expect(result.current.submitError).toBe("送信失敗");
		expect(result.current.submitStatus).toEqual({
			type: "error",
			message: "送信失敗",
		});
		expect(toast.error).toHaveBeenCalledWith("送信失敗");
	});

	it("予期しないエラーが適切に処理される", async () => {
		const { result: formResult } = renderHook(() => useTestForm());
		const mockSubmitFn = vi.fn().mockRejectedValue(new Error("ネットワークエラー"));

		const { result } = renderHook(() =>
			useFormSubmission({
				form: formResult.current,
				submitFn: mockSubmitFn,
			}),
		);

		const testData = { name: "テスト太郎", email: "test@example.com" };

		// 送信処理を実行
		await act(async () => {
			await result.current.handleSubmit(testData);
		});

		// 状態の確認
		expect(result.current.submitError).toBe("送信処理中にエラーが発生しました");
		expect(result.current.submitStatus).toEqual({
			type: "error",
			message: "送信処理中にエラーが発生しました",
		});
	});

	it("送信前・送信後の処理が正常に実行される", async () => {
		const { result: formResult } = renderHook(() => useTestForm());
		const mockSubmitFn = vi.fn().mockResolvedValue({ success: true });
		const mockOnBeforeSubmit = vi.fn();
		const mockOnAfterSubmit = vi.fn();

		const { result } = renderHook(() =>
			useFormSubmission({
				form: formResult.current,
				submitFn: mockSubmitFn,
				onBeforeSubmit: mockOnBeforeSubmit,
				onAfterSubmit: mockOnAfterSubmit,
			}),
		);

		const testData = { name: "テスト太郎", email: "test@example.com" };

		// 送信処理を実行
		await act(async () => {
			await result.current.handleSubmit(testData);
		});

		// 前後処理の確認
		expect(mockOnBeforeSubmit).toHaveBeenCalledWith(testData);
		expect(mockOnAfterSubmit).toHaveBeenCalledWith({ success: true }, testData);
	});

	it("エラー状態をリセットできる", () => {
		const { result: formResult } = renderHook(() => useTestForm());
		const { result } = renderHook(() =>
			useFormSubmission({
				form: formResult.current,
				submitFn: vi.fn(),
			}),
		);

		// エラー状態を設定
		act(() => {
			result.current.handleSubmit({ name: "", email: "" });
		});

		// エラーをリセット
		act(() => {
			result.current.resetError();
		});

		expect(result.current.submitError).toBeNull();
	});

	it("送信状態をリセットできる", () => {
		const { result: formResult } = renderHook(() => useTestForm());
		const { result } = renderHook(() =>
			useFormSubmission({
				form: formResult.current,
				submitFn: vi.fn(),
			}),
		);

		// 送信状態をリセット
		act(() => {
			result.current.resetStatus();
		});

		expect(result.current.submitStatus).toEqual({ type: null, message: "" });
	});

	it("isSubmitting が正しく動作する", async () => {
		const { result: formResult } = renderHook(() => useTestForm());
		const mockSubmitFn = vi.fn(() => new Promise(resolve => 
			setTimeout(() => resolve({ success: true }), 100)
		));

		const { result } = renderHook(() =>
			useFormSubmission({
				form: formResult.current,
				submitFn: mockSubmitFn,
			}),
		);

		// 送信前
		expect(result.current.isSubmitting).toBe(false);

		// 送信処理を開始
		const submitPromise = act(async () => {
			await result.current.handleSubmit({ name: "テスト", email: "test@example.com" });
		});

		// 送信中かどうかは非同期処理のため、waitForを使用
		await waitFor(() => {
			expect(result.current.isSubmitting).toBe(true);
		}, { timeout: 50 });

		// 送信完了まで待機
		await submitPromise;

		// 送信後（デバウンス待機後）
		await waitFor(() => {
			expect(result.current.isSubmitting).toBe(false);
		});
	});
});