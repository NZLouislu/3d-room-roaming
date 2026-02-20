import { useEffect, useRef } from 'react';

interface StreetViewModalProps {
    isOpen: boolean;
    onClose: () => void;
    lat: number;
    lng: number;
    heading: number;
    pitch: number;
    apiKey: string;
}

declare global {
    interface Window {
        google: any;
    }
}

export const StreetViewModal = ({ isOpen, onClose, lat, lng, heading, pitch, apiKey }: StreetViewModalProps) => {
    const panoramaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) return;

        // Load Google Maps Script if not loaded
        if (!window.google) {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
            script.async = true;
            script.defer = true;
            script.onload = initStreetView;
            document.head.appendChild(script);
        } else {
            initStreetView();
        }

        function initStreetView() {
            if (panoramaRef.current && window.google) {
                new window.google.maps.StreetViewPanorama(panoramaRef.current, {
                    position: { lat, lng },
                    pov: { heading, pitch },
                    zoom: 1,
                    addressControl: false,
                    showRoadLabels: false,
                    motionTracking: false,
                    motionTrackingControl: false,
                    fullscreenControl: false,
                });
            }
        }
    }, [isOpen, lat, lng, heading, pitch, apiKey]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-8">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-500"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="relative w-full max-w-5xl aspect-video bg-gray-950 rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col animate-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="flex items-center justify-between p-4 bg-black/40 border-b border-white/5 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        <h3 className="text-xs font-black tracking-[0.3em] uppercase text-white/70 italic">
                            Ground Level Reconnaissance
                        </h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/50 hover:text-white"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    </button>
                </div>

                {/* Panorama Area */}
                <div ref={panoramaRef} className="flex-1 w-full h-full grayscale-[0.2] brightness-[1.1]" />

                {/* Footer Info */}
                <div className="p-3 bg-black/60 border-t border-white/5 text-[8px] uppercase tracking-widest text-white/40 flex justify-between font-mono">
                    <span>Target: 56 Topliss Drive // Street Level View</span>
                    <span>Lat: {lat.toFixed(6)} Lng: {lng.toFixed(6)}</span>
                </div>

                {/* Cyber Overlay Decor */}
                <div className="absolute inset-0 pointer-events-none border-[20px] border-black/10 border-double mix-blend-overlay" />
            </div>
        </div>
    );
};
