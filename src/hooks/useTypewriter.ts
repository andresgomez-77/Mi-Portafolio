// ─────────────────────────────────────────────────────────────────────────────
// CUSTOM HOOK — useTypewriter
//
// Un "custom hook" es una función que empieza con "use" y puede usar
// otros hooks de React adentro. Sirve para extraer lógica compleja
// fuera del componente y hacerla reutilizable.
//
// Conceptos nuevos aquí:
//   → useRef:     guardar un valor que NO re-renderiza el componente
//   → useEffect:  manejar el ciclo de vida del efecto
//   → Cleanup:    cancelar timeouts para evitar memory leaks
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useRef } from "react";

// Interfaz de configuración del hook
interface UseTypewriterOptions {
  words: string[]; // lista de palabras/frases a escribir
  typeSpeed?: number; // ms entre cada letra al escribir (default: 80)
  deleteSpeed?: number; // ms entre cada letra al borrar (default: 50)
  pauseTime?: number; // ms de pausa cuando termina de escribir (default: 2000)
}

interface UseTypewriterReturn {
  displayText: string; // el texto que se muestra en pantalla
  isTyping: boolean; // true mientras está escribiendo (para el cursor)
}

const useTypewriter = ({
  words,
  typeSpeed = 80,
  deleteSpeed = 50,
  pauseTime = 2000,
}: UseTypewriterOptions): UseTypewriterReturn => {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  // useRef guarda valores entre renders SIN causar re-renders.
  // Perfecto para el índice actual y el timeout — son "internos" del hook,
  // no necesitan reflejarse en la UI directamente.
  const wordIndexRef = useRef(0); // qué palabra estamos mostrando
  const charIndexRef = useRef(0); // en qué letra vamos
  const isDeletingRef = useRef(false); // ¿estamos borrando o escribiendo?
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null); // referencia al timeout activo

  useEffect(() => {
    // Early return: si no hay palabras no hacemos nada
    if (!words.length) return;

    const tick = () => {
      const currentWord = words[wordIndexRef.current];
      const isDeleting = isDeletingRef.current;
      const currentChar = charIndexRef.current;

      if (!isDeleting) {
        // ── Modo escritura ──────────────────────────────────────────────────
        setIsTyping(true);
        setDisplayText(currentWord.slice(0, currentChar + 1));
        charIndexRef.current++;

        if (charIndexRef.current === currentWord.length) {
          // Terminó de escribir → pausa antes de borrar
          setIsTyping(false);
          isDeletingRef.current = true;
          timeoutRef.current = setTimeout(tick, pauseTime);
          return;
        }
      } else {
        // ── Modo borrado ────────────────────────────────────────────────────
        setIsTyping(true);
        setDisplayText(currentWord.slice(0, currentChar - 1));
        charIndexRef.current--;

        if (charIndexRef.current === 0) {
          // Terminó de borrar → siguiente palabra
          isDeletingRef.current = false;
          wordIndexRef.current = (wordIndexRef.current + 1) % words.length;
          timeoutRef.current = setTimeout(tick, typeSpeed * 2); // pequeña pausa entre palabras
          return;
        }
      }

      // Velocidad dinámica: borrar es más rápido que escribir
      const speed = isDeleting ? deleteSpeed : typeSpeed;
      timeoutRef.current = setTimeout(tick, speed);
    };

    // Iniciar el efecto
    timeoutRef.current = setTimeout(tick, typeSpeed);

    // ── Cleanup ─────────────────────────────────────────────────────────────
    // SIEMPRE limpia los timeouts en el cleanup de useEffect.
    // Si no lo haces, cuando el componente se desmonte el timeout
    // seguirá corriendo e intentará actualizar estado de un componente
    // que ya no existe → "memory leak" y warning en consola.
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [words, typeSpeed, deleteSpeed, pauseTime]);

  return { displayText, isTyping };
};

export default useTypewriter;
