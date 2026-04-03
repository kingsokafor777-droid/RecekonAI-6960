import { useState, useEffect } from "react";
import { Page } from "../../components/Layout";
import { useLocation } from "wouter";

function LiveReceipt() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setStep(s => Math.min(s + 1, 5)), 900);
    return () => clearInterval(t);
  }, []);

  const items = [
    { icon: "🧺", name: "Tide Pods 35ct",      cat: "Household",   price: "$18.99", delta: "+$2.30 vs 3mo ago", up: true },
    { icon: "🥛", name: "Organic Milk 1gal",   cat: "Groceries",   price: "$5.49",  delta: "−$0.20 vs last",   up: false },
    { icon: "⚡", name: "USB-C Cable 6ft",      cat: "Electronics", price: "$12.99", delta: "First purchase",    up: false },
    { icon: "🔋", name: "AA Batteries 20pk",   cat: "Household",   price: "$16.85", delta: "+$0.85 vs 6mo ago", up: true },
    { icon: "🫒", name: "Extra Virgin Olive Oil", cat: "Groceries", price: "$11.99", delta: "+$3.10 vs last",   up: true },
  ];

  return (
    <div style={{ background: "#0a0a0a", borderRadius: 16, overflow: "hidden", border: "1px solid #1a1a1a" }}>
      <div style={{ padding: "14px 18px", borderBottom: "1px solid #1a1a1a", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#3b82f6", animation: "recekonDot 1.5s infinite" }} />
          <span style={{ fontSize: 11, fontWeight: 800, color: "#3b82f6", letterSpacing: "0.08em", textTransform: "uppercase" }}>Stitching Engine™ · Parsing</span>
        </div>
        <div style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.25)", borderRadius: 100, padding: "2px 10px" }}>
          <span style={{ fontSize: 9, fontWeight: 800, color: "#3b82f6" }}>TARGET · $65.31</span>
        </div>
      </div>

      <div style={{ padding: "8px 0" }}>
        {items.slice(0, step).map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 18px", animation: "fadeInUp 0.3s ease" }}>
            <span style={{ fontSize: 20, flexShrink: 0 }}>{item.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{item.name}</div>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", marginTop: 1 }}>{item.cat}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: "#e5e7eb" }}>{item.price}</div>
              <div style={{ fontSize: 9, color: item.up ? "#ef4444" : "#22c55e", marginTop: 1 }}>{item.delta}</div>
            </div>
          </div>
        ))}
      </div>

      {step >= 5 && (
        <div style={{ margin: "4px 12px 12px", padding: "12px 16px", background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: 12 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#3b82f6" }}>✓ 5 SKUs resolved · Confidence 97.4% · 2 price increases detected</div>
        </div>
      )}
    </div>
  );
}

export default function SkuUseCasePage() {
  const [, navigate] = useLocation();
  return (
    <Page>
      {/* Hero */}
      <section style={{ background: "#0a0a0a", padding: "clamp(56px,8vw,100px) clamp(16px,3.5vw,40px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#3b82f6", animation: "recekonDot 1.5s infinite" }} />
            <span style={{ fontSize: 11, fontWeight: 800, color: "#3b82f6", textTransform: "uppercase", letterSpacing: "0.1em" }}>SKU Intelligence™</span>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", marginLeft: 4 }}>/ Stitching Engine™</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="suc-split">
            <div>
              <h1 style={{ fontSize: "clamp(36px,4.5vw,58px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05, color: "#fff", marginBottom: 20 }}>
                Not "Target $65."<br/><span style={{ color: "#3b82f6" }}>Every item.<br/>Every price.<br/>Every change.</span>
              </h1>
              <p style={{ fontSize: 17, color: "rgba(255,255,255,0.5)", lineHeight: 1.8, marginBottom: 36, maxWidth: 440 }}>
                Stitching Engine™ connects every bank transaction to its receipt, then resolves every receipt to individual SKUs — product name, category, unit price, and historical price trend. At 97.4% accuracy.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 36 }}>
                {[
                  ["Item-level accuracy", "Not merchant-level. Every product you bought, priced, categorized, trend-tracked."],
                  ["Price change detection", "When a brand quietly raises its price, RECEKON surfaces it before your next purchase."],
                  ["Cross-store comparison", "See the same product priced across stores you shop. Know where you're overpaying."],
                  ["Tax category mapping", "SKUs feed directly into TaxLink™ for automated deduction identification."],
                ].map(([t, d], i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                      <svg width="8" height="7" viewBox="0 0 8 7" fill="none"><path d="M1 3.5L3 5.5L7 1" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 1 }}>{t}</div>
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>{d}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => navigate("/#waitlist")}
                style={{ background: "#3b82f6", color: "#fff", border: "none", borderRadius: 10, padding: "14px 28px", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                Get early access →
              </button>
            </div>
            <LiveReceipt />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: "#fff", padding: "clamp(48px,7vw,80px) clamp(16px,3.5vw,40px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }} className="sec-grid">
            {[
              { n: "97.4%", l: "SKU-to-transaction match accuracy across all supported merchants", c: "#3b82f6" },
              { n: "2.3s",  l: "average time to fully resolve a receipt to SKU level after detection", c: "#0a0a0a" },
              { n: "4,000+",l: "merchants supported in Phase 1. Grows with every new integration.", c: "#0a0a0a" },
            ].map((s, i) => (
              <div key={i} style={{ padding: "28px 26px", background: i === 0 ? "#eff6ff" : "#f9f9f9", borderRadius: 14, border: `1px solid ${i === 0 ? "#bfdbfe" : "#e5e5e5"}` }}>
                <div style={{ fontSize: 36, fontWeight: 900, letterSpacing: "-0.04em", color: s.c }}>{s.n}</div>
                <div style={{ fontSize: 13, color: "#6b7280", marginTop: 8, lineHeight: 1.55 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ background: "#f9f9f9", padding: "clamp(56px,8vw,96px) clamp(16px,3.5vw,40px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }} className="suc-split">
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#3b82f6", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>How it works</p>
            <h2 style={{ fontSize: "clamp(26px,3vw,38px)", fontWeight: 800, letterSpacing: "-0.025em", color: "#0a0a0a", marginBottom: 20 }}>
              Three steps.<br/>Zero manual input.
            </h2>
            <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.8 }}>
              The Stitching Engine runs entirely in the background. From the moment a transaction hits your bank to the moment SKUs are resolved and trend-tracked — no action from you.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              { n: "01", t: "Transaction detected", d: "Bank feed notifies RECEKON of a new charge. Merchant, amount, timestamp captured in real time." },
              { n: "02", t: "Receipt located and parsed", d: "Email receipt found via Gmail API or Microsoft Graph. OCR extracts every line item with 97.4% confidence." },
              { n: "03", t: "SKUs resolved and tracked", d: "Each item matched to product database. Price history updated. Trend flagged if deviation detected. Tax category assigned." },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 20, paddingBottom: i < 2 ? 28 : 0, marginBottom: i < 2 ? 28 : 0, borderBottom: i < 2 ? "1px solid #e5e5e5" : "none" }}>
                <div style={{ width: 42, height: 42, borderRadius: "50%", background: "#0a0a0a", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, flexShrink: 0 }}>{s.n}</div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#0a0a0a", marginBottom: 6 }}>{s.t}</div>
                  <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.7, margin: 0 }}>{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* B2B teaser */}
      <section style={{ background: "#0a0a0a", padding: "clamp(48px,6vw,80px) clamp(16px,3.5vw,40px)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>Phase 2 — B2B</p>
          <h2 style={{ fontSize: "clamp(24px,3vw,36px)", fontWeight: 800, letterSpacing: "-0.025em", color: "#fff", marginBottom: 16 }}>
            The same SKU data, aggregated.<br/><span style={{ color: "#3b82f6" }}>A new category of market intelligence.</span>
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.8, maxWidth: 520, margin: "0 auto 32px" }}>
            When millions of consumers run Stitching Engine™, the aggregate becomes an asset: real-time consumer purchasing patterns at SKU level — with no survey, no delay, no sampling error.
          </p>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.25)", borderRadius: 100, padding: "6px 16px" }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#3b82f6", letterSpacing: "0.08em" }}>Coming Phase 2 · Enterprise API</span>
          </div>
        </div>
      </section>

      <style>{`.suc-split{grid-template-columns:1fr 1fr} @media(max-width:900px){.suc-split{grid-template-columns:1fr!important}} @keyframes fadeInUp{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </Page>
  );
}
