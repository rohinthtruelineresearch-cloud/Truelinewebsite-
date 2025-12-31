import { useEffect, useMemo, useState } from "react";
import ResourceHeroAnimation from "../components/ResourceHeroAnimation";
import AdminModal from "../components/AdminModal";
import { API_BASE_URL } from "../lib/api";

const featuredArticle = {
  title: "Transforming Research Workflows with AI Automation",
  summary:
    "How intelligent algorithms, automated data processing, and AI-powered analytics tools streamline literature reviews, manuscript preparation, and grant applications for modern researchers.",
  author: "Trueline Research Studio",
  date: "October 12, 2025",
  readingTime: "",
  category: "Research Ops",
};

const featuredArticleContent = [
  "At Trueline Research we treat enablement as a connected system. Editorial pods, patent desks, accreditation squads, and analytics guardians all run on shared cadences, dashboards, and decision rituals.",
  "This feature story details the choreography behind that system-from disclosure intake to reviewer rehearsals and evidence rooms-highlighting the artefacts, governance rhythms, and automation layers that keep outcomes reliable.",
  "You will find play-by-play checklists you can adapt to map stakeholders, introduce AI responsibly, and keep leadership aligned to the same signals.",
];

const baseSpotlightArticles = [
  {
    title: "Accelerating Literature Reviews with NLP-Assisted Analysis",
    summary:
      "Practical methods for semantic search, citation extraction, and faster screening to reduce review time and improve consistency.",
    category: "AI TOOLING",
    author: "Editorial Lab",
    date: "October 04, 2025",
    readingTime: "",
  },
  {
    title: "Grant Proposal Frameworks that Improve Success Rates",
    summary:
      "A structured approach to problem framing, outcomes, budgeting, and evidence—built to strengthen proposal quality.",
    category: "FUNDING STRATEGY",
    author: "Patent Acceleration Team",
    date: "September 26, 2025",
    readingTime: "",
  },
  {
    title: "Building Reproducible Research Pipelines with Python",
    summary:
      "Step-by-step workflow design using version control, automation, and documentation to support transparency and repeatability.",
    category: "RESEARCH AUTOMATION",
    author: "Data Science Unit",
    date: "September 09, 2025",
    readingTime: "",
  },
  {
    title: "Connecting Researchers Through Smart Discovery Workflows",
    summary:
      "How structured profiles, research themes, and similarity mapping can support collaboration and mentorship across institutions.",
    category: "INSTITUTIONAL GROWTH",
    author: "Strategy Studio",
    date: "August 18, 2025",
    readingTime: "",
  },
  {
    title: "Choosing the Right Metrics for Research Data Analysis",
    summary:
      "A practical checklist for selecting methods, validating results, and turning data into clear, publishable insights.",
    category: "DATA ANALYTICS",
    author: "Analytics Desk",
    date: "August 01, 2025",
    readingTime: "",
  },
  {
    title: "Embedding Ethics and Compliance Checks into Publication Workflows",
    summary:
      "How originality, citations, and formatting checks fit into drafting cycles without slowing teams down.",
    category: "MANUSCRIPTS",
    author: "Compliance Studio",
    date: "July 21, 2025",
    readingTime: "",
  },
];

const baseLatestPosts = [
  {
    title: "Four Useful Metrics for Research Office Dashboards",
    summary:
      "What we monitor weekly across publication, patent, accreditation, and analytics programmes to prevent surprises.",
    date: "October 20, 2025",
    readingTime: "",
  },
  {
    title: "Designing Faculty Development Clinics: A Practical Blueprint",
    summary:
      "Design notes from five campuses that embedded publication, IP, and innovation modules into faculty enablement sprints.",
    date: "October 11, 2025",
    readingTime: "",
  },
  {
    title: "Licensing Pathways: From Disclosure to Market Readiness",
    summary:
      "A sequencing model for moving disclosures through market fit validation, pitch dossiers, and industry outreach.",
    date: "September 28, 2025",
    readingTime: "",
  },
  {
    title: "Structuring Reviewer Responses for High-Impact Journals",
    summary:
      "How we choreograph author pods, reviewer mirrors, and decision logs to keep revisions disciplined and fast.",
    date: "September 14, 2025",
    readingTime: "",
  },
];

const categories = [
  { label: "Manuscripts", count: 18 },
  { label: "IPR Strategy", count: 14 },
  { label: "Accreditation", count: 11 },
  { label: "Research Ops", count: 9 },
  { label: "AI Enablement", count: 8 },
  { label: "Institutional Growth", count: 6 },
];

const editorPicks = [
  "Operationalising AI in Research Offices",
  "Navigating Patent Prosecution Timelines",
  "Building Campus Innovation Clinics",
  "Designing Data Stories for Rankings Committees",
];

const trendTopics = ["AI IN RESEARCH", "MACHINE LEARNING", "RESEARCH AUTOMATION", "PUBLICATION SUPPORT", "DATA ANALYTICS"];

const ribbonColors = ["from-[#00A99D]", "from-[#2C3E50]", "from-[#F39C12]", "from-[#4FB7B1]"];

