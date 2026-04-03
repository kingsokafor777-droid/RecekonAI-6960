import { useState, useEffect } from "react";
import { Page } from "../../components/Layout";
import { useLocation } from "wouter";

function TaxReportBuilder() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setStep(s => (s + 1) % 5), 1400);
    return () => clearInterval(t);
  }, []);

  const cats = [
    { name: "Home Office",    pct: 90, amt: "$1,247", color: "#22c55e" },
    { name: "Software",       pct: 68, amt: "$842",   color: "#3b82f6" },
    { name: "Professional",   pct: 45, amt: "$520",   color: "#7c3aed" },
    { name: "Equipment",      pct: 30, amt: "$390",   color: "#f59e0b" },
  ];

  return (
    <div style={{ background: "#0a0a0a", borderRadius: 16, overflow: "hidden", border: "1px solid #1a1a1a" }}>
      <div style={{ padding: "14px 18px", borderBottom: "1px solid #1a1a1a", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", animation: "recekonDot 1.5s infinite" }} />
          <span style={{ fontSize: 11, fontWeight: 800, color: "#22c55e", letterSpacing: "0.08em", textTransform: "uppercase" }}>TaxLink™ · Building report</span>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {["CRA","IRS","HMRC"].map(j => (
            <span key={j} style={{ fontSize: 9, fontWeight: 800, color: "rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.06)", padding: "2px 7px", borderRadius: 100, letterSpacing: "0.05em" }}>{j}</span>
          ))}
        </div>
      </div>

      <div style={{ padding: "16px 18px" }}>
        {cats.map((c, i) => (
          <div key={i} style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>{c.name}</span>
              <span style={{ fontSize: 13, fontWeight: 800, color: c.color }}>{c.amt}</span>
            </div>
            <div style={{ height: 5, background: "rgba(255,255,255,0.06)", borderRadius: 10, overflow: "hidden" }}>
              <div style={{ height: "100%", width: step > i ? `${c.pct}%` : "0%", background: c.color, borderRadius: 10, transition: "width 0.9s ease" }} />
            </div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.25)", marginTop: 3 }}>{c.pct}% deductible · receipt attached</div>
          </div>
        ))}
      </div>

      {step >= 4 && (
        <div style={{ margin: "0 12px 12px", padding: "14px 16px", background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 12, animation: "fadeInUp 0.4s ease" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#22c55e" }}>Report ready · 312 receipts attached</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>Audit-ready. Share with accountant in one click.</div>
            </div>
            <div style={{ fontSize: 22, fontWeight: 900, color: "#22c55e", letterSpacing: "-0.03em" }}>$2,999</div>
          </div>
        </div>
      )}
    </div>
  );
}

const MARKETS = [
  { flag: "🇨🇦", country: "Canada",        authority: "CRA" },
  { flag: "🇺🇸", country: "United States",  authority: "IRS" },
  { flag: "🇬🇧", country: "United Kingdom", authority: "HMRC" },
  { flag: "🇦🇺", country: "Australia",      authority: "ATO" },
  { flag: "🇩🇪", country: "Germany",        authority: "BZSt" },
  { flag: "🇫🇷", country: "France",         authority: "DGFiP" },
  { flag: "🇳🇿", country: "New Zealand",    authority: "IRD" },
  { flag: "🇸🇬", country: "Singapore",      authority: "IRAS" },
  { flag: "🇦🇪", country: "UAE",            authority: "FTA" },
  { flag: "🇮🇳", country: "India",          authority: "ITD" },
];

export default function TaxUseCasePage() {
  const [, navigate] = useLocation();
  return (
    <Page>
      {/* Hero */}
      <section style={{ background: "#0a0a0a", padding: "clamp(56px,8vw,100px) clamp(16px,3.5vw,40px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", animation: "recekonDot 1.5s infinite" }} />
            <span style={{ fontSize: 11, fontWeight: 800, color: "#22c55e", textTransform: "uppercase", letterSpacing: "0.1em" }}>TaxLink™</span>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", marginLeft: 4 }}>/ Tax Automation</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="tuc-split">
            <div>
              <h1 style={{ fontSize: "clamp(36px,4.5vw,58px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05, color: "#fff", marginBottom: 20 }}>
                Your tax report.<br/><span style={{ color: "#22c55e" }}>Built year-round.<br/>Done before you ask.</span>
              </h1>
              <p style={{ fontSize: 17, color: "rgba(255,255,255,0.5)", lineHeight: 1.8, marginBottom: 36, maxWidth: 440 }}>
                TaxLink™ categorizes every purchase to your jurisdiction's deduction standards the moment it happens — not at tax season. By April, your report exists. You just press send.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 36 }}>
                {[
                  ["Continuous categorization", "Every purchase categorized to CRA, IRS, HMRC or ATO standards as it occurs"],
                  ["Receipt attached automatically", "Every deduction has evidence. Uploaded, linked, audit-ready."],
                  ["Multi-jurisdiction", "10 countries now. 40+ in Phase 2. One product, everywhere you file."],
                  ["Accountant handoff", "Share your complete report — receipts included — in a single click."],
                ].map(([t, d], i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                      <svg width="8" height="7" viewBox="0 0 8 7" fill="none"><path d="M1 3.5L3 5.5L7 1" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 1 }}>{t}</div>
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>{d}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => navigate("/#waitlist")}
                style={{ background: "#22c55e", color: "#fff", border: "none", borderRadius: 10, padding: "14px 28px", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                Get early access →
              </button>
            </div>
            <TaxReportBuilder />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: "#fff", padding: "clamp(48px,7vw,80px) clamp(16px,3.5vw,40px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }} className="stat-row">
            {[
              { n: "$50B+",  l: "in deductions missed globally every year — not because they didn't qualify, but because the receipts were lost", c: "#ef4444" },
              { n: "$2,999", l: "average deductions found per RECEKON user annually — documented and submitted",                                  c: "#0a0a0a" },
              { n: "312",    l: "average receipts TaxLink™ attaches to a single user's annual report",                                            c: "#0a0a0a" },
              { n: "3 min",  l: "to generate a complete, jurisdiction-formatted, audit-ready tax report from scratch",                            c: "#22c55e" },
            ].map((s, i) => (
              <div key={i} style={{ padding: "24px 22px", background: i === 0 ? "#fef2f2" : i === 3 ? "#f0fdf4" : "#f9f9f9", borderRadius: 14, border: `1px solid ${i === 0 ? "#fecaca" : i === 3 ? "#bbf7d0" : "#e5e5e5"}` }}>
                <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: "-0.04em", color: s.c }}>{s.n}</div>
                <div style={{ fontSize: 13, color: "#6b7280", marginTop: 6, lineHeight: 1.55 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it executes */}
      <section style={{ background: "#f9f9f9", padding: "clamp(56px,8vw,96px) clamp(16px,3.5vw,40px)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14, textAlign: "center" }}>How it works</p>
          <h2 style={{ fontSize: "clamp(26px,3vw,38px)", fontWeight: 800, letterSpacing: "-0.025em", textAlign: "center", marginBottom: 48, color: "#0a0a0a" }}>
            Purchase happens. Report updates.<br/>No action needed.
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              { n: "01", t: "You make a purchase", d: "Any purchase — online, in-store, subscription. RECEKON's Stitching Engine™ detects it from your bank feed within seconds." },
              { n: "02", t: "Receipt matched and parsed", d: "TaxLink™ finds the receipt email, extracts every line item, and maps it to the appropriate deduction category for your jurisdiction." },
              { n: "03", t: "Added to your live report", d: "The deduction is added to your running annual report with confidence score, category, and receipt attached as PDF evidence." },
              { n: "04", t: "Report ready at any moment", d: "Export a CRA, IRS, HMRC, ATO or custom-format report at any time. Every receipt attached. No shoebox. No catch-up." },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 20, paddingBottom: i < 3 ? 28 : 0, marginBottom: i < 3 ? 28 : 0, borderBottom: i < 3 ? "1px solid #e5e5e5" : "none" }}>
                <div style={{ width: 42, height: 42, borderRadius: "50%", background: "#0a0a0a", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, flexShrink: 0 }}>{s.n}</div>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: "#0a0a0a", marginBottom: 6 }}>{s.t}</div>
                  <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.7, margin: 0 }}>{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global jurisdictions */}
      <section style={{ background: "#0a0a0a", padding: "clamp(56px,8vw,96px) clamp(16px,3.5vw,40px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14, textAlign: "center" }}>Global Coverage</p>
          <h2 style={{ fontSize: "clamp(26px,3vw,40px)", fontWeight: 800, letterSpacing: "-0.025em", color: "#fff", textAlign: "center", marginBottom: 12 }}>
            10 jurisdictions. One product.
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", textAlign: "center", maxWidth: 480, margin: "0 auto 48px", lineHeight: 1.75 }}>
            TaxLink™ generates reports formatted for each country's authority — automatically. The same purchase is categorized correctly whether you file CRA in Toronto or HMRC in London.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 10 }} className="market-grid">
            {MARKETS.map((m, i) => (
              <div key={i} style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 12, padding: "18px 14px", textAlign: "center" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(34,197,94,0.3)"; e.currentTarget.style.background = "#141414"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e1e1e"; e.currentTarget.style.background = "#111"; }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{m.flag}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{m.country}</div>
                <div style={{ fontSize: 10, fontWeight: 800, color: "#22c55e", letterSpacing: "0.06em" }}>{m.authority}</div>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", marginTop: 24, fontSize: 12, color: "rgba(255,255,255,0.2)" }}>
            + expanding to 40+ markets in Phase 2 · Multi-currency · Multi-language
          </p>
        </div>
      </section>

      <style>{`.tuc-split{grid-template-columns:1fr 1fr} @media(max-width:900px){.tuc-split{grid-template-columns:1fr!important}} .stat-row{grid-template-columns:repeat(4,1fr)} @media(max-width:768px){.stat-row{grid-template-columns:1fr 1fr!important}} .market-grid{grid-template-columns:repeat(5,1fr)} @media(max-width:800px){.market-grid{grid-template-columns:repeat(3,1fr)!important}} @media(max-width:500px){.market-grid{grid-template-columns:repeat(2,1fr)!important}} @keyframes fadeInUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </Page>
  );
}
