import { type NextRequest, NextResponse } from "next/server";
import {
	CSRF_CONSTANTS,
	createCsrfCookie,
	generateCsrfToken,
} from "@/lib/security/csrf";

/**
 * CSRFトークンを生成して返すエンドポイント
 */
export async function GET(request: NextRequest) {
	try {
		// 新しいCSRFトークンを生成
		const tokenData = generateCsrfToken();

		// レスポンスの作成
		const response = NextResponse.json({
			success: true,
			csrfToken: tokenData.token,
			expiresAt: tokenData.expiresAt,
		});

		// CSRFトークンをHTTPOnlyクッキーとして設定
		response.cookies.set(
			CSRF_CONSTANTS.COOKIE_NAME,
			createCsrfCookie(tokenData),
			{
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "strict",
				maxAge: CSRF_CONSTANTS.EXPIRES_IN_MINUTES * 60, // 秒単位
				path: "/",
			},
		);

		return response;
	} catch (error) {
		console.error("CSRFトークン生成エラー:", error);

		return NextResponse.json(
			{
				success: false,
				error: "CSRFトークンの生成に失敗しました",
			},
			{ status: 500 },
		);
	}
}
