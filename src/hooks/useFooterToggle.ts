import { useState, useCallback, useRef } from "react";

export interface UseFooterToggleReturn {
  isOpen: boolean;
  toggle: () => void;
  footerRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * Hook para manejar el estado de apertura/cierre del footer con scroll automático
 * @param initialOpen - Estado inicial del footer (por defecto false)
 * @returns Objeto con el estado, función para toggle y referencia al footer
 */
export const useFooterToggle = (initialOpen: boolean = false): UseFooterToggleReturn => {
  const [isOpen, setIsOpen] = useState<boolean>(initialOpen);
  const footerRef = useRef<HTMLDivElement>(null);

  const toggle = useCallback(() => {
    const wasClosed = !isOpen;
    setIsOpen((prev) => !prev);

    // Si se está abriendo, hacer scroll suave hacia el footer
    if (wasClosed && footerRef.current) {
      setTimeout(() => {
        footerRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100); // Pequeño delay para que la animación de apertura comience
    }
  }, [isOpen]);

  return {
    isOpen,
    toggle,
    footerRef,
  };
};
