import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { useLocation } from "wouter";
import React from "react";
import { useModal } from "./ModalContext";

/* ════════════════════════════════════════════════════════
   RECEKON LAYOUT
   - KnotAPI-style full-width mega dropdown
   - Left: product/feature list with 3D icon tiles
   - Right: animated preview panel (switches per item)
   - Real photo testimonial with LIVE badge
   ════════════════════════════════════════════════════════ */

/* ── Minimal line-art iso icons ─────────────────────── */

/* ── Animated ISO Icons — each tells its own story ── */
/*
  Every icon has:
  1. Continuous idle animation (the "story")
  2. Consistent style: clean line-art, 40px viewBox, green accents
*/

const ANIM_STYLE = `
  @keyframes iso-stitch-link  { 0%,100%{opacity:0;transform:scaleX(0)} 30%,70%{opacity:1;transform:scaleX(1)} }
  @keyframes iso-stitch-box   { 0%,60%{transform:translateY(0)} 80%{transform:translateY(-3px)} 100%{transform:translateY(0)} }
  @keyframes iso-kill-x       { 0%,100%{stroke-dashoffset:20} 50%{stroke-dashoffset:0} }
  @keyframes iso-kill-badge   { 0%,80%{transform:scale(1)} 90%{transform:scale(1.3)} 100%{transform:scale(1)} }
  @keyframes iso-zombie-bob   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
  @keyframes iso-zombie-coin  { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(20deg)} }
  @keyframes iso-zombie-slash { 0%,100%{opacity:1} 50%{opacity:0.3} }
  @keyframes iso-tax-line     { 0%{stroke-dashoffset:30} 60%{stroke-dashoffset:0} 100%{stroke-dashoffset:0} }
  @keyframes iso-tax-check    { 0%,40%{stroke-dashoffset:20;opacity:0} 70%,100%{stroke-dashoffset:0;opacity:1} }
  @keyframes iso-oracle-line  { 0%{stroke-dashoffset:60} 70%{stroke-dashoffset:0} 100%{stroke-dashoffset:0} }
  @keyframes iso-oracle-star  { 0%,100%{transform:scale(1) rotate(0deg);opacity:1} 50%{transform:scale(1.4) rotate(20deg);opacity:0.7} }
  @keyframes iso-guard-pulse  { 0%,100%{transform:scale(1)} 50%{transform:scale(1.06)} }
  @keyframes iso-guard-dollar { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-3px)} }
  @keyframes iso-guard-arrow  { 0%,60%{transform:translateY(0);opacity:1} 80%{transform:translateY(3px);opacity:0} 81%{transform:translateY(-4px);opacity:0} 100%{transform:translateY(0);opacity:1} }
  @keyframes iso-money-fan    { 0%,100%{transform:rotate(0deg) translateY(0)} 33%{transform:rotate(-4deg) translateY(-2px)} 66%{transform:rotate(4deg) translateY(-1px)} }
  @keyframes iso-tag-swing    { 0%,100%{transform-origin:top left;transform:rotate(-5deg)} 50%{transform-origin:top left;transform:rotate(5deg)} }
  @keyframes iso-tag-price    { 0%,100%{transform:scale(1)} 50%{transform:scale(1.15)} }
  @keyframes iso-card-dot     { 0%,100%{r:3;opacity:1} 50%{r:4.5;opacity:0.7} }
  @keyframes iso-card-chip    { 0%,100%{transform:translateX(0)} 50%{transform:translateX(2px)} }
  @keyframes iso-doc-line     { 0%{stroke-dashoffset:20} 60%{stroke-dashoffset:0} 100%{stroke-dashoffset:0} }
  @keyframes iso-doc-check    { 0%,50%{stroke-dashoffset:15;opacity:0} 80%,100%{stroke-dashoffset:0;opacity:1} }
  @keyframes iso-bolt-glow    { 0%,100%{filter:drop-shadow(0 0 0px #f5c518)} 50%{filter:drop-shadow(0 0 6px #f5c518)} }
  @keyframes iso-bolt-flash   { 0%,100%{opacity:1;transform:scaleY(1)} 20%{opacity:0.5;transform:scaleY(0.95)} 40%{opacity:1} }
  @keyframes iso-lock-shackle { 0%,30%,100%{transform:translateY(0)} 50%,70%{transform:translateY(-5px)} }
  @keyframes iso-lock-body    { 0%,30%,100%{transform:translateY(0)} 50%,70%{transform:translateY(0)} }
  @keyframes iso-lock-dot     { 0%,100%{fill:#c8f5e4} 50%,70%{fill:#22c55e} }
`;

