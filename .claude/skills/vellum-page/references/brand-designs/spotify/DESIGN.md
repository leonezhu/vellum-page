# Design System Inspiration of Spotify

## 1. Visual Theme & Atmosphere
Immersive dark entertainment aesthetic. Near-black surfaces with Spotify Green as the sole chromatic accent. Pill-shaped buttons with uppercase labels. Heavy shadows on dark surfaces. The UI is achromatic by design — album art provides all the color.

## 2. Color Palette & Roles

### Dark Mode (Primary)
- **Near Black** (`#121212`): Primary background
- **Surface Dark** (`#181818`): Cards, elevated surfaces
- **Surface Elevated** (`#1f1f1f`): Higher elevation
- **White** (`#ffffff`): Primary text
- **Subdued White** (`#b3b3b3`): Body text
- **Muted** (`#6a6a6a`): Captions, disabled
- **Spotify Green** (`#1ed760`): Primary accent, CTA
- **Green Hover** (`#1fdf64`): Accent hover
- **Border** (`rgba(255,255,255,0.08)`): Standard borders
- **Border Subtle** (`rgba(255,255,255,0.04)`): Subtle separators

### Light Mode
- **Light Background** (`#f8f8f8`): Primary background
- **White** (`#ffffff`): Elevated surfaces
- **Near Black** (`#121212`): Primary text
- **Gray** (`#535353`): Body text
- **Muted** (`#a7a7a7`): Captions
- **Spotify Green** (`#1db954`): Accent

## 3. Typography Rules

### Font Family
- **Primary**: `SpotifyMixUI` → substitute: `Inter`, with fallbacks: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
- **OpenType Features**: None specific

### Hierarchy
| Role | Font | Size | Weight | Line Height | Letter Spacing |
|------|------|------|--------|-------------|----------------|
| Display Hero | SpotifyMixUI | 48px | 700 | 1.1 | -0.5px |
| Section Heading | SpotifyMixUI | 36px | 700 | 1.15 | -0.4px |
| Card Title | SpotifyMixUI | 20px | 700 | 1.3 | 0 |
| Body | SpotifyMixUI | 16px | 400 | 1.5 | 0 |
| Caption | SpotifyMixUI | 13px | 500 | 1.4 | 0.5px |
| Button | SpotifyMixUI | 14px | 700 | 1.0 | 1.4px (uppercase) |

## 5. Layout Principles

### Spacing System
- Base unit: 8px
- Scale: 4, 8, 12, 16, 24, 32, 48, 64

### Border Radius
- Small (4px): Small elements
- Standard (8px): Cards
- Pill (500px): Buttons, badges
- Circle (50%): Play controls, avatars

## 6. Depth & Elevation
| Level | Treatment | Use |
|-------|-----------|-----|
| Flat | No shadow | Default |
| Card | `rgba(0,0,0,0.3) 0px 4px 12px` | Cards at rest |
| Elevated | `rgba(0,0,0,0.5) 0px 8px 24px` | Featured, hover |

## 9. Agent Prompt Guide

### Quick Color Reference
- Background: Near Black (`#121212`)
- Text: White (`#ffffff`)
- Body: Subdued White (`#b3b3b3`)
- Accent: Spotify Green (`#1ed760`)
- Border: `rgba(255,255,255,0.08)`
