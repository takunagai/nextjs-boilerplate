import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
	submitContactForm,
	checkEmailExists,
} from "@/app/actions/contact-form";
import { validateAction, ActionError } from "@/lib/server";
import { contactFormSchema } from "@/lib/validation/contact-schema";
import type { ContactFormValues } from "@/lib/validation/contact-schema";

// validateActionをモック化
vi.mock("@/lib/server", async () => {
	const actual = await vi.importActual("@/lib/server");
	return {
		...(actual as object),
		validateAction: vi.fn(),
	};
});

// サーバーアクション内のsetTimeoutをモック化
vi.mock("node:timers/promises", () => ({
	setTimeout: vi.fn().mockResolvedValue(undefined),
}));

describe("お問い合わせフォーム用サーバーアクション", () => {
	// コンソール出力をモック化
	beforeEach(() => {
		vi.spyOn(console, "log").mockImplementation(() => {});
		vi.spyOn(console, "error").mockImplementation(() => {});
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("submitContactForm", () => {
		const validFormData: ContactFormValues = {
			name: "山田太郎",
			email: "yamada@example.com",
			phoneContact: "可",
			phone: "03-1234-5678",
			message: "これはテストメッセージです。10文字以上の入力です。",
		};

		it("有効なデータが送信された場合、成功レスポンスを返す", async () => {
			// validateActionのモックが有効なデータを返すように設定
			vi.mocked(validateAction).mockResolvedValueOnce(validFormData);

			// サーバーアクションを実行
			const result = await submitContactForm(validFormData);

			// 検証
			expect(result.success).toBe(true);
			expect(result.data).toEqual({
				message: "お問い合わせを受け付けました。3営業日以内に返信いたします。",
			});
			expect(validateAction).toHaveBeenCalledWith(
				contactFormSchema,
				validFormData,
			);
			expect(console.log).toHaveBeenCalled();
		});

		it("バリデーションエラーが発生した場合、エラーレスポンスを返す", async () => {
			// バリデーションエラーをシミュレート
			const validationError = new ActionError(
				"入力データが無効です",
				"VALIDATION_ERROR",
				{
					fieldErrors: {
						name: "お名前を入力してください",
					},
				},
			);
			vi.mocked(validateAction).mockRejectedValueOnce(validationError);

			// サーバーアクションを実行
			const result = await submitContactForm(validFormData);

			// 検証
			expect(result.success).toBe(false);
			expect(result.error).toEqual({
				code: "VALIDATION_ERROR",
				message: "入力データが無効です",
				details: {
					fieldErrors: {
						name: "お名前を入力してください",
					},
				},
			});
		});

		it("予期しないエラーが発生した場合、汎用エラーレスポンスを返す", async () => {
			// 予期しないエラーをシミュレート
			vi.mocked(validateAction).mockRejectedValueOnce(
				new Error("予期しないエラー"),
			);

			// サーバーアクションを実行
			const result = await submitContactForm(validFormData);

			// 検証
			expect(result.success).toBe(false);
			expect(result.error).toEqual({
				code: "UNKNOWN_ERROR",
				message: "予期しないエラー",
			});
		});
	});

	describe("checkEmailExists", () => {
		it("example.comドメインのメールアドレスは登録済みと判定される", async () => {
			// サーバーアクションを実行
			const result = await checkEmailExists("test@example.com");

			// 検証
			expect(result.success).toBe(true);
			expect(result.data).toEqual({
				exists: true,
				message: "このメールアドレスは既に登録されています",
			});
		});

		it("example.com以外のドメインのメールアドレスは未登録と判定される", async () => {
			// サーバーアクションを実行
			const result = await checkEmailExists("test@gmail.com");

			// 検証
			expect(result.success).toBe(true);
			expect(result.data).toEqual({
				exists: false,
				message: "このメールアドレスは使用可能です",
			});
		});

		it("無効なメールアドレスの場合、エラーレスポンスを返す", async () => {
			// サーバーアクションを実行
			const result = await checkEmailExists("invalid-email");

			// 検証
			expect(result.success).toBe(false);
			expect(result.error).toEqual({
				code: "VALIDATION_ERROR",
				message: "有効なメールアドレスを入力してください",
			});
		});

		it("空のメールアドレスの場合、未登録と判定される", async () => {
			// サーバーアクションを実行
			const result = await checkEmailExists("");

			// 検証
			expect(result.success).toBe(true);
			expect(result.data).toEqual({
				exists: false,
				message: "このメールアドレスは使用可能です",
			});
		});
	});
});
