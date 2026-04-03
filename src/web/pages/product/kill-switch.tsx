import { useState, useEffect, useRef } from "react";
import { Page, PageHero } from "../../components/Layout";
import { useModal } from "../../components/ModalContext";

function KillSwitchDemo() {
  const [phase, setPhase] = useState(0);
  const [killed, setKilled] = useState<string[]>([]);

  const PHASES = [
    { label: "Detecting zombie subscriptions…", icon: "🔍" },
    { label: "AI analysis complete", icon: "✓" },
    { label: "Kill Switch activated", icon: "⚡" },
    { label: "Merchant blocked instantly", icon: "🔴" },
  ];

  const subs = [
    { id: "netflix",  name: "Netflix",        amt: "$15.99/mo", days: "Unused: 91 days",  logo: "🎬" },
    { id: "adobe",    name: "Adobe CC",       amt: "$54.99/mo", days: "Unused: 67 days",  logo: "🎨" },
    { id: "gym",      name: "Gym Membership", amt: "$49.99/mo", days: "Unused: 120 days", logo: "💪" },
    { id: "spotify",  name: "Spotify",        amt: "$9.99/mo",  days: "Unused: 8 days",   logo: "🎵" },
  ];

  useEffect(() => {
    const t = setInterval(() => setPhase(p => (p + 1) % PHASES.length), 2400);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (phase === 3) {
      const t1 = setTimeout(() => setKilled(p => [...p, "netflix"]), 400);
      const t2 = setTimeout(() => setKilled(p => [...p, "adobe"]), 800);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
    if (phase === 0) setKilled([]);
  }, [phase]);

  const totalLeaking = subs.filter(s => !killed.includes(s.id)).reduce((a, s) => a + parseFloat(s.amt.replace("$","").replace("/mo","")), 0);

  return (
    <div style={{ background: "#f8f9fb", borderRadius: 24, padding: 28, maxWidth: 500, width: "100%", boxShadow: "0 4px 32px rgba(0,0,0,0.06)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", background: phase >= 2 ? "#fef2f2" : "#f0fdf4", border: `1px solid ${phase >= 2 ? "#fecaca" : "#bbf7d0"}`, borderRadius: 10, marginBottom: 16, transition: "all 0.4s ease" }}>
        <span style={{ fontSize: 18 }}>{PHASES[phase].icon}</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: phase >= 2 ? "#ef4444" : "#16a34a" }}>{PHASES[phase].label}</span>
        {phase < 2 && <span style={{ fontSize: 12, color: "#9ca3af", animation: "kDots 1.2s infinite", marginLeft: 4 }}>●●●</span>}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.1em" }}>Zombie Subscriptions</div>
        <div style={{ background: killed.length > 0 ? "#f0fdf4" : "#fef2f2", color: killed.length > 0 ? "#16a34a" : "#ef4444", fontSize: 11, fontWeight: 800, padding: "3px 10px", borderRadius: 100, border: `1px solid ${killed.length > 0 ? "#bbf7d0" : "#fecaca"}`, transition: "all 0.4s ease" }}>
          ${totalLeaking.toFixed(2)}/mo leaking
        </div>
      </div>
      {subs.map(s => {
        const k = killed.includes(s.id);
        return (
          <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: k ? "#f0fdf4" : "#fff", border: `1.5px solid ${k ? "#bbf7d0" : "#e5e5e5"}`, borderRadius: 12, marginBottom: 8, opacity: k ? 0.65 : 1, transition: "all 0.4s ease" }}>
            <span style={{ fontSize: 20, flexShrink: 0 }}>{s.logo}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: k ? "#16a34a" : "#0a0a0a", textDecoration: k ? "line-through" : "none" }}>{s.name}</div>
              <div style={{ fontSize: 11, color: "#9ca3af" }}>{s.days}</div>
            </div>
            <span style={{ fontSize: 12, fontWeight: 800, color: k ? "#16a34a" : "#ef4444", fontFamily: "monospace" }}>{s.amt}</span>
            {k ? (
              <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#22c55e", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#fff", fontWeight: 900 }}>✓</div>
            ) : (
              <button onClick={() => setKilled(p => [...p, s.id])} style={{ background: "#ef4444", color: "#fff", border: "none", borderRadius: 7, padding: "5px 12px", fontSize: 11, fontWeight: 800, cursor: "pointer", fontFamily: "inherit" }}>Kill</button>
            )}
          </div>
        );
      })}
      {killed.length > 0 && (
        <div style={{ marginTop: 14, padding: "12px 16px", background: "#0a0a0a", borderRadius: 10, display: "flex", justifyContent: "space-between", alignItems: "center", animation: "kFade 0.4s ease" }}>
          <div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 2 }}>Savings recovered</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: "#22c55e", letterSpacing: "-0.03em" }}>
              +${subs.filter(s => killed.includes(s.id)).reduce((a, s) => a + parseFloat(s.amt.replace("$","").replace("/mo","")), 0).toFixed(2)}/mo
            </div>
          </div>
          <span style={{ fontSize: 28 }}>⚡</span>
        </div>
      )}
      <style>{`@keyframes kDots{0%,100%{opacity:0.3}50%{opacity:1}} @keyframes kFade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
}

export default function KillSwitchPage() {
  const { openContact } = useModal();
  const [killed, setKilled] = useState<number[]>([]);
  const subs = [
    { name: "Netflix", amt: "$15.99/mo", days: "Last used: 91 days ago" },
    { name: "Adobe CC", amt: "$54.99/mo", days: "Last used: 67 days ago" },
    { name: "Gym Membership", amt: "$49.99/mo", days: "Last used: 120 days ago" },
    { name: "Spotify Premium", amt: "$9.99/mo", days: "Last used: 8 days ago" },
  ];

  return (
    <Page>
      <PageHero tag="Product" title="Kill Switch™" body="Block any merchant on your RECEKON Virtual Card with one tap. No hold music. No cancellation flow. The subscription dies instantly." accent="#ef4444" />

      {/* LIVE DEMO */}
      <section style={{ background: "#fff", padding: "clamp(48px,7vw,80px) clamp(16px,3.5vw,40px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(16px,3.5vw,40px)" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 16px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 100, fontSize: 11, fontWeight: 700, color: "#ef4444", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>
              ● Live Demo
            </div>
            <h2 style={{ fontSize: "clamp(24px,4vw,42px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 14 }}>Watch Kill Switch™ fire in real time.</h2>
            <p style={{ fontSize: 16, color: "#6b7280", maxWidth: 520, margin: "0 auto" }}>
              Tap Kill on any zombie subscription. RECEKON blocks the merchant ID at the card level — the next charge attempt is declined. Instantly. No login. No waiting.
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "center", perspective: "1200px" }}>
            <div style={{ transform: "perspective(1200px) rotateY(-4deg) rotateX(3deg)", boxShadow: "20px 20px 60px rgba(0,0,0,0.12)", borderRadius: 24, transition: "transform 0.3s ease" }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "perspective(1200px) rotateY(0) rotateX(0)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "perspective(1200px) rotateY(-4deg) rotateX(3deg)"; }}>
              <KillSwitchDemo />
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: 36 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>Works with all major banks and card networks</div>
            <div style={{ display: "flex", justifyContent: "center", gap: 28, flexWrap: "wrap" }}>
              {["Plaid", "Stripe Issuing", "Visa", "Mastercard", "Amex"].map((l, i) => (
                <span key={i} style={{ fontSize: 13, fontWeight: 800, color: "#d1d5db" }}>{l}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COPY + INTERACTIVE */}
      <section style={{ background: "#f9f9f9", padding: "clamp(48px,7vw,80px) clamp(16px,3.5vw,40px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(16px,3.5vw,40px)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }} className="ks-split">
          <div>
            <h2 style={{ fontSize: "clamp(24px,3.5vw,40px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 20 }}>Cancel in seconds. Block forever.</h2>
            <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.75, marginBottom: 24 }}>RECEKON issues you a virtual card. When you want to cancel — tap Kill. The merchant ID is blocked at the card level. No login. No cancellation flow. No waiting.</p>
            {["AI detects subscriptions unused 60+ days","Block merchant on Virtual Card — instant","Cancellation email drafted and sent automatically","Full audit trail of every action","Undo anytime — unblock with one tap"].map((b, i) => (
              <div key={i} style={{ display: "flex", gap: 10, fontSize: 15, color: "#374151", marginBottom: 10, alignItems: "flex-start" }}>
                <span style={{ color: "#22c55e", fontWeight: 700, flexShrink: 0, marginTop: 2 }}>✓</span>{b}
              </div>
            ))}
          </div>
          <div>
            <div style={{ background: "#fff", border: "1px solid #e5e5e5", borderRadius: 16, padding: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em" }}>Zombie Subscriptions</div>
                <div style={{ background: "#fef2f2", color: "#ef4444", fontWeight: 700, fontSize: 11, padding: "3px 8px", borderRadius: 5 }}>
                  ${subs.filter((_, i) => !killed.includes(i)).reduce((a, s) => a + parseFloat(s.amt.replace("$","").replace("/mo","")), 0).toFixed(2)}/mo leaking
                </div>
              </div>
              {subs.map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", borderRadius: 8, marginBottom: 6, background: killed.includes(i) ? "#f0fdf4" : "#fff", border: `1px solid ${killed.includes(i) ? "#bbf7d0" : "#e5e5e5"}`, opacity: killed.includes(i) ? 0.6 : 1, transition: "all 0.3s" }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: killed.includes(i) ? "#16a34a" : "#0a0a0a" }}>{killed.includes(i) ? "✓ Cancelled — " : ""}{s.name}</div>
                    <div style={{ fontSize: 11, color: "#9ca3af" }}>{s.days}</div>
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: killed.includes(i) ? "#16a34a" : "#ef4444" }}>{s.amt}</span>
                    {!killed.includes(i) && <button onClick={() => setKilled(p => [...p, i])} style={{ background: "#ef4444", color: "#fff", border: "none", borderRadius: 6, padding: "4px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Kill</button>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`.ks-split{grid-template-columns:1fr 1fr} @media(max-width:768px){.ks-split{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* EXTENDED COPY */}
      <section style={{ background: "#0a0a0a", padding: "clamp(48px,7vw,80px) clamp(16px,3.5vw,40px)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 clamp(16px,3.5vw,40px)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, marginBottom: 48 }} className="ks-dark">
            <div>
              <h3 style={{ fontSize: "clamp(20px,2.8vw,30px)", fontWeight: 800, letterSpacing: "-0.025em", color: "#fff", marginBottom: 14, lineHeight: 1.2 }}>The psychology of cancellation is broken by design.</h3>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.8 }}>Every subscription company invests heavily in making cancellation painful. Buried settings. Three confirmation screens. "Are you sure you want to lose all your data?" Kill Switch™ is a structural bypass. You don't negotiate with the merchant. You cut the circuit. Their next authorization attempt returns a hard decline.</p>
            </div>
            <div>
              <h3 style={{ fontSize: "clamp(20px,2.8vw,30px)", fontWeight: 800, letterSpacing: "-0.025em", color: "#fff", marginBottom: 14, lineHeight: 1.2 }}>This is the first time a consumer has had this power.</h3>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.8 }}>Banks could have built this in 1998. They didn't because subscription revenue flows through their network. RECEKON built it because your financial autonomy matters more than industry convention. Kill Switch™ is not a feature. It's a transfer of power — from the merchant back to you.</p>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2 }} className="ks-stats">
            {[["<500ms","to block a merchant card-level"],["$130+","avg monthly savings per user"],["1 tap","to kill any subscription forever"]].map(([n,l],i)=>(
              <div key={i} style={{ padding: "24px 20px", textAlign: "center", borderRight: i<2?"1px solid #1a1a1a":"none" }}>
                <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: "-0.04em", color: i===0?"#22c55e":"#fff" }}>{n}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 6 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <style>{`.ks-dark{grid-template-columns:1fr 1fr} .ks-stats{grid-template-columns:repeat(3,1fr)} @media(max-width:768px){.ks-dark,.ks-stats{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* CTA */}
      <section style={{ background: "#fff", padding: "clamp(48px,6vw,72px) clamp(16px,3.5vw,40px)", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", padding: "0 clamp(16px,3.5vw,40px)" }}>
          <h2 style={{ fontSize: "clamp(22px,3.5vw,38px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 16 }}>Ready to kill your zombies?</h2>
          <p style={{ fontSize: 16, color: "#6b7280", marginBottom: 28 }}>Kill Switch™ launches with Phase 2. Join early access and be first to take control.</p>
          <button onClick={() => openContact("I want to use Kill Switch™ to cancel zombie subscriptions.")} style={{ background: "#0a0a0a", color: "#fff", border: "none", borderRadius: 10, padding: "15px 36px", fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Request Early Access →</button>
        </div>
      </section>

      {/* Onboarding flow */}
      <section style={{ background: "#f9f9f9", padding: "clamp(56px,8vw,96px) clamp(16px,3.5vw,40px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>First use</p>
          <h2 style={{ fontSize: "clamp(26px,3.5vw,42px)", fontWeight: 800, letterSpacing: "-0.025em", color: "#0a0a0a", marginBottom: 14 }}>
            From first connection to first cancellation.<br/>Under three minutes.
          </h2>
          <p style={{ fontSize: 16, color: "#6b7280", lineHeight: 1.75, maxWidth: 560, marginBottom: 48 }}>
            This is the exact sequence. No tutorial. No setup checklist. The value appears before most apps finish loading.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 0, maxWidth: 820, margin: "0 auto" }}>
            {[
              { n:"00:00", t:"Bank connected via Plaid",      d:"Read-only OAuth. No passwords stored. 30 seconds from tap to connected.",                              icon:"🏦", color:"#3b82f6", tag:"30 seconds" },
              { n:"00:42", t:"Kill Switch™ scans immediately", d:"The moment your bank is linked, Kill Switch™ begins scanning all recurring charges — no configuration needed.", icon:"🔍", color:"#f59e0b", tag:"42 seconds" },
              { n:"01:08", t:"Zombies surface",               d:"Within 68 seconds, RECEKON shows you every subscription you're being charged — sorted by last-used date. Most users see at least 4 they'd forgotten.", icon:"⛔", color:"#ef4444", tag:"68 seconds" },
              { n:"01:31", t:"One tap to cancel",             d:"Tap 'Cancel' on any subscription. Kill Switch™ sends the cancellation request via the merchant's official API. No login. No hold music. Confirmation arrives in seconds.", icon:"✓", color:"#22c55e", tag:"91 seconds" },
              { n:"01:51", t:"First cancellation confirmed",  d:"111 seconds from opening RECEKON to a confirmed cancellation receipt in your vault. The subscription cannot renew.", icon:"🎉", color:"#22c55e", tag:"111 seconds" },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 20, paddingBottom: i < 4 ? 32 : 0, marginBottom: i < 4 ? 32 : 0, borderBottom: i < 4 ? "1px solid #e5e5e5" : "none" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: `${s.color}15`, border: `2px solid ${s.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{s.icon}</div>
                  {i < 4 && <div style={{ width: 2, height: 24, background: "#e5e5e5", marginTop: 4 }} />}
                </div>
                <div style={{ paddingTop: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                    <span style={{ fontSize: 15, fontWeight: 800, color: "#0a0a0a" }}>{s.t}</span>
                    <code style={{ fontSize: 9, fontWeight: 800, color: s.color, background: `${s.color}12`, padding: "2px 7px", borderRadius: 4, fontFamily: "monospace" }}>{s.tag}</code>
                  </div>
                  <p style={{ margin: 0, fontSize: 14, color: "#6b7280", lineHeight: 1.7 }}>{s.d}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 48, background: "#0a0a0a", borderRadius: 16, padding: "28px 32px", display: "flex", alignItems: "center", gap: 24 }} className="ks-split">
            <div style={{ fontSize: 40 }}>⚡</div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 6 }}>111 seconds. First zombie killed.</div>
              <p style={{ margin: 0, fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>No tutorial. No setup wizard. No CSV to upload. The product is the onboarding — because value this immediate needs no explanation.</p>
            </div>
          </div>
        </div>
      </section>
    </Page>
  );
}
