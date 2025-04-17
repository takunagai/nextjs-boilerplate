# Jamstack時代のデータ保存先選定ガイド 〜Supabase, Neon, MicroCMS, R2, Gitベース徹底比較〜

## はじめに
Jamstack構成やNext.js 15プロジェクトで「新着情報やブログ記事などのデータをどこに保存すべきか？」は、運用や拡張性、コストに直結する重要なテーマです。本記事では、実際の現場でよく検討される主要な選択肢（Supabase, Neon, MicroCMS, Cloudflare R2, Markdown+GitHub）について、ユースケース別のおすすめ・コスト・運用性・注意点を徹底解説します。

---

## 1. 各サービスの特徴と比較

### Supabase
- **BaaS（Backend as a Service）型**
- PostgreSQLベース＋認証・ストレージ・REST/GraphQL API
- Next.js公式SDKあり
- 管理UIが充実、ノーコード運用も可能
- 無料枠あり、商用でもコスパ良好
- 日本リージョンは未対応（2025.4現在）

### Neon
- **サーバーレスPostgreSQL（DBaaS）型**
- DB機能に特化、APIや認証は自前実装
- Drizzle ORMやPrismaでNext.jsと直結
- Cloudflare/Netlify/Edge Functionsと親和性高い
- 無料枠も大きく、スケール時も安価

### MicroCMS
- **日本発ヘッドレスCMS**
- ノーコードで記事管理、API経由でデータ取得
- 日本語UI・サポートが強み
- Webhookやプレビュー機能も充実
- 複雑なリレーションやカスタムロジックは苦手
- 無料枠はAPI制限あり

### Cloudflare R2
- **S3互換オブジェクトストレージ**
- 画像・ファイルの保存・配信に最適
- 転送量課金なし、ストレージ単価も安い（100GBで$1.50/月程度）
- APIリクエストも無料枠が大きい
- 画像最適化はCloudflare ImagesやWorkersと組み合わせ

### Markdown + GitHub
- **ファイルベース静的管理**
- 記事をMarkdownで管理し、Contentlayer等で静的生成
- コストゼロ・バージョン管理・移行容易
- 非エンジニア運用には不向き

---

## 2. ユースケース別おすすめ

| 運用主体           | おすすめ              | 理由                                      |
|--------------------|----------------------|-------------------------------------------|
| エンジニア主体     | Neon（or Supabase）  | 柔軟・拡張性・コスト・Next.js親和性抜群   |
| 非エンジニア主体   | MicroCMS             | ノーコード運用・日本語UI・CMS特化機能     |
| 小規模・静的運用   | Markdown+GitHub      | コストゼロ・バージョン管理・移行容易      |
| 画像・ファイル大量 | R2+Neon/Supabase     | ストレージコスト最適・API連携も容易       |

---

## 3. コスト比較（2025年4月時点）

| サービス         | 無料枠           | 有料プラン例         | ストレージ単価 | 転送量課金 | APIリクエスト |
|------------------|------------------|----------------------|---------------|------------|--------------|
| Supabase         | 500MB/2GB        | $25/月〜（8GB/50GB） | $0.25/GB      | $0.09/GB   | 50万回/月    |
| Neon             | 10GB/10GB        | $19/月〜（20GB/50GB）| $0.10/GB      | $0.12/GB   | 制限なし     |
| MicroCMS         | 1万API/月        | $30/月〜             | -             | -          | 10万回/月    |
| R2               | 10GB             | $0.015/GB/月         | $0.015/GB     | なし       | 100万回/月   |
| Markdown+GitHub  | -                | -                    | 0             | 0          | -            |

---

## 4. Cloudflare R2の詳細

- **保存容量**：$0.015 / GB / 月
- **転送量**：無料（Egress課金なし）
- **APIリクエスト**：Class A（PUT/POST）$4.50/100万回、Class B（GET等）$0.36/100万回
- **無料枠**：10GBストレージ、100万Class A、1000万Class B/月
- **画像最適化**：Cloudflare Imagesと組み合わせると超高速＆高機能

---

## 5. まとめ

- **運用者・用途・拡張性・コストで最適な選択肢は異なる**
- Next.js/Cloudflare/Netlify環境なら、Neon+R2構成が現代的でおすすめ
- ノーコード運用やCMS重視ならMicroCMS、静的運用ならMarkdown+GitHubも有力
- コスト・API制限・ベンダーロックインも事前に要チェック

---

## Q&A形式での実践的な選定例

> Q. Supabase, Neon, MicroCMSのどれが良い？
>
> A. エンジニア運用・拡張性重視ならNeon、認証や管理画面も欲しいならSupabase、非エンジニア主体ならMicroCMS。

> Q. SupabaseとNeonの違いは？
>
> A. SupabaseはBaaSで認証・ストレージ・APIも一括管理、NeonはDB特化で柔軟性・コスト・スケール性が高い。

> Q. コストは？
>
> A. SupabaseはBaaS機能込みで月$25〜、NeonはDB単体で月$19〜、R2はストレージ10GBまで無料で超安価。

> Q. Cloudflare R2の特徴は？
>
> A. ストレージ単価が安く、転送量課金がなく、画像・ファイル配信用途で最強クラス。

---

次回は「Neon＋Cloudflare R2＋Auth.js構成の実践ノウハウ」を詳しく解説します。
