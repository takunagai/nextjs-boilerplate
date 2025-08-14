import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export default auth((req) => {
	// Auth.jsが自動的に認証・認可を処理
	// authConfigのauthorizedコールバックで制御される
	return NextResponse.next();
});

export const config = {
	// 認証チェックを適用するパス
	matcher: [
		/*
		 * マッチするパス:
		 * - /api 以外のすべてのパス
		 * - /api/auth 以外の API ルート
		 * 除外するパス:
		 * - /_next/static（静的ファイル）
		 * - /_next/image（画像最適化ファイル）
		 * - /favicon.ico, /sitemap.xml など（静的ファイル）
		 */
		"/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$|.*\\.webp$|.*\\.ico$).*)",
	],
};