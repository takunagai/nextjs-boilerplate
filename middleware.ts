import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

// リクエスト元IPアドレス別のレート制限用カウンター
const rateLimitCounter: Record<string, { count: number; timestamp: number }> =
	{};

// レート制限の設定
const RATE_LIMIT = {
	// 10秒間のリクエスト上限
	MAX_REQUESTS: 20,
	// レート制限のウィンドウ（10秒）
	WINDOW_MS: 10 * 1000,
};

/**
 * CSRF対策の検証を行う
 * @param req リクエストオブジェクト
 */
function validateCsrf(req: NextRequest): boolean {
	// GET、HEAD、OPTIONS、TRACEリクエストは検証をスキップ
	const safeMethods = ["GET", "HEAD", "OPTIONS", "TRACE"];
	if (safeMethods.includes(req.method)) return true;

	// 認証関連のエンドポイントでのみ検証
	if (!req.nextUrl.pathname.startsWith("/api/auth")) return true;

	// 1. Originヘッダーベースの基本検証
	const origin = req.headers.get("origin");
	const referer = req.headers.get("referer");
	const host = req.headers.get("host");

	// Originヘッダーが存在しない場合は失敗
	if (!origin) {
		console.warn("CSRF検出: Originヘッダーが存在しません");
		return false;
	}

	// ホストが一致するか検証
	const originHost = new URL(origin).host;
	if (host !== originHost) {
		console.warn(`CSRF検出: Origin ${origin} がホスト ${host} と一致しません`);
		return false;
	}

	// Refererヘッダーも検証する（二重チェック）
	if (referer) {
		const refererHost = new URL(referer).host;
		if (host !== refererHost) {
			console.warn(
				`CSRF検出: Referer ${referer} がホスト ${host} と一致しません`,
			);
			return false;
		}
	}

	return true;
}

/**
 * レート制限を適用する
 * @param req リクエストオブジェクト
 */
function applyRateLimit(req: NextRequest): boolean {
	// API、認証エンドポイントのみに適用
	const AUTH_PATHS = ["/api", "/login", "/register"];
	const isProtectedPath = AUTH_PATHS.some((path) =>
		req.nextUrl.pathname.startsWith(path),
	);

	if (!isProtectedPath) {
		return true;
	}

	// クライアントIPアドレスの取得
	const forwardedFor = req.headers.get("x-forwarded-for") || "";
	const clientIp = forwardedFor.split(",")[0].trim() || "unknown";

	const now = Date.now();

	// このIPからの初めてのリクエスト
	if (!rateLimitCounter[clientIp]) {
		rateLimitCounter[clientIp] = { count: 1, timestamp: now };
		return true;
	}

	const counter = rateLimitCounter[clientIp];

	// 時間枠をリセット
	if (now - counter.timestamp > RATE_LIMIT.WINDOW_MS) {
		counter.count = 1;
		counter.timestamp = now;
		return true;
	}

	// リクエスト数を増加
	counter.count++;

	// リクエスト数が制限を超えた場合
	if (counter.count > RATE_LIMIT.MAX_REQUESTS) {
		console.warn(
			`レート制限超過: IP ${clientIp}, リクエスト数: ${counter.count}`,
		);
		return false;
	}

	return true;
}

/**
 * セキュリティヘッダーを設定
 * @param response NextResponseオブジェクト
 */
function setSecurityHeaders(response: NextResponse): void {
	response.headers.set("X-Content-Type-Options", "nosniff");
	response.headers.set("X-Frame-Options", "DENY");
	response.headers.set("X-XSS-Protection", "1; mode=block");
}

// Auth.js v5と統合したmiddleware
export default auth((req) => {
	// レスポンスオブジェクトを初期化
	const response = NextResponse.next();

	// セキュリティヘッダーの設定
	setSecurityHeaders(response);

	// CSRF保護
	if (!validateCsrf(req)) {
		return new NextResponse(
			JSON.stringify({ error: "CSRF検証に失敗しました" }),
			{
				status: 403,
				headers: { "Content-Type": "application/json" },
			},
		);
	}

	// レート制限の適用
	if (!applyRateLimit(req)) {
		return new NextResponse(
			JSON.stringify({ error: "レート制限を超過しました" }),
			{
				status: 429,
				headers: {
					"Content-Type": "application/json",
					"Retry-After": "10",
				},
			},
		);
	}

	// Auth.jsによる認証・認可処理も継続
	return response;
});

export const config = {
	// 認証チェックとセキュリティ機能を適用するパス
	matcher: [
		/*
		 * マッチするパス:
		 * - すべてのページとAPIルート（セキュリティヘッダー用）
		 * - 認証が必要なパス（Auth.js用）
		 * 除外するパス:
		 * - /_next/static（静的ファイル）
		 * - /_next/image（画像最適化ファイル）
		 * - /favicon.ico, /sitemap.xml など（静的ファイル）
		 */
		"/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$|.*\\.webp$|.*\\.ico$).*)",
	],
};
