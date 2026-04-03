import { useState, useEffect, useLayoutEffect } from "react";

const PRODUCTS = [
  { icon: "🧵", label: "Stitching Engine™",  desc: "Bank TXN → Receipt → SKU", href: "#solution" },
  { icon: "⛔", label: "Kill Switch™",        desc: "Block merchants instantly",  href: "#features" },
  { icon: "🛡️", label: "Zombie Detector™",   desc: "Kill unused subscriptions",  href: "#features" },
];
const PHASES = [
  { icon: "🚀", label: "Phase 1 — The Wedge",     desc: "Consumer SaaS, 10K users",      href: "#roadmap" },
  { icon: "📡", label: "Phase 2 — The Platform",  desc: "Virtual Card + B2B Data API",   href: "#roadmap" },
  { icon: "🌐", label: "Phase 3 — Infrastructure",desc: "Proof of Purchase protocol",    href: "#roadmap" },
];
const USE_CASES = [
  { icon: "💸", label: "Zombie Subscriptions", desc: "Find & kill unused subs",      href: "#use-cases" },
  { icon: "🧾", label: "Tax Automation",        desc: "Auto-generate deduction docs", href: "#use-cases" },
  { icon: "🏷️", label: "SKU Intelligence",     desc: "Item-level purchase data",     href: "#use-cases" },
  { icon: "💳", label: "Smart Card Control",    desc: "Programmable spend rules",     href: "#use-cases" },
];
const DEVS = [
  { icon: "📖", label: "Documentation", desc: "Full API reference",          href: "#developers" },
  { icon: "⚡", label: "Quickstart",    desc: "Up in minutes, not weeks",    href: "#developers" },
  { icon: "🔒", label: "Security",      desc: "Zero-knowledge vault design", href: "#developers" },
];

const ALL_MOBILE_LINKS = [
  { label: "Products",   children: [...PRODUCTS, ...PHASES] },
  { label: "Use Cases",  children: USE_CASES },
  { label: "Developers", children: DEVS },
  { label: "Customers",  href: "#customers" },
  { label: "Pricing",    href: "#pricing" },
  { label: "Careers",    href: "#careers" },
];

