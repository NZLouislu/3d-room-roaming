import { useStore } from '../../hooks/useStore';

export const PerformanceHUD = () => {
  const { fps, rendererType, performanceTier } = useStore();

  return (
    <div className="fixed bottom-4 left-4 bg-black/70 text-white px-3 py-2 rounded-lg text-xs font-mono backdrop-blur-sm z-30">
      <div className="flex flex-col gap-1">
        <div className="flex justify-between gap-4">
          <span className="text-gray-400">Renderer:</span>
          <span className="font-mono text-blue-400 uppercase">{rendererType}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-gray-400">Hardware:</span>
          <span className={`font-mono uppercase ${
            performanceTier === 'high' ? 'text-green-400' : 
            performanceTier === 'medium' ? 'text-yellow-400' : 'text-orange-400'
          }`}>{performanceTier}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-gray-400">FPS:</span>
          <span className={`font-mono ${fps > 55 ? 'text-green-400' : fps > 30 ? 'text-yellow-400' : 'text-red-400'}`}>
            {fps}
          </span>
        </div>
      </div>
    </div>
  );
};
