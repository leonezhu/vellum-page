import type { TemplateId } from '../types/card';
import { templates } from '../data/templates';
import { useEditorStore } from '../store/editorStore';

export function TemplateSelector() {
  const { selectedTemplateId, setTemplate } = useEditorStore();

  return (
    <div className="flex flex-col gap-3">
      <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
        Layout
      </label>
      <div className="grid grid-cols-5 gap-2">
        {templates.map((t) => (
          <button
            key={t.id}
            onClick={() => setTemplate(t.id as TemplateId)}
            title={t.description}
            className={`flex flex-col items-center gap-1.5 p-2 rounded-lg border-2 transition-all ${
              selectedTemplateId === t.id
                ? 'border-neutral-900 dark:border-white bg-neutral-50 dark:bg-neutral-800'
                : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'
            }`}
          >
            {/* Mini layout preview */}
            <div className="w-full aspect-[3/4] border border-neutral-300 dark:border-neutral-600 rounded-sm overflow-hidden relative">
              <LayoutIcon id={t.id} />
            </div>
            <span className="text-[10px] font-medium">{t.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function LayoutIcon({ id }: { id: string }) {
  const accent = 'currentColor';
  switch (id) {
    case 'centered':
      return (
        <svg viewBox="0 0 30 40" className="w-full h-full p-1">
          <line x1="5" y1="14" x2="25" y2="14" stroke={accent} strokeWidth="2" opacity="0.6" />
          <line x1="8" y1="20" x2="22" y2="20" stroke={accent} strokeWidth="1" opacity="0.3" />
          <line x1="10" y1="24" x2="20" y2="24" stroke={accent} strokeWidth="1" opacity="0.3" />
        </svg>
      );
    case 'split-horizontal':
      return (
        <svg viewBox="0 0 30 40" className="w-full h-full p-1">
          <line x1="2" y1="12" x2="16" y2="12" stroke={accent} strokeWidth="2" opacity="0.6" />
          <line x1="2" y1="17" x2="14" y2="17" stroke={accent} strokeWidth="1" opacity="0.3" />
          <line x1="2" y1="21" x2="12" y2="21" stroke={accent} strokeWidth="1" opacity="0.3" />
          <line x1="17" y1="2" x2="17" y2="38" stroke={accent} strokeWidth="0.5" opacity="0.2" />
          <circle cx="23" cy="16" r="6" stroke={accent} strokeWidth="0.5" fill="none" opacity="0.3" />
        </svg>
      );
    case 'vertical-stack':
      return (
        <svg viewBox="0 0 30 40" className="w-full h-full p-1">
          <line x1="2" y1="4" x2="28" y2="4" stroke={accent} strokeWidth="0.5" opacity="0.3" />
          <line x1="5" y1="14" x2="25" y2="14" stroke={accent} strokeWidth="2" opacity="0.6" />
          <line x1="5" y1="20" x2="23" y2="20" stroke={accent} strokeWidth="1" opacity="0.3" />
          <line x1="5" y1="25" x2="20" y2="25" stroke={accent} strokeWidth="1" opacity="0.3" />
          <line x1="2" y1="36" x2="28" y2="36" stroke={accent} strokeWidth="0.5" opacity="0.3" />
        </svg>
      );
    case 'editorial':
      return (
        <svg viewBox="0 0 30 40" className="w-full h-full p-1">
          <line x1="2" y1="8" x2="20" y2="8" stroke={accent} strokeWidth="3" opacity="0.7" />
          <line x1="2" y1="14" x2="18" y2="14" stroke={accent} strokeWidth="3" opacity="0.7" />
          <line x1="2" y1="20" x2="28" y2="20" stroke={accent} strokeWidth="0.5" opacity="0.2" />
          <line x1="2" y1="24" x2="25" y2="24" stroke={accent} strokeWidth="1" opacity="0.3" />
          <line x1="2" y1="28" x2="22" y2="28" stroke={accent} strokeWidth="1" opacity="0.3" />
        </svg>
      );
    case 'minimal':
      return (
        <svg viewBox="0 0 30 40" className="w-full h-full p-1">
          <circle cx="15" cy="10" r="1" fill={accent} opacity="0.5" />
          <line x1="6" y1="18" x2="24" y2="18" stroke={accent} strokeWidth="2" opacity="0.6" />
          <line x1="9" y1="23" x2="21" y2="23" stroke={accent} strokeWidth="1" opacity="0.3" />
        </svg>
      );
    default:
      return null;
  }
}
