/**
 * アクセシビリティ対応の入力フィールドコンポーネント
 */
"use client";

import { forwardRef } from "react";

import { cn } from "@/lib/utils";
import { AccessibilityDescription, ValidationError } from "../screen-reader";

/**
 * アクセシビリティ対応の入力フィールド
 */
export interface AccessibleInputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
	error?: string;
	description?: string;
	showLabel?: boolean;
	labelClassName?: string;
	containerClassName?: string;
	required?: boolean;
}

export const AccessibleInput = forwardRef<HTMLInputElement, AccessibleInputProps>(
	({
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
	}, ref) => {
		const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
		const errorId = error ? `${inputId}-error` : undefined;
		const descriptionId = description ? `${inputId}-description` : undefined;

		return (
			<div className={cn("space-y-2", containerClassName)}>
				<label
					htmlFor={inputId}
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

				<input
					ref={ref}
					id={inputId}
					aria-describedby={cn(
						descriptionId,
						errorId && errorId,
					).trim() || undefined}
					aria-invalid={error ? "true" : undefined}
					aria-required={required}
					className={cn(
						"flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors",
						"file:border-0 file:bg-transparent file:text-sm file:font-medium",
						"placeholder:text-muted-foreground",
						"focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
						"disabled:cursor-not-allowed disabled:opacity-50",
						error && "border-destructive focus-visible:ring-destructive",
						className,
					)}
					{...props}
				/>

				{description && (
					<AccessibilityDescription id={descriptionId!} visible>
						{description}
					</AccessibilityDescription>
				)}

				{error && (
					<ValidationError
						fieldName={label}
						error={error}
						id={errorId}
					/>
				)}
			</div>
		);
	},
);

AccessibleInput.displayName = "AccessibleInput";