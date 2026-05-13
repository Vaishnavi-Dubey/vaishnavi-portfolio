import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Environment, MeshTransmissionMaterial } from '@react-three/drei';

/**
 * OrganicScene — Floating glass orbs that subtly rotate with scroll.
 * Uses the new violet/amber palette. Objects are positioned to
 * create depth without blocking content.
 */

const GlassOrbs = () => {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    const scrollY = window.scrollY;
    groupRef.current.rotation.y = scrollY * 0.0004;
    groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.05;
  });

  const glassMaterial = {
    backside: true,
    samples: 16,
    resolution: 256,
    transmission: 1,
    thickness: 12,
    roughness: 0.08,
    chromaticAberration: 0.04,
    anisotropy: 1,
    clearcoat: 1,
    clearcoatRoughness: 0,
    envMapIntensity: 1.2,
  };

  return (
    <group ref={groupRef}>
      {/* Primary orb — violet tint */}
      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={1.5}>
        <mesh position={[2, 0.5, -3]}>
          <sphereGeometry args={[1.2, 64, 64]} />
          <MeshTransmissionMaterial
            {...glassMaterial}
            color="#7c3aed"
            thickness={15}
          />
        </mesh>
      </Float>

      {/* Secondary orb — amber tint */}
      <Float speed={1.8} rotationIntensity={0.5} floatIntensity={2}>
        <mesh position={[-3, 2, -5]}>
          <sphereGeometry args={[0.8, 64, 64]} />
          <MeshTransmissionMaterial
            {...glassMaterial}
            color="#f59e0b"
            thickness={8}
          />
        </mesh>
      </Float>

      {/* Tertiary orb — clear/white */}
      <Float speed={2.2} rotationIntensity={0.3} floatIntensity={1.8}>
        <mesh position={[-1.5, -2, -4]}>
          <sphereGeometry args={[0.6, 64, 64]} />
          <MeshTransmissionMaterial
            {...glassMaterial}
            color="#e2e8f0"
            thickness={6}
          />
        </mesh>
      </Float>

      {/* Small accent orb */}
      <Float speed={3} rotationIntensity={0.6} floatIntensity={2.5}>
        <mesh position={[3.5, -1.5, -6]}>
          <sphereGeometry args={[0.4, 32, 32]} />
          <MeshTransmissionMaterial
            {...glassMaterial}
            color="#a78bfa"
            thickness={5}
            chromaticAberration={0.08}
          />
        </mesh>
      </Float>
    </group>
  );
};

const OrganicScene = () => {
  return (
    <group>
      <GlassOrbs />
      {/* Moody lighting — not generic "studio" */}
      <Environment preset="night" />
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.4} color="#ffffff" />
      <pointLight position={[-8, -4, -4]} intensity={0.2} color="#7c3aed" />
      <pointLight position={[5, -8, 3]} intensity={0.1} color="#f59e0b" />
    </group>
  );
};

export default OrganicScene;
