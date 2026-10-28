import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import './cssFile/SpecificArticle.css'
import { apiURL } from "../config/env";
 
const api  =apiURL.Url
const WORDS_PER_MINUTE = 225;

// Content uses single "\n" between paragraphs; a standalone short line with no
// closing punctuation (or a "#" line) is treated as a section heading.
function parseContent(text = "") {
  return text
    .replace(/\r\n/g, "\n")
    .split(/\n+/)
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      const md = line.match(/^#{1,6}\s+(.*)$/);
      if (md) return { type: "heading", text: md[1] };
      const isHeading = line.length <= 80 && !/[.!?,;:"”]$/.test(line);
      return { type: isHeading ? "heading" : "paragraph", text: line };
    });
}

function formatDate(value) {
  const d = value ? new Date(value) : null;
  return d && !isNaN(d)
    ? d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
      })
    : null;
}

function getInitials(name = "") {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join("");
}

function Avatar({ name, bg, color, size = "h-12 w-12" }) {
  return (
    <span
      aria-hidden="true"
      className={`${size} flex shrink-0 items-center justify-center rounded-full text-sm font-semibold`}
      style={{ backgroundColor: bg || "#e5e7eb", color: color || "#374151" }}
    >
      {getInitials(name) || "ET"}
    </span>
  );
}

