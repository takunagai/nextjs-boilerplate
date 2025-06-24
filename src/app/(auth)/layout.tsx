"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { APP } from "@/lib/constants";

interface AuthLayoutProps {
	children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
	return (
		<div className="flex min-h-screen flex-col">
			{/* シンプルなヘッダー */}
			<header className="flex h-16 items-center border-b px-4 lg:px-6">
				<Link href="/" className="flex items-center justify-center">
					<span className="text-xl font-semibold">{APP.NAME}</span>
				</Link>
			</header>

			{/* 認証コンテンツ - 中央配置 */}
			<main className="flex-1 flex items-center justify-center p-4 md:p-8">
				<div className="w-full max-w-md">{children}</div>
			</main>

			{/* シンプルなフッター */}
			<footer className="border-t py-6 px-4 lg:px-6">
				<div className="container mx-auto flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
					<p className="text-sm text-muted-foreground">
						&copy; {new Date().getFullYear()} {APP.COPYRIGHT_HOLDER}
					</p>
					<nav className="flex gap-4 text-sm text-muted-foreground">
						<Link href="/privacy" className="hover:underline">
							プライバシーポリシー
						</Link>
						<Link href="/contact" className="hover:underline">
							お問い合わせ
						</Link>
					</nav>
				</div>
			</footer>
		</div>
	);
}
