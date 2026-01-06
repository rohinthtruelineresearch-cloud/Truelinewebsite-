import { useState } from "react";
const quickLinks = [
  {
    label: "General enquiries",
    value: "info@truelineresearch.in",
    href: "mailto:info@truelineresearch.in",
  },
  {
    label: "Call the engagement desk",
    value: "Tamil Nadu :+91 95788 73584" + "\n" + "Kerala : +91 80564 17009",
    href: "tel:+919578873584",
  },
  {
    label: "Visit our Salem HeadQuarters",
    value: "Building No. 7/232-19, Devi Towers, Kalipatti Privu Road, Vaikuntham, Sankari, Salem, Tamil Nadu – 637103 , India",
    href: "https://maps.google.com/?q=Building+No.+7/232-19,+Devi+Towers,+Kalipatti+Privu+Road,+Vaikuntham,+Sankari,+Salem,+Tamil+Nadu+%E2%80%93+637103",
  },
];

const quickFacts = [
  { value: "<24 hrs", label: "AVERAGE REPLY TIME" },
  { value: "7 days", label: "SPRINT LAUNCH RUNWAY" },
  { value: "94%", label: "CLIENT SATISFACTION" },
];

const mainHQ = {
  label: "Salem HeadQuarters",
  address: [
    "Building No. 7/232-19, Devi Towers",
    "Kalipatti Privu Road, Vaikuntham",
    "Sankari, Salem – 637103, Tamil Nadu, India",
  ],
  mapsHref:
    "https://www.google.com/maps/place/Trueline+Research+Private+Limited/@11.5255774,77.9445763,17z/data=!3m1!4b1!4m6!3m5!1s0x3babe12b38a26675:0xbc48836741036261!8m2!3d11.5255722!4d77.9471512!16s%2Fg%2F11sf5ncts1?entry=ttu&g_ep=EgoyMDI1MTAyNy4wIKXMDSoASAFQAw%3D%3D",
};

