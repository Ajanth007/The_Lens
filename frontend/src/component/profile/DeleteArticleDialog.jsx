import { useState } from "react";
import { Trash2 } from "lucide-react";
import Modal from "./Modal";
import { deleteMyArticle } from "../../services/authorWorksApi";

export default function DeleteArticleDialog({ article, onClose, onDeleted, onUnauthorized }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const confirm = async () => {
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      // BACKEND: DELETE /api/authors/me/articles/:id
      await deleteMyArticle(article.id);
      onDeleted(article.id);
    } catch (err) {
      if (err.status === 401) return onUnauthorized();
      if (err.status === 404) return onDeleted(article.id); // already gone
      setError(err.message);
      setBusy(false);
    }
  };

  return (
    <Modal titleId="del-title" onClose={onClose} locked={busy} size="max-w-md">
      <div className="p-6 sm:p-8">
        <span
          aria-hidden="true"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-700"
        >
          <Trash2 size={22} />
        </span>

        <h2 id="del-title" className="font-editorial mt-5 text-2xl font-semibold text-gray-900">
          Delete this article?
        </h2>
        <p className="mt-3 text-sm leading-6 text-gray-500">
          “<span className="font-medium text-gray-700">{article.title}</span>” will be permanently
          removed, along with its {Number(article.views) || 0} views. This can't be undone.
        </p>

        {error && (
          <p role="alert" className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            autoFocus
            onClick={onClose}
            disabled={busy}
            className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-900 transition hover:bg-gray-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-400/40 disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={confirm}
            disabled={busy}
            aria-busy={busy}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-red-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-red-200 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {busy ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />
                Deleting…
              </>
            ) : (
              "Delete article"
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}