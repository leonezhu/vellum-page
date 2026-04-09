---
name: url2vellumpage
description: Analyze any website URL and generate a social media share card matching that site's visual design. Extracts colors, typography, and visual style from the live website, then creates a self-contained HTML card. Use when the user provides a URL and wants to create a share card, social image, or branded content card in that website's style. Triggers on: "make a card from this url", "create a share image from this site", "generate a card matching this website", or when user pastes a URL and mentions cards/images/sharing.
---

# URL to Vellum Page — Website-Style Share Card Generator

Analyze any website's visual design and generate a matching social media share card.

## Workflow

### Step 1: Fetch the Website

Use the `web-reader` tool (mcp__web_reader__webReader) to fetch the URL content with:
- `retain_images: true` to capture visual context
- `return_format: "markdown"` for content analysis

If the page is a SPA or the content seems incomplete, try fetching again or note the limitation.

### Step 2: Extract Design Tokens

Systematically extract design tokens from the fetched content. **Priority order: CSS variables > inline styles > computed classes > visual inspection.**

#### 2a. Color Palette Extraction

Scan the page source for these CSS custom properties (in `:root`, `body`, or inline `<style>` blocks):

```
Background:
  --background, --bg, --color-bg, --surface, --base
  body { background-color } or body { background }
  → Extract: background, surface (if different)

Text:
  --foreground, --text, --color-text, --content
  --text-secondary, --text-muted, --color-muted, --muted
  --heading, --title, --color-heading
  → Extract: textPrimary, textSecondary, textMuted

Accent:
  --accent, --primary, --color-primary, --highlight
  --midground, --brand, --color-accent
  → Extract: accent, accentHover (if --accent-hover exists)

Border:
  --border, --border-color, --color-border
  → Extract: border, borderSubtle
```

**If no CSS variables found**, infer from the page content:
- Look for `style="background: ..."` or `style="color: ..."` on major elements
- Check `<meta name="theme-color">` for accent hints
- Use visual inspection of the page structure

**Determine light/dark mode:**
- Parse the background hex value
- If luminance < 0.3 → dark mode
- If luminance > 0.7 → light mode

#### 2b. Typography Extraction

```
Font Family:
  --font-sans, --font-family, --font-body
  body { font-family }
  → Extract: fontFamily
  → Apply font substitution (see table below)

Title:
  h1 { font-size, font-weight, letter-spacing, line-height }
  --font-heading, --font-title
  → Extract: titleSize, titleWeight, titleLineHeight, titleLetterSpacing
  → If no h1 found, use the largest heading present (h2, h3)

Body:
  p { font-size, font-weight, line-height }
  --font-body
  → Extract: bodySize, bodyWeight, bodyLineHeight

Caption:
  small, figcaption, time, .caption, .meta
  → Extract: captionSize, captionWeight
```

**Font Substitution Strategy:**

| Original Font Type | Google Fonts Substitute |
|-------------------|------------------------|
| Geist, Inter, system-ui | Inter |
| SF Pro, -apple-system | System font stack |
| sohne, Satoshi, Circular | Inter (weight 300) |
| Mono/Courier/Code | JetBrains Mono |
| Custom/niche font | Inter (closest match) |

**Important:** Load the substitute font via Google Fonts `<link>` in the generated HTML.

#### 2c. Visual Features

```
Border Radius:
  --radius, --rounded, border-radius on buttons/cards
  → Extract: borderRadius (small: 4-6px, medium: 8-12px, large: 16px+, pill: 9999px)

Shadows:
  box-shadow on cards, containers, modals
  → Extract: card shadow, subtle shadow

Special Effects (describe in words):
  Gradients → note colors and direction
  mix-blend-mode → note which modes used
  Backdrop blur → note blur amount
  Animations → describe briefly
  Decorative elements → describe (shapes, patterns, textures)
```

### Step 3: Create Design Token Summary

Before generating the card, create a concise token summary. This serves as a reference and should be included as a comment in the generated HTML.

Format:
```
## Extracted Design Tokens
- Site: {domain}
- Mode: {light/dark}
- Background: {hex}
- Surface: {hex}
- Text Primary: {hex}
- Text Secondary: {hex}
- Accent: {hex}
- Border: {hex}
- Font: {original} → {substitute}
- Title: {size}/{weight}/{lineHeight}/{letterSpacing}
- Body: {size}/{weight}/{lineHeight}
- Border Radius: {value}
- Special: {description of unique features}
```

### Step 4: Choose Layout Template

Based on the extracted design style, choose the most fitting layout:

| Style Indicators | Recommended Layout |
|-----------------|-------------------|
| Dark background, monospace, tech | **Editorial** or **Minimal** |
| Light/clean, minimal borders | **Centered** or **Minimal** |
| Bold typography, magazine feel | **Editorial** |
| Grid-based, structured | **Split Horizontal** (wide) or **Vertical Stack** (tall) |
| Warm colors, organic feel | **Centered** |
| Strong accent color, decorative | **Split Horizontal** |

**Default platform:** Twitter/X 16:9 (1200x675) unless user specifies otherwise.

### Step 5: Generate the Card HTML

Create a **single self-contained HTML file** following this structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    .card {
      width: {WIDTH}px;
      height: {HEIGHT}px;
      background: {background};
      font-family: "{substituteFont}", {fallback};
      color: {textPrimary};
      position: relative;
      overflow: hidden;
      /* Apply extracted visual features */
    }
    /* Layout-specific styles */
    /* Replicate any distinctive visual elements from the site */
  </style>
</head>
<body>
  <div class="card">
    <!-- Card content with extracted design tokens -->
  </div>
</body>
</html>
```

**Key principles for the generated card:**

1. **Faithful to the source**: Use the exact extracted colors and typography values
2. **Reproduce distinctive elements**: If the site has a signature gradient, border effect, or visual pattern, incorporate it into the card
3. **Content slots**: Map the user's article/content to: title, excerpt, author, date, tags, quote
4. **Inline CSS only**: No external dependencies except Google Fonts
5. **Self-contained**: The HTML file must work standalone in any browser

### Step 6: Deliver

1. Save the HTML file: `card-{domain-keyword}.html`
2. Show the user the extracted design token summary
3. Mention what distinctive visual elements were reproduced
4. Offer to adjust: colors, layout, content, or try a different platform size

## Platform Size Presets

| Platform | Width | Height | Default |
|----------|-------|--------|---------|
| Twitter/X | 1200 | 675 | Yes |
| Twitter/X Square | 1200 | 1200 | |
| Instagram | 1080 | 1080 | |
| Instagram Portrait | 1080 | 1350 | |
| Xiaohongshu | 1080 | 1440 | |
| WeChat Moments | 1080 | 1920 | |
| LinkedIn | 1200 | 627 | |
| General | 1200 | 800 | |

## Tips

- If the site uses CSS custom properties with `color-mix()` or `oklab()`, resolve them to standard hex values for the card HTML
- If the site's fonts are custom/self-hosted and not on Google Fonts, use the closest Google Fonts match and note the original
- For SPA sites with minimal SSR content, focus on extracting whatever CSS variables and inline styles are present, then supplement with visual analysis
- If the user also provides article content, use it; otherwise use a placeholder title/excerpt
