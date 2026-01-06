import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { 
  Linkedin, 
  Instagram, 
  MessageCircle, 
  Mail, 
  Phone, 
  ArrowUp, 
  Navigation,
  Globe,
  Award
} from "lucide-react";
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
    href: "https://in.linkedin.com/company/trueline-research-private-limited",
    icon: <Linkedin size={20} />,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/trueline_research/",
    icon: <Instagram size={20} />,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/919578873584",
    icon: <MessageCircle size={20} />,
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="site-footer">
      <div className="footer-glass-overlay" />
      
      <div className="footer-container">
        <div className="footer-top-row single-col">
          <div className="footer-brand-expanded">
            <h2 className="footer-logo">
              Trueline <span>Research</span>
            </h2>
            <p className="footer-mission">
              Empowering global research through intelligent enablement, IPR acceleration, and evidence-backed institutional transformation.
            </p>
            <div className="footer-social-new">
              {socialLinks.map((item) => (
                <a key={item.label} href={item.href} target="_blank" rel="noreferrer" aria-label={item.label}>
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-grid-main">
          <nav className="footer-column">
            <h5>Solutions</h5>
            <ul>
              {quickLinks.slice(0, 4).map(link => (
                <li key={link.label}><NavLink to={link.to}>{link.label}</NavLink></li>
              ))}
            </ul>
          </nav>

          <nav className="footer-column">
            <h5>Company</h5>
            <ul>
              {quickLinks.slice(4).map(link => (
                <li key={link.label}><NavLink to={link.to}>{link.label}</NavLink></li>
              ))}
            </ul>
          </nav>

          <div className="footer-column contact-col">
            <h5>Get in Touch</h5>
            <div className="contact-item">
              <Mail size={16} />
              <a href="mailto:info@truelineresearch.com">info@truelineresearch.com</a>
            </div>
            <div className="contact-item">
              <Phone size={16} />
              <div>
                <a href="tel:+919578873584">TN: +91 95788 73584</a>
                <a href="tel:+918056417009">KL: +91 80564 17009</a>
              </div>
            </div>
            <div className="contact-item">
              <Navigation size={16} />
              <span>Partnering with teams across India</span>
            </div>
          </div>

          <div className="footer-column awards-col">
            <h5>Impact</h5>
            <div className="impact-badge">
              <Award size={20} className="text-[#00A99D]" />
              <span>100+ Partnered Institutions</span>
            </div>
            <div className="impact-badge">
              <Globe size={20} className="text-[#00A99D]" />
              <span>Global Research Alliances</span>
            </div>
          </div>
        </div>

        <div className="footer-refined-bottom">
          <div className="copyright-area">
            <p>&copy; {currentYear} Trueline Research Private Limited. Powered by Innovation.</p>
          </div>
          <div className="footer-legal-links">
            {policyLinks.map(link => (
              <NavLink key={link.label} to={link.to}>{link.label}</NavLink>
            ))}
          </div>
          <button className="back-to-top" onClick={scrollToTop} aria-label="Back to top">
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
}
