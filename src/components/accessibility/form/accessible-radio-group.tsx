/**
 * アクセシビリティ対応のラジオボタングループコンポーネント
 */
"use client";

import { cn } from "@/lib/utils";
import { AccessibilityDescription, ValidationError } from "../screen-reader";

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
	const groupId = `radio-group-${crypto.randomUUID()}`;
	const errorId = error ? `${groupId}-error` : undefined;
	const descriptionId = description ? `${groupId}-description` : undefined;

	return (
		<div className={cn("space-y-3", containerClassName)}>
			<fieldset aria-labelledby={groupId}>
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
					aria-describedby={
						[descriptionId, errorId].filter(Boolean).join(" ") || undefined
					}
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

				{description && descriptionId && (
					<AccessibilityDescription id={descriptionId} visible>
						{description}
					</AccessibilityDescription>
				)}

				{error && (
					<ValidationError fieldName={label} error={error} id={errorId} />
				)}
			</fieldset>
		</div>
	);
}
