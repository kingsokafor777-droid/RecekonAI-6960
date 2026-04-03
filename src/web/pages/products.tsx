import { useState } from "react";
import { Page } from "../components/Layout";

function PageHero({ tag, title, body }: { tag: string; title: string; body: string }) {
  return (
    <div style={{ background: "#fff", borderBottom: "1px solid #e5e5e5", padding: "clamp(40px,7vw,80px) clamp(16px,3.5vw,40px) clamp(32px,5vw,60px)" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>{tag}</p>
        <h1 className="kn-display" style={{ marginBottom: 20 }}>{title}</h1>
        <p className="kn-body" style={{ color: "#6b7280" }}>{body}</p>
      </div>
    </div>
  );
}

function ProductSection({ id, emoji, tag, tagColor = "#0a0a0a", headline, body, bullets, mockup, flip = false }: {
  id: string; emoji: string; tag: string; tagColor?: string; headline: string; body: string; bullets: string[]; mockup: React.ReactNode; flip?: boolean;
}) {
  return (
    <section id={id} style={{ padding: "clamp(48px,8vw,100px) clamp(16px,3.5vw,40px)", background: flip ? "#f9f9f9" : "#fff", borderBottom: "1px solid #e5e5e5" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="prod-row">
        <div style={{ order: flip ? 1 : 0 }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>{emoji}</div>
          <p style={{ fontSize: 11, fontWeight: 700, color: tagColor, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>{tag}</p>
          <h2 className="kn-h2" style={{ marginBottom: 20 }}>{headline}</h2>
          <p className="kn-body" style={{ marginBottom: 24 }}>{body}</p>
          {bullets.map((b, i) => (
            <div key={i} style={{ display: "flex", gap: 10, fontSize: 15, color: "#374151", marginBottom: 10, alignItems: "flex-start" }}>
              <span style={{ color: "#22c55e", fontWeight: 700, marginTop: 2 }}>✓</span>{b}
            </div>
          ))}
        </div>
        <div style={{ order: flip ? 0 : 1 }}>{mockup}</div>
      </div>
      <style>{`.prod-row{grid-template-columns:1fr 1fr} @media(max-width:768px){.prod-row{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

function StitchMockup() {
  return (
    <div style={{ background: "#f9f9f9", border: "1px solid #e5e5e5", borderRadius: 16, padding: 24 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>Stitching Engine — Live</div>
      <div style={{ background: "#fff", border: "1px solid #e5e5e5", borderRadius: 10, padding: "14px 16px", marginBottom: 10 }}>
        <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 4 }}>Bank transaction detected</div>
        <div style={{ fontWeight: 800, fontSize: 22, letterSpacing: "-0.03em" }}>$54.32 — TARGET</div>
        <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 4 }}>Status: PENDING RECEIPT</div>
      </div>
      <div style={{ textAlign: "center", color: "#9ca3af", fontSize: 20, padding: "6px 0" }}>↓</div>
      <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, padding: "14px 16px" }}>
        <div style={{ fontSize: 11, color: "#16a34a", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>✓ Reconciled — 4 SKUs extracted</div>
        {[["Tide Pods 35ct","$18.99"],["Organic Milk 1gal","$5.49"],["USB-C Cable 6ft","$12.99"],["AA Batteries 20pk","$16.85"]].map(([n,p],i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "5px 0", borderBottom: i<3?"1px solid #dcfce7":"none" }}>
            <span>{n}</span><span style={{ color: "#16a34a", fontWeight: 700 }}>{p}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function KillMockup() {
  const [killed, setKilled] = useState<number[]>([]);
  const subs = [
    { name: "Netflix", amt: "$15.99/mo", days: "Last used: 91 days ago" },
    { name: "Adobe CC", amt: "$54.99/mo", days: "Last used: 67 days ago" },
    { name: "Gym Membership", amt: "$49.99/mo", days: "Last used: 120 days ago" },
    { name: "Spotify Premium", amt: "$9.99/mo", days: "Last used: 8 days ago" },
  ];
  return (
    <div style={{ background: "#f9f9f9", border: "1px solid #e5e5e5", borderRadius: 16, padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em" }}>Zombie Subscriptions</div>
        <div style={{ background: "#fef2f2", color: "#ef4444", fontWeight: 700, fontSize: 11, padding: "3px 8px", borderRadius: 5 }}>
          ${subs.filter((_,i)=>!killed.includes(i)).reduce((a,s,i)=>a+(killed.includes(i)?0:parseFloat(s.amt.replace("$","").replace("/mo",""))),0).toFixed(2)}/mo leaking
        </div>
      </div>
      {subs.map((s,i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", borderRadius: 8, marginBottom: 6,
          background: killed.includes(i) ? "#f0fdf4" : "#fff",
          border: `1px solid ${killed.includes(i) ? "#bbf7d0" : "#e5e5e5"}`,
          opacity: killed.includes(i) ? 0.6 : 1, transition: "all 0.3s" }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: killed.includes(i) ? "#16a34a" : "#0a0a0a" }}>{killed.includes(i) ? "✓ Cancelled — " : ""}{s.name}</div>
            <div style={{ fontSize: 11, color: "#9ca3af" }}>{s.days}</div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: killed.includes(i) ? "#16a34a" : "#ef4444" }}>{s.amt}</span>
            {!killed.includes(i) && <button onClick={() => setKilled(p=>[...p,i])} style={{ background: "#ef4444", color: "#fff", border: "none", borderRadius: 6, padding: "4px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Kill</button>}
          </div>
        </div>
      ))}
    </div>
  );
}

function TaxMockup() {
  return (
    <div style={{ background: "#f9f9f9", border: "1px solid #e5e5e5", borderRadius: 16, padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em" }}>Q4 2024 Tax Report</div>
        <div style={{ background: "#f0fdf4", color: "#16a34a", fontWeight: 700, fontSize: 11, padding: "3px 8px", borderRadius: 5 }}>Tax-Ready</div>
      </div>
      {[
        { cat: "Home Office", items: 12, total: "$1,247.50", ok: true },
        { cat: "Software & Tools", items: 8, total: "$842.00", ok: true },
        { cat: "Professional Dev", items: 4, total: "$389.99", ok: true },
        { cat: "Business Travel", items: 6, total: "$367.44", ok: false },
      ].map((r,i) => (
        <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: i<3 ? "1px solid #e5e5e5" : "none" }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{r.cat}</div>
            <div style={{ fontSize: 11, color: "#9ca3af" }}>{r.items} receipts {r.ok ? "✓ attached" : "⚠ pending"}</div>
          </div>
          <div style={{ fontSize: 14, fontWeight: 700 }}>{r.total}</div>
        </div>
      ))}
      <div style={{ marginTop: 14, padding: "12px 14px", background: "#fff", border: "1px solid #e5e5e5", borderRadius: 8, display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontWeight: 700 }}>Total Deductions</span>
        <span style={{ fontSize: 18, fontWeight: 800, color: "#16a34a" }}>$2,846.93</span>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Page>
      <PageHero tag="Products" title="Financial intelligence. Fully automated." body="Three products built to eliminate financial leakage, recover missed deductions, and put you in complete control of your money." />
      <ProductSection id="stitching" emoji="🧵" tag="StitchEngine™" tagColor="#0a0a0a" headline="Every transaction matched to every receipt. Down to the SKU." body="The first system in the world that automatically reconciles a bank transaction to a digital receipt and extracts line-item SKU data. Zero manual input." bullets={["LLM-powered OCR — handles any receipt format","Fuzzy merchant matching — even when names differ","97.4% confidence score, flags edge cases for review","Processes email receipts, PDFs, scanned images"]} mockup={<StitchMockup />} />
      <ProductSection id="killswitch" emoji="⛔" tag="KillSwitch™" tagColor="#ef4444" headline="Cancel any subscription with one tap. No hold music." body="Block a merchant directly on your RECEKON Virtual Card. The subscription dies the next time it attempts to charge you — no login, no cancellation flow." bullets={["AI detects subscriptions unused 60+ days","Block merchant on Virtual Card instantly","Cancellation email drafted and sent automatically","Full audit trail of every action taken"]} mockup={<KillMockup />} flip />
      <ProductSection id="tax" emoji="📊" tag="TaxLink™" tagColor="#16a34a" headline="Tax-ready reports. Generated automatically." body="Every purchase auto-categorized, every receipt attached, every report formatted for your accountant. Stop losing thousands of dollars in undocumented deductions." bullets={["CRA, IRS, HMRC, ATO & global tax authority formats","Receipts attached as PDF evidence automatically","Freelancer, SMB, and enterprise tax workflows","One-click export to accountant"]} mockup={<TaxMockup />} />
    </Page>
  );
}