const branchLocations = [
  {
    label: "Branch Office – Salem, Tamil Nadu",
    address: [
      "Co-Working Space, 2nd Floor, Sona Incubation Foundation,",
      "Sona College of Technology,",
      "Salem – 636005, Tamil Nadu, India.",
    ],
    mapsHref:
      "https://www.google.com/maps/search/?api=1&query=Sona+Incubation+Foundation+Salem",
  },
  {
    label: "Branch Office – Ernakulam, Kerala",
    address: [
      "Building No: 37/882, Opp. Municipal Town Hall",
      "Thirunilath Housing Colony, South Kalamassery",
      "Ernakulam - 682039, Kerala, India (Landmark: Cake Hut Shop)",
    ],
    mapsHref:
      "https://www.google.com/maps/place/Trueline+Research+Private+Limited+Kerala/@10.0440163,76.3121362,17z/data=!3m1!4b1!4m6!3m5!1s0x1aaf4bc328b2f49:0x1ec723e5e77bb4e7!8m2!3d10.0440111!4d76.3170071!16s%2Fg%2F11ykgsdxp4?entry=ttu&g_ep=EgoyMDI1MTAyNy4wIKXMDSoASAFQAw%3D%3D",
  },
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState({ ok: null, msg: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({
        ok: false,
        msg: "Please share your name, email, and a short message before continuing.",
      });
      return false;
    }
    setStatus({ ok: null, msg: "" });
    return true;
  };

  const handleEmail = (event) => {
    event.preventDefault();
    if (!validate()) return;

    const subject = `Contact enquiry from ${form.name}`;
    const bodyLines = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      "",
      form.message,
    ];
    const body = bodyLines.join("\n");

    const gmailParams = new URLSearchParams({
      view: "cm",
      fs: "1",
      to: "truelineresearchteam@gmail.com",
      su: subject,
      body,
    });
    const gmailUrl = `https://mail.google.com/mail/?${gmailParams.toString()}`;
    const popup = window.open(gmailUrl, "_blank", "noopener,noreferrer,width=1366,height=768");

    if (popup) {
      setStatus({
        ok: true,
        msg: "Opening Gmail compose...",
      });
    } else {
      const mailto = `mailto:truelineresearchteam@gmail.com?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
      setStatus({
        ok: true,
        msg: "Opening your email client...",
      });
    }
  };

  const handleWhatsApp = (event) => {
    event.preventDefault();
    if (!validate()) return;

    const text = [
      "Hi Trueline team,",
      "",
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      "",
      form.message,
    ].join("\n");
    const whatsappUrl = `https://wa.me/919578873584?text=${encodeURIComponent(
      text,
    )}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setStatus({
      ok: true,
      msg: "Opening WhatsApp...",
    });
  };

  return (
    <div className="bg-[#f5f8fb] text-[#0f172a]">
      <section
        className="relative overflow-hidden py-20 text-white"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,169,157,1) 0%, rgba(24,58,93,1) 75%)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-[#001627]/50 pointer-events-none" />
        <div className="container relative mx-auto px-6">
          <div className="mx-auto max-w-4xl text-center space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-white/70">
              Let's build together
            </p>
            <h1 className="text-4xl md:text-4xl font-bold leading-tight">
              Connect with the Trueline engagement desk
            </h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed">
              Trueline delivers end-to-end AI and technology development solutions, integrated with research, IPR, accreditation, and innovation ecosystems.
We help institutions and enterprises design, build, and scale innovation into real-world impact.Share your requirement—our experts align the right team, with most engagements kicking off within a week.

            </p>
            <div className="grid gap-4 sm:grid-cols-3 mt-10 text-left">
              {quickLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="rounded-2xl border border-white/30 bg-white/10 p-5 transition hover:bg-white/20"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/60">
                    {item.label}
                  </p>
                  <p className="mt-3 text-base font-medium text-white whitespace-pre-line">
                    {item.value}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] items-start">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-[#0f172a]">
                Tell Us About Your Requirement
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Whether you’re planning AI consulting, technology development, next-gen AI platforms, research & innovation labs, IPR enablement, accreditation & ranking initiatives, or startup & MSME ecosystem programs, share a brief note with us.
Our AI and technology specialists will assess your requirements and align the right expert team to guide the next steps—delivering fast, innovative, and practical solutions tailored to your goals.

              </p>
              <div className="flex flex-wrap gap-4">
                {quickFacts.map((fact) => (
                  <div
                    key={fact.label}
                    className="rounded-2xl border border-slate-200/80 bg-slate-50/70 px-5 py-4"
                  >
                    <p className="text-xl font-semibold text-[#00A99D]">
                      {fact.value}
                    </p>
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                      {fact.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <form
              onSubmit={(event) => event.preventDefault()}
              className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-[0_25px_60px_-40px_rgba(15,23,42,0.4)] space-y-6"
            >
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-semibold text-slate-700">
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Dr. Kavya Raman"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-[#00A99D] focus:outline-none focus:ring-2 focus:ring-[#00A99D]/20"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold text-slate-700">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@institution.edu"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-[#00A99D] focus:outline-none focus:ring-2 focus:ring-[#00A99D]/20"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-semibold text-slate-700">
                  How can we help?
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Share a sentence or two about your manuscript, IP sprint, or accreditation goal."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-[#00A99D] focus:outline-none focus:ring-2 focus:ring-[#00A99D]/20"
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={handleEmail}
                  className="w-full rounded-full bg-[#00A99D] px-6 py-3 font-semibold text-white transition hover:bg-[#0b3244]"
                >
                  Email us
                </button>
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="w-full rounded-full border border-[#00A99D]/40 px-6 py-3 font-semibold text-[#00A99D] transition hover:bg-[#00A99D]/10"
                >
                  Chat on WhatsApp
                </button>
              </div>

              {status.msg && (
                <div
                  className={`rounded-xl px-4 py-3 text-sm font-medium ${status.ok ? "bg-[#00A99D]/10 text-[#006d68]" : "bg-rose-50 text-rose-600"
                    }`}
                >
                  {status.msg}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>


      <section className="py-16 bg-[#f5f8fb] text-[#0f172a]">
        <div className="container mx-auto px-6 space-y-8">
          <h2 className="text-4xl font-bold text-center uppercase tracking-[0.32em] text-[#00A99D]/80">
            Branch offices
          </h2>
          <div className="space-y-6">
            {/* Main HQ */}
            <a
              href={mainHQ.mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-[#00A99D]/5 p-8 text-center transition duration-300 hover:-translate-y-1 hover:border-[#00A99D]/40 hover:shadow-xl hover:shadow-[#00A99D]/10"
            >
              <div className="flex flex-col items-center gap-6">
                <div className="space-y-4 w-full">
                  <p className="text-base font-bold uppercase tracking-[0.18em] text-[#00A99D] flex items-center justify-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#00A99D] animate-pulse"></span>
                    {mainHQ.label}
                  </p>
                  <div className="space-y-1 text-2xl text-slate-800 font-bold max-w-3xl mx-auto">
                    {mainHQ.address.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </div>
                <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.28em] text-slate-400 group-hover:text-[#00A99D] bg-white px-8 py-4 rounded-full shadow-sm group-hover:shadow-md transition-all group-hover:bg-[#00A99D] group-hover:text-white">
                  View on Maps
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-5 w-5 transition-transform group-hover:translate-x-1"
                  >
                    <path d="M7 17 17 7" />
                    <path d="M8 7h9v9" />
                  </svg>
                </span>
              </div>
            </a>

            {/* Branches Grid */}
            <div className="grid gap-6 md:grid-cols-2">
              {branchLocations.map((branch) => (
                <a
                  key={branch.label}
                  href={branch.mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-[#00A99D]/5 p-8 text-center transition duration-300 hover:-translate-y-1 hover:border-[#00A99D]/40 hover:shadow-xl hover:shadow-[#00A99D]/10 flex flex-col items-center h-full"
                >
                  <div className="flex-1 space-y-4 w-full">
                    <p className="text-base font-bold uppercase tracking-[0.18em] text-[#00A99D]">
                      {branch.label}
                    </p>
                    <div className="space-y-1 text-xl text-slate-700 font-bold">
                      {branch.address.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                  </div>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.28em] text-slate-400 group-hover:text-[#00A99D] bg-white px-8 py-4 rounded-full shadow-sm group-hover:shadow-md transition-all group-hover:bg-[#00A99D] group-hover:text-white">
                    View on Maps
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="h-5 w-5 transition-transform group-hover:translate-x-1"
                    >
                      <path d="M7 17 17 7" />
                      <path d="M8 7h9v9" />
                    </svg>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}





