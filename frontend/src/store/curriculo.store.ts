import { create } from "zustand";

type CurriculoState = {
  selectedCurriculoId: string | null;
  setSelectedCurriculoId: (id: string) => void;
  clearSelectedCurriculoId: () => void;
};

export const useCurriculoStore = create<CurriculoState>((set) => ({
  selectedCurriculoId: null,
  setSelectedCurriculoId: (id) => set({ selectedCurriculoId: id }),
  clearSelectedCurriculoId: () => set({ selectedCurriculoId: null }),
}));