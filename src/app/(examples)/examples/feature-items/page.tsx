import type { Metadata } from "next";
import Link from "next/link";
import { FiBarChart2, FiCode, FiGlobe, FiMapPin } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FeatureItems } from "@/components/ui/feature-items";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = {
  title: "特徴紹介セクション | サンプルページ",
  description: "特徴紹介セクションのサンプルを表示するページです。",
};

// サンプルデータ
const featureItems = [
  {
    id: "feature-1",
    title: "用途に合わせて自由にカスタマイズ",
    description:
      "Mapboxは、地図ソリューションの開発者向けプラットフォームです。社内外の様々な情報を統合し、目的・ユーザー・ブランドに合わせた地図を構築することで企業のロケーションデータ活用を促進させます。",
    imageUrl: "/dummy-images/street-photo-01.jpg",
    buttonText: "詳細を見る",
    buttonUrl: "#",
    icon: <FiMapPin className="w-6 h-6" />,
  },
  {
    id: "feature-2",
    title: "業界トップレベルの地図精度",
    description:
      "世界中の地理情報を網羅しているため、海外でもご利用が可能。日本国内はゼンリン社をベースとした高精度な地図情報を標準でご提供。",
    imageUrl: "/dummy-images/street-photo-02.jpg",
    buttonText: "事例を確認",
    buttonUrl: "#",
    icon: <FiGlobe className="w-6 h-6" />,
  },
  {
    id: "feature-3",
    title: "高度なデータ分析と可視化",
    description:
      "位置情報データを活用して、ユーザーの行動パターンやトレンドを分析。直感的なビジュアライゼーションツールで複雑なデータも簡単に理解できます。",
    imageUrl: "/dummy-images/street-photo-03.jpg",
    buttonText: "API情報",
    buttonUrl: "#",
    icon: <FiBarChart2 className="w-6 h-6" />,
  },
  {
    id: "feature-4",
    title: "シームレスな統合と拡張性",
    description:
      "既存のシステムやアプリケーションとの統合が容易で、ビジネスの成長に合わせて拡張可能。柔軟なAPIとSDKで、あらゆるプラットフォームに対応します。",
    imageUrl: "/dummy-images/street-photo-04.jpg",
    buttonText: "開発者向け情報",
    buttonUrl: "#",
    icon: <FiCode className="w-6 h-6" />,
  },
];

