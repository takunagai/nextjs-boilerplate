"use client";

import { IoClose } from "react-icons/io5";
import { cn } from "@/lib/utils";
import { useAnnouncementBar } from "./announcement-bar-context";

export function AnnouncementBar() {
	const { isVisible, close } = useAnnouncementBar();

	if (!isVisible) return null;

	return (
		<header
			className={cn(
				"fixed top-0 left-0 right-0 z-50 h-10 bg-purple-700 text-white",
				"transition-transform duration-300 ease-in-out",
			)}
			aria-label="お知らせ"
		>
			<div className="relative flex items-center h-full">
				{/* モバイルでスクロール可能なコンテナ */}
				<div className="flex-1 overflow-x-auto scrollbar-none">
					<div className="px-4 pr-12 text-center min-w-fit">
						<p className="inline-block whitespace-nowrap text-xs sm:text-sm leading-10">
							<span className="inline-block animate-pulse mr-1">🧪</span>
							<span>
								{/*マークが付いたサービスは、新規サービスにつき格安でお試しいただけるテスター募集中！*/}
								⚠️制作中につきダミー情報の箇所があります。公開時には修正いたします。
							</span>
						</p>
					</div>
				</div>
				{/* 閉じるボタン - 右端に固定 */}
				<button
					type="button"
					onClick={close}
					className={cn(
						"absolute right-1 top-1/2 -translate-y-1/2",
						"p-1.5 rounded-full bg-purple-800/50 hover:bg-purple-600",
						"transition-all duration-200 hover:scale-110",
						"focus:outline-none focus:ring-2 focus:ring-white/30",
						"backdrop-blur-sm",
					)}
					aria-label="お知らせを閉じる"
				>
					<IoClose className="h-3 w-3 sm:h-4 sm:w-4" />
				</button>
			</div>
		</header>
	);
}
