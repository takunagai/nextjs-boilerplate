import type { Config } from "tailwindcss";

export default {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	darkMode: "class", // next-themesの'class'属性と連携

	// @ts-expect-error - Tailwind v4 は `safelistPatterns` をサポートしていますが、型定義にはまだ含まれていない場合があります
	safelistPatterns: [
		{
			// columns-1 to columns-12 (base)
			pattern: /^columns-(?:[1-9]|1[0-2])$/,
		},
		{
			// container query variants
			// e.g. xs:columns-1, sm:columns-2, ..., 7xl:columns-12
			// コンポーネントのロジックに合わせて `@` プレフィックスを削除した
			pattern:
				/^(xs|sm|md|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl):columns-(?:[1-9]|1[0-2])$/,
		},
		{
			// gap-x- (for column-gap)
			pattern: /^gap-x-(?:[1-9]|1[0-6])$/, // Covers gap-x-1 to gap-x-16, adjust if needed
		},
	],
} satisfies Config;
