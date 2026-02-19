import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

// Edge Runtimeでは通常のMapを使用（メモリリークを防ぐため定期的なクリーンアップが必要）
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();

// レート制限の設定
const RATE_LIMIT = {
	// 10秒間のリクエスト上限
	MAX_REQUESTS: 20,
	// レート制限のウィンドウ（10秒）
	WINDOW_MS: 10 * 1000,
	// クリーンアップ間隔（1分）
	CLEANUP_INTERVAL: 60 * 1000,
};

// 古いエントリをクリーンアップ
function cleanupRateLimitMap() {
	const now = Date.now();
	for (const [key, value] of rateLimitMap.entries()) {
		if (now - value.timestamp > RATE_LIMIT.CLEANUP_INTERVAL) {
			rateLimitMap.delete(key);
		}
	}
}

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

	// 定期的なクリーンアップ（10回に1回実行）
	if (Math.random() < 0.1) {
		cleanupRateLimitMap();
	}

	// クライアントIPアドレスの取得
	const forwardedFor = req.headers.get("x-forwarded-for") || "";
	const clientIp = forwardedFor.split(",")[0].trim() || "unknown";

	const now = Date.now();
	const rateLimitData = rateLimitMap.get(clientIp);

	// このIPからの初めてのリクエスト
	if (!rateLimitData) {
		rateLimitMap.set(clientIp, { count: 1, timestamp: now });
		return true;
	}

	// 時間枠をリセット
	if (now - rateLimitData.timestamp > RATE_LIMIT.WINDOW_MS) {
		rateLimitData.count = 1;
		rateLimitData.timestamp = now;
		return true;
	}

	// リクエスト数を増加
	rateLimitData.count++;

	// リクエスト数が制限を超えた場合
	if (rateLimitData.count > RATE_LIMIT.MAX_REQUESTS) {
		console.warn(
			`レート制限超過: IP ${clientIp}, リクエスト数: ${rateLimitData.count}`,
		);
		return false;
	}

	return true;
}

/**
 * セキュリティヘッダーを設定
 * @param response NextResponseオブジェクト
 * @param req リクエストオブジェクト
 */
function setSecurityHeaders(response: NextResponse, req: NextRequest): void {
	// 基本的なセキュリティヘッダー
	response.headers.set("X-Content-Type-Options", "nosniff");
	response.headers.set("X-Frame-Options", "DENY");
	response.headers.set("X-XSS-Protection", "1; mode=block");
	response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
	response.headers.set(
		"Permissions-Policy",
		"camera=(), microphone=(), geolocation=()",
	);

	// HSTS (HTTP Strict Transport Security)
	// 本番環境でHTTPSを使用している場合のみ有効
	if (process.env.NODE_ENV === "production") {
		response.headers.set(
			"Strict-Transport-Security",
			"max-age=31536000; includeSubDomains",
		);
	}

	// Content Security Policy (CSP)
	// 開発環境と本番環境で異なる設定
	const isDevelopment = process.env.NODE_ENV === "development";

	const cspDirectives = [
		"default-src 'self'",
		"script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net",
		"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
		"img-src 'self' data: blob: https: http:",
		"font-src 'self' data: https://fonts.gstatic.com",
		"connect-src 'self' https://api.github.com https://vitals.vercel-insights.com",
		"media-src 'self'",
		"object-src 'none'",
		"child-src 'self'",
		"frame-src 'self'",
		"frame-ancestors 'none'",
		"base-uri 'self'",
		"form-action 'self'",
		"manifest-src 'self'",
		"worker-src 'self' blob:",
	];

	// 開発環境では webpack-hmr のための設定を追加
	if (isDevelopment) {
		cspDirectives.push("connect-src 'self' ws: wss: http: https:");
	}

	response.headers.set("Content-Security-Policy", cspDirectives.join("; "));
}

// 通常のmiddleware関数（テスト目的）
export default function middleware(req: NextRequest) {
	console.log("Middleware called for:", req.nextUrl.pathname);

	// CSRF保護
	if (!validateCsrf(req)) {
		const errorResponse = new NextResponse(
			JSON.stringify({ error: "CSRF検証に失敗しました" }),
			{
				status: 403,
				headers: { "Content-Type": "application/json" },
			},
		);
		setSecurityHeaders(errorResponse, req);
		return errorResponse;
	}

	// レート制限の適用
	if (!applyRateLimit(req)) {
		const errorResponse = new NextResponse(
			JSON.stringify({ error: "レート制限を超過しました" }),
			{
				status: 429,
				headers: {
					"Content-Type": "application/json",
					"Retry-After": "10",
				},
			},
		);
		setSecurityHeaders(errorResponse, req);
		return errorResponse;
	}

	// 通常のレスポンスを作成
	const response = NextResponse.next();

	// セキュリティヘッダーの設定
	setSecurityHeaders(response, req);

	return response;
}

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
