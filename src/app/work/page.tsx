import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";

function getPhotos() {
	const imagesDir = path.join(process.cwd(), "public/images");
	const categories = fs.readdirSync(imagesDir);
	return categories.flatMap((category) => {
		const categoryDir = path.join(imagesDir, category);
		if (!fs.statSync(categoryDir).isDirectory()) return [];
		return fs
			.readdirSync(categoryDir)
			.filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f))
			.map((file) => ({
				src: `/images/${category}/${file}`,
				alt: file.replace(/-/g, " ").replace(/\.[^.]+$/, ""),
			}));
	});
}

export default function Work() {
	const photos = getPhotos();
	return (
		<main className="min-h-screen bg-bg text-cream">
			{/* ─── CONTENT ─── */}
			<div className="mx-auto max-w-6xl px-8 pb-24 pt-40 md:px-12">
				{/* Eyebrow */}
				<p className="text-[10px] font-light uppercase tracking-[0.35em] text-amber">
					Work
				</p>

				<h1 className="mt-5 font-heading text-5xl font-light leading-none tracking-wide text-cream md:text-7xl">
					Selected <span className="italic">photographs</span>
				</h1>

				{/* Divider */}
				<div className="mt-10 h-px w-16 bg-amber/40" />

				{/* Photo grid */}
				<div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{photos.map((photo) => (
						<div key={photo.src} className="group relative overflow-hidden">
							<div className="relative aspect-[4/5] w-full bg-surface">
								<Image
									src={photo.src}
									alt={photo.alt}
									fill
									className="object-cover transition-transform duration-700 group-hover:scale-105"
									sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
								/>
							</div>
						</div>
					))}
				</div>
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
