import { usePointer } from './usePointer';

export const useResize = (onResize: (dw: number, dh: number) => void) => {
  return usePointer({
    onMove: onResize,
  });
};
