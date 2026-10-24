import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Modal from "./Modal";
import { fetchMyArticle, updateMyArticle } from "../../services/authorWorksApi";

const EMPTY = { title: "", category: "", excerpt: "", content: "" };

const labelClass = "mb-2 block text-sm font-medium text-gray-700";
const inputClass = (hasError) =>
  `w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-4 disabled:opacity-60 ${
    hasError
      ? "border-red-500 focus:border-red-500 focus:ring-red-100"
      : "border-gray-200 hover:border-gray-300 focus:border-amber-500 focus:ring-amber-400/20"
  }`;

function validate(f) {
  const e = {};
  if (!f.title.trim()) e.title = "Title is required.";
  else if (f.title.trim().length > 500) e.title = "Title must be 500 characters or fewer.";
  if (!f.category.trim()) e.category = "Category is required.";
  else if (f.category.trim().length > 100) e.category = "Category must be 100 characters or fewer.";
  if (!f.content.trim()) e.content = "Content can't be empty.";
  return e;
}

function Field({ id, label, error, hint, children }) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>{label}</label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-2 text-xs text-red-600">{error}</p>
      ) : (
        hint && <p className="mt-2 text-xs text-gray-500">{hint}</p>
      )}
    </div>
  );
}

export default function EditArticleModal({ articleId, categories, onClose, onSaved, onUnauthorized }) {
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [loadError, setLoadError] = useState("");
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    // BACKEND: GET /api/authors/me/articles/:id  (full article, only if it belongs to the logged-in author)
    fetchMyArticle(articleId, controller.signal)
      .then((a) => {
        setForm({
          title: a.title || "",
          category: a.category || "",
          excerpt: a.excerpt || "",
          content: a.content || "",
        });
        setStatus("ready");
      })
      .catch((err) => {
        if (err.cancelled) return;
        if (err.status === 401) return onUnauthorized();
        setLoadError(err.message);
        setStatus("error");
      });
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articleId]);

  const update = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((er) => ({ ...er, [name]: undefined }));
    setApiError("");
  };

  const words = form.content.trim().split(/\s+/).filter(Boolean).length;
  const readMinutes = Math.max(1, Math.ceil(words / 225));

  const submit = async (e) => {
    e.preventDefault();
    if (saving) return;

    const found = validate(form);
    setErrors(found);
    const firstBad = Object.keys(found)[0];
    if (firstBad) return document.getElementById(`ea-${firstBad}`)?.focus();

    setSaving(true);
    setApiError("");
    try {
      // BACKEND: PUT /api/authors/me/articles/:id  (server re-checks ownership and recalculates read_time)
      const updated = await updateMyArticle(articleId, {
        title: form.title.trim(),
        category: form.category.trim(),
        excerpt: form.excerpt.trim(),
        content: form.content.trim(),
      });
      onSaved(updated);
    } catch (err) {
      if (err.status === 401) return onUnauthorized();
      setApiError(err.message);
      setSaving(false);
    }
  };

  return (
    <Modal titleId="edit-title" onClose={onClose} locked={saving} size="max-w-3xl">
      <div className="flex items-start justify-between gap-4 border-b border-gray-100 px-6 py-5 sm:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">Editing</p>
          <h2 id="edit-title" className="font-editorial mt-1 text-2xl font-semibold text-gray-900 sm:text-3xl">
            Edit article
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          disabled={saving}
          aria-label="Close"
          className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-400/40 disabled:opacity-50"
        >
          <X size={20} aria-hidden="true" />
        </button>
      </div>

      {status === "loading" && (
        <div className="px-6 py-16 text-center sm:px-8" aria-busy="true">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900" />
          <p className="mt-4 text-sm text-gray-500">Loading article…</p>
        </div>
      )}

      {status === "error" && (
        <div className="px-6 py-12 text-center sm:px-8">
          <p role="alert" className="text-sm text-red-700">{loadError}</p>
          <button
            type="button"
            onClick={onClose}
            className="mt-6 rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-amber-700"
          >
            Close
          </button>
        </div>
      )}

      {status === "ready" && (
        <form onSubmit={submit} noValidate>
          <div className="space-y-5 px-6 py-6 sm:px-8">
            <Field id="ea-title" label="Title" error={errors.title}>
              <input
                id="ea-title"
                name="title"
                autoFocus
                className={inputClass(errors.title)}
                value={form.title}
                onChange={update}
                maxLength={500}
                aria-invalid={Boolean(errors.title)}
                aria-describedby={errors.title ? "ea-title-error" : undefined}
                disabled={saving}
              />
            </Field>

            <Field id="ea-category" label="Category" error={errors.category}>
              <input
                id="ea-category"
                name="category"
                list="ea-categories"
                className={inputClass(errors.category)}
                value={form.category}
                onChange={update}
                maxLength={100}
                aria-invalid={Boolean(errors.category)}
                aria-describedby={errors.category ? "ea-category-error" : undefined}
                disabled={saving}
              />
              <datalist id="ea-categories">
                {categories.map((c) => <option key={c} value={c} />)}
              </datalist>
            </Field>

            <Field id="ea-excerpt" label="Excerpt" hint="Shown on cards and in the “In brief” box.">
              <textarea
                id="ea-excerpt"
                name="excerpt"
                rows={2}
                className={`${inputClass(false)} resize-y leading-6`}
                value={form.excerpt}
                onChange={update}
                maxLength={1000}
                disabled={saving}
              />
            </Field>

            <Field
              id="ea-content"
              label="Content"
              error={errors.content}
              hint={`${words.toLocaleString()} words · about ${readMinutes} min read (updates automatically on save). Start a new line for each paragraph.`}
            >
              <textarea
                id="ea-content"
                name="content"
                rows={14}
                className={`${inputClass(errors.content)} resize-y leading-7`}
                value={form.content}
                onChange={update}
                aria-invalid={Boolean(errors.content)}
                aria-describedby={errors.content ? "ea-content-error" : undefined}
                disabled={saving}
              />
            </Field>

            {apiError && (
              <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {apiError}
              </p>
            )}
          </div>

          <div className="sticky bottom-0 flex flex-col-reverse gap-3 border-t border-gray-100 bg-white px-6 py-4 sm:flex-row sm:justify-end sm:px-8">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-900 transition hover:bg-gray-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-400/40 disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              aria-busy={saving}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-amber-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-400/50 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {saving ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />
                  Saving…
                </>
              ) : (
                "Save changes"
              )}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}