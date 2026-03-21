import type { Note as NoteType } from '../domain/note';

export const Note = ({ note }: { note: NoteType }) => {
  return (
    <div
      className="note"
      style={{
        transform: 'translate(' + note.x + 'px, ' + note.y + 'px)',
        width: note.width,
        height: note.height,
        zIndex: note.zIndex,
        backgroundColor: note.color,
      }}
    />
  );
};
