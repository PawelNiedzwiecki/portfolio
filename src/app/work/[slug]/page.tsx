import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/lib/projects";
import { GalleryGrid } from "../../components/GalleryGrid";

export async function generateStaticParams() {
	return projects.map((p) => ({ slug: p.slug }));
}

function getProjectPhotos(slug: string) {
	const dir = path.join(process.cwd(), "public/images", slug);
	return fs
		.readdirSync(dir)
		.filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f))
		.sort((a, b) => a.localeCompare(b))
		.map((file) => ({
			src: `/images/${slug}/${file}`,
			alt: file.replace(/-/g, " ").replace(/\.[^.]+$/, ""),
		}));
}

export default async function ProjectPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const project = getProjectBySlug(slug);
	if (!project) notFound();

	const photos = getProjectPhotos(project.slug);

	// Split title: last word gets italic
	const words = project.title.split(" ");
	const lastWord = words.pop();
	const restOfTitle = words.join(" ");

	return (
		<main className="min-h-screen bg-bg text-cream">
			{/* ─── HEADER ─── */}
			<div className="px-8 pb-0 pt-40 md:px-12">
				<Link
					href="/work"
					className="mb-6 inline-flex items-center gap-2 text-[10px] font-light uppercase tracking-[0.3em] text-cream/30 transition-colors duration-300 hover:text-cream/60"
				>
					← All work
				</Link>

				<p className="animate-fade-slide-up delay-100 text-[10px] font-light uppercase tracking-[0.35em] text-amber">
					{project.eyebrow} · {project.year}
				</p>

				<h1 className="animate-fade-slide-up delay-200 mt-5 font-heading text-5xl font-light leading-none tracking-wide text-cream md:text-7xl">
					{restOfTitle} <span className="italic">{lastWord}</span>
				</h1>

				<div className="animate-divider-grow delay-300 mt-10 h-px w-16 bg-amber/40" />
			</div>

			{/* ─── DESCRIPTION ─── */}
			<div className="mt-12 px-8 md:px-12">
				<div className="flex items-start gap-16">
					<p className="max-w-2xl text-[14px] font-extralight leading-relaxed text-cream/60 md:text-[15px]">
						{project.description}
					</p>
					<div
						className="hidden shrink-0 select-none md:block"
						aria-hidden="true"
					>
						<span className="font-heading text-[50rem] leading-none text-cream/1 absolute -translate-y-1/2 opacity-100 right-0 top-1/2">
							{photos.length}
						</span>
					</div>
				</div>
			</div>

			{/* ─── GALLERY ─── */}
			<div className="px-8 pb-32 md:px-12">
				<GalleryGrid photos={photos} />
			</div>
		</main>
	);
}
