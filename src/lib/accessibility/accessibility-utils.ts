/**
 * アクセシビリティ改善のためのユーティリティ関数
 */

// アクセシビリティチェック項目の型定義
export interface AccessibilityCheckItem {
	selector: string;
	description: string;
	level: "error" | "warning" | "info";
	category: "keyboard" | "screen-reader" | "color" | "structure";
}

// 一般的なアクセシビリティチェック項目
export const ACCESSIBILITY_CHECKS: AccessibilityCheckItem[] = [
	{
		selector: "img:not([alt])",
		description: "画像にalt属性が設定されていません",
		level: "error",
		category: "screen-reader",
	},
	{
		selector: "button:not([aria-label]):not([aria-labelledby]):empty",
		description: "ボタンにラベルが設定されていません",
		level: "error",
		category: "screen-reader",
	},
	{
		selector: "input:not([aria-label]):not([aria-labelledby]):not([id])",
		description: "入力フィールドにラベルが設定されていません",
		level: "warning",
		category: "screen-reader",
	},
	{
		selector: "[role='button']:not([tabindex]):not(button):not(a):not(input)",
		description: "ボタンロールの要素にtabindexが設定されていません",
		level: "warning",
		category: "keyboard",
	},
	{
		selector: "a[href]:empty:not([aria-label]):not([aria-labelledby])",
		description: "リンクにテキストまたはラベルが設定されていません",
		level: "error",
		category: "screen-reader",
	},
	{
		selector: "[aria-expanded]:not([role])",
		description: "aria-expandedが設定された要素にroleが設定されていません",
		level: "warning",
		category: "structure",
	},
	{
		selector: "iframe:not([title]):not([aria-label]):not([aria-labelledby])",
		description: "iframeにタイトルまたはラベルが設定されていません",
		level: "error",
		category: "screen-reader",
	},
];

// ARIAラベルを生成するヘルパー関数
export const generateAriaLabel = {
	/**
	 * アクション用のaria-labelを生成
	 */
	action: (action: string, target?: string): string => {
		return target ? `${action} ${target}` : action;
	},
	
	/**
	 * ナビゲーション用のaria-labelを生成
	 */
	navigation: (direction: "previous" | "next", context?: string): string => {
		const directionText = direction === "previous" ? "前" : "次";
		return context ? `${context}の${directionText}` : `${directionText}へ`;
	},
	
	/**
	 * 状態用のaria-labelを生成
	 */
	state: (element: string, state: "open" | "closed" | "expanded" | "collapsed"): string => {
		const stateText = {
			open: "開く",
			closed: "閉じる", 
			expanded: "展開する",
			collapsed: "折りたたむ",
		}[state];
		return `${element}を${stateText}`;
	},
	
	/**
	 * カウント情報付きのaria-labelを生成
	 */
	withCount: (item: string, current: number, total: number): string => {
		return `${item} ${current} / ${total}`;
	},
};

// キーボードナビゲーション用のヘルパー
export const keyboardHandlers = {
	/**
	 * 標準的なボタンキーハンドラー（Enter/Space）
	 */
	buttonKeys: (callback: () => void) => (event: React.KeyboardEvent) => {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			callback();
		}
	},
	
	/**
	 * 矢印キーナビゲーション
	 */
	arrowKeys: (callbacks: {
		onLeft?: () => void;
		onRight?: () => void;
		onUp?: () => void;
		onDown?: () => void;
	}) => (event: React.KeyboardEvent) => {
		switch (event.key) {
			case "ArrowLeft":
				event.preventDefault();
				callbacks.onLeft?.();
				break;
			case "ArrowRight":
				event.preventDefault();
				callbacks.onRight?.();
				break;
			case "ArrowUp":
				event.preventDefault();
				callbacks.onUp?.();
				break;
			case "ArrowDown":
				event.preventDefault();
				callbacks.onDown?.();
				break;
		}
	},
	
	/**
	 * Escapeキーハンドラー
	 */
	escapeKey: (callback: () => void) => (event: React.KeyboardEvent) => {
		if (event.key === "Escape") {
			event.preventDefault();
			callback();
		}
	},
};

