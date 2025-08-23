# Next.js ボイラープレート

![Node.js](https://img.shields.io/badge/Node.js-24-5FA04E?style=flat-square&logo=node.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript)
![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat-square&logo=react)
![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black?style=flat-square&logo=next.js)
![Auth.js](https://img.shields.io/badge/Auth.js-5.0.0--beta.25-blue?style=flat-square&logo=authjs)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.10-06B6D4?style=flat-square&logo=tailwind-css)
![Three.js](https://img.shields.io/badge/Three.js-0.179.1-000000?style=flat-square&logo=three.js)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-2.1-black?style=flat-square&logo=shadcnui)
![Motion](https://img.shields.io/badge/motion-12.19.1-6E9F18?style=flat-square&logo=motion)
![Biome](https://img.shields.io/badge/Biome-2.0.5-60A5FA?style=flat-square&logo=biome)
![Zod](https://img.shields.io/badge/zod-4.0.15-3E67B1?style=flat-square&logo=zod)
![Vitest](https://img.shields.io/badge/Vitest-3.2.4-6E9F18?style=flat-square&logo=vitest)
![Playwright](https://img.shields.io/badge/Playwright-1.53.1-45ba4b?style=flat-square&logo=playwright)

## 概要

このプロジェクトは、モダンなウェブアプリケーション/サイト開発のための Next.js ボイラープレートです。TypeScript、Tailwind CSS、shadcn/ui などの最新技術を組み合わせ、開発の効率化と品質向上を実現します。

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

このプロジェクトは、[Windsurf IDE](https://codeium.com/windsurf) 用の `.windsurfrules` ファイルを含んでいます。このファイルは [kinopeee/windsurfrules](https://github.com/kinopeee/windsurfrules) をベースに、AIエージェント/アシスタントがプロジェクト構造、技術スタック、コード規約を正確に理解できるよう最適化されています。これにより、一貫性のある高品質なコード生成と効率的な開発サポートが可能になります。  
※ Cursor, Cline, Github Copilot など他の AIエージェントの場合は、`.windsurfrules` ファイルを参考に適宜調整してください。

## デモ

デモサイト: [https://nextjs-boilerplate-japanese.vercel.app](https://nextjs-boilerplate-japanese.vercel.app)

## 機能

### UI/UX

- **レスポンシブデザイン** - Tailwind CSS によるモバイルファーストアプローチ
- **ダークモード対応** - next-themes + Tailwind CSS v4 による高度なテーマ管理
  - ライト/ダーク/システム設定の3つのモード
  - SSR対応のフラッシュ防止機能
  - ユーザー設定の永続化（localStorage）
  - テーマ機能のON/OFF切替オプション
- **レスポンシブレイアウト** - ビューポート幅に応じた最適なスタイル調整
  - CVA を活用した Container コンポーネント
- **アニメーション** - motion によるモーション
- **3D背景エフェクト** - Three.js とReact Three Fiberによる高品質な視覚効果
  - Digital Constellation（デジタル星座エフェクト）
  - Flowing Comments（コメント流れエフェクト）
  - パフォーマンス最適化済み（GPU加速、フレーム制御）
- **アクセシビリティ対応** - WCAG 2.1 AA準拠
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
- **構造化データ** - JSON-LD形式のリッチスニペット対応
- **パンくずリスト** - ユーザビリティ向上とSEO対応の階層ナビゲーション
- **robots.txt** - クローラー制御とインデックス最適化
- **正規URL設定** - 重複コンテンツ問題の防止

### 開発体験

- **型安全性** - TypeScript による堅牢なコード基盤
- **高速開発** - React 19 Compiler + Next.js App Router
- **フォームハンドリング** - React Hook Form + Zod による型安全なバリデーション
- **コード品質** - Biome によるリンティング・フォーマット
- **開発用サンプルページ** - 環境変数による表示制御
- **開発者ユーティリティ** - コンポーネント状態のリセット機能
  - AnnouncementBar の表示状態リセット
  - 開発環境でのデバッグサポート

### 事前構築済み

- **レイアウトコンポーネント** - ヘッダー、フッター、ナビゲーション
- **認証システム** - Auth.js (NextAuth v5) によるJWT認証
- **ページテンプレート** - ホーム、サービス、問い合わせ、プライバシーポリシー
- **お知らせ機能** - 一覧・詳細ページ（カテゴリ絞り込み、ページネーション）
- **テスト環境** - Vitest・Playwright による包括的テスト

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
- **motion** - アニメーション
- **Three.js** - 3Dグラフィックスライブラリ
  - @react-three/fiber - React用Three.jsレンダラー
  - @react-three/drei - 有用なヘルパーとアブストラクション
- **embla-carousel-react** - カルーセル
  - embla-carousel-autoplay
  - embla-carousel-class-names
  - embla-carousel-fade
- **sonner** - トースト通知
- **react-icons** - アイコンセット

### 状態管理/ユーティリティ

- **immer** - 不変状態管理
- **next-themes** - SSR対応テーマ管理
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

- **データベース対応準備済み** - PostgreSQL、Drizzle ORM 等の追加が容易

### 開発ツール

- **Biome** - リンター/フォーマッター

### テスト

- **Vitest** - ユニットテスト
- **Playwright** - E2Eテスト
- **Testing Library** - React/DOM テスト
  - @testing-library/react - React コンポーネントテスト
  - @testing-library/jest-dom - DOM マッチャー拡張
  - @testing-library/user-event - ユーザーインタラクションテスト
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

### 開発者向けユーティリティ

#### AnnouncementBar のリセット

AnnouncementBar は一度閉じると localStorage に状態が保存され、次回以降表示されません。  
開発中に再度表示させたい場合は、以下の方法でリセットできます：

**方法1: 開発環境専用のリセット関数（推奨）**

```javascript
// ブラウザのコンソールで実行
window.resetAnnouncementBar()
```

**方法2: localStorage を手動でクリア**

```javascript
// ブラウザのコンソールで実行
localStorage.removeItem('announcement-bar-closed')
location.reload()
```

**方法3: 開発者ツール GUI から削除**

1. F12 キーで開発者ツールを開く
2. Application/Storage タブを選択
3. Local Storage → サイトのドメインをクリック
4. `announcement-bar-closed` の項目を削除
5. ページをリロード

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

### Container コンポーネントの使用

レスポンシブなレイアウトを簡単に実装するための Container コンポーネント。

```tsx
import { Container } from "@/components/ui/container";

export default function MyPage() {
  return (
    // 基本的な使用方法
    <Container width="2xl" paddingY="lg" paddingX="2xl">
      <h1>コンテンツタイトル</h1>
      <p>コンテンツの説明文...</p>
    </Container>
    
    // クラス名でスタイルを追加する例
    <Container width="2xl" paddingY="xl" paddingX="lg" className="bg-gray-50 relative z-50">
      <div>複雑なレイアウト要素...</div>
    </Container>

    // セマンティックなHTML要素として利用 (デフォルトはdiv)
    <Container as="section" width="lg">
      <h2>セクションタイトル</h2>
      <p>セクションコンテンツ...</p>
    </Container>

    // カスタム最大幅の指定
    <Container fluid customMaxWidth="1440px" paddingY="md" paddingX="lg">
      <div>カスタム幅のコンテナ</div>
    </Container>
  );
}
```

#### パラメータ

幅のバリエーション：

- `xs`, `sm`, `md`, `lg`, `xl`, `2xl` - コンテナの最大幅を制御

パディングバリエーション（縦・横個別に設定可能）：

- `none`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl`

その他のオプション：

- `fluid`: 最大幅制限なしで幅100%に（モバイルでの余白は維持）
- `customMaxWidth`: CSSカスタム変数を使用したカスタム最大幅の指定
- `className`: 追加のTailwindクラスを直接指定

使用可能なHTML要素（`as`プロパティ）：

- `div` (デフォルト), `section`, `header`, `footer`, `main`, `article`, `aside`, `figure`, `figcaption`, `summary`, `nav`

## ディレクトリ構造

```text
nextjs-boilerplate/
├── public/                  # 静的アセット
│   ├── dummy-images/        # ダミー画像
│   │   ├── features/        # 機能説明用画像
│   │   ├── tech/            # 技術スタックロゴ
│   │   └── ...              # その他のダミー画像
│   ├── images/              # 画像ファイル
│   │   ├── portfolio/       # ポートフォリオ画像
│   │   ├── hero.jpg         # ヒーロー画像
│   │   └── logo.png         # ロゴ画像
│   └── site.webmanifest     # サイトマニフェスト
├── docs/                    # 統一ドキュメント（業界標準準拠）
│   ├── development/         # 開発プロセス
│   │   ├── archive/         # アーカイブ
│   │   ├── plans/           # 計画書
│   │   ├── reports/         # レポート
│   │   └── tasks/           # タスク管理
│   ├── examples/            # サンプルコード
│   │   ├── components/      # コンポーネント例
│   │   ├── forms/           # フォーム例
│   │   └── testing/         # テスト例
│   ├── guides/              # 実装ガイド
│   │   ├── authentication/  # 認証
│   │   ├── components/      # コンポーネント
│   │   ├── deployment/      # デプロイ
│   │   ├── hooks/           # フック
│   │   ├── migration/       # 移行ガイド
│   │   └── tips/            # Tips
│   ├── operations/          # 運用・DevOps
│   │   └── performance/     # パフォーマンス管理
│   └── reference/           # 技術仕様・リファレンス
│       ├── business/        # ビジネス関連
│       ├── features/        # 機能仕様
│       └── specifications/  # 技術仕様
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── (app)/           # 保護されたアプリケーションエリア
│   │   │   ├── dashboard/   # ダッシュボード
│   │   │   ├── profile/     # プロフィール
│   │   │   └── layout.tsx   # 認証済みレイアウト
│   │   ├── (auth)/          # 認証ページグループ
│   │   │   ├── login/       # ログインページ
│   │   │   ├── register/    # 登録ページ
│   │   │   └── layout.tsx   # 認証レイアウト
│   │   ├── (examples)/      # 開発サンプルページ（環境変数で制御）
│   │   │   ├── examples/    # 各種コンポーネントサンプル
│   │   │   └── layout.tsx   # サンプルレイアウト
│   │   ├── (site)/          # 公開ページグループ
│   │   │   ├── about/       # About
│   │   │   ├── contact/     # お問い合わせ
│   │   │   ├── news/        # お知らせ
│   │   │   ├── portfolio/   # ポートフォリオ
│   │   │   ├── privacy/     # プライバシーポリシー
│   │   │   ├── services/    # サービス
│   │   │   └── page.tsx     # ホームページ
│   │   ├── actions/         # Server Actions
│   │   │   ├── contact-form.ts  # お問い合わせフォーム
│   │   │   ├── contact.ts       # コンタクトアクション
│   │   │   ├── form-example.ts  # フォーム例
│   │   │   └── profile.ts       # プロフィール更新
│   │   ├── api/             # APIルート
│   │   │   ├── auth/        # 認証API
│   │   │   ├── csrf-token/  # CSRFトークン
│   │   │   └── example/     # サンプルAPI
│   │   ├── favicon.ico      # ファビコン
│   │   ├── globals.css      # グローバルスタイル
│   │   ├── layout.tsx       # ルートレイアウト
│   │   ├── not-found.tsx    # 404ページ
│   │   ├── robots.ts        # robots.txt生成
│   │   └── sitemap.ts       # サイトマップ生成
│   ├── components/          # 再利用可能なコンポーネント
│   │   ├── accessibility/   # アクセシビリティコンポーネント
│   │   ├── auth/            # 認証関連コンポーネント
│   │   ├── background/      # 背景エフェクトコンポーネント
│   │   │   ├── constellation/  # 3D星座エフェクト（モジュール化）
│   │   │   └── ...            # その他の背景エフェクト
│   │   ├── contact/         # コンタクトコンポーネント
│   │   ├── dashboard/       # ダッシュボードコンポーネント
│   │   ├── effects/         # アニメーション・視覚効果
│   │   ├── home/            # ホームページコンポーネント
│   │   ├── layout/          # レイアウトコンポーネント
│   │   ├── map/             # 地図コンポーネント
│   │   ├── masonry-gallery/ # マソンリーギャラリー
│   │   ├── news/            # お知らせコンポーネント
│   │   ├── profile/         # プロフィールコンポーネント
│   │   ├── sections/        # ページセクションコンポーネント
│   │   ├── seo/             # SEO最適化コンポーネント
│   │   ├── services/        # サービスページコンポーネント
│   │   ├── theme/           # ダークモードテーマシステム
│   │   └── ui/              # 基本UIコンポーネント（shadcn/ui）
│   ├── constants/           # アプリケーション全体の定数
│   │   ├── constellation.ts # 3Dエフェクト設定
│   │   ├── particle.ts      # パーティクル設定
│   │   └── ui.ts            # UIマジックナンバー
│   ├── hooks/               # カスタムReactフック
│   │   ├── __tests__/       # フックのテスト
│   │   ├── use-constellation-*.ts  # 3Dエフェクト用フック
│   │   ├── use-form-submission.ts  # フォーム送信統合
│   │   ├── use-header-*.ts        # ヘッダー管理
│   │   ├── use-hero-height.ts     # ヒーロー高さ計算
│   │   └── utils/           # フックユーティリティ
│   ├── lib/                 # ユーティリティとコンフィグ
│   │   ├── accessibility/   # アクセシビリティユーティリティ
│   │   ├── auth/            # Auth.js (NextAuth v5) 設定
│   │   ├── constants/       # アプリケーション定数
│   │   ├── data/            # 静的データ（お知らせ等）
│   │   ├── hooks/           # サーバー側フック
│   │   ├── particle/        # パーティクルユーティリティ
│   │   ├── security/        # セキュリティユーティリティ
│   │   ├── server/          # サーバーサイドユーティリティ
│   │   │   ├── actions/     # Server Actions ユーティリティ
│   │   │   └── api/         # APIレスポンスユーティリティ
│   │   ├── types/           # 型定義
│   │   ├── utils/           # 汎用ユーティリティ
│   │   ├── validation/      # Zodスキーマ定義
│   │   └── utils.ts         # 共通ユーティリティ
│   ├── test-utils/          # テストユーティリティ
│   ├── types/               # TypeScript型定義
│   └── middleware.ts        # Next.jsミドルウェア
├── tests/                   # テストファイル
│   ├── e2e/                 # Playwright E2Eテスト
│   └── unit/                # Vitestユニットテスト
├── test-results/            # テスト実行結果
├── coverage/                # テストカバレッジレポート
├── playwright-report/       # Playwrightレポート
├── .env.example             # 環境変数の例
├── .gitignore               # Gitの除外設定
├── CLAUDE.md                # Claude Code用プロジェクト設定
├── biome.json               # Biome設定
├── components.json          # shadcn/uiコンポーネント設定
├── extensions.json          # VSCode推奨拡張機能
├── next-env.d.ts            # Next.js環境設定
├── next.config.ts           # Next.js設定
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
