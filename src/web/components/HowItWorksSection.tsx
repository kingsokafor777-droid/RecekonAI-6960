import { useEffect, useRef } from "react";

function RevealDiv({ delay = 0, className = "reveal", children, style = {} }: {
  delay?: number; className?: string; children: React.ReactNode; style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.style.transitionDelay = `${delay}s`; el.classList.add("visible"); }
    }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, [delay]);
  return <div ref={ref} className={className} style={style}>{children}</div>;
}

const steps = [
  {
    num: "01",
    title: "Connect. RECEKON Listens.",
    body: "Link your bank account via Plaid and your email inbox. RECEKON's Investigator Agent starts monitoring immediately — capturing every transaction and every receipt in the background. No manual input. No uploads.",
    visual: (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          { icon: "🏦", label: "Bank Account", status: "Connected via Plaid", color: "#1a3cff" },
          { icon: "📧", label: "Email Inbox", status: "Monitoring via IMAP", color: "#0ea5e9" },
          { icon: "💳", label: "Virtual Card", status: "Phase 2 — Coming Soon", color: "#9ca3af" },
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 16px", background: "#ffffff", borderRadius: 10, border: "1px solid #e5e7eb", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
            <span style={{ fontSize: 20 }}>{item.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#0b1e4f" }}>{item.label}</div>
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: item.color, background: `${item.color}10`, padding: "3px 10px", borderRadius: 100, border: `1px solid ${item.color}20` }}>
              {item.status}
            </div>
          </div>
        ))}
      </div>
    ),
    color: "#1a3cff",
  },
  {
    num: "02",
    title: "The Stitching Engine Fires.",
    body: "The Prosecutor Agent reads your receipt email. Extracts every line item via LLM-powered OCR. Matches it to the exact bank transaction using fuzzy merchant matching and probabilistic reconciliation. Automatic. Precise.",
    visual: (
      <div style={{ background: "#0b1e4f", borderRadius: 14, padding: "20px" }}>
        <div style={{ color: "rgba(255,255,255,0.3)", marginBottom: 12, fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700 }}>
          Stitching Engine Log
        </div>
        {[
          { t: "TRIGGER", msg: "Transaction $54.32 at TARGET detected", c: "#60a5fa" },
          { t: "RECEIPT", msg: "Email receipt found — target-order@target.com", c: "#34d399" },
          { t: "OCR", msg: "4 line items extracted — confidence 97.4%", c: "#a78bfa" },
          { t: "MATCH", msg: "Merchant fuzzy match: TARGET → Target #1024", c: "#34d399" },
          { t: "STATUS", msg: "Transaction RECONCILED ✓", c: "#10b981" },
        ].map((line, i) => (
          <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, fontFamily: "monospace" }}>
            <span style={{ color: line.c, fontWeight: 700, minWidth: 60, fontSize: 10 }}>[{line.t}]</span>
            <span style={{ color: "rgba(255,255,255,0.65)", fontSize: 11 }}>{line.msg}</span>
          </div>
        ))}
      </div>
    ),
    color: "#10b981",
  },
  {
    num: "03",
    title: "Full Visibility. Full Control.",
    body: "Every purchase reconciled at SKU level. Zombie subscriptions flagged. One-tap cancellation via the Virtual Card Kill Switch — the merchant is blocked instantly. No login required. No hold music.",
    visual: (
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {[
          { label: "Netflix — $15.99/mo", sub: "ZOMBIE · Last used 91 days ago", btnLabel: "⛔ Kill", btnBg: "#ef4444", bg: "#fff5f5", border: "#fecaca" },
          { label: "Tax Report — Q4 2024", sub: "$2,847 in deductions found", btnLabel: "Export", btnBg: "#10b981", bg: "#f0fdf4", border: "#bbf7d0" },
          { label: "Household SKU Trends", sub: "Tide Pods spend +22% this month", btnLabel: "View", btnBg: "#1a3cff", bg: "#eff6ff", border: "#bfdbfe" },
        ].map((row, i) => (
          <div key={i} style={{ background: row.bg, border: `1px solid ${row.border}`, borderRadius: 12, padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#0b1e4f" }}>{row.label}</div>
              <div style={{ fontSize: 11, color: "#6b7280", fontWeight: 600, marginTop: 2 }}>{row.sub}</div>
            </div>
            <button style={{ background: row.btnBg, color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
              {row.btnLabel}
            </button>
          </div>
        ))}
      </div>
    ),
    color: "#7c3aed",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" style={{ padding: "100px 0", background: "#ffffff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px" }}>
        <RevealDiv style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 72px" }}>
          <div className="section-label" style={{ justifyContent: "center" }}>The Process</div>
          <h2 className="display-lg" style={{ marginBottom: 18 }}>
            Three steps from chaos to{" "}
            <span className="text-gradient">complete financial clarity.</span>
          </h2>
        </RevealDiv>

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {steps.map((step, i) => (
            <RevealDiv key={i} delay={i * 0.1}>
              <div style={{
                display: "grid",
                gridTemplateColumns: i % 2 === 0 ? "1fr 1fr" : "1fr 1fr",
                gap: 64,
                paddingBottom: i < steps.length - 1 ? 64 : 0,
                marginBottom: i < steps.length - 1 ? 0 : 0,
                borderBottom: i < steps.length - 1 ? "1px solid #f3f4f6" : "none",
              }} className="step-row">
                {/* Text side */}
                <div style={{ order: i % 2 === 0 ? 0 : 1 }}>
                  <div style={{ marginBottom: 16 }}>
                    <span style={{ fontSize: 48, fontWeight: 900, letterSpacing: "-0.06em", color: "#f0f2f7", lineHeight: 1 }}>{step.num}</span>
                  </div>
                  <div style={{ width: 32, height: 3, background: step.color, borderRadius: 3, marginBottom: 18 }} />
                  <h3 style={{ fontSize: "clamp(20px, 2.8vw, 28px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#0b1e4f", marginBottom: 14 }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.75 }}>{step.body}</p>
                </div>
                {/* Visual side */}
                <div style={{ order: i % 2 === 0 ? 1 : 0 }}>
                  <div style={{ padding: "28px", background: "#f8f9fb", borderRadius: 20, border: "1px solid #e5e7eb" }}>
                    {step.visual}
                  </div>
                </div>
              </div>
              {i < steps.length - 1 && <div style={{ height: 64 }} />}
            </RevealDiv>
          ))}
        </div>
      </div>

      <style>{`
        .step-row { grid-template-columns: 1fr 1fr; }
        @media (max-width: 800px) { .step-row { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
