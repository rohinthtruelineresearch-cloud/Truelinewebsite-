import { useEffect, useState } from "react";
import { API_BASE_URL } from "../lib/api";
import ResourceHeroAnimation from "../components/ResourceHeroAnimation";
import a from "../event-gallery/a.jpg";
import b from "../event-gallery/b.jpg";
import c from "../event-gallery/c.jpg";
import d from "../event-gallery/d.jpg";
import A1 from "../event-gallery/A1.jpg";
import A2 from "../event-gallery/A2.jpg";
import A3 from "../event-gallery/A3.jpg";
import A4 from "../event-gallery/A4.jpg";
import A5 from "../event-gallery/A5.jpg";
import A6 from "../event-gallery/A6.jpg";
import A7 from "../event-gallery/A7.jpg";
import A8 from "../event-gallery/A8.jpg";
import A9 from "../event-gallery/A9.jpg";
import B1 from "../event-gallery/B1.jpg";
import B2 from "../event-gallery/B2.jpg";
import B3 from "../event-gallery/B3.jpg";
import B4 from "../event-gallery/B4.jpg";
import B5 from "../event-gallery/B5.jpg";
import B6 from "../event-gallery/B6.jpg";
import B7 from "../event-gallery/B7.jpg";
import B8 from "../event-gallery/B8.jpg";
import BNI from "../event-gallery/BNI.jpg";
import e from "../event-gallery/e.jpg";
import f from "../event-gallery/f.jpg";
import g from "../event-gallery/g.jpg";
import h from "../event-gallery/h.jpg";
import i from "../event-gallery/i.jpg";
import j from "../event-gallery/j.jpg";
import k from "../event-gallery/k.jpg";
import l from "../event-gallery/l.jpg";
import m from "../event-gallery/m.jpg";
import n from "../event-gallery/n.jpg";
import o from "../event-gallery/o.jpg";
import p from "../event-gallery/p.jpg";
import q from "../event-gallery/q.jpg";
import r from "../event-gallery/r.jpg";
import s from "../event-gallery/s.jpg";
import t from "../event-gallery/t.jpg";
import u from "../event-gallery/u.jpg";
import v from "../event-gallery/v.jpg";
import w from "../event-gallery/w.jpg";
import x from "../event-gallery/x.jpg";
import y from "../event-gallery/y.jpg";
import z from "../event-gallery/z.jpg";

const GRID_OVERLAY =
  "url(\"data:image/svg+xml,%3Csvg width='160' height='160' viewBox='0 0 160 160' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 32h160M0 96h160M32 0v160M96 0v160' stroke='%23ffffff' stroke-opacity='0.15' stroke-width='1'/%3E%3C/svg%3E\")";

const highlightTiles = [
  {
    title: "Driving Business Value With Agentic AI",
    gallery: [a, b, c, d],
  },
  {
    title: "Introducing The Innovation Network",
    gallery: [b, f, g, h],
  },
  {
    title: "Designing Immersive Research Clinics",
    gallery: [c, i, j, k],
  },
  {
    title: "The Next Big Thing: Supply Chain",
    gallery: [d, l, m, n],
  },
  {
    title: "Transformation In A Time Of Disruption",
    gallery: [A1, o, p, q],
  },
  {
    title: "India's Branch Of The Future",
    gallery: [A2, A3, r, s],
  },
  {
    title: "Campus Innovation Bootcamp",
    gallery: [A3, t, u, v],
  },
  {
    title: "Future Readiness Showcase",
    gallery: [A4, A5, w, x],
  },
  {
    title: "Future Readiness Showcase",
    gallery: [A6, A7, y, z],
  },
  {
    title: "Future Readiness Showcase",
    gallery: [A8, A9, B1, B2],
  },
  {
    title: "Future Readiness Showcase",
    gallery: [B3, B4, B5, B6],
  },
  {
    title: "Future Readiness Showcase",
    gallery: [B7, B8, BNI, e],
  },
  {
    title: "Future Readiness Showcase",
    gallery: [f, g, h, i],
  },
  {
    title: "Future Readiness Showcase",
    gallery: [j, k, l, m],
  },
  {
    title: "Future Readiness Showcase",
    gallery: [n, o, p, q],
  },
  {
    title: "Future Readiness Showcase",
    gallery: [r, s, t, u],
  },
  {
    title: "Future Readiness Showcase",
    gallery: [v, w, x, y],
  },
  {
    title: "Future Readiness Showcase",
    gallery: [z, A1, A2, A3],
  },
].map((tile) => {
  const gallery = tile.gallery && tile.gallery.length > 0 ? tile.gallery : [a];
  return {
    ...tile,
    image: gallery[0],
    gallery,
    alt: tile.alt || `${tile.title} photo`,
  };
});

