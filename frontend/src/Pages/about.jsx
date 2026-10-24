import { useState, useEffect } from "react";

// ── Navbar (same as before) ───────────────────────────────────────────────────
/* const navLinks = [
   { label: "Home", href: "/" },
  { label: "Articles", href: "/articles" },
  { label: "Topics", href: "/topics" },
  { label: "Authors", href: "/authors" },
  { label: "About", href: "/about" },
]; */

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

 /*  return (
    <nav
      className={`nav-font fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 mt- 12 ${
        scrolled ? "navbar-shadow" : "border-b border-gray-100"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="brand-font text-2xl text-gray-900 tracking-tight">
            The&nbsp;<span className="text-amber-500">Lens</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button className="nav-link text-sm px-0">Sign in</button>
            <a href="/subscribe" className="bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-gray-700 transition-colors duration-200">
              Subscribe
            </a>
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
            aria-label="Toggle menu"
          >
            <span className={`block h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? "w-5 rotate-45 translate-y-2" : "w-5"}`} />
            <span className={`block h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? "opacity-0 w-0" : "w-4"}`} />
            <span className={`block h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? "w-5 -rotate-45 -translate-y-2" : "w-5"}`} />
          </button>
        </div>
      </div>
      <div className={`menu-slide md:hidden bg-white px-6 ${menuOpen ? "open" : "closed"}`}>
        <div className="pt-2 pb-4">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="mobile-link">{link.label}</a>
          ))}
          <div className="flex gap-3 mt-4">
            <button className="flex-1 border border-gray-200 text-gray-700 text-sm font-medium py-2 rounded-full hover:bg-gray-50 transition-colors">Sign in</button>
            <a href="#" className="flex-1 text-center bg-gray-900 text-white text-sm font-medium py-2 rounded-full hover:bg-gray-700 transition-colors">Subscribe</a>
          </div>
        </div>
      </div>
    // </nav>
  ); */
}

// ── Team Data ─────────────────────────────────────────────────────────────────
const team = [
  {
    name: "Sophia Hartwell",
    role: "Editor in Chief",
    bio: "Former NYT journalist with 12 years covering culture and tech. Passionate about stories that bridge the human and digital worlds.",
    avatar: "SH",
    color: "bg-amber-100 text-amber-700",
  },
  {
    name: "Marcus Liu",
    role: "Senior Writer",
    bio: "Investigative reporter and essayist. His long-form pieces on climate and society have been featured in major publications worldwide.",
    avatar: "ML",
    color: "bg-sky-100 text-sky-700",
  },
  {
    name: "Priya Menon",
    role: "Design & Visual",
    bio: "Visual storyteller and data journalist. She transforms complex ideas into beautiful, accessible graphics and layouts.",
    avatar: "PM",
    color: "bg-rose-100 text-rose-700",
  },
  {
    name: "James Okafor",
    role: "Technology Editor",
    bio: "Engineer turned writer. James covers AI, open source, and the intersection of technology with everyday life.",
    avatar: "JO",
    color: "bg-emerald-100 text-emerald-700",
  },
];

const values = [
  {
    icon: "✦",
    title: "Depth over speed",
    desc: "We take time to research, verify, and reflect before publishing. No hot takes — only considered perspectives.",
  },
  {
    icon: "◎",
    title: "Human voices first",
    desc: "Every piece centers the lived experience of real people. Data informs, but stories are told by people, for people.",
  },
  {
    icon: "◇",
    title: "Radical clarity",
    desc: "We write in plain language that respects our readers' intelligence without sacrificing nuance or accuracy.",
  },
  {
    icon: "△",
    title: "Open to critique",
    desc: "We publish corrections prominently, welcome pushback, and believe accountability makes journalism better.",
  },
];

const stats = [
  { value: "2018", label: "Founded" },
  { value: "48K+", label: "Subscribers" },
  { value: "320+", label: "Articles published" },
  { value: "12", label: "Countries reached" },
];

