# CloudflareでNext.js 15 (App Router)を運用する際の実践知識

## はじめに
Next.js 15（App Router）とCloudflare Pages/Workersの組み合わせは、超高速・グローバルスケールなJamstack運用の最先端です。本記事では、CloudflareでNext.js 15を最大限活用するための運用ノウハウ、Edge Functionsの挙動、API Routesの注意点、Node.js API非対応への対応策などを詳しく解説します。

---

## 1. デプロイ先の選択肢と比較

| サービス             | 特徴                                      | Next.js対応 | Edge/SSR/ISR |
|----------------------|-------------------------------------------|-------------|--------------|
| Cloudflare Pages     | 静的/動的両対応、Edge Functions標準       | ◎           | ◎            |
| Cloudflare Workers   | サーバーレス関数、APIやバッチ処理向き     | △           | ◎(API)       |
| Vercel               | Next.js公式、Node.js/Edge両対応           | ◎           | ◎            |
| Netlify              | 静的/SSR両対応、Edge Functionsも可        | ◎           | ◎            |

- Cloudflare PagesはNext.js公式サポートあり。App Router/SSR/ISR/Edge Functionsすべて利用可能
- WorkersはAPIやバッチ処理に最適、Pagesと連携も可

---

## 2. SSR, ISR, Edge Functionsの挙動

- **SSR/ISR/Static**：Cloudflare Pagesで自動的に最適化され、グローバルCDN配信
- **API Routes**：すべてEdge Functionsとして実行される（Node.js APIは使えない）
- **Edge Functions**：超高速・低レイテンシ、Web APIベースで記述

---

## 3. API Routes実装時の注意点

- Node.jsネイティブAPI（fs, path, crypto, Buffer, stream等）が使えない
- 代わりにWeb標準API（fetch, Request, Response, URL, TextEncoder等）を利用
- サードパーティパッケージもNode.js依存がないものを厳選（isomorphic/universalなもの推奨）
- 画像処理やバイナリ操作はCloudflare ImagesやWorkersで代替

---

## 4. Node.js依存パッケージの落とし穴と対策

- 依存パッケージのバンドル時にNode.js APIが含まれると、Cloudflare Pagesでビルド・デプロイ失敗
- 公式ドキュメントやbundle analyzerで依存関係を事前にチェック
- どうしても必要な場合はVercelやNode.js対応FaaSに切り替えも検討

---

## 5. 環境変数・Secrets管理

- Cloudflare Pagesの「プロジェクト設定」から環境変数を登録
- `.env`ファイルはローカル開発用、デプロイ時はCloudflare側で管理
- APIキーやシークレットは必ず環境変数で安全に管理

---

## 6. 実運用Tips

- **デバッグ/ロギング**：`console.log`はCloudflareのダッシュボードで確認可能
- **ローカル開発**：`wrangler pages dev`でEdge Functionsも含めてローカル実行可
- **パフォーマンス**：画像・ファイルはR2やCloudflare Images経由でCDN配信
- **パッケージ管理**：Node.js API依存のないパッケージを選定

---

## 7. まとめ・ベストプラクティス

- Next.js 15 × Cloudflare Pagesは最先端のJamstack運用に最適
- API Routes/Edge FunctionsはWeb APIベースで実装、Node.js APIは避ける
- 依存パッケージ・環境変数・画像最適化・CDN活用を徹底
- 運用上の細かなTipsも活用し、トラブルを未然に防ぐ

---

## Q&A形式での実践例

> Q. Cloudflare PagesでNext.jsのAPI Routesが動かない？
>
> A. Node.js API依存やサードパーティパッケージのバンドルに注意。Web APIベースで書き直すと解決。

> Q. 画像最適化はどうする？
>
> A. `next/image`をCloudflare ImagesやR2と連携、またはWorkersで独自最適化が現実的。

> Q. デバッグはどうやる？
>
> A. `console.log`はCloudflareダッシュボードで確認、ローカルは`wrangler pages dev`で再現可能。

---

次回は「Cloudflare環境での画像最適化とベストプラクティス」を詳しく解説します。
