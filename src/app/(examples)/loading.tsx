import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaSpinner, FaCode, FaFlask } from "react-icons/fa6";

export default function ExamplesLoading() {
	return (
		<div className="min-h-screen bg-background flex items-center justify-center px-4">
			<Card className="max-w-2xl w-full">
				<CardHeader className="text-center space-y-4">
					<div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto">
						<FaFlask className="w-10 h-10 text-purple-600 dark:text-purple-400" />
					</div>
					<CardTitle className="text-2xl">サンプルページを準備中</CardTitle>
				</CardHeader>

				<CardContent className="space-y-6">
					<p className="text-muted-foreground text-center text-lg">
						開発用のサンプルコンポーネントとサンプルデータを読み込んでいます...
					</p>

					{/* 開発環境情報 */}
					<div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
						<div className="flex items-center space-x-2 mb-3">
							<FaCode className="w-4 h-4 text-amber-600 dark:text-amber-400" />
							<span className="font-medium text-amber-900 dark:text-amber-100">
								開発環境情報
							</span>
						</div>
						<div className="text-sm text-amber-800 dark:text-amber-200 space-y-1">
							<div>
								• React 19 + Next.js 15 の最新機能をデモンストレーション
							</div>
							<div>• TypeScript + Tailwind CSS のベストプラクティス例</div>
							<div>• shadcn/ui コンポーネントの活用例</div>
							<div>• アクセシビリティ対応のサンプル実装</div>
						</div>
					</div>

					{/* ローディング進行状況 */}
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<div className="flex items-center space-x-3">
								<FaSpinner className="w-4 h-4 text-primary animate-spin" />
								<span className="text-sm text-foreground">
									サンプルコンポーネントを初期化中
								</span>
							</div>
							<div className="text-xs text-muted-foreground">95%</div>
						</div>

						<div className="flex items-center justify-between">
							<div className="flex items-center space-x-3">
								<div className="w-4 h-4 bg-green-500 rounded animate-pulse"></div>
								<span className="text-sm text-foreground">
									モックデータを生成中
								</span>
							</div>
							<div className="text-xs text-muted-foreground">100%</div>
						</div>

						<div className="flex items-center justify-between">
							<div className="flex items-center space-x-3">
								<div className="w-4 h-4 bg-yellow-500 rounded animate-pulse"></div>
								<span className="text-sm text-foreground">
									開発ツールを準備中
								</span>
							</div>
							<div className="text-xs text-muted-foreground">80%</div>
						</div>

						<div className="flex items-center justify-between">
							<div className="flex items-center space-x-3">
								<div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
								<span className="text-sm text-muted-foreground">
									デバッグ機能を有効化中
								</span>
							</div>
							<div className="text-xs text-muted-foreground">待機中</div>
						</div>
					</div>

					{/* 全体進捗 */}
					<div className="space-y-2">
						<div className="flex justify-between text-sm">
							<span className="text-muted-foreground">全体の進捗</span>
							<span className="text-foreground font-medium">94%</span>
						</div>
						<div className="w-full bg-muted rounded-full h-3">
							<div
								className="bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
								style={{ width: "94%" }}
							/>
						</div>
					</div>

					{/* コード例準備中 */}
					<div className="bg-slate-50 dark:bg-slate-900/50 border rounded-lg p-4">
						<div className="flex items-center space-x-2 mb-3">
							<FaSpinner className="w-4 h-4 text-slate-600 dark:text-slate-400 animate-spin" />
							<span className="font-medium text-slate-900 dark:text-slate-100">
								コードサンプルを準備中
							</span>
						</div>
						<div className="font-mono text-sm text-slate-700 dark:text-slate-300 space-y-1">
							<div>Loading React components...</div>
							<div>Initializing TypeScript examples...</div>
							<div>Preparing interactive demos...</div>
						</div>
					</div>

					{/* 学習リソース */}
					<div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
						<h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
							📚 学習リソース
						</h4>
						<div className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
							<div>• React 19の新機能とパフォーマンス最適化</div>
							<div>• Next.js 15 App Routerの活用方法</div>
							<div>• 型安全なフォームバリデーション</div>
							<div>• アクセシブルなUIコンポーネントの作り方</div>
						</div>
					</div>

					<div className="text-center pt-2">
						<p className="text-xs text-muted-foreground">
							💡 <strong>開発のヒント:</strong>
							サンプルページでは実際のプロジェクトで使えるコードパターンを学習できます
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
