import Link from "next/link";

export default function Nav() {
	return (
		<nav className="absolute top-0 left-0 right-0 z-50 flex flex-col items-center px-8 py-8 md:px-12">
			<Link
				href="/"
				className="text-lg font-light uppercase tracking-[0.25em] text-fg/80 transition-colors duration-300 hover:text-fg"
			>
				Pawel Niedzwiecki
			</Link>
			<ul className="mt-3 flex gap-8">
				{["About", "Contact"].map((item) => (
					<li key={item}>
						<Link
							href={`/${item.toLowerCase()}`}
							className="nav-link text-[10px] font-light uppercase tracking-[0.3em] text-fg/40 transition-colors duration-300 hover:text-fg/70"
						>
							{item}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}
