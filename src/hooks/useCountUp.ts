// src/hooks/useCountUp.ts
// ─────────────────────────────────────────────────────────────────────────────
// CUSTOM HOOK — useCountUp
//
// Anima un número desde 0 hasta un valor objetivo.
// Solo arranca cuando el elemento es visible en pantalla.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";

interface UseCountUpOptions {
  end: number; // número final
  duration?: number; // duración en ms (default: 1500)
  start?: number; // número inicial (default: 0)
  trigger?: boolean; // cuándo arrancar la animación
}

const useCountUp = ({
  end,
  duration = 1500,
  start = 0,
  trigger = true,
}: UseCountUpOptions): number => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    // No arranca hasta que trigger sea true (cuando el elemento es visible)
    if (!trigger) return;

    const startTime = performance.now();
    const range = end - start;

    // requestAnimationFrame: forma correcta de animar en el browser
    // El browser llama a esta función antes de cada repintado (~60fps)
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1); // 0 a 1

      // Easing: easeOutCubic — empieza rápido, termina suave
      const eased = 1 - Math.pow(1 - progress, 3);

      setCount(Math.round(start + range * eased));

      // Si no terminó, pedir el siguiente frame
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const frameId = requestAnimationFrame(animate);

    // Cleanup: cancelar la animación si el componente desmonta
    return () => cancelAnimationFrame(frameId);
  }, [end, duration, start, trigger]);

  return count;
};

export default useCountUp;
