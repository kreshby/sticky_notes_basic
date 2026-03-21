import { useNotesStore } from '../store/useNotesStore';
import { Note } from './Note';

export const Board = () => {
  const notes = useNotesStore((s) => s.notes);
  const createNote = useNotesStore((s) => s.createNote);

  return (
    <div className="board">
      <button type="button" className="add-note-btn" onClick={() => createNote()}>
        Add note
      </button>

      {notes.map((note) => (
        <Note key={note.id} note={note} />
      ))}
    </div>
  );
};
