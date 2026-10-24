import { useState, useEffect } from "react";
import './navbar.css';

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Articles", href: "/articles" },
  { label: "Topics", href: "/topics" },
  { label: "Authors", href: "/authors" },
  { label: "About", href: "/about" },

];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
     

      <nav
        className={`nav-font fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
          scrolled ? "navbar-shadow" : "border-b border-gray-100"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">

            {/* Brand */}
            <a href="/" className="brand-font text-2xl text-gray-900 tracking-tight">
              The&nbsp;<span className="text-amber-500">Lens</span>
            </a>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} className="nav-link">
                  {link.label}
                </a>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              <a href= '/login'className="nav-link text-sm px-0 cursor-pointer">Login</a>
              <a
                href="/subscribe"
                className="bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-gray-700 transition-colors duration-200"
              >
                Subscribe
              </a>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 group"
              aria-label="Toggle menu"
            >
              <span
                className={`block h-0.5 bg-gray-700 transition-all duration-300 ${
                  menuOpen ? "w-5 rotate-45 translate-y-2" : "w-5"
                }`}
              />
              <span
                className={`block h-0.5 bg-gray-700 transition-all duration-300 ${
                  menuOpen ? "opacity-0 w-0" : "w-4"
                }`}
              />
              <span
                className={`block h-0.5 bg-gray-700 transition-all duration-300 ${
                  menuOpen ? "w-5 -rotate-45 -translate-y-2" : "w-5"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`menu-slide md:hidden bg-white px-6 ${menuOpen ? "open" : "closed"}`}>
          <div className="pt-2 pb-4">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="mobile-link">
                {link.label}
              </a>
            ))}
            <div className="flex gap-3 mt-4">
              <button className="flex-1 border border-gray-200 text-gray-700 text-sm font-medium py-2 rounded-full hover:bg-gray-50 transition-colors">
                Sign in
              </button>
              <a
                href="/subscribe"
                className="flex-1 text-center bg-gray-900 text-white text-sm font-medium py-2 rounded-full hover:bg-gray-700 transition-colors"
              >
                Subscribe
              </a>
            </div>
          </div>
        </div>
      </nav>

     
    </>
  );
}