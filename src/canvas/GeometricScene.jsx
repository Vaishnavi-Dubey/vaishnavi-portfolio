import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, ContactShadows, Environment } from '@react-three/drei';
import * as THREE from 'three';

const Geometries = () => {
    return (
        <group>
            {/* Center Piece - Icosahedron */}
            <Float speed={1.5} rotationIntensity={1.5} floatIntensity={2}>
                <mesh position={[0, 0, 0]}>
                    <icosahedronGeometry args={[2, 0]} />
                    <MeshTransmissionMaterial
                        backside
                        samples={16}
                        thickness={200}
                        roughness={0}
                        anisotropy={1}
                        chromaticAberration={0.1} // Cool rainbow edges
                        color="#00f0ff"
                    />
                </mesh>
            </Float>

            {/* Orbiting Torus */}
            <Float speed={2} rotationIntensity={2} floatIntensity={1.5}>
                <mesh position={[4, -2, -2]} rotation={[Math.PI / 4, 0, 0]}>
                    <torusGeometry args={[1.5, 0.4, 16, 32]} />
                    <MeshTransmissionMaterial
                        backside
                        samples={16}
                        thickness={200}
                        roughness={0}
                        chromaticAberration={0.05}
                        color="#bd00ff"
                    />
                </mesh>
            </Float>

            {/* Small Capsule */}
            <Float speed={3} rotationIntensity={4} floatIntensity={3}>
                <mesh position={[-4, 3, -3]}>
                    <capsuleGeometry args={[0.5, 2, 4, 8]} />
                    <MeshTransmissionMaterial
                        backside
                        samples={16}
                        thickness={200}
                        roughness={0.1}
                        chromaticAberration={0.2}
                        color="#ffffff"
                    />
                </mesh>
            </Float>
        </group>
    );
};

const GeometricScene = () => {
    return (
        <group>
            <Geometries />
            {/* Cinematic Lighting */}
            <Environment preset="city" />
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#bd00ff" />

            <ContactShadows resolution={512} scale={20} blur={2} opacity={0.5} far={10} color="#000000" />
        </group>
    );
};

export default GeometricScene;
