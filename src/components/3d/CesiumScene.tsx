import { useEffect, useRef, useState } from "react";
import * as Cesium from "cesium";
import { useStore } from "../../hooks/useStore";
import { PROPERTY_LIST } from "../../data/properties";
import { StreetViewModal } from "../ui/StreetViewModal";

// Set Cesium Ion Access Token
const ION_TOKEN = import.meta.env.VITE_CESIUM_ION_TOKEN;
if (ION_TOKEN && ION_TOKEN !== '你的CesiumToken') {
    Cesium.Ion.defaultAccessToken = ION_TOKEN;
}

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

interface CesiumSceneProps {
    onBack: () => void;
    onEnterInterior?: () => void;
}

export function CesiumScene({ onBack, onEnterInterior }: CesiumSceneProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const viewerRef = useRef<Cesium.Viewer | null>(null);
    const modelEntityRef = useRef<Cesium.Entity | null>(null);
    const [modelActive, setModelActive] = useState(false);
    const [streetViewOpen, setStreetViewOpen] = useState(false);

    const currentPropertyId = useStore((state) => state.currentPropertyId);
    const property = PROPERTY_LIST.find(p => p.id === currentPropertyId) || PROPERTY_LIST[0];

    // Toggle model visibility when state changes
    useEffect(() => {
        if (modelEntityRef.current) {
            modelEntityRef.current.show = modelActive;
        }
    }, [modelActive]);

    useEffect(() => {
        if (!containerRef.current) return;

        // Initialize Viewer with enhanced 3D settings
        const viewer = new Cesium.Viewer(containerRef.current, {
            timeline: false,
            animation: false,
            baseLayerPicker: false,
            geocoder: false,
            selectionIndicator: false,
            infoBox: false,
            navigationHelpButton: false,
            sceneModePicker: false,
            homeButton: false,
            fullscreenButton: false,
            scene3DOnly: true,
            shadows: true,
        });

        viewerRef.current = viewer;

        // Enhanced Scene settings
        viewer.scene.globe.enableLighting = true;
        viewer.scene.highDynamicRange = true;
        viewer.scene.postProcessStages.fxaa.enabled = true;

        if (viewer.cesiumWidget.creditContainer instanceof HTMLElement) {
            viewer.cesiumWidget.creditContainer.style.display = "none";
        }

        // Add Google Photorealistic 3D Tiles with Ultra quality settings
        const googleTilesUrl = `https://tile.googleapis.com/v1/3dtiles/datasets/google_photorealistic_3d/tileset?key=${GOOGLE_MAPS_API_KEY}`;
        Cesium.Cesium3DTileset.fromUrl(googleTilesUrl, {
            maximumScreenSpaceError: 6,
            dynamicScreenSpaceError: true,
            dynamicScreenSpaceErrorDensity: 0.00278,
            dynamicScreenSpaceErrorFactor: 4.0,
            dynamicScreenSpaceErrorHeightFalloff: 0.25
        }).then((tileset) => {
            viewer.scene.primitives.add(tileset);
        }).catch(err => console.error("Tileset load error:", err));

        // Create House Model (HIDDEN BY DEFAULT)
        const position = Cesium.Cartesian3.fromDegrees(property.coordinates.lng, property.coordinates.lat, 0);

        /**
         * ORIENTATION LOGIC:
         * 1. Coordinate System: North is +Latitude, East is +Longitude.
         * 2. Rotation: The house has been rotated 90 degrees clockwise from the previous 12° attempt.
         * 3. Final Orientation: Heading 102° ensures the main row (Bedrooms/Living) is parallel to the street.
         * 4. Spatial Relationship: North [Street] -> [Rooms Row] -> [House Body] -> [Deck] South.
         */
        const hpr = new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(102), 0, 0);
        const orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);

        const houseEntity = viewer.entities.add({
            position: position,
            orientation: orientation,
            show: modelActive, // Start with current state
            model: {
                uri: property.modelPath,
                scale: 1.15, // Proportion kept constant
                heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
                shadows: Cesium.ShadowMode.ENABLED,
                minimumPixelSize: 128
            },
        });
        modelEntityRef.current = houseEntity;

        // Dynamic Camera Angle - Global Initial View (Facing North towards Street)
        const viewPosition = Cesium.Cartesian3.fromDegrees(
            property.coordinates.lng,
            property.coordinates.lat - 0.0008,
            75
        );
        viewer.camera.flyTo({
            destination: viewPosition,
            duration: 4,
            orientation: {
                heading: Cesium.Math.toRadians(0), // Looking straight North
                pitch: Cesium.Math.toRadians(-40),
                roll: 0.0,
            }
        });

        return () => {
            if (viewerRef.current) {
                viewerRef.current.destroy();
                viewerRef.current = null;
                modelEntityRef.current = null;
            }
        };
    }, [property]);

    const handleDeployModel = () => {
        setModelActive(true);
        // Precise Zoom-in centered on target house
        if (viewerRef.current) {
            const zoomPosition = Cesium.Cartesian3.fromDegrees(
                property.coordinates.lng,
                property.coordinates.lat - 0.00068, // Calculated offset for 25-deg pitch at 35m
                35
            );
            viewerRef.current.camera.flyTo({
                destination: zoomPosition,
                duration: 2.5,
                orientation: {
                    heading: Cesium.Math.toRadians(5),
                    pitch: Cesium.Math.toRadians(-25),
                    roll: 0.0,
                }
            });
        }
    };

    return (
        <div className="fixed inset-0 z-[300] bg-black">
            <div ref={containerRef} className="w-full h-full" />

            {/* UI Overlay */}
            <div className="absolute top-6 left-6 z-[310] flex flex-col gap-4">
                <button
                    onClick={onBack}
                    className="px-6 py-2 bg-white/10 backdrop-blur-md text-white rounded-full border border-white/20 hover:bg-white/20 transition-all font-bold tracking-wider pointer-events-auto shadow-xl"
                >
                    ← BACK TO MISSION CONTROL
                </button>

                <div className="bg-black/60 backdrop-blur-xl p-6 rounded-2xl border border-white/10 text-white max-w-sm pointer-events-none shadow-2xl">
                    <div className="flex items-center gap-3 mb-4">
                        <div className={`w-2 h-2 rounded-full ${modelActive ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                        <h2 className="text-xl font-black tracking-tighter uppercase italic text-left">
                            {modelActive ? 'Spatial Twin Synced' : 'Spatial Scanning'}
                        </h2>
                    </div>

                    <div className="space-y-4 text-[10px] uppercase tracking-[0.2em] font-mono text-white/50 mb-8">
                        <div>
                            <p className="text-white/30 text-[8px] mb-1">Target Address</p>
                            <p className="text-blue-400 font-bold text-sm">56 Topliss Drive, Northcross</p>
                        </div>
                        <p className="text-[9px] leading-relaxed text-left">
                            {modelActive
                                ? 'Spatial Twin synchronization complete. Interior floorplan geometry successfully projected onto geospatial terrain.'
                                : 'Awaiting manual confirmation for High-Fidelity property scan deployment.'}
                        </p>

                        {/* New Street View Toggle */}
                        {property.streetView && (
                            <button
                                onClick={() => setStreetViewOpen(true)}
                                className="w-full mt-2 py-2.5 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 rounded-lg flex items-center justify-center gap-2 transition-all group pointer-events-auto"
                            >
                                <span className="text-xs group-hover:scale-110 transition-transform">📍</span>
                                <span>External Street View</span>
                            </button>
                        )}
                    </div>

                    {!modelActive ? (
                        <button
                            onClick={handleDeployModel}
                            className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl text-center text-[10px] tracking-[0.3em] uppercase transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)] pointer-events-auto border border-blue-400 animate-bounce"
                        >
                            🚀 Deploy Interior Model
                        </button>
                    ) : (
                        <button
                            onClick={onEnterInterior}
                            className="w-full py-4 bg-green-600 hover:bg-green-500 text-white font-black rounded-xl text-center text-[10px] tracking-[0.3em] uppercase transition-all shadow-[0_0_30px_rgba(34,197,94,0.4)] pointer-events-auto border border-green-400 flex items-center justify-center gap-2"
                        >
                            🏠 Enter Interior Experience
                        </button>
                    )}
                </div>
            </div>

            {/* Street View Overlay Modal */}
            {property.streetView && (
                <StreetViewModal
                    isOpen={streetViewOpen}
                    onClose={() => setStreetViewOpen(false)}
                    lat={property.streetView.lat}
                    lng={property.streetView.lng}
                    heading={property.streetView.heading}
                    pitch={property.streetView.pitch}
                    apiKey={GOOGLE_MAPS_API_KEY}
                />
            )}
        </div>
    );
}
