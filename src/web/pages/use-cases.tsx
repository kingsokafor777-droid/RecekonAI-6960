import { Page } from "../components/Layout";

const cases = [
  { id: "zombie", emoji: "💸", who: "Consumers", title: "Kill Zombie Subscriptions", body: "Never pay for something you forgot about again. RECEKON's AI flags every subscription unused in 60+ days and kills it in one tap — no login, no hold music, no more wasted money.", stats: [["$200+","avg. saved per household/month"],["6","avg. zombies per household"],["< 1s","to block a merchant"]], bullets: ["Netflix you haven't watched in 4 months","Gym membership from January's resolution","Software trials you forgot to cancel","Annual subscriptions that auto-renewed"] },
  { id: "tax", emoji: "🧾", who: "Freelancers & SMBs", title: "Tax Documentation Automation", body: "Every business purchase auto-categorized, every receipt attached, every report export-ready. Stop losing $50B+/year globally in missed deductions because of lost receipts.", stats: [["$2,847","avg. deductions found per user"],["100%","receipts matched automatically"],["0","manual uploads required"]], bullets: ["Home office expenses documented automatically","Software and SaaS tools categorized","Professional development receipts captured","Business travel matched to calendar events"] },
  { id: "sku", emoji: "🏷️", who: "Power Users", title: "SKU-Level Spend Intelligence", body: "Know exactly what you bought — Tide Pods, not just 'Target.' Track product-level spending trends, compare vendors, and see where prices are creeping up.", stats: [["97.4%","matching accuracy"],["1st","consumer SKU data layer globally"],["22","avg SKUs extracted per receipt"]], bullets: ["See grocery spend by product category","Track when brands quietly raise prices","Compare Costco vs Walmart for the same items","Identify what you buy most vs need most"] },
  { id: "card", emoji: "💳", who: "RECEKON Card Users", title: "Smart Card Control", body: "A virtual card with programmable spending rules. Set limits by category, block merchants, cap monthly spend — your financial policy enforced automatically.", stats: [["< 500ms","card authorization time"],["100%","PCI-DSS compliant"],["0","raw card numbers stored"]], bullets: ["Block entire merchant categories","Set monthly limits by spending category","One-tap merchant block — instant","Real-time authorization decisions"] },
];

function UseCaseSection({ id, emoji, who, title, body, stats, bullets, flip = false }: {
  id: string; emoji: string; who: string; title: string; body: string; stats: string[][]; bullets: string[]; flip?: boolean;
}) {
  return (
    <section id={id} style={{ padding: "clamp(48px,8vw,100px) clamp(16px,3.5vw,40px)", background: flip ? "#f9f9f9" : "#fff", borderBottom: "1px solid #e5e5e5" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }} className="uc-row">
        <div style={{ order: flip ? 1 : 0 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>{who}</div>
          <div style={{ fontSize: 40, marginBottom: 16 }}>{emoji}</div>
          <h2 className="kn-h2" style={{ marginBottom: 20 }}>{title}</h2>
          <p className="kn-body" style={{ marginBottom: 28 }}>{body}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
            {bullets.map((b, i) => (
              <div key={i} style={{ display: "flex", gap: 10, fontSize: 15, color: "#374151", alignItems: "flex-start" }}>
                <span style={{ color: "#22c55e", fontWeight: 700, marginTop: 2, flexShrink: 0 }}>✓</span>{b}
              </div>
            ))}
          </div>
        </div>
        <div style={{ order: flip ? 0 : 1, display: "flex", flexDirection: "column", gap: 16 }}>
          {stats.map(([n, l], i) => (
            <div key={i} style={{ padding: "24px 28px", background: i === 0 ? "#0a0a0a" : "#f9f9f9", borderRadius: 14, border: i !== 0 ? "1px solid #e5e5e5" : "none" }}>
              <div style={{ fontSize: 38, fontWeight: 900, letterSpacing: "-0.04em", color: i === 0 ? "#22c55e" : "#0a0a0a" }}>{n}</div>
              <div style={{ fontSize: 14, color: i === 0 ? "rgba(255,255,255,0.5)" : "#6b7280", marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`.uc-row{grid-template-columns:1fr 1fr} @media(max-width:768px){.uc-row{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

export default function UseCasesPage() {
  return (
    <Page>
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e5e5", padding: "clamp(40px,7vw,80px) clamp(16px,3.5vw,40px) clamp(32px,5vw,60px)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>Use Cases</p>
          <h1 className="kn-display" style={{ marginBottom: 20 }}>Who RECEKON works for.</h1>
          <p className="kn-body" style={{ color: "#6b7280" }}>Whether you're bleeding money silently, losing tax deductions, or need enterprise-grade purchase intelligence — RECEKON has a layer for you.</p>
        </div>
      </div>
      {cases.map((c, i) => <UseCaseSection key={c.id} {...c} flip={i % 2 !== 0} />)}
    </Page>
  );
}
