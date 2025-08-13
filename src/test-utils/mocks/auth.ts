import { vi } from "vitest";
import type { AuthContextType } from "@/types/auth";

/**
 * 認証関連のモックユーティリティ
 */

export const createMockAuthContext = (overrides?: Partial<AuthContextType>): AuthContextType => ({
	isAuthenticated: false,
	isAuthLoading: false,
	user: null,
	login: vi.fn(),
	logout: vi.fn(),
	signup: vi.fn(),
	...overrides,
});

export const createMockAuthUser = (overrides?: Partial<AuthContextType["user"]>) => ({
	id: "1",
	email: "test@example.com",
	name: "Test User",
	...overrides,
});

export const createMockRouter = () => ({
	push: vi.fn(),
	replace: vi.fn(),
	back: vi.fn(),
	forward: vi.fn(),
	prefetch: vi.fn(),
	refresh: vi.fn(),
});