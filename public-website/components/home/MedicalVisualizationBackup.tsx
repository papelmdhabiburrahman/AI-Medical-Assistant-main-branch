"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import {
  Activity,
  Brain,
  HeartPulse,
  ScanLine,
  Scan,
  Wind,
  Box,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";

const slides = [
  {
    name: "X-ray",
    title: "Bone Fracture Detection",
    description: "X-ray Imaging and Fracture Detection Research",
    image: "/images/medical/xray.jpg",
    color: "#F87171",
    icon: ScanLine,
  },
  {
    name: "MRI",
    title: "MRI Brain Analysis",
    description: "Brain Imaging and Segmentation Research",
    image: "/images/medical/mri.jpg",
    color: "#A78BFA",
    icon: Scan,
  },
  {
    name: "Brain",
    title: "Neural Intelligence",
    description: "Artificial Intelligence and Neural Networks",
    image: "/images/medical/brain.jpg",
    color: "#818CF8",
    icon: Brain,
  },
  {
    name: "Heart",
    title: "Cardiac Analysis",
    description: "3D Heart Anatomy and Cardiac Imaging",
    image: "/images/medical/heart.jpg",
    color: "#FB7185",
    icon: HeartPulse,
  },
  {
    name: "Lungs",
    title: "Pulmonary Analysis",
    description: "Lung Anatomy and Respiratory Imaging",
    image: "/images/medical/lungs.jpg",
    color: "#34D399",
    icon: Wind,
  },
  {
    name: "CT / 3D",
    title: "3D CT Reconstruction",
    description: "Volumetric Imaging and Bone Reconstruction",
    image: "/images/medical/ct.jpg",
    color: "#60A5FA",
    icon: Box,
  },
];

const SLIDE_DURATION = 3000;

export default function MedicalVisualization() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [failedImages, setFailedImages] = useState<number[]>([]);

  const slide = slides[active];
  const CurrentIcon = slide.icon;

  useEffect(() => {
    const preference = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (preference.matches) {
      setPlaying(false);
    }
  }, []);

  useEffect(() => {
    if (!playing || hovered || focused) return;

    const timer = window.setTimeout(() => {
      setActive((previous) => (
        (previous + 1) % slides.length
      ));
    }, SLIDE_DURATION);

    return () => window.clearTimeout(timer);
  }, [active, playing, hovered, focused]);

  function previousSlide() {
    setActive((previous) => (
      (previous - 1 + slides.length) % slides.length
    ));
  }

  function nextSlide() {
    setActive((previous) => (
      (previous + 1) % slides.length
    ));
  }

  return (
    <section
      aria-label="Medical imaging slideshow"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setFocused(false);
        }
      }}
      className="relative overflow-hidden rounded-3xl border border-slate-700 bg-[#090A16] p-5 text-white shadow-2xl"
    >
      {/* Header */}

      <div className="mb-5 flex items-center justify-between">
        <span
          className="text-xs font-semibold tracking-widest"
          style={{ color: slide.color }}
        >
          PAPEL AI | IMAGING LAB
        </span>

        <Activity
          size={22}
          style={{ color: slide.color }}
        />
      </div>

      {/* Medical image slideshow */}

      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-800 bg-black">
        {slides.map((item, index) => {
          const Icon = item.icon;
          const failed = failedImages.includes(index);

          return (
            <div
              key={item.name}
              aria-hidden={active !== index}
              className={`absolute inset-0 transition-opacity duration-500 ease-in-out motion-reduce:transition-none ${
                active === index
                  ? "opacity-100"
                  : "pointer-events-none opacity-0"
              }`}
            >
              {!failed ? (
                <Image
                  src={item.image}
                  alt={item.title + " - illustrative visualization"}
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-contain"
                  loading="eager"
                  onError={() => {
                    setFailedImages((previous) => (
                      previous.includes(index)
                        ? previous
                        : [...previous, index]
                    ));
                  }}
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-5">
                  <Icon
                    size={100}
                    strokeWidth={0.8}
                    style={{ color: item.color }}
                  />

                  <p className="text-sm text-slate-400">
                    Medical visualization preview
                  </p>
                </div>
              )}
            </div>
          );
        })}

        {/* Bottom gradient */}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 to-transparent" />

        {/* Previous button */}

        <button
          type="button"
          onClick={previousSlide}
          aria-label="Previous medical image"
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/60 p-2 hover:bg-black"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Next button */}

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next medical image"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/60 p-2 hover:bg-black"
        >
          <ChevronRight size={24} />
        </button>

        {/* Slide number */}

        <div className="absolute bottom-4 right-4 rounded-full bg-black/70 px-3 py-1 text-xs">
          {active + 1} / {slides.length}
        </div>
      </div>

      {/* Medical information */}

      <div className="my-5 flex items-start gap-3">
        <div
          className="rounded-xl border p-3"
          style={{
            color: slide.color,
            borderColor: slide.color + "50",
            backgroundColor: slide.color + "12",
          }}
        >
          <CurrentIcon size={28} />
        </div>

        <div className="min-w-0">
          <p
            className="text-xs font-semibold tracking-widest"
            style={{ color: slide.color }}
          >
            MEDICAL INTELLIGENCE
          </p>

          <h3 className="mt-1 text-xl font-bold">
            {slide.title}
          </h3>

          <p className="mt-2 text-xs text-slate-400">
            {slide.description}
          </p>
        </div>
      </div>

      {/* Manual navigation */}

      <div className="grid grid-cols-3 gap-2">
        {slides.map((item, index) => {
          const Icon = item.icon;
          const selected = active === index;

          return (
            <button
              key={item.name}
              type="button"
              onClick={() => setActive(index)}
              aria-pressed={selected}
              className="flex flex-col items-center gap-2 rounded-xl border p-3 transition-colors duration-300 hover:bg-slate-800"
              style={{
                borderColor: selected
                  ? item.color
                  : "#303447",
                backgroundColor: selected
                  ? item.color + "18"
                  : "#151827",
              }}
            >
              <Icon
                size={22}
                style={{ color: item.color }}
              />

              <span className="text-xs font-medium">
                {item.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Slide indicators and play/pause */}

      <div className="mt-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {slides.map((item, index) => (
            <button
              key={item.name}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Show ${item.name} slide`}
              aria-pressed={active === index}
              className="flex h-8 items-center"
            >
              <span
                className="h-2 rounded-full transition-all duration-500"
                style={{
                  width: active === index ? 28 : 8,
                  backgroundColor:
                    active === index
                      ? item.color
                      : "#475569",
                }}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setPlaying(!playing)}
          aria-label={
            playing ? "Pause slideshow" : "Play slideshow"
          }
          className="rounded-lg border border-slate-700 p-2 hover:bg-slate-800"
        >
          {playing ? (
            <Pause size={17} />
          ) : (
            <Play size={17} />
          )}
        </button>
      </div>

      <p className="mt-5 text-center text-xs text-slate-500">
        Illustrative medical visualization |
        Research prototype |
        Not for clinical use
      </p>
    </section>
  );
}