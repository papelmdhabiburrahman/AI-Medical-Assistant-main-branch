import Link from "next/link";
import {
  ArrowUpRight,
  Activity,
  BrainCircuit,
  ScanLine,
  ShieldCheck,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#164e63,transparent_65%)]"
      />

      <div className="relative mx-auto grid min-h-[680px] max-w-7xl items-center gap-12 px-6 py-24 lg:grid-cols-2">
        <div>
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-800 bg-cyan-950/50 px-4 py-2 text-xs tracking-widest text-cyan-300">
            <Activity size={15} />
            MEDICAL INTELLIGENCE | VISION 2050
          </div>

          <h1 className="text-5xl font-bold leading-tight tracking-tight sm:text-6xl xl:text-7xl">
            Engineering the future of
            <span className="block text-cyan-300">
              medical intelligence.
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-slate-300">
            Explore the intersection of medical imaging,
            artificial intelligence, machine learning,
            and healthcare data science.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/workspace"
              className="inline-flex items-center gap-3 rounded-xl bg-cyan-400 px-6 py-4 font-bold text-slate-950 hover:bg-cyan-300"
            >
              Explore Research Workspace
              <ArrowUpRight size={20} />
            </Link>

            <Link
              href="/platform"
              className="rounded-xl border border-slate-700 px-6 py-4 font-semibold hover:border-cyan-400"
            >
              Discover Platform
            </Link>
          </div>

          <div className="mt-8 flex items-center gap-2 text-sm text-slate-400">
            <ShieldCheck
              size={18}
              className="shrink-0 text-cyan-400"
            />
            Research prototype. Not for clinical use.
          </div>
        </div>

        <div className="rounded-3xl border border-cyan-900 bg-slate-900/80 p-8">
          <div className="flex min-h-80 flex-col items-center justify-center gap-8">
            <BrainCircuit
              size={150}
              strokeWidth={0.7}
              className="text-cyan-300"
            />

            <div className="flex items-center gap-3 text-cyan-200">
              <ScanLine size={22} />
              Medical Intelligence
            </div>

            <p className="text-center text-sm text-slate-400">
              Imaging, Intelligence and Discovery
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}