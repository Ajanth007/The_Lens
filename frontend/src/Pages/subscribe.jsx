// SubscribePage.jsx — all styles self-contained, no Navbar or Footer included.
// Usage in App.jsx:
//   <Navbar />
//   <main style={{ paddingTop: "64px" }}><SubscribePage /></main>
//   <Footer />

import { useState } from "react";
import './cssFile/subscribe.css';



// ── Data ──────────────────────────────────────────────────────────────────────
const plans = [
  {
    id: "free",
    name: "Free",
    tagline: "Start reading today",
    monthlyPrice: 0,
    yearlyPrice: 0,
    accent: "#6b7280",
    features: [
      { text: "5 free articles per month",        included: true  },
      { text: "Weekly newsletter",                 included: true  },
      { text: "Access to public topics",           included: true  },
      { text: "Unlimited article access",          included: false },
      { text: "Ad-free reading experience",        included: false },
      { text: "Exclusive member discussions",      included: false },
      { text: "Early access to new features",      included: false },
      { text: "Direct author Q&As",                included: false },
    ],
  },
  {
    id: "supporter",
    name: "Supporter",
    tagline: "For the dedicated reader",
    monthlyPrice: 7,
    yearlyPrice: 60,
    accent: "#f59e0b",
    popular: true,
    features: [
      { text: "Unlimited article access",          included: true },
      { text: "Weekly newsletter",                 included: true },
      { text: "Ad-free reading experience",        included: true },
      { text: "Exclusive member discussions",      included: true },
      { text: "Access to all topics & archives",   included: true },
      { text: "Early access to new features",      included: false },
      { text: "Direct author Q&As",                included: false },
      { text: "Print edition (quarterly)",         included: false },
    ],
  },
  {
    id: "patron",
    name: "Patron",
    tagline: "Champion independent journalism",
    monthlyPrice: 15,
    yearlyPrice: 130,
    accent: "#111827",
    features: [
      { text: "Everything in Supporter",           included: true },
      { text: "Early access to new features",      included: true },
      { text: "Direct author Q&As",                included: true },
      { text: "Print edition (quarterly)",         included: true },
      { text: "Name in annual thank-you issue",    included: true },
      { text: "Private Discord community",         included: true },
      { text: "Monthly editorial call",            included: true },
      { text: "Gift subscriptions (2/yr)",         included: true },
    ],
  },
];

const testimonials = [
  {
    quote: "The Lens is the only publication I actually read every word of. Worth every penny.",
    name: "Aisha K.",
    role: "Product Designer",
    initials: "AK",
    bg: "#fef3c7", text: "#92400e",
    rating: 5,
  },
  {
    quote: "I cancelled three other subscriptions to make room for this one. No regrets.",
    name: "Tom R.",
    role: "Software Engineer",
    initials: "TR",
    bg: "#dbeafe", text: "#1d4ed8",
    rating: 5,
  },
  {
    quote: "Refreshing to read journalism that's not trying to make me angry. Highly recommended.",
    name: "Leila M.",
    role: "Academic Researcher",
    initials: "LM",
    bg: "#fce7f3", text: "#9d174d",
    rating: 5,
  },
];

const faqs = [
  {
    q: "Can I cancel anytime?",
    a: "Yes — cancel any time from your account settings. You'll retain access until the end of your billing period with no further charges.",
  },
  {
    q: "Is there a student discount?",
    a: "Yes! Students get 40% off any paid plan. Email us with a photo of your student ID and we'll apply the discount manually within 24 hours.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit and debit cards (Visa, Mastercard, Amex), PayPal, and UPI for readers in India.",
  },
  {
    q: "Can I switch plans later?",
    a: "Absolutely. You can upgrade or downgrade at any time. Upgrades take effect immediately; downgrades apply at the next billing cycle.",
  },
  {
    q: "Do you offer gift subscriptions?",
    a: "Yes — Patron members receive two gift subscriptions per year. Standalone gift subscriptions can also be purchased from the gifts page.",
  },
  {
    q: "How is my data used?",
    a: "We never sell your data. Your email is used only for delivering your subscription and newsletter. Read our full privacy policy for details.",
  },
];

