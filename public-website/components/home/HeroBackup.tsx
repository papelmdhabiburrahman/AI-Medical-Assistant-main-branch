"use client";

import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  ShieldCheck,
  Plus,
} from "lucide-react";

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";

import MedicalVisualization from "./MedicalVisualization";

export default function Hero() {
  const reducedMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const x = useSpring(mouseX, {
    stiffness: 60,
    damping: 25,
  });

  const y = useSpring(mouseY, {
    stiffness: 60,
    damping: 25,
  });

  return (
    <section
      onPointerMove={(event) => {
        if (
          reducedMotion ||
          event.pointerType !== "mouse"
        ) return;

        const rect =
          event.currentTarget.getBoundingClientRect();

        mouseX.set(
          (event.clientX - rect.left - rect.width / 2)
          * 0.07
        );

        mouseY.set(
          (event.clientY - rect.top - rect.height / 2)
          * 0.07
        );
      }}

      onPointerLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}

      className="relative isolate overflow-hidden bg-[#F4FBFB] text-[#10252D]"
    >

      {/* Medical mesh gradient */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(
              ellipse at 90% 20%,
              #A5E4E4,
              transparent 55%
            ),
            radial-gradient(
              ellipse at 10% 90%,
              #CCFBF1,
              transparent 45%
            ),
            linear-gradient(
              120deg,
              #FFFFFF,
              #E6F7F7,
              #C5EDED
            )
          `,
        }}
      />

      {/* Interactive background */}

      <motion.div
        aria-hidden="true"
        style={{ x, y }}
        className="pointer-events-none absolute inset-0 -z-10"
      >

        {/* Floating gradient circles */}

        <motion.div
          className="absolute -right-32 -top-40 h-[650px] w-[650px] rounded-full bg-teal-400/25 blur-[90px]"
          animate={{
            scale: reducedMotion
              ? 1
              : [1, 1.15, 1],
          }}
          transition={{
            duration: 12,
            repeat: reducedMotion ? 0 : Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute -bottom-40 -left-32 h-[500px] w-[500px] rounded-full bg-cyan-300/25 blur-[90px]"
          animate={{
            y: reducedMotion
              ? 0
              : [0, -40, 0],
          }}
          transition={{
            duration: 14,
            repeat: reducedMotion ? 0 : Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Concentric medical rings */}

        {[320, 440, 560, 680, 800].map((size) => (
          <div
            key={size}
            className="absolute -right-40 top-10 rounded-full border border-teal-600/10"
            style={{
              width: size,
              height: size,
            }}
          />
        ))}

        {/* Floating medical plus symbols */}

        {Array.from({ length: 18 }, (_, index) => (
          <motion.div
            key={index}
            className="absolute text-teal-600/20"
            style={{
              left: `${(index * 37 + 5) % 100}%`,
              top: `${(index * 23 + 8) % 100}%`,
            }}
            animate={{
              y: reducedMotion
                ? 0
                : [0, -18, 0],

              opacity: reducedMotion
                ? 0.4
                : [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 6 + index % 4,
              repeat: reducedMotion ? 0 : Infinity,
              delay: index * 0.2,
            }}
          >
            <Plus size={12 + index % 4 * 7} />
          </motion.div>
        ))}

      </motion.div>

      {/* Scientific grid */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(
              #009295 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              #009295 1px,
              transparent 1px
            )
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Hero content */}

      <div className="relative mx-auto grid min-h-[680px] max-w-7xl items-center gap-12 px-6 py-24 lg:grid-cols-2">

        {/* Left side */}

        <motion.div
          initial={{
            opacity: reducedMotion ? 1 : 0,
            y: reducedMotion ? 0 : 20,
          }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reducedMotion ? 0 : 0.8,
          }}
        >

          {/* Medical badge */}

          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-white/60 px-4 py-2 text-xs font-semibold tracking-wider text-[#007B80] shadow-sm backdrop-blur-md">
            <Activity size={16} />

            MEDICAL INTELLIGENCE | VISION 2030
          </div>

          {/* Main heading */}

          <h1 className="text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">

            Engineering the future of{" "}

            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(110deg, #007B80, #009295, #007E8A)",
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
                className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 motion-reduce:transform-none"
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

            <ShieldCheck
              size={18}
              className="text-teal-700"
            />

            Research prototype. Not for clinical use.

          </div>

        </motion.div>

        {/* Existing medical slideshow */}

        <motion.div
          initial={{
            opacity: reducedMotion ? 1 : 0,
            x: reducedMotion ? 0 : 25,
          }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: reducedMotion ? 0 : 0.9,
          }}
          className="relative"
        >

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-5 -z-10 rounded-[40px] bg-teal-500/15 blur-2xl"
          />

          <MedicalVisualization />

        </motion.div>

      </div>

    </section>
  );
}