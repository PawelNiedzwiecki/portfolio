"use client";

import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
	const [theme, setTheme] = useState<"dark" | "light">("dark");

	useEffect(() => {
		const stored = localStorage.getItem("theme") as "dark" | "light" | null;
		const systemPrefersDark = window.matchMedia(
			"(prefers-color-scheme: dark)",
		).matches;
		const resolved = stored ?? (systemPrefersDark ? "dark" : "light");
		setTheme(resolved);
		if (resolved === "light") {
			document.documentElement.setAttribute("data-theme", "light");
		} else {
			document.documentElement.removeAttribute("data-theme");
		}
	}, []);

	function toggle() {
		const next = theme === "dark" ? "light" : "dark";
		setTheme(next);
		localStorage.setItem("theme", next);
		if (next === "light") {
			document.documentElement.setAttribute("data-theme", "light");
		} else {
			document.documentElement.removeAttribute("data-theme");
		}
	}

	return (
		<button
			type="button"
			onClick={toggle}
			aria-label="Toggle theme"
			className="text-cream/40 transition-colors duration-300 hover:text-cream/80"
		>
			{theme === "dark" ? (
				<SunIcon size={14} weight="light" />
			) : (
				<MoonIcon size={14} weight="light" />
			)}
		</button>
	);
}
