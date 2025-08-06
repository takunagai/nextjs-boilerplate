/**
 * アクセシビリティ対応のセレクトボックスコンポーネント
 */
"use client";

import { forwardRef } from "react";

import { cn } from "@/lib/utils";
import { AccessibilityDescription, ValidationError } from "../screen-reader";

/**
 * アクセシビリティ対応のセレクトボックス
 */
export interface AccessibleSelectProps
	extends React.SelectHTMLAttributes<HTMLSelectElement> {
	label: string;
	error?: string;
	description?: string;
	showLabel?: boolean;
	labelClassName?: string;
	containerClassName?: string;
	required?: boolean;
	options: Array<{ value: string; label: string; disabled?: boolean }>;
	placeholder?: string;
}

export const AccessibleSelect = forwardRef<HTMLSelectElement, AccessibleSelectProps>(
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
		options,
		placeholder,
		...props
	}, ref) => {
		const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
		const errorId = error ? `${selectId}-error` : undefined;
		const descriptionId = description ? `${selectId}-description` : undefined;

		return (
			<div className={cn("space-y-2", containerClassName)}>
				<label
					htmlFor={selectId}
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

				<select
					ref={ref}
					id={selectId}
					aria-describedby={cn(
						descriptionId,
						errorId && errorId,
					).trim() || undefined}
					aria-invalid={error ? "true" : undefined}
					aria-required={required}
					className={cn(
						"flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm",
						"focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
						"disabled:cursor-not-allowed disabled:opacity-50",
						error && "border-destructive focus-visible:ring-destructive",
						className,
					)}
					{...props}
				>
					{placeholder && (
						<option value="" disabled>
							{placeholder}
						</option>
					)}
					{options.map((option) => (
						<option
							key={option.value}
							value={option.value}
							disabled={option.disabled}
						>
							{option.label}
						</option>
					))}
				</select>

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

AccessibleSelect.displayName = "AccessibleSelect";