import Header from '../../Navbar';
import Footer from '../../Footer';
import { useStore } from '../../hooks/useStore';
import { PROPERTY_LIST } from '../../data/properties';

interface WelcomeProps {
  onStart: (mode: 'auto-tour' | 'free-explore' | 'bird-view' | 'digital-twin') => void;
  onGoHome: () => void;
}

export function RealEstateWelcome({ onStart, onGoHome }: WelcomeProps) {
  const currentPropertyId = useStore((state) => state.currentPropertyId);
  const currentProperty = PROPERTY_LIST.find(p => p.id === currentPropertyId) || PROPERTY_LIST[0];

  return (
    <div className="fixed inset-0 bg-black z-[100] font-sans text-white overflow-y-auto overflow-x-hidden selection:bg-blue-500/30 scroll-smooth">
      <Header onStart={onStart} onGoHome={onGoHome} />

      {/* Hero Section - Reduced Height for NASA style flow */}
      <section className="relative h-[65vh] flex flex-col items-center justify-center overflow-hidden">
        {/* Immersive Video Background */}
        <div className="absolute inset-0 z-0 bg-black">
          <video
            autoPlay
            muted
            loop
            playsInline
            disablePictureInPicture
            poster="/videos/poster.jpg"
            preload="metadata"
            className="w-full h-full object-cover brightness-[0.7] contrast-[1.1]"
          >
            <source src="/videos/3D-SmartTour-web-bg.mp4" type="video/mp4" />
          </video>
          {/* Subtle NASA Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black pointer-events-none" />
        </div>

        {/* Space for Video (Kept clean as requested) */}
        <div className="relative z-10 w-full h-full flex items-end p-12">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 px-3 py-1 bg-blue-600/80 backdrop-blur-sm rounded-sm text-[8px] font-black uppercase tracking-widest">
              Selected: {currentProperty.name}
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-red-600/80 backdrop-blur-sm rounded-sm text-[8px] font-black uppercase tracking-widest animate-pulse">
              3D Rendering Active
            </div>
          </div>
        </div>
      </section>

      {/* Explore Section - NASA Style */}
      <section className="relative z-10 bg-[#0a0a0a] pb-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          {/* NASA Style Divider Label */}
          <div className="flex items-center gap-4 py-8 mb-4">
            <div className="flex flex-col">
              <span className="text-[9px] tracking-[0.5em] uppercase font-black text-white/40 whitespace-nowrap">
                Current Property Profile
              </span>
              <span className="text-xl font-bold tracking-tighter text-blue-500 uppercase">
                {currentProperty.name} / {currentProperty.region}
              </span>
            </div>
            <div className="h-[1px] w-full bg-white/10" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <FeatureCard
              title="Programmatic Video"
              icon="📹"
              desc="Cinematic walkthroughs generated directly from the 3D physics engine."
              badge="Tech"
            />
            <FeatureCard
              title="Real-time Physics"
              icon="⚡"
              desc="Advanced collision detection and realistic movement for total immersion."
              badge="Core"
            />
            <FeatureCard
              title="Spatial Twin"
              icon="🌍"
              desc="Global scale visualization using Google Photorealistic 3D Tiles."
              badge="GIS"
            />
          </div>
        </div>
      </section>

      {/* NASA Style 'Call to Action' or Secondary Hero if needed */}
      <section className="relative z-10 bg-black py-24 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-light tracking-tight text-white/90 mb-6">
            Ready to witness the <span className="font-bold text-blue-500">future</span> of {currentProperty.name}?
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onStart('bird-view')}
              className="px-12 py-4 bg-white/10 text-white backdrop-blur-md border border-white/20 font-black uppercase text-xs tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500 rounded-sm"
            >
              🏠 Launch Interior Model
            </button>
            <button
              onClick={() => onStart('digital-twin')}
              className="px-12 py-4 bg-blue-600 text-white font-black uppercase text-xs tracking-[0.3em] hover:bg-blue-700 transition-all duration-500 rounded-sm shadow-[0_0_20px_rgba(37,99,235,0.4)]"
            >
              🌍 Launch Spatial Twin
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function FeatureCard({ title, icon, desc, badge }: { title: string, icon: string, desc: string, badge: string }) {
  return (
    <div className="group flex items-start gap-6 p-4 rounded-xl hover:bg-white/[0.03] transition-all duration-500 cursor-default">
      {/* NASA Style Circular Icon */}
      <div className="flex-shrink-0 w-16 h-16 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:bg-blue-600/20 group-hover:border-blue-500/50 transition-all duration-500">
        {icon}
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <h4 className="text-lg font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors uppercase">
            {title}
          </h4>
          <span className="text-[8px] px-1.5 py-0.5 rounded-sm bg-white/10 text-white/40 font-bold uppercase tracking-tighter">
            {badge}
          </span>
        </div>
        <p className="text-sm text-gray-500 leading-relaxed font-light group-hover:text-gray-400 transition-colors">
          {desc}
        </p>
      </div>
    </div>
  );
}
