import { renderHook, act } from "@testing-library/react";
import { useScroll } from "../useScroll";
import { vi } from "vitest";

// グローバルな window プロパティをモック
const mockScrollY = vi.fn();
const mockInnerHeight = vi.fn();
const mockDocumentBodyOffsetHeight = vi.fn();
const mockAddEventListener = vi.fn();
const mockRemoveEventListener = vi.fn();

Object.defineProperty(window, "scrollY", {
	get: mockScrollY,
});

Object.defineProperty(window, "innerHeight", {
	get: mockInnerHeight,
});

Object.defineProperty(document.body, "offsetHeight", {
	get: mockDocumentBodyOffsetHeight,
});

Object.defineProperty(window, "addEventListener", {
	value: mockAddEventListener,
});

Object.defineProperty(window, "removeEventListener", {
	value: mockRemoveEventListener,
});

describe("useScroll", () => {
	const mockDate = Date;

	beforeEach(() => {
		vi.clearAllMocks();

		// デフォルト値を設定
		mockScrollY.mockReturnValue(0);
		mockInnerHeight.mockReturnValue(600);
		mockDocumentBodyOffsetHeight.mockReturnValue(1200);

		// Date.nowをモック
		global.Date.now = vi.fn(() => 1000);
	});

	afterEach(() => {
		global.Date = mockDate;
	});

	describe("初期状態", () => {
		it("デフォルトの初期値を設定する", () => {
			const { result } = renderHook(() => useScroll());

			expect(result.current.direction).toBeNull();
			expect(result.current.visible).toBe(true);
			expect(result.current.scrollY).toBe(0);
			expect(result.current.isAtTop).toBe(true);
			expect(result.current.isAtBottom).toBe(false);
			expect(result.current.previousScrollY).toBe(0);
		});

		it("カスタム初期表示状態を設定する", () => {
			const { result } = renderHook(() =>
				useScroll({ initiallyVisible: false }),
			);

			expect(result.current.visible).toBe(false);
		});

		it("初期スクロール位置を正しく設定する", () => {
			mockScrollY.mockReturnValue(100);

			const { result } = renderHook(() => useScroll());

			expect(result.current.scrollY).toBe(100);
			expect(result.current.isAtTop).toBe(false);
		});

		it("topOffsetを考慮した初期状態を設定する", () => {
			mockScrollY.mockReturnValue(50);

			const { result } = renderHook(() => useScroll({ topOffset: 100 }));

			expect(result.current.isAtTop).toBe(true);
		});
	});

	describe("イベントリスナーの設定", () => {
		it("scrollイベントリスナーを追加する", () => {
			renderHook(() => useScroll());

			expect(mockAddEventListener).toHaveBeenCalledWith(
				"scroll",
				expect.any(Function),
				{ passive: true },
			);
		});

		it("resizeイベントリスナーを追加する", () => {
			renderHook(() => useScroll());

			expect(mockAddEventListener).toHaveBeenCalledWith(
				"resize",
				expect.any(Function),
				{ passive: true },
			);
		});

		it("アンマウント時にイベントリスナーを削除する", () => {
			const { unmount } = renderHook(() => useScroll());

			unmount();

			expect(mockRemoveEventListener).toHaveBeenCalledWith(
				"scroll",
				expect.any(Function),
			);
			expect(mockRemoveEventListener).toHaveBeenCalledWith(
				"resize",
				expect.any(Function),
			);
		});
	});

	describe("スクロール方向の検出", () => {
		it("下向きスクロールを検出する", () => {
			mockScrollY.mockReturnValue(0);
			const { result } = renderHook(() => useScroll({ threshold: 5 }));

			// スクロールイベントを取得
			const scrollHandler = mockAddEventListener.mock.calls.find(
				(call: unknown[]) => call[0] === "scroll",
			)?.[1] as () => void;

			// 下向きスクロールをシミュレート
			act(() => {
				mockScrollY.mockReturnValue(20);
				scrollHandler();
			});

			expect(result.current.direction).toBe("down");
			expect(result.current.scrollY).toBe(20);
		});

		it("上向きスクロールを検出する", () => {
			mockScrollY.mockReturnValue(100);
			const { result } = renderHook(() => useScroll({ threshold: 5 }));

			// 初期状態を設定
			const scrollHandler = mockAddEventListener.mock.calls.find(
				(call: unknown[]) => call[0] === "scroll",
			)?.[1] as () => void;

			// 下向きスクロール後、上向きスクロールをシミュレート
			act(() => {
				mockScrollY.mockReturnValue(120);
				scrollHandler();
			});

			act(() => {
				mockScrollY.mockReturnValue(80);
				scrollHandler();
			});

			expect(result.current.direction).toBe("up");
		});

		it("閾値未満の変化では方向を変更しない", () => {
			mockScrollY.mockReturnValue(0);
			const { result } = renderHook(() => useScroll({ threshold: 10 }));

			const scrollHandler = mockAddEventListener.mock.calls.find(
				(call: unknown[]) => call[0] === "scroll",
			)?.[1] as () => void;

			// 閾値未満のスクロール
			act(() => {
				mockScrollY.mockReturnValue(5);
				scrollHandler();
			});

			expect(result.current.direction).toBeNull();
		});
	});

	describe("表示/非表示の制御", () => {
		it("下向きスクロール時に非表示になる", () => {
			mockScrollY.mockReturnValue(0);
			const { result } = renderHook(() => useScroll({ threshold: 5 }));

			const scrollHandler = mockAddEventListener.mock.calls.find(
				(call: unknown[]) => call[0] === "scroll",
			)?.[1] as () => void;

			act(() => {
				mockScrollY.mockReturnValue(20);
				scrollHandler();
			});

			expect(result.current.visible).toBe(false);
		});

		it("上向きスクロール時に表示される", () => {
			mockScrollY.mockReturnValue(100);
			const { result } = renderHook(() => useScroll({ threshold: 5 }));

			const scrollHandler = mockAddEventListener.mock.calls.find(
				(call: unknown[]) => call[0] === "scroll",
			)?.[1] as () => void;

			// 下向きスクロール
			act(() => {
				mockScrollY.mockReturnValue(120);
				scrollHandler();
			});

			// 上向きスクロール
			act(() => {
				mockScrollY.mockReturnValue(110);
				scrollHandler();
			});

			expect(result.current.visible).toBe(true);
		});

		it("最上部では常に表示される", () => {
			mockScrollY.mockReturnValue(100);
			const { result } = renderHook(() => useScroll({ threshold: 5 }));

			const scrollHandler = mockAddEventListener.mock.calls.find(
				(call: unknown[]) => call[0] === "scroll",
			)?.[1] as () => void;

			// 最上部にスクロール
			act(() => {
				mockScrollY.mockReturnValue(0);
				scrollHandler();
			});

			expect(result.current.visible).toBe(true);
			expect(result.current.isAtTop).toBe(true);
		});

		it("onlyDirectionChangeオプションが動作する", () => {
			mockScrollY.mockReturnValue(0);
			const { result } = renderHook(() =>
				useScroll({ threshold: 5, onlyDirectionChange: true }),
			);

			const scrollHandler = mockAddEventListener.mock.calls.find(
				(call: unknown[]) => call[0] === "scroll",
			)?.[1] as () => void;

			// 下向きスクロール（方向変化）
			act(() => {
				mockScrollY.mockReturnValue(20);
				scrollHandler();
			});

			expect(result.current.visible).toBe(false);

			// 上向きスクロール（方向変化）
			act(() => {
				mockScrollY.mockReturnValue(10);
				scrollHandler();
			});

			expect(result.current.visible).toBe(true);
		});
	});

	describe("最下部の検出", () => {
		it("最下部に到達したことを検出する", () => {
			mockScrollY.mockReturnValue(0);
			mockInnerHeight.mockReturnValue(600);
			mockDocumentBodyOffsetHeight.mockReturnValue(1000);

			const { result } = renderHook(() => useScroll());

			const scrollHandler = mockAddEventListener.mock.calls.find(
				(call: unknown[]) => call[0] === "scroll",
			)?.[1] as () => void;

			// 最下部までスクロール（600 + 400 >= 1000 - 5）
			act(() => {
				mockScrollY.mockReturnValue(400);
				scrollHandler();
			});

			expect(result.current.isAtBottom).toBe(true);
		});

		it("最下部でない場合はfalseを返す", () => {
			mockScrollY.mockReturnValue(0);
			mockInnerHeight.mockReturnValue(600);
			mockDocumentBodyOffsetHeight.mockReturnValue(1200);

			const { result } = renderHook(() => useScroll());

			const scrollHandler = mockAddEventListener.mock.calls.find(
				(call: unknown[]) => call[0] === "scroll",
			)?.[1] as () => void;

			// 中間位置（600 + 300 < 1200 - 5）
			act(() => {
				mockScrollY.mockReturnValue(300);
				scrollHandler();
			});

			expect(result.current.isAtBottom).toBe(false);
		});
	});

	describe("スロットリング機能", () => {
		beforeEach(() => {
			let currentTime = 1000;
			global.Date.now = vi.fn(() => {
				currentTime += 50; // 50msずつ増加
				return currentTime;
			});
		});

		it("スロットリング間隔内では更新されない", () => {
			mockScrollY.mockReturnValue(0);
			const { result } = renderHook(() =>
				useScroll({ throttleMs: 100, threshold: 5 }),
			);

			const scrollHandler = mockAddEventListener.mock.calls.find(
				(call: unknown[]) => call[0] === "scroll",
			)?.[1] as () => void;

			// 1回目の呼び出し
			act(() => {
				mockScrollY.mockReturnValue(20);
				scrollHandler();
			});

			const firstCallScrollY = result.current.scrollY;

			// スロットリング間隔内での2回目の呼び出し
			act(() => {
				mockScrollY.mockReturnValue(40);
				scrollHandler();
			});

			// 状態が更新されていないことを確認
			expect(result.current.scrollY).toBe(firstCallScrollY);
		});

		it("スロットリング間隔後は更新される", () => {
			let currentTime = 1000;
			global.Date.now = vi.fn(() => {
				currentTime += 150; // 150msずつ増加（throttleMs: 100を超える）
				return currentTime;
			});

			mockScrollY.mockReturnValue(0);
			const { result } = renderHook(() =>
				useScroll({ throttleMs: 100, threshold: 5 }),
			);

			const scrollHandler = mockAddEventListener.mock.calls.find(
				(call: unknown[]) => call[0] === "scroll",
			)?.[1] as () => void;

			// 1回目の呼び出し
			act(() => {
				mockScrollY.mockReturnValue(20);
				scrollHandler();
			});

			// 十分な時間後の2回目の呼び出し
			act(() => {
				mockScrollY.mockReturnValue(40);
				scrollHandler();
			});

			expect(result.current.scrollY).toBe(40);
		});
	});

	describe("previousScrollYの追跡", () => {
		it("前回のスクロール位置を正しく記録する", () => {
			mockScrollY.mockReturnValue(0);
			const { result } = renderHook(() => useScroll({ threshold: 5 }));

			const scrollHandler = mockAddEventListener.mock.calls.find(
				(call: unknown[]) => call[0] === "scroll",
			)?.[1] as () => void;

			// 最初のスクロール
			act(() => {
				mockScrollY.mockReturnValue(20);
				scrollHandler();
			});

			// 2回目のスクロール
			act(() => {
				mockScrollY.mockReturnValue(40);
				scrollHandler();
			});

			expect(result.current.previousScrollY).toBe(20);
			expect(result.current.scrollY).toBe(40);
		});
	});

	describe("オプションのテスト", () => {
		it("カスタム閾値が正しく動作する", () => {
			mockScrollY.mockReturnValue(0);
			const { result } = renderHook(() => useScroll({ threshold: 20 }));

			const scrollHandler = mockAddEventListener.mock.calls.find(
				(call: unknown[]) => call[0] === "scroll",
			)?.[1] as () => void;

			// 閾値未満のスクロール
			act(() => {
				mockScrollY.mockReturnValue(15);
				scrollHandler();
			});

			expect(result.current.direction).toBeNull();

			// 閾値以上のスクロール
			act(() => {
				mockScrollY.mockReturnValue(25);
				scrollHandler();
			});

			expect(result.current.direction).toBe("down");
		});

		it("カスタムtopOffsetが正しく動作する", () => {
			mockScrollY.mockReturnValue(50);
			const { result } = renderHook(() => useScroll({ topOffset: 100 }));

			expect(result.current.isAtTop).toBe(true);

			const scrollHandler = mockAddEventListener.mock.calls.find(
				(call: unknown[]) => call[0] === "scroll",
			)?.[1] as () => void;

			act(() => {
				mockScrollY.mockReturnValue(150);
				scrollHandler();
			});

			expect(result.current.isAtTop).toBe(false);
		});
	});

	describe("状態変化の最適化", () => {
		it("状態が変化しない場合は更新されない", () => {
			mockScrollY.mockReturnValue(100);
			const { result } = renderHook(() => useScroll({ threshold: 50 }));

			const scrollHandler = mockAddEventListener.mock.calls.find(
				(call: unknown[]) => call[0] === "scroll",
			)?.[1] as () => void;

			const initialState = result.current;

			// 閾値未満の小さな変化
			act(() => {
				mockScrollY.mockReturnValue(105);
				scrollHandler();
			});

			// オブジェクトの参照が変わっていないことを確認
			expect(result.current).toBe(initialState);
		});
	});

	describe("リサイズイベント", () => {
		it("リサイズ時に最下部のチェックが実行される", () => {
			mockScrollY.mockReturnValue(400);
			mockInnerHeight.mockReturnValue(600);
			mockDocumentBodyOffsetHeight.mockReturnValue(1000);

			const { result } = renderHook(() => useScroll());

			const resizeHandler = mockAddEventListener.mock.calls.find(
				(call: unknown[]) => call[0] === "resize",
			)?.[1] as () => void;

			act(() => {
				resizeHandler();
			});

			expect(result.current.isAtBottom).toBe(true);
		});
	});
});
