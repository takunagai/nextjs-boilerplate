import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FaSpinner, FaRightToBracket } from "react-icons/fa6";

export default function AuthLoading() {
	return (
		<div className="min-h-screen bg-background flex items-center justify-center px-4">
			<Card className="max-w-md w-full">
				<CardHeader className="text-center space-y-4">
					<div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto">
						<FaRightToBracket className="w-8 h-8 text-blue-600 dark:text-blue-400" />
					</div>
				</CardHeader>

				<CardContent className="space-y-6">
					<div className="text-center space-y-3">
						<h2 className="text-xl font-semibold text-foreground">
							認証処理中...
						</h2>
						<p className="text-muted-foreground">
							安全にログイン処理を実行しています。
						</p>
					</div>

					{/* 認証処理中のローディング表示 */}
					<div className="flex items-center justify-center space-x-3">
						<FaSpinner className="w-5 h-5 text-primary animate-spin" />
						<span className="text-sm text-muted-foreground">
							認証情報を確認中
						</span>
					</div>

					{/* 認証プロセス表示 */}
					<div className="space-y-3">
						<div className="flex items-center space-x-3">
							<div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
							<span className="text-sm text-muted-foreground">
								セキュリティチェック完了
							</span>
						</div>
						<div className="flex items-center space-x-3">
							<div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
							<span className="text-sm text-muted-foreground">
								認証情報を処理中
							</span>
						</div>
						<div className="flex items-center space-x-3">
							<div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
							<span className="text-sm text-muted-foreground">
								リダイレクト準備中
							</span>
						</div>
					</div>

					<div className="text-center pt-4 border-t border-border">
						<p className="text-xs text-muted-foreground">
							処理に時間がかかる場合は、ページを再読み込みしてください。
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
