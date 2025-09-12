# 開発ワークフロー・チェックリスト

## 概要

Next.js 15 (App Router) + React 19 + TypeScript環境での効率的で高品質な開発ワークフローを確立するためのチェックリストです。React 19 Compilerやserver components、Auth.js v5などの最新技術を活用し、保守性とパフォーマンスを両立した開発プロセスを実現します。

## 🎯 目標

- **品質**: TypeScript strict mode + Biome linterによる一貫したコード品質
- **効率**: React 19 Compilerの自動最適化を活用した開発速度向上
- **安全性**: 段階的実装とテスト駆動開発による堅牢性確保
- **保守性**: 明確な設計原則と文書化による長期メンテナンス性

---

## Phase 1: 開発準備 (5-10分)

### 💻 開発環境の確認
- [ ] Node.js バージョンが18.x以上であることを確認
- [ ] `npm install`でdependenciesが最新状態
- [ ] VSCodeの推奨拡張機能がインストール済み
  - [ ] Biome (公式)
  - [ ] TypeScript Importer
  - [ ] Tailwind CSS IntelliSense
  - [ ] Next.js snippets

### 🔍 プロジェクト状態の確認
- [ ] `npm run lint`でlintエラーなし
- [ ] `npm run build`でビルド成功
- [ ] `npm test`で既存テストがすべてパス
- [ ] Git working directoryがクリーン状態

### 📋 タスクの明確化
- [ ] 実装する機能の要件を明確に定義
- [ ] 既存コンポーネントとの整合性を確認
- [ ] アクセシビリティ要件 (WCAG 2.1 AA) を考慮
- [ ] パフォーマンス目標を設定（LCP < 2.5s、CLS < 0.1）

---

## Phase 2: 設計・実装 (主要作業時間)

### 🎨 設計原則の遵守
- [ ] **Server First**: 可能な限りServer Componentsを使用
- [ ] **Progressive Enhancement**: 基本機能からリッチな体験へ段階的構築
- [ ] **Atomic Design**: 再利用可能なコンポーネント設計
- [ ] **Accessibility First**: 実装初期段階からWCAG準拠

### 📂 ファイル構造の確認
- [ ] App Routerの規約に従ったディレクトリ構造
  - [ ] `app/(site)/` - 公開ページ
  - [ ] `app/(auth)/` - 認証ページ  
  - [ ] `app/(app)/` - 認証保護されたエリア
- [ ] 共通コンポーネントは`src/components/`に配置
- [ ] カスタムhooksは`src/hooks/`に配置
- [ ] 型定義は`src/types/`に配置
- [ ] **データレイヤー**: `src/lib/data/`に配置 (NEW)
  - [ ] コンテンツデータ（JSX対応）: `.tsx` 拡張子
  - [ ] CVA バリアント定義: `.ts` 拡張子
  - [ ] ヘルパー関数との明確な分離

### 🔧 実装時のベストプラクティス
- [ ] **TypeScript**: すべての関数とコンポーネントに型注釈
  - [ ] `verbatimModuleSyntax: true` - 型のみインポート: `import type { ReactNode }`
  - [ ] ES2022 target でのモダン JavaScript 活用
- [ ] **Server/Client Components**: 適切な使い分け
  ```typescript
  // Client Componentの場合のみ
  'use client'
  
  // Server Componentは何も記載しない（デフォルト）
  ```
- [ ] **データレイヤー分離**: コンポーネントの肥大化防止 (NEW)
  ```typescript
  // ❌ 大きすぎるコンポーネント (300+ lines)
  export function LargeComponent() {
    // データ定義、バリアント、レンダリング全て含む
  }
  
  // ✅ データレイヤー分離パターン
  // 1. データ定義: /src/lib/data/component-data.tsx
  export const componentData = [...];
  
  // 2. バリアント定義: /src/lib/data/component-variants.ts  
  export const componentVariants = cva(...);
  
  // 3. メインコンポーネント: 依存関係管理のみ (50-100 lines)
  export function Component() {
    return componentData.map(item => <ItemComponent key={item.id} item={item} />);
  }
  
  // 4. 個別コンポーネント: 具体的レンダリング (100-200 lines)
  export function ItemComponent({ item }: Props) { ... }
  ```
- [ ] **Error Boundaries**: 適切なエラー処理の実装
- [ ] **Suspense**: データフェッチ箇所での活用
- [ ] **Streaming**: 可能な箇所でのストリーミング対応

### 🎯 React 19 最適化の活用
- [ ] **React Compiler**: 手動のmemo/useCallbackを削除
  ```typescript
  // ❌ React 19では不要
  const MemoizedComponent = memo(Component);
  const callback = useCallback(() => {}, []);
  
  // ✅ React Compilerが自動最適化
  const Component = () => { ... };
  ```
- [ ] **新しいフック**: use() hookの適切な活用
- [ ] **Concurrent Features**: Suspenseとストリーミングの活用

### 📈 パフォーマンス最適化パターン (NEW)
- [ ] **コンポーネント分離によるサイズ削減**
  - [ ] 300+ lines のコンポーネントは分離候補
  - [ ] 目標: 50-80% のコード削減 (実績: services: -83%, speech-bubble: -56%)
- [ ] **バンドルサイズ最適化**
  - [ ] Server Component への変換で JavaScript 削減
  - [ ] 不要な "use client" の削除
  - [ ] 目標: 30%+ の bundle size 削減 (実績: Homepage -33%)
