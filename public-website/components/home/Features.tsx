
import Link from "next/link";
import {
  ScanLine, BrainCircuit, ChartNoAxesCombined,
  Box, Database, Stethoscope, FileText,
  Cloud, ArrowUpRight, Plus
} from "lucide-react";

const features = [
  ["Medical Imaging", "Explore X-ray, CT, MRI and medical image processing.", ScanLine, "/platform"],
  ["AI and Machine Learning", "Train and evaluate experimental machine learning models.", BrainCircuit, "/ml"],
  ["Data Analytics", "Process, analyze and visualize structured research data.", ChartNoAxesCombined, "/analytics"],
  ["3D Reconstruction", "Explore volumetric imaging and reconstruction research.", Box, "/reconstruction"],
  ["Big Data and Integration", "Explore large-scale datasets and database connectivity.", Database, "/big-data"],
  ["Doctor Workspace", "A planned environment for clinician-led workflows.", Stethoscope, "/doctor"],
  ["Medical Reports", "Explore research tools for medical report drafting.", FileText, "/reports"],
  ["Cloud Infrastructure", "Explore planned storage and scalable infrastructure.", Cloud, "/storage"],
] as const;

export default function Features() {
  return (
    <section
      id="technology"
      className="relative isolate overflow-hidden bg-[#F4FBFB] px-6 py-24 text-[#10252D]"
    >
      {/* Hero matching background */}
      <div
        className="absolute inset-0 -z-20"
        style={{
          background: `
            radial-gradient(ellipse at 90% 20%, #A5E4E4, transparent 55%),
            radial-gradient(ellipse at 10% 90%, #CCFBF1, transparent 45%),
            linear-gradient(120deg, #FFFFFF, #E6F7F7, #C5EDED)
          `
        }}
      />

      {/* Medical background picture */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage: "url('/images/medical/brain.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />

      {/* Scientific grid */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(#009295 1px, transparent 1px),
            linear-gradient(90deg, #009295 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px"
        }}
      />

      {/* Medical circles */}
      {[320, 440, 560, 680, 800].map(size => (
        <div
          key={size}
          className="absolute -right-40 top-10 -z-10 rounded-full border border-teal-600/10"
          style={{ width: size, height: size }}
        />
      ))}

      {/* Medical symbols */}
      {Array.from({ length: 18 }, (_, i) => (
        <Plus
          key={i}
          size={14 + i % 4 * 6}
          className="absolute -z-10 text-teal-600/15"
          style={{
            left: `${(i * 37 + 5) % 100}%`,
            top: `${(i * 23 + 8) % 100}%`
          }}
        />
      ))}

      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_1.8fr]">

        {/* Left content */}
        <div>
          <p className="text-sm font-semibold tracking-widest text-[#007B80]">
            PLATFORM CAPABILITIES
          </p>

          <h2 className="mt-5 text-4xl font-bold tracking-tight lg:text-6xl">
            One platform.
            <span className="block text-[#009295]">
              Multiple possibilities.
            </span>
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            Discover our experimental tools and future
            capabilities for medical AI and healthcare research.
          </p>

          <Link
            href="/platform"
            className="mt-8 inline-flex items-center gap-3 rounded-xl bg-[#008589] px-6 py-4 font-semibold text-white shadow-lg shadow-teal-600/20 hover:bg-[#007478]"
          >
            Explore All Workspaces
            <ArrowUpRight size={18} />
          </Link>
        </div>

        {/* Right capability cards */}
        <div className="grid gap-4 sm:grid-cols-2">
          {features.map(([title, description, Icon, href]) => (
            <Link
              key={href}
              href={href}
              className="group relative isolate min-h-[145px] overflow-hidden rounded-2xl border border-teal-600/15 bg-white/45 p-5 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-teal-500/50 hover:bg-white/80 hover:shadow-xl motion-reduce:transform-none"
            >
              <Icon
                size={110}
                strokeWidth={0.8}
                aria-hidden="true"
                className="absolute -bottom-4 -right-3 -z-10 text-[#009295] opacity-[0.09] transition-all duration-500 group-hover:scale-110 group-hover:opacity-20 motion-reduce:transform-none"
              />

              <ArrowUpRight
                size={18}
                className="absolute right-4 top-4 text-teal-700/50"
              />

              <h3 className="pr-6 text-base font-bold">
                {title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {description}
              </p>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
