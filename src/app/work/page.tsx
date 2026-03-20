import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import ProjectCard from "../components/ProjectCard";

export const metadata: Metadata = {
	title: "Work",
	description:
		"Selected photography series by Pawel Niedzwiecki — landscape, portrait, street, and travel work made on film in London and beyond.",
	alternates: { canonical: `${SITE_URL}/work` },
	openGraph: {
		title: `Work — ${SITE_NAME}`,
		description:
			"Selected photography series — landscape, portrait, street, and travel work made on film in London and beyond.",
		url: `${SITE_URL}/work`,
	},
};

export default function Work() {
	return (
		<main className="min-h-screen bg-bg text-cream">
			{/* ─── HEADER ─── */}
			<div className="px-8 pb-0 pt-40 md:px-12">
				<p className="animate-fade-slide-up delay-100 text-[10px] font-light uppercase tracking-[0.35em] text-amber">
					Work
				</p>

				<h1 className="animate-fade-slide-up delay-200 mt-5 font-heading text-5xl font-light leading-none tracking-wide text-cream md:text-7xl">
					Selected <span className="italic">series</span>
				</h1>

				<div className="animate-divider-grow delay-300 mt-10 h-px w-16 bg-amber/40" />
			</div>

			{/* ─── PROJECT LIST ─── */}
			<div className="mt-20 pb-32">
				{projects.map((project, i) => (
					<ProjectCard key={project.slug} project={project} index={i} />
				))}
			</div>
		</main>
	);
}
