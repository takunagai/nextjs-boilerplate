"use client";

import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { ToastExamples } from "./components/toast-examples";

export default function ToastPage() {
  // 基本的なトースト
  const showBasicToast = () => {
    toast("基本的なトースト通知です");
  };

  // 成功メッセージ
  const showSuccessToast = () => {
    toast.success("処理が成功しました", {
      description: "データが正常に保存されました",
    });
  };

  // エラーメッセージ
  const showErrorToast = () => {
    toast.error("エラーが発生しました", {
      description: "ネットワーク接続をご確認ください",
    });
  };

  // 警告メッセージ
  const showWarningToast = () => {
    toast.warning("警告", {
      description: "この操作は取り消せません",
    });
  };

  // 情報メッセージ
  const showInfoToast = () => {
    toast.info("お知らせ", {
      description: "新しい機能が追加されました",
    });
  };

  // アクション付きトースト
  const showActionToast = () => {
    toast("ファイルがアップロードされました", {
      description: "ファイルの詳細を確認しますか？",
      action: {
        label: "確認する",
        onClick: () => toast.success("詳細ページに移動しました"),
      },
    });
  };

  // カスタム時間設定
  const showLongDurationToast = () => {
    toast("この通知は10秒間表示されます", {
      duration: 10000,
    });
  };

  // 解除不可のトースト
  const showPersistentToast = () => {
    toast.info("この通知は自動的に消えません", {
      duration: Infinity,
      description: "右上の×ボタンをクリックして閉じてください",
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-12">
      <Toaster /> {/* トースト表示のためのプロバイダー */}
      
      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-primary">Toast コンポーネント</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          ユーザーへの通知を表示するトーストコンポーネントです。
        </p>
      </header>

      <section>
        <h2 className="text-3xl font-semibold mb-6 border-b pb-2">基本的な使い方</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-background rounded-lg shadow">
            <h3 className="text-lg font-medium mb-3">基本</h3>
            <Button onClick={showBasicToast}>基本トースト</Button>
          </div>
          <div className="p-4 bg-background rounded-lg shadow">
            <h3 className="text-lg font-medium mb-3">成功</h3>
            <Button variant="success" onClick={showSuccessToast}>成功トースト</Button>
          </div>
          <div className="p-4 bg-background rounded-lg shadow">
            <h3 className="text-lg font-medium mb-3">エラー</h3>
            <Button variant="destructive" onClick={showErrorToast}>エラートースト</Button>
          </div>
          <div className="p-4 bg-background rounded-lg shadow">
            <h3 className="text-lg font-medium mb-3">警告</h3>
            <Button variant="warning" onClick={showWarningToast}>警告トースト</Button>
          </div>
          <div className="p-4 bg-background rounded-lg shadow">
            <h3 className="text-lg font-medium mb-3">情報</h3>
            <Button variant="secondary" onClick={showInfoToast}>情報トースト</Button>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-6 border-b pb-2">高度な使用例</h2>
        <div className="grid grid-cols-1 gap-4">
          <div className="p-4 bg-background rounded-lg shadow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="text-lg font-medium mb-3">アクション付き</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  ユーザーが対応できるアクションボタンを含めることができます。
                </p>
                <Button onClick={showActionToast}>アクション付きトースト</Button>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-3">カスタム表示時間</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  表示時間を調整できます（デフォルトは4秒）。
                </p>
                <Button onClick={showLongDurationToast}>長時間表示トースト (10秒)</Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="text-lg font-medium mb-3">永続表示</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  ユーザーが閉じるまで表示し続けるトーストを作成できます。
                </p>
                <Button onClick={showPersistentToast}>永続的なトースト</Button>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t">
              <h3 className="text-lg font-medium mb-3">その他の実装例</h3>
              <ToastExamples />
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-6 border-b pb-2">実装方法</h2>
        <div className="p-4 bg-background rounded-lg shadow">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-medium mb-2">基本的なセットアップ</h3>
              <pre className="p-4 rounded bg-muted overflow-x-auto">
                <code>{`// 1. プロバイダーをレイアウトに追加
// src/app/layout.tsx または任意のレイアウトファイル
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}`}</code>
              </pre>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-2">トーストの使用方法</h3>
              <pre className="p-4 rounded bg-muted overflow-x-auto">
                <code>{`"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function MyComponent() {
  // 基本的なトースト
  const showToast = () => {
    toast("トーストメッセージ");
  };

  // バリエーション
  const showSuccessToast = () => {
    toast.success("成功しました", {
      description: "詳細説明をここに入力できます",
    });
  };

  return (
    <div>
      <Button onClick={showToast}>トースト表示</Button>
      <Button onClick={showSuccessToast}>成功トースト表示</Button>
    </div>
  );
}`}</code>
              </pre>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-2">利用可能なオプション</h3>
              <pre className="p-4 rounded bg-muted overflow-x-auto">
                <code>{`// オプション例
toast("メッセージ", {
  description: "詳細説明",   // 詳細文
  duration: 5000,           // 表示時間（ミリ秒）
  position: "top-center",   // 表示位置
  dismissible: true,        // ユーザーが閉じられるか
  action: {                 // アクションボタン
    label: "元に戻す",
    onClick: () => console.log("アクションが実行されました"),
  },
  onAutoClose: () => {      // 自動的に閉じる時のコールバック
    console.log("トーストが自動で閉じられました");
  },
  onDismiss: () => {        // ユーザーが閉じた時のコールバック
    console.log("トーストが閉じられました");
  },
});`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
