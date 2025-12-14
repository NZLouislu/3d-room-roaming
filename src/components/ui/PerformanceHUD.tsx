import { useStore } from '../../hooks/useStore';

export const PerformanceHUD = () => {
  const rendererType = useStore((state) => state.rendererType);
  const fps = useStore((state) => state.fps);

  const getRendererColor = () => {
    switch (rendererType) {
      case 'webgpu':
        return 'text-green-400';
      case 'webgl2':
        return 'text-blue-400';
      case 'webgl':
        return 'text-yellow-400';
      default:
        return 'text-gray-400';
    }
  };

  const getRendererLabel = () => {
    switch (rendererType) {
      case 'webgpu':
        return 'WebGPU';
      case 'webgl2':
        return 'WebGL 2.0';
      case 'webgl':
        return 'WebGL 1.0';
      default:
        return 'Unknown';
    }
  };

  const getFpsColor = () => {
    if (fps >= 55) return 'text-green-400';
    if (fps >= 30) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="fixed bottom-4 left-4 bg-black/70 text-white px-3 py-2 rounded-lg text-xs font-mono backdrop-blur-sm z-30 space-y-1">
      <div className="flex items-center gap-2">
        <span className="text-gray-400">Renderer:</span>
        <span className={`font-bold ${getRendererColor()}`}>
          {getRendererLabel()}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-gray-400">FPS:</span>
        <span className={`font-bold ${getFpsColor()}`}>
          {fps}
        </span>
      </div>
    </div>
  );
};
