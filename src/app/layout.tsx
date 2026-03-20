import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import BottomBar from "./components/BottomBar";
import Nav from "./components/Nav";
import "./globals.css";

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
	title: "Sleepy Weirdo — Photography",
	description:
		"Landscapes & quiet moments. Photography portfolio based in London.",
};

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
				className={`${cormorant.variable} ${jost.variable} font-body antialiased`}
			>
				<Nav />
				<BottomBar />
				<Analytics />
				<SpeedInsights />
				{children}
			</body>
		</html>
	);
}
