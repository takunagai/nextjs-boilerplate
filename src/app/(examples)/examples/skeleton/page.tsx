import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonPage() {
  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-12">
      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-primary">Skeleton コンポーネント</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          コンテンツ読み込み中に表示するプレースホルダーとして使用できるスケルトンコンポーネントです。
        </p>
      </header>

      <section>
        <h2 className="text-3xl font-semibold mb-6 border-b pb-2">基本的な使い方</h2>
        <div className="grid md:grid-cols-2 gap-6 p-4 bg-background rounded-lg shadow">
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground mb-2">テキスト行のプレースホルダー</p>
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-5/6" />
          </div>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground mb-2">アバターと詳細情報</p>
            <div className="flex items-center space-x-3">
              <Skeleton className="h-12 w-12 rounded-full" shape="rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-3/5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-6 border-b pb-2">形状とサイズのバリエーション</h2>
        <div className="p-4 bg-background rounded-lg shadow">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">長方形</p>
              <Skeleton className="h-8 w-full" shape="rectangle" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">角丸長方形</p>
              <Skeleton className="h-8 w-full" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">円形</p>
              <Skeleton className="h-12 w-12" shape="rounded-full" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">カスタムサイズ</p>
              <Skeleton className="h-20 w-20" />
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-6 border-b pb-2">カード読み込み中の例</h2>
        <div className="p-4 bg-background rounded-lg shadow">
          <div className="grid md:grid-cols-3 gap-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="border rounded-lg p-4 space-y-3">
                <Skeleton className="h-40 w-full rounded-md" />
                <Skeleton className="h-5 w-4/5" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <div className="flex justify-between pt-2">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-6 border-b pb-2">実装方法</h2>
        <div className="p-4 bg-background rounded-lg shadow">
          <pre className="p-4 rounded bg-muted overflow-x-auto">
            <code>{`import { Skeleton } from "@/components/ui/skeleton";

// 基本的な使用法
<Skeleton className="h-4 w-full" />

// 円形（アバター用）
<Skeleton className="h-12 w-12 rounded-full" />
// または
<Skeleton className="h-12 w-12" shape="rounded-full" />

// 長方形（ボタン用）
<Skeleton className="h-10 w-24" shape="rectangle" />

// カスタムサイズと形状
<Skeleton className="h-[200px] w-[300px] rounded-xl" />
`}</code>
          </pre>
        </div>
      </section>
    </div>
  );
}
