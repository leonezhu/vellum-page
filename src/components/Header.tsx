interface HeaderProps {
  onToggleSidebar: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  return (
    <header className="h-12 flex items-center justify-between px-4 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shrink-0">
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-1.5 -ml-1 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
          aria-label="Toggle sidebar"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
        <span className="text-base font-semibold tracking-tight">Vellum Page</span>
        <span className="text-xs text-neutral-400 hidden sm:inline">Social Card Generator</span>
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
