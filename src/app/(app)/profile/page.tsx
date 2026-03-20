/**
 * プロフィール編集ページ
 *
 * Server First原則に従った実装：
 * - Server Componentでデータを取得
 * - 認証が必要なため(app)グループに配置
 * - WCAG 2.1 AA準拠のアクセシビリティ
 */

import Image from "next/image";
import { redirect } from "next/navigation";
import { getProfile } from "@/app/actions/profile";
import { ProfileDangerZone } from "@/components/profile/profile-danger-zone";
import { ProfileEditForm } from "@/components/profile/profile-edit-form";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getSession } from "@/lib/auth/session";

/**
 * プロフィール編集ページのメタデータ
 */
export const metadata = {
	title: "プロフィール編集",
	description: "あなたのプロフィール情報を編集・管理できます",
};

/**
 * プロフィール編集ページ
 */
export default async function ProfilePage() {
	// 認証チェック（サーバーサイド）
	const session = await getSession();
	if (!session?.user) {
		redirect("/login");
	}

	// プロフィール情報を取得
	const profileResult = await getProfile();

	// エラーハンドリング
	if (!profileResult.success) {
		return (
			<div className="container mx-auto px-4 py-8">
				<div
					role="alert"
					className="p-4 rounded-md bg-destructive/10 border border-destructive/20 text-destructive"
					aria-live="polite"
				>
					<h1 className="text-lg font-semibold mb-2">エラーが発生しました</h1>
					<p>
						プロフィール情報の取得に失敗しました:{" "}
						{typeof profileResult.error === "string"
							? profileResult.error
							: "システムエラーが発生しました"}
					</p>
				</div>
			</div>
		);
	}

	const profile = profileResult.data?.profile;
	if (!profile) {
		return (
			<div className="container mx-auto px-4 py-8">
				<div
					role="alert"
					className="p-4 rounded-md bg-destructive/10 border border-destructive/20 text-destructive"
				>
					<h1 className="text-lg font-semibold mb-2">
						プロフィールが見つかりません
					</h1>
					<p>プロフィール情報が見つかりませんでした。</p>
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8 max-w-4xl">
			{/* ページヘッダー */}
			<header className="mb-8">
				<h1 className="text-3xl font-bold tracking-tight">プロフィール編集</h1>
				<p className="text-muted-foreground mt-2">
					あなたのプロフィール情報を編集・管理できます
				</p>
			</header>

			<main className="space-y-8">
				{/* 現在のプロフィール概要 */}
				<Card>
					<CardHeader>
						<CardTitle>現在のプロフィール</CardTitle>
						<CardDescription>
							あなたの現在のプロフィール情報の概要です
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex items-center gap-4">
							{/* プロフィール画像 */}
							<div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary border-2 border-muted overflow-hidden">
								{profile.image ? (
									<Image
										src={profile.image}
										alt={`${profile.name}のプロフィール画像`}
										width={64}
										height={64}
										className="h-full w-full object-cover"
									/>
								) : (
									<span className="text-xl font-semibold">
										{profile.name?.[0] || "U"}
									</span>
								)}
							</div>

							{/* 基本情報 */}
							<div className="space-y-1">
								<h2 className="text-lg font-semibold">
									{profile.displayName || profile.name}
								</h2>
								<p className="text-sm text-muted-foreground">{profile.email}</p>
								{profile.bio && <p className="text-sm">{profile.bio}</p>}
								{profile.location && (
									<p className="text-xs text-muted-foreground">
										📍 {profile.location}
									</p>
								)}
							</div>
						</div>
					</CardContent>
				</Card>

				<Separator />

				{/* プロフィール編集フォーム */}
				<section aria-labelledby="edit-profile-heading">
					<h2 id="edit-profile-heading" className="sr-only">
						プロフィール編集フォーム
					</h2>
					<ProfileEditForm initialProfile={profile} />
				</section>

				<Separator />

				{/* 危険操作ゾーン */}
				<section aria-labelledby="danger-zone-heading">
					<h2 id="danger-zone-heading" className="sr-only">
						危険操作ゾーン
					</h2>
					<ProfileDangerZone userEmail={profile.email} />
				</section>
			</main>
		</div>
	);
}
