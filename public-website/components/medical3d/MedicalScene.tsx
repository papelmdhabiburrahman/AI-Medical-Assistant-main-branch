"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

import {
  OrbitControls,
  Stars,
  ContactShadows,
} from "@react-three/drei";

import BrainModel from "./BrainModel";

export default function MedicalScene() {
  return (
    <div className="relative h-[460px] w-full overflow-hidden rounded-2xl bg-[#05050D]">

      <Canvas
        camera={{
          position: [0, 0.8, 5.8],
          fov: 45,
          near: 0.1,
          far: 100,
        }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: false,
        }}
        fallback={
          <p className="p-6 text-white">
            3D rendering is unavailable on this device.
          </p>
        }
      >

        {/* Background */}

        <color
          attach="background"
          args={["#05050D"]}
        />

        {/* Lighting */}

        <ambientLight intensity={0.7} />

        <pointLight
          position={[4, 4, 4]}
          intensity={12}
          color="#A78BFA"
        />

        <pointLight
          position={[-4, 2, -3]}
          intensity={8}
          color="#60A5FA"
        />

        <Suspense fallback={null}>

          {/* Animated 3D Brain */}

          <BrainModel />

          {/* Background Particles */}

          <Stars
            radius={12}
            depth={8}
            count={700}
            factor={2}
            saturation={0.4}
            fade
            speed={0.5}
          />

          {/* 3D Platform Shadow */}

          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.35}
            scale={7}
            blur={3}
            far={4}
          />

        </Suspense>

        {/* Interactive Camera Controls */}

        <OrbitControls
          enableRotate
          enableZoom
          enablePan={false}
          enableDamping
          dampingFactor={0.08}
          minDistance={3.5}
          maxDistance={9}
          rotateSpeed={0.6}
          zoomSpeed={0.7}
        />

      </Canvas>

      {/* Interface Labels */}

      <div className="pointer-events-none absolute left-5 top-5">
        <p className="text-xs font-semibold tracking-widest text-violet-400">
          PAPEL AI
        </p>

        <p className="mt-2 text-[10px] tracking-widest text-slate-400">
          NEURAL SIMULATION ENGINE
        </p>
      </div>

      <div className="pointer-events-none absolute right-5 top-5 rounded-full border border-violet-500/40 bg-black/50 px-3 py-1">
        <span className="text-[10px] text-violet-300">
          3D SIMULATION
        </span>
      </div>

      <div className="pointer-events-none absolute bottom-5 left-5">
        <h3 className="text-xl font-semibold text-white">
          Neural Intelligence
        </h3>

        <p className="mt-2 text-xs text-slate-400">
          Interactive 3D Research Visualization
        </p>
      </div>

      <div className="pointer-events-none absolute bottom-5 right-5 text-right">
        <p className="text-xs text-violet-300">
          14,000 Points
        </p>

        <p className="mt-1 text-[10px] text-slate-500">
          Drag to rotate
        </p>

        <p className="text-[10px] text-slate-500">
          Scroll to zoom
        </p>
      </div>

    </div>
  );
}