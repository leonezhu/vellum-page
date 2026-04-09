# Design System Inspiration of Linear

## 1. Visual Theme & Atmosphere
Dark-mode-first precision engineering aesthetic. Near-black backgrounds with luminance-stepping elevation (not traditional shadows). Single brand indigo-violet accent. The design feels sophisticated and premium.

## 2. Color Palette & Roles

### Dark Mode (Primary)
- **Background** (`#08090a`): Deepest background
- **Surface 1** (`#111214`): Cards, elevated surfaces
- **Surface 2** (`#191a1b`): Higher elevation
- **Text Primary** (`#f7f8f8`): Headings, primary text
- **Text Secondary** (`#9b9b9b`): Body text
- **Text Muted** (`#5c5c5c`): Disabled, captions
- **Brand Indigo** (`#5e6ad2`): Primary accent
- **Brand Indigo Hover** (`#7170ff`): Accent hover
- **Border** (`rgba(255,255,255,0.08)`): Standard borders
- **Border Subtle** (`rgba(255,255,255,0.04)`): Subtle separators

### Light Mode
- **Background** (`#ffffff`): Primary background
- **Surface** (`#f9f9f9`): Elevated surfaces
- **Text Primary** (`#1d1d1f`): Headings
- **Text Secondary** (`#6b6b6f`): Body text
- **Text Muted** (`#a1a1a6`): Captions
- **Brand Indigo** (`#5e6ad2`): Accent
- **Border** (`rgba(0,0,0,0.08)`): Standard borders

## 3. Typography Rules

### Font Family
- **Primary**: `Inter Variable`, with fallbacks: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
- **OpenType Features**: `"cv01", "ss03"` — alternate lowercase l and simplified forms

### Hierarchy
| Role | Font | Size | Weight | Line Height | Letter Spacing |
|------|------|------|--------|-------------|----------------|
| Display Hero | Inter Variable | 56px | 510 | 1.0 | -1.12px |
| Section Heading | Inter Variable | 48px | 510 | 1.0 | -1.056px |
| Subsection | Inter Variable | 32px | 510 | 1.1 | -0.704px |
| Card Title | Inter Variable | 20px | 510 | 1.3 | -0.32px |
| Body | Inter Variable | 16px | 400 | 1.6 | 0 |
| Caption | Inter Variable | 13px | 500 | 1.4 | 0 |

## 5. Layout Principles

### Spacing System
- Base unit: 8px
- Scale: 1, 2, 4, 6, 8, 10, 12, 16, 20, 24, 32, 48, 64

### Border Radius
- Standard (4px): Buttons, inputs
- Medium (6px): Cards
- Large (8px): Modals

## 6. Depth & Elevation
| Level | Treatment | Use |
|-------|-----------|-----|
| Flat | Background luminance step | Default surface |
| Raised | Lighter background + subtle border | Cards |
| Overlay | `rgba(0,0,0,0.5)` backdrop | Modals |

## 9. Agent Prompt Guide

### Quick Color Reference
- Background: `#08090a` (dark) / `#ffffff` (light)
- Text: `#f7f8f8` (dark) / `#1d1d1f` (light)
- Accent: Brand Indigo (`#5e6ad2`)
- Border: `rgba(255,255,255,0.08)` (dark) / `rgba(0,0,0,0.08)` (light)
