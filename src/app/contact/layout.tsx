import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
	title: "Contact",
	description:
		"Get in touch with Pawel Niedzwiecki for commissions, collaborations, or just to say hello.",
	alternates: { canonical: `${SITE_URL}/contact` },
	openGraph: {
		title: `Contact — ${SITE_NAME}`,
		description:
			"Get in touch with Pawel Niedzwiecki for commissions, collaborations, or just to say hello.",
		url: `${SITE_URL}/contact`,
	},
};

export default function ContactLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}
