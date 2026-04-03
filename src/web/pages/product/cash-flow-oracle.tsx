import { useState, useEffect, useRef } from "react";
import { Page, PageHero } from "../../components/Layout";

function ForecastChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext("2d")!;
    const w = c.width, h = c.height;
    ctx.clearRect(0, 0, w, h);
    // Grid
    ctx.strokeStyle = "#f0f0f0"; ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) { ctx.beginPath(); ctx.moveTo(0, i * h / 4); ctx.lineTo(w, i * h / 4); ctx.stroke(); }
    // Historical (solid)
    const hist = [0.6, 0.55, 0.65, 0.5, 0.7, 0.6, 0.45, 0.55, 0.65];
    const fore = [0.55, 0.62, 0.7, 0.68, 0.75, 0.8];
    const allPts = [...hist, ...fore];
    const splitX = hist.length / (allPts.length - 1);
    // Forecast range (shaded)
    const fUp = fore.map(v => v + 0.08), fDn = fore.map(v => v - 0.08);
    ctx.fillStyle = "rgba(34,197,94,0.08)";
    ctx.beginPath();
    fUp.forEach((v, i) => { const x = (hist.length - 1 + i) / (allPts.length - 1) * w; i === 0 ? ctx.moveTo(x, (1 - v) * h) : ctx.lineTo(x, (1 - v) * h); });
    [...fDn].reverse().forEach((v, i) => { const idx = fDn.length - 1 - i; const x = (hist.length - 1 + idx) / (allPts.length - 1) * w; ctx.lineTo(x, (1 - v) * h); });
    ctx.closePath(); ctx.fill();
    // Historical line
    ctx.strokeStyle = "#0a0a0a"; ctx.lineWidth = 2.5; ctx.setLineDash([]);
    ctx.beginPath();
    hist.forEach((v, i) => { const x = i / (allPts.length - 1) * w; i === 0 ? ctx.moveTo(x, (1 - v) * h) : ctx.lineTo(x, (1 - v) * h); });
    ctx.stroke();
    // Forecast line (dashed green)
    ctx.strokeStyle = "#22c55e"; ctx.lineWidth = 2.5; ctx.setLineDash([6, 4]);
    ctx.beginPath();
    fore.forEach((v, i) => { const x = (hist.length - 1 + i) / (allPts.length - 1) * w; i === 0 ? ctx.moveTo(x, (1 - v) * h) : ctx.lineTo(x, (1 - v) * h); });
    ctx.stroke(); ctx.setLineDash([]);
    // Shortfall alert
    ctx.fillStyle = "#fef2f2"; ctx.strokeStyle = "#ef4444"; ctx.lineWidth = 1.5;
    ctx.fillRect(w * 0.72, h * 0.22, w * 0.08, h * 0.26); ctx.strokeRect(w * 0.72, h * 0.22, w * 0.08, h * 0.26);
    ctx.fillStyle = "#ef4444"; ctx.font = "bold 10px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("⚠", w * 0.76, h * 0.38);
    // "Today" line
    ctx.strokeStyle = "#9ca3af"; ctx.lineWidth = 1; ctx.setLineDash([4, 3]);
    const todayX = (hist.length - 1) / (allPts.length - 1) * w;
    ctx.beginPath(); ctx.moveTo(todayX, 0); ctx.lineTo(todayX, h); ctx.stroke(); ctx.setLineDash([]);
  }, []);
  return <canvas ref={canvasRef} width={380} height={180} style={{ width: "100%", height: "auto" }} />;
}

