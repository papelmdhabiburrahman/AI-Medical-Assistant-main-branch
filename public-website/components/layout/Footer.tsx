import Link from "next/link";
import { Activity, ShieldCheck } from "lucide-react";

const footerGroups = [
  {
    title: "Platform",
    links: [
      ["All Workspaces", "/platform"],
      ["Data Analytics", "/analytics"],
      ["Machine Learning", "/ml"],
      ["Deep Learning", "/deep-learning"],
      ["Doctor Workspace", "/doctor"],
    ],
  },
  {
    title: "Research",
    links: [
      ["Research Workspace", "/workspace"],
      ["3D Reconstruction", "/reconstruction"],
      ["Advanced ETL", "/advanced"],
      ["Big Data", "/big-data"],
      ["Medical Reports", "/reports"],
    ],
  },
  {
    title: "Technology",
    links: [
      ["Power BI", "/power-bi"],
      ["Database Integration", "/databases"],
      ["Cloud Storage", "/storage"],
      ["Mobile Platform", "/mobile"],
      ["Immersive Research", "/immersive"],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface text-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <div className="rounded-xl bg-cyan-400 p-3 text-slate-950">
                <Activity size={24} />
              </div>
              <div>
                <p className="text-xl font-bold">PAPEL AI</p>
                <p className="text-[10px] tracking-widest text-muted">
                  MEDICAL ASSISTANT
                </p>
              </div>
            </Link>

            <p className="mt-6 text-sm leading-relaxed text-muted">
              Advancing medical imaging, artificial intelligence
              and healthcare research.
            </p>
          </div>

          {footerGroups.map((group) => (
            <div key={group.title}>
              <h2 className="mb-5 font-semibold">
                {group.title}
              </h2>

              <ul className="space-y-3">
                {group.links.map(([label, href]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-muted hover:text-primary"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex items-start gap-3 rounded-2xl border border-border bg-background p-5">
          <ShieldCheck className="shrink-0 text-primary" size={24} />

          <div>
            <p className="font-semibold">
              Research and Development Platform
            </p>
            <p className="mt-2 text-sm text-muted">
              Research prototype. Not for clinical use.
              Do not upload identifiable patient information.
            </p>
            <Link
              href="/safety"
              className="mt-3 inline-block text-sm text-primary"
            >
              Safety and Clinical Validation
            </Link>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-sm text-muted">
          &copy; 2026 Papel AI Medical Assistant.
          All rights reserved.
        </div>
      </div>
    </footer>
  );
}