function DropMenu({ items }: { items: typeof PRODUCTS }) {
  return (
    <div className="kn-dropdown">
      {items.map((item, i) => (
        <a key={i} href={item.href} className="kn-dropdown-item"
          onClick={e => { e.preventDefault(); document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" }); }}>
          <div className="kn-dropdown-icon">{item.icon}</div>
          <div>
            <div className="kn-dropdown-label">{item.label}</div>
            <div className="kn-dropdown-desc">{item.desc}</div>
          </div>
        </a>
      ))}
    </div>
  );
}

export function Navbar() {
  const [announce, setAnnounce] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 900);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{ position: "sticky", top: 0, zIndex: 200 }}>
      {announce && (
        <div className="kn-announce" style={{ position: "relative" }}>
          <span className="kn-live-dot" />
          <span>RECEKON is now accepting early access — </span>
          <a onClick={() => go("waitlist")} style={{ cursor: "pointer" }}>Join the waitlist →</a>
          <button className="kn-announce-close" onClick={() => setAnnounce(false)}>✕</button>
        </div>
      )}

      <nav className="kn-nav">
        <div className="kn-nav-inner">
          {/* Logo */}
          <a className="kn-nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ cursor: "pointer" }}>
            <div style={{ width: 28, height: 28, background: "#0a0a0a", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 11L5 4L8.5 7.5L12 2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            RECEKON
          </a>

          {/* Desktop nav links */}
          <ul className="kn-nav-links">
            <li>
              <button className="kn-nav-link">Products <span className="kn-nav-caret">▾</span></button>
              <div className="kn-dropdown" style={{ minWidth: 280 }}>
                <div style={{ padding: "6px 12px 4px", fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.08em", textTransform: "uppercase" }}>Core Products</div>
                {PRODUCTS.map((item, i) => (
                  <a key={i} href={item.href} className="kn-dropdown-item"
                    onClick={e => { e.preventDefault(); document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" }); }}>
                    <div className="kn-dropdown-icon">{item.icon}</div>
                    <div><div className="kn-dropdown-label">{item.label}</div><div className="kn-dropdown-desc">{item.desc}</div></div>
                  </a>
                ))}
                <div style={{ borderTop: "1px solid #e5e5e5", margin: "6px 0" }} />
                <div style={{ padding: "4px 12px 4px", fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.08em", textTransform: "uppercase" }}>Roadmap</div>
                {PHASES.map((item, i) => (
                  <a key={i} href={item.href} className="kn-dropdown-item"
                    onClick={e => { e.preventDefault(); document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" }); }}>
                    <div className="kn-dropdown-icon">{item.icon}</div>
                    <div><div className="kn-dropdown-label">{item.label}</div><div className="kn-dropdown-desc">{item.desc}</div></div>
                  </a>
                ))}
              </div>
            </li>
            <li>
              <button className="kn-nav-link">Use Cases <span className="kn-nav-caret">▾</span></button>
              <DropMenu items={USE_CASES} />
            </li>
            <li>
              <button className="kn-nav-link">Developers <span className="kn-nav-caret">▾</span></button>
              <DropMenu items={DEVS} />
            </li>
            <li><button className="kn-nav-link" onClick={() => go("customers")}>Customers</button></li>
            <li><button className="kn-nav-link" onClick={() => go("pricing")}>Pricing</button></li>
            <li><button className="kn-nav-link" onClick={() => go("careers")}>Careers</button></li>
          </ul>

          {/* Right actions */}
          <div className="kn-nav-actions">
            {!isMobile && <>
              <button className="kn-nav-login" onClick={() => go("waitlist")}>Log In</button>
              <button className="kn-btn-dark" style={{ padding: "10px 18px", fontSize: 14 }} onClick={() => go("waitlist")}>
                Get Started <span>›</span>
              </button>
            </>}
            {/* Hamburger — mobile only */}
            {isMobile && (
              <button
                onClick={() => setMenuOpen(o => !o)}
                aria-label="Menu"
                style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", display: "flex", flexDirection: "column", gap: 5, justifyContent: "center", alignItems: "center" }}
              >
                <span style={{ display: "block", width: 22, height: 2, background: "#0a0a0a", borderRadius: 2, transition: "all 0.2s", transform: menuOpen ? "rotate(45deg) translate(0px, 7px)" : "none" }} />
                <span style={{ display: "block", width: 22, height: 2, background: "#0a0a0a", borderRadius: 2, transition: "all 0.2s", opacity: menuOpen ? 0 : 1 }} />
                <span style={{ display: "block", width: 22, height: 2, background: "#0a0a0a", borderRadius: 2, transition: "all 0.2s", transform: menuOpen ? "rotate(-45deg) translate(0px, -7px)" : "none" }} />
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "#fff", zIndex: 199, overflowY: "auto",
          paddingTop: 80,
        }}>
          <div style={{ padding: "0 20px 40px" }}>
            {ALL_MOBILE_LINKS.map((section, i) => (
              <div key={i} style={{ borderBottom: "1px solid #f0f0f0" }}>
                {section.href ? (
                  <button
                    onClick={() => go(section.href!.replace("#", ""))}
                    style={{ width: "100%", textAlign: "left", padding: "16px 0", fontSize: 17, fontWeight: 600, color: "#0a0a0a", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}
                  >
                    {section.label}
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => setOpenSection(openSection === section.label ? null : section.label)}
                      style={{ width: "100%", textAlign: "left", padding: "16px 0", fontSize: 17, fontWeight: 600, color: "#0a0a0a", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                    >
                      {section.label}
                      <span style={{ fontSize: 12, color: "#9ca3af", transform: openSection === section.label ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▾</span>
                    </button>
                    {openSection === section.label && (
                      <div style={{ paddingBottom: 12 }}>
                        {section.children?.map((item, j) => (
                          <a key={j}
                            href={item.href}
                            onClick={e => { e.preventDefault(); document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); }}
                            style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", textDecoration: "none" }}
                          >
                            <div style={{ width: 36, height: 36, background: "#f5f5f5", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{item.icon}</div>
                            <div>
                              <div style={{ fontSize: 14, fontWeight: 600, color: "#0a0a0a" }}>{item.label}</div>
                              <div style={{ fontSize: 12, color: "#6b7280" }}>{item.desc}</div>
                            </div>
                          </a>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}

            {/* CTA buttons */}
            <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 10 }}>
              <button onClick={() => go("waitlist")}
                style={{ width: "100%", padding: "14px", fontSize: 16, fontWeight: 600, background: "#0a0a0a", color: "#fff", border: "none", borderRadius: 12, cursor: "pointer", fontFamily: "inherit" }}>
                Get Started ›
              </button>
              <button onClick={() => go("waitlist")}
                style={{ width: "100%", padding: "14px", fontSize: 16, fontWeight: 600, background: "transparent", color: "#0a0a0a", border: "1px solid #e5e5e5", borderRadius: 12, cursor: "pointer", fontFamily: "inherit" }}>
                Log In
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
