"use client";

import { ArrowsOutIcon, CaretLeftIcon, CaretRightIcon, XIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

interface Photo {
	src: string;
	alt: string;
}

interface GalleryGridProps {
	photos: Photo[];
}

export function GalleryGrid({ photos }: GalleryGridProps) {
	const [activeIndex, setActiveIndex] = useState<number | null>(null);

	const isOpen = activeIndex !== null;

	const close = useCallback(() => setActiveIndex(null), []);

	const prev = useCallback(() => {
		setActiveIndex((i) =>
			i !== null ? (i - 1 + photos.length) % photos.length : null,
		);
	}, [photos.length]);

	const next = useCallback(() => {
		setActiveIndex((i) => (i !== null ? (i + 1) % photos.length : null));
	}, [photos.length]);

	// Keyboard navigation
	useEffect(() => {
		if (!isOpen) return;

		const handleKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") close();
			if (e.key === "ArrowLeft") prev();
			if (e.key === "ArrowRight") next();
		};

		window.addEventListener("keydown", handleKey);
		return () => window.removeEventListener("keydown", handleKey);
	}, [isOpen, close, prev, next]);

	// Lock body scroll when open
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	const activePhoto = activeIndex !== null ? photos[activeIndex] : null;

	return (
		<>
			{/* ─── GRID ─── */}
			<div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{photos.map((photo, i) => (
					<motion.button
						key={photo.src}
						type="button"
						onClick={() => setActiveIndex(i)}
						className="group relative block cursor-pointer overflow-hidden focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber"
						initial={{ opacity: 0, y: 16 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.55,
							ease: [0.22, 1, 0.36, 1],
							delay: Math.min(i * 0.06, 0.6),
						}}
					>
						<div className="relative aspect-4/5 w-full bg-surface">
							<Image
								src={photo.src}
								alt={photo.alt}
								fill
								className="object-cover transition-transform duration-700 group-hover:scale-105"
								sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
							/>

							{/* Hover overlay */}
							<div className="absolute inset-0 bg-bg/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

							{/* "Expand" hint */}
							<div className="photo-overlay absolute bottom-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-cream/30 bg-bg/60 backdrop-blur-sm">
								<ArrowsOutIcon size={14} weight="light" aria-hidden="true" />
							</div>
						</div>
					</motion.button>
				))}
			</div>

			{/* ─── LIGHTBOX ─── */}
			<AnimatePresence>
				{isOpen && activePhoto && (
					<motion.div
						key="lightbox-backdrop"
						className="fixed inset-0 z-50 flex items-center justify-center"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3, ease: "easeInOut" }}
					>
						{/* Backdrop */}
						<motion.div
							className="absolute inset-0 bg-bg/92 backdrop-blur-md"
							onClick={close}
							aria-hidden="true"
						/>

						{/* Image panel */}
						<motion.div
							key={activeIndex}
							className="relative z-10 flex max-h-[90vh] max-w-[90vw] items-center justify-center"
							initial={{ opacity: 0, scale: 0.94, y: 12 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.96, y: 8 }}
							transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
						>
							<div className="relative max-h-[88vh] max-w-[88vw]">
								<Image
									src={activePhoto.src}
									alt={activePhoto.alt}
									width={1200}
									height={1500}
									className="max-h-[88vh] w-auto object-contain shadow-2xl"
									style={{ maxWidth: "88vw" }}
									priority
								/>
							</div>
						</motion.div>

						{/* Close button */}
						<button
							type="button"
							onClick={close}
							aria-label="Close image"
							className="absolute right-6 top-6 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 bg-bg/60 text-cream/60 backdrop-blur-sm transition-all duration-200 hover:border-cream/40 hover:text-cream focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber"
						>
							<XIcon size={16} weight="light" aria-hidden="true" />
						</button>

						{/* Prev button */}
						{photos.length > 1 && (
							<button
								type="button"
								onClick={prev}
								aria-label="Previous image"
								className="absolute left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-cream/20 bg-bg/60 text-cream/60 backdrop-blur-sm transition-all duration-200 hover:border-cream/40 hover:text-cream focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber md:left-6"
							>
								<CaretLeftIcon size={16} weight="light" aria-hidden="true" />
							</button>
						)}

						{/* Next button */}
						{photos.length > 1 && (
							<button
								type="button"
								onClick={next}
								aria-label="Next image"
								className="absolute right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-cream/20 bg-bg/60 text-cream/60 backdrop-blur-sm transition-all duration-200 hover:border-cream/40 hover:text-cream focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber md:right-6"
							>
								<CaretRightIcon size={16} weight="light" aria-hidden="true" />
							</button>
						)}

						{/* Counter */}
						{photos.length > 1 && (
							<div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-[10px] font-light uppercase tracking-[0.25em] text-cream/40">
								{(activeIndex ?? 0) + 1} / {photos.length}
							</div>
						)}

						{/* Caption */}
						<motion.p
							key={`caption-${activeIndex}`}
							className="absolute bottom-12 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap text-[10px] font-extralight uppercase tracking-[0.3em] text-cream/30"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.2, duration: 0.4 }}
						>
							{activePhoto.alt}
						</motion.p>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
