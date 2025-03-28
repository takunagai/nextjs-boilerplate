import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { generateMetadata } from "@/components/seo";
import { WebsiteJsonLd } from "@/components/seo";
import { META } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = generateMetadata({
  title: "サンプル一覧",
  description: "Next.jsボイラープレートのサンプル集です。フォーム、データ取得、UIコンポーネントなどの実装例を紹介しています。",
  keywords: ["サンプル", "例", "フォーム", "データ取得", "UIコンポーネント"],
  canonical: "/examples",
});

export default function ExamplesPage() {
  const examples = [
    {
      title: "フォームサンプル",
      description: "react-hook-formとzodを使用した入力フォームのサンプルです。",
      href: "/examples/form",
    },
    {
      title: "データ取得サンプル",
      description: "Next.jsのデータ取得パターンを示すサンプルです。",
      href: "/examples/data-fetching",
    },
    {
      title: "UIコンポーネント",
      description: "shadcn/uiコンポーネントのサンプル集です。",
      href: "/examples/ui-components",
    },
  ];

  return (
    <>
      <WebsiteJsonLd
        name={`サンプル一覧 | ${META.DEFAULT_TITLE}`}
        description="Next.jsボイラープレートのサンプル集です。フォーム、データ取得、UIコンポーネントなどの実装例を紹介しています。"
        url={`${META.SITE_URL}/examples`}
      />
      <div>
        <Breadcrumb
          items={[
            { label: "ホーム", href: "/" },
            { label: "サンプル一覧", href: "/examples", isCurrent: true },
          ]}
        />
        <h1 className="mb-8 text-3xl font-bold">サンプル一覧</h1>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {examples.map((example) => (
            <Card key={example.href} className="flex flex-col">
              <CardHeader>
                <CardTitle>{example.title}</CardTitle>
                <CardDescription>{example.description}</CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto">
                <Button asChild>
                  <Link href={example.href}>表示する</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
