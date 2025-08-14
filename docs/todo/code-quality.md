# コード品質・チェックリスト

## 概要

Next.js 15 + React 19 + TypeScript環境での高品質なコード実装を保証するためのチェックリストです。Biome linter、アクセシビリティ準拠、セキュリティ対策、パフォーマンス最適化を含む包括的な品質基準を定めています。

## 🎯 目標

- **可読性**: 一貫したコードスタイルと明確な命名規則
- **保守性**: 変更に強く、拡張しやすい設計
- **安全性**: セキュリティ脆弱性の事前防止
- **性能**: 最適化されたパフォーマンス
- **包摂性**: すべてのユーザーがアクセス可能なUI

---

## Phase 1: TypeScript品質基準 (必須)

### 📘 型安全性の確保
- [ ] **strict mode**: tsconfig.jsonで有効化済み
- [ ] **型注釈**: すべての関数パラメータと戻り値に型定義
- [ ] **型エクスポート**: `import type`と`export type`の適切な使用
  ```typescript
  // ✅ 推奨
  import type { NextConfig } from "next";
  export type { UserSession } from "./types";
  
  // ❌ 非推奨
  import { NextConfig } from "next";
  export { UserSession } from "./types";
  ```
- [ ] **Never any**: `any`型の使用禁止（外部ライブラリを除く）
- [ ] **Union Types**: 適切な判別可能ユニオン型の使用

### 🏗️ インターフェース設計
- [ ] **一貫した命名**: PascalCaseでインターフェース定義
- [ ] **継承の活用**: 共通プロパティの再利用
- [ ] **Generic制約**: 型パラメータの適切な制約
- [ ] **Index Signatures**: 動的プロパティの型安全な定義

### 🔧 関数とコンポーネント
- [ ] **関数型コンポーネント**: クラスコンポーネントの使用禁止
- [ ] **Props型定義**: すべてのコンポーネントで明示的型定義
  ```typescript
  interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary';
    onClick?: () => void;
  }
  
  const Button = ({ children, variant = 'primary', onClick }: ButtonProps) => {
    // ...
  };
  ```
- [ ] **戻り値型**: 複雑な関数の明示的な戻り値型指定

---

## Phase 2: React/Next.js ベストプラクティス

### ⚙️ React 19 最適化活用
- [ ] **React Compiler**: 手動最適化（memo、useCallback）の削除
- [ ] **Server Components**: 可能な限りServer Component使用
- [ ] **Client Components**: 'use client'は必要最小限
- [ ] **Suspense活用**: データフェッチでの適切な実装
- [ ] **Error Boundaries**: 適切なエラー境界の設定

### 🗂️ Next.js App Router準拠
- [ ] **ファイル規約**: layout.tsx、page.tsx、loading.tsx等の適切な配置
- [ ] **Dynamic Routes**: 型安全なパラメータ処理
- [ ] **Metadata API**: 静的・動的メタデータの適切な実装
- [ ] **Route Groups**: 論理的なディレクトリ構造
- [ ] **Parallel Routes**: 複雑なレイアウトでの活用

### 🎨 コンポーネント設計原則
- [ ] **単一責任**: 一つのコンポーネントは一つの責務
- [ ] **Prop drilling回避**: 深いネストでのContext活用
- [ ] **Compound Components**: 関連コンポーネントの適切なグループ化
- [ ] **Render Props**: 汎用性の高いロジック共有
- [ ] **Custom Hooks**: ビジネスロジックの分離

---

## Phase 3: アクセシビリティ (WCAG 2.1 AA準拠)

### 🎯 セマンティックHTML
- [ ] **適切な要素**: div/spanより意味のある要素を優先
- [ ] **見出し構造**: h1〜h6の論理的な階層
- [ ] **ランドマーク**: main、nav、aside、footerの使用
- [ ] **リスト構造**: ul、ol、dlの適切な使用

### ♿ ARIA属性とアクセシビリティ
- [ ] **role属性**: 必要な箇所での適切な指定
- [ ] **aria-label**: screen readerのための説明文
- [ ] **aria-describedby**: 詳細説明との関連付け
- [ ] **aria-expanded**: 展開可能要素の状態表示
- [ ] **live regions**: 動的コンテンツの通知

### ⌨️ キーボードナビゲーション
- [ ] **tab order**: 論理的なフォーカス順序
- [ ] **focus indicators**: 視覚的なフォーカス表示
- [ ] **escape handling**: モーダル等でのESCキー対応
- [ ] **arrow navigation**: 複雑なUI要素での矢印キー対応

### 🎨 色とコントラスト
- [ ] **コントラスト比**: WCAG AA基準（4.5:1）以上
- [ ] **色以外の情報**: 色だけに依存しない情報伝達
- [ ] **focus visible**: 十分な視認性のあるフォーカス表示
- [ ] **state indicators**: アクティブ・非アクティブ状態の明確化

---

## Phase 4: セキュリティ対策

