import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

// ユーザーの型定義
interface User {
	id: number;
	name: string;
	email: string;
	website: string;
	company: {
		name: string;
	};
}

// データ取得関数
async function getUsers(): Promise<User[]> {
	// 意図的に遅延を入れてローディング状態を確認できるようにする
	await new Promise((resolve) => setTimeout(resolve, 2000));

	const res = await fetch("https://jsonplaceholder.typicode.com/users");
	if (!res.ok) {
		throw new Error("ユーザーデータの取得に失敗しました");
	}
	return res.json();
}

// ユーザーリストコンポーネント
async function UserList() {
	const users = await getUsers();

	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
			{users.map((user: User) => (
				<div key={user.id} className="border rounded-md p-4">
					<h3 className="text-lg font-bold">{user.name}</h3>
					<p className="text-sm text-gray-500">{user.email}</p>
					<div className="mt-2">
						<p className="text-sm">
							<span className="font-semibold">会社:</span> {user.company.name}
						</p>
						<p className="text-sm">
							<span className="font-semibold">ウェブサイト:</span> {user.website}
						</p>
					</div>
					<div className="mt-3 text-right">
						<span className="text-xs text-gray-400">ID: {user.id}</span>
					</div>
				</div>
			))}
		</div>
	);
}

// ローディングコンポーネント
function UserListSkeleton() {
	// スケルトンアイテムの固定ID
	const skeletonIds = [
		"user-1",
		"user-2",
		"user-3",
		"user-4",
		"user-5",
		"user-6",
	];

	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
			{skeletonIds.map((id) => (
				<div key={id} className="border rounded-md p-4">
					<Skeleton className="h-6 w-3/4 mb-2" />
					<Skeleton className="h-4 w-1/2 mb-4" />
					<Skeleton className="mb-2 h-4 w-full" />
					<Skeleton className="h-4 w-2/3" />
					<div className="mt-3 text-right">
						<Skeleton className="h-3 w-1/4 ml-auto" />
					</div>
				</div>
			))}
		</div>
	);
}

// エラーコンポーネント
function ErrorDisplay({ error }: { error: Error }) {
	return (
		<div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
			<h3 className="mb-2 text-lg font-semibold">エラーが発生しました</h3>
			<p>{error.message}</p>
		</div>
	);
}

// メインページコンポーネント
export default function DataFetchingPage() {
	return (
		<Container width="2xl" paddingY="xl" paddingX="lg">
			<h1 className="mb-8 text-3xl font-bold">データ取得サンプル</h1>

			<div className="mb-8">
				<h2 className="mb-4 text-xl font-semibold">
					React Suspenseを使用したデータ取得
				</h2>
				<p className="mb-6 text-gray-600">
					このサンプルでは、Next.jsのサーバーコンポーネントとReact
					Suspenseを使用して、
					データ取得中のローディング状態を処理しています。
				</p>

				<Suspense fallback={<UserListSkeleton />}>
					<UserList />
				</Suspense>
			</div>
		</Container>
	);
}
