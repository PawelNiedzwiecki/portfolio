import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import { OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/seo";
import ProjectCard from "./components/ProjectCard";

export const metadata: Metadata = {
	title: `${SITE_NAME} — Photography`,
	description:
		"Photography portfolio of Pawel Niedzwiecki — landscapes, portraits, street and travel photography based in London.",
	alternates: { canonical: SITE_URL },
	openGraph: {
		title: `${SITE_NAME} — Photography`,
		description:
			"Landscapes, portraits, street and travel photography based in London.",
		url: SITE_URL,
		images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
	},
};

export default function Home() {
	return (
		<main className="px-12 pb-16 pt-36 md:px-20">
			<div className="grid grid-cols-1 gap-y-1">
				{projects.map((project, i) => (
					<ProjectCard key={project.slug} project={project} priority={i < 2} />
				))}
			</div>
		</main>
	);
}
