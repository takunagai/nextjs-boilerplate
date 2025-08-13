"use client";

import { FaCircleExclamation } from "react-icons/fa6";

interface LoginFormErrorProps {
	error?: string;
	className?: string;
}

/**
 * ログインフォームのエラーメッセージを表示するコンポーネント
 */
export function LoginFormError({ error, className = "" }: LoginFormErrorProps) {
	if (!error) return null;

	return (
		<div
			className={[
				"flex items-center gap-2 rounded-md bg-destructive/15",
				"px-3 py-2 text-sm text-destructive",
				className,
			].filter(Boolean).join(" ")}
			role="alert"
		>
			<FaCircleExclamation className="h-4 w-4 text-destructive" />
			<p>{error}</p>
		</div>
	);
}
