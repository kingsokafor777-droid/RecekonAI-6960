import { useState } from "react";
import { Page, PageHero } from "../../components/Layout";

/* ── Three-Layer Stack (interactive) ─────────────── */
function ThreeLayerStack() {
  const [active, setActive] = useState(2);

  const layers = [
    { id: 0, label: "Transaction Layer", sub: "Capital Flow", tag: "Exists", tagColor: "#6b7280", content: "$24.50 — Uber", detail: "Oct 12 · 2:34pm", icon: "💳", bg: "#f9f9f9", border: "#e5e5e5", accent: "#374151" },
    { id: 1, label: "Item Layer", sub: "Receipt / SKU",  tag: "Exists", tagColor: "#6b7280", content: "Ride: Downtown → Airport", detail: "18.3 km · 24 min · Surge 1.2×", icon: "🧾", bg: "#f0f9ff", border: "#bae6fd", accent: "#0369a1" },
    { id: 2, label: "Impact Layer", sub: "Environmental", tag: "NEW", tagColor: "#16a34a", content: "🌱 CO₂: 6.2kg  |  💧 Water: 12L", detail: "≡ Driving 15.3 miles  ·  🔴 High Impact", icon: "🌍", bg: "#f0fdf4", border: "#86efac", accent: "#16a34a" },
  ];

  return (
    <div>
      <div style={{ marginBottom: 8, fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.1em" }}>
        Stitching Engine™ · Three-Layer Architecture
      </div>
      <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid #e5e5e5", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
        {layers.map((layer, i) => {
          const isActive = active === layer.id;
          return (
            <div key={i} onClick={() => setActive(layer.id)} style={{
              padding: "16px 20px",
              background: isActive ? layer.bg : "#fff",
              borderBottom: i < 2 ? "1px solid #f0f0f0" : "none",
              cursor: "pointer",
              transition: "all 0.2s",
              borderLeft: `4px solid ${isActive ? layer.accent : "transparent"}`,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 18 }}>{layer.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 700 }}>{layer.label}</span>
                    <span style={{ fontSize: 9, fontWeight: 800, color: layer.tagColor, background: layer.tagColor + "15", border: `1px solid ${layer.tagColor}30`, borderRadius: 100, padding: "1px 7px", letterSpacing: "0.06em", textTransform: "uppercase" as const }}>{layer.tag}</span>
                  </div>
                  <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 1 }}>{layer.sub}</div>
                </div>
                <span style={{ color: "#9ca3af", fontSize: 12, transition: "transform 0.2s", transform: isActive ? "rotate(180deg)" : "none" }}>▾</span>
              </div>
              {isActive && (
                <div style={{ marginLeft: 28, marginTop: 10, padding: "10px 14px", background: "#fff", border: `1px solid ${layer.border}`, borderRadius: 10 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: layer.accent, marginBottom: 4 }}>{layer.content}</div>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>{layer.detail}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: 8, fontSize: 11, color: "#9ca3af", textAlign: "center" }}>
        Click each layer to expand ↑
      </div>
    </div>
  );
}

/* ── Impact Dashboard (tabbed) ────────────────────── */
function ImpactDashboard() {
  const [tab, setTab] = useState<0|1|2>(0);

  const tabs = ["📊 Breakdown", "💡 Insight", "🧾 Receipts"];

  const categories = [
    { name: "Transport",     spent: "$320", impact: "High",   color: "#ef4444", dot: "🔴", co2: "62kg",  action: true },
    { name: "Food Delivery", spent: "$180", impact: "Medium", color: "#f59e0b", dot: "🟡", co2: "28kg",  action: true },
    { name: "Groceries",     spent: "$420", impact: "Low",    color: "#22c55e", dot: "🟢", co2: "18kg",  action: false },
    { name: "Shopping",      spent: "$150", impact: "Medium", color: "#f59e0b", dot: "🟡", co2: "34kg",  action: true },
  ];

  const suggestions = [
    { action: "Switch 2 rides/week to public transit", save: "$90/mo",  co2: "24kg CO₂" },
    { action: "Use Uber Pool when available",          save: "$40/mo",  co2: "18kg CO₂" },
    { action: "Walk trips under 1 mile (8 trips)",     save: "$35/mo",  co2: "12kg CO₂" },
  ];

  const merchants = [
    { name: "Starbucks", visits: 8 },
    { name: "Target",    visits: 3 },
    { name: "CVS",       visits: 5 },
  ];

  return (
    <div style={{ background: "#f9f9f9", border: "1px solid #e5e5e5", borderRadius: 16, overflow: "hidden" }}>
      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid #e5e5e5", background: "#fff" }}>
        {tabs.map((t, i) => (
          <button key={i} onClick={() => setTab(i as 0|1|2)} style={{
            flex: 1, padding: "11px 8px", fontSize: 11, fontWeight: 700,
            background: "none", border: "none", cursor: "pointer", fontFamily: "inherit",
            borderBottom: tab === i ? "2px solid #0a0a0a" : "2px solid transparent",
            color: tab === i ? "#0a0a0a" : "#9ca3af", transition: "all 0.15s",
          }}>{t}</button>
        ))}
      </div>

      {/* Tab 0: Breakdown */}
      {tab === 0 && (
        <div style={{ padding: 18, overflowX: "auto", WebkitOverflowScrolling: "touch" as any }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: "#0a0a0a", letterSpacing: "0.06em", marginBottom: 14, textTransform: "uppercase" as const }}>📊 March Spending Breakdown</div>
          <div style={{ minWidth: 300 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 64px 72px 60px", gap: 4, padding: "6px 10px", background: "#f0f0f0", borderRadius: 7, marginBottom: 6 }}>
            {["Category","Spent","Impact","Action"].map((h, i) => (
              <div key={i} style={{ fontSize: 9, fontWeight: 800, color: "#6b7280", textTransform: "uppercase" as const, letterSpacing: "0.07em", textAlign: i > 0 ? "center" as const : "left" as const }}>{h}</div>
            ))}
          </div>
          {categories.map((cat, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 64px 72px 60px", gap: 4, padding: "9px 10px", borderBottom: i < 3 ? "1px solid #f5f5f5" : "none", alignItems: "center" }}>
              <div style={{ fontSize: 12, fontWeight: 600 }}>{cat.name}</div>
              <div style={{ fontSize: 12, fontWeight: 700, textAlign: "center" as const, fontFamily: "monospace" }}>{cat.spent}</div>
              <div style={{ textAlign: "center" as const }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: cat.color, background: cat.color + "15", padding: "2px 7px", borderRadius: 100 }}>{cat.dot} {cat.impact}</span>
              </div>
              <div style={{ textAlign: "center" as const }}>
                {cat.action
                  ? <button style={{ fontSize: 9, fontWeight: 800, color: "#ef4444", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 5, padding: "3px 7px", cursor: "pointer" }}>Reduce</button>
                  : <span style={{ fontSize: 11, color: "#9ca3af" }}>—</span>}
              </div>
            </div>
          ))}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 64px 72px 60px", gap: 4, padding: "10px 10px", borderTop: "2px solid #e5e5e5", marginTop: 4 }}>
            <div style={{ fontSize: 12, fontWeight: 800 }}>TOTAL</div>
            <div style={{ fontSize: 13, fontWeight: 900, textAlign: "center" as const, fontFamily: "monospace" }}>$1,070</div>
            <div /><div />
          </div>
          </div>{/* end minWidth wrapper */}
          <div style={{ marginTop: 12, padding: "12px 14px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#16a34a", marginBottom: 3 }}>🌱 Your impact this month: 142kg CO₂</div>
            <div style={{ fontSize: 11, color: "#374151" }}>≡ Driving 350 miles · ≡ 14 trees absorbing for 1 month</div>
          </div>
        </div>
      )}

      {/* Tab 1: Insight */}
      {tab === 1 && (
        <div style={{ padding: 18 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: "#0a0a0a", letterSpacing: "0.06em", marginBottom: 14, textTransform: "uppercase" as const }}>💡 Insight: Transport Spending</div>
          <div style={{ background: "#fff", border: "1px solid #e5e5e5", borderRadius: 10, padding: "12px 14px", marginBottom: 14 }}>
            <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.6, marginBottom: 10 }}>
              You spent <strong>$320 on rides</strong> this month with <strong style={{ color: "#ef4444" }}>HIGH environmental impact</strong> (62kg CO₂).
            </div>
            <div style={{ background: "#0a0a0a", borderRadius: 8, padding: "8px 12px", textAlign: "center" as const }}>
              <span style={{ fontSize: 12, fontWeight: 800, color: "#fff" }}>🎯 REDUCE IMPACT &amp; COST</span>
            </div>
          </div>
          <div style={{ fontSize: 10, fontWeight: 800, color: "#6b7280", textTransform: "uppercase" as const, letterSpacing: "0.08em", marginBottom: 10 }}>Suggestions</div>
          {suggestions.map((s, i) => (
            <div key={i} style={{ padding: "10px 12px", background: "#f9f9f9", border: "1px solid #e5e5e5", borderRadius: 9, marginBottom: 7 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#0a0a0a", marginBottom: 4 }}>✓ {s.action}</div>
              <div style={{ display: "flex", gap: 12, fontSize: 11 }}>
                <span style={{ color: "#16a34a", fontWeight: 700 }}>💰 Save {s.save}</span>
                <span style={{ color: "#0ea5e9", fontWeight: 700 }}>🌱 Cut {s.co2}</span>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 12, background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, padding: "12px 14px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <div>
              <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 2 }}>💰 Potential savings</div>
              <div style={{ fontSize: 18, fontWeight: 900, color: "#16a34a", letterSpacing: "-0.03em" }}>$165/mo</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 2 }}>🌱 Impact reduction</div>
              <div style={{ fontSize: 18, fontWeight: 900, color: "#0ea5e9", letterSpacing: "-0.03em" }}>54kg CO₂</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Receipts */}
      {tab === 2 && (
        <div style={{ padding: 18 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: "#0a0a0a", letterSpacing: "0.06em", marginBottom: 14, textTransform: "uppercase" as const }}>🧾 Receipt Optimization</div>
          <div style={{ background: "#fff", border: "1px solid #e5e5e5", borderRadius: 10, padding: "14px 16px", marginBottom: 14 }}>
            <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.65, fontStyle: "italic", marginBottom: 12 }}>
              "Your digital receipts this month saved <strong>23 paper receipts</strong>"
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, padding: "10px 12px", textAlign: "center" as const }}>
                <div style={{ fontSize: 16, fontWeight: 900, color: "#16a34a" }}>0.5kg</div>
                <div style={{ fontSize: 10, color: "#6b7280", marginTop: 2 }}>🌱 CO₂ saved</div>
              </div>
              <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 8, padding: "10px 12px", textAlign: "center" as const }}>
                <div style={{ fontSize: 16, fontWeight: 900, color: "#2563eb" }}>0.01</div>
                <div style={{ fontSize: 10, color: "#6b7280", marginTop: 2 }}>📊 Trees preserved</div>
              </div>
            </div>
          </div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#374151", marginBottom: 10 }}>Turn off paper receipts at these merchants →</div>
          {merchants.map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", background: "#f9f9f9", border: "1px solid #e5e5e5", borderRadius: 8, marginBottom: 6 }}>
              <div style={{ fontSize: 12, fontWeight: 600 }}>✓ {m.name} <span style={{ color: "#9ca3af", fontWeight: 400 }}>(visited {m.visits}×)</span></div>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e" }} />
            </div>
          ))}
          <button style={{ marginTop: 12, width: "100%", background: "#0a0a0a", color: "#fff", border: "none", borderRadius: 10, padding: "11px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
            📧 Auto-email these merchants
          </button>
        </div>
      )}
    </div>
  );
}

