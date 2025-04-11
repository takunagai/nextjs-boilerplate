"use client";

import { META } from "@/lib/constants";

interface NewsJsonLdProps {
	title: string;
	description?: string;
	date: Date;
	category: string;
	url: string;
	image?: string;
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
	image,
	organizationName = "ミラスタ",
	siteName = META.DEFAULT_TITLE || "hubflow",
}: NewsJsonLdProps) {
	const origin = new URL(url).origin;
	const defaultImage = `${origin}/images/logo.png`;
	const imageUrl = image || defaultImage;

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "NewsArticle",
		headline: title,
		description: description || title,
		datePublished: date.toISOString(),
		dateModified: date.toISOString(),
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
				url: defaultImage,
				width: "112",
				height: "112",
			},
		},
		author: {
			"@type": "Organization",
			name: organizationName,
		},
		image: {
			"@type": "ImageObject",
			url: imageUrl,
			width: "1200",
			height: "630",
		},
		isAccessibleForFree: true,
		isPartOf: {
			"@type": "WebSite",
			name: siteName,
			url: origin,
		},
		inLanguage: "ja",
		copyrightYear: new Date().getFullYear(),
		copyrightHolder: {
			"@type": "Organization",
			name: organizationName,
		},
	};

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
		/>
	);
}
