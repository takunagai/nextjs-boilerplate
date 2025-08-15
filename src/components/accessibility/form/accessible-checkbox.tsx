/**
 * アクセシビリティ対応のチェックボックスコンポーネント
 */
"use client";

import { forwardRef, useId } from "react";

import { cn } from "@/lib/utils";
import { AccessibilityDescription, ValidationError } from "../screen-reader";

/**
 * アクセシビリティ対応のチェックボックス
 */
export interface AccessibleCheckboxProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
	label: string;
	error?: string;
	description?: string;
	labelClassName?: string;
	containerClassName?: string;
}

export const AccessibleCheckbox = forwardRef<
	HTMLInputElement,
	AccessibleCheckboxProps
>(
	(
		{
			label,
			error,
			description,
			labelClassName,
			containerClassName,
			className,
			id,
			...props
		},
		ref,
	) => {
		const generatedId = useId();
		const checkboxId = id || `checkbox-${generatedId}`;
		const errorId = error ? `${checkboxId}-error` : undefined;
		const descriptionId = description ? `${checkboxId}-description` : undefined;

		return (
			<div className={cn("space-y-2", containerClassName)}>
				<div className="flex items-start space-x-2">
					<input
						ref={ref}
						type="checkbox"
						id={checkboxId}
						aria-describedby={
							[descriptionId, errorId].filter(Boolean).join(" ") || undefined
						}
						aria-invalid={error ? "true" : undefined}
						className={cn(
							"mt-0.5 h-4 w-4 rounded border border-input bg-transparent",
							"text-primary focus:ring-1 focus:ring-ring focus:ring-offset-0",
							"disabled:cursor-not-allowed disabled:opacity-50",
							error && "border-destructive focus:ring-destructive",
							className,
						)}
						{...props}
					/>
					<label
						htmlFor={checkboxId}
						className={cn(
							"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
							labelClassName,
						)}
					>
						{label}
					</label>
				</div>

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

AccessibleCheckbox.displayName = "AccessibleCheckbox";
