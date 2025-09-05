import { renderHook, act } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { useErrorBoundary } from "../use-error-boundary";

describe("useErrorBoundary", () => {
	let consoleSpy: any;

	beforeEach(() => {
		consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
	});

	afterEach(() => {
		consoleSpy.mockRestore();
	});

	it("初期状態が正しく設定される", () => {
		const { result } = renderHook(() => useErrorBoundary());

		expect(result.current.hasError).toBe(false);
		expect(result.current.error).toBe(null);
		expect(result.current.errorInfo).toBe(null);
	});

	it("captureError でエラーを正しくキャプチャする", () => {
		const { result } = renderHook(() => useErrorBoundary());
		const testError = new Error("Test error");

		act(() => {
			result.current.captureError(testError, "Test error info");
		});

		expect(result.current.hasError).toBe(true);
		expect(result.current.error).toBe(testError);
		expect(result.current.errorInfo).toBe("Test error info");
	});

	it("captureError でerrorInfoが省略された場合はmessageが使用される", () => {
		const { result } = renderHook(() => useErrorBoundary());
		const testError = new Error("Test error message");

		act(() => {
			result.current.captureError(testError);
		});

		expect(result.current.errorInfo).toBe("Test error message");
	});

	it("clearError でエラー状態がリセットされる", () => {
		const { result } = renderHook(() => useErrorBoundary());
		const testError = new Error("Test error");

		// エラーを設定
		act(() => {
			result.current.captureError(testError);
		});

		expect(result.current.hasError).toBe(true);

		// エラーをクリア
		act(() => {
			result.current.clearError();
		});

		expect(result.current.hasError).toBe(false);
		expect(result.current.error).toBe(null);
		expect(result.current.errorInfo).toBe(null);
	});

	it("外部onErrorハンドラーが呼び出される", () => {
		const onErrorMock = vi.fn();
		const { result } = renderHook(() => useErrorBoundary(onErrorMock));
		const testError = new Error("Test error");

		act(() => {
			result.current.captureError(testError, "Error info");
		});

		expect(onErrorMock).toHaveBeenCalledWith(testError, "Error info");
	});

	it("開発環境でコンソールにログが出力される", () => {
		// NODE_ENVを一時的に'development'に設定
		const originalEnv = process.env.NODE_ENV;
		process.env.NODE_ENV = "development";

		const { result } = renderHook(() => useErrorBoundary());
		const testError = new Error("Test error");

		act(() => {
			result.current.captureError(testError, "Error info");
		});

		expect(consoleSpy).toHaveBeenCalledWith("AnimatedImage Error:", testError);
		expect(consoleSpy).toHaveBeenCalledWith("Error Info:", "Error info");

		// NODE_ENVを元に戻す
		process.env.NODE_ENV = originalEnv;
	});

	it("retryWithClearError が正常に動作する", () => {
		const { result } = renderHook(() => useErrorBoundary());
		const testError = new Error("Test error");
		const retryFunction = vi.fn();

		// 初期エラーを設定
		act(() => {
			result.current.captureError(testError);
		});

		expect(result.current.hasError).toBe(true);

		// リトライを実行
		act(() => {
			result.current.retryWithClearError(retryFunction);
		});

		expect(result.current.hasError).toBe(false);
		expect(retryFunction).toHaveBeenCalled();
	});

	it("retryWithClearError でリトライ関数がエラーを投げた場合", () => {
		const { result } = renderHook(() => useErrorBoundary());
		const retryError = new Error("Retry failed");
		const retryFunction = vi.fn(() => {
			throw retryError;
		});

		act(() => {
			result.current.retryWithClearError(retryFunction);
		});

		expect(result.current.hasError).toBe(true);
		expect(result.current.error).toBe(retryError);
		expect(result.current.errorInfo).toBe("Retry failed");
	});

	it("複数のエラーを順次キャプチャできる", () => {
		const { result } = renderHook(() => useErrorBoundary());
		const firstError = new Error("First error");
		const secondError = new Error("Second error");

		// 最初のエラー
		act(() => {
			result.current.captureError(firstError);
		});

		expect(result.current.error).toBe(firstError);

		// 2つ目のエラー（上書きされる）
		act(() => {
			result.current.captureError(secondError);
		});

		expect(result.current.error).toBe(secondError);
	});
});
