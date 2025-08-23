# 📚 プロジェクトドキュメント

Next.js ボイラープレートプロジェクトの統合ドキュメントです。reference/ ディレクトリから完全統合し、効率的な情報検索と保守性を実現した包括的なドキュメント構造です。

## 📁 ドキュメント構造

### 🛠 [`development/`](./development/)
開発プロセスに関連するドキュメント群

#### [`plans/`](./development/plans/) - 開発計画書
- [NEXT_STEPS_PLAN.md](./development/plans/NEXT_STEPS_PLAN.md) - 次のステップ計画
- [RECOMMENDED_ACTION_PLAN.md](./development/plans/RECOMMENDED_ACTION_PLAN.md) - 推奨アクション計画
- [GitHub Actions E2Eテスト高速化計画.md](./development/plans/GitHub%20Actions%20E2E%E3%83%86%E3%82%B9%E3%83%88%E9%AB%98%E9%80%9F%E5%8C%96%E8%A8%88%E7%94%BB.md) - E2Eテスト最適化計画

#### [`reports/`](./development/reports/) - 開発レポート・分析結果・ログ
- [2025-08-dev.md](./development/reports/2025-08-dev.md) - 2025年8月開発総括レポート ⭐ 最新
- [20250807_01.md](./development/reports/20250807_01.md) - 開発レポート (2025/08/07)
- [20250814_refactoring_summary.md](./development/reports/20250814_refactoring_summary.md) - リファクタリング要約
- [npm-update-report-20250815.md](./development/reports/npm-update-report-20250815.md) - npm更新レポート
- [2025-06-25_01.md](./development/reports/2025-06-25_01.md) - 開発ログ (2025/06/25)
- [2025-07-04_particle-background-refactoring.md](./development/reports/2025-07-04_particle-background-refactoring.md) - パーティクルリファクタリングログ
- [lint_detailed_report.txt](./development/reports/lint_detailed_report.txt) - 詳細リントレポート
- [lint_full_report.txt](./development/reports/lint_full_report.txt) - 完全リントレポート

#### [`tasks/`](./development/tasks/) - タスク管理・チェックリスト
- [code-quality.md](./development/tasks/code-quality.md) - コード品質管理
- [deployment.md](./development/tasks/deployment.md) - デプロイタスク
- [development-workflow.md](./development/tasks/development-workflow.md) - 開発ワークフロー
- [maintenance.md](./development/tasks/maintenance.md) - メンテナンスタスク
- [testing-strategy.md](./development/tasks/testing-strategy.md) - テスト戦略
- [todo-20250814-0632.md](./development/tasks/todo-20250814-0632.md) - TODOリスト (2025/08/14)
- [チェックリストの効果的な活用方法.md](./development/tasks/%E3%83%81%E3%82%A7%E3%83%83%E3%82%AF%E3%83%AA%E3%82%B9%E3%83%88%E3%81%AE%E5%8A%B9%E6%9E%9C%E7%9A%84%E3%81%AA%E6%B4%BB%E7%94%A8%E6%96%B9%E6%B3%95.md) - チェックリスト活用ガイド

#### [`archive/`](./development/archive/) - アーカイブ・履歴
- [footer 元.md](./development/archive/footer%20%E5%85%83.md) - フッター旧版
- [作業用コンポーネント雛形.md](./development/archive/%E4%BD%9C%E6%A5%AD%E7%94%A8%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E9%9B%9B%E5%BD%A2.md) - 作業用テンプレート（旧版）

### 📖 [`guides/`](./guides/)
実装ガイド・マニュアル

#### [`authentication/`](./guides/authentication/) - 認証システム 🔐
- [authentication-system.md](./guides/authentication/authentication-system.md) - 認証システム基本ガイド
- [Next.js 15 に Auth.js (NextAuth v5) で認証システムを実装.md](./guides/authentication/Next.js%2015%20%E3%81%AB%20Auth.js%20%28NextAuth%20v5%29%20%E3%81%A7%E8%AA%8D%E8%A8%BC%E3%82%B7%E3%82%B9%E3%83%86%E3%83%A0%E3%82%92%E5%AE%9F%E8%A3%85.md) - Auth.js v5詳細実装ガイド
- [05_認証.md](./guides/authentication/05_%E8%AA%8D%E8%A8%BC.md) - 認証実装リファレンス

