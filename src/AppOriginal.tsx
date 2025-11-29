import { Canvas } from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import { Experience } from './components/3d/Experience';
import { Interface } from './components/ui/Interface';

function App() {
  return (
    <>
      <Canvas shadows camera={{ fov: 45, position: [0, 0, 5] }}>
        <Sky sunPosition={[100, 20, 100]} />
        <ambientLight intensity={0.5} />
        <Physics debug>
          <Experience />
        </Physics>
      </Canvas>
      <Interface />
    </>
  );
}

export default App;
