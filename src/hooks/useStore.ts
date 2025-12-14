import { create } from 'zustand';
import type { RendererType } from '../utils/rendererDetection';

interface State {
  selectedObject: null | { name: string; price: string; description: string };
  setSelectedObject: (data: { name: string; price: string; description: string } | null) => void;
  isNight: boolean;
  toggleIsNight: () => void;
  rendererType: RendererType;
  setRendererType: (type: RendererType) => void;
  fps: number;
  setFps: (fps: number) => void;
}

export const useStore = create<State>((set) => ({
  selectedObject: null,
  setSelectedObject: (data) => set({ selectedObject: data }),
  isNight: false,
  toggleIsNight: () => set((state) => ({ isNight: !state.isNight })),
  rendererType: 'webgl2',
  setRendererType: (type) => set({ rendererType: type }),
  fps: 60,
  setFps: (fps) => set({ fps }),
}));
