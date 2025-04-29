import type { ReactNode } from "react";

/**
 * FAQのタグ情報
 */
export type FAQTag = {
  /**
   * タグのラベル（表示テキスト）
   */
  label: string;
  
  /**
   * タグのスタイルクラス
   * Tailwind CSSクラスを指定
   */
  className?: string;
};

/**
 * 個別のFAQ項目
 */
export type FAQItem = {
  /**
   * 一意なID（accordionのvalueとして使用）
   */
  id: string;
  
  /**
   * 質問テキスト
   */
  question: string;
  
  /**
   * 回答テキスト
   * HTMLも使用可能
   */
  answer: ReactNode;
  
  /**
   * 質問の前に表示するアイコン
   * react-iconsのコンポーネントなど
   */
  questionIcon?: ReactNode;
  
  /**
   * 回答の前に表示するアイコン
   * react-iconsのコンポーネントなど
   */
  answerIcon?: ReactNode;
  
  /**
   * FAQに関連するタグ
   */
  tags?: FAQTag[];
};

/**
 * カスタムスタイル用の型定義
 * 各要素のスタイルをTailwindクラスで上書き可能
 */
export type FAQClassNames = {
  /**
   * コンテナ要素のスタイル
   */
  container?: string;
  
  /**
   * 各FAQ項目のスタイル
   */
  item?: string;
  
  /**
   * 質問部分のスタイル
   */
  question?: string;
  
  /**
   * 質問アイコンのスタイル
   */
  questionIcon?: string;
  
  /**
   * 回答部分のスタイル
   */
  answer?: string;
  
  /**
   * 回答アイコンのスタイル
   */
  answerIcon?: string;
  
  /**
   * タグのスタイル
   */
  tag?: string;
};

/**
 * FAQコンポーネントのプロパティ
 */
export type FAQProps = {
  /**
   * FAQ項目の配列
   */
  items: FAQItem[];
  
  /**
   * 検索クエリ（絞り込み用）
   */
  search?: string;
  
  /**
   * タグによるフィルタリング
   */
  tagFilter?: string[];
  
  /**
   * 初期状態で開いておくFAQ項目のID配列
   */
  defaultOpenIds?: string[];
  
  /**
   * FAQの見出し要素
   */
  heading?: ReactNode;
  
  /**
   * アニメーションの有効/無効
   * trueの場合、デフォルトのアニメーションを使用
   */
  animate?: boolean;
  
  /**
   * カスタムスタイル設定
   */
  classNames?: FAQClassNames;
  
  /**
   * アクセシビリティ用のラベル
   */
  ariaLabel?: string;
};
