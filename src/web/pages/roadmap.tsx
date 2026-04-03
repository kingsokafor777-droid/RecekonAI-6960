import { useState } from "react";
import { Page } from "../components/Layout";

const phases = [
  { num:"01", id:"phase1", name:"The Wedge", tag:"Building Now", tagColor:"#22c55e", goal:"Consumer SaaS — 10,000 active users. Stitching Engine proven in market.",
    desc:"We enter through subscription cancellation — the most painful, lowest-friction entry point. While users enjoy the Kill Switch, the Stitching Engine quietly builds the world's first consumer SKU-level data asset.",
    items:["Bank connection (Plaid)","Email receipt ingestion (IMAP/Gmail)","Stitching Engine — TXN-to-SKU matching","Zombie subscription AI detection","SKU-level spending dashboard","One-click cancellation emails","Tax-ready itemized reports"] },
  { num:"02", id:"phase2", name:"The Platform", tag:"Series A", tagColor:"#3b82f6", goal:"FlowLedger Virtual Card + B2B Data API. Infrastructure play begins.",
    desc:"The Virtual Card transforms us from Observer to Controller. The B2B Data API begins monetizing the SKU-level data asset. We become the Stripe for Receipts — infrastructure every fintech plugs into.",
    items:["RECEKON Virtual Card (Stripe Issuing)","Real-time authorization decision engine","Programmable spending rules","B2B SKU Intelligence API","Enterprise data partnerships","PCI-DSS Level 1 certification","Snowflake analytical warehouse"] },
  { num:"03", id:"phase3", name:"The Infrastructure", tag:"The Endgame", tagColor:"#8b5cf6", goal:"Global Proof of Purchase protocol. The world's purchase intelligence network.",
    desc:"We stop being a product and become the protocol. Every merchant, warranty system, and tax authority runs on RECEKON's Proof of Purchase standard. Network effect makes it unbreakable.",
    items:["Proof of Purchase protocol standard","Blockchain-anchored receipt verification","Warranty claim automation","Insurance fraud prevention API","Government tax reporting integration","White-label infrastructure for banks","The SKU Graph — global intelligence"] },
];

export default function RoadmapPage() {
  const [open, setOpen] = useState<string>("phase1");
  return (
    <Page>
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e5e5", padding: "clamp(40px,7vw,80px) clamp(16px,3.5vw,40px) clamp(32px,5vw,60px)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>Roadmap</p>
          <h1 className="kn-display" style={{ marginBottom: 20 }}>From app to infrastructure.</h1>
          <p className="kn-body" style={{ color: "#6b7280" }}>Three phases. Each compounds the last. The data built in Phase 1 powers Phase 2. The network built in Phase 2 makes Phase 3 inevitable.</p>
        </div>
      </div>

      <section style={{ padding: "clamp(40px,7vw,80px) clamp(16px,3.5vw,40px)", background: "#f9f9f9" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", flexDirection: "column", gap: 12 }}>
          {phases.map((p) => (
            <div key={p.id} id={p.id} style={{ border: `1.5px solid ${open === p.id ? "#0a0a0a" : "#e5e5e5"}`, borderRadius: 14, overflow: "hidden", background: "#fff", boxShadow: open === p.id ? "0 6px 24px rgba(0,0,0,0.06)" : "none", transition: "all 0.2s" }}>
              <div style={{ padding: "24px 28px", cursor: "pointer", display: "flex", alignItems: "center", gap: 20 }} onClick={() => setOpen(open === p.id ? "" : p.id)}>
                <div style={{ width: 52, height: 52, background: `${p.tagColor}15`, border: `1px solid ${p.tagColor}30`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: 16, fontWeight: 900, fontFamily: "monospace", color: p.tagColor }}>{p.num}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 11, color: "#9ca3af", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>Phase {p.num}</span>
                    <span style={{ fontSize: 10, fontWeight: 700, background: `${p.tagColor}15`, color: p.tagColor, border: `1px solid ${p.tagColor}30`, borderRadius: 100, padding: "2px 8px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{p.tag}</span>
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.025em", color: "#0a0a0a" }}>{p.name}</div>
                  <div style={{ fontSize: 13, color: "#6b7280", marginTop: 2 }}>{p.goal}</div>
                </div>
                <span style={{ color: "#9ca3af", fontSize: 20, transition: "transform 0.2s", transform: open === p.id ? "rotate(180deg)" : "none" }}>▾</span>
              </div>
              {open === p.id && (
                <div style={{ padding: "0 28px 28px", borderTop: "1px solid #f0f0f0" }}>
                  <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.75, padding: "20px 0 16px" }}>{p.desc}</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }} className="road-items">
                    {p.items.map((item, j) => (
                      <div key={j} style={{ display: "flex", gap: 10, padding: "8px 12px", background: "#f9f9f9", borderRadius: 8, fontSize: 13, color: "#374151" }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: p.tagColor, flexShrink: 0, marginTop: 5 }}/>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <style>{`.road-items{grid-template-columns:1fr 1fr} @media(max-width:600px){.road-items{grid-template-columns:1fr!important}}`}</style>
      </section>
    </Page>
  );
}
