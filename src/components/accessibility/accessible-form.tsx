/**
 * アクセシビリティ対応フォームコンポーネント（統一エクスポート）
 * 
 * このファイルは後方互換性のため、分割されたコンポーネントを
 * 再エクスポートする役割を果たします。
 * 
 * 実際の実装は /form/ ディレクトリ内の個別ファイルに分割されています：
 * - /form/accessible-input.tsx
 * - /form/accessible-textarea.tsx  
 * - /form/accessible-select.tsx
 * - /form/accessible-checkbox.tsx
 * - /form/accessible-radio-group.tsx
 */

export {
	AccessibleInput,
	AccessibleTextarea,
	AccessibleSelect,
	AccessibleCheckbox,
	AccessibleRadioGroup,
} from "./form";

export type {
	AccessibleInputProps,
	AccessibleTextareaProps,
	AccessibleSelectProps,
	AccessibleCheckboxProps,
	AccessibleRadioGroupProps,
} from "./form";