#### [`deployment/`](./guides/deployment/) - デプロイメント 🚀
- [deploy-01-jamstack-db-selection-guide.md](./guides/deployment/deploy-01-jamstack-db-selection-guide.md) - JAMstackデータベース選択ガイド
- [deploy-02-neon-cloudflare-authjs-architecture.md](./guides/deployment/deploy-02-neon-cloudflare-authjs-architecture.md) - Neon+Cloudflare+Auth.jsアーキテクチャ
- [deploy-03-cloudflare-nextjs15-practical-guide.md](./guides/deployment/deploy-03-cloudflare-nextjs15-practical-guide.md) - Cloudflare Pages Next.js 15実践ガイド
- [deploy-04-cloudflare-image-optimization.md](./guides/deployment/deploy-04-cloudflare-image-optimization.md) - Cloudflare画像最適化
- [deploy-05-api-routes-edge-functions.md](./guides/deployment/deploy-05-api-routes-edge-functions.md) - APIルート・エッジファンクション

#### [`components/`](./guides/components/) - UIコンポーネント 🎨
- [animated-item-list.md](./guides/components/animated-item-list.md) - アニメーションアイテムリスト
- [breadcrumb.md](./guides/components/breadcrumb.md) - パンくずリスト
- [enhanced-tabs.md](./guides/components/enhanced-tabs.md) - 拡張タブコンポーネント
- [Container.md](./guides/components/Container.md) - コンテナコンポーネント
- [PageHeader.md](./guides/components/PageHeader.md) - ページヘッダー
- [faq.md](./guides/components/faq.md) - FAQコンポーネント
- [gallery.md](./guides/components/gallery.md) - ギャラリーコンポーネント
- [table.md](./guides/components/table.md) - テーブルコンポーネント

#### [`hooks/`](./guides/hooks/) - カスタムフック 🪝
- [useScroll-スクロール検出フック.md](./guides/hooks/useScroll-%E3%82%B9%E3%82%AF%E3%83%AD%E3%83%BC%E3%83%AB%E6%A4%9C%E5%87%BA%E3%83%95%E3%83%83%E3%82%AF.md) - スクロール検出カスタムフック

#### [`migration/`](./guides/migration/) - マイグレーション 🔄
- [Tailwind CSS v3 to v4 Migration Guide 1.md](./guides/migration/Tailwind%20CSS%20v3%20to%20v4%20Migration%20Guide%201.md) - Tailwind CSS v4移行ガイド (Part 1)
- [Tailwind CSS v3 to v4 Migration Guide 2.md](./guides/migration/Tailwind%20CSS%20v3%20to%20v4%20Migration%20Guide%202.md) - Tailwind CSS v4移行ガイド (Part 2)
- [Zod4へのアップデート.md](./guides/migration/Zod4%E3%81%B8%E3%81%AE%E3%82%A2%E3%83%83%E3%83%97%E3%83%87%E3%83%BC%E3%83%88.md) - Zod v4アップデートガイド

#### [`tips/`](./guides/tips/) - 実装Tips 💡
- [CVA.md](./guides/tips/CVA.md) - Class Variance Authority活用ガイド
- [04_処理を分岐させる際のTips.md](./guides/tips/04_%E5%87%A6%E7%90%86%E3%82%92%E5%88%86%E5%B2%90%E3%81%95%E3%81%9B%E3%82%8B%E9%9A%9B%E3%81%AETips.md) - 処理分岐最適化Tips
- [サーバーコンポーネントでのレイアウトシフト回避戦略.md](./guides/tips/%E3%82%B5%E3%83%BC%E3%83%90%E3%83%BC%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%A7%E3%81%AE%E3%83%AC%E3%82%A4%E3%82%A2%E3%82%A6%E3%83%88%E3%82%B7%E3%83%95%E3%83%88%E5%9B%9E%E9%81%BF%E6%88%A6%E7%95%A5.md) - レイアウトシフト回避戦略

