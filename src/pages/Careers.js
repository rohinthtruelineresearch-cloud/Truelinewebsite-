import ResourceHeroAnimation from "../components/ResourceHeroAnimation";

const impactHighlights = [
  {
    title: "Research Pods",
    description: "Purpose-built pods ship manuscripts, evidence packs, dashboards, and IP disclosures end-to-end with clear ownership.",
  },
  {
    title: "Learning Culture",
    description: "Weekly clinics, playbook reviews, tooling demos, and book clubs keep every pod leveling up together.",
  },
  {
    title: "Hybrid Flexibility",
    description: "We co-locate during build sprints for rapid iteration and default to async rituals when deep work matters most.",
  },
];

const roleCategories = [
  {
    title: "Research Enablement",
    roles: [
      {
        title: "Research Analyst",
        type: "Full-time — Kerala / On-site",
        blurb:
          "Partner with institutional research offices in Kerala to map evidence, analyse publication metrics, and surface accreditation insights.",
      },
      {
        title: "Research Analyst",
        type: "Full-time — Salem / On-site",
        blurb:
          "Support Salem-based universities with data collection, benchmarking, and research pipeline tracking across manuscripts and patents.",
      },
    ],
  },
  {
    title: "Product & Automation",
    roles: [
      {
        title: "Web Developer",
        type: "Full-time — Salem / Hybrid",
        blurb:
          "Develop and maintain responsive web experiences for research dashboards and partner portals with performance and accessibility in mind.",
      },
      {
        title: "Frontend Developer",
        type: "Full-time — Salem / Hybrid",
        blurb:
          "Ship component libraries and data-rich interfaces that power Trueline's research enablement tools using modern JavaScript frameworks.",
      },
    ],
  },
  {
    title: "Enablement Operations",
    roles: [
      {
        title: "Programme Success Lead",
        type: "Full-time — Chennai",
        blurb:
          "Coordinate onboarding, manage stakeholder cadences, and ensure each engagement hits agreed milestones and NPS targets.",
      },
      {
        title: "Talent Partner",
        type: "Full-time — Hybrid",
        blurb:
          "Source specialists across disciplines, run capability assessments, and curate personalised growth paths for every pod member.",
      },
    ],
  },
];

export default function Careers() {
  return (
    <div className="pt-0 bg-[#f5f8fb] text-[#1e293b]">
      <section
        className="relative overflow-hidden py-20 text-white"
        style={{ background: "linear-gradient(135deg, #00A99D 4%, #2C3E50 88%)" }}
      >
        <ResourceHeroAnimation />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-[#001625]/30" />
        <div className="relative container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
              Join the enablement wave
            </p>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Build the systems that move research forward
            </h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed">
              We are engineers, editors, analysts, and designers working together to remove friction from the way institutions publish, patent, and rank. If you love high-agency pods, measurable impact, and purpose-built tooling, you will feel at home here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:careers@truelineresearch.com?subject=Careers%20at%20Trueline"
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 font-semibold text-[#1B2A4B] shadow-lg shadow-black/10 transition hover:-translate-y-1 hover:shadow-xl"
              >
                Email your portfolio
              </a>
              <a
                href="#open-roles"
                className="inline-flex items-center justify-center rounded-full border border-white/50 px-8 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                View open roles
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a]">
              Why Trueline feels different
            </h2>
            <p className="text-lg text-slate-600">
              Each pod has the autonomy to experiment, the tools to move fast, and the mentorship to grow. Here are a few reasons teammates choose to stay and build with us.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {impactHighlights.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-[#00A99D]/20 bg-white/80 p-8 shadow-[0_30px_60px_-36px_rgba(15,23,42,0.35)] backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-[0_36px_70px_-34px_rgba(14,165,233,0.45)]"
              >
                <h3 className="text-xl font-semibold text-[#0f172a] mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="open-roles" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a]">Open roles</h2>
            <p className="text-lg text-slate-600">
              Don’t see a perfect match? Send us a note anyway — we love meeting people obsessed with research enablement.
            </p>
          </div>

          <div className="mt-12 space-y-10">
            {roleCategories.map((category) => (
              <div key={category.title} className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="h-10 w-10 rounded-full bg-[#00A99D]/15 text-[#00A99D] flex items-center justify-center font-semibold">
                    {category.title
                      .split(" ")
                      .map((word) => word[0])
                      .join("")
                      .slice(0, 2)}
                  </span>
                  <h3 className="text-2xl font-semibold text-[#0f172a]">{category.title}</h3>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  {category.roles.map((role) => (
                    <div
                      key={role.title}
                      className="flex h-full flex-col rounded-3xl border border-slate-200/70 bg-gradient-to-br from-[#f9fbfc] via-white to-[#f0f8f5] p-6 shadow-sm transition hover:shadow-lg"
                    >
                      <div className="space-y-3 flex-1">
                        <h4 className="text-xl font-semibold text-[#1e293b]">{role.title}</h4>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#00A99D]">
                          {role.type}
                        </p>
                        <p className="text-slate-600 leading-relaxed">{role.blurb}</p>
                      </div>
                      <a
                        href={`mailto:careers@truelineresearch.com?subject=${encodeURIComponent(role.title)}%20Application`}
                        className="mt-6 inline-flex items-center justify-center rounded-full border border-[#00A99D]/40 px-5 py-2.5 text-sm font-semibold text-[#00A99D] transition hover:bg-[#00A99D] hover:text-white"
                      >
                        Apply via email
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto rounded-3xl border border-[#00A99D]/25 bg-white/80 p-10 text-center shadow-[0_32px_70px_-40px_rgba(15,23,42,0.45)] backdrop-blur-sm">
            <h2 className="text-3xl font-semibold text-[#0f172a] mb-4">
              Internships & Fellowships
            </h2>
            <p className="text-slate-600 leading-relaxed">
              We run 12-week cohorts across editorial pods, automation labs, and programme success. Fellows shadow engagements, contribute deliverables, and graduate with a publishable case study.
            </p>
            <a
              href="mailto:careers@truelineresearch.com?subject=Fellowship%20Programme%20Inquiry"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-[#00A99D] px-8 py-3 font-semibold text-white transition hover:bg-[#0f172a]"
            >
              Ask about upcoming cohorts
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
