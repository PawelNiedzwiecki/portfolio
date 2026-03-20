"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<main className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-bg text-cream">
			{/* Vignette */}
			<div className="vignette absolute inset-0 z-10" />

			{/* Content */}
			<div className="relative z-20 flex flex-col items-center text-center">
				<p className="text-[10px] font-light uppercase tracking-[0.35em] text-amber">
					Error · Something went wrong
				</p>

				<h1 className="mt-5 font-heading text-6xl font-light leading-none tracking-wide text-cream md:text-8xl">
					Exposure <span className="italic">failed</span>
				</h1>

				<p className="mt-6 text-[11px] font-extralight uppercase tracking-[0.3em] text-cream/50">
					An unexpected error occurred
				</p>

				<div className="mt-8 h-10 w-px bg-cream/20" />

				<div className="mt-6 flex items-center gap-8">
					<button
						type="button"
						onClick={reset}
						className="text-[11px] font-light uppercase tracking-[0.25em] text-cream/60 transition-colors duration-300 hover:text-cream"
					>
						Try again
					</button>
					<span className="h-3 w-px bg-cream/20" />
					<Link
						href="/"
						className="text-[11px] font-light uppercase tracking-[0.25em] text-cream/60 transition-colors duration-300 hover:text-cream"
					>
						Return home
					</Link>
				</div>
			</div>
		</main>
	);
}
