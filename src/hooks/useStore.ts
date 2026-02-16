import { create } from 'zustand';
import type { RendererType, PerformanceTier } from '../utils/rendererDetection';

interface State {
  selectedObject: null | { name: string; price: string; description: string };
  setSelectedObject: (data: { name: string; price: string; description: string } | null) => void;
  isNight: boolean;
  toggleIsNight: () => void;
  rendererType: RendererType;
  setRendererType: (type: RendererType) => void;
  performanceTier: PerformanceTier;
  setPerformanceTier: (tier: PerformanceTier) => void;
  isMobile: boolean;
  setIsMobile: (isMobile: boolean) => void;
  fps: number;
  setFps: (fps: number) => void;
  currentPropertyId: string;
  setCurrentPropertyId: (id: string) => void;
  birdViewCoords: { pos: [number, number, number], target: [number, number, number] };
  setBirdViewCoords: (coords: { pos: [number, number, number], target: [number, number, number] }) => void;
  panMode: boolean;
  setPanMode: (mode: boolean) => void;
  teleportTarget: [number, number, number] | null;
  setTeleportTarget: (target: [number, number, number] | null) => void;
  isTouring: boolean;
  setIsTouring: (isTouring: boolean) => void;
}

export const useStore = create<State>((set) => ({
  selectedObject: null,
  setSelectedObject: (data) => set({ selectedObject: data }),
  isNight: false,
  toggleIsNight: () => set((state) => ({ isNight: !state.isNight })),
  rendererType: 'webgl2',
  setRendererType: (type) => set({ rendererType: type }),
  performanceTier: 'medium',
  setPerformanceTier: (tier) => set({ performanceTier: tier }),
  isMobile: false,
  setIsMobile: (isMobile) => set({ isMobile }),
  fps: 60,
  setFps: (fps) => set({ fps }),
  currentPropertyId: 'demo-house',
  setCurrentPropertyId: (id) => set({ currentPropertyId: id }),
  birdViewCoords: { pos: [0, 50, 0], target: [0, 0, 0] },
  setBirdViewCoords: (coords) => set({ birdViewCoords: coords }),
  panMode: false,
  setPanMode: (mode) => set({ panMode: mode }),
  teleportTarget: null,
  setTeleportTarget: (target) => set({ teleportTarget: target }),
  isTouring: false,
  setIsTouring: (isTouring) => set({ isTouring }),
}));
