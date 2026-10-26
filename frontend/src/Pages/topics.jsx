// TopicsPage.jsx — all styles self-contained, no Navbar or Footer included.
// Usage in App.jsx:
//   <Navbar />
//   <main style={{ paddingTop: "64px" }}><TopicsPage /></main>
//   <Footer />

import { useState, useEffect } from "react";
import "./cssFile/topics.css"; // If you prefer to keep styles in a separate CSS file, you can import it like this.
import axios from "axios";
import { useNavigate } from "react-router-dom";

const api = "http://localhost:8000";

const filters = ["All", "Most articles", "Fewest articles", "A–Z"];

const trendingTopics = [
  { label: "Artificial Intelligence", count: 22 },
  { label: "Climate Action", count: 17 },
  { label: "Mental Health", count: 14 },
  { label: "Remote Work", count: 12 },
  { label: "Open Source", count: 9 },
  { label: "Urban Planning", count: 8 },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function TopicsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [expanded, setExpanded] = useState(null); // topic id
  const navigate = useNavigate();

  // const [allarticles, setAllarticles] = useState([]);
  const [topics, settopics] = useState([]);

  // useEffect(() => {
  //   const fetchArticles = async () => {
  //     try {
  //       const response = await axios.get(`${api}/articles`);

  //       const articles = response.data.articles;

  //       const formatArticle = (article) => ({
  //         id: article.id,
  //         category: article.category,
  //         title: article.title,
  //         excerpt: article.excerpt,
  //         author: article.author_name,
  //         date: new Date(article.publish_date).toLocaleDateString("en-US", {
  //           month: "short",
  //           day: "numeric",
  //           year: "numeric",
  //           timeZone: "UTC",
  //         }),
  //         readTime: article.read_time,
  //         color: article.image_color,
  //         featured: Boolean(Number(article.featured)),
  //       });

  //       const formattedArticles = articles.map(formatArticle);

  //       console.log("articlesFetched");
  //       setAllarticles(formattedArticles);
  //       console.log(formattedArticles);

  //     } catch (error) {
  //       console.error("Error fetching articles:", error);
  //     }
  //   };

  //   fetchArticles();
  // }, []);

  // useEffect(() => {
  //   const fetchTopics = async () => {
  //     try {
  //       const response = await axios.get(`${api}/topics`);
  //       const topics = response.data;

  //       /* {
  //     id: "psychology",
  //     label: "Psychology",
  //     icon: "🧠",
  //     color: "#f97316",
  //     gradientFrom: "#f97316",
  //     gradientTo: "#eab308",
  //     articleCount: 20,
  //     desc: "Mind, behaviour, wellbeing, and the science of being human.",
  //     articles: [
  //       { title: "Why We Crave Certainty in Uncertain Times", author: "Priya Menon",  time: "6 min" },
  //       { title: "Gut Bacteria and Your Mood",                 author: "James Okafor", time: "8 min" },
  //     ],
  //   }, */
  //       const formatTopic = (topic) => ({
  //         id: topic.name,
  //         label: topic.slug,
  //         name: topic.name,
  //         icon: topic.icon || "🧠",
  //         color:topic.color|| "#f97316",
  //         gradientFrom: topic.gradient_from||"#f97316",
  //         gradientTo: topic.gradient_to||"#eab308",
  //         articleCount: 20,
  //         desc: topic.description,
  //         articles: [],
  //       });

  //       const formattedTopics = topics.map(formatTopic);

  //       settopics(formattedTopics);

  //       console.log("Formatted topics:", formattedTopics);
  //     } catch (error) {
  //       console.error("Error fetching topics:", error);
  //     }
  //   };

  //   fetchTopics();
  // }, []);

  // console.log("alltopics d: ",alltopic)

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        // Fetch topics and articles together
        const [topicsResponse, articlesResponse] = await Promise.all([
          axios.get(`${api}/topics`),
          axios.get(`${api}/articles`),
        ]);

        const topics = topicsResponse.data;
        const articles = articlesResponse.data.articles;

        // Format each topic and attach matching articles
        const formattedTopics = topics.map((topic) => {
          const topicArticles = articles
            .filter(
              (article) =>
                article.category?.toLowerCase() === topic.name?.toLowerCase(),
            )
            .map((article) => ({
              id: article.id,
              title: article.title,
              author: article.author_name,
              time: article.read_time,
            }));

          return {
            id: topic.name,
            label: topic.slug,
            // name: topic.name,
            icon: topic.icon || "🧠",
            color: topic.color || "#f97316",
            featured: topic.feature,
            gradientFrom: topic.gradient_from || "#f97316",
            gradientTo: topic.gradient_to || "#eab308",
            articleCount: topicArticles.length,
            desc: topic.description,
            articles: topicArticles,
          };
        });

        settopics(formattedTopics);

        console.log("Formatted topics:", formattedTopics);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };

    fetchTopics();
  }, []);

  const filtered = topics
    .filter(
      (t) =>
        t.label.toLowerCase().includes(search.toLowerCase()) ||
        t.desc.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => {
      if (filter === "Most articles") return b.articleCount - a.articleCount;
      if (filter === "Fewest articles") return a.articleCount - b.articleCount;
      if (filter === "A–Z") return a.label.localeCompare(b.label);
      return 0;
    });

  const featuredTopics = filtered.filter((t) => t.featured);
  const restTopics = filtered.filter((t) => !t.featured);

  return (
    <>
      {/* <style>{styles}</style> */}

      <div className="body-font">
        {/* ══ HERO ═════════════════════════════════════════════════════════════ */}
        <section className="tp-hero px-6 pt-16 pb-14">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="tp-fade-up">
                <p className="text-amber-500 text-xs font-medium tracking-widest uppercase mb-2">
                  Browse
                </p>
                <h1 className="brand-font text-5xl md:text-6xl text-gray-900 leading-tight">
                  Explore by
                  <br />
                  <span className="italic text-amber-500">topic</span>
                </h1>
                <p className="text-gray-400 mt-3 text-base max-w-sm leading-relaxed">
                  {topics.length} topics,{" "}
                  {topics.reduce((s, t) => s + t.articleCount, 0)}+ articles.
                  Find the conversations that matter to you.
                </p>
              </div>

              {/* Search */}
              <div className="tp-search-wrap tp-fade-up tp-d2">
                <svg
                  className="tp-search-icon w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  placeholder="Search topics…"
                  className="tp-search-input"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setExpanded(null);
                  }}
                />
              </div>
            </div>

            {/* Filter tabs */}
            <div className="flex flex-wrap gap-2 mt-8 tp-fade-up tp-d3">
              {filters.map((f) => (
                <button
                  key={f}
                  className={`tp-tab ${filter === f ? "active" : ""}`}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}
              <span className="flex items-center text-xs text-gray-400 ml-2">
                {filtered.length} topic{filtered.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </section>

        {/* ══ MAIN CONTENT ═════════════════════════════════════════════════════ */}
        <div className="max-w-6xl mx-auto px-6 py-14">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Left — Topics */}
            <div className="lg:col-span-2">
              {/* Empty state */}
              {filtered.length === 0 && (
                <div className="tp-empty tp-fade-up">
                  <p className="text-5xl mb-4">🔍</p>
                  <p className="brand-font text-2xl text-gray-700 mb-2">
                    No topics found
                  </p>
                  <p className="text-gray-400 text-sm mb-6">
                    Try a different keyword.
                  </p>
                  <button className="tp-tab" onClick={() => setSearch("")}>
                    Clear search
                  </button>
                </div>
              )}

              {/* ── Featured topics (hero cards) ── */}
              {!search && featuredTopics.length > 0 && (
                <div className="mb-10">
                  <h2 className="brand-font text-2xl text-gray-900 mb-5">
                    Featured topics
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-5">
                    {featuredTopics.map((t, i) => (
                      <div key={t.id}>
                        <div
                          className={`tp-hero-card tp-fade-up tp-d${i + 1}`}
                          style={{
                            background: `linear-gradient(135deg, ${t.gradientFrom}, ${t.gradientTo})`,
                          }}
                          onClick={() =>
                            setExpanded(expanded === t.id ? null : t.id)
                          }
                        >
                          <div className="tp-hero-card-overlay" />
                          <div className="tp-hero-card-inner">
                            <div className="flex items-start justify-between mb-3">
                              <span className="text-4xl">{t.icon}</span>
                              <div className="flex gap-2 flex-wrap justify-end">
                                <span className="tp-stat">
                                  <svg
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="w-3 h-3"
                                  >
                                    <path d="M2 4h12v1.5H2V4zm0 3h9v1.5H2V7zm0 3h7v1.5H2V10z" />
                                  </svg>
                                  {t.articleCount} articles
                                </span>
                              </div>
                            </div>
                            <div>
                              <span className="tp-pill mb-2 inline-block">
                                {t.label}
                              </span>
                              <h3 className="brand-font text-xl text-white leading-snug">
                                {t.desc}
                              </h3>
                            </div>
                          </div>
                        </div>

                        {/* Expandable articles panel */}
                        {expanded === t.id && (
                          <div className="border border-gray-100 rounded-2xl p-5 mt-3 bg-white shadow-sm tp-fade-up">
                            <p className="brand-font text-base text-gray-900 mb-3">
                              Latest in {t.label}
                            </p>
                            <div className="space-y-2">
                              {t.articles.map((a, ai) => (
                                <div key={ai} className="tp-mini-card">
                                  {/* <p className="brand-font text-sm text-gray-800 leading-snug mb-1 hover:text-amber-600 transition-colors cursor-pointer">
                                    {a.title}
                                  </p> */}
                                  <p
                                    className="brand-font text-sm text-gray-800 leading-snug mb-1 hover:text-amber-600 transition-colors cursor-pointer"
                                    onClick={() =>
                                      navigate(`/articles/${a.id}`)
                                    }
                                  >
                                    {a.title}
                                  </p>
                                  <p className="text-xs text-gray-400">
                                    {a.author} · {a.time} read
                                  </p>
                                </div>
                              ))}
                            </div>
                            <a
                              href="#"
                              className="text-amber-600 text-xs font-medium hover:text-amber-800 transition-colors mt-4 inline-block"
                            >
                              View all {t.label} articles →
                            </a>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── All / rest topics grid ── */}
              {(search ? filtered : restTopics).length > 0 && (
                <div>
                  {!search && (
                    <h2 className="brand-font text-2xl text-gray-900 mb-5">
                      All topics
                    </h2>
                  )}
                  <div className="grid sm:grid-cols-2 gap-4">
                    {(search ? filtered : restTopics).map((t, i) => (
                      <div key={t.id}>
                        <div
                          className={`tp-card tp-fade-up tp-d${Math.min(i + 1, 8)}`}
                          onClick={() =>
                            setExpanded(expanded === t.id ? null : t.id)
                          }
                        >
                          {/* Color band */}
                          <div
                            className="tp-card-band"
                            style={{
                              background: `linear-gradient(90deg, ${t.gradientFrom}, ${t.gradientTo})`,
                            }}
                          />
                          <div className="p-5">
                            <div className="flex items-start justify-between mb-3">
                              <span className="text-3xl">{t.icon}</span>
                              <div
                                className="tp-count-badge text-white"
                                style={{ background: t.color }}
                              >
                                {t.articleCount}
                              </div>
                            </div>
                            <h3 className="brand-font text-lg text-gray-900 mb-1">
                              {t.label}
                            </h3>
                            <p className="text-gray-400 text-xs leading-relaxed mb-4">
                              {t.desc}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-500">
                                {t.articleCount} articles
                              </span>
                              <span
                                className="text-xs font-medium transition-colors"
                                style={{ color: t.color }}
                              >
                                {expanded === t.id ? "Hide ↑" : "Explore →"}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Expandable articles panel */}
                        {expanded === t.id && (
                          <div className="border border-gray-100 rounded-2xl p-5 mt-2 bg-white shadow-sm tp-fade-up">
                            <p className="brand-font text-base text-gray-900 mb-3">
                              Latest in {t.label}
                            </p>
                            <div className="space-y-2">
                              {t.articles.map((a, ai) => (
                                <div key={ai} className="tp-mini-card">
                                  <p
                                    className="brand-font text-sm text-gray-800 leading-snug mb-1 hover:text-amber-600 transition-colors cursor-pointer"
                                    onClick={() =>
                                      navigate(`/articles/${a.id}`)
                                    }
                                  >
                                    {a.title}
                                  </p>
                                  <p className="text-xs text-gray-400">
                                    {a.author} · {a.time} read
                                  </p>
                                </div>
                              ))}
                            </div>
                            <a
                              href="#"
                              className="text-amber-600 text-xs font-medium hover:text-amber-800 transition-colors mt-4 inline-block"
                            >
                              View all {t.label} articles →
                            </a>
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
              {/* Topic overview stats */}
              <div className="border border-gray-100 rounded-2xl p-6 bg-gray-50">
                <h3 className="brand-font text-lg text-gray-900 mb-4">
                  By the numbers
                </h3>
                <div className="space-y-3">
                  {[
                    { label: "Total topics", value: topics.length },
                    {
                      label: "Total articles",
                      value:
                        topics.reduce((s, t) => s + t.articleCount, 0) + "+",
                    },
                    { label: "Active writers", value: "4" },
                    { label: "Published since", value: "2018" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="flex items-center justify-between py-2 border-b border-gray-100 last:border-none"
                    >
                      <span className="text-gray-500 text-sm">{s.label}</span>
                      <span className="brand-font text-gray-900 font-semibold text-base">
                        {s.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trending tags */}
              <div>
                <h3 className="brand-font text-lg text-gray-900 mb-4 pb-3 border-b border-gray-100">
                  Trending right now
                </h3>
                <div className="space-y-1">
                  {trendingTopics.map((t, i) => (
                    <div key={t.label} className="tp-trend-row">
                      <span className="brand-font text-2xl text-gray-100 font-bold w-8 flex-shrink-0 select-none">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm text-gray-700 flex-1 hover:text-amber-600 transition-colors font-medium">
                        {t.label}
                      </span>
                      <span className="text-xs text-gray-400 bg-gray-50 border border-gray-100 rounded-full px-2 py-0.5 flex-shrink-0">
                        {t.count} articles
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* All topics quick-jump */}
              <div>
                <h3 className="brand-font text-lg text-gray-900 mb-4 pb-3 border-b border-gray-100">
                  Quick jump
                </h3>
                <div className="flex flex-wrap gap-2">
                  {topics.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setSearch("");
                        setExpanded(t.id);
                        setFilter("All");
                      }}
                      className="tp-tab text-xs"
                      style={
                        expanded === t.id
                          ? {
                              background: t.color,
                              borderColor: t.color,
                              color: "#fff",
                            }
                          : {}
                      }
                    >
                      {t.icon} {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="tp-subscribe-card p-6 relative">
                <div
                  className="tp-subscribe-orb"
                  style={{ width: 200, height: 200, top: -60, right: -60 }}
                />
                <div
                  className="tp-subscribe-orb"
                  style={{ width: 150, height: 150, bottom: -40, left: -40 }}
                />
                <p className="text-amber-400 text-xs tracking-widest uppercase font-medium mb-2 relative z-10">
                  Stay curious
                </p>
                <p className="brand-font text-xl text-white mb-1 relative z-10">
                  Get the best stories
                </p>
                <p className="text-gray-400 text-xs leading-relaxed mb-4 relative z-10">
                  Curated by topic, delivered weekly. No noise.
                </p>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="space-y-2 relative z-10"
                >
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="tp-sub-input"
                  />
                  <button type="submit" className="tp-sub-btn">
                    Subscribe free
                  </button>
                </form>
                <p className="text-gray-600 text-xs mt-3 text-center relative z-10">
                  48,000+ readers · Free forever
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
