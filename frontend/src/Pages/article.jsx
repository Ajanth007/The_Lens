// ArticlesPage.jsx — all styles self-contained, no Navbar or Footer included.
// Usage in App.jsx:
//   <Navbar />
//   <main style={{ paddingTop: "64px" }}><ArticlesPage /></main>
//   <Footer />

import { useState, useEffect } from "react";
import "./cssFile/article.css";
import axios from "axios";
import {Link} from 'react-router-dom'
import { apiURL } from "../config/env";

const api = apiURL.Url;

// ── Data ──────────────────────────────────────────────────────────────────────
const categories = [
  "All",
  "Technology",
  "Culture",
  "Society",
  "Science",
  "Opinion",
  "Work",
  "Politics",
];

const trendingTags = [
  "AI Ethics",
  "Climate Policy",
  "Mental Health",
  "Future of Work",
  "Urban Planning",
  "Open Source",
  "Longevity",
  "Democracy",
];

// ── Main Component ────────────────────────────────────────────────────────────
export default function ArticlesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [view, setView] = useState("grid"); // "grid" | "list"
  const [visibleCount, setVisibleCount] = useState(9);

  const [allArticles, setAllArticles] = useState([]);
  const [avatarColors, setAvatarColors] = useState([]);

  // Filter + search
  const filtered = allArticles.filter((a) => {
    const matchCat = activeCategory === "All" || a.category === activeCategory;
    const matchSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "newest") return b.id - a.id;
    if (sortBy === "oldest") return a.id - b.id;
    if (sortBy === "shortest")
      return parseInt(a.readTime) - parseInt(b.readTime);
    if (sortBy === "longest")
      return parseInt(b.readTime) - parseInt(a.readTime);
    return 0;
  });

  const featuredArticle = sorted.find((a) => a.featured) || sorted[0];
  // console.log("featured Article :",featuredArticle)
  const restArticles = sorted
    .filter((a) => a.id !== featuredArticle?.id)
    .slice(0, visibleCount);
  const hasMore =
    sorted.filter((a) => a.id !== featuredArticle?.id).length > visibleCount;

  /* all articles */
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${api}/articles`);

        const formattedArticles = response.data.articles.map((article) => ({
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
          featured: Boolean(article.featured),
          slug: article.slug,
        }));

        setAllArticles(formattedArticles);
        console.log(formattedArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  /* fetch avator color,bg etc */

  useEffect(() => {
    fetch(`${api}/authors`)
      .then((res) => res.json())
      .then((authors) => {
        const colors = {};

        authors.forEach((author) => {
          colors[author.name] = {
            bg: author.avatar_bg,
            text: author.avatar_text,
            initials: author.initials,
          };
        });

        setAvatarColors(colors);
        console.log("Avarat Fetched");
        console.log(avatarColors);
      })
      .catch(console.error);
  }, []);

  // ── Sub-components ────────────────────────────────────────────────────────────
  function Avatar({ author, size = 7 }) {
    const av = avatarColors[author] || {
      bg: "#f3f4f6",
      text: "#374151",
      initials: author.slice(0, 2).toUpperCase(),
    };
    return (
      <div
        className={`w-${size} h-${size} rounded-full brand-font text-xs flex items-center justify-center font-bold flex-shrink-0`}
        style={{
          background: av.bg,
          color: av.text,
          width: size * 4,
          height: size * 4,
          fontSize: "0.7rem",
        }}
      >
        {av.initials}
      </div>
    );
  }

  function CardImage({ color, category, height = 44 }) {
    return (
      <div
        className={`ap-card-img-wrap h-${height}`}
        style={{ height: height * 4 }}
      >
        <div
          className="w-full h-full flex items-end p-4"
          style={{
            background: `linear-gradient(135deg, ${color} 0%, #f9fafb 100%)`,
          }}
        >
          <span className="ap-category-pill">{category}</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="body-font mt-16">
        {/* ══ PAGE HERO ════════════════════════════════════════════════════════ */}
        <section className="ap-hero px-6 pt-16 pb-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="ap-fade-up">
                <p className="text-amber-500 text-xs font-medium tracking-widest uppercase mb-2">
                  The Archive
                </p>
                <h1 className="brand-font text-5xl md:text-6xl text-gray-900 leading-tight">
                  All <span className="italic text-amber-500">articles</span>
                </h1>
                <p className="text-gray-400 mt-3 text-base max-w-sm">
                  {allArticles.length} stories and counting. Filter, search, and
                  read at your own pace.
                </p>
              </div>

              {/* Search */}
              <div className="ap-search-wrap ap-fade-up ap-d2">
                <svg
                  className="ap-search-icon w-4 h-4"
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
                  placeholder="Search articles…"
                  className="ap-search-input"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setVisibleCount(9);
                  }}
                />
              </div>
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap gap-2 mt-8 ap-fade-up ap-d3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`ap-filter-pill ${activeCategory === cat ? "active" : ""}`}
                  onClick={() => {
                    setActiveCategory(cat);
                    setVisibleCount(9);
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ══ MAIN CONTENT ═════════════════════════════════════════════════════ */}
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Left — Articles */}
            <div className="lg:col-span-2">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-8">
                <p className="text-gray-400 text-sm">
                  <span className="font-medium text-gray-700">
                    {sorted.length}
                  </span>{" "}
                  articles found
                </p>
                <div className="flex items-center gap-3">
                  {/* Sort */}
                  <select
                    className="ap-sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="newest">Newest first</option>
                    <option value="oldest">Oldest first</option>
                    <option value="shortest">Shortest read</option>
                    <option value="longest">Longest read</option>
                  </select>
                  {/* View toggle */}
                  <div className="flex gap-1">
                    <button
                      className={`ap-view-btn ${view === "grid" ? "active" : ""}`}
                      onClick={() => setView("grid")}
                      title="Grid view"
                    >
                      <svg
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="w-3.5 h-3.5"
                      >
                        <rect x="1" y="1" width="6" height="6" rx="1" />
                        <rect x="9" y="1" width="6" height="6" rx="1" />
                        <rect x="1" y="9" width="6" height="6" rx="1" />
                        <rect x="9" y="9" width="6" height="6" rx="1" />
                      </svg>
                    </button>
                    <button
                      className={`ap-view-btn ${view === "list" ? "active" : ""}`}
                      onClick={() => setView("list")}
                      title="List view"
                    >
                      <svg
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="w-3.5 h-3.5"
                      >
                        <rect x="1" y="2" width="14" height="2" rx="1" />
                        <rect x="1" y="7" width="14" height="2" rx="1" />
                        <rect x="1" y="12" width="14" height="2" rx="1" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Empty state */}
              {sorted.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-5xl mb-4">🔍</p>
                  <p className="brand-font text-2xl text-gray-700 mb-2">
                    No results found
                  </p>
                  <p className="text-gray-400 text-sm">
                    Try a different keyword or clear the filters.
                  </p>
                  <button
                    className="ap-filter-pill mt-6"
                    onClick={() => {
                      setSearchQuery("");
                      setActiveCategory("All");
                    }}
                  >
                    Clear filters
                  </button>
                </div>
              )}

              {/* Featured article */}
              {featuredArticle && activeCategory === "All" && !searchQuery && (
               
                <Link to={`/articles/${featuredArticle.id}`} className="ap-featured mb-8 ap-fade-up " >
                  <div className="md:grid md:grid-cols-2">
                    <div
                      className="h-56 md:h-auto flex items-end p-6"
                      style={{
                        background: `linear-gradient(135deg, ${featuredArticle.color} 0%, #f9fafb 100%)`,
                      }}
                    >
                      <div>
                        <span className="ap-category-pill">Editor's pick</span>
                      </div>
                    </div>
                    <div className="p-7 flex flex-col justify-between">
                      <div>
                        <span className="ap-category-pill mb-3 inline-block">
                          {featuredArticle.category}
                        </span>
                        <h2 className="brand-font text-2xl text-gray-900 leading-snug mb-3 hover:text-amber-600 cursor-pointer transition-colors">
                          {featuredArticle.title}
                        </h2>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          {featuredArticle.excerpt}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                          <Avatar author={featuredArticle.author} size={7} />
                          <div>
                            <p className="text-xs font-medium text-gray-700">
                              {featuredArticle.author}
                            </p>
                            <p className="text-xs text-gray-400">
                              {featuredArticle.date}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs text-gray-400 bg-gray-50 border border-gray-100 px-3 py-1 rounded-full">
                          {featuredArticle.readTime} read
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
               
              )}

              {/* Grid view */}
              {view === "grid" && (
                <div className="grid sm:grid-cols-2 gap-5">
                  {restArticles.map((a, i) => (

                    // <article
                    //   key={a.id}
                    //   className={`ap-card ap-fade-up ap-d${Math.min(i + 1, 6)}`}
                    // >

                    <Link
                    to={ `/articles/${a.id}`}
                      key={a.id}
                      className={`ap-card ap-fade-up ap-d${Math.min(i + 1, 6)}`}
                    >

                      <CardImage
                        color={a.color}
                        category={a.category}
                        height={40}
                      />
                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="brand-font text-base text-gray-900 leading-snug mb-2 hover:text-amber-600 cursor-pointer transition-colors flex-1">
                          {a.title}
                        </h3>
                        <p className="text-gray-400 text-xs leading-relaxed mb-4 line-clamp-2">
                          {a.excerpt}
                        </p>
                        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                          <div className="flex items-center gap-2">
                            <Avatar author={a.author} size={6} />
                            <span className="text-xs text-gray-500">
                              {a.author}
                            </span>
                          </div>
                          <span className="text-xs text-gray-400">
                            {a.readTime}
                          </span>
                        </div>
                      </div>

                    {/* // </article> */}
                    </Link>
                  ))}
                </div>
              )}

              {/* List view */}
              {view === "list" && (
                <div>
                  {restArticles.map((a, i) => (
                    <div
                      key={a.id}
                      className={`ap-list-row ap-fade-up ap-d${Math.min(i + 1, 6)} cursor-pointer`}
                    >
                      <div
                        className="ap-list-thumb"
                        style={{
                          background: `linear-gradient(135deg, ${a.color} 0%, #f9fafb 100%)`,
                        }}
                      >
                        <div
                          className="w-full h-full flex items-end p-2"
                          style={{
                            background: `linear-gradient(135deg, ${a.color} 0%, #f9fafb 100%)`,
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="ap-category-pill">{a.category}</span>
                          <span className="text-gray-300 text-xs">·</span>
                          <span className="text-gray-400 text-xs">
                            {a.readTime} read
                          </span>
                        </div>
                        <h3 className="brand-font text-sm text-gray-900 leading-snug mb-1 hover:text-amber-600 transition-colors">
                          {a.title}
                        </h3>
                        <p className="text-gray-400 text-xs leading-relaxed mb-2 line-clamp-1 hidden sm:block">
                          {a.excerpt}
                        </p>
                        <div className="flex items-center gap-2">
                          <Avatar author={a.author} size={5} />
                          <span className="text-xs text-gray-500">
                            {a.author}
                          </span>
                          <span className="text-gray-300 text-xs">·</span>
                          <span className="text-xs text-gray-400">
                            {a.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Load more */}
              {hasMore && (
                <div className="flex justify-center mt-10">
                  <button
                    className="ap-load-btn"
                    onClick={() => setVisibleCount((v) => v + 6)}
                  >
                    Load more articles
                  </button>
                </div>
              )}
            </div>

            {/* Right — Sidebar */}
            <aside className="lg:col-span-1 space-y-8">
              {/* Newsletter */}
              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6">
                <p className="brand-font text-lg text-gray-900 mb-1">
                  Never miss a story
                </p>
                <p className="text-gray-400 text-xs leading-relaxed mb-4">
                  Our best articles, delivered weekly. No spam.
                </p>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="space-y-2"
                >
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="ap-nl-input"
                  />
                  <button type="submit" className="ap-nl-btn">
                    Subscribe free
                  </button>
                </form>
                <p className="text-gray-400 text-xs mt-3 text-center">
                  48,000+ readers · Free forever
                </p>
              </div>

              {/* Popular topics */}
              <div>
                <h3 className="brand-font text-lg text-gray-900 mb-4 pb-3 border-b border-gray-100">
                  Popular topics
                </h3>
                <div className="flex flex-wrap gap-2">
                  {trendingTags.map((tag) => (
                    <a key={tag} href="#" className="ap-tag">
                      {tag}
                    </a>
                  ))}
                </div>
              </div>

              {/* Top authors */}
              <div>
                <h3 className="brand-font text-lg text-gray-900 mb-4 pb-3 border-b border-gray-100">
                  Top authors
                </h3>
                <div className="space-y-4">
                  {Object.entries(avatarColors).map(([name, av]) => {
                    const count = allArticles.filter(
                      (a) => a.author === name,
                    ).length;
                    return (
                      <div
                        key={name}
                        className="flex items-center justify-between cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-full brand-font text-xs flex items-center justify-center font-bold flex-shrink-0"
                            style={{ background: av.bg, color: av.text }}
                          >
                            {av.initials}
                          </div>
                          <span className="text-sm text-gray-700 group-hover:text-amber-600 transition-colors font-medium">
                            {name}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-full">
                          {count} articles
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Editorial note */}
              <div className="border border-gray-100 rounded-2xl p-5 bg-gray-50">
                <p className="brand-font italic text-gray-600 text-sm leading-relaxed mb-3">
                  "Every piece here passed through at least two editors. We
                  believe in slow, considered journalism."
                </p>
                <a
                  href="#"
                  className="text-amber-600 text-xs font-medium hover:text-amber-800 transition-colors"
                >
                  Read our editorial charter →
                </a>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
