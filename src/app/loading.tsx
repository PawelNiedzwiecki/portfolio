"use client";

import { motion } from "motion/react";

export default function Loading() {
	return (
		<main className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-bg text-cream">
			{/* Vignette */}
			<div className="vignette absolute inset-0 z-10" />

			{/* Content */}
			<div className="relative z-20 flex flex-col items-center text-center">
				{/* Eyebrow */}
				<motion.p
					className="text-[10px] font-light uppercase tracking-[0.35em] text-amber"
					initial={{ opacity: 0, y: 6 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease: "easeOut" }}
				>
					Loading
				</motion.p>

				{/* Heading */}
				<motion.h1
					className="mt-5 font-heading text-6xl font-light leading-none tracking-wide text-cream md:text-8xl"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1.5, ease: "easeOut", delay: 0.7 }}
				>
					Developing <span className="italic">the frame</span>
				</motion.h1>

				{/* Film exposure loader */}
				<motion.div
					className="mt-10 flex flex-col items-center gap-2"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.4, duration: 0.6 }}
				>
					{[0, 1, 2].map((i) => (
						<motion.div
							key={i}
							className="h-px w-16 bg-amber/30"
							style={{ originX: 0 }}
						>
							<motion.div
								className="h-full bg-amber"
								initial={{ scaleX: 0 }}
								animate={{ scaleX: [0, 1, 0] }}
								transition={{
									duration: 1.8,
									ease: "easeInOut",
									delay: 0.5 + i * 0.18,
									repeat: Infinity,
									repeatDelay: 0.4,
								}}
								style={{ originX: 0 }}
							/>
						</motion.div>
					))}
				</motion.div>
			</div>

			{/* Bottom bar */}
			<motion.div
				className="absolute bottom-0 left-0 right-0 z-30 flex items-end justify-between px-8 pb-8 md:px-12"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.6, duration: 0.8 }}
			>
				<div className="flex items-center gap-2">
					<span className="inline-block h-1.5 w-1.5 rounded-full bg-olive" />
					<span className="text-[10px] font-extralight uppercase tracking-[0.2em] text-cream/40">
						London, United Kingdom
					</span>
				</div>
				<span className="text-[10px] font-extralight uppercase tracking-[0.2em] text-cream/40">
					Sleepy / Weirdo
				</span>
			</motion.div>
		</main>
	);
}
