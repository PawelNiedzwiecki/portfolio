import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import Nav from "./Nav";

vi.mock("next/link", () => ({
	default: ({
		href,
		children,
		...props
	}: {
		href: string;
		children: React.ReactNode;
	}) => (
		<a href={href} {...props}>
			{children}
		</a>
	),
}));

vi.mock("./ThemeToggle", () => ({
	default: () => <button type="button">Toggle theme</button>,
}));

vi.mock("next/navigation", () => ({
	usePathname: () => "/",
}));

afterEach(() => {
	cleanup();
	vi.restoreAllMocks();
});

describe("Nav", () => {
	it("renders all three nav links", () => {
		render(<Nav />);
		expect(screen.getByRole("link", { name: "Work" })).toBeInTheDocument();
		expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
		expect(screen.getByRole("link", { name: "Contact" })).toBeInTheDocument();
	});

	it("links point to the correct hrefs", () => {
		render(<Nav />);
		expect(screen.getByRole("link", { name: "Work" })).toHaveAttribute(
			"href",
			"/work",
		);
		expect(screen.getByRole("link", { name: "About" })).toHaveAttribute(
			"href",
			"/about",
		);
		expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute(
			"href",
			"/contact",
		);
	});

	it("renders the home link with the author name", () => {
		render(<Nav />);
		const homeLink = screen.getByRole("link", { name: "Pawel Niedzwiecki" });
		expect(homeLink).toBeInTheDocument();
		expect(homeLink).toHaveAttribute("href", "/");
	});

	it("renders the ThemeToggle", () => {
		render(<Nav />);
		expect(
			screen.getByRole("button", { name: "Toggle theme" }),
		).toBeInTheDocument();
	});

	it("is an absolute nav element", () => {
		render(<Nav />);
		const nav = screen.getByRole("navigation");
		expect(nav).toBeInTheDocument();
		expect(nav.className).toContain("absolute");
	});
});
