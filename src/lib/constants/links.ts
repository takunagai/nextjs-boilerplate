/**
 * リンク関連の定数
 */

/**
 * ソーシャルメディア・外部リンク
 */
import {
	FaFacebook,
	FaGithub,
	FaInstagram,
	FaXTwitter,
	FaYoutube,
} from "react-icons/fa6";

// ソーシャルメディアプラットフォームの定義
export type SocialPlatform =
	| "GITHUB"
	| "X"
	| "INSTAGRAM"
	| "FACEBOOK"
	| "YOUTUBE";

// ソーシャルメディアの設定
export const SOCIAL_LINKS = {
	GITHUB: "https://github.com/takunagai",
	X: "https://x.com/nagataku_ai",
	INSTAGRAM: "https://www.instagram.com/nagataku33/",
	FACEBOOK: "https://www.facebook.com/takuya.nagai.12",
	YOUTUBE: "https://youtube.com",
} as const;

// ソーシャルメディアとアイコンの関連付け
export const SOCIAL_ICONS = {
	GITHUB: FaGithub,
	X: FaXTwitter,
	INSTAGRAM: FaInstagram,
	FACEBOOK: FaFacebook,
	YOUTUBE: FaYoutube,
} as const;

// 表示するソーシャルメディアリスト（順序調整用）
export const DISPLAYED_SOCIAL_PLATFORMS: SocialPlatform[] = [
	"GITHUB",
	"X",
	"INSTAGRAM",
	"FACEBOOK",
	"YOUTUBE",
];
