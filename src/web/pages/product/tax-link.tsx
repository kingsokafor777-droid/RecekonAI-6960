import { useState, useEffect } from "react";
import { Page, PageHero } from "../../components/Layout";
import { useLocation } from "wouter";
import { useModal } from "../../components/ModalContext";

function OnboardingFlow() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % 5), 3000);
    return () => clearInterval(t);
  }, []);

  const steps = [
    {
      n: "00:00", label: "Connect your bank",
      screen: (
        <div style={{ padding: "16px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Link your accounts</div>
          {["Chase Checking ····4821", "Chase Savings ····2904", "Amex Platinum ····0031"].map((a, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: i === 0 ? "#f0fdf4" : "#f9f9f9", border: `1px solid ${i === 0 ? "#bbf7d0" : "#e5e5e5"}`, borderRadius: 10, marginBottom: 7 }}>
              <div style={{ width: 28, height: 28, borderRadius: 7, background: i === 0 ? "#22c55e" : "#e5e5e5", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {i === 0 ? <svg width="12" height="10" viewBox="0 0 12 10" fill="none"><path d="M1 5L4.5 8.5L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> : null}
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#0a0a0a" }}>{a}</span>
            </div>
          ))}
        </div>
      ),
      tag: "30 seconds", color: "#3b82f6",
      title: "Connect your bank",
      body: "Plaid OAuth — no passwords. RECEKON gets read-only access. You pick which accounts. Done in under 30 seconds.",
    },
    {
      n: "00:47", label: "Email connected",
      screen: (
        <div style={{ padding: "16px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Sync receipts</div>
          <div style={{ padding: "12px 14px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, marginBottom: 10, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 18 }}>✉️</span>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#0a0a0a" }}>Gmail connected</div>
              <div style={{ fontSize: 10, color: "#22c55e" }}>Scanning for receipts…</div>
            </div>
          </div>
          <div style={{ padding: "10px 12px", background: "#f9f9f9", borderRadius: 10 }}>
            <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 6 }}>Found in last 12 months</div>
            {[["Amazon receipts", "47"], ["Subscription invoices", "24"], ["Travel confirmations", "11"]].map(([l, n], i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 3 }}>
                <span style={{ color: "#374151" }}>{l}</span>
                <span style={{ fontWeight: 700, color: "#0a0a0a" }}>{n}</span>
              </div>
            ))}
          </div>
        </div>
      ),
      tag: "47 seconds", color: "#7c3aed",
      title: "Gmail connects in one tap",
      body: "OAuth consent screen — RECEKON requests read-only scope on emails matching receipt patterns only. 47 seconds from tap to scanning.",
    },
    {
      n: "01:23", label: "First match",
      screen: (
        <div style={{ padding: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", animation: "recekonDot 1.5s infinite" }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: "#22c55e" }}>First match found</span>
          </div>
          <div style={{ padding: "12px 14px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#0a0a0a", marginBottom: 4 }}>$127.40 · Amazon</div>
            <div style={{ fontSize: 10, color: "#6b7280", marginBottom: 8 }}>Matched to order receipt · Nov 14</div>
            {[["Tide Pods 35ct","$18.99"],["Logitech MX Keys","$89.99"],["USB Hub","$18.42"]].map(([n,p],i)=>(
              <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 11, padding: "2px 0", borderBottom: i < 2 ? "1px solid rgba(0,0,0,0.05)" : "none" }}>
                <span style={{ color: "#374151" }}>{n}</span><span style={{ fontWeight: 700, color: "#16a34a" }}>{p}</span>
              </div>
            ))}
          </div>
        </div>
      ),
      tag: "83 seconds", color: "#22c55e",
      title: "First matched transaction appears",
      body: "83 seconds after connecting. A real transaction — line items visible, receipt attached. Not a demo. Your data, resolved to the SKU.",
    },
    {
      n: "02:10", label: "Deductions live",
      screen: (
        <div style={{ padding: "16px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Live deductions</div>
          {[["🏠 Home Office","$1,247","90%"],["💻 Software","$842","68%"],["📚 Professional","$390","45%"]].map(([cat,amt,pct],i)=>(
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 12, fontWeight: 600 }}>{cat}</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: "#16a34a" }}>{amt}</span>
              </div>
              <div style={{ height: 5, background: "#f0f0f0", borderRadius: 5, overflow: "hidden" }}>
                <div style={{ height: "100%", width: pct, background: "#22c55e", borderRadius: 5 }} />
              </div>
            </div>
          ))}
          <div style={{ padding: "10px 12px", background: "#0a0a0a", borderRadius: 8, display: "flex", justifyContent: "space-between", marginTop: 10 }}>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>Total found</span>
            <span style={{ fontSize: 16, fontWeight: 900, color: "#22c55e" }}>$2,479</span>
          </div>
        </div>
      ),
      tag: "2 minutes 10 seconds", color: "#f59e0b",
      title: "Your deductions are already building",
      body: "TaxLink™ retrospectively categorizes the last 12 months. By the time you finish your coffee, you're looking at a tax report you didn't know existed.",
    },
    {
      n: "∞", label: "Runs itself",
      screen: (
        <div style={{ padding: "16px", textAlign: "center" }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#f0fdf4", border: "2px solid #bbf7d0", display: "flex", alignItems: "center", justifyContent: "center", margin: "16px auto 12px", fontSize: 24 }}>✓</div>
          <div style={{ fontSize: 14, fontWeight: 800, color: "#0a0a0a", marginBottom: 6 }}>TaxLink™ is running</div>
          <div style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.6, marginBottom: 14 }}>Every future purchase is categorized the moment it clears. Your tax report updates in real time, year-round.</div>
          <div style={{ background: "#f9f9f9", border: "1px solid #e5e5e5", borderRadius: 10, padding: "10px", fontSize: 11, color: "#374151" }}>
            Next action required from you: <strong>zero</strong>
          </div>
        </div>
      ),
      tag: "Forever", color: "#22c55e",
      title: "Never think about it again",
      body: "From this point forward, every purchase is categorized as it happens. Tax season is just another day — except your report is already waiting.",
    },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 32, alignItems: "start" }} className="tl-split">
      {/* Timeline nav */}
      <div>
        {steps.map((s, i) => (
          <div key={i} onClick={() => setActive(i)}
            style={{ display: "flex", gap: 14, padding: "14px 16px", borderRadius: 12, cursor: "pointer", background: active === i ? `${s.color}08` : "transparent", border: `1px solid ${active === i ? s.color + "30" : "transparent"}`, marginBottom: 6, transition: "all 0.2s" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: active === i ? s.color : "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.2s" }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: active === i ? "#fff" : "#9ca3af", fontFamily: "monospace" }}>{i + 1}</span>
              </div>
              {i < steps.length - 1 && <div style={{ width: 2, height: 20, background: active === i ? `${s.color}40` : "#f0f0f0", marginTop: 4 }} />}
            </div>
            <div style={{ paddingTop: 4 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: active === i ? "#0a0a0a" : "#6b7280", marginBottom: 2 }}>{s.title}</div>
              <div style={{ display: "inline-block", fontSize: 9, fontWeight: 800, color: s.color, background: `${s.color}12`, padding: "1px 7px", borderRadius: 100, letterSpacing: "0.04em" }}>{s.tag}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Active step detail */}
      <div>
        <div style={{ background: "#f8f9fb", borderRadius: 20, overflow: "hidden", border: "1px solid #e5e5e5", marginBottom: 24 }}>
          {/* Phone chrome */}
          <div style={{ background: "#e5e7eb", padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ width: 60, height: 8, background: "#0a0a0a", borderRadius: 10 }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: "#6b7280" }}>{steps[active].n}</span>
          </div>
          <div style={{ background: "#fff", minHeight: 200 }}>
            <div style={{ padding: "10px 16px", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 22, height: 22, background: "#0a0a0a", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="10" height="10" viewBox="0 0 14 14" fill="none"><path d="M2 11L5 4L8.5 7.5L12 2" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: "-0.03em" }}>RECEKON</span>
              <div style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 4, background: `${steps[active].color}12`, border: `1px solid ${steps[active].color}30`, borderRadius: 100, padding: "2px 8px" }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: steps[active].color }} />
                <span style={{ fontSize: 9, fontWeight: 800, color: steps[active].color }}>TaxLink™</span>
              </div>
            </div>
            {steps[active].screen}
          </div>
        </div>
        <h3 style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.02em", color: "#0a0a0a", marginBottom: 8 }}>{steps[active].title}</h3>
        <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.75, margin: 0 }}>{steps[active].body}</p>
      </div>
    </div>
  );
}

