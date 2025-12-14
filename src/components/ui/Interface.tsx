import { InfoCard } from './InfoCard';


export const Interface = () => {


  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      {/* Crosshair */}
      <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white/80 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
      
      {/* Info Panel */}
      <InfoCard />

      {/* Lighting Toggle (Moved to Navbar) */}
      
      {/* Controls Help */}
      <div className="absolute bottom-8 left-8 text-white/70 font-mono text-sm bg-black/30 p-4 rounded-lg backdrop-blur-sm">
        <p>WASD to Move</p>
        <p>Click to Interact</p>
      </div>
    </div>
  );
};
