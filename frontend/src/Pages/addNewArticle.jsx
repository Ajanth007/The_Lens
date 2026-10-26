import React, { useState, useRef, useEffect } from "react";

import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import axios from "axios";

// Replace with data from your API
const CATEGORIES = [
  "Style Guide",
  "Fabrics",
  "Sustainability",
  "Behind the Seams",
  "News",
];

const GRADIENTS = [
  { name: "Olive", value: "linear-gradient(135deg, #8B9A6E, #2F3A25)" },
  { name: "Sand", value: "linear-gradient(135deg, #EAE2D6, #D9CBB4)" },
  { name: "Sage Mist", value: "linear-gradient(135deg, #F7F2EB, #8B9A6E)" },
  { name: "Earth", value: "linear-gradient(135deg, #3A362F, #8B9A6E)" },
];

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 500);

const calcReadTime = (text) => {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min`;
};

const today = () => new Date().toISOString().split("T")[0];

const labelClass = "text-sm font-medium tracking-wide text-[#2F3A25]";
const inputClass =
  "bg-transparent border-b border-[#C9BFA9] py-2 text-sm text-[#3A362F] focus:outline-none focus:border-[#8B9A6E] transition-colors";

const AddArticle = () => {
  const { user } = useContext(AuthContext);
  const contentRef = useRef(null);
  const [slugTouched, setSlugTouched] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const initialForm = {
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    author_id: "",
    author_name: "",
    publish_date: today(),
    read_time: "5 min",
    image_color: "#8B9A6E",
    gradient: GRADIENTS[0].value,
    featured: false,
  };

  //   const [form, setForm] = useState({
  //     title: "",
  //     slug: "",
  //     excerpt: "",
  //     content: "",
  //     category: "",
  //     author_id: "",
  //     author_name: "",
  //     publish_date: today(),
  //     read_time: "5 min",
  //     image_color: "#8B9A6E",
  //     gradient: GRADIENTS[0].value,
  //     featured: false,
  //   });

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (!user) {
      console.log("No user is present");
      return;
    }

    setForm((prev) => ({
      ...prev,
      author_id: user.id,
      author_name: user.username,
    }));
  }, [user]);

  console.log(form);

  const update = (name, value) => setForm((f) => ({ ...f, [name]: value }));

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    update(name, type === "checkbox" ? checked : value);
  };

  const handleTitle = (e) => {
    const title = e.target.value;
    setForm((f) => ({
      ...f,
      title,
      slug: slugTouched ? f.slug : slugify(title),
    }));
  };

  const handleSlug = (e) => {
    setSlugTouched(true);
    update("slug", slugify(e.target.value));
  };

  const handleContent = (e) => {
    const content = e.target.value;
    setForm((f) => ({ ...f, content, read_time: calcReadTime(content) }));
  };

  // Toolbar: applies markdown-style formatting to the selected text
  const applyFormat = (type) => {
    const ta = contentRef.current;
    if (!ta) return;
    const { selectionStart: start, selectionEnd: end, value } = ta;
    const selected = value.slice(start, end);
    let replacement = selected;

    if (type === "bold") replacement = `**${selected || "bold text"}**`;
    if (type === "italic") replacement = `*${selected || "italic text"}*`;
    if (type === "ul")
      replacement = (selected || "List item")
        .split("\n")
        .map((line) => `- ${line}`)
        .join("\n");
    if (type === "ol")
      replacement = (selected || "List item")
        .split("\n")
        .map((line, i) => `${i + 1}. ${line}`)
        .join("\n");

    const next = value.slice(0, start) + replacement + value.slice(end);
    setForm((f) => ({ ...f, content: next, read_time: calcReadTime(next) }));

    requestAnimationFrame(() => {
      ta.focus();
      ta.setSelectionRange(start, start + replacement.length);
    });
  };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     const payload = {
  //       ...form,
  //       author_id: Number(form.author_id),
  //       featured: form.featured ? 1 : 0,
  //     };
  //     console.log(payload);
  //     console.log(form)
  //     // POST payload to your API here
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submitting) return;

    setSubmitting(true);

    const payload = {
      ...form,
      author_id: Number(form.author_id),
      featured: form.featured ? 1 : 0,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/articles",
        payload,
      );

      console.log("Article created:", response.data.article);

      // Clear the form after successful submission
      setForm({
        ...initialForm,
        author_id: user.id,
        author_name: user.username,
      });

      alert("Article published successfully!");
    } catch (error) {
      console.error(
        "Error creating article:",
        error.response?.data || error.message,
      );

      alert(error.response?.data?.error || "Failed to publish article");
    } finally {
      setSubmitting(false);
    }
  };

  const toolbarBtn =
    "px-3 py-1 text-sm text-[#2F3A25] hover:bg-[#EAE2D6] transition-colors";

  return (
    <div className="bg-[#EAE2D6] w-full px-8 md:px-20 py-24">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <div className="flex flex-col gap-3 mb-12">
          <p className="text-xs tracking-[0.3em] text-[#8B9A6E] font-medium">
            Journal
          </p>
          <h1 className="text-4xl md:text-5xl font-light tracking-wide text-[#3A362F]">
            Add New Article
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#F7F2EB] p-10 flex flex-col gap-8"
        >
          {/* Title */}
          <div className="flex flex-col gap-2">
            <label className={labelClass}>Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleTitle}
              maxLength={500}
              required
              className={`${inputClass} text-lg`}
            />
          </div>

          {/* Slug */}
          <div className="flex flex-col gap-2">
            <label className={labelClass}>Slug</label>
            <input
              type="text"
              name="slug"
              value={form.slug}
              onChange={handleSlug}
              maxLength={500}
              required
              className={inputClass}
            />
            <span className="text-xs tracking-wide text-[#6B6558]">
              Generated from the title. Edit it if you want a custom URL.
            </span>
          </div>

          {/* Category / Author / Date / Read time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <label className={labelClass}>Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className={inputClass}
              >
                <option value="" disabled>
                  Select a category
                </option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className={labelClass}>Author</label>

              <input
                type="text"
                name="author_name"
                value={form.author_name}
                readOnly
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className={labelClass}>Publish Date</label>
              <input
                type="date"
                name="publish_date"
                value={form.publish_date}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className={labelClass}>Read Time</label>
              <input
                type="text"
                name="read_time"
                value={form.read_time}
                onChange={handleChange}
                maxLength={20}
                className={inputClass}
              />
            </div>
          </div>

          {/* Excerpt */}
          <div className="flex flex-col gap-2">
            <label className={labelClass}>Excerpt</label>
            <textarea
              name="excerpt"
              value={form.excerpt}
              onChange={handleChange}
              rows={3}
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Content with toolbar */}
          <div className="flex flex-col gap-2">
            <label className={labelClass}>Content</label>
            <div className="border border-[#C9BFA9]">
              <div className="flex items-center gap-1 border-b border-[#C9BFA9] px-2 py-1">
                <button
                  type="button"
                  onClick={() => applyFormat("bold")}
                  className={`${toolbarBtn} font-bold`}
                >
                  B
                </button>
                <button
                  type="button"
                  onClick={() => applyFormat("italic")}
                  className={`${toolbarBtn} italic`}
                >
                  I
                </button>
                <span className="mx-1 h-4 w-px bg-[#C9BFA9]" />
                <button
                  type="button"
                  onClick={() => applyFormat("ul")}
                  className={toolbarBtn}
                >
                  • List
                </button>
                <button
                  type="button"
                  onClick={() => applyFormat("ol")}
                  className={toolbarBtn}
                >
                  1. List
                </button>
              </div>
              <textarea
                ref={contentRef}
                name="content"
                value={form.content}
                onChange={handleContent}
                rows={14}
                className="w-full bg-transparent p-4 text-sm leading-relaxed text-[#3A362F] focus:outline-none resize-y"
              />
            </div>
            <span className="text-xs tracking-wide text-[#6B6558]">
              Saved as markdown. Read time updates as you write.
            </span>
          </div>

          {/* Appearance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <label className={labelClass}>Image Color</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={form.image_color}
                  onChange={(e) => update("image_color", e.target.value)}
                  className="h-9 w-12 cursor-pointer bg-transparent border border-[#C9BFA9]"
                />
                <input
                  type="text"
                  name="image_color"
                  value={form.image_color}
                  onChange={handleChange}
                  maxLength={50}
                  className={`${inputClass} flex-1`}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className={labelClass}>Gradient</label>
              <div className="flex gap-3">
                {GRADIENTS.map((g) => (
                  <button
                    key={g.name}
                    type="button"
                    title={g.name}
                    onClick={() => update("gradient", g.value)}
                    style={{ background: g.value }}
                    className={`h-9 w-9 rounded-full transition-transform hover:scale-110 ${
                      form.gradient === g.value
                        ? "ring-2 ring-[#2F3A25] ring-offset-2 ring-offset-[#F7F2EB]"
                        : ""
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Preview strip */}
          <div
            className="h-24 w-full"
            style={{
              background: form.gradient,
              borderBottom: `4px solid ${form.image_color}`,
            }}
          />

          {/* Featured */}
          <label className="flex items-center gap-3 cursor-pointer w-fit">
            <input
              type="checkbox"
              name="featured"
              checked={form.featured}
              onChange={handleChange}
              className="h-4 w-4 accent-[#8B9A6E]"
            />
            <span className={labelClass}>Feature this article</span>
          </label>

          {/* Publish */}
          <button
            type="submit"
            className="w-fit bg-[#8B9A6E] text-white px-10 py-3 text-sm tracking-[0.15em] hover:bg-[#7a8960] transition-colors duration-200"
          >
            Publish
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddArticle;
