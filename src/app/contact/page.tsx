import Link from "next/link";
import ThemeToggle from "../components/ThemeToggle";

export default function Contact() {
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
			<div className="mx-auto max-w-2xl px-8 pb-24 pt-40 md:px-12">
				{/* Eyebrow */}
				<p className="text-[10px] font-light uppercase tracking-[0.35em] text-amber">
					Contact
				</p>

				<h1 className="mt-5 font-heading text-5xl font-light leading-none tracking-wide text-cream md:text-7xl">
					Get in <span className="italic">touch</span>
				</h1>

				<p className="mt-6 text-[13px] font-extralight leading-relaxed tracking-wide text-cream/50">
					For commissions, collaborations, or just to say hello — fill out the
					form below and I&apos;ll get back to you.
				</p>

				{/* Divider */}
				<div className="mt-10 h-px w-16 bg-amber/40" />

				{/* Form */}
				<form className="mt-12 flex flex-col gap-8">
					<div className="flex flex-col gap-2">
						<label className="text-[10px] font-light uppercase tracking-[0.3em] text-cream/40">
							Name
						</label>
						<input
							type="text"
							name="name"
							placeholder="Your name"
							className="border-b border-cream/15 bg-transparent pb-3 text-[13px] font-extralight tracking-wide text-cream placeholder-cream/20 outline-none transition-colors duration-300 focus:border-cream/40"
						/>
					</div>

					<div className="flex flex-col gap-2">
						<label className="text-[10px] font-light uppercase tracking-[0.3em] text-cream/40">
							Email
						</label>
						<input
							type="email"
							name="email"
							placeholder="your@email.com"
							className="border-b border-cream/15 bg-transparent pb-3 text-[13px] font-extralight tracking-wide text-cream placeholder-cream/20 outline-none transition-colors duration-300 focus:border-cream/40"
						/>
					</div>

					<div className="flex flex-col gap-2">
						<label className="text-[10px] font-light uppercase tracking-[0.3em] text-cream/40">
							Message
						</label>
						<textarea
							name="message"
							rows={5}
							placeholder="What&apos;s on your mind?"
							className="resize-none border-b border-cream/15 bg-transparent pb-3 text-[13px] font-extralight leading-relaxed tracking-wide text-cream placeholder-cream/20 outline-none transition-colors duration-300 focus:border-cream/40"
						/>
					</div>

					<div className="flex items-center gap-4 pt-2">
						<div className="h-px flex-1 bg-cream/10" />
						<button
							type="submit"
							className="text-[11px] font-light uppercase tracking-[0.25em] text-cream/50 transition-colors duration-300 hover:text-cream"
						>
							Send message
						</button>
					</div>
				</form>
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
