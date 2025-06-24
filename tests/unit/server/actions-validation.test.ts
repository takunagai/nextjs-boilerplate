import { describe, expect, it, vi } from "vitest";
import { z } from "zod";
import { ActionError, formatZodErrors, validateAction } from "@/lib/server";

describe("サーバーアクションバリデーションユーティリティ", () => {
	describe("validateAction", () => {
		// テスト用のスキーマ
		const testSchema = z.object({
			name: z.string().min(1, "名前を入力してください"),
			email: z.string().email("有効なメールアドレスを入力してください"),
			age: z.number().min(18, "18歳以上である必要があります").optional(),
		});

		it("有効なデータの場合、検証済みデータを返す", async () => {
			const validData = {
				name: "山田太郎",
				email: "yamada@example.com",
				age: 25,
			};

			const result = await validateAction(testSchema, validData);
			expect(result).toEqual(validData);
		});

		it("無効なデータの場合、ActionErrorをスローする", async () => {
			const invalidData = {
				name: "",
				email: "invalid-email",
				age: 15,
			};

			await expect(validateAction(testSchema, invalidData)).rejects.toThrow(
				ActionError,
			);
			await expect(
				validateAction(testSchema, invalidData),
			).rejects.toMatchObject({
				code: "VALIDATION_ERROR",
				message: "入力データが無効です",
			});
		});

		it("カスタムエラーメッセージを設定できる", async () => {
			const invalidData = {
				name: "",
				email: "invalid-email",
			};

			await expect(
				validateAction(testSchema, invalidData, {
					errorMessage: "カスタムエラーメッセージ",
				}),
			).rejects.toMatchObject({
				message: "カスタムエラーメッセージ",
			});
		});

		it("Zodエラー以外のエラーが発生した場合、UNKNOWN_VALIDATION_ERRORをスローする", async () => {
			// スキーマのparse関数をモック化して例外をスローさせる
			const mockSchema = {
				parse: vi.fn().mockImplementation(() => {
					throw new Error("予期しないエラー");
				}),
			};

			await expect(
				validateAction(mockSchema as unknown as z.ZodType, {}),
			).rejects.toMatchObject({
				code: "UNKNOWN_VALIDATION_ERROR",
				message: "バリデーションエラー",
			});
		});
	});

	describe("formatZodErrors", () => {
		it("Zodエラーを適切なフォーマットに変換する", () => {
			// Zodエラーを作成
			const testSchema = z.object({
				name: z.string().min(1, "名前を入力してください"),
				email: z.string().email("有効なメールアドレスを入力してください"),
				nested: z.object({
					field: z.string().min(3, "3文字以上入力してください"),
				}),
			});

			const result = testSchema.safeParse({
				name: "",
				email: "invalid",
				nested: { field: "a" },
			});

			if (result.success) {
				throw new Error("バリデーションが成功してしまいました");
			}

			const formattedErrors = formatZodErrors(result.error);

			// フォーマットされたエラーを検証
			expect(formattedErrors).toHaveProperty("name");
			expect(formattedErrors).toHaveProperty("email");
			expect(formattedErrors).toHaveProperty("nested.field");

			expect(formattedErrors.name).toBe("名前を入力してください");
			expect(formattedErrors.email).toBe(
				"有効なメールアドレスを入力してください",
			);
			expect(formattedErrors["nested.field"]).toBe("3文字以上入力してください");
		});

		it("複数のエラーがある場合は最後のエラーメッセージが使用される", () => {
			const testSchema = z.object({
				password: z
					.string()
					.min(8, "パスワードは8文字以上である必要があります")
					.regex(/[A-Z]/, "パスワードには大文字を含める必要があります")
					.regex(/[0-9]/, "パスワードには数字を含める必要があります"),
			});

			const result = testSchema.safeParse({
				password: "abc", // 8文字未満、大文字なし、数字なし
			});

			if (result.success) {
				throw new Error("バリデーションが成功してしまいました");
			}

			const formattedErrors = formatZodErrors(result.error);

			// 実装では最後のエラーメッセージが使用される
			expect(formattedErrors.password).toBe(
				"パスワードには数字を含める必要があります",
			);
		});
	});
});
