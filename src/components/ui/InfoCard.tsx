import { useStore } from '../../hooks/useStore';

export const InfoCard = () => {
  const selectedObject = useStore((state) => state.selectedObject);
  const setSelectedObject = useStore((state) => state.setSelectedObject);

  if (!selectedObject) return null;

  return (
    <div className="absolute top-4 right-4 w-80 bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-white/20 pointer-events-auto transition-all duration-300 animate-in slide-in-from-right-10">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{selectedObject.name}</h2>
        <button
          onClick={() => setSelectedObject(null)}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Price</span>
          <span className="text-xl font-bold text-indigo-600">{selectedObject.price}</span>
        </div>
        
        <div>
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wider block mb-1">Description</span>
          <p className="text-gray-600 leading-relaxed">{selectedObject.description}</p>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
          Add to Cart
        </button>
      </div>
    </div>
  );
};
