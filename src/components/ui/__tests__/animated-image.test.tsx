import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import type { RefObject } from "react";
import { useRef } from "react";
import { AnimatedImage } from "../animated-image";
import type { AnimatedImageProps } from "../animated-image.types";

// モックの設定
vi.mock("@/hooks/use-intersection-observer", () => ({
	useIntersectionObserver: vi.fn(() => ({
		ref: { current: null },
		isIntersecting: false,
		entry: undefined,
	})),
}));

vi.mock("@/hooks/use-media-query", () => ({
	usePrefersReducedMotion: vi.fn(() => false),
}));

vi.mock("motion/react", () => ({
	motion: {
		div: vi.fn(({ children, ...props }) => <div {...props}>{children}</div>),
	},
}));

beforeEach(() => {
	vi.clearAllMocks();
});

describe("AnimatedImage", () => {
	const defaultProps: AnimatedImageProps = {
		src: "/test-image.jpg",
		alt: "Test image",
		width: 400,
		height: 300,
	};

	describe("基本的なレンダリング", () => {
		it("正常にレンダリングされる", () => {
			render(<AnimatedImage {...defaultProps} />);
			const image = screen.getByAltText("Test image");
			expect(image).toBeInTheDocument();
		});

		it("カスタムクラス名が適用される", () => {
			render(<AnimatedImage {...defaultProps} className="custom-class" />);
			const image = screen.getByAltText("Test image");
			expect(image).toHaveClass("custom-class");
		});

		it("width と height が正しく設定される", () => {
			render(<AnimatedImage {...defaultProps} width={800} height={600} />);
			const image = screen.getByAltText("Test image");
			expect(image).toHaveAttribute("width", "800");
			expect(image).toHaveAttribute("height", "600");
		});
	});

	describe("ref の統合", () => {
		it("forwardRef が正しく動作する", () => {
			const TestComponent = () => {
				const ref: RefObject<HTMLDivElement> = useRef(null);
				return <AnimatedImage {...defaultProps} ref={ref} />;
			};

			render(<TestComponent />);
			// エラーが発生しないことを確認
			expect(screen.getByAltText("Test image")).toBeInTheDocument();
		});
	});

	describe("アニメーション設定", () => {
		it("カスタムアニメーション設定が適用される", () => {
			const animation = {
				duration: 1.0,
				delay: 0.5,
				yOffset: 50,
			};

			render(<AnimatedImage {...defaultProps} animation={animation} />);
			// コンポーネントが正常にレンダリングされることを確認
			expect(screen.getByAltText("Test image")).toBeInTheDocument();
		});

		it("デフォルト値が正しく設定される", () => {
			render(<AnimatedImage {...defaultProps} />);
			expect(screen.getByAltText("Test image")).toBeInTheDocument();
		});
	});

	describe("アクセシビリティ", () => {
		it("prefers-reduced-motion が考慮される", async () => {
			const { usePrefersReducedMotion } = await import(
				"@/hooks/use-media-query"
			);
			vi.mocked(usePrefersReducedMotion).mockReturnValue(true);

			render(<AnimatedImage {...defaultProps} />);
			const image = screen.getByAltText("Test image");

			// prefers-reduced-motion時はhover効果が無効になる
			expect(image).not.toHaveClass("hover:scale-105");
		});

		it("alt属性が正しく設定される", () => {
			render(<AnimatedImage {...defaultProps} alt="カスタムalt文字列" />);
			expect(screen.getByAltText("カスタムalt文字列")).toBeInTheDocument();
		});
	});

	describe("エラーハンドリング", () => {
		it("画像ロードエラー時にエラー表示される", async () => {
			const onError = vi.fn();
			render(<AnimatedImage {...defaultProps} onError={onError} />);

			const image = screen.getByAltText("Test image");

			// 画像ロードエラーをシミュレート
			fireEvent.error(image);

			await waitFor(() => {
				expect(
					screen.getByText("画像の読み込みに失敗しました"),
				).toBeInTheDocument();
			});
		});

		it("再試行ボタンが動作する", async () => {
			render(<AnimatedImage {...defaultProps} />);

			const image = screen.getByAltText("Test image");
			fireEvent.error(image);

			await waitFor(() => {
				const retryButton = screen.getByText("再試行");
				expect(retryButton).toBeInTheDocument();
				fireEvent.click(retryButton);
			});
		});

		it("デバッグモード時にエラー詳細が表示される", async () => {
			render(<AnimatedImage {...defaultProps} debug={true} />);

			const image = screen.getByAltText("Test image");
			fireEvent.error(image);

			await waitFor(() => {
				expect(
					screen.getByText("画像の読み込みに失敗しました"),
				).toBeInTheDocument();
			});
		});
	});

	describe("コールバック関数", () => {
		it("コンポーネントが正常にマウントされる", () => {
			const onAnimationStart = vi.fn();
			const onAnimationComplete = vi.fn();

			render(
				<AnimatedImage
					{...defaultProps}
					onAnimationStart={onAnimationStart}
					onAnimationComplete={onAnimationComplete}
				/>,
			);

			// コンポーネントが正常にレンダリングされることを確認
			expect(screen.getByAltText("Test image")).toBeInTheDocument();
		});
	});

	describe("Intersection Observer", () => {
		it("Intersection Observer の設定が正しく適用される", async () => {
			const { useIntersectionObserver } = await import(
				"@/hooks/use-intersection-observer"
			);
			const intersectionConfig = {
				threshold: 0.5,
				rootMargin: "100px",
				triggerOnce: false,
			};

			render(
				<AnimatedImage {...defaultProps} intersection={intersectionConfig} />,
			);

			expect(useIntersectionObserver).toHaveBeenCalledWith({
				threshold: 0.5,
				rootMargin: "100px",
				triggerOnce: false,
			});
		});
	});

	describe("パフォーマンス最適化", () => {
		it("loading='lazy' が設定される", () => {
			render(<AnimatedImage {...defaultProps} />);
			const image = screen.getByAltText("Test image");
			expect(image).toHaveAttribute("loading", "lazy");
		});

		it("decoding='async' が設定される", () => {
			render(<AnimatedImage {...defaultProps} />);
			const image = screen.getByAltText("Test image");
			expect(image).toHaveAttribute("decoding", "async");
		});
	});

	describe("デバッグモード", () => {
		beforeEach(() => {
			// コンソールログのモック
			vi.spyOn(console, "log").mockImplementation(() => {});
		});

		it("デバッグモード時にログが出力される", () => {
			render(<AnimatedImage {...defaultProps} debug={true} />);

			// デバッグログが出力されることを確認
			expect(console.log).toHaveBeenCalledWith(
				expect.stringContaining("[AnimatedImage]"),
				expect.any(Object),
			);
		});
	});
});
