import { NavLink, matchPath, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  Settings,
  Package,
  BookOpen,
  Shield,
  FileText,
  Calendar,
  Database,
  ChevronDown
} from "lucide-react";
import "./Navbar.css";
import logoImage from "../images/logo.png";

/**
 * Global site navigation with animated gooey menu on desktop
 * and a collapsible drawer on mobile. Syncs active route with
 * react-router and animates transitions with GSAP timelines.
 */

// Authoritative list of app routes shown in both desktop + mobile navs.
const navStructure = [
  { type: "link", to: "/", label: "Home" },
  { type: "link", to: "/about", label: "About Us" },
  {
    type: "dropdown",
    label: "Solutions",
    items: [
      { to: "/services", label: "Services", icon: Settings },
      { to: "/products", label: "Products", icon: Package },
      { to: "/journals-publishing", label: "Journals Publishing", icon: BookOpen },
      { to: "/ipr-patents", label: "IPR & Patents", icon: Shield },
    ],
  },
  {
    type: "dropdown",
    label: "Resources",
    items: [
      { to: "/blog", label: "Blog", icon: FileText },
      { to: "/events", label: "Events", icon: Calendar },
      { to: "/resources", label: "Resource Hub", icon: Database },
    ],
  },
  // { type: "link", to: "/careers", label: "Careers" },
  { type: "link", to: "/contact", label: "Contact Us" },
];

export default function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navbarRef = useRef(null);

  useEffect(() => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".navbar__brand",
        { y: -20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
        },
      );

      gsap.fromTo(
        ".navbar__links--desktop .navbar__link",
        { y: -16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.06,
          delay: 0.1,
        },
      );
    }, navbarRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    // Only run the drawer entrance animation when the menu opens.
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".navbar__links--mobile.is-open .navbar__link",
        { y: 18, opacity: 0, pointerEvents: "none" },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          ease: "power3.out",
          stagger: 0.07,
          pointerEvents: "auto",
        },
      );
    }, navbarRef);

    return () => ctx.revert();
  }, [isMenuOpen]);

  const handleDropdownBlur = (event) => {
    const dropdown = event.currentTarget.closest(".navbar__dropdown");
    if (!dropdown?.contains(event.relatedTarget)) {
      setOpenDropdown(null);
    }
  };

  const mobileLinks = navStructure.flatMap((item) =>
    item.type === "dropdown"
      ? [{ type: "heading", label: item.label }, ...item.items]
      : [item],
  );

  return (
    <header ref={navbarRef} className="navbar">
      <NavLink to="/" className="navbar__brand" aria-label="Trueline Research home">
        <img src={logoImage} alt="Trueline Research logo" className="navbar__logo" />
        <span className="navbar__brand-text"></span>
      </NavLink>

      <div className="navbar__inner">
        <nav className="navbar__links navbar__links--desktop" aria-label="Primary">
          {navStructure.map((item) => {
            if (item.type === "link") {
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `navbar__link ${isActive ? "is-active" : ""}`.trim()
                  }
                >
                  {item.label}
                </NavLink>
              );
            }

            const isOpen = openDropdown === item.label;
            const isActive = item.items.some((child) =>
              matchPath({ path: child.to, end: true }, location.pathname),
            );

            return (
              <div
                key={item.label}
                className={`navbar__dropdown ${isOpen ? "is-open" : ""} ${isActive ? "is-active" : ""
                  }`}
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  type="button"
                  className={`navbar__link navbar__link--dropdown ${isOpen ? "is-open" : ""} ${isActive ? "is-active" : ""
                    }`}
                  aria-haspopup="true"
                  aria-expanded={isOpen}
                  onClick={() =>
                    setOpenDropdown((previous) =>
                      previous === item.label ? null : item.label,
                    )
                  }
                  onFocus={() => setOpenDropdown(item.label)}
                  onBlur={handleDropdownBlur}
                  onKeyDown={(event) => {
                    if (event.key === "Escape") {
                      event.preventDefault();
                      setOpenDropdown(null);
                      event.currentTarget.blur();
                    }
                  }}
                >
                  {item.label}
                  <ChevronDown className="navbar__caret" aria-hidden />
                </button>
                <div className="navbar__dropdown-panel" role="menu">
                  {item.items.map((child) => (
                    <NavLink
                      key={child.to}
                      to={child.to}
                      end={child.to === "/"}
                      className={({ isActive: childActive }) =>
                        `navbar__dropdown-link ${childActive ? "is-active" : ""}`.trim()
                      }
                      role="menuitem"
                      onClick={() => setOpenDropdown(null)}
                      onFocus={() => setOpenDropdown(item.label)}
                      onBlur={handleDropdownBlur}
                    >
                      {child.icon && <child.icon className="navbar__dropdown-icon" />}
                      <span>{child.label}</span>
                    </NavLink>
                  ))}
                </div>
              </div>
            );
          })}
        </nav>

        <button
          type="button"
          className={`navbar__toggle ${isMenuOpen ? "is-open" : ""}`}
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsMenuOpen((previous) => !previous)}
        >
          <span className="sr-only">Toggle navigation</span>
          <span />
          <span />
          <span />
        </button>

        <nav
          id="primary-navigation"
          className={`navbar__links navbar__links--mobile ${isMenuOpen ? "is-open" : ""}`}
          aria-label="Primary"
        >
          {mobileLinks.map((item, index) => {
            if (item.type === "heading") {
              return (
                <p
                  key={`heading-${item.label}`}
                  className="navbar__mobile-heading"
                  data-reveal="right"
                  data-reveal-delay={`${index * 0.08}s`}
                >
                  {item.label}
                </p>
              );
            }

            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `navbar__link ${isActive ? "is-active" : ""}`.trim()
                }
                data-reveal="right"
                data-reveal-delay={`${index * 0.08}s`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