export default function TaxLinkPage() {
  const [, navigate] = useLocation();
  const { openContact } = useModal();
  return (
    <Page>
      <PageHero tag="Product" title="TaxLink™" body="Auto-generate deduction-ready expense reports. The average person leaves $1,200 in legitimate deductions unclaimed every year — not because they don't qualify, but because they lack the documentation. TaxLink transforms tax season from a panic into a non-event." accent="#16a34a" />

      {/* Main split */}
      <section style={{ padding: "clamp(40px,7vw,80px) clamp(16px,3.5vw,40px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }} className="tl-split">
          <div>
            <h2 style={{ fontSize: "clamp(24px,3.5vw,40px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 20 }}>You don't prepare for tax season. You already are.</h2>
            <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.75, marginBottom: 24 }}>Every transaction matched to its receipt becomes an audit-ready record the moment it clears. Every eligible deduction is categorized to current tax codes. By the time your accountant asks, the report is already waiting — with receipts attached, confidence scored, and every line item documented.</p>
            {["Every purchase auto-categorized to IRS Schedule C, CRA, HMRC, ATO","Receipt attached as PDF evidence — automatically, permanently","A charge at Office Depot isn't 'shopping' — it's Office Supplies with confidence score","13 hours of annual tax prep → zero manual steps","One-click export to your accountant in their preferred format"].map((b, i) => (
              <div key={i} style={{ display: "flex", gap: 10, fontSize: 15, color: "#374151", marginBottom: 10 }}><span style={{ color: "#22c55e", fontWeight: 700, flexShrink: 0 }}>✓</span>{b}</div>
            ))}
          </div>
          <div>
            <div style={{ background: "#f9f9f9", border: "1px solid #e5e5e5", borderRadius: 16, padding: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em" }}>Q4 2024 Tax Report</div>
                <div style={{ background: "#f0fdf4", color: "#16a34a", fontWeight: 700, fontSize: 11, padding: "3px 8px", borderRadius: 5 }}>Tax-Ready</div>
              </div>
              {[["Home Office","12 receipts","$1,247.50",true],["Software & Tools","8 receipts","$842.00",true],["Professional Dev","4 receipts","$389.99",true],["Business Travel","6 receipts","$367.44",false]].map(([c, r, t, ok], i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: i < 3 ? "1px solid #e5e5e5" : "none" }}>
                  <div><div style={{ fontSize: 13, fontWeight: 600 }}>{c as string}</div><div style={{ fontSize: 11, color: "#9ca3af" }}>{r as string} {ok ? "✓ attached" : "⚠ pending"}</div></div>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{t as string}</div>
                </div>
              ))}
              <div style={{ marginTop: 14, padding: "12px 14px", background: "#fff", border: "1px solid #e5e5e5", borderRadius: 8, display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: 700 }}>Total Deductions</span><span style={{ fontSize: 18, fontWeight: 800, color: "#16a34a" }}>$2,846.93</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Onboarding flow */}
      <section style={{ background: "#f9f9f9", padding: "clamp(56px,8vw,96px) clamp(16px,3.5vw,40px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ marginBottom: 48 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>Getting started</p>
            <h2 style={{ fontSize: "clamp(26px,3.5vw,42px)", fontWeight: 800, letterSpacing: "-0.025em", color: "#0a0a0a", marginBottom: 14 }}>
              From zero to your first tax report.<br/>Under two minutes.
            </h2>
            <p style={{ fontSize: 16, color: "#6b7280", lineHeight: 1.75, maxWidth: 560 }}>
              Every step below is the actual product flow — exact screen, exact timing. No CSV imports. No manual categorization. No accountant required before you even see results. Connect once. TaxLink™ runs the rest — retroactively rebuilding your last 12 months first.
            </p>
          </div>
          <OnboardingFlow />
        </div>
      </section>

      {/* First value guarantee */}
      {/* ── TAXLINK: HORIZONTAL LEDGER STAT BAR ── */}
      {/* Design: 3 stats arranged as a horizontal "ledger" row — large numbers left-anchored with a thin green left-border,
          label stacked underneath, separated by subtle vertical rules. Feels like a financial document, not a dashboard widget. */}
      <section style={{ background: "#0f1a0f", padding: "clamp(48px,6vw,72px) clamp(16px,3.5vw,40px)", borderTop: "3px solid #22c55e" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: 10, fontWeight: 800, color: "#22c55e", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 32 }}>By the numbers</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 0 }} className="tl-ledger">
            {[
              { pre: "avg", n: "$2,847", post: "in deductions found — year one, per user. Not estimates. Documented claims." },
              { pre: "first match in", n: "83 seconds", post: "from the moment your bank connects. No setup required." },
              { pre: "forms to fill", n: "zero", post: "From initial connection through final export to your accountant." },
            ].map((s, i) => (
              <div key={i} style={{
                padding: "0 clamp(20px,3vw,44px) 0 clamp(20px,3vw,44px)",
                borderLeft: i > 0 ? "1px solid rgba(34,197,94,0.15)" : "none",
              }}>
                <div style={{ fontSize: 11, color: "rgba(34,197,94,0.55)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>{s.pre}</div>
                <div style={{ fontSize: "clamp(32px,4.5vw,56px)", fontWeight: 900, letterSpacing: "-0.04em", color: "#22c55e", lineHeight: 1, marginBottom: 10 }}>{s.n}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", lineHeight: 1.6, maxWidth: 220 }}>{s.post}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TAXLINK: MAGAZINE DEEP COPY — left-accent blockquote style ── */}
      {/* Design: Full white background. Left column has a giant pull-quote with thick green left border (magazine editorial style).
          Right column is dense body copy — no header, starts mid-sentence to imply continuation. Asymmetric. */}
      <section style={{ background: "#fff", padding: "clamp(64px,9vw,112px) clamp(16px,3.5vw,40px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "5fr 7fr", gap: "clamp(40px,6vw,80px)", alignItems: "start" }} className="tl-magazine">
            {/* Left: pull-quote block */}
            <div style={{ borderLeft: "4px solid #22c55e", paddingLeft: "clamp(20px,3vw,36px)" }}>
              <div style={{ fontSize: "clamp(22px,3.2vw,34px)", fontWeight: 900, letterSpacing: "-0.035em", lineHeight: 1.15, color: "#0a0a0a", marginBottom: 24 }}>
                The IRS doesn't remind you what you missed.
              </div>
              <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.9, marginBottom: 18 }}>
                Tax deadlines are fixed. The deductions you forgot about are not. Every year, legitimate deductions expire — not because they didn't apply to you, but because you didn't document them in time.
              </p>
              <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.9, marginBottom: 24 }}>
                A $400 internet bill from February. A $180 software subscription. A $90 desk chair bought in March. Each one defensible. Each one undocumented. Each one gone.
              </p>
              <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, padding: "14px 18px" }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: "#16a34a", marginBottom: 4 }}>What TaxLink does instead</div>
                <p style={{ margin: 0, fontSize: 14, color: "#374151", lineHeight: 1.7 }}>Retroactively scans the last 12 months the moment you connect. Doesn't ask you to remember. Asks your bank statement — which remembers everything.</p>
              </div>
            </div>
            {/* Right: dense editorial body */}
            <div style={{ paddingTop: "clamp(0px,2vw,16px)" }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#9ca3af", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 20 }}>The accountant problem</div>
              <p style={{ fontSize: 16, color: "#0a0a0a", fontWeight: 700, lineHeight: 1.6, marginBottom: 18 }}>Your accountant works from what you give them.</p>
              <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.9, marginBottom: 18 }}>
                They're not hunting for your deductions. They're filing based on the pile of receipts you managed to collect. If you give them a partial picture, you get a partial refund. The gap between what you spent and what you documented is money that quietly transfers from your account to the government.
              </p>
              <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.9, marginBottom: 28 }}>
                TaxLink closes that gap. Every charge matched to its receipt, categorized to the correct tax line, with a confidence score and an audit trail. Hand your accountant a complete file — or skip them entirely.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }} className="tl-proof-pair">
                {[
                  { label: "Without TaxLink", items: ["Receipts scattered across email", "Deductions forgotten by April", "Accountant estimates from memory", "Audit risk: high"] },
                  { label: "With TaxLink", items: ["Every charge matched to receipt", "12 months rebuilt in 2 minutes", "Tax-ready report pre-filed", "Audit trail: complete"] },
                ].map((col, ci) => (
                  <div key={ci} style={{ background: ci === 0 ? "#fff7f7" : "#f0fdf4", border: `1px solid ${ci === 0 ? "#fecaca" : "#bbf7d0"}`, borderRadius: 10, padding: "14px 16px" }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: ci === 0 ? "#ef4444" : "#16a34a", marginBottom: 10, letterSpacing: "0.04em" }}>{col.label}</div>
                    {col.items.map((it, ii) => (
                      <div key={ii} style={{ fontSize: 12, color: ci === 0 ? "#6b7280" : "#374151", marginBottom: 5, display: "flex", gap: 7, alignItems: "flex-start" }}>
                        <span style={{ flexShrink: 0, marginTop: 1 }}>{ci === 0 ? "✕" : "✓"}</span>{it}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TAXLINK: NUMBERED FEATURE LIST — typographic, not card grid ── */}
      {/* Design: Dark #0a0a0a bg. Each feature is a full-width horizontal row with a giant number on the left,
          feature name center, and tight descriptor on the right. Feels like a table of contents or legal exhibit list. */}
      <section style={{ background: "#0a0a0a", padding: "clamp(56px,8vw,96px) clamp(16px,3.5vw,40px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, flexWrap: "wrap", gap: 16 }}>
            <div>
              <p style={{ fontSize: 10, fontWeight: 800, color: "#22c55e", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 12 }}>Under the hood</p>
              <h2 style={{ fontSize: "clamp(24px,3.5vw,40px)", fontWeight: 900, letterSpacing: "-0.04em", color: "#fff", margin: 0 }}>Four systems. Running year-round. Silently.</h2>
            </div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", maxWidth: 260, lineHeight: 1.7 }}>
              No dashboard to check. No reports to pull. TaxLink surfaces results when they matter — and stays invisible the rest of the time.
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              { n: "01", title: "Multi-jurisdiction categorization", tag: "IRS · CRA · HMRC · ATO", body: "TaxLink applies the correct tax code for your country automatically. IRS Schedule C, CRA T2125, HMRC SA103, ATO Schedule C. No settings. No configuration. The right code for every jurisdiction, every time." },
              { n: "02", title: "Receipt-to-deduction chain", tag: "Unbreakable evidence", body: "Every deduction links back to a receipt. Every receipt links back to a transaction. The chain is mathematically complete — which is exactly what an auditor needs to see. No gaps, no guesses." },
              { n: "03", title: "Confidence scoring", tag: "Nothing hidden", body: "Every line item carries a confidence score. High-confidence: auto-filed. Lower-confidence: flagged with a plain-language explanation. You always know exactly why a decision was made." },
              { n: "04", title: "Audit-ready export", tag: "PDF · CSV · Accountant format", body: "A timestamped log of every categorization decision, every receipt match, and every source document — exportable in the format accepted by all four jurisdictions, in the format your accountant actually uses." },
            ].map((f, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "64px 1fr auto",
                gap: "clamp(16px,3vw,40px)", alignItems: "center",
                padding: "clamp(20px,3vw,32px) 0",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }} className="tl-feature-row">
                <div style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 900, color: "rgba(34,197,94,0.2)", letterSpacing: "-0.04em", lineHeight: 1 }}>{f.n}</div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 6 }}>
                    <span style={{ fontSize: "clamp(15px,2vw,18px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>{f.title}</span>
                    <span style={{ fontSize: 10, fontWeight: 800, color: "#22c55e", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", padding: "2px 9px", borderRadius: 100, letterSpacing: "0.06em" }}>{f.tag}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.7, maxWidth: 560 }}>{f.body}</p>
                </div>
                <div style={{ width: 32, height: 32, borderRadius: "50%", border: "1px solid rgba(34,197,94,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5h6M5 2l3 3-3 3" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TAXLINK: FINAL CTA — split layout, not centered block ── */}
      {/* Design: Left half has the closing argument copy. Right half has the CTA button + trust signals.
          Different from zombie (centered) and price guardian (centered with different layout). */}
      <section style={{ background: "#16a34a", padding: "clamp(56px,8vw,88px) clamp(16px,3.5vw,40px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="tl-split">
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.6)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 20 }}>Performance-based · zero if nothing found</div>
              <h2 style={{ fontSize: "clamp(26px,4vw,44px)", fontWeight: 900, letterSpacing: "-0.04em", color: "#fff", lineHeight: 1.1, marginBottom: 20 }}>Stop leaving deductions on the table because you forgot to document them.</h2>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", lineHeight: 1.8, margin: 0 }}>
                TaxLink finds what you're owed, builds the evidence chain, and delivers a tax-ready report. We charge 15–20% of what we recover. If we find nothing, you pay nothing.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <button
                onClick={() => openContact("I want TaxLink to handle my deductions.")}
                style={{ background: "#fff", color: "#16a34a", border: "none", borderRadius: 10, padding: "18px 40px", fontSize: 18, fontWeight: 900, cursor: "pointer", fontFamily: "inherit", letterSpacing: "-0.02em", textAlign: "center" }}
              >
                Get Early Access →
              </button>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {["No card required", "Setup takes 90 seconds", "First results in under 2 minutes", "Cancel any time before we find anything"].map((t, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 13, color: "rgba(255,255,255,0.65)" }}>
                    <span style={{ color: "rgba(255,255,255,0.9)", fontWeight: 700 }}>✓</span>{t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .tl-split{grid-template-columns:1fr 1fr}
        @media(max-width:900px){.tl-split{grid-template-columns:1fr!important}}
        .tl-ledger{grid-template-columns:repeat(3,1fr)}
        @media(max-width:640px){.tl-ledger{grid-template-columns:1fr!important}.tl-ledger>div{border-left:none!important;padding-left:0!important;padding-top:28px;border-top:1px solid rgba(34,197,94,0.12)}}
        .tl-magazine{grid-template-columns:5fr 7fr}
        @media(max-width:820px){.tl-magazine{grid-template-columns:1fr!important}}
        .tl-proof-pair{grid-template-columns:1fr 1fr}
        @media(max-width:480px){.tl-proof-pair{grid-template-columns:1fr!important}}
        .tl-feature-row{grid-template-columns:64px 1fr auto}
        @media(max-width:600px){.tl-feature-row{grid-template-columns:40px 1fr!important}.tl-feature-row>:last-child{display:none}}
        .ks-stats{grid-template-columns:repeat(3,1fr)}
        @media(max-width:600px){.ks-stats{grid-template-columns:1fr!important}.ks-stats>div{border-right:none!important;border-bottom:1px solid #1e1e1e}}
        .feat-grid{grid-template-columns:repeat(4,1fr)}
        @media(max-width:900px){.feat-grid{grid-template-columns:1fr 1fr!important}}
        @media(max-width:500px){.feat-grid{grid-template-columns:1fr!important}}
      `}</style>
    </Page>
  );
}
