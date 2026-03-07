import Link from "next/link";
import ThemeToggle from "./components/ThemeToggle";

import Loading from "./loading";
export default function Home() {
	return <Loading />;
}

// export default function Home() {
// 	return (
// 		<main className="relative h-screen w-full overflow-hidden">
// 			{/* ─── HERO BACKGROUND ─── */}
// 			{/*
//         Replace this div with a full-screen background image:
//         - Option A: Use next/image with fill + objectCover
//         - Option B: Set background-image via inline style or CSS
//         - Place images in /public/images/
//         Example:
//           <Image
//             src="/images/hero.jpg"
//             alt="Hero photograph"
//             fill
//             className="object-cover"
//             priority
//           />
//       */}
// 			<div className="absolute inset-0 bg-surface" />

// 			{/* Dark vignette overlay */}
// 			<div className="vignette absolute inset-0 z-10" />

// 			{/* ─── NAV ─── */}
// 			<nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 md:px-12">
// 				{/* Left: page links */}
// 				<ul className="flex gap-8">
// 					{["Work", "About", "Contact"].map((item) => (
// 						<li key={item}>
// 							<Link
// 								href={`/${item.toLowerCase()}`}
// 								className="text-[11px] font-light uppercase tracking-[0.25em] text-cream/40 transition-colors duration-300 hover:text-cream/80"
// 							>
// 								{item}
// 							</Link>
// 						</li>
// 					))}
// 				</ul>

// 				<div className="flex items-center gap-6">
// 				<ThemeToggle />
// 				<a
// 					href="https://instagram.com/sleepy_weirdo"
// 					target="_blank"
// 					rel="noopener noreferrer"
// 					className="text-[11px] font-light uppercase tracking-[0.2em] text-amber transition-opacity duration-300 hover:opacity-70"
// 				>
// 					@sleepy_weirdo
// 				</a>
// 			</div>
// 			</nav>

// 			{/* ─── HERO CONTENT ─── */}
// 			<div className="relative z-20 flex h-full flex-col items-center justify-center text-center">
// 				{/* Eyebrow */}
// 				<p className="text-[10px] font-light uppercase tracking-[0.35em] text-amber">
// 					Photography · London
// 				</p>

// 				{/* Main heading */}
// 				<h1 className="mt-5 font-heading text-6xl font-light leading-none tracking-wide text-cream md:text-8xl">
// 					Sleepy / <span className="italic">Weirdo</span>
// 				</h1>

// 				{/* Tagline */}
// 				<p className="mt-4 text-[11px] font-extralight uppercase tracking-[0.3em] text-cream/50">
// 					Landscapes &amp; quiet moments
// 				</p>

// 				{/* Vertical separator */}
// 				<div className="mt-8 h-10 w-px bg-cream/20" />

// 				{/* CTA */}
// 				<Link
// 					href="#work"
// 					className="mt-6 text-[11px] font-light uppercase tracking-[0.25em] text-cream/60 transition-colors duration-300 hover:text-cream"
// 				>
// 					View work
// 				</Link>
// 			</div>

// 			{/* ─── BOTTOM BAR ─── */}
// 			<div className="absolute bottom-0 left-0 right-0 z-30 flex items-end justify-between px-8 pb-8 md:px-12">
// 				{/* Left: location */}
// 				<div className="flex items-center gap-2">
// 					<span className="inline-block h-1.5 w-1.5 rounded-full bg-olive" />
// 					<span className="text-[10px] font-extralight uppercase tracking-[0.2em] text-cream/40">
// 						London, United Kingdom
// 					</span>
// 				</div>

// 				{/* Centre: animated scroll line */}
// 				<div className="absolute bottom-8 left-1/2 -translate-x-1/2">
// 					<div className="scroll-line h-8 w-px bg-gradient-to-b from-amber/0 via-amber to-amber/0" />
// 				</div>

// 				{/* Right: photo count */}
// 				<span className="text-[10px] font-extralight uppercase tracking-[0.2em] text-cream/40">
// 					387 photos
// 				</span>
// 			</div>
// 		</main>
// 	);
// }
