"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function BrainModel() {
  const brainRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const points: number[] = [];
    const count = 14000;

    for (let i = 0; i < count; i++) {
      const u = (i + 0.5) / count;
      const phi = Math.acos(1 - 2 * u);
      const theta = i * 2.399963;

      const fold =
        1 +
        0.065 * Math.sin(theta * 9) *
        Math.cos(phi * 13);

      const x =
        1.05 * Math.sin(phi) *
        Math.cos(theta) * fold;

      const y =
        0.95 * Math.cos(phi) * fold;

      const z =
        1.35 * Math.sin(phi) *
        Math.sin(theta) * fold;

      const hemisphere =
        x >= 0 ? 0.065 : -0.065;

      points.push(
        x + hemisphere,
        y,
        z
      );
    }

    return new Float32Array(points);
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();

    geo.setAttribute(
      "position",
      new THREE.BufferAttribute(particles, 3)
    );

    return geo;
  }, [particles]);

  useFrame(({ clock }, delta) => {
    const time = clock.getElapsedTime();

    if (brainRef.current) {
      brainRef.current.rotation.y += delta * 0.45;

      brainRef.current.position.y =
        Math.sin(time * 1.2) * 0.08;

      brainRef.current.rotation.z =
        Math.sin(time * 0.5) * 0.06;
    }

    if (glowRef.current) {
      const scale =
        1 + Math.sin(time * 2.5) * 0.018;

      glowRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group ref={brainRef}>

      {/* Neural point cloud */}

      <points
        ref={glowRef}
        geometry={geometry}
      >
        <pointsMaterial
          color="#A78BFA"
          size={0.022}
          transparent
          opacity={0.9}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Outer neural glow */}

      <points geometry={geometry}>
        <pointsMaterial
          color="#818CF8"
          size={0.045}
          transparent
          opacity={0.12}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Brainstem concept */}

      <mesh position={[0, -1, -0.35]}>
        <capsuleGeometry
          args={[0.15, 0.4, 8, 16]}
        />

        <meshStandardMaterial
          color="#A78BFA"
          emissive="#7C3AED"
          emissiveIntensity={0.8}
          transparent
          opacity={0.65}
          roughness={0.4}
          metalness={0.3}
        />
      </mesh>

      {/* Neural holographic rings */}

      {[1.55, 1.75, 1.95].map(
        (radius, index) => (
          <mesh
            key={radius}
            rotation={[
              Math.PI / 2,
              0,
              index * 0.4
            ]}
            position={[0, -1.35, 0]}
          >
            <torusGeometry
              args={[radius, 0.006, 8, 128]}
            />

            <meshBasicMaterial
              color="#818CF8"
              transparent
              opacity={0.35}
            />
          </mesh>
        )
      )}

    </group>
  );
}