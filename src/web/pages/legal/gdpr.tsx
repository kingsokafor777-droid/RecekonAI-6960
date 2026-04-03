import { Page } from "../../components/Layout";

const RIGHTS = [
  { right: "Right to access", article: "Art. 15", desc: "Request a complete copy of all personal data RECEKON holds about you, including the purposes of processing, categories of data, and recipients." },
  { right: "Right to rectification", article: "Art. 16", desc: "Correct inaccurate personal data. We will act within 30 days of a verified request." },
  { right: "Right to erasure", article: "Art. 17", desc: 'Request deletion of your personal data ("right to be forgotten"). Processed within 30 days. Some data may be retained where legally required (e.g., financial audit trails under applicable law).' },
  { right: "Right to restriction", article: "Art. 18", desc: "Request that we restrict processing of your data while a dispute about accuracy or legality is resolved." },
  { right: "Right to portability", article: "Art. 20", desc: "Receive your personal data in a structured, machine-readable format (JSON or CSV). Transferable to another controller." },
  { right: "Right to object", article: "Art. 21", desc: "Object to processing of your data for legitimate interests or direct marketing purposes. We will stop unless we have compelling legitimate grounds." },
  { right: "Right to withdraw consent", article: "Art. 7(3)", desc: "Withdraw consent at any time. Withdrawal does not affect lawfulness of processing before withdrawal. Revoke connected services instantly from account settings." },
];

const LEGAL_BASES = [
  { basis: "Contract performance", applies: "Core service delivery — reconciling transactions, generating reports, operating your account.", article: "Art. 6(1)(b)" },
  { basis: "Legitimate interests", applies: "Security monitoring, fraud detection, product improvement, and analytics — where our interests do not override yours.", article: "Art. 6(1)(f)" },
  { basis: "Legal obligation", applies: "Retaining financial audit logs where required by applicable law.", article: "Art. 6(1)(c)" },
  { basis: "Consent", applies: "Email integration, marketing communications, and any processing beyond what is necessary to deliver the core service.", article: "Art. 6(1)(a)" },
];

