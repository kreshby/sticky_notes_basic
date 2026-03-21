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

export const moveNote = (note: Note, dx: number, dy: number): Note => ({
  ...note,
  x: note.x + dx,
  y: note.y + dy,
});
