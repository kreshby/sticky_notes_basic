import { useRef } from 'react';
import { moveNote } from '../domain/note';
import type { Note as NoteType } from '../domain/note';
import { useNotesStore } from '../store/useNotesStore';
import { useDrag } from '../hooks/useDrag';

export const Note = ({ note }: { note: NoteType }) => {
  const updateNote = useNotesStore((s) => s.updateNote);

  const dragStartRef = useRef<{ x: number; y: number }>({ x: note.x, y: note.y });

  const drag = useDrag((dx, dy) => {
    console.log('drag callback', { id: note.id, start: dragStartRef.current, dx, dy });
    const start = dragStartRef.current;

    updateNote(note.id, (n) =>
      moveNote(
        {
          ...n,
          x: start.x,
          y: start.y,
        },
        dx,
        dy,
      ),
    );
  });

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
      onPointerDown={(e) => {
        dragStartRef.current = { x: note.x, y: note.y };
        drag.onPointerDown(e);
      }}
    />
  );
};
