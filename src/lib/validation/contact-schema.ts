import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(1, {
    message: "お名前を入力してください",
  }),
  email: z.string().email({
    message: "有効なメールアドレスを入力してください",
  }),
  phoneContact: z.enum(["可", "不可"], {
    required_error: "電話連絡の可否を選択してください",
  }),
  phone: z.string().optional().refine(
    (val) => {
      if (val === undefined) return true;
      return /^\d{2,4}-\d{2,4}-\d{3,4}$/.test(val);
    },
    {
      message: "電話番号は「00-0000-0000」の形式で入力してください",
    }
  ),
  message: z.string().min(10, {
    message: "お問い合わせ内容は10文字以上で入力してください",
  }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
