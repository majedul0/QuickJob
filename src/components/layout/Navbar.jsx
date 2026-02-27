import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import Button from "../ui/Button/Button";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const closeMenu = () => setMenuOpen(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    closeMenu();
    navigate("/");
  };

  const scrollToFeaturedJobs = (e) => {
    e.preventDefault();
    closeMenu();
    const el = document.getElementById("featured-jobs");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        document.getElementById("featured-jobs")?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  };

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        {/* Logo – links to home */}
        <Link to="/" className="navbar__logo" onClick={closeMenu}>
          <img src="/logo.png" alt="QuickHire" className="navbar__logo-img" />
        </Link>

        {/* Mobile hamburger */}
        <button
          className="navbar__toggle"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Center nav links */}
        <nav className={`navbar__nav ${menuOpen ? "navbar__nav--open" : ""}`}>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `navbar__link ${isActive ? "navbar__link--active" : ""}`
            }
            onClick={closeMenu}
          >
            Find Jobs
          </NavLink>
          <a
            href="#featured-jobs"
            className="navbar__link"
            onClick={scrollToFeaturedJobs}
          >
            Browse Companies
          </a>
        </nav>

        {/* Right side: Auth / Profile */}
        <div className={`navbar__actions ${menuOpen ? "navbar__actions--open" : ""}`}>
          {user ? (
            /* ── Logged-in state ── */
            <div className="navbar__profile" ref={dropdownRef}>
              <button
                className="navbar__profile-btn"
                onClick={() => setDropdownOpen((v) => !v)}
              >
                <span className="navbar__avatar">
                  {user.firstName?.[0]}
                  {user.lastName?.[0]}
                </span>
                <span className="navbar__username">
                  {user.firstName} {user.lastName}
                </span>
                <ChevronDown size={16} />
              </button>

              {dropdownOpen && (
                <div className="navbar__dropdown">
                  <div className="navbar__dropdown-header">
                    <span className="navbar__dropdown-name">
                      {user.firstName} {user.lastName}
                    </span>
                    <span className="navbar__dropdown-email">{user.email}</span>
                    <span className="navbar__dropdown-role">{user.role}</span>
                  </div>
                  <div className="navbar__dropdown-divider" />
                  <button className="navbar__dropdown-item" onClick={handleLogout}>
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* ── Logged-out state ── */
            <>
              <Link to="/login" className="navbar__auth-link" onClick={closeMenu}>
                Login
              </Link>
              <Link to="/signup" onClick={closeMenu}>
                <Button variant="primary" size="sm">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
          <span className="navbar__divider" />
          <Link to="/admin/login" onClick={closeMenu}>
            <Button variant="outline" size="sm">
              Admin Login
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
