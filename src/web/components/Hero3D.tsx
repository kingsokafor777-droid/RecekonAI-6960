import { useEffect, useState } from "react";

/* ─── Large 3D isometric illustration for the hero ──────
   Based on the video reference: big wallet/card/coin 3D objects
   floating in the hero, bold outlines, flat-3D isometric style
   ───────────────────────────────────────────────────────── */

function float(delay = 0, amplitude = 12) {
  return {
    animation: `iso3dFloat${amplitude} ${3.5 + delay * 0.3}s ease-in-out infinite`,
    animationDelay: `${delay}s`,
  } as React.CSSProperties;
}

/* Big Isometric Wallet */
function BigWallet({ size = 260 }: { size?: number }) {
  const s = size / 260;
  return (
    <svg width={size} height={size * 0.85} viewBox="0 0 260 220" fill="none">
      {/* Shadow */}
      <ellipse cx="130" cy="205" rx="90" ry="14" fill="rgba(0,0,0,0.10)"/>
      {/* Wallet body — isometric box */}
      {/* Right face */}
      <path d="M170 60 L230 95 L230 155 L170 190 Z" fill="#e0e0e0" stroke="#0a0a0a" strokeWidth="3" strokeLinejoin="round"/>
      {/* Left face */}
      <path d="M30 95 L90 60 L170 60 L170 190 L90 190 L30 155 Z" fill="#f5f5f5" stroke="#0a0a0a" strokeWidth="3" strokeLinejoin="round"/>
      {/* Top face */}
      <path d="M90 60 L170 60 L230 95 L150 95 Z" fill="#fafafa" stroke="#0a0a0a" strokeWidth="3" strokeLinejoin="round"/>
      {/* Wallet clasp/button */}
      <circle cx="190" cy="125" r="18" fill="#f5e6a0" stroke="#0a0a0a" strokeWidth="2.5"/>
      <circle cx="190" cy="125" r="10" fill="#e8d080" stroke="#0a0a0a" strokeWidth="1.5"/>

      {/* Cards sticking up from wallet */}
      {/* Card 1 (back) */}
      <path d="M65 40 L130 5 L165 25 L100 60 Z" fill="#c8f5e4" stroke="#0a0a0a" strokeWidth="2.5" strokeLinejoin="round"/>
      <path d="M65 40 L100 60 L100 48 L65 28 Z" fill="#a8e8d4" stroke="#0a0a0a" strokeWidth="2" strokeLinejoin="round"/>
      {/* Card 2 (front) */}
      <path d="M55 55 L120 20 L155 40 L90 75 Z" fill="#a8ecf0" stroke="#0a0a0a" strokeWidth="2.5" strokeLinejoin="round"/>
      <path d="M55 55 L90 75 L90 63 L55 43 Z" fill="#88d8e0" stroke="#0a0a0a" strokeWidth="2" strokeLinejoin="round"/>
      {/* Chip on front card */}
      <rect x="80" y="32" width="18" height="13" rx="3" fill="#f5c518" stroke="#0a0a0a" strokeWidth="1.5"/>

      {/* Black stripe on wallet left */}
      <rect x="30" y="110" width="140" height="18" fill="#1a1a1a" opacity="0.15"/>
    </svg>
  );
}

/* Floating coin */
function BigCoin({ size = 90, color = "#f5c518", label = "$" }: { size?: number; color?: string; label?: string }) {
  const d = size;
  return (
    <svg width={d} height={d} viewBox="0 0 90 90" fill="none">
      <ellipse cx="45" cy="80" rx="32" ry="8" fill="rgba(0,0,0,0.08)"/>
      {/* Coin side (isometric depth) */}
      <ellipse cx="45" cy="46" rx="36" ry="10" fill={color === "#f5c518" ? "#d4a800" : "#b08000"} stroke="#0a0a0a" strokeWidth="2"/>
      <rect x="9" y="36" width="72" height="10" fill={color === "#f5c518" ? "#d4a800" : "#b08000"} stroke="#0a0a0a" strokeWidth="2"/>
      {/* Coin face */}
      <ellipse cx="45" cy="36" rx="36" ry="10" fill={color} stroke="#0a0a0a" strokeWidth="2.5"/>
      <ellipse cx="45" cy="36" rx="28" ry="7.5" fill={color === "#f5c518" ? "#ffd700" : "#c8a000"} stroke="#0a0a0a" strokeWidth="1.5"/>
      <text x="45" y="40" textAnchor="middle" fontSize="12" fontWeight="900" fill="rgba(0,0,0,0.4)" fontFamily="sans-serif">{label}</text>
    </svg>
  );
}

