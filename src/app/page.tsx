import Link from "next/link";

export default function Home() {
	return (
		<main className="relative h-screen w-full overflow-hidden">
			{/* ─── HERO BACKGROUND ─── */}
			{/*
        Replace this div with a full-screen background image:
        - Option A: Use next/image with fill + objectCover
        - Option B: Set background-image via inline style or CSS
        - Place images in /public/images/
        Example:
          <Image
            src="/images/hero.jpg"
            alt="Hero photograph"
            fill
            className="object-cover"
            priority
          />
      */}
			<div className="absolute inset-0 bg-surface" />

			{/* Dark vignette overlay */}
			<div className="vignette absolute inset-0 z-10" />

			{/* ─── HERO CONTENT ─── */}
			<div className="relative z-20 flex h-full flex-col items-center justify-center text-center">
				{/* Eyebrow */}
				<p className="animate-fade-slide-up delay-100 text-[10px] font-light uppercase tracking-[0.35em] text-amber">
					Photography · London
				</p>

				{/* Main heading */}
				<h1 className="animate-fade-slide-up delay-200 mt-5 font-heading text-6xl font-light leading-none tracking-wide text-cream md:text-8xl">
					Pawel <span className="italic">Niedzwiecki</span>
				</h1>

				{/* Tagline */}
				<p className="animate-fade-slide-up delay-300 mt-4 text-[11px] font-extralight uppercase tracking-[0.3em] text-cream/50">
					Landscapes &amp; quiet moments
				</p>

				{/* Vertical separator */}
				<div className="animate-fade-in delay-500 mt-8 h-10 w-px bg-cream/20" />

				{/* CTA */}
				<Link
					href="/work"
					className="animate-fade-slide-up delay-600 mt-6 text-[11px] font-light uppercase tracking-[0.25em] text-cream/60 transition-colors duration-300 hover:text-cream"
				>
					View work
				</Link>
			</div>
		</main>
	);
}
