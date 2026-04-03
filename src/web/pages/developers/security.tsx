import { useState } from "react";
import { useLocation } from "wouter";
import { Page } from "../../components/Layout";

const PRINCIPLES = [
  {
    icon: "🔐",
    title: "Zero-knowledge vault",
    body: "OAuth tokens and credentials are encrypted with user-derived keys before storage. RECEKON employees, database admins, and infrastructure cannot access your users' credentials — only the user's own session key can decrypt them.",
    badge: "Architectural guarantee",
    color: "#22c55e",
  },
  {
    icon: "🧱",
    title: "Zero-trust internal network",
    body: "Every service-to-service request within RECEKON's infrastructure must authenticate via IAM roles and pass through VPC endpoints. There is no implicit trust — not between services, not between environments.",
    badge: "Network layer",
    color: "#3b82f6",
  },
  {
    icon: "🔏",
    title: "Credential-free cancellations",
    body: "Kill Switch™ cancels subscriptions using the official cancellation APIs of 4,000+ merchants — without ever asking for or storing your users' login credentials. We know which button to press. We don't need the keys.",
    badge: "Product security",
    color: "#7c3aed",
  },
  {
    icon: "🛡️",
    title: "Isolated PII",
    body: "Personally identifiable information is physically separated from transaction data. Even a full transaction database breach exposes no PII. The two datasets require separate, independently audited keys to correlate.",
    badge: "Data isolation",
    color: "#f59e0b",
  },
];

const COMPLIANCE = [
  { standard: "SOC 2 Type II", status: "In progress", desc: "Annual third-party audit of security controls.", color: "#f5c518" },
  { standard: "PCI DSS",       status: "Compliant",   desc: "Cardholder data handled to PCI standards.",    color: "#22c55e" },
  { standard: "GDPR",          status: "Compliant",   desc: "Full data subject rights. EU data residency.", color: "#22c55e" },
  { standard: "PIPEDA",        status: "Compliant",   desc: "Canadian Privacy Act compliance.",             color: "#22c55e" },
  { standard: "CCPA",          status: "Compliant",   desc: "California Consumer Privacy Act.",             color: "#22c55e" },
];

const ENCRYPTION = [
  { layer: "Data in transit",     spec: "TLS 1.3",          detail: "All APIs, webhooks, and internal service communication" },
  { layer: "Data at rest",        spec: "AES-256",          detail: "Every database field, every object in storage" },
  { layer: "OAuth tokens",        spec: "User-derived keys", detail: "Tokens encrypted per-user before touching disk" },
  { layer: "Webhook payloads",    spec: "HMAC-SHA256",       detail: "Every outgoing payload signed with your secret" },
  { layer: "Tenant data",         spec: "Isolated keys",     detail: "Separate encryption key per organization" },
  { layer: "Audit logs",          spec: "Immutable + S3 Glacier", detail: "7-year retention, tamper-evident" },
];

const AUTH_FLOW = [
  { step: "01", title: "User connects email",    detail: "OAuth 2.0 consent flow via Gmail API or Microsoft Graph. RECEKON requests minimum required scopes — read-only on email." },
  { step: "02", title: "Token encrypted in vault", detail: "Access and refresh tokens encrypted with a key derived from the user's session. Stored in isolated vault. Never logged." },
  { step: "03", title: "Incremental sync",        detail: "Gmail history API and Microsoft delta queries fetch only new emails since last sync. Full inbox scans never happen after initial setup." },
  { step: "04", title: "Receipt extracted",       detail: "Receipts parsed in an isolated processing environment. Raw email content deleted after extraction. Only structured data persists." },
  { step: "05", title: "Match fired",             detail: "Reconciled event fired to your webhook endpoint within seconds. Transaction and receipt data are now linked at SKU level." },
];

