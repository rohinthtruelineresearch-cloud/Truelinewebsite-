import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { API_BASE_URL } from "../lib/api";
import "./Footer.css";

/**
 * Primary footer navigation surface. Splits content into
 * brand summary, quick navigation, contact info, and newsletter CTA.
 * Uses react-router `NavLink` so clicks do not reset SPA state.
 */

// Links that map to internal routes. Hash links fall back to native anchors.
const quickLinks = [
  { label: "Services", to: "/services" },
  { label: "Journals & Publishing", to: "/journals-publishing" },
  { label: "Blog", to: "/blog" },
  { label: "Events", to: "/events" },
  { label: "Resources", to: "/resources" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "careers", to: "/careers" },
];

// Social destinations rendered with accessible SVG icons.
const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M5.36 3.5a1.86 1.86 0 1 1-3.72 0 1.86 1.86 0 0 1 3.72 0Zm.04 4.14H1.68V21h3.72V7.64Zm5.7 0H7.41V21h3.68v-6.72c0-1.78.83-2.84 2.41-2.84 1.45 0 2.15 1.01 2.15 2.84V21h3.68v-7.62c0-3.53-1.87-5.24-4.37-5.24-2.05 0-3.02 1.12-3.49 1.9h-.05Z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M12 2c2.7 0 3.03.01 4.09.06 1.05.05 1.77.22 2.4.47.65.25 1.2.6 1.73 1.14.54.54.89 1.09 1.14 1.73.25.63.42 1.35.47 2.4.05 1.06.06 1.39.06 4.09s-.01 3.03-.06 4.09c-.05 1.05-.22 1.77-.47 2.4-.25.65-.6 1.2-1.14 1.73-.54.54-1.09.89-1.73 1.14-.63.25-1.35.42-2.4.47-1.06.05-1.39.06-4.09.06s-3.03-.01-4.09-.06c-1.05-.05-1.77-.22-2.4-.47a4.4 4.4 0 0 1-1.73-1.14 4.4 4.4 0 0 1-1.14-1.73c-.25-.63-.42-1.35-.47-2.4C2 15.03 2 14.7 2 12s.01-3.03.06-4.09c.05-1.05.22-1.77.47-2.4.25-.65.6-1.2 1.14-1.73.54-.54 1.09-.89 1.73-1.14.63-.25 1.35-.42 2.4-.47C8.97 2 9.3 2 12 2Zm0 1.68c-2.66 0-2.98.01-4.03.05-.97.05-1.5.21-1.85.34-.47.18-.8.39-1.15.74-.35.35-.56.68-.74 1.15-.13.35-.29.88-.34 1.85-.04 1.05-.05 1.37-.05 4.03s.01 2.98.05 4.03c.05.97.21 1.5.34 1.85.18.47.39.8.74 1.15.35.35.68.56 1.15.74.35.13.88.29 1.85.34 1.05.04 1.37.05 4.03.05s2.98-.01 4.03-.05c.97-.05 1.5-.21 1.85-.34.47-.18.8-.39 1.15-.74.35-.35.56-.68.74-1.15.13-.35.29-.88.34-1.85.04-1.05.05-1.37.05-4.03s-.01-2.98-.05-4.03c-.05-.97-.21-1.5-.34-1.85-.18-.47-.39-.8-.74-1.15a2.7 2.7 0 0 0-1.15-.74c-.35-.13-.88-.29-1.85-.34-1.05-.04-1.37-.05-4.03-.05Zm0 2.92a5.4 5.4 0 1 1 0 10.8 5.4 5.4 0 0 1 0-10.8Zm0 1.68a3.72 3.72 0 1 0 0 7.44 3.72 3.72 0 0 0 0-7.44Zm5.58-2.02a1.26 1.26 0 1 1 0 2.52 1.26 1.26 0 0 1 0-2.52Z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/919578873583?text=Hi%20Trueline%20team,%20I'd%20like%20to%20learn%20more%20about%20your%20services.",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M12 2a9.93 9.93 0 0 0-8 3.98A10 10 0 0 0 2 12a9.9 9.9 0 0 0 1.33 5L2 22l5.12-1.32A9.9 9.9 0 0 0 12 22a10 10 0 0 0 10-10 9.94 9.94 0 0 0-3-7.11A9.94 9.94 0 0 0 12 2Zm0 1.8a8.1 8.1 0 0 1 5.66 2.34A8.17 8.17 0 0 1 20.2 12a8.2 8.2 0 0 1-11.63 7.36l-.3-.14-3 .78.8-2.9-.16-.3A8.2 8.2 0 0 1 12 3.8Zm4.36 9.24c-.24-.12-1.41-.7-1.62-.78s-.37-.12-.53.12-.6.78-.73.94-.27.18-.5.06a6.68 6.68 0 0 1-3-2.55c-.23-.39.23-.36.64-1.2a.43.43 0 0 0 0-.41c-.06-.12-.53-1.28-.72-1.76s-.39-.4-.53-.41h-.45a.87.87 0 0 0-.62.3 2.63 2.63 0 0 0-.82 2c0 1.18.84 2.32.94 2.48s1.65 2.6 4 3.54a13.64 13.64 0 0 0 1.34.4 3.24 3.24 0 0 0 1.52.1c.46-.07 1.41-.58 1.61-1.14s.2-1 .14-1.14-.21-.18-.45-.3Z" />
      </svg>
    ),
  },
];

