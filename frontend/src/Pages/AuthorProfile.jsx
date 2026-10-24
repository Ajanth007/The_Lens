import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, MapPin, Pencil, Search, Trash2 } from "lucide-react";
import { fetchMyWorks } from "../services/authorWorksApi";
// import { usePreloaderHold } from "../components/Preloader/PreloaderProvider";
import EditArticleModal from "../component/profile/EditArticleModal";
import DeleteArticleDialog from "../component/profile/DeleteArticleDialog";
import "./AuthorProfile.css";

const LOGIN_PATH = "/login"; // change if your login route differs

const actionBtn =
  "inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-4";
const neutralBtn =
  "border-gray-300 text-gray-900 hover:border-amber-600 hover:bg-amber-50 hover:text-amber-700 focus-visible:ring-amber-400/40";
const dangerBtn = "border-red-200 text-red-700 hover:bg-red-50 focus-visible:ring-red-200";

function formatDate(value) {
  const d = value ? new Date(value) : null;
  return d && !isNaN(d)
    ? d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" })
    : null;
}

function getInitials(name = "") {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0].toUpperCase()).join("");
}

function WorkCard({ article, onEdit, onDelete }) {
  const cover = article.gradient || article.image_color || "#e5e7eb";
  const date = formatDate(article.publish_date);

  return (
    <li>
      <article className="flex overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:border-gray-300 hover:shadow-[0_18px_40px_-28px_rgba(80,50,20,0.35)]">
        <div aria-hidden="true" className="w-1.5 shrink-0 sm:w-28" style={{ background: cover }} />

        <div className="min-w-0 flex-1 p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
              {article.category}
            </p>
            {article.featured ? (
              <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-amber-800">
                Featured
              </span>
            ) : null}
          </div>

          <h3 className="font-editorial mt-2 break-words text-xl font-semibold leading-snug text-gray-900 sm:text-2xl">
            {article.title}
          </h3>

          {article.excerpt && (
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">{article.excerpt}</p>
          )}

          <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500">
            {date && <time dateTime={article.publish_date}>{date}</time>}
            {date && <span aria-hidden="true">·</span>}
            <span>{article.read_time || "5 min"} read</span>
            <span aria-hidden="true">·</span>
            <span>{(Number(article.views) || 0).toLocaleString()} views</span>
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              to={`/articles/${article.id}`}
              className={`${actionBtn} ${neutralBtn}`}
              aria-label={`View “${article.title}”`}
            >
              <Eye size={16} aria-hidden="true" /> View
            </Link>
            <button
              type="button"
              onClick={() => onEdit(article.id)}
              className={`${actionBtn} ${neutralBtn}`}
              aria-label={`Edit “${article.title}”`}
            >
              <Pencil size={16} aria-hidden="true" /> Edit
            </button>
            <button
              type="button"
              onClick={() => onDelete(article)}
              className={`${actionBtn} ${dangerBtn}`}
              aria-label={`Delete “${article.title}”`}
            >
              <Trash2 size={16} aria-hidden="true" /> Delete
            </button>
          </div>
        </div>
      </article>
    </li>
  );
}

