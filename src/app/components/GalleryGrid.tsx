"use client";

import { CaretLeftIcon, CaretRightIcon, XIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

interface Photo {
	src: string;
	alt: string;
}

interface GalleryGridProps {
	photos: Photo[];
}

function useReveal() {
	const ref = useRef<HTMLDivElement>(null);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setVisible(true);
					observer.disconnect();
				}
			},
			{ threshold: 0.08 },
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	return { ref, visible };
}

function GalleryItem({
	photo,
	index,
	onClick,
}: {
	photo: Photo;
	index: number;
	onClick: () => void;
}) {
	const { ref, visible } = useReveal();

	return (
		<div ref={ref} className="mb-3 break-inside-avoid">
			<motion.button
				type="button"
				onClick={onClick}
				className="group relative block w-full cursor-pointer overflow-hidden focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber"
				initial={{ opacity: 0, y: 24 }}
				animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
				transition={{
					duration: 0.75,
					ease: [0.22, 1, 0.36, 1],
					delay: index < 4 ? index * 0.08 : 0,
				}}
			>
				<div className="relative w-full bg-surface">
					<Image
						src={photo.src}
						alt={photo.alt}
						width={900}
						height={1200}
						className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
						style={{ display: "block" }}
						sizes="(max-width: 768px) 100vw, 33vw"
					/>

					{/* Hover overlay */}
					<div className="absolute inset-0 bg-bg/0 transition-colors duration-500 group-hover:bg-bg/15" />

					{/* Caption on hover */}
					<div className="absolute inset-x-0 bottom-0 translate-y-1 bg-gradient-to-t from-bg/70 to-transparent p-5 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
						<p className="text-[10px] font-light uppercase tracking-[0.3em] text-cream/70">
							{photo.alt}
						</p>
					</div>
				</div>
			</motion.button>
		</div>
	);
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

	useEffect(() => {
		document.body.style.overflow = isOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	const activePhoto = activeIndex !== null ? photos[activeIndex] : null;

	// Split into three columns for masonry
	const col1 = photos.filter((_, i) => i % 3 === 0);
	const col2 = photos.filter((_, i) => i % 3 === 1);
	const col3 = photos.filter((_, i) => i % 3 === 2);

	return (
		<>
			{/* ─── MASONRY GRID ─── */}
			<div className="mt-20 grid grid-cols-1 gap-3 md:grid-cols-3">
				{/* Column 1 */}
				<div>
					{col1.map((photo) => {
						const originalIndex = photos.indexOf(photo);
						return (
							<GalleryItem
								key={photo.src}
								photo={photo}
								index={originalIndex}
								onClick={() => setActiveIndex(originalIndex)}
							/>
						);
					})}
				</div>

				{/* Column 2 — offset for stagger feel */}
				<div className="md:mt-16">
					{col2.map((photo) => {
						const originalIndex = photos.indexOf(photo);
						return (
							<GalleryItem
								key={photo.src}
								photo={photo}
								index={originalIndex}
								onClick={() => setActiveIndex(originalIndex)}
							/>
						);
					})}
				</div>

				{/* Column 3 — offset more */}
				<div className="md:mt-8">
					{col3.map((photo) => {
						const originalIndex = photos.indexOf(photo);
						return (
							<GalleryItem
								key={photo.src}
								photo={photo}
								index={originalIndex}
								onClick={() => setActiveIndex(originalIndex)}
							/>
						);
					})}
				</div>
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
							className="absolute inset-0 bg-bg/95 backdrop-blur-md"
							onClick={close}
							aria-hidden="true"
						/>

						{/* Image panel */}
						<motion.div
							key={activeIndex}
							className="relative z-10 flex max-h-[90vh] max-w-[90vw] items-center justify-center"
							initial={{ opacity: 0, scale: 0.95, y: 16 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.97, y: 8 }}
							transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
						>
							<div className="relative max-h-[88vh] max-w-[88vw]">
								<Image
									src={activePhoto.src}
									alt={activePhoto.alt}
									width={1200}
									height={1500}
									className="max-h-[88vh] w-auto object-contain"
									style={{ maxWidth: "88vw" }}
									priority
								/>
							</div>
						</motion.div>

						{/* Close */}
						<button
							type="button"
							onClick={close}
							aria-label="Close image"
							className="absolute right-6 top-6 z-20 flex h-10 w-10 items-center justify-center text-cream/40 transition-colors duration-200 hover:text-cream focus-visible:outline-none"
						>
							<XIcon size={20} weight="light" aria-hidden="true" />
						</button>

						{/* Prev */}
						{photos.length > 1 && (
							<button
								type="button"
								onClick={prev}
								aria-label="Previous image"
								className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-cream/40 transition-colors duration-200 hover:text-cream focus-visible:outline-none md:left-8"
							>
								<CaretLeftIcon size={20} weight="light" aria-hidden="true" />
							</button>
						)}

						{/* Next */}
						{photos.length > 1 && (
							<button
								type="button"
								onClick={next}
								aria-label="Next image"
								className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-cream/40 transition-colors duration-200 hover:text-cream focus-visible:outline-none md:right-8"
							>
								<CaretRightIcon size={20} weight="light" aria-hidden="true" />
							</button>
						)}

						{/* Counter + caption */}
						{photos.length > 1 && (
							<div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-1">
								<motion.p
									key={`caption-${activeIndex}`}
									className="whitespace-nowrap text-[10px] font-extralight uppercase tracking-[0.3em] text-cream/30"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 0.2, duration: 0.4 }}
								>
									{activePhoto.alt}
								</motion.p>
								<span className="text-[10px] font-light tracking-[0.2em] text-cream/20">
									{(activeIndex ?? 0) + 1} / {photos.length}
								</span>
							</div>
						)}
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
