import { axe, toHaveNoViolations } from "jest-axe";
import { render } from "@testing-library/react";
import { ReactElement } from "react";

// jest-dom の拡張
expect.extend(toHaveNoViolations);

/**
 * コンポーネントのアクセシビリティをテストする
 */
export async function testA11y(ui: ReactElement, options = {}) {
	const { container, rerender } = render(ui, options);
	const results = await axe(container);
	
	expect(results).toHaveNoViolations();
	
	return { container, rerender, results };
}

/**
 * キーボードナビゲーションをテストするヘルパー
 */
export function testKeyboardNavigation(element: HTMLElement) {
	const tabbableElements = element.querySelectorAll(
		'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
	);
	
	return {
		tabbableCount: tabbableElements.length,
		elements: Array.from(tabbableElements),
		// Tab キー押下をシミュレート
		simulateTabNavigation: () => {
			tabbableElements.forEach((el, index) => {
				(el as HTMLElement).focus();
				expect(document.activeElement).toBe(el);
			});
		},
	};
}