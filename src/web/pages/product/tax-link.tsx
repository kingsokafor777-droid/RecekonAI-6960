import { useState, useEffect } from "react";
import { Page, PageHero } from "../../components/Layout";
import { useLocation } from "wouter";

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
  return (
    <Page>
      <PageHero tag="Product" title="TaxLink™" body="Every deduction auto-documented, every receipt attached, every report formatted. Stop losing thousands of dollars in undocumented deductions." accent="#16a34a" />

      {/* Main split */}
      <section style={{ padding: "clamp(40px,7vw,80px) clamp(16px,3.5vw,40px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }} className="tl-split">
          <div>
            <h2 style={{ fontSize: "clamp(24px,3.5vw,40px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 20 }}>One-click report. Every receipt attached.</h2>
            <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.75, marginBottom: 24 }}>Freelancers and SMBs globally lose over $50 billion annually in missed deductions — not because the purchases didn't qualify, but because the receipts were lost. TaxLink™ fixes this permanently.</p>
            {["Every purchase auto-categorized by deduction type","Receipts attached as PDF evidence automatically","CRA, IRS, HMRC, ATO and global tax authority formats","One-click share with accountant","Mileage, home office, equipment — all covered"].map((b, i) => (
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
              Every step below is the actual product flow — the exact screen, the exact timing. No setup guides. No CSV imports. No accountant required. Connect once. RECEKON runs the rest.
            </p>
          </div>
          <OnboardingFlow />
        </div>
      </section>

      {/* First value guarantee */}
      <section style={{ background: "#0a0a0a", padding: "clamp(48px,7vw,80px) clamp(16px,3.5vw,40px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2, background: "#111", borderRadius: 16, overflow: "hidden", border: "1px solid #1a1a1a" }} className="sec-grid">
            {[
              { n: "83s",    l: "to your first matched transaction", icon: "⚡" },
              { n: "2 min",  l: "to a retrospective 12-month deduction report", icon: "📊" },
              { n: "0",      l: "manual steps after initial connection", icon: "🤖" },
            ].map((s, i) => (
              <div key={i} style={{ padding: "32px 28px", textAlign: "center", borderRight: i < 2 ? "1px solid #1e1e1e" : "none" }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{s.icon}</div>
                <div style={{ fontSize: 36, fontWeight: 900, letterSpacing: "-0.04em", color: "#22c55e", marginBottom: 8 }}>{s.n}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.55 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`.tl-split{grid-template-columns:1fr 1fr} @media(max-width:900px){.tl-split{grid-template-columns:1fr!important}}`}</style>
    </Page>
  );
}
