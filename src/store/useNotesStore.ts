import { create } from 'zustand';
import type { Note } from '../domain/note';
import { loadNotes, saveNotes } from '../infrastructure/storage';

type State = {
  notes: Note[];
  createNote: (input?: Partial<Pick<Note, 'x' | 'y' | 'width' | 'height'>>) => void;
  updateNote: (id: string, updater: (note: Note) => Note) => void;
  bringToFront: (id: string) => void;
};

const PERSIST_DEBOUNCE_MS = 200;
let persistTimeout: ReturnType<typeof setTimeout> | null = null;

const NOTE_COLORS = ['#fff59d', '#ffccbc', '#c8e6c9', '#bbdefb', '#e1bee7'];

const getRandomNoteColor = () => {
  const index = Math.floor(Math.random() * NOTE_COLORS.length);
  return NOTE_COLORS[index];
};

const saveNotesDebounced = (notes: Note[]) => {
  if (persistTimeout) {
    clearTimeout(persistTimeout);
  }

  persistTimeout = setTimeout(() => {
    saveNotes(notes);
    persistTimeout = null;
  }, PERSIST_DEBOUNCE_MS);
};

export const useNotesStore = create<State>((set, get) => ({
  notes: loadNotes(),

  createNote: (input = {}) => {
    const notes = get().notes;
    const maxZ = notes.reduce((m, n) => Math.max(m, n.zIndex), 0);

    const newNote: Note = {
      id: crypto.randomUUID(),
      x: input.x ?? 100,
      y: input.y ?? 100,
      width: input.width ?? 200,
      height: input.height ?? 150,
      zIndex: maxZ + 1,
      text: '',
      color: getRandomNoteColor(),
    };

    set((state) => {
      const newNotes = [...state.notes, newNote];
      saveNotes(newNotes);
      return { notes: newNotes };
    });
  },

  updateNote: (id, updater) => {
    set((state) => {
      const newNotes = state.notes.map((n) => (n.id === id ? updater(n) : n));
      saveNotesDebounced(newNotes);
      return { notes: newNotes };
    });
  },

  bringToFront: (id) => {
    const maxZ = Math.max(0, ...get().notes.map((n) => n.zIndex));

    set((state) => {
      const newNotes = state.notes.map((n) => (n.id === id ? { ...n, zIndex: maxZ + 1 } : n));
      saveNotes(newNotes);
      return { notes: newNotes };
    });
  },
}));
