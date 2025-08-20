/*
  class-variance-authority (CVA) の基本的な使い方

  CVAは、コンポーネントのバリエーションを型安全に管理するためのユーティリティです。
  Tailwind CSSと組み合わせて使うことで、条件に応じたクラス名の生成を
  タイプセーフかつ整理された方法で行うことができます。
*/

import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";

// ボタンコンポーネントのスタイルをCVAで定義
const buttonVariants = cva(
	// ベースとなるクラス（常に適用される）
	"inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
	{
		// バリアント（異なるスタイルのバリエーション）を定義
		variants: {
			// 「variant」という名前のバリアントグループ
			variant: {
				// デフォルト（塗りつぶし）スタイル
				default: "bg-primary text-primary-foreground hover:bg-primary/90",
				// アウトラインスタイル
				outline:
					"border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
				// セカンダリスタイル
				secondary:
					"bg-secondary text-secondary-foreground hover:bg-secondary/80",
				// ゴーストスタイル（背景なし）
				ghost: "hover:bg-accent hover:text-accent-foreground",
				// リンクスタイル
				link: "underline-offset-4 hover:underline text-primary",
			},
			// 「size」という名前のバリアントグループ
			size: {
				default: "h-10 py-2 px-4",
				sm: "h-9 px-3 rounded-md",
				lg: "h-11 px-8 rounded-md",
				icon: "h-10 w-10",
			},
		},
		// デフォルト値の設定
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

// ボタンコンポーネントのpropsの型を定義
// VariantPropsを使用して、buttonVariantsから型を自動生成
interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

// ボタンコンポーネント
export function Button({
	className,
	variant,
	size,
	asChild = false,
	...props
}: ButtonProps) {
	// 実際のHTML要素
	const Comp = "button";

	return (
		<Comp
			// cn関数を使ってクラス名を結合
			// buttonVariantsで生成されたクラスと、外部から渡されたclassNameを結合
			className={cn(buttonVariants({ variant, size }), className)}
			{...props}
		/>
	);
}

/*
  使用例：

  <Button>デフォルトボタン</Button>
  <Button variant="outline">アウトラインボタン</Button>
  <Button variant="secondary" size="lg">大きなセカンダリボタン</Button>
  <Button variant="ghost" size="sm">小さなゴーストボタン</Button>
  <Button variant="link">リンクスタイルボタン</Button>
  <Button size="icon">🔍</Button>

  ------------------------------------------------------

  【解説】

  1. CVAの基本構造
     - 第1引数: ベースとなるクラス（常に適用される）
     - 第2引数: バリアントとデフォルト値を含むオブジェクト

  2. バリアント
     - 「variant」や「size」などのグループに分けて定義
     - それぞれのグループ内に複数のオプションを定義可能
     - 各オプションに対応するTailwindクラスを指定

  3. 型安全性
     - VariantPropsを使って、定義したバリアントから型を自動生成
     - TypeScriptの補完が効くため、使用時にミスを防止

  4. 使いやすさ
     - コンポーネントの使用者は単純にpropsを渡すだけ
     - 内部でクラス名の組み立てが行われる

  5. メンテナンス性
     - スタイルの定義が一箇所にまとまる
     - 変更が必要な場合も一箇所を修正するだけで済む

  CVAを使うことで、条件付きクラス名の管理が整理され、
  コンポーネントのバリエーションを型安全かつ柔軟に扱えるようになります。
*/