#### その他のガイド
- [flowing-comments-guide.md](./guides/flowing-comments-guide.md) - フローイングコメント実装ガイド
- [profile-data-storage-guide.md](./guides/profile-data-storage-guide.md) - プロフィールデータ保存ガイド
- [profile.md](./guides/profile.md) - プロフィール機能ガイド
- [server-actions-implementation-guide.md](./guides/server-actions-implementation-guide.md) - Server Actions実装ガイド
- [Playwriteの導入.md](./guides/Playwrite%E3%81%AE%E5%B0%8E%E5%85%A5.md) - Playwright導入ガイド
- [ui-components.md](./guides/ui-components.md) - UIコンポーネント概要
- [ダークモードについて.md](./guides/%E3%83%80%E3%83%BC%E3%82%AF%E3%83%A2%E3%83%BC%E3%83%89%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6.md) - ダークモード実装ガイド

### ⚙️ [`operations/`](./operations/)
運用・DevOps関連ドキュメント

#### [`performance/`](./operations/performance/) - パフォーマンス管理
- [PERFORMANCE_METRICS.md](./operations/performance/PERFORMANCE_METRICS.md) - パフォーマンスメトリクス技術仕様書
- [PERFORMANCE_REQUIREMENTS.md](./operations/performance/PERFORMANCE_REQUIREMENTS.md) - パフォーマンス要件定義書

### 💡 [`examples/`](./examples/)
サンプルコード・実装例

#### [`components/`](./examples/components/) - コンポーネントサンプル
- [class-variance-authority.tsx](./examples/components/class-variance-authority.tsx) - CVA使用例
- [immer.tsx](./examples/components/immer.tsx) - Immer状態管理例

#### [`forms/`](./examples/forms/) - フォームサンプル
- [form-validation.tsx](./examples/forms/form-validation.tsx) - フォームバリデーション実装例

#### [`testing/`](./examples/testing/) - テストサンプル
- [test-basic-component.test.tsx](./examples/testing/test-basic-component.test.tsx) - 基本コンポーネントテスト例
- [test-form-events.test.tsx](./examples/testing/test-form-events.test.tsx) - フォームイベントテスト例

### 📋 [`reference/`](./reference/)
技術仕様・リファレンス文書

#### [`specifications/`](./reference/specifications/) - 技術仕様書
- [DATABASE_ER.md](./reference/specifications/DATABASE_ER.md) - データベースER図
- [SCREEN_FLOW.md](./reference/specifications/SCREEN_FLOW.md) - 画面フロー仕様
- [SPECIFICATION.md](./reference/specifications/SPECIFICATION.md) - システム仕様書

#### [`features/`](./reference/features/) - 機能リスト・計画
- [00_実装済みの機能.md](./reference/features/00_%E5%AE%9F%E8%A3%85%E6%B8%88%E3%81%BF%E3%81%AE%E6%A9%9F%E8%83%BD.md) - 実装済み機能一覧
- [01_未実装の機能.md](./reference/features/01_%E6%9C%AA%E5%AE%9F%E8%A3%85%E3%81%AE%E6%A9%9F%E8%83%BD.md) - 未実装機能一覧
- [01_UIコンポーネント一覧.md](./reference/features/01_UI%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E4%B8%80%E8%A6%A7.md) - UIコンポーネント機能一覧
- [02_Google Analytics 4 の実装手順.md](./reference/features/02_Google%20Analytics%204%20%E3%81%AE%E5%AE%9F%E8%A3%85%E6%89%8B%E9%A0%86.md) - GA4実装計画
- [03_SEO最適化.md](./reference/features/03_SEO%E6%9C%80%E9%81%A9%E5%8C%96.md) - SEO最適化計画

