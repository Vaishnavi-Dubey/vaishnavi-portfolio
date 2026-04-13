import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars, Sparkles } from '@react-three/drei';

const FluidParticles = () => {
    const groupRef = useRef();

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
            groupRef.current.rotation.x = state.clock.getElapsedTime() * 0.02;
        }
    });

    return (
        <group ref={groupRef}>
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <Sparkles count={200} scale={10} size={2} speed={0.4} opacity={0.5} color="#00f0ff" />
            <Sparkles count={200} scale={12} size={3} speed={0.3} opacity={0.5} color="#bd00ff" />
        </group>
    );
};

export default FluidParticles;
