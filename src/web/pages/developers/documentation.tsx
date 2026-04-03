import { useState } from "react";
import { useLocation } from "wouter";
import { Page } from "../../components/Layout";

const ENDPOINTS = [
  {
    method: "POST", path: "/v1/webhooks/register",
    desc: "Register a webhook endpoint. RECEKON pushes a signed HTTPS POST the moment an event fires — no polling, no missed events, exponential backoff retry built in.",
    body: `{
  "url": "https://your-server.com/recekon",
  "events": ["transaction.matched", "zombie.detected",
             "card.blocked", "receipt.parsed"],
  "secret": "whsec_your_signing_secret"
}`,
    response: `{
  "webhook_id": "wh_7f3a9b2c",
  "status": "active",
  "events": 4,
  "created_at": "2025-03-27T09:41:00Z"
}`,
  },
  {
    method: "GET", path: "/v1/transactions",
    desc: "Retrieve reconciled transactions with SKU-level detail. Every bank transaction matched to its receipt, every receipt broken to the product name, unit price, and tax category.",
    body: null,
    response: `{
  "data": [{
    "id": "tx_abc123",
    "amount": 54.32,
    "merchant": "Target Store #1024",
    "status": "RECONCILED",
    "confidence": 0.974,
    "skus": [
      { "name": "Tide Pods 35ct", "price": 18.99 },
      { "name": "Organic Milk 1gal", "price": 5.49 }
    ]
  }],
  "total": 1,
  "cursor": "cur_next_page"
}`,
  },
  {
    method: "POST", path: "/v1/subscriptions/{id}/cancel",
    desc: "Cancel a zombie subscription using the official cancellation APIs of 4,000+ merchants — no stored credentials required. RECEKON knows which button to press.",
    body: `{
  "reason": "user_requested",
  "notify_user": true
}`,
    response: `{
  "subscription_id": "sub_xyz789",
  "status": "cancelled",
  "savings_recovered": 49.99,
  "effective_date": "2025-03-27"
}`,
  },
  {
    method: "GET", path: "/v1/tax/report",
    desc: "Generate an audit-ready deduction report. Every eligible expense auto-categorized to CRA, IRS, or HMRC standards — receipts attached, confidence scored. 13 hours of tax prep → zero.",
    body: null,
    response: `{
  "jurisdiction": "CRA",
  "tax_year": 2025,
  "total_deductions": 2479.00,
  "categories": {
    "home_office": 1247.00,
    "software": 842.00,
    "professional": 390.00
  },
  "receipts_attached": 312,
  "audit_ready": true
}`,
  },
];

const EVENTS = [
  { event: "TRANSACTION_CREATED",    desc: "New transaction detected from bank sync. Fires within seconds of charge posting — begins the Stitching Engine match cycle.", color: "#22c55e" },
  { event: "RECEIPT_EXTRACTED",      desc: "Email receipt parsed and normalized. Merchant, line items, unit prices, and tax data ready for matching.",                  color: "#3b82f6" },
  { event: "TRANSACTION_MATCHED",    desc: "Stitching Engine found a receipt match. Payload includes full SKU breakdown, confidence score, and reasoning trail.",        color: "#4ade80" },
  { event: "SUBSCRIPTION_DETECTED",  desc: "Zombie Detector identified a recurring charge. Includes usage signal, monthly cost, and cancellation readiness.",           color: "#ef4444" },
  { event: "CANCEL_COMPLETED",       desc: "Subscription successfully terminated via merchant API. Includes confirmation, effective date, and savings recovered.",       color: "#f59e0b" },
  { event: "REFUND_REQUESTED",       desc: "Price Guardian detected a post-purchase price drop and submitted a refund claim. Includes amount and merchant response.",   color: "#0ea5e9" },
];

const CODE_VERIFY = `// Verify webhook signature (Node.js)
const crypto = require('crypto');

function verifyWebhook(payload, signature, secret) {
  const expected = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected)
  );
}`;

const CODE_QUICKSTART = `// Install
npm install @recekon/sdk

// Initialize
import { Recekon } from '@recekon/sdk';
const client = new Recekon({ apiKey: process.env.RECEKON_KEY });

// Get reconciled transactions
const txns = await client.transactions.list({ status: 'reconciled' });

// Register webhook
await client.webhooks.register({
  url: 'https://your-server.com/hook',
  events: ['transaction.matched', 'zombie.detected']
});`;