- [ ] **Route Segment Config によるキャッシュ最適化**
  ```typescript
  // 静的コンテンツ
  export const revalidate = 7200; // 2時間
  
  // 動的コンテンツ  
  export const revalidate = 3600; // 1時間
  ```

### 🔐 セキュリティ考慮事項
- [ ] **Auth.js v5**: セッション管理の適切な実装
- [ ] **CSRF Protection**: middlewareでの保護確認
- [ ] **Input Validation**: Zodスキーマでのバリデーション
- [ ] **XSS Prevention**: dangerouslySetInnerHTMLの最小利用

### ♿ アクセシビリティ実装
- [ ] **セマンティックHTML**: 適切なHTML要素の使用
- [ ] **ARIA属性**: screen readerサポート
- [ ] **キーボードナビゲーション**: すべてのインタラクティブ要素対応
- [ ] **フォーカス管理**: 適切なfocus/blur処理
- [ ] **色のコントラスト**: WCAG AA基準クリア（4.5:1以上）

---

## Phase 3: 品質保証 (10-15分)

### 🧪 テスト実装
- [ ] **単体テスト**: Vitestでコンポーネントロジックをテスト
- [ ] **統合テスト**: ユーザーインタラクションをTesting Libraryでテスト
- [ ] **E2Eテスト**: 主要ユーザーフローをPlaywrightでテスト
- [ ] **アクセシビリティテスト**: axe-coreでの自動チェック

### 📊 パフォーマンス確認
- [ ] **Bundle分析**: 不要なimportの削除
- [ ] **画像最適化**: WebP/AVIF形式の活用
- [ ] **Code Splitting**: 動的importの適用
- [ ] **Web Vitals**: LCP、FID、CLSの測定

### 🔍 コード品質チェック
- [ ] **Linting**: `npm run lint`でエラーゼロ
- [ ] **Formatting**: Biomeによる統一フォーマット
- [ ] **Type Checking**: `tsc --noEmit`でエラーゼロ
- [ ] **Dead Code**: 未使用コードの削除

### 🔒 セキュリティ監査
- [ ] **依存関係**: `npm audit`で脆弱性チェック
- [ ] **環境変数**: 機密情報の適切な管理
- [ ] **CSP設定**: Content Security Policy の確認
- [ ] **HTTPSheaders**: セキュリティヘッダーの設定確認

---

## Phase 4: デプロイ準備 (5分)

### 📝 ドキュメント更新
- [ ] コンポーネントのJSDoc更新
- [ ] README.mdの機能説明追加
- [ ] 変更ログ (CHANGELOG.md) の更新
- [ ] API仕様書の更新（該当する場合）

### 🔄 Git操作
- [ ] **コミット**: [Conventional Commits](https://www.conventionalcommits.org/)形式
  ```
  feat(auth): Auth.js v5によるソーシャルログイン機能を追加
  fix(ui): モバイル環境でのナビゲーション表示不具合を修正
  docs(readme): デプロイ手順を更新
  ```
- [ ] **プッシュ前確認**: 最終テスト実行
- [ ] **プルリクエスト**: 適切なレビュアー指定

### 🚀 本番前チェック
- [ ] **環境変数**: 本番環境設定の確認
- [ ] **パフォーマンス**: Lighthouse scoreの確認
- [ ] **互換性**: 主要ブラウザでの動作確認
- [ ] **SEO**: meta tags、sitemap、robots.txtの確認

---

## 🎖️ 成功基準

### 必須要件 (Must Have)
- [ ] **ビルド成功率**: 100%
- [ ] **テスト成功率**: 100%
- [ ] **Lintエラー**: 0件
- [ ] **TypeScriptエラー**: 0件
- [ ] **アクセシビリティ**: WCAG 2.1 AA準拠

### 推奨目標 (Should Have)
- [ ] **Lighthouse Performance**: 90+
- [ ] **Lighthouse Accessibility**: 100
- [ ] **テストカバレッジ**: 80%以上
- [ ] **Bundle Size**: 前回比30%+削減 (実績に基づく新目標)
- [ ] **Component Size**: 大型コンポーネントの50%+削減 (300+ lines → 150- lines)
- [ ] **First Contentful Paint**: 1.5s以下

### 理想目標 (Could Have)
- [ ] **Lighthouse Best Practices**: 100
- [ ] **Core Web Vitals**: すべてGood
- [ ] **Carbon footprint**: 前回以下
- [ ] **Page Speed**: 95+

---

## ⚠️ リスク管理

### 高リスク事項
- **Next.js App Router**: 複雑なルーティングは段階的実装
- **React 19 Compiler**: 最適化の妥当性を性能測定で確認
- **Server Components**: クライアント状態が必要な場合の適切な境界設定

### 対策
- **段階的リリース**: フィーチャーフラグによる部分展開
- **ロールバック準備**: 前バージョンへの復旧手順明確化
- **監視強化**: エラーレート、パフォーマンス指標の継続監視

---

## 📚 参考資料

### 公式ドキュメント
- [Next.js 15 Documentation](https://nextjs.org/docs)
- [React 19 Migration Guide](https://react.dev/blog/2024/04/25/react-19)
- [Auth.js v5 Guide](https://authjs.dev/getting-started)
- [Tailwind CSS v4](https://tailwindcss.com/docs)

### 開発ツール
- [Biome Configuration](https://biomejs.dev/guides/getting-started/)
- [Vitest Testing](https://vitest.dev/guide/)
- [Playwright E2E](https://playwright.dev/docs/intro)

---

**最終更新**: 2025年8月14日  
**対象バージョン**: Next.js 15.3+, React 19.1+, Auth.js v5.0+