const IsoIcons: Record<string, (s?: number) => React.ReactNode> = {

  /* ── Stitching Engine: two boxes connect with a link ── */
  stitch: (s = 40) => (
    <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
      <style>{ANIM_STYLE}</style>
      {/* Top box — floats up */}
      <g style={{ animation: "iso-stitch-box 2.4s ease-in-out infinite" }}>
        <path d="M8 18 L20 12 L32 18 L20 24 Z" fill="#e8f5ef" stroke="#1a1a1a" strokeWidth="1.4" strokeLinejoin="round"/>
        <path d="M8 18 L8 24 L20 30 L20 24 Z" fill="#d4eee4" stroke="#1a1a1a" strokeWidth="1.3" strokeLinejoin="round"/>
        <path d="M32 18 L32 24 L20 30 L20 24 Z" fill="#c0e8d8" stroke="#1a1a1a" strokeWidth="1.3" strokeLinejoin="round"/>
      </g>
      {/* Link line — draws itself */}
      <line x1="20" y1="10" x2="20" y2="6"
        stroke="#22c55e" strokeWidth="2" strokeLinecap="round"
        strokeDasharray="6" strokeDashoffset="6"
        style={{ animation: "iso-stitch-link 2.4s ease-in-out infinite" }}/>
      {/* Receipt chip */}
      <rect x="21" y="4" width="5" height="3" rx="1" fill="#f5c518" stroke="#1a1a1a" strokeWidth="0.7"
        style={{ animation: "iso-stitch-box 2.4s ease-in-out infinite 0.2s" }}/>
    </svg>
  ),

  /* ── Kill Switch: X draws itself on a phone screen ── */
  kill: (s = 40) => (
    <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
      <style>{ANIM_STYLE}</style>
      <rect x="10" y="5" width="20" height="32" rx="4" fill="#f8f8f8" stroke="#1a1a1a" strokeWidth="1.4"/>
      <rect x="13" y="10" width="14" height="20" rx="2" fill="#fee2e2" stroke="#1a1a1a" strokeWidth="0.8"/>
      {/* X — draws itself */}
      <line x1="16" y1="16" x2="24" y2="24" stroke="#ef4444" strokeWidth="2.2" strokeLinecap="round"
        strokeDasharray="12" style={{ animation: "iso-kill-x 1.8s ease-in-out infinite" }}/>
      <line x1="24" y1="16" x2="16" y2="24" stroke="#ef4444" strokeWidth="2.2" strokeLinecap="round"
        strokeDasharray="12" style={{ animation: "iso-kill-x 1.8s ease-in-out infinite 0.2s" }}/>
      <circle cx="20" cy="35" r="2" fill="#ddd" stroke="#1a1a1a" strokeWidth="0.8"/>
      {/* Red badge — pulses */}
      <circle cx="29" cy="8" r="4"
        fill="#ef4444" stroke="white" strokeWidth="1.2"
        style={{ animation: "iso-kill-badge 1.8s ease-in-out infinite" }}/>
      <path d="M27.5 8 L30.5 8 M29 6.5 L29 9.5" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),

  /* ── Zombie Detector: ghost bobs, coin spins, slash flashes ── */
  zombie: (s = 40) => (
    <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
      <style>{ANIM_STYLE}</style>
      <g style={{ animation: "iso-zombie-bob 2s ease-in-out infinite" }}>
        <path d="M12 9 C12 5 28 5 28 9 L28 30 L25 27 L22 30 L19 27 L16 30 L13 27 L10 30 Z" fill="#f5f5f5" stroke="#1a1a1a" strokeWidth="1.4" strokeLinejoin="round"/>
        <path d="M15 16 L18 19 M18 16 L15 19" stroke="#1a1a1a" strokeWidth="1.3" strokeLinecap="round"/>
        <path d="M22 16 L25 19 M25 16 L22 19" stroke="#1a1a1a" strokeWidth="1.3" strokeLinecap="round"/>
      </g>
      {/* Coin — spins */}
      <g style={{ transformOrigin: "32px 9px", animation: "iso-zombie-coin 2s ease-in-out infinite" }}>
        <circle cx="32" cy="9" r="5" fill="#c8f5e4" stroke="#1a1a1a" strokeWidth="1"/>
        <text x="32" y="11.5" textAnchor="middle" fontSize="6" fontWeight="800" fill="#1a1a1a" fontFamily="sans-serif">$</text>
      </g>
      {/* Slash — flashes */}
      <line x1="27.5" y1="5" x2="36.5" y2="13.5" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round"
        style={{ animation: "iso-zombie-slash 2s ease-in-out infinite" }}/>
    </svg>
  ),

  /* ── TaxLink: doc lines fill in, then checkmark draws ── */
  tax: (s = 40) => (
    <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
      <style>{ANIM_STYLE}</style>
      <rect x="8" y="3" width="24" height="34" rx="3" fill="#f8f8f8" stroke="#1a1a1a" strokeWidth="1.4"/>
      <path d="M24 3 L24 10 L32 10" fill="#e8f5ef" stroke="#1a1a1a" strokeWidth="1.1"/>
      {/* Lines draw in sequentially */}
      <line x1="12" y1="16" x2="24" y2="16" stroke="#e5e5e5" strokeWidth="1.4"
        strokeDasharray="14" style={{ animation: "iso-doc-line 3s ease-in-out infinite" }}/>
      <line x1="12" y1="21" x2="22" y2="21" stroke="#e5e5e5" strokeWidth="1.4"
        strokeDasharray="12" style={{ animation: "iso-doc-line 3s ease-in-out infinite 0.3s" }}/>
      <line x1="12" y1="26" x2="24" y2="26" stroke="#22c55e" strokeWidth="2"
        strokeDasharray="14" style={{ animation: "iso-doc-line 3s ease-in-out infinite 0.6s" }}/>
      {/* Checkmark draws itself */}
      <path d="M24 30 L27 33 L33 26" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        strokeDasharray="16"
        style={{ animation: "iso-tax-check 3s ease-in-out infinite" }}/>
    </svg>
  ),

  /* ── Cash Flow Oracle: chart line draws, star twinkles ── */
  oracle: (s = 40) => (
    <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
      <style>{ANIM_STYLE}</style>
      <circle cx="20" cy="19" r="12" fill="#e8f9ff" stroke="#1a1a1a" strokeWidth="1.4"/>
      <circle cx="20" cy="19" r="7.5" fill="none" stroke="#0ea5e9" strokeWidth="1" opacity="0.5"/>
      {/* Chart line — draws itself */}
      <path d="M13 22 L16 18 L18.5 20.5 L21 16 L24 18.5 L27 13"
        stroke="#0ea5e9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
        fill="none" strokeDasharray="30" strokeDashoffset="30"
        style={{ animation: "iso-oracle-line 2.5s ease-in-out infinite" }}/>
      <ellipse cx="20" cy="34" rx="8" ry="3" fill="#e8f5ef" stroke="#1a1a1a" strokeWidth="1"/>
      <rect x="17" y="30" width="6" height="4" rx="1.5" fill="#d4eee4" stroke="#1a1a1a" strokeWidth="1"/>
      {/* Star — twinkles */}
      <path d="M30 6 L31 3 L32 6 L35 6 L32.5 7.8 L33.5 11 L31 9 L28.5 11 L29.5 7.8 L27 6 Z"
        fill="#f5c518" stroke="#1a1a1a" strokeWidth="0.7"
        style={{ transformOrigin: "31px 7px", animation: "iso-oracle-star 1.8s ease-in-out infinite" }}/>
    </svg>
  ),

  /* ── Price Guardian: shield pulses, $ bounces, arrow cycles ── */
  guardian: (s = 40) => (
    <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
      <style>{ANIM_STYLE}</style>
      {/* Shield — pulses */}
      <path d="M20 3 L32 8 L32 20 C32 29 20 36 20 36 C20 36 8 29 8 20 L8 8 Z"
        fill="#e8f9e8" stroke="#1a1a1a" strokeWidth="1.4" strokeLinejoin="round"
        style={{ transformOrigin: "20px 20px", animation: "iso-guard-pulse 2s ease-in-out infinite" }}/>
      <circle cx="20" cy="18" r="6.5" fill="white" stroke="#1a1a1a" strokeWidth="1"/>
      {/* $ — bounces */}
      <text x="20" y="21" textAnchor="middle" fontSize="7.5" fontWeight="900" fill="#22c55e" fontFamily="sans-serif"
        style={{ animation: "iso-guard-dollar 2s ease-in-out infinite" }}>$</text>
      {/* Arrow — cycles up */}
      <path d="M30 24 L30 32 L26 28 M30 32 L34 28"
        stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
        style={{ animation: "iso-guard-arrow 2s ease-in-out infinite" }}/>
    </svg>
  ),

  /* ── Zombie Subscriptions: money stack shuffles/fans ── */
  money: (s = 40) => (
    <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
      <style>{ANIM_STYLE}</style>
      {[0,1,2].map((i) => (
        <g key={i} style={{
          transformOrigin: "20px 21px",
          animation: `iso-money-fan ${1.8 + i * 0.15}s ease-in-out infinite ${i * 0.2}s`
        }}>
          <rect x={7 + i * 1.5} y={14 + [8,5,2][i]} width={26 - i * 3} height={13} rx="2.5"
            fill={i === 2 ? "#f5f5f5" : i === 1 ? "#eaeaea" : "#e0e0e0"} stroke="#1a1a1a" strokeWidth="1.1"/>
          <circle cx={20 - i * 0.5} cy={20.5 + [8,5,2][i]} r="3.2" fill="none" stroke="#1a1a1a" strokeWidth="0.9"/>
        </g>
      ))}
      <text x="20" y="22.5" textAnchor="middle" fontSize="6" fontWeight="800" fill="#1a1a1a" fontFamily="sans-serif" opacity="0.45">$</text>
    </svg>
  ),

  /* ── SKU Intelligence: tag swings, price ticks ── */
  tag: (s = 40) => (
    <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
      <style>{ANIM_STYLE}</style>
      {/* Tag — swings like a pendulum */}
      <g style={{ transformOrigin: "5px 5px", animation: "iso-tag-swing 2s ease-in-out infinite" }}>
        <path d="M5 5 L5 18 L22 35 C23 36 25 36 26 35 L35 26 C36 25 36 23 35 22 L18 5 Z" fill="#f8f8f8" stroke="#1a1a1a" strokeWidth="1.4" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="3" fill="#e8f5ef" stroke="#1a1a1a" strokeWidth="1"/>
        <line x1="16" y1="24" x2="26" y2="14" stroke="#e5e5e5" strokeWidth="1.3"/>
        <line x1="20" y1="28" x2="30" y2="18" stroke="#e5e5e5" strokeWidth="1.3"/>
      </g>
      {/* Price badge — pulses */}
      <rect x="23" y="2" width="14" height="8" rx="3" fill="#22c55e"
        style={{ animation: "iso-tag-price 2s ease-in-out infinite" }}/>
      <text x="30" y="8" textAnchor="middle" fontSize="5" fontWeight="900" fill="white" fontFamily="sans-serif">+22%</text>
    </svg>
  ),

  /* ── Smart Card Control: chip shifts, green dot pulses ── */
  card: (s = 40) => (
    <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
      <style>{ANIM_STYLE}</style>
      <rect x="3" y="10" width="34" height="22" rx="4" fill="#f8f8f8" stroke="#1a1a1a" strokeWidth="1.4"/>
      <rect x="3" y="16" width="34" height="7" fill="#e8f5ef" stroke="#1a1a1a" strokeWidth="0.8"/>
      {/* Chip — shifts */}
      <rect x="7" y="13" width="8" height="6" rx="1.5" fill="#f5c518" stroke="#1a1a1a" strokeWidth="0.8"
        style={{ animation: "iso-card-chip 2.2s ease-in-out infinite" }}/>
      <rect x="21" y="24" width="6" height="3.5" rx="1" fill="#e5e5e5"/>
      <rect x="29" y="24" width="5" height="3.5" rx="1" fill="#e5e5e5"/>
      {/* Green dot — pulses */}
      <circle cx="32" cy="13" r="3.5" fill="#22c55e" stroke="#1a1a1a" strokeWidth="0.9">
        <animate attributeName="r" values="3;4.5;3" dur="1.6s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="1;0.65;1" dur="1.6s" repeatCount="indefinite"/>
      </circle>
    </svg>
  ),

  /* ── Documentation: lines draw in, green underline pulses ── */
  doc: (s = 40) => (
    <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
      <style>{ANIM_STYLE}</style>
      <rect x="6" y="3" width="28" height="34" rx="4" fill="#f8f8f8" stroke="#1a1a1a" strokeWidth="1.4"/>
      <path d="M22 3 L22 11 L34 11" fill="#e8f5ef" stroke="#1a1a1a" strokeWidth="1.1"/>
      {/* Lines draw in */}
      <line x1="10" y1="15" x2="30" y2="15" stroke="#e5e5e5" strokeWidth="1.3"
        strokeDasharray="22" style={{ animation: "iso-doc-line 2.8s ease-in-out infinite" }}/>
      <line x1="10" y1="20" x2="26" y2="20" stroke="#e5e5e5" strokeWidth="1.3"
        strokeDasharray="18" style={{ animation: "iso-doc-line 2.8s ease-in-out infinite 0.25s" }}/>
      <line x1="10" y1="25" x2="28" y2="25" stroke="#e5e5e5" strokeWidth="1.3"
        strokeDasharray="20" style={{ animation: "iso-doc-line 2.8s ease-in-out infinite 0.5s" }}/>
      {/* Green highlight draws itself */}
      <line x1="10" y1="31" x2="22" y2="31" stroke="#22c55e" strokeWidth="2.2" strokeLinecap="round"
        strokeDasharray="14" style={{ animation: "iso-doc-check 2.8s ease-in-out infinite" }}/>
    </svg>
  ),

  /* ── Quickstart: bolt flashes with glow ── */
  bolt: (s = 40) => (
    <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
      <style>{ANIM_STYLE}</style>
      <ellipse cx="20" cy="36" rx="8" ry="2.5" fill="rgba(0,0,0,0.07)"/>
      {/* Glow ring */}
      <circle cx="20" cy="20" r="14" fill="#fffde7" stroke="none" opacity="0">
        <animate attributeName="opacity" values="0;0.6;0" dur="1.4s" repeatCount="indefinite"/>
        <animate attributeName="r" values="10;16;10" dur="1.4s" repeatCount="indefinite"/>
      </circle>
      {/* Bolt — flashes */}
      <path d="M23 5 L13 21 L18 21 L17 35 L28 17 L23 17 Z"
        fill="#fff9c4" stroke="#1a1a1a" strokeWidth="1.4" strokeLinejoin="round"
        style={{ animation: "iso-bolt-flash 1.4s ease-in-out infinite" }}>
        <animate attributeName="fill" values="#fff9c4;#f5c518;#fff9c4" dur="1.4s" repeatCount="indefinite"/>
      </path>
    </svg>
  ),

  /* ── Security: padlock shackle opens and closes ── */
  lock: (s = 40) => (
    <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
      <style>{ANIM_STYLE}</style>
      {/* Body — stays put */}
      <rect x="8" y="18" width="24" height="19" rx="4" fill="#f8f8f8" stroke="#1a1a1a" strokeWidth="1.4"/>
      {/* Shackle — slides up to open, comes back down to lock */}
      <path d="M13 18 L13 13 C13 7.5 27 7.5 27 13 L27 18"
        fill="none" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round">
        <animate attributeName="d"
          values="M13 18 L13 13 C13 7.5 27 7.5 27 13 L27 18;
                  M13 18 L13 10 C13 4.5 27 4.5 27 10 L27 16;
                  M13 18 L13 10 C13 4.5 27 4.5 27 10 L27 16;
                  M13 18 L13 13 C13 7.5 27 7.5 27 13 L27 18"
          dur="2.4s" keyTimes="0;0.35;0.65;1" repeatCount="indefinite"/>
      </path>
      {/* Keyhole dot */}
      <circle cx="20" cy="27.5" r="3.5" fill="#c8f5e4" stroke="#1a1a1a" strokeWidth="1">
        <animate attributeName="fill" values="#c8f5e4;#22c55e;#c8f5e4;#c8f5e4" dur="2.4s" keyTimes="0;0.35;0.65;1" repeatCount="indefinite"/>
      </circle>
      <line x1="20" y1="27.5" x2="20" y2="32" stroke="#1a1a1a" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
};


/* ── 3D Preview Panels — right side of mega dropdown ── */
// Each shows an animated isometric illustration

function PreviewStitching() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setStep(s => (s + 1) % 3), 1800);
    return () => clearInterval(t);
  }, []);
  const states = ["PENDING", "PARSING", "RECONCILED"];
  const colors = ["#9ca3af", "#f59e0b", "#22c55e"];
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 280, display: "flex", alignItems: "center", justifyContent: "center", background: "#f9f9f9", overflow: "hidden" }}>
      {/* Floating receipt cards — KnotAPI style */}
      <div style={{ position: "relative", width: 280, height: 240 }}>
        {/* YOUR APP card */}
        <div style={{ position: "absolute", top: 20, left: 60, width: 100, height: 100, background: "#c8f5e4", border: "2px solid #1a1a1a", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 13, color: "#1a1a1a", transform: "rotate(-6deg)", boxShadow: "4px 4px 0 #1a1a1a", animation: "dropFloat 3s ease-in-out infinite" }}>YOUR<br />APP</div>
        {/* RECEKON K card */}
        <div style={{ position: "absolute", top: 30, left: 140, width: 90, height: 90, background: "#1a1a1a", border: "2px solid #1a1a1a", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 28, color: "#fff", transform: "rotate(4deg)", boxShadow: "4px 4px 0 #555", animation: "dropFloat 3.5s ease-in-out infinite 0.4s" }}>S</div>
        {/* Transaction rows */}
        {[
          { icon: "🛒", name: "Tide Pods 35ct", price: "$18.99", status: step >= 1 ? "✓" : "…" },
          { icon: "🥛", name: "Organic Milk", price: "$5.49", status: step >= 2 ? "✓" : step >= 1 ? "…" : "—" },
          { icon: "⚡", name: "USB-C Cable", price: "$12.99", status: step >= 2 ? "✓" : "—" },
        ].map((row, i) => (
          <div key={i} style={{
            position: "absolute", left: 8, top: 140 + i * 36,
            width: 200, background: "#fff", border: "1.5px solid #e5e5e5",
            borderRadius: 8, padding: "6px 10px",
            display: "flex", alignItems: "center", gap: 8, fontSize: 11,
            boxShadow: "2px 2px 0 #e5e5e5",
            opacity: step >= i ? 1 : 0.35,
            transition: "opacity 0.4s ease",
          }}>
            <span>{row.icon}</span>
            <span style={{ flex: 1, fontWeight: 600 }}>{row.name}</span>
            <span style={{ color: row.status === "✓" ? "#22c55e" : "#9ca3af", fontWeight: 700 }}>{row.status}</span>
            <span style={{ fontFamily: "monospace", fontWeight: 700 }}>{row.price}</span>
          </div>
        ))}
        {/* Status badge */}
        <div style={{ position: "absolute", bottom: -10, left: "50%", transform: "translateX(-50%)", background: colors[step], color: "#fff", borderRadius: 100, padding: "4px 14px", fontSize: 10, fontWeight: 800, letterSpacing: "0.08em", whiteSpace: "nowrap", transition: "background 0.4s ease" }}>
          {states[step]}
        </div>
      </div>
      <style>{`@keyframes dropFloat { 0%,100%{transform:translateY(0) rotate(-6deg)} 50%{transform:translateY(-8px) rotate(-6deg)} }`}</style>
    </div>
  );
}

