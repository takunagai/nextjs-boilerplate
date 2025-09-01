import { Card, CardContent } from "@/components/ui/card";
import { FaSpinner, FaGlobe } from "react-icons/fa6";

export default function SiteLoading() {
	return (
		<div className="min-h-screen bg-background flex items-center justify-center px-4">
			<div className="max-w-xl w-full text-center space-y-8">
				{/* メインローディングアイコン */}
				<div className="flex justify-center">
					<div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full flex items-center justify-center">
						<FaGlobe className="w-12 h-12 text-blue-600 dark:text-blue-400" />
					</div>
				</div>

				{/* メッセージ */}
				<div className="space-y-4">
					<h1 className="text-2xl font-bold text-foreground">
						ページを読み込み中
					</h1>
					<p className="text-lg text-muted-foreground max-w-md mx-auto">
						コンテンツを準備しています。もうしばらくお待ちください。
					</p>
				</div>

				{/* ローディング詳細カード */}
				<Card className="max-w-md mx-auto">
					<CardContent className="p-6">
						<div className="space-y-4">
							{/* 現在の処理状況 */}
							<div className="flex items-center justify-center space-x-3">
								<FaSpinner className="w-5 h-5 text-primary animate-spin" />
								<span className="text-sm text-foreground">
									最適化されたコンテンツを配信中
								</span>
							</div>

							{/* 処理ステップ */}
							<div className="space-y-3 text-left">
								<div className="flex items-center space-x-3">
									<div className="w-2 h-2 bg-green-500 rounded-full"></div>
									<span className="text-sm text-muted-foreground">
										ページテンプレートの準備完了
									</span>
								</div>
								<div className="flex items-center space-x-3">
									<div className="w-2 h-2 bg-green-500 rounded-full"></div>
									<span className="text-sm text-muted-foreground">
										スタイルシートの読み込み完了
									</span>
								</div>
								<div className="flex items-center space-x-3">
									<div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
									<span className="text-sm text-muted-foreground">
										動的コンテンツを取得中
									</span>
								</div>
								<div className="flex items-center space-x-3">
									<div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
									<span className="text-sm text-muted-foreground">
										インタラクティブ要素を初期化中
									</span>
								</div>
							</div>

							{/* プログレスインジケータ */}
							<div className="pt-4">
								<div className="flex justify-between text-sm mb-2">
									<span className="text-muted-foreground">読み込み進捗</span>
									<span className="text-primary font-medium">75%</span>
								</div>
								<div className="w-full bg-muted rounded-full h-2">
									<div
										className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
										style={{ width: "75%" }}
									/>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* パフォーマンス情報 */}
				<div className="bg-gray-50 dark:bg-gray-900/20 border border-gray-200 dark:border-gray-800 rounded-lg p-4 max-w-md mx-auto">
					<div className="space-y-2">
						<div className="flex items-center justify-center space-x-2">
							<div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
							<span className="text-sm font-medium text-foreground">
								高速配信システム
							</span>
						</div>
						<p className="text-xs text-muted-foreground text-center">
							CDN経由で最適化されたコンテンツを配信しています
						</p>
					</div>
				</div>

				{/* ヒント */}
				<div className="text-center">
					<p className="text-sm text-muted-foreground">
						💡
						初回アクセス時は、追加のリソースを読み込むため少し時間がかかります
					</p>
				</div>
			</div>
		</div>
	);
}
