import Link from "next/link";
import ThemeToggle from "../components/ThemeToggle";

const placeholderPhotos = Array.from({ length: 9 }, (_, i) => i + 1);

export default function Work() {
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
			<div className="mx-auto max-w-6xl px-8 pb-24 pt-40 md:px-12">
				{/* Eyebrow */}
				<p className="text-[10px] font-light uppercase tracking-[0.35em] text-amber">
					Work
				</p>

				<h1 className="mt-5 font-heading text-5xl font-light leading-none tracking-wide text-cream md:text-7xl">
					Selected <span className="italic">photographs</span>
				</h1>

				{/* Divider */}
				<div className="mt-10 h-px w-16 bg-amber/40" />

				{/* Photo grid */}
				<div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{placeholderPhotos.map((n) => (
						<div key={n} className="group relative overflow-hidden">
							{/*
                Replace each placeholder with your image:
                  <Image
                    src={`/images/work-${n}.jpg`}
                    alt="Photograph"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
              */}
							<div className="relative aspect-[4/5] w-full bg-surface">
								<div className="absolute inset-0 flex flex-col items-center justify-center gap-3 border border-dashed border-cream/10 transition-colors duration-300 group-hover:border-cream/20">
									<div className="h-8 w-8 rounded-full border border-cream/20" />
									<span className="text-[10px] font-light uppercase tracking-[0.3em] text-cream/20">
										Photo {n}
									</span>
								</div>
							</div>
						</div>
					))}
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