export default function SpecificArticle() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [related, setRelated] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | notfound | error
  const [shareMsg, setShareMsg] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    setStatus("loading");
    setArticle(null);
    setRelated([]);
    window.scrollTo(0, 0);

    axios
      .get(`${API_URL}/articles/${id}`, { signal: controller.signal })
      .then(({ data }) => {
        setArticle(data.article ?? data);
        setStatus("ready");
        // Related articles come from the list endpoint; failure here is non-fatal.
        return axios
          .get(`${API_URL}/articles`, { signal: controller.signal })
          .then(({ data: list }) => {
            const items = Array.isArray(list) ? list : list.articles || [];
            setRelated(
              items.filter((a) => String(a.id) !== String(id)).slice(0, 3)
            );
          })
          .catch(() => {});
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        const code = err.response?.status;
        setStatus(code === 404 || code === 400 ? "notfound" : "error");
      });

    return () => controller.abort();
  }, [id]);

  const blocks = useMemo(() => parseContent(article?.content), [article]);

  const readTime = useMemo(() => {
    if (article?.read_time) return article.read_time;
    const words = (article?.content || "").trim().split(/\s+/).filter(Boolean).length;
    return `${Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))} min`;
  }, [article]);

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: article.title, text: article.excerpt, url });
      } else {
        await navigator.clipboard.writeText(url);
        setShareMsg("Link copied");
        setTimeout(() => setShareMsg(""), 2000);
      }
    } catch {
      /* share cancelled */
    }
  };

  if (status === "loading") {
    return (
     <main className="sa-page mx-auto w-full max-w-5xl overflow-x-hidden px-4 py-10 sm:px-6">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900" />
        <p className="mt-4 text-gray-600">Loading article…</p>
      </main>
    );
  }

  if (status !== "ready") {
    const notFound = status === "notfound";
    return (
      <main className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          {notFound ? "Article not found" : "Something went wrong"}
        </h1>
        <p className="mt-3 text-gray-600">
          {notFound
            ? "The article you're looking for doesn't exist or was removed."
            : "We couldn't load this article. Please try again."}
        </p>
        <Link
          to="/articles"
          className="mt-8 inline-block rounded-full bg-gray-900 px-6 py-3 text-white transition hover:bg-gray-700"
        >
          Back to articles
        </Link>
      </main>
    );
  }

  const accent = article.accent_color || "#4f46e5";
  const author = article.author_name?.trim() || "Editorial Team";
  const date = formatDate(article.publish_date || article.created_at);
  const heroBackground = article.gradient || article.image_color || "#e5e7eb";

  return (
   <main className="sa-page mx-auto w-full max-w-5xl overflow-x-hidden px-4 py-10 sm:px-6 mt-10">
      <Link
        to="/articles"
        className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
      >
        ← Back to articles
      </Link>

      <article className="mt-8">
        <header className="mx-auto max-w-[720px]">
          {article.category && (
            <p
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: accent }}
            >
              {article.category}
            </p>
          )}
         <h1 className="sa-title mt-3 text-gray-900">
            {article.title}
          </h1>

          <div className="mt-6 flex items-center gap-3">
            <Avatar name={author} bg={article.avatar_bg} color={article.avatar_text} />
            <div className="min-w-0 text-sm">
              <p className="font-medium text-gray-900">By {author}</p>
              <p className="flex flex-wrap gap-x-2 text-gray-600">
                {date && <time dateTime={article.publish_date}>{date}</time>}
                {date && <span aria-hidden="true">·</span>}
                <span>{readTime} read</span>
              </p>
            </div>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <button
              onClick={handleShare}
              
              className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-800 transition hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900"
            >
              Share
            </button>
            <span role="status" className="text-sm text-green-600">
              {shareMsg}
            </span>
          </div>
        </header>

        {/* <figure className="mt-8">
          {article.image ? (
            <img
              src={article.image}
              alt={article.title}
              className="aspect-[16/9] w-full rounded-xl object-cover"
            />
          ) : (
            <div
              role="presentation"
              className="aspect-[16/7] w-full rounded-xl"
              style={{ background: heroBackground }}
            />
          )}
        </figure> */}

        {article.excerpt && (
          <aside
            className="mx-auto mt-10 max-w-[720px] rounded-xl border-l-4 bg-gray-50 p-5"
            style={{ borderColor: accent }}
          >
           <h2 className="sa-label text-xs uppercase tracking-widest text-gray-500">In brief</h2>
<p className="sa-brief-text mt-2">{article.excerpt}</p>
          </aside>
        )}

        <div className="sa-prose mx-auto mt-10 max-w-[720px]">
          {blocks.map((b, i) =>
            b.type === "heading" ? (
              <h2 key={i} className="mb-4 mt-12 text-2xl font-bold leading-snug text-gray-900">
                {b.text}
              </h2>
            ) : (
              <p key={i} className="mb-6">
                {b.text}
              </p>
            )
          )}
        </div>

        <footer className="mx-auto mt-12 max-w-[720px] rounded-xl border border-gray-200 p-5">
          <div className="flex items-start gap-4">
            <Avatar
              name={author}
              bg={article.avatar_bg}
              color={article.avatar_text}
              size="h-14 w-14"
            />
            <div className="min-w-0 ">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 sa-label">
                Written by
              </p>
              <p className="mt-1 text-lg font-semibold text-gray-900 sa-label">{author}</p>
              {article.role && <p className="text-sm text-gray-600">{article.role}</p>}
              {article.bio && <p className="mt-2 text-gray-700">{article.bio}</p>}
            </div>
          </div>
        </footer>
      </article>

      {related.length > 0 && (
        <section className="mt-20 border-t border-gray-200 pt-10" aria-labelledby="related-heading">
          <h2 id="related-heading" className="text-2xl font-bold text-gray-900">
            Related articles
          </h2>
          <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <li key={r.id}>
                <Link
                  to={`/articles/${r.id}`}
                  className="block h-full overflow-hidden rounded-xl border border-gray-200 transition hover:border-gray-400 hover:shadow-sm"
                >
                  <div
                    className="h-2"
                    style={{ background: r.gradient || r.image_color || "#e5e7eb" }}
                  />
                  <div className="p-5">
                    {r.category && (
                      <p
                        className="text-xs font-semibold uppercase tracking-widest"
                        style={{ color: r.accent_color || accent }}
                      >
                        {r.category}
                      </p>
                    )}
                    <h3 className="sa-card-title mt-2">
                      {r.title}
                    </h3>
                    {r.excerpt && (
                      <p className="mt-2 line-clamp-2 text-sm text-gray-600">{r.excerpt}</p>
                    )}
                    <p className="mt-3 text-xs text-gray-500">
                      {r.author_name?.trim() || "Editorial Team"}
                      {r.read_time ? ` · ${r.read_time}` : ""}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}