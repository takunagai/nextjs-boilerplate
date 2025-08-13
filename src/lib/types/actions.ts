/**
 * Server Actions関連の型定義
 *
 * Next.js 15 Server Actionsとの統合で使用する
 * 型安全なAction結果とフォームステートを提供します。
 */

/**
 * Server Actionの成功結果
 */
export interface ActionSuccessResult<T = unknown> {
	readonly success: true;
	readonly data: T;
	readonly message?: string;
}

/**
 * Server Actionのエラー結果
 */
export interface ActionErrorResult {
	readonly success: false;
	readonly error: string;
	readonly fieldErrors?: Readonly<Record<string, readonly string[]>>;
}

/**
 * Server Actionの結果型（discriminated union）
 */
export type ActionResult<T = unknown> =
	| ActionSuccessResult<T>
	| ActionErrorResult;

/**
 * フォームActionの状態
 */
export interface FormActionState<T = unknown> {
	readonly result?: ActionResult<T>;
	readonly isPending: boolean;
}

/**
 * Server Actionのオプション設定
 */
export interface ActionOptions {
	readonly revalidatePath?: string;
	readonly revalidateTag?: string;
	readonly redirect?: string;
}

/**
 * 認証用のServer Action結果
 */
export interface AuthActionResult
	extends ActionSuccessResult<{ redirectUrl?: string }> {
	readonly redirectUrl?: string;
}

/**
 * Server Actionハンドラーの型
 */
export type ServerActionHandler<TInput, TOutput = unknown> = (
	input: TInput,
	options?: ActionOptions,
) => Promise<ActionResult<TOutput>>;

/**
 * フォームServer Actionハンドラーの型
 */
export type FormServerActionHandler<T = unknown> = (
	prevState: unknown,
	formData: FormData,
) => Promise<ActionResult<T>>;
