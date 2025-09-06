/**
 * FeatureItems コンポーネントの使用例集
 *
 * @description このファイルは実際に動作するコード例を提供します。
 * 各例は実際のプロジェクトでコピー&ペーストして使用できます。
 */

import React from "react";
import { FeatureItems, type FeatureItem } from "@/components/ui/feature-items";
import { Check, Zap, Shield, Star } from "lucide-react";

// ================================
// 🎯 基本的な使用例
// ================================

export const BasicExample = () => {
  const basicFeatures: FeatureItem[] = [
    {
      id: "speed",
      title: "高速",
      description: "雷のように速い処理速度",
    },
    {
      id: "security",
      title: "安全",
      description: "エンタープライズレベルのセキュリティ",
    },
  ];

  return <FeatureItems items={basicFeatures} variant="simple" />;
};

// ================================
// 🖼️ 画像付きの特徴（推奨パターン）
// ================================

export const VisualFeaturesExample = () => {
  const visualFeatures: FeatureItem[] = [
    {
      id: "speed",
      title: "圧倒的な高速処理",
      description: "最新のAI技術により、従来比300%の処理速度を実現",
      imageUrl: "/images/features/speed.webp",
      buttonText: "パフォーマンス詳細",
      buttonUrl: "/features/performance",
    },
    {
      id: "security",
      title: "エンタープライズセキュリティ",
      description: "金融機関レベルの暗号化とセキュリティ監査に準拠",
      imageUrl: "/images/features/security.webp",
      buttonText: "セキュリティ詳細",
      buttonUrl: "/features/security",
    },
  ];

  return (
    <FeatureItems
      items={visualFeatures}
      variant="split"
      alternateLayout={true}
      styling={{
        heading: {
          level: "h2",
          className: "text-2xl font-bold text-gray-900 dark:text-gray-100",
        },
        description: {
          className: "text-gray-600 dark:text-gray-300 leading-relaxed",
        },
        button: {
          className:
            "bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md transition-colors",
        },
      }}
    />
  );
};

// ================================
// 📐 グリッドレイアウト（大量のアイテム向け）
// ================================

export const GridLayoutExample = () => {
  const gridFeatures: FeatureItem[] = Array.from({ length: 6 }, (_, i) => ({
    id: `feature-${i}`,
    title: `特徴 ${i + 1}`,
    description: `詳細な説明テキスト ${i + 1}。この機能により、ユーザーエクスペリエンスが大幅に向上します。`,
    icon: <Star className="w-8 h-8" />,
  }));

  return (
    <FeatureItems
      items={gridFeatures}
      layout="grid"
      background="accent"
      spacing="large"
      variant="simple"
      styling={{
        heading: {
          level: "h3",
          className: "text-lg font-semibold",
        },
        icon: {
          className: "text-primary",
        },
      }}
    />
  );
};

// ================================
// 🎨 アイコン付きの特徴
// ================================

export const IconFeaturesExample = () => {
  const iconFeatures: FeatureItem[] = [
    {
      id: "fast",
      title: "高速処理",
      description: "最適化されたアルゴリズムで瞬時に結果を表示",
      icon: <Zap className="w-12 h-12" />,
    },
    {
      id: "secure",
      title: "セキュア",
      description: "暗号化通信でデータを完全保護",
      icon: <Shield className="w-12 h-12" />,
    },
    {
      id: "reliable",
      title: "信頼性",
      description: "99.9%のアップタイム保証",
      icon: <Check className="w-12 h-12" />,
    },
  ];

  return (
    <FeatureItems
      items={iconFeatures}
      variant="simple"
      layout="horizontal"
      styling={{
        heading: {
          level: "h3",
          className: "text-xl font-semibold mb-2",
        },
        description: {
          className: "text-sm text-muted-foreground",
        },
        icon: {
          className: "text-primary mb-4",
        },
      }}
    />
  );
};

// ================================
// 🌊 オーバーレイバリアント
// ================================

