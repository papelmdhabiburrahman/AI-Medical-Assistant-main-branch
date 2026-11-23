
export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <nav className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 px-8 py-5">
        <h1 className="text-2xl font-bold text-cyan-400">
         Papel AI Medical Assistant
        </h1>

        <div className="flex gap-6 text-sm">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#about">About</a>
        </div>
      </nav>

      <section
        id="home"
        className="mx-auto max-w-6xl px-8 py-28 text-center"
      >
        <p className="mb-5 font-medium text-cyan-400">
          Artificial Intelligence for Healthcare
        </p>

        <h2 className="text-4xl font-bold leading-tight md:text-6xl">
          The Future of
          <span className="block text-cyan-400">
            Medical Imaging AI
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
          An AI-powered platform under development
          to support medical image analysis and
          clinical decision-making.
        </p>

        <a
          href="#features"
          className="mt-10 inline-block rounded-lg bg-cyan-500 px-8 py-4 font-semibold text-slate-950"
        >
          Explore Our Technology
        </a>
      </section>

      <section
        id="features"
        className="mx-auto grid max-w-6xl gap-6 px-8 pb-20 md:grid-cols-3"
      >
        {[
          "X-Ray Analysis",
          "CT Scan Analysis",
          "MRI Analysis",
          "AI Report Drafting",
          "Clinical Decision Support",
          "Medical Image Processing",
        ].map((feature) => (
          <div
            key={feature}
            className="rounded-xl border border-slate-800 bg-slate-900 p-8"
          >
            <h3 className="text-xl font-semibold text-cyan-400">
              {feature}
            </h3>
            <p className="mt-3 text-sm text-slate-400">
              Planned platform capability.
            </p>
          </div>
        ))}
      </section>

      <section
        id="about"
        className="mx-auto max-w-4xl px-8 py-16 text-center"
      >
        <h2 className="text-3xl font-bold">About Us</h2>
        <p className="mt-5 text-slate-400">
          We are developing intelligent medical
          imaging tools designed to assist healthcare
          professionals.
        </p>
        <p className="mt-4 text-sm text-slate-400">
          Research and development stage.
          Not for clinical use.
        </p>
      </section>

      <footer className="border-t border-slate-800 p-8 text-center text-sm text-slate-400">
        © 2026 AI Medical Assistant. PAPEL MD HAIBUR RAHMAN
        All rights reserved.
      </footer>
    </main>
  );
}
