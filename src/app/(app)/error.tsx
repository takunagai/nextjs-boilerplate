"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaCircleExclamation as AlertCircle, FaHouse as Home, FaArrowsRotate as RefreshCcw, FaGear as Settings, FaRightFromBracket as LogOut } from "react-icons/fa6";

interface AppErrorPageProps {
	error: Error & { digest?: string };
	reset: () => void;
}

export default function AppErrorPage({ error, reset }: AppErrorPageProps) {
	useEffect(() => {
		// アプリケーション領域のエラーログ記録
		console.error("Dashboard/App area error:", error);

		// 開発環境でのデバッグ情報
		if (process.env.NODE_ENV === "development") {
			console.group("App Area Error Details");
			console.error("Message:", error.message);
			console.error("Stack:", error.stack);
			if (error.digest) {
				console.error("Digest:", error.digest);
			}
			console.groupEnd();
		}
	}, [error]);

	const isProduction = process.env.NODE_ENV === "production";

	return (
		<div className="min-h-screen bg-background flex items-center justify-center px-4">
			<Card className="max-w-lg w-full">
				<CardHeader className="text-center space-y-4">
					<div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto">
						<AlertCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
					</div>
					<CardTitle className="text-xl">アプリケーションエラー</CardTitle>
				</CardHeader>

				<CardContent className="space-y-4">
					<p className="text-muted-foreground text-center">
						{isProduction
							? "ダッシュボードの読み込み中にエラーが発生しました。一時的な問題の可能性があります。"
							: "開発環境でアプリケーションエラーが発生しています。"}
					</p>

					{/* エラー詳細（開発環境のみ） */}
					{!isProduction && (
						<div className="bg-muted/50 border border-border rounded-lg p-4 text-sm">
							<h4 className="font-semibold text-foreground mb-2">
								エラー詳細
							</h4>
							<div className="space-y-2 text-muted-foreground">
								<div>
									<span className="font-medium">メッセージ:</span>{" "}
									<code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">
										{error.message}
									</code>
								</div>
								{error.digest && (
									<div>
										<span className="font-medium">エラーID:</span>{" "}
										<code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">
											{error.digest}
										</code>
									</div>
								)}
							</div>
						</div>
					)}

					{/* 推奨対処方法 */}
					<div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
						<h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
							対処方法
						</h4>
						<ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
							<li>• ページを再読み込みしてください</li>
							<li>• ブラウザのキャッシュをクリアしてください</li>
							<li>• 一度ログアウトしてからログインし直してください</li>
							<li>• 問題が続く場合はサポートにご連絡ください</li>
						</ul>
					</div>

					{/* アクションボタン */}
					<div className="space-y-3">
						<Button onClick={reset} className="w-full gap-2">
							<RefreshCcw className="w-4 h-4" />
							再試行
						</Button>

						<div className="grid grid-cols-3 gap-2">
							<Button variant="outline" size="sm" asChild>
								<Link href="/dashboard" className="gap-1">
									<Settings className="w-3 h-3" />
									<span className="hidden sm:inline">ダッシュボード</span>
								</Link>
							</Button>
							<Button variant="outline" size="sm" asChild>
								<Link href="/" className="gap-1">
									<Home className="w-3 h-3" />
									<span className="hidden sm:inline">ホーム</span>
								</Link>
							</Button>
							<Button variant="outline" size="sm" asChild>
								<Link href="/api/auth/signout" className="gap-1">
									<LogOut className="w-3 h-3" />
									<span className="hidden sm:inline">ログアウト</span>
								</Link>
							</Button>
						</div>
					</div>

					{/* ユーザーデータの安全性に関する注意 */}
					{isProduction && (
						<div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
							<p className="text-sm text-green-800 dark:text-green-200">
								<span className="font-medium">安心してください:</span>{" "}
								あなたのデータは安全に保護されており、このエラーによって失われることはありません。
							</p>
						</div>
					)}

					{/* サポート情報 */}
					{isProduction && (
						<div className="text-center pt-4 border-t border-border">
							<p className="text-sm text-muted-foreground">
								エラーが解決しない場合は
								<Link
									href="/contact"
									className="text-primary hover:underline mx-1"
								>
									サポートチーム
								</Link>
								までお問い合わせください。
							</p>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}