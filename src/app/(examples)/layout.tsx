import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `サンプル | ${SITE_NAME}`,
  description: "Next.jsボイラープレートのサンプルページです。",
};

export default function ExamplesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 rounded-lg border border-amber-200 bg-amber-50 p-4">
        <h1 className="mb-2 text-xl font-bold text-amber-800">
          サンプルページ
        </h1>
        <p className="text-amber-700">
          これは開発用のサンプルページです。本番環境では表示されますが、実際のプロジェクトでは削除または修正してください。
        </p>
      </div>
      {children}
    </div>
  );
}