const addContent = (article) => ({
  ...article,
  content: [
    article.summary,
    `In this article we unpack ${article.title.toLowerCase()} with playbooks, checklists, and cautionary notes pulled from live programmes.`,
    "Use the included prompts to adapt the framework to your teams, tool stacks, and governance cadences.",
  ],
});

export default function Blog() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [blogPosts, setBlogPosts] = useState([]);
  const [activeArticle, setActiveArticle] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/blog`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setBlogPosts(data);
        } else {
          console.error("API returned non-array data:", data);
          setBlogPosts([]);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch blog posts:", err);
        setBlogPosts([]);
      });
  }, []);

  // Keyboard shortcut to open admin panel (Ctrl + Shift + F11)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === "F11") {
        e.preventDefault(); // Prevent browser from toggling full screen
        setIsAdminOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveArticle(null);
      }
    };
    window.addEventListener("keydown", onKeyDown, { passive: true });
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Merge static and dynamic articles
  const allSpotlight = [...blogPosts.filter(p => p.isSpotlight), ...baseSpotlightArticles].map(addContent);
  const allLatest = [...blogPosts.filter(p => !p.isFeatured && !p.isSpotlight), ...baseLatestPosts];
  
  // Find featured article (dynamic first, then static fallback)
  const dynamicFeatured = blogPosts.find(p => p.isFeatured);
  const currentFeatured = dynamicFeatured ? { ...dynamicFeatured, content: dynamicFeatured.content } : { ...featuredArticle, content: featuredArticleContent };

  const spotlightArticles = useMemo(() => allSpotlight, [allSpotlight]);
  const latestWithRibbons = useMemo(
    () =>
      allLatest.map((post, index) => ({
        ...addContent(post),
        ribbon: ribbonColors[index % ribbonColors.length],
      })),
    [allLatest],
  );

  const openArticle = (article) => {
    setActiveArticle(article);
  };

  const closeArticle = () => setActiveArticle(null);

  return (
    <div className="pt-0 bg-[#F7F9FA] text-[#2C3E50]">
      <section
        className="relative overflow-hidden py-20 text-white"
        style={{ background: "linear-gradient(135deg, #00A99D 0%, #2C3E50 85%)" }}
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=60')] opacity-20 bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#002c3f]/85 via-[#004352]/55 to-transparent" />
        <ResourceHeroAnimation className="mix-blend-screen opacity-80" />

        <div className="relative container mx-auto px-6">
          <div className="max-w-5xl mx-auto grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-start">
            <div className="space-y-6">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
                THE AI RESEARCH DISPATCH
              </p>
              <h1 className="text-5xl md:text-[3.4rem] font-bold leading-tight">
                AI insights, innovation guides, and practical solutions for next-gen researchers
              </h1>
              <p className="text-lg md:text-xl text-white/75 leading-relaxed">
                Expert perspectives on AI tools, machine learning applications, and research methodologies that accelerate discoveries and transform academic workflows into impactful outcomes.
              </p>
              <div className="flex flex-wrap gap-3">
                {trendTopics.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-full border border-white/35 px-4 py-1 text-xs font-semibold uppercase tracking-[0.26em] text-white/70"
                  >
                    {topic}
                  </span>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                

              </div>
            </div>

            <article className="relative overflow-hidden rounded-[32px] border border-white/30 bg-white/10 p-8 shadow-[0_28px_60px_-24px_rgba(0,0,0,0.45)] backdrop-blur">
              <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-[#2C3E50]/25" />
              <div className="relative space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">Featured Story</p>
                <h2 className="text-2xl font-semibold leading-snug">{currentFeatured.title}</h2>
                <p className="text-white/75 leading-relaxed">{currentFeatured.summary}</p>
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.26em] text-white/60">
                  <span>{currentFeatured.category}</span>
                  <span className="inline-flex h-1 w-1 rounded-full bg-white/60" aria-hidden />
                  <span>{currentFeatured.date}</span>
                  <span className="inline-flex h-1 w-1 rounded-full bg-white/60" aria-hidden />
                  <span>{currentFeatured.readingTime}</span>
                </div>

              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,0.9fr)]">
            <div className="space-y-10">
              <header className="flex flex-col gap-2">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#00A99D]">LATEST INSIGHTS</p>
                <h2 className="text-3xl font-bold text-[#2C3E50]"> Innovation we're delivering from the research frontlines</h2>
                <p className="text-lg text-[#2C3E50]/80">Practical guides and frameworks across AI enablement, research workflows, IPR, and accreditation readiness.</p>
              </header>

              <div className="grid gap-8 md:grid-cols-2">
                {spotlightArticles.map((post) => (
                  <article
                    key={post.title}
                    className="flex h-full flex-col rounded-3xl border border-[#00A99D]/20 bg-white shadow-[0_24px_50px_-30px_rgba(44,62,80,0.45)] transition hover:-translate-y-1 hover:shadow-[0_32px_70px_-34px_rgba(44,62,80,0.55)]"
                  >
                    <div className="flex flex-1 flex-col gap-4 p-6">
                      <div className="text-xs font-semibold uppercase tracking-[0.26em] text-[#00A99D]/75">
                        {post.category}
                      </div>
                      <h3 className="text-xl font-semibold text-[#2C3E50]">{post.title}</h3>
                      <p className="flex-1 text-sm leading-relaxed text-[#2C3E50]/80">{post.summary}</p>
                      <div className="text-xs font-semibold uppercase tracking-[0.26em] text-[#2C3E50]/60">
                        {post.author}
                      </div>
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.28em] text-[#00A99D] transition hover:text-[#2C3E50]"
                        onClick={() => openArticle(post)}
                      >
                        Read
                        <span aria-hidden className="text-lg leading-none">-&gt;</span>
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <aside className="space-y-10">
              <section className="rounded-3xl border border-[#00A99D]/20 bg-white/90 p-8 shadow-lg backdrop-blur">
                <h3 className="text-lg font-semibold text-[#2C3E50] mb-4">Latest posts</h3>
                <ul className="space-y-5">
                  {latestWithRibbons.map((post) => (
                    <li
                      key={post.title}
                      className="relative rounded-2xl border border-[#00A99D]/15 bg-[#F7F9FA] p-4 transition hover:border-[#00A99D]/35"
                    >
                      <span
                        className={`absolute -left-2 top-4 h-10 w-1 rounded-full bg-gradient-to-b ${post.ribbon} to-[#00A99D]/15`}
                        aria-hidden
                      />

                      <p className="mt-2 text-base font-medium text-[#2C3E50]">{post.title}</p>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.24em] text-[#2C3E50]/55">
                        {post.readingTime}
                      </p>
                      <button
                        type="button"
                        className="mt-3 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.24em] text-[#00A99D] transition hover:text-[#2C3E50]"
                        onClick={() => openArticle(post)}
                      >
                        Read
                        <span aria-hidden className="text-base leading-none">-&gt;</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded-3xl border border-[#00A99D]/20 bg-white/90 p-8 shadow-lg backdrop-blur">
                <h3 className="text-lg font-semibold text-[#2C3E50] mb-4">Categories</h3>
                <ul className="space-y-3">
                  {categories.map((category) => (
                    <li key={category.label} className="flex items-center justify-between text-sm">
                      <span className="font-medium text-[#2C3E50]">{category.label}</span>
                      <span className="rounded-full bg-[#E2F5F1] px-3 py-1 text-xs font-semibold text-[#00A99D]">
                        {category.count}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded-3xl border border-[#00A99D]/25 bg-white/90 p-8 shadow-lg backdrop-blur space-y-4">
                <h3 className="text-lg font-semibold text-[#2C3E50]">Editor&apos;s picks</h3>
                <ul className="space-y-3 text-sm text-[#2C3E50]/80 leading-relaxed">
                  {editorPicks.map((item) => (
                    <li key={item} className="relative pl-4">
                      <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-[#F39C12]" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              
            </aside>
          </div>
        </div>
      </section>

      {activeArticle && (
        <div
          className="fixed inset-0 z-[150] flex items-center justify-center bg-black/45 backdrop-blur-sm px-4 py-8"
          onClick={closeArticle}
        >
          <article
            role="dialog"
            aria-modal="true"
            aria-labelledby="blog-article-title"
            className="relative max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-[32px] border border-[#00A99D]/25 bg-white shadow-[0_40px_90px_-40px_rgba(44,62,80,0.65)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="space-y-4 overflow-y-auto px-8 py-10 md:px-10" style={{ maxHeight: "90vh" }}>
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.26em] text-[#00A99D]/75">
                {activeArticle.category ? <span>{activeArticle.category}</span> : null}
                {activeArticle.date ? (
                  <>
                    <span className="inline-flex h-1 w-1 rounded-full bg-[#00A99D]" aria-hidden />
                    <span>{activeArticle.date}</span>
                  </>
                ) : null}
                {activeArticle.readingTime ? (
                  <>
                    <span className="inline-flex h-1 w-1 rounded-full bg-[#00A99D]" aria-hidden />
                    <span>{activeArticle.readingTime}</span>
                  </>
                ) : null}
              </div>
              <h2 id="blog-article-title" className="text-3xl font-semibold text-[#2C3E50]">
                {activeArticle.title}
              </h2>
              {activeArticle.author ? (
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#2C3E50]/60">{activeArticle.author}</p>
              ) : null}
              <div className="space-y-5 text-sm leading-relaxed text-[#2C3E50]/80">
                {(activeArticle.content ?? [activeArticle.summary]).map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              <button
                type="button"
                onClick={closeArticle}
                className="inline-flex items-center gap-2 rounded-full border border-[#00A99D]/30 px-5 py-2 text-sm font-semibold uppercase tracking-[0.28em] text-[#00A99D] transition hover:border-[#00A99D] hover:text-[#2C3E50]"
              >
                Close
                <span aria-hidden className="text-lg leading-none">-&gt;</span>
              </button>
            </div>
          </article>
        </div>
      )}
      <AdminModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
}