export const OverlayVariantExample = () => {
  const heroFeatures: FeatureItem[] = [
    {
      id: "hero-1",
      title: "革新的なソリューション",
      description: "業界をリードする技術で、あなたのビジネスを次のレベルへ",
      imageUrl: "/images/hero/innovation.jpg",
      buttonText: "詳しく見る",
      buttonUrl: "/solutions",
    },
    {
      id: "hero-2",
      title: "専門家によるサポート",
      description: "24/7体制で、経験豊富な専門家があなたをサポート",
      imageUrl: "/images/hero/support.jpg",
      buttonText: "サポート詳細",
      buttonUrl: "/support",
    },
  ];

  return (
    <FeatureItems
      items={heroFeatures}
      variant="overlay"
      overlayStyle="gradient"
      overlayHeight="full"
      spacing="xlarge"
      styling={{
        heading: {
          className: "text-white text-3xl font-bold mb-4",
        },
        description: {
          className: "text-white/90 text-lg mb-6",
        },
        button: {
          className:
            "bg-white text-gray-900 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors",
        },
      }}
    />
  );
};

// ================================
// 🔧 カスタムレンダリング例
// ================================

export const CustomRenderingExample = () => {
  const customFeatures: FeatureItem[] = [
    {
      id: "new-feature",
      title: "最新機能",
      description: "新しくリリースされた革新的な機能",
      customData: { isNew: true, priority: "high" },
    },
    {
      id: "beta-feature",
      title: "ベータ機能",
      description: "現在テスト中の実験的な機能",
      customData: { isBeta: true, priority: "medium" },
    },
  ];

  return (
    <FeatureItems
      items={customFeatures}
      renderItem={(item, index) => (
        <div
          key={item.id}
          className="custom-feature-card p-6 border rounded-lg bg-white shadow-sm"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <div className="flex gap-2">
              {(item.customData?.isNew as boolean) && (
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  New!
                </span>
              )}
              {(item.customData?.isBeta as boolean) && (
                <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                  Beta
                </span>
              )}
            </div>
          </div>
          <p className="text-gray-600">{item.description}</p>
          <div className="mt-4 text-sm text-gray-500">
            優先度: {item.customData?.priority as string}
          </div>
        </div>
      )}
    />
  );
};

// ================================
// 📱 レスポンシブ対応例
// ================================

export const ResponsiveExample = () => {
  const responsiveFeatures: FeatureItem[] = [
    {
      id: "mobile",
      title: "モバイル最適化",
      description: "どんなデバイスでも完璧な表示",
      imageUrl: "/images/features/mobile.jpg",
    },
    {
      id: "desktop",
      title: "デスクトップ対応",
      description: "大画面での快適な操作性",
      imageUrl: "/images/features/desktop.jpg",
    },
  ];

  return (
    <>
      {/* デスクトップ用: 横並び */}
      <div className="hidden md:block">
        <FeatureItems
          items={responsiveFeatures}
          variant="split"
          layout="horizontal"
          alternateLayout={false}
        />
      </div>

      {/* モバイル用: 縦並び */}
      <div className="md:hidden">
        <FeatureItems
          items={responsiveFeatures}
          variant="simple"
          layout="vertical"
          spacing="small"
        />
      </div>
    </>
  );
};

// ================================
// 🔄 段階的な機能展開例
// ================================

export const ProgressiveFeaturesExample = () => {
  const [visibleCount, setVisibleCount] = React.useState(2);

  const progressiveFeatures: FeatureItem[] = [
    { id: "1", title: "基本機能", description: "必要最小限の機能セット" },
    { id: "2", title: "標準機能", description: "一般的なユースケースに対応" },
    { id: "3", title: "拡張機能", description: "高度な機能と統合オプション" },
    {
      id: "4",
      title: "エンタープライズ機能",
      description: "企業向けの包括的な機能",
    },
  ];

  const visibleFeatures = progressiveFeatures.slice(0, visibleCount);

  return (
    <div>
      <FeatureItems items={visibleFeatures} variant="simple" spacing="medium" />

      {visibleCount < progressiveFeatures.length && (
        <div className="text-center mt-8">
          <button
            onClick={() => setVisibleCount((prev) => prev + 1)}
            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            もっと見る ({progressiveFeatures.length - visibleCount}個の機能)
          </button>
        </div>
      )}
    </div>
  );
};
