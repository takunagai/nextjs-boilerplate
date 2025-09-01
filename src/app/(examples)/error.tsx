"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaCode as Code, FaHouse as Home, FaArrowsRotate as RefreshCcw, FaBug as Bug, FaFile as FileText } from "react-icons/fa6";

interface ExamplesErrorPageProps {
	error: Error & { digest?: string };
	reset: () => void;
}

export default function ExamplesErrorPage({
	error,
	reset,
}: ExamplesErrorPageProps) {
	useEffect(() => {
		// サンプルページエラーのログ記録
		console.error("Examples page error:", error);

		// 開発環境でのデバッグ情報（サンプルページなので詳細表示）
		console.group("Examples Error Details");
		console.error("Message:", error.message);
		console.error("Stack:", error.stack);
		if (error.digest) {
			console.error("Digest:", error.digest);
		}
		console.groupEnd();
	}, [error]);

	return (
		<div className="min-h-screen bg-background flex items-center justify-center px-4">
			<Card className="max-w-2xl w-full">
				<CardHeader className="text-center space-y-4">
					<div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto">
						<Bug className="w-10 h-10 text-purple-600 dark:text-purple-400" />
					</div>
					<CardTitle className="text-2xl">サンプルページエラー</CardTitle>
				</CardHeader>

				<CardContent className="space-y-6">
					<p className="text-muted-foreground text-center text-lg">
						開発用サンプルページでエラーが発生しました。これは実験的な機能のため、予期しないエラーが発生する可能性があります。
					</p>

					{/* エラー詳細（常に表示） */}
					<div className="bg-muted/50 border border-border rounded-lg p-4">
						<h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
							<Code className="w-4 h-4" />
							エラー詳細
						</h4>
						<div className="space-y-3 text-sm">
							<div>
								<span className="font-medium text-foreground">メッセージ:</span>
								<div className="mt-1 p-3 bg-destructive/10 border border-destructive/20 rounded font-mono text-xs overflow-x-auto">
									{error.message}
								</div>
							</div>
							{error.digest && (
								<div>
									<span className="font-medium text-foreground">
										エラーID:
									</span>
									<div className="mt-1 p-2 bg-muted border rounded font-mono text-xs">
										{error.digest}
									</div>
								</div>
							)}
							{error.stack && (
								<details className="group">
									<summary className="font-medium text-foreground cursor-pointer hover:text-foreground/80">
										スタックトレース（クリックで展開）
									</summary>
									<div className="mt-2 p-3 bg-muted border rounded font-mono text-xs overflow-x-auto max-h-40 overflow-y-auto">
										<pre className="whitespace-pre-wrap">{error.stack}</pre>
									</div>
								</details>
							)}
						</div>
					</div>

					{/* 開発者向け情報 */}
					<div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
						<h4 className="font-medium text-blue-900 dark:text-blue-100 mb-3 flex items-center gap-2">
							<FileText className="w-4 h-4" />
							開発者向け情報
						</h4>
						<ul className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
							<li>• サンプルコードのバグやReactの使用方法を確認してください</li>
							<li>• ブラウザの開発者ツールでコンソールエラーを確認してください</li>
							<li>• TypeScriptの型エラーがないか確認してください</li>
							<li>• 必要な依存関係がインストールされているか確認してください</li>
							<li>• Next.js のドキュメントを参照してください</li>
						</ul>
					</div>

					{/* 関連リンク */}
					<div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
						<h4 className="font-medium text-green-900 dark:text-green-100 mb-3">
							関連リソース
						</h4>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
							<a
								href="https://nextjs.org/docs"
								target="_blank"
								rel="noopener noreferrer"
								className="text-green-700 dark:text-green-300 hover:underline"
							>
								📚 Next.js ドキュメント
							</a>
							<a
								href="https://react.dev"
								target="_blank"
								rel="noopener noreferrer"
								className="text-green-700 dark:text-green-300 hover:underline"
							>
								⚛️ React ドキュメント
							</a>
							<a
								href="https://ui.shadcn.com"
								target="_blank"
								rel="noopener noreferrer"
								className="text-green-700 dark:text-green-300 hover:underline"
							>
								🎨 shadcn/ui コンポーネント
							</a>
							<a
								href="https://tailwindcss.com/docs"
								target="_blank"
								rel="noopener noreferrer"
								className="text-green-700 dark:text-green-300 hover:underline"
							>
								💨 Tailwind CSS
							</a>
						</div>
					</div>

					{/* アクションボタン */}
					<div className="space-y-4">
						<div className="flex flex-col sm:flex-row gap-3">
							<Button onClick={reset} className="flex-1 gap-2">
								<RefreshCcw className="w-4 h-4" />
								サンプルページを再試行
							</Button>
							<Button variant="outline" asChild className="flex-1 gap-2">
								<Link href="/examples">
									<Code className="w-4 h-4" />
									サンプル一覧に戻る
								</Link>
							</Button>
						</div>

						<Button variant="outline" asChild className="w-full gap-2">
							<Link href="/">
								<Home className="w-4 h-4" />
								ホームページに戻る
							</Link>
						</Button>
					</div>

					{/* デバッグのヒント */}
					<div className="border-t border-border pt-4">
						<p className="text-xs text-muted-foreground text-center">
							💡{" "}
							<strong>デバッグのコツ:</strong>{" "}
							このエラーはサンプルコードの学習に役立ちます。エラーメッセージを読んで、何が問題なのかを理解しましょう。
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}