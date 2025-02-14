# Next.js Boilerplate

This is a Next.js project bootstrapped with create-next-app.

## 概要

このプロジェクトは、Next.jsを使用して構築されたボイラープレートです。ユニットテストにはVitestを使用しています。

## セットアップ手順

1. リポジトリをクローンします。

   ```bash
   git clone <repository-url>
   cd <project-name>
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

- **Next.js**: フロントエンドフレームワーク
- **React**: UIライブラリ
- **TypeScript**: 型付きJavaScript

### スタイル

- **Tailwind CSS**: ユーティリティファーストCSSフレームワーク
- **framer-motion**: アニメーションライブラリ

### ユーティリティ

- **date-fns**: 日付操作ライブラリ
- **immer**: 不変データを扱うためのライブラリ
- **clsx**: 条件付きクラス名を簡単に操作するためのライブラリ
- **tailwind-merge**: Tailwind CSSのクラスをマージするためのライブラリ
- **class-variance-authority**: クラスのバリアンスを管理するためのライブラリ

### フォーム管理

- **react-hook-form**: フォームの状態管理ライブラリ
- **zod**: 型安全なスキーマバリデーションライブラリ
- **@hookform/resolvers**: react-hook-form用のバリデーションライブラリ

### テスト

- **Vitest**: ユニットテストフレームワーク
- **@testing-library/jest-dom**: Jest用のDOM拡張ライブラリ
- **jsdom**: Node.js環境でDOMをシミュレートするためのライブラリ

### 開発ツール

- **npm**: パッケージマネージャー
- **Biome**: コードリントとフォーマッター

## 注意事項

このプロジェクトは、さまざまなプロジェクトで再利用できるように設計されています。必要に応じて設定を変更してください。
