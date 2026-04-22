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

afterEach(() => {
	cleanup();
	vi.restoreAllMocks();
});

describe("Nav", () => {
	it("renders About and Contact nav links", () => {
		render(<Nav />);
		expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
		expect(screen.getByRole("link", { name: "Contact" })).toBeInTheDocument();
	});

	it("does not render a Work link", () => {
		render(<Nav />);
		expect(
			screen.queryByRole("link", { name: "Work" }),
		).not.toBeInTheDocument();
	});

	it("links point to correct hrefs", () => {
		render(<Nav />);
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

	it("is an absolute nav element", () => {
		render(<Nav />);
		const nav = screen.getByRole("navigation");
		expect(nav).toBeInTheDocument();
		expect(nav.className).toContain("absolute");
	});
});
