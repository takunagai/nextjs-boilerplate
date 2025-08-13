import { zodResolver } from "@hookform/resolvers/zod";
import { act, renderHook } from "@testing-library/react";
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
		defaultValues: { name: "", email: "" },
	});
}

// テスト用ヘルパー
function createTestSubmission(overrides = {}) {
	const { result: formResult } = renderHook(() => useTestForm());
	const { result } = renderHook(() =>
		useFormSubmission({
			form: formResult.current,
			submitFn: vi.fn(),
			...overrides,
		}),
	);
	return result;
}

describe("useFormSubmission", () => {
	const originalConsoleError = console.error;

	beforeEach(() => {
		vi.clearAllMocks();
		// console.error をモックして、テスト中の不要な出力を抑制
		console.error = vi.fn();
	});

	afterEach(() => {
		// console.error を元に戻す
		console.error = originalConsoleError;
	});

	describe("初期化", () => {
		it("初期状態が正しく設定される", () => {
			const result = createTestSubmission();

			expect(result.current.isSubmitting).toBe(false);
			expect(result.current.submitError).toBeNull();
			expect(result.current.submitStatus).toEqual({ type: null, message: "" });
		});
	});

	describe("送信処理", () => {
		it("成功時の処理", async () => {
			const mockSubmitFn = vi.fn().mockResolvedValue({
				success: true,
				data: { message: "送信成功" },
			} as SubmissionResult);

			const result = createTestSubmission({
				submitFn: mockSubmitFn,
				successHandling: { showSuccessToast: true },
			});

			const testData = { name: "テスト太郎", email: "test@example.com" };

			await act(async () => {
				await result.current.handleSubmit(testData);
			});

			expect(result.current.submitStatus).toEqual({
				type: "success",
				message: "送信成功",
			});
			expect(toast.success).toHaveBeenCalledWith("送信成功");
			expect(mockSubmitFn).toHaveBeenCalledWith(testData);
		});

		it("エラー時の処理", async () => {
			const mockSubmitFn = vi.fn().mockResolvedValue({
				success: false,
				error: { message: "送信失敗" },
			} as SubmissionResult);

			const result = createTestSubmission({
				submitFn: mockSubmitFn,
				errorHandling: { showErrorToast: true },
			});

			const testData = { name: "テスト太郎", email: "invalid-email" };

			await act(async () => {
				await result.current.handleSubmit(testData);
			});

			expect(result.current.submitError).toBe("送信失敗");
			expect(result.current.submitStatus).toEqual({
				type: "error",
				message: "送信失敗",
			});
			expect(toast.error).toHaveBeenCalledWith("送信失敗");
		});

		it("予期しないエラーの処理", async () => {
			const mockSubmitFn = vi.fn().mockRejectedValue(new Error("ネットワークエラー"));

			const result = createTestSubmission({ submitFn: mockSubmitFn });

			const testData = { name: "テスト太郎", email: "test@example.com" };

			await act(async () => {
				await result.current.handleSubmit(testData);
			});

			expect(result.current.submitError).toBe("送信処理中にエラーが発生しました");
			expect(result.current.submitStatus).toEqual({
				type: "error",
				message: "送信処理中にエラーが発生しました",
			});
		});
	});

	describe("状態管理", () => {
		it("エラー状態をリセットできる", () => {
			const result = createTestSubmission();

			act(() => {
				result.current.resetError();
			});

			expect(result.current.submitError).toBeNull();
		});

		it("送信状態をリセットできる", () => {
			const result = createTestSubmission();

			act(() => {
				result.current.resetStatus();
			});

			expect(result.current.submitStatus).toEqual({ type: null, message: "" });
		});
	});

	describe("コールバック処理", () => {
		it("送信前後の処理が実行される", async () => {
			const mockSubmitFn = vi.fn().mockResolvedValue({ success: true });
			const mockOnBeforeSubmit = vi.fn();
			const mockOnAfterSubmit = vi.fn();

			const result = createTestSubmission({
				submitFn: mockSubmitFn,
				onBeforeSubmit: mockOnBeforeSubmit,
				onAfterSubmit: mockOnAfterSubmit,
			});

			const testData = { name: "テスト太郎", email: "test@example.com" };

			await act(async () => {
				await result.current.handleSubmit(testData);
			});

			expect(mockOnBeforeSubmit).toHaveBeenCalledWith(testData);
			expect(mockOnAfterSubmit).toHaveBeenCalledWith({ success: true }, testData);
		});
	});
});