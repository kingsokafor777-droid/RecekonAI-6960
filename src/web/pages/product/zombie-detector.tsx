import { useState, useEffect, useRef } from "react";
import { Page, PageHero } from "../../components/Layout";
import { useModal } from "../../components/ModalContext";

function ZombieRadarDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scanAngle, setScanAngle] = useState(0);
  const [detected, setDetected] = useState<{ x: number; y: number; name: string; days: number; amt: string; found: boolean }[]>([]);
  const [phase, setPhase] = useState<"scanning"|"found"|"alerting">("scanning");

  const ZOMBIES = [
    { x: 0.65, y: 0.30, name: "Netflix",  days: 91,  amt: "$15.99/mo" },
    { x: 0.28, y: 0.62, name: "Adobe CC", days: 67,  amt: "$54.99/mo" },
    { x: 0.72, y: 0.70, name: "Gym",      days: 120, amt: "$49.99/mo" },
  ];

  useEffect(() => {
    const t = setInterval(() => {
      setScanAngle(a => {
        const next = (a + 2) % 360;
        // Detect zombies when sweep passes their angle
        ZOMBIES.forEach((z, i) => {
          const zAngle = (Math.atan2(z.y - 0.5, z.x - 0.5) * 180 / Math.PI + 360) % 360;
          if (Math.abs(next - zAngle) < 3) {
            setDetected(prev => {
              if (prev.find(d => d.name === z.name)) return prev;
              return [...prev, { ...z, x: z.x, y: z.y, found: true }];
            });
          }
        });
        return next;
      });
    }, 30);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (detected.length === ZOMBIES.length) {
      setPhase("found");
      setTimeout(() => setPhase("alerting"), 1200);
      setTimeout(() => {
        setDetected([]);
        setPhase("scanning");
      }, 5000);
    }
  }, [detected.length]);

  return (
    <div style={{ background: "#0a0a0a", borderRadius: 24, padding: 28, maxWidth: 500, width: "100%", boxShadow: "0 4px 32px rgba(0,0,0,0.3)" }}>
      {/* Status */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: phase === "alerting" ? "#ef4444" : "#22c55e", boxShadow: `0 0 8px ${phase === "alerting" ? "#ef4444" : "#22c55e"}`, animation: "zRadarPulse 1s infinite" }} />
        <span style={{ fontSize: 12, fontWeight: 700, color: phase === "alerting" ? "#ef4444" : "#22c55e", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          {phase === "scanning" ? "AI Surveillance Active" : phase === "found" ? "Analysis Complete" : "Zombies Detected — Alert Sent!"}
        </span>
        <span style={{ marginLeft: "auto", fontSize: 11, color: "rgba(255,255,255,0.3)" }}>Monitoring 12 subs</span>
      </div>

      {/* Radar */}
      <div style={{ position: "relative", width: "100%", paddingBottom: "80%", marginBottom: 20 }}>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ position: "relative", width: "100%", maxWidth: 280, aspectRatio: "1", margin: "0 auto" }}>
            {/* Radar circles */}
            {[1,2,3,4].map(i => (
              <div key={i} style={{
                position: "absolute", inset: `${(i-1)*12.5}%`,
                border: "1px solid rgba(34,197,94,0.15)",
                borderRadius: "50%",
              }} />
            ))}
            {/* Cross hairs */}
            <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: "rgba(34,197,94,0.12)" }} />
            <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: "rgba(34,197,94,0.12)" }} />
            {/* Sweep */}
            <div style={{
              position: "absolute", inset: 0, borderRadius: "50%", overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", top: "50%", left: "50%",
                width: "50%", height: "50%",
                transformOrigin: "0% 100%",
                transform: `rotate(${scanAngle}deg)`,
                background: "conic-gradient(from 0deg, transparent 0deg, rgba(34,197,94,0.25) 30deg, transparent 30deg)",
              }} />
            </div>
            {/* Center dot */}
            <div style={{ position: "absolute", top: "50%", left: "50%", width: 6, height: 6, borderRadius: "50%", background: "#22c55e", transform: "translate(-50%,-50%)", boxShadow: "0 0 8px #22c55e" }} />
            {/* Zombie blips */}
            {ZOMBIES.map((z, i) => {
              const isFound = detected.find(d => d.name === z.name);
              return (
                <div key={i} style={{
                  position: "absolute",
                  left: `${z.x * 100}%`, top: `${z.y * 100}%`,
                  transform: "translate(-50%,-50%)",
                  transition: "all 0.3s ease",
                }}>
                  <div style={{
                    width: isFound ? 10 : 6, height: isFound ? 10 : 6,
                    borderRadius: "50%",
                    background: isFound ? "#ef4444" : "rgba(34,197,94,0.3)",
                    boxShadow: isFound ? "0 0 12px #ef4444" : "none",
                    transition: "all 0.4s ease",
                  }} />
                  {isFound && (
                    <div style={{
                      position: "absolute", top: -24, left: "50%", transform: "translateX(-50%)",
                      background: "#ef4444", color: "#fff", fontSize: 9, fontWeight: 800,
                      padding: "2px 7px", borderRadius: 4, whiteSpace: "nowrap",
                      animation: "zBlink 0.4s ease",
                    }}>{z.name}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detected list */}
      {detected.length > 0 && (
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 16 }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: "#ef4444", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Zombies Found</div>
          {detected.map((d, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < detected.length-1 ? "1px solid rgba(255,255,255,0.06)" : "none", animation: "zFade 0.4s ease" }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{d.name}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>Unused: {d.days} days</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: "#ef4444" }}>{d.amt}</div>
                <div style={{ fontSize: 9, color: "#22c55e", fontWeight: 700, marginTop: 2 }}>→ Kill Now</div>
              </div>
            </div>
          ))}
        </div>
      )}
      <style>{`
        @keyframes zRadarPulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.4);opacity:0.6} }
        @keyframes zBlink { from{opacity:0;transform:translateX(-50%) scale(0.8)} to{opacity:1;transform:translateX(-50%) scale(1)} }
        @keyframes zFade { from{opacity:0;transform:translateX(8px)} to{opacity:1;transform:translateX(0)} }
      `}</style>
    </div>
  );
}

