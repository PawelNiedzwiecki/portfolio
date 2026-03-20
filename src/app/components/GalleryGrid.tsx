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
		<div ref={ref}>
			<motion.button
				type="button"
				onClick={onClick}
				className="group relative block w-full cursor-pointer overflow-hidden focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber"
				initial={{ opacity: 0, y: 24 }}
				animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
				transition={{
					duration: 0.75,
					ease: [0.22, 1, 0.36, 1],
					delay: index < 6 ? index * 0.06 : 0,
				}}
			>
				<div className="relative aspect-[4/3] w-full bg-surface">
					<Image
						src={photo.src}
						alt={photo.alt}
						fill
						className="object-cover transition-[transform,filter] duration-700 group-hover:scale-[1.03] group-hover:brightness-75"
						sizes="(max-width: 768px) 100vw, 33vw"
					/>

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

	return (
		<>
			{/* ─── UNIFORM GRID ─── */}
			<div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
				{photos.map((photo, i) => (
					<GalleryItem
						key={photo.src}
						photo={photo}
						index={i}
						onClick={() => setActiveIndex(i)}
					/>
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
								{/* Caption — overlaid on the image bottom */}
								{photos.length > 1 && (
									<div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg/80 to-transparent px-5 pb-4 pt-10">
										<motion.p
											key={`caption-${activeIndex}`}
											className="text-center text-[10px] font-extralight uppercase tracking-[0.3em] text-cream/50"
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											transition={{ delay: 0.2, duration: 0.4 }}
										>
											{activePhoto.alt}
										</motion.p>
										<p className="mt-1 text-center text-[10px] font-light tracking-[0.2em] text-cream/25">
											{(activeIndex ?? 0) + 1} / {photos.length}
										</p>
									</div>
								)}
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

					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
