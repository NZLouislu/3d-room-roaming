import { Suspense } from 'react';
import { Html, useProgress } from '@react-three/drei';

export const Loader = () => {
  const { progress } = useProgress();
  
  return (
    <Html center>
      <div style={{
        color: 'white',
        fontSize: '24px',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        padding: '20px',
        background: 'rgba(0, 0, 0, 0.7)',
        borderRadius: '10px',
        minWidth: '200px'
      }}>
        <div>Loading Models...</div>
        <div style={{ fontSize: '18px', marginTop: '10px' }}>
          {progress.toFixed(0)}%
        </div>
      </div>
    </Html>
  );
};

interface ModelManagerProps {
  children: React.ReactNode;
}

export const ModelManager = ({ children }: ModelManagerProps) => {
  return (
    <Suspense fallback={<Loader />}>
      {children}
    </Suspense>
  );
};
