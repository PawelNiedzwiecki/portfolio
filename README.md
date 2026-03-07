# Sleepy Weirdo — Photography Portfolio

Personal photography portfolio for [@sleepy_weirdo](https://instagram.com/sleepy_weirdo). Landscapes & quiet moments, based in London.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **Tailwind CSS 4**
- **Motion** (animations)
- **TypeScript**
- Deployed on **Cloudflare Pages**

## Project Structure

```
src/app/
├── layout.tsx          # Root layout, fonts, metadata
├── page.tsx            # Home / hero
├── about/page.tsx      # About page
├── work/page.tsx       # Work / portfolio
├── contact/page.tsx    # Contact
├── components/
│   └── ThemeToggle.tsx # Dark / light mode toggle
├── globals.css         # Tailwind + CSS variables + theme
├── loading.tsx         # Loading state
├── error.tsx           # Error boundary
└── not-found.tsx       # 404 page
```

## Local Development

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
bun run build
```

## Theme

The site supports dark (default) and light modes via `data-theme="light"` on the root element. Colors are defined as CSS variables in `globals.css` and exposed to Tailwind through `@theme inline`.

| Token | Dark | Light |
|-------|------|-------|
| `bg` | `#141414` | `#F5F2ED` |
| `cream` | `#E8E0D0` | `#1A1916` |
| `amber` | `#C4913A` | `#A87428` |
| `olive` | `#7A7D4A` | `#5A6030` |
