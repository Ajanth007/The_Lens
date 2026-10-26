// AuthorsPage.jsx — all styles self-contained, no Navbar or Footer included.
// Usage in App.jsx:
//   <Navbar />
//   <main style={{ paddingTop: "64px" }}><AuthorsPage /></main>
//   <Footer />

import { useState } from "react";
import './cssFile/authors.css';



// ── Data ──────────────────────────────────────────────────────────────────────
const authors = [
  {
    id: "sophia",
    name: "Sophia Hartwell",
    initials: "SH",
    role: "Editor in Chief",
    bg: "#fef3c7", text: "#92400e", accent: "#f59e0b",
    location: "New York, NY",
    joined: "2018",
    articleCount: 54,
    totalReads: "320K",
    featured: true,
    bio: "Former NYT journalist with 12 years covering culture and technology. Sophia leads The Lens's editorial direction, shaping every story that reaches our readers. She believes great journalism is equal parts rigour and empathy.",
    longBio: "Before founding The Lens, Sophia spent a decade at the New York Times covering the intersection of technology and human experience. Her work has been cited in congressional hearings and translated into seven languages. She holds an MFA in Literary Nonfiction from Columbia University.",
    topics: ["Culture", "Opinion", "Society", "Work"],
    recentArticles: [
      { title: "What We Lose When We Stop Reading Long-Form", date: "Feb 15, 2026", time: "6 min", category: "Culture" },
      { title: "Stop Calling Everything a Revolution",         date: "Feb 8, 2026",  time: "4 min", category: "Opinion" },
      { title: "Remote Work's Quiet Casualties",              date: "Jan 30, 2026", time: "7 min", category: "Work"    },
    ],
    topicBreakdown: [
      { label: "Culture",  pct: 42 },
      { label: "Opinion",  pct: 28 },
      { label: "Society",  pct: 18 },
      { label: "Work",     pct: 12 },
    ],
    socials: { twitter: "#", linkedin: "#" },
    quote: "The best journalism makes you feel less alone in the world.",
  },
  {
    id: "marcus",
    name: "Marcus Liu",
    initials: "ML",
    role: "Senior Writer",
    bg: "#dbeafe", text: "#1d4ed8", accent: "#3b82f6",
    location: "San Francisco, CA",
    joined: "2019",
    articleCount: 41,
    totalReads: "280K",
    featured: true,
    bio: "Investigative reporter turned essayist. Marcus covers AI, open source, and the quiet revolutions happening inside the tech industry. His long-form pieces have been cited in congressional hearings.",
    longBio: "Marcus started his career at Wired before joining The Lens as a founding writer. His investigations into AI model training data practices sparked a policy debate that led to new transparency guidelines from three major AI labs. He holds a BS in Computer Science from MIT.",
    topics: ["Technology", "Politics", "Opinion"],
    recentArticles: [
      { title: "The Quiet Revolution: How Small AI Models Are Outpacing Giants", date: "Feb 18, 2026", time: "9 min",  category: "Technology" },
      { title: "The Browser Is the New OS",                                       date: "Feb 6, 2026",  time: "6 min",  category: "Technology" },
      { title: "The Polling Crisis Nobody Is Talking About",                      date: "Jan 28, 2026", time: "10 min", category: "Politics"   },
    ],
    topicBreakdown: [
      { label: "Technology", pct: 65 },
      { label: "Politics",   pct: 22 },
      { label: "Opinion",    pct: 13 },
    ],
    socials: { twitter: "#", linkedin: "#" },
    quote: "The most important tech stories aren't about the technology.",
  },
  {
    id: "priya",
    name: "Priya Menon",
    initials: "PM",
    role: "Design & Visual Editor",
    bg: "#fce7f3", text: "#9d174d", accent: "#ec4899",
    location: "London, UK",
    joined: "2020",
    articleCount: 28,
    totalReads: "190K",
    featured: false,
    bio: "Visual storyteller and data journalist. Priya transforms complex ideas into beautiful, accessible graphics and layouts — and writes about design, science, and the built environment.",
    longBio: "Priya studied information design at the Royal College of Art before moving into journalism. She leads all visual projects at The Lens and contributes long-form pieces on architecture, urban planning, and science communication. Her data visualisations have won three Malofiej Awards.",
    topics: ["Culture", "Science", "Psychology"],
    recentArticles: [
      { title: "Rewilding Cities: The Green Infrastructure Bet", date: "Feb 10, 2026", time: "5 min", category: "Science"  },
      { title: "Vinyl's Third Act",                             date: "Feb 4, 2026",  time: "5 min", category: "Culture"  },
      { title: "Architecture That Heals",                       date: "Jan 22, 2026", time: "5 min", category: "Culture"  },
    ],
    topicBreakdown: [
      { label: "Culture",    pct: 50 },
      { label: "Science",    pct: 32 },
      { label: "Psychology", pct: 18 },
    ],
    socials: { twitter: "#", linkedin: "#" },
    quote: "Design is how journalism breathes.",
  },
  {
    id: "james",
    name: "James Okafor",
    initials: "JO",
    role: "Technology Editor",
    bg: "#d1fae5", text: "#065f46", accent: "#10b981",
    location: "Lagos, Nigeria",
    joined: "2021",
    articleCount: 33,
    totalReads: "210K",
    featured: false,
    bio: "Engineer turned writer. James covers AI ethics, open source, and the intersection of technology with health and society. He brings a builder's perspective to every story.",
    longBio: "James spent five years as a software engineer at a major fintech company before pivoting to journalism. His technical background gives him a unique lens on the stories others miss — particularly around how AI systems fail in practice. He is a vocal advocate for equitable access to technology across the African continent.",
    topics: ["Technology", "Science", "Society"],
    recentArticles: [
      { title: "The Four-Day Week: One Year Later",            date: "Feb 12, 2026", time: "7 min", category: "Society"    },
      { title: "Gut Bacteria and Your Mood",                   date: "Feb 2, 2026",  time: "8 min", category: "Science"    },
      { title: "Why Open Source AI Is Winning the Enterprise", date: "Jan 25, 2026", time: "6 min", category: "Technology" },
    ],
    topicBreakdown: [
      { label: "Technology", pct: 48 },
      { label: "Science",    pct: 30 },
      { label: "Society",    pct: 22 },
    ],
    socials: { twitter: "#", linkedin: "#" },
    quote: "The best tech journalism makes engineers uncomfortable in all the right ways.",
  },
];

