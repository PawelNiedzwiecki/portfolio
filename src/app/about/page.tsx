import Image from "next/image";
import Link from "next/link";

export default function About() {
	return (
		<main className="min-h-screen bg-bg text-cream">
			{/* ─── CONTENT ─── */}
			<div className="mx-auto max-w-5xl px-8 pb-24 pt-40 md:px-12">
				{/* Eyebrow */}
				<p className="animate-fade-slide-up delay-100 text-[10px] font-light uppercase tracking-[0.35em] text-amber">
					About
				</p>

				<h1 className="animate-fade-slide-up delay-200 mt-5 font-heading text-5xl font-light leading-none tracking-wide text-cream md:text-7xl">
					The person <span className="italic">behind</span> the lens
				</h1>

				{/* Divider */}
				<div className="animate-divider-grow delay-300 mt-10 h-px w-16 bg-amber/40" />

				{/* Two-column layout */}
				<div className="mt-16 grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-24">
					{/* Left: text */}
					<div className="flex flex-col gap-6">
						<p className="animate-fade-slide-up delay-400 text-[13px] font-extralight leading-relaxed tracking-wide text-cream/70">
							I&apos;m a photographer based in London, drawn to quiet
							landscapes, fleeting light, and the kind of moments most people
							walk past without noticing. My work lives somewhere between
							documentary instinct and a slower, more contemplative way of
							seeing.
						</p>
						<p className="animate-fade-slide-up delay-500 text-[13px] font-extralight leading-relaxed tracking-wide text-cream/70">
							I shoot mostly on film, favouring early mornings and overcast
							skies. There&apos;s something about muted tones and soft diffusion
							that feels closer to memory than reality — and that&apos;s exactly
							where I want to be.
						</p>
						<p className="animate-fade-slide-up delay-600 text-[13px] font-extralight leading-relaxed tracking-wide text-cream/70">
							When I&apos;m not out with a camera, I&apos;m probably reading,
							drinking too much coffee, or staring out a rain-streaked window.
						</p>

						{/* Contact link */}
						<div className="animate-fade-slide-up delay-700 mt-4 flex items-center gap-4">
							<div className="h-px w-8 bg-amber/40" />
							<Link
								href="/contact"
								className="text-[11px] font-light uppercase tracking-[0.25em] text-cream/50 transition-colors duration-300 hover:text-cream"
							>
								Get in touch
							</Link>
						</div>

						{/* Other projects */}
						<div className="animate-fade-slide-up delay-700 mt-8 border-t border-cream/10 pt-8">
							<p className="mb-4 text-[10px] font-light uppercase tracking-[0.35em] text-amber">
								Other projects
							</p>
							<Link
								href="https://whounfollowedu.com"
								target="_blank"
								rel="noopener noreferrer"
								className="group flex items-center gap-3"
							>
								<div className="h-px w-8 bg-amber/40 transition-all duration-300 group-hover:w-12 group-hover:bg-amber" />
								<span className="text-[11px] font-light uppercase tracking-[0.25em] text-cream/50 transition-colors duration-300 group-hover:text-cream">
									whounfollowedu.com
								</span>
							</Link>
						</div>
					</div>

					{/* Right: image */}
					<div className="animate-fade-slide-left delay-400 relative">
						<div className="relative aspect-3/4 w-full overflow-hidden bg-surface">
							<Image
								src="/images/portraits/man-flannel-shirt-indoor-closeup.jpg"
								alt="Portrait"
								fill
								className="object-cover transition-transform duration-700 hover:scale-[1.03]"
							/>
						</div>

						{/* Decorative caption */}
						<p className="animate-fade-in delay-700 mt-3 text-right text-[10px] font-extralight uppercase tracking-[0.2em] text-cream/25">
							London, 2024
						</p>
					</div>
				</div>
			</div>
		</main>
	);
}
