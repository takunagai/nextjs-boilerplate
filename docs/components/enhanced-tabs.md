# Enhanced Tabs コンポーネント ドキュメント

> レスポンシブ対応で汎用性の高いタブ切り替えパネルコンポーネント

## 📋 目次

1. [概要](#概要)
2. [インストールと基本使用法](#インストールと基本使用法)
3. [API仕様](#api仕様)
4. [バリアント詳細](#バリアント詳細)
5. [使用例とパターン](#使用例とパターン)
6. [ベストプラクティス](#ベストプラクティス)
7. [アクセシビリティガイド](#アクセシビリティガイド)
8. [パフォーマンス考慮事項](#パフォーマンス考慮事項)
9. [カスタマイゼーション](#カスタマイゼーション)
10. [トラブルシューティング](#トラブルシューティング)
11. [技術的背景](#技術的背景)
12. [マイグレーションガイド](#マイグレーションガイド)

---

## 概要

Enhanced Tabs コンポーネントは、shadcn/ui をベースに拡張された高機能なタブシステムです。レスポンシブ対応、アクセシビリティ準拠、豊富なバリアントを提供し、現代的なWebアプリケーションに求められるあらゆるタブUIのニーズに対応します。

### 🎯 設計目標

- **レスポンシブファースト**: モバイルから4Kディスプレイまで対応
- **アクセシビリティ準拠**: WCAG 2.1 AA基準をクリア
- **高パフォーマンス**: React 19 Compiler対応、最適化済み
- **開発者体験**: 直感的なAPI、豊富な型サポート
- **カスタマイズ性**: CVAベースの柔軟なスタイリング

### ✨ 主要機能

- **4つのバリアント**: Default, Underline, Pills, Minimal
- **3つのサイズ**: Small (32px), Medium (36px), Large (40px)
- **方向切り替え**: 水平/垂直レイアウト
- **スクロール対応**: 多数タブのモバイル対応
- **アイコン対応**: React Icons との統合
- **制御可能**: 外部状態での完全制御
- **アニメーション**: スムーズなトランジション効果

---

## インストールと基本使用法

### 前提条件

```json
{
  "@radix-ui/react-tabs": "^1.0.4",
  "class-variance-authority": "^0.7.0",
  "react": "^19.0.0",
  "react-icons": "^5.0.0" 
}
```

### 基本的な使用法

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function BasicExample() {
  return (
    <Tabs defaultValue="tab1" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="tab1">タブ1</TabsTrigger>
        <TabsTrigger value="tab2">タブ2</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <div className="p-4">タブ1の内容</div>
      </TabsContent>
      <TabsContent value="tab2">
        <div className="p-4">タブ2の内容</div>
      </TabsContent>
    </Tabs>
  );
}
```

### アイコン付きタブ

```tsx
import { FaHome, FaUser, FaCog } from "react-icons/fa";

export default function IconTabsExample() {
  return (
    <Tabs defaultValue="home" className="w-full">
      <TabsList variant="pills" className="grid w-full grid-cols-3">
        <TabsTrigger value="home" variant="pills">
          <FaHome className="w-4 h-4 mr-2" />
          ホーム
        </TabsTrigger>
        <TabsTrigger value="profile" variant="pills">
          <FaUser className="w-4 h-4 mr-2" />
          プロフィール
        </TabsTrigger>
        <TabsTrigger value="settings" variant="pills">
          <FaCog className="w-4 h-4 mr-2" />
          設定
        </TabsTrigger>
      </TabsList>
      {/* TabsContent 省略 */}
    </Tabs>
  );
}
```

---

## API仕様

### Tabs

ルートコンテナコンポーネント。タブシステム全体を管理します。

```tsx
interface TabsProps {
  defaultValue?: string;           // 初期選択タブ
  value?: string;                  // 制御モード時の現在値
  onValueChange?: (value: string) => void; // 値変更時のコールバック
  className?: string;              // 追加CSSクラス
  orientation?: "horizontal" | "vertical"; // 方向（デフォルト: horizontal）
  dir?: "ltr" | "rtl";            // テキスト方向
  activationMode?: "automatic" | "manual"; // アクティベーションモード
}
```

### TabsList

タブトリガーのコンテナコンポーネント。

```tsx
interface TabsListProps {
  variant?: "default" | "underline" | "pills" | "minimal"; // スタイルバリアント
  size?: "sm" | "md" | "lg";      // サイズバリアント
  orientation?: "horizontal" | "vertical"; // 方向
  scrollable?: boolean;           // スクロール可能フラグ
  className?: string;             // 追加CSSクラス
}
```

**バリアント詳細:**

- `default`: 背景とシャドウ付きの標準スタイル
- `underline`: 下線で選択状態を表現
- `pills`: 丸みを帯びたボタン風スタイル  
- `minimal`: 最小限のスタイルでシンプル

**サイズ詳細:**

- `sm`: 高さ32px、テキスト12px、最小幅60px
- `md`: 高さ36px、テキスト14px、最小幅80px（デフォルト）
- `lg`: 高さ40px、テキスト16px、最小幅100px

### TabsTrigger

個別のタブボタンコンポーネント。

```tsx
interface TabsTriggerProps {
  value: string;                  // タブの一意識別子（必須）
  variant?: "default" | "underline" | "pills" | "minimal"; // スタイルバリアント
  size?: "sm" | "md" | "lg";      // サイズバリアント
  disabled?: boolean;             // 無効状態
  className?: string;             // 追加CSSクラス
  children: React.ReactNode;      // ボタン内容（テキスト、アイコンなど）
}
```

### TabsContent

タブコンテンツエリアコンポーネント。

```tsx
interface TabsContentProps {
  value: string;                  // 対応するタブの識別子（必須）
  variant?: "default" | "underline" | "pills" | "minimal"; // スタイルバリアント
  spacing?: "none" | "sm" | "md" | "lg"; // コンテンツ間隔
  className?: string;             // 追加CSSクラス
  forceMount?: boolean;           // 非アクティブでもマウント
  children: React.ReactNode;      // コンテンツ
}
```

---

## バリアント詳細

### Default バリアント

```tsx
<TabsList variant="default" size="md">
  <TabsTrigger value="tab1" variant="default">タブ1</TabsTrigger>
  <TabsTrigger value="tab2" variant="default">タブ2</TabsTrigger>
</TabsList>
```

**特徴:**
- 背景色: `bg-muted`
- ボーダー: `border border-border/20`  
- シャドウ: `shadow-sm`
- アクティブ時: `bg-background` + `shadow-sm`

**使用ケース:** 管理画面、設定パネル、フォーム切り替え

### Underline バリアント

```tsx
<TabsList variant="underline" size="md">
  <TabsTrigger value="tab1" variant="underline">タブ1</TabsTrigger>
  <TabsTrigger value="tab2" variant="underline">タブ2</TabsTrigger>
</TabsList>
```

**特徴:**
- 背景色: 透明
- ボーダー: 下線 `border-b-2`
- アクティブ時: `border-primary` + `bg-accent/20`

**使用ケース:** ナビゲーション、記事カテゴリ、商品情報タブ

### Pills バリアント

```tsx
<TabsList variant="pills" size="md">
  <TabsTrigger value="tab1" variant="pills">タブ1</TabsTrigger>
  <TabsTrigger value="tab2" variant="pills">タブ2</TabsTrigger>
</TabsList>
```

**特徴:**
- 形状: `rounded-full`
- 背景色: 透明 → アクティブ時 `bg-primary`
- テキスト色: アクティブ時 `text-primary-foreground`

**使用ケース:** フィルター、タグ選択、カテゴリ切り替え

### Minimal バリアント

```tsx
<TabsList variant="minimal" size="md">
  <TabsTrigger value="tab1" variant="minimal">タブ1</TabsTrigger>
  <TabsTrigger value="tab2" variant="minimal">タブ2</TabsTrigger>
</TabsList>
```

**特徴:**
- 背景色: 透明
- 最小限のスタイル
- アクティブ時: `bg-muted` + `font-semibold`

**使用ケース:** サイドバー、コンパクトUI、埋め込みタブ

---

## 使用例とパターン

### 🔄 制御されたタブ

外部状態でタブを管理する場合の実装パターン。

```tsx
import { useState } from "react";

export default function ControlledTabs() {
  const [activeTab, setActiveTab] = useState("overview");
  
  return (
    <div>
      {/* 現在のタブ表示 */}
      <div className="mb-4">
        <span>現在のタブ: {activeTab}</span>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList variant="underline">
          <TabsTrigger value="overview" variant="underline">概要</TabsTrigger>
          <TabsTrigger value="details" variant="underline">詳細</TabsTrigger>
          <TabsTrigger value="reviews" variant="underline">レビュー</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" variant="underline">
          <div className="p-6">概要コンテンツ</div>
        </TabsContent>
        <TabsContent value="details" variant="underline">
          <div className="p-6">詳細コンテンツ</div>
        </TabsContent>
        <TabsContent value="reviews" variant="underline">
          <div className="p-6">レビューコンテンツ</div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
```

### 📱 スクロール可能なタブ（モバイル対応）

多数のタブがある場合のレスポンシブ対応。

```tsx
const manyTabs = [
  { id: "tab1", label: "ダッシュボード", icon: FaHome },
  { id: "tab2", label: "分析", icon: FaChartBar },
  { id: "tab3", label: "ユーザー", icon: FaUser },
  { id: "tab4", label: "設定", icon: FaCog },
  { id: "tab5", label: "メッセージ", icon: FaEnvelope },
  { id: "tab6", label: "レポート", icon: FaFileAlt },
  { id: "tab7", label: "通知", icon: FaBell },
  { id: "tab8", label: "ヘルプ", icon: FaQuestionCircle },
];

export default function ScrollableTabs() {
  return (
    <Tabs defaultValue="tab1" className="w-full">
      <TabsList 
        variant="minimal" 
        scrollable={true}
        className="w-full justify-start"
      >
        {manyTabs.map((tab) => (
          <TabsTrigger 
            key={tab.id}
            value={tab.id} 
            variant="minimal"
            className="flex-shrink-0"
          >
            <tab.icon className="w-4 h-4 mr-2" />
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {manyTabs.map((tab) => (
        <TabsContent key={tab.id} value={tab.id}>
          <div className="p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <tab.icon className="w-5 h-5 mr-2" />
              {tab.label}
            </h3>
            <p className="text-gray-600">{tab.label}の詳細内容です。</p>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
```

### 🔲 縦方向タブ（設定パネル風）

サイドバー風の縦方向レイアウト。

```tsx
export default function VerticalTabs() {
  return (
    <div className="flex gap-6">
      <Tabs defaultValue="profile" className="w-full">
        <div className="flex gap-6">
          <TabsList orientation="vertical" className="w-48">
            <TabsTrigger value="profile" className="w-full justify-start">
              <FaUser className="w-4 h-4 mr-2" />
              プロフィール
            </TabsTrigger>
            <TabsTrigger value="account" className="w-full justify-start">
              <FaCog className="w-4 h-4 mr-2" />
              アカウント
            </TabsTrigger>
            <TabsTrigger value="notifications" className="w-full justify-start">
              <FaEnvelope className="w-4 h-4 mr-2" />
              通知
            </TabsTrigger>
            <TabsTrigger value="privacy" className="w-full justify-start">
              <FaShield className="w-4 h-4 mr-2" />
              プライバシー
            </TabsTrigger>
          </TabsList>
          
          <div className="flex-1">
            <TabsContent value="profile">
              <div className="p-6 bg-blue-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">プロフィール設定</h3>
                <p>プロフィール情報を管理できます。</p>
              </div>
            </TabsContent>
            {/* 他のコンテンツ */}
          </div>
        </div>
      </Tabs>
    </div>
  );
}
```

### 🎨 動的タブ生成

データベースやAPIから取得したデータでタブを動的生成。

```tsx
interface TabData {
  id: string;
  label: string;
  icon?: IconType;
  content: string;
  disabled?: boolean;
}

interface DynamicTabsProps {
  tabData: TabData[];
  variant?: TabsListProps["variant"];
  onTabChange?: (tabId: string) => void;
}

export default function DynamicTabs({ 
  tabData, 
  variant = "default",
  onTabChange 
}: DynamicTabsProps) {
  const handleValueChange = (value: string) => {
    onTabChange?.(value);
  };

  return (
    <Tabs 
      defaultValue={tabData[0]?.id} 
      onValueChange={handleValueChange}
    >
      <TabsList variant={variant} className="grid w-full" 
        style={{ gridTemplateColumns: `repeat(${tabData.length}, 1fr)` }}>
        {tabData.map((tab) => (
          <TabsTrigger 
            key={tab.id}
            value={tab.id} 
            variant={variant}
            disabled={tab.disabled}
          >
            {tab.icon && <tab.icon className="w-4 h-4 mr-2" />}
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {tabData.map((tab) => (
        <TabsContent key={tab.id} value={tab.id} variant={variant}>
          <div className="p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">{tab.label}</h3>
            <p className="text-gray-600">{tab.content}</p>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
```

---

## ベストプラクティス

### 🎯 適切なバリアント選択

```tsx
// ✅ 良い例: コンテキストに応じたバリアント選択
const NavigationTabs = () => (
  <TabsList variant="underline"> {/* ナビゲーション用 */}
    <TabsTrigger variant="underline">記事</TabsTrigger>
    <TabsTrigger variant="underline">動画</TabsTrigger>
  </TabsList>
);

const FilterTabs = () => (
  <TabsList variant="pills"> {/* フィルター用 */}
    <TabsTrigger variant="pills">全て</TabsTrigger>
    <TabsTrigger variant="pills">新着</TabsTrigger>
  </TabsList>
);

const SettingsTabs = () => (
  <TabsList variant="default"> {/* 設定パネル用 */}
    <TabsTrigger variant="default">基本設定</TabsTrigger>
    <TabsTrigger variant="default">詳細設定</TabsTrigger>
  </TabsList>
);
```

### 🔧 パフォーマンス最適化

```tsx
// ✅ 良い例: メモ化とコード分割
import { memo, lazy, Suspense } from "react";

const HeavyContent = lazy(() => import("./HeavyContent"));

const OptimizedTabs = memo(() => {
  return (
    <Tabs defaultValue="light">
      <TabsList>
        <TabsTrigger value="light">軽量コンテンツ</TabsTrigger>
        <TabsTrigger value="heavy">重量コンテンツ</TabsTrigger>
      </TabsList>
      
      <TabsContent value="light">
        <div>軽量なコンテンツ</div>
      </TabsContent>
      
      <TabsContent value="heavy">
        <Suspense fallback={<div>読み込み中...</div>}>
          <HeavyContent />
        </Suspense>
      </TabsContent>
    </Tabs>
  );
});
```

### 📱 レスポンシブ設計

```tsx
// ✅ 良い例: レスポンシブ対応
export default function ResponsiveTabs() {
  return (
    <Tabs defaultValue="tab1">
      {/* モバイル: スクロール可能 */}
      <TabsList 
        scrollable={true}
        className="md:scrollable-false md:grid md:grid-cols-4"
      >
        <TabsTrigger value="tab1" className="flex-shrink-0 md:flex-shrink">
          タブ1
        </TabsTrigger>
        <TabsTrigger value="tab2" className="flex-shrink-0 md:flex-shrink">
          タブ2
        </TabsTrigger>
        <TabsTrigger value="tab3" className="flex-shrink-0 md:flex-shrink">
          タブ3
        </TabsTrigger>
        <TabsTrigger value="tab4" className="flex-shrink-0 md:flex-shrink">
          タブ4
        </TabsTrigger>
      </TabsList>
      
      {/* コンテンツ */}
    </Tabs>
  );
}
```

### 🛡️ エラーハンドリング

```tsx
// ✅ 良い例: エラー境界と fallback
import { ErrorBoundary } from "react-error-boundary";

function TabErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
      <h3 className="text-red-800 font-semibold">エラーが発生しました</h3>
      <p className="text-red-600 text-sm mt-1">{error.message}</p>
      <button 
        onClick={resetErrorBoundary}
        className="mt-2 px-3 py-1 bg-red-600 text-white rounded text-sm"
      >
        再試行
      </button>
    </div>
  );
}

export default function SafeTabs() {
  return (
    <ErrorBoundary FallbackComponent={TabErrorFallback}>
      <Tabs defaultValue="tab1">
        {/* タブコンテンツ */}
      </Tabs>
    </ErrorBoundary>
  );
}
```

### 🎭 状態管理の統合

```tsx
// ✅ 良い例: Zustand との統合
import { useTabStore } from "@/stores/tabStore";

export default function StateManagedTabs() {
  const { activeTab, setActiveTab, tabHistory } = useTabStore();
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // アナリティクス送信など
    analytics.track('tab_changed', { tab: value });
  };
  
  return (
    <Tabs value={activeTab} onValueChange={handleTabChange}>
      <TabsList variant="underline">
        <TabsTrigger value="overview" variant="underline">
          概要
          {tabHistory.includes('overview') && (
            <span className="ml-1 w-2 h-2 bg-blue-500 rounded-full" />
          )}
        </TabsTrigger>
        {/* 他のタブ */}
      </TabsList>
      {/* コンテンツ */}
    </Tabs>
  );
}
```

---

## アクセシビリティガイド

### ♿ WCAG 2.1 AA 準拠

Enhanced Tabs コンポーネントは以下のアクセシビリティ要件を満たします：

#### キーボードナビゲーション

```tsx
// ✅ 自動で対応済み
// - Tab: フォーカス移動
// - ArrowLeft/Right: タブ間移動（水平）
// - ArrowUp/Down: タブ間移動（垂直）  
// - Enter/Space: タブアクティベート
// - Home/End: 最初/最後のタブへ移動
```

#### スクリーンリーダー対応

```tsx
// ✅ 自動で追加される ARIA 属性
<TabsList role="tablist" aria-orientation="horizontal">
  <TabsTrigger 
    role="tab"
    aria-selected="true" 
    aria-controls="tabpanel-1"
    id="tab-1"
  >
    タブ1
  </TabsTrigger>
</TabsList>

<TabsContent 
  role="tabpanel"
  aria-labelledby="tab-1" 
  id="tabpanel-1"
>
  コンテンツ
</TabsContent>
```

#### カスタムアクセシビリティ強化

```tsx
// ✅ 追加のアクセシビリティ対応例
export default function AccessibleTabs() {
  return (
    <Tabs defaultValue="tab1">
      <TabsList aria-label="商品情報のタブ">
        <TabsTrigger value="tab1" aria-describedby="tab1-desc">
          概要
        </TabsTrigger>
        <TabsTrigger value="tab2" aria-describedby="tab2-desc">
          仕様
        </TabsTrigger>
      </TabsList>
      
      {/* 説明文（スクリーンリーダー用） */}
      <div id="tab1-desc" className="sr-only">
        商品の基本情報と特徴
      </div>
      <div id="tab2-desc" className="sr-only">
        詳細な技術仕様とサイズ情報
      </div>
      
      <TabsContent value="tab1">
        <div className="p-4" role="region" aria-label="商品概要">
          商品の概要内容
        </div>
      </TabsContent>
      
      <TabsContent value="tab2">
        <div className="p-4" role="region" aria-label="商品仕様">
          技術仕様内容
        </div>
      </TabsContent>
    </Tabs>
  );
}
```

### 🎨 カラーコントラスト対応

```css
/* ✅ 自動で適用される高コントラスト設計 */
.tabs-trigger {
  /* 非アクティブ: 4.5:1 以上のコントラスト比 */
  color: hsl(var(--muted-foreground)); /* 十分なコントラスト */
}

.tabs-trigger[data-state="active"] {
  /* アクティブ: より高いコントラスト */
  color: hsl(var(--foreground)); /* 最高コントラスト */
}

/* フォーカス表示 */
.tabs-trigger:focus-visible {
  outline: 2px solid hsl(var(--ring));
  outline-offset: 2px;
}
```

---

## パフォーマンス考慮事項

### ⚡ レンダリング最適化

#### React 19 Compiler 対応

```tsx
// ✅ React 19 Compiler により自動最適化
// memo(), useCallback(), useMemo() は不要

export default function OptimizedTabs({ data }) {
  // 自動でメモ化される
  const processedData = data.map(item => ({
    ...item,
    label: item.label.toUpperCase()
  }));
  
  // 自動でメモ化される
  const handleTabChange = (value) => {
    console.log('Tab changed:', value);
    onTabChange?.(value);
  };
  
  return (
    <Tabs onValueChange={handleTabChange}>
      {/* 自動で最適化される */}
      <TabsList>
        {processedData.map(item => (
          <TabsTrigger key={item.id} value={item.id}>
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
```

#### 大量タブの仮想化

```tsx
// ✅ 大量タブの場合の最適化戦略
import { useVirtualizer } from '@tanstack/react-virtual';

export default function VirtualizedTabs({ items }) {
  const parentRef = useRef();
  
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 120, // タブの推定幅
    horizontal: true,
  });
  
  return (
    <Tabs defaultValue={items[0]?.id}>
      <div ref={parentRef} className="overflow-auto">
        <TabsList 
          style={{ width: virtualizer.getTotalSize() }}
          className="relative"
        >
          {virtualizer.getVirtualItems().map((virtualItem) => {
            const item = items[virtualItem.index];
            return (
              <TabsTrigger
                key={item.id}
                value={item.id}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: virtualItem.size,
                  transform: `translateX(${virtualItem.start}px)`,
                }}
              >
                {item.label}
              </TabsTrigger>
            );
          })}
        </TabsList>
      </div>
      {/* Content */}
    </Tabs>
  );
}
```

### 🏗️ バンドルサイズ最適化

```tsx
// ✅ Tree-shaking 対応のインポート
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// ✅ 動的インポートでコード分割
const HeavyTabContent = lazy(() => 
  import("./HeavyTabContent").then(module => ({
    default: module.HeavyTabContent
  }))
);

// ✅ アイコンの個別インポート
import { FaHome, FaUser } from "react-icons/fa";
// ❌ 全体インポートは避ける
// import * as Icons from "react-icons/fa";
```

### 📊 パフォーマンス計測

```tsx
// ✅ パフォーマンス計測の実装例
import { performance } from 'perf_hooks';

export default function MeasuredTabs() {
  const handleTabChange = (value: string) => {
    const start = performance.now();
    
    // タブ切り替え処理
    setActiveTab(value);
    
    const end = performance.now();
    console.log(`Tab switch took ${end - start} milliseconds`);
    
    // Core Web Vitals 計測
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'measure') {
            console.log(`${entry.name}: ${entry.duration}ms`);
          }
        }
      });
      observer.observe({ entryTypes: ['measure'] });
    }
  };
  
  return (
    <Tabs onValueChange={handleTabChange}>
      {/* タブ内容 */}
    </Tabs>
  );
}
```

---

## カスタマイゼーション

### 🎨 CVA バリアントの拡張

```tsx
// ✅ 新しいバリアントの追加
import { cva } from "class-variance-authority";

const customTabsListVariants = cva(
  // ベースクラス
  [
    "inline-flex items-center justify-center",
    "text-muted-foreground",
    "transition-colors duration-200",
  ],
  {
    variants: {
      variant: {
        // 既存バリアント
        default: ["bg-muted rounded-lg p-1"],
        underline: ["bg-transparent border-b border-border"],
        pills: ["bg-transparent gap-1 p-1"],
        minimal: ["bg-transparent gap-0.5"],
        // 🎯 カスタムバリアント
        neon: [
          "bg-black border border-cyan-500",
          "shadow-[0_0_10px_rgba(6,182,212,0.3)]",
          "rounded-lg p-1"
        ],
        glass: [
          "bg-white/10 backdrop-blur-md",
          "border border-white/20",
          "rounded-lg p-1"
        ],
      },
      // 新しいバリアント軸
      elevation: {
        flat: "shadow-none",
        raised: "shadow-md",
        floating: "shadow-xl shadow-black/25",
      }
    },
    // 複合バリアント
    compoundVariants: [
      {
        variant: "neon",
        elevation: "floating",
        class: "shadow-[0_0_20px_rgba(6,182,212,0.5)]"
      }
    ],
    defaultVariants: {
      variant: "default",
      elevation: "flat",
    },
  }
);
```

### 🏷️ カスタムテーマの作成

```css
/* ✅ CSS カスタムプロパティでテーマ作成 */
.tabs-theme-corporate {
  --tabs-bg: #f8fafc;
  --tabs-border: #e2e8f0;
  --tabs-active-bg: #ffffff;
  --tabs-active-text: #1e293b;
  --tabs-hover-bg: #f1f5f9;
  --tabs-focus-ring: #3b82f6;
}

.tabs-theme-dark {
  --tabs-bg: #1e293b;
  --tabs-border: #334155;
  --tabs-active-bg: #0f172a;
  --tabs-active-text: #f8fafc;
  --tabs-hover-bg: #334155;
  --tabs-focus-ring: #60a5fa;
}

/* テーマ適用 */
.tabs-list {
  background-color: var(--tabs-bg);
  border-color: var(--tabs-border);
}

.tabs-trigger[data-state="active"] {
  background-color: var(--tabs-active-bg);
  color: var(--tabs-active-text);
}
```

### 🎭 アニメーション拡張

```css
/* ✅ カスタムアニメーション */
@keyframes tab-slide-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes tab-glow {
  0%, 100% {
    box-shadow: 0 0 5px rgba(59, 130, 246, 0.5);
  }
  50% {
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.8);
  }
}

.tabs-content {
  animation: tab-slide-in 0.3s ease-out;
}

.tabs-trigger[data-state="active"] {
  animation: tab-glow 2s ease-in-out infinite;
}
```

### 🎯 TypeScript 型拡張

```tsx
// ✅ 型安全なカスタマイゼーション
declare module "@/components/ui/tabs" {
  interface TabsListProps {
    elevation?: "flat" | "raised" | "floating";
    theme?: "default" | "corporate" | "dark" | "neon";
  }
  
  interface TabsTriggerProps {
    badge?: number;
    loading?: boolean;
  }
}

// カスタムコンポーネント
export const EnhancedTabsTrigger = ({ 
  badge, 
  loading, 
  children, 
  ...props 
}: TabsTriggerProps) => (
  <TabsTrigger {...props} className="relative">
    {children}
    {badge && (
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
        {badge}
      </span>
    )}
    {loading && (
      <div className="absolute inset-0 bg-black/10 flex items-center justify-center rounded">
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      </div>
    )}
  </TabsTrigger>
);
```

---

## トラブルシューティング

### 🐛 よくある問題と解決法

#### 1. タブが表示されない

```tsx
// ❌ 問題のあるコード
<Tabs>
  <TabsList>
    <TabsTrigger value="tab1">タブ1</TabsTrigger>
  </TabsList>
  {/* TabsContent がない */}
</Tabs>

// ✅ 修正版
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">タブ1</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">
    内容1
  </TabsContent>
</Tabs>
```

#### 2. スタイルが適用されない

```tsx
// ❌ 問題: variant の不一致
<TabsList variant="underline">
  <TabsTrigger variant="pills">タブ1</TabsTrigger>
</TabsList>

// ✅ 修正: variant を一致させる
<TabsList variant="underline">
  <TabsTrigger variant="underline">タブ1</TabsTrigger>
</TabsList>
```

#### 3. TypeScript エラー

```tsx
// ❌ 問題: value プロップの欠如
<TabsTrigger>タブ1</TabsTrigger>

// ✅ 修正: value は必須
<TabsTrigger value="tab1">タブ1</TabsTrigger>
```

#### 4. レスポンシブで崩れる

```tsx
// ❌ 問題: 固定幅の使用
<TabsList className="w-96">
  <TabsTrigger>長いタブ名前1</TabsTrigger>
  <TabsTrigger>長いタブ名前2</TabsTrigger>
</TabsList>

// ✅ 修正: フレキシブルな幅
<TabsList scrollable className="w-full">
  <TabsTrigger className="flex-shrink-0">長いタブ名前1</TabsTrigger>
  <TabsTrigger className="flex-shrink-0">長いタブ名前2</TabsTrigger>
</TabsList>
```

#### 5. アクセシビリティエラー

```tsx
// ❌ 問題: 不適切な ARIA 属性
<TabsTrigger role="button" aria-label="タブ">
  タブ1
</TabsTrigger>

// ✅ 修正: デフォルトのARIA属性を使用
<TabsTrigger value="tab1">
  タブ1
</TabsTrigger>
```

#### 6. タブ切り替え時のチラつき

```tsx
// ❌ 問題: 重複アニメーションとレイアウトシフト
<TabsContent className="animate-in fade-in-0 duration-300">
  {/* margin-top による高さ変化 */}
</TabsContent>

// ✅ 修正: 最適化されたアニメーション（v1.0.1で解決済み）
<TabsContent>
  {/* GPU最適化されたopacityトランジション */}
  {/* レイアウト安定化でチラつき解消 */}
</TabsContent>
```

**チラつきの原因と解決策:**
- **原因**: Radix UI + Tailwind アニメーション競合、margin-top によるレイアウトシフト
- **解決**: `transition-opacity 150ms` + `min-height` + GPU最適化
- **効果**: スムーズなフェード、レイアウト安定、150ms高速化

### 🔧 デバッグツール

```tsx
// ✅ デバッグ用のカスタムフック
export function useTabsDebug(tabsRef: RefObject<HTMLDivElement>) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const tabs = tabsRef.current;
      if (tabs) {
        console.group('🔍 Tabs Debug Info');
        console.log('Active tab:', tabs.querySelector('[data-state="active"]'));
        console.log('All triggers:', tabs.querySelectorAll('[role="tab"]'));
        console.log('All panels:', tabs.querySelectorAll('[role="tabpanel"]'));
        console.groupEnd();
      }
    }
  }, [tabsRef]);
}

// 使用例
export default function DebuggableTabs() {
  const tabsRef = useRef<HTMLDivElement>(null);
  useTabsDebug(tabsRef);
  
  return (
    <div ref={tabsRef}>
      <Tabs defaultValue="tab1">
        {/* タブ内容 */}
      </Tabs>
    </div>
  );
}
```

---

## 技術的背景

### 🏗️ アーキテクチャ設計

Enhanced Tabs コンポーネントは以下の技術スタックに基づいて構築されています：

#### 基盤技術
- **Radix UI Primitives**: アクセシブルなタブコンポーネントの基盤
- **Class Variance Authority (CVA)**: 型安全なバリアント管理
- **Tailwind CSS v4**: ユーティリティファーストのスタイリング
- **React 19**: 最新のReact機能とCompiler対応
- **TypeScript**: 完全な型安全性

#### 設計パターン

```tsx
// ✅ Compound Component パターン
<Tabs>           {/* Context Provider */}
  <TabsList>     {/* Layout Container */}
    <TabsTrigger /> {/* Interactive Element */}
  </TabsList>
  <TabsContent />  {/* Content Area */}
</Tabs>

// ✅ Render Props パターン（拡張版）
<Tabs>
  {({ activeTab, setTab }) => (
    <>
      <TabsList>
        <TabsTrigger 
          onClick={() => setTab('tab1')}
          active={activeTab === 'tab1'}
        >
          タブ1
        </TabsTrigger>
      </TabsList>
      <TabsContent show={activeTab === 'tab1'}>
        内容1
      </TabsContent>
    </>
  )}
</Tabs>
```

### 🎯 CVA バリアントシステム

```typescript
// CVA設計の詳細解説
const tabsListVariants = cva(
  // 1. ベースクラス（全バリアントに共通）
  [
    "inline-flex items-center justify-center",
    "text-muted-foreground",
    "transition-colors duration-200",
    "focus-within:outline-none",
  ],
  {
    variants: {
      // 2. スタイルバリアント
      variant: {
        default: ["bg-muted rounded-lg p-1", "shadow-sm border border-border/20"],
        underline: ["bg-transparent border-b border-border", "pb-0"],
        pills: ["bg-transparent gap-1", "p-1"],
        minimal: ["bg-transparent", "gap-0.5"],
      },
      // 3. サイズバリアント
      size: {
        sm: "h-8 text-sm",
        md: "h-9 text-sm", 
        lg: "h-10 text-base",
      },
      // 4. 配置バリアント
      orientation: {
        horizontal: "flex-row",
        vertical: ["flex-col h-auto w-fit", "space-y-1"],
      },
      // 5. 機能バリアント
      scrollable: {
        true: ["overflow-x-auto", "snap-x snap-mandatory"],
        false: "w-fit",
      },
    },
    // 6. 複合バリアント（複数条件の組み合わせ）
    compoundVariants: [
      {
        variant: "underline",
        orientation: "vertical", 
        class: "border-b-0 border-r border-border",
      },
      {
        scrollable: true,
        orientation: "horizontal",
        class: "w-full",
      },
    ],
    // 7. デフォルト値
    defaultVariants: {
      variant: "default",
      size: "md", 
      orientation: "horizontal",
      scrollable: false,
    },
  }
);
```

### ⚡ パフォーマンス最適化戦略

#### 1. アニメーション最適化とチラつき防止

Enhanced Tabs では、タブ切り替え時のチラつきを完全に解消する最適化を実装しています：

```css
/* ✅ 最適化されたアニメーション設定 */
.tabs-content {
  /* GPU最適化トランジション */
  transition-opacity: 150ms ease-out;
  transform: translateZ(0); /* GPU加速 */
  will-change: opacity;
  
  /* レイアウト安定化 */
  min-height: 2rem;
  position: relative;
  
  /* スムーズなフェード効果 */
  opacity: 0;
  pointer-events: none;
}

.tabs-content[data-state="active"] {
  opacity: 1;
  pointer-events: auto;
}

/* ✅ カスタムシャドウ（下方向除外でクラシック感） */
.tabs-trigger[data-state="active"] {
  /* 上・左・右のみのシャドウ */
  box-shadow: 
    0 -1px 3px 0 rgb(0 0 0 / 0.1),  /* 上シャドウ */
    1px 0 2px 0 rgb(0 0 0 / 0.1),   /* 右シャドウ */
    -1px 0 2px 0 rgb(0 0 0 / 0.1);  /* 左シャドウ */
  /* 下シャドウなし → タブとコンテンツの完全一体化 */
}
```

**解決した問題:**
- ❌ **アニメーション競合**: Radix UI + Tailwind の重複アニメーション
- ❌ **レイアウトシフト**: margin-top による高さ変化
- ❌ **描画性能**: CPU処理による重いトランジション
- ❌ **下シャドウ**: タブとコンテンツの視覚的分離

**実装効果:**
- ✅ **150ms高速化**: transition-all → transition-opacity
- ✅ **GPU最適化**: transform-gpu + will-change
- ✅ **チラつき解消**: アニメーション統一とレイアウト安定化
- ✅ **滑らかな体験**: 自然で美しいフェードエフェクト
- ✅ **クラシック感**: 下シャドウ削除でタブとコンテンツの完全一体化

#### 2. React 19 Compiler による自動最適化

```tsx
// React 19 Compiler が行う最適化の例
function TabsComponent({ items, onTabChange }) {
  // 🔄 自動でメモ化される（memo不要）
  const processedItems = items.map(item => ({
    ...item,
    id: `tab-${item.id}`
  }));
  
  // 🔄 自動でメモ化される（useCallback不要）
  const handleChange = (value) => {
    onTabChange?.(value);
    analytics.track('tab_switch', { tab: value });
  };
  
  // 🔄 自動で最適化される（useMemo不要）
  const gridCols = `grid-cols-${Math.min(items.length, 6)}`;
  
  return (
    <Tabs onValueChange={handleChange}>
      <TabsList className={gridCols}>
        {processedItems.map(item => (
          <TabsTrigger key={item.id} value={item.id}>
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
```

#### 2. CSS-in-JS パフォーマンス

```css
/* ✅ 効率的なCSS生成（Tailwind CSS v4） */
.tabs-list {
  /* Atomic CSS: 最小限のCSS出力 */
  @apply inline-flex items-center justify-center;
  
  /* CSS Custom Properties: 動的テーマ対応 */
  background-color: hsl(var(--muted));
  color: hsl(var(--muted-foreground));
  
  /* Modern CSS: GPU加速対応 */
  transform: translateZ(0);
  will-change: transform;
}
```

### 🔒 型安全性の実装

```typescript
// ✅ 完全な型安全性
type TabVariant = "default" | "underline" | "pills" | "minimal";
type TabSize = "sm" | "md" | "lg";
type TabOrientation = "horizontal" | "vertical";

// Conditional Types を使用した高度な型定義
type TabsListProps<TScrollable extends boolean = false> = {
  variant?: TabVariant;
  size?: TabSize;
  orientation?: TabOrientation;
  scrollable?: TScrollable;
} & (TScrollable extends true 
  ? { className?: string } // scrollable=true の場合
  : { className?: string; grid?: true } // scrollable=false の場合
);

// Template Literal Types による value の型チェック
type TabValue<T extends string> = `tab-${T}`;

interface StrictTabsProps<T extends string> {
  defaultValue?: TabValue<T>;
  value?: TabValue<T>;
  onValueChange?: (value: TabValue<T>) => void;
}
```

---

## マイグレーションガイド

### 📦 従来のタブライブラリからの移行

#### React Tabs からの移行

```tsx
// ❌ 旧: React Tabs
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

<Tabs>
  <TabList>
    <Tab>タブ1</Tab>
    <Tab>タブ2</Tab>
  </TabList>
  <TabPanel>内容1</TabPanel>
  <TabPanel>内容2</TabPanel>
</Tabs>

// ✅ 新: Enhanced Tabs
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">タブ1</TabsTrigger>
    <TabsTrigger value="tab2">タブ2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">内容1</TabsContent>
  <TabsContent value="tab2">内容2</TabsContent>
</Tabs>
```

#### Ant Design Tabs からの移行

```tsx
// ❌ 旧: Ant Design
import { Tabs } from 'antd';

<Tabs
  items={[
    { label: 'タブ1', key: '1', children: '内容1' },
    { label: 'タブ2', key: '2', children: '内容2' },
  ]}
/>

// ✅ 新: Enhanced Tabs（動的生成パターン）
const items = [
  { id: 'tab1', label: 'タブ1', content: '内容1' },
  { id: 'tab2', label: 'タブ2', content: '内容2' },
];

<Tabs defaultValue="tab1">
  <TabsList>
    {items.map(item => (
      <TabsTrigger key={item.id} value={item.id}>
        {item.label}
      </TabsTrigger>
    ))}
  </TabsList>
  {items.map(item => (
    <TabsContent key={item.id} value={item.id}>
      {item.content}
    </TabsContent>
  ))}
</Tabs>
```

### 🔄 段階的移行戦略

#### Phase 1: 基本置き換え

```tsx
// 1週目: 基本的なタブを置き換え
const BasicMigration = () => (
  <Tabs defaultValue="tab1">
    <TabsList>
      <TabsTrigger value="tab1">タブ1</TabsTrigger>
      <TabsTrigger value="tab2">タブ2</TabsTrigger>
    </TabsList>
    <TabsContent value="tab1">基本内容1</TabsContent>
    <TabsContent value="tab2">基本内容2</TabsContent>
  </Tabs>
);
```

#### Phase 2: バリアント適用

```tsx
// 2週目: 適切なバリアントを適用
const VariantMigration = () => (
  <Tabs defaultValue="overview">
    <TabsList variant="underline"> {/* ナビゲーション風に */}
      <TabsTrigger value="overview" variant="underline">概要</TabsTrigger>
      <TabsTrigger value="specs" variant="underline">仕様</TabsTrigger>
    </TabsList>
    <TabsContent value="overview" variant="underline">
      概要内容
    </TabsContent>
    <TabsContent value="specs" variant="underline">
      仕様内容
    </TabsContent>
  </Tabs>
);
```

#### Phase 3: 高度な機能追加

```tsx
// 3週目: アクセシビリティ、アニメーション等を追加
const AdvancedMigration = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList 
        variant="underline" 
        aria-label="製品情報のタブ"
      >
        <TabsTrigger 
          value="overview" 
          variant="underline"
          aria-describedby="overview-desc"
        >
          <FaInfo className="w-4 h-4 mr-2" />
          概要
        </TabsTrigger>
        <TabsTrigger 
          value="specs" 
          variant="underline"
          aria-describedby="specs-desc"
        >
          <FaCog className="w-4 h-4 mr-2" />
          仕様
        </TabsTrigger>
      </TabsList>
      
      <div id="overview-desc" className="sr-only">
        製品の基本情報と特徴
      </div>
      <div id="specs-desc" className="sr-only">
        詳細な技術仕様
      </div>
      
      <TabsContent value="overview" variant="underline">
        <div className="animate-in fade-in-0 duration-300">
          概要内容
        </div>
      </TabsContent>
      <TabsContent value="specs" variant="underline">
        <div className="animate-in fade-in-0 duration-300">
          仕様内容
        </div>
      </TabsContent>
    </Tabs>
  );
};
```

### 📋 移行チェックリスト

```markdown
## 移行前チェック
- [ ] 現在使用しているタブライブラリの特定
- [ ] 移行対象コンポーネントの洗い出し
- [ ] 依存関係の確認
- [ ] スタイリングの互換性チェック

## 移行中チェック
- [ ] 基本機能の動作確認
- [ ] スタイルの適用確認
- [ ] レスポンシブ動作の確認
- [ ] アクセシビリティテスト
- [ ] パフォーマンステスト

## 移行後チェック
- [ ] 全ページでの動作確認
- [ ] E2Eテストの実行
- [ ] ブラウザ互換性テスト
- [ ] 不要な依存関係の削除
- [ ] ドキュメントの更新
```

---

## 📚 参考資料

### 公式ドキュメント

- [Radix UI Tabs](https://www.radix-ui.com/primitives/docs/components/tabs)
- [Class Variance Authority](https://cva.style/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [React 19 Documentation](https://react.dev/)

### 関連記事

- [WCAG 2.1 Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)
- [React Performance Best Practices](https://react.dev/learn/render-and-commit)
- [TypeScript Advanced Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)

### コード例リポジトリ

- [Enhanced Tabs Demo](./../../src/app/(examples)/examples/enhanced-tabs/)
- [Component Tests](./../../src/components/ui/__tests__/)

---

## 🆕 更新履歴

| バージョン | 日付 | 変更内容 |
|-----------|------|----------|
| 1.0.0 | 2024-07-07 | 初回リリース、基本機能実装 |
| 1.0.1 | 2024-07-07 | タブ切り替え時のチラつき問題を解決、アニメーション最適化 |
| 1.0.2 | 2024-07-07 | デフォルトタブのクラシックデザイン化、下シャドウ削除 |
| 1.1.0 | TBD | 仮想化対応、パフォーマンス改善 |
| 1.2.0 | TBD | カスタムアニメーション、テーマシステム |

---

## 📞 サポート

### バグレポート・機能要望

新しい機能要望やバグレポートは、以下の方法でお知らせください：

1. **GitHub Issues**: プロジェクトリポジトリのIssuesタブ
2. **Discussion**: 使用方法に関する質問
3. **Pull Request**: 改善提案やバグ修正

### 開発者コミュニティ

- **Discord**: [開発者コミュニティ](#)
- **Twitter**: [@project_updates](#)
- **ブログ**: [技術ブログ](#)

---

*このドキュメントは Enhanced Tabs v1.0.2 に基づいて作成されています。最新の情報については、公式リポジトリをご確認ください。*