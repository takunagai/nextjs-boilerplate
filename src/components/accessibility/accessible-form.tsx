/**
 * アクセシビリティ対応フォームコンポーネント
 */
"use client";

import { forwardRef } from "react";

import { cn } from "@/lib/utils";
import { AccessibilityDescription, ValidationError } from "./screen-reader";

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

export const AccessibleTextarea = forwardRef<HTMLTextAreaElement, AccessibleTextareaProps>(
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
		const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
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
					aria-describedby={cn(
						descriptionId,
						errorId && errorId,
					).trim() || undefined}
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

AccessibleTextarea.displayName = "AccessibleTextarea";

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

export const AccessibleCheckbox = forwardRef<HTMLInputElement, AccessibleCheckboxProps>(
	({
		label,
		error,
		description,
		labelClassName,
		containerClassName,
		className,
		id,
		...props
	}, ref) => {
		const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
		const errorId = error ? `${checkboxId}-error` : undefined;
		const descriptionId = description ? `${checkboxId}-description` : undefined;

		return (
			<div className={cn("space-y-2", containerClassName)}>
				<div className="flex items-start space-x-2">
					<input
						ref={ref}
						type="checkbox"
						id={checkboxId}
						aria-describedby={cn(
							descriptionId,
							errorId && errorId,
						).trim() || undefined}
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

AccessibleCheckbox.displayName = "AccessibleCheckbox";

/**
 * アクセシビリティ対応のラジオボタングループ
 */
export interface AccessibleRadioGroupProps {
	label: string;
	name: string;
	options: Array<{
		value: string;
		label: string;
		disabled?: boolean;
	}>;
	value?: string;
	onChange?: (value: string) => void;
	error?: string;
	description?: string;
	labelClassName?: string;
	containerClassName?: string;
	optionClassName?: string;
	required?: boolean;
}

export function AccessibleRadioGroup({
	label,
	name,
	options,
	value,
	onChange,
	error,
	description,
	labelClassName,
	containerClassName,
	optionClassName,
	required,
}: AccessibleRadioGroupProps) {
	const groupId = `radio-group-${Math.random().toString(36).substr(2, 9)}`;
	const errorId = error ? `${groupId}-error` : undefined;
	const descriptionId = description ? `${groupId}-description` : undefined;

	return (
		<div className={cn("space-y-3", containerClassName)}>
			<fieldset role="radiogroup" aria-labelledby={groupId}>
				<legend
					id={groupId}
					className={cn("text-sm font-medium", labelClassName)}
				>
					{label}
					{required && (
						<span className="text-destructive ml-1" aria-label="必須">
							*
						</span>
					)}
				</legend>

				<div
					className="space-y-2 mt-2"
					aria-describedby={cn(
						descriptionId,
						errorId && errorId,
					).trim() || undefined}
				>
					{options.map((option) => {
						const optionId = `${name}-${option.value}`;
						return (
							<div key={option.value} className="flex items-center space-x-2">
								<input
									type="radio"
									id={optionId}
									name={name}
									value={option.value}
									checked={value === option.value}
									onChange={(e) => onChange?.(e.target.value)}
									disabled={option.disabled}
									aria-invalid={error ? "true" : undefined}
									className={cn(
										"h-4 w-4 border border-input text-primary focus:ring-1 focus:ring-ring",
										"disabled:cursor-not-allowed disabled:opacity-50",
										error && "border-destructive focus:ring-destructive",
										optionClassName,
									)}
								/>
								<label
									htmlFor={optionId}
									className={cn(
										"text-sm font-medium leading-none",
										option.disabled && "opacity-50 cursor-not-allowed",
									)}
								>
									{option.label}
								</label>
							</div>
						);
					})}
				</div>

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
			</fieldset>
		</div>
	);
}