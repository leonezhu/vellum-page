# HTML Card Template Reference

## Base Template

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
      font-family: "{fontFamily}", {fontFallback};
      color: {textPrimary};
      position: relative;
      overflow: hidden;
    }

    /* === TYPOGRAPHY === */
    .card-title {
      font-size: {titleSize};
      font-weight: {titleWeight};
      line-height: {titleLineHeight};
      letter-spacing: {titleLetterSpacing};
      color: {textPrimary};
      margin: 0;
    }

    .card-body {
      font-size: {bodySize};
      font-weight: {bodyWeight};
      line-height: {bodyLineHeight};
      color: {textSecondary};
      margin: 0;
    }

    .card-caption {
      font-size: {captionSize};
      font-weight: {captionWeight};
      line-height: 1.4;
      color: {textMuted};
      margin: 0;
    }

    .card-tag {
      font-size: {captionSize};
      font-weight: {captionWeight};
      background: {tagBg};
      color: {tagText};
      border-radius: {badgeRadius};
      padding: {tagPadding};
      display: inline-block;
    }

    /* === ACCENT ELEMENTS === */
    .accent-bar {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, {accent}, {accent}88, transparent);
    }

    .accent-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: {accent};
    }

    .quote-border {
      border-left: 3px solid {accent};
      padding-left: 16px;
      font-style: italic;
      color: {accent};
    }

    .separator {
      width: 40px;
      height: 1px;
      background: {border};
    }
  </style>
</head>
<body>
  <div class="card">
    <!-- Accent bar (optional) -->
    <div class="accent-bar"></div>

    <!-- Content container (adjust layout per template) -->
    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; padding: {padding}px; box-sizing: border-box; text-align: center;">

      <!-- Title -->
      <h1 class="card-title" style="margin-bottom: 16px;">{title}</h1>

      <!-- Separator (optional) -->
      <div class="separator" style="margin-bottom: 16px;"></div>

      <!-- Excerpt -->
      <p class="card-body" style="margin-bottom: 24px;">{excerpt}</p>

      <!-- Tags (optional) -->
      <div style="display: flex; gap: 8px; margin-bottom: 16px;">
        <span class="card-tag">{tag1}</span>
        <span class="card-tag">{tag2}</span>
      </div>

      <!-- Author + Date -->
      <div class="card-caption" style="display: flex; gap: 16px; align-items: center;">
        <span>{author}</span>
        <span style="opacity: 0.3;">|</span>
        <span>{date}</span>
      </div>
    </div>
  </div>
</body>
</html>
```

## Layout Variants

### Centered (default, all aspect ratios)
- All content centered horizontally
- Title → separator → excerpt → tags → metadata
- Works for quotes, announcements, general use

### Split Horizontal (wide: 16:9, 3:2)
- Left 58%: text content (title, excerpt, tags, metadata)
- Right 42%: decorative zone (gradient, shapes, brand label vertical)
- Use when the site has strong visual identity elements to showcase

### Vertical Stack (portrait: 4:5, 3:4, 9:16)
- Top: brand header bar (name + date)
- Middle: title + excerpt + tags
- Bottom: footer (author + source)
- Bordered sections

### Editorial (wide: 16:9, 3:2)
- Top 40-50%: large title (1.3x normal size)
- Thin accent separator line
- Below: excerpt + quote
- Bottom: metadata bar with border-top

### Minimal (wide: 16:9, 1:1)
- Small monospace label at top
- Accent dot
- Title only (no excerpt)
- Separator
- Author + date

## Special Effects to Apply

When the source site has distinctive visual features, incorporate them:

### Gradient Backgrounds
```css
.card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 0% 0%, {accentColor}55 0%, transparent 60%);
  z-index: 0;
}
```

### Emboss/Inset Borders
```css
box-shadow: inset -1px -1px 0 0 rgba(0,0,0,0.5), inset 1px 1px 0 0 rgba(255,255,255,0.16);
```

### Animated Gradient Border
```css
.card::after {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: inherit;
  background: linear-gradient(var(--angle), {accent1}, {accent2}, {accent1});
  z-index: -1;
  animation: rotate-border 3s linear infinite;
}
```

### Grid/Cell Pattern
```css
.card::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(currentColor 1px, transparent 1px),
    linear-gradient(90deg, currentColor 1px, transparent 1px);
  background-size: 80px 80px;
  opacity: 0.03;
}
```

### Double Border
```css
border: 4px double {borderColor};
```

### Dither Pattern
```css
background: repeating-conic-gradient(currentColor 0% 25%, transparent 0% 50%) 0 0 / 2px 2px;
```