export default function DocumentationPage() {
  const [, navigate] = useLocation();
  const [activeEndpoint, setActiveEndpoint] = useState(0);
  const [activeTab, setActiveTab] = useState<"request"|"response">("response");
  const ep = ENDPOINTS[activeEndpoint];

  return (
    <Page>
      {/* Hero */}
      <section style={{ background: "#0a0a0a", padding: "clamp(56px,8vw,100px) clamp(16px,3.5vw,40px) clamp(40px,5vw,64px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
            <button onClick={() => navigate("/developers")}
              style={{ background: "none", border: "none", color: "rgba(255,255,255,0.35)", fontSize: 13, cursor: "pointer", fontFamily: "inherit", padding: 0, display: "flex", alignItems: "center", gap: 6 }}>
              ← Developers
            </button>
            <span style={{ color: "rgba(255,255,255,0.15)", fontSize: 13 }}>/</span>
            <span style={{ color: "#22c55e", fontSize: 13, fontWeight: 600 }}>Documentation</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="dev-split">
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)", borderRadius: 100, padding: "5px 14px", marginBottom: 20 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", animation: "recekonDot 1.8s infinite" }}/>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#22c55e", letterSpacing: "0.08em", textTransform: "uppercase" }}>API Reference</span>
              </div>
              <h1 style={{ fontSize: "clamp(36px,4.5vw,58px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05, color: "#fff", marginBottom: 20 }}>
                Full API reference,<br/><span style={{ color: "#22c55e" }}>SDKs, and guides.</span>
              </h1>
              <p style={{ fontSize: 17, color: "rgba(255,255,255,0.5)", lineHeight: 1.8, maxWidth: 460, marginBottom: 32 }}>
                A REST architecture that anticipates what you need before you ask — organized around four resource domains, structured around the natural flow of financial data. Every response typed. Every error semantic. Every payload atomic.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <div style={{ background: "#111", border: "1px solid #222", borderRadius: 10, padding: "12px 18px", display: "flex", gap: 10, alignItems: "center" }}>
                  <span style={{ fontSize: 18 }}>⚡</span>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>REST + Webhooks</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>JSON, versioned, predictable</div>
                  </div>
                </div>
                <div style={{ background: "#111", border: "1px solid #222", borderRadius: 10, padding: "12px 18px", display: "flex", gap: 10, alignItems: "center" }}>
                  <span style={{ fontSize: 18 }}>🔒</span>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>Zero-knowledge vault</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>PII never crosses your wire</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Live code block */}
            <div style={{ background: "#0d0d0d", border: "1px solid #1e1e1e", borderRadius: 16, overflow: "hidden" }}>
              <div style={{ background: "#080808", borderBottom: "1px solid #1a1a1a", padding: "12px 18px", display: "flex", alignItems: "center", gap: 8 }}>
                {["#ff5f57","#ffbd2e","#28c840"].map((c,i) => <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c }}/>)}
                <span style={{ marginLeft: 8, fontSize: 11, color: "#444", fontFamily: "monospace" }}>recekon-sdk.js</span>
              </div>
              <pre style={{ margin: 0, padding: "22px 24px", fontFamily: "'JetBrains Mono', 'Fira Code', monospace", fontSize: 12, lineHeight: 1.8, color: "#9ca3af", overflowX: "auto" }}>
                {CODE_QUICKSTART.split("\n").map((line, i) => {
                  const isComment = line.trim().startsWith("//");
                  const isImport  = line.includes("import") || line.includes("require");
                  const isKey     = line.includes("apiKey") || line.includes("url") || line.includes("events");
                  return (
                    <div key={i}>
                      <span style={{ color: isComment ? "#555" : isImport ? "#c586c0" : isKey ? "#9cdcfe" : "#9ca3af" }}>{line}</span>
                    </div>
                  );
                })}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Endpoints */}
      <section style={{ background: "#fff", padding: "clamp(56px,8vw,96px) clamp(16px,3.5vw,40px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>Endpoints</p>
          <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 800, letterSpacing: "-0.025em", color: "#0a0a0a", marginBottom: 12 }}>
            Four domains.<br/>Complete coverage.
          </h2>
          <p style={{ fontSize: 16, color: "#6b7280", lineHeight: 1.75, maxWidth: 520, marginBottom: 48 }}>
            Every endpoint follows a predictable naming convention. Every response follows a consistent structure. Every error code carries semantic meaning — not a number to look up.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 32 }} className="dev-split">
            {/* Sidebar */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {ENDPOINTS.map((e, i) => (
                <button key={i} onClick={() => setActiveEndpoint(i)}
                  style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "12px 14px", borderRadius: 10, cursor: "pointer",
                    border: `1px solid ${i === activeEndpoint ? "#0a0a0a" : "#e5e5e5"}`,
                    background: i === activeEndpoint ? "#0a0a0a" : "#fff",
                    textAlign: "left", fontFamily: "inherit", transition: "all 0.15s",
                  }}>
                  <span style={{
                    fontSize: 9, fontWeight: 800, padding: "2px 6px", borderRadius: 4, flexShrink: 0, letterSpacing: "0.05em",
                    background: e.method === "GET" ? "#dbeafe" : "#dcfce7",
                    color: e.method === "GET" ? "#1d4ed8" : "#15803d",
                  }}>{e.method}</span>
                  <span style={{ fontSize: 12, fontFamily: "monospace", color: i === activeEndpoint ? "#fff" : "#0a0a0a", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {e.path}
                  </span>
                </button>
              ))}
            </div>

            {/* Detail */}
            <div style={{ background: "#0a0a0a", borderRadius: 16, overflow: "hidden" }}>
              <div style={{ padding: "20px 24px", borderBottom: "1px solid #1a1a1a" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <span style={{ fontSize: 10, fontWeight: 800, padding: "3px 8px", borderRadius: 4, background: ep.method === "GET" ? "#1e3a5f" : "#14532d", color: ep.method === "GET" ? "#60a5fa" : "#4ade80" }}>{ep.method}</span>
                  <code style={{ fontSize: 14, color: "#e5e7eb", fontFamily: "monospace" }}>{ep.path}</code>
                </div>
                <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.65 }}>{ep.desc}</p>
              </div>

              {/* Tabs */}
              <div style={{ display: "flex", borderBottom: "1px solid #1a1a1a" }}>
                {(ep.body ? ["request","response"] as const : ["response"] as const).map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    style={{ padding: "10px 18px", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 12, fontWeight: 600,
                      color: activeTab === tab ? "#22c55e" : "rgba(255,255,255,0.35)",
                      borderBottom: `2px solid ${activeTab === tab ? "#22c55e" : "transparent"}`, transition: "all 0.15s" }}>
                    {tab}
                  </button>
                ))}
              </div>

              <pre style={{ margin: 0, padding: "20px 24px", fontFamily: "monospace", fontSize: 12.5, lineHeight: 1.8, color: "#9ca3af", overflowX: "auto" }}>
                {(activeTab === "request" && ep.body ? ep.body : ep.response).split("\n").map((line, i) => {
                  const isKey    = /^\s*"[^"]+":/.test(line);
                  const isStr    = line.includes('": "');
                  const isNum    = line.includes('": ') && !line.includes('"', line.indexOf('": ') + 3);
                  const isBool   = line.includes("true") || line.includes("false");
                  const isGreen  = line.includes("RECONCILED") || line.includes("active") || line.includes("audit_ready") || line.includes("cancelled");
                  return (
                    <div key={i}>
                      <span style={{ color: isGreen ? "#4ade80" : isKey ? "#9cdcfe" : isStr ? "#ce9178" : isNum ? "#b5cea8" : "#d4d4d4" }}>{line}</span>
                    </div>
                  );
                })}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Webhook Events */}
      <section style={{ background: "#f9f9f9", padding: "clamp(56px,7vw,96px) clamp(16px,3.5vw,40px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>Webhook Events</p>
          <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 800, letterSpacing: "-0.025em", color: "#0a0a0a", marginBottom: 12 }}>
            Your backend stays in sync.<br/>Automatically.
          </h2>
          <p style={{ fontSize: 16, color: "#6b7280", lineHeight: 1.75, maxWidth: 520, marginBottom: 48 }}>
            The traditional approach is polling — asking the same question repeatedly until something changes. We replaced it with push. When a transaction matches, you know within seconds. When a cancellation completes, you get confirmation with the merchant's response. Everything you need, the moment it happens.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }} className="sec-grid">
            {EVENTS.map((e, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid #e5e5e5", borderRadius: 12, padding: "18px 20px", borderLeft: `3px solid ${e.color}` }}>
                <code style={{ fontSize: 12, fontWeight: 700, color: "#0a0a0a", display: "block", marginBottom: 8, fontFamily: "monospace" }}>{e.event}</code>
                <p style={{ margin: 0, fontSize: 13, color: "#6b7280", lineHeight: 1.6 }}>{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Webhook Verification */}
      <section style={{ background: "#0a0a0a", padding: "clamp(56px,7vw,96px) clamp(16px,3.5vw,40px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }} className="dev-split">
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#22c55e", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>Signature Verification</p>
            <h2 style={{ fontSize: "clamp(26px,3vw,40px)", fontWeight: 800, letterSpacing: "-0.025em", color: "#fff", marginBottom: 20 }}>
              Every payload is signed.<br/>Verify in one line.
            </h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.8, marginBottom: 32 }}>
              Every webhook includes an <code style={{ color: "#22c55e", fontFamily: "monospace" }}>X-Recekon-Signature</code> header — HMAC-SHA256 signed with your webhook secret. Replay attacks are rejected automatically via timestamp window enforcement. Verification is a single method call — no crypto boilerplate.
            </p>
            {[
              ["Signed payloads", "HMAC-SHA256 on every request"],
              ["Replay protection", "5-minute timestamp window enforced"],
              ["TLS 1.3", "All webhook delivery over encrypted transport"],
              ["Retry logic", "Exponential backoff: 1s → 2s → 4s → 8s → 16s"],
            ].map(([t, d], i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14 }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                  <svg width="8" height="7" viewBox="0 0 8 7" fill="none"><path d="M1 3.5L3 5.5L7 1" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 1 }}>{t}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{d}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: "#0d0d0d", border: "1px solid #1e1e1e", borderRadius: 14, overflow: "hidden" }}>
            <div style={{ background: "#080808", borderBottom: "1px solid #1a1a1a", padding: "11px 18px", display: "flex", gap: 7 }}>
              {["#ff5f57","#ffbd2e","#28c840"].map((c,i) => <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c }}/>)}
              <span style={{ marginLeft: 8, fontSize: 11, color: "#444", fontFamily: "monospace" }}>verify-webhook.js</span>
            </div>
            <pre style={{ margin: 0, padding: "20px 22px", fontFamily: "'JetBrains Mono','Fira Code',monospace", fontSize: 12, lineHeight: 1.9, color: "#9ca3af", overflowX: "auto" }}>
              {CODE_VERIFY.split("\n").map((line, i) => {
                const isCmt  = line.trim().startsWith("//");
                const isKw   = /\b(const|function|return|require)\b/.test(line);
                const isStr  = line.includes("'");
                return <div key={i}><span style={{ color: isCmt ? "#555" : isStr ? "#ce9178" : isKw ? "#569cd6" : "#9ca3af" }}>{line}</span></div>;
              })}
            </pre>
          </div>
        </div>
      </section>

      {/* SDKs */}
      <section style={{ background: "#fff", padding: "clamp(56px,7vw,96px) clamp(16px,3.5vw,40px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>SDKs</p>
          <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 800, letterSpacing: "-0.025em", color: "#0a0a0a", marginBottom: 14 }}>Ship in your language.</h2>
          <p style={{ fontSize: 16, color: "#6b7280", lineHeight: 1.75, maxWidth: 520, margin: "0 auto 48px" }}>
            Hand-crafted SDKs — not generated wrappers. Each one feels native to its language. Zero runtime dependencies. OAuth refresh, retries, pagination, and webhook verification handled so you don't have to.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, maxWidth: 720, margin: "0 auto 48px" }} className="sec-grid">
            {[
              { lang: "Node.js", pkg: "npm install @recekon/sdk", icon: "⬡", badge: "Stable" },
              { lang: "Python",  pkg: "pip install recekon",       icon: "🐍", badge: "Stable" },
              { lang: "Go",      pkg: "go get github.com/recekon", icon: "◈", badge: "Beta"   },
            ].map((s, i) => (
              <div key={i} style={{ border: "1px solid #e5e5e5", borderRadius: 14, padding: "24px 20px", textAlign: "left" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <span style={{ fontSize: 24 }}>{s.icon}</span>
                  <span style={{ fontSize: 9, fontWeight: 800, padding: "2px 8px", borderRadius: 100, background: s.badge === "Stable" ? "#dcfce7" : "#fef9c3", color: s.badge === "Stable" ? "#15803d" : "#854d0e" }}>{s.badge}</span>
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#0a0a0a", marginBottom: 8 }}>{s.lang}</div>
                <code style={{ fontSize: 11, color: "#6b7280", fontFamily: "monospace" }}>{s.pkg}</code>
              </div>
            ))}
          </div>
          <button onClick={() => navigate("/developers/quickstart")}
            style={{ background: "#0a0a0a", color: "#fff", border: "none", borderRadius: 10, padding: "14px 28px", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
            Start integrating in 10 minutes →
          </button>
        </div>
      </section>
    </Page>
  );
}
