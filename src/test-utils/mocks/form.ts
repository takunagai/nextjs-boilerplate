import type { FieldValues, UseFormReturn } from "react-hook-form";
import { vi } from "vitest";

/**
 * React Hook Form のモックユーティリティ
 */

export const createMockFormRegister = (fieldName: string) => ({
	name: fieldName,
	onChange: vi.fn(),
	onBlur: vi.fn(),
	ref: vi.fn(),
});

export const createMockFormHandleSubmit = <T = any>(defaultData?: T) => {
	return vi.fn(
		(fn: (data: T) => void | Promise<void>) =>
			(e?: React.BaseSyntheticEvent) => {
				e?.preventDefault();
				return fn(defaultData as T);
			},
	);
};

export const createMockForm = <T extends FieldValues = any>(
	overrides?: Partial<UseFormReturn<T>>,
): UseFormReturn<T> =>
	({
		register: vi.fn((fieldName: string) => createMockFormRegister(fieldName)),
		handleSubmit: createMockFormHandleSubmit<T>(),
		formState: { errors: {}, isSubmitting: false, isValid: true },
		watch: vi.fn(() => ({ unsubscribe: vi.fn() })),
		setValue: vi.fn(),
		getValues: vi.fn(),
		reset: vi.fn(),
		clearErrors: vi.fn(),
		setError: vi.fn(),
		trigger: vi.fn(),
		control: {} as any,
		...overrides,
	}) as UseFormReturn<T>;
