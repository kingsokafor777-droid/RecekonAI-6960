import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { Page } from "../components/Layout";
import { useModal } from "../components/ModalContext";
import { Hero3D } from "../components/Hero3D";
import { AgentScene } from "../components/AgentScene";
import { DeveloperSection } from "../components/DeveloperSection";

function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.style.transitionDelay = `${delay}s`; el.classList.add("visible"); }
    }, { threshold: 0.08 });
    obs.observe(el); return () => obs.disconnect();
  }, [delay]);
  return ref;
}

/* ── Ticker ─────────────────────────────────────────── */
function Ticker() {
  const items = [
    "🔴 Zombie killed — Netflix $15.99/mo",
    "✓ Receipt matched — Target $54.32 · 4 SKUs",
    "📊 Tax report — $2,847 in deductions",
    "⛔ Merchant blocked — Gym cancelled",
    "🔴 Zombie killed — Adobe $54.99/mo",
    "✓ Receipt matched — Amazon $89.99 · 3 SKUs",
    "💚 $312 saved this month",
    "⚠️ Price spike — Internet +18%",
    "🏷️ SKU data — Whole Foods $127 · 22 items",
  ];
  const doubled = [...items, ...items];
  return (
    <div style={{ background: "#0a0a0a", overflow: "hidden", padding: "11px 0" }}>
      <div style={{ display: "flex", gap: 60, animation: "ticker 30s linear infinite", whiteSpace: "nowrap" }}>
        {doubled.map((t, i) => (
          <span key={i} style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 500, flexShrink: 0, display: "flex", alignItems: "center", gap: 8 }}>
            {t}
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "inline-block" }}/>
          </span>
        ))}
      </div>
      <style>{`@keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }`}</style>
    </div>
  );
}

/* ── Trusted By sliding logo strip ─────────────────── */
// Real company logos as SVG wordmarks + continuous infinite scroll
// Left/right fade masks, clean white background, "TRUSTED BY" label top-left

const LOGOS = [
  // SVG wordmark for each company
  {
    name: "Plaid",
    svg: (
      <svg height="28" viewBox="0 0 80 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="22" fontFamily="Arial,sans-serif" fontWeight="800" fontSize="22" letterSpacing="-1" fill="#111">Plaid</text>
      </svg>
    ),
  },
  {
    name: "Stripe",
    svg: (
      <svg height="28" viewBox="0 0 70 28" fill="none">
        <text x="0" y="22" fontFamily="Arial,sans-serif" fontWeight="800" fontSize="22" letterSpacing="-1" fill="#635BFF">Stripe</text>
      </svg>
    ),
  },
  {
    name: "American Express",
    svg: (
      <svg height="28" viewBox="0 0 165 28" fill="none">
        <text x="0" y="22" fontFamily="Arial,sans-serif" fontWeight="800" fontSize="18" letterSpacing="0.5" fill="#006FCF">AMERICAN EXPRESS</text>
      </svg>
    ),
  },
  {
    name: "PayPal",
    svg: (
      <svg height="28" viewBox="0 0 90 28" fill="none">
        <text x="0" y="22" fontFamily="Arial,sans-serif" fontWeight="900" fontSize="22" letterSpacing="-0.5" fill="#003087">Pay</text>
        <text x="40" y="22" fontFamily="Arial,sans-serif" fontWeight="900" fontSize="22" letterSpacing="-0.5" fill="#009cde">Pal</text>
      </svg>
    ),
  },
  {
    name: "Snowflake",
    svg: (
      <svg height="28" viewBox="0 0 115 28" fill="none">
        <text x="0" y="22" fontFamily="Arial,sans-serif" fontWeight="700" fontSize="21" letterSpacing="-0.5" fill="#29B5E8">Snowflake</text>
      </svg>
    ),
  },
  {
    name: "AWS",
    svg: (
      <svg height="28" viewBox="0 0 55 28" fill="none">
        <text x="0" y="22" fontFamily="Arial,sans-serif" fontWeight="900" fontSize="22" letterSpacing="0.5" fill="#FF9900">AWS</text>
      </svg>
    ),
  },
  {
    name: "OpenAI",
    svg: (
      <svg height="28" viewBox="0 0 80 28" fill="none">
        <text x="0" y="22" fontFamily="Arial,sans-serif" fontWeight="700" fontSize="21" letterSpacing="-0.5" fill="#111">OpenAI</text>
      </svg>
    ),
  },
  {
    name: "Visa",
    svg: (
      <svg height="28" viewBox="0 0 55 28" fill="none">
        <text x="0" y="22" fontFamily="Arial,sans-serif" fontWeight="900" fontSize="24" letterSpacing="0" fill="#1A1F71">VISA</text>
      </svg>
    ),
  },
  {
    name: "Mastercard",
    svg: (
      <svg height="28" viewBox="0 0 120 28" fill="none">
        <text x="0" y="22" fontFamily="Arial,sans-serif" fontWeight="700" fontSize="20" letterSpacing="-0.3" fill="#EB001B">master</text>
        <text x="62" y="22" fontFamily="Arial,sans-serif" fontWeight="700" fontSize="20" letterSpacing="-0.3" fill="#F79E1B">card</text>
      </svg>
    ),
  },
  {
    name: "Intuit",
    svg: (
      <svg height="28" viewBox="0 0 70 28" fill="none">
        <text x="0" y="22" fontFamily="Arial,sans-serif" fontWeight="700" fontSize="22" letterSpacing="-0.5" fill="#0077C5">Intuit</text>
      </svg>
    ),
  },
];

