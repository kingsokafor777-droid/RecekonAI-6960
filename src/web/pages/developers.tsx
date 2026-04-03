import { Page } from "../components/Layout";
import { useLocation } from "wouter";

const codeLines = [
  { n:"1",  code: `{`, color: "#d4d4d4" },
  { n:"2",  code: `  "event": `,        color:"#9cdcfe", val:`"TRANSACTION_MATCHED"`, vc:"#4ec9b0" },
  { n:"3",  code: `  "transaction_id": `,color:"#9cdcfe", val:`"tx_abc123"`,          vc:"#ce9178" },
  { n:"4",  code: `  "amount": `,        color:"#9cdcfe", val:`54.32`,                vc:"#b5cea8" },
  { n:"5",  code: `  "merchant": `,      color:"#9cdcfe", val:`"Target Store #1024"`, vc:"#ce9178" },
  { n:"6",  code: `  "confidence": `,    color:"#9cdcfe", val:`0.974`,                vc:"#b5cea8" },
  { n:"7",  code: `  "receipt": {`,      color:"#d4d4d4" },
  { n:"8",  code: `    "skus": [`,       color:"#d4d4d4" },
  { n:"9",  code: `      { "name": "Tide Pods 35ct", "price": 18.99 },`, color:"#d4d4d4" },
  { n:"10", code: `      { "name": "Organic Milk 1gal", "price": 5.49 }`, color:"#d4d4d4" },
  { n:"11", code: `    ],`,             color:"#d4d4d4" },
  { n:"12", code: `    "tax_category": `, color:"#9cdcfe", val:`"grocery"`,           vc:"#ce9178" },
  { n:"13", code: `  },`,               color:"#d4d4d4" },
  { n:"14", code: `  "status": `,        color:"#9cdcfe", val:`"RECONCILED"`,         vc:"#4ade80" },
  { n:"15", code: `}`, color: "#d4d4d4" },
];

