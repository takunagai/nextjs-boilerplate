import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
	const session = await auth();

	// ユーザーがログインしていない場合はリダイレクト
	if (!session) {
		redirect("/auth/signin");
	}

	return (
		<div>
			<h1>ダッシュボード</h1>
			<p>こんにちは、{session.user?.name}さん！</p>
			<p>
				これは保護されたページです。ログインユーザーだけが見ることができます。
			</p>
		</div>
	);
}
