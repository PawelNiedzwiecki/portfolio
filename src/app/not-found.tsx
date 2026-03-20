import Link from "next/link";

export default function NotFound() {
	return (
		<main className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-bg text-cream">
			{/* Vignette */}
			<div className="vignette absolute inset-0 z-10" />

			{/* Content */}
			<div className="relative z-20 flex flex-col items-center text-center">
				<p className="text-[10px] font-light uppercase tracking-[0.35em] text-amber">
					404 · Not Found
				</p>

				<h1 className="mt-5 font-heading text-6xl font-light leading-none tracking-wide text-cream md:text-8xl">
					Lost in <span className="italic">the mist</span>
				</h1>

				<p className="mt-6 text-[11px] font-extralight uppercase tracking-[0.3em] text-cream/50">
					This frame doesn&apos;t exist
				</p>

				<div className="mt-8 h-10 w-px bg-cream/20" />

				<Link
					href="/"
					className="mt-6 text-[11px] font-light uppercase tracking-[0.25em] text-cream/60 transition-colors duration-300 hover:text-cream"
				>
					Return home
				</Link>
			</div>
		</main>
	);
}
