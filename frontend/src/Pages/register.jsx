import { useState } from "react";
import { Form, Link } from "react-router-dom";
import axios from "axios";
import {
  ArrowRight,
  ArrowUpRight,
  Eye,
  EyeOff,
  MapPin,
  UserRound,
  Mail,
  LockKeyhole,
} from "lucide-react";
// import "./AuthorLogin.css"; // shared tokens and components
import "./cssFile/Register.css";

const api = "http://localhost:8000";
const colors = {
  names: ["Amber", "Blue", "Rose", "Emerald"],
  backgrounds: ["#fef3c7", "#dbeafe", "#fce7f3", "#d1fae5"],
  texts: ["#92400e", "#1d4ed8", "#9d174d", "#065f46"],
  accents: ["#f59e0b", "#3b82f6", "#ec4899", "#10b981"],
};

const initialForm = {
  name: "",
  initials: "",
  role: "",
  bio: "",
  avatar_bg: colors.backgrounds[2],
  avatar_text: colors.texts[2],
  accent_color: colors.accents[2],
  location: "",
  password: "",
};

const colorFields = [
  {
    name: "avatar_bg",
    label: "Avatar background",
    options: colors.backgrounds,
  },
  { name: "avatar_text", label: "Avatar text", options: colors.texts },
  { name: "accent_color", label: "Accent color", options: colors.accents },
];

function makeInitials(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

function SectionTitle({ number, children }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="rg-step" aria-hidden="true">
        {number}
      </span>
      <h3 className="al-serif text-xl font-bold">{children}</h3>
      <div className="al-rule h-px flex-1 border-t" aria-hidden="true" />
    </div>
  );
}

function IconField({
  icon: Icon,
  id,
  label,
  required,
  className = "",
  children,
  ...inputProps
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="al-field-label">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      <div className="relative">
        <Icon size={16} className="rg-icon" aria-hidden="true" />
        <input
          id={id}
          name={id}
          required={required}
          className="al-input rg-has-icon"
          {...inputProps}
        />
        {children}
      </div>
    </div>
  );
}

