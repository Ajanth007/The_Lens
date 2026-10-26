import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./cssFile/Home.css";
import axios from "axios";

const api = "http://localhost:8000";

// ── Data ──────────────────────────────────────────────────────────────────────
// const featured = {
//   category: "Technology",
//   title: "The Quiet Revolution: How Small AI Models Are Outpacing Giants",
//   excerpt:
//     "For years, bigger meant better in AI research. A new wave of compact, efficient models is challenging that assumption — and reshaping who gets to build the future.",
//   author: "Marcus Liu",
//   date: "Feb 18, 2026",
//   readTime: "9 min read",
//   gradient: "linear-gradient(135deg, #fef3c7 0%, #e0f2fe 100%)",
//   accent: "#f59e0b",
// };

const trending = [
  {
    num: "01",
    category: "Opinion",
    title: "Stop Calling Everything a Revolution",
    author: "Sophia Hartwell",
    time: "4 min",
  },
  {
    num: "02",
    category: "Tech",
    title: "The Browser Is the New OS",
    author: "Marcus Liu",
    time: "6 min",
  },
  {
    num: "03",
    category: "Culture",
    title: "Vinyl's Third Act",
    author: "Priya Menon",
    time: "5 min",
  },
  {
    num: "04",
    category: "Science",
    title: "Gut Bacteria and Your Mood",
    author: "James Okafor",
    time: "8 min",
  },
  {
    num: "05",
    category: "Society",
    title: "Remote Work's Quiet Casualties",
    author: "Sophia Hartwell",
    time: "7 min",
  },
];

const topics = [
  { icon: "⚡", label: "Technology" },
  { icon: "🌿", label: "Climate" },
  { icon: "🎨", label: "Culture" },
  { icon: "🧠", label: "Psychology" },
  { icon: "🏙️", label: "Society" },
  { icon: "🔬", label: "Science" },
  { icon: "💼", label: "Work" },
  { icon: "🌍", label: "Politics" },
];

const marqueeItems = [
  "Artificial Intelligence",
  "Climate Action",
  "Future of Work",
  "Mental Health",
  "Urban Design",
  "Geopolitics",
  "Renewable Energy",
  "Digital Culture",
  "Space Exploration",
  "Healthcare",
  "Education Reform",
  "Creative Economy",
];

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Articles", href: "#" },
  { label: "Topics", href: "#" },
  { label: "Authors", href: "#" },
  { label: "About", href: "#" },
];

const footerLinks = {
  Explore: ["Home", "Articles", "Topics", "Authors", "About"],
  Topics: ["Technology", "Culture", "Science", "Society", "Opinion"],
  Company: ["About Us", "Editorial Charter", "Advertise", "Careers", "Press"],
  Legal: ["Privacy Policy", "Terms of Use", "Cookie Settings", "Accessibility"],
};