#### [`business/`](./reference/business/) - ビジネス関連文書
- [事業コンセプト・メッセージ.md](./reference/business/%E4%BA%8B%E6%A5%AD%E3%82%B3%E3%83%B3%E3%82%BB%E3%83%97%E3%83%88%E3%83%BB%E3%83%A1%E3%83%83%E3%82%BB%E3%83%BC%E3%82%B8.md) - 事業コンセプト
- [トップページ.md](./reference/business/%E3%83%88%E3%83%83%E3%83%97%E3%83%9A%E3%83%BC%E3%82%B8.md) - トップページ構成案
- [プロフィール.md](./reference/business/%E3%83%97%E3%83%AD%E3%83%95%E3%82%A3%E3%83%BC%E3%83%AB.md) - プロフィールページ構成案

## 🔍 ドキュメント検索ガイド

### 目的別検索
| 目的 | 検索場所 | 例 |
|------|----------|-----|
| **新機能の実装方法** | `guides/` | 認証システム、プロフィール機能 |
| **コンポーネント仕様** | `guides/components/` | タブ、パンくず、アニメーション |
| **パフォーマンス改善** | `operations/performance/` | メトリクス、要件、最適化 |
| **開発計画の確認** | `development/plans/` | 次のステップ、計画書 |
| **問題調査・分析** | `development/reports/` | バグレポート、リファクタリング |
| **タスク管理** | `development/tasks/` | TODO、チェックリスト、ワークフロー |

### 役割別推奨ドキュメント

#### 🆕 新規参加者
1. [README.md](../README.md) - プロジェクト概要
2. [authentication-system.md](./guides/authentication-system.md) - 認証システム理解
3. [development-workflow.md](./development/tasks/development-workflow.md) - 開発フロー理解

#### 👩‍💻 開発者
- `guides/` - 実装ガイド全般
- `development/tasks/` - 開発タスク・チェックリスト
- `operations/performance/` - パフォーマンス要件

#### 🔧 DevOps・インフラ
- `operations/` - 運用関連全般
- `development/reports/` - システム分析レポート
- [deployment.md](./development/tasks/deployment.md) - デプロイタスク

#### 📊 プロジェクトマネージャー
- `development/plans/` - プロジェクト計画
- `development/reports/` - 進捗レポート
- `development/tasks/` - タスク状況

## 📝 ドキュメント管理ルール

### 命名規則
- **kebab-case.md** を使用
- **動詞で始める** (例: `setup-database.md`)
- **目的を明確に** (例: `authentication-system.md`)

### 更新ルール
- **機能実装時**: 対応するガイドも同時更新
- **バグ修正時**: 問題報告書を`development/reports/`に追加
- **計画変更時**: `development/plans/`を更新

### ファイル配置ルール
| 種類 | 配置場所 | 例 |
|------|----------|-----|
| **実装手順・方法** | `guides/` | システム構築、機能実装 |
| **UIコンポーネント** | `guides/components/` | コンポーネント仕様・使用法 |
| **運用・監視** | `operations/` | パフォーマンス、セキュリティ |
| **開発計画** | `development/plans/` | ロードマップ、計画書 |
| **分析・レポート** | `development/reports/` | 調査結果、改善提案 |
| **作業管理** | `development/tasks/` | TODO、チェックリスト |

## 🤝 貢献ガイド

ドキュメントの追加・更新を行う際は：

1. **適切なカテゴリを選択**
2. **命名規則に従う**
3. **このREADMEを更新** (新規ファイル追加時)
4. **関連リンクを確認・更新**

---

## 🔗 関連リンク

- [プロジェクト概要](../README.md)
- [CLAUDE.md](../CLAUDE.md) - AI開発支援設定
- [貢献ガイド](../CONTRIBUTING.md)
- [変更履歴](../CHANGELOG.md)

---

📅 **最終更新**: 2025年8月23日 | 📝 **バージョン**: 1.1.0