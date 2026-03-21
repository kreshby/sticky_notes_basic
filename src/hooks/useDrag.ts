import { usePointer } from './usePointer';

export const useDrag = (onDrag: (dx: number, dy: number) => void) => {
  return usePointer({
    onMove: onDrag,
  });
};
