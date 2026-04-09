import type { CardData } from '../types/card';

const DATE_PATTERNS = [
  /^\d{4}[-/]\d{1,2}[-/]\d{1,2}$/,
  /^\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+\d{4}$/i,
  /^\d{4}年\d{1,2}月\d{1,2}日$/,
  /^\d{1,2}月\d{1,2}日$/,
];

const AUTHOR_PREFIXES = ['by ', 'author: ', '作者：', '作者:', '@'];

export function parseArticle(text: string): CardData {
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
  if (lines.length === 0) return { title: '' };

  let title = '';
  let author = '';
  let date = '';
  let excerpt = '';
  const tags: string[] = [];
  const bodyLines: string[] = [];
  let quote = '';
  let foundTitle = false;
  let foundAuthor = false;
  let foundDate = false;
  let foundExcerpt = false;

  for (const line of lines) {
    // Markdown heading as title
    if (!foundTitle && line.startsWith('# ')) {
      title = line.replace(/^#+\s*/, '');
      foundTitle = true;
      continue;
    }

    // Author detection
    if (!foundAuthor) {
      const authorMatch = AUTHOR_PREFIXES.find((prefix) =>
        line.toLowerCase().startsWith(prefix),
      );
      if (authorMatch) {
        author = line.slice(authorMatch.length).trim();
        foundAuthor = true;
        continue;
      }
    }

    // Date detection
    if (!foundDate && DATE_PATTERNS.some((p) => p.test(line))) {
      date = line;
      foundDate = true;
      continue;
    }

    // Tag detection
    if (line.startsWith('#') && !line.startsWith('##')) {
      const tag = line.startsWith('#') ? line.slice(1).trim() : line;
      if (tag && !tag.includes(' ')) {
        tags.push(tag);
        continue;
      }
    }

    // Tags line
    if (line.toLowerCase().startsWith('tags:') || line.toLowerCase().startsWith('标签：') || line.toLowerCase().startsWith('标签:')) {
      const tagStr = line.replace(/^tags:\s*/i, '').replace(/^标签[：:]\s*/, '');
      tagStr.split(/[,，]/).forEach((t) => {
        const trimmed = t.trim().replace(/^#/, '');
        if (trimmed) tags.push(trimmed);
      });
      continue;
    }

    // Quote
    if (line.startsWith('> ')) {
      quote = line.slice(2).trim();
      continue;
    }

    // Title: first non-empty line if not found yet
    if (!foundTitle && line.length > 0) {
      title = line;
      foundTitle = true;
      continue;
    }

    // Excerpt: first paragraph after title (up to ~200 chars)
    if (!foundExcerpt && line.length > 20) {
      excerpt = line.length > 200 ? line.slice(0, 200) + '...' : line;
      foundExcerpt = true;
      continue;
    }

    // Remaining lines → body
    if (line.length > 0) {
      bodyLines.push(line);
    }
  }

  return {
    title,
    excerpt: excerpt || bodyLines.slice(0, 3).join(' '),
    body: bodyLines.join('\n'),
    author: author || undefined,
    date: date || undefined,
    tags: tags.length > 0 ? tags : undefined,
    quote: quote || undefined,
  };
}
