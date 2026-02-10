/**
 * ビジネス情報の定数
 *
 * ボイラープレート利用者へ:
 * このファイルの値を自社の情報に置き換えてください。
 * プライバシーポリシー、お問い合わせページ等で使用されます。
 */

export const BUSINESS = {
	/** 会社名・屋号 */
	COMPANY_NAME: "株式会社〇〇", // TODO: 本番環境で更新
	/** 郵便番号 */
	POSTAL_CODE: "〒000-0000", // TODO: 本番環境で更新
	/** 住所 */
	ADDRESS: "東京都〇〇区〇〇町1-2-3", // TODO: 本番環境で更新
	/** 代表メールアドレス */
	EMAIL: "privacy@example.com", // TODO: 本番環境で更新
	/** 電話番号 */
	PHONE: "03-1234-5678", // TODO: 本番環境で更新
	/** LINE公式アカウントURL */
	LINE_URL: "https://line.me/ti/p/gwTCBKP8jY",
	/** 営業時間 */
	BUSINESS_HOURS: "平日 9:00〜18:00",
	/** 休業日 */
	HOLIDAYS: "土日祝休み",
	/** 電話受付時間 */
	PHONE_HOURS: "平日 10:00〜17:00",
	/** 問い合わせ返信目安 */
	REPLY_ESTIMATE: "3営業日以内",
} as const;
