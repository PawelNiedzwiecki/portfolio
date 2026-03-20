"use client";

import { ArrowRightIcon } from "@phosphor-icons/react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/projects";

function useReveal() {
	const ref = useRef<HTMLElement>(null);
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

interface ProjectCardProps {
	project: Project;
	index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
	const { ref, visible } = useReveal();
	const isLast = index === 3;
	const num = String(index + 1).padStart(2, "0");

	return (
		<motion.article
			ref={ref}
			className={`group relative overflow-hidden${!isLast ? " border-b border-cream/6" : ""}`}
			initial={{ opacity: 0, y: 32 }}
			animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
			transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
		>
			<Link
				href={`/work/${project.slug}`}
				className="relative block h-[55vw] max-h-[85vh] min-h-70 w-full"
				aria-label={`View ${project.title} series`}
			>
				{/* Image */}
				<Image
					src={project.cover}
					alt={project.title}
					fill
					className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
					sizes="100vw"
				/>

				{/* Resting vignette — always visible, subtle */}
				<div className="absolute inset-0 bg-linear-to-t from-bg/60 via-bg/10 to-transparent" />

				{/* Hover overlay — darkens the whole image */}
				<div className="absolute inset-0 bg-bg/0 transition-colors duration-500 group-hover:bg-bg/55" />

				{/* Resting index number — bottom-left, always visible */}
				<span className="absolute bottom-7 left-8 font-mono text-[9px] tracking-[0.4em] text-cream/20 transition-opacity duration-400 group-hover:opacity-0 md:left-12">
					{num}
				</span>

				{/* Resting eyebrow — bottom-left, always visible */}
				<span className="absolute bottom-7 left-16 text-[10px] font-light uppercase tracking-[0.35em] text-cream/35 transition-opacity duration-400 group-hover:opacity-0 md:left-20">
					{project.eyebrow}
				</span>

				{/* Hover content — centered overlay */}
				<div className="absolute inset-0 flex flex-col items-center justify-center px-8 opacity-0 transition-opacity duration-400 group-hover:opacity-100">
					<span className="mb-3 text-[10px] font-light uppercase tracking-[0.4em] text-amber">
						{project.eyebrow} · {project.year}
					</span>

					<h2 className="text-center font-heading text-4xl font-light leading-tight tracking-wide text-cream md:text-6xl">
						{project.title}
					</h2>

					<div className="mt-5 h-px w-8 bg-amber/40" />

					<p className="mt-5 max-w-xl text-center text-[13px] font-extralight leading-relaxed text-cream/55 md:text-[14px]">
						{project.description}
					</p>

					<div className="group/link mt-8 flex items-center gap-2 text-[11px] font-light uppercase tracking-[0.3em] text-cream/50 transition-colors duration-300 group-hover:text-cream/80">
						View series
						<ArrowRightIcon
							size={12}
							weight="light"
							className="transition-transform duration-300 group-hover:translate-x-1"
							aria-hidden="true"
						/>
					</div>
				</div>
			</Link>
		</motion.article>
	);
}
