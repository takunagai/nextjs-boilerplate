'use client';

import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

/**
 * ユーザー認証メニューコンポーネント
 * ログイン状態に応じて表示を切り替える
 */
export function UserAuthMenu() {
  const { user, isLoading, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  // ログアウト処理
  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      toast.success("ログアウトしました");
      router.push("/");
      router.refresh(); // ページをリフレッシュして認証状態を更新
    } else {
      toast.error("ログアウト処理中にエラーが発生しました");
    }
  };

  // ローディング中はスケルトンUIを表示
  if (isLoading) {
    return <Skeleton className="h-10 w-10 rounded-full" />;
  }

  // ログインしていない場合はログインボタンを表示
  if (!isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link href="/auth/login">ログイン</Link>
        </Button>
        <Button size="sm" asChild>
          <Link href="/auth/register">新規登録</Link>
        </Button>
      </div>
    );
  }

  // ユーザー名の最初の文字を取得（フォールバック用）
  const userInitial = user?.name?.charAt(0) || user?.email?.charAt(0) || "U";

  // ログイン済みの場合はユーザーメニューを表示
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar>
            <AvatarImage src={user?.image || ""} />
            <AvatarFallback>{userInitial.toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name || "ユーザー"}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email || ""}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/dashboard">ダッシュボード</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/profile">プロフィール</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings">設定</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>ログアウト</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
