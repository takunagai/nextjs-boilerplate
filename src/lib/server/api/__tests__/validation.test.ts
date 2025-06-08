import { z } from "zod";
import { validateRequest, validateRequestWithError } from "../validation";
import { createApiError } from "../response";

// consoleのエラーログをモック
const mockConsoleError = vi.spyOn(console, "error").mockImplementation(() => {});

describe("API validation", () => {
	beforeEach(() => {
		mockConsoleError.mockClear();
	});

	afterAll(() => {
		mockConsoleError.mockRestore();
	});

	describe("validateRequest", () => {
		const schema = z.object({
			name: z.string().min(1, "名前は必須です"),
			email: z.string().email("有効なメールアドレスを入力してください"),
			age: z.number().min(0, "年齢は0以上で入力してください"),
		});

		describe("正常系", () => {
			it("有効なデータでバリデーションが成功する", async () => {
				const validData = {
					name: "太郎",
					email: "taro@example.com",
					age: 25,
				};

				const result = await validateRequest(schema, validData);

				expect(result).toEqual(validData);
			});

			it("型変換を含む有効なデータでバリデーションが成功する", async () => {
				const inputData = {
					name: "太郎",
					email: "taro@example.com",
					age: "25", // 文字列として入力
				};

				const schema = z.object({
					name: z.string(),
					email: z.string().email(),
					age: z.coerce.number(),
				});

				const result = await validateRequest(schema, inputData);

				expect(result).toEqual({
					name: "太郎",
					email: "taro@example.com",
					age: 25, // 数値に変換される
				});
			});
		});

		describe("異常系", () => {
			it("バリデーションエラー時にZodErrorをスローする", async () => {
				const invalidData = {
					name: "",
					email: "invalid-email",
					age: -1,
				};

				await expect(validateRequest(schema, invalidData)).rejects.toThrow(
					z.ZodError
				);
			});

			it("必須フィールドが不足している場合エラーをスローする", async () => {
				const incompleteData = {
					name: "太郎",
					// email が不足
					age: 25,
				};

				await expect(validateRequest(schema, incompleteData)).rejects.toThrow(
					z.ZodError
				);
			});

			it("型が合わない場合エラーをスローする", async () => {
				const wrongTypeData = {
					name: "太郎",
					email: "taro@example.com",
					age: "invalid-age", // 数値ではない
				};

				await expect(validateRequest(schema, wrongTypeData)).rejects.toThrow(
					z.ZodError
				);
			});

			it("エラーがコンソールに記録される", async () => {
				const invalidData = {
					name: "",
					email: "invalid-email",
					age: -1,
				};

				try {
					await validateRequest(schema, invalidData);
				} catch {
					// エラーを無視
				}

				expect(mockConsoleError).toHaveBeenCalledWith(
					"[API Validation Error]",
					expect.any(z.ZodError)
				);
			});
		});

		describe("エッジケース", () => {
			it("undefined データでエラーをスローする", async () => {
				await expect(validateRequest(schema, undefined)).rejects.toThrow(
					z.ZodError
				);
			});

			it("null データでエラーをスローする", async () => {
				await expect(validateRequest(schema, null)).rejects.toThrow(
					z.ZodError
				);
			});

			it("空のオブジェクトでエラーをスローする", async () => {
				await expect(validateRequest(schema, {})).rejects.toThrow(z.ZodError);
			});

			it("配列データでエラーをスローする", async () => {
				await expect(validateRequest(schema, [])).rejects.toThrow(z.ZodError);
			});
		});
	});

	describe("validateRequestWithError", () => {
		const schema = z.object({
			name: z.string().min(1, "名前は必須です"),
			email: z.string().email("有効なメールアドレスを入力してください"),
			age: z.number().min(0, "年齢は0以上で入力してください"),
		});

		describe("正常系", () => {
			it("有効なデータでバリデーション済みデータを返す", async () => {
				const validData = {
					name: "太郎",
					email: "taro@example.com",
					age: 25,
				};

				const [result, error] = await validateRequestWithError(
					schema,
					validData
				);

				expect(result).toEqual(validData);
				expect(error).toBeNull();
			});
		});

		describe("異常系", () => {
			it("ZodErrorの場合はAPIエラーを返す", async () => {
				const invalidData = {
					name: "",
					email: "invalid-email",
					age: -1,
				};

				const [result, error] = await validateRequestWithError(
					schema,
					invalidData
				);

				expect(result).toBeNull();
				expect(error).toEqual({
					error: "validation",
					message: "入力データが無効です",
					details: {
						fieldErrors: {
							name: "名前は必須です",
							email: "有効なメールアドレスを入力してください",
							age: "年齢は0以上で入力してください",
						},
					},
				});
			});

			it("ネストしたフィールドエラーを正しく処理する", async () => {
				const nestedSchema = z.object({
					user: z.object({
						profile: z.object({
							name: z.string().min(1, "名前は必須です"),
						}),
					}),
				});

				const invalidData = {
					user: {
						profile: {
							name: "",
						},
					},
				};

				const [result, error] = await validateRequestWithError(
					nestedSchema,
					invalidData
				);

				expect(result).toBeNull();
				expect(error?.details).toEqual({
					fieldErrors: {
						"user.profile.name": "名前は必須です",
					},
				});
			});

			it("配列フィールドエラーを正しく処理する", async () => {
				const arraySchema = z.object({
					items: z.array(
						z.object({
							name: z.string().min(1, "アイテム名は必須です"),
						})
					),
				});

				const invalidData = {
					items: [{ name: "" }, { name: "有効な名前" }],
				};

				const [result, error] = await validateRequestWithError(
					arraySchema,
					invalidData
				);

				expect(result).toBeNull();
				expect(error?.details).toEqual({
					fieldErrors: {
						"items.0.name": "アイテム名は必須です",
					},
				});
			});

			it("ZodError以外のエラーの場合は汎用エラーを返す", async () => {
				// validateRequestが非ZodErrorをスローするようにモック
				const mockSchema = {
					safeParse: vi.fn().mockImplementation(() => {
						throw new Error("予期しないエラー");
					}),
				} as unknown as z.ZodSchema;

				const [result, error] = await validateRequestWithError(
					mockSchema,
					{}
				);

				expect(result).toBeNull();
				expect(error).toEqual({
					error: "validation",
					message: "バリデーションに失敗しました",
					details: undefined,
				});
			});
		});

		describe("複数フィールドエラー", () => {
			it("複数のフィールドエラーを正しく処理する", async () => {
				const invalidData = {
					name: "",
					email: "invalid-email",
					age: -1,
				};

				const [result, error] = await validateRequestWithError(
					schema,
					invalidData
				);

				expect(result).toBeNull();
				expect(error?.details?.fieldErrors).toHaveProperty("name");
				expect(error?.details?.fieldErrors).toHaveProperty("email");
				expect(error?.details?.fieldErrors).toHaveProperty("age");
				expect(Object.keys(error?.details?.fieldErrors || {})).toHaveLength(3);
			});

			it("一部のフィールドが有効でも全体のエラーを返す", async () => {
				const partiallyValidData = {
					name: "太郎", // 有効
					email: "invalid-email", // 無効
					age: 25, // 有効
				};

				const [result, error] = await validateRequestWithError(
					schema,
					partiallyValidData
				);

				expect(result).toBeNull();
				expect(error?.details?.fieldErrors).toEqual({
					email: "有効なメールアドレスを入力してください",
				});
			});
		});

		describe("エッジケース", () => {
			it("空のスキーマでも正しく動作する", async () => {
				const emptySchema = z.object({});
				const [result, error] = await validateRequestWithError(
					emptySchema,
					{}
				);

				expect(result).toEqual({});
				expect(error).toBeNull();
			});

			it("空のパスを持つエラーを処理する", async () => {
				const rootSchema = z.string().min(1, "値は必須です");
				const [result, error] = await validateRequestWithError(
					rootSchema,
					""
				);

				expect(result).toBeNull();
				expect(error?.details?.fieldErrors).toEqual({
					"": "値は必須です",
				});
			});
		});
	});

	describe("createApiError統合テスト", () => {
		it("validateRequestWithErrorとcreateApiErrorが正しく連携する", async () => {
			const schema = z.object({
				email: z.string().email("無効なメールアドレス"),
			});

			const [result, error] = await validateRequestWithError(schema, {
				email: "invalid",
			});

			// createApiError.validationの戻り値の構造を確認
			const expectedError = createApiError.validation("入力データが無効です", {
				fieldErrors: { email: "無効なメールアドレス" },
			});

			expect(result).toBeNull();
			expect(error).toEqual(expectedError);
		});
	});
});