import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = {
	title: "ローディング状態サンプル",
	description: "ページ遷移やコンポーネントローディングのサンプル集",
};

// 人工的な遅延を持つコンポーネント
async function DelayedContent({
	delay = 2000,
	name = "コンテンツ",
}: {
	delay?: number;
	name?: string;
}) {
	// 人工的な遅延
	await new Promise((resolve) => setTimeout(resolve, delay));

	return (
		<div className="p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
			<h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
				{name}が読み込まれました！
			</h3>
			<p className="text-green-700 dark:text-green-300">
				{delay}ms の遅延後にこのコンテンツが表示されています。
			</p>
		</div>
	);
}

// サンプル用のローディング表示
function SampleLoading({ message = "読み込み中..." }: { message?: string }) {
	return (
		<div className="p-6 flex items-center justify-center">
			<div className="flex items-center space-x-3">
				<div className="w-6 h-6 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
				<span className="text-muted-foreground">{message}</span>
			</div>
		</div>
	);
}

export default function LoadingStatesPage() {
	return (
		<Container>
			<PageHeader
				title="ローディング状態サンプル"
				description="ページ遷移やコンポーネントローディングを体験できるサンプル集"
			/>

			<div className="space-y-8">
				{/* 1. ページ遷移ローディング */}
				<section>
					<h2 className="text-2xl font-bold mb-4">1. ページ遷移ローディング</h2>
					<div className="grid gap-4 md:grid-cols-2">
						<Card>
							<CardHeader>
								<CardTitle>通常のページ遷移</CardTitle>
								<CardDescription>
									他のサンプルページに移動してローディングを確認
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-2">
								<Button asChild variant="outline" className="w-full">
									<Link href="/examples/ui-components">
										UIコンポーネントページへ
									</Link>
								</Button>
								<Button asChild variant="outline" className="w-full">
									<Link href="/examples/form">フォームページへ</Link>
								</Button>
								<Button asChild variant="outline" className="w-full">
									<Link href="/dashboard">
										ダッシュボードページへ（認証必要）
									</Link>
								</Button>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>ミニマルローディング</CardTitle>
								<CardDescription>
									現在のローディングシステムの特徴
								</CardDescription>
							</CardHeader>
							<CardContent>
								<ul className="text-sm space-y-2 text-muted-foreground">
									<li>• CSS-onlyアニメーション</li>
									<li>• GPU最適化（transform使用）</li>
									<li>• 外部依存なし</li>
									<li>• インラインスタイルで即座にレンダリング</li>
									<li>• 全ルートで統一デザイン</li>
								</ul>
							</CardContent>
						</Card>
					</div>
				</section>

				{/* 2. Suspenseローディング */}
				<section>
					<h2 className="text-2xl font-bold mb-4">2. Suspenseローディング</h2>
					<div className="space-y-4">
						<Card>
							<CardHeader>
								<CardTitle>コンポーネント単位のローディング</CardTitle>
								<CardDescription>
									Suspenseを使用した部分的なローディング表示
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Suspense
									fallback={
										<SampleLoading message="短時間コンテンツを読み込み中..." />
									}
								>
									<DelayedContent delay={1000} name="短時間コンテンツ" />
								</Suspense>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>長時間ローディングのサンプル</CardTitle>
								<CardDescription>
									3秒間のローディングでより実際の体験に近いサンプル
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Suspense
									fallback={
										<SampleLoading message="重いコンテンツを読み込み中..." />
									}
								>
									<DelayedContent delay={3000} name="重いコンテンツ" />
								</Suspense>
							</CardContent>
						</Card>

						<div className="grid gap-4 md:grid-cols-2">
							<Card>
								<CardHeader>
									<CardTitle>並列ローディング 1</CardTitle>
								</CardHeader>
								<CardContent>
									<Suspense
										fallback={
											<SampleLoading message="データ A を読み込み中..." />
										}
									>
										<DelayedContent delay={2500} name="データ A" />
									</Suspense>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle>並列ローディング 2</CardTitle>
								</CardHeader>
								<CardContent>
									<Suspense
										fallback={
											<SampleLoading message="データ B を読み込み中..." />
										}
									>
										<DelayedContent delay={1500} name="データ B" />
									</Suspense>
								</CardContent>
							</Card>
						</div>
					</div>
				</section>

				{/* 3. ローディング実装方法 */}
				<section>
					<h2 className="text-2xl font-bold mb-4">3. 実装方法</h2>
					<Card>
						<CardHeader>
							<CardTitle>現在のローディングシステム</CardTitle>
							<CardDescription>
								軽量でパフォーマンスに最適化されたローディング実装
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
								<pre className="text-sm">
									<code>{`// src/app/loading.tsx
export default function RootLoading() {
  return (
    <div style={{
      position: "fixed",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "hsl(var(--background))",
      zIndex: 9999,
    }}>
      <style>{\`
        @keyframes loading-spin {
          to { transform: rotate(360deg); }
        }
        .loading-spinner {
          width: 48px;
          height: 48px;
          border: 2px solid transparent;
          border-top-color: hsl(var(--primary));
          border-right-color: hsl(var(--primary) / 0.5);
          border-radius: 50%;
          animation: loading-spin 0.7s infinite;
          will-change: transform;
        }
      \`}</style>
      <div className="loading-spinner" />
    </div>
  );
}`}</code>
								</pre>
							</div>
						</CardContent>
					</Card>
				</section>

				{/* ナビゲーション */}
				<div className="flex justify-between items-center pt-8 border-t">
					<Button asChild variant="outline">
						<Link href="/examples">← サンプル一覧に戻る</Link>
					</Button>
					<div className="text-sm text-muted-foreground">
						ページを再読み込みしてローディングを再確認できます
					</div>
				</div>
			</div>
		</Container>
	);
}