const hostedEvents = [
  {
    date: "—",
    title: "STARTNET & SALEM CHAPTER LAUNCH",
    summary: "Launch event introducing STARTNET and the Salem chapter.",
  },
  {
    date: "July 2023",
    title: "STARTCONNECT Monthly Networking Meeting",
    summary: "Monthly networking meet-up for founders and professionals.",
  },
  {
    date: "—",
    title: "STARTNET ChatGPT & GenAI",
    summary: "Session focused on ChatGPT and Generative AI.",
  },
  {
    date: "—",
    title: "STARTNET Connect Zoom Up Meeting",
    summary: "Virtual Zoom catch-up under STARTNET Connect.",
  },
  {
    date: "—",
    title: "STARTNET Master Class – Prompt Engineering",
    summary: "Masterclass on prompt engineering techniques.",
  },
  {
    date: "August 2023",
    title: "STARTNET: Startup Tamilazh",
    summary: "Startup-focused gathering under the Tamilazh banner.",
  },
  {
    date: "August 2023",
    title: "STARTCONNECT Monthly Networking Meeting",
    summary: "Monthly networking meeting for the community.",
  },
  {
    date: "September 2023",
    title: "STARTNET Connect Monthly Networking Meeting – Mega Pitching",
    summary: "Networking meet featuring a mega pitching segment.",
  },
  {
    date: "October 2023",
    title: "STARTCONNECT Monthly Networking Meeting",
    summary: "Monthly networking session.",
  },
  {
    date: "—",
    title: "STARTNET T2HUB Launching",
    summary: "Launch of T2HUB under STARTNET.",
  },
  {
    date: "November 2023",
    title: "STARTCONNECT Monthly Networking Meeting",
    summary: "Monthly networking session.",
  },
  {
    date: "—",
    title: "STARTCONNECT Blockchain Technology Investors Meet",
    summary: "Investor-focused meetup on blockchain technology.",
  },
  {
    date: "December 2023",
    title: "STARTCONNECT Monthly Networking Meeting",
    summary: "Monthly networking session.",
  },
  {
    date: "—",
    title: "STARTNET Connect Digital Politics Conclave",
    summary: "Conclave on digital politics themes.",
  },
  {
    date: "—",
    title: "STATNET Connect SaaS Master Class",
    summary: "Masterclass focused on SaaS topics.",
  },
  {
    date: "—",
    title: "TN4STARTUP Cycle Rally",
    summary: "Community cycle rally under TN4STARTUP.",
  },
  {
    date: "—",
    title: "STARTNET Connect Digital Conclave Madurai",
    summary: "Digital conclave hosted in Madurai.",
  },
  {
    date: "—",
    title: "STARTNET Connect GenAI Summit & Expo",
    summary: "Summit and expo centered on Generative AI.",
  },
];

const hostedPalettes = [
  { from: "#f0f7ff", to: "#ffffff" },
  { from: "#f9f0ff", to: "#ffffff" },
  { from: "#f0fffb", to: "#ffffff" },
  { from: "#fff3f0", to: "#ffffff" },
];

