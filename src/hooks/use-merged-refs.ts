import { useCallback } from "react";
import type { RefCallback } from "react";

/**
 * 複数のrefを統合するカスタムフック
 *
 * @example
 * ```tsx
 * const mergedRef = useMergedRefs(ref1, ref2, ref3);
 * <div ref={mergedRef} />
 * ```
 */
export function useMergedRefs<T = any>(
	...refs: Array<React.RefObject<T> | RefCallback<T> | null | undefined>
): RefCallback<T> {
	return useCallback(
		(node: T) => {
			for (const ref of refs) {
				if (typeof ref === "function") {
					ref(node);
				} else if (ref != null) {
					ref.current = node;
				}
			}
		},
		refs, // eslint-disable-line react-hooks/exhaustive-deps
	);
}
