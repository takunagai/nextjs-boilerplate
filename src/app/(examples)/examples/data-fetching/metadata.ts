import { generateMetadata } from "@/components/seo";
import type { Metadata } from "next";

export default generateMetadata({
  title: "データ取得サンプル",
  description: "Next.jsのサーバーコンポーネントとReact Suspenseを使用したデータ取得パターンのサンプルです。ローディング状態の処理方法を紹介しています。",
  keywords: ["データ取得", "React Suspense", "サーバーコンポーネント", "ローディング状態", "Next.js"],
  canonical: "/examples/data-fetching",
});