export default function ZombieDetectorPage() {
  const { openContact } = useModal();

  return (
    <Page>
      <PageHero tag="Product" title="Zombie Detector™" body="AI finds unused subscriptions you forgot about — and kills them. The average consumer has 6 subscriptions they no longer use. They persist because cancellation friction exceeds the cognitive load of $9.99 disappearing monthly. Zombie Detector eliminates that asymmetry permanently." accent="#7c3aed" />

      {/* LIVE DEMO */}
      <section style={{ background: "#0a0a0a", padding: "clamp(48px,7vw,80px) clamp(16px,3.5vw,40px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(16px,3.5vw,40px)" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 16px", background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 100, fontSize: 11, fontWeight: 700, color: "#ef4444", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>
              ● AI Radar — Live
            </div>
            <h2 style={{ fontSize: "clamp(24px,4vw,42px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 14, color: "#fff" }}>Watch the AI hunt your zombies in real time.</h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", maxWidth: 520, margin: "0 auto" }}>The radar sweeps continuously. When a zombie is detected — unused 60+ days — it lights up red. RECEKON fires an alert and presents a one-tap Kill option.</p>
          </div>
          <div style={{ display: "flex", justifyContent: "center", perspective: "1200px" }}>
            <div style={{ transform: "perspective(1200px) rotateY(4deg) rotateX(3deg)", boxShadow: "20px 20px 60px rgba(0,0,0,0.5)", borderRadius: 24, transition: "transform 0.3s ease" }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "perspective(1200px) rotateY(0) rotateX(0)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "perspective(1200px) rotateY(4deg) rotateX(3deg)"; }}>
              <ZombieRadarDemo />
            </div>
          </div>
        </div>
      </section>

      {/* COPY + STATS */}
      <section style={{ background: "#fff", padding: "clamp(48px,7vw,80px) clamp(16px,3.5vw,40px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(16px,3.5vw,40px)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60 }} className="zd-split">
          <div>
            <h2 style={{ fontSize: "clamp(24px,3.5vw,40px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 20 }}>Not a subscription tracker. A subscription terminator.</h2>
            <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.75, marginBottom: 24 }}>Zombie Detector uses AI trained on millions of transaction patterns to identify the subscriptions bleeding your account — then automatically terminates the ones you no longer use. This is not budgeting advice. This is automated financial self-defense.</p>
            {["AI distinguishes true subscriptions from installments and fraud","Cross-references usage signals — streaming logins, software engagement, venue check-ins","Flags subscriptions unused for 30, 60, or 90+ days","Alerts you 3 days before the next charge — before the money leaves","One tap to Kill via Kill Switch™ — merchant blocked permanently at card level"].map((b, i) => (
              <div key={i} style={{ display: "flex", gap: 10, fontSize: 15, color: "#374151", marginBottom: 10, alignItems: "flex-start" }}>
                <span style={{ color: "#22c55e", fontWeight: 700, flexShrink: 0, marginTop: 2 }}>✓</span>{b}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[["$30B+","wasted on forgotten subscriptions in North America annually"],["12.4","avg subscriptions detected per RECEKON user"],["$47.60","avg monthly savings recovered per user"],["94.7%","cancellation success rate — across 50,000+ services"]].map(([n,l],i)=>(
              <div key={i} style={{ padding: "22px 24px", background: i===0?"#0a0a0a":"#f9f9f9", border: i!==0?"1px solid #e5e5e5":"none", borderRadius: 12 }}>
                <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: "-0.04em", color: i===0?"#22c55e":"#0a0a0a" }}>{n}</div>
                <div style={{ fontSize: 13, color: i===0?"rgba(255,255,255,0.5)":"#6b7280", marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <style>{`.zd-split{grid-template-columns:1fr 1fr} @media(max-width:768px){.zd-split{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* EXTENDED COPY */}
      <section style={{ background: "#f9f9f9", padding: "clamp(48px,7vw,80px) clamp(16px,3.5vw,40px)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 clamp(16px,3.5vw,40px)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, marginBottom: 48 }} className="zd-ext">
            <div>
              <h3 style={{ fontSize: "clamp(20px,2.8vw,28px)", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: 14, lineHeight: 1.2 }}>They made cancellation hard on purpose. We made it one tap.</h3>
              <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.8 }}>Subscription companies know that forgotten subscriptions are profitable subscriptions. They make cancellation difficult, hide terms in fine print, and bank on your inertia. Zombie Detector maintains a database of cancellation procedures for over 50,000 services — including the ones that require phone calls, the ones with hidden flows, and the ones that need follow-up escalation. You tap Kill. We handle everything else.</p>
            </div>
            <div>
              <h3 style={{ fontSize: "clamp(20px,2.8vw,28px)", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: 14, lineHeight: 1.2 }}>Performance-based pricing: we only profit when you profit.</h3>
              <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.8 }}>No monthly fees. No premium tiers. No hidden charges. We charge 15–20% of what we actually save you. If Zombie Detector identifies $500 in annual subscription waste but fails to cancel anything, you pay nothing. If we successfully cancel $500 in recurring charges, we retain $75–$100. Your financial autonomy is the business model. The incentive alignment is deliberate.</p>
            </div>
          </div>

          {/* Process steps */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              { n:"01", t:"Connect & monitor", d:"RECEKON connects to your bank and immediately begins cataloguing every recurring charge. Setup takes 60 seconds." },
              { n:"02", t:"AI detects dormancy", d:"Every subscription is cross-referenced against usage signals. Anything unused for 30, 60, or 90+ days is flagged." },
              { n:"03", t:"Alert before renewal", d:"You receive an alert 3 days before the next charge — with the option to Kill before the money leaves." },
              { n:"04", t:"One tap. Gone.", d:"Kill Switch™ blocks the merchant at the card level. The subscription can never charge you again." },
            ].map((step, i) => (
              <div key={i} style={{ display: "flex", gap: 20, paddingBottom: i<3?28:0, marginBottom: i<3?28:0, borderBottom: i<3?"1px solid #e5e5e5":"none" }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#0a0a0a", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, flexShrink: 0 }}>{step.n}</div>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 6 }}>{step.t}</div>
                  <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.7 }}>{step.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`.zd-ext{grid-template-columns:1fr 1fr} @media(max-width:768px){.zd-ext{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* Onboarding flow */}
      <section style={{ background: "#f9f9f9", padding: "clamp(56px,8vw,96px) clamp(16px,3.5vw,40px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>What setup looks like</p>
          <h2 style={{ fontSize: "clamp(26px,3.5vw,42px)", fontWeight: 800, letterSpacing: "-0.025em", color: "#0a0a0a", marginBottom: 14 }}>
            First zombie found in under 60 seconds.
          </h2>
          <p style={{ fontSize: 16, color: "#6b7280", lineHeight: 1.75, maxWidth: 540, marginBottom: 48 }}>
            Zombie Detector doesn't ask you to set anything up. It starts scanning the moment your bank connects. The question isn't whether it'll find something — it's how many.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }} className="feat-grid">
            {[
              { n:"1", icon:"🏦", title:"Connect bank", time:"0:30", body:"Plaid OAuth. Read-only. No password stored. Tap 'Connect' and it's done." },
              { n:"2", icon:"📡", title:"Scan begins", time:"0:31", body:"Zombie Detector starts analyzing every recurring charge the millisecond your account links." },
              { n:"3", icon:"🎯", title:"First zombie surfaces", time:"0:58", body:"Average: 58 seconds to first zombie. Most users have 4–6. They've been bleeding money for months." },
              { n:"4", icon:"✅", title:"Report delivered", time:"1:20", body:"Full list: name, amount, last-used date, monthly cost. Yours to act on — or let Kill Switch™ handle automatically." },
            ].map((s, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid #e5e5e5", borderRadius: 16, padding: "22px 20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#0a0a0a", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800 }}>{s.n}</div>
                  <code style={{ fontSize: 10, fontWeight: 800, color: "#22c55e", fontFamily: "monospace", background: "#f0fdf4", padding: "2px 7px", borderRadius: 4 }}>{s.time}</code>
                </div>
                <div style={{ fontSize: 22, marginBottom: 10 }}>{s.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: "#0a0a0a", marginBottom: 7 }}>{s.title}</div>
                <p style={{ margin: 0, fontSize: 13, color: "#6b7280", lineHeight: 1.65 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ZOMBIE: BLEEDING TICKER STAT ROW ── */}
      {/* Design: Stark #1a0000 blood-dark background. Stats are displayed as "X per user" inline sentences,
          not boxed grid — reads like a news ticker / damage report. Red accent instead of green. */}
      <section style={{ background: "#100808", padding: "clamp(40px,5vw,56px) clamp(16px,3.5vw,40px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444", boxShadow: "0 0 10px #ef4444" }} />
            <span style={{ fontSize: 10, fontWeight: 800, color: "#ef4444", letterSpacing: "0.2em", textTransform: "uppercase" }}>Damage report — real averages</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }} className="zd-ticker">
            {[
              { stat: "$240", context: "per month leaking out at the moment of first detection — before Zombie Detector ran." },
              { stat: "4.3", context: "zombie subscriptions found per user, on average. All of them quietly charging. None of them noticed." },
              { stat: "58 seconds", context: "to your first zombie surfaced after your bank connects. The scan starts immediately." },
            ].map((row, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "baseline", gap: "clamp(16px,3vw,32px)",
                padding: "clamp(18px,2.5vw,26px) 0",
                borderBottom: i < 2 ? "1px solid rgba(239,68,68,0.1)" : "none",
                flexWrap: "wrap",
              }}>
                <div style={{ fontSize: "clamp(36px,5vw,64px)", fontWeight: 900, letterSpacing: "-0.05em", color: "#ef4444", lineHeight: 1, flexShrink: 0 }}>{row.stat}</div>
                <div style={{ fontSize: "clamp(14px,1.8vw,17px)", color: "rgba(255,255,255,0.45)", lineHeight: 1.6, maxWidth: 520 }}>{row.context}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ZOMBIE: FULL-WIDTH ALTERNATING DARK ROWS deep copy ── */}
      {/* Design: Two arguments presented as alternating full-bleed sections — first #111 (near-black),
          second #1a0a1a (dark purple tint). Each is a 60/40 text/visual split with a live inline "evidence" block.
          Completely different from TaxLink's magazine layout and PG's centered manifesto. */}
      <section style={{ background: "#111", padding: "clamp(56px,8vw,96px) clamp(16px,3.5vw,40px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: "clamp(32px,5vw,64px)", alignItems: "center" }} className="zd-arg">
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, color: "#ef4444", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 20 }}>The cancellation architecture</div>
              <h3 style={{ fontSize: "clamp(22px,3.2vw,38px)", fontWeight: 900, letterSpacing: "-0.04em", color: "#fff", lineHeight: 1.1, marginBottom: 24 }}>They designed the cancel flow to break you.</h3>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.9, marginBottom: 16 }}>
                Subscription companies have a word for you: a churner. Keeping you is more profitable than acquiring new customers — so they invest in making cancellation painful. The phone call you have to make. The "pause instead of cancel" dark pattern. The retention offer that buys them another 90 days. The confirmation email that never arrives.
              </p>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.9 }}>
                Every friction point is a revenue protection mechanism built specifically to outlast your resolve. Zombie Detector doesn't negotiate with the cancellation flow. Kill Switch™ blocks the charge at the card level. The merchant doesn't get another attempt.
              </p>
            </div>
            {/* Evidence block */}
            <div style={{ background: "#0a0a0a", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 14, padding: "22px 20px" }}>
              <div style={{ fontSize: 10, fontWeight: 800, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>Cancellation obstacles — tracked</div>
              {[
                { label: "Phone-call-only cancellation", n: "2,847 services" },
                { label: "Hidden cancel button", n: "14,200 services" },
                { label: "\"Pause\" redirect dark pattern", n: "9,400 services" },
                { label: "Retention offer before confirm", n: "31,000 services" },
              ].map((r, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none", gap: 12 }}>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.4 }}>{r.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 800, color: "#ef4444", flexShrink: 0 }}>{r.n}</span>
                </div>
              ))}
              <div style={{ marginTop: 14, padding: "10px 12px", background: "rgba(239,68,68,0.08)", borderRadius: 8 }}>
                <div style={{ fontSize: 11, color: "#ef4444", fontWeight: 700 }}>Kill Switch™ bypasses all of them.</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 3 }}>Card-level block. No merchant interaction required.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "#0e0814", padding: "clamp(56px,8vw,96px) clamp(16px,3.5vw,40px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 3fr", gap: "clamp(32px,5vw,64px)", alignItems: "center" }} className="zd-arg">
            {/* Evidence block — left this time */}
            <div style={{ background: "#0a0a0a", border: "1px solid rgba(124,58,237,0.25)", borderRadius: 14, padding: "22px 20px" }}>
              <div style={{ fontSize: 10, fontWeight: 800, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>The sub-threshold pricing map</div>
              {[
                { price: "$4.99", label: "Below human evaluation threshold" },
                { price: "$9.99", label: "Classic 'harmless' sub price" },
                { price: "$14.99", label: "Month-end noise — easy to ignore" },
              ].map((r, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: "#7c3aed", letterSpacing: "-0.04em" }}>{r.price}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", textAlign: "right", maxWidth: 160, lineHeight: 1.4 }}>{r.label}</div>
                </div>
              ))}
              <div style={{ marginTop: 14, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 14 }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: "#fff" }}>× 4.3 zombies = <span style={{ color: "#ef4444" }}>$47.60/mo leaking</span></div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 3 }}>Avg across detected users</div>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, color: "#7c3aed", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 20 }}>Attention economics</div>
              <h3 style={{ fontSize: "clamp(22px,3.2vw,38px)", fontWeight: 900, letterSpacing: "-0.04em", color: "#fff", lineHeight: 1.1, marginBottom: 24 }}>You're not forgetful. The system is predatory.</h3>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.9, marginBottom: 16 }}>
                A $14.99 charge at month-end doesn't trigger alarm bells. Neither does $9.99. Or $4.99. That's the architecture — price at the threshold where humans stop evaluating and start ignoring. Multiply that across 6 services you no longer use. It's not a memory problem. It's a deliberate exploitation of attention economics.
              </p>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.9 }}>
                Zombie Detector removes human attention from the equation entirely. It doesn't wait for you to notice. It watches every charge, every cycle, cross-referencing against usage signals you never had to track manually.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ZOMBIE: HORIZONTAL FEATURE CARDS with colored left bar ── */}
      {/* Design: White background. Each feature is a wide horizontal card (not 4-col grid).
          Left side: colored accent bar + icon. Right: title + body. Stack of 4.
          Reads like a spec sheet or capability list — very different from TaxLink's rows-on-dark or PG's 2x2. */}
      <section style={{ background: "#fff", padding: "clamp(56px,8vw,88px) clamp(16px,3.5vw,40px)" }}>
        <div style={{ maxWidth: 920, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 12 }}>
            <div>
              <p style={{ fontSize: 10, fontWeight: 800, color: "#9ca3af", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 10 }}>The kill stack</p>
              <h2 style={{ fontSize: "clamp(22px,3.2vw,36px)", fontWeight: 900, letterSpacing: "-0.04em", color: "#0a0a0a", margin: 0 }}>Four systems built to end subscriptions permanently.</h2>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { icon: "🤖", color: "#7c3aed", title: "AI recurring charge detection", tag: "0.3% misclassification rate", body: "Trained on millions of transaction patterns. Distinguishes subscriptions from installments, fraud, and one-time charges. If it looks like a subscription, it is flagged. If it isn't, it's left alone." },
              { icon: "📡", color: "#2563eb", title: "Usage-signal correlation", tag: "Streaming · Software · Venue", body: "Streaming logins, software engagement, venue check-ins — cross-referenced against the subscription cycle. No logins in 60 days? The charge is classified as a zombie and flagged immediately." },
              { icon: "☠️", color: "#ef4444", title: "Kill Switch™", tag: "Card-level · Permanent", body: "Tap Kill. The merchant is blocked at the card level. No call center. No hold music. No confirmation email that may or may not arrive. The subscription cannot charge you again — ever." },
              { icon: "📧", color: "#16a34a", title: "Auto-cancellation email", tag: "Follow-up in 48hrs", body: "For merchants requiring a formal cancellation, Zombie Detector writes and sends it automatically. If they don't respond within 48 hours, we escalate. You never touch the thread." },
            ].map((f, i) => (
              <div key={i} style={{ display: "flex", background: "#fafafa", border: "1px solid #e5e5e5", borderRadius: 14, overflow: "hidden" }}>
                <div style={{ width: 6, background: f.color, flexShrink: 0 }} />
                <div style={{ display: "flex", gap: 20, padding: "20px 24px", alignItems: "flex-start", width: "100%" }} className="zd-hcard">
                  <div style={{ fontSize: 28, flexShrink: 0, marginTop: 2 }}>{f.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 7, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 15, fontWeight: 800, color: "#0a0a0a" }}>{f.title}</span>
                      <span style={{ fontSize: 10, fontWeight: 700, color: f.color, background: `${f.color}12`, border: `1px solid ${f.color}25`, padding: "2px 9px", borderRadius: 100, letterSpacing: "0.04em" }}>{f.tag}</span>
                    </div>
                    <p style={{ margin: 0, fontSize: 14, color: "#6b7280", lineHeight: 1.75 }}>{f.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ZOMBIE: FINAL CTA — full-width dark, left-anchored, violent contrast ── */}
      {/* Design: Full-bleed black. Giant number top-left. Copy center-left. CTA right side of split.
          Feels like a threat assessment report closing. Very different from TaxLink (green bg) and PG (centered dark). */}
      <section style={{ background: "#0a0a0a", padding: "clamp(56px,8vw,96px) clamp(16px,3.5vw,40px)", borderTop: "1px solid #1a1a1a" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="zd-split">
            <div>
              <div style={{ fontSize: "clamp(64px,10vw,120px)", fontWeight: 900, letterSpacing: "-0.06em", color: "rgba(239,68,68,0.12)", lineHeight: 1, marginBottom: -8 }}>$571</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", marginBottom: 28 }}>Average first-year savings recovered per user</div>
              <h2 style={{ fontSize: "clamp(22px,3.2vw,36px)", fontWeight: 900, letterSpacing: "-0.04em", color: "#fff", lineHeight: 1.15, marginBottom: 16 }}>Stop paying for things you stopped using months ago.</h2>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.8, margin: 0 }}>
                Zombie Detector finds every subscription bleeding your account, surfaces them in 58 seconds, and kills them permanently. We charge 15–20% of what we save you. If we find nothing, the bill is zero.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ padding: "24px", background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)", borderRadius: 14 }}>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 6 }}>Performance-based pricing</div>
                <div style={{ fontSize: 15, color: "#fff", fontWeight: 700, lineHeight: 1.6 }}>15–20% of savings recovered.<br/>Zero if nothing found.</div>
              </div>
              <button
                onClick={() => openContact("I want Zombie Detector to find what I'm leaking.")}
                style={{ background: "#ef4444", color: "#fff", border: "none", borderRadius: 10, padding: "18px 40px", fontSize: 17, fontWeight: 900, cursor: "pointer", fontFamily: "inherit", letterSpacing: "-0.01em" }}
              >
                Find My Zombies →
              </button>
              <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.2)", textAlign: "center" }}>Connect in 60 seconds. First zombie surfaces before you finish reading this page.</p>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .zd-split{grid-template-columns:1fr 1fr}
        @media(max-width:768px){.zd-split{grid-template-columns:1fr!important}}
        .zd-ext{grid-template-columns:1fr 1fr}
        @media(max-width:768px){.zd-ext{grid-template-columns:1fr!important}}
        .zd-ticker{flex-direction:column}
        .zd-arg{grid-template-columns:3fr 2fr}
        @media(max-width:820px){.zd-arg{grid-template-columns:1fr!important}}
        .zd-hcard{flex-direction:row}
        @media(max-width:480px){.zd-hcard{flex-direction:column!important}}
        .feat-grid{grid-template-columns:repeat(4,1fr)}
        @media(max-width:900px){.feat-grid{grid-template-columns:1fr 1fr!important}}
        @media(max-width:500px){.feat-grid{grid-template-columns:1fr!important}}
      `}</style>
    </Page>
  );
}