/* Receipt slip */
function BigReceipt({ size = 100 }: { size?: number }) {
  const w = size * 0.65, h = size;
  return (
    <svg width={w + 24} height={h} viewBox="0 0 100 160" fill="none">
      <ellipse cx="60" cy="152" rx="36" ry="7" fill="rgba(0,0,0,0.08)"/>
      {/* Shadow left face */}
      <path d="M16 12 L16 148 L8 142 L8 18 Z" fill="#ddd" stroke="#0a0a0a" strokeWidth="2" strokeLinejoin="round"/>
      {/* Bottom zigzag */}
      <path d="M16 148 L28 140 L40 148 L52 140 L64 148 L76 140 L88 148 L88 12 L16 12 Z" fill="#fff" stroke="#0a0a0a" strokeWidth="2.5" strokeLinejoin="round"/>
      {/* Lines */}
      <line x1="26" y1="32" x2="78" y2="32" stroke="#e5e5e5" strokeWidth="2.5"/>
      <line x1="26" y1="44" x2="65" y2="44" stroke="#e5e5e5" strokeWidth="2.5"/>
      <line x1="26" y1="56" x2="72" y2="56" stroke="#e5e5e5" strokeWidth="2.5"/>
      <line x1="26" y1="68" x2="60" y2="68" stroke="#e5e5e5" strokeWidth="2.5"/>
      {/* Green total line */}
      <line x1="26" y1="88" x2="78" y2="88" stroke="#22c55e" strokeWidth="3"/>
      {/* Check */}
      <path d="M60 104 L66 110 L78 96" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════
   CYCLING FLOATING CARDS — each slot rotates through
   rich content every few seconds with smooth fade
   ══════════════════════════════════════════════════════════ */

// Each "slot" cycles its own list independently
type CardSlot = {
  items: CardItem[];
  interval: number;   // ms between transitions
};

type CardItem =
  | { type: "stat";     label: string; value: string; valueColor?: string }
  | { type: "receipt";  title: string; items: { name: string; price: string }[]; total: string }
  | { type: "live";     text: string; dotColor?: string }
  | { type: "alert";    title: string; body: string; severity: "green" | "red" | "amber" }
  | { type: "trend";    label: string; items: { name: string; change: string; dir: "up" | "down" }[] }
  | { type: "forecast"; label: string; value: string; sub: string };

// TOP CENTER slot — live activity feed
const TOP_SLOT: CardSlot = {
  interval: 2800,
  items: [
    { type: "live",  text: "3 zombies killed today",               dotColor: "#22c55e" },
    { type: "live",  text: "🌱 Impact Layer: CO₂ 6.2kg — Uber ride", dotColor: "#16a34a" },
    { type: "live",  text: "Receipt matched — Target ✓",           dotColor: "#22c55e" },
    { type: "live",  text: "Adobe CC blocked — unused 67d",         dotColor: "#ef4444" },
    { type: "live",  text: "🌍 Transport spend: 62kg CO₂ this month", dotColor: "#16a34a" },
    { type: "live",  text: "Tax report ready — $2,847 found",       dotColor: "#22c55e" },
    { type: "live",  text: "🌱 Saved 23 paper receipts this month",  dotColor: "#16a34a" },
    { type: "live",  text: "Price drop: Sony WH ↓ $60",             dotColor: "#0ea5e9" },
    { type: "live",  text: "⚡ Eco tip: Switch 2 rides → save $90/mo", dotColor: "#16a34a" },
    { type: "live",  text: "Stitching Engine — processing…",         dotColor: "#f59e0b" },
    { type: "live",  text: "Plaid webhook received 📡",               dotColor: "#22c55e" },
    { type: "live",  text: "🌍 Monthly impact score: 142kg CO₂",     dotColor: "#16a34a" },
  ],
};

// BOTTOM RIGHT slot — big savings / receipts / forecasts
const BOTTOM_RIGHT_SLOT: CardSlot = {
  interval: 3400,
  items: [
    { type: "stat",     label: "Saved this month",    value: "+$312",   valueColor: "#22c55e" },
    { type: "receipt",  title: "Target • Oct 27",
      items: [
        { name: "Tide Pods 35ct",   price: "$18.99" },
        { name: "Organic Milk 1gal", price: "$5.49" },
        { name: "USB-C Cable 6ft",  price: "$12.99" },
        { name: "AA Batteries 20pk",price: "$16.85" },
      ],
      total: "$54.32",
    },
    { type: "stat",     label: "Deductions found",    value: "$2,847",  valueColor: "#0a0a0a" },
    { type: "forecast", label: "Balance in 30 days",  value: "+$1,240", sub: "Cash Flow Oracle™" },
    { type: "receipt",  title: "Whole Foods • Oct 24",
      items: [
        { name: "Oat Milk 2L",       price: "$6.49" },
        { name: "Avocado ×4",        price: "$5.99" },
        { name: "Greek Yogurt 500g", price: "$4.29" },
        { name: "Sourdough Bread",   price: "$7.49" },
      ],
      total: "$24.26",
    },
    { type: "alert",    title: "Price drop detected",
      body: "Sony WH-1000XM5 dropped $60 at Best Buy. Return window: 3 days.",
      severity: "green",
    },
    { type: "stat",     label: "Zombies killed",      value: "6",       valueColor: "#ef4444" },
    { type: "alert",    title: "🌍 Impact Layer — Uber ride",
      body: "CO₂: 6.2kg · Water: 12L · 🔴 High Impact\nEco tip: Uber Pool saves $40/mo + 18kg CO₂",
      severity: "green",
    },
    { type: "forecast", label: "CO₂ this month",    value: "142kg",   sub: "🌱 Impact Layer™ — Stitching Engine" },
  ],
};

// BOTTOM LEFT slot — SKU / trends / stats
const BOTTOM_LEFT_SLOT: CardSlot = {
  interval: 4000,
  items: [
    { type: "stat",  label: "SKUs matched",        value: "97.4%",  valueColor: "#0a0a0a" },
    { type: "trend", label: "Your spend this month",
      items: [
        { name: "Household",  change: "+22%", dir: "up" },
        { name: "Groceries",  change: "-8%",  dir: "down" },
        { name: "Software",   change: "+14%", dir: "up" },
      ],
    },
    { type: "stat",  label: "Receipts processed",  value: "1,247",  valueColor: "#0a0a0a" },
    { type: "alert", title: "⚠ Grocery spend rising",
      body: "Tide Pods up $2.30 vs last month. Price Guardian can monitor.",
      severity: "amber",
    },
    { type: "trend", label: "Top SKUs this week",
      items: [
        { name: "Tide Pods 35ct",    change: "#1",  dir: "up" },
        { name: "Oat Milk 2L",       change: "#2",  dir: "up" },
        { name: "USB-C Cable 6ft",   change: "#3",  dir: "up" },
      ],
    },
    { type: "stat",  label: "Accuracy rate",        value: "97.4%",  valueColor: "#22c55e" },
    { type: "trend", label: "🌱 CO₂ by category",
      items: [
        { name: "🔴 Transport",   change: "62kg", dir: "up" },
        { name: "🟡 Shopping",    change: "34kg", dir: "up" },
        { name: "🟢 Groceries",   change: "18kg", dir: "down" },
      ],
    },
    { type: "alert", title: "🌍 Eco tip ready",
      body: "Switch 2 rides/week to transit → save $90/mo + cut 24kg CO₂.",
      severity: "green",
    },
  ],
};

/* ── Renders one card item ──────────────────────────── */
function CardContent({ item }: { item: CardItem }) {
  if (item.type === "live") {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 8, whiteSpace: "nowrap", padding: "9px 16px" }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: item.dotColor || "#22c55e", display: "inline-block", flexShrink: 0, boxShadow: `0 0 6px ${item.dotColor || "#22c55e"}` }} />
        <span style={{ fontSize: 12, fontWeight: 700, color: "#0a0a0a" }}>{item.text}</span>
      </div>
    );
  }

  if (item.type === "stat") {
    return (
      <div style={{ padding: "12px 18px" }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 3 }}>{item.label}</div>
        <div style={{ fontSize: 24, fontWeight: 900, letterSpacing: "-0.04em", color: item.valueColor || "#22c55e" }}>{item.value}</div>
      </div>
    );
  }

  if (item.type === "receipt") {
    return (
      <div style={{ padding: "12px 14px", minWidth: 200 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#22c55e", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8, display: "flex", alignItems: "center", gap: 5 }}>
          <span>✓</span> {item.title}
        </div>
        {item.items.map((row, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 11, padding: "3px 0", borderBottom: i < item.items.length - 1 ? "1px solid #f0f0f0" : "none", gap: 12 }}>
            <span style={{ color: "#374151", flexShrink: 0, maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{row.name}</span>
            <span style={{ color: "#0a0a0a", fontWeight: 700, fontFamily: "monospace", flexShrink: 0 }}>{row.price}</span>
          </div>
        ))}
        <div style={{ marginTop: 8, paddingTop: 6, borderTop: "1.5px solid #e5e5e5", display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 800 }}>
          <span style={{ color: "#0a0a0a" }}>Total</span>
          <span style={{ color: "#16a34a", fontFamily: "monospace" }}>{item.total}</span>
        </div>
      </div>
    );
  }

  if (item.type === "alert") {
    const colors = { green: "#22c55e", red: "#ef4444", amber: "#f59e0b" };
    const bgs    = { green: "#f0fdf4", red: "#fef2f2", amber: "#fffbeb" };
    const c = colors[item.severity];
    return (
      <div style={{ padding: "11px 14px", minWidth: 200 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: c, marginBottom: 5 }}>{item.title}</div>
        <div style={{ fontSize: 11, color: "#374151", lineHeight: 1.5 }}>{item.body}</div>
      </div>
    );
  }

  if (item.type === "trend") {
    return (
      <div style={{ padding: "11px 14px", minWidth: 180 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>{item.label}</div>
        {item.items.map((row, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, padding: "4px 0", borderBottom: i < item.items.length - 1 ? "1px solid #f5f5f5" : "none" }}>
            <span style={{ color: "#374151", fontWeight: 500 }}>{row.name}</span>
            <span style={{ color: row.dir === "up" ? "#ef4444" : "#22c55e", fontWeight: 700, fontFamily: "monospace" }}>{row.change}</span>
          </div>
        ))}
      </div>
    );
  }

  if (item.type === "forecast") {
    return (
      <div style={{ padding: "12px 18px" }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 3 }}>{item.label}</div>
        <div style={{ fontSize: 24, fontWeight: 900, letterSpacing: "-0.04em", color: "#22c55e" }}>{item.value}</div>
        <div style={{ fontSize: 9, color: "#0ea5e9", fontWeight: 700, marginTop: 2, letterSpacing: "0.04em" }}>{item.sub}</div>
      </div>
    );
  }

  return null;
}

