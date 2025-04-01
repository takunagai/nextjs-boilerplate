import { APP, META } from "@/lib/constants";

/**
 * WebサイトのJSON-LD構造化データ
 */
export function WebsiteJsonLd({
  name = APP.NAME,
  description = META.DEFAULT_DESCRIPTION,
  url = META.SITE_URL,
}: {
  name?: string;
  description?: string;
  url?: string;
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name,
          url,
          description,
        }),
      }}
    />
  );
}

/**
 * 組織のJSON-LD構造化データ
 */
export function OrganizationJsonLd({
  name = APP.NAME,
  url = META.SITE_URL,
  logo = `${META.SITE_URL}/images/logo.png`,
  sameAs = [],
}: {
  name?: string;
  url?: string;
  logo?: string;
  sameAs?: string[];
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name,
          url,
          logo,
          sameAs,
        }),
      }}
    />
  );
}

/**
 * 記事ページのJSON-LD構造化データ
 */
export function ArticleJsonLd({
  title,
  description,
  url,
  images,
  datePublished,
  dateModified,
  authorName,
}: {
  title: string;
  description: string;
  url: string;
  images: string[];
  datePublished: string;
  dateModified?: string;
  authorName: string;
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: title,
          description,
          image: images,
          datePublished,
          dateModified: dateModified || datePublished,
          author: {
            "@type": "Person",
            name: authorName,
          },
          publisher: {
            "@type": "Organization",
            name: APP.NAME,
            logo: {
              "@type": "ImageObject",
              url: `${META.SITE_URL}/images/logo.png`,
            },
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": url,
          },
        }),
      }}
    />
  );
}

/**
 * パンくずリストのJSON-LD構造化データ
 */
export function BreadcrumbJsonLd({
  items,
}: {
  items: {
    name: string;
    item?: string;
  }[];
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.item,
          })),
        }),
      }}
    />
  );
}

/**
 * FAQページのJSON-LD構造化データ
 */
export function FaqJsonLd({
  questions,
}: {
  questions: {
    question: string;
    answer: string;
  }[];
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: questions.map((q) => ({
            "@type": "Question",
            name: q.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: q.answer,
            },
          })),
        }),
      }}
    />
  );
}
