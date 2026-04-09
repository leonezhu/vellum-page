import { create } from 'zustand';
import type { CardData, ColorMode, DesignTokens, PlatformPreset, TemplateId } from '../types/card';
import { platforms } from '../data/platforms';
import { hermesLight, hermesDark } from '../data/styles/hermes';

const styleTokens: Record<string, { light: DesignTokens; dark: DesignTokens }> = {
  hermes: { light: hermesLight, dark: hermesDark },
};

const STORAGE_KEY = 'vellum-editor-state';

interface PersistedState {
  cardData: CardData;
  selectedStyleId: string;
  colorMode: ColorMode;
  selectedPlatformId: string;
  selectedTemplateId: TemplateId;
  brandMark: string;
}

function loadState(): Partial<PersistedState> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return {};
}

function saveState(state: PersistedState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch { /* ignore */ }
}

const saved = loadState();

interface EditorState extends PersistedState {
  setCardData: (data: Partial<CardData>) => void;
  setStyle: (styleId: string) => void;
  setColorMode: (mode: ColorMode) => void;
  setPlatform: (presetId: string) => void;
  setTemplate: (templateId: TemplateId) => void;
  setBrandMark: (mark: string) => void;
  getPlatform: () => PlatformPreset;
  getTokens: () => DesignTokens;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  cardData: saved.cardData ?? {
    title: '',
    excerpt: '',
    author: '',
    date: '',
    tags: [],
  },
  selectedStyleId: saved.selectedStyleId ?? 'hermes',
  colorMode: saved.colorMode ?? 'dark',
  selectedPlatformId: saved.selectedPlatformId ?? 'twitter-16-9',
  selectedTemplateId: saved.selectedTemplateId ?? 'centered',
  brandMark: saved.brandMark ?? '',

  setCardData: (data) =>
    set((state) => {
      const next = { cardData: { ...state.cardData, ...data } };
      saveState({ ...state, ...next });
      return next;
    }),

  setStyle: (styleId) => {
    set({ selectedStyleId: styleId });
    saveState({ ...get(), selectedStyleId: styleId });
  },

  setColorMode: (mode) => {
    set({ colorMode: mode });
    saveState({ ...get(), colorMode: mode });
  },

  setPlatform: (presetId) => {
    set({ selectedPlatformId: presetId });
    saveState({ ...get(), selectedPlatformId: presetId });
  },

  setTemplate: (templateId) => {
    set({ selectedTemplateId: templateId });
    saveState({ ...get(), selectedTemplateId: templateId });
  },

  setBrandMark: (mark) => {
    set({ brandMark: mark });
    saveState({ ...get(), brandMark: mark });
  },

  getPlatform: () => {
    const { selectedPlatformId } = get();
    return platforms.find((p) => p.id === selectedPlatformId) ?? platforms[0];
  },

  getTokens: () => {
    const { selectedStyleId, colorMode } = get();
    const style = styleTokens[selectedStyleId];
    if (!style) return hermesDark;
    return colorMode === 'dark' ? style.dark : style.light;
  },
}));
