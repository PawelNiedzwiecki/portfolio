import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/lib/projects";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import { GalleryGrid } from "../components/GalleryGrid";

export async function generateStaticParams() {
	return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const project = getProjectBySlug(slug);
	if (!project) return {};

	const url = `${SITE_URL}/${slug}`;
	const ogImage = `${SITE_URL}${project.cover}`;

	return {
		title: project.title,
		description: project.description,
		alternates: { canonical: url },
		openGraph: {
			title: `${project.title} — ${SITE_NAME}`,
			description: project.description,
			url,
			images: [{ url: ogImage, width: 1200, height: 800, alt: project.title }],
		},
		twitter: {
			card: "summary_large_image",
			title: `${project.title} — ${SITE_NAME}`,
			description: project.description,
			images: [ogImage],
		},
	};
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

	const words = project.title.split(" ");
	const lastWord = words.pop();
	const restOfTitle = words.join(" ");

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "ImageGallery",
		name: project.title,
		description: project.description,
		url: `${SITE_URL}/${slug}`,
		author: {
			"@type": "Person",
			name: SITE_NAME,
			url: SITE_URL,
		},
		image: photos.slice(0, 6).map((p) => ({
			"@type": "ImageObject",
			url: `${SITE_URL}${p.src}`,
			name: p.alt,
		})),
	};

	return (
		<main className="min-h-screen">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>

			<div className="mx-auto max-w-5xl px-8 pb-0 pt-36 md:px-16">
				<Link
					href="/"
					className="mb-8 inline-flex items-center gap-2 text-[10px] font-light uppercase tracking-[0.3em] text-fg/30 transition-colors duration-300 hover:text-fg/60"
				>
					← All work
				</Link>

				<p className="text-[10px] font-light uppercase tracking-[0.35em] text-fg/40">
					{project.eyebrow} · {project.year}
				</p>

				<h1 className="mt-3 font-heading text-3xl font-light leading-none tracking-wide text-fg md:text-4xl">
					{restOfTitle} <span className="italic">{lastWord}</span>
				</h1>

				<div className="mt-8 h-px w-12 bg-fg/15" />
			</div>

			<div className="mx-auto mt-10 max-w-5xl px-8 md:px-16">
				<p className="max-w-2xl text-[14px] font-light leading-relaxed text-fg/55 md:text-[15px]">
					{project.description}
				</p>
			</div>

			<div className="mx-auto max-w-5xl px-8 pb-24 md:px-16">
				<GalleryGrid photos={photos} />
			</div>
		</main>
	);
}
