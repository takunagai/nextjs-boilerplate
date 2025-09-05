import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useRef } from "react";
import { useMergedRefs } from "../use-merged-refs";

describe("useMergedRefs", () => {
	it("RefObjectを正しく統合する", () => {
		const { result: ref1Result } = renderHook(() => useRef<HTMLDivElement>(null));
		const { result: ref2Result } = renderHook(() => useRef<HTMLDivElement>(null));
		const { result: mergedResult } = renderHook(() =>
			useMergedRefs(ref1Result.current, ref2Result.current)
		);

		const testElement = document.createElement("div");
		const mergedRef = mergedResult.current;

		// mergedRefを呼び出す
		mergedRef(testElement);

		// 両方のrefに同じ要素が設定されることを確認
		expect(ref1Result.current.current).toBe(testElement);
		expect(ref2Result.current.current).toBe(testElement);
	});

	it("RefCallbackを正しく統合する", () => {
		const callback1 = vi.fn();
		const callback2 = vi.fn();

		const { result } = renderHook(() => useMergedRefs(callback1, callback2));

		const testElement = document.createElement("div");
		const mergedRef = result.current;

		// mergedRefを呼び出す
		mergedRef(testElement);

		// 両方のコールバックが呼び出されることを確認
		expect(callback1).toHaveBeenCalledWith(testElement);
		expect(callback2).toHaveBeenCalledWith(testElement);
	});

	it("RefObjectとRefCallbackを混合して統合する", () => {
		const { result: refResult } = renderHook(() => useRef<HTMLDivElement>(null));
		const callback = vi.fn();

		const { result } = renderHook(() =>
			useMergedRefs(refResult.current, callback)
		);

		const testElement = document.createElement("div");
		const mergedRef = result.current;

		// mergedRefを呼び出す
		mergedRef(testElement);

		// RefObjectに要素が設定され、コールバックも呼び出されることを確認
		expect(refResult.current.current).toBe(testElement);
		expect(callback).toHaveBeenCalledWith(testElement);
	});

	it("nullやundefinedのrefを適切に処理する", () => {
		const { result: refResult } = renderHook(() => useRef<HTMLDivElement>(null));

		const { result } = renderHook(() =>
			useMergedRefs(refResult.current, null, undefined)
		);

		const testElement = document.createElement("div");
		const mergedRef = result.current;

		// エラーが発生しないことを確認
		expect(() => mergedRef(testElement)).not.toThrow();

		// 有効なrefのみ設定されることを確認
		expect(refResult.current.current).toBe(testElement);
	});

	it("空の配列で呼び出してもエラーが発生しない", () => {
		const { result } = renderHook(() => useMergedRefs());

		const testElement = document.createElement("div");
		const mergedRef = result.current;

		// エラーが発生しないことを確認
		expect(() => mergedRef(testElement)).not.toThrow();
	});
});
