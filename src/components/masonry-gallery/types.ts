/**
 * ギャラリーコンポーネントの型定義
 */

/**
 * 写真データの型定義
 */
export interface Photo {
  id?: string; // オプショナルなID
  src: string;
  alt?: string;
  width: number;
  height: number;
  title?: string;
  blurDataURL?: string; // For Next/Image placeholder='blur'
}

/**
 * Tailwind CSS のコンテナクエリで使用されるブレークポイント名。
 * これらは Tailwind のデフォルトのコンテナクエリサイズに対応します。
 * @see https://tailwindcss.com/docs/container-queries
 */
export type ContainerBreakpointName =
  | "xs" // @container (min-width: 20rem) /* 320px */
  | "sm" // @container (min-width: 24rem) /* 384px */
  | "md" // @container (min-width: 28rem) /* 448px */
  | "lg" // @container (min-width: 32rem) /* 512px */
  | "xl" // @container (min-width: 36rem) /* 576px */
  | "2xl" // @container (min-width: 42rem) /* 672px */
  | "3xl" // @container (min-width: 48rem) /* 768px */
  | "4xl" // @container (min-width: 56rem) /* 896px */
  | "5xl" // @container (min-width: 64rem) /* 1024px */
  | "6xl" // @container (min-width: 72rem) /* 1152px */
  | "7xl"; // @container (min-width: 80rem) /* 1280px */

/**
 * 各コンテナブレークポイントごとのカラム数を定義する型。
 */
export type ColumnsPerBreakpoint = {
  /**
   * デフォルトのカラム数。
   * コンテナクエリが一致しない場合、または `ColumnsDef` が数値で直接指定された場合のベースとなるカラム数。
   */
  default: number;
  /** コンテナの幅が 'xs' (20rem) 以上の場合のカラム数 */
  xs?: number;
  /** コンテナの幅が 'sm' (24rem) 以上の場合のカラム数 */
  sm?: number;
  /** コンテナの幅が 'md' (28rem) 以上の場合のカラム数 */
  md?: number;
  /** コンテナの幅が 'lg' (32rem) 以上の場合のカラム数 */
  lg?: number;
  /** コンテナの幅が 'xl' (36rem) 以上の場合のカラム数 */
  xl?: number;
  /** コンテナの幅が '2xl' (42rem) 以上の場合のカラム数 */
  "2xl"?: number;
  /** コンテナの幅が '3xl' (48rem) 以上の場合のカラム数 */
  "3xl"?: number;
  /** コンテナの幅が '4xl' (56rem) 以上の場合のカラム数 */
  "4xl"?: number;
  /** コンテナの幅が '5xl' (64rem) 以上の場合のカラム数 */
  "5xl"?: number;
  /** コンテナの幅が '6xl' (72rem) 以上の場合のカラム数 */
  "6xl"?: number;
  /** コンテナの幅が '7xl' (80rem) 以上の場合のカラム数 */
  "7xl"?: number;
};

/**
 * ColumnsDef can be a single number (applies to 'default') or an object specifying columns per container breakpoint.
 */
export type ColumnsDef = number | ColumnsPerBreakpoint;
