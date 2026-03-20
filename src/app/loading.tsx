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
		</main>
	);
}
