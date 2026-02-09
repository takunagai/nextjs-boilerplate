import sanitizeHtml from "sanitize-html";

/**
 * HTMLコンテンツをサニタイズしてXSS攻撃を防止する
 *
 * 許可されたタグと属性のみを残し、危険なスクリプトやイベントハンドラを除去する。
 * aタグには自動でrel="noopener noreferrer"を付与する。
 */
export function sanitizeNewsContent(dirty: string): string {
	return sanitizeHtml(dirty, {
		allowedTags: [
			"h1",
			"h2",
			"h3",
			"h4",
			"h5",
			"h6",
			"p",
			"a",
			"ul",
			"ol",
			"li",
			"strong",
			"em",
			"code",
			"pre",
			"blockquote",
			"img",
			"br",
			"hr",
			"table",
			"thead",
			"tbody",
			"tr",
			"th",
			"td",
		],
		allowedAttributes: {
			a: ["href", "target", "rel"],
			img: ["src", "alt", "class"],
			"*": ["class", "id"],
		},
		transformTags: {
			a: sanitizeHtml.simpleTransform("a", {
				rel: "noopener noreferrer",
			}),
		},
	});
}
