import { useState, useEffect } from "react";
import { API_BASE_URL } from "../lib/api";
import ResourceHeroAnimation from "../components/ResourceHeroAnimation";
import { Shield, FileText, Zap, BarChart, Users, Globe, Database, CircuitBoard, Layers } from "lucide-react";

export default function Resources() {
  const [resources, setResources] = useState([]);

  // Icon Mapping
  const iconMap = {
      'Shield': Shield,
      'FileText': FileText,
      'Zap': Zap,
      'BarChart': BarChart,
      'Users': Users,
      'Globe': Globe,
      'Database': Database,
      'CircuitBoard': CircuitBoard,
      'Layers': Layers
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/resources`)
      .then((res) => res.json())
      .then((data) => {
          if(Array.isArray(data)) setResources(data);
      })
      .catch((err) => console.error("Failed to fetch resources", err));
  }, []);

  return (
    <div className="pt-0">
      <section
        className="relative overflow-hidden py-20 text-white"
        style={{ background: "linear-gradient(135deg, #00A99D 4%, #2C3E50 88%)" }}
      >
        <ResourceHeroAnimation />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-[#001625]/30" />
        <div className="relative container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold">Resource Library</h1>
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed">
              Playbooks, templates, and research enablement guides you can deploy across manuscripts, IPR, and accreditation.
            </p>
            <p className="text-base md:text-lg text-white/70">
              Curated artifacts that pair strategic context with hands-on tooling so research teams can execute faster.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0B0F19]">
        <div className="container mx-auto px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {resources.length === 0 ? (
                 <div className="col-span-3 text-center text-gray-400 py-10">
                     <p>No resources available at the moment.</p>
                     <p className="text-sm mt-2 opacity-50 text-white">Admins: Add resources from the dashboard.</p>
                 </div>
              ) : (
                  resources.map((res) => {
                    const IconComponent = iconMap[res.icon] || FileText;
                    return (
                        <article key={res._id} className="group relative rounded-3xl border border-white/10 bg-[#0F1420] p-8 transition-all hover:bg-[#131b2b] hover:shadow-2xl hover:shadow-black/50 flex flex-col items-center text-center h-full">
                          
                          {/* Icon Container */}
                          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-[#0B0F19] transition-transform group-hover:scale-110 group-hover:border-[#00A99D]/50 text-[#00A99D]">
                            <IconComponent size={32} strokeWidth={1.5} />
                          </div>

                          {/* Category Label */}
                          <div className="mb-4 text-[10px] uppercase font-bold tracking-[0.2em] text-[#A855F7]">
                             {res.category || "RESOURCE"}
                          </div>

                          {/* Title */}
                          <h2 className="mb-3 text-xl font-bold text-white transition-colors group-hover:text-[#00A99D] leading-tight">
                              {res.title}
                          </h2>

                          {/* Description */}
                          <p className="mb-8 text-sm leading-relaxed text-gray-400 flex-grow">
                             {res.description}
                          </p>

                          {/* Link */}
                          <a href={res.linkUrl} className="group/link inline-flex items-center gap-2 text-sm font-semibold text-[#A855F7] transition-colors hover:text-[#c084fc] mt-auto">
                              {res.linkText}
                              <span className="transition-transform group-hover/link:translate-x-1">→</span>
                          </a>
                        </article>
                    );
                  })
              )}
          </div>
        </div>
      </section>
    </div>
  );
}

