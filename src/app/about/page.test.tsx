import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import About from "./page";

vi.mock("next/image", () => ({
	default: ({
		src,
		alt,
		...props
	}: {
		src: string;
		alt: string;
		fill?: boolean;
		className?: string;
	}) => (
		// biome-ignore lint/performance/noImgElement: test mock
		<img src={src} alt={alt} {...props} />
	),
}));

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
});

describe("About page", () => {
	it("renders the page heading", () => {
		render(<About />);
		expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
	});

	it("renders the 'Get in touch' link pointing to /contact", () => {
		render(<About />);
		const link = screen.getByRole("link", { name: /get in touch/i });
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute("href", "/contact");
	});

	it("renders the portrait image", () => {
		render(<About />);
		expect(screen.getByRole("img", { name: /portrait/i })).toBeInTheDocument();
	});

	describe("Other projects section", () => {
		it("renders the 'Other projects' label", () => {
			render(<About />);
			expect(screen.getByText(/other projects/i)).toBeInTheDocument();
		});

		it("renders the whounfollowedu.com link", () => {
			render(<About />);
			const link = screen.getByRole("link", { name: /whounfollowedu\.com/i });
			expect(link).toBeInTheDocument();
			expect(link).toHaveAttribute("href", "https://whounfollowedu.com");
		});

		it("opens whounfollowedu.com in a new tab", () => {
			render(<About />);
			const link = screen.getByRole("link", { name: /whounfollowedu\.com/i });
			expect(link).toHaveAttribute("target", "_blank");
			expect(link).toHaveAttribute("rel", "noopener noreferrer");
		});
	});
});
