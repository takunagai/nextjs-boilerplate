"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	FaTriangleExclamation as AlertTriangle,
	FaHouse as Home,
	FaArrowsRotate as RefreshCcw,
	FaRightToBracket as LogIn,
} from "react-icons/fa6";

interface AuthErrorPageProps {
	error: Error & { digest?: string };
	reset: () => void;
}

export default function AuthErrorPage({ error, reset }: AuthErrorPageProps) {
	useEffect(() => {
		// 認証関連エラーのログ記録
		console.error("Authentication error:", error);

		// 開発環境でのデバッグ情報
		if (process.env.NODE_ENV === "development") {
			console.group("Auth Error Details");
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
			<Card className="max-w-md w-full">
				<CardHeader className="text-center space-y-4">
					<div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mx-auto">
						<AlertTriangle className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
					</div>
					<CardTitle className="text-xl">認証エラーが発生しました</CardTitle>
				</CardHeader>

				<CardContent className="space-y-4">
					<p className="text-muted-foreground text-center">
						{isProduction
							? "認証処理中にエラーが発生しました。もう一度お試しください。"
							: "開発環境で認証エラーが発生しています。"}
					</p>

					{/* エラー詳細（開発環境のみ） */}
					{!isProduction && (
						<div className="bg-muted/50 border border-border rounded-lg p-3 text-sm">
							<h4 className="font-medium text-foreground mb-2">エラー詳細</h4>
							<div className="space-y-1 text-muted-foreground">
								<div>
									<span className="font-medium">メッセージ:</span>{" "}
									<code className="font-mono text-xs">{error.message}</code>
								</div>
								{error.digest && (
									<div>
										<span className="font-medium">ID:</span>{" "}
										<code className="font-mono text-xs">{error.digest}</code>
									</div>
								)}
							</div>
						</div>
					)}

					{/* 認証関連の推奨アクション */}
					<div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
						<h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
							よくある原因
						</h4>
						<ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
							<li>• セッションの有効期限切れ</li>
							<li>• 認証サーバーの一時的な問題</li>
							<li>• ネットワーク接続の問題</li>
							<li>• 無効なログイン情報</li>
						</ul>
					</div>

					{/* アクションボタン */}
					<div className="flex flex-col gap-3">
						<Button onClick={reset} className="w-full gap-2">
							<RefreshCcw className="w-4 h-4" />
							再試行
						</Button>

						<div className="grid grid-cols-2 gap-2">
							<Button variant="outline" asChild>
								<Link href="/login" className="gap-2">
									<LogIn className="w-4 h-4" />
									ログイン
								</Link>
							</Button>
							<Button variant="outline" asChild>
								<Link href="/" className="gap-2">
									<Home className="w-4 h-4" />
									ホーム
								</Link>
							</Button>
						</div>
					</div>

					{/* サポート情報 */}
					{isProduction && (
						<div className="text-center pt-4 border-t border-border">
							<p className="text-sm text-muted-foreground">
								問題が続く場合は
								<Link
									href="/contact"
									className="text-primary hover:underline ml-1"
								>
									サポート
								</Link>
								にお問い合わせください。
							</p>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
