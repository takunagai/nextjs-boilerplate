import { generateMetadata } from "@/components/seo";
import type { Metadata } from "next";

export default generateMetadata({
  title: "フォームサンプル",
  description: "react-hook-formとzodを使用した入力フォームのサンプルです。バリデーションやエラーハンドリングの実装例を紹介しています。",
  keywords: ["フォーム", "react-hook-form", "zod", "バリデーション", "入力フォーム"],
  canonical: "/examples/form",
});
