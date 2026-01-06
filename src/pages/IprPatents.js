import PortfolioPulse from "../components/PortfolioPulse";
import ResourceHeroAnimation from "../components/ResourceHeroAnimation";
import { Shield, FileText, Award, BarChart, Globe, Users, CheckCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const services = [
    {
      title: "Patent Services",
      description: "We offer comprehensive patent support services covering the complete patent lifecycle. Our experts assist in patentability assessment, prior art search, drafting of provisional and complete specifications, filing, and prosecution. We ensure that inventions are legally protected while aligning patent strategy with research, commercialization, and funding objectives.",
      icon: <FileText className="w-8 h-8 text-[#00A99D]" />,
      accent: "#00A99D"
    },
    {
      title: "Copyright Services",
      description: "Our copyright services protect original creative and academic works, including research publications, software, algorithms, books, theses, and digital content. We help establish rightful ownership, prevent unauthorized use, and ensure legal recognition of creative contributions across academic and commercial platforms.",
      icon: <Award className="w-8 h-8 text-[#4FB7B1]" />,
      accent: "#4FB7B1"
    },
    {
      title: "Trademark Services",
      description: "Trueline Research supports trademark registration and brand protection for startups, institutions, and enterprises. Our services include trademark search, filing, objection handling, renewal, and brand monitoring to ensure strong identity protection and long-term brand value.",
      icon: <Shield className="w-8 h-8 text-[#2C3E50]" />,
      accent: "#2C3E50"
    },
    {
      title: "IP Valuation & Commercialization",
      description: "We help innovators convert intellectual property into valuable business assets through structured IP valuation and commercialization support. Our services include technology valuation, licensing strategies, royalty structuring, and facilitation of industry partnerships to maximize the economic impact of intellectual property.",
      icon: <BarChart className="w-8 h-8 text-[#F39C12]" />,
      accent: "#F39C12"
    },
    {
      title: "IPR Compliance & Regulatory Support",
      description: "We provide expert guidance on national and international IPR regulations to ensure legal and regulatory compliance. Our services help organizations align with funding agency requirements, institutional IP policies, confidentiality frameworks, and ethical research standards, minimizing legal and operational risks.",
      icon: <Globe className="w-8 h-8 text-[#009688]" />,
      accent: "#009688"
    },
    {
      title: "IPR Support for Academia & Research",
      description: "Our IPR solutions are tailored specifically for academic institutions, faculty members, and research scholars. We support IP disclosure, patent filing before publication, sponsored research compliance, and protection of research outputs while maintaining publication integrity and academic credibility.",
      icon: <Users className="w-8 h-8 text-[#3E556A]" />,
      accent: "#3E556A"
    }
  ];

  const whyUsFeatures = [
    "Domain expertise and research-driven strategy",
    "Practical IPR execution and management",
    "Customized solutions for startups and academia",
    "Strict confidentiality and data security",
    "Complete lifecycle support (Idea to Commercialization)",
    "Ethical and transparent consulting practices"
  ];

  return (
    <div className="pt-0 bg-white">
      {/* Hero Section */}
      <section
        className="relative overflow-hidden py-24 text-white"
        style={{ background: "linear-gradient(135deg, #00A99D 0%, #2C3E50 100%)" }}
      >
        <ResourceHeroAnimation />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
        <div className="relative container mx-auto px-6 z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-[1.1]">IPR Consulting</h1>
            <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed mb-6">
              Strategic intellectual property advisory to protect innovation, strengthen valuation, and ensure regulatory compliance across the full IP lifecycle.
            </p>
            <div className="h-1 w-24 bg-[#00A99D] mx-auto mb-8 rounded-full"></div>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              At Trueline Research, we provide end-to-end IPR consulting services to help innovators, researchers, startups, and institutions safeguard their intellectual assets. Our approach focuses on identifying protectable ideas, defining the right IP strategy, and ensuring long-term value creation through structured intellectual property management.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, idx) => (
              <div 
                key={idx} 
                className="group p-8 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="mb-6 inline-flex p-4 rounded-2xl bg-slate-50 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-[#2C3E50] mb-4">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-24 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-[#2C3E50]">Why Trueline Research</h2>
              <p className="text-lg text-slate-600">
                Trueline Research combines domain expertise, research-driven strategy, and practical IPR execution. We offer customized solutions, strict confidentiality, and complete lifecycle support to ensure innovation is protected, compliant, and commercially viable.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {whyUsFeatures.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#00A99D] mt-1 flex-shrink-0" />
                    <span className="text-slate-700 text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-[#2C3E50] rounded-[40px] p-10 text-white relative z-10 overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#00A99D] opacity-10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <span className="w-2 h-8 bg-[#00A99D] rounded-full"></span>
                    Portfolio Pulse
                  </h3>
                  <div className="flex justify-center py-6">
                    <PortfolioPulse items={iprPulseItems} />
                  </div>
                  <p className="mt-8 text-white/60 text-sm text-center italic">
                    "Our drafting pods keep your patent pipeline moving with dynamic tracking and intelligence-led search."
                  </p>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-slate-200 rounded-full border border-slate-300/50 -z-10"></div>
              <div className="absolute -top-6 -right-6 w-48 h-48 bg-slate-100 rounded-full border border-slate-200/50 -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden bg-slate-900 text-white shadow-2xl">
            <div className="absolute inset-0 opacity-20" 
              style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #00A99D, transparent 70%)" }}
            ></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">Get Started with IPR Services</h2>
              <p className="text-xl text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed">
                Safeguard your ideas before publication, presentation, or commercialization. Partner with Trueline Research for reliable, ethical, and strategic IPR consulting services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button 
                  onClick={() => navigate("/contact")}
                  className="px-10 py-5 bg-[#00A99D] hover:bg-[#008f85] text-white rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-[#00A99D]/30 flex items-center gap-2 group"
                >
                  Contact us to discuss your IPR requirements
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <p className="mt-8 text-white/50 text-sm">
                Confidential consultation • Expert guidance • Global standards
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
