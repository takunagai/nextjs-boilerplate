import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";
import { PageHeader } from "@/components/ui/page-header";

// メタデータ
export const metadata: Metadata = {
	title: "ログイン",
	description: "アカウントにログインしてサービスをご利用ください。",
};

/**
 * ログインページ
 */
export default function LoginPage() {
	return (
		<div className="container flex h-screen w-screen flex-col items-center justify-center">
			<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
				<div className="flex flex-col space-y-2 text-center">
					<PageHeader title="ログイン" />
					<p className="text-sm text-muted-foreground">
						アカウントにログインしてください
					</p>
				</div>
				<LoginForm />
			</div>
		</div>
	);
}
