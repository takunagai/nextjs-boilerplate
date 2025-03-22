# Next.js ボイラープレート

![Next.js](https://img.shields.io/badge/Next.js-15.2.3-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0.15-38B2AC?style=for-the-badge&logo=tailwind-css)

## 概要

このプロジェクトは、モダンなウェブアプリケーション/サイト開発のためのNext.jsボイラープレートです。TypeScript、Tailwind CSS、shadcn/uiなどの最新技術を組み合わせ、開発の効率化と品質向上を実現します。

## デモ

デモサイト: [https://nextjs-boilerplate.example.com](https://nextjs-boilerplate.example.com)

![スクリーンショット](./public/images/screenshot.png)

## 機能

### UI/UX
- **レスポンシブデザイン** - Tailwind CSSによるモバイルファーストアプローチ
- **ダークモード対応** - Next.js Themesによるシームレスなテーマ切り替え
- **アニメーション** - Framer Motionによる洗練されたモーション
- **アクセシビリティ対応** - WAI-ARIAガイドラインに準拠
- **UIコンポーネント** - shadcn/uiによる美しく再利用可能なコンポーネント

### 開発体験
- **型安全性** - TypeScriptによる堅牢なコード
- **高速開発** - Next.js App Routerとサーバーコンポーネント
- **効率的な状態管理** - Immerによる不変性を維持した状態更新
- **フォームハンドリング** - React Hook FormとZodによる型安全なバリデーション
- **コード品質** - Biomeによるリンティングとフォーマット

### 事前構築済み
- **ページテンプレート** - ホーム、説明、問い合わせ、プライバシーポリシー
- **レイアウトコンポーネント** - ヘッダー、フッター、ナビゲーション
- **ユーティリティ** - 定数管理、日付操作、クラス名ユーティリティ
- **テスト環境** - Vitestによる高速なユニットテスト

## 技術スタック

### コア技術
- **Next.js** (15.2.3) - Reactフレームワーク
- **React** (19.0.0) - UIライブラリ
- **TypeScript** (5) - 型付きJavaScript

### UI/スタイリング
- **Tailwind CSS** (4.0.15) - ユーティリティファーストCSS
- **shadcn/ui** - 再利用可能なUIコンポーネント
- **next-themes** - テーマ切り替え
- **framer-motion** - アニメーション
- **sonner** - トースト通知
- **lucide-react** - アイコンセット

### 状態管理/ユーティリティ
- **immer** - 不変状態管理
- **date-fns** - 日付操作
- **class-variance-authority** - コンポーネントバリエーション
- **clsx** - 条件付きクラス名
- **tailwind-merge** - Tailwindクラス最適化

### フォーム/バリデーション
- **react-hook-form** (7.54.2) - フォーム状態管理
- **zod** (3.24.2) - スキーマバリデーション
- **@hookform/resolvers** (4.1.3) - バリデーション連携

### テスト
- **Vitest** (1.3.1) - 高速テストフレームワーク
- **Testing Library** - DOMテスト
- **jsdom** - ブラウザ環境シミュレーション

### 開発ツール
- **Biome** (1.6.1) - リンター/フォーマッター

## セットアップ手順

### 前提条件
- Node.js 20.x以上
- npm 10.x以上

### インストール

1. リポジトリをクローンします

```bash
git clone https://github.com/yourusername/nextjs-boilerplate.git
cd nextjs-boilerplate
```

2. 依存関係をインストールします

```bash
npm install
```

3. 環境変数を設定します

```bash
cp .env.example .env.local
```

4. 開発サーバーを起動します

```bash
npm run dev
```

5. ブラウザで [http://localhost:3000](http://localhost:3000) を開いて確認します

## 環境変数の設定

`.env.example` ファイルを `.env.local` にコピーし、必要な環境変数を設定します。

```bash
# アプリケーション設定
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="Next.js Boilerplate"

# データベース接続情報（必要な場合）
DATABASE_URL="postgresql://postgres:password@localhost:5432/mydatabase"
```

詳細は [環境変数のドキュメント](./docs/environment-variables.md) を参照してください。

## 使用方法

### 新しいページの追加

App Routerを使用して新しいページを追加します：

```tsx
// src/app/new-page/page.tsx
export default function NewPage() {
  return (
    <main>
      <h1>新しいページ</h1>
    </main>
  );
}
```

### コンポーネントの使用

shadcn/uiコンポーネントを使用する例：

```tsx
import { Button } from "@/components/ui/button";

export default function MyComponent() {
  return (
    <Button variant="default">クリック</Button>
  );
}
```

## ディレクトリ構造

```
nextjs-boilerplate/
├── public/                 # 静的アセット
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── (auth)/         # 認証関連ページ
│   │   ├── api/            # APIエンドポイント
│   │   ├── layout.tsx      # ルートレイアウト
│   │   └── page.tsx        # ホームページ
│   ├── components/         # UIコンポーネント
│   │   ├── layout/         # レイアウトコンポーネント
│   │   └── ui/             # 再利用可能なUIコンポーネント
│   ├── lib/                # ユーティリティ関数
│   │   ├── constants.ts    # アプリケーション定数
│   │   └── utils.ts        # ヘルパー関数
│   └── types/              # TypeScript型定義
├── tests/                  # テストファイル
├── .env.example            # 環境変数の例
├── .gitignore              # Gitの除外設定
├── biome.json              # Biome設定
├── next.config.js          # Next.js設定
├── package.json            # 依存関係と設定
├── tailwind.config.ts      # Tailwind CSS設定
└── tsconfig.json           # TypeScript設定
```

## テスト

### ユニットテストの実行

```bash
npm test
```

### 特定のテストファイルの実行

```bash
npm test -- src/components/ui/button.test.tsx
```

### カバレッジレポートの生成

```bash
npm test -- --coverage
```

## デプロイ

### Vercelへのデプロイ

このプロジェクトはVercelへの簡単なデプロイをサポートしています。

[![Vercelにデプロイ](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fnextjs-boilerplate)

### その他のプラットフォーム

- [Netlify](https://www.netlify.com/)
- [Cloudflare Pages](https://pages.cloudflare.com/)
- [AWS Amplify](https://aws.amazon.com/amplify/)
- [Google Cloud Run](https://cloud.google.com/run)

詳細は [デプロイガイド](./docs/deployment.md) を参照してください。

## 貢献方法

1. このリポジトリをフォークします
2. 機能ブランチを作成します (`git checkout -b feature/amazing-feature`)
3. 変更をコミットします (`git commit -m '素晴らしい機能を追加'`)
4. ブランチをプッシュします (`git push origin feature/amazing-feature`)
5. プルリクエストを作成します

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。詳細は [LICENSE](./LICENSE) ファイルを参照してください。

## 謝辞

- [Next.js](https://nextjs.org/) チーム
- [Vercel](https://vercel.com/) プラットフォーム
- [shadcn/ui](https://ui.shadcn.com/) コンポーネント
- [Tailwind CSS](https://tailwindcss.com/) チーム
- すべてのオープンソースコントリビューター

---

<div align="center">

**[⬆ トップに戻る](#next-js-ボイラープレート)**

</div>
