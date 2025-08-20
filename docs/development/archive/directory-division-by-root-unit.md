---
title: "Next.jsのルートグループ機能でコード分割！アプリのパフォーマンスを向上させる方法"
date: "2025-05-14"
author: "Web開発チーム"
categories: ["Next.js", "パフォーマンス最適化", "フロントエンド開発"]
---

# Next.jsのルートグループ機能でコード分割！アプリのパフォーマンスを向上させる方法

![Next.jsのルートグループ機能](/dummy-images/tech/nextjs-route-groups.jpg)

こんにちは！今回は **Next.js App Router** の隠れた便利機能、「**ルートグループ**」について詳しく解説します。この機能を使うと、アプリケーションのパフォーマンスが劇的に向上し、コードの整理も簡単になります。特にサイト部分とアプリ部分が混在するプロジェクトで効果を発揮しますよ！

## 🤔 ルートグループって何？

ルートグループとは、Next.js App Routerで導入された機能で、**括弧 `( )` で囲んだフォルダ名**を使ってルートを論理的にグループ化できる仕組みです。

```
app/
├── (site)/        👈 サイト部分
│   ├── about/
│   ├── contact/
│   └── page.tsx
│
├── (app)/         👈 アプリ部分  
│   ├── dashboard/
│   └── profile/
│
├── (auth)/        👈 認証部分
│   ├── login/
│   └── register/
```

重要なポイントは、**これらの括弧付きフォルダ名は実際のURLには含まれない**ということ。例えば、`(site)/about/page.tsx` は単に `/about` としてアクセスできます。

## 💡 どんなメリットがあるの？

### 1. 自動的なコード分割でバンドルサイズを削減

ルートグループを使うと、Next.jsはグループごとに**自動的にコードを分割**してくれます。これにより、以下のような効果が得られます：

- **初期ロード時間の短縮**：ユーザーがトップページにアクセスする時、ダッシュボード関連のコードはダウンロードされません
- **ナビゲーション時間の短縮**：関連するページ間の移動が高速になります
- **メモリ使用量の削減**：不要なJavaScriptを読み込まないため、特にモバイル端末で効果的です

実際のプロジェクトでは、以下のような改善が見られることがあります：

| 指標 | 改善前 | 改善後 | 効果 |
|---|---|---|---|
| 初期JS読み込み量 | 350KB | 210KB | 約40%削減 |
| Time To Interactive | 3.2秒 | 1.8秒 | 約44%改善 |
| Lighthouse Performance | 75点 | 90点 | 20%向上 |

### 2. コードの論理的な分離と整理

機能ごとにコードを整理できるため、大規模プロジェクトでも**管理がしやすく**なります：

- **関心の分離**：マーケティングサイト、管理画面、認証など、機能ごとに分けられる
- **チーム作業の効率化**：各チームが担当部分に集中できる
- **共通レイアウトの分離**：グループごとに異なるレイアウトを適用できる

### 3. 拡張性の向上

アプリケーションの拡張が容易になります：

- 新機能を追加する際に既存コードへの影響を最小限に抑えられる
- 機能ごとのA/Bテストが容易
- マイクロフロントエンドのような構造に近づけられる

## 🛠️ 実装方法

### 基本的な手順

1. **ルートグループフォルダの作成**
   
   まずは論理的なグループごとにフォルダを作成します。

   ```bash
   mkdir -p src/app/(site) src/app/(app) src/app/(auth)
   ```

2. **既存のページを適切に振り分け**

   各ページを関連するグループに移動します。例えば：

   ```bash
   # サイト部分のページを移動
   mv src/app/about src/app/(site)/
   mv src/app/contact src/app/(site)/
   
   # アプリ部分のページを移動
   mv src/app/dashboard src/app/(app)/
   mv src/app/profile src/app/(app)/
   
   # 認証関連のページを移動
   mv src/app/login src/app/(auth)/
   mv src/app/register src/app/(auth)/
   ```

3. **各グループに専用のレイアウトを作成（必要に応じて）**

   各グループには独自のレイアウトを定義できます。

   例えば、サイト部分用のレイアウト：
   ```tsx
   // src/app/(site)/layout.tsx
   export default function SiteLayout({
     children,
   }: {
     children: React.ReactNode;
   }) {
     return (
       <div className="site-layout">
         <header className="site-header">
           {/* サイト用のヘッダー */}
         </header>
         <main>{children}</main>
         <footer className="site-footer">
           {/* サイト用のフッター */}
         </footer>
       </div>
     );
   }
   ```

   アプリ部分用のレイアウト：
   ```tsx
   // src/app/(app)/layout.tsx
   export default function AppLayout({
     children,
   }: {
     children: React.ReactNode;
   }) {
     return (
       <div className="app-layout">
         <div className="app-sidebar">
           {/* アプリ用のサイドバー */}
         </div>
         <main className="app-main">{children}</main>
       </div>
     );
   }
   ```

