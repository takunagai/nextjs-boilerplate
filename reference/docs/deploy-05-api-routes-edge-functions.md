# API RoutesとEdge Functions：Vercelとの違いと実装上の注意点

## はじめに
Next.js 15（App Router）をCloudflare Pages/Edge Functionsで運用する際、API RoutesやEdge Functionsの実装方法・制約はVercelやNode.js環境と大きく異なります。本記事では、両者の違いと実装・運用上の注意点を徹底解説します。

---

## 1. Next.js API Routesの仕組み

- App Routerでは`src/app/api/`配下にAPI Routeを実装
- Cloudflare PagesではAPI RouteはEdge Functionsとして動作
- VercelではNode.js/Edge両対応（デプロイ先で自動判定）

---

## 2. Cloudflare Pages/Edge Functionsの特徴

- Node.js API（fs, path, crypto, Buffer等）は利用不可
- Web標準API（fetch, Request, Response, URL, TextEncoder等）で記述
- 実行環境はDenoベースに近い（V8ランタイム）
- 超高速・低レイテンシ、グローバルCDN配信

---

## 3. Vercel（Node.js/Edge）との違い

| 機能/仕様         | Cloudflare Pages/Edge | Vercel（Node.js/Edge） |
|-------------------|-----------------------|------------------------|
| Node.js API       | ×                     | ○                      |
| Web API           | ○                     | ○                      |
| 画像最適化        | カスタムローダー要    | デフォルト対応         |
| バイナリ操作      | 制限あり              | Node.jsなら制限なし    |
| サードパーティ    | isomorphic推奨        | Node.js依存も可        |

---

## 4. 実装上の注意点

- 依存パッケージがNode.js APIを使っていないか必ず確認
- 画像処理・バイナリ処理はCloudflare ImagesやWorkersで補完
- fetch/Response/Request/URL等Web APIを積極利用
- API Routeでの認証・セッション管理もWeb APIベースで実装
- エラーハンドリング・ロギングもWeb API仕様に準拠

---

## 5. 運用Tips・トラブルシュート

- デプロイ失敗時はバンドルログでNode.js API依存をチェック
- ローカル開発は`wrangler pages dev`でEdge Functions挙動を再現
- サードパーティパッケージは`isomorphic`や`universal`なものを選定
- どうしてもNode.js APIが必要な場合はVercel/Netlify/FaaSに切り替えも検討

---

## 6. まとめ・Q&A

- Cloudflare Pages/Edge FunctionsではWeb APIベースが大原則
- Node.js API依存は避け、パッケージも慎重に選定
- Vercelとの違いを理解し、最適な運用を

---

### Q&A

> Q. Cloudflare PagesでAPI Routeが動かない原因は？
>
> A. 依存パッケージや自作コードにNode.js APIが含まれている可能性が高い。Web APIベースに書き換えると解決。

> Q. バイナリ処理や画像最適化はどうする？
>
> A. Cloudflare ImagesやWorkersを活用。Node.js依存のsharp等は使えない。

> Q. ローカル開発でEdge Functions挙動を確認するには？
>
> A. `wrangler pages dev`コマンドで本番同等の挙動を再現できる。

---

これで「Next.js 15 × Cloudflare運用Q&A」シリーズは完結です。実務での疑問点や追加ノウハウがあれば、ぜひ追記・フィードバックください！
