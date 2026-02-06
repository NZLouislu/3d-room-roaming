import { useState } from 'react';

interface WelcomeProps {
  onStart: (mode: 'auto-tour' | 'free-explore' | 'bird-view') => void;
}

export function RealEstateWelcome({ onStart }: WelcomeProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const handleStart = (mode: 'auto-tour' | 'free-explore' | 'bird-view') => {
    setVisible(false);
    onStart(mode);
  };

  return (
    <div className="fixed inset-0 bg-black z-[100] font-sans text-white overflow-hidden selection:bg-blue-500/30">

      {/* 1. Immersive Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover scale-[1.02] filter brightness-[0.7] contrast-[1.1]"
        >
          <source src="/videos/web-bg.mp4" type="video/mp4" />
        </video>
        {/* Cinematic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />
      </div>

      {/* 2. Main Content Layout */}
      <div className="relative z-10 h-full flex flex-col justify-between px-6 py-8 md:px-12 md:py-12 max-w-[1920px] mx-auto">

        {/* Top Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 animate-fade-in-down">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-[2px] w-8 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
              <span className="text-blue-400 font-bold tracking-[0.2em] text-xs uppercase">Future of Real Estate</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-2 drop-shadow-2xl">
              SMART TOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">3D</span>
            </h1>
            <p className="text-gray-300 max-w-xl text-lg font-light leading-relaxed border-l-2 border-white/20 pl-4 mt-4 bg-white/5 backdrop-blur-sm py-2 pr-4 rounded-r-lg">
              Immersive 3D Real Estate System: Fusing React 18 with physics engines to deliver cinematic tours and programmatic video generation for a revolutionary viewing experience.
            </p>
          </div>

          {/* Stats Bar (Moved to top right for balance) */}
          <div className="hidden lg:flex gap-8 bg-white/5 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/10 shadow-2xl">
            <StatItem icon="🛏️" value="4" label="Bedrooms" />
            <StatItem icon="🚿" value="3" label="Bathrooms" />
            <StatItem icon="📐" value="280m²" label="Living Area" />
            <StatItem icon="🚗" value="Double" label="Garage" />
          </div>
        </header>

        {/* Middle Spacer - Leaves room for the video to shine */}
        <div className="flex-grow min-h-[100px]" />

        {/* Bottom Interaction Section */}
        <div className="w-full animate-fade-in-up">
          <h2 className="text-xl md:text-2xl font-semibold mb-6 flex items-center gap-3 text-white/90">
            <span className="flex items-center justify-center w-8 h-8 rounded-full border border-white/30 text-sm">▶</span>
            Select Viewing Mode
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ModeCard
              title="Guided Tour"
              icon="🎬"
              desc="Sit back regarding an automated cinematic tour of highlights."
              features={['Exterior 360°', 'Key Highlights', 'Cinematic Path']}
              color="blue"
              onClick={() => handleStart('auto-tour')}
            />
            <ModeCard
              title="Free Explore"
              icon="🎮"
              desc="Navigate freely using WASD keys like a video game."
              features={['Full Control', 'Walk Everywhere', ' Interactive']}
              color="green"
              onClick={() => handleStart('free-explore')}
            />
            <ModeCard
              title="Bird View"
              icon="🦅"
              desc="Get a complete overhead perspective of the layout."
              features={['Top-down View', 'Layout Overview', 'RoomCoords']}
              color="purple"
              onClick={() => handleStart('bird-view')}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

// Sub-components for cleaner code

function ModeCard({ title, icon, desc, features, color, onClick }: any) {
  const colors: any = {
    blue: "hover:border-blue-500/50 hover:bg-blue-900/20 group-hover:text-blue-400",
    green: "hover:border-green-500/50 hover:bg-green-900/20 group-hover:text-green-400",
    purple: "hover:border-purple-500/50 hover:bg-purple-900/20 group-hover:text-purple-400",
  };

  const btnColors: any = {
    blue: "bg-blue-600 hover:bg-blue-500",
    green: "bg-green-600 hover:bg-green-500",
    purple: "bg-purple-600 hover:bg-purple-500",
  };

  return (
    <button
      onClick={onClick}
      className={`group relative text-left p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl transition-all duration-500 hover:translate-y-[-4px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] ${colors[color]}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-white/5 rounded-xl text-3xl group-hover:scale-110 transition-transform duration-300 border border-white/10">
            {icon}
          </div>
          <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/5 text-white/60 group-hover:bg-white/10 group-hover:text-white transition-colors`}>
            Ready
          </div>
        </div>

        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-white transition-colors">
          {title}
        </h3>

        <p className="text-gray-400 text-sm mb-6 leading-relaxed min-h-[2.5em]">
          {desc}
        </p>

        <div className="space-y-3 border-t border-white/10 pt-4 mb-6">
          {features.map((f: string, i: number) => (
            <div key={i} className="flex items-center text-xs text-gray-400 group-hover:text-gray-300">
              <span className={`w-1.5 h-1.5 rounded-full mr-2 ${btnColors[color].split(' ')[0]}`} />
              {f}
            </div>
          ))}
        </div>

        <div className={`w-full py-3 rounded-xl text-center font-semibold text-sm transition-all duration-300 shadow-lg ${btnColors[color]} text-white opacity-90 group-hover:opacity-100 group-hover:shadow-${color}-500/30`}>
          Enter Mode
        </div>
      </div>
    </button>
  );
}

function StatItem({ icon, value, label }: any) {
  return (
    <div className="text-center">
      <div className="text-xl md:text-2xl font-bold text-white mb-0.5">{value}</div>
      <div className="text-[10px] uppercase tracking-widest text-gray-400 font-medium flex items-center justify-center gap-1">
        <span className="opacity-70">{icon}</span> {label}
      </div>
    </div>
  );
}

