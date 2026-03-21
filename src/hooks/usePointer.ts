import { useRef } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';

type Handlers = {
  onMove?: (dx: number, dy: number) => void;
  onEnd?: () => void;
};

export const usePointer = (handlers: Handlers) => {
  const startRef = useRef<{ x: number; y: number } | null>(null);

  const onPointerDown = (e: ReactPointerEvent) => {
    startRef.current = { x: e.clientX, y: e.clientY };
  };

  return { onPointerDown };
};
