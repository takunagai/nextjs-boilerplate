import { describe, expect, it } from "vitest";
import {
	ActionError,
	type ActionResult,
	isActionError,
	isActionSuccess,
} from "@/lib/server";

describe("サーバーアクションエラーユーティリティ", () => {
	describe("ActionError", () => {
		it("基本的なエラーオブジェクトを作成できる", () => {
			const error = new ActionError("エラーメッセージ", "TEST_ERROR");

			expect(error).toBeInstanceOf(Error);
			expect(error.message).toBe("エラーメッセージ");
			expect(error.code).toBe("TEST_ERROR");
			expect(error.details).toBeUndefined();
		});

		it("詳細情報を含むエラーオブジェクトを作成できる", () => {
			const details = { fieldErrors: { name: "エラー" } };
			const error = new ActionError(
				"エラーメッセージ",
				"VALIDATION_ERROR",
				details,
			);

			expect(error.message).toBe("エラーメッセージ");
			expect(error.code).toBe("VALIDATION_ERROR");
			expect(error.details).toEqual(details);
		});
	});

	describe("成功結果とエラー結果の作成", () => {
		it("成功結果オブジェクトを作成できる", () => {
			const data = { id: 1, name: "テスト" };
			const result: ActionResult<typeof data> = {
				success: true,
				data,
			};

			expect(result.success).toBe(true);
			expect(result.data).toEqual(data);
		});

		it("基本的なエラー結果オブジェクトを作成できる", () => {
			const result: ActionResult<unknown> = {
				success: false,
				error: {
					code: "TEST_ERROR",
					message: "エラーメッセージ",
				},
			};

			expect(result.success).toBe(false);
			expect(result.error?.code).toBe("TEST_ERROR");
			expect(result.error?.message).toBe("エラーメッセージ");
			expect(result.error?.details).toBeUndefined();
		});

		it("詳細情報を含むエラー結果オブジェクトを作成できる", () => {
			const details = { fieldErrors: { name: "エラー" } };
			const result: ActionResult<unknown> = {
				success: false,
				error: {
					code: "VALIDATION_ERROR",
					message: "バリデーションエラー",
					details,
				},
			};

			expect(result.success).toBe(false);
			expect(result.error?.code).toBe("VALIDATION_ERROR");
			expect(result.error?.message).toBe("バリデーションエラー");
			expect(result.error?.details).toEqual(details);
		});
	});

	describe("isActionSuccess / isActionError", () => {
		it("成功結果を正しく判定できる", () => {
			const successResult: ActionResult<{ message: string }> = {
				success: true,
				data: { message: "成功" },
			};

			expect(isActionSuccess(successResult)).toBe(true);
			expect(isActionError(successResult)).toBe(false);
		});

		it("エラー結果を正しく判定できる", () => {
			const errorResult: ActionResult<unknown> = {
				success: false,
				error: {
					code: "TEST_ERROR",
					message: "エラー",
				},
			};

			expect(isActionSuccess(errorResult)).toBe(false);
			expect(isActionError(errorResult)).toBe(true);
		});
	});
});