/* ── Original reconciliation mockup ──────────────── */
function StitchMockup() {
  return (
    <div style={{ background: "#f9f9f9", border: "1px solid #e5e5e5", borderRadius: 16, padding: 24 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase" as const, letterSpacing: "0.08em", marginBottom: 16 }}>Live Reconciliation</div>
      <div style={{ background: "#fff", border: "1px solid #e5e5e5", borderRadius: 10, padding: "14px 16px", marginBottom: 10 }}>
        <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 4 }}>Bank transaction</div>
        <div style={{ fontWeight: 800, fontSize: 22, letterSpacing: "-0.03em" }}>$54.32 — TARGET</div>
        <div style={{ fontSize: 11, color: "#ef4444", marginTop: 4, fontWeight: 600 }}>⏳ PENDING RECEIPT</div>
      </div>
      <div style={{ textAlign: "center" as const, fontSize: 18, color: "#9ca3af", padding: "4px 0" }}>↓ Stitching Engine</div>
      <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, padding: "14px 16px" }}>
        <div style={{ fontSize: 11, color: "#16a34a", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.08em", marginBottom: 10 }}>✓ RECONCILED — 4 SKUs</div>
        {[["Tide Pods 35ct","$18.99"],["Organic Milk 1gal","$5.49"],["USB-C Cable 6ft","$12.99"],["AA Batteries 20pk","$16.85"]].map(([n,p],i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "5px 0", borderBottom: i<3?"1px solid #dcfce7":"none" }}>
            <span>{n}</span><span style={{ color: "#16a34a", fontWeight: 700 }}>{p}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════ */
export default function StitchingEnginePage() {
  return (
    <Page>
      <PageHero
        tag="Product"
        title="Stitching Engine™"
        body="The world's first system that automatically matches a bank transaction to a digital receipt — extracting SKU-level item data AND environmental impact. Three layers. Zero manual input."
        accent="#0a0a0a"
      />

      {/* Section 1: Core reconciliation */}
      <section style={{ padding: "clamp(40px,7vw,80px) clamp(16px,3.5vw,40px)", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gap: 80 }} className="se-split">
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>StitchEngine™ · Layer 1 + 2</p>
            <h2 style={{ fontSize: "clamp(26px,4vw,42px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 20 }}>
              From "$54.32 at Target" to 4 itemized SKUs — automatically.
            </h2>
            <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.75, marginBottom: 24 }}>
              For 20 years, your bank has known a merchant name and an amount. Nothing else. Stitching Engine reverses entropy — reuniting the money stream with the data stream.
            </p>
            {["LLM-powered OCR handles any receipt format","Fuzzy merchant matching accounts for name variations","Probabilistic reconciliation: merchant + amount + date signals","97.4% confidence — edge cases flagged for review","Works on email receipts, PDFs, images, HTML"].map((b,i) => (
              <div key={i} style={{ display: "flex", gap: 10, fontSize: 15, color: "#374151", marginBottom: 10, alignItems: "flex-start" }}>
                <span style={{ color: "#22c55e", fontWeight: 700, flexShrink: 0, marginTop: 2 }}>✓</span>{b}
              </div>
            ))}
          </div>
          <div><StitchMockup /></div>
        </div>
      </section>

      {/* Stats strip */}
      <section style={{ background: "#0a0a0a", padding: "clamp(32px,5.5vw,60px) clamp(16px,3.5vw,40px)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gap: 2 }} className="se-stats">
          {[["97.4%","Average matching confidence"],["< 2s","Average reconciliation time"],["0","Manual uploads required"]].map(([n,l],i) => (
            <div key={i} style={{ padding: "28px 20px", textAlign: "center", borderRight: i < 2 ? "1px solid #1a1a1a" : "none" }}>
              <div style={{ fontSize: 38, fontWeight: 900, letterSpacing: "-0.04em", color: i===1?"#22c55e":"#fff" }}>{n}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 8 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Impact Layer introduction */}
      <section style={{ padding: "clamp(40px,7vw,80px) clamp(16px,3.5vw,40px)", background: "#f9f9f9" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(16px,3.5vw,40px)" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 16px", background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 100, fontSize: 11, fontWeight: 700, color: "#16a34a", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 20 }}>
              🌱 New: Impact Layer
            </div>
            <h2 style={{ fontSize: "clamp(28px,4vw,52px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#0a0a0a", marginBottom: 18, lineHeight: 1.05 }}>
              Three layers. Financial, Item,{" "}
              <span style={{ color: "#16a34a" }}>Environmental.</span>
            </h2>
            <p style={{ fontSize: 18, color: "#6b7280", maxWidth: 620, margin: "0 auto", lineHeight: 1.75 }}>
              Stitching Engine now maps every transaction to its environmental cost — CO₂ emissions, water usage, waste impact — giving you a full picture of your spending footprint, not just your wallet.
            </p>
          </div>

          <div style={{ display: "grid", gap: 64, alignItems: "start" }} className="impact-split">
            {/* Interactive three-layer stack */}
            <ThreeLayerStack />

            {/* Three layer explainer */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { num: "01", color: "#374151", title: "Transaction Layer", body: "What your bank sees: merchant name + amount. This has existed for 20 years.", example: "$24.50 — Uber", bg: "#f5f5f5", border: "#e5e5e5" },
                { num: "02", color: "#0369a1", title: "Item Layer",        body: "What Stitching Engine adds: the SKU-level receipt data extracted from your email.", example: "Ride: Downtown → Airport · 18.3km · 24 min", bg: "#f0f9ff", border: "#bae6fd" },
                { num: "03", color: "#16a34a", title: "Impact Layer",      body: "What we add next: every transaction's environmental footprint — CO₂, water, eco-alternatives.", example: "🌱 CO₂: 6.2kg  |  💧 Water: 12L  |  🔴 High", bg: "#f0fdf4", border: "#86efac", isNew: true },
              ].map((layer, i) => (
                <div key={i} style={{ padding: "18px 20px", background: layer.bg, border: `1px solid ${layer.border}`, borderRadius: 14, borderLeft: `4px solid ${layer.color}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: layer.color, fontFamily: "monospace" }}>{layer.num}</span>
                    <span style={{ fontSize: 15, fontWeight: 700, color: "#0a0a0a" }}>{layer.title}</span>
                    {layer.isNew && <span style={{ fontSize: 9, fontWeight: 800, background: "#16a34a", color: "#fff", borderRadius: 100, padding: "2px 8px", letterSpacing: "0.06em" }}>NEW</span>}
                  </div>
                  <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.6, marginBottom: 10 }}>{layer.body}</p>
                  <div style={{ fontFamily: "monospace", fontSize: 12, color: layer.color, background: "#fff", padding: "7px 12px", borderRadius: 7, border: `1px solid ${layer.border}` }}>
                    {layer.example}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Impact Dashboard */}
      <section style={{ padding: "clamp(40px,7vw,80px) clamp(16px,3.5vw,40px)", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gap: 64, alignItems: "start" }} className="dash-split">
          {/* Copy */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#16a34a", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>Impact Dashboard</p>
            <h2 style={{ fontSize: "clamp(24px,3.5vw,40px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 20 }}>
              Every dollar spent.<br />Every kilogram of CO₂ tracked.
            </h2>
            <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.75, marginBottom: 28 }}>
              The Impact Dashboard layers environmental intelligence on top of your spending data — showing where your carbon footprint is highest, what it costs you, and exactly how to reduce both simultaneously.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
              {[
                { icon: "📊", t: "Spend × Impact breakdown", d: "See which categories have highest CO₂ per dollar and prioritize smarter." },
                { icon: "💡", t: "AI-powered eco suggestions", d: "Actionable swaps that reduce cost and environmental impact simultaneously." },
                { icon: "🧾", t: "Digital receipt optimization", d: "Track paper receipts eliminated and CO₂ saved. Auto-email merchants to switch." },
                { icon: "🌱", t: "Monthly impact score", d: "Your personal CO₂ footprint from spending — benchmarked against averages." },
              ].map((f, i) => (
                <div key={i} style={{ display: "flex", gap: 14, padding: "13px 16px", background: "#f9f9f9", border: "1px solid #e5e5e5", borderRadius: 12 }}>
                  <span style={{ fontSize: 20, flexShrink: 0 }}>{f.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#0a0a0a", marginBottom: 3 }}>{f.t}</div>
                    <div style={{ fontSize: 13, color: "#6b7280" }}>{f.d}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ padding: "14px 18px", background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#16a34a", marginBottom: 4 }}>🌱 Launching with Phase 1</div>
              <p style={{ fontSize: 14, color: "#374151" }}>Impact Layer ships alongside the core Stitching Engine. No extra setup — every transaction is automatically mapped to its environmental data.</p>
            </div>
          </div>

          {/* Interactive dashboard */}
          <ImpactDashboard />
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ background: "#0a0a0a", padding: "clamp(36px,6vw,72px) clamp(16px,3.5vw,40px)", textAlign: "center" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 clamp(16px,3.5vw,40px)" }}>
          <h2 style={{ fontSize: "clamp(24px,4vw,44px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#fff", marginBottom: 18, lineHeight: 1.1 }}>
            Money and the planet are connected.<br />
            <span style={{ color: "#22c55e" }}>Now your data is too.</span>
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", marginBottom: 36, lineHeight: 1.75 }}>
            The same infrastructure that reconciles your receipts to SKUs now maps your purchases to their planetary cost. One engine. Three layers. Complete financial and environmental intelligence.
          </p>
          <div style={{ display: "flex", gap: 48, justifyContent: "center", flexWrap: "wrap" }}>
            {[["3","Data layers per transaction"],["142kg","Avg monthly CO₂ tracked"],["$165","Avg eco-savings identified/mo"]].map(([n,l],i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: "-0.04em", color: i===0?"#22c55e":"#fff" }}>{n}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .se-split    { grid-template-columns: 1fr 1fr; }
        .se-stats    { grid-template-columns: repeat(3,1fr); }
        .impact-split{ grid-template-columns: 1fr 1fr; }
        .dash-split  { grid-template-columns: 1fr 1fr; }
        @media(max-width:768px){
          .se-split,.impact-split,.dash-split{ grid-template-columns:1fr!important; }
        }
        @media(max-width:600px){
          .se-stats{ grid-template-columns:1fr!important; }
        }
      `}</style>

      {/* Onboarding */}
      <section style={{ background: "#f9f9f9", padding: "clamp(56px,8vw,96px) clamp(16px,3.5vw,40px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>First use</p>
          <h2 style={{ fontSize: "clamp(26px,3.5vw,42px)", fontWeight: 800, letterSpacing: "-0.025em", color: "#0a0a0a", marginBottom: 14 }}>
            Your first fully reconciled transaction.<br/>83 seconds after connecting.
          </h2>
          <p style={{ fontSize: 16, color: "#6b7280", lineHeight: 1.75, maxWidth: 560, marginBottom: 48 }}>
            Most financial apps spend your first session asking you questions. Stitching Engine™ spends yours answering them. Connect your bank and email — RECEKON does the rest before you've finished reading this sentence.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="se-split">
            {[
              { step:"01", icon:"🏦", title:"Connect bank (30s)", time:"0:30", color:"#3b82f6", body:"Plaid OAuth — read-only, no credentials stored. Pick which accounts. Transactions import instantly. No CSV export. No waiting." },
              { step:"02", icon:"✉️", title:"Connect email (17s)", time:"0:47", color:"#7c3aed", body:"Gmail or Outlook OAuth — receipt-only scope. RECEKON scans your inbox for purchase confirmation emails from the last 12 months. 17 seconds." },
              { step:"03", icon:"🧵", title:"First match fires (36s)", time:"1:23", color:"#22c55e", body:"83 seconds total. A real transaction appears in your feed — matched to its receipt, broken down to individual line items. Not a placeholder. Your data." },
              { step:"04", icon:"📊", title:"12 months reconciled", time:"~8 min", color:"#f59e0b", body:"In the background, Stitching Engine™ works through the previous year. Most users have a fully reconciled 12-month history within 8 minutes of connecting." },
            ].map((s, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid #e5e5e5", borderLeft: `3px solid ${s.color}`, borderRadius: 14, padding: "24px 24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <span style={{ fontSize: 22 }}>{s.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: "#0a0a0a" }}>{s.title}</div>
                    <code style={{ fontSize: 9, fontWeight: 800, color: s.color, fontFamily: "monospace", background: `${s.color}10`, padding: "1px 7px", borderRadius: 4 }}>{s.time}</code>
                  </div>
                </div>
                <p style={{ margin: 0, fontSize: 13.5, color: "#6b7280", lineHeight: 1.75 }}>{s.body}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 40, padding: "24px 32px", background: "#0a0a0a", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#22c55e", marginBottom: 4 }}>The "first transaction" moment</div>
              <p style={{ margin: 0, fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, maxWidth: 540 }}>This is what most apps get wrong. They delay value. They ask questions. They require setup. RECEKON's first transaction arrives in 83 seconds — and it's real, detailed, and already more useful than what you had before.</p>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ fontSize: 40, fontWeight: 900, color: "#22c55e", letterSpacing: "-0.04em" }}>83s</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>to first reconciled transaction</div>
            </div>
          </div>
        </div>
      </section>
    </Page>
  );
}