function PreviewKillSwitch() {
  const [killed, setKilled] = useState<number[]>([]);
  useEffect(() => {
    const subs = [0, 2];
    let i = 0;
    const t = setInterval(() => {
      if (i < subs.length) { setKilled(p => [...p, subs[i]]); i++; }
      else { setKilled([]); i = 0; }
    }, 1200);
    return () => clearInterval(t);
  }, []);
  const subs = [
    { name: "Netflix", amt: "$15.99", icon: "🎬" },
    { name: "Spotify", amt: "$9.99",  icon: "🎵" },
    { name: "Adobe CC",amt: "$54.99", icon: "🎨" },
  ];
  return (
    <div style={{ width: "100%", minHeight: 280, display: "flex", alignItems: "center", justifyContent: "center", background: "#f9f9f9", padding: "24px 20px" }}>
      <div style={{ width: "100%", maxWidth: 260 }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Zombie Subscriptions</div>
        {subs.map((s, i) => {
          const isKilled = killed.includes(i);
          return (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 10, padding: "9px 12px",
              background: isKilled ? "#f0fdf4" : "#fff",
              border: `1.5px solid ${isKilled ? "#bbf7d0" : "#e5e5e5"}`,
              borderRadius: 10, marginBottom: 7,
              opacity: isKilled ? 0.6 : 1,
              transition: "all 0.4s ease",
            }}>
              <span style={{ fontSize: 18 }}>{s.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: isKilled ? "#16a34a" : "#0a0a0a", textDecoration: isKilled ? "line-through" : "none" }}>{s.name}</div>
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, color: isKilled ? "#16a34a" : "#ef4444", fontFamily: "monospace" }}>{s.amt}</span>
              {isKilled
                ? <span style={{ fontSize: 10, color: "#16a34a", fontWeight: 800 }}>✓</span>
                : <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444", boxShadow: "0 0 6px #ef4444" }} />}
            </div>
          );
        })}
        <div style={{ marginTop: 14, padding: "10px 12px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, fontSize: 11, fontWeight: 700, color: "#16a34a", textAlign: "center" }}>
          {killed.length > 0 ? `${killed.length} zombie${killed.length > 1 ? "s" : ""} killed ✓` : "Scanning…"}
        </div>
      </div>
    </div>
  );
}

function PreviewZombieDetector() {
  const [scan, setScan] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setScan(s => (s + 1) % 100), 60);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ width: "100%", minHeight: 280, display: "flex", alignItems: "center", justifyContent: "center", background: "#f9f9f9", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 240, textAlign: "center" }}>
        {/* Radar animation */}
        <div style={{ position: "relative", width: 120, height: 120, margin: "0 auto 20px" }}>
          {[1,2,3].map(ring => (
            <div key={ring} style={{ position: "absolute", inset: ring * 14, border: "1.5px solid #e5e5e5", borderRadius: "50%", opacity: 0.6 }} />
          ))}
          {/* Sweep */}
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "50%", left: "50%", width: 60, height: 2, background: "linear-gradient(90deg, rgba(239,68,68,0.8), transparent)", transformOrigin: "0 50%", transform: `rotate(${scan * 3.6}deg)`, borderRadius: 2 }} />
          </div>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>👻</div>
        </div>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#0a0a0a", marginBottom: 4 }}>AI Surveillance Active</div>
        <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 14 }}>Monitoring {12} subscriptions</div>
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ flex: 1, padding: "8px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, fontSize: 11, fontWeight: 700, color: "#ef4444" }}>3 zombies</div>
          <div style={{ flex: 1, padding: "8px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, fontSize: 11, fontWeight: 700, color: "#16a34a" }}>$200/mo</div>
        </div>
      </div>
    </div>
  );
}

