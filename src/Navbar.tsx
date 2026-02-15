import { useState } from "react";
import { PROPERTY_LIST } from "./data/properties";
import { useStore } from "./hooks/useStore";

interface HeaderProps {
  onStart?: (mode: 'auto-tour' | 'free-explore' | 'bird-view') => void;
  onGoHome?: () => void;
}

export default function Header({ onStart, onGoHome }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const { currentPropertyId, setCurrentPropertyId } = useStore();

  return (
    <header className="fixed top-0 left-0 right-0 z-[110] bg-black/30 hover:bg-black/60 transition-colors backdrop-blur-sm border-b border-white/5 px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <button onClick={onGoHome} className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <img
              src="/nzlouis-logo.png"
              alt="Logo"
              className="h-8 w-auto object-contain"
            />
          </button>

          {/* Nav Links - Desktop */}
          <nav className="hidden lg:flex items-center gap-4">
            {PROPERTY_LIST.map((property) => (
              <button
                key={property.id}
                onClick={() => {
                  setCurrentPropertyId(property.id);
                  onStart?.('bird-view');
                }}
                className={`text-[10px] font-black tracking-widest transition-all px-3 py-1 rounded-full ${currentPropertyId === property.id
                  ? 'bg-white/20 text-white border border-white/40'
                  : 'text-white/50 hover:text-white'
                  }`}
              >
                {property.name.toUpperCase()}
              </button>
            ))}
          </nav>
        </div>

        {/* Action Button (Start Tour) */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={() => onStart?.('auto-tour')}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-[10px] font-black tracking-[0.2em] uppercase transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
          >
            Start Immersive Tour
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-white/10 p-6 flex flex-col gap-6">
          <button
            onClick={() => { onGoHome?.(); setOpen(false); }}
            className="text-sm font-bold tracking-widest text-white text-left"
          >
            HOME
          </button>
          <button
            onClick={() => { onStart?.('auto-tour'); setOpen(false); }}
            className="w-full py-4 bg-blue-600 text-white font-black rounded-xl text-center text-[10px] tracking-[0.2em]"
          >
            START IMMERSIVE TOUR
          </button>
        </div>
      )}
    </header>
  );
}
