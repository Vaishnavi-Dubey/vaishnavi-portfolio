import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Preload } from '@react-three/drei';
import OrganicScene from './OrganicScene';
import ErrorBoundary from '../components/ErrorBoundary';

const Scene = () => {
    return (
        <div className="canvas-container">
            <ErrorBoundary>
                <Canvas
                    camera={{ position: [0, 0, 8], fov: 50 }}
                    gl={{ antialias: true, alpha: true }}
                    dpr={[1, 1.5]} // Capped for performance
                >
                    <Suspense fallback={null}>
                        <OrganicScene />
                        <Preload all />
                    </Suspense>
                </Canvas>
            </ErrorBoundary>
        </div>
    );
};

export default Scene;
