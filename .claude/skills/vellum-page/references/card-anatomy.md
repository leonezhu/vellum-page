# Card Anatomy

## Content Slots

Every card has these available content slots:

| Slot | Required | Description |
|------|----------|-------------|
| title | Yes | Main headline, displayed prominently |
| excerpt | No | 1-3 line summary below title |
| body | No | Full body text (used only in portrait cards) |
| author | No | Writer/contributor name |
| date | No | Publication or creation date |
| tags | No | 2-4 topic keywords displayed as pill badges |
| quote | No | Pull quote with left accent border |
| sourceName | No | Publication or site name, shown subtly |

## Layout Patterns

### Centered Layout
```
┌──────────────────────────────┐
│ ▬▬▬ accent bar ▬▬▬▬▬▬▬▬▬▬  │
│                              │
│         [TITLE]              │
│                              │
│      [excerpt text]          │
│                              │
│    #tag1  #tag2  #tag3       │
│                              │
│    author  |  date           │
│                              │
│                    source    │
└──────────────────────────────┘
```

### Split Horizontal Layout (Wide only)
```
┌────────────────┬─────────────┐
│                │             │
│  [TITLE]       │  decorative │
│                │   gradient  │
│  [excerpt]     │     zone    │
│                │   ○         │
│  #tag1 #tag2   │             │
│                │   BRAND     │
│  author | date │             │
└────────────────┴─────────────┘
```

### Vertical Stack Layout (Portrait)
```
┌──────────────────────────────┐
│ BRAND          date          │
├──────────────────────────────┤
│                              │
│  [TITLE]                     │
│                              │
│  [excerpt text]              │
│  [more text if space]        │
│                              │
│  #tag1  #tag2  #tag3         │
│                              │
├──────────────────────────────┤
│ author              source   │
└──────────────────────────────┘
```

### Editorial Layout
```
┌──────────────────────────────┐
│  #tag1  #tag2  #tag3         │
│                              │
│  [VERY LARGE TITLE]          │
│  [THAT SPANS                 │
│   MULTIPLE LINES]            │
│  ▬ accent line               │
│  [excerpt text below]        │
│                              │
│  author | date      source   │
└──────────────────────────────┘
```

### Minimal Layout
```
┌──────────────────────────────┐
│                              │
│         ARTICLE              │
│            •                 │
│         [TITLE]              │
│                              │
│        ─────────             │
│     author  |  date          │
│                              │
│                    source    │
└──────────────────────────────┘
```

## Text Truncation Rules

| Slot | Wide (16:9) | Square (1:1) | Portrait (4:5) | Tall (9:16) |
|------|-------------|-------------|----------------|-------------|
| Title | 2-3 lines | 3-4 lines | 3-4 lines | 4-5 lines |
| Excerpt | 2-3 lines | 3-4 lines | 5-6 lines | 8-10 lines |
| Tags | 3 max | 4 max | 4 max | 4 max |

## Color Application Rules

1. **Background**: Always use the brand's primary background color
2. **Title**: Always use textPrimary color
3. **Excerpt/Body**: Always use textSecondary color
4. **Caption/Metadata**: Always use textMuted color
5. **Accent**: Use for accent bar, tag backgrounds, quote borders, decorative elements
6. **Borders**: Use brand's border color for dividers and card borders
7. **Tags**: Use tagBg for background, tagText for text color
