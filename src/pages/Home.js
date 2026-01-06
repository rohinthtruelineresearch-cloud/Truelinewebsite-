import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RotatingText from "../components/reactbits/RotatingText";
import {
  ArrowRight,
  TrendingUp,
  Users,
  Award,
  Zap,
  Cpu,
  Atom,
  Globe,
  Shield,
  LineChart,
  Target,
  Database,
  Layers,
  FileText,
  BarChart,
  CircuitBoard
} from "lucide-react";
import kavitha from "../images/kavitha.jpg";
import HeroStarfield from "../components/HeroStarfield";
import CountUp from "./CountUp";
import eventHighlight from "../images/events/AI Strategy & Implementation.png";
import imgAiStrategy from "../images/excellence_strategy.jpg";
import imgNextGenPlatform from "../images/platform_nextgen.jpg";
import imgSecurityFabric from "../images/security_fabric.png";
import imgAccreditationSupport from "../images/evidence_compliance.jpg";
import imgResearchInnovation from "../images/innovation_lab.jpg";
import imgImpactEcosystem from "../images/acceleration_venture.jpg";
import imgStartupEcosystem from "../images/acceleration_venture.jpg";

const FALLBACK_EVENT_GALLERY = [
  {
    src: eventHighlight,
    caption: "AI Strategy Lab — Bengaluru",
    meta: "Leaders prototyping next-gen governance playbooks",
  },
  {
    src: eventHighlight,
    caption: "Founder Sprint — Coimbatore",
    meta: "Startup pods refining go-to-market and investor decks",
  },
  {
    src: eventHighlight,
    caption: "Research Ops Studio — Hyderabad",
    meta: "Faculty cohorts aligning accreditation evidence stacks",
  },
  {
    src: eventHighlight,
    caption: "Innovation Clinic — Chennai",
    meta: "Product squads co-building AI service blueprints",
  },
];

