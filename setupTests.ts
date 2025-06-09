import "@testing-library/jest-dom";
import { vi } from "vitest";
import { configure } from "@testing-library/react";

// React Testing Library utilities
import { act } from "react";

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
