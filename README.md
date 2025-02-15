# Next.js Boilerplate

モダンなウェブアプリケーション開発のための Next.js ボイラープレート

## 特徴

- 🚀 Next.js 15
- 🎨 Tailwind CSS
- 📦 shadcn/ui コンポーネント
- 🗃️ Drizzle ORM
- 🔍 Biome
- ✅ Vitest

## 始め方

```bash
# リポジトリのクローン
git clone https://github.com/takunagai/nextjs-boilerplate.git
cd nextjs-boilerplate

# 依存関係のインストール
npm install

# 環境変数の設定
cp .env.example .env.local

# 開発サーバーの起動
npm run dev
```

## 利用可能なコマンド

```bash
npm run dev      # 開発サーバーの起動
npm run build    # プロダクションビルド
npm run start    # プロダクションサーバーの起動
npm run lint     # Biomeによるコード検証
npm run format   # Biomeによるコードフォーマット
npm run test     # Vitestによるテスト実行
```

## データベース操作

```bash
npm run db:generate  # マイグレーションファイルの生成
npm run db:push      # データベースへの変更の適用
npm run db:studio    # Drizzle Studioの起動
```

## ライセンス

MIT