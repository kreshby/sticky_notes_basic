import { useRef } from 'react';

type Handlers = {
  onMove?: (dx: number, dy: number) => void;
  onEnd?: () => void;
};

export const usePointer = (handlers: Handlers) => {
  const startRef = useRef<{ x: number; y: number } | null>(null);

  const onPointerDown = (e: React.PointerEvent) => {
    console.log('pointer down', { x: e.clientX, y: e.clientY, pointerId: e.pointerId }); // check if getting pointer event

    e.currentTarget.setPointerCapture(e.pointerId);

    startRef.current = { x: e.clientX, y: e.clientY };

    const handleMove = (e: PointerEvent) => {
      console.log('pointer down', { x: e.clientX, y: e.clientY, pointerId: e.pointerId });

      if (!startRef.current) return;

      const dx = e.clientX - startRef.current.x;
      const dy = e.clientY - startRef.current.y;
      console.log('pointer move', { dx, dy });
      handlers.onMove?.(dx, dy);
    };

    const handleUp = () => {
      console.log('pointer up');
      handlers.onEnd?.();
      startRef.current = null;

      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
    };

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleUp);
  };

  return { onPointerDown };
};
