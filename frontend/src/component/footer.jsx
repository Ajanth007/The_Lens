import './footer.css';
export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Explore: ["Home", "Articles", "Topics", "Authors", "About"],
    Topics: ["Technology", "Culture", "Science", "Society", "Opinion"],
    Company: ["About Us", "Editorial Charter", "Advertise", "Careers", "Press"],
    Legal: ["Privacy Policy", "Terms of Use", "Cookie Settings", "Accessibility"],
  };

  const socials = [
    {
      label: "Twitter / X",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      label: "Instagram",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="4.5" />
          <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      label: "RSS Feed",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
          <path d="M4 11a9 9 0 0 1 9 9" />
          <path d="M4 4a16 16 0 0 1 16 16" />
          <circle cx="5" cy="19" r="1" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
  ];

  return (
    <>
      
      <footer className="body-font bg-white border-t border-gray-100">

        {/* ── Newsletter Strip ── */}
        <div className="border-b border-gray-100 bg-amber-50">
          <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="brand-font text-xl text-gray-900">Stay in the loop</p>
              <p className="text-gray-400 text-sm mt-1">Get our best stories delivered weekly. No spam, ever.</p>
            </div>
            <form
              className="flex gap-2 w-full md:w-auto md:min-w-[360px]"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-btn">Subscribe</button>
            </form>
          </div>
        </div>

        {/* ── Main Footer Grid ── */}
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

            {/* Brand Column */}
            <div className="md:col-span-4">
              <a href="#" className="brand-font text-2xl text-gray-900 tracking-tight mb-4 inline-block">
                The&nbsp;<span className="text-amber-500">Lens</span>
              </a>
              <p className="text-gray-400 text-sm leading-relaxed mt-3 max-w-xs">
                Independent journalism for curious minds. We write about culture, technology,
                and the stories that shape how we live.
              </p>

              {/* Socials */}
              <div className="flex gap-2 mt-6">
                {socials.map((s) => (
                  <a key={s.label} href="#" aria-label={s.label} className="social-btn">
                    {s.icon}
                  </a>
                ))}
              </div>

              {/* Badge */}
              <div className="mt-6 inline-flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-full px-3 py-1.5">
                <span className="w-2 h-2 bg-emerald-400 rounded-full inline-block" />
                <span className="text-gray-500 text-xs">Reader-supported & ad-free</span>
              </div>
            </div>

            {/* Nav Columns */}
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section} className="md:col-span-2">
                <p className="footer-col-title">{section}</p>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#" className="footer-link">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Trending Tags */}
          <div className="mt-14">
            <p className="text-xs text-gray-400 uppercase tracking-widest font-medium mb-4">Trending topics</p>
            <div className="flex flex-wrap gap-2">
              {["Artificial Intelligence", "Climate", "Remote Work", "Mental Health", "Web3", "Geopolitics", "Future of Work", "Design", "Startups", "Education"].map((tag) => (
                <a key={tag} href="#" className="tag-chip">{tag}</a>
              ))}
            </div>
          </div>
        </div>

        <hr className="divider" />

        {/* ── Bottom Bar ── */}
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-400 text-xs">
            © {currentYear} The Lens Publication. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-gray-400 text-xs">
            <span>Made with</span>
            <span className="text-amber-400 mx-0.5">♥</span>
            <span>by the editorial team</span>
          </div>
          <div className="flex gap-5">
            {["Privacy", "Terms", "Cookies"].map((l) => (
              <a key={l} href="#" className="footer-link text-xs">{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}