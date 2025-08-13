/**
 * サーバーサイドユーティリティのエントリーポイント
 *
 * すべてのサーバーサイドユーティリティをこのファイルから再エクスポートします。
 * これにより、クライアントコードは単一のインポート文でユーティリティにアクセスできます。
 */

// 型定義の再エクスポート
export type {
	ActionErrorResult,
	ActionOptions,
	ActionResult,
	ActionSuccessResult,
	AuthActionResult,
	FormActionState,
	FormServerActionHandler,
	ServerActionHandler,
} from "@/lib/types/actions";
// 新しいServer Actions基盤（Next.js 15統合）
export {
	createActionError,
	createErrorResult,
	createSafeAction,
	createSuccessResult,
	executeServerAction,
} from "./actions";
// 既存のサーバーアクションユーティリティ
export * from "./actions/error";
export * from "./actions/validation";
// APIレスポンスユーティリティ
export * from "./api/response";
export * from "./api/validation";
// お問い合わせ関連のServer Actions
export { contactFormAction, testContactFormAction } from "./contact-actions";
