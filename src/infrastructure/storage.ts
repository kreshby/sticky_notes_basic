import type { Note } from '../domain/note';

const KEY = 'notes';
const DEFAULT_NOTE_COLOR = '#fff59d';

export const saveNotes = (notes: Note[]) => {
  localStorage.setItem(KEY, JSON.stringify(notes));
};

const isNoteLike = (
  value: unknown,
): value is Omit<Note, 'text' | 'color'> & { text?: unknown; color?: unknown } => {
  if (value === null) return false;
  if (typeof value === 'object') {
    const v = value as Record<string, unknown>;

    return (
      typeof v.id === 'string' &&
      typeof v.x === 'number' &&
      typeof v.y === 'number' &&
      typeof v.width === 'number' &&
      typeof v.height === 'number' &&
      typeof v.zIndex === 'number'
    );
  }

  return false;
};

export const loadNotes = (): Note[] => {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw === null) return [];

    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed) === false) return [];

    // Normalize older saved shapes before using them in the UI.
    return parsed.filter(isNoteLike).map((n) => ({
      ...n,
      text: typeof n.text === 'string' ? n.text : '',
      color: typeof n.color === 'string' ? n.color : DEFAULT_NOTE_COLOR,
    }));
  } catch {
    return [];
  }
};
