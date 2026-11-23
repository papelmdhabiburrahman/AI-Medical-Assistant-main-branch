
import Link from "next/link";
import {
  FlaskConical, Upload, ChartNoAxesCombined,
  BrainCircuit, FileText, ShieldCheck,
  ArrowUpRight, Network
} from "lucide-react";

const workflow = [
  {
    title: "Import Research Data",
    description: "Explore synthetic datasets and non-sensitive reference media.",
    icon: Upload,
    href: "/workspace",
  },
  {
    title: "Process and Analyze",
    description: "Clean, transform and visualize research datasets.",
    icon: ChartNoAxesCombined,
    href: "/analytics",
  },
  {
    title: "Train and Evaluate",
    description: "Experiment with machine learning models and evaluation metrics.",
    icon: BrainCircuit,
    href: "/ml",
  },
  {
    title: "Research Reports",
    description: "Explore structured research reporting and documentation.",
    icon: FileText,
    href: "/reports",
  },
];

export default function Research() {
  return (
    <section
      id="research"
      className="relative isolate overflow-hidden bg-[#F4FBFB] px-6 py-24 text-[#10252D]"
    >
      {/* Medical gradient */}
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

      {/* AI Thinking background image */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-contain bg-right-top bg-no-repeat opacity-[0.12] mix-blend-multiply"
        style={{
          backgroundImage: "url('/images/medical/ai-thinking.svg')"
        }}
      />

      {/* Neural network watermark */}
      <Network
        strokeWidth={0.4}
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-20 -z-10 h-[500px] w-[500px] text-[#009295] opacity-[0.06]"
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

      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-14 text-center">
          <FlaskConical
            size={40}
            className="mx-auto mb-6 text-[#009295]"
          />

          <p className="text-sm font-semibold tracking-widest text-[#007B80]">
            RESEARCH AND INNOVATION
          </p>

          <h2 className="mt-5 text-4xl font-bold tracking-tight md:text-6xl">
            From data to
            <span className="block text-[#009295]">
              scientific discovery.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
            Explore a structured research workflow for medical
            imaging, artificial intelligence and healthcare
            data science.
          </p>
        </div>

        {/* Research cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {workflow.map(({ title, description, icon: Icon, href }, index) => (
            <Link
              key={href}
              href={href}
              className="group relative isolate overflow-hidden rounded-2xl border border-teal-600/15 bg-white/45 p-6 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-teal-500/50 hover:bg-white/80 hover:shadow-xl motion-reduce:transform-none"
            >
              <Icon
                size={140}
                strokeWidth={0.7}
                aria-hidden="true"
                className="absolute -bottom-5 -right-4 -z-10 text-[#009295] opacity-[0.09] transition-all duration-500 group-hover:scale-110 group-hover:opacity-20 motion-reduce:transform-none"
              />

              <span className="text-4xl font-light text-teal-600/40">
                0{index + 1}
              </span>

              <h3 className="mt-6 text-lg font-bold">
                {title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {description}
              </p>

              <ArrowUpRight
                size={20}
                className="mt-6 text-[#009295]"
              />
            </Link>
          ))}
        </div>

        {/* Responsible AI - unchanged */}
        <div className="mt-16 overflow-hidden rounded-3xl border border-cyan-900 bg-slate-950 px-8 py-14 text-center text-white">
          <ShieldCheck
            size={40}
            className="mx-auto mb-6 text-cyan-400"
          />

          <h2 className="text-3xl font-bold md:text-4xl">
            Responsible AI. Human-led healthcare.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-slate-400">
            Our platform is under development for research
            and experimentation. Clinical validation,
            privacy and human oversight are essential
            parts of our development roadmap.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/workspace"
              className="rounded-xl bg-cyan-400 px-6 py-4 font-bold text-slate-950 hover:bg-cyan-300"
            >
              Launch Research Workspace
            </Link>

            <Link
              href="/safety"
              className="rounded-xl border border-slate-700 px-6 py-4 font-semibold hover:border-cyan-400"
            >
              Safety and Validation
            </Link>
          </div>

          <p className="mt-8 text-xs text-slate-400">
            Research prototype. Not for clinical use.
            Do not upload identifiable patient information.
          </p>
        </div>
      </div>
    </section>
  );
}
