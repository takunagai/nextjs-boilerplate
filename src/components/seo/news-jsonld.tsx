"use client";

interface NewsJsonLdProps {
	title: string;
	description?: string;
	date: Date;
	category: string;
	url: string;
	organizationName?: string;
	siteName?: string;
}

/**
 * ニュース記事向けのJSON-LD構造化データを生成するコンポーネント
 * @see https://developers.google.com/search/docs/data-types/article
 */
export function NewsJsonLd({
	title,
	description,
	date,
	category,
	url,
	organizationName = "ミラスタ",
	siteName = "hubflow",
}: NewsJsonLdProps) {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "NewsArticle",
		headline: title,
		description: description || title,
		datePublished: date.toISOString(),
		articleSection: category,
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": url,
		},
		publisher: {
			"@type": "Organization",
			name: organizationName,
			logo: {
				"@type": "ImageObject",
				url: `${new URL(url).origin}/images/logo.png`,
			},
		},
		author: {
			"@type": "Organization",
			name: organizationName,
		},
		isAccessibleForFree: true,
		isPartOf: {
			"@type": "WebSite",
			name: siteName,
			url: new URL(url).origin,
		},
	};

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
		/>
	);
}
