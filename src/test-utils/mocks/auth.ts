import { vi } from "vitest";
import type { UseAuthReturn } from "@/hooks/useAuth";

// Extend UseAuthReturn with additional mock properties
interface AuthContextType extends UseAuthReturn {
	signup: ReturnType<typeof vi.fn>;
}

/**
 * 認証関連のモックユーティリティ
 */

export const createMockAuthContext = (
	overrides?: Partial<AuthContextType>,
): AuthContextType => ({
	session: null,
	status: "unauthenticated",
	isLoading: false,
	isAuthenticated: false,
	user: undefined,
	login: vi.fn(),
	logout: vi.fn(),
	updateSession: vi.fn(),
	signup: vi.fn(),
	...overrides,
});

export const createMockAuthUser = (
	overrides?: Partial<AuthContextType["user"]>,
) => ({
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
