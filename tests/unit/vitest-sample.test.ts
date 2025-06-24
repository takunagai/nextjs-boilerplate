import { describe, expect, it } from "vitest";
import { cn } from "@/lib/utils";
import { formExampleSchema } from "@/lib/validation/form-example-schema";

describe("ユーティリティ関数テスト", () => {
	it("cn関数: Tailwindのクラスをマージできるかをテスト", () => {
		// 基本的なクラスの結合
		expect(cn("text-red-500", "bg-blue-200")).toBe("text-red-500 bg-blue-200");

		// 条件付きクラスの結合
		const isPrimary = true;
		expect(cn("btn", isPrimary && "btn-primary")).toBe("btn btn-primary");

		// 配列とオブジェクト形式のクラス
		expect(cn("btn", ["p-2", "m-1"], { rounded: true, shadow: false })).toBe(
			"btn p-2 m-1 rounded",
		);

		// クラスの競合解決（tailwind-mergeの機能）
		expect(cn("p-2 p-4")).toBe("p-4");
		expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
	});
});

describe("フォームバリデーションテスト", () => {
	it("有効なフォームデータを検証できるかをテスト", () => {
		// 正しいデータで検証
		const validData = {
			name: "田中太郎",
			email: "tanaka@example.com",
			age: 30,
			message: "これはテストメッセージです。10文字以上の入力です。",
			terms: true,
		};

		const result = formExampleSchema.safeParse(validData);
		expect(result.success).toBe(true);
	});

	it("無効なフォームデータのエラーメッセージをテスト", () => {
		// 無効なデータで検証
		const invalidData = {
			name: "", // 空の名前（エラー）
			email: "invalid-email", // 無効なメール形式（エラー）
			age: 10, // 18歳未満（エラー）
			message: "短すぎ", // 10文字未満（エラー）
			terms: false, // 利用規約に同意しない（エラー）
		};

		const result = formExampleSchema.safeParse(invalidData);
		expect(result.success).toBe(false);

		// 型アサーションでエラーオブジェクトを取得
		if (!result.success) {
			const errors = result.error.flatten().fieldErrors;

			// 各フィールドのエラーを検証
			expect(errors.name).toBeDefined();
			expect(errors.email).toBeDefined();
			expect(errors.age).toBeDefined();
			expect(errors.message).toBeDefined();
			expect(errors.terms).toBeDefined();

			// 特定のエラーメッセージを検証
			expect(errors.name?.[0]).toBe("名前を入力してください");
			expect(errors.email?.[0]).toBe("有効なメールアドレスを入力してください");
			expect(errors.terms?.[0]).toBe("利用規約に同意してください");
		}
	});
});
