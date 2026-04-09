# Design System Inspiration of Apple

## 1. Visual Theme & Atmosphere
Cinematic product showcase aesthetic. Binary black-and-white sections with dramatic contrast. Single Apple Blue accent. SF Pro typography with optical sizing. Pill-shaped CTAs.

## 2. Color Palette & Roles

### Dark Mode (Primary)
- **Pure Black** (`#000000`): Primary background
- **Dark Surface** (`#1d1d1f`): Elevated surfaces
- **Light Text** (`#f5f5f7`): Primary text
- **Secondary Text** (`#a1a1a6`): Body text
- **Muted Text** (`#6e6e73`): Captions
- **Apple Blue** (`#0071e3`): Primary accent
- **Blue Hover** (`#0077ed`): Accent hover
- **Border** (`rgba(255,255,255,0.08)`): Subtle borders

### Light Mode
- **Light Gray** (`#f5f5f7`): Primary background
- **White** (`#ffffff`): Elevated surfaces
- **Near Black** (`#1d1d1f`): Primary text
- **Secondary** (`#6e6e73`): Body text
- **Muted** (`#a1a1a6`): Captions
- **Apple Blue** (`#0071e3`): Accent

## 3. Typography Rules

### Font Family
- **Primary**: `-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif`
- No web-safe substitute needed — system font stack

### Hierarchy
| Role | Font | Size | Weight | Line Height | Letter Spacing |
|------|------|------|--------|-------------|----------------|
| Display Hero | SF Pro Display | 56px | 700 | 1.05 | -1.5px |
| Section Heading | SF Pro Display | 48px | 600 | 1.07 | -1.2px |
| Subsection | SF Pro Display | 32px | 600 | 1.1 | -0.8px |
| Body Large | SF Pro Text | 21px | 400 | 1.43 | -0.2px |
| Body | SF Pro Text | 17px | 400 | 1.53 | -0.15px |
| Caption | SF Pro Text | 14px | 400 | 1.43 | 0 |

## 5. Layout Principles

### Spacing System
- Base unit: 8px
- Scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 120

### Border Radius
- Standard (8px): Cards, inputs
- Large (12px): Feature cards
- Pill (980px): CTA buttons, badges

## 6. Depth & Elevation
| Level | Treatment | Use |
|-------|-----------|-----|
| Flat | No shadow | Default |
| Subtle | `rgba(0,0,0,0.1) 0px 1px 3px 0px` | Cards |
| Elevated | `rgba(0,0,0,0.22) 3px 5px 30px 0px` | Featured cards |

## 9. Agent Prompt Guide

### Quick Color Reference
- Background: Black (`#000000`) / Light Gray (`#f5f5f7`)
- Text: `#f5f5f7` (dark) / `#1d1d1f` (light)
- Accent: Apple Blue (`#0071e3`)
- Border: `rgba(255,255,255,0.08)` (dark) / `rgba(0,0,0,0.08)` (light)
