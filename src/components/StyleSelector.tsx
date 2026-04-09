import { hermesStyle } from '../data/styles/hermes';
import { useEditorStore } from '../store/editorStore';

export function StyleSelector() {
  const { colorMode, setColorMode } = useEditorStore();

  return (
    <div className="flex flex-col gap-3">
      <div className="p-2.5 rounded-lg border-2 border-neutral-900 dark:border-white bg-neutral-50 dark:bg-neutral-800">
        <div
          className="w-full h-7 rounded-sm mb-1.5"
          style={{ backgroundColor: hermesStyle.backgroundColor }}
        />
        <div className="flex items-center gap-1.5">
          <div
            className="w-2.5 h-2.5 rounded-full shrink-0"
            style={{ backgroundColor: hermesStyle.accentColor }}
          />
          <span className="text-xs font-medium">{hermesStyle.name}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-1">
        <button
          onClick={() => setColorMode('light')}
          className={`flex-1 py-1.5 text-xs rounded-md transition-all ${
            colorMode === 'light'
              ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
              : 'bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400'
          }`}
        >
          Light
        </button>
        <button
          onClick={() => setColorMode('dark')}
          className={`flex-1 py-1.5 text-xs rounded-md transition-all ${
            colorMode === 'dark'
              ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
              : 'bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400'
          }`}
        >
          Dark
        </button>
      </div>
    </div>
  );
}
