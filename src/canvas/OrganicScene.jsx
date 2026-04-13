import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Environment, MeshTransmissionMaterial } from '@react-three/drei';

const OrganicShapes = () => {
    const groupRef = useRef();

    useFrame((state) => {
        if (!groupRef.current) return;
        const scrollY = window.scrollY;
        // Rotate smoothly based on scroll
        groupRef.current.rotation.y = scrollY * 0.0005;
        // Floating effect handling by Float component, no manual Y shift to prevent vanishing
    });

    const glassMaterialProps = {
        backside: true,
        samples: 16,
        resolution: 256,
        transmission: 1,
        thickness: 10,
        roughness: 0.1, // Smooth glass
        chromaticAberration: 0.05,
        anisotropy: 1,
        clearcoat: 1,
        clearcoatRoughness: 0,
        envMapIntensity: 1
    };

    return (
        <group ref={groupRef}>
            {/* Glass Bubble 1 (Clear/Dark) */}
            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
                <mesh position={[0, 0, -2]}>
                    <sphereGeometry args={[1.5, 64, 64]} />
                    <MeshTransmissionMaterial
                        {...glassMaterialProps}
                        color="#ffffff"
                        thickness={15}
                    />
                </mesh>
            </Float>

            {/* Glass Bubble 2 (Lavender Tint) */}
            <Float speed={2} rotationIntensity={0.6} floatIntensity={2}>
                <mesh position={[3, 2, -4]}>
                    <sphereGeometry args={[1, 64, 64]} />
                    <MeshTransmissionMaterial
                        {...glassMaterialProps}
                        color="#b8b2ff"
                        thickness={8}
                    />
                </mesh>
            </Float>

            {/* Glass Bubble 3 (Mint Tint) */}
            <Float speed={2.5} rotationIntensity={0.4} floatIntensity={1.8}>
                <mesh position={[-3, -2, -3]}>
                    <sphereGeometry args={[0.8, 64, 64]} />
                    <MeshTransmissionMaterial
                        {...glassMaterialProps}
                        color="#b2ffdb"
                        thickness={6}
                    />
                </mesh>
            </Float>
        </group>
    );
};

const OrganicScene = () => {
    return (
        <group>
            <OrganicShapes />
            {/* Soft Studio Lighting */}
            <Environment preset="studio" />
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={0.5} color="#ffffff" />
            <pointLight position={[-10, -5, -5]} intensity={0.2} color="#b8b2ff" />
        </group>
    );
};

export default OrganicScene;
