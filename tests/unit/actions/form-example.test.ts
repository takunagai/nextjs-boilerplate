import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
	submitExampleForm,
	checkExampleEmail,
} from "@/app/actions/form-example";
import { validateAction, ActionError } from "@/lib/server";
import { formExampleSchema } from "@/lib/validation/form-example-schema";
import type { FormExampleValues } from "@/lib/validation/form-example-schema";

// validateActionをモック化
vi.mock("@/lib/server", async () => {
	const actual = await vi.importActual("@/lib/server");
	return {
		...(actual as object),
		validateAction: vi.fn(),
	};
});

describe("フォームサンプル用サーバーアクション", () => {
	// コンソール出力をモック化
	beforeEach(() => {
		vi.spyOn(console, "log").mockImplementation(() => {});
		vi.spyOn(console, "error").mockImplementation(() => {});
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("submitExampleForm", () => {
		const validFormData: FormExampleValues = {
			name: "山田太郎",
			email: "yamada@example.com",
			message: "これはテストメッセージです。10文字以上の入力です。",
			terms: true,
		};

		it("有効なデータが送信された場合、成功レスポンスを返す", async () => {
			// validateActionのモックが有効なデータを返すように設定
			vi.mocked(validateAction).mockResolvedValueOnce(validFormData);

			// サーバーアクションを実行
			const result = await submitExampleForm(validFormData);

			// 検証
			expect(result.success).toBe(true);
			expect(result.data).toEqual({
				message: "フォームが正常に送信されました。",
			});
			expect(validateAction).toHaveBeenCalledWith(
				formExampleSchema,
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
						name: "名前を入力してください",
					},
				},
			);
			vi.mocked(validateAction).mockRejectedValueOnce(validationError);

			// サーバーアクションを実行
			const result = await submitExampleForm(validFormData);

			// 検証
			expect(result.success).toBe(false);
			expect(result.error).toEqual({
				code: "FORM_ERROR",
				message: "入力内容を確認してください",
				details: {
					fieldErrors: {
						name: "名前を入力してください",
					},
				},
			});
			expect(console.error).toHaveBeenCalled();
		});

		it("予期しないエラーが発生した場合、汎用エラーレスポンスを返す", async () => {
			// 予期しないエラーをシミュレート
			vi.mocked(validateAction).mockRejectedValueOnce(
				new Error("予期しないエラー"),
			);

			// サーバーアクションを実行
			const result = await submitExampleForm(validFormData);

			// 検証
			expect(result.success).toBe(false);
			expect(result.error).toEqual({
				code: "FORM_ERROR",
				message: "フォーム送信に失敗しました",
			});
			expect(console.error).toHaveBeenCalled();
		});
	});

	describe("checkExampleEmail", () => {
		it("有効なメールアドレスの場合、存在確認結果を返す", async () => {
			// example.comドメインのメールアドレス（存在するとみなす）
			const result = await checkExampleEmail("test@example.com");

			expect(result.success).toBe(true);
			expect(result.data).toEqual({ exists: true });
		});

		it("example.com以外のドメインの場合、存在しないと判定する", async () => {
			const result = await checkExampleEmail("test@gmail.com");

			expect(result.success).toBe(true);
			expect(result.data).toEqual({ exists: false });
		});

		it("無効なメールアドレスの場合、エラーレスポンスを返す", async () => {
			const result = await checkExampleEmail("invalid-email");

			expect(result.success).toBe(false);
			expect(result.error).toEqual({
				code: "FORM_ERROR",
				message: "有効なメールアドレスを入力してください",
			});
		});

		it("空のメールアドレスの場合、エラーレスポンスを返す", async () => {
			const result = await checkExampleEmail("");

			expect(result.success).toBe(false);
			expect(result.error).toEqual({
				code: "FORM_ERROR",
				message: "有効なメールアドレスを入力してください",
			});
		});
	});
});
