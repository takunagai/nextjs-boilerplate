import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useAuth } from "@/hooks/useAuth";
import { UserAuthMenu } from "../user-auth-menu";

// モックの設定
vi.mock("@/hooks/useAuth");
vi.mock("next/navigation", () => ({
	useRouter: vi.fn(),
}));

// アイコンコンポーネントのモック
vi.mock("react-icons/fa6", () => ({
	FaUser: () => <div data-testid="user-icon" />,
	FaGear: () => <div data-testid="gear-icon" />,
	FaRightFromBracket: () => <div data-testid="logout-icon" />,
	FaShieldHalved: () => <div data-testid="shield-icon" />,
	FaChartLine: () => <div data-testid="chart-icon" />,
	FaUsers: () => <div data-testid="users-icon" />,
}));

describe("UserAuthMenu", () => {
	const mockPush = vi.fn();
	const mockRefresh = vi.fn();
	const mockLogout = vi.fn();
	let user: ReturnType<typeof userEvent.setup>;

	beforeEach(() => {
		vi.clearAllMocks();
		user = userEvent.setup();
		(useRouter as ReturnType<typeof vi.fn>).mockReturnValue({
			push: mockPush,
			refresh: mockRefresh,
		});
	});

	describe("未認証状態", () => {
		it("ログインボタンが表示される", () => {
			(useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
				user: null,
				isAuthenticated: false,
				isLoading: false,
				logout: mockLogout,
			});

			render(<UserAuthMenu />);

			const loginButton = screen.getByText("ログイン");
			expect(loginButton).toBeInTheDocument();
			expect(screen.getByTestId("user-icon")).toBeInTheDocument();
		});

		it("ログインボタンをクリックすると/loginに遷移する", async () => {
			(useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
				user: null,
				isAuthenticated: false,
				isLoading: false,
				logout: mockLogout,
			});

			render(<UserAuthMenu />);

			const loginButton = screen.getByText("ログイン");
			await user.click(loginButton);

			expect(mockPush).toHaveBeenCalledWith("/login");
		});
	});

	describe("読み込み中", () => {
		it("スケルトンローディングが表示される", () => {
			(useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
				user: null,
				isAuthenticated: false,
				isLoading: true,
				logout: mockLogout,
			});

			render(<UserAuthMenu />);

			// Skeletonコンポーネントが2つ表示されることを確認
			const skeletons = screen
				.getAllByRole("generic")
				.filter((el) => el.className.includes("animate-pulse"));
			expect(skeletons).toHaveLength(2);
		});
	});

	describe("一般ユーザーでログイン済み", () => {
		const mockUser = {
			id: "1",
			name: "Test User",
			email: "test@example.com",
			role: "user",
		};

		beforeEach(() => {
			(useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
				user: mockUser,
				isAuthenticated: true,
				isLoading: false,
				logout: mockLogout,
			});
		});

		it("ユーザーアバターが表示される", () => {
			render(<UserAuthMenu />);

			const avatarButton = screen.getByRole("button");
			expect(avatarButton).toBeInTheDocument();
		});

		it("ドロップダウンメニューを開くとユーザー情報が表示される", async () => {
			render(<UserAuthMenu />, { container: document.body });

			const avatarButton = screen.getByRole("button");
			await user.click(avatarButton);

			await waitFor(
				() => {
					expect(screen.getByText("Test User")).toBeInTheDocument();
					expect(screen.getByText("test@example.com")).toBeInTheDocument();
				},
				{ timeout: 5000 },
			);
		});

		it("一般ユーザー向けメニュー項目が表示される", async () => {
			render(<UserAuthMenu />, { container: document.body });

			const avatarButton = screen.getByRole("button");
			await user.click(avatarButton);

			await waitFor(
				() => {
					expect(screen.getByText("プロフィール")).toBeInTheDocument();
					expect(screen.getByText("ダッシュボード")).toBeInTheDocument();
					expect(screen.getByText("設定")).toBeInTheDocument();
					expect(screen.getByText("ログアウト")).toBeInTheDocument();

					// 管理者メニューは表示されない
					expect(screen.queryByText("管理画面")).not.toBeInTheDocument();
					expect(screen.queryByText("ユーザー管理")).not.toBeInTheDocument();
				},
				{ timeout: 5000 },
			);
		});

		it("プロフィールをクリックすると/profileに遷移する", async () => {
			render(<UserAuthMenu />, { container: document.body });

			const avatarButton = screen.getByRole("button");
			await user.click(avatarButton);

			await waitFor(
				() => {
					expect(screen.getByText("プロフィール")).toBeInTheDocument();
				},
				{ timeout: 5000 },
			);

			const profileItem = screen.getByText("プロフィール");
			await user.click(profileItem);

			expect(mockPush).toHaveBeenCalledWith("/profile");
		});

		it("ログアウトをクリックするとログアウト処理が実行される", async () => {
			mockLogout.mockResolvedValue({ success: true });
			render(<UserAuthMenu />, { container: document.body });

			const avatarButton = screen.getByRole("button");
			await user.click(avatarButton);

			await waitFor(
				() => {
					expect(screen.getByText("ログアウト")).toBeInTheDocument();
				},
				{ timeout: 5000 },
			);

			const logoutItem = screen.getByText("ログアウト");
			await user.click(logoutItem);

			await waitFor(
				() => {
					expect(mockLogout).toHaveBeenCalled();
					expect(mockPush).toHaveBeenCalledWith("/");
					expect(mockRefresh).toHaveBeenCalled();
				},
				{ timeout: 5000 },
			);
		});
	});

	describe("管理者でログイン済み", () => {
		const mockAdminUser = {
			id: "1",
			name: "Admin User",
			email: "admin@example.com",
			role: "admin",
		};

		beforeEach(() => {
			(useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
				user: mockAdminUser,
				isAuthenticated: true,
				isLoading: false,
				logout: mockLogout,
			});
		});

		it("管理者向けメニュー項目が表示される", async () => {
			render(<UserAuthMenu />, { container: document.body });

			const avatarButton = screen.getByRole("button");
			await user.click(avatarButton);

			await waitFor(
				() => {
					// 一般メニュー
					expect(screen.getByText("プロフィール")).toBeInTheDocument();
					expect(screen.getByText("ダッシュボード")).toBeInTheDocument();
					expect(screen.getByText("設定")).toBeInTheDocument();

					// 管理者メニュー
					expect(screen.getByText("管理画面")).toBeInTheDocument();
					expect(screen.getByText("ユーザー管理")).toBeInTheDocument();
				},
				{ timeout: 5000 },
			);
		});

		it("管理画面をクリックすると/adminに遷移する", async () => {
			render(<UserAuthMenu />, { container: document.body });

			const avatarButton = screen.getByRole("button");
			await user.click(avatarButton);

			await waitFor(
				() => {
					expect(screen.getByText("管理画面")).toBeInTheDocument();
				},
				{ timeout: 5000 },
			);

			const adminItem = screen.getByText("管理画面");
			await user.click(adminItem);

			expect(mockPush).toHaveBeenCalledWith("/admin");
		});
	});

	describe("ユーザー名のイニシャル表示", () => {
		it("フルネームから正しくイニシャルを生成する", () => {
			(useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
				user: {
					id: "1",
					name: "John Doe",
					email: "john@example.com",
					role: "user",
				},
				isAuthenticated: true,
				isLoading: false,
				logout: mockLogout,
			});

			render(<UserAuthMenu />);

			const avatarButton = screen.getByRole("button");
			expect(avatarButton).toHaveTextContent("JD");
		});

		it("名前がない場合はUを表示する", () => {
			(useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
				user: {
					id: "1",
					name: null,
					email: "user@example.com",
					role: "user",
				},
				isAuthenticated: true,
				isLoading: false,
				logout: mockLogout,
			});

			render(<UserAuthMenu />);

			const avatarButton = screen.getByRole("button");
			expect(avatarButton).toHaveTextContent("U");
		});
	});

	describe("ログアウト失敗時", () => {
		it("ログアウトが失敗してもエラーがスローされない", async () => {
			mockLogout.mockResolvedValue({ success: false });
			(useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
				user: {
					id: "1",
					name: "Test User",
					email: "test@example.com",
					role: "user",
				},
				isAuthenticated: true,
				isLoading: false,
				logout: mockLogout,
			});

			render(<UserAuthMenu />, { container: document.body });

			const avatarButton = screen.getByRole("button");
			await user.click(avatarButton);

			await waitFor(
				() => {
					expect(screen.getByText("ログアウト")).toBeInTheDocument();
				},
				{ timeout: 5000 },
			);

			const logoutItem = screen.getByText("ログアウト");
			await user.click(logoutItem);

			await waitFor(
				() => {
					expect(mockLogout).toHaveBeenCalled();
					// 失敗時はリダイレクトされない
					expect(mockPush).not.toHaveBeenCalled();
					expect(mockRefresh).not.toHaveBeenCalled();
				},
				{ timeout: 5000 },
			);
		});
	});
});