const EVENT_GALLERY_POOL = (() => {
  try {
    const context = require.context("../event-gallery", false, /\.(png|jpe?g|webp)$/i);
    return context.keys().map((key) => {
      const src = context(key);
      const cleaned = key.replace("./", "").replace(/\.[^.]+$/, "");
      const caption = cleaned
        .replace(/[_-]+/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
      return { src, caption };
    });
  } catch (error) {
    console.warn("Event gallery images not found, using fallback.", error);
    return [];
  }
})();

const EVENT_META_VARIANTS = [
  "Hands-on cohorts scaling production AI workflows",
  "Curriculum pods mapping accreditation-ready outcomes",
  "Rapid prototyping sprints with Trueline engineers",
  "Industry mentors driving commercialization journeys",
  "Live architecture clinics and capability roadmaps",
  "Immersive sessions de-risking AI governance rollouts",
];
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const navigate = useNavigate();
  const heroRef = useRef(null);

  const statsRef = useRef(null);
  const featuresRef = useRef(null);
  const marqueeRefs = useRef([]);
  const marqueeTweensRef = useRef([]);
  const eventGalleryRef = useRef(null);

  const heroGeoElements = useMemo(
    () =>
      Array.from({ length: 14 }, (_, idx) => {
        const isLine = Math.random() > 0.5;
        return {
          id: idx,
          isLine,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: isLine ? `${80 + Math.random() * 120}px` : `${6 + Math.random() * 10}px`,
          height: isLine ? `${1 + Math.random() * 2}px` : `${6 + Math.random() * 10}px`,
          rotation: isLine ? Math.random() * 360 : 0,
          delay: Math.random() * 2,
        };
      }),
    [],
  );

  // --- OPTIONAL: import local images (uncomment & replace with your paths) ---
  // import kavithaImg from "../assets/testimonials/kavitha.jpg";
  // import arunImg from "../assets/testimonials/arun.jpg";
  // import meeraImg from "../assets/testimonials/meera.jpg";
  // import sahanaImg from "../assets/testimonials/sahana.jpg";
  // import rahulImg from "../assets/testimonials/rahul.jpg";
  // import srinivasImg from "../assets/testimonials/srinivas.jpg";

  // --- Testimonials data (add img: <local import or URL>) ---
  const testimonials = [
    {
      name: "Vikram Singh",
      role: "Professor, ECE",
      quote:
        "Trueline's AI platform cut our model deployment time from weeks to 48 hours. Game-changing infrastructure.",
      img: kavitha,
    },
    {
      name: "Dr. Anjali Desai",
      role: "CTO",
      quote:
        "The AI strategy roadmap helped us secure our Series A. The technical due diligence was a breeze thanks to the documentation standards.",
    },
    {
      name: "Prof. Rajesh Kumar",
      role: "Dean of Innovation",
      quote:
        "We reduced our patent filing time by 40% using their prior-art search workflows. Essential for our R&D output.",
    },
    {
      name: "Arjun Mehta",
      role: "Director of Engineering",
      quote:
        "From raw data to a deployed RAG agent in 4 weeks. The MLOps architecture is robust and scales effortlessly.",
    },
    {
      name: "Dr. Priya V.",
      role: "Professor, Computer Science",
      quote:
        "The manuscript support pods are incredible. My team published three Q1 journal papers in a single semester with their guidance.",
    },
    {
      name: "Ramesh Krishnan",
      role: "VP of Engineering",
      quote:
        "Implementing the governance framework was daunting until we used their gap analysis blueprints. We are now audit-ready.",
    },
    {
      name: "Dr. Meena Iyer",
      role: "IQAC Director",
      quote:
        "The accreditation evidence stack saved us hundreds of hours during our NAAC visit. Every artifact was traceable and organized.",
    },
    {
      name: "Prof. Amit Patel",
      role: "Director, Centre of Excellence",
      quote:
        "Finally, a partner that understands both deep tech and academic nuance. The IP commercialization support was world-class.",
    },
    {
      name: "Karthik R.",
      role: "Founder",
      quote:
        "Their MSME scaling playbook gave us the operational clarity we needed to expand into two new markets this year.",
    },
    {
      name: "Dr. Sunita Rao",
      role: "Head of Research Ops",
      quote:
        "Weekly governance pods kept our publication, IP, and analytics workstreams synchronized. We typically lack this visibility.",
    },
    {
      name: "Suresh Gupta",
      role: "Program Manager, AI Center",
      quote:
        "LLM-assisted workflows shaved weeks off our patent claims drafting. The blend of automation and expert review is perfect.",
    },
    {
      name: "Anitha Paul",
      role: "FDP Coordinator",
      quote:
        "Faculty appreciated how every workshop delivered tangible artefacts—code, models, and papers—not just theoretical slides.",
    },
    {
      name: "Ravi Shankar",
      role: "CEO",
      quote:
        "Trueline's ethical AI framework helped us navigate complex deployment challenges in the public sector with confidence.",
    },
    {
      name: "Dr. Kavita M.",
      role: "HoD, Electronics",
      quote:
        "Simulation support and data validation tightened our results significantly. We now have a repeatable publication pipeline.",
    },
    {
      name: "Rahul Verma",
      role: "IQAC Coordinator",
      quote:
        "Evidence packs for NIRF were crisp and traceable. The dashboard analytics impressed our internal review panel.",
    },
  ];



  // Icon Mapping for dynamic resources
  const iconMap = {
    'Shield': Shield,
    'FileText': FileText,
    'Zap': Zap,
    'BarChart': BarChart,
    'Users': Users,
    'Globe': Globe,
    'Database': Database,
    'CircuitBoard': CircuitBoard,
    'Layers': Layers,
    'Cpu': Cpu,
    'LineChart': LineChart,
    'Target': Target
  };

  const [learningResources] = useState([
    {
      id: "cv-systems",
      type: "GUIDE",
      title: "Computer Vision Systems",
      description: "End-to-end CV pipeline design—from real-time inference to edge deployment for production environments.",
      iconName: "CircuitBoard"
    },
    {
      id: "mlops-pipeline",
      type: "GUIDE",
      title: "MLOps Pipeline Architecture",
      description: "Build automated ML workflows from data ingestion to model deployment with CI/CD integration and monitoring.",
      iconName: "Database"
    },
    {
      id: "ai-platform",
      type: "BLUEPRINT",
      title: "Next-Gen AI Platform Architecture",
      description: "Technical reference architecture for building secure, scalable, and reproducible AI systems on hybrid cloud environments.",
      iconName: "Globe"
    },
    {
      id: "msme-playbook",
      type: "PLAYBOOK",
      title: "MSME Scale-up Playbook",
      description: "Strategic roadmap for small and medium enterprises to adopt AI automation and scale operations for global competition.",
      iconName: "Users"
    },
    {
      id: "accreditation-stack",
      type: "BLUEPRINT",
      title: "Accreditation Evidence Stack Blueprint",
      description: "Architecture for organizing institutional data and artifacts into audit-ready evidence packs for NBA, NAAC, and NIRF.",
      iconName: "BarChart"
    },
    {
      id: "patent-template",
      type: "TEMPLATE",
      title: "Patent Disclosure Template",
      description: "Standardized disclosure form to streamline prior-art searches and patent drafting between inventors and IP attorneys.",
      iconName: "Shield"
    },
    {
      id: "manuscript-framework",
      type: "GUIDE",
      title: "Manuscript Acceptance Framework",
      description: "A technical guide on structuring research papers, handling reviewer feedback, and selecting high-impact journals.",
      iconName: "FileText"
    },
    {
      id: "ai-strategy-playbook",
      type: "PLAYBOOK",
      title: "AI Strategy Implementation Playbook",
      description: "A comprehensive toolkit for organizations to map, prioritize, and execute production AI initiatives with measurable outcomes.",
      iconName: "Zap"
    }
  ]);

  const excellenceFeatures = [
    {
      context: "STRATEGY",
      title: "AI Consulting & Advisory Services",
      description:
        "Customized AI strategies aligned with institutional and enterprise goals to drive digital transformation, operational efficiency, and sustainable growth.",
      highlights: [
        "Executive-ready AI adoption roadmaps",
        "Tech stack optimization & architecture design",
      ],
      accent: "#22D3EE",
      ctaLabel: "Discover Our Approach",
      href: "/services",
      image: imgAiStrategy,
      cardAccent: "#0E2D47",
    },
    {
      context: "VENTURE",
      title: "Trueline Venture Studio",
      description:
        "We enable students, innovators, and early-stage founders to transform ideas into validated, market-ready ventures through AI-powered prototyping, mentorship, incubation, and ecosystem support.",
      highlights: [
        "Turn students’ startup ideas from institutes and universities into validated concepts",
        "Build AI-powered prototypes for rapid market-ready startup launch",
      ],
      accent: "#38BDF8",
      ctaLabel: "View Outcomes",
      href: "/services",
      image: imgImpactEcosystem,
      cardAccent: "#0B2745",
    },
    {
      context: "PLATFORM",
      title: "QuantumLeap AI Suite",
      description:
        "Enterprise-grade software platforms for real-time data streaming, autonomous AI agents, and intelligent applications across research and industry.",
      highlights: [
        "MLOps pipeline & model registry",
        "Enterprise-grade orchestration & monitoring",
      ],
      accent: "#8B5CF6",
      ctaLabel: "Explore the Suite",
      href: "/products",
      image: imgNextGenPlatform,
      cardAccent: "#14264B",
    },
    {
      context: "COMPLIANCE",
      title: "Accreditation & Ranking Support",
      description:
        "End-to-end support to meet accreditation standards and enhance institutional rankings through structured compliance and evidence-driven outcomes across NAAC, NBA, NIRF, ARIIA, QS, and ISO.",
      highlights: [
        "Evidence vaults & reviewer journeys",
        "Leadership dashboards & diagnostics",
      ],
      accent: "#34D399",
      ctaLabel: "Learn About Our Standards",
      href: "/services",
      image: imgAccreditationSupport,
      cardAccent: "#10353A",
    },
    {
      context: "PROTECTION",
      title: "IPR Consulting",
      description:
        "Strategic intellectual property advisory to protect innovation, strengthen valuation, and ensure regulatory compliance across the full IP lifecycle.",
      highlights: [
        "Patent filing & prior art search",
        "IP valuation & commercialization advisory",
      ],
      accent: "#0EA5E9",
      ctaLabel: "Secure Your Innovation",
      href: "/ipr-patents",
      image: imgSecurityFabric,
      cardAccent: "#031225",
    },
    {
      context: "INNOVATION",
      title: "AI Research & Innovation Labs",
      description:
        "End-to-end AI research infrastructure enabling advanced experimentation, applied research, and accelerated innovation for academia and industry.",
      highlights: [
        "Generative AI & LLM experimentation",
        "Computer vision & NLP sandboxes",
      ],
      accent: "#F59E0B",
      ctaLabel: "See Our Research Model",
      href: "/services",
      image: imgResearchInnovation,
      cardAccent: "#2C1F08",
    },
    {
      context: "GROWTH",
      title: "Startup & MSME Ecosystem Enabler",
      description:
        "AI-driven incubation and ecosystem support to accelerate ideation, validation, and scalable market entry for startups and MSMEs.",
      highlights: [
        "Product-market fit validation frameworks",
        "Investor matchmaking & pitch optimization",
      ],
      accent: "#F472B6",
      ctaLabel: "Join Our Ecosystem",
      href: "/services",
      image: imgStartupEcosystem,
      cardAccent: "#31122B",
    },
  ];

  // Static fallback data
  const staticEvents = [
    {
      _id: "vibathon-2025",
      tag: "HACKATHON",
      title: "VIBATHON 2025 - K.S.R College of Engineering (Autonomous)",
      description:
        "A large-scale AI-based hackathon where innovation met real-world implementation. Students built socially impactful AI & IoT solutions through live prototyping and industry evaluation.",
      date: "September 26, 2025 · Emerald Hall, Tamil Nadu",
      accent: "#8B5CF6",
    },
    {
      _id: "d2c-connect-2024",
      tag: "SUMMIT & EXPO",
      title: "D2C.CONNECT 2024",
      description:
        "South India’s largest D2C ecosystem gathering bringing together founders, marketers, innovators, and investors to shape the future of direct-to-consumer brands.",
      date: "30 Nov 2024 · Le Meridien, Coimbatore",
      accent: "#F472B6",
    },
    {
      _id: "genai-connect",
      tag: "GENAI EVENT",
      title: "GenAI.Connect Summit & Expo",
      description:
        "Where AI startups, entrepreneurs, and industry leaders came together for inspiring pitches, product launches, and meaningful collaborations.",
      date: "April 27, 2024 · Salem",
      accent: "#22D3EE",
    },
  ];

  const [featuredEvents, setFeaturedEvents] = useState(staticEvents);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL || 'https://truelinewebsite-server.onrender.com'}/api/events`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          // Take only the latest 3 events
          setFeaturedEvents(data.slice(0, 3));
        }
      })
      .catch(err => console.error("Failed to fetch events:", err));
  }, []);

  const eventGallery = useMemo(() => {
    const basePool = EVENT_GALLERY_POOL.length ? EVENT_GALLERY_POOL : FALLBACK_EVENT_GALLERY;
    const desiredCount = basePool.length ? Math.min(basePool.length, 8) : FALLBACK_EVENT_GALLERY.length;
    const shuffledPool = [...basePool].sort(() => Math.random() - 0.5);
    const selection = shuffledPool.slice(0, desiredCount);

    // If the pool is still smaller than desired (e.g., <4), loop through again to avoid empty slots.
    while (selection.length < Math.max(4, desiredCount) && basePool.length) {
      selection.push(
        ...basePool.slice(0, Math.min(basePool.length, Math.max(4, desiredCount) - selection.length)),
      );
    }

    return selection.map((item, index) => ({
      src: item.src,
      caption: item.caption ?? FALLBACK_EVENT_GALLERY[index % FALLBACK_EVENT_GALLERY.length].caption,
      meta:
        item.meta ??
        EVENT_META_VARIANTS[(index + Math.floor(Math.random() * EVENT_META_VARIANTS.length)) % EVENT_META_VARIANTS.length],
    }));
  }, []);

  const [selectedResource, setSelectedResource] = useState(null);
  const closeResource = () => setSelectedResource(null);

  // ===== Testimonial card with image + fallback =====
  const TestimonialCard = ({ name, role, quote }) => (
    <div className="flex-shrink-0 w-[min(20rem,80vw)] sm:w-80 text-center rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
      <p className="text-slate-700 leading-relaxed italic">"{quote}"</p>
      <div className="mt-6 flex flex-col items-center gap-2">
        <div className="font-semibold text-slate-900">{name}</div>
        <div className="text-sm text-slate-500">{role}</div>
      </div>
    </div>
  );

  const registerMarquee = (index) => (el) => {
    marqueeRefs.current[index] = el;
  };

  // Floating icons animation
  useEffect(() => {
    let iconTweens = [];
    let icons = [];

    const parseValue = (value, fallback) => {
      const parsed = parseFloat(value);
      return Number.isFinite(parsed) ? parsed : fallback;
    };

    const layoutIcons = () => {
      if (!icons.length) return;

      iconTweens.forEach((tween) => tween.kill());
      iconTweens = [];

      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      const rangeX = isMobile ? [8, 14] : [36, 64];
      const rangeY = isMobile ? [12, 20] : [32, 60];

      icons.forEach((icon) => {
        const dataset = icon.dataset ?? {};

        const desktopX = parseValue(dataset.desktopX, 0);
        const desktopY = parseValue(dataset.desktopY, 0);
        const mobileX = parseValue(
          dataset.mobileX ?? dataset.desktopX,
          desktopX * 0.55
        );
        const mobileY = parseValue(
          dataset.mobileY ?? dataset.desktopY,
          desktopY * 0.55
        );
        const desktopScale = parseValue(dataset.desktopScale, 1);
        const mobileScale = parseValue(
          dataset.mobileScale ?? dataset.desktopScale,
          0.75
        );

        const baseX = isMobile ? mobileX : desktopX;
        const baseY = isMobile ? mobileY : desktopY;
        const scale = isMobile ? mobileScale : desktopScale;

        gsap.set(icon, { x: baseX, y: baseY, scale });

        const deltaX =
          gsap.utils.random(rangeX[0], rangeX[1]) *
          (Math.random() > 0.5 ? 1 : -1);
        const deltaY =
          gsap.utils.random(rangeY[0], rangeY[1]) *
          (Math.random() > 0.5 ? 1 : -1);
        const duration = gsap.utils.random(3.5, 5.5);
        const delay = gsap.utils.random(0, 1.8);

        iconTweens.push(
          gsap.to(icon, {
            x: baseX + deltaX,
            y: baseY + deltaY,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            duration,
            delay,
          })
        );
      });
    };

    const handleResize = () => layoutIcons();

    const ctx = gsap.context(() => {
      icons = gsap.utils.toArray(".floating-icon");
      layoutIcons();
      window.addEventListener("resize", handleResize);

      gsap.utils.toArray(".hero-geo__item").forEach((item) => {
        const delay = Number(item.dataset.delay ?? 0);
        gsap.set(item, { opacity: 0, y: "+=12" });
        gsap.to(item, {
          opacity: 0.35,
          y: "-=18",
          duration: gsap.utils.random(6, 10),
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay,
        });
      });
    }, heroRef);

    return () => {
      iconTweens.forEach((tween) => tween.kill());
      window.removeEventListener("resize", handleResize);
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const rows = marqueeRefs.current.filter(Boolean);
    if (!rows.length) return;

    const tweens = rows.map((row, idx) => {
      const direction = idx % 2 === 0 ? -1 : 1;
      const width = row.scrollWidth / 2;
      return gsap.fromTo(
        row,
        { x: 0 },
        {
          x: direction * width,
          duration: Math.max(width / 80, 8),
          ease: "none",
          repeat: -1,
        }
      );
    });

    marqueeTweensRef.current = tweens;

    const handleResize = () => {
      rows.forEach((row, idx) => {
        const tween = tweens[idx];
        const direction = idx % 2 === 0 ? -1 : 1;
        const width = row.scrollWidth / 2;
        tween.pause(0);
        tween.vars.duration = Math.max(width / 80, 8);
        tween.vars.x = direction * width;
        tween.invalidate().restart();
      });
    };

    window.addEventListener("resize", handleResize);

    const hoverHandlers = rows.map((row, idx) => {
      const tween = tweens[idx];
      const onEnter = () => tween.pause();
      const onLeave = () => tween.resume();
      row.addEventListener("mouseenter", onEnter);
      row.addEventListener("mouseleave", onLeave);
      return { row, onEnter, onLeave };
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      hoverHandlers.forEach(({ row, onEnter, onLeave }) => {
        row.removeEventListener("mouseenter", onEnter);
        row.removeEventListener("mouseleave", onLeave);
      });
      tweens.forEach((tween) => tween.kill());
      marqueeTweensRef.current = [];
    };
  }, [testimonials.length]);

  useEffect(() => {
    const track = eventGalleryRef.current;
    if (!track) return;

    let tween;

    const initialise = () => {
      if (!track) return;
      tween?.kill();
      gsap.set(track, { x: 0 });
      const width = track.scrollWidth / 2;
      if (!width) return;
      tween = gsap.to(track, {
        x: -width,
        duration: Math.max(width / 120, 14),
        ease: "none",
        repeat: -1,
      });
    };

    initialise();

    const handleResize = () => {
      initialise();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      tween?.kill();
    };
  }, [eventGallery.length]);



  return (
    <div className="pt-0">
      {/* HERO */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden background-animate"
      >
        <div className="absolute inset-0 animated-gradient" aria-hidden />
        <HeroStarfield scrollTarget={heroRef} />
        <div className="hero-geo absolute inset-0 pointer-events-none">
          {heroGeoElements.map((item) => (
            <span
              key={item.id}
              className={`hero-geo__item absolute rounded-full ${item.isLine ? "bg-gradient-to-r from-blue-500/40 to-cyan-400/20" : "bg-cyan-400/25"}`}
              style={{
                left: item.left,
                top: item.top,
                width: item.width,
                height: item.height,
                transform: `rotate(${item.rotation}deg)`,
              }}
              data-delay={item.delay}
            />
          ))}
        </div>

        <div
          className="floating-icon pointer-events-none absolute top-1/2 left-1/2"
          data-desktop-x="-360"
          data-desktop-y="-220"
          data-mobile-x="-190"
          data-mobile-y="-200"
          data-mobile-scale="0.6"
        >
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-blue-400/35 bg-white/5 backdrop-blur-md shadow-[0_20px_45px_-28px_rgba(56,189,248,0.65)] sm:h-28 sm:w-28 lg:h-32 lg:w-32">
            <Cpu className="h-7 w-7 text-blue-300 sm:h-8 sm:w-8 lg:h-9 lg:w-9" />
          </div>
        </div>

        <div
          className="floating-icon pointer-events-none absolute top-1/2 left-1/2"
          data-desktop-x="360"
          data-desktop-y="-220"
          data-mobile-x="190"
          data-mobile-y="-200"
          data-mobile-scale="0.6"
        >
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-pink-400/35 bg-white/5 backdrop-blur-md shadow-[0_24px_52px_-32px_rgba(236,72,153,0.55)] sm:h-28 sm:w-28 lg:h-32 lg:w-32">
            <Zap className="h-8 w-8 text-pink-300 sm:h-9 sm:w-9 lg:h-10 lg:w-10" />
          </div>
        </div>

        <div
          className="floating-icon pointer-events-none absolute top-1/2 left-1/2"
          data-desktop-x="-340"
          data-desktop-y="260"
          data-mobile-x="-180"
          data-mobile-y="190"
          data-mobile-scale="0.62"
        >
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-emerald-400/35 bg-white/5 backdrop-blur-md shadow-[0_24px_52px_-32px_rgba(52,211,153,0.55)] sm:h-28 sm:w-28 lg:h-32 lg:w-32">
            <Atom className="h-7 w-7 text-emerald-300 sm:h-8 sm:w-8 lg:h-9 lg:w-9" />
          </div>
        </div>

        <div
          className="floating-icon pointer-events-none absolute top-1/2 left-1/2"
          data-desktop-x="340"
          data-desktop-y="260"
          data-mobile-x="180"
          data-mobile-y="200"
          data-mobile-scale="0.62"
        >
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-cyan-400/35 bg-white/5 backdrop-blur-md shadow-[0_24px_52px_-32px_rgba(45,212,191,0.55)] sm:h-28 sm:w-28 lg:h-32 lg:w-32">
            <Globe className="h-7 w-7 text-cyan-300 sm:h-8 sm:w-8 lg:h-9 lg:w-9" />
          </div>
        </div>

        <div className="container mx-auto px-8 md:px-24 lg:px-40 pt-28 pb-16 lg:pb-24 relative z-10 flex flex-col items-center justify-center">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6">

            <h1 className="hero-title text-5xl md:text-7xl font-bold mb-6 text-slate-100">
              <span className="bg-gradient-to-r from-[#FDE68A] via-[#FCA5A5] to-[#F472B6] bg-clip-text text-transparent drop-shadow-[0_6px_18px_rgba(244,114,182,0.45)]">
                Transforming Innovation Into Impact{" "}
              </span>{" "}

              <RotatingText
                texts={[
                  "LLM assistants",
                  "Automation",
                  "Analytics",
                  "AI Web Platforms",

                ]}
                mainClassName="px-2 sm:px-2 md:px-3 bg-transparent text-slate-100 overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={4000}
              />
              <span className="block font-bold text-[#CDB4FF]">

              </span>
            </h1>
            <p className="text-base md:text-3xl text-slate-200 leading-relaxed drop-shadow-[0_2px_6px_rgba(0,44,113,0.3)]">
              AI solutions and research enablement for startups, corporates, and academia—built for measurable outcomes and scalable deployment.
            </p>
            <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/services")}
                className="group px-8 py-4 bg-gradient-to-r from-[#1D4ED8] via-[#0EA5E9] to-[#00A99D] text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-[#0EA5E9]/50 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                See How We Help
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="group px-8 py-4 border border-teal-300/70 text-teal-200 rounded-lg font-semibold transition-all transform hover:scale-105 hover:bg-teal-500/20 hover:text-white hover:shadow-lg hover:shadow-teal-400/40 flex items-center justify-center gap-2"
              >
                Talk to an Expert
              </button>
            </div>
          </div>
        </div>
      </section>

      <section ref={statsRef} className="py-20 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="stat-card tech-card p-8 rounded-2xl text-center group">
              <div className="inline-flex p-4 bg-orange-500/20 rounded-xl mb-4 group-hover:scale-110 transition-transform">
                <Award className="w-12 h-12 text-orange-400" />
              </div>
              <h3 className="text-4xl font-bold text-black mb-2">
                <CountUp from={0} to={150} duration={1.5} className="inline-block" />
                +
              </h3>
              <p className="text-black text-lg font-semibold">Unified Support for Academia & Industry</p><h5 className="text-black text-lg ">AI, research enablement, IPR support, and ranking readiness.</h5>
            </div>
            <div className="stat-card tech-card p-8 rounded-2xl text-center group">
              <div className="inline-flex p-4 bg-green-500/20 rounded-xl mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-12 h-12 text-green-400" />
              </div>
              <h3 className="text-4xl font-bold text-black mb-2">
                <CountUp from={0} to={50} duration={1.5} className="inline-block" />
                +
              </h3>
              <p className="text-black text-lg font-semibold">End-to-End AI Enablement</p><h5 className="text-black text-lg ">From strategy and build to deployment and scale.</h5>
            </div>
            <div className="stat-card tech-card p-8 rounded-2xl text-center group">
              <div className="inline-flex p-4 bg-blue-500/20 rounded-xl mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-12 h-12 text-blue-400" />
              </div>
              <h3 className="text-4xl font-bold text-black mb-2">
                <CountUp from={0} to={50} duration={1.5} className="inline-block" />
                +
              </h3>
              <p className="text-black text-lg font-semibold">Outcome-Driven Delivery

              </p><h5 className="text-black text-lg ">Clear milestones, disciplined execution, measurable results.</h5>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section
        ref={featuresRef}
        className="relative overflow-hidden bg-[#041229] py-24"
      >
        <div className="pointer-events-none absolute -top-44 -left-20 h-64 w-64 rounded-full bg-[#00A99D]/18 blur-[140px]" />
        <div className="pointer-events-none absolute bottom-[-5rem] right-[-3rem] h-80 w-80 rounded-full bg-[#8B5CF6]/15 blur-[180px]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 199L199 0' stroke='rgba(255,255,255,0.02)' stroke-width='1'/%3E%3Cpath d='M0 149L149 0' stroke='rgba(255,255,255,0.02)' stroke-width='1'/%3E%3Cpath d='M50 199L199 50' stroke='rgba(255,255,255,0.02)' stroke-width='1'/%3E%3C/svg%3E\")",
            backgroundSize: "200px 200px",
          }}
        />
        <div className="container relative z-10 mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center space-y-5">
            <span className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/70">
              Excellence Pods
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white">
              Evidence. Excellence. Acceleration.
            </h2>
            <p className="text-base sm:text-lg text-white/70 leading-relaxed">
              Trueline is your tech-first partner for AI transformation. From strategic roadmaps to production deployments, our platforms turn bold visions into scalable, high-performance solutions that drive measurable impact.
            </p>
          </div>

          <div className="mt-16 space-y-20">
            {excellenceFeatures.map((feature, index) => {
              const isReversed = index % 2 === 1;
              return (
                <article
                  key={feature.title}
                  className="group grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]"
                >
                  <div
                    className={`space-y-6 text-white ${isReversed ? "lg:order-2 lg:text-right" : ""}`}
                  >
                    <span
                      className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em]"
                      style={{ color: feature.accent, boxShadow: `0 0 0 1px ${feature.accent}22` }}
                    >
                      {feature.context}
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-semibold leading-tight">
                      {feature.title}
                    </h3>
                    <p className="text-base sm:text-lg leading-relaxed text-white/70">
                      {feature.description}
                    </p>
                    <div
                      className={`space-y-3 text-sm sm:text-base text-white/65 ${isReversed ? "lg:ml-auto lg:max-w-xl" : "lg:max-w-xl"}`}
                    >
                      {feature.highlights.map((item) => (
                        <div
                          key={item}
                          className={`flex items-center gap-3 ${isReversed ? "lg:flex-row-reverse lg:text-right" : ""}`}
                        >
                          <span
                            className="h-2 w-2 flex-shrink-0 rounded-full"
                            style={{ backgroundColor: feature.accent }}
                          />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                  </div>
                  <div
                    className={`relative flex justify-center ${isReversed ? "lg:order-1 lg:justify-start" : "lg:justify-end"}`}
                  >
                    <div className="relative h-60 w-full max-w-sm overflow-hidden rounded-[32px] sm:h-64 transform-gpu transition-transform duration-500 ease-out group-hover:-rotate-3 group-hover:scale-[1.05] group-hover:-translate-y-1">
                      <div
                        className="pointer-events-none absolute inset-0 rounded-[32px] opacity-30 blur-[110px]"
                        style={{
                          background: `radial-gradient(circle at 25% 20%, ${feature.accent}45 0%, transparent 65%)`,
                        }}
                      />
                      <div
                        className="absolute inset-0 rounded-[32px] border border-white/10 bg-gradient-to-br from-[#030b1f] via-[#041229] to-[#020510]"
                        style={{
                          boxShadow: `0 45px 120px -55px ${feature.cardAccent}cc`,
                        }}
                      />
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="relative z-10 h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* EVENTS PREVIEW */}
      <section className="relative overflow-hidden bg-[#030b20] py-24 text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.12),transparent_55%),radial-gradient(circle_at_bottom_left,rgba(139,92,246,0.12),transparent_60%)]" />
        <div className="container relative z-10 mx-auto px-6">
          <div className="flex flex-col items-center text-center gap-4 max-w-3xl mx-auto">
            <span className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/70">
              EVENTS & WORKSHOPS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
              Tech Innovation Events
            </h2>
            <p className="text-base sm:text-lg text-white/70 leading-relaxed">
              Hands-on workshops, hackathons, and tech talks that connect CTOs, startup founders, and AI teams to accelerate breakthrough innovations.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredEvents.map((event) => (
              <article
                key={event._id}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 px-7 py-8 transition duration-500 hover:-translate-y-2 hover:border-white/25 hover:bg-white/10"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(135deg, ${event.accent}22 0%, transparent 60%)`,
                  }}
                />
                <div className="relative space-y-5">
                  <span
                    className="inline-flex items-center rounded-full border border-white/10 bg-black/30 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em]"
                    style={{ color: event.accent, boxShadow: `0 0 0 1px ${event.accent}22` }}
                  >
                    {event.tag}
                  </span>
                  <h3 className="text-2xl font-semibold leading-tight">
                    {event.title}
                  </h3>
                  <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                    {event.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: event.accent }}>
                    <span className="flex h-2.5 w-2.5 rounded-full" style={{ backgroundColor: event.accent }} />
                    {event.date}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-[0.32em] text-white/50">
              <span>Event Highlights</span>
              <span className="text-white/30">Looping gallery</span>
            </div>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/10 backdrop-blur-sm">
              <div
                ref={eventGalleryRef}
                className="flex gap-6 py-6 pl-6 pr-2 will-change-transform"
                style={{ width: "max-content" }}
              >
                {[...eventGallery, ...eventGallery].map((item, idx) => (
                  <div
                    key={`event-gallery-${idx}-${item.caption}`}
                    className="relative h-44 w-[16rem] flex-shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:h-52 sm:w-[20rem] lg:h-60 lg:w-[22rem]"
                  >
                    <img
                      src={item.src}
                      alt={item.caption}
                      className="h-full w-full object-cover opacity-90 transition-opacity duration-500 hover:opacity-100"
                      loading={idx === 0 ? "eager" : "lazy"}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030b20] via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-4 left-4 right-4 space-y-1">
                      <p className="text-sm font-semibold text-white sm:text-base">{item.caption}</p>
                      <p className="text-[11px] uppercase tracking-[0.24em] text-white/60">{item.meta}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={() => navigate("/events")}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm sm:text-base font-semibold tracking-wide transition hover:-translate-y-1 hover:border-white/30 hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              Explore All Events
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#020205] py-24 text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,#111827_0%,#020205_60%,#010103_100%)] opacity-95" />
        <div className="container relative z-10 mx-auto px-5 sm:px-6">
          <div className="mx-auto max-w-3xl text-center space-y-3 sm:space-y-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-slate-400">
              TECH RESOURCES
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
              Engineering Intelligence Hub
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-400 leading-relaxed">
              Technical guides, blueprints, templates, and playbooks that explain how we plan, build, and scale production-ready AI and research ecosystems.
            </p>
          </div>

          <div className="mt-10 md:mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {learningResources.map(resource => {
              const Icon = iconMap[resource.iconName] || FileText;
              return (
                <button
                  key={resource.id}
                  type="button"
                  onClick={() => setSelectedResource(resource)}
                  className="group flex h-full flex-col justify-between rounded-3xl border border-white/8 bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-white/[0.01] px-5 py-6 sm:px-6 sm:py-7 lg:px-6 lg:pt-8 lg:pb-7 transition duration-300 hover:border-[#8B5CF6]/40 hover:shadow-[0_34px_90px_-45px_rgba(139,92,246,0.65)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]/60"
                >
                  <div className="flex flex-col items-start gap-6">
                    <div className="rounded-[26px] border border-white/10 bg-black/70 p-8 shadow-[0_24px_80px_-52px_rgba(56,189,248,0.75)] transition duration-300 group-hover:border-[#8B5CF6]/40 group-hover:bg-black/60">
                      <Icon className="h-10 w-10 text-white/80 transition-colors duration-300 group-hover:text-[#8B5CF6] sm:h-12 sm:w-12" strokeWidth={1.6} />
                    </div>
                    <div className="space-y-2">
                      <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#A855F7]">
                        {resource.type}
                      </span>
                      <h3 className="text-lg sm:text-xl font-semibold text-white leading-tight">
                        {resource.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        {resource.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#8B5CF6]">
                    Read More
                    <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {selectedResource && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby={`resource-${selectedResource.id}-title`}>
          <div className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A]/95 via-[#020617]/96 to-[#010103]/98 p-6 sm:p-8 shadow-[0_45px_120px_-40px_rgba(17,24,39,0.65)]">
            <button
              type="button"
              onClick={closeResource}
              className="absolute right-5 top-5 text-slate-400 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]/60"
              aria-label="Close resource details"
            >
              ✕
            </button>
            <div className="flex flex-col gap-6 text-left text-white">
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#A855F7]">
                {selectedResource.type}
              </span>
              <div className="flex items-start gap-4">
                <div className="hidden sm:block text-[#8B5CF6]">
                  {(() => {
                    const Icon = iconMap[selectedResource.iconName] || FileText;
                    return <Icon size={48} strokeWidth={1.6} />;
                  })()}
                </div>
                <div>
                  <h3 id={`resource-${selectedResource.id}-title`} className="text-2xl sm:text-3xl font-semibold leading-tight">
                    {selectedResource.title}
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                    {selectedResource.longDescription ?? selectedResource.description}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                <span className="text-xs text-slate-400">
                  Need a deeper dive? Our team can walk you through live examples and implementation options.
                </span>
                <button
                  type="button"
                  onClick={() => {
                    closeResource();
                    if (selectedResource.linkUrl && selectedResource.linkUrl.startsWith('http')) {
                      window.location.href = selectedResource.linkUrl;
                    } else if (selectedResource.linkUrl) {
                      navigate(selectedResource.linkUrl);
                    } else {
                      navigate("/contact");
                    }
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#8B5CF6] via-[#6366F1] to-[#22D3EE] px-6 py-2 text-sm font-semibold text-white shadow-[0_18px_40px_-24px_rgba(99,102,241,0.65)] transition hover:shadow-[0_26px_60px_-28px_rgba(99,102,241,0.75)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]/60"
                >
                  {selectedResource.linkUrl ? 'Visit Resource' : 'Talk to Us'}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TESTIMONIALS (single marquee row) */}
      <section className="py-20 bg-white">
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900">
              What Our Partners Say
            </h2>
            <p className="text-lg text-slate-600 mt-3">
              Real feedback from faculty leaders, research scholars, and
              founders.
            </p>
          </div>

          <div className="space-y-12 lg:space-y-16">
            {[testimonials.slice(0, 7), testimonials.slice(7, 14)].map((row, idx) => (
              <div key={idx} className="overflow-hidden">
                <div
                  ref={registerMarquee(idx)}
                  className="flex gap-6 will-change-transform"
                  style={{ width: "max-content" }}
                >
                  {[...row, ...row].map((t, itemIdx) => (
                    <TestimonialCard
                      key={`testimonial-${idx}-${itemIdx}-${t.name}`}
                      name={t.name}
                      role={t.role}
                      quote={t.quote}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Build the Future?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Let's architect your next breakthrough solution together.
            </p>
            <button
              onClick={() => navigate("/contact")}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all transform hover:scale-105"
            >
              Start Your Project
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}




