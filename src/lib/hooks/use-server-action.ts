/**
 * React 19 useActionState統合フック
 *
 * Server Actionsとの型安全な統合を提供し、
 * 既存のuse-form-submissionと並行して使用可能です。
 */

import { useActionState } from "react";
import type { ActionResult } from "@/lib/types/actions";

/**
 * useServerActionの戻り値型
 */
export interface UseServerActionReturn<T> {
	readonly state: ActionResult<T> | null;
	readonly formAction: (formData: FormData) => void;
	readonly isPending: boolean;
	readonly isSuccess: boolean;
	readonly isError: boolean;
	readonly data: T | null;
	readonly error: string | null;
	readonly fieldErrors: Record<string, readonly string[]>;
}

/**
 * Server Actionフォーム用のReact 19統合フック
 *
 * @param action - Server Actionハンドラー
 * @param initialState - 初期状態（オプション）
 * @returns Server Actionの状態と実行関数
 *
 * @example
 * ```tsx
 * const { formAction, isPending, isSuccess, error } = useServerAction(
 *   contactFormAction
 * );
 *
 * return (
 *   <form action={formAction}>
 *     <input name="email" />
 *     <button disabled={isPending}>
 *       {isPending ? "送信中..." : "送信"}
 *     </button>
 *     {error && <p className="error">{error}</p>}
 *   </form>
 * );
 * ```
 */
export function useServerAction<T>(
	action: (prevState: unknown, formData: FormData) => Promise<ActionResult<T>>,
	initialState?: ActionResult<T> | null,
): UseServerActionReturn<T> {
	const [state, formAction, isPending] = useActionState(
		action,
		initialState ?? null,
	);

	const isSuccess = state?.success === true;
	const isError = state?.success === false;
	const data = isSuccess ? state.data : null;
	const error = isError && state.error ? state.error.message : null;
	const fieldErrors = isError ? (state.fieldErrors ?? {}) : {};

	return {
		state,
		formAction,
		isPending,
		isSuccess,
		isError,
		data,
		error,
		fieldErrors,
	};
}

/**
 * オプション付きServer Actionフック
 */
export interface UseServerActionWithOptionsReturn<T>
	extends UseServerActionReturn<T> {
	readonly reset: () => void;
	readonly hasFieldError: (field: string) => boolean;
	readonly getFieldError: (field: string) => string | null;
}

/**
 * 拡張オプション付きServer Actionフック
 *
 * @param action - Server Actionハンドラー
 * @param options - 追加オプション
 * @returns 拡張された状態と実行関数
 */
export function useServerActionWithOptions<T>(
	action: (prevState: unknown, formData: FormData) => Promise<ActionResult<T>>,
	options?: {
		readonly initialState?: ActionResult<T> | null;
		readonly onSuccess?: (data: T) => void;
		readonly onError?: (error: string) => void;
	},
): UseServerActionWithOptionsReturn<T> {
	const basicReturn = useServerAction(action, options?.initialState);

	// 成功・エラー時のコールバック実行
	if (basicReturn.isSuccess && basicReturn.data && options?.onSuccess) {
		options.onSuccess(basicReturn.data);
	}
	if (basicReturn.isError && basicReturn.error && options?.onError) {
		options.onError(basicReturn.error);
	}

	const reset = () => {
		// React 19のuseActionStateは現在resetメソッドを提供していないため、
		// 将来のAPI拡張に備えて関数として定義
		console.warn(
			"Reset functionality will be available in future React versions",
		);
	};

	const hasFieldError = (field: string): boolean => {
		return field in basicReturn.fieldErrors;
	};

	const getFieldError = (field: string): string | null => {
		const errors = basicReturn.fieldErrors[field];
		return errors && errors.length > 0 ? errors[0] : null;
	};

	return {
		...basicReturn,
		reset,
		hasFieldError,
		getFieldError,
	};
}
