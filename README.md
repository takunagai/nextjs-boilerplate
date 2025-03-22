# nextjs-boilerplate

This is a Next.js project bootstrapped with create-next-app.

## 概要

このプロジェクトは、Next.jsを使用して構築されたボイラープレートです。ユニットテストにはVitestを使用しています。

## セットアップ手順

1. リポジトリをクローンします。

   ```bash
   git clone <repository-url>
   cd nextjs-boilerplate
   ```

2. 依存関係をインストールします。

   ```bash
   npm install
   ```

3. 開発サーバーを起動します。

   ```bash
   npm run dev
   ```

   ブラウザで [http://localhost:3000](http://localhost:3000) を開いて結果を確認します。

## テストの実行

ユニットテストを実行するには、以下のコマンドを使用します。

```bash
npm test
```

## 使用しているライブラリ

### コア技術

- **Next.js**: Reactベースのフルスタックフレームワーク
- **React**: UIコンポーネントライブラリ
- **TypeScript**: 静的型付きJavaScript

### UI/スタイリング

- **Tailwind CSS**: ユーティリティファーストCSSフレームワーク
- **tailwindcss-animate**: アニメーション拡張
- **tailwind-merge**: クラス名競合解決
- **shadcn/ui**: 再利用可能なUIコンポーネント
- **next-themes**: テーマ切り替え機能
- **framer-motion**: 高度なアニメーション
- **sonner**: トースト通知
- **lucide-react**: モダンアイコンセット

### 状態管理/ユーティリティ

- **immer**: 不変性を維持した状態管理
- **date-fns**: 日付操作
- **clsx**: 条件付きクラス名管理
- **class-variance-authority**: コンポーネントバリエーション

### フォーム/バリデーション

- **react-hook-form**: フォーム状態管理
- **zod**: スキーマバリデーション
- **@hookform/resolvers**: バリデーション連携

### テスト

- **Vitest**: 高速ユニットテスト
- **Testing Library**: DOMテスト
- **jsdom**: ブラウザ環境シミュレーション

### 開発ツール

- **Biome**: 次世代リンター/フォーマッター
- **npm**: パッケージ管理

## 注意事項

このプロジェクトは、さまざまなプロジェクトで再利用できるように設計されています。必要に応じて設定を変更してください。
