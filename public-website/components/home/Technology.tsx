
import {
  BrainCircuit, Layers3, Database,
  ShieldCheck, Network, Cpu
} from "lucide-react";

const technologies = [
  {
    title: "Artificial Intelligence",
    description: "Machine learning, deep learning and computer vision research.",
    stack: ["Scikit-learn", "PyTorch", "TensorFlow"],
    icon: BrainCircuit,
  },
  {
    title: "Medical Image Processing",
    description: "Image enhancement, segmentation and reconstruction research.",
    stack: ["OpenCV", "CLAHE", "DICOM", "3D Imaging"],
    icon: Layers3,
  },
  {
    title: "Data Science",
    description: "Statistical analysis, preprocessing and interactive visualization.",
    stack: ["Python", "Pandas", "NumPy", "Plotly"],
    icon: Database,
  },
  {
    title: "Intelligent Infrastructure",
    description: "Modern application architecture and scalable computing.",
    stack: ["Next.js", "FastAPI", "PostgreSQL"],
    icon: Cpu,
  },
  {
    title: "Healthcare Integration",
    description: "Planned interoperability with external healthcare systems.",
    stack: ["FHIR", "PACS", "REST API", "Power BI"],
    icon: Network,
  },
  {
    title: "Security and Validation",
    description: "Privacy, responsible AI and clinical validation by design.",
    stack: ["GDPR", "Encryption", "Human Review"],
    icon: ShieldCheck,
  },
];

export default function Technology() {
  return (
    <section
      id="architecture"
      className="relative isolate overflow-hidden bg-[#F4FBFB] px-6 py-24 text-[#10252D]"
    >
      {/* Hero matching gradient */}
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

      {/* Artificial Intelligence watermark */}
      <Cpu
        aria-hidden="true"
        strokeWidth={0.4}
        className="pointer-events-none absolute -right-24 top-1/2 -z-10 h-[650px] w-[650px] -translate-y-1/2 rotate-12 text-[#009295] opacity-[0.07]"
      />

      <Network
        aria-hidden="true"
        strokeWidth={0.4}
        className="pointer-events-none absolute -bottom-32 -left-20 -z-10 h-[500px] w-[500px] text-[#009295] opacity-[0.05]"
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

      {/* Background circles */}
      {[320, 440, 560, 680, 800].map(size => (
        <div
          key={size}
          className="absolute -left-40 top-10 -z-10 rounded-full border border-teal-600/10"
          style={{ width: size, height: size }}
        />
      ))}

      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.8fr_1fr]">

        {/* Left: Technology cards */}
        <div className="order-2 grid gap-4 sm:grid-cols-2 lg:order-1">
          {technologies.map(({ title, description, icon: Icon, stack }) => (
            <article
              key={title}
              className="group relative isolate overflow-hidden rounded-2xl border border-teal-600/15 bg-white/45 p-6 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-teal-500/50 hover:bg-white/80 hover:shadow-xl motion-reduce:transform-none"
            >
              <Icon
                size={135}
                strokeWidth={0.7}
                aria-hidden="true"
                className="absolute -bottom-5 -right-4 -z-10 text-[#009295] opacity-[0.09] transition-all duration-500 group-hover:scale-110 group-hover:opacity-20 motion-reduce:transform-none"
              />

              <h3 className="text-lg font-bold">
                {title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {stack.map(item => (
                  <span
                    key={item}
                    className="rounded-md border border-teal-600/15 bg-teal-500/5 px-2.5 py-1 text-xs text-[#007B80]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* Right: Heading */}
        <div className="order-1 lg:order-2">
          <p className="text-sm font-semibold tracking-widest text-[#007B80]">
            TECHNOLOGY ARCHITECTURE
          </p>

          <h2 className="mt-5 text-4xl font-bold tracking-tight lg:text-6xl">
            Built for the
            <span className="block text-[#009295]">
              next generation.
            </span>
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            Our technology roadmap combines medical engineering,
            artificial intelligence and modern software architecture.
          </p>

          <p className="mt-8 border-l-2 border-teal-500/40 pl-4 text-sm leading-relaxed text-slate-500">
            Technology roadmap includes existing prototypes
            and planned integrations.
          </p>
        </div>

      </div>
    </section>
  );
}
