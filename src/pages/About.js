import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Target, Eye, Award, Users, Lightbulb, Heart, Rocket, GraduationCap, Landmark, ShieldCheck, Workflow, Linkedin } from "lucide-react";
import NagarajImage from "../images/nagaraj-new.jpg";
import CircularGallery from "./CircularGallery";
import ResourceHeroAnimation from "../components/ResourceHeroAnimation";
import eventHighlight from "../images/events/AI Strategy & Implementation.png";
import { API_BASE_URL } from "../lib/api";

const getImageUrl = (url) => {
  if (!url) return "";
  if (url.startsWith('http')) return url;
  return `${API_BASE_URL}/${url}`;
};

const useParallax = (value, distance) =>
  useTransform(value, [0, 1], [-distance, distance]);

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const leadershipRef = useRef(null);
  const valuesRef = useRef(null);
  const teamRef = useRef(null);
  const [showcases, setShowcases] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/showcases`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setShowcases(data);
      })
      .catch(err => console.error("Error fetching showcases:", err));
  }, []);

  const coreValues = [
    {
      title: "Engineering Excellence",
      description:
        "We build with strong engineering discipline—rigorous testing, clean architecture, and performance benchmarks. Every solution is designed to be scalable, secure, and deployment-ready.",
      shortText: "We build solutions that are production-ready, reliable, and measurable.",
      icon: Award,
      tagline: "RELENTLESS BENCHMARKS",
    },
    {
      title: "Technical Curiosity",
      description:
        "We explore new tools and research, validate ideas quickly, and apply what works—turning emerging technology into practical value.",
      shortText: "We keep learning, experimenting, and improving to deliver smarter solutions.",
      icon: Lightbulb,
      tagline: "INNOVATION IN MOTION",
    },
    {
      title: "Responsible Technology",
      description:
        "We prioritize data privacy, fairness, and security—building AI systems that teams can trust and maintain over time.",
      shortText: "We design AI that is safe, transparent, and aligned with real-world needs.",
      icon: Heart,
      tagline: "ETHICS AT THE CORE",
    },
    {
      title: "Open Collaboration",
      description:
        "We collaborate across teams—business, engineering, and research—so decisions stay aligned and delivery stays smooth.",
      shortText: "We work closely with clients and partners through clear communication and shared ownership.",
      icon: Users,
      tagline: "ECOSYSTEMS, NOT SILOS",
    },
  ];
  const companyTimeline = [
    {
      year: "2023",
      title: "Foundation in Research Enablement",
      description:
        "Began by supporting scholars and institutions with structured research workflows, academic writing guidance, and outcome-focused mentoring to improve research quality and consistency.",
      icon: GraduationCap,
    },
    {
      year: "2023 ",
      title: "Academic Excellence & Accreditation Support",
      description:
        "Expanded into institutional enablement—building evidence systems and support frameworks aligned to NAAC, NBA, NIRF, QS, and ARIIA for smoother documentation and readiness.",
      icon: Landmark,
    },
    {
      year: "2024",
      title: "Tech Transformation",
      description:
        "Evolved into full-scale AI and technology delivery—adding AI consulting, web platforms, integrations, and automation solutions for startups and enterprises.",
      icon: ShieldCheck,
    },
    {
      year: "2025",
      title: "Production AI Infrastructure",
      description:
        "Implemented production standards with CI/CD, monitoring, and secure deployment practices—helping teams ship reliable AI solutions with measurable performance.",
      icon: Lightbulb,
    },
    {
      year: "2026",
      title: "AI Research & Experimentation Hubs",
      description:
        "Established innovation environments for prototyping and experimentation—LLM assistants, computer vision pilots, and rapid validation workflows for real use cases.",
      icon: Workflow,
    },
    {
      year: "2026 ",
      title: "Strategic Ecosystem Building",
      description:
        "Strengthened partnerships across startups, institutions, and industry—creating collaboration pathways for innovation programs, product development, and knowledge sharing.",
      icon: Target,
    },
    {
      year: "2026  ",
      title: "Multi-Region Operations",
      description:
        "Scaled delivery across locations with consistent processes—enabling faster support, localized engagement, and reliable execution across programs and projects.",
      icon: Award,
    },
    {
      year: "2027",
      title: "The Future of Intelligent Systems",
      description:
        "Advancing next-gen AI capabilities—responsible LLM adoption, intelligent automation, scalable platforms, and reusable playbooks that help organizations grow with confidence.",
      icon: Rocket,
    },
  ];

  const fallbackEventGallery = [
    { image: eventHighlight, text: "AI Strategy Lab" },
    { image: eventHighlight, text: "Innovation Pods" },
    { image: eventHighlight, text: "Founder Sprint" },
    { image: eventHighlight, text: "Research Ops Studio" },
  ];

  const eventGalleryPool = (() => {
    try {
      const context = require.context("../event-gallery", false, /\.(png|jpe?g|webp)$/i);
      return context.keys().map((key, index) => {
        const src = context(key);
        const labelSeed = key.replace("./", "").replace(/\.[^.]+$/, "");
        const normalised =
          labelSeed.replace(/[_-]+/g, " ").trim().length > 1
            ? labelSeed
              .replace(/[_-]+/g, " ")
              .replace(/\b\w/g, (char) => char.toUpperCase())
            : `Event Highlight ${index + 1}`;
        return { image: src, text: normalised };
      });
    } catch (error) {
      console.warn("Event gallery assets missing, using fallback.", error);
      return [];
    }
  })();

  const galleryItems = useMemo(() => {
    if (showcases.length > 0) {
      return showcases.map(s => ({
        image: getImageUrl(s.logoUrl),
        text: s.name
      }));
    }
    return eventGalleryPool.length > 0 ? eventGalleryPool : fallbackEventGallery;
  }, [showcases, eventGalleryPool, fallbackEventGallery]);

  /*
  const { scrollYProgress: leadershipSectionProgress } = useScroll({
    target: leadershipRef,
    offset: ["start end", "end start"],
  });
  */
  /* 
  const leadershipProgressSpring = useSpring(leadershipSectionProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  });
  const leadershipProgressOpacity = useTransform(
    leadershipSectionProgress,
    [0, 0.1, 0.9, 1],
    [0, 1, 1, 0]
  );
  */

  // Note: leadershipProgressSpring and leadershipProgressOpacity are available for future scroll animations if needed


  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-hero", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      });







      gsap.from(".leader-card", {
        scrollTrigger: {
          trigger: leadershipRef.current,
          start: "top 75%",
        },
        opacity: 0,
        y: 60,
        rotateX: -15,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });

      gsap.utils.toArray(".team-stat__value").forEach((el) => {
        const target = Number(el.dataset.value || 0);
        const suffix = el.dataset.suffix || "";
        const counter = { value: 0 };

        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(counter, {
              value: target,
              duration: 1.6,
              ease: "power3.out",
              onUpdate: () => {
                el.textContent = `${Math.round(counter.value)}${suffix}`;
              },
            });
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const leadershipTeam = [
    {
      name: "Dr. Nagaraj.V",
      role: "Managing Director",
      focus: "Strategic partnerships, global research alliances, and multi-year innovation programs.",
      quote:
        "I believe in empowering every partner with the playbooks and talent needed to compete on a global research stage.",
      accent: "from-[rgba(0,169,157,0.12)] to-[rgba(0,44,113,0.08)]",
      image: NagarajImage,
    },
  ];

  const teamStats = [
    {
      value: 50,
      suffix: "+",
      label: "Team Members",
      accent: "from-[rgba(0,169,157,0.15)] to-[rgba(0,44,113,0.08)]",
      textColor: "text-[rgba(0,44,113,0.9)]",
    },
    {
      value: 45,
      suffix: "+",
      label: "PhD & Research Experts",
      accent: "from-[rgba(0,44,113,0.12)] to-[rgba(94,88,88,0.08)]",
      textColor: "text-[rgba(0,169,157,0.95)]",
    },
    {
      value: 30,
      suffix: "+",
      label: "Specializations",
      accent: "from-[rgba(94,88,88,0.1)] to-[rgba(0,44,113,0.08)]",
      textColor: "text-[rgba(0,44,113,0.9)]",
    },
  ];

  /*
  const teamSpotlight = [
    {
      name: "Dr. Nagaraj V.",
      title: "Managing Director",
      summary:
        "Engineers evidence-backed transformation playbooks and multi-year research partnerships for universities across India and the Middle East.",
      image: NagarajImage
    },
    {
      name: "Harish Kumar",
      title: "Lead, AI Platforms",
      summary:
        "Turns lab-grade models into reliable services. Builds secure data pipelines, evaluation harnesses, and rapid-deployment workflows.",
      image: "https://images.unsplash.com/photo-1520367745676-234fdd6e9ff3?auto=format&fit=crop&w=640&q=80"
    },
    {
      name: "Neha Desai",
      title: "Principal, Research Enablement",
      summary:
        "Coaches faculty squads on publication strategy, grant orchestration, and accreditation storytelling with repeatable, tech-driven processes.",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=640&q=80"
    }
  ];
  */

  const getInitials = (name) =>
    name
      .split(" ")
      .map((chunk) => chunk[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  const ParallaxLeaderCard = ({ leader, index }) => {
    const cardRef = useRef(null);
    const { scrollYProgress } = useScroll({
      target: cardRef,
      offset: ["start end", "end start"],
    });
    const translateY = useParallax(scrollYProgress, 160);
    const badgeTranslate = useParallax(scrollYProgress, 220);
    const initials = getInitials(leader.name);
    const accentGradient = leader.accent
      ? `bg-gradient-to-br ${leader.accent}`
      : "bg-gradient-to-br from-[rgba(0,169,157,0.12)] to-[rgba(0,44,113,0.08)]";
    const focusPoints = (leader.focus ?? "")
      .split(/,|·|;/)
      .map((point) => point.trim())
      .filter(Boolean);

    const isManagingDirector = /managing\s+director/i.test(leader.role ?? "") || index === 0;

    if (isManagingDirector) {
      return (
        <section ref={cardRef} className="relative flex w-full justify-center px-3 py-10 sm:px-5">
          <motion.div
            style={{ y: translateY }}
            className="group relative w-full max-w-[360px] sm:max-w-[420px] text-white"
          >
            <div className="absolute inset-0 rounded-[34px] bg-gradient-to-br from-[#22d3ee] via-[#6366f1] to-transparent opacity-60 blur-3xl transition-opacity duration-500 group-hover:opacity-80" />
            <div className="relative overflow-hidden rounded-[34px] border border-white/15 bg-[rgba(4,14,35,0.85)] backdrop-blur-xl shadow-[0_35px_80px_-40px_rgba(37,99,235,0.6)]">
              <div className="absolute inset-x-10 top-20 h-48 rounded-full bg-gradient-to-br from-white/8 via-transparent to-transparent blur-3xl opacity-70" />
              <div className="relative px-10 pt-12 pb-6 text-center space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200/80">Visionary Leadership</p>
                <h3 className="text-3xl font-semibold leading-tight sm:text-[2.2rem]">{leader.name}</h3>
                <p className="text-sm font-medium uppercase tracking-[0.28em] text-white/60">{leader.role}</p>

              </div>

              <div className="relative mx-auto flex h-64 w-64 items-center justify-center rounded-[28px] border border-white/12 bg-gradient-to-tr from-white/5 via-transparent to-transparent shadow-[0_24px_60px_-30px_rgba(59,130,246,0.55)]">
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/85 via-transparent to-transparent opacity-85" />
                {leader.image ? (
                  <img
                    src={leader.image}
                    alt={`${leader.name} portrait`}
                    className="h-full w-full rounded-[24px] object-cover opacity-95 transition-transform duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-[24px] bg-[#0b1d39] text-5xl font-bold text-cyan-200">
                    {initials}
                  </div>
                )}
              </div>

              <div className="relative px-8 pt-10 pb-6 text-center">
                <p className="text-sm leading-relaxed text-white/75">
                  {leader.quote ??
                    "I believe in empowering every partner with the talent, playbooks, and technology to compete globally with confidence."}
                </p>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-[11px] uppercase tracking-[0.28em] text-white/45">
                  {(focusPoints.length ? focusPoints : ["Strategic Partnerships", "Global Alliances", "Innovation Programs"])
                    .slice(0, 3)
                    .map((point) => (
                      <span
                        key={point}
                        className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/10 px-4 py-2 text-white/70"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                        {point}
                      </span>
                    ))}
                </div>
              </div>

              <div className="relative mx-6 mb-6 rounded-3xl border border-white/10 bg-white/8 px-5 py-4 backdrop-blur-sm">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-white/10 bg-white/10">
                    {leader.image ? (
                      <img src={leader.image} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center text-lg font-semibold text-white/80">
                        {initials}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 text-left text-xs uppercase tracking-[0.24em] text-white/60 min-w-[200px]">
                    <span className="block font-semibold text-white/80">@truelineresearch</span>
                    <span className="text-white/40">Available for partnerships</span>
                  </div>
                  <div className="flex items-center gap-3">

                    <a
                      href="https://www.linkedin.com/in/nagaraj-varatharaj/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-full bg-[#0077b5] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.24em] text-white shadow-lg transition-transform duration-300 hover:scale-[1.05] hover:bg-[#008cc9]"
                    >
                      <Linkedin className="h-3.5 w-3.5" />
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      );
    }

    return (
      <section ref={cardRef} className="relative flex w-full justify-center px-3 py-8 sm:px-5 sm:py-10">
        <motion.div
          style={{ y: translateY }}
          className="group relative w-full max-w-[32rem] overflow-hidden rounded-[30px] border border-[rgba(0,44,113,0.12)] bg-white shadow-[0_35px_80px_-48px_rgba(0,44,113,0.55)] transition-transform duration-500 hover:-translate-y-3"
        >
          <div className={`absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${accentGradient}`} />
          <div className="absolute -left-24 top-16 h-44 w-44 rounded-full bg-[rgba(0,169,157,0.08)] blur-3xl" />
          <div className="absolute -right-24 -top-20 h-52 w-52 rounded-full bg-[rgba(0,44,113,0.08)] blur-3xl" />

          <div className="relative h-60 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,44,113,0.6)] via-transparent to-transparent opacity-80" />
            {leader.image ? (
              <img
                src={leader.image}
                alt={`${leader.name} portrait`}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[rgba(0,44,113,0.08)] text-4xl font-bold text-[rgba(0,44,113,0.85)]">
                {initials}
              </div>
            )}
            <div className="absolute bottom-5 left-5 flex items-center gap-3">
              <span className="rounded-full border border-white/40 bg-white/20 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-white backdrop-blur">
                Leadership
              </span>
              <span className="rounded-full border border-white/40 bg-white/20 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-white backdrop-blur">
                #{String(index + 1).padStart(2, "0")}
              </span>
            </div>
          </div>

          <div className="relative space-y-6 px-6 pb-9 pt-8 sm:px-8">
            <div className="flex flex-col gap-2 text-left">
              <h3 className="text-2xl font-semibold text-[rgba(0,44,113,0.95)] sm:text-3xl">{leader.name}</h3>
              <p className="text-sm font-semibold uppercase tracking-[0.26em] text-[rgba(94,88,88,0.65)]">
                {leader.role}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-[rgba(0,169,157,0.18)] bg-[rgba(0,169,157,0.05)] p-5 shadow-inner">
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[rgba(0,169,157,0.78)]">
                  Focus Themes
                </span>
                {focusPoints.length > 1 ? (
                  <ul className="mt-3 space-y-2 text-sm text-[rgba(0,44,113,0.75)]">
                    {focusPoints.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[rgba(0,169,157,0.85)]" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-sm leading-relaxed text-[rgba(0,44,113,0.75)]">
                    {leader.focus}
                  </p>
                )}
              </div>
              <div className="rounded-2xl border border-[rgba(0,44,113,0.12)] bg-white/70 p-5 shadow-[0_18px_40px_-32px_rgba(0,44,113,0.32)] backdrop-blur">
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[rgba(0,169,157,0.78)]">
                  Leadership Lens
                </span>
                <p className="mt-2 text-sm italic leading-relaxed text-[rgba(94,88,88,0.9)]">
                  "{leader.quote}"
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-[rgba(0,44,113,0.08)] bg-white/70 p-5">
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[rgba(0,44,113,0.65)]">
                Outlook
              </span>
              <p className="mt-2 text-sm leading-relaxed text-[rgba(0,44,113,0.78)]">
                {leader.summary ??
                  "Guides teams with evidence-driven playbooks, aligning technology, talent, and governance for sustainable impact."}
              </p>
            </div>
          </div>
        </motion.div>
        <motion.span
          style={{ y: badgeTranslate }}
          className="pointer-events-none absolute -left-4 top-1/2 hidden -translate-y-1/2 text-6xl font-semibold uppercase tracking-[0.3em] text-[rgba(0,169,157,0.1)] xl:block"
        >
          {leader.name.split(" ")[0]}
        </motion.span>
      </section>
    );
  };

  return (
    <div className="pt-0">
      <section
        className="relative overflow-hidden py-20 text-white"
        style={{ background: "linear-gradient(135deg, #00A99D 6%, #2C3E50 88%)" }}
      >
        <ResourceHeroAnimation />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-[#001c30]/40" />
        <div className="relative container mx-auto px-6">
          <div className="about-hero max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold">About Trueline Research</h1>
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed">
              A Legacy of Tech Innovation and AI Excellence spanning over 5 years.
            </p>
          </div>
        </div>
      </section>

      <section
        ref={heroRef}
        className="py-20"
        style={{ backgroundColor: "#F7F9FA" }}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="prose prose-lg max-w-none mb-16 text-[#2C3E50]">
              <p className="text-xl leading-relaxed">
                Trueline Research Private Limited delivers AI solutions for real business impact. We partner with startups and corporates to build and deploy LLM assistants, CRM automation, analytics, and AI-enabled web platforms that sharpen decisions and accelerate execution.We also support higher-education and research ecosystems through innovation enablement, structured guidance, and milestone-based delivery—helping teams move from ideas to measurable outcomes.
              </p>
              

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="mission-card rounded-2xl border border-[#00A99D]/30 bg-white/75 p-8 shadow-[0_22px_48px_-30px_rgba(44,62,80,0.55)] backdrop-blur">
                <Target className="w-12 h-12 text-[#00A99D] mb-4" />
                <h3 className="text-2xl font-bold text-[#2C3E50] mb-4">Our Mission</h3>
                <p className="text-[#2C3E50]/80 leading-relaxed">
                  To empower startups, corporates, and institutions with practical AI and research enablement—by delivering clear strategy, reliable solutions, and hands-on support that improves productivity, accelerates innovation, and creates measurable outcomes.
                </p>
              </div>

              <div className="mission-card rounded-2xl border border-[#00A99D]/30 bg-white/75 p-8 shadow-[0_22px_48px_-30px_rgba(44,62,80,0.55)] backdrop-blur">
                <Eye className="w-12 h-12 text-[#00A99D] mb-4" />
                <h3 className="text-2xl font-bold text-[#2C3E50] mb-4">Our Vision</h3>
                <p className="text-[#2C3E50]/80 leading-relaxed">
                  To be a trusted partner for AI-led growth and research excellence—building an ecosystem where organizations can adopt responsible AI, scale digital capabilities, protect innovation, and transform ideas into real-world impact.
                </p>
              </div>
            </div>
          </div>
        </div>

      </section>


      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-12 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/60 mb-3">
              INSTITUTIONAL SHOWCASE
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Snapshots From Our Tech & Innovation Collaborations</h2>
            <p className="text-lg text-white/70">
              Explore real moments from our work with startups, innovation labs, and tech enterprises—highlighting AI implementation sprints, infrastructure optimization
              projects, platform deployments, and digital transformation initiatives.
            </p>
          </div>
          <div className="relative h-[600px] rounded-[32px] border border-white/10 bg-white/5 p-2 shadow-[0_40px_120px_-50px_rgba(15,23,42,0.8)]">
            <div className="absolute inset-0 rounded-[28px] overflow-hidden">
              <CircularGallery items={galleryItems} bend={0} textColor="#ffffff" borderRadius={0.05} scrollEase={0.02} />
            </div>
          </div>
        </div>
      </section>

      <section
        ref={leadershipRef}
        className="relative overflow-hidden py-28"
        style={{
          background:
            "radial-gradient(circle at top, rgba(14,116,204,0.16) 0%, transparent 45%), radial-gradient(circle at bottom, rgba(16,185,129,0.16) 0%, transparent 40%), #e9f1fb",
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width%3D%22700%22 height%3D%22700%22 viewBox%3D%220 0 700 700%22 fill%3D%22none%22 xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cpath opacity%3D%220.04%22 d%3D%22M0 350C0 156.25 156.25 0 350 0C543.75 0 700 156.25 700 350C700 543.75 543.75 700 350 700C156.25 700 0 543.75 0 350Z%22 fill%3D%22%23ffffff%22/%3E%3C/svg%3E')] bg-center bg-no-repeat opacity-80" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(59,130,246,0.18),transparent_55%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_80%,rgba(16,185,129,0.18),transparent_60%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-[-45%] h-[520px] bg-[radial-gradient(circle,rgba(45,212,191,0.12),transparent_65%)] blur-[160px]" />

        <div className="relative mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
          <span className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/60 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.34em] text-[#113865] shadow-sm backdrop-blur">
            Our Leadership Team
          </span>
          <h2 className="mt-6 text-4xl font-semibold text-[#0e2642] sm:text-5xl">
            Engineering the Future Through Visionary Leadership
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#314867]">
            Leaders who cultivate technical excellence and AI-enabled transformation—partnering with startups,
            universities, and industries to scale bold ideas into measurable impact.
          </p>
          <div className="mt-20 flex w-full flex-col items-center gap-16">
            {leadershipTeam.map((leader, index) => (
              <ParallaxLeaderCard key={leader.name} leader={leader} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section
        ref={valuesRef}
        className="py-20"
        style={{ background: "linear-gradient(145deg, #F4FBFA 0%, #FFFFFF 75%)" }}
      >
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-[#2C3E50] mb-4">Our Core Values</h2>
          <p className="text-xl text-[#2C3E50]/75 text-center mb-12 max-w-3xl mx-auto">
            Principles that shape our technology, innovation, and collaborations.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {coreValues.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="value-card group relative outline-none"
                  tabIndex={0}
                  role="button"
                  aria-label={`Learn more about our ${value.title} value`}
                >
                  <div className="relative h-full w-full [transform-style:preserve-3d] transition-transform duration-[900ms] ease-out group-hover:[transform:rotateY(180deg)] focus-within:[transform:rotateY(180deg)]">
                    <div className="relative flex h-full flex-col items-center justify-start gap-6 rounded-[28px] bg-white/55 px-8 py-12 text-center shadow-[0_30px_60px_-28px_rgba(44,62,80,0.45)] backdrop-blur-lg border border-white/40 [backface-visibility:hidden]">
                      <div className="relative inline-flex h-24 w-24 items-center justify-center">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#2C3E50]/30 to-[#00A99D]/20 blur-2xl opacity-70" />
                        <div className="absolute -inset-3 rounded-full border border-[#00A99D]/45 opacity-60 animate-ping" />
                        <div className="relative z-10 inline-flex h-24 w-24 items-center justify-center rounded-full bg-[#2C3E50] shadow-[0_0_35px_rgba(0,169,157,0.35)] ring-4 ring-[#F39C12]/15">
                          <Icon className="h-10 w-10 text-white" />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-2xl font-semibold text-[#2C3E50] tracking-tight">{value.title}</h3>
                        <p className="text-xs uppercase tracking-[0.25em] text-[#00A99D] font-bold">
                          {value.tagline}
                        </p>
                        <p className="text-sm text-[#2C3E50]/80 leading-relaxed px-2">
                          {value.shortText}
                        </p>
                      </div>
                    </div>
                    <div className="absolute inset-0 flex h-full flex-col justify-center gap-4 rounded-[28px] bg-gradient-to-br from-[#2C3E50]/95 to-[#00A99D]/90 px-6 py-8 text-center text-white shadow-[0_36px_80px_-34px_rgba(44,62,80,0.75)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
                      <span className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
                        Core Value
                      </span>
                      <h3 className="text-2xl font-semibold tracking-tight ">{value.title}</h3>
                      <p className="text-base leading-relaxed text-white/95">{value.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#2C3E50]/60 mb-3">
              Milestones
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#2C3E50] mb-4">
              Our Journey So Far
            </h2>
            <p className="text-lg text-[#2C3E50]/80 leading-relaxed">
              Every chapter sharpened our craft—from startup agility to AI-enabled intelligent operations.
            </p>
          </div>
          <div className="relative mx-auto max-w-5xl">
            <div className="absolute left-[28px] top-0 bottom-0 hidden bg-gradient-to-b from-[#00A99D]/20 via-[#2C3E50]/35 to-[#00A99D]/20 md:block w-[3px]" />
            <div className="space-y-8 md:space-y-12">
              {companyTimeline.map((entry, index) => {
                const Icon = entry.icon;
                const alignRight = index % 2 === 1;
                return (
                  <div
                    key={entry.year}
                    className={`relative flex flex-col gap-6 md:flex-row ${alignRight ? "md:flex-row-reverse" : ""}`}
                  >
                    <div className="md:w-1/2">
                      <div
                        className="relative rounded-3xl border border-[#00A99D]/25 bg-white/75 p-8 shadow-[0_26px_50px_-30px_rgba(44,62,80,0.45)] backdrop-blur-md transition-shadow duration-300 hover:shadow-[0_36px_70px_-32px_rgba(44,62,80,0.55)]"
                      >
                        <div className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#00A99D]">
                          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#2C3E50] text-white shadow-lg ring-4 ring-[#F39C12]/20">
                            <Icon className="h-5 w-5" />
                          </span>
                          {entry.year}
                        </div>
                        <h3 className="text-2xl font-semibold text-[#2C3E50] mb-3">{entry.title}</h3>
                        <p className="text-[#2C3E50]/80 leading-relaxed">{entry.description}</p>
                      </div>
                    </div>
                    <div className="hidden md:flex md:w-1/2 md:items-center md:justify-center">
                      <div className="relative w-full max-w-sm rounded-3xl border border-dashed border-[#2C3E50]/25 px-6 py-8 text-center text-sm uppercase tracking-[0.32em] text-[#2C3E50]/35">
                        <span className="block text-base tracking-[0.42em] text-[#F39C12]/70">0{index + 1}</span>
                        Milestone
                        <div className="pointer-events-none absolute inset-2 rounded-3xl bg-gradient-to-r from-[#2C3E50]/4 to-[#00A99D]/6 blur-[40px]" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section ref={teamRef} className="py-20" style={{ backgroundColor: "#F7F9FA" }}>
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-[#2C3E50] mb-4">Our Team</h2>
            <p className="text-xl text-[#2C3E50]/80 text-center mb-12">
              A multidisciplinary team delivering research, AI, and technology solutions.
            </p>
            <div className="team-stat-row grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
              {teamStats.map((stat) => (
                <div
                  key={stat.label}
                  className={`team-stat flex w-full max-w-[220px] flex-col items-center justify-center rounded-2xl border border-[#00A99D]/25 bg-white/85 px-6 py-6 text-[#2C3E50] shadow-[0_16px_38px_-26px_rgba(44,62,80,0.45)] backdrop-blur-sm sm:max-w-xs lg:py-7`}
                >
                  <div
                    className={`team-stat__value text-4xl font-bold ${stat.textColor} sm:text-5xl`}
                    data-value={stat.value}
                    data-suffix={stat.suffix}
                  >
                    0{stat.suffix}
                  </div>
                  <div className="mt-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#2C3E50]/70 sm:text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: "#F7F9FA" }}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-[#2C3E50] mb-6">Build the Next Wave of AI Solutions</h2>
            <h2 className="text-2xl font-semibold text-[#2C3E50] mb-4">Join builders who turn research and ideas into production-ready systems.</h2>
            <p className="text-xl text-[#2C3E50]/80 mb-10 leading-relaxed">
              At Trueline Research, you’ll work on real AI projects—LLM assistants, workflow automation, analytics, AI-enabled web platforms, and research enablement. Collaborate with engineers, analysts, and domain experts to deliver secure, scalable solutions with measurable outcomes.
            </p>
            <button
              type="button"
              onClick={() => navigate("/careers")}
              className="px-8 py-4 rounded-lg font-semibold text-white transition-transform duration-300 hover:scale-105 shadow-[0_18px_36px_-22px_rgba(44,62,80,0.55)]"
              style={{ background: "linear-gradient(135deg, #00A99D 0%, #F39C12 100%)" }}
            >
              Explore Careers
            </button>
          </div>
        </div>
      </section>


    </div>
  );
}