export default function DevelopersPage() {
  const [, navigate] = useLocation();
  return (
    <Page>
      {/* Hero */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e5e5", padding: "clamp(40px,7vw,80px) clamp(16px,3.5vw,40px) clamp(32px,5vw,60px)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>Developers</p>
          <h1 className="kn-display" style={{ marginBottom: 20 }}>
            Build on autonomous<br/>financial intelligence.
          </h1>
          <p className="kn-body" style={{ color: "#6b7280", maxWidth: 560, margin: "0 auto 32px" }}>
            A RESTful API designed from first principles around the natural flow of financial data — not the arbitrary boundaries of banking systems. Working integration in under 10 minutes.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => navigate("/developers/quickstart")}
              style={{ background: "#0a0a0a", color: "#fff", border: "none", borderRadius: 10, padding: "13px 24px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
              Quickstart — 10 min →
            </button>
            <button onClick={() => navigate("/developers/documentation")}
              style={{ background: "#fff", color: "#0a0a0a", border: "1px solid #e5e5e5", borderRadius: 10, padding: "13px 24px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
              API Reference
            </button>
          </div>
        </div>
      </div>

      {/* Core API section */}
      <section style={{ background: "#0a0a0a", padding: "clamp(48px,8vw,100px) clamp(16px,3.5vw,40px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }} className="dev-split">
          <div>
            <h2 className="kn-h2" style={{ color: "#fff", marginBottom: 12 }}>
              Every event.<br/><span style={{ color: "#22c55e" }}>Delivered instantly.</span>
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.75, marginBottom: 32, maxWidth: 420 }}>
              We replaced polling with a push-first webhook system. When a transaction matches a receipt, you receive the full atomic context — transaction, receipt, SKUs, confidence score, tax category — in one payload. No follow-up calls.
            </p>
            {[
              { icon: "⚡", t: "Up and running in 10 minutes", d: "Six steps from zero to live. No infrastructure changes. No compliance forms." },
              { icon: "📖", t: "Four resource domains", d: "Transaction, Receipt, Matching, Action — organized around how financial data actually flows." },
              { icon: "🔒", t: "Zero-knowledge architecture", d: "Even a full database compromise exposes no user credentials, no PII, no financial tokens." },
              { icon: "🛡️", t: "1,000 req/min baseline", d: "Generous limits that support 10,000+ active users. Auto-scales as your application grows." },
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

          {/* Webhook payload */}
          <div>
            <div style={{ background: "#141414", border: "1px solid #2a2a2a", borderRadius: 14, overflow: "hidden" }}>
              <div style={{ background: "#0d0d0d", borderBottom: "1px solid #1a1a1a", padding: "12px 20px", display: "flex", gap: 8, alignItems: "center" }}>
                {["#ff5f57","#ffbd2e","#28c840"].map((c,i) => <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c }}/>)}
                <span style={{ marginLeft: 8, fontSize: 11, color: "#555" }}>TRANSACTION_MATCHED · Stitching Engine webhook</span>
              </div>
              <div style={{ padding: "20px", fontFamily: "'JetBrains Mono','Fira Code',monospace", fontSize: 12, lineHeight: 1.85 }}>
                {codeLines.map((l,i) => (
                  <div key={i} style={{ display: "flex", gap: 14 }}>
                    <span style={{ color: "#333", minWidth: 24, textAlign: "right", userSelect: "none" }}>{l.n}</span>
                    <span>
                      <span style={{ color: l.color }}>{l.code}</span>
                      {l.val && <span style={{ color: (l as typeof l & {vc?:string}).vc }}>{l.val}</span>}
                      {l.val && <span style={{ color: "#444" }}>,</span>}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ marginTop: 12, padding: "12px 16px", background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.15)", borderRadius: 10 }}>
              <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>
                One webhook. Full context. No follow-up calls required — transaction, receipt, SKUs, confidence, and tax category arrive in a single atomic event.
              </p>
            </div>
          </div>
        </div>
        <style>{`.dev-split{grid-template-columns:1fr 1fr} @media(max-width:768px){.dev-split{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* Four domains */}
      <section style={{ background: "#fff", padding: "clamp(48px,8vw,96px) clamp(16px,3.5vw,40px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>API Architecture</p>
          <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 800, letterSpacing: "-0.025em", color: "#0a0a0a", marginBottom: 12 }}>
            Four domains.<br/>Everything you need.
          </h2>
          <p style={{ fontSize: 16, color: "#6b7280", lineHeight: 1.75, maxWidth: 520, marginBottom: 48 }}>
            Organized around the natural flow of financial data — not the arbitrary boundaries of banking systems.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }} className="feat-grid">
            {[
              {
                domain: "Transaction",
                color: "#22c55e",
                endpoints: ["/transactions/sync", "/transactions/analyze", "/transactions/categorize"],
                desc: "Real-time synchronization with 12,000+ financial institutions via Plaid. Every transaction lands structured and ready to match.",
              },
              {
                domain: "Receipt",
                color: "#3b82f6",
                endpoints: ["/receipts/extract", "/receipts/parse", "/receipts/validate"],
                desc: "Email receipt extraction via Gmail API and Microsoft Graph. Line items, tax info, and merchant data parsed automatically.",
              },
              {
                domain: "Matching",
                color: "#7c3aed",
                endpoints: ["/matches/create", "/matches/confirm", "/matches/webhooks"],
                desc: "The Stitching Engine. Proprietary algorithms connect transactions to receipts at 97.4% accuracy. Confidence score included.",
              },
              {
                domain: "Action",
                color: "#f59e0b",
                endpoints: ["/actions/cancel", "/actions/block", "/actions/refund"],
                desc: "Autonomous execution. Cancel subscriptions, block merchants, and request refunds — all with user authorization baked in.",
              },
            ].map((d, i) => (
              <div key={i} style={{ border: "1px solid #e5e5e5", borderRadius: 14, padding: "24px 26px", borderTop: `3px solid ${d.color}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <span style={{ fontSize: 13, fontWeight: 800, color: d.color, letterSpacing: "0.05em", textTransform: "uppercase" }}>{d.domain}</span>
                </div>
                <p style={{ fontSize: 13, color: "#4b5563", lineHeight: 1.7, marginBottom: 16 }}>{d.desc}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {d.endpoints.map((e, j) => (
                    <code key={j} style={{ fontSize: 11, fontFamily: "monospace", color: "#6b7280", background: "#f5f5f5", padding: "4px 10px", borderRadius: 6, display: "inline-block" }}>{e}</code>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <style>{`.feat-grid{grid-template-columns:repeat(2,1fr)} @media(max-width:640px){.feat-grid{grid-template-columns:1fr!important}}`}</style>
        </div>
      </section>

      {/* SDKs */}
      <section style={{ background: "#f9f9f9", padding: "clamp(48px,7vw,80px) clamp(16px,3.5vw,40px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="dev-split">
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>SDKs</p>
              <h2 style={{ fontSize: "clamp(26px,3vw,38px)", fontWeight: 800, letterSpacing: "-0.025em", color: "#0a0a0a", marginBottom: 16 }}>
                Hand-crafted.<br/>Not generated.
              </h2>
              <p style={{ fontSize: 15, color: "#4b5563", lineHeight: 1.8, marginBottom: 28 }}>
                Official SDKs for TypeScript, Python, Go, and Ruby — built to feel native to each language ecosystem. The TypeScript SDK ships with full type definitions for every parameter, response, and error case. Zero runtime dependencies.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  ["Auto retries", "Exponential backoff built in — your code stays clean"],
                  ["Token refresh", "OAuth refresh handled transparently, always"],
                  ["Webhook signing", "Request verification in one method call"],
                  ["Typed pagination", "Cursor-based, fully typed across all list endpoints"],
                ].map(([t, d], i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }}><circle cx="8" cy="8" r="7" stroke="#22c55e" strokeWidth="1.5"/><path d="M5 8l2 2 4-4" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <div>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "#0a0a0a" }}>{t} </span>
                      <span style={{ fontSize: 13, color: "#6b7280" }}>{d}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { lang: "TypeScript", cmd: "npm install @recekon/sdk", icon: "⬡", badge: "Stable", note: "Full types. IDE autocomplete." },
                { lang: "Python",     cmd: "pip install recekon",       icon: "🐍", badge: "Stable", note: "Sync + async support." },
                { lang: "Go",         cmd: "go get github.com/recekon/sdk-go", icon: "◈", badge: "Beta", note: "Idiomatic context propagation." },
                { lang: "Ruby",       cmd: "gem install recekon",       icon: "💎", badge: "Beta", note: "Chainable, idiomatic API." },
              ].map((s, i) => (
                <div key={i} style={{ background: "#fff", border: "1px solid #e5e5e5", borderRadius: 12, padding: "16px 20px", display: "flex", alignItems: "center", gap: 16 }}>
                  <span style={{ fontSize: 22, flexShrink: 0 }}>{s.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: "#0a0a0a" }}>{s.lang}</span>
                      <span style={{ fontSize: 9, fontWeight: 800, padding: "2px 7px", borderRadius: 100, background: s.badge === "Stable" ? "#dcfce7" : "#fef9c3", color: s.badge === "Stable" ? "#15803d" : "#854d0e" }}>{s.badge}</span>
                    </div>
                    <code style={{ fontSize: 11, color: "#6b7280", fontFamily: "monospace" }}>{s.cmd}</code>
                  </div>
                  <span style={{ fontSize: 11, color: "#9ca3af", textAlign: "right", maxWidth: 120 }}>{s.note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Security section */}
      <section id="security" style={{ padding: "clamp(48px,8vw,100px) clamp(16px,3.5vw,40px)", background: "#0a0a0a" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }} className="dev-split">
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#22c55e", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>Security</p>
              <h2 style={{ fontSize: "clamp(26px,3vw,42px)", fontWeight: 800, letterSpacing: "-0.025em", color: "#fff", marginBottom: 16, lineHeight: 1.1 }}>
                We can't see your<br/>users' data.<br/><span style={{ color: "#22c55e" }}>By design.</span>
              </h2>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.8, marginBottom: 32 }}>
                Zero-knowledge architecture isn't a marketing claim. It's a structural constraint. A full database compromise exposes no credentials, no PII, and no financial access tokens — because the encryption keys only exist client-side.
              </p>
              <button onClick={() => navigate("/developers/security")}
                style={{ background: "rgba(34,197,94,0.1)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.25)", borderRadius: 10, padding: "12px 22px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                Full security architecture →
              </button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                { icon: "🔐", t: "Zero-knowledge vault", d: "PII physically separated from financial data. Breach of one reveals nothing about the other." },
                { icon: "🏦", t: "PCI-DSS compliant", d: "Card issuing via Stripe Level 1 infrastructure. We never touch raw card numbers." },
                { icon: "🔒", t: "AES-256 everywhere", d: "Every byte at rest, per-tenant keys. TLS 1.3 for all transport." },
                { icon: "🕵️", t: "OAuth-only email", d: "No IMAP. No app passwords. Gmail API and Microsoft Graph exclusively." },
              ].map((s,i) => (
                <div key={i} style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 12, padding: "20px 18px" }}>
                  <div style={{ fontSize: 22, marginBottom: 10 }}>{s.icon}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 6 }}>{s.t}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", lineHeight: 1.6 }}>{s.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Page>
  );
}
