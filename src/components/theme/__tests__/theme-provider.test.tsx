import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "../theme-provider";
import { FEATURES } from "@/lib/constants";
import { vi } from "vitest";

// next-themesのモック
vi.mock("next-themes", () => ({
	ThemeProvider: ({ children, ...props }: any) => (
		<div data-testid="next-themes-provider" data-props={JSON.stringify(props)}>
			{children}
		</div>
	),
}));

// 定数のモック
vi.mock("@/lib/constants", () => ({
	FEATURES: {
		THEME_SWITCHER: true,
	},
	THEME: {
		DEFAULT: "system",
	},
}));

describe("ThemeProvider", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("機能フラグがONの場合", () => {
		beforeEach(() => {
			(FEATURES as any).THEME_SWITCHER = true;
		});

		it("NextThemesProviderでラップされる", () => {
			render(
				<ThemeProvider>
					<div>Test Content</div>
				</ThemeProvider>
			);

			expect(screen.getByTestId("next-themes-provider")).toBeInTheDocument();
			expect(screen.getByText("Test Content")).toBeInTheDocument();
		});

		it("デフォルトプロパティが正しく設定される", () => {
			render(
				<ThemeProvider>
					<div>Test Content</div>
				</ThemeProvider>
			);

			const provider = screen.getByTestId("next-themes-provider");
			const props = JSON.parse(provider.getAttribute("data-props") || "{}");

			expect(props.attribute).toBe("class");
			expect(props.defaultTheme).toBe("system");
			expect(props.enableSystem).toBe(true);
			expect(props.disableTransitionOnChange).toBe(true);
		});

		it("カスタムプロパティを渡せる", () => {
			render(
				<ThemeProvider
					defaultTheme="dark"
					storageKey="custom-theme"
					disableTransitionOnChange={false}
				>
					<div>Test Content</div>
				</ThemeProvider>
			);

			const provider = screen.getByTestId("next-themes-provider");
			const props = JSON.parse(provider.getAttribute("data-props") || "{}");

			expect(props.defaultTheme).toBe("dark");
			expect(props.storageKey).toBe("custom-theme");
			expect(props.disableTransitionOnChange).toBe(false);
		});

		it("themes配列を渡せる", () => {
			const themes = ["light", "dark", "custom"];
			render(
				<ThemeProvider themes={themes}>
					<div>Test Content</div>
				</ThemeProvider>
			);

			const provider = screen.getByTestId("next-themes-provider");
			const props = JSON.parse(provider.getAttribute("data-props") || "{}");

			expect(props.themes).toEqual(themes);
		});

		it("forcedThemeを設定できる", () => {
			render(
				<ThemeProvider forcedTheme="dark">
					<div>Test Content</div>
				</ThemeProvider>
			);

			const provider = screen.getByTestId("next-themes-provider");
			const props = JSON.parse(provider.getAttribute("data-props") || "{}");

			expect(props.forcedTheme).toBe("dark");
		});
	});

	describe("機能フラグがOFFの場合", () => {
		beforeEach(() => {
			(FEATURES as any).THEME_SWITCHER = false;
		});

		it("子要素のみがレンダリングされる", () => {
			render(
				<ThemeProvider>
					<div data-testid="child-content">Test Content</div>
				</ThemeProvider>
			);

			expect(screen.queryByTestId("next-themes-provider")).not.toBeInTheDocument();
			expect(screen.getByTestId("child-content")).toBeInTheDocument();
			expect(screen.getByText("Test Content")).toBeInTheDocument();
		});

		it("プロパティは無視される", () => {
			render(
				<ThemeProvider
					defaultTheme="dark"
					storageKey="custom-theme"
					themes={["light", "dark"]}
				>
					<div data-testid="child-content">Test Content</div>
				</ThemeProvider>
			);

			expect(screen.queryByTestId("next-themes-provider")).not.toBeInTheDocument();
			expect(screen.getByTestId("child-content")).toBeInTheDocument();
		});
	});

	describe("子要素の処理", () => {
		it("複数の子要素を正しくレンダリングする", () => {
			(FEATURES as any).THEME_SWITCHER = true;

			render(
				<ThemeProvider>
					<div>Child 1</div>
					<div>Child 2</div>
					<div>Child 3</div>
				</ThemeProvider>
			);

			expect(screen.getByText("Child 1")).toBeInTheDocument();
			expect(screen.getByText("Child 2")).toBeInTheDocument();
			expect(screen.getByText("Child 3")).toBeInTheDocument();
		});

		it("ネストされたコンポーネントを正しくレンダリングする", () => {
			(FEATURES as any).THEME_SWITCHER = true;

			render(
				<ThemeProvider>
					<div>
						<span>Nested Content</span>
						<div>
							<button>Button</button>
						</div>
					</div>
				</ThemeProvider>
			);

			expect(screen.getByText("Nested Content")).toBeInTheDocument();
			expect(screen.getByText("Button")).toBeInTheDocument();
		});

		it("nullやundefinedの子要素を正しく処理する", () => {
			(FEATURES as any).THEME_SWITCHER = true;

			render(
				<ThemeProvider>
					{null}
					<div>Valid Content</div>
					{undefined}
				</ThemeProvider>
			);

			expect(screen.getByText("Valid Content")).toBeInTheDocument();
		});
	});

	describe("disableTransitionOnChangeのデフォルト値", () => {
		it("明示的に指定しない場合はtrueになる", () => {
			(FEATURES as any).THEME_SWITCHER = true;

			render(
				<ThemeProvider>
					<div>Test</div>
				</ThemeProvider>
			);

			const provider = screen.getByTestId("next-themes-provider");
			const props = JSON.parse(provider.getAttribute("data-props") || "{}");

			expect(props.disableTransitionOnChange).toBe(true);
		});

		it("明示的にfalseを指定した場合はfalseになる", () => {
			(FEATURES as any).THEME_SWITCHER = true;

			render(
				<ThemeProvider disableTransitionOnChange={false}>
					<div>Test</div>
				</ThemeProvider>
			);

			const provider = screen.getByTestId("next-themes-provider");
			const props = JSON.parse(provider.getAttribute("data-props") || "{}");

			expect(props.disableTransitionOnChange).toBe(false);
		});
	});
});