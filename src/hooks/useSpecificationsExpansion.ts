import { useState, useEffect, useCallback } from "react";

interface UseSpecificationsExpansionReturn {
  isExpanded: boolean;
  toggleExpansion: () => void;
  expandAndScroll: () => void;
}

export const useSpecificationsExpansion = (): UseSpecificationsExpansionReturn => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const expandAndScroll = useCallback(() => {
    setIsExpanded(true);
    // Scroll suave hacia la sección de especificaciones
    setTimeout(() => {
      document.getElementById("detailed-specifications")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  }, []);

  useEffect((): (() => void) => {
    const handleExpandSpecifications = (): void => {
      expandAndScroll();
    };

    // Escuchar evento personalizado
    window.addEventListener("expandSpecifications", handleExpandSpecifications);

    return (): void => {
      window.removeEventListener("expandSpecifications", handleExpandSpecifications);
    };
  }, [expandAndScroll]);

  return {
    isExpanded,
    toggleExpansion,
    expandAndScroll,
  };
};