function PreviewTaxLink() {
  return (
    <div style={{ width: "100%", minHeight: 280, display: "flex", alignItems: "center", justifyContent: "center", background: "#f9f9f9", padding: "20px 16px" }}>
      <div style={{ width: "100%", maxWidth: 260 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.1em" }}>Q4 Tax Report</div>
          <div style={{ background: "#f0fdf4", color: "#16a34a", fontSize: 9, fontWeight: 800, padding: "2px 8px", borderRadius: 100, border: "1px solid #bbf7d0" }}>CRA · IRS · HMRC</div>
        </div>
        {[
          { cat: "Home Office", amt: "$1,247", pct: 90 },
          { cat: "Software",    amt: "$842",   pct: 68 },
          { cat: "Travel",      amt: "$367",   pct: 30 },
        ].map((r, i) => (
          <div key={i} style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 5 }}>
              <span style={{ fontWeight: 600 }}>{r.cat}</span>
              <span style={{ color: "#16a34a", fontWeight: 700 }}>{r.amt}</span>
            </div>
            <div style={{ height: 6, background: "#f0f0f0", borderRadius: 10, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${r.pct}%`, background: "#22c55e", borderRadius: 10, transition: "width 1s ease" }} />
            </div>
          </div>
        ))}
        <div style={{ marginTop: 8, padding: "10px 12px", background: "#0a0a0a", borderRadius: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>Total deductions</span>
          <span style={{ fontSize: 16, fontWeight: 900, color: "#22c55e", letterSpacing: "-0.03em" }}>$2,847</span>
        </div>
      </div>
    </div>
  );
}

function PreviewOracle() {
  const points = [0.45, 0.40, 0.55, 0.42, 0.60, 0.52, 0.65, 0.58, 0.70, 0.68, 0.75, 0.80, 0.76, 0.82];
  const split = 8; // forecast starts here
  const w = 240, h = 100;
  const toX = (i: number) => (i / (points.length - 1)) * w;
  const toY = (v: number) => h - v * h;
  return (
    <div style={{ width: "100%", minHeight: 280, display: "flex", alignItems: "center", justifyContent: "center", background: "#f9f9f9", padding: "20px 16px" }}>
      <div style={{ width: "100%", maxWidth: 260 }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>90-Day Cash Flow Forecast</div>
        <svg width={w} height={h + 20} viewBox={`0 0 ${w} ${h + 20}`} style={{ width: "100%", marginBottom: 12 }}>
          {/* Forecast zone */}
          <rect x={toX(split)} y={0} width={w - toX(split)} height={h} fill="rgba(34,197,94,0.07)" />
          {/* Grid lines */}
          {[0.25,0.5,0.75].map((v,i) => <line key={i} x1={0} y1={toY(v)} x2={w} y2={toY(v)} stroke="#f0f0f0" strokeWidth="1"/>)}
          {/* Historical */}
          <polyline points={points.slice(0, split + 1).map((v, i) => `${toX(i)},${toY(v)}`).join(" ")} fill="none" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          {/* Forecast */}
          <polyline points={points.slice(split).map((v, i) => `${toX(split + i)},${toY(v)}`).join(" ")} fill="none" stroke="#22c55e" strokeWidth="2" strokeDasharray="5 3" strokeLinecap="round" strokeLinejoin="round"/>
          {/* Today line */}
          <line x1={toX(split)} y1={0} x2={toX(split)} y2={h} stroke="#9ca3af" strokeWidth="1" strokeDasharray="3 2"/>
          <text x={toX(split) + 4} y={12} fontSize={8} fill="#9ca3af" fontFamily="sans-serif">Today</text>
        </svg>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <div style={{ padding: "10px", background: "#fff", border: "1px solid #e5e5e5", borderRadius: 8 }}>
            <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 3 }}>Balance in 30d</div>
            <div style={{ fontSize: 16, fontWeight: 900, color: "#22c55e", letterSpacing: "-0.03em" }}>+$1,240</div>
          </div>
          <div style={{ padding: "10px", background: "#fff", border: "1px solid #e5e5e5", borderRadius: 8 }}>
            <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 3 }}>Can I afford…?</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#0a0a0a" }}>MacBook ✓</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PreviewGuardian() {
  const [prices, setPrices] = useState([349.99, 749.00, 279.00]);
  useEffect(() => {
    const t = setInterval(() => {
      setPrices(p => p.map(v => Math.max(v * 0.98, v - 20)));
    }, 900);
    return () => clearInterval(t);
  }, []);
  const originals = [349.99, 749.00, 279.00];
  const items = ["Sony WH-1000XM5", "Dyson V15 Vacuum", "AirPods Pro"];
  return (
    <div style={{ width: "100%", minHeight: 280, display: "flex", alignItems: "center", justifyContent: "center", background: "#f9f9f9", padding: "20px 16px" }}>
      <div style={{ width: "100%", maxWidth: 260 }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Price Drop Monitor</div>
        {items.map((name, i) => {
          const saved = (originals[i] - prices[i]).toFixed(2);
          const hasDrop = parseFloat(saved) > 0.5;
          return (
            <div key={i} style={{ padding: "10px 12px", background: hasDrop ? "#f0fdf4" : "#fff", border: `1.5px solid ${hasDrop ? "#bbf7d0" : "#e5e5e5"}`, borderRadius: 10, marginBottom: 7, transition: "all 0.4s ease" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <div style={{ fontSize: 11, fontWeight: 600 }}>{name}</div>
                {hasDrop && <div style={{ fontSize: 9, background: "#22c55e", color: "#fff", borderRadius: 100, padding: "1px 7px", fontWeight: 800 }}>DROP</div>}
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ fontSize: 10, color: "#9ca3af", textDecoration: "line-through" }}>${originals[i].toFixed(2)}</span>
                <span style={{ fontSize: 13, fontWeight: 900, color: "#16a34a" }}>${prices[i].toFixed(2)}</span>
                {hasDrop && <span style={{ fontSize: 10, color: "#16a34a", fontWeight: 700 }}>↓ ${saved} saved</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PreviewZombieUC() { return <PreviewZombieDetector />; }

function PreviewSkuIntelligence() {
  return (
    <div style={{ width: "100%", minHeight: 280, display: "flex", alignItems: "center", justifyContent: "center", background: "#f9f9f9", padding: "20px 16px" }}>
      <div style={{ width: "100%", maxWidth: 260 }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>SKU Breakdown</div>
        {[
          { name: "Tide Pods 35ct",   cat: "Household", price: "$18.99", trend: "+22%", up: true },
          { name: "Oat Milk 2L",      cat: "Groceries", price: "$6.49",  trend: "+15%", up: true },
          { name: "Organic Chicken",  cat: "Protein",   price: "$12.40", trend: "-8%",  up: false },
          { name: "USB-C Cable 6ft",  cat: "Tech",      price: "$12.99", trend: "—",    up: false },
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0", borderBottom: i < 3 ? "1px solid #f0f0f0" : "none" }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>🏷️</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 600 }}>{item.name}</div>
              <div style={{ fontSize: 9, color: "#9ca3af" }}>{item.cat}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11, fontWeight: 700 }}>{item.price}</div>
              <div style={{ fontSize: 9, color: item.up ? "#ef4444" : "#16a34a", fontWeight: 700 }}>{item.trend}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PreviewCardControl() { return <PreviewKillSwitch />; }

function PreviewDocs() {
  const lines = [
    { n: 1, code: `{`, c: "#9ca3af" },
    { n: 2, code: `  "event": `, val: `"TRANSACTION_MATCHED"`, vc: "#ce9178", c: "#9cdcfe" },
    { n: 3, code: `  "amount": `, val: `54.32`, vc: "#b5cea8", c: "#9cdcfe" },
    { n: 4, code: `  "status": `, val: `"RECONCILED"`, vc: "#4ec9b0", c: "#9cdcfe" },
    { n: 5, code: `}`, c: "#9ca3af" },
  ];
  return (
    <div style={{ width: "100%", minHeight: 280, display: "flex", alignItems: "center", justifyContent: "center", background: "#111", padding: "20px 16px" }}>
      <div style={{ width: "100%", maxWidth: 260 }}>
        <div style={{ background: "#0d0d0d", borderRadius: "10px 10px 0 0", padding: "8px 12px", display: "flex", gap: 6 }}>
          {["#ff5f57","#ffbd2e","#28c840"].map((c,i) => <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: c }}/>)}
        </div>
        <div style={{ background: "#1a1a1a", borderRadius: "0 0 10px 10px", padding: "14px 16px", fontFamily: "monospace", fontSize: 11, lineHeight: 1.75 }}>
          {lines.map((l, i) => (
            <div key={i} style={{ display: "flex", gap: 12 }}>
              <span style={{ color: "#444", minWidth: 14, textAlign: "right", userSelect: "none" }}>{l.n}</span>
              <span>
                <span style={{ color: l.c }}>{l.code}</span>
                {l.val && <span style={{ color: l.vc }}>{l.val}</span>}
                {l.val && <span style={{ color: "#555" }}>,</span>}
              </span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 12, padding: "8px 12px", background: "#1a1a1a", borderRadius: 8, fontSize: 11, color: "#22c55e", fontFamily: "monospace" }}>→ Start in 10 minutes</div>
      </div>
    </div>
  );
}

function PreviewSecurity() {
  return (
    <div style={{ width: "100%", minHeight: 280, display: "flex", alignItems: "center", justifyContent: "center", background: "#f9f9f9", padding: "20px 16px" }}>
      <div style={{ width: "100%", maxWidth: 260 }}>
        {[
          { icon: "🔐", label: "Zero-Knowledge Vault",    ok: true },
          { icon: "🏦", label: "PCI-DSS Level 1",         ok: true },
          { icon: "🔒", label: "AES-256 Encryption",      ok: true },
          { icon: "👤", label: "Auth0 Identity",          ok: true },
          { icon: "🛡️", label: "SOC 2 In Progress",       ok: false },
        ].map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: i < 4 ? "1px solid #f0f0f0" : "none" }}>
            <span style={{ fontSize: 16 }}>{s.icon}</span>
            <span style={{ flex: 1, fontSize: 12, fontWeight: 600, color: "#0a0a0a" }}>{s.label}</span>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: s.ok ? "#22c55e" : "#f59e0b" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Nav data ─────────────────────────────────────── */
interface NavItem {
  id: string;
  iconKey: string;
  label: string;
  desc: string;
  href: string;
  tag?: string;
  Preview: React.FC;
}

const PRODUCTS_NAV: NavItem[] = [
  { id: "stitch",   iconKey: "stitch",   label: "Stitching Engine™",  desc: "Bank TXN → Receipt → SKU. Automatic.",      href: "/products/stitching-engine",  Preview: PreviewStitching },
  { id: "kill",     iconKey: "kill",     label: "Kill Switch™",        desc: "Block any merchant in one tap. Instant.",   href: "/products/kill-switch",        Preview: PreviewKillSwitch },
  { id: "zombie",   iconKey: "zombie",   label: "Zombie Detector™",    desc: "AI finds unused subs you forgot you had.",  href: "/products/zombie-detector",    Preview: PreviewZombieDetector },
  { id: "tax",      iconKey: "tax",      label: "TaxLink™",            desc: "Auto-generate deduction reports globally.", href: "/products/tax-link",           Preview: PreviewTaxLink },
  { id: "oracle",   iconKey: "oracle",   label: "Cash Flow Oracle™",   desc: "Predict your balance 90 days out.",         href: "/products/cash-flow-oracle",   tag: "New", Preview: PreviewOracle },
  { id: "guardian", iconKey: "guardian", label: "Price Guardian™",     desc: "Auto-refund when prices drop.",             href: "/products/price-guardian",     tag: "New", Preview: PreviewGuardian },
];

const USECASES_NAV: NavItem[] = [
  { id: "zombie-uc", iconKey: "money", label: "Zombie Subscriptions", desc: "Find and kill everything you forgot.",          href: "/use-cases/zombie-subscriptions", Preview: PreviewZombieUC },
  { id: "tax-uc",    iconKey: "doc",   label: "Tax Automation",        desc: "CRA, IRS, HMRC, ATO — all automated.",         href: "/use-cases/tax-automation",       Preview: PreviewTaxLink },
  { id: "sku-uc",    iconKey: "tag",   label: "SKU Intelligence",      desc: "Item-level data nobody else gives you.",       href: "/use-cases/sku-intelligence",     Preview: PreviewSkuIntelligence },
  { id: "card-uc",   iconKey: "card",  label: "Smart Card Control",    desc: "Programmable rules. Real-time enforcement.",   href: "/use-cases/card-control",         Preview: PreviewCardControl },
];

const DEVS_NAV: NavItem[] = [
  { id: "docs",       iconKey: "doc",  label: "Documentation",  desc: "Full API reference, SDKs, and guides.",      href: "/developers/documentation", Preview: PreviewDocs },
  { id: "quickstart", iconKey: "bolt", label: "Quickstart",     desc: "Up and running in under 10 minutes.",        href: "/developers/quickstart",    Preview: PreviewDocs },
  { id: "security",   iconKey: "lock", label: "Security",       desc: "Zero-knowledge vault. Bank-grade safety.",   href: "/developers/security",      Preview: PreviewSecurity },
];

/* ── Mega Dropdown component ─────────────────────── */
function MegaDropdown({ items, onClose, twoCol = true }: {
  items: NavItem[]; onClose: () => void; twoCol?: boolean;
}) {
  const [hoveredId, setHoveredId] = useState(items[0].id);
  const [, navigate] = useLocation();

  const hovered = items.find(i => i.id === hoveredId) ?? items[0];
  const Preview = hovered.Preview;

  const go = (href: string) => {
    navigate(href.split("#")[0]);
    onClose();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={{
      position: "absolute",
      top: "calc(100% + 10px)",
      left: "50%",
      transform: "translateX(-40%)",
      background: "#fff",
      border: "1px solid #e5e5e5",
      borderRadius: 20,
      boxShadow: "0 24px 80px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06)",
      zIndex: 600,
      overflow: "hidden",
      display: "flex",
      minWidth: twoCol ? 620 : 480,
      maxWidth: 680,
    }}>
      {/* LEFT: item list */}
      <div style={{ width: twoCol ? 280 : "100%", padding: "16px 12px", borderRight: twoCol ? "1px solid #f0f0f0" : "none", flexShrink: 0 }}>
        {items.map((item) => {
          const isHov = hoveredId === item.id;
          const IconFn = IsoIcons[item.iconKey];
          return (
            <div
              key={item.id}
              onClick={() => go(item.href)}
              onMouseEnter={() => setHoveredId(item.id)}
              style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "10px 10px", borderRadius: 12, cursor: "pointer",
                background: isHov ? "#f5f5f5" : "transparent",
                transition: "background 0.15s",
                marginBottom: 3,
              }}
            >
              {/* 3D icon tile */}
              <div style={{
                width: 48, height: 48,
                background: isHov ? "#edf9f4" : "#f9f9f9",
                border: `1.5px solid ${isHov ? "#b8e8d8" : "#e5e5e5"}`,
                borderRadius: 13,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
                transition: "all 0.2s ease",
                boxShadow: isHov
                  ? "0 6px 16px rgba(34,197,94,0.12), 0 2px 4px rgba(0,0,0,0.06), -2px -2px 0 rgba(255,255,255,0.9) inset"
                  : "0 2px 6px rgba(0,0,0,0.05), -1px -1px 0 rgba(255,255,255,0.9) inset",
                transform: isHov ? "perspective(160px) rotateY(-10deg) rotateX(4deg) scale(1.04)" : "perspective(160px) rotateY(0) rotateX(0) scale(1)",
              }}>
                {IconFn ? IconFn(28) : null}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#0a0a0a", whiteSpace: "nowrap" }}>{item.label}</div>
                  {item.tag && (
                    <span style={{ fontSize: 8, fontWeight: 800, background: "#22c55e", color: "#fff", borderRadius: 100, padding: "1px 6px", letterSpacing: "0.06em", flexShrink: 0 }}>{item.tag}</span>
                  )}
                </div>
                <div style={{ fontSize: 11, color: "#9ca3af", lineHeight: 1.4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.desc}</div>
              </div>
              <span style={{ color: isHov ? "#0a0a0a" : "#d1d5db", fontSize: 14, flexShrink: 0 }}>›</span>
            </div>
          );
        })}
      </div>

      {/* RIGHT: animated preview panel */}
      {twoCol && (
        <div style={{ flex: 1, minWidth: 0, overflow: "hidden", borderRadius: "0 20px 20px 0", position: "relative" }}>
          {/* Label */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, zIndex: 2,
            padding: "12px 16px 8px",
            background: "linear-gradient(to bottom, rgba(249,249,249,0.95), transparent)",
          }}>
            <div style={{ fontSize: 9, fontWeight: 800, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Preview — {hovered.label}
            </div>
          </div>
          {/* Preview renders with fade */}
          <div key={hoveredId} style={{ animation: "megaFadeIn 0.22s ease" }}>
            <Preview />
          </div>
          {/* Bottom CTA */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            padding: "8px 16px 12px",
            background: "linear-gradient(to top, rgba(249,249,249,0.98), transparent)",
          }}>
            <button onClick={() => go(hovered.href)} style={{
              width: "100%", background: "#0a0a0a", color: "#fff",
              border: "none", borderRadius: 8, padding: "9px", fontSize: 12,
              fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
            }}>
              Explore {hovered.label} →
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes megaFadeIn { from{opacity:0;transform:translateY(4px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  );
}

/* ── Nav item with stable hover ─────────────────── */
function NavItem({ label, children, onClick }: {
  label: string; children?: React.ReactNode; onClick?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();
  const show = () => { clearTimeout(closeTimer.current); setOpen(true); };
  const hide = () => { closeTimer.current = setTimeout(() => setOpen(false), 240); };
  const close = () => { clearTimeout(closeTimer.current); setOpen(false); };

  return (
    <li style={{ position: "relative" }} onMouseEnter={show} onMouseLeave={hide}>
      <button
        onClick={onClick ?? (() => children && setOpen(o => !o))}
        style={{
          display: "flex", alignItems: "center", gap: 4,
          padding: "8px 13px", borderRadius: 8,
          fontSize: 14, fontWeight: 500,
          color: open ? "#0a0a0a" : "#374151",
          cursor: "pointer", background: open ? "#f5f5f5" : "none",
          border: "none", fontFamily: "inherit", transition: "all 0.15s",
        }}
        onMouseEnter={e => { e.currentTarget.style.background = "#f5f5f5"; e.currentTarget.style.color = "#0a0a0a"; }}
        onMouseLeave={e => { if (!open) { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#374151"; } }}
      >
        {label}
        {children && (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ opacity: 0.4, transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "none" }}>
            <path d="M2 3.5 L5 7 L8 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>
      {children && open && (
        <div onMouseEnter={show} onMouseLeave={hide}>
          {React.cloneElement(children as React.ReactElement, { onClose: close })}
        </div>
      )}
    </li>
  );
}

/* ── LiveIcon — animated SVG that responds to press ─ */
function LiveIcon({ iconKey, pressed, size = 60 }: { iconKey: string; pressed: boolean; size?: number }) {
  // Each icon has its own press-triggered visual change
  const s = size;
  const p = pressed; // shorthand

  const icons: Record<string, React.ReactNode> = {

    stitch: (
      <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
        {/* IDLE: boxes float, link line draws */}
        {/* PRESS: boxes slam together, flash green */}
        <g style={{ transform: p ? "translateY(3px)" : "translateY(0)", transition: "transform 0.15s" }}>
          <path d="M8 18 L20 12 L32 18 L20 24 Z"
            fill={p ? "#22c55e" : "#e8f5ef"}
            stroke={p ? "#22c55e" : "#1a1a1a"} strokeWidth="1.4" strokeLinejoin="round"
            style={{ transition: "fill 0.15s, stroke 0.15s", animation: p ? "none" : "iso-stitch-box 2.4s ease-in-out infinite" }}/>
          <path d="M8 18 L8 24 L20 30 L20 24 Z"
            fill={p ? "#16a34a" : "#d4eee4"}
            stroke={p ? "#16a34a" : "#1a1a1a"} strokeWidth="1.3" strokeLinejoin="round"
            style={{ transition: "fill 0.15s" }}/>
          <path d="M32 18 L32 24 L20 30 L20 24 Z"
            fill={p ? "#15803d" : "#c0e8d8"}
            stroke={p ? "#15803d" : "#1a1a1a"} strokeWidth="1.3" strokeLinejoin="round"
            style={{ transition: "fill 0.15s" }}/>
        </g>
        {/* Link beam — press makes it stay solid green */}
        <line x1="20" y1="10" x2="20" y2="6"
          stroke="#22c55e" strokeWidth={p ? 3 : 2} strokeLinecap="round"
          strokeDasharray={p ? "none" : "6"} strokeDashoffset={p ? "0" : undefined}
          opacity={p ? 1 : undefined}
          style={{ transition: "stroke-width 0.15s", animation: p ? "none" : "iso-stitch-link 2.4s ease-in-out infinite" }}/>
        <rect x="21" y="4" width="5" height="3" rx="1"
          fill={p ? "#22c55e" : "#f5c518"} stroke={p ? "#16a34a" : "#1a1a1a"} strokeWidth="0.7"
          style={{ transition: "fill 0.15s", animation: p ? "none" : "iso-stitch-box 2.4s ease-in-out infinite 0.2s" }}/>
        {/* Press: spark burst */}
        {p && [0,60,120,180,240,300].map((deg,i) => (
          <line key={i}
            x1="20" y1="18"
            x2={20 + Math.cos(deg*Math.PI/180)*10}
            y2={18 + Math.sin(deg*Math.PI/180)*10}
            stroke="#22c55e" strokeWidth="1.2" strokeLinecap="round" opacity="0.7"/>
        ))}
      </svg>
    ),

    kill: (
      <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
        <rect x="10" y="5" width="20" height="32" rx="4"
          fill={p ? "#fff0f0" : "#f8f8f8"} stroke="#1a1a1a" strokeWidth="1.4"
          style={{ transition: "fill 0.1s" }}/>
        <rect x="13" y="10" width="14" height="20" rx="2"
          fill={p ? "#fca5a5" : "#fee2e2"} stroke="#1a1a1a" strokeWidth="0.8"
          style={{ transition: "fill 0.1s" }}/>
        {/* X — press makes it slash fast and thick */}
        <line x1="16" y1="16" x2="24" y2="24"
          stroke="#ef4444" strokeWidth={p ? 3.5 : 2.2} strokeLinecap="round"
          strokeDasharray={p ? "none" : "12"}
          style={{ transition: "stroke-width 0.1s", animation: p ? "none" : "iso-kill-x 1.8s ease-in-out infinite" }}/>
        <line x1="24" y1="16" x2="16" y2="24"
          stroke="#ef4444" strokeWidth={p ? 3.5 : 2.2} strokeLinecap="round"
          strokeDasharray={p ? "none" : "12"}
          style={{ transition: "stroke-width 0.1s", animation: p ? "none" : "iso-kill-x 1.8s ease-in-out infinite 0.2s" }}/>
        <circle cx="20" cy="35" r="2" fill="#ddd" stroke="#1a1a1a" strokeWidth="0.8"/>
        {/* Badge — press makes it bigger + shake */}
        <circle cx="29" cy="8" r={p ? 5.5 : 4}
          fill="#ef4444" stroke="white" strokeWidth="1.2"
          style={{ transition: "r 0.1s", transformOrigin: "29px 8px",
            animation: p ? "iso-kill-badge-press 0.25s ease-out" : "iso-kill-badge 1.8s ease-in-out infinite" }}/>
        <path d="M27.5 8 L30.5 8 M29 6.5 L29 9.5" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),

    zombie: (
      <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
        {/* Ghost — press makes it jump up */}
        <g style={{
          transform: p ? "translateY(-6px)" : "translateY(0)",
          transition: "transform 0.15s cubic-bezier(0.2,0,0,1)",
          animation: p ? "none" : "iso-zombie-bob 2s ease-in-out infinite"
        }}>
          <path d="M12 9 C12 5 28 5 28 9 L28 30 L25 27 L22 30 L19 27 L16 30 L13 27 L10 30 Z"
            fill={p ? "#ffe4e6" : "#f5f5f5"} stroke="#1a1a1a" strokeWidth="1.4" strokeLinejoin="round"
            style={{ transition: "fill 0.1s" }}/>
          {/* Eyes — press widens them */}
          <path d={p ? "M14 15 L18 15 M15 15 L17 19" : "M15 16 L18 19 M18 16 L15 19"}
            stroke="#1a1a1a" strokeWidth="1.3" strokeLinecap="round" style={{ transition: "d 0.1s" }}/>
          <path d={p ? "M22 15 L26 15 M23 15 L25 19" : "M22 16 L25 19 M25 16 L22 19"}
            stroke="#1a1a1a" strokeWidth="1.3" strokeLinecap="round" style={{ transition: "d 0.1s" }}/>
        </g>
        {/* Coin — press spins fast */}
        <g style={{ transformOrigin: "32px 9px",
          animation: p ? "iso-zombie-spin-fast 0.3s linear infinite" : "iso-zombie-coin 2s ease-in-out infinite" }}>
          <circle cx="32" cy="9" r="5" fill={p ? "#22c55e" : "#c8f5e4"} stroke="#1a1a1a" strokeWidth="1"
            style={{ transition: "fill 0.15s" }}/>
          <text x="32" y="11.5" textAnchor="middle" fontSize="6" fontWeight="800" fill="#1a1a1a" fontFamily="sans-serif">$</text>
        </g>
        <line x1="27.5" y1="5" x2="36.5" y2="13.5" stroke="#ef4444"
          strokeWidth={p ? 2.5 : 1.8} strokeLinecap="round"
          style={{ animation: p ? "none" : "iso-zombie-slash 2s ease-in-out infinite", opacity: p ? 1 : undefined, transition: "stroke-width 0.1s" }}/>
      </svg>
    ),

    tax: (
      <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
        <rect x="8" y="3" width="24" height="34" rx="3"
          fill={p ? "#f0fdf4" : "#f8f8f8"} stroke="#1a1a1a" strokeWidth="1.4" style={{ transition: "fill 0.15s" }}/>
        <path d="M24 3 L24 10 L32 10" fill="#e8f5ef" stroke="#1a1a1a" strokeWidth="1.1"/>
        {/* Lines — press fills all instantly */}
        <line x1="12" y1="16" x2="24" y2="16" stroke="#e5e5e5" strokeWidth="1.4"
          strokeDasharray={p ? "none" : "14"}
          style={{ animation: p ? "none" : "iso-doc-line 3s ease-in-out infinite" }}/>
        <line x1="12" y1="21" x2="22" y2="21" stroke="#e5e5e5" strokeWidth="1.4"
          strokeDasharray={p ? "none" : "12"}
          style={{ animation: p ? "none" : "iso-doc-line 3s ease-in-out infinite 0.3s" }}/>
        <line x1="12" y1="26" x2="24" y2="26" stroke="#22c55e" strokeWidth={p ? 2.5 : 2}
          strokeDasharray={p ? "none" : "14"}
          style={{ transition: "stroke-width 0.1s", animation: p ? "none" : "iso-doc-line 3s ease-in-out infinite 0.6s" }}/>
        {/* Checkmark — press makes it big and bright */}
        <path d="M24 30 L27 33 L33 26" stroke="#22c55e"
          strokeWidth={p ? 3 : 2} strokeLinecap="round" strokeLinejoin="round"
          strokeDasharray={p ? "none" : "16"}
          style={{ transition: "stroke-width 0.1s", animation: p ? "none" : "iso-tax-check 3s ease-in-out infinite" }}/>
        {/* Press: green glow */}
        {p && <circle cx="20" cy="26" r="12" fill="#22c55e" opacity="0.12"/>}
      </svg>
    ),

    oracle: (
      <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="19" r="12"
          fill={p ? "#dbeafe" : "#e8f9ff"} stroke="#1a1a1a" strokeWidth="1.4" style={{ transition: "fill 0.15s" }}/>
        <circle cx="20" cy="19" r="7.5" fill="none" stroke="#0ea5e9" strokeWidth="1" opacity="0.5"/>
        {/* Chart — press shows sharp spike */}
        <path d={p ? "M13 22 L16 14 L18.5 18 L21 10 L24 14 L27 8" : "M13 22 L16 18 L18.5 20.5 L21 16 L24 18.5 L27 13"}
          stroke={p ? "#22c55e" : "#0ea5e9"} strokeWidth={p ? 2.2 : 1.8}
          strokeLinecap="round" strokeLinejoin="round" fill="none"
          strokeDasharray={p ? "none" : "30"} strokeDashoffset={p ? "0" : undefined}
          style={{ transition: "d 0.2s, stroke 0.15s, stroke-width 0.1s",
            animation: p ? "none" : "iso-oracle-line 2.5s ease-in-out infinite" }}/>
        <ellipse cx="20" cy="34" rx="8" ry="3" fill="#e8f5ef" stroke="#1a1a1a" strokeWidth="1"/>
        <rect x="17" y="30" width="6" height="4" rx="1.5" fill="#d4eee4" stroke="#1a1a1a" strokeWidth="1"/>
        {/* Star — press bursts */}
        <path d="M30 6 L31 3 L32 6 L35 6 L32.5 7.8 L33.5 11 L31 9 L28.5 11 L29.5 7.8 L27 6 Z"
          fill={p ? "#f5c518" : "#f5c518"} stroke="#1a1a1a" strokeWidth="0.7"
          style={{ transformOrigin: "31px 7px",
            transform: p ? "scale(1.5) rotate(20deg)" : "scale(1) rotate(0deg)",
            transition: "transform 0.2s cubic-bezier(0.2,0,0,1)",
            animation: p ? "none" : "iso-oracle-star 1.8s ease-in-out infinite" }}/>
      </svg>
    ),

    guardian: (
      <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
        {/* Shield — press flashes full green */}
        <path d="M20 3 L32 8 L32 20 C32 29 20 36 20 36 C20 36 8 29 8 20 L8 8 Z"
          fill={p ? "#22c55e" : "#e8f9e8"} stroke={p ? "#16a34a" : "#1a1a1a"}
          strokeWidth="1.4" strokeLinejoin="round"
          style={{ transition: "fill 0.15s, stroke 0.15s",
            transformOrigin: "20px 20px", animation: p ? "none" : "iso-guard-pulse 2s ease-in-out infinite" }}/>
        <circle cx="20" cy="18" r="6.5" fill="white" stroke="#1a1a1a" strokeWidth="1"/>
        {/* $ — press shoots up */}
        <text x="20" y={p ? "16" : "21"} textAnchor="middle" fontSize="7.5" fontWeight="900"
          fill={p ? "#16a34a" : "#22c55e"} fontFamily="sans-serif"
          style={{ transition: "y 0.2s, fill 0.15s", animation: p ? "none" : "iso-guard-dollar 2s ease-in-out infinite" }}>$</text>
        <path d="M30 24 L30 32 L26 28 M30 32 L34 28"
          stroke={p ? "#fff" : "#22c55e"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
          style={{ transition: "stroke 0.15s", animation: p ? "none" : "iso-guard-arrow 2s ease-in-out infinite" }}/>
      </svg>
    ),

    money: (
      <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
        {/* Notes — press fans out wide */}
        {[0,1,2].map((i) => (
          <g key={i} style={{
            transformOrigin: "20px 21px",
            transform: p
              ? `rotate(${(i-1)*18}deg) translateY(${-4+i*2}px)`
              : "rotate(0deg) translateY(0px)",
            transition: `transform 0.2s cubic-bezier(0.2,0,0,1) ${i*0.04}s`,
            animation: p ? "none" : `iso-money-fan ${1.8 + i * 0.15}s ease-in-out infinite ${i * 0.2}s`
          }}>
            <rect x={7 + i * 1.5} y={14 + [8,5,2][i]} width={26 - i * 3} height={13} rx="2.5"
              fill={p ? ["#dcfce7","#bbf7d0","#86efac"][i] : (i === 2 ? "#f5f5f5" : i === 1 ? "#eaeaea" : "#e0e0e0")}
              stroke="#1a1a1a" strokeWidth="1.1" style={{ transition: "fill 0.15s" }}/>
            <circle cx={20 - i * 0.5} cy={20.5 + [8,5,2][i]} r="3.2" fill="none" stroke="#1a1a1a" strokeWidth="0.9"/>
          </g>
        ))}
        <text x="20" y="22.5" textAnchor="middle" fontSize="6" fontWeight="800" fill="#1a1a1a" fontFamily="sans-serif" opacity="0.45">$</text>
      </svg>
    ),

    tag: (
      <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
        {/* Tag — press swings hard */}
        <g style={{
          transformOrigin: "5px 5px",
          transform: p ? "rotate(15deg)" : "rotate(0deg)",
          transition: "transform 0.2s cubic-bezier(0.34,1.56,0.64,1)",
          animation: p ? "none" : "iso-tag-swing 2s ease-in-out infinite"
        }}>
          <path d="M5 5 L5 18 L22 35 C23 36 25 36 26 35 L35 26 C36 25 36 23 35 22 L18 5 Z"
            fill={p ? "#f0fdf4" : "#f8f8f8"} stroke="#1a1a1a" strokeWidth="1.4" strokeLinejoin="round"
            style={{ transition: "fill 0.15s" }}/>
          <circle cx="12" cy="12" r="3" fill={p ? "#22c55e" : "#e8f5ef"} stroke="#1a1a1a" strokeWidth="1"
            style={{ transition: "fill 0.15s" }}/>
          <line x1="16" y1="24" x2="26" y2="14" stroke="#e5e5e5" strokeWidth="1.3"/>
          <line x1="20" y1="28" x2="30" y2="18" stroke="#e5e5e5" strokeWidth="1.3"/>
        </g>
        {/* Price badge — press makes number bigger */}
        <rect x="23" y="2" width="14" height="8" rx="3"
          fill={p ? "#16a34a" : "#22c55e"}
          style={{ transition: "fill 0.15s", transformOrigin: "30px 6px",
            transform: p ? "scale(1.2)" : "scale(1)", animation: p ? "none" : "iso-tag-price 2s ease-in-out infinite" }}/>
        <text x="30" y="8" textAnchor="middle" fontSize="5" fontWeight="900" fill="white" fontFamily="sans-serif">+22%</text>
      </svg>
    ),

    card: (
      <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
        <rect x="3" y="10" width="34" height="22" rx="4"
          fill={p ? "#f0fdf4" : "#f8f8f8"} stroke="#1a1a1a" strokeWidth="1.4" style={{ transition: "fill 0.15s" }}/>
        <rect x="3" y="16" width="34" height="7" fill="#e8f5ef" stroke="#1a1a1a" strokeWidth="0.8"/>
        {/* Chip — press locks in place and highlights */}
        <rect x="7" y="13" width="8" height="6" rx="1.5"
          fill={p ? "#22c55e" : "#f5c518"} stroke="#1a1a1a" strokeWidth="0.8"
          style={{ transition: "fill 0.15s", animation: p ? "none" : "iso-card-chip 2.2s ease-in-out infinite" }}/>
        <rect x="21" y="24" width="6" height="3.5" rx="1" fill="#e5e5e5"/>
        <rect x="29" y="24" width="5" height="3.5" rx="1" fill="#e5e5e5"/>
        {/* Green dot — press explodes into ripple */}
        <circle cx="32" cy="13" r={p ? 6 : 3.5}
          fill="#22c55e" stroke="#1a1a1a" strokeWidth="0.9"
          style={{ transition: "r 0.15s", opacity: p ? 0.8 : 1 }}>
          {!p && <animate attributeName="r" values="3;4.5;3" dur="1.6s" repeatCount="indefinite"/>}
          {!p && <animate attributeName="opacity" values="1;0.65;1" dur="1.6s" repeatCount="indefinite"/>}
        </circle>
        {/* Press: ripple rings */}
        {p && [1,2].map(i => (
          <circle key={i} cx="32" cy="13" r={6 + i*5} stroke="#22c55e"
            strokeWidth="1" fill="none" opacity={0.4 - i*0.15}/>
        ))}
      </svg>
    ),

    doc: (
      <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
        <rect x="6" y="3" width="28" height="34" rx="4"
          fill={p ? "#f0fdf4" : "#f8f8f8"} stroke="#1a1a1a" strokeWidth="1.4" style={{ transition: "fill 0.15s" }}/>
        <path d="M22 3 L22 11 L34 11" fill="#e8f5ef" stroke="#1a1a1a" strokeWidth="1.1"/>
        {/* Lines — press fills all instantly, turn green */}
        {[15,20,25].map((y,i) => (
          <line key={i} x1="10" y1={y} x2={p ? 30 : [30,26,28][i]} y2={y}
            stroke={p ? "#22c55e" : "#e5e5e5"} strokeWidth={p ? 1.8 : 1.3}
            strokeDasharray={p ? "none" : "22"}
            style={{ transition: `stroke 0.1s ${i*0.05}s, stroke-width 0.1s`,
              animation: p ? "none" : `iso-doc-line 2.8s ease-in-out infinite ${i*0.25}s` }}/>
        ))}
        {/* Green underline — press makes it thick and bright */}
        <line x1="10" y1="31" x2={p ? 30 : 22} y2="31"
          stroke="#22c55e" strokeWidth={p ? 3 : 2.2} strokeLinecap="round"
          strokeDasharray={p ? "none" : "14"}
          style={{ transition: "stroke-width 0.1s, x2 0.15s",
            animation: p ? "none" : "iso-doc-check 2.8s ease-in-out infinite" }}/>
      </svg>
    ),

    bolt: (
      <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
        <ellipse cx="20" cy="36" rx="8" ry="2.5" fill="rgba(0,0,0,0.07)"/>
        {/* Glow — press makes it burst */}
        <circle cx="20" cy="20" r={p ? 18 : 14} fill="#fffde7" stroke="none"
          style={{ transition: "r 0.15s", opacity: p ? 0.7 : 0 }}>
          {!p && <animate attributeName="opacity" values="0;0.6;0" dur="1.4s" repeatCount="indefinite"/>}
          {!p && <animate attributeName="r" values="10;16;10" dur="1.4s" repeatCount="indefinite"/>}
        </circle>
        {/* Bolt — press goes full gold */}
        <path d="M23 5 L13 21 L18 21 L17 35 L28 17 L23 17 Z"
          fill={p ? "#f5c518" : "#fff9c4"}
          stroke={p ? "#b45309" : "#1a1a1a"} strokeWidth="1.4" strokeLinejoin="round"
          style={{ transition: "fill 0.1s, stroke 0.1s", transformOrigin: "20px 20px",
            transform: p ? "scale(1.1)" : "scale(1)",
            animation: p ? "none" : "iso-bolt-flash 1.4s ease-in-out infinite" }}>
          {!p && <animate attributeName="fill" values="#fff9c4;#f5c518;#fff9c4" dur="1.4s" repeatCount="indefinite"/>}
        </path>
        {/* Press: spark lines */}
        {p && [0,45,90,135,180,225,270,315].map((deg,i) => (
          <line key={i}
            x1={20 + Math.cos(deg*Math.PI/180)*8}
            y1={20 + Math.sin(deg*Math.PI/180)*8}
            x2={20 + Math.cos(deg*Math.PI/180)*14}
            y2={20 + Math.sin(deg*Math.PI/180)*14}
            stroke="#f5c518" strokeWidth="1.5" strokeLinecap="round" opacity="0.8"/>
        ))}
      </svg>
    ),

    lock: (
      <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
        {/* Body */}
        <rect x="8" y="18" width="24" height="19" rx="4"
          fill={p ? "#f0fdf4" : "#f8f8f8"} stroke="#1a1a1a" strokeWidth="1.4"
          style={{ transition: "fill 0.15s" }}/>
        {/* Shackle — IDLE: opens/closes loop; PRESS: snaps fully open then bounces shut */}
        <path d="M13 18 L13 13 C13 7.5 27 7.5 27 13 L27 18"
          fill="none" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round"
          style={{
            transform: p ? "translateY(-7px)" : "translateY(0)",
            transition: p ? "transform 0.15s cubic-bezier(0.34,1.56,0.64,1)" : "transform 0.3s ease",
          }}>
          {!p && <animate attributeName="d"
            values="M13 18 L13 13 C13 7.5 27 7.5 27 13 L27 18;M13 18 L13 10 C13 4.5 27 4.5 27 10 L27 16;M13 18 L13 10 C13 4.5 27 4.5 27 10 L27 16;M13 18 L13 13 C13 7.5 27 7.5 27 13 L27 18"
            dur="2.4s" keyTimes="0;0.35;0.65;1" repeatCount="indefinite"/>}
        </path>
        {/* Keyhole */}
        <circle cx="20" cy="27.5" r="3.5"
          fill={p ? "#22c55e" : "#c8f5e4"} stroke="#1a1a1a" strokeWidth="1"
          style={{ transition: "fill 0.15s" }}>
          {!p && <animate attributeName="fill" values="#c8f5e4;#22c55e;#c8f5e4;#c8f5e4" dur="2.4s" keyTimes="0;0.35;0.65;1" repeatCount="indefinite"/>}
        </circle>
        <line x1="20" y1="27.5" x2="20" y2="32" stroke="#1a1a1a" strokeWidth="1.4" strokeLinecap="round"/>
        {/* Press: click shimmer */}
        {p && <rect x="8" y="18" width="24" height="19" rx="4" fill="white" opacity="0.4"/>}
        {p && <circle cx="20" cy="27.5" r="7" stroke="#22c55e" strokeWidth="1.5" fill="none" opacity="0.5"/>}
      </svg>
    ),
  };

  return (
    <div style={{ width: size, height: size, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {icons[iconKey] ?? <span style={{ fontSize: 32 }}>📌</span>}
    </div>
  );
}

/* ── MobileNavItem — float + 3D tilt + press interaction ─ */
function MobileNavItem({ iconKey, label, desc, tag, onClick, index = 0 }: {
  iconKey: string; label: string; desc: string; tag?: string; onClick: () => void; index?: number;
}) {
  const [pressed, setPressed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const floatAnim = `mobFloat${index % 4}`;
  const floatDelay = `${index * 0.18}s`;

  return (
    <div
      onClick={onClick}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => { setPressed(false); setHovered(false); }}
      onPointerEnter={() => setHovered(true)}
      style={{
        display: "flex", alignItems: "center", gap: 16,
        padding: "11px 8px", borderRadius: 16, cursor: "pointer",
        background: pressed ? "#f0f0f0" : hovered ? "#f8f8f8" : "transparent",
        transform: pressed ? "scale(0.97)" : "scale(1)",
        transition: "background 0.15s ease, transform 0.18s ease",
        WebkitTapHighlightColor: "transparent",
        animation: `mobSlideIn 0.32s cubic-bezier(0.2,0,0,1) ${index * 0.055}s both`,
      }}
    >
      {/* Outer: 3D perspective tilt */}
      <div style={{
        width: 64, height: 64, flexShrink: 0,
        transform: pressed
          ? "perspective(180px) rotateX(10deg) rotateY(-8deg) scale(1.10)"
          : hovered
          ? "perspective(180px) rotateX(-5deg) rotateY(5deg) scale(1.05)"
          : "perspective(180px) rotateX(0) rotateY(0) scale(1)",
        transition: "transform 0.22s cubic-bezier(0.2,0,0,1)",
        filter: pressed
          ? "drop-shadow(0 12px 24px rgba(0,0,0,0.22))"
          : "drop-shadow(0 4px 10px rgba(0,0,0,0.12))",
      }}>
        {/* Inner: float bob (paused when pressed) */}
        <div style={{
          width: 64, height: 64,
          display: "flex", alignItems: "center", justifyContent: "center",
          animationName: pressed ? "none" : floatAnim,
          animationDuration: `${2.8 + (index % 3) * 0.4}s`,
          animationTimingFunction: "ease-in-out",
          animationIterationCount: "infinite",
          animationDelay: floatDelay,
        }}>
          <LiveIcon iconKey={iconKey} pressed={pressed} size={60} />
        </div>
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 3 }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: "#0a0a0a", letterSpacing: "-0.01em" }}>{label}</span>
          {tag && (
            <span style={{ fontSize: 9, fontWeight: 800, background: "#22c55e", color: "#fff", borderRadius: 100, padding: "2px 7px", letterSpacing: "0.06em", flexShrink: 0 }}>{tag}</span>
          )}
        </div>
        <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.45 }}>{desc}</div>
      </div>

      {/* Arrow */}
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
        style={{ flexShrink: 0, opacity: hovered || pressed ? 0.8 : 0.28, transform: hovered ? "translateX(3px)" : "none", transition: "all 0.2s ease" }}>
        <path d="M6.5 4L11.5 9L6.5 14" stroke="#0a0a0a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>

      <style>{`
        @keyframes mobSlideIn { from{opacity:0;transform:translateY(12px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes mobFloat0 { 0%,100%{transform:translateY(0) rotate(-1deg)} 50%{transform:translateY(-7px) rotate(1.5deg)} }
        @keyframes mobFloat1 { 0%,100%{transform:translateY(0) rotate(1deg)} 50%{transform:translateY(-5px) rotate(-1deg)} }
        @keyframes mobFloat2 { 0%,100%{transform:translateY(-3px) rotate(0deg)} 50%{transform:translateY(4px) rotate(2deg)} }
        @keyframes mobFloat3 { 0%,100%{transform:translateY(2px) rotate(-2deg)} 50%{transform:translateY(-6px) rotate(0.5deg)} }
        @keyframes iso-kill-badge-press { 0%{transform:scale(1)} 50%{transform:scale(1.8)} 100%{transform:scale(1.2)} }
        @keyframes iso-zombie-spin-fast { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
      `}</style>
    </div>
  );
}

/* ── Navbar ──────────────────────────────────────── */
export function Navbar() {
  const [announce, setAnnounce] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string|null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [, navigate] = useLocation();
  const { openContact } = useModal();

  useLayoutEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 860);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const go = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileOpen(false);
  };

  const mobileLinks = [
    { label: "Products",   items: PRODUCTS_NAV },
    { label: "Use Cases",  items: USECASES_NAV },
    { label: "Developers", items: DEVS_NAV },
    { label: "Customers",  path: "/customers" },
    { label: "Pricing",    path: "/pricing" },
    { label: "Careers",    path: "/careers" },
  ];

  return (
    <div style={{ position: "sticky", top: 0, zIndex: 300 }}>
      {announce && (
        <div style={{ background: "#0a0a0a", color: "rgba(255,255,255,0.7)", fontSize: 13, fontWeight: 500, padding: "10px 20px", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, position: "relative" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block", animation: "recekonDot 1.8s infinite" }} />
          RECEKON is now accepting early access —{" "}
          <span style={{ color: "#fff", fontWeight: 700, cursor: "pointer", textDecoration: "underline" }} onClick={() => openContact("I'd like to join the RECEKON waitlist.")}>Join the waitlist →</span>
          <button onClick={() => setAnnounce(false)} style={{ position: "absolute", right: 16, background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: 18, lineHeight: 1 }}>×</button>
        </div>
      )}
      <nav style={{ background: "rgba(255,255,255,0.97)", borderBottom: "1px solid #e5e5e5", backdropFilter: "blur(12px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(16px,3.5vw,40px)", height: 64, display: "flex", alignItems: "center" }}>
          <div onClick={() => go("/")} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", marginRight: 32, flexShrink: 0 }}>
            <div style={{ width: 30, height: 30, background: "#0a0a0a", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 11L5 4L8.5 7.5L12 2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.04em", color: "#0a0a0a" }}>RECEKON</span>
          </div>

          {/* Desktop nav */}
          {!isMobile && (
            <ul style={{ display: "flex", alignItems: "center", gap: 2, flex: 1, listStyle: "none" }} className="recekon-nav-links">
              <NavItem label="Products">
                <MegaDropdown items={PRODUCTS_NAV} onClose={() => {}} twoCol={true} />
              </NavItem>
              <NavItem label="Use Cases">
                <MegaDropdown items={USECASES_NAV} onClose={() => {}} twoCol={true} />
              </NavItem>
              <NavItem label="Developers">
                <MegaDropdown items={DEVS_NAV} onClose={() => {}} twoCol={true} />
              </NavItem>
              <NavItem label="Customers"  onClick={() => go("/customers")} />
              <NavItem label="Pricing"    onClick={() => go("/pricing")} />
              <NavItem label="Careers"    onClick={() => go("/careers")} />
            </ul>
          )}

          <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: "auto" }}>
            {!isMobile && <>
              <button style={{ fontSize: 14, fontWeight: 500, color: "#374151", background: "none", border: "none", cursor: "pointer", padding: "8px 14px", borderRadius: 8, fontFamily: "inherit" }}
                onClick={() => openContact("I'd like to log in to my RECEKON account.")}>Log In</button>
              <button style={{ background: "#0a0a0a", color: "#fff", border: "none", borderRadius: 8, padding: "10px 18px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" }}
                onClick={() => openContact("I'd like to get started with RECEKON.")}
                onMouseEnter={e => { e.currentTarget.style.background = "#1a1a1a"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#0a0a0a"; }}>
                Get Started ›
              </button>
            </>}
            {isMobile && (
              <button
                onClick={() => setMobileOpen(o => !o)}
                aria-label="Menu"
                style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", display: "flex", flexDirection: "column", gap: 5, alignItems: "center", justifyContent: "center" }}
              >
                <span style={{ display: "block", width: 22, height: 2, background: "#0a0a0a", borderRadius: 2, transition: "all 0.25s", transform: mobileOpen ? "rotate(45deg) translate(0, 7px)" : "none" }} />
                <span style={{ display: "block", width: 22, height: 2, background: "#0a0a0a", borderRadius: 2, transition: "all 0.25s", opacity: mobileOpen ? 0 : 1 }} />
                <span style={{ display: "block", width: 22, height: 2, background: "#0a0a0a", borderRadius: 2, transition: "all 0.25s", transform: mobileOpen ? "rotate(-45deg) translate(0, -7px)" : "none" }} />
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      {isMobile && mobileOpen && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "#fff", zIndex: 299, overflowY: "auto" }}>
          {/* Close button row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", height: 64, borderBottom: "1px solid #f0f0f0", position: "sticky", top: 0, background: "#fff", zIndex: 2 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 28, height: 28, background: "#0a0a0a", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M2 11L5 4L8.5 7.5L12 2" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <span style={{ fontSize: 17, fontWeight: 800, letterSpacing: "-0.04em" }}>RECEKON</span>
            </div>
            <button onClick={() => setMobileOpen(false)}
              style={{ background: "#f5f5f5", border: "none", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 18, color: "#0a0a0a", fontWeight: 300, lineHeight: 1 }}>
              ✕
            </button>
          </div>
          <div style={{ padding: "12px 20px 48px" }}>
            {mobileLinks.map((section, i) => (
              <div key={i} style={{ borderBottom: "1px solid #f2f2f2" }}>
                {"path" in section ? (
                  /* Simple nav link — no dropdown */
                  <button onClick={() => go(section.path!)}
                    style={{ width: "100%", textAlign: "left", padding: "18px 0", fontSize: 18, fontWeight: 600, color: "#0a0a0a", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    {section.label}
                    <span style={{ color: "#c8c8c8", fontSize: 18 }}>›</span>
                  </button>
                ) : (
                  <>
                    {/* Section header — tap to expand */}
                    <button onClick={() => setOpenSection(openSection === section.label ? null : section.label)}
                      style={{ width: "100%", textAlign: "left", padding: "18px 0", fontSize: 18, fontWeight: 600, color: "#0a0a0a", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      {section.label}
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ transition: "transform 0.25s ease", transform: openSection === section.label ? "rotate(180deg)" : "none", flexShrink: 0 }}>
                        <path d="M5 7.5L10 12.5L15 7.5" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>

                    {/* Expanded items — knot style */}
                    {openSection === section.label && (
                      <div style={{ paddingBottom: 8, paddingTop: 4, animation: "megaFadeIn 0.22s ease" }}>
                        {section.items!.map((item, j) => (
                          <MobileNavItem
                            key={j}
                            index={j}
                            iconKey={item.iconKey}
                            label={item.label}
                            desc={item.desc}
                            tag={item.tag}
                            onClick={() => go(item.href)}
                          />
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
            <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 10 }}>
              <button onClick={() => { openContact("I'd like to get started with RECEKON."); setMobileOpen(false); }}
                style={{ width: "100%", padding: "16px", fontSize: 16, fontWeight: 700, background: "#0a0a0a", color: "#fff", border: "none", borderRadius: 14, cursor: "pointer", fontFamily: "inherit", letterSpacing: "-0.01em" }}>
                Get Started ›
              </button>
              <button onClick={() => { openContact("I'd like to log in to my RECEKON account."); setMobileOpen(false); }}
                style={{ width: "100%", padding: "16px", fontSize: 16, fontWeight: 600, background: "transparent", color: "#0a0a0a", border: "1.5px solid #e5e5e5", borderRadius: 14, cursor: "pointer", fontFamily: "inherit" }}>
                Log In
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes recekonDot{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.5);opacity:0.6}}
      `}</style>
    </div>
  );
}

/* ── Footer ──────────────────────────────────────── */
export function Footer() {
  const [, navigate] = useLocation();
  const go = (p: string) => { navigate(p); window.scrollTo({ top: 0, behavior: "smooth" }); };
  return (
    <footer style={{ background: "#0a0a0a", borderTop: "1px solid #1a1a1a", padding: "clamp(36px,5vw,56px) clamp(16px,3.5vw,40px) clamp(20px,3vw,32px)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(16px,3.5vw,40px)" }}>
        <div style={{ display: "grid", gap: 40, marginBottom: 48, paddingBottom: 48, borderBottom: "1px solid #1a1a1a" }} className="recekon-footer-grid">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, cursor: "pointer" }} onClick={() => go("/")}>
              <div style={{ width: 26, height: 26, background: "#fff", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M2 11L5 4L8.5 7.5L12 2" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-0.03em", color: "#fff" }}>RECEKON</span>
            </div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.7, maxWidth: 220 }}>The Autonomous Financial Defense Layer.</p>
          </div>
          {[
            { h: "Products",   links: [["Stitching Engine™","/products/stitching-engine"],["Kill Switch™","/products/kill-switch"],["Cash Flow Oracle™","/products/cash-flow-oracle"],["Price Guardian™","/products/price-guardian"]] },
            { h: "Company",    links: [["Customers","/customers"],["Pricing","/pricing"],["Careers","/careers"],["Roadmap","/roadmap"]] },
            { h: "Developers", links: [["Documentation","/developers"],["Quickstart","/developers"],["Security","/developers"]] },
            { h: "Legal",      links: [["Privacy","/privacy"],["Terms","/terms"],["Security","/developers/security"],["GDPR","/gdpr"]] },
          ].map(col => (
            <div key={col.h}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>{col.h}</div>
              {col.links.map(([label, href]) => (
                <div key={label} onClick={() => go(href)} style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginBottom: 10, cursor: "pointer", transition: "color 0.15s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}>{label}</div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }}>© 2025 RECEKON Inc. All rights reserved.</span>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }}>Built in Canada 🍁</span>
        </div>
      </div>
      <style>{`.recekon-footer-grid{grid-template-columns:2fr 1fr 1fr 1fr 1fr} @media(max-width:900px){.recekon-footer-grid{grid-template-columns:1fr 1fr 1fr!important}} @media(max-width:500px){.recekon-footer-grid{grid-template-columns:1fr 1fr!important}}`}</style>
    </footer>
  );
}

/* ── Page wrapper ────────────────────────────────── */
export function Page({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

/* ── Page hero helper ────────────────────────────── */
export function PageHero({ tag, title, body, accent = "#0a0a0a" }: { tag: string; title: string; body: string; accent?: string }) {
  return (
    <div style={{ background: "#fff", borderBottom: "1px solid #e5e5e5", padding: "clamp(40px,7vw,80px) clamp(16px,3.5vw,40px) clamp(32px,5vw,60px)" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", padding: "0 clamp(16px,3.5vw,32px)" }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>{tag}</p>
        <h1 style={{ fontSize: "clamp(36px,5vw,68px)", fontWeight: 800, letterSpacing: "-0.035em", color: "#0a0a0a", marginBottom: 20, lineHeight: 1.05 }}>{title}</h1>
        <p style={{ fontSize: 18, color: "#6b7280", lineHeight: 1.75, maxWidth: 580, margin: "0 auto", padding: "0 clamp(16px,3.5vw,40px)" }}>{body}</p>
      </div>
    </div>
  );
}
