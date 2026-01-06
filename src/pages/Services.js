import { Link } from "react-router-dom";
import {
  Atom as AtomIcon,
  ShieldCheck as ShieldCheckIcon,
  BookOpen,
  Code,
} from "lucide-react";
import PathMorphing from "../components/PathMorphing";
import ResourceHeroAnimation from "../components/ResourceHeroAnimation";
import {
  ManuscriptsIcon,
  IPRIcon,
  AccreditationIcon,
  StrategyIcon,
  Targeticon,
} from "../components/ServiceIcons";
import imgAiStrategy from "../images/excellence_strategy.jpg";
import imgResearchLab from "../images/innovation_lab.jpg";
import imgNextGenPlatform from "../images/platform_nextgen.jpg";
import imgAccreditation from "../images/evidence_compliance.jpg";
import imgVentureStudio from "../images/acceleration_venture.jpg";
import imgIPR from "../images/IPR Commercialisation Suite.jpeg";
import imgWebDev from "../images/web_development.png";




function TextParallaxContent({ imgUrl, subheading, heading, children, reverse }) {
  return (
    <section className="px-6 py-8 sm:py-12">
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        <div className={`relative mx-auto w-full h-[400px] lg:h-[500px] overflow-hidden rounded-[32px] bg-slate-900/5 shadow-[0_28px_70px_-38px_rgba(15,23,42,0.45)] ${reverse ? 'lg:order-last' : ''}`}>
          <img
            src={imgUrl}
            alt={heading}
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/25 via-transparent to-transparent" />
        </div>
        <div className={`flex flex-col gap-8 text-center lg:text-left`}>
          <div className="space-y-3">
            <span className="inline-flex items-center justify-center rounded-full bg-[#00A99D]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#00A99D]">
              {subheading}
            </span>
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">
              {heading}
            </h2>
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}

function ParallaxDetails({ title, description, features, accent = "#00A99D" }) {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,1fr)]">
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-slate-900">{title}</h3>
        <p className="text-base leading-relaxed text-slate-600">{description}</p>
      </div>
      <ul className="space-y-3 text-base leading-relaxed text-slate-600">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <span
              className="mt-2 h-2 w-2 flex-shrink-0 rounded-full"
              style={{ backgroundColor: accent }}
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}