/* ── Cycling card wrapper ──────────────────────────── */
function CyclingCard({ slot, style }: { slot: CardSlot; style?: React.CSSProperties }) {
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(true);   // true = visible

  useEffect(() => {
    const t = setInterval(() => {
      // Fade out
      setFade(false);
      setTimeout(() => {
        setIdx(i => (i + 1) % slot.items.length);
        setFade(true);
      }, 320);
    }, slot.interval);
    return () => clearInterval(t);
  }, [slot]);

  const item = slot.items[idx];

  return (
    <div style={{
      background: "#fff",
      border: "1px solid rgba(0,0,0,0.07)",
      borderRadius: 14,
      boxShadow: "0 8px 28px rgba(0,0,0,0.10), 0 2px 4px rgba(0,0,0,0.05), 0 1px 0 rgba(255,255,255,0.9) inset",
      opacity: fade ? 1 : 0,
      transform: fade ? "translateY(0) scale(1)" : "translateY(4px) scale(0.98)",
      transition: "opacity 0.28s ease, transform 0.28s ease",
      overflow: "hidden",
      ...style,
    }}>
      <CardContent item={item} />
    </div>
  );
}

export function Hero3D() {
  const [vis] = useState(true);

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: 500,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "visible",
    }}>
      {/* Soft green radial background */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 70% 70% at 50% 60%, rgba(34,197,94,0.10) 0%, rgba(34,197,94,0.03) 60%, transparent 100%)",
        pointerEvents: "none",
      }} />

      {/* Dotted grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.08) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        opacity: 0.5,
        pointerEvents: "none",
      }} />

      <div style={{
        position: "relative",
        width: "100%",
        maxWidth: 560,
        height: "100%",
        opacity: 1,
        transition: "opacity 1s ease 0.15s",
      }}>
        {/* Center — big wallet */}
        <div style={{
          position: "absolute",
          top: "48%", left: "50%",
          transform: "translate(-50%, -52%)",
          ...float(0, 12),
          zIndex: 4,
        }}>
          <BigWallet size={240} />
        </div>

        {/* Coin top-right */}
        <div style={{ position: "absolute", top: 30, right: 60, ...float(0.5, 10), zIndex: 5 }}>
          <BigCoin size={88} color="#f5c518" label="$" />
        </div>

        {/* Coin mid-left */}
        <div style={{ position: "absolute", top: 140, left: 30, ...float(1.0, 8), zIndex: 3, opacity: 0.85 }}>
          <BigCoin size={60} color="#d4a800" label="$" />
        </div>

        {/* Receipt top-left */}
        <div style={{ position: "absolute", top: 50, left: 80, ...float(0.7, 10), zIndex: 5 }}>
          <BigReceipt size={96} />
        </div>

        {/* TOP CYCLING CARD */}
        <div style={{
          position: "absolute",
          top: 22, left: "50%",
          transform: "translateX(-50%)",
          ...float(0.3, 7),
          zIndex: 8,
        }}>
          <CyclingCard slot={TOP_SLOT} />
        </div>

        {/* BOTTOM RIGHT CYCLING CARD */}
        <div style={{
          position: "absolute",
          bottom: 55, right: 8,
          ...float(0.8, 8),
          zIndex: 8,
        }}>
          <CyclingCard slot={BOTTOM_RIGHT_SLOT} />
        </div>

        {/* BOTTOM LEFT CYCLING CARD */}
        <div style={{
          position: "absolute",
          bottom: 70, left: 2,
          ...float(1.2, 7),
          zIndex: 8,
        }}>
          <CyclingCard slot={BOTTOM_LEFT_SLOT} />
        </div>
      </div>

      <style>{`
        @keyframes iso3dFloat12 {
          0%,100% { transform: translate(-50%, -52%) translateY(0); }
          50% { transform: translate(-50%, -52%) translateY(-12px); }
        }
        @keyframes iso3dFloat10 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes iso3dFloat8  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes iso3dFloat7  { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(-7px)} }
      `}</style>
    </div>
  );
}
