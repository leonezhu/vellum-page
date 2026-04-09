# Design System Inspiration of Stripe

## 1. Visual Theme & Atmosphere
Premium fintech elegance. Clean white canvas with ultra-light weight 300 headlines in deep navy. Blue-tinted multi-layer shadows create distinctive elevation. Signature purple accent.

## 2. Color Palette & Roles

### Light Mode (Primary)
- **White** (`#ffffff`): Primary background
- **Light Surface** (`#f6f8fa`): Secondary backgrounds
- **Deep Navy** (`#061b31`): Primary heading text
- **Body Gray** (`#4b5563`): Body text
- **Muted Gray** (`#9ca3af`): Caption text
- **Stripe Purple** (`#533afd`): Primary CTA, accent
- **Purple Hover** (`#6355f0`): Accent hover
- **Border** (`#e5e7eb`): Standard borders
- **Shadow Blue** (`rgba(50,50,93,0.25)`): Signature shadow tint

### Dark Mode
- **Dark Navy** (`#0a2540`): Primary background
- **Dark Surface** (`#12263a`): Elevated surfaces
- **White** (`#ffffff`): Primary text
- **Muted** (`#9ca3af`): Secondary text
- **Purple Light** (`#7a73ff`): Accent

## 3. Typography Rules

### Font Family
- **Primary**: `sohne-var` → substitute: `Inter` weight 300, with fallbacks: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
- **Monospace**: `Berkeley Mono` → substitute: `JetBrains Mono`
- **OpenType Features**: `"ss01"` — alternate characters

### Hierarchy
| Role | Font | Size | Weight | Line Height | Letter Spacing |
|------|------|------|--------|-------------|----------------|
| Display Hero | sohne-var | 56px | 300 | 1.03 | -1.4px |
| Section Heading | sohne-var | 48px | 300 | 1.15 | -0.96px |
| Subsection | sohne-var | 36px | 400 | 1.2 | -0.72px |
| Card Title | sohne-var | 24px | 400 | 1.3 | -0.48px |
| Body Large | sohne-var | 18px | 400 | 1.6 | -0.18px |
| Body | sohne-var | 16px | 400 | 1.6 | 0 |
| Caption | sohne-var | 14px | 500 | 1.4 | 0 |

## 5. Layout Principles

### Spacing System
- Base unit: 8px
- Scale: 1, 2, 4, 6, 8, 12, 16, 24, 32, 48, 64, 80, 120

### Border Radius
- Small (4px): Badges
- Standard (6px): Buttons, inputs, cards
- Medium (8px): Larger cards

## 6. Depth & Elevation
| Level | Treatment | Use |
|-------|-----------|-----|
| Flat | No shadow | Default |
| Ambient | `rgba(50,50,93,0.1) 0px 2px 8px -2px` | Cards at rest |
| Elevated | `rgba(50,50,93,0.25) 0px 30px 45px -30px, rgba(0,0,0,0.1) 0px 18px 36px -18px` | Featured cards |

## 9. Agent Prompt Guide

### Quick Color Reference
- Background: White (`#ffffff`)
- Heading: Deep Navy (`#061b31`)
- Body: Gray (`#4b5563`)
- Primary CTA: Stripe Purple (`#533afd`)
- Shadow: Blue-tinted `rgba(50,50,93,0.25)`
