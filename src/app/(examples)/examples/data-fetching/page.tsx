import { Suspense } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

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
        <Card key={user.id}>
          <CardHeader>
            <CardTitle>{user.name}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              <span className="font-semibold">会社:</span> {user.company.name}
            </p>
            <p className="text-sm">
              <span className="font-semibold">ウェブサイト:</span> {user.website}
            </p>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">
              ID: {user.id}
            </p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

// ローディングコンポーネント
function UserListSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={`skeleton-${i}`}>
          <CardHeader>
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="mb-2 h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </CardContent>
          <CardFooter>
            <Skeleton className="h-3 w-1/4" />
          </CardFooter>
        </Card>
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
    <div>
      <h1 className="mb-8 text-3xl font-bold">データ取得サンプル</h1>
      
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">React Suspenseを使用したデータ取得</h2>
        <p className="mb-6 text-muted-foreground">
          このサンプルでは、Next.jsのサーバーコンポーネントとReact Suspenseを使用して、
          データ取得中のローディング状態を処理しています。
        </p>
        
        <Suspense fallback={<UserListSkeleton />}>
          <UserList />
        </Suspense>
      </div>
    </div>
  );
}
