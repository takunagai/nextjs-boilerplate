import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { THEME, SITE_NAME, META } from "@/lib/constants";
import { WebsiteJsonLd, OrganizationJsonLd } from "@/components/seo";
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
	keywords: ["Next.js", "React", "TypeScript", "Tailwind CSS", "ボイラープレート"],
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
	viewport: {
		width: "device-width",
		initialScale: 1,
	},
	icons: {
		icon: "/favicon.ico",
		apple: "/apple-touch-icon.png",
	},
	manifest: "/site.webmanifest",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme={THEME.DEFAULT}
					enableSystem
					disableTransitionOnChange
				>
					<WebsiteJsonLd />
					<OrganizationJsonLd />
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
						<main className="flex-grow">
							{children}
						</main>
						<Footer />
						<ScrollToTop />
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
