import { Page } from "../../components/Layout";

const TERMS = [
  {
    title: "1. What RECEKON is",
    text: `RECEKON is an autonomous financial control system. It connects to your financial accounts and email, automatically reconciles transactions with receipts, detects inefficiencies, and — with your authorization — takes actions to optimize your finances.

This means RECEKON may: cancel subscriptions, generate reports, surface deductions, and flag anomalies. It acts on your behalf. You control the scope of that authority.`,
  },
  {
    title: "2. Your account",
    text: `You must be 18 years or older to use RECEKON. You are responsible for maintaining the security of your account credentials. You are responsible for all activity that occurs under your account.

Notify us immediately at security@recekon.com if you suspect unauthorized access.`,
  },
  {
    title: "3. Connected services",
    text: `RECEKON connects to third-party services (banks, email providers) using read-only OAuth 2.0 authorization where possible. For certain autonomous actions (subscription cancellation), RECEKON uses the official APIs of 4,000+ merchants.

You authorize these connections when you complete the OAuth consent flow. You can revoke any connection at any time from your account settings. Revocation is immediate.`,
  },
  {
    title: "4. Autonomous actions",
    text: `RECEKON may take certain actions automatically — such as flagging zombie subscriptions for cancellation. Before any action is taken that affects your finances, RECEKON will surface it for your review unless you have explicitly enabled automatic execution.

You remain in control. RECEKON is an execution engine, not a decision replacement. You set the rules. RECEKON runs them.`,
  },
  {
    title: "5. Acceptable use",
    text: `You agree not to: use RECEKON to violate any law or regulation; attempt to access accounts or financial data that are not yours; reverse engineer or extract RECEKON's proprietary algorithms; use RECEKON to facilitate fraud or money laundering; or resell, sublicense, or redistribute RECEKON's services without written authorization.`,
  },
  {
    title: "6. Data and privacy",
    text: `Your use of RECEKON is also governed by our Privacy Policy, which is incorporated by reference into these Terms. RECEKON processes your financial data to provide the service. We do not sell your data. See the Privacy Policy for complete details.`,
  },
  {
    title: "7. Service availability",
    text: `RECEKON targets 99.9% uptime. We schedule maintenance during low-traffic windows and notify you in advance. We are not liable for losses arising from temporary service unavailability, provided we meet our SLA obligations.`,
  },
  {
    title: "8. Fees and billing",
    text: `Subscription fees are billed monthly or annually as selected at signup. Fees are charged in advance. Cancellation takes effect at the end of the current billing period — you retain access until then.

We do not issue refunds for partial billing periods. If you believe a charge is in error, contact billing@recekon.com within 30 days.`,
  },
  {
    title: "9. Limitation of liability",
    text: `RECEKON is a software system, not a licensed financial advisor. RECEKON's outputs — reports, flags, recommendations — are informational. They are not financial, tax, or legal advice.

To the maximum extent permitted by applicable law, RECEKON's liability for any claim arising from your use of the service is limited to the fees you paid in the 12 months preceding the claim.

We are not liable for: indirect, incidental, or consequential damages; loss of profits; or financial losses arising from reliance on RECEKON's outputs without independent verification.`,
  },
  {
    title: "10. Changes to these terms",
    text: `We may update these Terms. We will notify you by email at least 30 days before material changes take effect. Continued use after the effective date constitutes acceptance. If you do not accept the revised Terms, you may cancel your account.`,
  },
  {
    title: "11. Governing law",
    text: `These Terms are governed by the laws of the Province of Ontario, Canada, without regard to conflict of law principles. Any disputes will be resolved in the courts of Ontario, Canada.`,
  },
];

export default function TermsPage() {
  return (
    <Page>
      <section style={{ background: "#0a0a0a", padding: "clamp(56px,7vw,96px) clamp(16px,3.5vw,40px) clamp(40px,5vw,60px)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 16 }}>Legal</p>
          <h1 style={{ fontSize: "clamp(36px,5vw,58px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#fff", marginBottom: 20 }}>
            Terms of Service
          </h1>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>
            Effective date: March 1, 2025 · Last updated: March 27, 2025
          </p>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", lineHeight: 1.8 }}>
            These Terms govern your access to and use of RECEKON's autonomous financial control system. By using RECEKON, you agree to these Terms. Read them — they describe what RECEKON can and cannot do on your behalf.
          </p>
        </div>
      </section>

      <section style={{ background: "#fff", padding: "clamp(48px,7vw,96px) clamp(16px,3.5vw,40px)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          {TERMS.map((t, i) => (
            <div key={i} style={{ marginBottom: 44, paddingBottom: 44, borderBottom: i < TERMS.length - 1 ? "1px solid #f0f0f0" : "none" }}>
              <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.015em", color: "#0a0a0a", marginBottom: 14 }}>{t.title}</h2>
              {t.text.split("\n\n").map((para, pi) => (
                <p key={pi} style={{ margin: pi > 0 ? "14px 0 0" : "0", fontSize: 15, color: "#4b5563", lineHeight: 1.85 }}>{para}</p>
              ))}
            </div>
          ))}

          <div style={{ background: "#f9f9f9", border: "1px solid #e5e5e5", borderRadius: 14, padding: "28px" }}>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0a0a0a", marginBottom: 12 }}>Questions?</h3>
            <a href="mailto:legal@recekon.com" style={{ color: "#0a0a0a", fontWeight: 700, fontSize: 15, textDecoration: "none" }}>legal@recekon.com →</a>
            <p style={{ margin: "12px 0 0", fontSize: 13, color: "#9ca3af" }}>RECEKON Inc. · Canada</p>
          </div>
        </div>
      </section>
    </Page>
  );
}
