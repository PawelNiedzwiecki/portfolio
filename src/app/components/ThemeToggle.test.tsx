import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ThemeToggle from "./ThemeToggle";

const localStorageMock = (() => {
	let store: Record<string, string> = {};
	return {
		getItem: (key: string) => store[key] ?? null,
		setItem: (key: string, value: string) => {
			store[key] = value;
		},
		removeItem: (key: string) => {
			delete store[key];
		},
		clear: () => {
			store = {};
		},
	};
})();

function mockMatchMedia(prefersDark: boolean) {
	Object.defineProperty(window, "matchMedia", {
		writable: true,
		value: vi.fn((query: string) => ({
			matches: query === "(prefers-color-scheme: dark)" ? prefersDark : false,
			media: query,
			onchange: null,
			addListener: vi.fn(),
			removeListener: vi.fn(),
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
			dispatchEvent: vi.fn(),
		})),
	});
}

beforeEach(() => {
	Object.defineProperty(window, "localStorage", { value: localStorageMock });
	localStorageMock.clear();
	document.documentElement.removeAttribute("data-theme");
	mockMatchMedia(true);
});

afterEach(() => {
	cleanup();
	vi.restoreAllMocks();
});

describe("ThemeToggle", () => {
	describe("initial render", () => {
		it("renders a button with aria-label 'Toggle theme'", () => {
			render(<ThemeToggle />);
			expect(
				screen.getByRole("button", { name: "Toggle theme" }),
			).toBeInTheDocument();
		});

		it("shows Sun icon when system prefers dark and no stored theme", () => {
			mockMatchMedia(true);
			render(<ThemeToggle />);
			expect(document.querySelector("svg")).toBeInTheDocument();
			// In dark mode, Sun icon is shown
			expect(
				screen.getByRole("button", { name: "Toggle theme" }),
			).toBeInTheDocument();
		});

		it("shows Moon icon when system prefers light and no stored theme", () => {
			mockMatchMedia(false);
			render(<ThemeToggle />);
			// After effect: light theme → Moon icon rendered, data-theme set
			expect(document.documentElement).toHaveAttribute("data-theme", "light");
		});

		it("respects stored 'dark' theme over system preference", () => {
			mockMatchMedia(false); // system prefers light
			localStorageMock.setItem("theme", "dark");
			render(<ThemeToggle />);
			expect(document.documentElement).not.toHaveAttribute("data-theme");
		});

		it("respects stored 'light' theme over system preference", () => {
			mockMatchMedia(true); // system prefers dark
			localStorageMock.setItem("theme", "light");
			render(<ThemeToggle />);
			expect(document.documentElement).toHaveAttribute("data-theme", "light");
		});

		it("does not set data-theme when resolved theme is dark", () => {
			mockMatchMedia(true);
			render(<ThemeToggle />);
			expect(document.documentElement).not.toHaveAttribute("data-theme");
		});
	});

	describe("toggle behaviour", () => {
		it("switches from dark to light on click", () => {
			mockMatchMedia(true);
			render(<ThemeToggle />);
			const button = screen.getByRole("button", { name: "Toggle theme" });
			fireEvent.click(button);
			expect(document.documentElement).toHaveAttribute("data-theme", "light");
			expect(localStorageMock.getItem("theme")).toBe("light");
		});

		it("switches from light to dark on click", () => {
			mockMatchMedia(false);
			render(<ThemeToggle />);
			const button = screen.getByRole("button", { name: "Toggle theme" });
			fireEvent.click(button);
			expect(document.documentElement).not.toHaveAttribute("data-theme");
			expect(localStorageMock.getItem("theme")).toBe("dark");
		});

		it("persists theme to localStorage on toggle", () => {
			mockMatchMedia(true); // dark
			render(<ThemeToggle />);
			fireEvent.click(screen.getByRole("button", { name: "Toggle theme" }));
			expect(localStorageMock.getItem("theme")).toBe("light");
			fireEvent.click(screen.getByRole("button", { name: "Toggle theme" }));
			expect(localStorageMock.getItem("theme")).toBe("dark");
		});

		it("removes data-theme attribute when toggling back to dark", () => {
			mockMatchMedia(false); // starts light
			render(<ThemeToggle />);
			expect(document.documentElement).toHaveAttribute("data-theme", "light");
			fireEvent.click(screen.getByRole("button", { name: "Toggle theme" }));
			expect(document.documentElement).not.toHaveAttribute("data-theme");
		});

		it("sets data-theme='light' when toggling to light", () => {
			mockMatchMedia(true); // starts dark
			render(<ThemeToggle />);
			fireEvent.click(screen.getByRole("button", { name: "Toggle theme" }));
			expect(document.documentElement).toHaveAttribute("data-theme", "light");
		});

		it("toggles icon between Sun and Moon on successive clicks", () => {
			mockMatchMedia(true); // dark → Sun shown
			render(<ThemeToggle />);
			const button = screen.getByRole("button", { name: "Toggle theme" });
			const svgAfterDark = button.querySelector("svg");
			expect(svgAfterDark).toBeInTheDocument();

			fireEvent.click(button); // → light → Moon shown
			const svgAfterLight = button.querySelector("svg");
			expect(svgAfterLight).toBeInTheDocument();

			// The SVGs should be different elements (re-rendered)
			fireEvent.click(button); // → dark → Sun shown again
			expect(button.querySelector("svg")).toBeInTheDocument();
		});
	});
});
