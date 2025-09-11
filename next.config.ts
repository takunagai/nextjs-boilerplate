import type { NextConfig } from "next";

// バンドル分析の設定
const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
	/* config options here */

	reactStrictMode: true,

	// Reactコンパイラの有効化
	experimental: {
		reactCompiler: true,
	},

	// 環境変数
	env: {
		// サンプルページを表示するかどうか
		// 本番環境では NEXT_PUBLIC_SHOW_EXAMPLES=false に設定することで
		// サンプルページを非表示にできます
		NEXT_PUBLIC_SHOW_EXAMPLES: process.env.NEXT_PUBLIC_SHOW_EXAMPLES || "true",
	},

	// 画像最適化の設定（Cloudflare Workers対応）
	images: {
		// Cloudflare Workers では画像最適化を無効化（Cloudflare Images使用推奨）
		unoptimized: true,
		// 外部ドメインの許可リスト
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.unsplash.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "picsum.photos",
				pathname: "/**",
			},
			// 将来的に他の外部画像ソースを追加する場合はここに追加
		],
	},
};

export default withBundleAnalyzer(nextConfig);