### 🔐 入力検証とサニタイゼーション
- [ ] **Zod validation**: すべてのユーザー入力に対するスキーマ検証
- [ ] **XSS prevention**: dangerouslySetInnerHTMLの最小利用
- [ ] **SQL injection防止**: パラメータ化クエリの使用
- [ ] **Path traversal防止**: ファイル操作での適切な検証

### 🛡️ 認証・認可
- [ ] **Auth.js設定**: セキュアなセッション管理
- [ ] **JWT適切利用**: 機密情報をJWTに含めない
- [ ] **権限チェック**: ページ・API両方での認可確認
- [ ] **CSRF保護**: middlewareでの適切な実装

### 🔒 データ保護
- [ ] **環境変数**: 機密情報の適切な管理
- [ ] **HTTPS enforcing**: 本番環境でのHTTPS強制
- [ ] **Security Headers**: CSP、HSTS等の設定
- [ ] **依存関係監査**: 定期的なnpm auditの実行

---

## Phase 5: パフォーマンス最適化

### ⚡ Core Web Vitals
- [ ] **LCP**: 2.5秒以下（Largest Contentful Paint）
- [ ] **FID**: 100ms以下（First Input Delay）
- [ ] **CLS**: 0.1以下（Cumulative Layout Shift）
- [ ] **TTFB**: 600ms以下（Time to First Byte）

### 🖼️ 画像・アセット最適化
- [ ] **Next.js Image**: next/imageコンポーネントの使用
- [ ] **最適フォーマット**: WebP/AVIF形式での配信
- [ ] **Lazy Loading**: 画面外画像の遅延読み込み
- [ ] **適切なサイズ**: レスポンシブイメージの実装

### 📦 Bundle最適化
- [ ] **Code Splitting**: dynamic import()の活用
- [ ] **Tree Shaking**: 未使用コードの自動削除
- [ ] **Bundle分析**: webpack-bundle-analyzerでのサイズ確認
- [ ] **外部依存関係**: 重いライブラリの代替検討

---

## Phase 6: Biome Linter設定準拠

### 📏 コードスタイル
- [ ] **インデント**: タブ文字（幅2）で統一
- [ ] **行幅制限**: 80文字以内
- [ ] **引用符**: ダブルクォートで統一
- [ ] **セミコロン**: 必ず使用
- [ ] **末尾カンマ**: オブジェクト・配列で使用

### 🎯 コード品質ルール
- [ ] **useConst**: let→constの適切な使用
- [ ] **useImportType**: 型のみのimportでの明示
- [ ] **noUnusedTemplateLiteral**: 不要なテンプレートリテラル回避
- [ ] **useExponentiationOperator**: Math.pow()→**演算子
- [ ] **noParameterAssign**: パラメータの再代入禁止

### 🔍 セキュリティルール
- [ ] **noDangerouslySetInnerHtml**: XSS脆弱性の防止
- [ ] **適切なescape**: ユーザー入力の適切な処理

---

## 🎖️ 成功基準

### 必須要件 (Must Have)
- [ ] **TypeScript**: エラー・警告ゼロ
- [ ] **Biome Lint**: エラーゼロ
- [ ] **ビルド**: 成功率100%
- [ ] **アクセシビリティ**: WCAG 2.1 AA準拠
- [ ] **セキュリティ**: 既知の脆弱性ゼロ

### 推奨目標 (Should Have)
- [ ] **Lighthouse Accessibility**: 100点
- [ ] **Lighthouse Performance**: 90点以上
- [ ] **Bundle Size**: 前回比増加なし
- [ ] **依存関係**: 最新安定版使用
- [ ] **型カバレッジ**: 95%以上

### 理想目標 (Could Have)
- [ ] **Lighthouse Best Practices**: 100点
- [ ] **Core Web Vitals**: すべてGood評価
- [ ] **パフォーマンス予算**: 設定値内維持
- [ ] **A11y自動テスト**: axe-coreで問題ゼロ

---

## ⚠️ よくある問題と対策

### TypeScript関連
- **問題**: `any`型の多用
- **対策**: 段階的な型定義強化、外部ライブラリの型定義追加

### パフォーマンス関連
- **問題**: 不適切なre-render
- **対策**: React 19 Compilerに依存、profilerでの分析

### アクセシビリティ関連
- **問題**: フォーカス管理の不備
- **対策**: 既存のaccessibilityコンポーネント活用

### セキュリティ関連
- **問題**: XSS脆弱性
- **対策**: Zodでの入力検証、CSP設定強化

---

## 📚 参考資料

### 品質基準
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Best Practices](https://react.dev/learn/thinking-in-react)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)

### ツール・設定
- [Biome Configuration](https://biomejs.dev/reference/configuration/)
- [Next.js TypeScript](https://nextjs.org/docs/basic-features/typescript)
- [Web Vitals](https://web.dev/vitals/)

---

**最終更新**: 2025年8月14日  
**対象バージョン**: Next.js 15.3+, React 19.1+, TypeScript 5.0+, Biome 2.0+