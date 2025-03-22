import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

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
    <div>
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
  );
}