// ── About Page ────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        body { margin: 0; background: #fff; }

        .brand-font { font-family: 'Playfair Display', serif; }
        .nav-font    { font-family: 'DM Sans', sans-serif; }

        .nav-link {
          position: relative;
          color: #4b5563;
          font-size: 0.875rem;
          font-weight: 500;
          letter-spacing: 0.02em;
          transition: color 0.2s;
          padding-bottom: 2px;
          text-decoration: none;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0;
          width: 0; height: 1.5px;
          background: #111827;
          transition: width 0.25s ease;
        }
        .nav-link:hover { color: #111827; }
        .nav-link:hover::after { width: 100%; }

        .navbar-shadow {
          box-shadow: 0 1px 0 0 #e5e7eb, 0 4px 24px -4px rgba(0,0,0,0.06);
        }
        .mobile-link {
          display: block;
          padding: 0.75rem 0;
          border-bottom: 1px solid #f3f4f6;
          color: #374151;
          font-size: 1rem;
          font-weight: 500;
          transition: color 0.2s, padding-left 0.2s;
          text-decoration: none;
        }
        .mobile-link:hover { color: #111827; padding-left: 8px; }
        .menu-slide { transition: max-height 0.3s ease, opacity 0.3s ease; overflow: hidden; }
        .menu-slide.open  { max-height: 400px; opacity: 1; }
        .menu-slide.closed { max-height: 0; opacity: 0; }

        /* Hero */
        .about-hero {
          background: linear-gradient(160deg, #fefce8 0%, #ffffff 55%, #f0f9ff 100%);
          border-bottom: 1px solid #f3f4f6;
        }

        /* Decorative rule */
        .fancy-rule {
          width: 48px;
          height: 3px;
          background: #f59e0b;
          border-radius: 2px;
          margin: 0 auto 1.5rem;
        }
        .fancy-rule.left { margin: 0 0 1.5rem; }

        /* Stats row */
        .stat-item {
          text-align: center;
          padding: 2rem 2.5rem;
          border-right: 1px solid #e5e7eb;
        }
        .stat-item:last-child { border-right: none; }

        /* Team card */
        .team-card {
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          padding: 2rem;
          background: #fff;
          transition: box-shadow 0.25s, transform 0.25s;
        }
        .team-card:hover {
          box-shadow: 0 8px 32px -8px rgba(0,0,0,0.12);
          transform: translateY(-3px);
        }

        /* Value card */
        .value-card {
          background: #fafafa;
          border: 1px solid #f3f4f6;
          border-radius: 14px;
          padding: 1.75rem;
          transition: background 0.2s;
        }
        .value-card:hover { background: #fff7ed; border-color: #fed7aa; }

        /* CTA band */
        .cta-band {
          background: #111827;
          border-radius: 24px;
        }

        /* Fade-in on scroll stub (CSS only) */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.6s ease both; }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }
        .delay-3 { animation-delay: 0.3s; }
        .delay-4 { animation-delay: 0.4s; }
      `}</style>

      <Navbar />

      <main className="nav-font" style={{ paddingTop: "64px" }}>

        {/* ── Hero ── */}
        <section className="about-hero px-6 py-24 text-center">
          <p className="text-amber-500 text-sm font-medium tracking-widest uppercase mb-4 fade-up">About The Lens</p>
          <h1 className="brand-font text-5xl md:text-6xl text-gray-900 leading-tight mb-6 fade-up delay-1">
            Stories that<br />
            <span className="brand-font italic text-amber-500">matter most</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed fade-up delay-2">
            We're an independent publication dedicated to thoughtful, carefully crafted writing
            on culture, technology, and the way we live together.
          </p>
        </section>

        {/* ── Stats ── */}
        <section className="border-b border-gray-100 overflow-x-auto">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100 divide-y md:divide-y-0">
            {stats.map((s, i) => (
              <div key={s.label} className={`stat-item fade-up delay-${i + 1}`} style={{ borderRight: "none" }}>
                <p className="brand-font text-4xl text-gray-900 mb-1">{s.value}</p>
                <p className="text-gray-400 text-sm tracking-wide uppercase">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Mission ── */}
        <section className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <div className="fancy-rule left" />
            <h2 className="brand-font text-4xl text-gray-900 mb-6 leading-snug">
              Why we started<br />
              <span className="italic text-amber-400">The Lens</span>
            </h2>
            <p className="text-gray-500 leading-relaxed mb-4">
              In 2018, a small team of journalists grew frustrated with the relentless pressure to publish faster,
              louder, and more sensationally. We believed there was still an audience hungry for writing that
              slowed down — that asked harder questions and sat with uncomfortable answers.
            </p>
            <p className="text-gray-500 leading-relaxed mb-8">
              So we started The Lens. Independent, reader-supported, and completely free from advertiser
              influence. Every piece we publish is chosen because it enriches the conversation — not because
              it drives clicks.
            </p>
       
          </div>

          {/* Visual card */}
          <div className="relative">
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-10 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-amber-100 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-200 rounded-full translate-y-1/2 -translate-x-1/2 opacity-30" />
              <p className="brand-font italic text-2xl text-amber-800 leading-relaxed relative z-10">
                "Good journalism is the first draft of history — and we intend to get it right."
              </p>
              <p className="text-amber-600 text-sm mt-6 font-medium relative z-10">— Sophia Hartwell, Editor in Chief</p>
            </div>
          </div>
        </section>

        {/* ── Values ── */}
        <section className="bg-gray-50 border-y border-gray-100 px-6 py-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <div className="fancy-rule" />
              <h2 className="brand-font text-4xl text-gray-900 mb-3">What we stand for</h2>
              <p className="text-gray-400 max-w-md mx-auto text-base">
                Four principles guide every editorial decision we make.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {values.map((v, i) => (
                <div key={v.title} className={`value-card fade-up delay-${i + 1}`}>
                  <span className="text-2xl text-amber-500 mb-4 block">{v.icon}</span>
                  <h3 className="brand-font text-lg text-gray-900 mb-2">{v.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Team ── */}
        <section className="max-w-6xl mx-auto px-6 py-24">
          <div className="text-center mb-14">
            <div className="fancy-rule" />
            <h2 className="brand-font text-4xl text-gray-900 mb-3">Meet the team</h2>
            <p className="text-gray-400 max-w-md mx-auto text-base">
              A small, dedicated group of journalists, writers, and designers.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <div key={member.name} className={`team-card fade-up delay-${i + 1}`}>
                <div className={`w-14 h-14 rounded-2xl ${member.color} flex items-center justify-center brand-font text-lg font-bold mb-4`}>
                  {member.avatar}
                </div>
                <h3 className="brand-font text-lg text-gray-900">{member.name}</h3>
                <p className="text-amber-500 text-xs font-medium tracking-wide uppercase mt-0.5 mb-3">{member.role}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="max-w-6xl mx-auto px-6 pb-24">
          <div className="cta-band px-10 py-14 text-center">
            <p className="text-amber-400 text-sm tracking-widest uppercase font-medium mb-3">Join the community</p>
            <h2 className="brand-font text-4xl text-white mb-4">
              Read more. Think deeper.
            </h2>
            <p className="text-gray-400 max-w-md mx-auto mb-8 text-base leading-relaxed">
              Subscribe to The Lens and get our best articles delivered to your inbox — no noise, no ads, just writing worth your time.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-500 text-sm outline-none focus:border-amber-400 transition-colors"
              />
              <button className="bg-amber-400 hover:bg-amber-300 text-gray-900 font-medium text-sm px-6 py-3 rounded-full transition-colors whitespace-nowrap">
                Subscribe free
              </button>
            </div>
            <p className="text-gray-600 text-xs mt-4">No spam. Unsubscribe at any time.</p>
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer className="nav-font border-t border-gray-100 px-6 py-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="brand-font text-xl text-gray-900">
            The <span className="text-amber-500">Lens</span>
          </p>
          <p className="text-gray-400 text-sm">© 2025 The Lens. All rights reserved.</p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Contact"].map(l => (
              <a key={l} href="#" className="text-gray-400 text-sm hover:text-gray-700 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}