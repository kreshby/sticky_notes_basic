import { create } from 'zustand';
import type { Note } from '../domain/note';

type State = {
  notes: Note[];
  createNote: (input?: Partial<Pick<Note, 'x' | 'y' | 'width' | 'height'>>) => void;
};

export const useNotesStore = create<State>((set, get) => ({
  notes: [],

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
      color: '#fff59d',
    };

    set((state) => {
      const newNotes = [...state.notes, newNote];
      return { notes: newNotes };
    });
  },
}));