export default function SecurityPage() {
  const [, navigate] = useLocation();
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <Page>
      {/* Hero */}
      <section style={{ background: "#0a0a0a", padding: "clamp(56px,8vw,100px) clamp(16px,3.5vw,40px) clamp(40px,5vw,64px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
            <button onClick={() => navigate("/developers")}
              style={{ background: "none", border: "none", color: "rgba(255,255,255,0.35)", fontSize: 13, cursor: "pointer", fontFamily: "inherit", padding: 0 }}>
              ← Developers
            </button>
            <span style={{ color: "rgba(255,255,255,0.15)", fontSize: 13 }}>/</span>
            <span style={{ color: "#22c55e", fontSize: 13, fontWeight: 600 }}>Security</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: 64, alignItems: "start" }} className="dev-split">
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)", borderRadius: 100, padding: "5px 14px", marginBottom: 20 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", animation: "recekonDot 1.8s infinite" }}/>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#22c55e", letterSpacing: "0.08em", textTransform: "uppercase" }}>Security architecture</span>
              </div>
              <h1 style={{ fontSize: "clamp(36px,4.5vw,58px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05, color: "#fff", marginBottom: 20 }}>
                We can't see your users' data.<br/><span style={{ color: "#22c55e" }}>By design.</span>
              </h1>
              <p style={{ fontSize: 17, color: "rgba(255,255,255,0.5)", lineHeight: 1.8, maxWidth: 480 }}>
                We didn't ask "how much security can we afford?" We asked: what would security look like if we assumed every system would eventually be compromised? The result is an architecture that protects your data even when our systems are breached — because the keys only exist with the user.
              </p>
            </div>

            {/* Stat cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { n: "TLS 1.3",    l: "All transport — APIs, webhooks, internal" },
                { n: "AES-256",    l: "Every byte at rest, per-tenant keys" },
                { n: "OAuth-only", l: "No passwords. No IMAP. No stored secrets." },
                { n: "0",          l: "PII in transaction database" },
              ].map((s, i) => (
                <div key={i} style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 12, padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-0.03em", color: "#22c55e" }}>{s.n}</span>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", textAlign: "right", maxWidth: 220 }}>{s.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Four principles */}
      <section style={{ background: "#fff", padding: "clamp(56px,8vw,96px) clamp(16px,3.5vw,40px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>Architecture</p>
          <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 800, letterSpacing: "-0.025em", color: "#0a0a0a", marginBottom: 12 }}>
            Four principles that can't be negotiated.
          </h2>
          <p style={{ fontSize: 16, color: "#6b7280", lineHeight: 1.75, maxWidth: 520, marginBottom: 48 }}>
            Traditional security relies on trust: trust the provider won't abuse access, trust employees won't steal data, trust the legal system will protect your rights. We replaced trust with mathematics. These four constraints are enforced cryptographically — not by policy, not by procedure.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="feat-grid">
            {PRINCIPLES.map((p, i) => (
              <div key={i} style={{ border: "1px solid #e5e5e5", borderRadius: 16, padding: "28px 28px", borderLeft: `4px solid ${p.color}`, position: "relative" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 24 }}>{p.icon}</span>
                    <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, letterSpacing: "-0.02em", color: "#0a0a0a" }}>{p.title}</h3>
                  </div>
                  <span style={{ fontSize: 9, fontWeight: 800, padding: "3px 8px", borderRadius: 100, background: `${p.color}15`, color: p.color, whiteSpace: "nowrap", letterSpacing: "0.05em", flexShrink: 0 }}>{p.badge}</span>
                </div>
                <p style={{ margin: 0, fontSize: 14, color: "#4b5563", lineHeight: 1.75 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Email auth flow */}
      <section style={{ background: "#0a0a0a", padding: "clamp(56px,8vw,96px) clamp(16px,3.5vw,40px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#22c55e", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>Email Integration</p>
          <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 800, letterSpacing: "-0.025em", color: "#fff", marginBottom: 12 }}>
            Official APIs only.<br/>No IMAP. No app passwords.
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.8, maxWidth: 540, marginBottom: 48 }}>
            Many financial apps still use IMAP — a 1986 protocol that requires storing passwords in plaintext and grants unrestricted inbox access. We rejected this entirely. RECEKON uses OAuth APIs from Google and Microsoft: fine-grained permission scopes, token revocation, and a clear consent screen that tells users exactly what we can access. We request read access to emails from known receipt domains. Nothing else. Revoke anytime.
          </p>

          <div style={{ position: "relative" }}>
            {/* Connecting line */}
            <div style={{ position: "absolute", left: 27, top: 0, bottom: 0, width: 2, background: "linear-gradient(to bottom, #22c55e, rgba(34,197,94,0.1))", zIndex: 0 }} />

            {AUTH_FLOW.map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 24, marginBottom: i < AUTH_FLOW.length - 1 ? 32 : 0, position: "relative", zIndex: 1 }}>
                {/* Circle */}
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#111", border: "2px solid #22c55e", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: 11, fontWeight: 900, color: "#22c55e", fontFamily: "monospace" }}>{s.step}</span>
                </div>
                {/* Content */}
                <div style={{ paddingTop: 14 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 6 }}>{s.title}</div>
                  <p style={{ margin: 0, fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.75, maxWidth: 560 }}>{s.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Encryption table */}
      <section style={{ background: "#f9f9f9", padding: "clamp(56px,7vw,96px) clamp(16px,3.5vw,40px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>Encryption</p>
          <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 800, letterSpacing: "-0.025em", color: "#0a0a0a", marginBottom: 48 }}>
            Every layer. Every byte.
          </h2>

          <div style={{ background: "#fff", border: "1px solid #e5e5e5", borderRadius: 16, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1.5fr", background: "#f5f5f5", borderBottom: "1px solid #e5e5e5", padding: "12px 24px" }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em" }}>Layer</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em" }}>Standard</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em" }}>Scope</span>
            </div>
            {ENCRYPTION.map((e, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1.5fr", padding: "16px 24px", borderBottom: i < ENCRYPTION.length - 1 ? "1px solid #f0f0f0" : "none", alignItems: "center" }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#0a0a0a" }}>{e.layer}</span>
                <code style={{ fontSize: 12, fontFamily: "monospace", color: "#16a34a", fontWeight: 700 }}>{e.spec}</code>
                <span style={{ fontSize: 13, color: "#6b7280" }}>{e.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section style={{ background: "#fff", padding: "clamp(56px,7vw,96px) clamp(16px,3.5vw,40px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>Compliance</p>
          <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 800, letterSpacing: "-0.025em", color: "#0a0a0a", marginBottom: 48 }}>
            Built for regulated industries.
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="sec-grid">
            {COMPLIANCE.map((c, i) => (
              <div key={i} style={{ border: "1px solid #e5e5e5", borderRadius: 14, padding: "22px 22px", display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 16, fontWeight: 800, color: "#0a0a0a" }}>{c.standard}</span>
                  <span style={{ fontSize: 9, fontWeight: 800, padding: "3px 9px", borderRadius: 100, background: c.color === "#22c55e" ? "#dcfce7" : "#fef9c3", color: c.color === "#22c55e" ? "#15803d" : "#854d0e" }}>{c.status}</span>
                </div>
                <p style={{ margin: 0, fontSize: 13, color: "#6b7280", lineHeight: 1.6 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ISO 20022 */}
      <section style={{ background: "#0a0a0a", padding: "clamp(56px,7vw,96px) clamp(16px,3.5vw,40px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          {/* Header */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start", marginBottom: 64 }} className="dev-split">
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#22c55e", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 16 }}>Standards</p>
              <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 800, letterSpacing: "-0.025em", color: "#fff", marginBottom: 20, lineHeight: 1.1 }}>
                ISO 20022.<br/>The data upgrade<br/><span style={{ color: "#22c55e" }}>that makes RECEKON possible at scale.</span>
              </h2>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.85 }}>
                By November 2025, SWIFT fully retires the MT messaging format for cross-border payments. ISO 20022 becomes the global standard. For most institutions, this is an IT migration. For RECEKON, it is infrastructure — the machine-readable financial data layer that lets autonomous decisions execute with precision.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { n: "80%",  l: "of global high-value payments by volume on ISO 20022 by end of 2025", src: "SWIFT Adoption Timeline" },
                { n: "87%",  l: "of global high-value payment value flowing through ISO 20022-native rails", src: "SWIFT" },
                { n: "10–15%", l: "improvement in straight-through processing rates in mature ISO 20022 environments", src: "EY Global Payments Report 2024" },
                { n: "30–40%", l: "reduction in reconciliation effort with ISO 20022-native ERP and TMS systems", src: "Capgemini Payments Transformation Study" },
              ].map((s, i) => (
                <div key={i} style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 12, padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
                  <div>
                    <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-0.04em", color: "#22c55e", lineHeight: 1 }}>{s.n}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 4, lineHeight: 1.55 }}>{s.l}</div>
                  </div>
                  <div style={{ fontSize: 9, color: "rgba(255,255,255,0.2)", fontStyle: "italic", textAlign: "right", maxWidth: 100, flexShrink: 0, marginTop: 2 }}>{s.src}</div>
                </div>
              ))}
            </div>
          </div>

          {/* The connection to RECEKON */}
          <div style={{ background: "rgba(34,197,94,0.04)", border: "1px solid rgba(34,197,94,0.12)", borderRadius: 20, padding: "40px 44px", marginBottom: 48 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#22c55e", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 20 }}>Why this matters for RECEKON</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56 }} className="dev-split">
              <div>
                <h3 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", color: "#fff", marginBottom: 14 }}>
                  Old financial data was dumb.<br/>ISO 20022 makes it intelligent.
                </h3>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.85, margin: "0 0 20px" }}>
                  MT messages were limited to 35-character reference fields, unstructured text, and opaque codes. Machines couldn't read them reliably. Humans couldn't either. Reconciliation was manual because the data demanded it.
                </p>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.85, margin: 0 }}>
                  ISO 20022 changes the input. Structured remittance data. Extended 140-character references. Machine-readable XML. Standardized message types across every system — bank, TMS, ERP. The data is finally rich enough to act on automatically.
                </p>
              </div>
              <div>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {[
                    {
                      old: "MT103 — 35-char reference, opaque code",
                      iso: "pain.001 / pacs.008 — structured, typed, machine-readable",
                      impact: "RECEKON matches transactions to receipts with 97.4% accuracy — structured data is why.",
                    },
                    {
                      old: "camt.053 bank statements — flat, human-formatted",
                      iso: "camt.053/054 — real-time intraday, granular cash position data",
                      impact: "Cash Flow Oracle™ builds 90-day forecasts from live camt.054 intraday feeds, not end-of-day summaries.",
                    },
                    {
                      old: "AP/AR reconciliation — manual exception handling",
                      iso: "Structured remittance fields — automatic invoice-to-payment matching",
                      impact: "TaxLink™ auto-categorizes every deduction because the underlying data is typed and standardized.",
                    },
                  ].map((row, i) => (
                    <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "16px 18px" }}>
                      <div style={{ display: "flex", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: "#ef4444", background: "rgba(239,68,68,0.1)", padding: "2px 8px", borderRadius: 4, letterSpacing: "0.05em" }}>MT (old)</div>
                        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", paddingTop: 2 }}>{row.old}</span>
                      </div>
                      <div style={{ display: "flex", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: "#22c55e", background: "rgba(34,197,94,0.1)", padding: "2px 8px", borderRadius: 4, letterSpacing: "0.05em" }}>ISO 20022</div>
                        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", paddingTop: 2 }}>{row.iso}</span>
                      </div>
                      <div style={{ fontSize: 12, color: "#22c55e", fontWeight: 600, lineHeight: 1.5 }}>→ {row.impact}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Message types RECEKON uses */}
          <div style={{ marginBottom: 48 }}>
            <h3 style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.02em", color: "#fff", marginBottom: 24 }}>
              ISO 20022 message types in RECEKON's stack
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }} className="sec-grid">
              {[
                { type: "pain.001",  name: "Payment Initiation",       use: "Customer-to-bank payment instructions. Structured remittance feeds TaxLink™ deduction matching." },
                { type: "pacs.008",  name: "Credit Transfer",          use: "Financial institution credit transfers. Source for cross-border transaction reconciliation." },
                { type: "camt.052",  name: "Account Report",           use: "Intraday bank account balance notifications. Powers Cash Flow Oracle™ real-time forecasting." },
                { type: "camt.053",  name: "Bank Statement",           use: "End-of-day account statement. Primary feed for Stitching Engine™ transaction intake." },
                { type: "camt.054",  name: "Intraday Notification",    use: "Real-time debit/credit notifications. Triggers Kill Switch™ detection within seconds of charge." },
                { type: "pacs.002",  name: "Payment Status Report",    use: "Transaction confirmation and rejection codes. Closes the audit loop on every executed action." },
              ].map((m, i) => (
                <div key={i} style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 12, padding: "18px 20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <code style={{ fontSize: 12, fontWeight: 800, color: "#22c55e", fontFamily: "monospace", background: "rgba(34,197,94,0.1)", padding: "3px 8px", borderRadius: 5 }}>{m.type}</code>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontWeight: 600 }}>{m.name}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: 12.5, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>{m.use}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Closing statement */}
          <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 16, padding: "28px 32px", display: "flex", alignItems: "flex-start", gap: 20 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 18 }}>⚡</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 6 }}>
                ISO 20022 is not a compliance checkbox for RECEKON. It is the precondition for autonomous execution.
              </div>
              <p style={{ margin: 0, fontSize: 13.5, color: "rgba(255,255,255,0.45)", lineHeight: 1.75 }}>
                Richer payment data means sharper pattern detection. Sharper detection means higher execution confidence. Higher confidence means more decisions executed automatically — and fewer requiring human review. The SWIFT migration from MT to ISO 20022 doesn't just change a format. It upgrades the signal quality of every financial event RECEKON observes and acts on.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Responsible disclosure */}
      <section style={{ background: "#0a0a0a", padding: "clamp(56px,7vw,96px) clamp(16px,3.5vw,40px)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <div style={{ width: 56, height: 56, background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: 24 }}>🛡️</div>
          <h2 style={{ fontSize: "clamp(26px,3vw,38px)", fontWeight: 800, letterSpacing: "-0.025em", color: "#fff", marginBottom: 16 }}>
            Found a vulnerability?
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.8, marginBottom: 32 }}>
            We run a responsible disclosure program. Security is not a feature we added to a product — it is the product. If you find an issue in RECEKON's infrastructure, API, or SDKs, we want to know. We respond within 24 hours. We pay for critical findings. Every fix is verified. Every remediation is documented.
          </p>
          <a href="mailto:security@recekon.com"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", color: "#0a0a0a", borderRadius: 10, padding: "13px 24px", fontSize: 14, fontWeight: 700, textDecoration: "none", letterSpacing: "-0.01em" }}>
            security@recekon.com
            <span>→</span>
          </a>
        </div>
      </section>
    </Page>
  );
}