export default function ServicesPage() {
  const services = [
    {
      title: "AI CONSULTING AND ADVISORY SERVICES",
      badge: "INTELLIGENT SOLUTIONS, TANGIBLE RESULTS",
      description: "Make AI adoption practical and profitable. We define the right use cases, select the right stack, and build a roadmap that your team can execute.",
      features: [
        "Custom AI strategy aligned with business goals",
        "Technology stack recommendations & vendor evaluation",
        "ROI-focused implementation roadmap and milestones",
        "Change management and team upskilling support",
      ],
      icon: StrategyIcon,
    },
    {
      title: "JOURNALS & PUBLISHING SUPPORT",
      badge: "From Draft to Submission-Ready Manuscripts",
      description: "Accelerate your publication journey with expert audits, language polishing, and strategic journal selection. Our editorial pods ensure your research meets global indexing standards.",
      features: [
        "Strategic Journal Targeting: Shortlist based on scope & impact",
        "Manuscript Audit: Identification of gaps in structure & novelty",
        "Language & Formatting Polish: Reference management & templates",
        "Submission Readiness Support: Checklist-driven file prep",
        "Reviewer Response Support: Revision mapping & rebuttal drafting",
      ],
      icon: BookOpen,
    },
    {
      title: "RESEARCH & INNOVATION LAB",
      badge: "Your Ideas, Supercharged",
      description: "We set up the infrastructure and innovation workflow needed to accelerate research, prototypes, and real deployments.",
      features: [
        "Cloud-based development environments",
        "Hardware prototyping & IoT integration",
        "Proof-of-concept development & testing",
        "Research paper publication support",
      ],
      icon: ManuscriptsIcon,
    },
    {
      title: "IPR CONSULTING",
      description: "Protect Your Innovation. Own Your Future.",
      features: [
        "Patent drafting, filing, and prosecution",
        "Trademark registration and brand protection",
        "Copyright advisory for digital and creative assets",
        "Freedom-to-operate analysis and competitive intelligence",
      ],
      icon: IPRIcon,
    },
    {
      title: "ACCREDITATION AND RANKING SUPPORT",
      description: "Elevate Your Institution's Standing",
      features: [
        "Comprehensive gap analysis and readiness assessments",
        "Continuous improvement frameworks",
        "Best practices implementation",
        "Data management and documentation systems",
      ],
      icon: AccreditationIcon,
    },
    {
      title: "TRUELINE VENTURE STUDIO",
      badge: "Building Ideas into Market-Ready Ventures",
      description: "We empower students, innovators, and early-stage founders to convert ideas into scalable, investment-ready ventures. Through structured incubation, AI-driven prototyping, and expert mentorship, we reduce risk and accelerate go-to-market execution.",
      features: [
        "Idea Validation & Problem–Solution Fit: Structured frameworks to assess feasibility",
        "AI-Powered Prototyping & MVP Development: Rapid development using modern tools",
        "Mentorship & Founder Enablement: Guidance from industry experts & entrepreneurs",
        "Incubation & Acceleration Support: Access to funding readiness and pathways",
        "Business Model & GTM Strategy: Revenue modeling & customer discovery",
        "Ecosystem & Industry Connect: Linkages with investors and innovation networks"
      ],
      icon: Targeticon,
    },
    {
      title: "MODERN WEB & APP DEVELOPMENT",
      badge: "SCALABLE, SECURE, HIGH-PERFORMANCE",
      description: "We build digital products that deliver. From enterprise web applications to consumer mobile apps, we focus on clean architecture, responsive design, and performance-first code.",
      features: [
        "Full-Stack Web Development (React, Next.js, Node.js)",
        "Mobile App Development (Native & Cross-Platform)",
        "API Design, Microservices & Backend Systems",
        "Performance Optimization & Cloud Deployment (AWS/Azure)",
        "UI/UX Implementation & Modern Design Standards",
      ],
      icon: Code,
    },
  ];


  const differentiators = [
    {
      title: "Clarity First",
      description:
        "We simplify complex work into clear milestones and deliverables.",
    },
    {
      title: "End-to-End Ownership",
      description:
        "Strategy → build → deployment → improvement, with a single accountable team.",
    },
    {
      title: "Industry + Academic Enablement",
      description:
        "We understand both business delivery and institutional frameworks.",
    },
    {
      title: "Scalable Solutions",
      description:
        "We build systems designed to grow—secure, maintainable, and performance-ready.",
    },
    {
      title: "Documentation & Process Discipline",
      description:
        "Strong documentation, evidence mapping, and repeatable workflows.",
    },
    {
      title: "Measured Impact",
      description:
        "We focus on tangible outcomes—productivity, readiness, and adoption.",
    },
  ];


  const timelineSteps = [
    {
      title: "Discover",
      description: "Align goals, users, data sources, and measurable success metrics.",
      cardGradient: "bg-gradient-to-br from-[#E2F5F1] via-white to-[#E6FFFA]", // Teal
    },
    {
      title: "Plan",
      description:
        "Define roadmap, timelines, architecture, and accountable owners for delivery.",
      cardGradient: "bg-gradient-to-br from-[#ECFEFF] via-white to-[#CFFAFE]", // Cyan
    },
    {
      title: "Build & Integrate",
      description:
        "Build AI solutions, connect systems, automate workflows, and test thoroughly.",
      cardGradient: "bg-gradient-to-br from-[#F3E8FF] via-white to-[#E9D5FF]", // Purple
    },
    {
      title: "Deploy & Improve",
      description:
        "Launch securely, monitor performance, refine with feedback, and scale adoption.",
      cardGradient: "bg-gradient-to-br from-[#FFF7ED] via-white to-[#FED7AA]", // Orange
    },
  ];

  // deliveryMetrics and pulseCards were unused in the current layout
  const pulseCards = [];
  console.log("Rendering services with pulseCards:", pulseCards);

  const parallaxImages = [
    imgAiStrategy,
    imgNextGenPlatform, // Reusing this for Journals/Publishing context
    imgResearchLab,
    imgIPR,
    imgAccreditation,
    imgVentureStudio,
    imgWebDev,
  ];
  const accentPalette = ["#00A99D", "#F39C12", "#6366F1", "#0EA5E9", "#34D399", "#EC4899", "#8B5CF6"];
  const parallaxSections = services.slice(0, 7).map((service, index) => ({
    ...service,
    imgUrl: parallaxImages[index % parallaxImages.length],
    accent: accentPalette[index % accentPalette.length],
  }));
  const researchStacks = [
    {
      title: "Research Enablement & Innovation Support",
      description: "Structured support to improve research planning, execution, and outcomes—through mentoring, research workflows, and publication readiness.",
      features: [
        "research planning",
        "publication guidance", 
        "project structuring",
        "outcome tracking",
      ],
      icon: AtomIcon,
      accent: "#22D3EE",
    },
    {
      title: "Accreditation & Ranking Support Systems",
      description: "We simplify accreditation and ranking preparation by organizing evidence, data, and documentation into an efficient, review-ready system.",
      features: [
        "data mapping",
        "evidence folders",
        "dashboards",
        "report readiness",
      ],
      icon: ShieldCheckIcon,
      accent: "#F97316",
    },
    {
      title: "IPR & Commercialization Guidance",
      description: "Protect and grow innovation value with end-to-end IPR consulting—patents, trademarks, copyrights, and innovation documentation.",
      features: [
        "patent support",
        "trademark filing",
        "documentation",
        "innovation strategy",
      ],
      icon: IPRIcon,
      accent: "#A855F7",
    },
  ];
  const researchMetrics = [
    {
      label: "Institutions & Universities Enabled",
      value: "100+",
      detail: "Empowering academic partners across India and beyond.",
    },
    {
      label: "IPR Support Cases Delivered",
      value: "200+",
      detail: "Patents, copyrights, and trademarks filed and granted.",
    },
    {
      label: "Research Publications Shaped",
      value: "1500+",
      detail: "High-impact papers published in indexed journals.",
    },
    {
      label: "Startups Supported & Scaled",
      value: "70+",
      detail: " Ventures guided from idea to market success.",
    },
  ];
  

  // Return the main structure of the Services page
  return (
    <div className="min-h-screen bg-white text-[#2C3E50] overflow-hidden">
      {/* Hero Section */}
      <section
        className="relative overflow-hidden py-20 text-white"
        style={{ background: "linear-gradient(135deg, #00A99D 4%, #2C3E50 88%)" }}
      >
        <ResourceHeroAnimation />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-[#001b2e]/45" />
        <div className="relative container mx-auto px-6">
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">Services &amp; Solutions</h1>
            <p className="text-base sm:text-lg text-white/80">
              Empowering Innovation Through Intelligence
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="container mx-auto px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl grid gap-16 lg:grid-cols-2 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full bg-[#00A99D]/10 px-4 py-2 uppercase tracking-[0.28em] text-[11px] text-[#00A99D]">
              Services &amp; Solutions
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-6">
                <div className="relative rounded-[32px] bg-white px-7 py-8 shadow-[0_40px_120px_-60px_rgba(24,78,96,0.55)] border border-[#00A99D]/15 text-[#2C3E50]">
                  <PathMorphing size={132} className="mx-auto" />
                  <div className="mt-6 space-y-2 text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#00A99D]">
                      Crafting Excellence
                    </p>
                    <h2 className="text-3xl font-bold text-[#2C3E50]">
                      Build. Deploy. Scale.
                    </h2>
                    <p className="text-sm text-[#4A6074] leading-relaxed">
                      We partner with startups and enterprises to convert strategic priorities into production-grade systems—combining infrastructure expertise, AI engineering, and flawless execution.
                    </p>
                  </div>
                </div>
                <div className="hidden sm:flex flex-col gap-4 pt-4">
                  <div className="h-20 w-20 rounded-3xl border border-[#00A99D]/15 bg-[#E2F5F1] backdrop-blur" />
                  <div className="h-20 w-20 rounded-3xl border border-[#00A99D]/10 bg-gradient-to-br from-[#FFE3EC] to-white backdrop-blur" />
                </div>
              </div>
              <p className="text-sm sm:text-base text-[#4A6074] leading-relaxed max-w-xl">
                We align AI strategy, research operations, and accreditation rigor—unlocking domain expertise, data fluency, and program precision.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center lg:items-end p-8">
            <div className="relative w-full max-w-lg overflow-hidden rounded-2xl shadow-2xl border border-slate-200/50">
               <img 
                 src={imgAiStrategy} 
                 alt="AI Strategy and Solutions" 
                 className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Parallax Sections */}
      <section className="bg-white py-8 sm:py-12">
        <div className="space-y-12 sm:space-y-16">
          {parallaxSections.map((section, index) => (
            <TextParallaxContent
              key={section.title}
              imgUrl={section.imgUrl}
              subheading={section.badge || section.description}
              heading={section.title}
              reverse={index % 2 === 1}
            >
              <ParallaxDetails
                title="What We Deliver"
                description={section.description}
                features={section.features}
                accent={section.accent}
              />
            </TextParallaxContent>
          ))}
        </div>
      </section>

      {/* Research & Accreditation Section */}
      <section id="research-labs" className="relative overflow-hidden bg-[#010b19] py-16 sm:py-20 text-white">
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <div className="absolute -top-20 left-10 h-72 w-72 rounded-full bg-[#22D3EE]/25 blur-[140px]" />
          <div className="absolute bottom-[-6rem] right-[-4rem] h-[22rem] w-[22rem] rounded-full bg-[#A855F7]/20 blur-[180px]" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 10% 20%, rgba(34,211,238,0.12), transparent 45%), radial-gradient(circle at 90% 80%, rgba(168,85,247,0.12), transparent 48%)",
            }}
          />
        </div>
        <div className="container relative z-10 mx-auto px-6">
          <div className="mx-auto max-w-7xl space-y-10 text-center">
            <div className="max-w-4xl mx-auto space-y-5">
            <span className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/80">
              RESEARCH • INNOVATION • INSTITUTIONAL EXCELLENCE
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
              Strengthening Research Outcomes and Accreditation Readiness
            </h2>
            <p className="text-base sm:text-lg text-white/70 leading-relaxed">
              We help institutions and research teams improve research quality, build innovation capacity, and streamline accreditation workflows. From lab enablement to documentation systems and performance reporting, we support measurable progress across NAAC, NBA, NIRF, QS, and ARIIA.
            </p>
            </div>
          </div>
          <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3 mx-auto max-w-7xl">
            {researchStacks.map((stack) => {
              const Icon = stack.icon;
              return (
                <article
                  key={stack.title}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_35px_110px_-60px_rgba(15,23,42,0.85)] transition duration-500 hover:-translate-y-2 hover:border-white/25"
                >
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100"
                    style={{
                      background: `linear-gradient(135deg, ${stack.accent}22 0%, transparent 65%)`,
                    }}
                  />
                  <div className="relative space-y-4">
                    <div className="flex items-center gap-4">
                      <div
                        className="rounded-2xl border border-white/10 bg-black/30 p-3"
                        style={{ boxShadow: `0 20px 60px -45px ${stack.accent}` }}
                      >
                        <Icon className="h-6 w-6 text-white" strokeWidth={1.6} />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">{stack.title}</h3>
                        <p className="text-sm text-white/60">{stack.description}</p>
                      </div>
                    </div>
                    <ul className="space-y-2 text-sm text-white/70">
                      {stack.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ backgroundColor: stack.accent }} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {researchMetrics.map((metric) => (
              <div key={metric.label} className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/50">{metric.label}</p>
                <p className="mt-4 text-3xl font-bold text-white">{metric.value}</p>
                <p className="mt-3 text-sm text-white/70 leading-relaxed">{metric.detail}</p>
              </div>
            ))}
          </div>


        </div>
      </section>

      {/* Differentiators Section */}
      <section className="container mx-auto px-6 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="space-y-4 text-center max-w-3xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#00A99D]">Why Choose Us</p>

            <h2 className="text-3xl sm:text-4xl font-bold text-[#1B283A]">
              Why Organizations Choose Trueline Research
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Practical execution, clear communication, and outcomes you can track.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-center">
            {differentiators.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-[#00A99D]/20 bg-white/85 p-6 shadow-sm backdrop-blur"
              >
                <div className="flex items-start gap-4">
                  <span className="mt-1 h-3 w-3 rounded-full bg-[#00A99D]" />
                  <div className="space-y-2 text-left">
                    <h3 className="text-lg font-semibold text-[#1B283A]">{item.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Timeline Section */}
      <section className="container mx-auto px-6 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto bg-white rounded-4xl border border-slate-100 shadow-2xl shadow-slate-200/50 px-6 sm:px-10 lg:px-16 py-20">
          <h2 className="text-4xl sm:text-5xl font-bold mb-16 sm:mb-20 text-center text-[#1B283A]">
            How We <span className="bg-gradient-to-r from-[#00A99D] to-[#F39C12] bg-clip-text text-transparent">Transform</span>
          </h2>
          <div className="grid gap-12 lg:grid-cols-4">
            {timelineSteps.map((step, index) => (
              <div key={step.title} className="relative group flex gap-6 lg:flex-col lg:items-center">
                <div className="relative flex-shrink-0 lg:mb-4">
                  {index !== timelineSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 left-1/2 w-[calc(100%+3rem)] h-[2px] bg-slate-100 -translate-y-1/2 -z-10" />
                  )}
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white flex items-center justify-center text-xl font-bold text-[#2C3E50] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 ring-4 ring-white relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:border-[#00A99D]/30 group-hover:text-[#00A99D]">
                    {index + 1}
                  </div>
                </div>
                <div
                  className={`${step.cardGradient} flex-1 text-[#2C3E50] rounded-3xl p-6 sm:p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl border border-white/50 lg:text-center`}
                >
                  <h4 className="text-xl font-bold mb-3">{step.title}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed opacity-90">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="container mx-auto px-6 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden border border-[#00A99D]/25 bg-gradient-to-r from-[#E2F5F1] via-white to-[#FFF5E6]">
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#00A99D]/15 via-transparent to-[#F39C12]/15" />
            <div className="relative z-10 text-center space-y-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C3E50]">
                Ready to Build Something That Delivers Results?
              </h2>
              <p className="text-lg sm:text-xl max-w-2xl mx-auto text-slate-600">
                Tell us what you’re aiming for—AI consulting, automation, LLM assistants, research enablement, IPR support, or accreditation readiness. We’ll respond with a clear plan and next steps.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                <Link to="/contact" className="px-8 py-4 bg-[#2C3E50] text-white rounded-full font-bold transition-colors duration-300 w-full sm:w-auto hover:bg-gradient-to-r hover:from-[#00A99D] hover:to-[#2C3E50] text-center block sm:inline-block">
                  Talk to Our Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
