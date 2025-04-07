# Next.js ボイラープレート

![Node.js](https://img.shields.io/badge/Node.js-23-blue?style=for-the-badge&logo=node.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)
![Next.js](https://img.shields.io/badge/Next.js-15.2.3-black?style=for-the-badge&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0.15-38B2AC?style=for-the-badge&logo=tailwind-css)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-1.2.5-blue?style=for-the-badge&logo=shadcn)
![Auth.js](https://img.shields.io/badge/Auth.js-1.2.5-blue?style=for-the-badge&logo=authjs)
![Biome](https://img.shields.io/badge/Biome-1.6.1-blue?style=for-the-badge&logo=biome)
![Zod](https://img.shields.io/badge/zod-3.24.2-blue?style=for-the-badge&logo=zod)
![Vitest](https://img.shields.io/badge/Vitest-1.3.1-blue?style=for-the-badge&logo=vitest)
![Playwright](https://img.shields.io/badge/Playwright-1.31.0-blue?style=for-the-badge&logo=playwright)

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

このプロジェクトは、[Windsurf IDE](https://codeium.com/windsurf) 用の`.windsurfrules`ファイルを含んでいます。このファイルは [kinopeee/windsurfrules](https://github.com/kinopeee/windsurfrules) をベースに、AIエージェント/アシスタントがプロジェクト構造、技術スタック、コード規約を正確に理解できるよう最適化されています。これにより、一貫性のある高品質なコード生成と効率的な開発サポートが可能になります。

## デモ

デモサイト: [https://nextjs-boilerplate-japanese.vercel.app](https://nextjs-boilerplate-japanese.vercel.app)

## 機能

### UI/UX

- **レスポンシブデザイン** - Tailwind CSS によるモバイルファーストアプローチ
- **ダークモード対応** - Tailwind CSS v4 のネイティブダークモード機能
  - ライトモード/ダークモードの2つの切替モード
  - ユーザー設定を localStorage に保存し、次回訪問時に復元
  - フラッシュ防止機能搭載（遷移アニメーションとトレードオフ）
  - テーマ機能のON/OFF切替オプション
- **レスポンシブレイアウト** - ビューポート幅に応じた最適なスタイル調整
  - CVA を活用した Container コンポーネント
- **アニメーション** - Framer Motion によるモーション
- **アクセシビリティ対応** - WAI-ARIA ガイドラインに準拠
- **UIコンポーネント** - shadcn/ui による再利用可能なコンポーネント

### サーバーサイドユーティリティ

- **標準化APIレスポンス** - クライアント側での一貫した処理を実現
  - 成功・エラーレスポンス形式の統一
  - エラーコード・メッセージの一元管理
  - レスポンスステータスコードの適切な設定
  - ペイロードの型安全な受け渡し
- **バリデーションユーティリティ** - Zodによる堅牢な入力検証
  - APIリクエストデータの厳密な検証
  - カスタムバリデーションルールの簡単な作成
  - クライアント・サーバー間で共有可能なスキーマ定義
  - 多言語対応エラーメッセージ
- **サーバーアクション** - 型安全なサーバー側処理
  - フォーム送信とデータ処理の統合
  - 楽観的なUI更新との連携
  - エラーハンドリングの一元化

### 認証システム

- **Auth.js (NextAuth v5)** - 認証基盤
- **JWT認証** - Auth.js による安全な認証基盤
  - セッション管理（JWTベース）
  - ユーザーログイン・登録フロー
  - ロールベースのアクセス制御（RBAC）
  - 認証状態の永続化と更新
- **Next.js SSR完全対応** - サーバーコンポーネントとの統合
  - App Routerアーキテクチャに最適化
  - RSCでのセッション取得と認証状態確認
  - ミドルウェアによるルート保護
  - 認証情報のプリフェッチとレンダリング最適化
- **セキュリティ対策** - 高度なセキュリティ機能
  - CSRFプロテクション
  - レート制限によるブルートフォース攻撃対策
  - セキュリティヘッダーの自動設定
  - エラーメッセージの適切な抽象化
- **ユーザー体験** - フレンドリーな認証フロー
  - ログイン状態の保持
  - リダイレクト処理の最適化
  - フォームバリデーションとエラー表示
  - アクセス制限ページへの適切な誘導

### 認証情報

> **注**: `src/lib/auth/test-data.ts` にテスト用のユーザーアカウントが2つハードコーディングされています。データベース連携や本格的なユーザー登録機能は今後追加予定です。
> **※ 本番環境では必ず削除してください。**

#### テストユーザー情報

開発環境では、以下のテストアカウントでログインできます：

1. **一般ユーザー**
   - メールアドレス: `user@example.com`
   - パスワード: `password123`
   - 権限: 一般ユーザー

2. **管理者ユーザー**
   - メールアドレス: `admin@example.com`
   - パスワード: `password123`
   - 権限: 管理者

### SEO最適化

- **メタデータ管理** - Next.js Metadata API による動的SEOメタタグ生成
- **構造化データ** - JSON-LD形式のリッチスニペット対応（ウェブサイト、組織、記事など）
- **パンくずリスト** - ユーザビリティ向上とSEO対応の階層ナビゲーション
- {**サイトマップ自動生成**} - 検索エンジンのクロール効率化（追加予定）
- **robots.txt** - クローラー制御とインデックス最適化
- **正規URL設定** - 重複コンテンツ問題の防止

### 開発体験

- **型安全性** - TypeScript による堅牢なコード
- **高速開発** - Next.js App Router とサーバーコンポーネント
- **効率的な状態管理** - Immer による不変性を維持した状態更新
- **フォームハンドリング** - React Hook Form と Zod による型安全なバリデーション
- **コード品質** - Biome によるリンティングとフォーマット

### 事前構築済み

- **ページテンプレート** - ホーム、説明、問い合わせ、プライバシーポリシー
- **レイアウトコンポーネント** - ヘッダー、フッター、ナビゲーション
- **ユーティリティ** - 定数管理、日付操作、クラス名ユーティリティ
- **テスト環境** - Vitest による高速なユニットテスト
- **サーバーサイドユーティリティ** - API応答の標準化、バリデーション、エラーハンドリング
- **認証システム** - Auth.js (NextAuth v5) によるJWT認証と保護されたルート

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

### 認証/セキュリティ

- **Auth.js (NextAuth v5)** - 認証基盤

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

1. `.env.example` ファイルを `.env.local` にコピー。

   ```bash
   cp .env.example .env.local
   ```

2. `.env.example` を参考に、必要な環境変数を設定します(不要な環境変数は削除してください)。

## 使用方法

### モード (テーマ) の切り替え設定

テーマ設定は `src/lib/constants/theme.ts` で定義

- テーマ機能自体の有効/無効の切り替え
- ライト or ダークモードを選択可能
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

shadcn/ui コンポーネントを使用する例：

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
│   ├── {fonts}/             # フォントファイル（追加予定）
│   ├── images/              # 画像ファイル
│   └── site.webmanifest     # サイトマニフェスト
├── reference/
│   ├── code/                # コード
│   ├── docs/                # ドキュメント
│   └── samples/             # サンプルコード
├── src/
│   ├── app/                 # Next.jsのページルーティング
│   │   ├── 各ページのディレクトリ/
│   │   ├── (examples)/      # サンプル例ページ
│   │   ├── api/             # APIエンドポイント
│   │   │   ├── auth/        # 認証関連
│   │   │   │   ├── login/   # ログインページ
│   │   │   │   └── register/ # 登録ページ
│   │   │   └── example/     # サンプル例ページ
│   │   ├── auth/            # 認証関連ページ
│   │   │   ├── login/       # ログインページ
│   │   │   └── register/    # 登録ページ
│   │   ├── dashboard/       # ダッシュボード関連ページ
│   │   └── globals.css      # グローバルスタイル
│   ├── components/          # 再利用可能なコンポーネント
│   │   ├── auth/            # 認証関連コンポーネント
│   │   ├── contact/         # コンタクトコンポーネント
│   │   ├── home/            # ホームコンポーネント
│   │   ├── layout/          # レイアウトコンポーネント(ヘッダー、フッター etc.)
│   │   ├── sections/        # セクションコンポーネント
│   │   ├── seo/             # SEO関連コンポーネント
│   │   ├── theme/           # テーマ(モード)コンポーネント
│   │   └── ui/              # UIコンポーネント(shadcn/uiもここに保存)
│   ├── hooks/               # カスタムフック
│   ├── lib/                 # ユーティリティ関数
│   │   ├── auth/            # 認証関連
│   │   ├── constants/       # 定数
│   │   ├── server/          # サーバーサイド
│   │   │   ├── actions/     # サーバーアクション
│   │   │   ├── api/         # APIルート
│   │   │   └── utils/       # サーバーサイドユーティリティ
│   │   ├── validation/      # バリデーションスキーマ
│   │   ├── {api}/           # API関連（追加予定）
│   │   ├── {db}/            # データベース関連（追加予定）
│   │   └── utils.ts         # 污用ユーティリティ
│   └── middleware.ts        # ミドルウェア
├── tests-results/           # テスト結果
├── tests/                   # テストファイル
│   ├── components/          # コンポーネントテスト
│   ├── e2e/                 # Playwright E2Eテスト
│   └── unit/                # Vitestユニットテスト
├── .env.example             # 環境変数の例
├── .gitignore               # Gitの除外設定
├── biome.json               # Biome設定
├── components.json          # shadcn/uiコンポーネント設定
├── next-env.d.ts            # Next.js環境設定
├── next.config.js           # Next.js設定
├── package.json             # 依存関係と設定
├── playwright.config.ts     # Playwright設定
├── postcss.config.mjs       # PostCSS設定
├── README.md                # READMEファイル
├── setupTests.ts            # テスト環境のグローバル設定
├── tailwind.config.ts       # Tailwind CSS設定
├── tsconfig.json            # TypeScript設定
└── vitest.config.ts         # Vitest設定
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

- [Next.js](https://nextjs.org) チーム
- [Tailwind CSS](https://tailwindcss.com) チーム
- [shadcn/ui](https://ui.shadcn.com) コンポーネント
- [Auth.js](https://authjs.dev) 認証
- [Vercel](https://vercel.com) プラットフォーム
- すべてのオープンソースコントリビューター

---

<div align="center">

**[⬆ トップに戻る](#next-js-ボイラープレート)**

</div>
