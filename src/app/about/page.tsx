import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
	title: "About",
	description:
		"Pawel Niedzwiecki is a photographer based in London, drawn to quiet landscapes, fleeting light, and contemplative documentary work shot mostly on film.",
	alternates: { canonical: `${SITE_URL}/about` },
	openGraph: {
		title: `About — ${SITE_NAME}`,
		description:
			"Pawel Niedzwiecki is a photographer based in London, drawn to quiet landscapes, fleeting light, and contemplative documentary work shot mostly on film.",
		url: `${SITE_URL}/about`,
	},
};

export default function About() {
	return (
		<main className="min-h-screen">
			<div className="mx-auto max-w-5xl px-8 pb-24 pt-36 md:px-12">
				<p className="text-[10px] font-light uppercase tracking-[0.35em] text-fg/40">
					About
				</p>

				<h1 className="mt-4 font-heading text-5xl font-light leading-none tracking-wide text-fg md:text-7xl">
					The person <span className="italic">behind</span> the lens
				</h1>

				<div className="mt-8 h-px w-12 bg-fg/15" />

				<div className="mt-16 grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-24">
					<div className="flex flex-col gap-6">
						<p className="text-[13px] font-light leading-relaxed tracking-wide text-fg/60">
							I&apos;m a photographer based in London, drawn to quiet
							landscapes, fleeting light, and the kind of moments most people
							walk past without noticing. My work lives somewhere between
							documentary instinct and a slower, more contemplative way of
							seeing.
						</p>
						<p className="text-[13px] font-light leading-relaxed tracking-wide text-fg/60">
							I shoot mostly on film, favouring early mornings and overcast
							skies. There&apos;s something about muted tones and soft diffusion
							that feels closer to memory than reality — and that&apos;s exactly
							where I want to be.
						</p>
						<p className="text-[13px] font-light leading-relaxed tracking-wide text-fg/60">
							When I&apos;m not out with a camera, I&apos;m probably reading,
							drinking too much coffee, or staring out a rain-streaked window.
						</p>

						<div className="mt-4">
							<Link
								href="/contact"
								className="text-[11px] font-light uppercase tracking-[0.25em] text-fg/40 underline-offset-4 transition-colors duration-300 hover:text-fg/70 hover:underline"
							>
								Get in touch
							</Link>
						</div>

						<div className="mt-8 border-t border-fg/10 pt-8">
							<p className="mb-4 text-[10px] font-light uppercase tracking-[0.35em] text-fg/35">
								Other projects
							</p>
							<a
								href="https://whounfollowedu.com"
								target="_blank"
								rel="noopener noreferrer"
								className="text-[11px] font-light uppercase tracking-[0.25em] text-fg/40 underline-offset-4 transition-colors duration-300 hover:text-fg/70 hover:underline"
							>
								whounfollowedu.com
							</a>
						</div>
					</div>

					<div className="relative">
						<div className="relative aspect-3/4 w-full overflow-hidden bg-surface">
							<Image
								src="/images/portraits/man-flannel-shirt-indoor-closeup.jpg"
								alt="Portrait"
								fill
								className="object-cover transition-transform duration-700 hover:scale-[1.03]"
							/>
						</div>
						<p className="mt-3 text-right text-[10px] font-light uppercase tracking-[0.2em] text-fg/25">
							London, 2024
						</p>
					</div>
				</div>
			</div>
		</main>
	);
}
