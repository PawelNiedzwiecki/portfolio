import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Nav() {
	return (
		<nav className="animate-fade-slide-down delay-0 fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 md:px-12">
			<div className="flex items-center gap-8">
				<Link
					href="/"
					className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cream/80 transition-colors duration-300 hover:text-cream"
				>
					Pawel Niedzwiecki
				</Link>
				<ul className="flex gap-8">
					{["Work", "About", "Contact"].map((item, i) => (
						<li key={item} style={{ animationDelay: `${i * 80}ms` }}>
							<Link
								href={`/${item.toLowerCase()}`}
								className="nav-link text-[11px] font-light uppercase tracking-[0.25em] text-cream/40 transition-colors duration-300 hover:text-cream/80"
							>
								{item}
							</Link>
						</li>
					))}
				</ul>
			</div>

			<div className="animate-fade-in delay-300 flex items-center gap-6">
				<ThemeToggle />
			</div>
		</nav>
	);
}
