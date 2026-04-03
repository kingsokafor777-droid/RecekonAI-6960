import { useEffect, useRef, useState } from "react";
import { AgentScene } from "./AgentScene";

/* ─────────────────────────────────────────────────────────────
   RECEKON HERO — KnotAPI-style centered phone mockup layout
   Phone in center, floating icons around it, mint/green tones
   ───────────────────────────────────────────────────────────── */

/* Floating 3D-style decorative cards / icons */
function FloatingCard({ style, children }: { style: React.CSSProperties; children: React.ReactNode }) {
  return (
    <div style={{
      position: "absolute",
      background: "#fff",
      borderRadius: 16,
      boxShadow: "0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)",
      padding: "12px 16px",
      border: "1px solid rgba(0,0,0,0.06)",
      ...style,
    }}>
      {children}
    </div>
  );
}

/* The phone frame with app UI inside */
function PhoneMockup() {
  const [killedIdxs, setKilledIdxs] = useState<number[]>([]);
  const txns = [
    { name: "Netflix", amount: "-$15.99", tag: "ZOMBIE",      tagColor: "#ef4444", tagBg: "#fef2f2", killable: true },
    { name: "Target • 4 SKUs matched",  amount: "-$54.32", tag: "RECONCILED",  tagColor: "#16a34a", tagBg: "#f0fdf4", killable: false },
    { name: "Adobe CC",   amount: "-$54.99", tag: "ZOMBIE",   tagColor: "#ef4444", tagBg: "#fef2f2", killable: true },
    { name: "Amazon • USB Cable", amount: "-$18.99", tag: "MATCHED", tagColor: "#2563eb", tagBg: "#eff6ff", killable: false },
    { name: "Hulu",       amount: "-$17.99", tag: "ZOMBIE",   tagColor: "#ef4444", tagBg: "#fef2f2", killable: true },
  ];

  return (
    <div style={{
      width: 300,
      background: "#1a1a1a",
      borderRadius: 44,
      padding: "14px 12px",
      boxShadow: "0 40px 80px rgba(0,0,0,0.22), 0 0 0 1px rgba(255,255,255,0.06) inset",
      position: "relative",
      zIndex: 3,
    }}>
      {/* Notch */}
      <div style={{ width: 100, height: 28, background: "#1a1a1a", borderRadius: 20, margin: "0 auto 6px", position: "relative", zIndex: 10 }}>
        <div style={{ width: 60, height: 16, background: "#111", borderRadius: 10, margin: "0 auto", marginTop: 4 }} />
      </div>

      {/* Screen */}
      <div style={{ background: "#fff", borderRadius: 32, overflow: "hidden", minHeight: 560 }}>
        {/* Status bar */}
        <div style={{ background: "#fff", padding: "10px 20px 4px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 13, fontWeight: 700 }}>9:41</span>
          <span style={{ fontSize: 11 }}>▪ ▪ ▪</span>
        </div>

        {/* App header */}
        <div style={{ padding: "6px 20px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #f0f0f0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 28, height: 28, background: "#0a0a0a", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 11L5 4L8.5 7.5L12 2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-0.03em" }}>RECEKON</span>
          </div>
          <div style={{ fontSize: 10, color: "#9ca3af" }}>✕</div>
        </div>

        {/* Content */}
        <div style={{ padding: "16px 16px" }}>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 3 }}>Monthly Leak Found</div>
              <div style={{ fontSize: 30, fontWeight: 900, letterSpacing: "-0.04em", color: "#ef4444" }}>$272.43</div>
            </div>
            <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, padding: "5px 10px", fontSize: 11, color: "#16a34a", fontWeight: 700 }}>
              {3 - killedIdxs.length} Zombies
            </div>
          </div>

          {/* Transactions */}
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {txns.map((t, i) => {
              const killed = killedIdxs.includes(i);
              return (
                <div key={i} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "8px 10px", borderRadius: 10,
                  background: killed ? "#f0fdf4" : t.tagBg,
                  border: `1px solid ${killed ? "#bbf7d0" : t.tagColor + "25"}`,
                  opacity: killed ? 0.65 : 1,
                  transition: "all 0.3s ease",
                }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: killed ? "#16a34a" : "#0a0a0a", flex: 1, paddingRight: 6 }}>
                    {killed ? "✓ Cancelled" : t.name}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
                    {!killed && (
                      <span style={{ fontSize: 9, fontWeight: 800, color: t.tagColor, border: `1px solid ${t.tagColor}50`, borderRadius: 4, padding: "1px 5px", letterSpacing: "0.04em" }}>
                        {t.tag}
                      </span>
                    )}
                    <span style={{ fontSize: 11, fontWeight: 700, color: killed ? "#16a34a" : t.tagColor, fontFamily: "monospace" }}>{t.amount}</span>
                    {t.killable && !killed && (
                      <button onClick={() => setKilledIdxs(p => [...p, i])} style={{
                        background: "#ef4444", color: "#fff", border: "none",
                        borderRadius: 5, padding: "2px 7px", fontSize: 9, fontWeight: 800,
                        cursor: "pointer", letterSpacing: "0.02em",
                      }}>Kill</button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Status bar */}
          <div style={{ marginTop: 12, padding: "8px 10px", background: "#f9f9f9", borderRadius: 8, border: "1px solid #e5e5e5", display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block", flexShrink: 0, animation: "knDot 1.8s infinite" }} />
            <span style={{ fontSize: 10, fontWeight: 600, color: "#374151" }}>Stitching Engine — Processing 3 receipts</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Isometric credit card decoration */
function IsoCreditCard({ style }: { style?: React.CSSProperties }) {
  return (
    <div style={{ position: "relative", ...style }}>
      <svg width="110" height="86" viewBox="0 0 110 86" fill="none">
        {/* Shadow */}
        <ellipse cx="55" cy="78" rx="42" ry="8" fill="rgba(0,0,0,0.1)" />
        {/* Card body */}
        <rect x="8" y="14" width="94" height="60" rx="10" fill="#1a1a2e" />
        <rect x="8" y="14" width="94" height="60" rx="10" fill="url(#cardGrad)" />
        {/* Chip */}
        <rect x="20" y="28" width="18" height="14" rx="3" fill="#f5c518" />
        <rect x="22" y="30" width="14" height="10" rx="2" fill="#e8b010" />
        {/* Lines on card */}
        <rect x="20" y="52" width="50" height="5" rx="2" fill="rgba(255,255,255,0.3)" />
        <rect x="20" y="62" width="30" height="4" rx="2" fill="rgba(255,255,255,0.2)" />
        {/* Logo area */}
        <circle cx="84" cy="34" r="9" fill="rgba(255,255,255,0.15)" />
        {/* RECEKON mark */}
        <path d="M80 34 L82.5 29 L85.5 32 L88 27" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* Bottom circle badge */}
        <circle cx="28" cy="76" r="16" fill="white" />
        <circle cx="28" cy="76" r="10" fill="#22c55e" opacity="0.9" />
        <path d="M24 76 L27 79 L33 73" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <defs>
          <linearGradient id="cardGrad" x1="8" y1="14" x2="102" y2="74">
            <stop stopColor="#1a1a2e" />
            <stop offset="1" stopColor="#2d3561" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/* Coin icon */
function CoinIcon({ size = 48, color = "#f5c518" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <ellipse cx="24" cy="38" rx="18" ry="6" fill="rgba(0,0,0,0.1)" />
      <circle cx="24" cy="22" r="18" fill={color} />
      <circle cx="24" cy="22" r="14" fill={color === "#f5c518" ? "#fbbf24" : color} />
      <circle cx="24" cy="22" r="10" fill={color} />
      <text x="24" y="27" textAnchor="middle" fontSize="14" fontWeight="800" fill="rgba(0,0,0,0.35)" fontFamily="sans-serif">$</text>
    </svg>
  );
}

/* Receipt icon */
function ReceiptIcon() {
  return (
    <svg width="44" height="52" viewBox="0 0 44 52" fill="none">
      <rect x="2" y="2" width="40" height="46" rx="6" fill="white" stroke="#e5e5e5" strokeWidth="1.5" />
      <rect x="8" y="12" width="28" height="3" rx="1.5" fill="#e5e5e5" />
      <rect x="8" y="19" width="20" height="3" rx="1.5" fill="#e5e5e5" />
      <rect x="8" y="26" width="24" height="3" rx="1.5" fill="#e5e5e5" />
      <rect x="8" y="33" width="28" height="2" rx="1" fill="#22c55e" opacity="0.6" />
      <path d="M28 38 L31 41 L36 35" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add("visible"); }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return ref;
}

export function HeroSection() {
  const [vis, setVis] = useState(false);
  useEffect(() => { setTimeout(() => setVis(true), 80); }, []);
  const officeRef = useReveal();

  return (
    <section style={{ background: "#fff", overflow: "visible" }}>

      {/* ── HERO: two-column — left copy, right phone mockup with floaters ── */}
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "80px 40px 100px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 60,
        alignItems: "center",
      }} className="hero-main-grid">

        {/* ── LEFT: Copy ── */}
        <div style={{
          opacity: vis ? 1 : 0,
          transform: vis ? "none" : "translateY(24px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}>
          <h1 className="kn-display" style={{ marginBottom: 22 }}>
            Stop leaking money.<br />
            <span style={{ color: "#22c55e" }}>Know every dollar.</span><br />
            Down to the SKU.
          </h1>
          <p className="kn-body" style={{ maxWidth: 460, marginBottom: 36, color: "#374151" }}>
            RECEKON's AI agents reconcile every bank transaction with every receipt automatically — finding your zombie subscriptions, matched SKUs, and tax deductions without you lifting a finger.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button className="kn-btn-dark" onClick={() => document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })}>
              Get Started <span>›</span>
            </button>
            <button className="kn-btn-ghost" onClick={() => document.getElementById("solution")?.scrollIntoView({ behavior: "smooth" })}>
              See how it works ›
            </button>
          </div>

          {/* Stats row */}
          <div style={{ marginTop: 48, paddingTop: 28, borderTop: "1px solid #e5e5e5", display: "flex", gap: 40, flexWrap: "wrap" }}>
            {[
              { n: "$3.4B+", l: "in zombie spend/month" },
              { n: "$272",   l: "avg waste found on day 1" },
              { n: "97.4%",  l: "SKU matching accuracy" },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.03em", color: "#0a0a0a" }}>{s.n}</div>
                <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Phone + floating elements ── */}
        <div
          className="hero-phone-col"
          style={{
            opacity: vis ? 1 : 0,
            transform: vis ? "none" : "translateY(32px)",
            transition: "opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: 620,
          }}
        >
          {/* Soft green blob background — exactly like KnotAPI video */}
          <div style={{
            position: "absolute",
            width: 420, height: 420,
            background: "radial-gradient(circle, rgba(34,197,94,0.12) 0%, rgba(34,197,94,0.04) 50%, transparent 80%)",
            borderRadius: "50%",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
          }} />

          {/* Subtle green hexagon shape behind phone */}
          <div style={{
            position: "absolute",
            width: 280, height: 280,
            background: "rgba(34,197,94,0.07)",
            borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
            top: "55%", left: "52%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
          }} />

          {/* Credit card — bottom left */}
          <div style={{
            position: "absolute",
            bottom: 60, left: -10,
            zIndex: 4,
            animation: "heroFloat1 3.5s ease-in-out infinite",
          }}>
            <IsoCreditCard />
          </div>

          {/* Coin 1 — top right */}
          <div style={{
            position: "absolute",
            top: 60, right: 20,
            zIndex: 4,
            animation: "heroFloat2 4s ease-in-out infinite",
          }}>
            <CoinIcon size={52} color="#f5c518" />
          </div>

          {/* Coin 2 — mid right (smaller) */}
          <div style={{
            position: "absolute",
            top: 130, right: -10,
            zIndex: 4,
            animation: "heroFloat3 3s ease-in-out infinite",
            opacity: 0.75,
          }}>
            <CoinIcon size={36} color="#d4a015" />
          </div>

          {/* Receipt — top left */}
          <div style={{
            position: "absolute",
            top: 80, left: 10,
            zIndex: 4,
            animation: "heroFloat1 4.5s ease-in-out infinite 0.5s",
          }}>
            <ReceiptIcon />
          </div>

          {/* Floating metric card — top */}
          <FloatingCard style={{
            top: 30, left: "50%",
            transform: "translateX(-50%)",
            zIndex: 6,
            animation: "heroFloat2 3.8s ease-in-out infinite 0.3s",
            display: "flex", alignItems: "center", gap: 10,
            whiteSpace: "nowrap",
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", display: "inline-block", animation: "knDot 1.8s infinite" }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: "#0a0a0a" }}>3 zombies killed today</span>
          </FloatingCard>

          {/* Floating savings card — bottom right */}
          <FloatingCard style={{
            bottom: 100, right: -20,
            zIndex: 6,
            animation: "heroFloat3 4.2s ease-in-out infinite 0.8s",
          }}>
            <div style={{ fontSize: 10, color: "#9ca3af", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 3 }}>Saved this month</div>
            <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-0.04em", color: "#22c55e" }}>+$312.40</div>
          </FloatingCard>

          {/* The phone */}
          <div style={{ position: "relative", zIndex: 3 }}>
            <PhoneMockup />
          </div>
        </div>
      </div>

      {/* Trusted by strip */}
      <div style={{ borderTop: "1px solid #e5e5e5", borderBottom: "1px solid #e5e5e5", padding: "22px 40px", background: "#fafafa" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", gap: 40, flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.1em", textTransform: "uppercase", flexShrink: 0 }}>Powered by</span>
          {["Plaid", "Stripe Issuing", "AWS", "OpenAI", "Snowflake"].map((l, i) => (
            <span key={i} style={{ fontSize: 15, fontWeight: 800, letterSpacing: "-0.02em", color: "#c8c8c8", whiteSpace: "nowrap" }}>{l}</span>
          ))}
        </div>
      </div>

      {/* ── Agent Office Section ── */}
      <div ref={officeRef} className="kn-reveal" style={{ paddingTop: 72 }}>
        <div style={{ textAlign: "center", padding: "0 40px 28px" }}>
          <p className="kn-overline" style={{ marginBottom: 10 }}>Your AI team, working 24/7</p>
          <h2 className="kn-h2" style={{ maxWidth: 560, margin: "0 auto 12px" }}>
            10 AI agents in your office.<br />Working while you sleep.
          </h2>
          <p className="kn-body" style={{ maxWidth: 480, margin: "0 auto", color: "#6b7280" }}>
            Each agent has a job. They collaborate, reconcile, and protect your finances — autonomously.
          </p>
        </div>
        <AgentScene />
      </div>

      <style>{`
        @keyframes heroFloat1 {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50% { transform: translateY(-12px) rotate(1deg); }
        }
        @keyframes heroFloat2 {
          0%, 100% { transform: translateY(0px) rotate(2deg); }
          50% { transform: translateY(-10px) rotate(-1deg); }
        }
        @keyframes heroFloat3 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .hero-main-grid { grid-template-columns: 1fr 1fr; }
        @media(max-width: 900px) {
          .hero-main-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .hero-phone-col { min-height: 480px !important; }
        }
        @media(max-width: 900px) {
          .hero-phone-col {
            display: flex !important;
            min-height: 420px !important;
            height: 420px !important;
          }
        }
        @media(max-width: 600px) {
          .hero-phone-col {
            display: flex !important;
            min-height: 380px !important;
            height: 380px !important;
            transform: scale(0.85);
            transform-origin: top center;
            margin-bottom: -48px !important;
          }
        }
      `}</style>
    </section>
  );
}
