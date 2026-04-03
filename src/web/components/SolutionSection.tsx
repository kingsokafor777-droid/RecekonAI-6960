import { useEffect, useRef } from "react";

function useReveal(cls = "reveal") {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add("visible"); }, { threshold: 0.12 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return ref;
}

export function SolutionSection() {
  const t = useReveal("reveal");
  const l = useReveal("reveal-left");
  const r = useReveal("reveal-right");

  return (
    <section id="solution" style={{ padding: "100px 0", background: "#ffffff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        {/* Header */}
        <div ref={t} className="reveal" style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 72px" }}>
          <div className="section-label" style={{ justifyContent: "center" }}>The Innovation</div>
          <h2 className="display-lg" style={{ marginBottom: 20 }}>
            We don't build a budgeting app.<br />
            <span className="text-gradient">We build a Smart Contract Account.</span>
          </h2>
          <p className="body-lg">
            The Stitching Engine is the first system that automatically matches a bank transaction to a digital receipt and extracts SKU-level item data. Zero manual input. This is applying Information Theory to Finance.
          </p>
        </div>

        {/* Before / After */}
        <div className="split" style={{ gap: 32, marginBottom: 80 }}>
          {/* Before */}
          <div ref={l} className="reveal-left">
            <div className="card-surface" style={{ borderRadius: 20, padding: "36px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ef4444" }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: "#ef4444", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  Every Other App — Before
                </span>
              </div>
              <div style={{ padding: "20px", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, marginBottom: 16 }}>
                <div style={{ fontSize: 13, color: "#9ca3af", marginBottom: 6 }}>Oct 27 · Transaction</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#0b1e4f", letterSpacing: "-0.03em" }}>$54.32</div>
                <div style={{ fontSize: 14, color: "#374151", marginTop: 4 }}>TARGET</div>
                <div style={{ marginTop: 12, padding: "8px 12px", background: "#fef2f2", borderRadius: 8, fontSize: 12, color: "#ef4444", fontWeight: 600 }}>
                  That's it. No items. No SKUs. Financial amnesia.
                </div>
              </div>
              <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6 }}>
                Your bank knows a merchant and an amount. Nothing else. 20 years of fintech and this is still the state of the art.
              </p>
            </div>
          </div>

          {/* After */}
          <div ref={r} className="reveal-right">
            <div style={{ background: "#0b1e4f", borderRadius: 20, padding: "36px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#10b981", animation: "pulse-dot 1.5s infinite" }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: "#10b981", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  RECEKON — After Stitching
                </span>
              </div>
              <div style={{ padding: "20px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, marginBottom: 16 }}>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 6 }}>Oct 27 · Reconciled ✓</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#ffffff", letterSpacing: "-0.03em" }}>$54.32</div>
                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", marginTop: 4 }}>Target Store #1024 — 4th Ave</div>
                <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 6 }}>
                  {[
                    { sku: "Tide Pods 35ct", price: "$18.99", cat: "Household" },
                    { sku: "Organic Milk 1gal", price: "$5.49", cat: "Groceries" },
                    { sku: "USB-C Cable 6ft", price: "$12.99", cat: "Electronics" },
                    { sku: "AA Batteries 20pk", price: "$16.85", cat: "Household" },
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                      <div>
                        <div style={{ fontSize: 13, color: "#ffffff", fontWeight: 500 }}>{item.sku}</div>
                        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", marginTop: 1, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>{item.cat}</div>
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#10b981" }}>{item.price}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <div style={{ padding: "5px 12px", background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: 100, fontSize: 11, color: "#10b981", fontWeight: 700 }}>
                  ✓ SKU Reconciled
                </div>
                <div style={{ padding: "5px 12px", background: "rgba(26,60,255,0.2)", border: "1px solid rgba(26,60,255,0.4)", borderRadius: 100, fontSize: 11, color: "#93c5fd", fontWeight: 700 }}>
                  Tax-Ready
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Agents */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="agents-grid">
          {[
            { icon: "🔍", name: "The Investigator", role: "Ingestion Agent", desc: "Monitors your email and bank feeds simultaneously. Captures every receipt, every transaction. Silent. Persistent. Never misses a signal.", color: "#1a3cff" },
            { icon: "⚖️", name: "The Prosecutor", role: "Reasoning Agent", desc: "Applies LLM-based OCR and probabilistic matching to reconcile transactions with receipt line items. Extracts SKU data no other system can access.", color: "#0b1e4f" },
            { icon: "⚡", name: "The Clerk", role: "Execution Agent", desc: "Drafts cancellation emails. Blocks merchants on your virtual card. Generates tax reports. The hand that moves when the brain decides.", color: "#7c3aed" },
          ].map((agent, i) => (
            <div key={i} className="reveal card" style={{ opacity: 0, transitionDelay: `${i * 0.12}s`, height: "100%" }} ref={(el) => {
              if (!el) return;
              const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add("visible"); }, { threshold: 0.12 });
              obs.observe(el);
            }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: `${agent.color}12`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 16, border: `1px solid ${agent.color}20` }}>
                {agent.icon}
              </div>
              <div style={{ fontSize: 10, color: agent.color, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>{agent.role}</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#0b1e4f", marginBottom: 10, letterSpacing: "-0.025em" }}>{agent.name}</div>
              <div style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6 }}>{agent.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .agents-grid { grid-template-columns: repeat(3, 1fr); }
        @media (max-width: 800px) { .agents-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
