"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaCircleExclamation as AlertCircle, FaHouse as Home, FaArrowsRotate as RefreshCcw } from "react-icons/fa6";

interface ErrorPageProps {
	error: Error & { digest?: string };
	reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
	useEffect(() => {
		// エラーをログに記録（本番環境では外部サービスに送信）
		console.error("Application error:", error);

		// 開発環境でのみ詳細なエラー情報を表示
		if (process.env.NODE_ENV === "development") {
			console.group("Error Details");
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
			<div className="max-w-lg w-full text-center space-y-6">
				{/* エラーアイコン */}
				<div className="flex justify-center">
					<div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center">
						<AlertCircle className="w-10 h-10 text-destructive" />
					</div>
				</div>

				{/* エラータイトル */}
				<div className="space-y-2">
					<h1 className="text-2xl font-bold text-foreground">
						予期しないエラーが発生しました
					</h1>
					<p className="text-muted-foreground">
						申し訳ございませんが、処理中にエラーが発生しました。
						{isProduction
							? "しばらくしてから再度お試しください。"
							: "開発者にお問い合わせください。"}
					</p>
				</div>

				{/* エラー詳細（開発環境のみ） */}
				{!isProduction && (
					<div className="bg-muted/50 border border-border rounded-lg p-4 text-left">
						<h3 className="font-semibold text-sm text-foreground mb-2">
							エラー詳細
						</h3>
						<div className="space-y-2 text-sm">
							<div>
								<span className="font-medium text-foreground">メッセージ: </span>
								<span className="text-muted-foreground font-mono">
									{error.message}
								</span>
							</div>
							{error.digest && (
								<div>
									<span className="font-medium text-foreground">ID: </span>
									<span className="text-muted-foreground font-mono">
										{error.digest}
									</span>
								</div>
							)}
						</div>
					</div>
				)}

				{/* アクションボタン */}
				<div className="flex flex-col sm:flex-row gap-3 justify-center">
					<Button onClick={reset} className="gap-2">
						<RefreshCcw className="w-4 h-4" />
						再試行
					</Button>
					<Button variant="outline" asChild className="gap-2">
						<Link href="/">
							<Home className="w-4 h-4" />
							ホームに戻る
						</Link>
					</Button>
				</div>

				{/* サポート情報 */}
				{isProduction && (
					<div className="border-t border-border pt-6 mt-8">
						<p className="text-sm text-muted-foreground">
							問題が解決しない場合は、
							<Link
								href="/contact"
								className="text-primary hover:underline ml-1"
							>
								お問い合わせ
							</Link>
							よりご連絡ください。
						</p>
					</div>
				)}
			</div>
		</div>
	);
}