export default function GDPRPage() {
  return (
    <Page>
      <section style={{ background: "#0a0a0a", padding: "clamp(56px,7vw,96px) clamp(16px,3.5vw,40px) clamp(40px,5vw,60px)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 16 }}>Legal</p>
          <h1 style={{ fontSize: "clamp(36px,5vw,58px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#fff", marginBottom: 20 }}>GDPR Compliance</h1>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>Effective date: March 1, 2025 · Last updated: March 27, 2025</p>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", lineHeight: 1.8 }}>
            RECEKON is committed to full compliance with the General Data Protection Regulation (EU) 2016/679. This page explains our obligations as a data controller, the legal bases we use to process your data, and how to exercise your rights under GDPR.
          </p>
        </div>
      </section>

      <section style={{ background: "#fff", padding: "clamp(48px,7vw,96px) clamp(16px,3.5vw,40px)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>

          {/* Data controller */}
          <div style={{ marginBottom: 56, paddingBottom: 56, borderBottom: "1px solid #f0f0f0" }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", color: "#0a0a0a", marginBottom: 20 }}>Data Controller</h2>
            <p style={{ fontSize: 15, color: "#4b5563", lineHeight: 1.85, marginBottom: 20 }}>
              RECEKON Inc. is the data controller for personal data processed through the RECEKON service. As controller, we determine the purposes and means of processing your data and are accountable for GDPR compliance.
            </p>
            <div style={{ background: "#f9f9f9", border: "1px solid #e5e5e5", borderRadius: 12, padding: "20px 22px" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#0a0a0a", marginBottom: 6 }}>Data Protection Officer</div>
              <a href="mailto:dpo@recekon.com" style={{ color: "#0a0a0a", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>dpo@recekon.com</a>
              <div style={{ fontSize: 13, color: "#9ca3af", marginTop: 4 }}>RECEKON Inc. · Canada</div>
            </div>
          </div>

          {/* Legal bases */}
          <div style={{ marginBottom: 56, paddingBottom: 56, borderBottom: "1px solid #f0f0f0" }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", color: "#0a0a0a", marginBottom: 8 }}>Legal bases for processing</h2>
            <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.75, marginBottom: 28 }}>
              RECEKON processes personal data only where a valid legal basis under Article 6 GDPR exists.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 0, border: "1px solid #e5e5e5", borderRadius: 14, overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr auto", background: "#f5f5f5", borderBottom: "1px solid #e5e5e5", padding: "12px 20px" }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em" }}>Legal basis</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em" }}>Applies to</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em" }}>Article</span>
              </div>
              {LEGAL_BASES.map((b, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 2fr auto", padding: "16px 20px", borderBottom: i < LEGAL_BASES.length - 1 ? "1px solid #f0f0f0" : "none", alignItems: "start", gap: 16 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#0a0a0a" }}>{b.basis}</span>
                  <span style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.65 }}>{b.applies}</span>
                  <code style={{ fontSize: 11, color: "#7c3aed", fontFamily: "monospace", fontWeight: 700, whiteSpace: "nowrap" }}>{b.article}</code>
                </div>
              ))}
            </div>
          </div>

          {/* Rights */}
          <div style={{ marginBottom: 56, paddingBottom: 56, borderBottom: "1px solid #f0f0f0" }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", color: "#0a0a0a", marginBottom: 8 }}>Your rights under GDPR</h2>
            <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.75, marginBottom: 28 }}>
              You have the following rights. To exercise any of them, contact us at <a href="mailto:privacy@recekon.com" style={{ color: "#0a0a0a", fontWeight: 600 }}>privacy@recekon.com</a>. We respond within 30 days.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {RIGHTS.map((r, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 16, padding: "18px 20px", background: "#f9fafb", border: "1px solid #e5e5e5", borderRadius: 12, borderLeft: "3px solid #7c3aed" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: "#0a0a0a" }}>{r.right}</span>
                      <code style={{ fontSize: 9, fontWeight: 800, color: "#7c3aed", fontFamily: "monospace", background: "rgba(124,58,237,0.08)", padding: "2px 6px", borderRadius: 4 }}>{r.article}</code>
                    </div>
                    <p style={{ margin: 0, fontSize: 13.5, color: "#4b5563", lineHeight: 1.7 }}>{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Data transfers */}
          <div style={{ marginBottom: 56, paddingBottom: 56, borderBottom: "1px solid #f0f0f0" }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", color: "#0a0a0a", marginBottom: 20 }}>International data transfers</h2>
            <p style={{ fontSize: 15, color: "#4b5563", lineHeight: 1.85 }}>
              RECEKON's infrastructure is hosted on AWS in us-east-1 (Virginia, USA). Transfers from the EU/EEA to the US are governed by Standard Contractual Clauses (SCCs) pursuant to Article 46(2)(c) GDPR. EU data residency options are available for enterprise customers.
            </p>
          </div>

          {/* Complaints */}
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", color: "#0a0a0a", marginBottom: 20 }}>Lodge a complaint</h2>
            <p style={{ fontSize: 15, color: "#4b5563", lineHeight: 1.85, marginBottom: 20 }}>
              If you believe we have processed your data in violation of GDPR, you have the right to lodge a complaint with your local supervisory authority. In the EU, this is your national Data Protection Authority (DPA). We encourage you to contact us first — most issues can be resolved directly and quickly.
            </p>
            <div style={{ background: "#f9f9f9", border: "1px solid #e5e5e5", borderRadius: 14, padding: "28px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em" }}>DPO contact</span>
                  <div><a href="mailto:dpo@recekon.com" style={{ color: "#0a0a0a", fontWeight: 700, fontSize: 14, textDecoration: "none" }}>dpo@recekon.com</a></div>
                </div>
                <div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em" }}>Response time</span>
                  <div style={{ fontSize: 14, color: "#4b5563" }}>Within 30 days as required by Art. 12 GDPR</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </Page>
  );
}
