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

export function AnnouncementBarProvider({ children }: { children: ReactNode }) {
	const [isVisible, setIsVisible] = useState(false);
	const [_isClosing, setIsClosing] = useState(false);
	const height = 40; // h-10 = 40px

	useEffect(() => {
		const stored = localStorage.getItem("announcement-bar-closed");
		const shouldShow = stored !== "true";

		// 初回表示時のアニメーション遅延
		if (shouldShow) {
			setTimeout(() => setIsVisible(true), 100);
		}
	}, []);

	const close = () => {
		setIsClosing(true);
		setTimeout(() => {
			setIsVisible(false);
			setIsClosing(false);
			localStorage.setItem("announcement-bar-closed", "true");
		}, 300); // アニメーション時間と同期
	};

	return (
		<AnnouncementBarContext.Provider value={{ isVisible, height, close }}>
			{children}
		</AnnouncementBarContext.Provider>
	);
}

export const useAnnouncementBar = () => useContext(AnnouncementBarContext);
