import { useEffect, useRef, useState } from "react";

function useReveal(cls = "reveal") {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add("visible"); }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function StatCard({ value, label, desc, color, delay }: { value: string; label: string; desc: string; color: string; delay: number }) {
  const ref = useReveal("reveal");
  return (
    <div ref={ref} className="reveal" style={{ transitionDelay: `${delay}s` }}>
      <div className="card" style={{ height: "100%" }}>
        <div style={{ width: 4, height: 32, background: color, borderRadius: 4, marginBottom: 20 }} />
        <div style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 900, letterSpacing: "-0.04em", color: "#0b1e4f", lineHeight: 1, marginBottom: 8 }}>
          {value}
        </div>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#0b1e4f", marginBottom: 8 }}>{label}</div>
        <div style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6 }}>{desc}</div>
      </div>
    </div>
  );
}

export function ProblemSection() {
  const titleRef = useReveal("reveal");
  const photoRef = useReveal("reveal-right");

  return (
    <section id="problem" style={{ padding: "100px 0", background: "#f8f9fb" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        {/* Header */}
        <div ref={titleRef} className="reveal" style={{ maxWidth: 740, marginBottom: 64 }}>
          <div className="section-label">The Diagnosis</div>
          <h2 className="display-lg" style={{ marginBottom: 20 }}>
            For 20 years, finance apps told you what was wrong.{" "}
            <span className="text-gradient">Nobody fixed it.</span>
          </h2>
          <p className="body-lg" style={{ color: "#374151" }}>
            Mint told you that you spent too much on coffee. Quicken organized your categories. Neither one stopped the $200/month evaporating from every household — silently, every single month.
          </p>
        </div>

        {/* Two-col: stats + photo */}
        <div className="split" style={{ gap: 60, marginBottom: 0 }}>
          {/* Stats grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="stats-grid">
            <StatCard value="$3.4B+" label="Zombie spend/month" desc="Consumers worldwide pay for subscriptions they've completely forgotten about — every single month." color="#ef4444" delay={0} />
            <StatCard value="11.2B" label="Receipts lost/year" desc="Paper receipts generated globally every year. Gone before tax season. Gone forever — in every country." color="#f97316" delay={0.1} />
            <StatCard value="40%" label="Purchases forgotten" desc="You forget 40% of what you bought within 48 hours. Your bank statement knows nothing useful." color="#7c3aed" delay={0.2} />
            <StatCard value="$5B" label="Missed deductions" desc="Freelancers and SMBs worldwide lose billions annually from lost receipts and zero documentation." color="#1a3cff" delay={0.3} />
          </div>

          {/* Photo */}
          <div ref={photoRef} className="reveal-right">
            <div style={{ borderRadius: 24, overflow: "hidden", background: "#e5e7eb", aspectRatio: "4/5", boxShadow: "0 16px 60px rgba(0,0,0,0.08)" }}>
              <img src="/person-phone.png" alt="Person using financial app" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>

            {/* Pull quote below photo */}
            <div style={{
              marginTop: 20,
              padding: "20px 24px",
              background: "#0b1e4f",
              borderRadius: 14,
              color: "#fff",
            }}>
              <div style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.6, marginBottom: 10 }}>
                "Post-Transaction Entropy & Financial Amnesia — this is a Class 5 Wicked Problem. The data is invisible. We made it visible."
              </div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                RECEKON Research, 2024
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .stats-grid { grid-template-columns: 1fr 1fr; }
        @media (max-width: 600px) {
          .stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
