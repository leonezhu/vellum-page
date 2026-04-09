import { useEditorStore } from '../store/editorStore';
import { parseArticle } from '../lib/parseArticle';

export function ContentInput() {
  const { cardData, setCardData } = useEditorStore();

  const handleTextChange = (text: string) => {
    if (text.length === 0) {
      setCardData({ title: '', excerpt: '', body: '' });
      return;
    }
    const parsed = parseArticle(text);
    const hasExplicitTitle = text.split('\n').some((l) => l.trim().startsWith('# '));

    if (hasExplicitTitle) {
      // User used # to mark a title — use parsed title, body for the rest
      setCardData({
        ...parsed,
        body: text,
      });
    } else {
      // No explicit title — treat entire pasted text as one block
      // Only extract metadata (author, date, tags, quote)
      setCardData({
        title: text,
        excerpt: undefined,
        body: text,
        author: parsed.author,
        date: parsed.date,
        tags: parsed.tags,
        quote: parsed.quote,
        sourceName: parsed.sourceName,
      });
    }
  };

  // For display: show the full body if present, otherwise title
  const displayText = cardData.body || cardData.title || '';

  return (
    <div className="flex flex-col gap-3">
      <textarea
        className="w-full h-36 p-3 text-sm border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 resize-y focus:outline-none focus:ring-2 focus:ring-neutral-400 placeholder:text-neutral-400"
        placeholder="Paste your text here...&#10;&#10;Optional markup:&#10;# Explicit title (first line without # = body text)&#10;By Author&#10;2024-01-15&#10;Tags: tag1, tag2&#10;> Quote text"
        value={displayText}
        onChange={(e) => handleTextChange(e.target.value)}
      />

      {/* Optional fields — collapsed by default */}
      <details className="group">
        <summary className="text-[10px] text-neutral-400 uppercase tracking-wider cursor-pointer hover:text-neutral-600 dark:hover:text-neutral-300 select-none">
          Options
        </summary>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div>
            <label className="text-[10px] text-neutral-400 uppercase tracking-wider mb-1 block">Title (optional)</label>
            <input
              className="w-full p-2 text-sm border border-neutral-200 dark:border-neutral-700 rounded bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-400"
              placeholder="Override title"
              value={cardData.title}
              onChange={(e) => setCardData({ title: e.target.value })}
            />
          </div>
          <div>
            <label className="text-[10px] text-neutral-400 uppercase tracking-wider mb-1 block">Author</label>
            <input
              className="w-full p-2 text-sm border border-neutral-200 dark:border-neutral-700 rounded bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-400"
              value={cardData.author ?? ''}
              onChange={(e) => setCardData({ author: e.target.value })}
            />
          </div>
          <div>
            <label className="text-[10px] text-neutral-400 uppercase tracking-wider mb-1 block">Tags</label>
            <input
              className="w-full p-2 text-sm border border-neutral-200 dark:border-neutral-700 rounded bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-400"
              value={cardData.tags?.join(', ') ?? ''}
              onChange={(e) => {
                const tags = e.target.value.split(/[,，]/).map((t) => t.trim()).filter(Boolean);
                setCardData({ tags: tags.length > 0 ? tags : undefined });
              }}
            />
          </div>
          <div>
            <label className="text-[10px] text-neutral-400 uppercase tracking-wider mb-1 block">Quote</label>
            <input
              className="w-full p-2 text-sm border border-neutral-200 dark:border-neutral-700 rounded bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-400"
              value={cardData.quote ?? ''}
              onChange={(e) => setCardData({ quote: e.target.value })}
            />
          </div>
        </div>
      </details>
    </div>
  );
}
