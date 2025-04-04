# Next.js ボイラープレート

![Next.js](https://img.shields.io/badge/Next.js-15.2.3-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0.15-38B2AC?style=for-the-badge&logo=tailwind-css)

## 概要

このプロジェクトは、モダンなウェブアプリケーション/サイト開発のためのNext.jsボイラープレートです。TypeScript、Tailwind CSS、shadcn/uiなどの最新技術を組み合わせ、開発の効率化と品質向上を実現します。

## 対応ブラウザ

### デスクトップブラウザ

- Chrome: 111以降
- Edge: Chromiumベースのバージョン
- Safari: 16.4以降
- Firefox: 128以降

### モバイルブラウザ

- Safari: iOS 16以降
- Chrome: Android 13以降

## AI開発サポート

このプロジェクトは、[Windsurf IDE](https://codeium.com/windsurf) 用の`.windsurfrules`ファイルを含んでいます。このファイルは[kinopeee/windsurfrules](https://github.com/kinopeee/windsurfrules)をベースに、AIエージェント/アシスタントがプロジェクト構造、技術スタック、コード規約を正確に理解できるよう最適化されています。これにより、一貫性のある高品質なコード生成と効率的な開発サポートが可能になります。

## デモ

デモサイト: [https://nextjs-boilerplate-japanese.vercel.app](https://nextjs-boilerplate-japanese.vercel.app)

## 機能

### UI/UX

- **レスポンシブデザイン** - Tailwind CSSによるモバイルファーストアプローチ
- **ダークモード対応** - Tailwind CSS v4のネイティブダークモード機能
  - ライトモード/ダークモードの2つの切替モード
  - ヘッダーのアイコンクリックで切替
  - ユーザー設定をlocalStorageに保存し、次回訪問時に復元
  - フラッシュ防止機能搭載（遷移アニメーションとトレードオフ）
  - テーマ機能のON/OFF切替オプション
- **レスポンシブレイアウト** - CVAを活用したContainerコンポーネント
  - 画面サイズに応じた最適なコンテンツ幅の自動調整
  - サイズバリエーション（xs, sm, md, lg, xl, 2xl, full）
  - 方向別パディング設定（paddingX, paddingY）
  - 位置とz-indexの制御オプション
- **アニメーション** - Framer Motionによる洗練されたモーション
- **アクセシビリティ対応** - WAI-ARIAガイドラインに準拠
- **UIコンポーネント** - shadcn/uiによる美しく再利用可能なコンポーネント

### SEO最適化

- **メタデータ管理** - Next.js Metadata APIによる動的SEOメタタグ生成
- **構造化データ** - JSON-LD形式のリッチスニペット対応（ウェブサイト、組織、記事など）
- **パンくずリスト** - ユーザビリティ向上とSEO対応の階層ナビゲーション
- **サイトマップ自動生成** - 検索エンジンのクロール効率化
- **robots.txt** - クローラー制御とインデックス最適化
- **正規URL設定** - 重複コンテンツ問題の防止

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

- **Node.js** - 開発環境、バックエンド
- **TypeScript** - 型付きJavaScript
- **Next.js** - Reactフレームワーク
- **React** - UIライブラリ

### UI/スタイリング

- **Tailwind CSS** - ユーティリティファーストCSS
- **tw-animate-css** - アニメーション
- **shadcn/ui** - 再利用可能なUIコンポーネント
- **framer-motion** - アニメーション
- **sonner** - トースト通知
- **react-icons** - アイコンセット

### 状態管理/ユーティリティ

- **immer** - 不変状態管理
- **date-fns** - 日付操作
- **class-variance-authority** - コンポーネントバリエーション
- **clsx** - 条件付きクラス名
- **tailwind-merge** - Tailwindクラス最適化
- **usehooks-ts** - 有用なReactフックコレクション

### フォーム/バリデーション

- **react-hook-form** - フォーム状態管理
- **zod** - スキーマバリデーション
- **@hookform/resolvers** - バリデーション連携

### バックエンド

- (**PostgreSQL** - データベース) ※後で追加予定
- (**Drizzle ORM** - ORM) ※後で追加予定

### 開発ツール

- **Biome** - リンター/フォーマッター

### テスト

- **Vitest** - ユニットテスト
- **Playwright** - E2Eテスト
- (**Testing Library** - DOMテスト) ※後で追加予定
- **jsdom** - ブラウザ環境シミュレーション

## セットアップ手順

### 前提条件

- Node.js 23.x以上
- npm 10.x以上

### インストール

1. リポジトリをクローンします

```bash
git clone git@github.com:takunagai/nextjs-boilerplate.git
cd nextjs-boilerplate
```

2. 依存関係をインストールします

```bash
npm install
```

3. 開発サーバーを起動します

```bash
npm run dev
```

4. ブラウザで [http://localhost:3000](http://localhost:3000) を開いて確認します

## 環境変数の設定

`.env.example` ファイルを `.env.local` にコピー。

```bash
cp .env.example .env.local
```

必要な環境変数を設定します(不要な環境変数は削除してください)。

```bash
# アプリケーション設定
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="Next.js Boilerplate"
NEXT_PUBLIC_SITE_NAME="Next.js Boilerplate Sample Site"
```

## 使用方法

### モード (テーマ) の切り替え設定

- 有効/無効のトグルとデフォルトモードは `constants.ts` で定義
- 2つのモード(ライト/ダーク)を選択可能
- 設定は localStorage に保存され、次回訪問時に自動適用

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

### Containerコンポーネントの使用

レスポンシブなレイアウトを簡単に実装するためのContainerコンポーネント：

```tsx
import { Container } from "@/components/ui/container";

export default function MyPage() {
  return (
    // 基本的な使用方法
    <Container size="md" paddingY="lg" paddingX="2xl">
      <h1>コンテンツタイトル</h1>
      <p>コンテンツの説明文...</p>
    </Container>
    
    // 位置指定とz-indexの使用例
    <Container size="2xl" paddingY="xl" paddingX="lg" position="relative" zIndex="high">
      <div>複雑なレイアウト要素...</div>
    </Container>

    // セマンティックなHTML要素として利用 (デフォルトはdiv)
    <Container as="section" size="lg" paddingY="xl" paddingX="md">
      <h2>セクションタイトル</h2>
      <p>セクションコンテンツ...</p>
    </Container>

    // ヘッダーの実装例
    <Container as="header" size="full" paddingY="md" paddingX="lg" position="relative" zIndex="high">
      <nav>ナビゲーションメニュー...</nav>
    </Container>
  );
}
```

### 利用可能なパラメータ

サイズバリエーション：

- `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `full` - コンテナの最大幅を制御

パディングバリエーション（縦・横個別に設定可能）：

- `none`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl`

位置とzIndexオプション：

- `position`: `default`, `relative`
- `zIndex`: `none`, `base`, `high`, `highest`

使用可能なHTML要素（`as`プロパティ）：

- `div` (デフォルト), `section`, `header`, `footer`, `main`, `article`, `aside`, `figure`, `figcaption`, `summary`, `nav`

## ディレクトリ構造

```text
nextjs-boilerplate/
├── public/                  # 静的アセット
│   ├── dummy-images/        # ダミー画像
│   ├── (fonts)/             # フォントファイル
│   └── (images)/            # 画像ファイル
├── reference/
│   ├── docs/                # ドキュメント
│   └── samples/             # サンプルコード
├── src/
│   ├── app/                 # Next.jsのページルーティング
│   │   ├── (auth)/          # 認証関連ページ
│   │   ├── (dashboard)/     # ダッシュボード関連ページ
│   │   ├── (api)/           # APIエンドポイント
│   │   └── globals.css      # グローバルスタイル
│   ├── components/          # 再利用可能なコンポーネント
│   │   ├── layout/          # レイアウトコンポーネント(ヘッダー、フッター etc.)
│   │   ├── theme/           # テーマ(モード)コンポーネント
│   │   └── ui/              # UIコンポーネント(shadcn/uiもここに保存)
│   ├── lib/                 # ユーティリティ関数
│   │   ├── validation/      # バリデーションスキーマ
│   │   ├── (api)/           # API関連
│   │   ├── (db)/            # データベース関連
│   │   ├── constants.ts     # 定数
│   │   └── utils.ts         # 汎用ユーティリティ
│   └── hooks/               # カスタムフック
├── tests/                   # テストファイル
│   ├── components/          # コンポーネントテスト
│   ├── e2e/                 # Playwright E2Eテスト
│   └── unit/                # Vitestユニットテスト
├── .env.example             # 環境変数の例
├── .gitignore               # Gitの除外設定
├── biome.json               # Biome設定
├── components.json          # shadcn/uiコンポーネント設定
├── next.config.js           # Next.js設定
├── package.json             # 依存関係と設定
├── playwright.config.ts     # Playwright設定
├── postcss.config.mjs       # PostCSS設定
├── setupTests.ts            # テスト環境のグローバル設定
├── tailwind.config.ts       # Tailwind CSS設定
├── tsconfig.json            # TypeScript設定
└── vite.config.ts           # Vite設定
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

### E2Eテストの実行

```bash
# すべてのブラウザでE2Eテストを実行
npm run test:e2e

# UIモードでE2Eテストを実行（ビジュアルデバッグ用）
npm run test:e2e:ui

# Chromiumブラウザのみでテスト実行
npm run test:e2e:chromium

# デバッグモードでテスト実行
npm run test:e2e:debug

# テスト結果レポートの表示
npm run test:e2e:report
```

## デプロイ

### Vercelへのデプロイ

このプロジェクトはVercelへの簡単なデプロイをサポートしています。  
~~詳細は [デプロイガイド](./docs/deployment.md) を参照してください。~~

[![Vercelにデプロイ](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fnextjs-boilerplate)

### その他のプラットフォーム

- [Netlify](https://www.netlify.com/)
- [Cloudflare Pages](https://pages.cloudflare.com/)
- [AWS Amplify](https://aws.amazon.com/amplify/)
- [Google Cloud Run](https://cloud.google.com/run)

## 貢献方法

コントリビュートする場合は、以下の手順を参考にしてください。  
※ウェブアプリ/ウェブサイト共通でベースとなるボイラープレートです。  
　ウェブアプリ/ウェブサイトそれぞれに特化したものは別リポジトリで管理する予定です。

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
