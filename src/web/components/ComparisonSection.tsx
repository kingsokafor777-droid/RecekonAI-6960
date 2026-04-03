import { useEffect, useRef } from "react";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add("visible"); }, { threshold: 0.12 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return ref;
}

const rows = [
  { feature: "See account balance", old: "✓", oldNote: "Always", fl: "✓", flNote: "Real-time" },
  { feature: "Know what you spent", old: "~", oldNote: "Vague categories", fl: "✓", flNote: "Exact amounts" },
  { feature: "Know what you bought", old: "✗", oldNote: "Not possible", fl: "✓", flNote: "Every line item" },
  { feature: "SKU-level purchase data", old: "✗", oldNote: "Never existed", fl: "✓", flNote: "World first" },
  { feature: "Cancel subscriptions", old: "~", oldNote: "Manual, slow", fl: "✓", flNote: "One tap, instant" },
  { feature: "Block a merchant instantly", old: "✗", oldNote: "Not a feature", fl: "✓", flNote: "Virtual card kill switch" },
  { feature: "Tax-ready itemized receipts", old: "✗", oldNote: "Shoebox problem", fl: "✓", flNote: "Auto PDF, attached" },
  { feature: "Zombie subscription AI detection", old: "~", oldNote: "Some apps, manual", fl: "✓", flNote: "Autonomous agent" },
];

export function ComparisonSection() {
  const ref = useReveal();

  return (
    <section style={{ padding: "0 0 100px", background: "#f8f9fb" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 32px" }}>
        <div ref={ref} className="reveal">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="section-label" style={{ justifyContent: "center" }}>The Gap</div>
            <h2 className="display-md" style={{ marginBottom: 14 }}>
              Everything fintech never gave you.
            </h2>
            <p style={{ fontSize: 16, color: "#6b7280" }}>All of it. Finally solved.</p>
          </div>

          {/* Table */}
          <div style={{ background: "#fff", borderRadius: 20, border: "1px solid #e5e7eb", overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.05)" }}>
            {/* Header */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", background: "#f8f9fb", borderBottom: "1px solid #e5e7eb" }}>
              <div style={{ padding: "16px 24px", fontSize: 12, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.08em", textTransform: "uppercase" }}>Capability</div>
              <div style={{ padding: "16px 24px", fontSize: 12, fontWeight: 700, color: "#ef4444", letterSpacing: "0.08em", textTransform: "uppercase", borderLeft: "1px solid #e5e7eb" }}>
                Mint / Quicken / Others
              </div>
              <div style={{ padding: "16px 24px", fontSize: 12, fontWeight: 700, color: "#1a3cff", letterSpacing: "0.08em", textTransform: "uppercase", borderLeft: "1px solid #e5e7eb", background: "rgba(26,60,255,0.03)" }}>
                RECEKON
              </div>
            </div>

            {rows.map((row, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderBottom: i < rows.length - 1 ? "1px solid #e5e7eb" : "none" }}>
                <div style={{ padding: "14px 24px", fontSize: 14, color: "#374151", fontWeight: 500, display: "flex", alignItems: "center" }}>
                  {row.feature}
                </div>
                <div style={{ padding: "14px 24px", borderLeft: "1px solid #e5e7eb", display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: row.old === "✓" ? "#10b981" : row.old === "~" ? "#f97316" : "#d1d5db" }}>{row.old}</span>
                  <span style={{ fontSize: 12, color: "#9ca3af" }}>{row.oldNote}</span>
                </div>
                <div style={{ padding: "14px 24px", borderLeft: "1px solid #e5e7eb", background: "rgba(26,60,255,0.02)", display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: "#10b981" }}>✓</span>
                  <span style={{ fontSize: 12, color: "#374151", fontWeight: 500 }}>{row.flNote}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
