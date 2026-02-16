import { Html } from '@react-three/drei';
import { useStore } from '../../../hooks/useStore';
import { PROPERTY_LIST } from '../../../data/properties';

export const RoomLabels = () => {
    const currentPropertyId = useStore((state) => state.currentPropertyId);

    const property = PROPERTY_LIST.find(p => p.id === currentPropertyId);
    const isTouring = useStore((state) => state.isTouring);

    // Don't render visual labels for the demo house (classic two-story) 
    // to avoid cluttering the exterior view. They remain available for Quick Navigation.
    // Also, hide ALL labels during immersive tours per user request.
    if (!property || !property.roomLabels || currentPropertyId === 'demo-house' || isTouring) return null;

    return (
        <group>
            {property.roomLabels.map((label) => (
                <Html
                    key={label.id}
                    position={label.position}
                    center
                    distanceFactor={15}
                    occlude
                    className="pointer-events-none select-none"
                >
                    <div className="group flex flex-col items-center">
                        {/* Dot Indicator */}
                        <div className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6] mb-2 animate-pulse" />

                        {/* Label Box */}
                        <div className="bg-black/40 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full shadow-2xl transition-all group-hover:bg-black/60 group-hover:scale-110">
                            <span className="text-[10px] font-black text-white uppercase tracking-[0.2em] whitespace-nowrap drop-shadow-md">
                                {label.name}
                            </span>
                        </div>
                    </div>
                </Html>
            ))}
        </group>
    );
};
