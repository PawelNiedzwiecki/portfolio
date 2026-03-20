import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import BottomBar from "./components/BottomBar";
import Nav from "./components/Nav";
import "./globals.css";
import {
	OG_IMAGE,
	SITE_DESCRIPTION,
	SITE_NAME,
	SITE_TITLE,
	SITE_URL,
} from "@/lib/seo";

const cormorant = Cormorant_Garamond({
	subsets: ["latin"],
	weight: ["300", "400"],
	style: ["normal", "italic"],
	variable: "--font-cormorant",
	display: "swap",
});

const jost = Jost({
	subsets: ["latin"],
	weight: ["200", "300"],
	variable: "--font-jost",
	display: "swap",
});

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: {
		default: SITE_TITLE,
		template: `%s — ${SITE_NAME}`,
	},
	description: SITE_DESCRIPTION,
	openGraph: {
		type: "website",
		siteName: SITE_NAME,
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		url: SITE_URL,
		images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: SITE_TITLE }],
	},
	twitter: {
		card: "summary_large_image",
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		images: [OG_IMAGE],
	},
	alternates: {
		canonical: SITE_URL,
	},
	robots: {
		index: true,
		follow: true,
	},
};

const jsonLd = JSON.stringify([
	{
		"@context": "https://schema.org",
		"@type": "Person",
		name: SITE_NAME,
		url: SITE_URL,
		jobTitle: "Photographer",
		worksFor: { "@type": "Organization", name: "Independent" },
		address: {
			"@type": "PostalAddress",
			addressLocality: "London",
			addressCountry: "GB",
		},
		sameAs: ["https://instagram.com/sleepy_weirdo"],
	},
	{
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: SITE_NAME,
		url: SITE_URL,
	},
]);

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<script
					dangerouslySetInnerHTML={{
						__html: `(function(){var s=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;if((s??( d?'dark':'light'))==='light')document.documentElement.setAttribute('data-theme','light');})();`,
					}}
				/>
			</head>
			<body
				className={`${cormorant.variable} ${jost.variable} font-body antialiased flex min-h-screen flex-col`}
			>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: jsonLd }}
				/>
				<Nav />
				<div className="flex-1">{children}</div>
				<BottomBar />
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
