/**
 * アクセシビリティ対応のテキストエリアコンポーネント
 */
"use client";

import { forwardRef } from "react";

import { cn } from "@/lib/utils";
import { AccessibilityDescription, ValidationError } from "../screen-reader";

/**
 * アクセシビリティ対応のテキストエリア
 */
export interface AccessibleTextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	label: string;
	error?: string;
	description?: string;
	showLabel?: boolean;
	labelClassName?: string;
	containerClassName?: string;
	required?: boolean;
}

export const AccessibleTextarea = forwardRef<
	HTMLTextAreaElement,
	AccessibleTextareaProps
>(
	(
		{
			label,
			error,
			description,
			showLabel = true,
			labelClassName,
			containerClassName,
			className,
			id,
			required,
			...props
		},
		ref,
	) => {
		const textareaId = id || `textarea-${crypto.randomUUID()}`;
		const errorId = error ? `${textareaId}-error` : undefined;
		const descriptionId = description ? `${textareaId}-description` : undefined;

		return (
			<div className={cn("space-y-2", containerClassName)}>
				<label
					htmlFor={textareaId}
					className={cn(
						"block text-sm font-medium",
						showLabel ? "" : "sr-only",
						labelClassName,
					)}
				>
					{label}
					{required && (
						<span className="text-destructive ml-1" aria-label="必須">
							*
						</span>
					)}
				</label>

				<textarea
					ref={ref}
					id={textareaId}
					aria-describedby={
						[descriptionId, errorId].filter(Boolean).join(" ") || undefined
					}
					aria-invalid={error ? "true" : undefined}
					aria-required={required}
					className={cn(
						"flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm",
						"placeholder:text-muted-foreground",
						"focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
						"disabled:cursor-not-allowed disabled:opacity-50",
						error && "border-destructive focus-visible:ring-destructive",
						className,
					)}
					{...props}
				/>

				{description && descriptionId && (
					<AccessibilityDescription id={descriptionId} visible>
						{description}
					</AccessibilityDescription>
				)}

				{error && (
					<ValidationError fieldName={label} error={error} id={errorId} />
				)}
			</div>
		);
	},
);

AccessibleTextarea.displayName = "AccessibleTextarea";
