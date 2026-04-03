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
      <PageHero tag="Product" title="Zombie Detector™" body="AI surveillance agent that monitors every recurring charge and flags subscriptions you've forgotten about. It finds the money bleeding out — silently, every month." accent="#7c3aed" />

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
            <h2 style={{ fontSize: "clamp(24px,3.5vw,40px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 20 }}>The average household has 6 zombies. You have no idea they exist.</h2>
            <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.75, marginBottom: 24 }}>Zombie Detector runs 24/7, comparing your transaction history against usage signals to find subscriptions that renew automatically but nobody uses.</p>
            {["Monitors all recurring transactions automatically","Cross-references with usage data where available","Flags subscriptions unused for 30, 60, or 90+ days","Sends you an alert before the next renewal","One tap to Kill or Keep"].map((b, i) => (
              <div key={i} style={{ display: "flex", gap: 10, fontSize: 15, color: "#374151", marginBottom: 10, alignItems: "flex-start" }}>
                <span style={{ color: "#22c55e", fontWeight: 700, flexShrink: 0, marginTop: 2 }}>✓</span>{b}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[["$3.4B+","in zombie spend globally every month"],["6","avg zombie subscriptions per household"],["$200+","avg household loses monthly to zombies"],["91 days","avg time before zombie is discovered — by RECEKON"]].map(([n,l],i)=>(
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
              <h3 style={{ fontSize: "clamp(20px,2.8vw,28px)", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: 14, lineHeight: 1.2 }}>Subscription companies count on your memory being worse than their billing system.</h3>
              <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.8 }}>The average consumer has 6 subscriptions they no longer use. They persist because the friction of cancellation exceeds the cognitive load of $9.99 disappearing monthly. Zombie Detector eliminates that asymmetry permanently. Your AI surveillance agent never forgets, never sleeps, and has zero tolerance for money leaving without permission.</p>
            </div>
            <div>
              <h3 style={{ fontSize: "clamp(20px,2.8vw,28px)", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: 14, lineHeight: 1.2 }}>This isn't a budgeting tool. It's a financial immune system.</h3>
              <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.8 }}>Budgeting tools show you what happened. Zombie Detector prevents it from happening again. It runs at the infrastructure layer — below the transaction, before the charge — giving you pre-authorization visibility that has never existed for consumers. By the time you get the alert, we've already drafted the cancellation. One tap confirms it.</p>
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

      {/* CTA */}
      <section style={{ background: "#0a0a0a", padding: "clamp(48px,6vw,72px) clamp(16px,3.5vw,40px)", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", padding: "0 clamp(16px,3.5vw,40px)" }}>
          <h2 style={{ fontSize: "clamp(22px,3.5vw,38px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 16, color: "#fff" }}>Stop the bleeding. Start today.</h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", marginBottom: 28 }}>Zombie Detector is live in Phase 1. Get early access and kill your first zombie within 48 hours.</p>
          <button onClick={() => openContact("I want to use Zombie Detector™ to find unused subscriptions.")} style={{ background: "#fff", color: "#0a0a0a", border: "none", borderRadius: 10, padding: "15px 36px", fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Get Early Access →</button>
        </div>
      </section>
    </Page>
  );
}
