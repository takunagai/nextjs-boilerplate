/**
 * 安全なID生成ユーティリティ
 * crypto.randomUUID()のfallbackを提供
 */

/**
 * 一意なIDを生成する
 * crypto.randomUUID()が利用可能な場合はそれを使用し、
 * 利用できない場合はfallbackを使用
 */
export function generateId(): string {
	// crypto.randomUUID()が利用可能かチェック
	if (typeof crypto !== "undefined" && crypto.randomUUID) {
		try {
			return crypto.randomUUID();
		} catch (error) {
			// エラーが発生した場合はfallbackを使用
			console.warn("crypto.randomUUID() failed, using fallback:", error);
		}
	}

	// Fallback: Math.random()ベースのID生成
	return generateFallbackId();
}

/**
 * Math.random()を使用したfallbackID生成
 * RFC4122準拠のUUID v4形式を模倣
 */
function generateFallbackId(): string {
	// xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx の形式
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
		const random = (Math.random() * 16) | 0;
		const value = char === "x" ? random : (random & 0x3) | 0x8;
		return value.toString(16);
	});
}

/**
 * 短縮版ID生成（パフォーマンス重視）
 * 一意性は保証されるが、UUIDほど厳密ではない
 */
export function generateShortId(): string {
	const timestamp = Date.now().toString(36);
	const randomPart = Math.random().toString(36).substring(2, 8);
	return `${timestamp}-${randomPart}`;
}

/**
 * カウンターベースのID生成（同期的、軽量）
 * 同一セッション内での一意性を保証
 */
let idCounter = 0;

export function generateCounterId(prefix = "id"): string {
	return `${prefix}-${++idCounter}-${Date.now().toString(36)}`;
}
