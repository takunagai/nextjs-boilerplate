"use server";

/**
 * お問い合わせフォーム用のServer Actions
 *
 * 既存のcontact-schema.tsと統合し、
 * use-form-submissionとの並行運用をサポートします。
 */

import type { ContactFormValues } from "@/lib/validation/contact-schema";
import { generateId } from "@/lib/utils/id";
import { contactFormSchema } from "@/lib/validation/contact-schema";
import { createSafeAction } from "./action-utils";

/**
 * お問い合わせフォーム送信のServer Action
 *
 * @param data - バリデーション済みのお問い合わせデータ
 * @returns 送信結果
 */
async function handleContactSubmission(data: ContactFormValues) {
	try {
		// ここで実際のお問い合わせ処理を実装
		// 例: メール送信、データベース保存など
		console.log("Contact form submitted:", data);

		// デモンストレーション用の遅延（実際の処理時間をシミュレート）
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// 成功レスポンス
		return {
			message: "お問い合わせを受け付けました。ありがとうございます。",
			submissionId: `contact_${generateId()}`,
			data,
		};
	} catch (error) {
		console.error("Contact submission failed:", error);
		throw new Error(
			"お問い合わせの送信に失敗しました。しばらくしてから再度お試しください。",
		);
	}
}

/**
 * お問い合わせフォーム用のServer Action
 *
 * contactFormSchemaを使用してバリデーションを行い、
 * 型安全なフォーム処理を提供します。
 */
export const contactFormAction = createSafeAction(
	contactFormSchema,
	handleContactSubmission,
);

/**
 * お問い合わせフォームのテスト用Server Action
 *
 * 開発・テスト目的で使用する簡素化されたAction
 */
export const testContactFormAction = createSafeAction(
	contactFormSchema,
	async (data: ContactFormValues) => {
		// テスト用の即座に成功するレスポンス
		return {
			message: "テスト送信が完了しました",
			testMode: true,
			data,
		};
	},
);
