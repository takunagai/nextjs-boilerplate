import { z } from "zod";
import { vi } from "vitest";
import {
	safeAction,
	isActionSuccess,
	isActionError,
	type ActionResult,
} from "../error";
import { ActionError } from "../validation";

describe("server/actions/error", () => {
	beforeEach(() => {
		// console.errorをモックして出力を抑制
		console.error = vi.fn();
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("safeAction", () => {
		describe("成功ケース", () => {
			it("成功した結果を返す", async () => {
				const successFn = async () => {
					return { id: 1, name: "テスト" };
				};

				const result = await safeAction(successFn);

				expect(result.success).toBe(true);
				expect(result.data).toEqual({ id: 1, name: "テスト" });
				expect(result.error).toBeUndefined();
			});

			it("nullを返す関数でも正しく処理する", async () => {
				const nullFn = async () => null;

				const result = await safeAction(nullFn);

				expect(result.success).toBe(true);
				expect(result.data).toBeNull();
				expect(result.error).toBeUndefined();
			});

			it("undefinedを返す関数でも正しく処理する", async () => {
				const undefinedFn = async () => undefined;

				const result = await safeAction(undefinedFn);

				expect(result.success).toBe(true);
				expect(result.data).toBeUndefined();
				expect(result.error).toBeUndefined();
			});

			it("プリミティブ値を返す関数も処理する", async () => {
				const stringFn = async () => "テスト文字列";
				const numberFn = async () => 42;
				const booleanFn = async () => true;

				const stringResult = await safeAction(stringFn);
				const numberResult = await safeAction(numberFn);
				const booleanResult = await safeAction(booleanFn);

				expect(stringResult.data).toBe("テスト文字列");
				expect(numberResult.data).toBe(42);
				expect(booleanResult.data).toBe(true);
			});
		});

		describe("ActionErrorの処理", () => {
			it("ActionErrorを適切に処理する", async () => {
				const errorFn = async () => {
					throw new ActionError("カスタムエラー", "CUSTOM_ERROR");
				};

				const result = await safeAction(errorFn);

				expect(result.success).toBe(false);
				expect(result.data).toBeUndefined();
				expect(result.error).toEqual({
					code: "CUSTOM_ERROR",
					message: "カスタムエラー",
					details: undefined,
				});
				expect(console.error).toHaveBeenCalledWith(
					"Action error:",
					expect.any(ActionError),
				);
			});

			it("詳細情報付きのActionErrorを処理する", async () => {
				const details = { fieldErrors: { email: "無効なメール" } };
				const errorFn = async () => {
					throw new ActionError(
						"バリデーションエラー",
						"VALIDATION_ERROR",
						details,
					);
				};

				const result = await safeAction(errorFn);

				expect(result.success).toBe(false);
				expect(result.error).toEqual({
					code: "VALIDATION_ERROR",
					message: "バリデーションエラー",
					details,
				});
			});
		});

		describe("ZodErrorの処理", () => {
			it("ZodErrorを適切に処理する", async () => {
				const schema = z.object({
					email: z.string().email("無効なメールアドレス"),
					age: z.number().min(0, "年齢は0以上"),
				});

				const errorFn = async () => {
					schema.parse({ email: "invalid", age: -1 });
				};

				const result = await safeAction(errorFn);

				expect(result.success).toBe(false);
				expect(result.error?.code).toBe("VALIDATION_ERROR");
				expect(result.error?.message).toBe("入力データが無効です");
				expect(result.error?.details?.fieldErrors).toEqual({
					email: "無効なメールアドレス",
					age: "年齢は0以上",
				});
			});

			it("ネストされたオブジェクトのZodErrorを処理する", async () => {
				const schema = z.object({
					user: z.object({
						profile: z.object({
							name: z.string().min(1, "名前は必須"),
						}),
					}),
				});

				const errorFn = async () => {
					schema.parse({ user: { profile: { name: "" } } });
				};

				const result = await safeAction(errorFn);

				expect(result.success).toBe(false);
				expect(result.error?.details?.fieldErrors).toEqual({
					"user.profile.name": "名前は必須",
				});
			});
		});

		describe("一般的なErrorの処理", () => {
			it("標準のErrorを処理する", async () => {
				const errorFn = async () => {
					throw new Error("標準エラーメッセージ");
				};

				const result = await safeAction(errorFn);

				expect(result.success).toBe(false);
				expect(result.error).toEqual({
					code: "UNKNOWN_ERROR",
					message: "標準エラーメッセージ",
				});
				expect(console.error).toHaveBeenCalled();
			});

			it("文字列エラーを処理する", async () => {
				const errorFn = async () => {
					throw "文字列エラー";
				};

				const result = await safeAction(errorFn);

				expect(result.success).toBe(false);
				expect(result.error).toEqual({
					code: "UNKNOWN_ERROR",
					message: "不明なエラーが発生しました",
				});
			});

			it("null/undefinedエラーを処理する", async () => {
				const nullErrorFn = async () => {
					throw null;
				};

				const undefinedErrorFn = async () => {
					throw undefined;
				};

				const nullResult = await safeAction(nullErrorFn);
				const undefinedResult = await safeAction(undefinedErrorFn);

				expect(nullResult.error?.message).toBe("不明なエラーが発生しました");
				expect(undefinedResult.error?.message).toBe(
					"不明なエラーが発生しました",
				);
			});

			it("オブジェクトエラーを処理する", async () => {
				const errorFn = async () => {
					throw { custom: "object", code: 500 };
				};

				const result = await safeAction(errorFn);

				expect(result.success).toBe(false);
				expect(result.error?.message).toBe("不明なエラーが発生しました");
			});
		});

		describe("非同期エラーの処理", () => {
			it("Promiseのrejectを処理する", async () => {
				const rejectFn = async () => {
					return Promise.reject(new Error("Promise reject"));
				};

				const result = await safeAction(rejectFn);

				expect(result.success).toBe(false);
				expect(result.error?.message).toBe("Promise reject");
			});

			it("複数の非同期処理でのエラーを処理する", async () => {
				const complexAsyncFn = async () => {
					await Promise.resolve();
					await new Promise((resolve) => setTimeout(resolve, 1));
					throw new Error("複雑な非同期エラー");
				};

				const result = await safeAction(complexAsyncFn);

				expect(result.success).toBe(false);
				expect(result.error?.message).toBe("複雑な非同期エラー");
			});
		});
	});

	describe("isActionSuccess", () => {
		it("成功結果を正しく判定する", () => {
			const successResult: ActionResult<string> = {
				success: true,
				data: "成功データ",
			};

			expect(isActionSuccess(successResult)).toBe(true);

			if (isActionSuccess(successResult)) {
				// 型ガードにより、この中では data が確実に存在する
				expect(successResult.data).toBe("成功データ");
			}
		});

		it("エラー結果を正しく判定する", () => {
			const errorResult: ActionResult<string> = {
				success: false,
				error: {
					code: "ERROR",
					message: "エラーメッセージ",
				},
			};

			expect(isActionSuccess(errorResult)).toBe(false);
		});

		it("型ガードが正しく動作する", () => {
			const result: ActionResult<{ id: number; name: string }> = {
				success: true,
				data: { id: 1, name: "テスト" },
			};

			if (isActionSuccess(result)) {
				// TypeScriptの型チェック - この内部では result.data が保証される
				expect(result.data.id).toBe(1);
				expect(result.data.name).toBe("テスト");
			}
		});
	});

	describe("isActionError", () => {
		it("エラー結果を正しく判定する", () => {
			const errorResult: ActionResult<string> = {
				success: false,
				error: {
					code: "TEST_ERROR",
					message: "テストエラー",
				},
			};

			expect(isActionError(errorResult)).toBe(true);

			if (isActionError(errorResult)) {
				// 型ガードにより、この中では error が確実に存在する
				expect(errorResult.error.code).toBe("TEST_ERROR");
				expect(errorResult.error.message).toBe("テストエラー");
			}
		});

		it("成功結果を正しく判定する", () => {
			const successResult: ActionResult<string> = {
				success: true,
				data: "成功データ",
			};

			expect(isActionError(successResult)).toBe(false);
		});

		it("詳細情報付きエラーを処理する", () => {
			const errorResult: ActionResult<string> = {
				success: false,
				error: {
					code: "VALIDATION_ERROR",
					message: "バリデーションエラー",
					details: {
						fieldErrors: { email: "無効なメール" },
					},
				},
			};

			if (isActionError(errorResult)) {
				expect(errorResult.error.details?.fieldErrors).toEqual({
					email: "無効なメール",
				});
			}
		});
	});

	describe("型安全性", () => {
		it("ActionResult型が正しく推論される", async () => {
			const numberFn = async () => 42;
			const stringFn = async () => "テスト";
			const objectFn = async () => ({ id: 1, name: "テスト" });

			const numberResult = await safeAction(numberFn);
			const stringResult = await safeAction(stringFn);
			const objectResult = await safeAction(objectFn);

			// TypeScriptの型チェック
			if (isActionSuccess(numberResult)) {
				expect(typeof numberResult.data).toBe("number");
			}

			if (isActionSuccess(stringResult)) {
				expect(typeof stringResult.data).toBe("string");
			}

			if (isActionSuccess(objectResult)) {
				expect(typeof objectResult.data?.id).toBe("number");
				expect(typeof objectResult.data?.name).toBe("string");
			}
		});
	});

	describe("統合テスト", () => {
		it("完全なエラーハンドリングフローが動作する", async () => {
			// 成功ケース
			const successAction = async () => {
				return { userId: 123, status: "created" };
			};

			const successResult = await safeAction(successAction);

			expect(isActionSuccess(successResult)).toBe(true);
			expect(isActionError(successResult)).toBe(false);

			if (isActionSuccess(successResult)) {
				expect(successResult.data.userId).toBe(123);
				expect(successResult.data.status).toBe("created");
			}

			// ActionErrorケース
			const actionErrorFn = async () => {
				throw new ActionError("認証エラー", "AUTH_ERROR", {
					userId: 123,
				});
			};

			const actionErrorResult = await safeAction(actionErrorFn);

			expect(isActionError(actionErrorResult)).toBe(true);
			expect(isActionSuccess(actionErrorResult)).toBe(false);

			if (isActionError(actionErrorResult)) {
				expect(actionErrorResult.error.code).toBe("AUTH_ERROR");
				expect(actionErrorResult.error.details?.userId).toBe(123);
			}

			// ZodErrorケース
			const zodErrorFn = async () => {
				const schema = z.object({
					email: z.string().email(),
				});
				schema.parse({ email: "invalid" });
			};

			const zodErrorResult = await safeAction(zodErrorFn);

			expect(isActionError(zodErrorResult)).toBe(true);

			if (isActionError(zodErrorResult)) {
				expect(zodErrorResult.error.code).toBe("VALIDATION_ERROR");
				expect(zodErrorResult.error.details?.fieldErrors).toBeDefined();
			}
		});
	});
});