function TrustedBy() {
  // Double the logos for seamless infinite loop
  const doubled = [...LOGOS, ...LOGOS];

  return (
    <div style={{
      borderTop: "1px solid #e5e5e5",
      borderBottom: "1px solid #e5e5e5",
      background: "#fff",
      padding: "36px 0 32px",
      overflow: "hidden",
    }}>
      {/* Label */}
      <div style={{
        textAlign: "center",
        fontSize: 11,
        fontWeight: 700,
        color: "#9ca3af",
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        marginBottom: 28,
      }}>
        Trusted By
      </div>

      {/* Sliding strip container */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        {/* Left fade mask */}
        <div style={{
          position: "absolute", top: 0, left: 0, bottom: 0, width: 100,
          background: "linear-gradient(to right, #ffffff, transparent)",
          zIndex: 2, pointerEvents: "none",
        }} />
        {/* Right fade mask */}
        <div style={{
          position: "absolute", top: 0, right: 0, bottom: 0, width: 100,
          background: "linear-gradient(to left, #ffffff, transparent)",
          zIndex: 2, pointerEvents: "none",
        }} />

        {/* Scrolling row */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 0,
          animation: "trustedSlide 28s linear infinite",
          width: "max-content",
        }}>
          {doubled.map((logo, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 56px",
                opacity: 0.55,
                transition: "opacity 0.2s",
                cursor: "default",
                flexShrink: 0,
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "0.55")}
            >
              {logo.svg}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes trustedSlide {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        /* Pause on hover */
        .trusted-strip:hover div[style*="trustedSlide"] {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}

/* ── Hero ───────────────────────────────────────────── */
function HeroSection() {
  const [vis] = useState(true); // always visible — use CSS animation instead
  const [, navigate] = useLocation();

  return (
    <section style={{ background: "#fff", overflow: "visible" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(40px,6vw,80px) clamp(16px,3.5vw,40px) clamp(28px,4vw,40px)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }} className="hero-split">
        {/* Left */}
        <div style={{ animation: "heroFadeUp 0.7s ease both" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 100, padding: "5px 14px", marginBottom: 20 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", animation: "recekonDot 1.8s infinite" }}/>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#22c55e", letterSpacing: "0.08em", textTransform: "uppercase" }}>Autonomous Financial Control</span>
          </div>
          <h1 className="kn-display" style={{ marginBottom: 22, wordBreak: "break-word", overflowWrap: "anywhere" }}>
            Your financial decisions,{" "}
            <span style={{ color: "#22c55e" }}>handled.</span>
          </h1>
          <p className="kn-body" style={{ maxWidth: 460, marginBottom: 36, color: "#374151" }}>
            RECEKON doesn't track your money. It protects it. AI agents that detect, decide, and act — cancelling zombie subscriptions, reconciling every receipt to the SKU, generating tax deductions, and optimizing spend. While you sleep.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 40 }} className="hero-btns">
            <button className="kn-btn-dark" onClick={() => navigate("/#waitlist")} style={{ flex: "1 1 auto", minWidth: 140 }}>Get Started ›</button>
            <button className="kn-btn-ghost" onClick={() => navigate("/products")} style={{ flex: "1 1 auto", minWidth: 140 }}>See how it works ›</button>
          </div>
          <div style={{ paddingTop: 24, borderTop: "1px solid #e5e5e5", display: "flex", gap: "clamp(20px,5vw,40px)", flexWrap: "wrap" }}>
            {[["$3.4B+","consumer money lost/month to waste"],["$272","recovered on average, day one"],["97.4%","receipt-to-SKU match accuracy"]].map(([n,l],i) => (
              <div key={i}>
                <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.03em", color: "#0a0a0a" }}>{n}</div>
                <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — 3D illustration */}
        <div style={{ opacity: vis ? 1 : 0, transition: "opacity 1s ease 0.2s" }} className="hero-3d-col">
          <Hero3D />
        </div>
      </div>

      {/* Trusted by — sliding logo strip */}
      <TrustedBy />

      <style>{`
        @keyframes heroFadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .hero-split{grid-template-columns:1fr 1fr;}
        @media(max-width:900px){
          .hero-split { grid-template-columns:1fr!important; padding:40px 16px 0!important; gap:0!important; }
          .hero-3d-col { width:100%; overflow:visible!important; margin-bottom:0; }
          .hero-btns button { flex:1 1 140px!important; }
        }
        @media(max-width:480px){
          .hero-3d-col { transform:scale(0.78); transform-origin:top center; margin-bottom:-100px; }
        }
      `}</style>
    </section>
  );
}

/* ── 3-feature snapshot ─────────────────────────────── */
function FeaturesSnapshot() {
  const [, navigate] = useLocation();
  const t = useReveal(0);
  return (
    <section style={{ padding: "clamp(48px,8vw,100px) clamp(16px,3.5vw,40px)", background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(16px,3.5vw,40px)" }}>
        <div ref={t} className="kn-reveal" style={{ textAlign: "center", marginBottom: 60 }}>
          <p className="kn-overline" style={{ marginBottom: 12 }}>The execution engine</p>
          <h2 className="kn-h2" style={{ maxWidth: 600, margin: "0 auto 16px" }}>Other apps tell you what happened.<br/>RECEKON fixes it.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }} className="feat-grid">
          {[
            { icon: "🧵", tag: "Stitching Engine™", title: "Every dollar. Identified.", body: "Every bank transaction matched to its receipt, every receipt broken to the SKU. Not 'Walmart $54'. Tide Pods $18.99. Organic Milk $5.49. The full picture, automatically.", cta: "See how →", href: "/products/stitching-engine" },
            { icon: "⛔", tag: "Kill Switch™",       title: "Subscriptions cancelled. Not flagged.", body: "Most apps show you the problem. RECEKON cancels it. One tap. No logins. No hold music. Works across 4,000+ merchants.", cta: "See how →", href: "/products/kill-switch" },
            { icon: "📊", tag: "TaxLink™",           title: "Tax season. Already done.", body: "Every deductible expense auto-categorized to CRA, IRS, or HMRC standards — receipt attached, confidence scored, audit-ready before you ask.", cta: "See how →", href: "/products/tax-link" },
          ].map((f,i) => (
            <div key={i} ref={useReveal(i*0.1)} className="kn-reveal kn-card" style={{ cursor: "pointer" }} onClick={() => navigate(f.href.split("#")[0])}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>{f.icon}</div>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>{f.tag}</div>
              <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", color: "#0a0a0a", marginBottom: 10 }}>{f.title}</div>
              <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.65, marginBottom: 16 }}>{f.body}</p>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#0a0a0a" }}>{f.cta} →</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`.feat-grid{grid-template-columns:repeat(3,1fr)} @media(max-width:768px){.feat-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

/* ── Agent office ───────────────────────────────────── */
function AgentOffice() {
  const t = useReveal(0);
  return (
    <section style={{ background: "#f9f9f9", paddingTop: 72 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px 28px", textAlign: "center" }} ref={t} className="kn-reveal">
        <p className="kn-overline" style={{ marginBottom: 10 }}>The autonomous layer</p>
        <h2 className="kn-h2" style={{ maxWidth: 580, margin: "0 auto 12px" }}>10 AI agents. No dashboards. No action required.</h2>
        <p className="kn-body" style={{ maxWidth: 500, margin: "0 auto", color: "#6b7280" }}>
          Each agent has exactly one job. Together they form a closed loop: observe, decide, act, optimize. Continuously. Without interruption.
        </p>
      </div>
      <AgentScene />
    </section>
  );
}

/* ── Architecture Layers ────────────────────────────── */
function ArchitectureLayers() {
  const t = useReveal(0);
  const layers = [
    {
      n: "01",
      icon: "📡",
      label: "Data Intake",
      title: "Every signal. Captured.",
      body: "RECEKON connects to your bank accounts, cards, and subscriptions via read-only APIs. Every transaction, every recurring charge, every receipt in your inbox — observed in real time. Nothing misses the net.",
      color: "#3b82f6",
    },
    {
      n: "02",
      icon: "🧠",
      label: "Decision Engine",
      title: "Inefficiency, surfaced before you feel it.",
      body: "The intelligence layer. Cross-references transaction patterns, price histories, subscription usage, and tax categories to detect what's costing you money. Identifies the action before you've even thought to ask.",
      color: "#22c55e",
      examples: ["You're overpaying $38/mo on a plan you barely use", "This merchant has overcharged you 3 times this year", "You qualify for $1,247 in home office deductions"],
    },
    {
      n: "03",
      icon: "🤖",
      label: "Agent Execution",
      title: "Decided. Acted. Done.",
      body: "This is the separation. RECEKON doesn't surface the problem and wait. It cancels, reports, claims, and optimizes — with your authorization — before you ever open an app. This is what 'autonomous' actually means.",
      color: "#f59e0b",
      highlight: true,
    },
    {
      n: "04",
      icon: "🔁",
      label: "Continuous Loop",
      title: "Gets sharper every cycle.",
      body: "Every action feeds the model. Every match improves the next one. Every cancelled subscription makes the next detection faster. The system compounds — your financial defense strengthens automatically over time.",
      color: "#7c3aed",
    },
  ];

  return (
    <section style={{ background: "#0a0a0a", padding: "clamp(64px,8vw,112px) clamp(16px,3.5vw,40px)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(16px,3.5vw,40px)" }}>
        <div ref={t} className="kn-reveal" style={{ textAlign: "center", marginBottom: 72 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 16 }}>System architecture</p>
          <h2 style={{ fontSize: "clamp(32px,4.5vw,56px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#fff", maxWidth: 640, margin: "0 auto 20px" }}>
            Four layers. One closed loop.<br/><span style={{ color: "#22c55e" }}>Autonomous.</span>
          </h2>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.45)", lineHeight: 1.8, maxWidth: 520, margin: "0 auto" }}>
            Most fintech stops at layer 2 — showing you the problem. RECEKON runs all four. Continuously.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }} className="feat-grid">
          {layers.map((layer, i) => (
            <div key={i} ref={useReveal(i * 0.08)} className="kn-reveal" style={{
              padding: "32px 32px",
              background: layer.highlight ? `${layer.color}10` : "rgba(255,255,255,0.025)",
              border: `1px solid ${layer.highlight ? layer.color + "35" : "rgba(255,255,255,0.07)"}`,
              borderRadius: 20,
              position: "relative",
              overflow: "hidden",
            }}>
              {/* Layer number */}
              <div style={{ position: "absolute", top: 24, right: 24, fontSize: 48, fontWeight: 900, color: "rgba(255,255,255,0.04)", letterSpacing: "-0.04em", fontFamily: "monospace", lineHeight: 1 }}>
                {layer.n}
              </div>

              {/* Icon + label */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <div style={{ width: 44, height: 44, background: `${layer.color}15`, border: `1px solid ${layer.color}30`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
                  {layer.icon}
                </div>
                <div>
                  <div style={{ fontSize: 9, fontWeight: 800, color: layer.color, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 2 }}>Layer {layer.n}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.6)", letterSpacing: "0.01em" }}>{layer.label}</div>
                </div>
              </div>

              <h3 style={{ fontSize: "clamp(18px,2vw,22px)", fontWeight: 800, letterSpacing: "-0.02em", color: "#fff", marginBottom: 14 }}>{layer.title}</h3>
              <p style={{ margin: 0, fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.8, marginBottom: layer.examples ? 20 : 0 }}>{layer.body}</p>

              {layer.examples && (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {layer.examples.map((ex, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <div style={{ width: 5, height: 5, borderRadius: "50%", background: layer.color, flexShrink: 0, marginTop: 7 }} />
                      <span style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.55, fontStyle: "italic" }}>"{ex}"</span>
                    </div>
                  ))}
                </div>
              )}

              {layer.highlight && (
                <div style={{ marginTop: 20, display: "inline-flex", alignItems: "center", gap: 6, background: `${layer.color}20`, border: `1px solid ${layer.color}40`, borderRadius: 100, padding: "4px 12px" }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: layer.color, animation: "recekonDot 1.8s infinite" }} />
                  <span style={{ fontSize: 10, fontWeight: 800, color: layer.color, textTransform: "uppercase", letterSpacing: "0.08em" }}>This is where RECEKON diverges</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom connector */}
        <div style={{ textAlign: "center", marginTop: 56, padding: "32px", background: "rgba(34,197,94,0.05)", border: "1px solid rgba(34,197,94,0.12)", borderRadius: 20 }}>
          <p style={{ margin: 0, fontSize: "clamp(18px,2.5vw,26px)", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.4 }}>
            Your financial decisions.<br/>
            <span style={{ color: "#22c55e" }}>Executed. Not suggested.</span>
            <br/>
            <span style={{ fontSize: "clamp(13px,1.5vw,16px)", fontWeight: 400, color: "rgba(255,255,255,0.4)", letterSpacing: 0 }}>
              RECEKON acts. Every cycle. Every day. No input needed.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── Social proof — KnotAPI Customer Story style ─────── */
function SocialProof() {
  const t = useReveal(0);
  const [, navigate] = useLocation();
  const { openContact } = useModal();

  return (
    <section style={{ background: "#f8f9fb", padding: "clamp(64px,8vw,100px) clamp(16px,3.5vw,40px)" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 clamp(16px,3.5vw,40px)" }}>

        {/* ── CUSTOMER STORY header ── */}
        <div ref={t} className="kn-reveal" style={{ marginBottom: 64 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 56 }}>
            <div style={{
              width: 36, height: 36,
              background: "#0a0a0a",
              borderRadius: 8,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ fontSize: 18, color: "#fff", lineHeight: 1, fontFamily: "Georgia, serif", fontWeight: 900, marginTop: -2 }}>❝</span>
            </div>
            <span style={{
              fontSize: 12, fontWeight: 800, letterSpacing: "0.18em",
              textTransform: "uppercase", color: "#0a0a0a",
            }}>Customer Story</span>
          </div>

          {/* ── Floating 3D app icon cards ── */}
          <div style={{
            position: "relative",
            height: 260,
            marginBottom: 56,
          }}>
            {/* Light background blob */}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(135deg, #f0f4ff 0%, #e8eef8 100%)",
              borderRadius: 24,
              overflow: "hidden",
            }}>
              {/* Dot grid */}
              <div style={{
                position: "absolute", inset: 0,
                backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }} />
            </div>

            {/* Ghost placeholder cards */}
            <div style={{ position: "absolute", top: "18%", right: "28%", width: 72, height: 72, background: "rgba(0,0,0,0.04)", borderRadius: 18 }} />
            <div style={{ position: "absolute", bottom: "14%", left: "28%", width: 56, height: 56, background: "rgba(0,0,0,0.03)", borderRadius: 14 }} />

            {/* Green floating dots */}
            <div style={{ position: "absolute", top: "40%", right: "35%", width: 9, height: 9, borderRadius: "50%", background: "#22c55e", opacity: 0.7, animation: "csDot1 3s ease-in-out infinite" }} />
            <div style={{ position: "absolute", bottom: "28%", left: "35%", width: 7, height: 7, borderRadius: "50%", background: "#22c55e", opacity: 0.5, animation: "csDot2 4s ease-in-out infinite 0.8s" }} />

            {/* Main card 1 — RECEKON icon — left, bigger, prominent */}
            <div style={{
              position: "absolute",
              top: "50%", left: "14%",
              transform: "translateY(-50%)",
              animation: "csFloat1 4s ease-in-out infinite",
            }}>
              <div style={{
                width: 110, height: 110,
                background: "#fff",
                borderRadius: 26,
                boxShadow: "0 20px 60px rgba(0,0,0,0.14), 0 4px 16px rgba(0,0,0,0.08)",
                display: "flex", alignItems: "center", justifyContent: "center",
                transform: "perspective(600px) rotateY(8deg) rotateX(-4deg)",
                border: "1px solid rgba(0,0,0,0.06)",
              }}>
                {/* RECEKON app icon */}
                <div style={{
                  width: 78, height: 78,
                  background: "#0a0a0a",
                  borderRadius: 18,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="20" r="15" fill="none" stroke="#22c55e" strokeWidth="2.5"/>
                    <path d="M12 28 L16 16 L21 22 L25 14 L28 22" stroke="#22c55e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Main card 2 — RECEKON wordmark — right, slightly smaller */}
            <div style={{
              position: "absolute",
              top: "50%", right: "12%",
              transform: "translateY(-45%)",
              animation: "csFloat2 5s ease-in-out infinite 0.6s",
            }}>
              <div style={{
                width: 130, height: 96,
                background: "#fff",
                borderRadius: 22,
                boxShadow: "0 16px 50px rgba(0,0,0,0.12), 0 4px 14px rgba(0,0,0,0.07)",
                display: "flex", alignItems: "center", justifyContent: "center",
                transform: "perspective(600px) rotateY(-6deg) rotateX(3deg)",
                border: "1px solid rgba(0,0,0,0.06)",
              }}>
                <span style={{
                  fontSize: 22, fontWeight: 900,
                  letterSpacing: "-0.04em", color: "#0a0a0a",
                }}>RECEKON</span>
              </div>
            </div>
          </div>

          {/* ── Quote ── */}
          <p style={{
            fontSize: "clamp(20px, 3vw, 38px)",
            fontWeight: 700,
            letterSpacing: "-0.025em",
            lineHeight: 1.25,
            color: "#0a0a0a",
            maxWidth: 780,
            marginBottom: 32,
          }}>
            "RECEKON makes it effortless for users to optimize their financial decisions. The impact is immediate—helping thousands take control instantly."
          </p>

          {/* ── AI Agent Customer Service card ── */}
          <div
            onClick={() => openContact("I have a question about RECEKON.")}
            style={{
              display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap",
              cursor: "pointer",
            }}
          >
            {/* AI Agent photo with LIVE badge */}
            <div style={{ position: "relative", flexShrink: 0 }}>
              <div style={{
                width: 60, height: 60, borderRadius: "50%",
                overflow: "hidden", border: "2px solid #e5e5e5",
                background: "#f5f5f5",
              }}>
                <img src="/ai-agent-cs.png" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }} />
              </div>
              {/* LIVE badge */}
              <div style={{
                position: "absolute", top: -4, right: -4,
                display: "flex", alignItems: "center", gap: 3,
                background: "#0a0a0a", border: "1.5px solid rgba(34,197,94,0.5)",
                borderRadius: 100, padding: "2px 7px",
              }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 5px #22c55e", animation: "recekonDot 1.5s infinite" }} />
                <span style={{ fontSize: 9, fontWeight: 800, color: "#22c55e", letterSpacing: "0.08em" }}>LIVE</span>
              </div>
            </div>

            <div>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#0a0a0a", letterSpacing: "-0.01em" }}>RECEKON AI Support</div>
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
                <span style={{ fontSize: 12, color: "#22c55e", fontWeight: 600 }}>Online · Available 24/7 · Ask me anything</span>
              </div>
            </div>

            <div style={{ marginLeft: "auto", display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button
                className="kn-btn-ghost"
                onClick={e => { e.stopPropagation(); openContact("I have a question about RECEKON."); }}
              >
                Ask a question →
              </button>
              <button
                className="kn-btn-ghost"
                onClick={e => { e.stopPropagation(); openContact("I'd like to request a demo of RECEKON."); }}
              >
                Request a demo →
              </button>
            </div>
          </div>
        </div>

        {/* ── Stat row ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2 }} className="stat-row">
          {[
            ["$272",   "avg waste found on day 1"],
            ["97.4%",  "SKU match accuracy"],
            ["$2,847", "avg deductions found/user"],
          ].map(([n, l], i) => (
            <div key={i} style={{
              padding: "28px 24px",
              background: i === 1 ? "#0a0a0a" : "#fff",
              borderRadius: 12,
              border: i !== 1 ? "1px solid #e5e5e5" : "none",
            }}>
              <div style={{ fontSize: 36, fontWeight: 900, letterSpacing: "-0.04em", color: i === 1 ? "#22c55e" : "#0a0a0a" }}>{n}</div>
              <div style={{ fontSize: 13, color: i === 1 ? "rgba(255,255,255,0.5)" : "#6b7280", marginTop: 6 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes csFloat1 {
          0%,100% { transform:translateY(-50%) translateY(0); }
          50%      { transform:translateY(-50%) translateY(-12px); }
        }
        @keyframes csFloat2 {
          0%,100% { transform:translateY(-45%) translateY(0); }
          50%      { transform:translateY(-45%) translateY(-10px); }
        }
        @keyframes csDot1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes csDot2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        .stat-row { grid-template-columns: repeat(3,1fr); }
        @media(max-width:600px) { .stat-row { grid-template-columns:1fr!important; } }
      `}</style>
    </section>
  );
}

/* ── Waitlist CTA ───────────────────────────────────── */
function WaitlistCTA() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const t = useReveal(0);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) { setErr("Enter a valid email."); return; }
    setLoading(true); setErr("");
    try {
      const res = await fetch("/api/waitlist", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
      if (res.ok) setDone(true);
      else { const d = await res.json() as { error?: string }; setErr(d.error || "Try again."); }
    } catch { setErr("Network error."); }
    setLoading(false);
  };

  return (
    <section id="waitlist" style={{ background: "#0a0a0a", padding: "clamp(48px,8vw,100px) clamp(16px,3.5vw,40px)" }}>
      <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }} ref={t} className="kn-reveal">
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 100, fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.6)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 28 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block", animation: "knDot 1.8s infinite" }}/>
          Early Access
        </span>
        <h2 style={{ fontSize: "clamp(34px,5vw,60px)", fontWeight: 800, letterSpacing: "-0.035em", color: "#fff", marginBottom: 16, lineHeight: 1.05 }}>
          Your money.<br/><span style={{ color: "#22c55e" }}>Handled.</span>
        </h2>
        <p style={{ fontSize: 17, color: "rgba(255,255,255,0.5)", marginBottom: 40, lineHeight: 1.7 }}>
          Be among the first to deploy an autonomous financial control system. Not a tracker. Not a dashboard. An execution engine.
        </p>
        {!done ? (
          <form onSubmit={submit} style={{ maxWidth: 420, margin: "0 auto", padding: "0 clamp(16px,3.5vw,40px)" }}>
            <div style={{ display: "flex", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, overflow: "hidden", padding: 4, gap: 4, marginBottom: 8 }}>
              <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)}
                style={{ flex: 1, background: "transparent", border: "none", outline: "none", padding: "11px 14px", fontSize: 15, color: "#fff", fontFamily: "inherit" }}/>
              <button type="submit" disabled={loading}
                style={{ background: "#fff", color: "#0a0a0a", border: "none", borderRadius: 8, padding: "11px 22px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", opacity: loading ? 0.7 : 1, whiteSpace: "nowrap" }}>
                {loading ? "..." : "Get Early Access →"}
              </button>
            </div>
            {err && <p style={{ color: "#f87171", fontSize: 13, marginBottom: 8 }}>{err}</p>}
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>No spam. No credit card. Cancel any time.</p>
          </form>
        ) : (
          <div style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", borderRadius: 12, padding: "28px", maxWidth: 360, margin: "0 auto", padding: "0 clamp(16px,3.5vw,40px)" }}>
            <div style={{ fontSize: 28, marginBottom: 10 }}>✓</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#22c55e", marginBottom: 8 }}>You're on the list.</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>We'll reach out when early access opens.</div>
          </div>
        )}
      </div>
      <style>{`@keyframes knDot{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.5);opacity:0.6}}`}</style>
    </section>
  );
}

export default function Home() {
  return (
    <Page>
      <HeroSection />
      <Ticker />
      <FeaturesSnapshot />
      <AgentOffice />
      <ArchitectureLayers />
      <SocialProof />
      <DeveloperSection />
      <WaitlistCTA />
    </Page>
  );
}