### 実装のポイント

1. **命名規則を工夫する**
   
   グループ名は何を含むかが明確になるように命名しましょう：
   - `(site)` - 公開サイト部分
   - `(app)` - ログイン後のアプリ部分
   - `(auth)` - 認証関連のページ
   - `(admin)` - 管理者向けページ

2. **不要な深さは避ける**

   無駄に階層を深くすると、コードの見通しが悪くなります。2〜3つの主要グループに絞るとシンプルになります。

3. **共通コンポーネントの配置場所**

   グループ間で共有するコンポーネントは、`src/components` など、グループの外に配置するのがおすすめです。

## 🔍 実際のコード例

### プロジェクト構造

大規模なWebアプリケーションでは、このような構造になることがあります：

```
app/
├── (marketing)/   # マーケティングサイト
│   ├── about/
│   ├── blog/
│   │   └── [slug]/
│   ├── contact/
│   ├── page.tsx    # ホームページ
│   └── layout.tsx  # マーケティング用レイアウト
│
├── (dashboard)/   # メインアプリ
│   ├── analytics/
│   ├── projects/
│   │   └── [id]/
│   ├── settings/
│   ├── page.tsx    # ダッシュボードホーム
│   └── layout.tsx  # アプリ用レイアウト
│
├── (auth)/        # 認証関連
│   ├── login/
│   ├── register/
│   ├── forgot-password/
│   └── layout.tsx  # 認証用シンプルレイアウト
│
├── api/           # APIルート(移動不要)
│   └── [...]/
│
└── layout.tsx     # 全体の共通レイアウト
```

### サイトとアプリで全く異なるUI

ルートグループを使うと、サイト部分とアプリ部分で全く異なるUIを実現できます：

**マーケティングサイト用レイアウト**：
```tsx
// app/(marketing)/layout.tsx
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="marketing-layout">
      <header className="sticky top-0 z-40 w-full border-b bg-white">
        <MarketingNavbar /> {/* ロゴ、ナビゲーション、「ログイン」ボタンを含む */}
      </header>
      <main>{children}</main>
      <MarketingFooter /> {/* 充実したフッターコンテンツ */}
    </div>
  );
}
```

**アプリ用レイアウト**：
```tsx
// app/(dashboard)/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-layout flex h-screen">
      <DashboardSidebar /> {/* サイドナビゲーション */}
      <div className="flex-1 overflow-auto">
        <DashboardHeader /> {/* ユーザーメニュー、通知などを含む */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
```

## 📊 パフォーマンス測定と改善の確認

ルートグループを実装した後は、実際にどの程度パフォーマンスが向上したかを確認しましょう。

### 測定方法

1. **Lighthouse測定**
   ```bash
   npm run build && npm run start
   # その後ブラウザでLighthouseを実行
   ```

2. **ビルド分析**
   ```bash
   # @next/bundle-analyzerを使用
   ANALYZE=true npm run build
   ```

3. **Network パネル**
   - Chrome DevToolsのNetworkパネルで、ページ遷移時にダウンロードされるJSファイルを確認

## ⚠️ 注意点

1. **過剰な分割は避ける**
   
   小規模なアプリでは、細かく分けすぎるとかえってオーバーヘッドになることも。

2. **初期の設計で導入するのがベスト**
   
   既存の大規模プロジェクトに後から導入する場合は、段階的に進めましょう。

3. **相対パスでのインポートに注意**
   
   グループ間で相対パスを使う場合は混乱を招くことがあるため、`@/components/...`のような絶対パスを使うのがおすすめです。

## 🚀 まとめ

Next.jsのルートグループ機能は、シンプルながらも強力なツールです。特に以下のような場合に効果を発揮します：

- サイト部分とアプリ部分が混在するプロジェクト
- 機能ごとに異なるレイアウトが必要な場合
- 初期ロード時間を短縮したい場合

ぜひ自分のプロジェクトに取り入れて、パフォーマンスとコード品質の向上を実感してみてください！

## 📚 参考資料

- [Next.js公式ドキュメント - Route Groups](https://nextjs.org/docs/app/building-your-application/routing/route-groups)
- [Next.js公式ドキュメント - Layouts and Templates](https://nextjs.org/docs/app/building-your-application/routing/layouts-and-templates)
- [Next.js公式ドキュメント - Code Splitting](https://nextjs.org/docs/app/building-your-application/optimizing/code-splitting)

---

この記事が役立ったら、ぜひ他の開発者にもシェアしてください！質問やフィードバックがあれば、コメント欄でお待ちしています。

Happy coding! 🚀