const proofStats = [
  { value: "48K+",  label: "Subscribers" },
  { value: "4.9★",  label: "Avg rating" },
  { value: "98%",   label: "Retention rate" },
  { value: "0",     label: "Ads, ever" },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function SubscribePage() {
  const [billing, setBilling]     = useState("monthly"); // "monthly" | "yearly"
  const [selected, setSelected]   = useState("supporter");
  const [email, setEmail]         = useState("");
  const [name, setName]           = useState("");
  const [error, setError]         = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [openFaq, setOpenFaq]     = useState(null);

  const selectedPlan = plans.find((p) => p.id === selected);

  const price = selectedPlan
    ? billing === "yearly"
      ? selectedPlan.yearlyPrice
      : selectedPlan.monthlyPrice
    : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1600);
  };

  return (
    <>


      <div className="body-font">

        {/* ══ HERO ═════════════════════════════════════════════════════════════ */}
        <section className="sp-hero px-6 pt-16 pb-16 text-center">
          <div className="sp-hero-orb" style={{ width: 500, height: 500, top: -150, left: "50%", transform: "translateX(-50%)" }} />
          <div className="max-w-3xl mx-auto relative z-10">
            <div className="sp-fade-up inline-flex items-center gap-2 bg-white border border-amber-200 rounded-full px-4 py-1.5 text-xs font-medium text-amber-700 mb-6">
              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full sp-pulse" />
              Reader-supported · No ads · No paywalls on opinions
            </div>
            <h1 className="brand-font text-5xl md:text-6xl text-gray-900 leading-tight mb-5 sp-fade-up sp-d1">
              Support the journalism<br />
              <span className="italic text-amber-500">you believe in</span>
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed max-w-xl mx-auto sp-fade-up sp-d2">
              The Lens is entirely funded by readers like you. No investors, no advertisers — just
              honest journalism backed by the people who read it.
            </p>
          </div>
        </section>

        {/* ══ SOCIAL PROOF BAR ════════════════════════════════════════════════ */}
        <div className="max-w-5xl mx-auto px-6 -mt-2 mb-14">
          <div className="sp-proof-bar sp-fade-up sp-d3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {proofStats.map((s) => (
                <div key={s.label}>
                  <p className="brand-font text-2xl text-white">{s.value}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ PLANS ════════════════════════════════════════════════════════════ */}
        <section className="max-w-6xl mx-auto px-6 pb-20">

          {/* Billing toggle */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10 sp-fade-up">
            <div className="sp-toggle-wrap">
              <button
                className={`sp-toggle-btn ${billing === "monthly" ? "active" : ""}`}
                onClick={() => setBilling("monthly")}
              >
                Monthly
              </button>
              <button
                className={`sp-toggle-btn ${billing === "yearly" ? "active" : ""}`}
                onClick={() => setBilling("yearly")}
              >
                Yearly
              </button>
            </div>
            <span className="sp-save-badge">Save up to 30% yearly</span>
          </div>

          {/* Plan cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {plans.map((plan, i) => (
              <div
                key={plan.id}
                className={`sp-plan-card sp-fade-up sp-d${i + 1} ${plan.popular ? "sp-popular" : ""} ${selected === plan.id ? "sp-selected" : ""}`}
                onClick={() => setSelected(plan.id)}
              >
                {plan.popular && <span className="sp-popular-badge">Most popular</span>}

                {/* Plan header */}
                <div className="mb-6">
                  <p className="brand-font text-xl text-gray-900 mb-1">{plan.name}</p>
                  <p className="text-gray-400 text-xs leading-relaxed">{plan.tagline}</p>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-end gap-1">
                    <span className="sp-plan-price">
                      {plan.monthlyPrice === 0 ? "Free" : `$${billing === "yearly" ? Math.round(plan.yearlyPrice / 12) : plan.monthlyPrice}`}
                    </span>
                    {plan.monthlyPrice > 0 && (
                      <span className="text-gray-400 text-sm pb-2">/mo</span>
                    )}
                  </div>
                  {plan.monthlyPrice > 0 && billing === "yearly" && (
                    <p className="text-xs text-emerald-600 font-medium mt-1">
                      ${plan.yearlyPrice} billed yearly · saves ${(plan.monthlyPrice * 12) - plan.yearlyPrice}/yr
                    </p>
                  )}
                  {plan.monthlyPrice === 0 && (
                    <p className="text-xs text-gray-400 mt-1">No credit card required</p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-2.5">
                      <div className={`sp-plan-check mt-0.5 ${f.included ? "bg-emerald-100" : "bg-gray-100"}`}>
                        {f.included ? (
                          <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3" stroke="#065f46" strokeWidth="2">
                            <path d="M2 6l3 3 5-5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        ) : (
                          <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3" stroke="#9ca3af" strokeWidth="2">
                            <path d="M3 9l6-6M9 9L3 3" strokeLinecap="round"/>
                          </svg>
                        )}
                      </div>
                      <span className={`text-xs leading-relaxed ${f.included ? "text-gray-700" : "text-gray-400"}`}>
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Select indicator */}
                <div
                  className="w-full py-2.5 rounded-xl text-center text-sm font-medium transition-all"
                  style={{
                    background: selected === plan.id ? plan.accent : "transparent",
                    border: `1px solid ${selected === plan.id ? plan.accent : "#e5e7eb"}`,
                    color: selected === plan.id ? (plan.id === "supporter" ? "#111827" : "#fff") : "#6b7280",
                  }}
                >
                  {selected === plan.id ? "✓ Selected" : "Choose plan"}
                </div>
              </div>
            ))}
          </div>

          {/* ══ SIGNUP FORM + FEATURES ════════════════════════════════════════ */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* Form */}
            <div className="sp-fade-up sp-d3">
              <div className="border border-gray-100 rounded-2xl p-8 bg-white shadow-sm">
                {submitted ? (
                  <div className="sp-success">
                    <div className="sp-check-circle">
                      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="#065f46" strokeWidth="2.5">
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h2 className="brand-font text-3xl text-gray-900 mb-2">You're in! 🎉</h2>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs mx-auto">
                      Welcome to The Lens, {name || "friend"}. Check your inbox for a confirmation email and your first issue.
                    </p>
                    <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-left max-w-xs mx-auto">
                      <p className="text-xs text-gray-500">Your plan</p>
                      <p className="brand-font text-lg text-gray-900 mt-0.5">{selectedPlan?.name}</p>
                      {price > 0 && (
                        <p className="text-xs text-gray-400 mt-0.5">
                          ${price}/mo · billed {billing}
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="mb-6">
                      <p className="text-xs text-amber-600 font-medium tracking-widest uppercase mb-1">
                        Selected plan
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="brand-font text-2xl text-gray-900">{selectedPlan?.name}</p>
                        <div className="text-right">
                          <p className="brand-font text-2xl text-gray-900">
                            {price === 0 ? "Free" : `$${price}/mo`}
                          </p>
                          {price > 0 && billing === "yearly" && (
                            <p className="text-xs text-emerald-600">Billed yearly</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="text-xs font-medium text-gray-600 mb-1.5 block">Your name</label>
                        <input
                          type="text"
                          placeholder="Jane Smith"
                          className="sp-input"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-600 mb-1.5 block">Email address</label>
                        <input
                          type="email"
                          placeholder="jane@example.com"
                          className={`sp-input ${error ? "sp-error" : ""}`}
                          value={email}
                          onChange={(e) => { setEmail(e.target.value); setError(""); }}
                        />
                        {error && <p className="text-xs text-red-500 mt-1.5">{error}</p>}
                      </div>

                      {price > 0 && (
                        <div>
                          <label className="text-xs font-medium text-gray-600 mb-1.5 block">Card details</label>
                          <input type="text" placeholder="1234 5678 9012 3456" className="sp-input" readOnly />
                          <div className="grid grid-cols-2 gap-3 mt-3">
                            <input type="text" placeholder="MM / YY" className="sp-input" readOnly />
                            <input type="text" placeholder="CVC" className="sp-input" readOnly />
                          </div>
                          <p className="text-xs text-gray-400 mt-2">
                            🔒 Payments are encrypted and processed securely.
                          </p>
                        </div>
                      )}

                      <button
                        type="submit"
                        className={`sp-btn-primary ${selectedPlan?.id === "supporter" ? "sp-amber" : ""}`}
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <svg className="w-4 h-4 sp-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                            </svg>
                            Processing…
                          </>
                        ) : (
                          <>
                            {price === 0 ? "Get free access →" : `Subscribe for $${price}/mo →`}
                          </>
                        )}
                      </button>

                      <div className="sp-divider">
                        <span className="text-xs text-gray-400">or</span>
                      </div>

                      <button type="button" className="sp-btn-primary" style={{ background: "#fff", color: "#374151", border: "1px solid #e5e7eb" }}>
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        Continue with Google
                      </button>

                      <p className="text-center text-xs text-gray-400">
                        By subscribing you agree to our{" "}
                        <a href="#" className="text-gray-600 underline hover:text-amber-600 transition-colors">Terms</a>{" "}
                        and{" "}
                        <a href="#" className="text-gray-600 underline hover:text-amber-600 transition-colors">Privacy Policy</a>.
                        Cancel anytime.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>

            {/* Features list */}
            <div className="sp-fade-up sp-d4">
              <p className="text-amber-500 text-xs font-medium tracking-widest uppercase mb-2">Why subscribe</p>
              <h2 className="brand-font text-3xl text-gray-900 mb-6">
                What you get with<br />
                <span className="italic">The Lens</span>
              </h2>

              {[
                { icon: "📖", bg: "#fff7ed", title: "Unlimited reading",      desc: "Access every article ever published — including the full archive dating back to 2018."  },
                { icon: "🚫", bg: "#f0fdf4", title: "Zero ads, zero tracking", desc: "We don't sell your data or show ads. Your attention is yours."                          },
                { icon: "✉️", bg: "#eff6ff", title: "Weekly editorial digest", desc: "A curated email every Friday with our editors' picks, explained in plain language."       },
                { icon: "💬", bg: "#fdf4ff", title: "Member discussions",      desc: "Join conversations with other readers and occasionally our writers in member-only threads." },
                { icon: "🎙️", bg: "#fff1f2", title: "Author Q&As",            desc: "Patron members get direct access to quarterly Q&As with our writing team."                 },
                { icon: "📬", bg: "#fefce8", title: "Print quarterly",         desc: "Patron members receive a beautifully printed quarterly edition by mail."                   },
              ].map((f) => (
                <div key={f.title} className="sp-feature-row">
                  <div className="sp-feature-icon" style={{ background: f.bg }}>{f.icon}</div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-0.5">{f.title}</p>
                    <p className="text-xs text-gray-400 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}

              {/* Mini testimonial */}
              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 mt-6">
                <p className="sp-stars">★★★★★</p>
                <p className="brand-font italic text-amber-800 text-sm leading-relaxed mt-2 mb-3">
                  "The Lens is the only subscription I've never considered cancelling. It's that good."
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 brand-font text-xs flex items-center justify-center font-bold">DW</div>
                  <span className="text-xs text-gray-500">David W. · Subscriber since 2020</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ TESTIMONIALS ════════════════════════════════════════════════════ */}
        <section className="bg-gray-50 border-y border-gray-100 px-6 py-16">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-amber-500 text-xs font-medium tracking-widest uppercase mb-2">Reader love</p>
              <h2 className="brand-font text-3xl text-gray-900">Why readers stay</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {testimonials.map((t, i) => (
                <div key={i} className={`sp-testimonial sp-fade-up sp-d${i + 1}`}>
                  <p className="sp-stars mb-3">{"★".repeat(t.rating)}</p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 brand-font italic">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full brand-font text-xs flex items-center justify-center font-bold flex-shrink-0"
                      style={{ background: t.bg, color: t.text }}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{t.name}</p>
                      <p className="text-xs text-gray-400">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ FAQ ══════════════════════════════════════════════════════════════ */}
        <section className="max-w-3xl mx-auto px-6 py-20">
          <div className="text-center mb-10">
            <p className="text-amber-500 text-xs font-medium tracking-widest uppercase mb-2">Got questions?</p>
            <h2 className="brand-font text-3xl text-gray-900">Frequently asked</h2>
          </div>
          <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white">
            {faqs.map((faq, i) => (
              <div key={i} className="sp-faq-item px-6">
                <button
                  className="sp-faq-btn"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-sm font-medium text-gray-800">{faq.q}</span>
                  <svg
                    className={`sp-faq-chevron ${openFaq === i ? "open" : ""}`}
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  >
                    <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <div className={`sp-faq-body ${openFaq === i ? "open" : "closed"}`}>
                  <p className="text-gray-400 text-sm leading-relaxed pb-4">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-400 mt-6">
            Still have questions?{" "}
            <a href="#" className="text-amber-600 hover:text-amber-800 font-medium transition-colors">
              Email us →
            </a>
          </p>
        </section>

        {/* ══ BOTTOM CTA ═══════════════════════════════════════════════════════ */}
        <section className="max-w-4xl mx-auto px-6 pb-24">
          <div
            className="rounded-3xl px-10 py-16 text-center relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #111827 0%, #1f2937 100%)" }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ backgroundImage: "radial-gradient(circle at 80% 20%, rgba(245,158,11,0.15) 0%, transparent 55%), radial-gradient(circle at 20% 80%, rgba(99,102,241,0.1) 0%, transparent 55%)" }}
            />
            <p className="text-amber-400 text-xs tracking-widest uppercase font-medium mb-3 relative z-10">
              Ready to join?
            </p>
            <h2 className="brand-font text-4xl md:text-5xl text-white mb-4 relative z-10">
              Start reading today.<br />
              <span className="italic text-amber-400">Cancel anytime.</span>
            </h2>
            <p className="text-gray-400 max-w-md mx-auto mb-8 text-base leading-relaxed relative z-10">
              Join 48,000 readers who chose to invest in honest, independent journalism.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center relative z-10">
              <button
                className="sp-btn-primary sp-amber"
                style={{ width: "auto", padding: "0.85rem 2rem", fontSize: "0.9rem" }}
                onClick={() => { setSelected("supporter"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              >
                Subscribe now →
              </button>
              <button
                className="sp-btn-primary"
                style={{ width: "auto", padding: "0.85rem 2rem", fontSize: "0.9rem", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}
                onClick={() => { setSelected("free"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              >
                Start for free
              </button>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}