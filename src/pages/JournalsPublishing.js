import ResourceHeroAnimation from "../components/ResourceHeroAnimation";

export default function JournalsPublishing() {
  return (
    <div className="pt-0">
      <section
        className="relative overflow-hidden py-20 text-white"
        style={{ background: "linear-gradient(135deg, #00A99D 4%, #2C3E50 88%)" }}
      >
        <ResourceHeroAnimation />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/8 via-transparent to-[#001a2c]/45" />
        <div className="relative container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Journals & Publishing</h1>
            <p className="text-xl md:text-4xl font-bold mb-6">From Draft to Submission-Ready Manuscripts</p>
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed">
              We help researchers improve clarity, structure, formatting, and journal fit—so your manuscript is submission-ready, compliant, and professionally presented.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: "#F7F9FA" }}>
        <div className="container mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-[#2C3E50]">What we enable</h2>
              <p className="text-lg text-[#2C3E50]/80 leading-relaxed">
                From architecture docs to deployment guides, our editorial pods deliver technical content that passes peer review. We handle documentation, keep tasks on track, and ensure every submission meets publication standards.
              </p>
              <ul className="space-y-3 text-[#2C3E50]/80">
                <li><strong>Strategic Journal Targeting:</strong> Shortlist journals based on scope, indexing, and submission requirements.</li>
                <li><strong>Manuscript Audit:</strong> Identify gaps in structure, novelty framing, and presentation before submission.</li>
                <li><strong>Language & Formatting Polish:</strong> Technical editing, reference style, templates, and compliance checks.</li>
                <li><strong>Submission Readiness Support:</strong> Checklist-driven support for files, metadata, and author guidelines.</li>
                <li><strong>Reviewer Response Support:</strong> Clear, respectful rebuttals and revision mapping for resubmission.</li>
              </ul>
            </div>
            <div className="space-y-6 bg-white rounded-2xl border border-gray-100 shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-[#2C3E50]">Engagement formats</h3>
              <ul className="space-y-4 text-[#2C3E50]/80">
                <li><strong>Editing Sprints:</strong> 1–2 week cycles focused on clarity, structure, and journal compliance.</li>
                <li><strong>Embedded Support:</strong> Ongoing support for labs/departments across multiple manuscripts.</li>
                <li><strong>Workshops & Micro-courses:</strong> Academic writing, journal selection, ethics, and reference management sessions.</li>
                <li><strong>Templates & Toolkits:</strong> Cover letter templates, response-to-reviewer formats, checklists.</li>
                <li><strong>Progress Tracking:</strong> Status tracking for drafts, revisions, and submission readiness.</li>
              </ul>
              <p className="text-sm text-[#2C3E50]/65">
                Looking for templates or a sample sprint plan? <a className="text-[#00A99D]" href="/contact">Reach out to our team.</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-12 space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#00A99D]">How We Get You Published</p>
            <h2 className="text-4xl font-bold text-[#2C3E50]">Roadmap to Acceptance</h2>
            <p className="text-lg text-[#5E5858]">Six deliberate stages that de-risk your submission and shave weeks off the cycle.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                step: "01",
                title: "Manuscript Audit",
                description: "Evaluate readiness, identify gaps, and set improvement priorities."
              },
              {
                step: "02",
                title: "Target Selection",
                description: "Choose journals based on fit, scope, and submission requirements."
              },
              {
                step: "03",
                title: "Content Development",
                description: "Strengthen structure, technical flow, and presentation."
              },
              {
                step: "04",
                title: "Formatting & Compliance",
                description: "Align with journal templates, references, and required files."
              },
              {
                step: "05",
                title: "Revision & Response Support",
                description: "Organize changes and draft reviewer responses."
              },
              {
                step: "06",
                title: "Submission Readiness Check",
                description: "Final checklist review before author submission."
              }
            ].map((item) => (
              <div key={item.step} className="rounded-3xl border border-[#00A99D]/20 bg-gradient-to-br from-[#F7F9FA] to-white p-6 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <span className="h-12 w-12 rounded-2xl bg-[#00A99D]/10 text-[#00A99D] font-semibold flex items-center justify-center text-lg">{item.step}</span>
                  <h3 className="text-xl font-semibold text-[#2C3E50]">{item.title}</h3>
                </div>
                <p className="text-[#5E5858] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
