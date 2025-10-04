import { create } from "zustand";

interface SpecificationsExpansionState {
  isExpanded: boolean;
  toggleExpansion: () => void;
  expandAndScroll: () => void;
}

export const useSpecificationsExpansionStore = create<SpecificationsExpansionState>((set) => ({
  isExpanded: false,

  toggleExpansion: (): void => {
    set((state) => ({ isExpanded: !state.isExpanded }));
  },

  expandAndScroll: (): void => {
    set({ isExpanded: true });

    // Scroll suave hacia la sección de especificaciones
    setTimeout(() => {
      document.getElementById("detailed-specifications")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  },
}));
