export function Header() {
  return (
    <header className="h-12 flex items-center justify-between px-4 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shrink-0">
      <div className="flex items-center gap-2">
        <span className="text-base font-semibold tracking-tight">Vellum Page</span>
        <span className="text-xs text-neutral-400">Social Card Generator</span>
      </div>
      <a
        href="https://github.com/leonezhu/vellum-page"
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
      >
        GitHub
      </a>
    </header>
  );
}
