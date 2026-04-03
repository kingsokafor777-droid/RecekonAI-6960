import { useLocation } from "wouter";
import { Page } from "../../components/Layout";

const SECTIONS = [
  {
    title: "What we collect — and why",
    content: [
      {
        sub: "Financial connection data",
        text: "When you connect a bank account or card, RECEKON receives read-only access to transaction data via Plaid. We see what you spent, where, and when. We do not see your banking credentials. We cannot move money. Access is revocable from your dashboard at any time.",
      },
      {
        sub: "Email receipts",
        text: "With your explicit consent, RECEKON accesses your email via Gmail API or Microsoft Graph API using OAuth 2.0. We request minimum required scopes — read access to identify receipt emails only. We do not read personal correspondence. Raw email content is deleted after extraction. Only structured receipt data (merchant, amount, line items) persists.",
      },
      {
        sub: "Account information",
        text: "Name, email address, and account preferences. Used to operate your account and communicate with you about it.",
      },
      {
        sub: "Usage data",
        text: "How you interact with the RECEKON dashboard — which features you use, when, and how often. Used to improve the product. Never sold.",
      },
    ],
  },
  {
    title: "How we protect it",
    content: [
      {
        sub: "Zero-knowledge vault",
        text: "OAuth tokens and credentials are encrypted with keys derived from your session before touching our storage. RECEKON employees cannot decrypt your credentials. Neither can our infrastructure. Only your active session holds the key.",
      },
      {
        sub: "PII isolation",
        text: "Personally identifiable information is physically separated from transaction data. A breach of our transaction database does not expose who you are.",
      },
      {
        sub: "Encryption everywhere",
        text: "TLS 1.3 in transit. AES-256 at rest. Per-tenant encryption keys. Immutable audit logs retained for 7 years.",
      },
    ],
  },
  {
    title: "What we never do",
    content: [
      { sub: "We never sell your data", text: "Your financial data is not for sale. It will never be sold to advertisers, data brokers, or third parties. Full stop." },
      { sub: "We never store passwords", text: "RECEKON uses OAuth 2.0 exclusively. We never ask for your banking or email passwords. We never store them." },
      { sub: "We never read personal email", text: "Our email integration scans only for receipt patterns. Your personal correspondence is invisible to us by design." },
    ],
  },
  {
    title: "Who can access your data",
    content: [
      { sub: "You", text: "Always. Full export available at any time from your account settings." },
      { sub: "RECEKON systems", text: "Automated processing only — to reconcile transactions, detect zombies, generate reports." },
      { sub: "Service providers", text: "Plaid (bank connectivity), AWS (infrastructure), Stripe (billing). Each is bound by data processing agreements consistent with this policy." },
      { sub: "Law enforcement", text: "Only when legally required. We will notify you to the extent permitted by law." },
    ],
  },
  {
    title: "Your rights",
    content: [
      { sub: "Access", text: "Request a full copy of all data RECEKON holds about you." },
      { sub: "Correction", text: "Correct inaccurate data at any time." },
      { sub: "Deletion", text: "Request complete deletion of your account and all associated data. Processed within 30 days." },
      { sub: "Portability", text: "Export your data in machine-readable format." },
      { sub: "Withdrawal", text: "Revoke any connected service (bank, email) at any time. Disconnection is immediate." },
    ],
  },
  {
    title: "Data retention",
    content: [
      { sub: "Active accounts", text: "Data retained while your account is active." },
      { sub: "Deleted accounts", text: "Personal data deleted within 30 days of account deletion. Financial audit logs retained 7 years for compliance where required by law." },
      { sub: "Email content", text: "Raw email content deleted immediately after receipt extraction. Structured receipt data retained per account retention settings." },
    ],
  },
];

export default function PrivacyPage() {
  const [, navigate] = useLocation();

  return (
    <Page>
      <section style={{ background: "#0a0a0a", padding: "clamp(56px,7vw,96px) clamp(16px,3.5vw,40px) clamp(40px,5vw,60px)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 16 }}>Legal</p>
          <h1 style={{ fontSize: "clamp(36px,5vw,58px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#fff", marginBottom: 20 }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>
            Effective date: March 1, 2025 · Last updated: March 27, 2025
          </p>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", lineHeight: 1.8 }}>
            RECEKON Inc. ("RECEKON", "we", "us") operates an autonomous financial control system. You are handing us access to sensitive financial data. We take that seriously. This policy explains exactly what we collect, why we collect it, how we protect it, and what you can do about it.
          </p>
        </div>
      </section>

      <section style={{ background: "#fff", padding: "clamp(48px,7vw,96px) clamp(16px,3.5vw,40px)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          {SECTIONS.map((section, si) => (
            <div key={si} style={{ marginBottom: 56, paddingBottom: 56, borderBottom: si < SECTIONS.length - 1 ? "1px solid #f0f0f0" : "none" }}>
              <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", color: "#0a0a0a", marginBottom: 28 }}>
                {section.title}
              </h2>
              {section.content.map((item, ii) => (
                <div key={ii} style={{ marginBottom: 22 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#0a0a0a", marginBottom: 6 }}>{item.sub}</div>
                  <p style={{ margin: 0, fontSize: 15, color: "#4b5563", lineHeight: 1.8 }}>{item.text}</p>
                </div>
              ))}
            </div>
          ))}

          <div style={{ background: "#f9f9f9", border: "1px solid #e5e5e5", borderRadius: 14, padding: "28px 28px" }}>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0a0a0a", marginBottom: 12 }}>Contact us</h3>
            <p style={{ margin: "0 0 16px", fontSize: 15, color: "#4b5563", lineHeight: 1.75 }}>
              Questions about this policy? Requests to exercise your rights? Reach us directly:
            </p>
            <a href="mailto:privacy@recekon.com" style={{ color: "#0a0a0a", fontWeight: 700, fontSize: 15, textDecoration: "none" }}>privacy@recekon.com →</a>
            <p style={{ margin: "16px 0 0", fontSize: 13, color: "#9ca3af" }}>RECEKON Inc. · Canada</p>
          </div>
        </div>
      </section>
    </Page>
  );
}
