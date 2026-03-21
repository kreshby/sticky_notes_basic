export type Note = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  text: string;
  color: string;
};
const MIN_NOTE_WIDTH = 80;
const MIN_NOTE_HEIGHT = 80;

export const moveNote = (note: Note, dx: number, dy: number): Note => ({
  ...note,
  x: note.x + dx,
  y: note.y + dy,
});

export const resizeNote = (note: Note, dw: number, dh: number): Note => ({
  ...note,
  width: Math.max(MIN_NOTE_WIDTH, note.width + dw),
  height: Math.max(MIN_NOTE_HEIGHT, note.height + dh),
});
