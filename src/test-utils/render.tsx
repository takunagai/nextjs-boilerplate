import { render as rtlRender } from "@testing-library/react";
import { ReactElement } from "react";

/**
 * カスタムレンダー関数
 * 必要に応じてプロバイダーを追加できる
 */
function customRender(ui: ReactElement, options = {}) {
	// 将来的にプロバイダーを追加する場合はここで設定
	// 例: <ThemeProvider>, <AuthProvider> など
	
	return rtlRender(ui, options);
}

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };