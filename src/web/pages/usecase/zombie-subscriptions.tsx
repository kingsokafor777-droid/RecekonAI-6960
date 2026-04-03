import { useState, useEffect } from "react";
import { Page } from "../../components/Layout";
import { useLocation } from "wouter";
import { useModal } from "../../components/ModalContext";

function KillFeed() {
  const [killed, setKilled] = useState<number[]>([]);
  const [total, setTotal] = useState(0);

  const subs = [
    { name: "Netflix",         amt: 15.99, last: "11 months ago", icon: "🎬" },
    { name: "Adobe CC",        amt: 54.99, last: "7 months ago",  icon: "🎨" },
    { name: "Gym Membership",  amt: 49.99, last: "4 months ago",  icon: "💪" },
    { name: "Duolingo Plus",   amt: 6.99,  last: "9 months ago",  icon: "🦉" },
    { name: "LinkedIn Premium",amt: 39.99, last: "6 months ago",  icon: "💼" },
  ];

  useEffect(() => {
    const delays = [800, 1600, 2600, 3800, 5200];
    const timers = delays.map((d, i) =>
      setTimeout(() => {
        setKilled(k => [...k, i]);
        setTotal(t => t + subs[i].amt);
      }, d)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const annualSavings = Math.round(total * 12);

  return (
    <div style={{ background: "#0a0a0a", borderRadius: 16, overflow: "hidden", border: "1px solid #1a1a1a" }}>
      {/* Header */}
      <div style={{ padding: "14px 18px", borderBottom: "1px solid #1a1a1a", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", animation: "recekonDot 1.5s infinite" }} />
          <span style={{ fontSize: 11, fontWeight: 800, color: "#22c55e", letterSpacing: "0.08em", textTransform: "uppercase" }}>Auto-Cancel Agent · Active</span>
        </div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>executing now</div>
      </div>

      {/* Feed */}
      <div style={{ padding: "12px 0" }}>
        {subs.map((sub, i) => {
          const done = killed.includes(i);
          return (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "11px 18px",
              background: done ? "rgba(34,197,94,0.04)" : "transparent",
              transition: "background 0.4s ease",
            }}>
              <span style={{ fontSize: 20, flexShrink: 0, opacity: done ? 0.5 : 1, transition: "opacity 0.4s" }}>{sub.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: done ? "rgba(255,255,255,0.4)" : "#fff", textDecoration: done ? "line-through" : "none", transition: "all 0.4s" }}>
                  {sub.name}
                </div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", marginTop: 1 }}>Last used {sub.last}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: done ? "#22c55e" : "#ef4444", fontFamily: "monospace", transition: "color 0.4s" }}>
                  {done ? "Cancelled" : `$${sub.amt}/mo`}
                </div>
                {done && <div style={{ fontSize: 9, color: "rgba(34,197,94,0.7)", marginTop: 1 }}>✓ saved</div>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Result */}
      {killed.length > 0 && (
        <div style={{ margin: "0 12px 12px", padding: "14px 16px", background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                {killed.length} subscription{killed.length > 1 ? "s" : ""} cancelled
              </div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>Zero logins. Zero hold music. Zero effort.</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#22c55e", letterSpacing: "-0.03em" }}>
                +${annualSavings.toLocaleString()}
              </div>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)" }}>recovered / year</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ExecutionTimeline() {
  const steps = [
    { icon: "📡", title: "Detected",   detail: "Kill Switch™ identifies 5 subscriptions charged in the past 90 days with zero usage signals.", color: "#3b82f6", t: "0s" },
    { icon: "🧠", title: "Scored",     detail: "Each subscription ranked by waste score: amount × months-unused × cancellation confidence.", color: "#f59e0b", t: "1.2s" },
    { icon: "⚙️",  title: "Authorized", detail: "RECEKON confirms your cancellation settings match. High-confidence subscriptions proceed automatically.", color: "#7c3aed", t: "1.4s" },
    { icon: "🤖", title: "Executed",   detail: "Cancellation requests sent via official merchant APIs. No bots. No fake clicks. Audit trail written.", color: "#22c55e", t: "1.9s" },
    { icon: "✅", title: "Confirmed",  detail: "Cancellation receipts received and stored. Savings logged. User notified. Loop closed.", color: "#22c55e", t: "4.1s" },
  ];
  return (
    <div>
      {steps.map((s, i) => (
        <div key={i} style={{ display: "flex", gap: 18, marginBottom: i < steps.length - 1 ? 28 : 0, position: "relative" }}>
          {i < steps.length - 1 && (
            <div style={{ position: "absolute", left: 21, top: 44, width: 2, height: "calc(100% + 4px)", background: "linear-gradient(to bottom, rgba(255,255,255,0.07), transparent)" }} />
          )}
          <div style={{ width: 44, height: 44, borderRadius: "50%", background: `${s.color}15`, border: `1.5px solid ${s.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0, position: "relative", zIndex: 1 }}>
            {s.icon}
          </div>
          <div style={{ paddingTop: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}>{s.title}</span>
              <code style={{ fontSize: 9, color: s.color, fontFamily: "monospace", background: `${s.color}15`, padding: "1px 6px", borderRadius: 4 }}>{s.t}</code>
            </div>
            <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>{s.detail}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ZombieUseCasePage() {
  const [, navigate] = useLocation();
  const { openContact } = useModal();
  return (
    <Page>
      {/* Hero */}
      <section style={{ background: "#0a0a0a", padding: "clamp(56px,8vw,100px) clamp(16px,3.5vw,40px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#ef4444", animation: "recekonDot 1.5s infinite" }} />
            <span style={{ fontSize: 11, fontWeight: 800, color: "#ef4444", textTransform: "uppercase", letterSpacing: "0.1em" }}>Kill Switch™</span>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", marginLeft: 4 }}>/ Zombie Subscriptions</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="zuc-split">
            <div>
              <h1 style={{ fontSize: "clamp(36px,4.5vw,58px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05, color: "#fff", marginBottom: 20 }}>
                Found. Cancelled.<br/><span style={{ color: "#ef4444" }}>Already done.</span>
              </h1>
              <p style={{ fontSize: 17, color: "rgba(255,255,255,0.5)", lineHeight: 1.8, marginBottom: 36, maxWidth: 440 }}>
                Kill Switch™ doesn't surface a list of subscriptions you should cancel. It cancels them — automatically, through official merchant APIs, with a full audit trail and a confirmation receipt.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 36 }}>
                {[
                  ["No login required", "Works through official merchant APIs — no credential storage, ever"],
                  ["No hold music", "Automated cancellation in seconds, not phone calls"],
                  ["Undo within 24 hours", "Changed your mind? One tap restores the subscription"],
                  ["Full audit trail", "Every action logged with timestamp, method, confirmation ID"],
                ].map(([t, d], i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                      <svg width="8" height="7" viewBox="0 0 8 7" fill="none"><path d="M1 3.5L3 5.5L7 1" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 1 }}>{t}</div>
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>{d}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => openContact("I want Zombie Detector to find what I'm leaking.")}
                style={{ background: "#ef4444", color: "#fff", border: "none", borderRadius: 10, padding: "14px 28px", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                Get early access →
              </button>
            </div>
            <div>
              <KillFeed />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: "#fff", padding: "clamp(48px,7vw,80px) clamp(16px,3.5vw,40px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }} className="stat-row">
            {[
              { n: "$200+",  l: "average household bleeds monthly to subscriptions they forgot", c: "#ef4444" },
              { n: "6",      l: "average unused subscriptions per household at any given moment", c: "#0a0a0a" },
              { n: "$3.4B+", l: "in zombie subscription charges globally, every single month",   c: "#0a0a0a" },
              { n: "4.1s",   l: "average time for Kill Switch™ to complete a cancellation",       c: "#22c55e" },
            ].map((s, i) => (
              <div key={i} style={{ padding: "24px 22px", background: i === 0 ? "#fef2f2" : i === 3 ? "#f0fdf4" : "#f9f9f9", borderRadius: 14, border: `1px solid ${i === 0 ? "#fecaca" : i === 3 ? "#bbf7d0" : "#e5e5e5"}` }}>
                <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: "-0.04em", color: s.c }}>{s.n}</div>
                <div style={{ fontSize: 13, color: "#6b7280", marginTop: 6, lineHeight: 1.5 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Execution timeline */}
      <section style={{ background: "#0a0a0a", padding: "clamp(56px,8vw,96px) clamp(16px,3.5vw,40px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }} className="zuc-split">
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#ef4444", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>Agent Execution</p>
            <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 800, letterSpacing: "-0.025em", color: "#fff", marginBottom: 20 }}>
              Five steps.<br/>4.1 seconds total.
            </h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.8, marginBottom: 8 }}>
              From detection to confirmed cancellation receipt — fully automated, fully auditable.
            </p>
          </div>
          <ExecutionTimeline />
        </div>
      </section>

      {/* Trust / safety */}
      <section style={{ background: "#f9f9f9", padding: "clamp(48px,7vw,80px) clamp(16px,3.5vw,40px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(26px,3vw,38px)", fontWeight: 800, letterSpacing: "-0.02em", textAlign: "center", marginBottom: 12 }}>
            You stay in control. Always.
          </h2>
          <p style={{ fontSize: 15, color: "#6b7280", textAlign: "center", maxWidth: 480, margin: "0 auto 48px", lineHeight: 1.75 }}>
            Autonomous execution doesn't mean invisible execution. Every action is transparent, reversible, and auditable.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }} className="sec-grid">
            {[
              { icon: "🔍", title: "Confidence scoring", body: "Every cancellation is scored before execution. 99%+ confidence = automatic. Below threshold = you approve first." },
              { icon: "↩️", title: "24-hour undo", body: "Changed your mind? One tap restores any cancelled subscription within 24 hours, no questions asked." },
              { icon: "📋", title: "Full audit trail", body: "Every action logged: timestamp, method, merchant response, confirmation ID. Exportable. Yours forever." },
              { icon: "🔒", title: "Zero credential storage", body: "Kill Switch uses official merchant APIs exclusively. We never store your login passwords. Never." },
              { icon: "📬", title: "Confirmation receipts", body: "Every cancellation generates a confirmation receipt stored in your RECEKON vault for reference." },
              { icon: "⚙️",  title: "Approval flow", body: "Set which categories auto-cancel and which require your tap. Fully configurable from your dashboard." },
            ].map((f, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid #e5e5e5", borderRadius: 14, padding: "22px 22px" }}>
                <div style={{ fontSize: 24, marginBottom: 12 }}>{f.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#0a0a0a", marginBottom: 8 }}>{f.title}</div>
                <p style={{ margin: 0, fontSize: 13, color: "#6b7280", lineHeight: 1.65 }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`.zuc-split{grid-template-columns:1fr 1fr} @media(max-width:900px){.zuc-split{grid-template-columns:1fr!important}} .stat-row{grid-template-columns:repeat(4,1fr)} @media(max-width:768px){.stat-row{grid-template-columns:1fr 1fr!important}}`}</style>
    </Page>
  );
}
