import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "../components/ThemeToggle";

export default function About() {
	return (
		<main className="min-h-screen bg-bg text-cream">
			{/* ─── NAV ─── */}
			<nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 md:px-12">
				<ul className="flex gap-8">
					{["Work", "About", "Contact"].map((item) => (
						<li key={item}>
							<Link
								href={`/${item.toLowerCase()}`}
								className="text-[11px] font-light uppercase tracking-[0.25em] text-cream/40 transition-colors duration-300 hover:text-cream/80"
							>
								{item}
							</Link>
						</li>
					))}
				</ul>

				<div className="flex items-center gap-6">
					<ThemeToggle />
					<a
						href="https://instagram.com/sleepy_weirdo"
						target="_blank"
						rel="noopener noreferrer"
						className="text-[11px] font-light uppercase tracking-[0.2em] text-amber transition-opacity duration-300 hover:opacity-70"
					>
						@sleepy_weirdo
					</a>
				</div>
			</nav>

			{/* ─── CONTENT ─── */}
			<div className="mx-auto max-w-5xl px-8 pb-24 pt-40 md:px-12">
				{/* Eyebrow */}
				<p className="text-[10px] font-light uppercase tracking-[0.35em] text-amber">
					About
				</p>

				<h1 className="mt-5 font-heading text-5xl font-light leading-none tracking-wide text-cream md:text-7xl">
					The person <span className="italic">behind</span> the lens
				</h1>

				{/* Divider */}
				<div className="mt-10 h-px w-16 bg-amber/40" />

				{/* Two-column layout */}
				<div className="mt-16 grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-24">
					{/* Left: text */}
					<div className="flex flex-col gap-6">
						<p className="text-[13px] font-extralight leading-relaxed tracking-wide text-cream/70">
							I&apos;m a photographer based in London, drawn to quiet
							landscapes, fleeting light, and the kind of moments most people
							walk past without noticing. My work lives somewhere between
							documentary instinct and a slower, more contemplative way of
							seeing.
						</p>
						<p className="text-[13px] font-extralight leading-relaxed tracking-wide text-cream/70">
							I shoot mostly on film, favouring early mornings and overcast
							skies. There&apos;s something about muted tones and soft diffusion
							that feels closer to memory than reality — and that&apos;s exactly
							where I want to be.
						</p>
						<p className="text-[13px] font-extralight leading-relaxed tracking-wide text-cream/70">
							When I&apos;m not out with a camera, I&apos;m probably reading,
							drinking too much coffee, or staring out a rain-streaked window.
						</p>

						{/* Contact link */}
						<div className="mt-4 flex items-center gap-4">
							<div className="h-px w-8 bg-amber/40" />
							<Link
								href="/contact"
								className="text-[11px] font-light uppercase tracking-[0.25em] text-cream/50 transition-colors duration-300 hover:text-cream"
							>
								Get in touch
							</Link>
						</div>
					</div>

					{/* Right: image placeholder */}
					<div className="relative">
						<div className="relative aspect-3/4 w-full overflow-hidden bg-surface">
							<Image
								src="/images/portraits/man-flannel-shirt-indoor-closeup.jpg"
								alt="Portrait"
								fill
								className="object-cover"
							/>
						</div>

						{/* Decorative caption */}
						<p className="mt-3 text-right text-[10px] font-extralight uppercase tracking-[0.2em] text-cream/25">
							London, 2024
						</p>
					</div>
				</div>
			</div>

			{/* ─── BOTTOM BAR ─── */}
			<div className="fixed bottom-0 left-0 right-0 z-30 flex items-end justify-between px-8 pb-8 md:px-12">
				<div className="flex items-center gap-2">
					<span className="inline-block h-1.5 w-1.5 rounded-full bg-olive" />
					<span className="text-[10px] font-extralight uppercase tracking-[0.2em] text-cream/40">
						London, United Kingdom
					</span>
				</div>

				<Link
					href="/"
					className="text-[11px] font-light uppercase tracking-[0.25em] text-cream/30 transition-colors duration-300 hover:text-cream/60"
				>
					Back to home
				</Link>
			</div>
		</main>
	);
}
