import { Card, CardContent } from "@/components/ui/card";
import { FaSpinner } from "react-icons/fa6";

export default function RootLoading() {
	return (
		<div className="min-h-screen bg-background flex items-center justify-center px-4">
			<Card className="max-w-md w-full">
				<CardContent className="p-8 text-center space-y-6">
					{/* ローディングアイコン */}
					<div className="flex justify-center">
						<div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
							<FaSpinner className="w-8 h-8 text-primary animate-spin" />
						</div>
					</div>

					{/* ローディングメッセージ */}
					<div className="space-y-3">
						<h2 className="text-xl font-semibold text-foreground">
							読み込み中...
						</h2>
						<p className="text-muted-foreground">
							ページを準備しています。しばらくお待ちください。
						</p>
					</div>

					{/* ローディングバー */}
					<div className="w-full bg-muted rounded-full h-2 overflow-hidden">
						<div className="bg-gradient-to-r from-primary/50 to-primary h-2 rounded-full animate-pulse" />
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