// ── Home Page ─────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [articles, setArticles] = useState([]);
  const [featured, setFeatured] = useState([]);
  const navigate = useNavigate();

  /*   {
    category: "Culture",
    title: "What We Lose When We Stop Reading Long-Form",
    excerpt:
      "Attention spans are shrinking — but the real casualty might be our capacity for empathy.",
    author: "Sophia Hartwell",
    date: "Feb 15, 2026",
    readTime: "6 min",
    color: "#fce7f3",
  }, */

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${api}/articles`);
        const allArticles = response.data.articles;

        const formatArticle = (article) => ({
          id: article.id,
          category: article.category,
          title: article.title,
          excerpt: article.excerpt,
          author: article.author_name,
          date: new Date(article.publish_date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            timeZone: "UTC",
          }),
          readTime: article.read_time,
          color: article.image_color,
          featured: Boolean(Number(article.featured)),
        });

        // Get the featured article separately
        const featured = allArticles.find(
          (article) => Number(article.featured) === 1,
        );

        setFeatured(featured ? formatArticle(featured) : null);

        // Exclude featured articles from the regular articles list
        const formattedArticles = allArticles
          .filter((article) => Number(article.featured) !== 1)
          .map(formatArticle);

        setArticles(formattedArticles);
        console.log(featured);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <>
      <div style={{ paddingTop: "64px" }}>
        {/* ── HERO ── */}
        <section className="hero-bg px-6 pt-20 pb-16 overflow-hidden">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left: Text */}
              <div>
                <div className="hero-eyebrow fade-up mb-5">
                  <span className="hero-eyebrow-dot pulse-dot" />
                  <span>Now reading · Feb 2026</span>
                </div>
                <h1 className="brand-font text-5xl md:text-6xl text-gray-900 leading-[1.1] mb-6 fade-up delay-1">
                  Ideas worth
                  <br />
                  <span className="italic text-amber-500">slowing down</span>
                  <br />
                  for.
                </h1>
                <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-md fade-up delay-2">
                  Thoughtful writing on culture, technology, and the way we live
                  — free from advertiser pressure, written for readers who
                  think.
                </p>
                <div className="flex flex-wrap gap-3 fade-up delay-3">
                  <a
                    href="/articles"
                    className="bg-gray-900 text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-gray-700 transition-colors"
                  >
                    Start reading →
                  </a>
                  <a
                    href="/topics"
                    className="border border-gray-200 text-gray-700 text-sm font-medium px-6 py-3 rounded-full hover:bg-gray-50 transition-colors"
                  >
                    Browse topics
                  </a>
                </div>
                <p className="text-gray-400 text-xs mt-5 fade-up delay-4">
                  Join 48,000+ subscribers · No spam · Free forever
                </p>
              </div>

              {/* Right: Featured Card */}
              <div className="fade-up delay-2">
                <div
                  className="rounded-2xl overflow-hidden border border-gray-100 shadow-xl shadow-gray-100 "
                  onClick={() => navigate(`/articles/${featured.id}`)}
                >
                  {/* Card image placeholder */}
                  <div
                    className="h-52 relative flex items-end p-6"
                    style={{ background: featured.gradient }}
                  >
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle at 80% 20%, #f59e0b 0%, transparent 60%)",
                      }}
                    />
                    <span className="category-pill relative z-10">
                      {featured.category}
                    </span>
                  </div>
                  <div className="bg-white p-6 cursor-pointer">
                    <h2 className="brand-font text-xl text-gray-900 leading-snug mb-3">
                      {featured.title}
                    </h2>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                      {featured.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 brand-font text-xs flex items-center justify-center font-bold">
                          ML
                        </div>
                        <span className="text-gray-500 text-xs">
                          {featured.author}
                        </span>
                      </div>
                      <span className="text-gray-400 text-xs">
                        {featured.readTime} · {featured.date}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── MARQUEE ── */}
        <div className="border-y border-gray-100 bg-amber-50 py-3 overflow-hidden marquee">
          <div className="marquee-track flex flex-row flex-nowrap items-center">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span
                key={i}
                className="flex items-center gap-3 px-6 text-amber-800 text-xs font-medium tracking-widest uppercase whitespace-nowrap"
              >
                <span className="text-amber-400">◆</span>
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* ── LATEST ARTICLES + SIDEBAR ── */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-3 gap-10">
            {/* Articles Grid */}
            <div className="md:col-span-2">
              <div className="flex items-center justify-between mb-8">
                <h2 className="brand-font text-3xl text-gray-900">
                  Latest stories
                </h2>
                <a
                  href="/articles"
                  className="text-sm text-gray-400 hover:text-gray-700 transition-colors border-b border-gray-200 pb-0.5 hover:border-amber-400"
                >
                  View all →
                </a>
              </div>
              <div className="space-y-6">
                {articles.map((a, i) => (
                  <Link to= {`articles/${a.id}`} key={i} className="article-card feature-card">
                    <div
                      className="h-44 article-img-wrap"
                      style={{
                        background: `linear-gradient(135deg, ${a.color} 0%, #ffffff 100%)`,
                      }}
                    >
                      <div
                        className="w-full h-full flex items-end p-5"
                        style={{
                          background: `linear-gradient(135deg, ${a.color} 0%, #f9fafb 100%)`,
                        }}
                      >
                        <span className="category-pill">{a.category}</span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="brand-font text-lg text-gray-900 leading-snug mb-2 hover:text-amber-600 cursor-pointer transition-colors">
                        {a.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed mb-4">
                        {a.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span className="font-medium text-gray-600">
                          {a.author}
                        </span>
                        <span>
                          {a.readTime} read · {a.date}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="md:col-span-1">
              {/* Trending */}
              <div className="mb-10">
                <h3 className="brand-font text-xl text-gray-900 mb-5 pb-3 border-b border-gray-100">
                  Trending now
                </h3>
                {trending.map((t, i) => (
                  <div key={i} className="sidebar-item">
                    <div className="flex gap-4 items-start">
                      <span className="brand-font text-3xl text-gray-100 font-bold leading-none mt-0.5 select-none">
                        {t.num}
                      </span>
                      <div className="flex-1 min-w-0">
                        <span className="category-pill mb-2 inline-block">
                          {t.category}
                        </span>
                        <p className="brand-font text-sm text-gray-800 leading-snug hover:text-amber-600 cursor-pointer transition-colors">
                          {t.title}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {t.author} · {t.time} read
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* About blurb */}
              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
                <p className="brand-font italic text-amber-800 text-sm leading-relaxed mb-4">
                  "We publish stories that deserve more than a scroll."
                </p>
                <p className="text-gray-500 text-xs leading-relaxed mb-4">
                  Independent, reader-supported journalism since 2018. No ads.
                  No noise. Just writing worth your time.
                </p>
                <a
                  href="#"
                  className="text-amber-600 text-xs font-medium hover:text-amber-800 transition-colors"
                >
                  Learn about us →
                </a>
              </div>
            </aside>
          </div>
        </section>

        {/* ── TOPICS ── */}
        <section className="bg-gray-50 border-y border-gray-100 px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
              <div>
                <h2 className="brand-font text-3xl text-gray-900 mb-1">
                  Explore by topic
                </h2>
                <p className="text-gray-400 text-sm">
                  Find stories in the areas you care about most.
                </p>
              </div>
              <a
                href="#"
                className="text-sm text-gray-500 hover:text-gray-800 border-b border-gray-300 pb-0.5 hover:border-amber-400 transition-colors"
              >
                All topics →
              </a>
            </div>
            <div className="flex flex-wrap gap-3">
              {topics.map((t) => (
                <a key={t.label} href="#" className="topic-chip">
                  <span>{t.icon}</span>
                  {t.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── EDITORS' PICKS (horizontal scroll) ── */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="brand-font text-3xl text-gray-900">
              Editor's picks
            </h2>
            <a
              href="#"
              className="text-sm text-gray-400 hover:text-gray-700 transition-colors border-b border-gray-200 pb-0.5 hover:border-amber-400"
            >
              See all →
            </a>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                color: "#fef9c3",
                cat: "Psychology",
                title: "Why We Crave Certainty in Uncertain Times",
                auth: "Priya Menon",
                time: "6 min",
              },
              {
                color: "#dcfce7",
                cat: "Tech",
                title: "The Hidden Cost of Free Cloud Storage",
                auth: "Marcus Liu",
                time: "8 min",
              },
              {
                color: "#ede9fe",
                cat: "Culture",
                title: "Architecture That Heals",
                auth: "Sophia Hartwell",
                time: "5 min",
              },
            ].map((p, i) => (
              <article
                key={i}
                className={`article-card feature-card fade-up delay-${i + 1}`}
              >
                <div
                  className="h-36"
                  style={{
                    background: `linear-gradient(135deg, ${p.color} 0%, #ffffff 100%)`,
                  }}
                >
                  <div className="w-full h-full flex items-end p-4">
                    <span className="category-pill">{p.cat}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="brand-font text-base text-gray-900 leading-snug mb-2 hover:text-amber-600 cursor-pointer transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-gray-400 text-xs">
                    {p.auth} · {p.time} read
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── NEWSLETTER CTA ── */}
        <section className="max-w-6xl mx-auto px-6 pb-24">
          <div className="newsletter-section px-8 md:px-16 py-16 text-center">
            <div
              className="newsletter-orb"
              style={{ width: 400, height: 400, top: -100, right: -100 }}
            />
            <div
              className="newsletter-orb"
              style={{ width: 300, height: 300, bottom: -80, left: -60 }}
            />
            <p className="text-amber-400 text-xs tracking-widest uppercase font-medium mb-3 relative z-10">
              Join 48,000+ readers
            </p>
            <h2 className="brand-font text-4xl md:text-5xl text-white mb-4 relative z-10">
              Read more.
              <br className="hidden md:block" />
              <span className="italic text-amber-400"> Think deeper.</span>
            </h2>
            <p className="text-gray-400 max-w-md mx-auto mb-8 text-base leading-relaxed relative z-10">
              Subscribe to The Lens and get our best articles in your inbox
              every week — no noise, no ads.
            </p>
            <form
              className="flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto relative z-10"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="nl-input"
              />
              <button type="submit" className="nl-btn">
                Subscribe free
              </button>
            </form>
            <p className="text-gray-600 text-xs mt-4 relative z-10">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
