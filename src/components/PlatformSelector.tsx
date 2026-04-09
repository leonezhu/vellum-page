import { platforms } from '../data/platforms';
import { useEditorStore } from '../store/editorStore';

export function PlatformSelector() {
  const { selectedPlatformId, setPlatform } = useEditorStore();

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-3 gap-1.5">
        {platforms.map((p) => (
          <button
            key={p.id}
            onClick={() => setPlatform(p.id)}
            className={`p-2 rounded-lg border text-left transition-all ${
              selectedPlatformId === p.id
                ? 'border-neutral-900 dark:border-white bg-neutral-50 dark:bg-neutral-800'
                : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span className="text-sm">{p.icon}</span>
              <div>
                <div className="text-[10px] font-medium leading-tight">{p.name}</div>
                <div className="text-[9px] text-neutral-400">{p.width}x{p.height}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