export default function FeatureItemsPage() {
  return (
    <div className="py-12">
      <Container width="lg">
        <div className="mb-12 text-center">
          <PageHeader title="特徴紹介セクション" />
          <p className="text-xl text-muted-foreground">
            特徴を効果的に紹介するためのレイアウトコンポーネント
          </p>
          <div className="mt-8">
            <Button asChild>
              <Link href="/examples">サンプル一覧に戻る</Link>
            </Button>
          </div>
        </div>

        <div className="mt-16 border-t pt-12">
          <h2 className="text-2xl font-bold mb-8">Split Layout - 基本</h2>
          <FeatureItems
            items={featureItems.slice(0, 3)}
            layout="vertical"
            variant="split"
            alternateLayout={false}
            styling={{
              heading: {
                level: "h3",
                className: "text-xl font-semibold mb-3",
              },
              description: {
                className: "text-muted-foreground leading-relaxed",
              },
              button: {
                className:
                  "mt-4 inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors",
              },
            }}
          />
        </div>

        <div className="mt-16 border-t pt-12">
          <h2 className="text-2xl font-bold mb-8">Split Layout - 左右交互</h2>
          <FeatureItems
            items={featureItems.slice(0, 3)}
            layout="vertical"
            variant="split"
            alternateLayout={true}
            spacing="large"
            styling={{
              heading: {
                level: "h3",
                className: "text-xl font-semibold mb-3",
              },
              description: {
                className: "text-muted-foreground leading-relaxed",
              },
              button: {
                className:
                  "mt-4 inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors",
              },
            }}
          />
        </div>

        <div className="mt-16 border-t pt-12">
          <h2 className="text-2xl font-bold mb-8">Grid Layout - 新機能</h2>
          <FeatureItems
            items={featureItems}
            layout="grid"
            variant="simple"
            background="accent"
            spacing="medium"
            styling={{
              heading: {
                level: "h3",
                className: "text-lg font-semibold mb-2",
              },
              description: {
                className: "text-sm text-muted-foreground",
              },
              icon: {
                className: "text-primary mb-3",
              },
            }}
          />
        </div>

        <div className="mt-16 border-t pt-12">
          <h2 className="text-2xl font-bold mb-8">
            Simple Layout - アイコン付き
          </h2>
          <FeatureItems
            items={featureItems}
            layout="horizontal"
            variant="simple"
            spacing="large"
            styling={{
              heading: {
                level: "h3",
                className: "text-lg font-medium mb-2",
              },
              description: {
                className: "text-sm text-muted-foreground text-center",
              },
              icon: {
                className: "text-primary mx-auto mb-3",
              },
            }}
          />
        </div>

        <div className="mt-16 border-t pt-12">
          <h2 className="text-2xl font-bold mb-8">Overlay - ダークスタイル</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featureItems.slice(0, 4).map((item) => (
              <FeatureItems
                key={item.id}
                items={[item]}
                variant="overlay"
                overlayStyle="dark"
                overlayHeight="auto"
                spacing="small"
                styling={{
                  heading: {
                    level: "h4",
                    className: "text-white text-lg font-semibold mb-2",
                  },
                  description: {
                    className: "text-white/90 text-sm mb-3",
                  },
                  button: {
                    className:
                      "bg-white text-gray-900 px-3 py-1 rounded text-sm font-medium hover:bg-gray-100 transition-colors",
                  },
                }}
              />
            ))}
          </div>
        </div>

        <div className="mt-16 border-t pt-12">
          <h2 className="text-2xl font-bold mb-8">
            Overlay - グラデーションスタイル
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featureItems.slice(2, 4).map((item) => (
              <FeatureItems
                key={item.id}
                items={[item]}
                variant="overlay"
                overlayStyle="gradient"
                overlayHeight="half"
                spacing="small"
                styling={{
                  heading: {
                    level: "h4",
                    className: "text-white text-lg font-semibold mb-2",
                  },
                  description: {
                    className: "text-white/95 text-sm mb-3",
                  },
                  button: {
                    className:
                      "bg-white text-gray-900 px-3 py-1 rounded text-sm font-medium hover:bg-gray-100 transition-colors",
                  },
                }}
              />
            ))}
          </div>
        </div>

        <div className="mt-16 border-t pt-12">
          <h2 className="text-2xl font-bold mb-8">高さバリエーション</h2>

          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">1/3 高さ (third)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FeatureItems
                items={[featureItems[0]]}
                variant="overlay"
                overlayStyle="dark"
                overlayHeight="third"
                spacing="small"
                styling={{
                  heading: {
                    className: "text-white text-base font-semibold",
                  },
                  button: {
                    className:
                      "bg-white text-gray-900 px-2 py-1 rounded text-xs font-medium",
                  },
                }}
              />
              <FeatureItems
                items={[featureItems[1]]}
                variant="overlay"
                overlayStyle="gradient"
                overlayHeight="third"
                spacing="small"
                styling={{
                  heading: {
                    className: "text-white text-base font-semibold",
                  },
                  button: {
                    className:
                      "bg-white text-gray-900 px-2 py-1 rounded text-xs font-medium",
                  },
                }}
              />
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">フル高さ (full)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FeatureItems
                items={[featureItems[2]]}
                variant="overlay"
                overlayStyle="dark"
                overlayHeight="full"
                spacing="small"
                styling={{
                  heading: {
                    className: "text-white text-xl font-bold mb-4",
                  },
                  description: {
                    className: "text-white/90 mb-6",
                  },
                  button: {
                    className:
                      "bg-white text-gray-900 px-4 py-2 rounded font-medium hover:bg-gray-100 transition-colors",
                  },
                }}
              />
              <FeatureItems
                items={[featureItems[3]]}
                variant="overlay"
                overlayStyle="gradient"
                overlayHeight="full"
                spacing="small"
                styling={{
                  heading: {
                    className: "text-white text-xl font-bold mb-4",
                  },
                  description: {
                    className: "text-white/95 mb-6",
                  },
                  button: {
                    className:
                      "bg-white text-gray-900 px-4 py-2 rounded font-medium hover:bg-gray-100 transition-colors",
                  },
                }}
              />
            </div>
          </div>
        </div>

        <div className="mt-16 border-t pt-12">
          <h2 className="text-2xl font-bold mb-8">カスタムレンダリング例</h2>
          <FeatureItems
            items={featureItems.slice(0, 2)}
            renderItem={(item, index) => (
              <div
                key={item.id}
                className="mb-8 p-6 border rounded-lg bg-gradient-to-r from-blue-50 to-purple-50"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-2 bg-white rounded-lg shadow-sm">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <div className="flex gap-2">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                        #{index + 1}
                      </span>
                      <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                        カスタム
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          />
        </div>

        <div className="mt-16 border-t pt-12">
          <h2 className="text-2xl font-bold mb-8">XLarge Spacing - 新機能</h2>
          <FeatureItems
            items={featureItems.slice(0, 2)}
            layout="vertical"
            variant="split"
            alternateLayout={true}
            spacing="xlarge"
            styling={{
              heading: {
                level: "h3",
                className: "text-2xl font-bold mb-4",
              },
              description: {
                className: "text-lg text-muted-foreground leading-relaxed",
              },
              button: {
                className:
                  "mt-6 inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium",
              },
            }}
          />
        </div>
      </Container>
    </div>
  );
}
