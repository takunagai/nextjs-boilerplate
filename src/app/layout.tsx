import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { OrganizationJsonLd, WebsiteJsonLd } from "@/components/seo";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { META, SITE_NAME, THEME } from "@/lib/constants";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: {
		default: SITE_NAME,
		template: META.TITLE_TEMPLATE,
	},
	description: META.DEFAULT_DESCRIPTION,
	keywords: [
		"Next.js",
		"React",
		"TypeScript",
		"Tailwind CSS",
		"ボイラープレート",
	],
	authors: [{ name: SITE_NAME }],
	creator: SITE_NAME,
	publisher: SITE_NAME,
	robots: {
		index: true,
		follow: true,
	},
	alternates: {
		canonical: META.SITE_URL,
	},
	openGraph: {
		type: "website",
		locale: "ja_JP",
		url: META.SITE_URL,
		siteName: SITE_NAME,
		title: SITE_NAME,
		description: META.DEFAULT_DESCRIPTION,
		images: [
			{
				url: META.OG_IMAGE,
				width: 1200,
				height: 630,
				alt: SITE_NAME,
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: SITE_NAME,
		description: META.DEFAULT_DESCRIPTION,
		images: [META.OG_IMAGE],
	},
	metadataBase: new URL(META.SITE_URL),
	// アイコンとマニフェストの設定
	icons: {
		icon: "/favicon.ico",
		apple: "/apple-touch-icon.png",
	},
	manifest: "/site.webmanifest",
};

// viewportをmetadataから分離
export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 5,
	userScalable: true,
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#ffffff" },
		{ media: "(prefers-color-scheme: dark)", color: "#09090b" },
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja" suppressHydrationWarning>
			<head>
				<script
					dangerouslySetInnerHTML={{
						__html: `
              // ページ読み込み時のテーマのフラッシュ問題が起きないよう
              // Reactコンポーネントのマウント前にテーマを適用
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else if (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {
                  console.error('テーマ初期化エラー:', e);
                }
              })();
            `,
					}}
				/>
				<WebsiteJsonLd />
				<OrganizationJsonLd />
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<ThemeProvider defaultTheme={THEME.DEFAULT} disableTransitionOnChange>
					<div className="flex flex-col min-h-screen">
						<Header
							logoText={SITE_NAME}
							items={[
								{ label: "ホーム", href: "/" },
								{ label: "自己紹介", href: "/about" },
								{ label: "お問い合わせ", href: "/contact" },
								{ label: "プライバシーポリシー", href: "/privacy" },
							]}
						/>
						<main className="flex-grow">{children}</main>
						<Footer />
						<ScrollToTop />
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
