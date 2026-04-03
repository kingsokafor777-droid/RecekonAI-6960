export function Footer() {
  return (
    <footer style={{ background: "#0b1e4f", padding: "48px 32px 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(16px,3.5vw,40px)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: 48, marginBottom: 48, paddingBottom: 48, borderBottom: "1px solid rgba(255,255,255,0.08)" }} className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, background: "#1a3cff", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M3 14 L7 6 L11 10 L15 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-0.03em", color: "#ffffff" }}>RECEKON</span>
            </div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, maxWidth: 260 }}>
              The Autonomous Financial Defense Layer. Stop leaking money. Know exactly where every dollar went.
            </p>
          </div>

          {/* Links */}
          {[
            { heading: "Product", links: ["How It Works", "Roadmap", "Security", "Pricing"] },
            { heading: "Company", links: ["About", "Blog", "Careers", "Press"] },
            { heading: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"] },
          ].map((col) => (
            <div key={col.heading}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>{col.heading}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {col.links.map((link) => (
                  <a key={link} href="#" style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "color 0.15s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}>
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.25)" }}>
            © 2025 RECEKON Inc. All rights reserved.
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.25)" }}>
            Autonomous Financial Defense Layer · Built in Canada 🍁
          </div>
        </div>
      </div>

      <style>{`
        .footer-grid { grid-template-columns: 1.5fr 1fr 1fr 1fr; }
        @media (max-width: 800px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 500px) { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}
