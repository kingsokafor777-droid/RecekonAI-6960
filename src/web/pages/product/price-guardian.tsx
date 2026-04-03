import { useState } from "react";
import { Page, PageHero } from "../../components/Layout";
import { useModal } from "../../components/ModalContext";

export default function PriceGuardianPage() {
  const { openContact } = useModal();
  const [refunded, setRefunded] = useState<number[]>([]);
  const items = [
    { name: "Sony WH-1000XM5", bought: "$349.99", current: "$289.99", saving: "$60.00", window: "3 days left", store: "Best Buy" },
    { name: "Dyson V15 Vacuum", bought: "$749.00", current: "$649.00", saving: "$100.00", window: "8 days left", store: "Costco" },
    { name: "Apple AirPods Pro", bought: "$279.00", current: "$229.00", saving: "$50.00", window: "12 days left", store: "Apple" },
  ];
  return (
    <Page>
      <PageHero tag="New Product" title="Price Guardian™" body="Auto-refund when prices drop after you buy. Every sale is someone's loss — and that someone is usually the person who bought the day before. Retailers designed this asymmetry. Price Guardian ends it." accent="#22c55e" />
      <section style={{ padding: "clamp(40px,7vw,80px) clamp(16px,3.5vw,40px)", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }} className="pg-split">
          <div>
            <div style={{ display: "inline-block", background: "#f0fdf4", color: "#16a34a", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 100, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 20, border: "1px solid #bbf7d0" }}>Coming Phase 2</div>
            <h2 style={{ fontSize: "clamp(24px,3.5vw,40px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 20 }}>You shouldn't have to watch prices after you buy. We do it for you.</h2>
            <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.75, marginBottom: 24 }}>Price Guardian monitors every item you purchase at supported retailers — continuously, multiple times per day — for the full duration of the retailer's price-match window. When a drop is detected, we don't alert you to take action. We take action. Verification, eligibility check, request submission, follow-up escalation, confirmation — all automatic.</p>
            {["Continuous monitoring across 4,000+ supported retailers","Verification → eligibility → submission → escalation → confirmation pipeline","Credit card price protection claims auto-submitted via card API","Average refund secured: $23.40 · Average time to refund: 3.2 days","89.3% success rate on valid claims · Zero user effort"].map((b, i) => (
              <div key={i} style={{ display: "flex", gap: 10, fontSize: 15, color: "#374151", marginBottom: 10 }}><span style={{ color: "#22c55e", fontWeight: 700, flexShrink: 0 }}>✓</span>{b}</div>
            ))}
            <div style={{ marginTop: 28, padding: "16px 20px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#16a34a", marginBottom: 4 }}>Performance-based: we win when you win</div>
              <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.65 }}>15% of successful refunds. 20% if escalated intervention required. If we fail to secure a refund on a valid claim, you pay nothing. Our revenue depends on your success — the incentive alignment is structural, not policy.</p>
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
          <h2 style={{ fontSize: "clamp(26px,4vw,44px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#fff", marginBottom: 16 }}>Price Guardian watches. Requests. Delivers.</h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", marginBottom: 32 }}>Active shoppers typically recover $150–$400 annually in refunds they would have never known to claim. Launching Phase 2 — join the waitlist for early access.</p>
          <button style={{ background: "#fff", color: "#0a0a0a", border: "none", borderRadius: 10, padding: "14px 32px", fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
            onClick={() => openContact("I want to join the Price Guardian waitlist.")}>
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
            Price Guardian requires zero ongoing input. Every purchase from the moment you connect enters a monitoring window covering the retailer's full price-match period — electronics: 14–30 days, department stores: 7–14 days. Price Guardian checks multiple times per day. Drops detected within 4 hours.
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
                <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }} className="pg-row">
                  <div style={{ padding: "8px 12px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)", borderRadius: 8, fontSize: 11, color: "rgba(255,255,255,0.4)", lineHeight: 1.55 }}>{row.before}</div>
                  <div style={{ padding: "8px 12px", background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 8, fontSize: 11, color: "#4ade80", lineHeight: 1.55 }}>{row.after}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <style>{`.pg-row{grid-template-columns:1fr 1fr} @media(max-width:600px){.pg-row{grid-template-columns:1fr!important}}`}</style>

      {/* ── PRICE GUARDIAN: THREE INLINE DAMAGE FACTS — light bg, inline typography ── */}
      {/* Design: Clean white background with a single horizontal rule above. Stats presented inline
          as oversized typography sentences — not boxes, not a grid. The number IS the sentence.
          Feels like a newspaper correction notice / financial disclosure. Totally different from
          TaxLink (dark ledger) and Zombie (dark ticker on blood background). */}
      <section style={{ background: "#f5f5f0", borderTop: "2px solid #0a0a0a", padding: "clamp(48px,7vw,80px) clamp(16px,3.5vw,40px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: "#9ca3af", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 40 }}>What the data shows</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(20px,3vw,32px)" }}>
            <div style={{ display: "flex", alignItems: "baseline", flexWrap: "wrap", gap: "0.35em", lineHeight: 1.2 }}>
              <span style={{ fontSize: "clamp(40px,7vw,80px)", fontWeight: 900, letterSpacing: "-0.05em", color: "#0a0a0a" }}>73%</span>
              <span style={{ fontSize: "clamp(16px,2.2vw,22px)", color: "#374151", fontWeight: 400 }}>of price drops go unclaimed. Not because the window closed. Because nobody checked.</span>
            </div>
            <div style={{ height: 1, background: "#e5e5e5" }} />
            <div style={{ display: "flex", alignItems: "baseline", flexWrap: "wrap", gap: "0.35em", lineHeight: 1.2 }}>
              <span style={{ fontSize: "clamp(40px,7vw,80px)", fontWeight: 900, letterSpacing: "-0.05em", color: "#0a0a0a" }}>$47</span>
              <span style={{ fontSize: "clamp(16px,2.2vw,22px)", color: "#374151", fontWeight: 400 }}>average refund per item where a drop was detected and claimed.</span>
            </div>
            <div style={{ height: 1, background: "#e5e5e5" }} />
            <div style={{ display: "flex", alignItems: "baseline", flexWrap: "wrap", gap: "0.35em", lineHeight: 1.2 }}>
              <span style={{ fontSize: "clamp(40px,7vw,80px)", fontWeight: 900, letterSpacing: "-0.05em", color: "#0a0a0a" }}>4 hours</span>
              <span style={{ fontSize: "clamp(16px,2.2vw,22px)", color: "#374151", fontWeight: 400 }}>from a price drop going live to an alert fired. You'd never have caught it. We did.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICE GUARDIAN: CENTERED MANIFESTO COPY ── */}
      {/* Design: Single centered column, no subheaders, no 2-col grid. One continuous argument.
          Max width 680px centered. Large leading. Feels like a long-form op-ed or open letter.
          Completely distinct from TaxLink (left-border magazine) and Zombie (alternating dark rows). */}
      <section style={{ background: "#fff", padding: "clamp(64px,9vw,112px) clamp(16px,3.5vw,40px)" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: "#9ca3af", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 32, textAlign: "center" }}>The argument</div>
          <h2 style={{ fontSize: "clamp(28px,4.5vw,52px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.05, color: "#0a0a0a", marginBottom: 32, textAlign: "center" }}>
            You already paid.<br/>The price dropped.<br/>They kept the difference.
          </h2>
          <div style={{ width: 48, height: 3, background: "#22c55e", margin: "0 auto 40px" }} />
          <p style={{ fontSize: 17, color: "#374151", lineHeight: 1.9, marginBottom: 24, textAlign: "center" }}>
            Retailers have price-match windows specifically because they know some customers will ask. They also know most won't. A 14-day price-match guarantee sounds generous until you realize they're banking on you forgetting to check.
          </p>
          <p style={{ fontSize: 17, color: "#374151", lineHeight: 1.9, marginBottom: 24, textAlign: "center" }}>
            The policy exists. The enforcement mechanism doesn't. That asymmetry is the entire business model behind not advertising price drops to the people who just paid full price.
          </p>
          <p style={{ fontSize: 17, color: "#374151", lineHeight: 1.9, marginBottom: 40, textAlign: "center" }}>
            Dynamic pricing is algorithmic. Retailers reprice 2.7 million times per day based on inventory, competitor signals, demand, and time. The item you bought at 9am might be 18% cheaper by 4pm. Nobody checks every item across every retailer every day for two weeks. Price Guardian does.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, textAlign: "left" }} className="pg-proof-pair">
            <div style={{ background: "#f9f9f9", border: "1px solid #e5e5e5", borderRadius: 12, padding: "18px 20px" }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>What you used to do</div>
              {["Remember return window per store", "Manually check price daily", "Find the customer service number", "Give up after hold music"].map((t, i) => (
                <div key={i} style={{ fontSize: 13, color: "#6b7280", marginBottom: 6, display: "flex", gap: 8 }}>
                  <span style={{ color: "#d1d5db" }}>—</span>{t}
                </div>
              ))}
            </div>
            <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 12, padding: "18px 20px" }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#16a34a", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>What happens now</div>
              {["Price Guardian tracks the window", "Monitored multiple times daily", "Refund submitted automatically", "Confirmation in your inbox"].map((t, i) => (
                <div key={i} style={{ fontSize: 13, color: "#374151", marginBottom: 6, display: "flex", gap: 8 }}>
                  <span style={{ color: "#22c55e", fontWeight: 700 }}>✓</span>{t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICE GUARDIAN: 2×2 FEATURE GRID with inline mini-mockups ── */}
      {/* Design: Light grey bg. 2×2 grid of larger cards. Each card has a dark "mini screen" mockup
          at the top showing a micro UI of that feature, then title + copy below.
          Feels like a product brochure or app store screenshot grid. Different from TaxLink
          (numbered list on dark) and Zombie (horizontal cards with color bars on white). */}
      <section style={{ background: "#f2f4f0", padding: "clamp(56px,8vw,88px) clamp(16px,3.5vw,40px)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontSize: 10, fontWeight: 800, color: "#9ca3af", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 12 }}>The protection stack</p>
            <h2 style={{ fontSize: "clamp(22px,3.2vw,36px)", fontWeight: 900, letterSpacing: "-0.04em", color: "#0a0a0a", margin: 0 }}>Four layers watching every purchase you make.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="pg-feat-grid">
            {[
              {
                title: "24/7 price monitoring",
                body: "Every purchase logged at transaction time. Price Guardian checks the live price multiple times daily for the full window — 7 to 30 days depending on store policy.",
                mini: (
                  <div style={{ background: "#0a0a0a", borderRadius: "8px 8px 0 0", padding: "12px 14px" }}>
                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.1em" }}>Monitoring — Sony WH-1000XM5</div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>Purchased</span>
                      <span style={{ fontSize: 10, fontWeight: 700, color: "#fff" }}>$349.99</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>Current</span>
                      <span style={{ fontSize: 10, fontWeight: 700, color: "#22c55e" }}>$289.99</span>
                    </div>
                    <div style={{ height: 3, background: "#1e1e1e", borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: "65%", background: "#22c55e" }} />
                    </div>
                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.25)", marginTop: 4 }}>Window: 12 days remaining</div>
                  </div>
                )
              },
              {
                title: "Auto-refund claim submission",
                body: "Drop detected — Price Guardian generates and submits the refund request directly. API-supported merchants: automatic. Others: email with escalation follow-up.",
                mini: (
                  <div style={{ background: "#0a0a0a", borderRadius: "8px 8px 0 0", padding: "12px 14px" }}>
                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.1em" }}>Claim submitted — Best Buy</div>
                    {[
                      { step: "Price drop detected", done: true },
                      { step: "Eligibility verified", done: true },
                      { step: "Claim submitted", done: true },
                      { step: "Refund confirmed", done: false },
                    ].map((s, i) => (
                      <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 5 }}>
                        <div style={{ width: 12, height: 12, borderRadius: "50%", background: s.done ? "#22c55e" : "#1e1e1e", border: s.done ? "none" : "1px solid #333", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {s.done && <svg width="6" height="5" viewBox="0 0 6 5" fill="none"><path d="M1 2.5L2.5 4L5 1" stroke="#fff" strokeWidth="1.2" strokeLinecap="round"/></svg>}
                        </div>
                        <span style={{ fontSize: 10, color: s.done ? "#fff" : "rgba(255,255,255,0.25)" }}>{s.step}</span>
                      </div>
                    ))}
                  </div>
                )
              },
              {
                title: "Return window tracking",
                body: "Different stores, different windows, different policies. Price Guardian maintains a live database of price-match policies for 4,000+ retailers. The deadline is never missed.",
                mini: (
                  <div style={{ background: "#0a0a0a", borderRadius: "8px 8px 0 0", padding: "12px 14px" }}>
                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.1em" }}>Active windows</div>
                    {[
                      { store: "Best Buy", days: "3 days left", urgent: true },
                      { store: "Costco", days: "8 days left", urgent: false },
                      { store: "Apple", days: "12 days left", urgent: false },
                    ].map((r, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.6)" }}>{r.store}</span>
                        <span style={{ fontSize: 10, fontWeight: 700, color: r.urgent ? "#ef4444" : "#22c55e" }}>{r.days}</span>
                      </div>
                    ))}
                  </div>
                )
              },
              {
                title: "Card-level protection",
                body: "Major credit cards include price protection. Price Guardian auto-submits claims via card API where supported — recovering money already owed under your existing card benefits.",
                mini: (
                  <div style={{ background: "#0a0a0a", borderRadius: "8px 8px 0 0", padding: "12px 14px" }}>
                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.1em" }}>Card protection claims</div>
                    {[
                      { card: "Amex Platinum ····0031", status: "Active", ok: true },
                      { card: "Chase Sapphire ····4821", status: "Active", ok: true },
                      { card: "Visa Infinite ····9204", status: "Pending", ok: false },
                    ].map((c, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>{c.card}</span>
                        <span style={{ fontSize: 10, fontWeight: 700, color: c.ok ? "#22c55e" : "#f59e0b" }}>{c.status}</span>
                      </div>
                    ))}
                  </div>
                )
              },
            ].map((f, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid #e5e5e5", borderRadius: 12, overflow: "hidden" }}>
                {f.mini}
                <div style={{ padding: "18px 20px" }}>
                  <div style={{ fontSize: 15, fontWeight: 800, color: "#0a0a0a", marginBottom: 8, lineHeight: 1.3 }}>{f.title}</div>
                  <p style={{ margin: 0, fontSize: 13, color: "#6b7280", lineHeight: 1.75 }}>{f.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICE GUARDIAN: FINAL CTA — centered, pure dark, no color bg ── */}
      {/* Design: Classic centered dark CTA but with a large price-drop visualization above the headline.
          Different feel from TaxLink (green split CTA) and Zombie (left-anchored dark with giant red number). */}
      <section style={{ background: "#0a0a0a", padding: "clamp(56px,8vw,96px) clamp(16px,3.5vw,40px)", textAlign: "center" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          {/* Price drop visual */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 16, padding: "12px 24px", background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.15)", borderRadius: 100, marginBottom: 40 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", textDecoration: "line-through" }}>$349.99</span>
              <span style={{ fontSize: 17, fontWeight: 900, color: "#22c55e" }}>$289.99</span>
            </div>
            <div style={{ width: 1, height: 32, background: "rgba(255,255,255,0.1)" }} />
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#22c55e" }}>$60.00 back</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>Auto-claimed by Price Guardian</div>
            </div>
          </div>

          <div style={{ display: "inline-block", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 100, padding: "4px 16px", fontSize: 10, fontWeight: 800, color: "#22c55e", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 24 }}>Performance-based · zero if nothing recovered</div>
          <h2 style={{ fontSize: "clamp(26px,4.5vw,48px)", fontWeight: 900, letterSpacing: "-0.04em", color: "#fff", lineHeight: 1.1, marginBottom: 20 }}>
            The price dropped.<br/>Let us claw the difference back.
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.45)", lineHeight: 1.85, marginBottom: 40 }}>
            Price Guardian monitors every purchase, fires alerts within 4 hours of a drop, and submits refund claims automatically. 15–20% of what we recover. Zero if we recover nothing.
          </p>
          <button
            onClick={() => openContact("I want Price Guardian watching my purchases.")}
            style={{ background: "#22c55e", color: "#fff", border: "none", borderRadius: 10, padding: "18px 48px", fontSize: 18, fontWeight: 900, cursor: "pointer", fontFamily: "inherit", letterSpacing: "-0.02em", display: "block", width: "100%", maxWidth: 360, margin: "0 auto 16px" }}
          >
            Get Early Access →
          </button>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }}>Launching Phase 2. Join early — priority access + first month monitoring free.</p>
        </div>
      </section>

      <style>{`
        .pg-split{grid-template-columns:1fr 1fr}
        @media(max-width:768px){.pg-split{grid-template-columns:1fr!important}}
        .pg-proof-pair{grid-template-columns:1fr 1fr}
        @media(max-width:480px){.pg-proof-pair{grid-template-columns:1fr!important}}
        .pg-feat-grid{grid-template-columns:1fr 1fr}
        @media(max-width:640px){.pg-feat-grid{grid-template-columns:1fr!important}}
        .pg-row{grid-template-columns:1fr 1fr}
        @media(max-width:600px){.pg-row{grid-template-columns:1fr!important}}
      `}</style>
    </Page>
  );
}
