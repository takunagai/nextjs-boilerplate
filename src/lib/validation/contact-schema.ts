import { z } from "zod";

export const contactFormSchema = z
	.object({
		name: z.string().min(1, {
			message: "お名前を入力してください",
		}),
		email: z.string().email({
			message: "有効なメールアドレスを入力してください",
		}),
		phoneContact: z.enum(["可", "不可"], {
			message: "電話連絡の可否を選択してください",
		}),
		phone: z.string().optional(),
		message: z.string().min(10, {
			message: "お問い合わせ内容は10文字以上で入力してください",
		}),
	})
	.refine(
		(data) => {
			if (data.phoneContact === "可") {
				// 電話連絡可の場合、電話番号は必須で正しい形式である必要がある
				if (!data.phone || data.phone === "") {
					return false;
				}
				return /^\d{2,4}-\d{2,4}-\d{3,4}$/.test(data.phone);
			}
			// 電話連絡不可の場合、電話番号の形式チェックのみ（入力されている場合）
			if (data.phone && data.phone !== "") {
				return /^\d{2,4}-\d{2,4}-\d{3,4}$/.test(data.phone);
			}
			return true;
		},
		{
			message: "電話番号は「00-0000-0000」の形式で入力してください",
			path: ["phone"],
		},
	);

export type ContactFormValues = z.infer<typeof contactFormSchema>;
