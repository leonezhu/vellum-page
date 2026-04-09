---
name: vellum-page
description: Generate beautiful social media share cards from article content using brand design systems. Creates standalone HTML files styled with real company design tokens (Vercel, Linear, Stripe, Apple, Notion, Spotify). Use when the user wants to create social cards, share images, quote cards, article highlights, or branded content cards for Twitter/X, Instagram, LinkedIn, WeChat, or Xiaohongshu. Also use when the user says "make a share card", "create a social image", "generate a card for this article", or mentions any social platform card/image.
---

# Vellum Page — Social Card Generator

Generate beautiful, self-contained HTML share cards from article content using real brand design systems.

## Workflow

### Step 1: Understand the Request
- Identify the content: pasted article, URL, key points, or quote
- Determine target platform (default: Twitter/X 16:9 if unspecified)
- Ask if the user has a brand preference, or suggest one based on content tone:
  - Tech/developer content → Vercel (light) or Linear (dark)
  - Business/fintech → Stripe (light)
  - Product/launch → Apple (dark)
  - Productivity/writing → Notion (light)
  - Entertainment/casual → Spotify (dark)

### Step 2: Read Brand Design Tokens
- Read the brand's reference file from `references/brand-designs/{brand}/DESIGN.md`
- Extract tokens from **Section 9** (Agent Prompt Guide) for quick application
- Fall back to **Section 2** (Color Palette) and **Section 3** (Typography) for details

### Step 3: Map Content to Card Slots
Map the article content to these slots:
- **title** (required) — Article headline or main text
- **excerpt** (optional) — 1-3 line summary
- **author** (optional) — Writer name
- **date** (optional) — Publication date
- **tags** (optional) — 2-4 topic tags
- **quote** (optional) — Pull quote from the article
- **sourceName** (optional) — Publication or site name

### Step 4: Generate the Card HTML
Create a **single self-contained HTML file** with:
- Exact pixel dimensions from the platform preset (see `references/size-presets.md`)
- Inline CSS only (no external dependencies except Google Fonts)
- Brand design tokens applied faithfully

#### Platform Size Presets
| Platform | Width | Height |
|----------|-------|--------|
| Twitter/X Landscape | 1200 | 675 |
| Twitter/X Square | 1200 | 1200 |
| Instagram Square | 1080 | 1080 |
| Instagram Portrait | 1080 | 1350 |
| Xiaohongshu Portrait | 1080 | 1440 |
| Xiaohongshu Square | 1080 | 1080 |
| WeChat Moments | 1080 | 1920 |
| LinkedIn | 1200 | 627 |
| General | 1200 | 800 |

#### Font Substitution Strategy
| Original Font | Substitute | Load via |
|--------------|-----------|----------|
| Geist | Inter | Google Fonts |
| Inter Variable (cv01, ss03) | Inter | Google Fonts |
| sohne-var | Inter (weight 300) | Google Fonts |
| SF Pro Display/Text | System font stack | Native |
| NotionInter | Inter | Google Fonts |
| SpotifyMixUI | Inter | Google Fonts |
| CircularSp | Inter | Google Fonts |

### Step 5: Layout Templates

Choose a layout based on the card's aspect ratio and content:

1. **Centered** — All text centered. Works for all aspect ratios. Best for: quotes, announcements.
2. **Split Horizontal** — Left text (58%), right decorative zone (42%). Best for wide (16:9, 3:2).
3. **Vertical Stack** — Brand header bar, title, body, footer. Best for portrait (4:5, 3:4, 9:16).
4. **Editorial** — Magazine-style large title dominating top 40-50%. Best for wide (16:9, 3:2).
5. **Minimal** — Ultra-clean, title + metadata only, small monospace label. Best for wide (16:9, 1:1).

### Step 6: Deliver
- Save the HTML file with a descriptive name (e.g., `twitter-card-vercel.html`)
- Tell the user they can open it in a browser and screenshot it
- Offer to adjust colors, layout, or content if needed

## Available Brands

| Brand | Default Mode | Accent Color | Best For |
|-------|-------------|-------------|----------|
| Vercel | Light | #000000 | Developer tools, tech articles |
| Linear | Dark | #5e6ad2 | Engineering, dark-mode aesthetics |
| Stripe | Light | #533afd | Business, fintech, professional |
| Apple | Dark | #0071e3 | Product launches, consumer |
| Notion | Light | #0075de | Productivity, writing, knowledge |
| Spotify | Dark | #1ed760 | Entertainment, music, casual |

## HTML Template Structure

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
      font-family: {fontFamily};
      color: {textPrimary};
      position: relative;
      overflow: hidden;
    }
    /* ... layout-specific styles ... */
  </style>
</head>
<body>
  <div class="card">
    <!-- Card content -->
  </div>
</body>
</html>
```
