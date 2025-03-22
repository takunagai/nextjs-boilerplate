import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: `サンプル | ${SITE_NAME}`,
  description: "Next.jsボイラープレートのサンプルページです。",
};

export default function ExamplesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 環境変数に基づいてサンプルページを表示/非表示
  // NEXT_PUBLIC_SHOW_EXAMPLES=false の場合は404を表示
  const showExamples = process.env.NEXT_PUBLIC_SHOW_EXAMPLES !== "false";
  
  // サンプルページを表示しない設定の場合は404ページを表示
  if (!showExamples) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 rounded-lg border border-amber-200 bg-amber-50 p-4">
        <h1 className="mb-2 text-xl font-bold text-amber-800">
          サンプルページ
        </h1>
        <p className="text-amber-700">
          これは開発用のサンプルページです。本番環境では表示されますが、実際のプロジェクトでは削除または修正してください。
        </p>
        <p className="mt-2 text-sm text-amber-600">
          <code>NEXT_PUBLIC_SHOW_EXAMPLES=false</code> を環境変数に設定することで、このページを非表示にできます。
        </p>
      </div>
      {children}
    </div>
  );
}
