# Website Design Analysis Guide

## Quick Reference: Common CSS Variable Patterns

### Color Variables (by naming convention)

**shadcn/ui / Radix:**
```
--background, --foreground
--card, --card-foreground
--primary, --primary-foreground
--secondary, --secondary-foreground
--muted, --muted-foreground
--accent, --accent-foreground
--border, --input, --ring
--destructive, --destructive-foreground
```

**Tailwind CSS v4:**
```
--color-background, --color-foreground
--color-primary, --color-secondary
--color-muted, --color-accent
--color-border, --color-ring
```

**Custom/Brand:**
```
--bg, --fg, --text, --accent, --highlight
--brand-color, --brand-primary
--color-bg, --color-text, --color-accent
--surface, --content, --heading
```

### Typography Variables

```
--font-sans, --font-serif, --font-mono
--font-heading, --font-body, --font-display
--font-family, --font-base
--text-sm, --text-base, --text-lg, --text-xl
--text-xs, --text-2xl, --text-3xl, --text-4xl
--font-size-sm, --font-size-base, --font-size-lg
--line-height, --leading
--letter-spacing, --tracking
--font-weight, --weight
```

### Spacing & Layout Variables

```
--spacing, --space, --gap
--radius, --rounded, --border-radius
--max-width, --container-width
--shadow, --box-shadow
```

## Luminance Calculation

To determine light/dark mode from a hex color:

```
1. Convert hex to RGB: #RRGGBB → R, G, B (0-255)
2. Calculate relative luminance:
   L = 0.2126 * (R/255)^2.2 + 0.7152 * (G/255)^2.2 + 0.0722 * (B/255)^2.2
3. If L < 0.3 → dark mode
   If L > 0.7 → light mode
   Otherwise → mixed (default to dark if accent is bright)
```

Quick heuristic: if the background hex starts with #0-3 or #1, it's likely dark mode.

## Font Detection Patterns

| Font Stack Pattern | Likely Framework |
|-------------------|-----------------|
| Inter, system-ui | Vercel / Next.js |
| Geist, Geist Sans | Vercel |
| -apple-system, SF Pro | Apple / iOS |
| 'Roboto', sans-serif | Material / Google |
| 'IBM Plex Sans' | IBM / Carbon |
| 'DM Sans', 'DM Serif' | Custom modern |
| 'Circular', 'CircularSp' | Spotify |
| 'Söhne', 'sohne-var' | Stripe |
| 'Rules Expanded', 'Collapse' | Custom/niche |
| 'Newsreader', serif | Blog/editorial |

## Special Effect Detection

### Gradients
Look for:
- `linear-gradient(`, `radial-gradient(`, `conic-gradient(`
- `background-image:` with gradient values
- CSS `mask-image` with gradients

### Blend Modes
Look for:
- `mix-blend-mode:`
- `background-blend-mode:`
- Common values: `difference`, `multiply`, `screen`, `overlay`, `color-dodge`

### Backdrop Effects
Look for:
- `backdrop-filter: blur(`
- `backdrop-filter: saturate(`

### Animations
Look for:
- `@keyframes`
- `animation:`
- `transition:`
- `transform:`, `opacity:` changes

### Border Effects
Look for:
- `border-image:`
- `mask-composite:`
- Animated gradient borders (moving `background-position`)

## Content Extraction

When the user provides a URL without specifying content:

1. Extract the page's `<title>` as a default card title
2. Extract the `<meta name="description">` as a default excerpt
3. Use the domain name as sourceName
4. If the page has an `<article>` or `<main>`, extract the first paragraph as excerpt