export default function AuthorProfile() {
  const navigate = useNavigate();
  const location = useLocation();

  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [errorMsg, setErrorMsg] = useState("");
  const [author, setAuthor] = useState(null);
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [notice, setNotice] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  const headingRef = useRef(null);
  const noticeTimer = useRef(null);

  // Keeps the site curtain closed until the profile data has loaded
  // usePreloaderHold(status === "loading");

  const goToLogin = useCallback(
    () => navigate(LOGIN_PATH, { replace: true, state: { from: location } }),
    [navigate, location]
  );

  useEffect(() => {
    document.title = "Your profile · TheLens";
    const controller = new AbortController();
    setStatus("loading");

    // BACKEND: GET /api/authors/me/articles -> { author, articles }
    fetchMyWorks(controller.signal)
      .then((data) => {
        setAuthor(data.author);
        setArticles(data.articles || []);
        setStatus("ready");
      })
      .catch((err) => {
        if (err.cancelled) return;
        if (err.status === 401) return goToLogin(); // not signed in -> login, then back here
        setErrorMsg(err.message);
        setStatus("error");
      });

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloadKey]);

  useEffect(() => () => clearTimeout(noticeTimer.current), []);

  const showNotice = (msg) => {
    setNotice(msg);
    clearTimeout(noticeTimer.current);
    noticeTimer.current = setTimeout(() => setNotice(""), 4000);
  };

  const stats = useMemo(
    () => [
      { label: "Articles", value: articles.length },
      { label: "Total views", value: articles.reduce((s, a) => s + (Number(a.views) || 0), 0) },
      { label: "Featured", value: articles.filter((a) => a.featured).length },
    ],
    [articles]
  );

  const categories = useMemo(() => [...new Set(articles.map((a) => a.category).filter(Boolean))], [articles]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return articles;
    return articles.filter(
      (a) => a.title.toLowerCase().includes(q) || (a.category || "").toLowerCase().includes(q)
    );
  }, [articles, query]);

  const handleSaved = (updated) => {
    setArticles((list) => list.map((a) => (a.id === updated.id ? { ...a, ...updated } : a)));
    setEditingId(null);
    showNotice("Changes saved.");
  };

  const handleDeleted = (id) => {
    setArticles((list) => list.filter((a) => a.id !== id));
    setDeleting(null);
    showNotice("Article deleted.");
    setTimeout(() => headingRef.current?.focus(), 0);
  };

  if (status === "loading") {
    return (
      <main className="ap-page mt-8 min-h-screen bg-[#fffaf5] px-4 py-24 text-center" aria-busy="true">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900" />
        <p className="mt-4 text-sm text-gray-500">Loading your profile…</p>
      </main>
    );
  }

  if (status === "error") {
    return (
      <main className="ap-page mt-8 min-h-screen bg-[#fffaf5] px-4 py-24 text-center">
        <h1 className="font-editorial text-3xl font-semibold text-gray-900">We couldn't load your profile</h1>
        <p role="alert" className="mt-3 text-sm text-gray-500">{errorMsg}</p>
        <button
          type="button"
          onClick={() => setReloadKey((k) => k + 1)}
          className="mt-8 rounded-xl bg-gray-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-amber-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-400/50"
        >
          Try again
        </button>
      </main>
    );
  }

  const accent = author.accent_color || "#f59e0b";
  const initials = author.initials?.trim() || getInitials(author.name) || "A";

  return (
    <main className="ap-page mt-8 min-h-screen bg-[#fffaf5] px-4 py-8 sm:px-8 sm:py-10">
      <div className="mx-auto max-w-5xl">
        {/* Profile header */}
        <section
          aria-labelledby="ap-name"
          className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_18px_60px_-35px_rgba(80,50,20,0.25)] sm:p-9"
        >
          <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1" style={{ background: accent }} />

          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-700">Author profile</p>

          <div className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-center">
            <span
              aria-hidden="true"
              className="font-editorial flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl text-2xl font-semibold"
              style={{
                backgroundColor: author.avatar_bg || "#f3f4f6",
                color: author.avatar_text || "#374151",
                boxShadow: `inset 0 0 0 2px ${accent}`,
              }}
            >
              {initials}
            </span>

            <div className="min-w-0">
              <h1 id="ap-name" className="font-editorial break-words text-3xl font-semibold text-gray-900 sm:text-4xl">
                {author.name}
              </h1>
              <p className="mt-1 text-sm font-medium" style={{ color: author.avatar_text || "#374151" }}>
                {author.role}
              </p>
              {author.bio && (
                <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">{author.bio}</p>
              )}
              <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
                {author.location && (
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={14} aria-hidden="true" /> {author.location}
                  </span>
                )}
                {author.joined_year && <span>Member since {author.joined_year}</span>}
              </p>
            </div>
          </div>

          <dl className="mt-8 grid grid-cols-3 divide-x divide-gray-200 overflow-hidden rounded-xl border border-gray-200 bg-[#fffaf5]">
            {stats.map((s) => (
              <div key={s.label} className="px-3 py-4 text-center sm:px-5 sm:text-left">
                <dt className="text-[11px] font-medium uppercase tracking-[0.15em] text-gray-500">{s.label}</dt>
                <dd className="font-editorial mt-1 text-2xl font-semibold text-gray-900">
                  {s.value.toLocaleString()}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Works */}
        <section className="mt-12" aria-labelledby="ap-works">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-700">Your works</p>
              <h2
                id="ap-works"
                ref={headingRef}
                tabIndex={-1}
                className="font-editorial mt-2 text-3xl font-semibold text-gray-900 outline-none"
              >
                Published articles
              </h2>
            </div>

            {articles.length > 0 && (
              <div className="relative w-full sm:w-72">
                <label htmlFor="ap-search" className="sr-only">Search your articles</label>
                <Search
                  size={16}
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  id="ap-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search title or category"
                  className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-amber-500 focus:ring-4 focus:ring-amber-400/20"
                />
              </div>
            )}
          </div>

          {articles.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
              <p className="font-editorial text-xl font-semibold text-gray-900">Nothing published yet</p>
              <p className="mt-2 text-sm text-gray-500">Articles you publish will appear here.</p>
            </div>
          ) : visible.length === 0 ? (
            <p className="mt-6 rounded-2xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
              No articles match “{query}”.
            </p>
          ) : (
            <ul className="mt-6 space-y-4">
              {visible.map((a) => (
                <WorkCard key={a.id} article={a} onEdit={setEditingId} onDelete={setDeleting} />
              ))}
            </ul>
          )}
        </section>
      </div>

      {/* Status message (announced to screen readers) */}
      <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-40 flex justify-center px-4">
        {notice && (
          <p className="pointer-events-auto rounded-full bg-gray-900 px-5 py-3 text-sm text-white shadow-lg">
            {notice}
          </p>
        )}
      </div>

      {editingId !== null && (
        <EditArticleModal
          articleId={editingId}
          categories={categories}
          onClose={() => setEditingId(null)}
          onSaved={handleSaved}
          onUnauthorized={goToLogin}
        />
      )}

      {deleting && (
        <DeleteArticleDialog
          article={deleting}
          onClose={() => setDeleting(null)}
          onDeleted={handleDeleted}
          onUnauthorized={goToLogin}
        />
      )}
    </main>
  );
}