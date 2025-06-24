// サーバーサイド専用のCSRFユーティリティ
// このファイルはクライアントサイドでは使用できません

/**
 * CSRFトークンの設定
 */
const CSRF_CONFIG = {
	TOKEN_LENGTH: 32,
	EXPIRES_IN_MINUTES: 60,
	COOKIE_NAME: "__csrf_token",
	HEADER_NAME: "x-csrf-token",
} as const;

/**
 * CSRFトークンとその有効期限を含む構造
 */
interface CsrfTokenData {
	token: string;
	expiresAt: number;
}

/**
 * セキュアなランダムトークンを生成
 */
function generateSecureToken(
	length: number = CSRF_CONFIG.TOKEN_LENGTH,
): string {
	// サーバーサイドでのみ実行される
	const crypto = require("node:crypto");
	return crypto.randomBytes(length).toString("hex");
}

/**
 * CSRFトークンを生成する
 * @returns {CsrfTokenData} CSRFトークンと有効期限
 */
export function generateCsrfToken(): CsrfTokenData {
	const token = generateSecureToken();
	const expiresAt = Date.now() + CSRF_CONFIG.EXPIRES_IN_MINUTES * 60 * 1000;

	return {
		token,
		expiresAt,
	};
}

/**
 * CSRFトークンを検証する
 * @param {string} submittedToken 送信されたCSRFトークン
 * @param {string} storedTokenData 保存されているCSRFトークンデータ（JSON文字列）
 * @returns {boolean} 検証結果
 */
export function verifyCsrfToken(
	submittedToken: string,
	storedTokenData: string,
): boolean {
	if (!submittedToken || !storedTokenData) {
		return false;
	}

	try {
		const tokenData: CsrfTokenData = JSON.parse(storedTokenData);

		// トークンの有効期限をチェック
		if (Date.now() > tokenData.expiresAt) {
			return false;
		}

		// 定数時間比較でトークンを検証（タイミング攻撃を防ぐ）
		const crypto = require("node:crypto");
		return crypto.timingSafeEqual(
			Buffer.from(submittedToken, "hex"),
			Buffer.from(tokenData.token, "hex"),
		);
	} catch {
		return false;
	}
}

/**
 * CSRFトークンからCookieの値を生成
 * @param {CsrfTokenData} tokenData CSRFトークンデータ
 * @returns {string} Cookie用の値（JSON文字列）
 */
export function createCsrfCookie(tokenData: CsrfTokenData): string {
	return JSON.stringify(tokenData);
}

/**
 * CSRF設定の定数をエクスポート
 */
export const CSRF_CONSTANTS = CSRF_CONFIG;
