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

const STEPS = [
  { t: "Bank connected via Plaid",      d: "Read-only OAuth. No passwords stored. 30 seconds from tap to connected.",                                                                           icon: "🏦", color: "#3b82f6", tag: "30 seconds",  n: "00:00" },
  { t: "Kill Switch™ scans immediately", d: "The moment your bank is linked, Kill Switch™ begins scanning all recurring charges — no configuration needed.",                                    icon: "🔍", color: "#f59e0b", tag: "42 seconds",  n: "00:42" },
  { t: "Zombies surface",               d: "Within 68 seconds, RECEKON shows every subscription you're being charged — sorted by last-used date. Most users see at least 4 they'd forgotten.", icon: "⛔", color: "#ef4444", tag: "68 seconds",  n: "01:08" },
  { t: "One tap to cancel",             d: "Tap 'Cancel'. Kill Switch™ sends the cancellation request via the merchant's official API. No login. No hold music. Confirmation in seconds.",    icon: "✓",  color: "#22c55e", tag: "91 seconds",  n: "01:31" },
  { t: "First cancellation confirmed",  d: "111 seconds from opening RECEKON to a confirmed cancellation receipt in your vault. The subscription cannot renew.",                               icon: "🎉", color: "#22c55e", tag: "111 seconds", n: "01:51" },
];

