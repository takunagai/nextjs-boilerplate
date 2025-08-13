import { waitFor } from "@testing-library/react";

/**
 * 非同期処理のヘルパー関数
 */

/**
 * 指定時間待機する
 */
export const sleep = (ms: number) =>
	new Promise((resolve) => setTimeout(resolve, ms));

/**
 * 条件が満たされるまで待機する拡張版
 */
export const waitForCondition = async (
	condition: () => boolean | Promise<boolean>,
	options = { timeout: 5000, interval: 50 },
) => {
	const startTime = Date.now();

	while (Date.now() - startTime < options.timeout) {
		if (await condition()) {
			return true;
		}
		await sleep(options.interval);
	}

	throw new Error(`Condition not met within ${options.timeout}ms`);
};

/**
 * デバウンスされた関数の完了を待つ
 */
export const waitForDebounce = async (debounceTime = 300) => {
	await sleep(debounceTime + 50); // デバウンス時間 + バッファ
};

/**
 * 複数の要素が表示されるまで待つ
 */
export const waitForElements = async (
	getters: (() => HTMLElement | null)[],
) => {
	await waitFor(() => {
		getters.forEach((getter) => {
			const element = getter();
			expect(element).toBeInTheDocument();
		});
	});
};
