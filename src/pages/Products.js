import { useMemo, useState, useEffect } from "react";
import { API_BASE_URL } from "../lib/api";
import { ArrowRight } from "lucide-react";
import ResourceHeroAnimation from "../components/ResourceHeroAnimation";
import webAppSuiteImage from "../images/Web App Suite.png";
import chatbotsImage from "../images/Chatbots.jpeg";
import aiAgentsImage from "../images/AI Research & Innovation Labs.png";
import manuscriptSuiteImage from "../images/AI Strategy & Implementation.png";
import iprCommercialisationImage from "../images/Next-Gen AI Platform.png";
import accreditationImpactImage from "../images/Accreditation & Quality Support.png";

const productCategories = [
  "All",
  "AI Solutions",
  "Data Analytics",
  "Encoded system",
  "Research Software",
  "Innovation Tooling",
];

const localImages = {
  "Web App Suite": webAppSuiteImage,
  "Chatbots": chatbotsImage,
  "AI Agents": aiAgentsImage,
  "Manuscript Acceleration Suite": manuscriptSuiteImage,
  "IPR Commercialisation Suite": iprCommercialisationImage,
  "Accreditation Impact Suite": accreditationImpactImage,
};

const heroDecorations = [
  { id: "wave-1", top: "12%", left: "10%", blur: "280px", opacity: 0.45, color: "rgba(56,189,248,0.55)" },
  { id: "wave-2", top: "30%", left: "55%", blur: "220px", opacity: 0.4, color: "rgba(129,140,248,0.5)" },
  { id: "wave-3", top: "60%", left: "25%", blur: "260px", opacity: 0.35, color: "rgba(45,212,191,0.5)" },
];

export default function Products() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // Normalize backend data to match frontend component structure
          const formattedProducts = data.map(p => ({
            id: p._id,
            category: p.tag,
            title: p.title,
            description: p.description,
            // Fallback accent if missing
            accent: p.accent || "#22D3EE",
            // Use fetched imageUrl, or map local image by title, or placeholder
            image: p.imageUrl || localImages[p.title] || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000",
          }));
          setProducts(formattedProducts);
        }
      })
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  const filteredCatalog = useMemo(
    () =>
      activeCategory === "All"
        ? products
        : products.filter((product) => product.category === activeCategory),
    [activeCategory, products],
  );

  return (
    <div className="min-h-screen bg-[#01030C] pt-24 text-white">
      
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e3a5f,transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,#0b1120_0%,#05122d_45%,#020617_100%)]" />
        {heroDecorations.map((shape) => (
          <div
            key={shape.id}
            className="pointer-events-none absolute rounded-full"
            style={{
              top: shape.top,
              left: shape.left,
              width: "420px",
              height: "420px",
              background: shape.color,
              filter: `blur(${shape.blur})`,
              opacity: shape.opacity,
            }}
          />
        ))}

        <div className="container relative mx-auto px-6 py-28">
          
          <div className="max-w-3xl space-y-6">
            
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-6 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/75">
              Product Platform
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight">
              Innovating the Future with QuantumLeap AI Suite
            </h1>
            <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl">
              Real-time data streaming and ETL platform processing research data at scale. Integrate lab instruments, sensors, and databases with automated quality checks, schema evolution, and full data lineage tracking for reproducible research.
            </p>
            
          </div>

          <div className="absolute right-0 top-12 hidden max-w-xl rotate-2 rounded-[48px] border border-white/10 bg-white/10 backdrop-blur-md p-10 lg:block">
            <div className="relative h-48 w-full overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.6),rgba(99,102,241,0.25)_45%,transparent_75%)]">
              <div className="absolute inset-0 animate-pulse bg-[linear-gradient(120deg,rgba(34,211,238,0.2),rgba(168,85,247,0.15),rgba(14,165,233,0.2))]" />
            </div>
          </div>
        </div>
      </section>

      <section className="relative -mt-12 pb-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-transparent via-[#020617] to-transparent opacity-80" />
        <div className="container relative mx-auto px-6">
          <div className="flex flex-wrap items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
            {productCategories.map((category) => {
              const isActive = category === activeCategory;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                    isActive
                      ? "bg-gradient-to-r from-[#22D3EE] to-[#6366F1] text-white shadow-[0_10px_30px_-18px_rgba(99,102,241,0.8)]"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {filteredCatalog.map((product) => (
              <article
                key={product.id}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 transition duration-500 hover:-translate-y-2 hover:border-white/25 hover:bg-white/10"
              >
                <div className="relative h-44 overflow-hidden rounded-2xl">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-black/20 to-transparent opacity-60 transition group-hover:opacity-75" />
                </div>
                <div className="mt-6 space-y-4">
                  <span
                    className="inline-flex items-center rounded-full border border-white/15 bg-black/30 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em]"
                    style={{ color: product.accent, boxShadow: `0 0 0 1px ${product.accent}33` }}
                  >
                    {product.category}
                  </span>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-semibold leading-tight">{product.title}</h3>
                    <p className="text-sm text-white/70 leading-relaxed">{product.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <a
              href="/contact"
              className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-8 py-3 text-sm sm:text-base font-semibold text-white transition hover:-translate-y-1 hover:border-white/30 hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#01030C]"
            >
              Talk to Us About Deployment
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
