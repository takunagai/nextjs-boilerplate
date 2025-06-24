"use client";

import { useRouter } from "next/navigation";
import {
	FaChartLine,
	FaGear,
	FaRightFromBracket,
	FaShieldHalved,
	FaUser,
	FaUsers,
} from "react-icons/fa6";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";

/**
 * ユーザー認証メニューコンポーネント
 * ユーザーの認証状態に応じて適切なメニューを表示
 */
export function UserAuthMenu() {
	const { user, isAuthenticated, isLoading, logout } = useAuth();
	const router = useRouter();

	// ユーザーがログインしていない場合
	if (!isAuthenticated && !isLoading) {
		return (
			<Button
				variant="ghost"
				onClick={() => router.push("/login")}
				className="gap-2"
			>
				<FaUser className="h-4 w-4" />
				<span>ログイン</span>
			</Button>
		);
	}

	// 読み込み中の場合はスケルトンローディングを表示
	if (isLoading) {
		return (
			<div className="flex items-center gap-2">
				<Skeleton className="h-8 w-8 rounded-full" />
				<Skeleton className="h-4 w-24" />
			</div>
		);
	}

	// ユーザー名の頭文字を取得（アバターのフォールバック用）
	const getInitials = () => {
		if (!user?.name) return "U";
		return user.name
			.split(" ")
			.map((part) => part.charAt(0))
			.join("")
			.toUpperCase();
	};

	// 管理者かどうかを確認
	const isAdmin = user?.role === "admin";

	const handleLogout = async () => {
		const result = await logout();
		if (result.success) {
			router.push("/"); // ホームページにリダイレクト
			router.refresh(); // ページを更新して状態を反映
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="relative h-8 w-8 rounded-full">
					<Avatar className="h-8 w-8">
						<AvatarImage
							src={user?.image || ""}
							alt={user?.name || "ユーザー"}
						/>
						<AvatarFallback>{getInitials()}</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end" forceMount>
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col space-y-1">
						<p className="text-sm font-medium leading-none">
							{user?.name || "ユーザー"}
						</p>
						<p className="text-xs leading-none text-muted-foreground">
							{user?.email || ""}
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem onClick={() => router.push("/profile")}>
						<FaUser className="mr-2 h-4 w-4" />
						<span>プロフィール</span>
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => router.push("/dashboard")}>
						<FaChartLine className="mr-2 h-4 w-4" />
						<span>ダッシュボード</span>
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => router.push("/settings")}>
						<FaGear className="mr-2 h-4 w-4" />
						<span>設定</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>

				{/* 管理者向けメニュー */}
				{isAdmin && (
					<>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem onClick={() => router.push("/admin")}>
								<FaShieldHalved className="mr-2 h-4 w-4" />
								<span>管理画面</span>
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => router.push("/admin/users")}>
								<FaUsers className="mr-2 h-4 w-4" />
								<span>ユーザー管理</span>
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</>
				)}

				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={handleLogout}
					className="text-destructive focus:bg-destructive focus:text-destructive-foreground"
				>
					<FaRightFromBracket className="mr-2 h-4 w-4" />
					<span>ログアウト</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
