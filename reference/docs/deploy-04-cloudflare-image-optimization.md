# Cloudflare環境での画像最適化とベストプラクティス 〜Next.js × CDN時代の新常識〜

## はじめに
WebアプリやJamstackサイトのパフォーマンス・UXを大きく左右するのが「画像最適化」です。Next.js 15とCloudflare（R2/Images）環境で、どのように画像を効率よく保存・配信・最適化すればよいか、実践ノウハウをまとめます。

---

## 1. next/imageの基本とCloudflare環境での制約

- `next/image`はデフォルトでVercel最適化（Node.js API依存）
- Cloudflare Pages/Edge FunctionsではNode.js APIが使えないため、画像最適化の仕組みが異なる
- Cloudflare ImagesやR2と連携することで、CDN最適化＋超高速配信が可能
- 独自ローダー（loader）を実装すれば、R2/ImagesのURLを動的に生成できる

---

## 2. Cloudflare Imagesの特徴・導入手順・運用例

- **特徴**：画像のアップロード・変換・リサイズ・WebP変換・CDN配信を一括提供
- **導入手順**：
  1. CloudflareダッシュボードでImagesを有効化
  2. APIキー発行・バケット作成
  3. 画像アップロードAPI/管理UI利用
  4. 画像URLにクエリパラメータでリサイズ・フォーマット指定
- **運用例**：
  - `https://imagedelivery.net/<account_hash>/<image_id>/public?w=800&h=600&fit=cover&format=webp`
  - Next.jsの`next/image`の`loader`プロパティでCloudflare Images用のURLを返す関数を実装

---

## 3. Cloudflare R2での画像保存・配信方法

- **特徴**：S3互換ストレージ、転送量課金なし、CDN配信可
- **運用例**：
  - 画像アップロードAPI（Edge FunctionsやAPI Routeで署名付きURL発行）
  - R2バケットの公開設定＋Cloudflare CDN経由で配信
  - `next/image`の`loader`でR2の画像URLを返す
- **注意点**：R2単体ではリサイズ・WebP変換などは不可→Cloudflare ImagesやWorkersで補完

---

## 4. 画像最適化のベストプラクティス

- **レスポンシブ対応**：`sizes`/`srcSet`で複数解像度を用意
- **フォーマット変換**：WebP/AVIF優先配信（Cloudflare Imagesなら自動）
- **キャッシュ戦略**：CDNキャッシュ＋長期キャッシュヘッダ
- **遅延読み込み**：`loading="lazy"`でUX向上
- **アクセシビリティ**：alt属性必須

---

## 5. コスト・パフォーマンス・運用Tips

- Cloudflare Images：$5/月（10万枚まで）＋超過分従量課金
- R2：10GBまで無料、以降$0.015/GB/月
- 転送量はどちらも無料枠が大きく、商用でもコスパ抜群
- 画像最適化はCloudflare Images＋R2の組み合わせが最強

---

## 6. まとめ・Q&A

- Cloudflare環境ではNode.js API非依存な画像最適化が必須
- next/imageのカスタムローダー＋Cloudflare Images/R2連携がベストプラクティス
- コスト・パフォーマンス・運用性のバランスも良好

---

### Q&A

> Q. next/imageはCloudflare環境でそのまま使える？
>
> A. デフォルト最適化は不可。カスタムローダーでCloudflare ImagesやR2のURLを返す必要あり。

> Q. R2単体で画像最適化できる？
>
> A. 画像変換・リサイズは不可。Cloudflare ImagesやWorkersと併用するのが現実的。

> Q. 画像アップロードはどうする？
>
> A. API RouteやEdge Functionsで署名付きURLを発行し、クライアントから直接R2/Imagesへアップロード。

---

次回は「API RoutesとEdge Functions：Vercelとの違いと実装上の注意点」を詳しく解説します。
