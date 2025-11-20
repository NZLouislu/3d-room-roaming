import { create } from 'zustand';

interface State {
  selectedObject: null | { name: string; price: string; description: string };
  setSelectedObject: (data: { name: string; price: string; description: string } | null) => void;
  isNight: boolean;
  toggleIsNight: () => void;
}

export const useStore = create<State>((set) => ({
  selectedObject: null,
  setSelectedObject: (data) => set({ selectedObject: data }),
  isNight: false,
  toggleIsNight: () => set((state) => ({ isNight: !state.isNight })),
}));
