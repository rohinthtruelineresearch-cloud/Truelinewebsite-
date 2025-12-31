import PortfolioPulse from "../components/PortfolioPulse";
import ResourceHeroAnimation from "../components/ResourceHeroAnimation";

const iprPulseItems = [
  { id: "prior-art", color: "#00A99D", title: "Prior Art", caption: "48 scans" },
  { id: "f2o", color: "#2C3E50", title: "Freedom Ops", caption: "18 reviews" },
  { id: "draft-pods", color: "#4FB7B1", title: "Draft Pods", caption: "12 specs" },
  { id: "claims", color: "#F39C12", title: "Claims Tune", caption: "38 iterations" },
  { id: "drawings", color: "#1ABC9C", title: "Drawings", caption: "27 assets" },
  { id: "filings", color: "#3E556A", title: "Filings Desk", caption: "24 queued" },
  { id: "prosecution", color: "#009688", title: "Prosecution", caption: "11 actions" },
  { id: "licensing", color: "#6FD3C6", title: "Licensing", caption: "9 pathways" },
  { id: "insights", color: "#B98017", title: "Analytics", caption: "6 reports" },
];

export default function IprPatents() {
  return (
    <div className="pt-0">
      <section
        className="relative overflow-hidden py-20 text-white"
        style={{ background: "linear-gradient(135deg, #00A99D 4%, #2C3E50 88%)" }}
      >
        <ResourceHeroAnimation />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-[#001a2c]/45" />
        <div className="relative container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">IPR & Patents</h1>
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed">
              Convert disclosures into protected assets with search intelligence, drafting support, and filing governance.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: "#F7F9FA" }}>
        <div className="container mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-[#2C3E50]">Patent acceleration desk</h2>
              <p className="text-lg text-[#2C3E50]/80 leading-relaxed">
                We support inventors, institutions, and enterprises with structured IP documentation and filing readiness. Our team helps convert invention notes into clear, audit-ready materials—so your patent workflow stays organized, compliant, and efficient (in coordination with your registered patent attorney/agent).
              </p>
              <ul className="space-y-3 text-[#2C3E50]/80">
                <li>Prior-art and landscape search support (with documented references)</li>
                <li>Invention disclosure structuring and specification drafting assistance</li>
                <li>Claim-mapping support and drawing/figure coordination</li>
                <li>Filing readiness checklists, docket tracking, and status reporting</li>
              </ul>
            </div>
            <div className="space-y-6 bg-white rounded-2xl border border-[#E1EEF3] shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-[#2C3E50]">How we engage</h3>
              <ul className="space-y-4 text-[#2C3E50]/80">
                <li>
                  <strong>Discovery review:</strong> Review disclosures, lab notes, and invention logs to plan next steps.
                </li>
                <li>
                  <strong>Drafting support pods:</strong> Work with your inventors to prepare specs, figures, and claim maps.
                </li>
                <li>
                  <strong>Lifecycle tracking:</strong> Support for deadlines, office-action tracking, and portfolio reporting.
                </li>
              </ul>
              <p className="text-sm text-[#2C3E50]/65">
                Need an NDA before sharing disclosure details?{" "}
                <a className="text-[#00A99D]" href="/contact">
                  We can execute one immediately.
                </a>
              </p>
              <div className="pt-6 border-t border-[#E1EEF3]">
                <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2C3E50]/65 text-center mb-4">
                  Portfolio Pulse
                </h4>
                <div className="flex justify-center">
                  <PortfolioPulse items={iprPulseItems} />
                </div>
                <p className="mt-4 text-xs text-[#2C3E50]/55 text-center">
                  Dynamic clusters signal how our drafting pods keep your patent pipeline moving.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

