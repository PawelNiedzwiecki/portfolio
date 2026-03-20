import fs from "node:fs";
import path from "node:path";
import { GalleryGrid } from "../components/GalleryGrid";

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
			{/* ─── HEADER ─── */}
			<div className="px-8 pb-0 pt-40 md:px-12">
				<p className="animate-fade-slide-up delay-100 text-[10px] font-light uppercase tracking-[0.35em] text-amber">
					Work
				</p>

				<h1 className="animate-fade-slide-up delay-200 mt-5 font-heading text-5xl font-light leading-none tracking-wide text-cream md:text-7xl">
					Selected <span className="italic">photographs</span>
				</h1>

				<div className="animate-divider-grow delay-300 mt-10 h-px w-16 bg-amber/40" />
			</div>

			{/* ─── FULL-WIDTH GALLERY ─── */}
			<div className="px-3 pb-24 md:px-4">
				<GalleryGrid photos={photos} />
			</div>
		</main>
	);
}
