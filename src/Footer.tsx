
export default function Footer() {
  return (
    <footer className="relative z-10 bg-[#0a0a0a] text-white/60 border-t border-white/5 py-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="flex flex-col items-center md:items-start gap-3">
          <img
            src="/nzlouis-logo.png"
            alt="Logo"
            className="h-7 w-auto object-contain opacity-90 transition-opacity hover:opacity-100"
          />
          <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-white/30">
            NZLouis | Louis Lu
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-10 text-[10px] tracking-[0.2em] uppercase font-black text-white/40">
          <a href="#" className="hover:text-blue-500 transition-colors">Experience</a>
          <a href="#" className="hover:text-blue-500 transition-colors">Technology</a>
          <a href="https://blog.nzlouis.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">Archive</a>
        </div>

        <div className="text-[10px] text-white/20 uppercase tracking-[0.4em] font-medium">
          © {new Date().getFullYear()} Modern Immersive
        </div>
      </div>
    </footer>
  );
}