export default function Events() {
  const [activeTile, setActiveTile] = useState(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [highlights, setHighlights] = useState([]);
  const [programmes, setProgrammes] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/event-highlights`)
      .then(res => res.json())
      .then(data => {
        if(Array.isArray(data) && data.length > 0) {
            const formatted = data.map(h => ({
                title: h.title,
                gallery: h.images,
                image: h.images[0],
                alt: h.title,
                _id: h._id
            }));
            setHighlights(formatted);
        } else {
            // Fallback to static if no dynamic data
            setHighlights(highlightTiles);
        }
      })
      .catch(err => {
          console.error("Error fetching highlights", err);
          setHighlights(highlightTiles);
      });

    fetch(`${API_BASE_URL}/api/hosted-programmes`)
      .then(res => res.json())
      .then(data => {
          if(Array.isArray(data) && data.length > 0) {
              setProgrammes(data);
          } else {
              setProgrammes(hostedEvents);
          }
      })
      .catch(err => {
          console.error("Error fetching hosted programmes", err);
          setProgrammes(hostedEvents);
      });
  }, []);

  useEffect(() => {
    if (!activeTile) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveTile(null);
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [activeTile]);

  useEffect(() => {
    if (!activeTile) {
      setActiveGalleryIndex(0);
    } else {
      setActiveGalleryIndex(0);
    }
  }, [activeTile]);

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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Events & Clinics</h1>
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed">
              Immersive workshops, faculty development programmes, and innovation clinics tailored to your research roadmap.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: "#04111F" }}>
        <div className="container mx-auto px-6 text-white">
          <div className="mb-12 max-w-3xl space-y-3">
            <span className="inline-flex items-center rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.35em] text-white/60">
              Event highlights
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold">Stories from our recent showcases</h2>
            <p className="text-white/70 text-lg leading-relaxed">
              A quick glimpse into the signature workshops, showcases, and partner programmes that shape Trueline
              experiences.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {highlights.map((tile, index) => (
              <article
                key={`${tile.title}-${index}`}
                className="group relative flex aspect-[4/3] flex-col overflow-hidden rounded-[30px] text-white shadow-[0_28px_80px_-40px_rgba(0,0,0,0.75)] cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#8ef1ff]/60"
                role="button"
                tabIndex={0}
                aria-label={`View ${tile.title}`}
                onClick={() => {
                  setActiveTile(tile);
                  setActiveGalleryIndex(0);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setActiveTile(tile);
                    setActiveGalleryIndex(0);
                  }
                }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${tile.image})` }}
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
                <div className="relative z-10 mt-auto flex items-end p-6 md:p-8">
                  <h3 className="text-xl font-semibold leading-snug">{tile.title}</h3>
                </div>
              </article>
            ))}
          </div>

          {activeTile && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
                aria-hidden="true"
                onClick={() => setActiveTile(null)}
              />
              <div className="relative z-10 w-full max-w-4xl">
                <button
                  type="button"
                  onClick={() => setActiveTile(null)}
                  className="absolute -right-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#04111F] shadow-lg transition hover:bg-white"
                  aria-label="Close image preview"
                >
                  ×
                </button>
                <div className="overflow-hidden rounded-3xl bg-white shadow-2xl">
                  {activeTile.gallery && activeTile.gallery.length > 1 && (
                    <div className="flex items-center justify-between px-4 pt-4">
                      <button
                        type="button"
                        onClick={() =>
                          setActiveGalleryIndex((prev) =>
                            prev === 0 ? activeTile.gallery.length - 1 : prev - 1
                          )
                        }
                        className="grid h-10 w-10 place-items-center rounded-full border border-[#d0dbe8] bg-white text-lg font-semibold text-[#184366] transition hover:bg-[#eef4fb]"
                        aria-label="Previous image"
                      >
                        ‹
                      </button>
                      <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#637a92]">
                        {String(activeGalleryIndex + 1).padStart(2, "0")}/{String(activeTile.gallery.length).padStart(2, "0")}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setActiveGalleryIndex((prev) =>
                            prev === activeTile.gallery.length - 1 ? 0 : prev + 1
                          )
                        }
                        className="grid h-10 w-10 place-items-center rounded-full border border-[#d0dbe8] bg-white text-lg font-semibold text-[#184366] transition hover:bg-[#eef4fb]"
                        aria-label="Next image"
                      >
                        ›
                      </button>
                    </div>
                  )}
                  <img
                    src={activeTile.gallery?.[activeGalleryIndex] || activeTile.image}
                    alt={activeTile.alt}
                    className="max-h-[70vh] w-full bg-black object-contain"
                  />
                  <div className="p-5 text-[#11202e]">
                    <h3 className="text-xl font-semibold leading-snug">{activeTile.title}</h3>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-[#0a2433]">
          <div className="mb-12 grid gap-8 lg:grid-cols-[320px,1fr]">
            <div className="rounded-3xl border border-[#e2eef9] bg-[#f4f9ff] p-8 shadow-[0_30px_80px_-60px_rgba(15,67,105,0.45)]">
              <span className="inline-flex items-center rounded-full border border-[#d9e7f5] bg-white px-3 py-1 text-xs uppercase tracking-[0.4em] text-[#1f6f9b]">
                Hosted programmes
              </span>
              <h2 className="mt-6 text-3xl md:text-4xl font-semibold leading-tight">
                Events we have recently co-created
              </h2>
              <p className="mt-4 text-[#35506a] leading-relaxed">
                A quick reel of signature summits, bootcamps, and evidence sprints. Swipe through to see how campus
                partners activated their research ecosystem with Trueline.
              </p>
              <div className="mt-6 space-y-3 text-sm text-[#35506a]">
                {[
                  "Built with co-design workshops and rapid playbooks.",
                  "Tailored for faculty cohorts, innovation cells, and TTOs.",
                  "Outcome-first agenda backed by measurable run sheets.",
                ].map((line, idx) => (
                  <p key={line} className="flex items-center gap-3">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#c9daec] bg-white/80 text-[10px] font-semibold text-[#1f6f9b]">
                      {idx + 1}
                    </span>
                    {line}
                  </p>
                ))}
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {programmes.map((event, index) => {
                const palette = hostedPalettes[index % hostedPalettes.length];
                return (
                  <article
                    key={`${event.title}-${index}`}
                    className="group relative flex flex-col overflow-hidden rounded-[28px] border border-[#dce8f5] bg-white shadow-[0_24px_60px_-45px_rgba(26,57,97,0.5)] transition hover:-translate-y-1 hover:shadow-[0_32px_70px_-40px_rgba(26,57,97,0.45)]"
                  >
                    <div className="absolute inset-0 opacity-100" style={{ background: `linear-gradient(145deg, ${palette.from}, ${palette.to})` }} />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at-top,rgba(18,66,116,0.08),transparent_60%)]" />
                    <div className="absolute inset-0 opacity-15" style={{ backgroundImage: GRID_OVERLAY }} />

                    <div className="relative z-10 flex flex-1 flex-col gap-4 p-6 text-[#174062]">
                      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-[#45617a]">
                        <span className="grid h-6 w-6 place-items-center rounded-full border border-[#aac8e7] bg-white/70 text-[11px] font-semibold text-[#2a70a2]">
                          {String.fromCharCode(65 + (index % 26))}
                        </span>
                        <span>{event.date === "—" ? "Coming soon" : event.date}</span>
                      </div>
                      <h3 className="text-xl font-semibold leading-snug">{event.title}</h3>
                      <p className="text-sm leading-relaxed text-[#4a6a88]">{event.summary}</p>
                    </div>

                    <footer className="relative z-10 border-t border-[#d0e1f2] bg-white/70 px-6 py-4 text-xs uppercase tracking-[0.35em] text-[#4a6a88]">
                      #{String(index + 1).padStart(2, "0")} · STARTNET Programme Series
                    </footer>
                  </article>
                );
              })}
          </div>
          </div>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: "#F7F9FA" }}>
        <div className="container mx-auto px-6">
          <div className="space-y-16">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-[#2C3E50]">Signature formats</h2>
                <p className="text-lg text-[#2C3E50]/80 leading-relaxed">
                  We host curated programmes that blend practice with implementation. Each clinic includes pre-work, live
                  facilitation, and follow-up artefacts so participants can apply the learning immediately.
                </p>
              </div>
              <div className="bg-white rounded-2xl border border-[#E1EEF3] shadow-lg p-8 space-y-4">
                <ul className="space-y-3 text-[#2C3E50]/80">
                  <li>
                    <strong>Publication bootcamps:</strong> Manuscript planning, storytelling, and peer-review rehearsal.
                  </li>
                  <li>
                    <strong>IPR readiness labs:</strong> Disclosure drafting, patent search, and commercialisation pathways.
                  </li>
                  <li>
                    <strong>Accreditation playbook sessions:</strong> Mapping evidence packs to NBA, NAAC, NIRF, and QS rubrics.
                  </li>
                  <li>
                    <strong>Innovation demo days:</strong> Prototype showcases with industry mentors and funding dialogues.
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#E1EEF3] shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-[#2C3E50] mb-4">Planning an upcoming event?</h3>
              <p className="text-[#2C3E50]/80 leading-relaxed">
                We co-design event agendas, manage speaker curation, and build collateral so your participants stay engaged. Tell
                us your audience and expected outcomes - we will share a draft run-of-show within 48 hours.
              </p>
              <a
                className="inline-flex items-center justify-center px-6 py-3 mt-6 bg-[#00A99D] text-white rounded-lg font-semibold hover:bg-[#2C3E50] transition-colors"
                href="/contact"
              >
                Share your brief
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

