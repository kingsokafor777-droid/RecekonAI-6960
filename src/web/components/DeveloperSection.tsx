import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";

/* ══════════════════════════════════════════════════════
   PRODUCT DEMO SECTION
   Layout:
     Top: [Phone (left, large)] + [3 feature cards stacked right]
     Bottom: 4th feature card — full-width banner
   Phone: Clean flat iPhone, no skew, strong drop shadow
   Cards: Full text, equal height, generous padding
   ══════════════════════════════════════════════════════ */

/* ── Screen Components ─────────────────────────────── */

function ScreenStitch() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setStep(s => Math.min(s + 1, 5)), 850);
    return () => clearInterval(t);
  }, []);
  const items = [
    { icon: "💳", t: "Transaction detected",  s: "$54.32 · TARGET" },
    { icon: "📧", t: "Receipt matched",        s: "order@target.com" },
    { icon: "🔍", t: "OCR parsing receipt",   s: "Confidence: 97.4%" },
    { icon: "✅", t: "4 SKUs extracted",       s: "RECONCILED" },
  ];
  return (
    <div style={{ padding: "16px 14px" }}>
      {items.slice(0, Math.min(step + 1, 4)).map((item, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "10px 12px",
          background: i < step ? "#f0fdf4" : "#f8fafc",
          border: `1px solid ${i < step ? "#bbf7d0" : "#e5e7eb"}`,
          borderRadius: 11, marginBottom: 8,
          animation: "dItemIn 0.35s ease",
        }}>
          <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#111" }}>{item.t}</div>
            <div style={{ fontSize: 9.5, color: "#9ca3af", marginTop: 1 }}>{item.s}</div>
          </div>
          {i < step
            ? <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#22c55e", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            : <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#3b82f6", animation: "dPulse 1s infinite", flexShrink: 0 }} />}
        </div>
      ))}
      {step >= 4 && (
        <div style={{ padding: "12px 14px", background: "#0a0a0a", borderRadius: 12, animation: "dItemIn 0.35s ease" }}>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,0.45)", marginBottom: 8, letterSpacing: "0.06em", textTransform: "uppercase" }}>Extracted SKUs</div>
          {[["Tide Pods 35ct","$18.99"],["Organic Milk","$5.49"],["USB-C Cable","$12.99"],["AA Batteries","$16.85"]].map(([n,p],i)=>(
            <div key={i} style={{ display:"flex", justifyContent:"space-between", fontSize: 11, color: "#e5e7eb", padding: "3px 0", borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
              <span>{n}</span><span style={{ color:"#22c55e", fontWeight: 700 }}>{p}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ScreenKill() {
  const [killed, setKilled] = useState<string[]>([]);
  useEffect(() => {
    const t1 = setTimeout(() => setKilled(["netflix"]), 1000);
    const t2 = setTimeout(() => setKilled(["netflix","adobe"]), 2200);
    const t3 = setTimeout(() => setKilled(["netflix","adobe","gym"]), 3400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);
  const subs = [
    { id:"netflix", icon:"🎬", name:"Netflix",        amt:"$15.99" },
    { id:"adobe",   icon:"🎨", name:"Adobe CC",       amt:"$54.99" },
    { id:"gym",     icon:"💪", name:"Gym Membership", amt:"$49.99" },
    { id:"spotify", icon:"🎵", name:"Spotify",        amt:"$9.99"  },
  ];
  const saved = subs.filter(s=>killed.includes(s.id)).reduce((a,s)=>a+parseFloat(s.amt.replace("$","")),0);
  const remaining = subs.filter(s=>!killed.includes(s.id)).reduce((a,s)=>a+parseFloat(s.amt.replace("$","")),0);
  return (
    <div style={{ padding: "16px 14px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom: 12 }}>
        <span style={{ fontSize: 10, color: "#6b7280" }}>Active subscriptions</span>
        <div style={{ background:"#fef2f2", color:"#ef4444", fontSize: 9.5, fontWeight: 800, padding:"2px 9px", borderRadius: 100 }}>
          ${remaining.toFixed(2)}/mo
        </div>
      </div>
      {subs.map(s => {
        const k = killed.includes(s.id);
        return (
          <div key={s.id} style={{
            display:"flex", alignItems:"center", gap: 10, padding:"9px 12px",
            background: k ? "#f0fdf4" : "#fff",
            border: `1px solid ${k ? "#bbf7d0" : "#e5e7eb"}`,
            borderRadius: 11, marginBottom: 7,
            transition: "all 0.4s ease",
            opacity: k ? 0.7 : 1,
          }}>
            <span style={{ fontSize: 16 }}>{s.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: k ? "#16a34a" : "#111", textDecoration: k ? "line-through" : "none" }}>{s.name}</div>
            </div>
            <span style={{ fontSize: 10.5, fontWeight: 800, color: k ? "#16a34a" : "#ef4444", fontFamily: "monospace" }}>{s.amt}</span>
            {k
              ? <div style={{ width:18, height:18, borderRadius:"50%", background:"#22c55e", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              : <div style={{ background:"#ef4444", color:"#fff", fontSize:9, fontWeight:800, padding:"3px 8px", borderRadius:6, flexShrink:0 }}>Cancel</div>}
          </div>
        );
      })}
      {saved > 0 && (
        <div style={{ marginTop:8, padding:"11px 14px", background:"#0a0a0a", borderRadius:12, display:"flex", justifyContent:"space-between", alignItems:"center", animation:"dItemIn 0.35s ease" }}>
          <span style={{ fontSize:10, color:"rgba(255,255,255,0.45)" }}>Monthly savings recovered</span>
          <span style={{ fontSize:15, fontWeight:900, color:"#22c55e" }}>+${saved.toFixed(2)}</span>
        </div>
      )}
    </div>
  );
}

function ScreenSKU() {
  const [n, setN] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setN(v => Math.min(v+1, 4)), 650);
    return () => clearInterval(t);
  }, []);
  const items = [
    { icon:"🧺", name:"Tide Pods 35ct",    cat:"Household",   price:"$18.99", trend:"+22%", up:true },
    { icon:"🥛", name:"Organic Milk 1gal", cat:"Groceries",   price:"$5.49",  trend:"-4%",  up:false },
    { icon:"⚡", name:"USB-C Cable 6ft",   cat:"Electronics", price:"$12.99", trend:"New",  up:false },
    { icon:"🔋", name:"AA Batteries 20pk", cat:"Household",   price:"$16.85", trend:"+8%",  up:true },
  ];
  return (
    <div style={{ padding:"16px 14px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
        <span style={{ fontSize:10, color:"#6b7280" }}>TARGET · Mar 27</span>
        <div style={{ background:"#eff6ff", color:"#2563eb", fontSize:9.5, fontWeight:800, padding:"2px 9px", borderRadius:100, border:"1px solid #bfdbfe" }}>$54.32 total</div>
      </div>
      {items.slice(0,n).map((item,i)=>(
        <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 12px", background:"#f8fafc", border:"1px solid #e5e7eb", borderRadius:11, marginBottom:7, animation:"dItemIn 0.35s ease" }}>
          <span style={{ fontSize:16 }}>{item.icon}</span>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:11, fontWeight:700, color:"#111" }}>{item.name}</div>
            <div style={{ fontSize:9.5, color:"#9ca3af" }}>{item.cat}</div>
          </div>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontSize:11, fontWeight:800, color:"#111" }}>{item.price}</div>
            <div style={{ fontSize:9, fontWeight:700, color:item.up?"#ef4444":"#22c55e" }}>{item.trend}</div>
          </div>
        </div>
      ))}
      {n>=4 && (
        <div style={{ padding:"9px 12px", background:"#eff6ff", borderRadius:10, border:"1px solid #bfdbfe", fontSize:10, color:"#2563eb", fontWeight:700, animation:"dItemIn 0.35s ease" }}>
          ✓ 4 of 4 SKUs matched · 97.4% confidence
        </div>
      )}
    </div>
  );
}

function ScreenTax() {
  const [n, setN] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setN(v => Math.min(v+1, 5)), 750);
    return () => clearInterval(t);
  }, []);
  const cats = [
    { name:"Home Office",  pct:90, amt:"$1,247", color:"#22c55e" },
    { name:"Software",     pct:68, amt:"$842",   color:"#3b82f6" },
    { name:"Professional", pct:30, amt:"$390",   color:"#7c3aed" },
  ];
  return (
    <div style={{ padding:"16px 14px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
        <span style={{ fontSize:10, color:"#6b7280" }}>Tax year 2025</span>
        <div style={{ background:"#f5f3ff", color:"#7c3aed", fontSize:9.5, fontWeight:800, padding:"2px 9px", borderRadius:100 }}>CRA · IRS · HMRC</div>
      </div>
      {cats.slice(0, n).map((c,i)=>(
        <div key={i} style={{ marginBottom:13, animation:"dItemIn 0.35s ease" }}>
          <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, marginBottom:6 }}>
            <span style={{ fontWeight:600, color:"#111" }}>{c.name}</span>
            <span style={{ fontWeight:800, color:c.color }}>{c.amt}</span>
          </div>
          <div style={{ height:6, background:"#f0f0f0", borderRadius:6, overflow:"hidden" }}>
            <div style={{ height:"100%", width:`${c.pct}%`, background:c.color, borderRadius:6, transition:"width 0.9s ease", animation:"dBarIn 0.9s ease" }}/>
          </div>
        </div>
      ))}
      {n >= 4 && (
        <div style={{ padding:"12px 14px", background:"#0a0a0a", borderRadius:12, display:"flex", justifyContent:"space-between", alignItems:"center", animation:"dItemIn 0.35s ease" }}>
          <span style={{ fontSize:10, color:"rgba(255,255,255,0.45)" }}>Total deductions found</span>
          <span style={{ fontSize:16, fontWeight:900, color:"#22c55e" }}>$2,479</span>
        </div>
      )}
    </div>
  );
}

/* ── Data ──────────────────────────────────────────── */
const SCREENS = [
  {
    id:"stitch", icon:"🧵", label:"Stitching Engine™", color:"#22c55e",
    tagline:"Every transaction matched to every receipt. Automatically.",
    detail:"No more mystery charges. RECEKON connects bank transactions to email receipts in real time — extracting every SKU, price, and merchant detail with 97%+ accuracy.",
    Screen: ScreenStitch,
  },
  {
    id:"kill", icon:"⛔", label:"Kill Switch™", color:"#ef4444",
    tagline:"Cancel any subscription. One tap. No login. No hold music.",
    detail:"RECEKON detects and kills zombie subscriptions before they drain your users. Works across 4,000+ merchants. No credentials needed.",
    Screen: ScreenKill,
  },
  {
    id:"sku", icon:"🏷️", label:"SKU Intelligence™", color:"#3b82f6",
    tagline:"See exactly what was bought. Not just the merchant name.",
    detail:"Go beyond 'AMZN Mktp US'. RECEKON resolves every line item — product name, category, unit price, and price change history.",
    Screen: ScreenSKU,
  },
  {
    id:"tax", icon:"📊", label:"TaxLink™", color:"#7c3aed",
    tagline:"Tax-ready reports. Auto-generated. Every receipt attached.",
    detail:"RECEKON auto-categorizes every expense to CRA, IRS, and HMRC standards. Your users get audit-ready reports in seconds, not hours.",
    Screen: ScreenTax,
  },
];

/* ── Phone Component ───────────────────────────────── */
function LivePhone({ active, screenKey, sliding }: {
  active: typeof SCREENS[0]; screenKey: number; sliding: boolean;
}) {
  const ActiveScreen = active.Screen;
  return (
    <div style={{
      position: "relative",
      filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.5)) drop-shadow(0 8px 24px rgba(0,0,0,0.3))",
    }}>
      {/* Ambient glow */}
      <div style={{
        position:"absolute", inset:-40, zIndex:0,
        background:`radial-gradient(ellipse at 50% 70%, ${active.color}20 0%, transparent 65%)`,
        transition:"background 0.7s ease",
        pointerEvents:"none",
      }}/>

      {/* Phone body */}
      <div style={{
        position:"relative", zIndex:1,
        width: 280, maxWidth: "72vw",
        background:"linear-gradient(175deg,#1c1c1e 0%,#2c2c2e 100%)",
        borderRadius: 54,
        padding:"14px 12px 18px",
        boxShadow:[
          "inset 0 1px 0 rgba(255,255,255,0.15)",
          "inset 0 -1px 0 rgba(0,0,0,0.5)",
          "inset 1px 0 0 rgba(255,255,255,0.08)",
          "inset -1px 0 0 rgba(0,0,0,0.3)",
          "0 0 0 1px rgba(0,0,0,0.7)",
        ].join(","),
      }}>
        {/* Side buttons */}
        {[60,84].map(top=>(
          <div key={top} style={{ position:"absolute", left:-3, top, width:3, height:22,
            background:"linear-gradient(90deg,#3a3a3c,#48484a)", borderRadius:"2px 0 0 2px" }}/>
        ))}
        <div style={{ position:"absolute", right:-3, top:80, width:3, height:32,
          background:"linear-gradient(90deg,#48484a,#3a3a3c)", borderRadius:"0 2px 2px 0" }}/>

        {/* Status bar */}
        <div style={{
          background:"#000", borderRadius:"40px 40px 0 0",
          padding:"10px 20px 8px",
          display:"flex", justifyContent:"space-between", alignItems:"center",
        }}>
          <span style={{ fontSize:12, fontWeight:600, color:"#fff", fontFamily:"-apple-system,BlinkMacSystemFont,sans-serif" }}>9:41</span>
          <div style={{ width:80, height:20, background:"#000", borderRadius:12, border:"1.5px solid #2a2a2a", display:"flex", alignItems:"center", justifyContent:"center", gap:5 }}>
            <div style={{ width:7,height:7,borderRadius:"50%",background:"#1c1c1e",border:"1.5px solid #3a3a3c" }}/>
            <div style={{ width:24,height:5,borderRadius:3,background:"#2a2a2a" }}/>
          </div>
          <div style={{ display:"flex", gap:5, alignItems:"center" }}>
            <svg width="15" height="11" viewBox="0 0 15 11" fill="white">
              <rect x="0" y="4" width="2.5" height="7" rx="0.6" opacity="0.5"/>
              <rect x="4" y="2.5" width="2.5" height="8.5" rx="0.6" opacity="0.7"/>
              <rect x="8" y="1" width="2.5" height="10" rx="0.6"/>
              <rect x="12" y="0" width="2.5" height="11" rx="0.6"/>
            </svg>
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
              <rect x="1" y="1" width="13" height="10" rx="2.5" stroke="white" strokeWidth="1.3" fill="none"/>
              <rect x="2.5" y="2.5" width="7" height="7" rx="1.2" fill="white"/>
              <rect x="15" y="4" width="2.5" height="4" rx="1" fill="rgba(255,255,255,0.6)"/>
            </svg>
          </div>
        </div>

        {/* Screen glass */}
        <div style={{
          background:"#ffffff",
          borderRadius:"0 0 40px 40px",
          overflow:"hidden",
          height: 500,
          position:"relative",
        }}>
          {/* App header */}
          <div style={{
            padding:"12px 18px 10px",
            display:"flex", alignItems:"center", justifyContent:"space-between",
            background:"rgba(255,255,255,0.97)",
            borderBottom:"1px solid #f0f0f0",
            position:"sticky", top:0, zIndex:4,
          }}>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <div style={{ width:26, height:26, background:"#0a0a0a", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                  <path d="M2 11L5 4L8.5 7.5L12 2" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span style={{ fontSize:14, fontWeight:900, letterSpacing:"-0.04em", color:"#0a0a0a" }}>RECEKON</span>
            </div>
            <div style={{
              display:"inline-flex", alignItems:"center", gap:5,
              background:`${active.color}12`, border:`1px solid ${active.color}35`,
              borderRadius:100, padding:"4px 10px",
              transition:"all 0.5s ease",
            }}>
              <div style={{ width:6, height:6, borderRadius:"50%", background:active.color, animation:"dPulse 1.5s infinite" }}/>
              <span style={{ fontSize:9.5, fontWeight:800, color:active.color, letterSpacing:"0.06em" }}>LIVE</span>
            </div>
          </div>

          {/* Feature label bar */}
          <div style={{
            padding:"7px 18px 6px",
            background:`${active.color}09`,
            borderBottom:"1px solid #f4f4f5",
            transition:"background 0.5s ease",
            position:"sticky", top:48, zIndex:3,
          }}>
            <span style={{ fontSize:10.5, fontWeight:800, color:active.color, textTransform:"uppercase", letterSpacing:"0.08em" }}>
              {active.icon} {active.label}
            </span>
          </div>

          {/* Animated content */}
          <div style={{ height:"calc(100% - 80px)", overflow:"hidden", position:"relative" }}>
            <div key={screenKey} style={{
              position:"absolute", inset:0, overflowY:"hidden",
              animation: sliding ? "dSlideOut 0.32s cubic-bezier(0.4,0,0.2,1) forwards" : "dSlideIn 0.38s cubic-bezier(0.2,0,0,1) forwards",
            }}>
              <ActiveScreen />
            </div>
          </div>
        </div>
      </div>

      {/* Floating decorators */}
      <div style={{ position:"absolute", top:20, right:-18, zIndex:5, animation:"dFloat1 3.8s ease-in-out infinite", pointerEvents:"none" }}>
        <svg width="48" height="44" viewBox="0 0 48 44" fill="none">
          <ellipse cx="24" cy="38" rx="16" ry="4.5" fill="rgba(0,0,0,0.2)"/>
          <ellipse cx="24" cy="26" rx="16" ry="4.5" fill="#b8860b"/>
          <rect x="8" y="22" width="32" height="4.5" fill="#b8860b"/>
          <ellipse cx="24" cy="22" rx="16" ry="4.5" fill="#f0c040"/>
          <ellipse cx="24" cy="22" rx="10" ry="3" fill="#ffd700"/>
          <text x="24" y="25" textAnchor="middle" fontSize="7" fontWeight="900" fill="rgba(0,0,0,0.35)" fontFamily="sans-serif">$</text>
        </svg>
      </div>
      <div style={{ position:"absolute", bottom:40, left:-22, zIndex:5, animation:"dFloat2 4.2s ease-in-out infinite 0.6s", pointerEvents:"none" }}>
        <div style={{
          width:88, height:56, borderRadius:10, overflow:"hidden",
          boxShadow:"0 8px 24px rgba(0,0,0,0.4)",
          background:"linear-gradient(135deg,#1a1a3e,#2d3561)",
          padding:"8px 10px", position:"relative",
        }}>
          <div style={{ height:8, width:16, background:"rgba(255,255,255,0.15)", borderRadius:2, marginBottom:6 }}/>
          <div style={{ height:6, width:28, background:"rgba(255,255,255,0.08)", borderRadius:2, marginBottom:12 }}/>
          <div style={{ display:"flex", gap:3 }}>
            <div style={{ width:18, height:12, background:"#f5c518", borderRadius:3 }}/>
            <div style={{ width:12, height:12, background:"rgba(255,255,255,0.1)", borderRadius:3 }}/>
          </div>
          <div style={{ position:"absolute", bottom:-8, right:-8, width:22, height:22, borderRadius:"50%", background:"#22c55e", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.8 7L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Feature Card (vertical stack) ─────────────────── */
function FeatureCard({ screen, active, activeKey, onClick, barEdge = "left" }: {
  screen: typeof SCREENS[0]; active: boolean; activeKey: number; onClick: () => void;
  barEdge?: "left" | "right" | "bottom" | "top";
}) {
  // The progress track IS the indicator — no separate static bar needed
  // Track is always present (dimmed when inactive), fill animates when active
  const isVertical = barEdge === "left" || barEdge === "right";

  const progressTrackStyle: React.CSSProperties = isVertical ? {
    position: "absolute",
    top: 0, bottom: 0, width: 3,
    background: "rgba(255,255,255,0.07)",
    overflow: "hidden",
    transition: "background 0.4s ease",
    ...(barEdge === "left"  && { left: 0,  borderRadius: "0 2px 2px 0" }),
    ...(barEdge === "right" && { right: 0, borderRadius: "2px 0 0 2px" }),
  } : {
    position: "absolute",
    left: 0, right: 0, height: 3,
    background: "rgba(255,255,255,0.07)",
    overflow: "hidden",
    transition: "background 0.4s ease",
    ...(barEdge === "top"    && { top: 0,    borderRadius: "0 0 2px 2px" }),
    ...(barEdge === "bottom" && { bottom: 0, borderRadius: "2px 2px 0 0" }),
  };

  const progressFillStyle: React.CSSProperties = isVertical ? {
    // Fill the entire track, scale from top → bottom
    position: "absolute",
    inset: 0,
    background: screen.color,
    transformOrigin: barEdge === "left" || barEdge === "right" ? "top center" : "left center",
    animation: "dProgressV 7s linear forwards",
  } : {
    // Fill the entire track, scale from left → right (or right → left for bottom)
    position: "absolute",
    inset: 0,
    background: screen.color,
    transformOrigin: "left center",
    animation: "dProgress 7s linear forwards",
  };

  return (
    <div
      onClick={onClick}
      style={{
        padding: "24px 28px",
        background: active ? `${screen.color}0e` : "rgba(255,255,255,0.025)",
        border: `1px solid ${active ? screen.color + "35" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 16,
        cursor: "pointer",
        transition: "all 0.4s ease",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Label row */}
      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
        <div style={{ width:7, height:7, borderRadius:"50%", background:screen.color, flexShrink:0, opacity: active ? 1 : 0.25, animation: active ? "dPulse 1.5s infinite" : "none" }} />
        <span style={{
          fontSize: 10, fontWeight: 800,
          color: active ? screen.color : "rgba(255,255,255,0.28)",
          textTransform:"uppercase", letterSpacing:"0.1em",
          transition:"color 0.4s ease",
        }}>
          {screen.icon} {screen.label}
        </span>
      </div>

      {/* Tagline */}
      <p style={{
        margin: 0,
        fontSize: 14,
        fontWeight: active ? 700 : 400,
        color: active ? "#ffffff" : "rgba(255,255,255,0.28)",
        lineHeight: 1.55,
        transition: "all 0.4s ease",
      }}>
        {screen.tagline}
      </p>

      {/* Detail text */}
      <p style={{
        margin: 0,
        fontSize: 12.5,
        fontWeight: 400,
        color: active ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.15)",
        lineHeight: 1.7,
        transition: "all 0.4s ease",
      }}>
        {screen.detail}
      </p>

      {/* Progress bar — sweeps along same edge as indicator */}
      {active && (
        <div style={progressTrackStyle}>
          <div key={activeKey} style={progressFillStyle} />
        </div>
      )}
    </div>
  );
}

/* ── Bottom Banner (4th product full-width) ────────── */
function BannerCard({ screen, active, activeKey }: { screen: typeof SCREENS[0]; active: boolean; activeKey: number }) {
  return (
    <div className="prod-banner-grid" style={{
      padding: "32px 36px",
      background: active ? `${screen.color}0e` : "rgba(255,255,255,0.025)",
      border: `1px solid ${active ? screen.color + "35" : "rgba(255,255,255,0.07)"}`,
      borderRadius: 16,
      display:"grid",
      gridTemplateColumns:"1fr auto",
      gap: 56,
      alignItems:"center",
      transition:"all 0.4s ease",
      position:"relative",
      overflow:"hidden",
    }}>
      {/* Top progress bar */}
      <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:"rgba(255,255,255,0.05)", overflow:"hidden" }}>
        {active && <div key={activeKey} style={{ position:"absolute", inset:0, background:screen.color, transformOrigin:"left center", animation:"dProgress 7s linear forwards" }} />}
      </div>

      {/* Left text */}
      <div>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
          <div style={{ width:7,height:7,borderRadius:"50%",background:screen.color, opacity: active ? 1 : 0.25, animation: active ? "dPulse 1.5s infinite" : "none" }} />
          <span style={{ fontSize:10, fontWeight:800, color: active ? screen.color : "rgba(255,255,255,0.28)", textTransform:"uppercase", letterSpacing:"0.1em" }}>
            {screen.icon} {screen.label}
          </span>
        </div>
        <p style={{ margin:"0 0 12px", fontSize:20, fontWeight:700, color: active ? "#ffffff" : "rgba(255,255,255,0.28)", lineHeight:1.45, transition:"all 0.4s ease" }}>
          {screen.tagline}
        </p>
        <p style={{ margin:0, fontSize:13.5, color: active ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.15)", lineHeight:1.75, maxWidth:560, transition:"all 0.4s ease" }}>
          {screen.detail}
        </p>
      </div>

      {/* Right stat visual */}
      <div className="prod-banner-stat" style={{
        width:200, height:140, borderRadius:14,
        background: active ? `${screen.color}12` : "rgba(255,255,255,0.03)",
        border:`1px solid ${active ? screen.color+"28" : "rgba(255,255,255,0.05)"}`,
        display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:6,
        transition:"all 0.4s ease", flexShrink:0,
      }}>
        <span style={{ fontSize:28 }}>{screen.icon}</span>
        <div style={{ fontSize:28, fontWeight:900, color: active ? screen.color : "rgba(255,255,255,0.12)", transition:"all 0.4s ease" }}>$2,479</div>
        <div style={{ fontSize:10, color: active ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.1)", letterSpacing:"0.04em", transition:"all 0.4s ease" }}>
          Deductions found · 2025
        </div>
      </div>
    </div>
  );
}

/* ── Main Demo Component ───────────────────────────── */
function ProductDemo() {
  const [idx, setIdx] = useState(0);
  const [screenKey, setScreenKey] = useState(0);
  const [sliding, setSliding] = useState(false);

  const switchTo = (i: number) => {
    if (i === idx) return;
    setSliding(true);
    setTimeout(() => {
      setIdx(i);
      setScreenKey(k => k + 1);
      setSliding(false);
    }, 320);
  };

  useEffect(() => {
    const t = setInterval(() => {
      setSliding(true);
      setTimeout(() => {
        setIdx(i => {
          const next = (i + 1) % SCREENS.length;
          setScreenKey(k => k + 1);
          return next;
        });
        setSliding(false);
      }, 320);
    }, 7000);
    return () => clearInterval(t);
  }, []);

  const active = SCREENS[idx];

  return (
    <div>
      {/* Top: Phone + 3 cards */}
      <div className="prod-demo-grid" style={{
        display:"grid",
        gridTemplateColumns:"360px 1fr",
        gap:40,
        alignItems:"stretch",
        marginBottom:16,
      }}>
        {/* Phone */}
        <div className="prod-demo-phone" style={{ display:"flex", justifyContent:"center", alignItems:"center", paddingTop:24, paddingBottom:24, paddingLeft:30, paddingRight:30 }}>
          <LivePhone active={active} screenKey={screenKey} sliding={sliding} />
        </div>

        {/* Right: 3 cards stacked */}
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {SCREENS.slice(0,3).map((s,i)=>(
            <FeatureCard
              key={s.id}
              screen={s}
              active={idx===i}
              activeKey={idx===i ? screenKey : 0}
              onClick={()=>switchTo(i)}
              barEdge={["bottom","right","left"][i] as "bottom"|"right"|"left"}
            />
          ))}
        </div>
      </div>

      {/* Bottom: 4th card full width */}
      <BannerCard screen={SCREENS[3]} active={idx===3} activeKey={idx===3 ? screenKey : 0} />

      <style>{`
        @keyframes dPulse    { 0%,100%{opacity:0.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.3)} }
        @keyframes dProgress  { from{transform:scaleX(0)} to{transform:scaleX(1)} }
        @keyframes dProgressV { from{transform:scaleY(0)} to{transform:scaleY(1)} }
        @keyframes dItemIn   { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes dSlideIn  { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes dSlideOut { from{opacity:1;transform:translateY(0)} to{opacity:0;transform:translateY(-20px)} }
        @keyframes dFloat1   { 0%,100%{transform:translateY(0) rotate(-3deg)} 50%{transform:translateY(-12px) rotate(3deg)} }
        @keyframes dFloat2   { 0%,100%{transform:translateY(0) rotate(-5deg)} 50%{transform:translateY(-9px) rotate(0deg)} }
        @keyframes dBarIn    { from{width:0} }
      `}</style>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   DEVELOPER SECTION WRAPPER
   ══════════════════════════════════════════════════ */

function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.style.transitionDelay = `${delay}s`; el.classList.add("visible"); }
    }, { threshold: 0.06 });
    obs.observe(el); return () => obs.disconnect();
  }, [delay]);
  return ref;
}

function IcoStart({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M6 20 L16 14 L26 20 L16 26 Z" fill="rgba(34,197,94,0.15)" stroke="#22c55e" strokeWidth="1.4" strokeLinejoin="round"/>
      <path d="M6 20 L6 26 L16 32 L16 26 Z" fill="rgba(34,197,94,0.08)" stroke="#22c55e" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M26 20 L26 26 L16 32 L16 26 Z" fill="rgba(34,197,94,0.05)" stroke="#22c55e" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M16 6 L20 12 L24 10 L18 18 L14 12 L18 14 Z" fill="#22c55e"/>
    </svg>
  );
}
function IcoDoc({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect x="6" y="3" width="20" height="26" rx="3" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.4"/>
      <path d="M20 3 L20 9 L26 9" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2"/>
      <line x1="10" y1="14" x2="22" y2="14" stroke="rgba(255,255,255,0.25)" strokeWidth="1.3"/>
      <line x1="10" y1="18" x2="19" y2="18" stroke="rgba(255,255,255,0.25)" strokeWidth="1.3"/>
      <line x1="10" y1="22" x2="22" y2="22" stroke="#22c55e" strokeWidth="1.6"/>
    </svg>
  );
}
function IcoShield({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M16 3 L26 7 L26 17 C26 23 16 29 16 29 C16 29 6 23 6 17 L6 7 Z" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.4" strokeLinejoin="round"/>
      <path d="M11 16 L14.5 19.5 L21 13" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

const CODE_LINES = [
  { n:1,  code:`{`,                      color:"#9ca3af" },
  { n:2,  code:`  "event": `,            val:`"CREDENTIALS_REQUIRED"`, kc:"#9cdcfe", vc:"#ce9178" },
  { n:3,  code:`  "session_id": `,       val:`"fb5aa994-ed1c-4c3e"`,    kc:"#9cdcfe", vc:"#ce9178" },
  { n:4,  code:`  "task_id": `,          val:`25685`,                   kc:"#9cdcfe", vc:"#b5cea8" },
  { n:5,  code:`  "merchant": {`,        color:"#9ca3af" },
  { n:6,  code:`    "id": `,             val:`11`,                      kc:"#9cdcfe", vc:"#b5cea8" },
  { n:7,  code:`    "name": `,           val:`"Uber"`,                  kc:"#9cdcfe", vc:"#ce9178" },
  { n:8,  code:`  }`,                    color:"#9ca3af" },
  { n:9,  code:`  "status": `,           val:`"RECONCILED"`,            kc:"#9cdcfe", vc:"#4ec9b0" },
  { n:10, code:`}`,                      color:"#9ca3af" },
];

export function DeveloperSection() {
  const t  = useReveal(0);
  const l  = useReveal(0);
  const r  = useReveal(0.15);
  const pd = useReveal(0.1);
  const [, navigate] = useLocation();

  const features = [
    { icon: <IcoStart size={28}/>, title:"Easy to start",         desc:"Start building in minutes, not weeks." },
    { icon: <IcoDoc   size={28}/>, title:"Developer docs",        desc:"Everything you need, clearly documented." },
    { icon: <IcoShield size={28}/>,title:"Consistently reliable", desc:"Best-in-class uptime across all products." },
  ];

  return (
    <section style={{ background:"#0a0a0a", padding:"clamp(64px,8vw,120px) 0" }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 clamp(20px,4vw,60px)" }}>

        {/* Header */}
        <div ref={t} className="kn-reveal" style={{ marginBottom:72 }}>
          <p style={{ fontSize:11, fontWeight:700, color:"#6b7280", letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:16 }}>Developers</p>
          <h2 style={{ fontSize:"clamp(36px,4.5vw,62px)", fontWeight:800, letterSpacing:"-0.03em", lineHeight:1.05, color:"#fff", maxWidth:580, margin:"0 0 20px" }}>
            Build RECEKON into your app.{" "}<span style={{ color:"#22c55e" }}>In minutes.</span>
          </h2>
          <p style={{ fontSize:17, color:"rgba(255,255,255,0.45)", lineHeight:1.75, maxWidth:520, margin:0 }}>
            Drop-in SDK. Real-time webhooks. Works with any stack.
          </p>
        </div>

        {/* Main 2-col: features left, code right */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"start", marginBottom:80 }} className="dev-top-grid">
          {/* Left */}
          <div ref={l} className="kn-reveal">
            <p style={{ fontSize:16, color:"rgba(255,255,255,0.5)", lineHeight:1.85, marginBottom:44, maxWidth:460 }}>
              RECEKON plugs into your existing stack in minutes. A few API calls gives your users complete financial visibility — down to the SKU.
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {features.map((f,i)=>(
                <div key={i}
                  style={{ display:"flex", alignItems:"center", gap:18, padding:"18px 22px", background:"#111", border:"1px solid #1e1e1e", borderRadius:14, cursor:"pointer", transition:"all 0.2s ease" }}
                  onMouseEnter={e=>{e.currentTarget.style.background="#141414";e.currentTarget.style.borderColor="#2a2a2a";e.currentTarget.style.transform="translateX(5px)";}}
                  onMouseLeave={e=>{e.currentTarget.style.background="#111";e.currentTarget.style.borderColor="#1e1e1e";e.currentTarget.style.transform="none";}}
                  onClick={()=>{navigate("/developers");window.scrollTo({top:0,behavior:"smooth"});}}>
                  <div style={{ width:46,height:46,background:"#1a1a1a",border:"1px solid #262626",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>{f.icon}</div>
                  <div>
                    <div style={{ fontSize:15,fontWeight:700,color:"#fff",marginBottom:3 }}>{f.title}</div>
                    <div style={{ fontSize:13,color:"rgba(255,255,255,0.35)" }}>{f.desc}</div>
                  </div>
                  <div style={{ marginLeft:"auto",color:"rgba(255,255,255,0.18)",fontSize:20 }}>›</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — code block */}
          <div ref={r} className="kn-reveal">
            <div style={{ perspective:"1400px" }}>
              <div
                style={{ background:"#111",border:"1px solid #1e1e1e",borderRadius:18,overflow:"hidden",
                  transform:"perspective(1400px) rotateX(7deg) rotateY(-6deg) rotateZ(0.5deg)",
                  boxShadow:"0 40px 100px rgba(0,0,0,0.6),0 12px 40px rgba(0,0,0,0.4)",
                  transition:"transform 0.45s ease" }}
                onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.transform="perspective(1400px) rotateX(3deg) rotateY(-2deg)";}}
                onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.transform="perspective(1400px) rotateX(7deg) rotateY(-6deg) rotateZ(0.5deg)";}}>
                <div style={{ background:"#0d0d0d",borderBottom:"1px solid #1a1a1a",padding:"11px 18px",display:"flex",alignItems:"center",gap:8 }}>
                  {["#ff5f57","#ffbd2e","#28c840"].map((c,i)=><div key={i} style={{width:11,height:11,borderRadius:"50%",background:c}}/>)}
                  <span style={{ marginLeft:8,fontSize:11,color:"#4a4a4a",fontFamily:"monospace" }}>stitching-engine-webhook.json</span>
                </div>
                <div style={{ padding:"22px 24px",fontFamily:"'JetBrains Mono','Fira Code',monospace",fontSize:13,lineHeight:1.8 }}>
                  {CODE_LINES.map((line,i)=>(
                    <div key={i} style={{ display:"flex",gap:18 }}>
                      <span style={{ color:"#333",minWidth:20,textAlign:"right",userSelect:"none",flexShrink:0 }}>{line.n}</span>
                      <span>
                        {line.val
                          ? <><span style={{color:(line as typeof line & {kc?:string}).kc||"#9ca3af"}}>{line.code}</span><span style={{color:(line as typeof line & {vc?:string}).vc||"#fff"}}>{line.val}</span><span style={{color:"#333"}}>,</span></>
                          : <span style={{color:line.color||"#9ca3af"}}>{line.code}</span>}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product demo */}
        <div ref={pd} className="kn-reveal">
          <div style={{ marginBottom:32 }}>
            <p style={{ fontSize:11, fontWeight:700, color:"#6b7280", letterSpacing:"0.14em", textTransform:"uppercase", margin:"0 0 12px" }}>Live product demos</p>
            <h3 style={{ fontSize:"clamp(24px,3vw,36px)", fontWeight:800, color:"#fff", letterSpacing:"-0.02em", margin:0 }}>
              Every product. Running live.
            </h3>
          </div>
          <ProductDemo />
        </div>

        {/* CTA */}
        <div style={{ marginTop:48, display:"flex", justifyContent:"center" }}>
          <button
            onClick={()=>{navigate("/developers");window.scrollTo({top:0,behavior:"smooth"});}}
            style={{ background:"transparent", border:"1px solid #2a2a2a", borderRadius:12, padding:"16px 32px", color:"rgba(255,255,255,0.5)", fontSize:14, fontWeight:600, cursor:"pointer", fontFamily:"inherit", display:"inline-flex", alignItems:"center", gap:10, transition:"all 0.2s" }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor="#22c55e";e.currentTarget.style.color="#fff";e.currentTarget.style.background="rgba(34,197,94,0.04)";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="#2a2a2a";e.currentTarget.style.color="rgba(255,255,255,0.5)";e.currentTarget.style.background="transparent";}}>
            Read the full developer documentation
            <span style={{ fontSize:18, lineHeight:1 }}>›</span>
          </button>
        </div>
      </div>

      <style>{`
        .dev-top-grid { grid-template-columns: 1fr 1fr; }
        @media(max-width:960px) {
          .dev-top-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
        .kn-reveal { opacity:0; transform:translateY(28px); transition:opacity 0.7s ease,transform 0.7s ease; }
        .kn-reveal.visible { opacity:1; transform:translateY(0); }
      `}</style>
    </section>
  );
}