export default function Register() {
  const [form, setForm] = useState(initialForm);
  const [initialsEdited, setInitialsEdited] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const update = (e) => {
    const { name, value } = e.target;
    if (name === "initials") setInitialsEdited(true);

    setForm((prev) => ({
      ...prev,
      [name]: name === "initials" ? value.toUpperCase() : value,
      // keep deriving initials from the name until the author edits them manually
      ...(name === "name" && !initialsEdited
        ? { initials: makeInitials(value) }
        : {}),
    }));
  };

  const setColor = (field, color) =>
    setForm((prev) => ({ ...prev, [field]: color }));

  const initials =
    form.initials.trim().toUpperCase() || makeInitials(form.name) || "U";
  ////

  const submit = async (e) => {
    e.preventDefault();

    console.log("1. Submit function triggered");

    if (loading) {
      console.log("2. Already loading, returning...");
      return;
    }

    setError("");
    setMessage("");

    setLoading(true);

    try {
      console.log("3. API URL:", `${api}/auth/register`);
      console.log("4. Sending registration request...");

      console.log(form);

      // Never log the password or the complete form object
      const response = await axios.post(`${api}/auth/register`, form);

      console.log("5. API response status:", response.status);
      console.log("6. API response data:", response.data);

      alert(JSON.stringify(response.data));

      console.log("7. Navigating to login page...");
      navigate("/login");

      setMessage("Registration successful!");
    } catch (err) {
      console.error("8. Registration failed!");
      console.error("Error message:", err.message);
      console.error("HTTP status:", err.response?.status);
      console.error("Backend error:", err.response?.data);
      console.error("Request URL:", err.config?.url);

      setError(
        err.response?.data?.message || "Registration failed. Please try again.",
      );
    } finally {
      console.log("9. Registration request completed");
      setLoading(false);
    }
  };

  return (
    <main className="al-page" style={{ "--al-accent": form.accent_color }}>
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-8 sm:py-8">
        {/* Header */}
        <header className="al-rule flex items-center justify-between border-b pb-5">
          <Link
            to="/"
            className="al-serif al-ink-link text-2xl font-extrabold tracking-tight"
          >
            TheLens
          </Link>

          <p className="al-label hidden text-xs uppercase tracking-[0.25em] sm:block">
            The Lens · Author Portal
          </p>

          <Link
            to="/author/login"
            className="al-link inline-flex items-center gap-1 text-sm"
          >
            Sign in <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </header>

        <div className="grid items-start gap-10 py-8 md:py-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:py-16">
          {/* Editorial introduction */}
          <section className="al-fade lg:sticky lg:top-10">
            <p className="al-label text-xs uppercase tracking-[0.25em]">
              Your next chapter starts here
            </p>

            <h1 className="al-serif mt-5 max-w-xl text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl xl:text-6xl">
              Every voice has a story.
              <em className="al-em block">Make yours heard.</em>
            </h1>

            <p className="al-muted mt-6 max-w-md text-base leading-relaxed">
              Join a community of curious minds, independent thinkers, and
              storytellers. Build your profile and share the perspective only
              you can bring.
            </p>

            <div
              className="al-card relative mt-9 hidden max-w-md overflow-hidden rounded-2xl p-7 sm:block sm:p-9"
              style={{ "--card-accent": form.accent_color }}
            >
              <span className="al-card__stripe" aria-hidden="true" />
              <p className="al-label inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em]">
                <span className="al-dot" aria-hidden="true" />A place for ideas
              </p>
              <p className="rg-quote mt-5">
                “Write to discover what you think.”
              </p>
              <p className="al-muted al-rule mt-6 border-t pt-4 text-xs uppercase tracking-[0.15em]">
                Read thoughtfully. Write boldly.
              </p>
            </div>

            <div className="mt-8 hidden items-center gap-3 lg:flex">
              <div className="flex -space-x-2" aria-hidden="true">
                {colors.backgrounds.map((bg, i) => (
                  <span
                    key={bg}
                    className="flex h-9 w-9 items-center justify-center rounded-full border-2 text-xs font-bold al-serif"
                    style={{
                      backgroundColor: bg,
                      color: colors.texts[i],
                      borderColor: "var(--al-bg)",
                    }}
                  >
                    {["A", "J", "M", "S"][i]}
                  </span>
                ))}
              </div>
              <p className="al-muted text-xs">
                Your identity. Your perspective. Your space.
              </p>
            </div>
          </section>

          {/* Registration panel */}
          <section
            className="rg-panel al-fade p-5 sm:p-8 lg:p-10"
            aria-labelledby="rg-heading"
          >
            <div className="mb-8">
              <p className="al-label text-xs uppercase tracking-[0.25em]">
                Create your profile
              </p>
              <h2
                id="rg-heading"
                className="al-serif mt-3 text-3xl font-bold leading-tight sm:text-4xl"
              >
                Join the conversation.
              </h2>
              <p className="al-muted mt-3 text-base">
                A few details to introduce yourself to the community.
              </p>
            </div>

            {/* Live profile preview */}
            {/*    <div
              className="al-card relative mb-8 flex items-center gap-4 overflow-hidden rounded-2xl p-4 sm:p-5"
              style={{ "--card-accent": form.accent_color }}
              aria-label="Profile preview"
            >
              <span className="al-card__stripe" aria-hidden="true" />
              <span
                aria-hidden="true"
                className="rg-avatar al-serif flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-xl font-bold"
                style={{
                  backgroundColor: form.avatar_bg,
                  color: form.avatar_text,
                  boxShadow: `inset 0 0 0 2px ${form.accent_color}`,
                }}
              >
                {initials}
              </span>

              <div className="min-w-0 flex-1">
                <p className="al-serif truncate text-lg font-bold">{form.name || "Your name goes here"}</p>
                <p className="truncate text-sm font-medium" style={{ color: form.avatar_text }}>
                  {form.role || "Your role or creative title"}
                </p>
                <span
                  className="al-label mt-2 inline-block rounded-full px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.15em]"
                  style={{ backgroundColor: `${form.accent_color}22`, color: form.avatar_text }}
                >
                  Profile preview
                </span>
              </div>
            </div> */}

            <form onSubmit={submit} className="space-y-8">
              {/* 01 About you */}
              <div>
                <SectionTitle number="01">About you</SectionTitle>

                <div className="grid gap-5 sm:grid-cols-2">
                  <IconField
                    icon={UserRound}
                    id="name"
                    label="Full name"
                    required
                    value={form.name}
                    onChange={update}
                    placeholder="Your full name"
                    autoComplete="name"
                    disabled={loading}
                  />

                  <div>
                    <label htmlFor="initials" className="al-field-label">
                      Initials
                    </label>
                    <input
                      id="initials"
                      name="initials"
                      className="al-input"
                      value={form.initials}
                      onChange={update}
                      placeholder="e.g. AA"
                      maxLength={4}
                      autoComplete="off"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label htmlFor="role" className="al-field-label">
                    Role or title
                  </label>
                  <input
                    id="role"
                    name="role"
                    className="al-input"
                    value={form.role}
                    onChange={update}
                    placeholder="Writer, journalist, designer…"
                    maxLength={80}
                    autoComplete="organization-title"
                    disabled={loading}
                  />
                </div>

                <div className="mt-5">
                  <label htmlFor="bio" className="al-field-label">
                    Short biography
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    className="al-input rg-textarea"
                    value={form.bio}
                    onChange={update}
                    rows={3}
                    maxLength={300}
                    placeholder="What do you love writing or thinking about?"
                    disabled={loading}
                  />
                  <p className="al-muted mt-1.5 text-right text-xs">
                    {form.bio.length}/300
                  </p>
                </div>

                <IconField
                  className="mt-5"
                  icon={MapPin}
                  id="location"
                  label="Location"
                  value={form.location}
                  onChange={update}
                  placeholder="City, country"
                  maxLength={120}
                  autoComplete="address-level2"
                  disabled={loading}
                />
              </div>

              {/* 02 Colours */}
              <div className="al-rule border-t pt-8">
                <SectionTitle number="02">Make it yours</SectionTitle>

                <p className="al-muted mb-5 text-sm leading-relaxed">
                  Choose your profile colors. The preview and this page's accent
                  update as you change them.
                </p>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                  {colorFields.map((field) => (
                    <div key={field.name} className="min-w-0">
                      <label htmlFor={field.name} className="al-field-label">
                        {field.label}
                      </label>
                      <select
                        id={field.name}
                        name={field.name}
                        value={form[field.name]}
                        onChange={update}
                        className="al-input rg-select"
                        disabled={loading}
                      >
                        {field.options.map((color, i) => (
                          <option key={color} value={color}>
                            {colors.names[i]}
                          </option>
                        ))}
                      </select>

                      <div className="rg-swatches">
                        {field.options.map((color, i) => (
                          <button
                            key={color}
                            type="button"
                            className="rg-swatch"
                            style={{ backgroundColor: color }}
                            aria-label={`${field.label}: ${colors.names[i]}`}
                            aria-pressed={form[field.name] === color}
                            title={colors.names[i]}
                            onClick={() => setColor(field.name, color)}
                            disabled={loading}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 03 Password */}
              <div className="al-rule border-t pt-8">
                <SectionTitle number="03">Secure your account</SectionTitle>

                <IconField
                  icon={LockKeyhole}
                  id="password"
                  label="Password"
                  required
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={update}
                  placeholder="At least 8 characters"
                  minLength={8}
                  autoComplete="new-password"
                  aria-describedby="password-hint"
                  disabled={loading}
                >
                  <button
                    type="button"
                    className="al-toggle"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    aria-pressed={showPassword}
                  >
                    {showPassword ? (
                      <EyeOff size={18} aria-hidden="true" />
                    ) : (
                      <Eye size={18} aria-hidden="true" />
                    )}
                  </button>
                </IconField>
                <p id="password-hint" className="al-muted mt-2 text-xs">
                  Use at least 8 characters.
                </p>
              </div>

              {error && (
                <p role="alert" className="al-alert">
                  {error}
                </p>
              )}
              {message && (
                <p role="status" className="rg-success">
                  {message}
                </p>
              )}

              <button
                type="submit"
                className="al-btn group"
                disabled={loading}
                aria-busy={loading}
              >
                {loading ? (
                  <>
                    <span className="al-spinner" aria-hidden="true" />
                    Creating your account…
                  </>
                ) : (
                  <>
                    Create your account
                    <ArrowRight
                      size={17}
                      aria-hidden="true"
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>

              <p className="al-muted text-center text-sm">
                Already part of the community?{" "}
                <Link to="/author/login" className="al-link">
                  Sign in
                </Link>
              </p>
            </form>
          </section>
        </div>

        <footer className="al-rule al-muted flex flex-col gap-2 border-t py-5 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} TheLens. All rights reserved.</p>
          <p className="tracking-wide">A home for thoughtful stories.</p>
        </footer>
      </div>
    </main>
  );
}
