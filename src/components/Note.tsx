import { useRef } from 'react';
import { moveNote, resizeNote } from '../domain/note';
import type { Note as NoteType } from '../domain/note';
import { useNotesStore } from '../store/useNotesStore';
import { useDrag } from '../hooks/useDrag';
import { useResize } from '../hooks/useResize';

export const Note = ({ note }: { note: NoteType }) => {
  const updateNote = useNotesStore((s) => s.updateNote);
  const bringToFront = useNotesStore((s) => s.bringToFront);

  const dragStartRef = useRef<{ x: number; y: number }>({ x: note.x, y: note.y });
  const resizeStartRef = useRef<{ width: number; height: number }>({
    width: note.width,
    height: note.height,
  });

  const drag = useDrag((dx, dy) => {
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

  const resize = useResize((dw, dh) => {
    const start = resizeStartRef.current;

    updateNote(note.id, (n) =>
      resizeNote(
        {
          ...n,
          width: start.width,
          height: start.height,
        },
        dw,
        dh,
      ),
    );
  });

  return (
    <div
      onPointerDown={() => {
        bringToFront(note.id);
      }}
      className="note"
      style={{
        transform: 'translate(' + note.x + 'px, ' + note.y + 'px)',
        width: note.width,
        height: note.height,
        zIndex: note.zIndex,
        backgroundColor: note.color,
      }}
    >
      <div
        className="note-header"
        onPointerDown={(e) => {
          dragStartRef.current = { x: note.x, y: note.y };
          bringToFront(note.id);
          drag.onPointerDown(e);
        }}
      ></div>

      <div
        className="resizer"
        onPointerDown={(e) => {
          e.stopPropagation();
          resizeStartRef.current = { width: note.width, height: note.height };
          bringToFront(note.id);
          resize.onPointerDown(e);
        }}
      />
    </div>
  );
};
