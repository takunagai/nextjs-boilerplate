"use client";

import Sidebar from "@/components/dashboard/sidebar";
import { UserNav } from "@/components/dashboard/user-nav";
import Link from "next/link";
import { ReactNode } from "react";

interface AppLayoutProps {
	children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
	return (
		<div className="flex min-h-screen">
			{/* サイドバー - lg以上の画面幅で表示 */}
			<div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
				<div className="flex flex-col flex-grow bg-gray-50 dark:bg-gray-900 border-r">
					<div className="px-4 py-5 flex items-center border-b">
						<Link href="/" className="flex items-center font-medium">
							<span className="text-xl">My App</span>
						</Link>
					</div>
					<Sidebar />
				</div>
			</div>

			{/* メインコンテンツエリア */}
			<div className="flex flex-col flex-1 lg:pl-64">
				{/* トップナビゲーション */}
				<header className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 border-b bg-background">
					<div className="flex items-center lg:hidden">
						<button
							type="button"
							className="p-2 text-gray-500"
							aria-label="メニューを開く"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<line x1="3" y1="12" x2="21" y2="12" />
								<line x1="3" y1="6" x2="21" y2="6" />
								<line x1="3" y1="18" x2="21" y2="18" />
							</svg>
						</button>
					</div>

					<div className="ml-auto flex items-center gap-4">
						<UserNav />
					</div>
				</header>

				{/* メインコンテンツ */}
				<main className="flex-1">{children}</main>
			</div>
		</div>
	);
}
