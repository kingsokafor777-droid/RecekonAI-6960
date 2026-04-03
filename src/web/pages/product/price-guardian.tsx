import { useState } from "react";
import { Page, PageHero } from "../../components/Layout";

export default function PriceGuardianPage() {
  const [refunded, setRefunded] = useState<number[]>([]);
  const items = [
    { name: "Sony WH-1000XM5", bought: "$349.99", current: "$289.99", saving: "$60.00", window: "3 days left", store: "Best Buy" },
    { name: "Dyson V15 Vacuum", bought: "$749.00", current: "$649.00", saving: "$100.00", window: "8 days left", store: "Costco" },
    { name: "Apple AirPods Pro", bought: "$279.00", current: "$229.00", saving: "$50.00", window: "12 days left", store: "Apple" },
  ];
  return (
    <Page>
      <PageHero tag="New Product" title="Price Guardian™" body="Auto-refund when prices drop. Monitors your purchases and automatically requests refunds when prices drop within the return window." accent="#22c55e" />
      <section style={{ padding: "clamp(40px,7vw,80px) clamp(16px,3.5vw,40px)", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }} className="pg-split">
          <div>
            <div style={{ display: "inline-block", background: "#f0fdf4", color: "#16a34a", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 100, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 20, border: "1px solid #bbf7d0" }}>Coming Phase 2</div>
            <h2 style={{ fontSize: "clamp(24px,3.5vw,40px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 20 }}>Prices drop after you buy. We get your money back.</h2>
            <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.75, marginBottom: 24 }}>Price Guardian monitors every item you purchase and watches retailer prices in real time. When a price drops within your return window, we generate the refund request automatically. You keep a percentage, we keep a percentage. Everyone wins.</p>
            {["Automatic price drop detection across major retailers","One-click refund request generation","Credit card price protection claim automation","\"Best time to buy\" recommendations powered by price history","Integrates with Kill Switch — block merchant until price drops"].map((b, i) => (
              <div key={i} style={{ display: "flex", gap: 10, fontSize: 15, color: "#374151", marginBottom: 10 }}><span style={{ color: "#22c55e", fontWeight: 700, flexShrink: 0 }}>✓</span>{b}</div>
            ))}
            <div style={{ marginTop: 28, padding: "16px 20px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#16a34a", marginBottom: 4 }}>Revenue model</div>
              <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.65 }}>RECEKON keeps 10% of recovered savings. You keep 90%. Zero cost if we find nothing.</p>
            </div>
          </div>
          <div>
            <div style={{ background: "#f9f9f9", border: "1px solid #e5e5e5", borderRadius: 16, padding: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em" }}>Price Drop Alerts</div>
                <div style={{ background: "#f0fdf4", color: "#16a34a", fontWeight: 700, fontSize: 11, padding: "3px 8px", borderRadius: 5 }}>
                  ${items.filter((_, i) => !refunded.includes(i)).reduce((a, s) => a + parseFloat(s.saving.replace("$", "")), 0).toFixed(2)} recoverable
                </div>
              </div>
              {items.map((item, i) => (
                <div key={i} style={{ background: refunded.includes(i) ? "#f0fdf4" : "#fff", border: `1px solid ${refunded.includes(i) ? "#bbf7d0" : "#e5e5e5"}`, borderRadius: 10, padding: "12px 14px", marginBottom: 8, opacity: refunded.includes(i) ? 0.65 : 1, transition: "all 0.3s" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700 }}>{item.name}</div>
                      <div style={{ fontSize: 11, color: "#9ca3af" }}>{item.store} · {item.window}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 11, color: "#9ca3af", textDecoration: "line-through" }}>{item.bought}</div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#22c55e" }}>{item.current}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#22c55e" }}>Save {item.saving}</span>
                    {refunded.includes(i)
                      ? <span style={{ fontSize: 12, fontWeight: 700, color: "#16a34a" }}>✓ Refund Requested</span>
                      : <button onClick={() => setRefunded(p => [...p, i])} style={{ background: "#22c55e", color: "#fff", border: "none", borderRadius: 6, padding: "5px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Claim Refund</button>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`.pg-split{grid-template-columns:1fr 1fr} @media(max-width:768px){.pg-split{grid-template-columns:1fr!important}}`}</style>
      </section>
      <section style={{ background: "#0a0a0a", padding: "clamp(32px,5.5vw,60px) clamp(16px,3.5vw,40px)", textAlign: "center" }}>
        <div style={{ maxWidth: 560, margin: "0 auto", padding: "0 clamp(16px,3.5vw,40px)" }}>
          <h2 style={{ fontSize: "clamp(26px,4vw,44px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#fff", marginBottom: 16 }}>Be first to access Price Guardian™</h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", marginBottom: 32 }}>Launching Phase 2. Join the waitlist for early access.</p>
          <button style={{ background: "#fff", color: "#0a0a0a", border: "none", borderRadius: 10, padding: "14px 32px", fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
            onClick={() => { window.location.href = "/"; setTimeout(() => document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" }), 300); }}>
            Join Waitlist →
          </button>
        </div>
      </section>

      {/* Onboarding */}
      <section style={{ background: "#f9f9f9", padding: "clamp(56px,8vw,96px) clamp(16px,3.5vw,40px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>How it activates</p>
          <h2 style={{ fontSize: "clamp(26px,3.5vw,42px)", fontWeight: 800, letterSpacing: "-0.025em", color: "#0a0a0a", marginBottom: 14 }}>
            Connect once. Every future purchase<br/>is under price protection automatically.
          </h2>
          <p style={{ fontSize: 16, color: "#6b7280", lineHeight: 1.75, maxWidth: 560, marginBottom: 48 }}>
            Price Guardian requires no ongoing input. Connect your bank — every purchase you make from that point forward enters a price monitoring window automatically. You'll know about drops before the return window closes.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="pg-split">
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {[
                { icon:"🏦", t:"Connect bank",     d:"Plaid OAuth. RECEKON begins monitoring all new purchases from the moment you connect.", tag:"Day 0" },
                { icon:"🛒", t:"You make a purchase", d:"Sony headphones, $349.99. Price Guardian registers it silently. Monitoring window: 30 days. No action from you.", tag:"Day 1" },
                { icon:"📉", t:"Price drops",       d:"11 days later: Sony headphones drop to $289.99. Price Guardian detects it within 4 hours of the change going live.", tag:"Day 12" },
                { icon:"💰", t:"Refund requested",  d:"RECEKON generates the refund request — either a one-click button in the app, or automatic submission if the merchant supports it. $60 back.", tag:"Day 12" },
              ].map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 16, paddingBottom: i < 3 ? 24 : 0, marginBottom: i < 3 ? 24 : 0, borderBottom: i < 3 ? "1px solid #e5e5e5" : "none" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{s.icon}</div>
                    {i < 3 && <div style={{ width: 2, height: 16, background: "#e5e5e5", marginTop: 4 }} />}
                  </div>
                  <div style={{ paddingTop: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: 14, fontWeight: 800, color: "#0a0a0a" }}>{s.t}</span>
                      <span style={{ fontSize: 9, fontWeight: 800, color: "#22c55e", background: "#f0fdf4", padding: "1px 7px", borderRadius: 4 }}>{s.tag}</span>
                    </div>
                    <p style={{ margin: 0, fontSize: 13.5, color: "#6b7280", lineHeight: 1.7 }}>{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: "#0a0a0a", borderRadius: 16, padding: "28px", display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em" }}>What you had to do</div>
              {[
                { before:"Remember return window deadline", after:"Price Guardian tracks it automatically" },
                { before:"Check retailer website for price changes", after:"RECEKON monitors 24/7, fires alert within 4 hours" },
                { before:"Call customer service to request adjustment", after:"Refund claim generated in one tap" },
                { before:"Manually track credit card price protection", after:"Auto-submitted via card API where supported" },
              ].map((row, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <div style={{ padding: "8px 12px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)", borderRadius: 8, fontSize: 11, color: "rgba(255,255,255,0.4)", lineHeight: 1.55 }}>{row.before}</div>
                  <div style={{ padding: "8px 12px", background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 8, fontSize: 11, color: "#4ade80", lineHeight: 1.55 }}>{row.after}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Page>
  );
}
