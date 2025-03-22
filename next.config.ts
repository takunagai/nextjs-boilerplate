import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
  
  // 環境変数
  env: {
    // サンプルページを表示するかどうか
    // 本番環境では NEXT_PUBLIC_SHOW_EXAMPLES=false に設定することで
    // サンプルページを非表示にできます
    NEXT_PUBLIC_SHOW_EXAMPLES: process.env.NEXT_PUBLIC_SHOW_EXAMPLES || "true",
  },
};

export default nextConfig;
