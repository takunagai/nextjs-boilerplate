import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
	checkExampleEmail,
	submitExampleForm,
} from "@/app/actions/form-example";
import { ActionError, validateAction } from "@/lib/server";
import type { ActionResult } from "@/lib/types/actions";
import type { FormExampleValues } from "@/lib/validation/form-example-schema";
import { formExampleSchema } from "@/lib/validation/form-example-schema";

// validateActionをモック化
vi.mock("@/lib/server", async () => {
	const actual = await vi.importActual("@/lib/server");
	return {
		...(actual as object),
		validateAction: vi.fn(),
	};
});

// テストヘルパー関数
const createValidFormExample = (): FormExampleValues => ({
	name: "山田太郎",
	email: "yamada@example.com",
	message: "これはテストメッセージです。10文字以上の入力です。",
	terms: true,
});

const expectSuccessResult = (
	result: ActionResult<{ message: string }>,
	expectedMessage: string,
) => {
	expect(result.success).toBe(true);
	if (result.success) {
		expect(result.data.message).toBe(expectedMessage);
	}
};

const expectErrorResult = (
	result: ActionResult<{ message: string }>,
	expectedCode: string,
	expectedMessage: string,
) => {
	expect(result.success).toBe(false);
	if (!result.success) {
		expect(result.error.code).toBe(expectedCode);
		expect(result.error.message).toBe(expectedMessage);
	}
};

describe("フォームサンプル用サーバーアクション", () => {
	beforeEach(() => {
		vi.spyOn(console, "log").mockImplementation(() => {});
		vi.spyOn(console, "error").mockImplementation(() => {});
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("submitExampleForm", () => {
		it("有効なデータで送信成功", async () => {
			const validFormData = createValidFormExample();
			vi.mocked(validateAction).mockResolvedValueOnce(validFormData);

			const result = await submitExampleForm(validFormData);

			expectSuccessResult(result, "フォームが正常に送信されました。");
			expect(validateAction).toHaveBeenCalledWith(
				formExampleSchema,
				validFormData,
			);
			expect(console.log).toHaveBeenCalled();
		});

		it("バリデーションエラーでエラーレスポンス", async () => {
			const validationError = new ActionError(
				"入力データが無効です",
				"VALIDATION_ERROR",
				{ fieldErrors: { name: "名前を入力してください" } },
			);
			vi.mocked(validateAction).mockRejectedValueOnce(validationError);

			const result = await submitExampleForm(createValidFormExample());

			expectErrorResult(result, "FORM_ERROR", "入力内容を確認してください");
			expect(result.error.details).toEqual({
				fieldErrors: { name: "名前を入力してください" },
			});
			expect(console.error).toHaveBeenCalled();
		});

		it("予期しないエラーで汎用エラーレスポンス", async () => {
			vi.mocked(validateAction).mockRejectedValueOnce(
				new Error("予期しないエラー"),
			);

			const result = await submitExampleForm(createValidFormExample());

			expectErrorResult(result, "FORM_ERROR", "フォーム送信に失敗しました");
			expect(console.error).toHaveBeenCalled();
		});
	});

	describe("checkExampleEmail", () => {
		const emailTestCases = [
			{
				email: "test@example.com",
				expected: { exists: true },
				description: "example.comドメインは存在",
			},
			{
				email: "test@gmail.com",
				expected: { exists: false },
				description: "example.com以外は存在しない",
			},
		];

		emailTestCases.forEach(({ email, expected, description }) => {
			it(description, async () => {
				const result = await checkExampleEmail(email);
				expect(result.success).toBe(true);
				expect(result.data).toEqual(expected);
			});
		});

		const errorTestCases = [
			{ email: "invalid-email", description: "無効なメールアドレス" },
			{ email: "", description: "空のメールアドレス" },
		];

		errorTestCases.forEach(({ email, description }) => {
			it(`${description}でエラー`, async () => {
				const result = await checkExampleEmail(email);
				expectErrorResult(
					result,
					"FORM_ERROR",
					"有効なメールアドレスを入力してください",
				);
			});
		});
	});
});
