"use client";

import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";

interface AnnouncementBarContextType {
	isVisible: boolean;
	height: number;
	close: () => void;
}

const AnnouncementBarContext = createContext<AnnouncementBarContextType>({
	isVisible: false,
	height: 0,
	close: () => {},
});

// バージョン付きストレージキー（スキーマ変更時にインクリメント）
const STORAGE_KEY = "announcement-bar-closed:v1";

export function AnnouncementBarProvider({ children }: { children: ReactNode }) {
	// 初期状態をnullにしてSSR/CSRの不一致を防ぐ
	const [isVisible, setIsVisible] = useState<boolean | null>(null);
	const [_isClosing, setIsClosing] = useState(false);
	const height = 40; // h-10 = 40px

	useEffect(() => {
		// クライアントサイドでのみ実行
		if (typeof window === "undefined") return;

		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			const shouldShow = stored !== "true";

			// 初期状態を設定
			setIsVisible(shouldShow);
		} catch {
			// incognito モードや quota 超過時のフォールバック
			setIsVisible(true);
		}

		// 開発環境でのリセット機能
		if (process.env.NODE_ENV === "development") {
			// グローバルに関数を公開
			(window as any).resetAnnouncementBar = () => {
				try {
					localStorage.removeItem(STORAGE_KEY);
				} catch {
					// storage エラーは無視
				}
				setIsVisible(true);
			};
		}
	}, []);

	const close = () => {
		setIsClosing(true);
		setTimeout(() => {
			setIsVisible(false);
			setIsClosing(false);
			try {
				localStorage.setItem(STORAGE_KEY, "true");
			} catch {
				// incognito モードや quota 超過時は状態のみ更新
			}
		}, 300); // アニメーション時間と同期
	};

	return (
		<AnnouncementBarContext.Provider
			value={{ isVisible: isVisible ?? false, height, close }}
		>
			{children}
		</AnnouncementBarContext.Provider>
	);
}

export const useAnnouncementBar = () => useContext(AnnouncementBarContext);
