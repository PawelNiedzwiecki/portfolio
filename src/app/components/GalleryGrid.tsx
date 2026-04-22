"use client";

import { CaretLeftIcon, CaretRightIcon, XIcon } from "@phosphor-icons/react";
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

function GalleryItem({
	photo,
	onClick,
}: {
	photo: Photo;
	onClick: () => void;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			className="group relative block w-full cursor-pointer overflow-hidden focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-fg"
		>
			<div className="relative aspect-[2/3] w-full bg-black">
				<Image
					src={photo.src}
					alt={photo.alt}
					fill
					className="img-fade object-cover transition-transform duration-700 group-hover:scale-[1.03]"
					sizes="(max-width: 768px) 100vw, 33vw"
				/>
			</div>
		</button>
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
			<div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
				{photos.map((photo, i) => (
					<GalleryItem
						key={photo.src}
						photo={photo}
						onClick={() => setActiveIndex(i)}
					/>
				))}
			</div>

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
						<motion.div
							className="absolute inset-0 bg-bg/95 backdrop-blur-md"
							onClick={close}
							aria-hidden="true"
						/>

						<div className="relative z-10 flex max-h-[90vh] max-w-[90vw] items-center justify-center">
							<div className="relative max-h-[88vh] max-w-[88vw]">
								<motion.div
									key={activeIndex}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.5, ease: "easeInOut" }}
								>
									<Image
										src={activePhoto.src}
										alt={activePhoto.alt}
										width={1200}
										height={1500}
										className="max-h-[88vh] w-auto object-contain"
										style={{ maxWidth: "88vw" }}
										priority
									/>
								</motion.div>
								{photos.length > 1 && (
									<p className="mt-2 text-center text-[10px] font-light tracking-[0.2em] text-fg/40">
										{(activeIndex ?? 0) + 1} / {photos.length}
									</p>
								)}
							</div>
						</div>

						<button
							type="button"
							onClick={close}
							aria-label="Close image"
							className="absolute right-6 top-6 z-20 flex h-10 w-10 items-center justify-center text-fg/40 transition-colors duration-200 hover:text-fg focus-visible:outline-none"
						>
							<XIcon size={20} weight="light" aria-hidden="true" />
						</button>

						{photos.length > 1 && (
							<button
								type="button"
								onClick={prev}
								aria-label="Previous image"
								className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-fg/40 transition-colors duration-200 hover:text-fg focus-visible:outline-none md:left-8"
							>
								<CaretLeftIcon size={20} weight="light" aria-hidden="true" />
							</button>
						)}

						{photos.length > 1 && (
							<button
								type="button"
								onClick={next}
								aria-label="Next image"
								className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-fg/40 transition-colors duration-200 hover:text-fg focus-visible:outline-none md:right-8"
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
