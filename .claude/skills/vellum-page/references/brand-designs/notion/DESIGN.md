# Design System Inspiration of Notion

## 1. Visual Theme & Atmosphere
Warm minimalism with approachable, content-first design. Warm neutrals replace pure grays. Ultra-thin "whisper" borders. The design feels friendly and focused on content.

## 2. Color Palette & Roles

### Light Mode (Primary)
- **Warm White** (`#f6f5f4`): Primary background
- **Surface** (`#ffffff`): Cards, elevated surfaces
- **Near Black** (`#31302e`): Primary heading text
- **Warm Gray** (`#615d59`): Body text
- **Light Muted** (`#9b9790`): Caption text
- **Notion Blue** (`#0075de`): Primary accent, links
- **Blue Hover** (`#0066c4`): Accent hover
- **Border** (`rgba(0,0,0,0.1)`): Standard borders
- **Border Subtle** (`rgba(0,0,0,0.05)`): Whisper borders

### Dark Mode
- **Dark Background** (`#191919`): Primary background
- **Dark Surface** (`#252525`): Elevated surfaces
- **Light Text** (`#f1f1ef`): Primary text
- **Muted Text** (`#9b9790`): Secondary text
- **Dim Text** (`#615d59`): Captions
- **Blue** (`#529cca`): Accent

## 3. Typography Rules

### Font Family
- **Primary**: `NotionInter` → substitute: `Inter`, with fallbacks: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
- **Monospace**: `SFMono-Regular`, Menlo, Monaco, Consolas, monospace

### Hierarchy
| Role | Font | Size | Weight | Line Height | Letter Spacing |
|------|------|------|--------|-------------|----------------|
| Display Hero | NotionInter | 44px | 700 | 1.1 | -0.8px |
| Section Heading | NotionInter | 30px | 700 | 1.2 | -0.5px |
| Subsection | NotionInter | 24px | 600 | 1.3 | -0.4px |
| Card Title | NotionInter | 18px | 600 | 1.4 | -0.2px |
| Body Large | NotionInter | 16px | 400 | 1.65 | 0 |
| Body | NotionInter | 15px | 400 | 1.65 | 0 |
| Caption | NotionInter | 14px | 500 | 1.4 | 0 |

## 5. Layout Principles

### Spacing System
- Base unit: 8px
- Scale: 1, 2, 4, 6, 8, 12, 16, 24, 32, 48, 64

### Border Radius
- Small (3px): Inline elements
- Standard (4px): Buttons, inputs, cards
- Medium (6px): Larger containers

## 6. Depth & Elevation
| Level | Treatment | Use |
|-------|-----------|-----|
| Flat | No shadow | Default |
| Subtle | `rgba(15,15,15,0.05) 0px 0px 0px 1px` | Cards |
| Elevated | 4-layer shadow stack (1.04px to 18px blur, max opacity 0.04) | Featured |

## 9. Agent Prompt Guide

### Quick Color Reference
- Background: Warm White (`#f6f5f4`)
- Heading: Near Black (`#31302e`)
- Body: Warm Gray (`#615d59`)
- Accent: Notion Blue (`#0075de`)
- Border: `rgba(0,0,0,0.1)` (whisper borders)