// フォーカス管理のヘルパー
export const focusManagement = {
	/**
	 * 要素にフォーカスを設定（遅延オプション付き）
	 */
	focus: (element: HTMLElement | null, delay = 0) => {
		if (!element) return;
		
		if (delay > 0) {
			setTimeout(() => element.focus(), delay);
		} else {
			element.focus();
		}
	},
	
	/**
	 * フォーカス可能な要素を取得
	 */
	getFocusableElements: (container: HTMLElement): HTMLElement[] => {
		const focusableSelectors = [
			'a[href]',
			'button:not([disabled])',
			'textarea:not([disabled])',
			'input:not([disabled])',
			'select:not([disabled])',
			'[tabindex]:not([tabindex="-1"])',
			'[contenteditable="true"]',
		].join(', ');
		
		return Array.from(container.querySelectorAll(focusableSelectors));
	},
	
	/**
	 * フォーカストラップの作成
	 */
	createFocusTrap: (container: HTMLElement) => {
		const focusableElements = focusManagement.getFocusableElements(container);
		const firstElement = focusableElements[0];
		const lastElement = focusableElements[focusableElements.length - 1];
		
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Tab") {
				if (event.shiftKey) {
					// Shift + Tab: 逆方向
					if (document.activeElement === firstElement) {
						event.preventDefault();
						lastElement?.focus();
					}
				} else {
					// Tab: 順方向
					if (document.activeElement === lastElement) {
						event.preventDefault();
						firstElement?.focus();
					}
				}
			}
		};
		
		container.addEventListener("keydown", handleKeyDown);
		
		// 初期フォーカス
		firstElement?.focus();
		
		// クリーンアップ関数
		return () => {
			container.removeEventListener("keydown", handleKeyDown);
		};
	},
};

// アクセシビリティ診断（開発用）
export const accessibility = {
	/**
	 * ページのアクセシビリティをチェック（開発モードのみ）
	 */
	checkPage: () => {
		if (process.env.NODE_ENV !== "development") return;
		
		const issues: Array<{
			check: AccessibilityCheckItem;
			elements: NodeListOf<Element>;
		}> = [];
		
		ACCESSIBILITY_CHECKS.forEach((check) => {
			const elements = document.querySelectorAll(check.selector);
			if (elements.length > 0) {
				issues.push({ check, elements });
			}
		});
		
		if (issues.length > 0) {
			console.group("🔍 アクセシビリティチェック結果");
			issues.forEach(({ check, elements }) => {
				const icon = check.level === "error" ? "❌" : check.level === "warning" ? "⚠️" : "ℹ️";
				console.warn(`${icon} ${check.description}`, elements);
			});
			console.groupEnd();
		} else {
			console.log("✅ アクセシビリティチェック: 問題なし");
		}
	},
	
	/**
	 * 特定の要素のアクセシビリティをチェック
	 */
	checkElement: (element: HTMLElement): string[] => {
		const issues: string[] = [];
		
		// 基本的なチェック
		if (element.tagName === "IMG" && !element.getAttribute("alt")) {
			issues.push("画像にalt属性が設定されていません");
		}
		
		if (element.tagName === "BUTTON" && !element.textContent?.trim() && !element.getAttribute("aria-label")) {
			issues.push("ボタンにラベルが設定されていません");
		}
		
		if (element.getAttribute("role") === "button" && !element.hasAttribute("tabindex") && element.tagName !== "BUTTON") {
			issues.push("ボタンロールの要素にtabindexが設定されていません");
		}
		
		return issues;
	},
};

// カラーコントラスト関連
export const colorContrast = {
	/**
	 * 16進数カラーからRGBに変換
	 */
	hexToRgb: (hex: string): { r: number; g: number; b: number } | null => {
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16)
		} : null;
	},
	
	/**
	 * 相対輝度を計算
	 */
	getLuminance: (r: number, g: number, b: number): number => {
		const normalize = (value: number) => {
			const normalized = value / 255;
			return normalized <= 0.03928 
				? normalized / 12.92 
				: Math.pow((normalized + 0.055) / 1.055, 2.4);
		};
		
		return 0.2126 * normalize(r) + 0.7152 * normalize(g) + 0.0722 * normalize(b);
	},
	
	/**
	 * コントラスト比を計算
	 */
	getContrastRatio: (color1: string, color2: string): number => {
		const rgb1 = colorContrast.hexToRgb(color1);
		const rgb2 = colorContrast.hexToRgb(color2);
		
		if (!rgb1 || !rgb2) return 1;
		
		const lum1 = colorContrast.getLuminance(rgb1.r, rgb1.g, rgb1.b);
		const lum2 = colorContrast.getLuminance(rgb2.r, rgb2.g, rgb2.b);
		
		const brightest = Math.max(lum1, lum2);
		const darkest = Math.min(lum1, lum2);
		
		return (brightest + 0.05) / (darkest + 0.05);
	},
	
	/**
	 * WCAG AA基準でのコントラストチェック
	 */
	meetsWCAG: (color1: string, color2: string, level: "AA" | "AAA" = "AA"): boolean => {
		const ratio = colorContrast.getContrastRatio(color1, color2);
		return level === "AA" ? ratio >= 4.5 : ratio >= 7;
	},
};