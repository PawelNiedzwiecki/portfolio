"use client";

import { InstagramLogoIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomBar() {
	const pathname = usePathname();
	const isHome = pathname === "/";
	const isMainPage = ["/work", "/about", "/contact"].includes(pathname);

	return (
		<div className="fixed bottom-0 left-0 right-0 z-30 flex items-end justify-between px-8 pb-8 md:px-12">
			{/* Left: location + Instagram */}
			<div className="flex items-center gap-4">
				<div className="flex items-center gap-2">
					<span className="inline-block h-1.5 w-1.5 rounded-full bg-olive" />
					<span className="text-[10px] font-extralight uppercase tracking-[0.2em] text-cream/40">
						London, United Kingdom
					</span>
				</div>
				<a
					href="https://instagram.com/sleepy_weirdo"
					target="_blank"
					rel="noopener noreferrer"
					className="text-cream/40 transition-colors duration-300 hover:text-cream/80"
					aria-label="Instagram"
				>
					<InstagramLogoIcon size={14} weight="light" />
				</a>
			</div>

			{/* Centre: scroll line (home only) */}
			{isHome && (
				<div className="absolute bottom-8 left-1/2 -translate-x-1/2">
					<div className="scroll-line h-8 w-px bg-gradient-to-b from-amber/0 via-amber to-amber/0" />
				</div>
			)}

			{/* Right */}
			{isHome ? (
				<span className="text-[10px] font-extralight uppercase tracking-[0.2em] text-cream/40">
					387 photos
				</span>
			) : isMainPage ? (
				<Link
					href="/"
					className="text-[11px] font-light uppercase tracking-[0.25em] text-cream/30 transition-colors duration-300 hover:text-cream/60"
				>
					Back to home
				</Link>
			) : (
				<span className="text-[10px] font-extralight uppercase tracking-[0.2em] text-cream/40">
					Sleepy / Weirdo
				</span>
			)}
		</div>
	);
}