export default function CashFlowOraclePage() {
  const [scenario, setScenario] = useState<"ok" | "risk" | "buy">("ok");
  return (
    <Page>
      <PageHero tag="New Product" title="Cash Flow Oracle™" body="Predict your financial future. AI-powered cash flow forecasting that learns your income and spending patterns to predict future balances and alert on shortfalls before they happen." accent="#0ea5e9" />
      <section style={{ padding: "clamp(40px,7vw,80px) clamp(16px,3.5vw,40px)", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }} className="cfo-split">
          <div>
            <div style={{ display: "inline-block", background: "#f0f9ff", color: "#0ea5e9", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 100, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 20, border: "1px solid #bae6fd" }}>Coming Phase 2</div>
            <h2 style={{ fontSize: "clamp(24px,3.5vw,40px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 20 }}>Know your balance 90 days from now. Before it happens.</h2>
            <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.75, marginBottom: 24 }}>Cash Flow Oracle learns your income patterns, bill timing, and spending habits to generate 30/60/90-day forecasts. No more surprise overdrafts. No more "can I afford this?" guesswork.</p>
            {["30/60/90 day cash flow predictions","\"Can I afford this?\" purchase analyzer","Bill timing optimizer — shift payments to avoid shortfalls","Income anomaly alerts — detect missing expected deposits","What-if scenarios: new job, new rent, vacation"].map((b, i) => (
              <div key={i} style={{ display: "flex", gap: 10, fontSize: 15, color: "#374151", marginBottom: 10 }}><span style={{ color: "#0ea5e9", fontWeight: 700, flexShrink: 0 }}>✓</span>{b}</div>
            ))}
          </div>
          <div>
            <div style={{ background: "#f9f9f9", border: "1px solid #e5e5e5", borderRadius: 16, padding: 24 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>90-Day Forecast</div>
              <ForecastChart />
              <div style={{ display: "flex", gap: 16, marginTop: 14, flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#6b7280" }}><div style={{ width: 16, height: 2, background: "#0a0a0a" }} /> Historical</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#6b7280" }}><div style={{ width: 16, height: 2, background: "#22c55e" }} /> Forecast</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#ef4444" }}>⚠ Potential shortfall</div>
              </div>
              {/* Can I afford this */}
              <div style={{ marginTop: 20, padding: "14px 16px", background: "#fff", border: "1px solid #e5e5e5", borderRadius: 10 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Can I afford this?</div>
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>MacBook Pro — $3,499</div>
                <div style={{ display: "flex", gap: 8 }}>
                  {[["Now", "#22c55e", "Safe to buy"], ["Next month", "#f97316", "Tight — risky"], ["In 6 weeks", "#22c55e", "Optimal timing"]].map(([t, c, l], i) => (
                    <div key={i} style={{ flex: 1, padding: "8px", background: `${c}10`, border: `1px solid ${c}30`, borderRadius: 8, textAlign: "center" }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: c as string }}>{t as string}</div>
                      <div style={{ fontSize: 10, color: "#6b7280", marginTop: 2 }}>{l as string}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <style>{`.cfo-split{grid-template-columns:1fr 1fr} @media(max-width:768px){.cfo-split{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* Waitlist CTA */}
      <section style={{ background: "#0a0a0a", padding: "clamp(32px,5.5vw,60px) clamp(16px,3.5vw,40px)", textAlign: "center" }}>
        <div style={{ maxWidth: 560, margin: "0 auto", padding: "0 clamp(16px,3.5vw,40px)" }}>
          <div style={{ background: "rgba(14,165,233,0.15)", color: "#38bdf8", fontSize: 11, fontWeight: 700, padding: "4px 14px", borderRadius: 100, border: "1px solid rgba(14,165,233,0.3)", display: "inline-block", marginBottom: 20 }}>Coming in Phase 2</div>
          <h2 style={{ fontSize: "clamp(26px,4vw,44px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#fff", marginBottom: 16 }}>Be first to access Cash Flow Oracle™</h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", marginBottom: 32 }}>Join the waitlist. We'll notify you the moment it's available.</p>
          <button style={{ background: "#fff", color: "#0a0a0a", border: "none", borderRadius: 10, padding: "14px 32px", fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
            onClick={() => { window.location.href = "/"; setTimeout(() => document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" }), 300); }}>
            Join Waitlist →
          </button>
        </div>
      </section>

      {/* Onboarding */}
      <section style={{ background: "#f9f9f9", padding: "clamp(56px,8vw,96px) clamp(16px,3.5vw,40px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>First forecast</p>
          <h2 style={{ fontSize: "clamp(26px,3.5vw,42px)", fontWeight: 800, letterSpacing: "-0.025em", color: "#0a0a0a", marginBottom: 14 }}>
            Your first 90-day forecast appears<br/>before you've finished your coffee.
          </h2>
          <p style={{ fontSize: 16, color: "#6b7280", lineHeight: 1.75, maxWidth: 560, marginBottom: 48 }}>
            Cash Flow Oracle learns from your existing transaction history. No data entry. No spreadsheets. Connect your bank — the model bootstraps itself on your real income and spending patterns.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }} className="sec-grid">
            {[
              { n:"01", icon:"📡", time:"< 1 min",   title:"Connect bank", body:"Plaid OAuth. RECEKON pulls your full transaction history — typically 12–24 months. This is the training set. No setup required." },
              { n:"02", icon:"🧠", time:"2–4 min",   title:"Model trains on your history", body:"Cash Flow Oracle analyzes your income cycles, recurring bills, and spending patterns. By the time you've read your first notification, the model is calibrated to you." },
              { n:"03", icon:"🔮", time:"< 5 min",   title:"First forecast delivered", body:"A 30/60/90-day cash flow projection appears — built from your actual history, not generic averages. Shortfalls flagged. Safe windows identified. No manual input." },
            ].map((s, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid #e5e5e5", borderRadius: 16, padding: "26px 24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#0a0a0a", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800 }}>{s.n}</div>
                  <code style={{ fontSize: 10, fontWeight: 800, color: "#0ea5e9", fontFamily: "monospace", background: "#f0f9ff", padding: "2px 9px", borderRadius: 4 }}>{s.time}</code>
                </div>
                <div style={{ fontSize: 26, marginBottom: 12 }}>{s.icon}</div>
                <div style={{ fontSize: 15, fontWeight: 800, color: "#0a0a0a", marginBottom: 8 }}>{s.title}</div>
                <p style={{ margin: 0, fontSize: 13.5, color: "#6b7280", lineHeight: 1.7 }}>{s.body}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 32, padding: "20px 28px", background: "#f0f9ff", border: "1px solid #bae6fd", borderRadius: 12 }}>
            <span style={{ fontSize: 14, color: "#0369a1", lineHeight: 1.7 }}><strong>Why this matters:</strong> Most forecasting tools require weeks of manual category setup before they produce anything useful. Cash Flow Oracle's first forecast uses your real data and appears within 5 minutes. If it's wrong, you correct it. But it's rarely wrong — because it learned from what actually happened, not what you estimated.</span>
          </div>
        </div>
      </section>
    </Page>
  );
}
