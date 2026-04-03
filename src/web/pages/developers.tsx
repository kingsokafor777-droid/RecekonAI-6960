import { Page } from "../components/Layout";

const codeLines = [
  { n:"1", code: `{`, color: "#d4d4d4" },
  { n:"2", code: `  "event": `, color:"#9cdcfe", val:`"TRANSACTION_MATCHED"`, vc:"#ce9178" },
  { n:"3", code: `  "transaction_id": `, color:"#9cdcfe", val:`"tx_abc123"`, vc:"#ce9178" },
  { n:"4", code: `  "amount": `, color:"#9cdcfe", val:`54.32`, vc:"#b5cea8" },
  { n:"5", code: `  "merchant": `, color:"#9cdcfe", val:`"Target Store #1024"`, vc:"#ce9178" },
  { n:"6", code: `  "sku_count": `, color:"#9cdcfe", val:`4`, vc:"#b5cea8" },
  { n:"7", code: `  "confidence": `, color:"#9cdcfe", val:`0.974`, vc:"#b5cea8" },
  { n:"8", code: `  "status": `, color:"#9cdcfe", val:`"RECONCILED"`, vc:"#4ec9b0" },
  { n:"9", code: `  "items": [`, color:"#d4d4d4" },
  { n:"10",code: `    { "sku": "Tide Pods 35ct", "price": 18.99 },`, color:"#d4d4d4" },
  { n:"11",code: `    { "sku": "Organic Milk 1gal", "price": 5.49 }`, color:"#d4d4d4" },
  { n:"12",code: `  ]`, color:"#d4d4d4" },
  { n:"13",code: `}`, color:"#d4d4d4" },
];

export default function DevelopersPage() {
  return (
    <Page>
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e5e5", padding: "clamp(40px,7vw,80px) clamp(16px,3.5vw,40px) clamp(32px,5vw,60px)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>Developers</p>
          <h1 className="kn-display" style={{ marginBottom: 20 }}>Integrate in minutes, not weeks.</h1>
          <p className="kn-body" style={{ color: "#6b7280" }}>A few API calls and your users have complete financial visibility. No infrastructure changes. No compliance headaches.</p>
        </div>
      </div>

      {/* Dark section — code + features */}
      <section id="docs" style={{ background: "#0a0a0a", padding: "clamp(48px,8vw,100px) clamp(16px,3.5vw,40px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }} className="dev-split">
          <div>
            <h2 className="kn-h2" style={{ color: "#fff", marginBottom: 20 }}>Simple webhooks.<br/><span style={{ color: "#22c55e" }}>Powerful outcomes.</span></h2>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.55)", lineHeight: 1.75, marginBottom: 32 }}>RECEKON fires a webhook every time an event occurs — transaction matched, zombie detected, card blocked. Your backend stays in sync automatically.</p>
            {[
              { icon: "⚡", t: "Easy to start", d: "Working integration in under 10 minutes." },
              { icon: "📖", t: "Comprehensive docs", d: "Full API reference, SDKs, code examples." },
              { icon: "🛡️", t: "99.9% uptime SLA", d: "Bank-grade reliability and security." },
              { icon: "🔒", t: "Zero-knowledge vault", d: "PII and financial data live in separate systems." },
            ].map((f,i) => (
              <div key={i} style={{ display: "flex", gap: 14, padding: "16px 18px", background: "#111", border: "1px solid #222", borderRadius: 10, marginBottom: 8 }}>
                <div style={{ width: 36, height: 36, background: "#1a1a1a", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{f.icon}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 2 }}>{f.t}</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>{f.d}</div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div style={{ background: "#141414", border: "1px solid #2a2a2a", borderRadius: 14, overflow: "hidden" }}>
              <div style={{ background: "#0d0d0d", borderBottom: "1px solid #1a1a1a", padding: "12px 20px", display: "flex", gap: 8 }}>
                {["#ff5f57","#ffbd2e","#28c840"].map((c,i) => <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c }}/>)}
                <span style={{ marginLeft: 8, fontSize: 11, color: "#555" }}>Stitching Engine Webhook</span>
              </div>
              <div style={{ padding: "20px", fontFamily: "monospace", fontSize: 12, lineHeight: 1.8 }}>
                {codeLines.map((l,i) => (
                  <div key={i} style={{ display: "flex", gap: 14 }}>
                    <span style={{ color: "#555", minWidth: 24, textAlign: "right", userSelect: "none" }}>{l.n}</span>
                    <span>
                      <span style={{ color: l.color }}>{l.code}</span>
                      {l.val && <span style={{ color: (l as typeof l & {vc?:string}).vc }}>{l.val}</span>}
                      {l.val && <span style={{ color: "#666" }}>,</span>}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <style>{`.dev-split{grid-template-columns:1fr 1fr} @media(max-width:768px){.dev-split{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* Security section */}
      <section id="security" style={{ padding: "clamp(48px,8vw,100px) clamp(16px,3.5vw,40px)", background: "#f9f9f9" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 clamp(16px,3.5vw,40px)" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Security</p>
            <h2 className="kn-h2" style={{ marginBottom: 16 }}>Bank-grade security. Zero compromises.</h2>
            <p className="kn-body" style={{ color: "#6b7280", maxWidth: 520, margin: "0 auto", padding: "0 clamp(16px,3.5vw,40px)" }}>RECEKON is built on defense-in-depth principles. Your identity and financial data never live in the same system.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }} className="sec-grid">
            {[
              { icon: "🔐", t: "Zero-Knowledge Vault", d: "PII stored separately from financial data. A breach of one reveals nothing about the other." },
              { icon: "🏦", t: "PCI-DSS Compliant", d: "Card issuing via Stripe's Level 1 PCI infrastructure. We never touch raw card numbers." },
              { icon: "🔒", t: "AES-256 Encryption", d: "All data encrypted at rest and in transit. TLS 1.3 for all connections." },
              { icon: "👤", t: "Auth0 Identity", d: "Enterprise-grade identity management. OAuth 2.0, MFA, breach detection." },
              { icon: "🕵️", t: "Plaid Link Security", d: "Bank credentials never touch our servers. Read-only access, no write permissions." },
              { icon: "📋", t: "SOC 2 Roadmap", d: "SOC 2 Type II certification in progress. Full audit trail on all agent actions." },
            ].map((s,i) => (
              <div key={i} className="kn-card" style={{ background: "#fff" }}>
                <div style={{ fontSize: 28, marginBottom: 14 }}>{s.icon}</div>
                <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{s.t}</div>
                <div style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.65 }}>{s.d}</div>
              </div>
            ))}
          </div>
          <style>{`.sec-grid{grid-template-columns:repeat(3,1fr)} @media(max-width:768px){.sec-grid{grid-template-columns:1fr 1fr!important}} @media(max-width:480px){.sec-grid{grid-template-columns:1fr!important}}`}</style>
        </div>
      </section>
    </Page>
  );
}
