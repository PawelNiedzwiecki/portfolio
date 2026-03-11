import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Nav() {
	return (
		<nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 md:px-12">
			<ul className="flex gap-8">
				{["Work", "About", "Contact"].map((item) => (
					<li key={item}>
						<Link
							href={`/${item.toLowerCase()}`}
							className="text-[11px] font-light uppercase tracking-[0.25em] text-cream/40 transition-colors duration-300 hover:text-cream/80"
						>
							{item}
						</Link>
					</li>
				))}
			</ul>

			<div className="flex items-center gap-6">
				<ThemeToggle />
				<a
					href="https://instagram.com/sleepy_weirdo"
					target="_blank"
					rel="noopener noreferrer"
					className="text-[11px] font-light uppercase tracking-[0.2em] text-amber transition-opacity duration-300 hover:opacity-70"
				>
					@sleepy_weirdo
				</a>
			</div>
		</nav>
	);
}
