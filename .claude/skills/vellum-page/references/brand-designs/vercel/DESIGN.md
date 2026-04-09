# Design System Inspiration of Vercel

## 1. Visual Theme & Atmosphere
Ultra-minimalist, engineering-precision aesthetic. Stark achromatic palette with occasional colored accents for specific workflows. The design communicates confidence through restraint.

## 2. Color Palette & Roles

### Primary
- **White** (`#ffffff`): Primary background
- **Neutral-900** (`#171717`): Primary text, headings
- **Neutral-700** (`#404040`): Body text
- **Neutral-500** (`#737373`): Secondary/muted text
- **Neutral-400** (`#a3a3a3`): Disabled/caption text
- **Neutral-200** (`#e5e5e5`): Borders
- **Neutral-100** (`#f5f5f5`): Subtle backgrounds
- **Neutral-50** (`#fafafa`): Surface backgrounds

### Accent Colors (workflow-specific)
- **Ship Red** (`#ff5b4f`): Errors, destructive actions
- **Preview Pink** (`#de1d8d`): Preview/deploy accent
- **Develop Blue** (`#0a72ef`): Development workflow

### Dark Mode
- **Dark-900** (`#000000`): Background
- **Dark-800** (`#111111`): Surface
- **Dark-700** (`#1a1a1a`): Elevated surface
- **Dark-300** (`#ededed`): Primary text
- **Dark-200** (`#a3a3a3`): Secondary text
- **Dark-100** (`#666666`): Muted text
- **Dark-border** (`#333333`): Borders

## 3. Typography Rules

### Font Family
- **Primary**: `Inter`, with fallbacks: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
- **Monospace**: `JetBrains Mono`, ui-monospace, Consolas, monospace
- **OpenType Features**: `"liga"` for ligatures

### Hierarchy
| Role | Font | Size | Weight | Line Height | Letter Spacing |
|------|------|------|--------|-------------|----------------|
| Display Hero | Inter | 64px (4.00rem) | 700 | 1.0 | -2.88px |
| Section Heading | Inter | 48px (3.00rem) | 600 | 1.0 | -2.4px |
| Subsection | Inter | 36px (2.25rem) | 600 | 1.1 | -1.8px |
| Card Title | Inter | 24px (1.50rem) | 500 | 1.3 | -0.72px |
| Body Large | Inter | 18px (1.125rem) | 400 | 1.6 | -0.18px |
| Body | Inter | 16px (1.00rem) | 400 | 1.6 | 0 |
| Caption | Inter | 14px (0.875rem) | 500 | 1.4 | 0 |
| Micro | Inter | 12px (0.75rem) | 500 | 1.4 | 0.2px |

## 4. Component Stylings

### Buttons
- **Primary**: Background `#000`, text `#fff`, padding 8px 16px, radius 6px, hover `#333`
- **Secondary**: Background transparent, border 1px solid `#e5e5e5`, text `#171717`, hover border `#999`
- **Ghost**: Background transparent, text `#737373`, hover text `#171717`

### Cards
- Background `#fff`, border none, shadow: `0px 0px 0px 1px rgba(0,0,0,0.05), 0px 2px 8px rgba(0,0,0,0.05)`
- Hover shadow: `0px 0px 0px 1px rgba(0,0,0,0.05), 0px 4px 16px rgba(0,0,0,0.08)`

## 5. Layout Principles

### Spacing System
- Base unit: 8px
- Scale: 1px, 2px, 4px, 6px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px, 128px

### Border Radius
- Standard (4px): Badges, small elements
- Comfortable (6px): Buttons, inputs
- Card (8px): Cards, containers
- Large (12px): Modals, dialogs

## 6. Depth & Elevation
| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (Level 0) | `0px 0px 0px 1px rgba(0,0,0,0.03)` | Subtle borders |
| Ambient (Level 1) | `0px 0px 0px 1px rgba(0,0,0,0.05), 0px 2px 8px rgba(0,0,0,0.05)` | Cards |
| Elevated (Level 2) | `0px 0px 0px 1px rgba(0,0,0,0.05), 0px 4px 16px rgba(0,0,0,0.08)` | Hover states |
| Overlay (Level 3) | `0px 0px 0px 1px rgba(0,0,0,0.05), 0px 8px 32px rgba(0,0,0,0.12)` | Modals, dropdowns |

## 9. Agent Prompt Guide

### Quick Color Reference
- Primary Background: White (`#ffffff`)
- Heading Text: Neutral-900 (`#171717`)
- Body Text: Neutral-700 (`#404040`)
- Muted Text: Neutral-500 (`#737373`)
- Border: Neutral-200 (`#e5e5e5`)
- Accent (general): Black (`#000000`)
