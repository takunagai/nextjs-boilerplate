import "@testing-library/jest-dom";
import { configure } from "@testing-library/react";
import { vi } from "vitest";
import { ZodError } from "zod";

// Mock ResizeObserver
class ResizeObserver {
	observe() {
		// do nothing
	}
	unobserve() {
		// do nothing
	}
	disconnect() {
		// do nothing
	}
}

window.ResizeObserver = ResizeObserver;

// If you also encounter issues with matchMedia (common with Radix UI components in Jest/Vitest)
if (typeof window.matchMedia !== "function") {
	Object.defineProperty(window, "matchMedia", {
		writable: true,
		value: vi.fn().mockImplementation((query) => ({
			matches: false,
			media: query,
			onchange: null,
			addListener: vi.fn(), // deprecated
			removeListener: vi.fn(), // deprecated
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
			dispatchEvent: vi.fn(),
		})),
	});
}

// React Testing Library configuration
configure({
	// Increase timeout for async operations
	asyncUtilTimeout: 15000,
});

// 型ガード関数
function isZodError(error: unknown): error is ZodError {
	return error instanceof ZodError;
}

// Zod v4 エラーのunhandled promise rejectionをキャッチ
if (typeof global.process !== "undefined") {
	global.process.on("unhandledRejection", (reason: unknown) => {
		// ZodErrorの場合は無視
		if (isZodError(reason)) {
			return;
		}
		// その他のエラーは通常通り処理
		console.error("Unhandled promise rejection:", reason);
	});
}
