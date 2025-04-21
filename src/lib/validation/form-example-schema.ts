import { z } from "zod";

export const formExampleSchema = z.object({
	name: z
		.string()
		.min(1, { error: "名前を入力してください" })
		.max(50, { error: "名前は50文字以内で入力してください" }),
	email: z
		.string()
		.min(1, { error: "メールアドレスを入力してください" })
		.email({ error: "有効なメールアドレスを入力してください" }),
	age: z
		.number({
			error: (issue) =>
				issue.input === undefined
					? "年齢を入力してください"
					: "年齢は数値で入力してください",
		})
		.int({ error: "年齢は整数で入力してください" })
		.positive({ error: "年齢は正の数で入力してください" })
		.min(18, { error: "年齢は18歳以上で入力してください" })
		.max(120, { error: "年齢は120歳以下で入力してください" })
		.optional(),
	message: z
		.string()
		.min(10, { error: "メッセージは10文字以上で入力してください" })
		.max(500, { error: "メッセージは500文字以内で入力してください" }),
	terms: z.boolean().refine((val) => val === true, {
		error: "利用規約に同意してください",
	}),
});

export type FormExampleValues = z.infer<typeof formExampleSchema>;
