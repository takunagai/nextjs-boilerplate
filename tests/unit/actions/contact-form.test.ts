import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
	checkEmailExists,
	submitContactForm,
} from "@/app/actions/contact-form";
import { ActionError, validateAction } from "@/lib/server";
import type { ContactFormValues } from "@/lib/validation/contact-schema";
import { contactFormSchema } from "@/lib/validation/contact-schema";

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

// テストヘルパー関数
const createValidContactForm = (): ContactFormValues => ({
	name: "山田太郎",
	email: "yamada@example.com",
	phoneContact: "可",
	phone: "03-1234-5678",
	message: "これはテストメッセージです。10文字以上の入力です。",
});

const expectSuccessResult = (result: any, expectedMessage: string) => {
	expect(result.success).toBe(true);
	expect(result.data.message).toBe(expectedMessage);
};

const expectErrorResult = (result: any, expectedCode: string, expectedMessage: string) => {
	expect(result.success).toBe(false);
	expect(result.error.code).toBe(expectedCode);
	expect(result.error.message).toBe(expectedMessage);
};

describe("お問い合わせフォーム用サーバーアクション", () => {
	beforeEach(() => {
		vi.spyOn(console, "log").mockImplementation(() => {});
		vi.spyOn(console, "error").mockImplementation(() => {});
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("submitContactForm", () => {
		it("有効なデータで送信成功", async () => {
			const validFormData = createValidContactForm();
			vi.mocked(validateAction).mockResolvedValueOnce(validFormData);

			const result = await submitContactForm(validFormData);

			expectSuccessResult(result, "お問い合わせを受け付けました。3営業日以内に返信いたします。");
			expect(validateAction).toHaveBeenCalledWith(contactFormSchema, validFormData);
			expect(console.log).toHaveBeenCalled();
		});

		it("バリデーションエラーでエラーレスポンス", async () => {
			const validationError = new ActionError(
				"入力データが無効です",
				"VALIDATION_ERROR",
				{ fieldErrors: { name: "お名前を入力してください" } },
			);
			vi.mocked(validateAction).mockRejectedValueOnce(validationError);

			const result = await submitContactForm(createValidContactForm());

			expectErrorResult(result, "VALIDATION_ERROR", "入力データが無効です");
			expect(result.error.details).toEqual({
				fieldErrors: { name: "お名前を入力してください" },
			});
		});

		it("予期しないエラーで汎用エラーレスポンス", async () => {
			vi.mocked(validateAction).mockRejectedValueOnce(new Error("予期しないエラー"));

			const result = await submitContactForm(createValidContactForm());

			expectErrorResult(result, "UNKNOWN_ERROR", "予期しないエラー");
		});
	});

	describe("checkEmailExists", () => {
		const emailTestCases = [
			{
				email: "test@example.com",
				expected: { exists: true, message: "このメールアドレスは既に登録されています" },
				description: "example.comドメインは登録済み"
			},
			{
				email: "test@gmail.com",
				expected: { exists: false, message: "このメールアドレスは使用可能です" },
				description: "example.com以外は未登録"
			},
			{
				email: "",
				expected: { exists: false, message: "このメールアドレスは使用可能です" },
				description: "空文字は未登録"
			},
		];

		emailTestCases.forEach(({ email, expected, description }) => {
			it(description, async () => {
				const result = await checkEmailExists(email);
				expect(result.success).toBe(true);
				expect(result.data).toEqual(expected);
			});
		});

		it("無効なメールアドレスでエラー", async () => {
			const result = await checkEmailExists("invalid-email");
			expectErrorResult(result, "VALIDATION_ERROR", "有効なメールアドレスを入力してください");
		});
	});
});
