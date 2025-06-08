import { Spinner } from "@/components/ui/spinner";

export default function SpinnerPage() {
  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-12">
      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-primary">Spinner コンポーネント</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          読み込み中の状態を表示するためのスピナーコンポーネントです。
        </p>
      </header>

      <section>
        <h2 className="text-3xl font-semibold mb-6 border-b pb-2">サイズバリエーション</h2>
        <div className="flex items-center flex-wrap gap-6 p-4 bg-background rounded-lg shadow">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Small (sm)</p>
            <Spinner size="sm" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Medium (md)</p>
            <Spinner size="md" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Large (lg)</p>
            <Spinner size="lg" />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-6 border-b pb-2">カラーバリエーション</h2>
        <div className="flex items-center flex-wrap gap-6 p-4 bg-background rounded-lg shadow">
          <div>
            <p className="text-sm text-muted-foreground mb-2">デフォルトカラー (primary)</p>
            <Spinner size="md" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Secondary Color</p>
            <Spinner size="md" color="secondary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Destructive Color</p>
            <Spinner size="md" color="destructive" />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-6 border-b pb-2">使用例</h2>
        <div className="p-4 bg-background rounded-lg shadow space-y-4">
          <h3 className="text-xl font-medium">ボタン内での使用</h3>
          <div className="flex items-center space-x-2 h-10 px-4 py-2 bg-primary text-primary-foreground rounded-md">
            <Spinner size="sm" color="inherit" />
            <span>読み込み中...</span>
          </div>
          
          <h3 className="text-xl font-medium mt-6">コンテンツ読み込み中表示</h3>
          <div className="flex justify-center items-center h-32 border rounded-md">
            <div className="flex flex-col items-center gap-2">
              <Spinner size="lg" />
              <p className="text-sm text-muted-foreground">コンテンツを読み込み中です</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-6 border-b pb-2">実装方法</h2>
        <div className="p-4 bg-background rounded-lg shadow">
          <pre className="p-4 rounded bg-muted overflow-x-auto">
            <code>{`import { Spinner } from "@/components/ui/spinner";

// 基本的な使用法
<Spinner />

// サイズの指定
<Spinner size="sm" />
<Spinner size="md" /> {/* デフォルト */}
<Spinner size="lg" />

// カラーの指定
<Spinner color="primary" /> {/* デフォルト */}
<Spinner color="secondary" />
<Spinner color="destructive" />
`}</code>
          </pre>
        </div>
      </section>
    </div>
  );
}
