
"use client";

import Link from "next/link";
import {
  Activity, ArrowUpRight, ShieldCheck, Plus
} from "lucide-react";

import {
  motion, useMotionValue,
  useSpring, useReducedMotion
} from "motion/react";

import MedicalBook from "./MedicalBook";

export default function Hero() {
  const reducedMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const x = useSpring(mouseX, {
    stiffness: 60,
    damping: 25
  });

  const y = useSpring(mouseY, {
    stiffness: 60,
    damping: 25
  });

  return (
    <section
      onPointerMove={(event) => {
        if (reducedMotion || event.pointerType !== "mouse") return;

        const rect = event.currentTarget.getBoundingClientRect();

        mouseX.set((event.clientX - rect.left - rect.width / 2) * 0.07);
        mouseY.set((event.clientY - rect.top - rect.height / 2) * 0.07);
      }}

      onPointerLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}

      className="relative isolate overflow-hidden bg-[#F4FBFB] text-[#10252D]"
    >

      {/* Original medical gradient */}
      <div
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          background: `
            radial-gradient(ellipse at 90% 20%, #A5E4E4, transparent 55%),
            radial-gradient(ellipse at 10% 90%, #CCFBF1, transparent 45%),
            linear-gradient(120deg, #FFFFFF, #E6F7F7, #C5EDED)
          `
        }}
      />

      {/* Futuristic AI intelligence background */}
      <motion.div
        aria-hidden="true"
        style={{ x, y }}
        className="pointer-events-none absolute inset-0 -z-10"
      >

        <svg
          viewBox="0 0 700 700"
          className="absolute -right-20 top-0 h-full w-[700px] text-[#009295] opacity-[0.10]"
        >
          <g fill="none" stroke="currentColor" strokeWidth="1.3">

            {/* Digital human profile */}
            <path d="M260 610 L290 490
              C160 420 165 210 275 120
              C400 25 580 110 580 280
              L630 355 L580 375
              L565 440 L470 465 L470 610 Z"
            />

            {/* Intelligence fragments */}
            <path d="M275 120 L340 200 L220 260
              L370 310 L290 490 L470 465
              L370 310 L530 210 L340 200
              L470 130 L530 210 L580 280
              L370 310 L565 440 L470 465
              M220 260 L340 200 L370 310
              M290 490 L220 260
              M470 130 L370 310"
            />

            {/* Neural connections */}
            <path d="M340 200 V60 H130
              M220 260 H75 V160
              M370 310 H90
              M470 130 V45 H650
              M530 210 H680
              M565 440 L650 530
              M290 490 H120 V620"
            />

            {[90, 140, 190, 240].map(r => (
              <circle key={r} cx="370" cy="310" r={r}
                strokeDasharray="4 12"
              />
            ))}
          </g>

          {[
            [275,120], [340,200], [220,260],
            [370,310], [290,490], [470,465],
            [530,210], [470,130], [580,280],
            [565,440], [130,60], [650,45],
            [680,210], [120,620]
          ].map(([cx, cy], i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={i % 3 === 0 ? 7 : 4}
              fill="currentColor"
            />
          ))}

          <g fill="currentColor" opacity=".25">
            <polygon points="275,120 340,200 220,260"/>
            <polygon points="370,310 530,210 580,280"/>
            <polygon points="290,490 370,310 470,465"/>
          </g>
        </svg>

        {/* Floating medical symbols */}
        {Array.from({ length: 18 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute text-teal-600/20"
            style={{
              left: `${(i * 37 + 5) % 100}%`,
              top: `${(i * 23 + 8) % 100}%`
            }}
            animate={{
              y: reducedMotion ? 0 : [0, -18, 0]
            }}
            transition={{
              duration: 6 + i % 4,
              repeat: reducedMotion ? 0 : Infinity,
              ease: "easeInOut"
            }}
          >
            <Plus size={12 + i % 4 * 7}/>
          </motion.div>
        ))}
      </motion.div>

      {/* Scientific grid */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(#009295 1px, transparent 1px),
            linear-gradient(90deg, #009295 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px"
        }}
      />

      {/* Main hero layout */}
      <div className="relative mx-auto grid min-h-[680px] max-w-7xl items-center gap-12 px-6 py-24 lg:grid-cols-2">

        {/* LEFT: Medical Book */}
        <motion.div
          initial={{
            opacity: reducedMotion ? 1 : 0,
            x: reducedMotion ? 0 : -25
          }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.9 }}
          className="group relative isolate order-2 min-w-0 lg:order-1"
        >

          {/* Circular holographic background */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
          >
            <motion.div
              whileHover={undefined}
              className="absolute aspect-square w-[95%] rounded-full bg-teal-400/15 blur-[65px] transition-all duration-700 group-hover:bg-teal-400/35"
            />

            {[85, 100, 115].map((size, index) => (
              <motion.div
                key={size}
                animate={{
                  rotate: reducedMotion ? 0 :
                    index % 2 === 0 ? 360 : -360
                }}
                transition={{
                  duration: 25 + index * 10,
                  repeat: reducedMotion ? 0 : Infinity,
                  ease: "linear"
                }}
                className="absolute aspect-square rounded-full border border-dashed border-teal-600/25"
                style={{ width: `${size}%` }}
              >
                <div className="absolute left-1/2 top-0 h-3 w-3 rounded-full bg-teal-500 shadow-lg shadow-teal-500/50"/>
              </motion.div>
            ))}

            <div className="absolute aspect-square w-[108%] rounded-full border border-teal-500/20 transition-all duration-700 motion-safe:group-hover:scale-105 group-hover:border-teal-500/60"/>
          </div>

          {/* Existing slideshow */}
          <div className="relative">
            <MedicalBook />
          </div>

        </motion.div>

        {/* RIGHT: Content */}
        <motion.div
          initial={{
            opacity: reducedMotion ? 1 : 0,
            y: reducedMotion ? 0 : 20
          }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.8 }}
          className="order-1 lg:order-2"
        >

          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-white/60 px-4 py-2 text-xs font-semibold tracking-wider text-[#007B80] shadow-sm backdrop-blur-md">
            <Activity size={16}/>
            MEDICAL INTELLIGENCE | VISION 2030
          </div>

          {/* 3D visual heading */}
          <h1 className="text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">

            Engineering the future of{" "}

            <span
              className="block bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(110deg, #007B80, #009295, #007E8A)",
                filter:
                  "drop-shadow(1px 2px 0px #00696d35) drop-shadow(2px 4px 0px #00696d15) drop-shadow(0px 12px 16px #00929525)"
              }}
            >
              Medical intelligence.
            </span>

          </h1>

          {/* Description */}
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-slate-600">
            Explore the intersection of medical imaging,
            artificial intelligence, machine learning,
            and healthcare data science.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap gap-4">

            <Link
              href="/workspace"
              className="group inline-flex items-center gap-3 rounded-xl bg-[#008589] px-6 py-4 font-semibold text-white shadow-lg shadow-teal-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#007478] hover:shadow-xl motion-reduce:transform-none"
            >
              Explore Research Workspace

              <ArrowUpRight
                size={19}
                className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 motion-reduce:transform-none"
              />
            </Link>

            <Link
              href="/platform"
              className="inline-flex items-center rounded-xl border border-teal-700/25 bg-white/60 px-6 py-4 font-semibold text-[#007B80] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg motion-reduce:transform-none"
            >
              Discover Platform
            </Link>

          </div>

          {/* Safety notice */}
          <div className="mt-8 flex items-center gap-2 text-sm text-slate-600">
            <ShieldCheck size={18} className="text-teal-700"/>
            Research prototype. Not for clinical use.
          </div>

        </motion.div>
      </div>
    </section>
  );
}
