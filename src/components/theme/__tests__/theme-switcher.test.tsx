import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { FEATURES } from "@/lib/constants";
import { ThemeSwitcher } from "../theme-switcher";

// モックの設定
vi.mock("@/lib/constants", () => ({
	FEATURES: {
		THEME_SWITCHER: true,
	},
}));

// 動的インポートのモック
vi.mock("next/dynamic", () => ({
	default: (importFn: () => Promise<any>, options?: any) => {
		// ssrオプションをチェック
		const isSSR = options?.ssr !== false;

		// プレースホルダーのモック
		if (options?.loading) {
			const LoadingComponent = options.loading;
			// SSRが無効の場合は、最初にLoadingComponentを表示
			if (!isSSR) {
				return function DynamicComponent(props: any) {
					const [isLoaded, setIsLoaded] = React.useState(false);

					React.useEffect(() => {
						// 非同期でコンテンツをロード
						setTimeout(() => setIsLoaded(true), 0);
					}, []);

					if (!isLoaded) {
						return <LoadingComponent />;
					}

					// ThemeSwitcherContentのモック
					return <div data-testid="theme-switcher-content" {...props} />;
				};
			}
		}

		// SSRが有効な場合（プレースホルダー）
		if (isSSR) {
			return function PlaceholderComponent(props: any) {
				return <div data-testid="theme-switcher-placeholder" {...props} />;
			};
		}

		// デフォルトのモック
		return function MockedComponent(props: any) {
			return <div data-testid="mocked-component" {...props} />;
		};
	},
}));

// Reactのインポート
import React from "react";

describe("ThemeSwitcher", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("機能フラグがONの場合", () => {
		beforeEach(() => {
			(FEATURES as any).THEME_SWITCHER = true;
		});

		it("最初にプレースホルダーが表示され、その後コンテンツが表示される", async () => {
			render(<ThemeSwitcher />);

			// 最初はプレースホルダーが表示される
			expect(
				screen.getByTestId("theme-switcher-placeholder"),
			).toBeInTheDocument();

			// コンテンツがロードされるのを待つ
			await waitFor(() => {
				expect(
					screen.getByTestId("theme-switcher-content"),
				).toBeInTheDocument();
			});

			// プレースホルダーは表示されなくなる
			expect(
				screen.queryByTestId("theme-switcher-placeholder"),
			).not.toBeInTheDocument();
		});

		it("ThemeSwitcherContentが正しくレンダリングされる", async () => {
			render(<ThemeSwitcher />);

			await waitFor(() => {
				expect(
					screen.getByTestId("theme-switcher-content"),
				).toBeInTheDocument();
			});
		});
	});

	describe("機能フラグがOFFの場合", () => {
		beforeEach(() => {
			(FEATURES as any).THEME_SWITCHER = false;
		});

		it("何も表示されない", () => {
			const { container } = render(<ThemeSwitcher />);

			expect(container.firstChild).toBeNull();
			expect(
				screen.queryByTestId("theme-switcher-content"),
			).not.toBeInTheDocument();
			expect(
				screen.queryByTestId("theme-switcher-placeholder"),
			).not.toBeInTheDocument();
		});
	});

	describe("機能フラグの動的変更", () => {
		it("機能フラグがONからOFFに変更された場合", () => {
			(FEATURES as any).THEME_SWITCHER = true;
			const { rerender } = render(<ThemeSwitcher />);

			expect(
				screen.getByTestId("theme-switcher-placeholder"),
			).toBeInTheDocument();

			// 機能フラグをOFFに変更
			(FEATURES as any).THEME_SWITCHER = false;
			rerender(<ThemeSwitcher />);

			expect(
				screen.queryByTestId("theme-switcher-placeholder"),
			).not.toBeInTheDocument();
			expect(
				screen.queryByTestId("theme-switcher-content"),
			).not.toBeInTheDocument();
		});

		it("機能フラグがOFFからONに変更された場合", async () => {
			(FEATURES as any).THEME_SWITCHER = false;
			const { rerender, container } = render(<ThemeSwitcher />);

			expect(container.firstChild).toBeNull();

			// 機能フラグをONに変更
			(FEATURES as any).THEME_SWITCHER = true;
			rerender(<ThemeSwitcher />);

			// プレースホルダーが表示される
			expect(
				screen.getByTestId("theme-switcher-placeholder"),
			).toBeInTheDocument();

			// コンテンツがロードされる
			await waitFor(() => {
				expect(
					screen.getByTestId("theme-switcher-content"),
				).toBeInTheDocument();
			});
		});
	});

	describe("レンダリングパフォーマンス", () => {
		it("複数回レンダリングされても正しく動作する", async () => {
			(FEATURES as any).THEME_SWITCHER = true;

			const { rerender } = render(<ThemeSwitcher />);

			// 複数回レンダリング
			for (let i = 0; i < 5; i++) {
				rerender(<ThemeSwitcher />);
			}

			// 最終的にコンテンツが表示される
			await waitFor(() => {
				expect(
					screen.getByTestId("theme-switcher-content"),
				).toBeInTheDocument();
			});
		});
	});
});
