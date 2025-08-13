/**
 * パフォーマンス最適化のためのユーティリティ関数群
 */

/**
 * 関数の実行を制限するthrottle関数
 * 指定した間隔でのみ関数を実行し、高頻度な呼び出しを制御
 * 
 * @param fn - スロットリングしたい関数
 * @param delay - 実行間隔（ミリ秒）
 * @returns スロットリングされた関数
 * 
 * @example
 * ```tsx
 * const throttledHandler = throttle(() => {
 *   console.log('Scroll event handled');
 * }, 100);
 * 
 * window.addEventListener('scroll', throttledHandler);
 * ```
 */
export function throttle<T extends (...args: any[]) => any>(
	fn: T,
	delay: number
): (...args: Parameters<T>) => ReturnType<T> | undefined {
	let lastCall = 0;
	
	return (...args: Parameters<T>) => {
		const now = Date.now();
		if (now - lastCall < delay) {
			return;
		}
		lastCall = now;
		return fn(...args);
	};
}

/**
 * 関数の実行を遅延させるdebounce関数
 * 最後の呼び出しから指定時間経過後に実行
 * 
 * @param fn - デバウンスしたい関数
 * @param delay - 遅延時間（ミリ秒）
 * @returns デバウンスされた関数
 * 
 * @example
 * ```tsx
 * const debouncedSearch = debounce((query: string) => {
 *   searchApi(query);
 * }, 300);
 * 
 * // 300ms後に最後の検索クエリのみ実行される
 * debouncedSearch('a');
 * debouncedSearch('ab');
 * debouncedSearch('abc');
 * ```
 */
export function debounce<T extends (...args: any[]) => any>(
	fn: T,
	delay: number
): (...args: Parameters<T>) => void {
	let timeoutId: NodeJS.Timeout;
	
	return (...args: Parameters<T>) => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => fn(...args), delay);
	};
}

/**
 * ラフ（RAF）を利用した最適化されたthrottle
 * ブラウザの描画サイクルに合わせて実行
 * 
 * @param fn - スロットリングしたい関数
 * @returns RAFスロットリングされた関数
 * 
 * @example
 * ```tsx
 * const rafThrottledHandler = rafThrottle(() => {
 *   // 描画サイクルに合わせて実行される
 *   updateAnimation();
 * });
 * 
 * window.addEventListener('scroll', rafThrottledHandler);
 * ```
 */
export function rafThrottle<T extends (...args: any[]) => any>(
	fn: T
): (...args: Parameters<T>) => void {
	let rafId: number | null = null;
	
	return (...args: Parameters<T>) => {
		if (rafId === null) {
			rafId = requestAnimationFrame(() => {
				fn(...args);
				rafId = null;
			});
		}
	};
}

/**
 * パフォーマンス測定のためのユーティリティ
 * 
 * @param label - 測定のラベル
 * @param fn - 測定したい関数
 * @returns 実行結果と実行時間
 * 
 * @example
 * ```tsx
 * const { result, duration } = measurePerformance('API Call', async () => {
 *   return await fetchData();
 * });
 * 
 * console.log(`API call took ${duration}ms`);
 * ```
 */
export async function measurePerformance<T>(
	label: string,
	fn: () => T | Promise<T>
): Promise<{ result: T; duration: number }> {
	const start = performance.now();
	const result = await fn();
	const duration = performance.now() - start;
	
	// 開発環境でのみログ出力
	if (process.env.NODE_ENV === 'development') {
		console.log(`[Performance] ${label}: ${duration.toFixed(2)}ms`);
	}
	
	return { result, duration };
}

/**
 * Intersection Observer を使った要素の可視性監視
 * 
 * @param threshold - 可視性の閾値（0-1）
 * @param rootMargin - ルートマージン
 * @returns Observer とクリーンアップ関数
 * 
 * @example
 * ```tsx
 * const { observe, unobserve, disconnect } = createIntersectionObserver(
 *   0.1,
 *   '10px',
 *   (entries) => {
 *     entries.forEach(entry => {
 *       if (entry.isIntersecting) {
 *         console.log('Element is visible');
 *       }
 *     });
 *   }
 * );
 * 
 * // 要素を監視開始
 * observe(elementRef.current);
 * 
 * // クリーンアップ
 * useEffect(() => disconnect, []);
 * ```
 */
export function createIntersectionObserver(
	threshold = 0.1,
	rootMargin = '0px',
	callback: IntersectionObserverCallback
) {
	if (typeof window === 'undefined') {
		return {
			observe: () => {},
			unobserve: () => {},
			disconnect: () => {},
		};
	}
	
	const observer = new IntersectionObserver(callback, {
		threshold,
		rootMargin,
	});
	
	return {
		observe: (element: Element) => observer.observe(element),
		unobserve: (element: Element) => observer.unobserve(element),
		disconnect: () => observer.disconnect(),
	};
}