function KillSwitchTimeline() {
  const [active, setActive]       = useState(0);
  const [mouse, setMouse]         = useState({ x: 0, y: 0 });
  const [hovered, setHovered]     = useState<number | null>(null);
  const [progress, setProgress]   = useState(0);
  const [paused, setPaused]       = useState(false);
  const sectionRef                = useRef<HTMLDivElement>(null);
  const timerRef                  = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-advance every 2.8s
  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setActive(a => (a + 1) % STEPS.length);
      setProgress(0);
    }, 2800);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused]);

  // Progress bar tick
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setProgress(p => Math.min(p + 1, 100)), 28);
    return () => clearInterval(t);
  }, [active, paused]);

  // Mouse tilt on section
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 2;
    setMouse({ x, y });
  };

  const step = STEPS[active];

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMouse({ x: 0, y: 0 })}
      style={{ background: "#0a0a0a", padding: "clamp(64px,9vw,112px) clamp(16px,3.5vw,40px)", overflow: "hidden" }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>First use</p>
          <h2 style={{ fontSize: "clamp(26px,3.5vw,46px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#fff", marginBottom: 14, lineHeight: 1.05 }}>
            First connection to first cancellation.<br/><span style={{ color: "#22c55e" }}>Under three minutes.</span>
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.45)", lineHeight: 1.75, maxWidth: 500, margin: "0 auto" }}>
            This is the exact sequence. No tutorial. No setup checklist. The value appears before most apps finish loading.
          </p>
        </div>

        {/* 3D card stage */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }} className="ks-tl-split">

          {/* Left: step list */}
          <div className="ks-tl-steplist" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {STEPS.map((s, i) => {
              const isActive = i === active;
              const isDone   = i < active;
              return (
                <div
                  key={i}
                  onClick={() => { setActive(i); setProgress(0); setPaused(true); }}
                  style={{
                    display: "flex", alignItems: "center", gap: 14,
                    padding: "14px 18px", borderRadius: 14, cursor: "pointer",
                    background: isActive ? "rgba(255,255,255,0.06)" : "transparent",
                    border: `1px solid ${isActive ? "rgba(255,255,255,0.12)" : "transparent"}`,
                    transition: "all 0.25s ease",
                    transform: isActive ? "translateX(4px)" : "translateX(0)",
                  }}
                >
                  {/* Icon bubble */}
                  <div style={{
                    width: 44, height: 44, borderRadius: "50%", flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 18,
                    background: isDone ? `${s.color}20` : isActive ? `${s.color}18` : "rgba(255,255,255,0.04)",
                    border: `2px solid ${isDone || isActive ? s.color + "50" : "rgba(255,255,255,0.08)"}`,
                    boxShadow: isActive ? `0 0 16px ${s.color}30` : "none",
                    transition: "all 0.3s ease",
                  }}>
                    {isDone ? <span style={{ fontSize: 14, color: s.color, fontWeight: 900 }}>✓</span> : s.icon}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                      <span style={{ fontSize: 13, fontWeight: 800, color: isActive ? "#fff" : isDone ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.35)", transition: "color 0.2s" }}>{s.t}</span>
                      <code style={{ fontSize: 9, fontWeight: 800, color: s.color, background: `${s.color}15`, padding: "2px 7px", borderRadius: 4, flexShrink: 0 }}>{s.tag}</code>
                    </div>
                    {/* Progress bar on active */}
                    {isActive && !paused && (
                      <div style={{ height: 2, background: "rgba(255,255,255,0.08)", borderRadius: 1, overflow: "hidden", marginTop: 4 }}>
                        <div style={{ height: "100%", width: `${progress}%`, background: s.color, borderRadius: 1, transition: "width 0.03s linear" }} />
                      </div>
                    )}
                  </div>

                  {/* Connector dot */}
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: isActive ? s.color : isDone ? `${s.color}60` : "rgba(255,255,255,0.1)", boxShadow: isActive ? `0 0 8px ${s.color}` : "none", transition: "all 0.3s", flexShrink: 0 }} />
                </div>
              );
            })}

            {/* Pause / resume */}
            <button
              onClick={() => setPaused(p => !p)}
              style={{ marginTop: 8, alignSelf: "flex-start", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "7px 14px", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)", cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.04em" }}
            >
              {paused ? "▶ Resume" : "⏸ Pause"}
            </button>
          </div>

          {/* Right: 3D floating card */}
          <div
            className="ks-tl-card"
            style={{
              perspective: "900px",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <div
              style={{
                transform: `rotateY(${mouse.x * 10}deg) rotateX(${-mouse.y * 7}deg) translateZ(0)`,
                transition: "transform 0.12s ease-out",
                transformStyle: "preserve-3d",
                width: "100%",
                maxWidth: 420,
              }}
            >
              {/* Main 3D card */}
              <div style={{
                background: "linear-gradient(135deg, #111 0%, #0d0d0d 100%)",
                border: `1px solid ${step.color}30`,
                borderRadius: 24,
                padding: "36px 32px",
                boxShadow: `0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.06), 0 0 60px ${step.color}15`,
                position: "relative",
                overflow: "hidden",
                transformStyle: "preserve-3d",
                transition: "border-color 0.4s ease, box-shadow 0.4s ease",
              }}>

                {/* Glow orb behind */}
                <div style={{
                  position: "absolute", top: -60, right: -60,
                  width: 200, height: 200, borderRadius: "50%",
                  background: `radial-gradient(circle, ${step.color}25 0%, transparent 70%)`,
                  pointerEvents: "none",
                  transition: "background 0.4s ease",
                }} />

                {/* Step counter */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    {STEPS.map((_, i) => (
                      <div key={i} style={{
                        width: i === active ? 20 : 6, height: 6, borderRadius: 3,
                        background: i === active ? step.color : i < active ? `${STEPS[i].color}50` : "rgba(255,255,255,0.1)",
                        transition: "all 0.3s ease",
                      }} />
                    ))}
                  </div>
                  <code style={{ fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.25)", fontFamily: "monospace" }}>{step.n}</code>
                </div>

                {/* Icon */}
                <div style={{
                  width: 72, height: 72, borderRadius: 20, marginBottom: 24,
                  background: `${step.color}15`,
                  border: `2px solid ${step.color}35`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 32,
                  boxShadow: `0 8px 32px ${step.color}20`,
                  transition: "all 0.4s ease",
                  transform: "translateZ(20px)",
                }}>
                  {step.icon}
                </div>

                {/* Title */}
                <div style={{ transform: "translateZ(10px)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                    <h3 style={{ margin: 0, fontSize: "clamp(16px,2vw,22px)", fontWeight: 800, letterSpacing: "-0.02em", color: "#fff" }}>{step.t}</h3>
                  </div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `${step.color}15`, border: `1px solid ${step.color}30`, borderRadius: 100, padding: "4px 12px", marginBottom: 20 }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: step.color, animation: "recekonDot 1.5s infinite" }} />
                    <span style={{ fontSize: 10, fontWeight: 800, color: step.color, letterSpacing: "0.06em", textTransform: "uppercase" }}>{step.tag}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.75 }}>{step.d}</p>
                </div>

                {/* Bottom edge shine */}
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
                  background: `linear-gradient(90deg, transparent, ${step.color}60, transparent)`,
                  transition: "background 0.4s ease",
                }} />
              </div>

              {/* Shadow plane */}
              <div style={{
                height: 24, margin: "0 24px",
                background: `radial-gradient(ellipse at center, ${step.color}20 0%, transparent 70%)`,
                borderRadius: "50%",
                filter: "blur(8px)",
                transition: "background 0.4s ease",
              }} />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ marginTop: 64, background: "#111", border: "1px solid #1e1e1e", borderRadius: 16, padding: "24px 32px", display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }} className="ks-tl-bottom">
          <div style={{ fontSize: 36 }}>⚡</div>
          <div>
            <div style={{ fontSize: 17, fontWeight: 800, color: "#fff", marginBottom: 4 }}>111 seconds. First zombie killed.</div>
            <p style={{ margin: 0, fontSize: 14, color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>No tutorial. No setup wizard. No CSV to upload. The product is the onboarding — because value this immediate needs no explanation.</p>
          </div>
        </div>
      </div>
      <style>{`
        .ks-tl-split { grid-template-columns: 1fr 1fr; }
        .ks-tl-steplist { order: 1; }
        .ks-tl-card { order: 2; }
        @media (max-width: 768px) {
          .ks-tl-split { grid-template-columns: 1fr !important; }
          .ks-tl-bottom { padding: 20px 20px !important; }
          /* Show 3D card first on mobile — visual proof before steps */
          .ks-tl-steplist { order: 2 !important; }
          .ks-tl-card { order: 1 !important; }
        }
      `}</style>
    </section>
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

      {/* Onboarding flow — 3D live */}
      <KillSwitchTimeline />
    </Page>
  );
}
