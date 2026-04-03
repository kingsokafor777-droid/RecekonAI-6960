import { useState, useEffect, useRef } from "react";
import { Page, PageHero } from "../../components/Layout";

/* ══════════════════════════════════════════════════════
   RECEKON CARD CONTROL — KnotAPI-style 3D UI visual
   Phone mockup + teal pentagons + isometric card + coins
   Animated multi-step flow inside the phone
   ══════════════════════════════════════════════════════ */

/* ── Teal pentagon blob ───────────────────────────── */
function TealBlob({ width = 160, height = 160, style }: { width?: number; height?: number; style?: React.CSSProperties }) {
  return (
    <div style={{
      width, height,
      background: "linear-gradient(135deg, rgba(34,197,94,0.16) 0%, rgba(167,243,208,0.12) 100%)",
      borderRadius: "38% 62% 55% 45% / 45% 42% 58% 55%",
      ...style,
    }} />
  );
}

/* ── Isometric 3D credit card (KnotAPI style) ─────── */
function IsoCreditCard3D({ style }: { style?: React.CSSProperties }) {
  return (
    <div style={{ position: "relative", ...style }}>
      <svg width="170" height="130" viewBox="0 0 170 130" fill="none">
        {/* Drop shadow */}
        <ellipse cx="85" cy="118" rx="62" ry="10" fill="rgba(0,0,0,0.08)" />

        {/* Card back-left face (dark edge) */}
        <path d="M12 42 L12 88 L72 112 L72 66 Z" fill="#d0d8e8" stroke="#c0c8d8" strokeWidth="0.8" />
        {/* Card bottom face */}
        <path d="M72 112 L158 88 L158 42 L72 66 Z" fill="#e0e8f4" stroke="#c8d4ec" strokeWidth="0.8" />
        {/* Card top face — main visible surface */}
        <path d="M12 42 L72 66 L158 42 L98 18 Z" fill="#f8faff" stroke="#dde8f8" strokeWidth="1" />

        {/* Card body — front-facing rectangle */}
        <rect x="18" y="46" width="136" height="84" rx="10"
          fill="url(#cardBodyGrad)" stroke="#c8d4ec" strokeWidth="1" />

        {/* Gradient for card body */}
        <defs>
          <linearGradient id="cardBodyGrad" x1="18" y1="46" x2="154" y2="130" gradientUnits="userSpaceOnUse">
            <stop stopColor="#e8f0fc" />
            <stop offset="1" stopColor="#d4e4f8" />
          </linearGradient>
        </defs>

        {/* Top colored stripe */}
        <rect x="18" y="46" width="136" height="18" rx="10" fill="#c8ddf8" />
        <rect x="18" y="55" width="136" height="9" fill="#c8ddf8" />

        {/* Chip */}
        <rect x="32" y="76" width="22" height="16" rx="3" fill="#f0c840" stroke="#d4a820" strokeWidth="1" />
        <line x1="32" y1="84" x2="54" y2="84" stroke="#d4a820" strokeWidth="0.8" opacity="0.6" />
        <line x1="43" y1="76" x2="43" y2="92" stroke="#d4a820" strokeWidth="0.8" opacity="0.6" />

        {/* Card number dots */}
        {[0, 1, 2, 3].map(g =>
          [0, 1, 2, 3].map(d => (
            <circle key={`${g}-${d}`} cx={32 + g * 20 + d * 3.5} cy={102} r={1.4}
              fill="#8090b0" opacity="0.5" />
          ))
        )}

        {/* RECEKON logo area */}
        <text x="138" y="68" textAnchor="middle" fontSize="8" fontWeight="800"
          fill="#1a3cff" fontFamily="sans-serif" opacity="0.8">S</text>

        {/* Green glowing button — the kill switch indicator */}
        <circle cx="42" cy="116" r="14" fill="white" stroke="#e0e8f4" strokeWidth="1.5" />
        <circle cx="42" cy="116" r="9" fill="#22c55e" />
        <circle cx="42" cy="116" r="5" fill="#16a34a" />
        {/* Green glow */}
        <circle cx="42" cy="116" r="14" fill="none" stroke="#22c55e" strokeWidth="1.5" opacity="0.4" />

        {/* VISA-style text */}
        <text x="145" y="125" textAnchor="middle" fontSize="10" fontWeight="900"
          fill="#1a3cff" fontFamily="sans-serif" opacity="0.6" letterSpacing="1">RECEKON</text>
      </svg>
    </div>
  );
}