// Legal/policy anchors surfaced in the footer bar.
const policyLinks = [
  { label: "Privacy", to: "/privacy" },
  { label: "Terms", to: "/terms" },
  { label: "Accessibility", to: "/accessibility" },
  { label: "Support", to: "/contact", isAnchor: true },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [toastMessage, setToastMessage] = useState("");
  const [isToastVisible, setToastVisible] = useState(false);
  const toastTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  const handleSubscribe = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = form.email.value.trim();
    if (!email) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/subscribers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setToastMessage(`Subscribed! We'll send updates to ${email}.`);
        form.reset();
      } else {
        setToastMessage(data.message || "Failed to subscribe. Please try again.");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      setToastMessage("An error occurred. Please try again later.");
    }
    
    setToastVisible(true);

    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }

    toastTimeoutRef.current = setTimeout(() => {
      setToastVisible(false);
    }, 3200);
  };

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-main">
          <section className="footer-brand" aria-label="Trueline Research overview">
            <h2>Trueline Research</h2>
            <p className="footer-tagline">Research enablement, IPR acceleration, and institutional programmes.</p>
            <p className="footer-meta">Tamil Nadu - Kerala - Partnering with teams across India .</p>

            <div className="footer-social" aria-label="Social media">
              {socialLinks.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="footer-social__link"
                  aria-label={item.label}
                  target="_blank"
                  rel="noreferrer"
                  data-reveal="scale"
                  data-reveal-delay={`${index * 0.08}s`}
                >
                  <span className="sr-only">{item.label}</span>
                  {item.icon}
                </a>
              ))}
            </div>

            <NavLink className="footer-cta" to="/contact">
              Start a project conversation
            </NavLink>
          </section>

          <nav className="footer-nav" aria-label="Quick links">
            <h3>Company</h3>
            <ul>
              {quickLinks.map((link) => (
                <li key={link.label}>
                  {link.isAnchor ? <a href={link.to}>{link.label}</a> : <NavLink to={link.to}>{link.label}</NavLink>}
                </li>
              ))}
            </ul>
          </nav>

          <section className="footer-contact" aria-labelledby="footer-contact-title">
            <h3 id="footer-contact-title">Contact</h3>
            <p>Need a partner for your next manuscript, patent, or accreditation sprint?</p>
            <p>
              Email: <a href="mailto:truelineresearchteam@gmail.com">truelineresearchteam@gmail.com</a>
            </p>
            <p>
              Phone: <a href="tel:+919578873583">+91 95788 73583</a>
            </p>
            <p>Average response time: within one business day.</p>
          </section>
          <section className="footer-insights" aria-labelledby="footer-insights-title">
            <h3 id="footer-insights-title">Company Insights</h3>
            <p>At Trueline Research, we are committed to driving innovation and excellence in research enablement. Our team has successfully collaborated with over 100 institutions, delivering impactful solutions in intellectual property rights, academic publishing, and institutional programs.</p>
            <p>Our mission is to empower researchers and organizations to achieve their goals with precision and efficiency.</p>
          </section>

          <section className="footer-newsletter" aria-labelledby="footer-newsletter-title">
            <h3 id="footer-newsletter-title">Stay in the loop</h3>
            <p>Subscribe for playbooks, tooling updates, and invites to our research enablement clinics.</p>
            <form className="footer-form" onSubmit={handleSubscribe}>
              <label className="sr-only" htmlFor="footer-newsletter-email">
                Email address
              </label>
              <input
                id="footer-newsletter-email"
                name="email"
                type="email"
                placeholder="you@institution.edu"
                required
              />
              <button type="submit">Subscribe</button>
            </form>
          </section>
        </div>

        <div className="footer-bottom">
          <p className="footer-legal">&copy; {currentYear} Trueline Research Private Limited. All rights reserved.</p>
          <div className="footer-bottom-links" aria-label="Legal links">
            {policyLinks.map((link) =>
              link.isAnchor ? (
                <a key={link.label} href={link.to}>
                  {link.label}
                </a>
              ) : (
                <NavLink key={link.label} to={link.to}>
                  {link.label}
                </NavLink>
              ),
            )}
          </div>
        </div>
      </div>
      {toastMessage && (
        <div className={`footer-toast ${isToastVisible ? "footer-toast--visible" : ""}`} role="status" aria-live="polite">
          <span className="footer-toast__icon" aria-hidden="true">✓</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </footer>
  );
}
