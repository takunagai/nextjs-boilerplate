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
// Server Actionsユーティリティ
export {
	createActionError,
	createErrorResult,
	createSafeAction,
	createSuccessResult,
} from "./action-utils";
// Server Actions実行関数
export { executeServerAction } from "./actions";
// 既存のサーバーアクションユーティリティ
export * from "./actions/error";
export * from "./actions/validation";
// APIレスポンスユーティリティ
export * from "./api/response";
export * from "./api/validation";
// お問い合わせ関連のServer Actions
export { contactFormAction, testContactFormAction } from "./contact-actions";
