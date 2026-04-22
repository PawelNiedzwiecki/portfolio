import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";

interface ProjectCardProps {
	project: Project;
	priority?: boolean;
}

export default function ProjectCard({ project, priority = false }: ProjectCardProps) {
	return (
		<article className="group">
			<Link href={`/${project.slug}`} aria-label={`View ${project.title}`}>
				<div className="relative overflow-hidden bg-black aspect-[3/1] w-full">
					<Image
						src={project.cover}
						alt={project.title}
						fill
						priority={priority}
						className="img-fade object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
						sizes="(max-width: 768px) 100vw, 100vw"
					/>
					<div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/40" />
					<div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
						<p className="text-[10px] font-light uppercase tracking-[0.35em] text-white/70">
							{project.eyebrow} · {project.year}
						</p>
						<h2 className="mt-2 font-heading text-2xl font-light tracking-wide text-white">
							{project.title}
						</h2>
					</div>
				</div>
			</Link>
		</article>
	);
}
