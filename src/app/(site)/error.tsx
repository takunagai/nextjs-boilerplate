"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	FaTriangleExclamation as AlertTriangle,
	FaHouse as Home,
	FaArrowsRotate as RefreshCcw,
	FaEnvelope as Mail,
	FaPhone as Phone,
} from "react-icons/fa6";

interface SiteErrorPageProps {
	error: Error & { digest?: string };
	reset: () => void;
}

export default function SiteErrorPage({ error, reset }: SiteErrorPageProps) {
	useEffect(() => {
		// 公開サイトエラーのログ記録
		console.error("Public site error:", error);

		// 開発環境でのデバッグ情報
		if (process.env.NODE_ENV === "development") {
			console.group("Site Error Details");
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
			<div className="max-w-2xl w-full text-center space-y-8">
				{/* エラーアイコン */}
				<div className="flex justify-center">
					<div className="w-24 h-24 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
						<AlertTriangle className="w-12 h-12 text-orange-600 dark:text-orange-400" />
					</div>
				</div>

				{/* エラータイトルとメッセージ */}
				<div className="space-y-4">
					<h1 className="text-3xl font-bold text-foreground">
						ページの読み込みに失敗しました
					</h1>
					<p className="text-lg text-muted-foreground max-w-lg mx-auto">
						{isProduction
							? "申し訳ございませんが、一時的な技術的な問題が発生しております。しばらくしてから再度お試しください。"
							: "開発環境でページエラーが発生しています。詳細は下記をご確認ください。"}
					</p>
				</div>

				{/* エラー詳細（開発環境のみ） */}
				{!isProduction && (
					<div className="bg-muted/50 border border-border rounded-lg p-6 text-left max-w-lg mx-auto">
						<h3 className="font-semibold text-foreground mb-3">エラー詳細</h3>
						<div className="space-y-2 text-sm">
							<div className="break-all">
								<span className="font-medium text-foreground">メッセージ:</span>
								<br />
								<code className="font-mono text-muted-foreground bg-muted px-2 py-1 rounded mt-1 inline-block">
									{error.message}
								</code>
							</div>
							{error.digest && (
								<div>
									<span className="font-medium text-foreground">エラーID:</span>
									<br />
									<code className="font-mono text-muted-foreground bg-muted px-2 py-1 rounded mt-1 inline-block">
										{error.digest}
									</code>
								</div>
							)}
						</div>
					</div>
				)}

				{/* 推奨アクション */}
				<div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 max-w-lg mx-auto">
					<h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">
						解決方法
					</h3>
					<ul className="text-sm text-blue-800 dark:text-blue-200 space-y-2 text-left">
						<li>• ページを再読み込みしてください</li>
						<li>• ブラウザを再起動してください</li>
						<li>• インターネット接続を確認してください</li>
						<li>• 少し時間をおいてから再度アクセスしてください</li>
					</ul>
				</div>

				{/* アクションボタン */}
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<Button size="lg" onClick={reset} className="gap-2">
						<RefreshCcw className="w-5 h-5" />
						ページを再読み込み
					</Button>
					<Button size="lg" variant="outline" asChild className="gap-2">
						<Link href="/">
							<Home className="w-5 h-5" />
							ホームページに戻る
						</Link>
					</Button>
				</div>

				{/* サイトナビゲーション */}
				<div className="border-t border-border pt-8">
					<p className="text-sm text-muted-foreground mb-4">
						または、以下のページをご利用ください
					</p>
					<div className="flex flex-wrap justify-center gap-4 text-sm">
						<Link href="/about" className="text-primary hover:underline">
							会社概要
						</Link>
						<Link href="/services" className="text-primary hover:underline">
							サービス
						</Link>
						<Link href="/portfolio" className="text-primary hover:underline">
							実績
						</Link>
						<Link href="/news" className="text-primary hover:underline">
							ニュース
						</Link>
						<Link href="/contact" className="text-primary hover:underline">
							お問い合わせ
						</Link>
					</div>
				</div>

				{/* サポート情報 */}
				{isProduction && (
					<div className="bg-gray-50 dark:bg-gray-900/20 border border-gray-200 dark:border-gray-800 rounded-lg p-6 max-w-lg mx-auto">
						<h3 className="font-semibold text-foreground mb-3">
							お困りですか？
						</h3>
						<p className="text-sm text-muted-foreground mb-4">
							問題が解決しない場合は、お気軽にサポートチームまでご連絡ください。
						</p>
						<div className="flex flex-col sm:flex-row gap-3 justify-center">
							<Button variant="outline" size="sm" asChild className="gap-2">
								<Link href="/contact">
									<Mail className="w-4 h-4" />
									メールでお問い合わせ
								</Link>
							</Button>
							<Button variant="outline" size="sm" asChild className="gap-2">
								<Link href="tel:+81-3-1234-5678">
									<Phone className="w-4 h-4" />
									電話でお問い合わせ
								</Link>
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
