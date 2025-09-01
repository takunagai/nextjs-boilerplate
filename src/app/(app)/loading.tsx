import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaSpinner, FaChartLine, FaDatabase } from "react-icons/fa6";

export default function AppLoading() {
	return (
		<div className="min-h-screen bg-background flex items-center justify-center px-4">
			<Card className="max-w-lg w-full">
				<CardHeader className="text-center space-y-4">
					<div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
						<FaChartLine className="w-10 h-10 text-green-600 dark:text-green-400" />
					</div>
					<CardTitle className="text-xl">ダッシュボードを準備中</CardTitle>
				</CardHeader>

				<CardContent className="space-y-6">
					<p className="text-muted-foreground text-center">
						最新のデータを取得し、ダッシュボードを初期化しています...
					</p>

					{/* データ読み込み状況 */}
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<div className="flex items-center space-x-3">
								<FaSpinner className="w-4 h-4 text-primary animate-spin" />
								<span className="text-sm text-foreground">
									ユーザーデータを読み込み中
								</span>
							</div>
							<div className="text-xs text-muted-foreground">85%</div>
						</div>

						<div className="flex items-center justify-between">
							<div className="flex items-center space-x-3">
								<FaDatabase className="w-4 h-4 text-blue-600" />
								<span className="text-sm text-foreground">
									アプリケーションデータを同期中
								</span>
							</div>
							<div className="text-xs text-muted-foreground">92%</div>
						</div>

						<div className="flex items-center justify-between">
							<div className="flex items-center space-x-3">
								<div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
								<span className="text-sm text-muted-foreground">
									UI コンポーネントを初期化中
								</span>
							</div>
							<div className="text-xs text-muted-foreground">待機中</div>
						</div>
					</div>

					{/* プログレスバー */}
					<div className="space-y-2">
						<div className="flex justify-between text-sm">
							<span className="text-muted-foreground">全体の進捗</span>
							<span className="text-foreground font-medium">89%</span>
						</div>
						<div className="w-full bg-muted rounded-full h-2">
							<div
								className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-300"
								style={{ width: "89%" }}
							/>
						</div>
					</div>

					{/* パフォーマンス情報 */}
					<div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
						<div className="flex items-center space-x-2 mb-2">
							<div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
							<span className="text-sm font-medium text-blue-900 dark:text-blue-100">
								システム情報
							</span>
						</div>
						<div className="text-xs text-blue-800 dark:text-blue-200 space-y-1">
							<div>• 高速表示のため最適化を実行中</div>
							<div>• セキュリティチェック完了</div>
							<div>• リアルタイムデータ接続を確立中</div>
						</div>
					</div>

					<div className="text-center">
						<p className="text-xs text-muted-foreground">
							初回ロードは少し時間がかかる場合があります
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
