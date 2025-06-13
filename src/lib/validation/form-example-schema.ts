import { z } from "zod";

export const formExampleSchema = z.object({
	name: z
		.string()
		.min(1, { message: "名前を入力してください" })
		.max(50, { message: "名前は50文字以内で入力してください" }),
	email: z
		.string()
		.min(1, { message: "メールアドレスを入力してください" })
		.email({ message: "有効なメールアドレスを入力してください" }),
	age: z
		.number({
			message: "年齢は数値で入力してください",
		})
		.int({ message: "年齢は整数で入力してください" })
		.positive({ message: "年齢は正の数で入力してください" })
		.min(18, { message: "年齢は18歳以上で入力してください" })
		.max(120, { message: "年齢は120歳以下で入力してください" })
		.optional(),
	message: z
		.string()
		.min(10, { message: "メッセージは10文字以上で入力してください" })
		.max(500, { message: "メッセージは500文字以内で入力してください" }),
	terms: z.boolean({
		required_error: "利用規約への同意が必要です",
	}).refine((val) => val === true, {
		message: "利用規約に同意してください",
	}),
});

export type FormExampleValues = z.infer<typeof formExampleSchema>;
