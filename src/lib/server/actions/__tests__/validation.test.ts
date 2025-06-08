import { z } from "zod";
import {
	ActionError,
	formatZodErrors,
	validateAction,
	createFormSchema,
	formDefaults,
	type FieldErrors,
} from "../validation";

describe("server/actions/validation", () => {
	describe("ActionError", () => {
		it("基本的なエラーを作成する", () => {
			const error = new ActionError("テストエラー", "TEST_ERROR");

			expect(error.name).toBe("ActionError");
			expect(error.message).toBe("テストエラー");
			expect(error.code).toBe("TEST_ERROR");
			expect(error.details).toBeUndefined();
		});

		it("詳細情報付きのエラーを作成する", () => {
			const details = { field: "value", count: 123 };
			const error = new ActionError("エラーメッセージ", "ERROR_CODE", details);

			expect(error.message).toBe("エラーメッセージ");
			expect(error.code).toBe("ERROR_CODE");
			expect(error.details).toEqual(details);
		});

		it("Errorクラスを継承している", () => {
			const error = new ActionError("テスト", "TEST");

			expect(error instanceof Error).toBe(true);
			expect(error instanceof ActionError).toBe(true);
		});

		it("スタックトレースが含まれる", () => {
			const error = new ActionError("テスト", "TEST");

			expect(error.stack).toBeDefined();
			expect(typeof error.stack).toBe("string");
		});
	});

	describe("formatZodErrors", () => {
		it("単一フィールドエラーを正しくフォーマットする", () => {
			const schema = z.object({
				email: z.string().email("無効なメールアドレスです"),
			});

			try {
				schema.parse({ email: "invalid-email" });
			} catch (error) {
				if (error instanceof z.ZodError) {
					const fieldErrors = formatZodErrors(error);
					expect(fieldErrors).toEqual({
						email: "無効なメールアドレスです",
					});
				}
			}
		});

		it("複数フィールドエラーを正しくフォーマットする", () => {
			const schema = z.object({
				email: z.string().email("無効なメールアドレス"),
				password: z.string().min(8, "パスワードは8文字以上"),
				age: z.number().min(18, "18歳以上である必要があります"),
			});

			try {
				schema.parse({
					email: "invalid",
					password: "123",
					age: 15,
				});
			} catch (error) {
				if (error instanceof z.ZodError) {
					const fieldErrors = formatZodErrors(error);
					expect(fieldErrors).toEqual({
						email: "無効なメールアドレス",
						password: "パスワードは8文字以上",
						age: "18歳以上である必要があります",
					});
				}
			}
		});

		it("ネストされたオブジェクトのエラーを正しくフォーマットする", () => {
			const schema = z.object({
				user: z.object({
					profile: z.object({
						name: z.string().min(1, "名前は必須です"),
					}),
				}),
			});

			try {
				schema.parse({ user: { profile: { name: "" } } });
			} catch (error) {
				if (error instanceof z.ZodError) {
					const fieldErrors = formatZodErrors(error);
					expect(fieldErrors).toEqual({
						"user.profile.name": "名前は必須です",
					});
				}
			}
		});

		it("配列要素のエラーを正しくフォーマットする", () => {
			const schema = z.object({
				tags: z.array(z.string().min(1, "タグは空にできません")),
			});

			try {
				schema.parse({ tags: ["valid", "", "also-valid"] });
			} catch (error) {
				if (error instanceof z.ZodError) {
					const fieldErrors = formatZodErrors(error);
					expect(fieldErrors).toEqual({
						"tags.1": "タグは空にできません",
					});
				}
			}
		});

		it("空のエラー配列で空オブジェクトを返す", () => {
			// 手動でZodErrorを作成（通常は発生しないケース）
			const zodError = new z.ZodError([]);
			const fieldErrors = formatZodErrors(zodError);

			expect(fieldErrors).toEqual({});
		});
	});

	describe("validateAction", () => {
		const testSchema = z.object({
			name: z.string().min(1, "名前は必須です"),
			email: z.string().email("無効なメールアドレスです"),
			age: z.number().min(0, "年齢は0以上である必要があります"),
		});

		it("有効なデータで成功する", async () => {
			const validData = {
				name: "テストユーザー",
				email: "test@example.com",
				age: 25,
			};

			const result = await validateAction(testSchema, validData);

			expect(result).toEqual(validData);
		});

		it("無効なデータでActionErrorをスローする", async () => {
			const invalidData = {
				name: "",
				email: "invalid-email",
				age: -1,
			};

			await expect(validateAction(testSchema, invalidData)).rejects.toThrow(
				ActionError,
			);

			try {
				await validateAction(testSchema, invalidData);
			} catch (error) {
				if (error instanceof ActionError) {
					expect(error.message).toBe("入力データが無効です");
					expect(error.code).toBe("VALIDATION_ERROR");
					expect(error.details?.fieldErrors).toEqual({
						name: "名前は必須です",
						email: "無効なメールアドレスです",
						age: "年齢は0以上である必要があります",
					});
				}
			}
		});

		it("カスタムエラーメッセージを使用する", async () => {
			const invalidData = { name: "", email: "invalid", age: -1 };

			try {
				await validateAction(testSchema, invalidData, {
					errorMessage: "カスタムエラーメッセージ",
				});
			} catch (error) {
				if (error instanceof ActionError) {
					expect(error.message).toBe("カスタムエラーメッセージ");
				}
			}
		});

		it("ZodError以外のエラーを適切に処理する", async () => {
			// 故意にエラーを発生させるスキーマを作成
			const problematicSchema = {
				parse: () => {
					throw new Error("予期しないエラー");
				},
			} as unknown as z.ZodType;

			await expect(validateAction(problematicSchema, {})).rejects.toThrow(
				ActionError,
			);

			try {
				await validateAction(problematicSchema, {});
			} catch (error) {
				if (error instanceof ActionError) {
					expect(error.message).toBe("バリデーションエラー");
					expect(error.code).toBe("UNKNOWN_VALIDATION_ERROR");
				}
			}
		});

		it("型推論が正しく動作する", async () => {
			const schema = z.object({
				id: z.number(),
				title: z.string(),
			});

			const data = { id: 1, title: "テスト" };
			const result = await validateAction(schema, data);

			// TypeScriptの型チェックのため
			expect(typeof result.id).toBe("number");
			expect(typeof result.title).toBe("string");
			expect(result.id).toBe(1);
			expect(result.title).toBe("テスト");
		});

		it("undefinedデータでバリデーションエラー", async () => {
			await expect(validateAction(testSchema, undefined)).rejects.toThrow(
				ActionError,
			);
		});

		it("nullデータでバリデーションエラー", async () => {
			await expect(validateAction(testSchema, null)).rejects.toThrow(
				ActionError,
			);
		});
	});

	describe("createFormSchema", () => {
		it("同じスキーマを返す", () => {
			const originalSchema = z.object({
				name: z.string(),
				age: z.number(),
			});

			const formSchema = createFormSchema(originalSchema);

			expect(formSchema).toBe(originalSchema);
		});

		it("型推論が正しく動作する", () => {
			const schema = createFormSchema(
				z.object({
					email: z.string().email(),
					count: z.number(),
				}),
			);

			// TypeScriptの型チェックのため
			const validData = { email: "test@example.com", count: 5 };
			const result = schema.parse(validData);

			expect(result.email).toBe("test@example.com");
			expect(result.count).toBe(5);
		});

		it("複雑なスキーマでも動作する", () => {
			const complexSchema = createFormSchema(
				z.object({
					user: z.object({
						profile: z.object({
							name: z.string(),
							settings: z.array(z.string()),
						}),
					}),
					metadata: z.record(z.string(), z.unknown()),
				}),
			);

			expect(complexSchema).toBeDefined();
			expect(typeof complexSchema.parse).toBe("function");
		});
	});

	describe("formDefaults", () => {
		const schema = z.object({
			name: z.string(),
			email: z.string(),
			age: z.number(),
			active: z.boolean(),
		});

		it("部分的なデフォルト値を返す", () => {
			const defaults = formDefaults(schema, {
				name: "デフォルト名",
				active: true,
			});

			expect(defaults).toEqual({
				name: "デフォルト名",
				active: true,
			});
		});

		it("空のデフォルト値を処理する", () => {
			const defaults = formDefaults(schema, {});

			expect(defaults).toEqual({});
		});

		it("すべてのフィールドのデフォルト値を設定する", () => {
			const allDefaults = formDefaults(schema, {
				name: "テスト",
				email: "test@example.com",
				age: 30,
				active: false,
			});

			expect(allDefaults).toEqual({
				name: "テスト",
				email: "test@example.com",
				age: 30,
				active: false,
			});
		});

		it("型安全性を維持する", () => {
			// TypeScriptの型チェックのため - 無効な型を渡すとコンパイルエラー
			const defaults = formDefaults(schema, {
				name: "有効な文字列",
				// age: "無効な型", // これはTypeScriptエラーになる
			});

			expect(defaults.name).toBe("有効な文字列");
		});
	});

	describe("型定義", () => {
		it("FieldErrors型が正しく動作する", () => {
			const fieldErrors: FieldErrors = {
				email: "メールアドレスが無効です",
				password: "パスワードが短すぎます",
				"user.name": "ネストされたフィールドエラー",
			};

			expect(fieldErrors.email).toBe("メールアドレスが無効です");
			expect(fieldErrors.password).toBe("パスワードが短すぎます");
			expect(fieldErrors["user.name"]).toBe("ネストされたフィールドエラー");
		});
	});

	describe("統合テスト", () => {
		it("完全なバリデーションフローが動作する", async () => {
			// スキーマ作成
			const userSchema = createFormSchema(
				z.object({
					username: z.string().min(3, "ユーザー名は3文字以上"),
					email: z.string().email("無効なメールアドレス"),
					profile: z.object({
						age: z.number().min(18, "18歳以上である必要があります"),
					}),
				}),
			);

			// デフォルト値設定
			const defaults = formDefaults(userSchema, {
				username: "",
				email: "",
			});

			// バリデーション実行（失敗ケース）
			const invalidData = {
				...defaults,
				username: "ab", // 短すぎる
				email: "invalid", // 無効なメール
				profile: { age: 16 }, // 年齢不足
			};

			try {
				await validateAction(userSchema, invalidData);
			} catch (error) {
				if (error instanceof ActionError) {
					expect(error.code).toBe("VALIDATION_ERROR");
					const fieldErrors = error.details?.fieldErrors as FieldErrors;
					expect(fieldErrors.username).toBe("ユーザー名は3文字以上");
					expect(fieldErrors.email).toBe("無効なメールアドレス");
					expect(fieldErrors["profile.age"]).toBe(
						"18歳以上である必要があります",
					);
				}
			}

			// バリデーション実行（成功ケース）
			const validData = {
				username: "testuser",
				email: "test@example.com",
				profile: { age: 25 },
			};

			const result = await validateAction(userSchema, validData);
			expect(result).toEqual(validData);
		});
	});
});
