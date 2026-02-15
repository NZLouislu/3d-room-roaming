import { useStore } from '../../hooks/useStore';
import { PROPERTY_LIST } from '../../data/properties';

export function PropertyNavbar() {
    const { currentPropertyId, setCurrentPropertyId } = useStore();

    return (
        <nav className="fixed top-0 left-0 right-0 z-[100] bg-black/60 backdrop-blur-md border-b border-white/10 h-16 flex items-center justify-between px-8">
            <div className="flex items-center space-x-4">
                <h1 className="text-white font-black text-xl tracking-tighter uppercase">3D Real Estate</h1>
                <div className="h-6 w-[1px] bg-white/20" />
                <p className="text-white/60 text-sm font-medium">Platform v1.0</p>
            </div>

            <div className="flex items-center space-x-6">
                {PROPERTY_LIST.map((property) => (
                    <button
                        key={property.id}
                        onClick={() => setCurrentPropertyId(property.id)}
                        className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${currentPropertyId === property.id
                                ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                                : 'text-white/70 hover:text-white hover:bg-white/10'
                            }`}
                    >
                        {property.name}
                    </button>
                ))}
            </div>

            <div className="flex items-center space-x-4">
                <div className="text-right mr-2">
                    <p className="text-[10px] text-white/40 uppercase font-black tracking-widest leading-tight">Current View</p>
                    <p className="text-white text-xs font-bold">{PROPERTY_LIST.find(p => p.id === currentPropertyId)?.region}</p>
                </div>
            </div>
        </nav>
    );
}
