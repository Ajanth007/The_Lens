import { useState, useEffect, useContext, useRef } from "react";
import "./navbar.css";
import { AuthContext } from "../context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserRound, LogOut, ChevronDown, BookOpenText } from "lucide-react";

// Match these to your routes and reducer
const LOGIN_PATH = "/login";
const PROFILE_PATH = "/profile";
const LOGOUT_ACTION = "LOGOUT";
const ADDNEWFILE_PATH = "/addnewArticle";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Articles", href: "/articles" },
  { label: "Topics", href: "/topics" },
  { label: "Authors", href: "/authors" },
  { label: "About", href: "/about" },
];

function Avatar({ user, size = "h-9 w-9" }) {
  const initials = user?.initials?.trim();
  return (
    <span
      aria-hidden="true"
      className={`${size} flex shrink-0 items-center justify-center rounded-full bg-gray-900 text-xs font-semibold text-white`}
      style={
        user?.avatar_bg
          ? {
              backgroundColor: user.avatar_bg,
              color: user.avatar_text || "#374151",
            }
          : undefined
      }
    >
      {initials || <UserRound size={18} />}
    </span>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const profileRef = useRef(null);

  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close both menus whenever the route changes
  useEffect(() => {
    setMenuOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  // Close the avatar menu on outside click or Escape
  useEffect(() => {
    if (!profileOpen) return undefined;
    const onClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target))
        setProfileOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setProfileOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [profileOpen]);

  const handleLogout = () => {
    // BACKEND: if your server keeps a session or cookie, call your logout endpoint here first,
    // e.g. await axios.post(`${API_URL}/auth/logout`, null, { withCredentials: true });
    localStorage.removeItem("token");
    dispatch({ type: LOGOUT_ACTION }); // a string action type, not the LogOut icon
    setMenuOpen(false);
    setProfileOpen(false);
    navigate(LOGIN_PATH, { replace: true });
  };

  const menuItemClass =
    "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-gray-700 transition hover:bg-amber-50 hover:text-amber-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500";

  return (
    <nav
      className={`nav-font fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
        scrolled ? "navbar-shadow" : "border-b border-gray-100"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link
            to="/"
            className="brand-font text-2xl text-gray-900 tracking-tight"
          >
            The&nbsp;<span className="text-amber-500">Lens</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.label} to={link.href} className="nav-link">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative" ref={profileRef}>
                <button
                  type="button"
                  onClick={() => setProfileOpen((o) => !o)}
                  aria-expanded={profileOpen}
                  aria-controls="account-menu"
                  aria-label="Account menu"
                  className="flex items-center gap-1.5 rounded-full p-0.5 pr-2 transition hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                >
                  <Avatar user={user} />
                  <ChevronDown
                    size={14}
                    aria-hidden="true"
                    className={`text-gray-500 transition-transform duration-200 ${
                      profileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {profileOpen && (
                  <div
                    id="account-menu"
                    className="absolute right-0 mt-2 w-56 rounded-xl border border-gray-200 bg-white p-2 shadow-[0_18px_40px_-20px_rgba(31,29,27,0.35)]"
                  >
                    {user?.name && (
                      <div className="border-b border-gray-100 px-3 pb-2 pt-1">
                        <p className="truncate text-sm font-medium text-gray-900">
                          {user.name}
                        </p>
                        {user.role && (
                          <p className="truncate text-xs text-gray-500">
                            {user.role}
                          </p>
                        )}
                      </div>
                    )}
                    <Link to={PROFILE_PATH} className={`${menuItemClass} mt-1`}>
                      <UserRound size={16} aria-hidden="true" />
                      Your profile
                    </Link>

                    <Link
                      to={ADDNEWFILE_PATH}
                      className={`${menuItemClass} mt-1`}
                    >
                      <BookOpenText size={16} aria-hidden="true" />
                      Add New File
                    </Link>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className={menuItemClass}
                    >
                      <LogOut size={16} aria-hidden="true" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to={LOGIN_PATH}
                className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-900 transition hover:border-amber-600 hover:bg-amber-50 hover:text-amber-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              >
                Sign in
              </Link>
            )}

            <Link
              to="/subscribe"
              className="bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-gray-700 transition-colors duration-200"
            >
              Subscribe
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 group"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
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

      {/* Mobile menu */}
      <div
        className={`menu-slide md:hidden bg-white px-6 ${menuOpen ? "open" : "closed"}`}
      >
        <div className="pt-2 pb-4">
          {navLinks.map((link) => (
            <Link key={link.label} to={link.href} className="mobile-link">
              {link.label}
            </Link>
          ))}

          {user && (
            <div className="mt-3 flex items-center gap-3 border-t border-gray-100 pt-4">
              <Avatar user={user} />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-gray-900">
                  {user.name || "Your account"}
                </p>
                {user.role && (
                  <p className="truncate text-xs text-gray-500">{user.role}</p>
                )}
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-4">
            {user ? (
              <>
                <Link
                  to={PROFILE_PATH}
                  className="flex-1 text-center border border-gray-200 text-gray-700 text-sm font-medium py-2 rounded-full hover:bg-gray-50 transition-colors"
                >
                  Your profile
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex flex-1 items-center justify-center gap-1.5 border border-gray-200 text-gray-700 text-sm font-medium py-2 rounded-full hover:bg-gray-50 transition-colors"
                >
                  <LogOut size={15} aria-hidden="true" />
                  Sign out
                </button>
              </>
            ) : (
              <Link
                to={LOGIN_PATH}
                className="flex-1 text-center border border-gray-200 text-gray-700 text-sm font-medium py-2 rounded-full hover:bg-gray-50 transition-colors"
              >
                Sign in
              </Link>
            )}
            <Link
              to="/subscribe"
              className="flex-1 text-center bg-gray-900 text-white text-sm font-medium py-2 rounded-full hover:bg-gray-700 transition-colors"
            >
              Subscribe
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
