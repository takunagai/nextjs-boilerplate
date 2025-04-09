import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { auth } from "@/lib/auth";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

// メタデータ
export const metadata: Metadata = {
	title: "ダッシュボード",
	description: "ユーザーダッシュボード",
};

/**
 * ダッシュボードページ
 * 認証済みユーザーのみアクセス可能
 */
export default async function DashboardPage() {
	// サーバーサイドで認証状態を確認
	const session = await auth();

	// 未認証の場合はログインページにリダイレクト
	if (!session) {
		redirect("/auth/login?callbackUrl=/dashboard");
	}

	// ユーザー情報を取得
	const user = session.user;

	return (
		<Container className="mt-16">
			<h1 className="text-3xl font-bold mb-6">ダッシュボード</h1>

			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{/* ユーザー情報カード */}
				<Card>
					<CardHeader>
						<CardTitle>ユーザー情報</CardTitle>
						<CardDescription>アカウント情報の概要</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-2">
							<div className="flex justify-between">
								<span className="text-muted-foreground">名前:</span>
								<span className="font-medium">{user?.name || "未設定"}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-muted-foreground">メールアドレス:</span>
								<span className="font-medium">{user?.email}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-muted-foreground">権限:</span>
								<span className="font-medium">
									{user?.role || "一般ユーザー"}
								</span>
							</div>
						</div>
					</CardContent>
					<CardFooter>
						<Button asChild variant="outline" className="w-full">
							<Link href="/profile">プロフィール編集</Link>
						</Button>
					</CardFooter>
				</Card>

				{/* アクティビティカード */}
				<Card>
					<CardHeader>
						<CardTitle>最近のアクティビティ</CardTitle>
						<CardDescription>アカウントの活動履歴</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="border-l-2 border-primary pl-4 py-2">
								<p className="text-sm text-muted-foreground">今日, 12:30</p>
								<p>ログイン成功</p>
							</div>
							<div className="border-l-2 border-muted pl-4 py-2">
								<p className="text-sm text-muted-foreground">昨日, 15:45</p>
								<p>プロフィール更新</p>
							</div>
							<div className="border-l-2 border-muted pl-4 py-2">
								<p className="text-sm text-muted-foreground">2日前, 10:15</p>
								<p>ログイン成功</p>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* 設定カード */}
				<Card>
					<CardHeader>
						<CardTitle>アカウント設定</CardTitle>
						<CardDescription>設定オプション</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<Button asChild variant="outline" className="w-full justify-start">
							<Link href="/settings/profile">プロフィール設定</Link>
						</Button>
						<Button asChild variant="outline" className="w-full justify-start">
							<Link href="/settings/security">セキュリティ設定</Link>
						</Button>
						<Button asChild variant="outline" className="w-full justify-start">
							<Link href="/settings/notifications">通知設定</Link>
						</Button>
					</CardContent>
				</Card>
			</div>
		</Container>
	);
}
