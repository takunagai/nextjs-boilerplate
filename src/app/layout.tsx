import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { OrganizationJsonLd, WebsiteJsonLd } from "@/components/seo";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { APP, META } from "@/lib/constants";
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
		default: APP.NAME,
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
	authors: [{ name: APP.NAME }],
	creator: APP.NAME,
	publisher: APP.NAME,
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
		siteName: APP.NAME,
		title: APP.NAME,
		description: META.DEFAULT_DESCRIPTION,
		images: [
			{
				url: `${META.SITE_URL}${META.OG_IMAGE}`,
				width: 1200,
				height: 630,
				alt: APP.NAME,
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		site: META.TWITTER_HANDLE,
		creator: META.TWITTER_HANDLE,
		title: APP.NAME,
		description: META.DEFAULT_DESCRIPTION,
		images: [`${META.SITE_URL}${META.OG_IMAGE}`],
	},
	icons: {
		icon: META.FAVICON,
		apple: META.APPLE_TOUCH_ICON,
	},
	manifest: META.MANIFEST,
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
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
				<WebsiteJsonLd />
				<OrganizationJsonLd />
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<ThemeProvider>
					<div className="flex flex-col min-h-screen">
						<Header
							logoText={APP.NAME}
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