/* ── Line-art isometric coin ─────────────────────── */
function IsoCoin3D({ size = 52, style }: { size?: number; style?: React.CSSProperties }) {
  return (
    <div style={style}>
      <svg width={size} height={size * 1.1} viewBox="0 0 52 58" fill="none">
        <ellipse cx="26" cy="52" rx="18" ry="5" fill="rgba(0,0,0,0.07)" />
        {/* Coin rim/depth */}
        <ellipse cx="26" cy="32" rx="20" ry="6" fill="#c8a200" stroke="#a08000" strokeWidth="1.2" />
        <rect x="6" y="26" width="40" height="6" fill="#c8a200" />
        {/* Coin face */}
        <ellipse cx="26" cy="26" rx="20" ry="6" fill="#f5c518" stroke="#d4a010" strokeWidth="1.5" />
        <ellipse cx="26" cy="26" rx="14" ry="4" fill="#ffd700" stroke="#c8a010" strokeWidth="1" />
        {/* $ symbol */}
        <text x="26" y="29.5" textAnchor="middle" fontSize="8" fontWeight="900"
          fill="rgba(0,0,0,0.35)" fontFamily="sans-serif">$</text>
      </svg>
    </div>
  );
}

/* ── Phone app flow — multi-step RECEKON card control ── */
const STEPS = [
  {
    id: "home",
    render: () => (
      <div style={{ padding: "20px 16px" }}>
        {/* Card visual at top */}
        <div style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #2d3561 100%)",
          borderRadius: 14, padding: "18px 18px", marginBottom: 16,
          boxShadow: "0 8px 24px rgba(26,26,46,0.25)",
        }}>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>RECEKON Virtual Card</div>
          <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
            {[0,1,2,3].map(g=>(
              <div key={g} style={{ display: "flex", gap: 3 }}>
                {[0,1,2,3].map(d=>(
                  <div key={d} style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(255,255,255,0.5)" }} />
                ))}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", marginBottom: 2 }}>Card Balance</div>
              <div style={{ fontSize: 20, fontWeight: 900, color: "#fff", letterSpacing: "-0.03em" }}>$2,841.50</div>
            </div>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e" }} />
          </div>
        </div>

        {/* Quick actions */}
        <div style={{ fontSize: 10, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Quick Controls</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>
          {[
            { icon: "⛔", label: "Block Merchant", color: "#fef2f2", tc: "#ef4444" },
            { icon: "📊", label: "Spend Limits", color: "#eff6ff", tc: "#2563eb" },
            { icon: "🔒", label: "Freeze Card", color: "#f5f3ff", tc: "#7c3aed" },
            { icon: "📋", label: "Set Rules", color: "#f0fdf4", tc: "#16a34a" },
          ].map((a, i) => (
            <div key={i} style={{ background: a.color, borderRadius: 10, padding: "10px 10px", textAlign: "center" }}>
              <div style={{ fontSize: 18, marginBottom: 4 }}>{a.icon}</div>
              <div style={{ fontSize: 10, fontWeight: 700, color: a.tc }}>{a.label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "block",
    render: () => (
      <div style={{ padding: "16px" }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Block Merchant</div>
        {[
          { name: "Netflix", logo: "🎬", status: "active", spend: "$15.99/mo" },
          { name: "Adobe CC", logo: "🎨", status: "active", spend: "$54.99/mo" },
          { name: "Spotify", logo: "🎵", status: "blocked", spend: "$9.99/mo" },
          { name: "DoorDash", logo: "🚗", status: "active", spend: "$34.20/mo" },
        ].map((m, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "9px 10px", borderRadius: 10, marginBottom: 6,
            background: m.status === "blocked" ? "#fef2f2" : "#f9f9f9",
            border: `1px solid ${m.status === "blocked" ? "#fecaca" : "#e5e5e5"}`,
          }}>
            <span style={{ fontSize: 20 }}>{m.logo}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: m.status === "blocked" ? "#ef4444" : "#0a0a0a", textDecoration: m.status === "blocked" ? "line-through" : "none" }}>{m.name}</div>
              <div style={{ fontSize: 9, color: "#9ca3af" }}>{m.spend}</div>
            </div>
            <div style={{
              fontSize: 9, fontWeight: 800,
              padding: "3px 8px", borderRadius: 100,
              background: m.status === "blocked" ? "#fecaca" : "#dcfce7",
              color: m.status === "blocked" ? "#ef4444" : "#16a34a",
              textTransform: "uppercase", letterSpacing: "0.06em",
            }}>
              {m.status === "blocked" ? "Blocked" : "Active"}
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "limits",
    render: () => (
      <div style={{ padding: "16px" }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Spend Limits</div>
        {[
          { cat: "🍔 Dining", limit: 200, used: 142, color: "#22c55e" },
          { cat: "🛒 Groceries", limit: 400, used: 287, color: "#0ea5e9" },
          { cat: "🎮 Entertainment", limit: 50, used: 47, color: "#ef4444" },
          { cat: "⛽ Gas", limit: 150, used: 88, color: "#f59e0b" },
        ].map((c, i) => {
          const pct = (c.used / c.limit) * 100;
          return (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#0a0a0a" }}>{c.cat}</span>
                <span style={{ fontSize: 10, color: "#6b7280" }}>${c.used} / ${c.limit}</span>
              </div>
              <div style={{ height: 7, background: "#f0f0f0", borderRadius: 10, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${pct}%`, background: c.color, borderRadius: 10, transition: "width 1s ease" }} />
              </div>
            </div>
          );
        })}
      </div>
    ),
  },
  {
    id: "rules",
    render: () => (
      <div style={{ padding: "16px" }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Smart Rules</div>
        {[
          { rule: "Block all subscription renewals", on: true, color: "#22c55e" },
          { rule: "Require approval >$200", on: true, color: "#22c55e" },
          { rule: "No gambling categories", on: true, color: "#22c55e" },
          { rule: "Weekend dining cap $80", on: false, color: "#9ca3af" },
          { rule: "Alert on price increase", on: true, color: "#22c55e" },
        ].map((r, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: i < 4 ? "1px solid #f5f5f5" : "none" }}>
            <div style={{ flex: 1, fontSize: 11, color: r.on ? "#0a0a0a" : "#9ca3af" }}>{r.rule}</div>
            {/* Toggle pill */}
            <div style={{
              width: 30, height: 17, borderRadius: 100,
              background: r.on ? "#22c55e" : "#e5e5e5",
              position: "relative", flexShrink: 0,
              transition: "background 0.2s",
            }}>
              <div style={{
                width: 13, height: 13, borderRadius: "50%", background: "#fff",
                position: "absolute", top: 2,
                left: r.on ? 15 : 2,
                transition: "left 0.2s",
                boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
              }} />
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "success",
    render: () => (
      <div style={{ padding: "20px 16px", textAlign: "center" }}>
        <div style={{
          width: 64, height: 64, borderRadius: "50%",
          background: "#f0fdf4", border: "2px solid #bbf7d0",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "20px auto 14px", fontSize: 28,
        }}>✓</div>
        <div style={{ fontSize: 14, fontWeight: 800, color: "#0a0a0a", marginBottom: 6 }}>Card rule applied!</div>
        <div style={{ fontSize: 11, color: "#6b7280", lineHeight: 1.5, marginBottom: 20 }}>
          Netflix is now blocked. It will be declined the next time it tries to charge your card.
        </div>
        <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, padding: "12px", fontSize: 11, color: "#16a34a", fontWeight: 700 }}>
          🔴 Netflix · $15.99/mo · BLOCKED
        </div>
        <div style={{ marginTop: 12, fontSize: 10, color: "#9ca3af" }}>Authorization will be declined instantly</div>
      </div>
    ),
  },
];

/* ── Phone shell ─────────────────────────────────── */
function RECEKONPhoneMockup() {
  const [step, setStep] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    timer.current = setInterval(() => {
      setTransitioning(true);
      setTimeout(() => {
        setStep(s => (s + 1) % STEPS.length);
        setTransitioning(false);
      }, 280);
    }, 3200);
    return () => clearInterval(timer.current);
  }, []);

  const current = STEPS[step];

  return (
    <div style={{
      /* Phone outer shell — same gray as KnotAPI reference */
      width: 260,
      background: "#e2e4e8",
      borderRadius: 44,
      padding: "12px 10px",
      boxShadow: [
        "0 0 0 1px rgba(0,0,0,0.08)",
        "0 2px 0 #c8cacc inset",
        "0 32px 60px rgba(0,0,0,0.15)",
        "0 8px 20px rgba(0,0,0,0.10)",
      ].join(", "),
      position: "relative",
      zIndex: 5,
    }}>
      {/* Gray notch bar at top */}
      <div style={{
        background: "#c8cacc",
        borderRadius: "32px 32px 0 0",
        padding: "9px 18px 7px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: "#1a1a1a" }}>9:41</span>
        <div style={{ width: 80, height: 12, background: "#1a1a1a", borderRadius: 14 }} />
        <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
          <div style={{ width: 14, height: 9, border: "1.5px solid #1a1a1a", borderRadius: 2, position: "relative" }}>
            <div style={{ position: "absolute", inset: 1.5, background: "#1a1a1a", borderRadius: 1 }} />
          </div>
        </div>
      </div>

      {/* White screen */}
      <div style={{
        background: "#fff",
        borderRadius: "0 0 34px 34px",
        minHeight: 460,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}>
        {/* App nav bar */}
        <div style={{
          padding: "12px 16px 10px",
          borderBottom: "1px solid #f0f0f0",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          {/* RECEKON + merchant logo like KnotAPI style */}
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 22, height: 22, background: "#0a0a0a", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                <path d="M2 11L5 4L8.5 7.5L12 2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: "-0.03em" }}>RECEKON</span>
          </div>

          {/* Step dots */}
          <div style={{ display: "flex", gap: 4 }}>
            {STEPS.map((_, i) => (
              <div key={i} style={{
                width: i === step ? 16 : 6, height: 6,
                borderRadius: 100,
                background: i === step ? "#0a0a0a" : "#e5e5e5",
                transition: "all 0.3s ease",
              }} />
            ))}
          </div>

          <span style={{ fontSize: 16, color: "#9ca3af", cursor: "pointer" }}>✕</span>
        </div>

        {/* Screen content — fades between steps */}
        <div style={{
          flex: 1,
          opacity: transitioning ? 0 : 1,
          transform: transitioning ? "translateY(6px)" : "translateY(0)",
          transition: "opacity 0.25s ease, transform 0.25s ease",
        }}>
          {current.render()}
        </div>
      </div>
    </div>
  );
}

/* ── Float animation ─────────────────────────────── */
function FloatEl({ delay = 0, amplitude = 10, children, style }: {
  delay?: number; amplitude?: number;
  children: React.ReactNode; style?: React.CSSProperties;
}) {
  return (
    <div style={{
      animation: `cardCtrlFloat${amplitude} ${3.5 + delay * 0.4}s ease-in-out infinite`,
      animationDelay: `${delay}s`,
      ...style,
    }}>
      {children}
      <style>{`
        @keyframes cardCtrlFloat${amplitude} {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-${amplitude}px); }
        }
      `}</style>
    </div>
  );
}

/* ── Main hero visual ────────────────────────────── */
function CardControlVisual() {
  const [vis, setVis] = useState(false);
  useEffect(() => { setTimeout(() => setVis(true), 80); }, []);

  return (
    <div style={{
      position: "relative",
      width: "100%",
      minHeight: 580,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      opacity: vis ? 1 : 0,
      transition: "opacity 0.8s ease",
    }}>
      {/* Top-right teal pentagon */}
      <div style={{ position: "absolute", top: 20, right: 10, zIndex: 1, animation: "cardCtrlFloat10 4s ease-in-out infinite" }}>
        <TealBlob width={160} height={155} />
      </div>

      {/* Bottom-left teal pentagon */}
      <div style={{ position: "absolute", bottom: 40, left: 10, zIndex: 1, animation: "cardCtrlFloat10 4.5s ease-in-out infinite 0.8s", opacity: 0.75 }}>
        <TealBlob width={120} height={115} style={{ borderRadius: "55% 45% 38% 62% / 42% 58% 42% 58%" }} />
      </div>

      {/* Bottom-left isometric 3D card */}
      <FloatEl delay={0.4} amplitude={9} style={{ position: "absolute", bottom: 55, left: -10, zIndex: 6 }}>
        <IsoCreditCard3D />
      </FloatEl>

      {/* Top-right coin (big) */}
      <FloatEl delay={0.2} amplitude={10} style={{ position: "absolute", top: 50, right: 30, zIndex: 6 }}>
        <IsoCoin3D size={56} />
      </FloatEl>

      {/* Mid-right coin (smaller) */}
      <FloatEl delay={0.9} amplitude={7} style={{ position: "absolute", top: 115, right: 15, zIndex: 5, opacity: 0.8 }}>
        <IsoCoin3D size={38} />
      </FloatEl>

      {/* CENTER — phone mockup */}
      <div style={{
        position: "relative",
        zIndex: 4,
        animation: "cardCtrlPhoneBob 4s ease-in-out infinite",
      }}>
        <RECEKONPhoneMockup />
      </div>

      {/* Bottom floating badge */}
      <div style={{
        position: "absolute",
        bottom: 22, right: 5,
        background: "#fff",
        border: "1px solid rgba(0,0,0,0.07)",
        borderRadius: 12,
        padding: "9px 14px",
        boxShadow: "0 6px 20px rgba(0,0,0,0.09)",
        zIndex: 7,
        animation: "cardCtrlFloat8 3.8s ease-in-out infinite 0.5s",
        display: "flex", alignItems: "center", gap: 8,
        whiteSpace: "nowrap",
      }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
        <span style={{ fontSize: 11, fontWeight: 700, color: "#0a0a0a" }}>Card authorized &lt; 500ms</span>
      </div>

      <style>{`
        @keyframes cardCtrlPhoneBob {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes cardCtrlFloat8 {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════ */
export default function CardUseCasePage() {
  return (
    <Page>
      <PageHero
        tag="Use Case"
        title="Smart Card Control"
        body="Rules you set once. Enforced forever. Every authorization checked against your policies in under 500ms — automatically, permanently, without your involvement."
        accent="#7c3aed"
      />

      {/* ── Hero section: copy left, 3D phone right ── */}
      <section style={{ padding: "clamp(40px,7vw,80px) clamp(16px,3.5vw,40px)", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="cuc-hero-split">
          {/* Left copy */}
          <div>
            <div style={{ display: "inline-block", background: "#f5f3ff", color: "#7c3aed", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 100, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 20, border: "1px solid #ddd6fe" }}>
              Available Phase 2
            </div>
            <h2 style={{ fontSize: "clamp(26px,3.5vw,44px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 20, color: "#0a0a0a" }}>
              Set the rule once.<br/>It enforces forever.
            </h2>
            <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.75, marginBottom: 28 }}>
              The RECEKON Virtual Card is a programmable policy layer over every transaction. You define the rules — spend limits, merchant blocks, category caps. RECEKON enforces them at authorization, in real time, permanently.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
              {[
                { icon: "⛔", t: "Block merchants instantly", d: "Block any merchant ID on your card. They're declined the next time they try to charge you." },
                { icon: "📊", t: "Spend limits by category", d: "Set hard caps on dining, entertainment, groceries. The card enforces it automatically." },
                { icon: "📋", t: "Programmable rules engine", d: "\"Block all subscription renewals\" — one rule, permanent protection." },
                { icon: "🔒", t: "Allow-list mode", d: "Only whitelisted merchants can charge your card. Everyone else gets declined." },
                { icon: "⚡", t: "< 500ms authorization", d: "Real-time decisions. No perceptible delay for the user." },
              ].map((f, i) => (
                <div key={i} style={{ display: "flex", gap: 14, padding: "14px 16px", background: "#f9f9f9", border: "1px solid #e5e5e5", borderRadius: 12 }}>
                  <span style={{ fontSize: 20, flexShrink: 0 }}>{f.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#0a0a0a", marginBottom: 3 }}>{f.t}</div>
                    <div style={{ fontSize: 13, color: "#6b7280" }}>{f.d}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ padding: "16px 20px", background: "#f5f3ff", border: "1px solid #ddd6fe", borderRadius: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#7c3aed", marginBottom: 4 }}>🚀 Phase 2 — Expected Q1 2027</div>
              <p style={{ fontSize: 14, color: "#374151" }}>Join the waitlist to be first in line when it launches.</p>
            </div>
          </div>

          {/* Right — 3D phone mockup */}
          <div className="cuc-phone-col">
            <CardControlVisual />
          </div>
        </div>
        <style>{`.cuc-hero-split{grid-template-columns:1fr 1fr} @media(max-width:900px){.cuc-hero-split{grid-template-columns:1fr!important}.cuc-phone-col{display:none!important}}`}</style>
      </section>

      {/* ── Stats strip ── */}
      <section style={{ background: "#0a0a0a", padding: "clamp(32px,5.5vw,60px) clamp(16px,3.5vw,40px)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 clamp(16px,3.5vw,40px)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 2 }} className="card-stats">
            {[
              { n: "< 500ms", l: "Card authorization time", accent: "#22c55e" },
              { n: "100%",    l: "PCI-DSS Level 1 via Stripe", accent: "#fff" },
              { n: "0",       l: "Raw card numbers ever stored", accent: "#fff" },
              { n: "∞",       l: "Spending rules you can set", accent: "#fff" },
            ].map((s, i) => (
              <div key={i} style={{ padding: "28px 20px", textAlign: "center", borderRight: i < 3 ? "1px solid #1a1a1a" : "none" }}>
                <div style={{ fontSize: 36, fontWeight: 900, letterSpacing: "-0.04em", color: s.accent }}>{s.n}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 8 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <style>{`.card-stats{grid-template-columns:repeat(4,1fr)} @media(max-width:700px){.card-stats{grid-template-columns:repeat(2,1fr)!important}}`}</style>
      </section>

      {/* ── How it works ── */}
      <section style={{ padding: "clamp(40px,7vw,80px) clamp(16px,3.5vw,40px)", background: "#f9f9f9" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 clamp(16px,3.5vw,40px)" }}>
          <h2 style={{ fontSize: "clamp(24px,3.5vw,40px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 48, textAlign: "center" }}>
            How it works
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              { n: "01", t: "Connect your card", d: "RECEKON issues you a virtual card via Stripe Issuing. Takes 60 seconds to provision." },
              { n: "02", t: "Set your rules", d: "Define spend limits, block categories, or create an allow-list. One rule takes 10 seconds to set." },
              { n: "03", t: "RECEKON enforces it", d: "Every authorization request hits our Decision Engine. Rules are checked in < 500ms. Approved or declined instantly." },
              { n: "04", t: "You stay in control", d: "Change rules anytime. Unblock merchants, adjust limits, see every decision in your dashboard." },
            ].map((step, i) => (
              <div key={i} style={{ display: "flex", gap: 24, paddingBottom: i < 3 ? 32 : 0, marginBottom: i < 3 ? 32 : 0, borderBottom: i < 3 ? "1px solid #e5e5e5" : "none" }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#0a0a0a", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, flexShrink: 0 }}>{step.n}</div>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: "#0a0a0a", marginBottom: 8 }}>{step.t}</div>
                  <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.7 }}>{step.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ISO 20022 Infrastructure ── */}
      <section style={{ background: "#0a0a0a", padding: "clamp(56px,8vw,96px) clamp(16px,3.5vw,40px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          {/* Header */}
          <div style={{ maxWidth: 680, marginBottom: 56 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#7c3aed", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 16 }}>Infrastructure</p>
            <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 800, letterSpacing: "-0.025em", color: "#fff", lineHeight: 1.1, marginBottom: 20 }}>
              The global financial system just upgraded its data layer.<br/>
              <span style={{ color: "#7c3aed" }}>Smart Card Control runs on top of it.</span>
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.85 }}>
              The migration to ISO 20022 — now covering 80% of global high-value payments — is transforming financial data from opaque, human-formatted messages into structured, machine-readable intelligence. RECEKON's Smart Card Control is built to consume this. Every authorization decision is sharper, faster, and more precise because the underlying data now says exactly what it means.
            </p>
          </div>

          {/* 4 data signals → 4 card actions */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16, marginBottom: 48 }} className="feat-grid">
            {[
              {
                code: "camt.054",
                name: "Intraday Notification",
                icon: "⚡",
                color: "#7c3aed",
                title: "Real-time charge detection. Sub-second.",
                body: "camt.054 fires a structured debit notification the moment a charge hits your account — not end-of-day. Smart Card Control intercepts it in real time. The rule check runs. The authorization is approved or declined before the merchant's terminal responds.",
              },
              {
                code: "pain.001",
                name: "Payment Initiation",
                icon: "🧠",
                color: "#3b82f6",
                title: "Structured payment context. No guessing.",
                body: "ISO 20022's structured remittance fields carry purpose codes, creditor references, and up to 140 characters of payment context — versus MT's 35-character opaque strings. Smart Card Control reads intent, not just amount. Rules fire on what the payment is for, not just who sent it.",
              },
              {
                code: "camt.053",
                name: "Bank Statement",
                icon: "📊",
                color: "#22c55e",
                title: "Spending patterns built from clean data.",
                body: "End-of-day camt.053 statements feed structured transaction history into RECEKON's Decision Engine. Spend limits self-calibrate. Category patterns sharpen. The more ISO 20022-native data flows in, the more precisely Smart Card Control enforces what you actually want — not a static rule set you set once.",
              },
              {
                code: "pacs.002",
                name: "Payment Status Report",
                icon: "✅",
                color: "#f59e0b",
                title: "Every decision confirmed. Every action audited.",
                body: "pacs.002 returns structured confirmation or rejection codes for every payment decision. Smart Card Control writes these into your audit trail with full ISO-native metadata — timestamp, merchant ID, authorization code, rule triggered. Every action is explainable. Every decline is defensible.",
              },
            ].map((item, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 16,
                padding: "28px 28px",
                borderLeft: `3px solid ${item.color}`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 9, background: `${item.color}15`, border: `1px solid ${item.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <div>
                    <code style={{ fontSize: 11, fontWeight: 800, color: item.color, fontFamily: "monospace", letterSpacing: "0.04em" }}>{item.code}</code>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", marginTop: 1 }}>{item.name}</div>
                  </div>
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 10 }}>{item.title}</div>
                <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.8 }}>{item.body}</p>
              </div>
            ))}
          </div>

          {/* The strategic position */}
          <div style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.18)", borderRadius: 20, padding: "36px 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }} className="dev-split">
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#7c3aed", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>Strategic position</p>
              <h3 style={{ fontSize: "clamp(20px,2.5vw,28px)", fontWeight: 800, letterSpacing: "-0.02em", color: "#fff", marginBottom: 16, lineHeight: 1.2 }}>
                Most institutions are focused on compliance.<br/><span style={{ color: "#7c3aed" }}>RECEKON is focused on the data.</span>
              </h3>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.85, margin: 0 }}>
                Every bank and corporate treasury team is migrating to ISO 20022 to meet the November 2025 SWIFT deadline. They're upgrading systems. Meeting requirements. Ticking boxes.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.12)", borderRadius: 12, padding: "16px 20px" }}>
                <div style={{ fontSize: 10, fontWeight: 800, color: "#ef4444", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Everyone else</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>Upgrades messaging format. Ships compliant. Moves on. The enriched data sits unused in logs.</div>
              </div>
              <div style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)", borderRadius: 12, padding: "16px 20px" }}>
                <div style={{ fontSize: 10, fontWeight: 800, color: "#7c3aed", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>RECEKON</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>Consumes the enriched data as signal. Builds intelligence on top of it. Turns structured financial events into autonomous card control decisions — in real time, at scale.</div>
              </div>
              <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.25)", lineHeight: 1.6, fontStyle: "italic" }}>
                "As ISO 20022 standardizes and enriches global financial data, it unlocks a new layer of intelligence. RECEKON sits on top of this infrastructure — transforming structured financial data into autonomous decision-making systems for consumers."
              </p>
            </div>
          </div>

        </div>
      </section>

    </Page>
  );
}
