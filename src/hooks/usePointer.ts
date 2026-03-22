import { useEffect, useRef } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';

type Handlers = {
  onMove?: (dx: number, dy: number) => void;
  onEnd?: () => void;
};

export const usePointer = (handlers: Handlers) => {
  const startRef = useRef<{ x: number; y: number } | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  const onPointerDown = (e: ReactPointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    startRef.current = { x: e.clientX, y: e.clientY };

    const handleMove = (ev: PointerEvent) => {
      if (startRef.current === null) return;
      handlers.onMove?.(ev.clientX - startRef.current.x, ev.clientY - startRef.current.y);
    };

    const finish = () => {
      handlers.onEnd?.();
      startRef.current = null;
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', finish);
      window.removeEventListener('pointercancel', finish);
      cleanupRef.current = null;
    };

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', finish);
    window.addEventListener('pointercancel', finish);

    cleanupRef.current = finish;
  };

  useEffect(() => {
    return () => cleanupRef.current?.();
  }, []);

  return { onPointerDown };
};