const sortOptions = ["All", "Most articles", "Most reads", "Newest member", "A–Z"];

// ── Helpers ───────────────────────────────────────────────────────────────────
function SocialIcons({ socials }) {
  return (
    <div className="flex gap-2">
      {socials.twitter && (
        <a href={socials.twitter} className="aup-social-btn" aria-label="Twitter">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>
      )}
      {socials.linkedin && (
        <a href={socials.linkedin} className="aup-social-btn" aria-label="LinkedIn">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        </a>
      )}
    </div>
  );
}

function TopicBreakdown({ breakdown, accent }) {
  return (
    <div className="space-y-2 mt-4">
      {breakdown.map((b) => (
        <div key={b.label}>
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>{b.label}</span><span>{b.pct}%</span>
          </div>
          <div className="aup-progress-bar">
            <div className="aup-progress-fill" style={{ width: `${b.pct}%`, background: accent }} />
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function AuthorsPage() {
  const [search, setSearch]     = useState("");
  const [sort, setSort]         = useState("All");
  const [selected, setSelected] = useState(null); // author id

  const filtered = authors
    .filter((a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.role.toLowerCase().includes(search.toLowerCase()) ||
      a.topics.some((t) => t.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => {
      if (sort === "Most articles")  return b.articleCount - a.articleCount;
      if (sort === "Most reads")     return parseInt(b.totalReads) - parseInt(a.totalReads);
      if (sort === "Newest member")  return parseInt(b.joined) - parseInt(a.joined);
      if (sort === "A–Z")            return a.name.localeCompare(b.name);
      return 0;
    });

  const featuredAuthors = filtered.filter((a) => a.featured);
  const restAuthors     = filtered.filter((a) => !a.featured);
  const selectedAuthor  = authors.find((a) => a.id === selected);

  const toggleSelected = (id) => setSelected(selected === id ? null : id);

  return (
    <>
  

      <div className="body-font">

        {/* ══ HERO ═════════════════════════════════════════════════════════════ */}
        <section className="aup-hero px-6 pt-16 pb-14">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="aup-fade-up">
                <p className="text-amber-500 text-xs font-medium tracking-widest uppercase mb-2">The Team</p>
                <h1 className="brand-font text-5xl md:text-6xl text-gray-900 leading-tight">
                  Meet the<br />
                  <span className="italic text-amber-500">authors</span>
                </h1>
                <p className="text-gray-400 mt-3 text-base max-w-sm leading-relaxed">
                  {authors.length} writers, {authors.reduce((s, a) => s + a.articleCount, 0)}+ articles,
                  and one shared belief: that slow journalism matters.
                </p>
              </div>

              {/* Search */}
              <div className="aup-search-wrap aup-fade-up aup-d2">
                <svg className="aup-search-icon w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  placeholder="Search authors or topics…"
                  className="aup-search-input"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setSelected(null); }}
                />
              </div>
            </div>

            {/* Sort tabs */}
            <div className="flex flex-wrap gap-2 mt-8 aup-fade-up aup-d3">
              {sortOptions.map((s) => (
                <button key={s} className={`aup-tab ${sort === s ? "active" : ""}`} onClick={() => setSort(s)}>
                  {s}
                </button>
              ))}
              <span className="flex items-center text-xs text-gray-400 ml-2">
                {filtered.length} author{filtered.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </section>

        {/* ══ MAIN CONTENT ═════════════════════════════════════════════════════ */}
        <div className="max-w-6xl mx-auto px-6 py-14">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* ── Left: Author cards ── */}
            <div className="lg:col-span-2">

              {/* Empty state */}
              {filtered.length === 0 && (
                <div className="aup-empty aup-fade-up">
                  <p className="text-5xl mb-4">✍️</p>
                  <p className="brand-font text-2xl text-gray-700 mb-2">No authors found</p>
                  <p className="text-gray-400 text-sm mb-6">Try a different name or topic.</p>
                  <button className="aup-tab" onClick={() => setSearch("")}>Clear search</button>
                </div>
              )}

              {/* ── Featured authors (large cards) ── */}
              {!search && featuredAuthors.length > 0 && (
                <div className="mb-10">
                  <h2 className="brand-font text-2xl text-gray-900 mb-5">Featured writers</h2>
                  <div className="grid sm:grid-cols-2 gap-5">
                    {featuredAuthors.map((a, i) => (
                      <div key={a.id} className={`aup-fade-up aup-d${i + 1}`}>
                        <div
                          className="aup-featured-card cursor-pointer"
                          onClick={() => toggleSelected(a.id)}
                        >
                          {/* Card header band */}
                          <div
                            className="h-24 relative flex items-end px-6 pb-0"
                            style={{ background: `linear-gradient(135deg, ${a.bg} 0%, #fff 100%)` }}
                          >
                            <div
                              className="aup-avatar-lg absolute -bottom-8 left-6"
                              style={{ background: a.bg, color: a.text }}
                            >
                              {a.initials}
                            </div>
                          </div>

                          {/* Card body */}
                          <div className="pt-12 px-6 pb-6">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="brand-font text-xl text-gray-900">{a.name}</h3>
                                <p className="text-xs font-medium tracking-wide uppercase mt-0.5" style={{ color: a.accent }}>
                                  {a.role}
                                </p>
                              </div>
                              <SocialIcons socials={a.socials} />
                            </div>

                            <p className="text-gray-400 text-sm leading-relaxed mb-4">{a.bio}</p>

                            {/* Stats */}
                            <div className="flex flex-wrap gap-2 mb-4">
                              <span className="aup-stat-pill">
                                <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3 text-gray-400">
                                  <path d="M2 4h12v1.5H2V4zm0 3h9v1.5H2V7zm0 3h7v1.5H2V10z"/>
                                </svg>
                                {a.articleCount} articles
                              </span>
                              <span className="aup-stat-pill">
                                <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3 text-gray-400">
                                  <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 2a5 5 0 1 1 0 10A5 5 0 0 1 8 3zm1 5V5H7v3H4.5l3.5 4 3.5-4H9z"/>
                                </svg>
                                {a.totalReads} reads
                              </span>
                              <span className="aup-stat-pill">📍 {a.location}</span>
                            </div>

                            {/* Topics */}
                            <div className="flex flex-wrap gap-1.5 mb-4">
                              {a.topics.map((t) => (
                                <span key={t} className="aup-topic-pill">{t}</span>
                              ))}
                            </div>

                            <button
                              className="text-xs font-medium transition-colors"
                              style={{ color: a.accent }}
                            >
                              {selected === a.id ? "Hide profile ↑" : "View full profile →"}
                            </button>
                          </div>
                        </div>

                        {/* Expanded detail */}
                        {selected === a.id && (
                          <div className="aup-detail-panel aup-fade-up">
                            <div className="px-6 py-5 border-b border-gray-100">
                              <p className="brand-font text-base text-gray-900 mb-2">About {a.name.split(" ")[0]}</p>
                              <p className="text-gray-500 text-sm leading-relaxed">{a.longBio}</p>
                              <p className="brand-font italic mt-3 text-sm" style={{ color: a.accent }}>
                                "{a.quote}"
                              </p>
                            </div>
                            <div className="px-6 py-5 border-b border-gray-100">
                              <p className="brand-font text-base text-gray-900 mb-3">Topic breakdown</p>
                              <TopicBreakdown breakdown={a.topicBreakdown} accent={a.accent} />
                            </div>
                            <div className="px-6 py-5">
                              <p className="brand-font text-base text-gray-900 mb-3">Recent articles</p>
                              {a.recentArticles.map((art, ri) => (
                                <div key={ri} className="aup-article-row">
                                  <div className="flex items-start justify-between gap-3">
                                    <div>
                                      <span className="aup-topic-pill mb-1 inline-block">{art.category}</span>
                                      <p className="brand-font text-sm text-gray-800 leading-snug hover:text-amber-600 transition-colors">
                                        {art.title}
                                      </p>
                                    </div>
                                    <span className="text-xs text-gray-400 whitespace-nowrap">{art.time}</span>
                                  </div>
                                  <p className="text-xs text-gray-400 mt-1">{art.date}</p>
                                </div>
                              ))}
                              <a href="#" className="text-xs font-medium hover:opacity-80 transition-opacity mt-4 inline-block" style={{ color: a.accent }}>
                                See all {a.articleCount} articles →
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Rest / all authors ── */}
              {(search ? filtered : restAuthors).length > 0 && (
                <div>
                  {!search && <h2 className="brand-font text-2xl text-gray-900 mb-5">All writers</h2>}
                  <div className="grid sm:grid-cols-2 gap-5">
                    {(search ? filtered : restAuthors).map((a, i) => (
                      <div key={a.id} className={`aup-fade-up aup-d${Math.min(i + 1, 6)}`}>
                        <div
                          className="aup-card"
                          style={{ "--aup-accent": a.accent }}
                          onClick={() => toggleSelected(a.id)}
                        >
                          <div className="flex items-start gap-4 mb-4">
                            <div className="aup-avatar-md" style={{ background: a.bg, color: a.text }}>
                              {a.initials}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="brand-font text-lg text-gray-900 leading-tight">{a.name}</h3>
                              <p className="text-xs font-medium tracking-wide uppercase mt-0.5" style={{ color: a.accent }}>
                                {a.role}
                              </p>
                              <p className="text-xs text-gray-400 mt-0.5">📍 {a.location}</p>
                            </div>
                            <SocialIcons socials={a.socials} />
                          </div>

                          <p className="text-gray-400 text-xs leading-relaxed mb-4">{a.bio}</p>

                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {a.topics.map((t) => (
                              <span key={t} className="aup-topic-pill">{t}</span>
                            ))}
                          </div>

                          <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                            <div className="flex gap-3">
                              <span className="aup-stat-pill">{a.articleCount} articles</span>
                              <span className="aup-stat-pill">{a.totalReads} reads</span>
                            </div>
                            <span className="text-xs font-medium" style={{ color: a.accent }}>
                              {selected === a.id ? "Hide ↑" : "Profile →"}
                            </span>
                          </div>
                        </div>

                        {/* Expanded detail */}
                        {selected === a.id && (
                          <div className="aup-detail-panel aup-fade-up">
                            <div className="px-6 py-5 border-b border-gray-100">
                              <p className="brand-font text-base text-gray-900 mb-2">About {a.name.split(" ")[0]}</p>
                              <p className="text-gray-500 text-sm leading-relaxed">{a.longBio}</p>
                              <p className="brand-font italic mt-3 text-sm" style={{ color: a.accent }}>
                                "{a.quote}"
                              </p>
                            </div>
                            <div className="px-6 py-5 border-b border-gray-100">
                              <p className="brand-font text-base text-gray-900 mb-3">Topic breakdown</p>
                              <TopicBreakdown breakdown={a.topicBreakdown} accent={a.accent} />
                            </div>
                            <div className="px-6 py-5">
                              <p className="brand-font text-base text-gray-900 mb-3">Recent articles</p>
                              {a.recentArticles.map((art, ri) => (
                                <div key={ri} className="aup-article-row">
                                  <div className="flex items-start justify-between gap-3">
                                    <div>
                                      <span className="aup-topic-pill mb-1 inline-block">{art.category}</span>
                                      <p className="brand-font text-sm text-gray-800 leading-snug hover:text-amber-600 transition-colors">
                                        {art.title}
                                      </p>
                                    </div>
                                    <span className="text-xs text-gray-400 whitespace-nowrap">{art.time}</span>
                                  </div>
                                  <p className="text-xs text-gray-400 mt-1">{art.date}</p>
                                </div>
                              ))}
                              <a href="#" className="text-xs font-medium hover:opacity-80 transition-opacity mt-4 inline-block" style={{ color: a.accent }}>
                                See all {a.articleCount} articles →
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── Sidebar ── */}
            <aside className="lg:col-span-1 space-y-8">

              {/* Team at a glance */}
              <div className="border border-gray-100 rounded-2xl p-6 bg-gray-50">
                <h3 className="brand-font text-lg text-gray-900 mb-4">Team at a glance</h3>
                <div className="space-y-3">
                  {[
                    { label: "Total writers",    value: authors.length },
                    { label: "Articles written", value: authors.reduce((s, a) => s + a.articleCount, 0) + "+" },
                    { label: "Total reads",      value: "1M+" },
                    { label: "Countries",        value: "3" },
                    { label: "Publishing since", value: "2018" },
                  ].map((s) => (
                    <div key={s.label} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-none">
                      <span className="text-gray-500 text-sm">{s.label}</span>
                      <span className="brand-font text-gray-900 font-semibold">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick jump */}
              <div>
                <h3 className="brand-font text-lg text-gray-900 mb-4 pb-3 border-b border-gray-100">Quick jump</h3>
                <div className="space-y-3">
                  {authors.map((a) => (
                    <div
                      key={a.id}
                      className="flex items-center gap-3 cursor-pointer group"
                      onClick={() => { setSearch(""); setSelected(a.id); }}
                    >
                      <div
                        className="aup-avatar-sm"
                        style={{ background: a.bg, color: a.text, width: 36, height: 36, fontSize: "0.7rem" }}
                      >
                        {a.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-700 group-hover:text-amber-600 transition-colors truncate">
                          {a.name}
                        </p>
                        <p className="text-xs text-gray-400 truncate">{a.role}</p>
                      </div>
                      <span
                        className="text-xs font-medium px-2 py-0.5 rounded-full"
                        style={{ background: a.bg, color: a.text }}
                      >
                        {a.articleCount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="border border-amber-100 rounded-2xl p-6 bg-amber-50">
                <p className="brand-font text-lg text-gray-900 mb-1">Follow a writer</p>
                <p className="text-gray-400 text-xs leading-relaxed mb-4">
                  Subscribe and get new articles from your favourite authors delivered weekly.
                </p>
                <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
                  <input type="email" placeholder="your@email.com" className="aup-nl-input" />
                  <button type="submit" className="aup-nl-btn">Subscribe free</button>
                </form>
                <p className="text-gray-400 text-xs mt-3 text-center">48,000+ readers · No spam</p>
              </div>

              {/* Write for us */}
              <div className="aup-join-card">
                <div className="aup-join-orb" style={{ width: 180, height: 180, top: -60, right: -60 }} />
                <div className="aup-join-orb" style={{ width: 120, height: 120, bottom: -40, left: -40 }} />
                <p className="text-amber-400 text-xs tracking-widest uppercase font-medium mb-2 relative z-10">
                  Join the team
                </p>
                <p className="brand-font text-xl text-white mb-2 relative z-10">Write for The Lens</p>
                <p className="text-gray-400 text-xs leading-relaxed mb-5 relative z-10">
                  We're always looking for thoughtful writers with a distinct voice and something important to say.
                </p>
                <a
                  href="#"
                  className="inline-block bg-amber-400 hover:bg-amber-300 text-gray-900 font-semibold text-xs px-5 py-2.5 rounded-full transition-colors relative z-10"
                >
                  View open roles →
                </a>
              </div>

            </aside>
          </div>
        </div>
      </div>
    </>
  );
}