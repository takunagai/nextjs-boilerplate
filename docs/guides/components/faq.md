# FAQ コンポーネント: コンテナクエリによるレスポンシブ設計と高度なカスタマイズ

Next.js/React/TypeScript プロジェクトにおいて、よくある質問（FAQ）セクションは、ユーザーの疑問に効率的に対応し、サイトの使いやすさを向上させる重要な要素です。本記事では、shadcn/ui の Accordion をベースに、コンテナクエリを活用した高度なレスポンシブ対応と豊富なカスタマイズが可能な `FAQ` コンポーネントの設計と実装について解説します。

## 目次

1. [コンポーネントの概要](#コンポーネントの概要)
2. [主な特徴](#主な特徴)
3. [設計思想](#設計思想)
4. [実装の工夫](#実装の工夫)
5. [使用例](#使用例)
6. [今後の改良アイデア](#今後の改良アイデア)
7. [まとめ](#まとめ)

## コンポーネントの概要

`FAQ` コンポーネントは、アコーディオン形式でよくある質問と回答を表示するためのサーバーコンポーネントです。単純な表示機能だけでなく、検索・フィルタリング機能、タグによる分類、アイコンのカスタマイズなど、ユーザー体験を向上させる多くの機能を備えています。また、Tailwind CSS v4 のコンテナクエリを活用し、ビューポートサイズではなくコンポーネントが配置される親コンテナのサイズに基づいたレスポンシブ設計を実現しています。

```tsx
<FAQ
  items={faqItems}
  heading={<h3 className="text-xl font-bold">よくあるご質問</h3>}
  search="返品"
  tagFilter={["料金"]}
/>
```

## 主な特徴

### 1. コンテナクエリによるレスポンシブ設計

Tailwind CSS v4 のコンテナクエリを活用し、親コンテナのサイズに応じて自動的にレイアウトが調整されます。これにより、同じコンポーネントを様々な幅のコンテナ内で使用しても、それぞれに最適化された表示が可能になります。

```tsx
// コンテナクエリの適用
<div className="w-full @container">
  {/* コンテナサイズに応じたスタイリング */}
  <div className="text-sm @sm:text-base @md:text-lg">...</div>
</div>
```

### 2. 検索・フィルタリング機能

質問と回答の内容をサーバーサイドで検索・フィルタリングする機能を実装しています。特定のキーワードに関連する質問のみを表示したり、タグを使って特定のカテゴリの質問に絞り込んだりすることができます。

```tsx
// 検索による絞り込み
<FAQ items={faqItems} search="返品" />

// タグによるフィルタリング
<FAQ items={faqItems} tagFilter={["料金", "配送"]} />
```

### 3. 柔軟なスタイリングオプション

コンポーネントの各部分（コンテナ、質問、回答、アイコン、タグなど）のスタイルをTailwind CSSクラスで自由にカスタマイズできます。

```tsx
<FAQ
  items={faqItems}
  classNames={{
    container: "bg-slate-50 p-6 rounded-lg",
    question: "font-medium text-primary",
    answer: "italic",
    tag: "bg-primary/10 text-primary",
  }}
/>
```

### 4. カスタムアイコン対応

質問と回答それぞれにカスタムアイコンを設定できます。react-icons パッケージを活用してアイコンをカスタマイズできます。

```tsx
// カスタムアイコンの設定例
const faqItems = [
  {
    id: "faq-1",
    question: "サービスの開始方法は？",
    answer: "アカウント登録後、サブスクリプションプランを選択すると...",
    questionIcon: <FaQuestionCircle className="text-primary" />,
    answerIcon: <FaInfoCircle className="text-primary" />,
  },
];
```

### 5. アクセシビリティ対応

WAI-ARIA のベストプラクティスに従い、スクリーンリーダーのユーザーにも適切な情報が伝わるように設計されています。

```tsx
<FAQ
  items={faqItems}
  ariaLabel="製品に関するよくある質問"
  heading={<h3 id="faq-heading">製品FAQセクション</h3>}
/>
```

## 設計思想

### サーバーコンポーネントとしての実装

`FAQ` コンポーネントはNext.jsのサーバーコンポーネントとして実装されています。これにより、検索やフィルタリングの処理をサーバーサイドで行い、クライアントへのJavaScriptの転送量を削減しています。また、初期表示のパフォーマンスが向上し、SEOにも有利です。

```tsx
// サーバーコンポーネントでの検索・フィルタリング処理
let filteredItems = items;

if (search) {
  const searchLower = search.toLowerCase();
  filteredItems = filteredItems.filter(
    (item) =>
      item.question.toLowerCase().includes(searchLower) ||
      (typeof item.answer === "string" &&
        item.answer.toLowerCase().includes(searchLower)),
  );
}
```

### コンテナクエリによるモジュラー設計

コンポーネントがどこに配置されても適切に表示されるよう、コンテナクエリを活用したモジュラー設計を採用しています。これにより、同じコンポーネントをサイドバーや全幅セクションなど、様々な幅のコンテナで再利用できます。

```tsx
// コンテナクエリの適用例
<div className="w-full @container">
  {/* タグエリア - コンテナサイズに応じて表示/非表示 */}
  {item.tags && item.tags.length > 0 && (
    <div className="hidden @md:flex flex-wrap gap-1 mr-2">
      {item.tags.map((tag) => (
        <FAQTagBadge key={`${item.id}-tag-${tag.label}`} tag={tag} />
      ))}
    </div>
  )}
</div>
```

### 拡張性を考慮した型設計

型定義を分離し、コンポーネントの拡張性を高めています。これにより、将来的な機能追加や変更に柔軟に対応できます。

```tsx
// FAQItemの型定義
export type FAQItem = {
  id: string;
  question: string;
  answer: ReactNode;
  questionIcon?: ReactNode;
  answerIcon?: ReactNode;
  tags?: FAQTag[];
};

// スタイルカスタマイズのための型定義
export type FAQClassNames = {
  container?: string;
  item?: string;
  question?: string;
  questionIcon?: string;
  answer?: string;
  answerIcon?: string;
  tag?: string;
};
```

## 実装の工夫

### 1. コンテナサイズに応じたタグの表示位置変更

コンテナのサイズに応じてタグの表示位置を変更することで、限られたスペースを効率的に活用しています。大きなコンテナでは質問横にタグを表示し、小さなコンテナでは回答の下部にタグを表示します。

```tsx
{/* 通常表示（大きいコンテナ向け） */}
{item.tags && item.tags.length > 0 && (
  <div className="hidden @md:flex flex-wrap gap-1 mr-2">
    {item.tags.map((tag) => (
      <FAQTagBadge key={`${item.id}-tag-${tag.label}`} tag={tag} />
    ))}
  </div>
)}

{/* モバイル表示（小さいコンテナ向け） */}
{item.tags && item.tags.length > 0 && (
  <div className="flex @md:hidden flex-wrap gap-1 mt-2 mb-1">
    {item.tags.map((tag) => (
      <FAQTagBadge key={`${item.id}-mobile-tag-${tag.label}`} tag={tag} />
    ))}
  </div>
)}
```

### 2. アニメーション制御

アニメーションを無効化するオプションを提供し、必要に応じてアコーディオンの展開/折りたたみアニメーションを制御できるようにしています。これは、アニメーションが好ましくない場合や、パフォーマンスを優先する場合に役立ちます。

```tsx
<AccordionContent
  className={cn(
    animate ? "" : "!transition-none !animate-none",
    classNames?.answer,
  )}
>
  {/* 回答内容 */}
</AccordionContent>
```

### 3. HTMLコンテンツのサポート

回答部分にはReactNodeを受け入れることで、単純なテキストだけでなく、リスト、リンク、画像などのリッチなHTMLコンテンツを表示できるようにしています。

```tsx
// リッチコンテンツの例
{
  id: "faq-rich",
  question: "料金プランについて教えてください",
  answer: (
    <div>
      <p className="mb-2">料金プランは以下の3種類があります：</p>
      <ul className="list-disc ml-6 mb-2 space-y-1">
        <li><strong>スタンダード</strong>: 月額1,000円（税込）</li>
        <li><strong>プレミアム</strong>: 月額2,500円（税込）</li>
        <li><strong>エンタープライズ</strong>: カスタム価格</li>
      </ul>
      <p>詳細は料金ページをご覧ください。</p>
    </div>
  ),
  tags: [{ label: "料金", className: "bg-amber-100 text-amber-800" }],
}
```

### 4. 結果がない場合の適切なフィードバック

検索やフィルタリングの結果、該当する質問が見つからない場合に適切なメッセージを表示します。ユーザーは検索条件を変更するなど、次のアクションを取ることができます。

```tsx
// 結果がない場合の処理
if (filteredItems.length === 0) {
  return (
    <div className={cn("w-full py-4", classNames?.container)} aria-label={ariaLabel}>
      {heading && <div className="mb-4">{heading}</div>}
      <p className="text-muted-foreground">
        該当する質問が見つかりませんでした。
      </p>
    </div>
  );
}
```

## 使用例

### 基本的な使用方法

```tsx
// 基本的なFAQ
<FAQ
  items={faqItems}
  heading={<h3 className="text-xl font-bold">よくあるご質問</h3>}
/>
```

### カスタムスタイルの適用

```tsx
// カスタムスタイルを適用したFAQ
<FAQ
  items={faqItems}
  heading={<h3 className="text-xl font-bold text-primary">よくあるご質問</h3>}
  classNames={{
    container: "bg-card/50 p-6 rounded-lg",
    item: "border-primary/10 shadow-sm",
    question: "font-medium bg-primary/5",
    answer: "prose prose-sm max-w-none",
  }}
/>
```

### 検索とフィルタリング

```tsx
// 検索結果を表示
<FAQ items={faqItems} search="返品" />

// タグでフィルタリング
<FAQ items={faqItems} tagFilter={["料金"]} />
```

### アイコンのカスタマイズ

```tsx
// アイコンをカスタマイズしたFAQ項目
const customIconFaqItems = [
  {
    id: "faq-icon-1",
    question: "この商品のサイズ展開は？",
    answer: "S、M、L、XLの4サイズをご用意しています。",
    questionIcon: <FaTshirt className="text-blue-500" />,
    answerIcon: <FaRuler className="text-blue-500" />,
    tags: [{ label: "商品", className: "bg-blue-100 text-blue-800" }],
  },
  // その他の項目...
];

<FAQ items={customIconFaqItems} />
```

### アニメーション無効

```tsx
// アニメーションを無効化したFAQ
<FAQ
  items={faqItems}
  animate={false}
  heading={<h3 className="text-xl font-bold">アニメーション無効</h3>}
/>
```

### アクセシビリティに配慮した実装

```tsx
// アクセシビリティに配慮したFAQ
<FAQ
  items={faqItems}
  ariaLabel="製品に関するよくある質問"
  heading={<h3 className="text-xl font-bold" id="faq-heading">製品に関するよくある質問</h3>}
/>
```

## 今後の改良アイデア

### 1. クライアントサイド検索機能の追加

現在の検索機能はサーバーコンポーネントで実装されていますが、リアルタイムでのフィルタリングを行うためにクライアントサイドでの検索機能を追加することも検討できます。これにより、ユーザーがキーワードを入力するたびに即座に結果が更新されるようになります。

```tsx
'use client';

// リアルタイム検索コンポーネント例
function ClientSideFAQSearch({ items }) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredItems = useMemo(() => {
    if (!searchTerm) return items;
    // 検索ロジック
  }, [items, searchTerm]);
  
  return (
    <>
      <input 
        type="search" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="キーワードで検索"
      />
      <FAQ items={filteredItems} />
    </>
  );
}
```

### 2. URLパラメータとの連携

検索条件やフィルタリング条件をURLパラメータと連携させることで、特定の検索結果やフィルタリング結果を直接共有できるようにします。また、ブラウザの戻る/進むボタンで検索履歴を操作できるようになります。

```tsx
// URL連携の例
function FAQWithURLParams({ items }) {
  const { query } = useRouter();
  
  return (
    <FAQ 
      items={items}
      search={query.search}
      tagFilter={query.tags?.split(',')}
    />
  );
}
```

### 3. タグのクリックによるフィルタリング

タグをクリックすることで、そのタグに関連する質問だけにフィルタリングする機能を追加します。これにより、ユーザーは直感的に関連する質問を探すことができます。

### 4. アナリティクス統合

FAQ項目の開閉状況を追跡し、どの質問が最も閲覧されているかを分析できるようにします。これによって、ユーザーが最も気にしている点を把握し、サイトやサービスの改善に役立てることができます。

### 5. ソート機能

質問を人気順やカテゴリ順にソートする機能を追加します。特にFAQ項目が多い場合に、ユーザーが必要な情報を素早く見つける助けになります。

### 6. スクロールアニメーション

長いFAQリストでアコーディオンを開いた際に、開いた項目が自動的にビューポート内に収まるようスクロールする機能を追加します。特にモバイルデバイスでのユーザビリティが向上します。

## まとめ

FAQコンポーネントは、Tailwind CSS v4のコンテナクエリを活用した高度なレスポンシブ設計と、豊富なカスタマイズオプションを備えたUIコンポーネントです。サーバーコンポーネントとして実装されており、検索・フィルタリング機能やアクセシビリティに配慮した設計など、多くの魅力的な特徴を持っています。

コンテナクエリを採用することで、ビューポートサイズではなく親コンテナのサイズに基づいたレスポンシブデザインが実現され、どこにでも配置できる真の意味でのモジュラーコンポーネントになっています。また、拡張性を考慮した型設計により、将来的な機能追加や変更にも柔軟に対応できます。

今後も、クライアントサイド検索、URLパラメータ連携、タグクリックフィルタリングなど、さらなる機能強化を検討していきます。
