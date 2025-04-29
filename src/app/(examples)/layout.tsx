import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { APP, FEATURES } from "@/lib/constants";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
	title: `サンプル | ${APP.NAME}`,
	description: "Next.jsボイラープレートのサンプルページです。",
};

export default function ExamplesLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	// 環境変数または定数ファイルの設定に基づいてサンプルページを表示/非表示
	// NEXT_PUBLIC_SHOW_EXAMPLES=false または FEATURES.SHOW_EXAMPLES=false の場合は404を表示
	const showExamplesByEnv = process.env.NEXT_PUBLIC_SHOW_EXAMPLES !== "false";
	const showExamples = showExamplesByEnv && FEATURES.SHOW_EXAMPLES;

	// サンプルページを表示しない設定の場合は404ページを表示
	if (!showExamples) {
		notFound();
	}

	return (
		<>
			<Container width="lg">
				<Card className="my-12 bg-amber-50">
					<CardContent className="p-4 text-sm text-destructive">
						<p>
							これは開発用のサンプルページです。本番環境では表示されますが、実際のプロジェクトでは削除または修正してください。
						</p>
						<p className="mt-2">
							src/lib/constants/app.ts の{` `}
							<code>FEATURES.SHOW_EXAMPLES = false</code>、または、環境変数{` `}
							<code>NEXT_PUBLIC_SHOW_EXAMPLES=false</code>
							{` `}
							で、このサンプルページを非表示にできます。
						</p>
					</CardContent>
				</Card>
			</Container>
			<main className="flex-grow">{children}</main>
		</>
	);
}
