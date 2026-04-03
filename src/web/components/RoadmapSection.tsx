import { useEffect, useRef, useState } from "react";

function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.style.transitionDelay = `${delay}s`; el.classList.add("visible"); }
    }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, [delay]);
  return ref;
}

const phases = [
  {
    num: "01",
    phase: "Phase 1",
    name: "The Wedge",
    status: "Building Now",
    statusColor: "#10b981",
    tag: "Consumer SaaS",
    goal: "10,000 active users. Stitching Engine proven in market.",
    desc: "We enter through subscription cancellation — the highest-pain, lowest-friction entry point. While users enjoy the Kill Switch, the Stitching Engine quietly builds the world's first consumer SKU-level data asset.",
    items: ["Bank connection via Plaid", "Email receipt ingestion (IMAP/Gmail API)", "Stitching Engine — transaction-to-SKU matching", "Zombie subscription AI detection", "SKU-level spending dashboard", "One-click cancellation emails", "Tax-ready itemized reports"],
  },
  {
    num: "02",
    phase: "Phase 2",
    name: "The Platform",
    status: "Series A",
    statusColor: "#1a3cff",
    tag: "B2B Data Platform",
    goal: "RECEKON Virtual Card. B2B Data API. $100M ARR potential.",
    desc: "The Virtual Card transforms us from Observer to Controller. The B2B Data API begins monetizing the SKU-level data asset. We become the Stripe for Receipts — the infrastructure layer every fintech company needs.",
    items: ["RECEKON Virtual Card (Stripe Issuing)", "Real-time authorization decision engine", "Programmable spending rules", "B2B SKU Intelligence API", "Enterprise partnerships (hedge funds, brands)", "PCI-DSS Level 1 certification", "Snowflake analytical data warehouse"],
  },
  {
    num: "03",
    phase: "Phase 3",
    name: "The Infrastructure",
    status: "The Endgame",
    statusColor: "#7c3aed",
    tag: "Network Standard",
    goal: "Global Proof of Purchase protocol. The world's purchase intelligence network.",
    desc: "We stop being a product and become the protocol. Every merchant, every warranty system, every tax authority runs on RECEKON's Proof of Purchase standard. The network effect makes it unbreakable.",
    items: ["Proof of Purchase protocol standard", "Blockchain-anchored receipt verification", "Warranty claim automation", "Insurance fraud prevention API", "Government tax reporting integration", "White-label infrastructure for banks", "The SKU Graph — global purchase intelligence network"],
  },
];

export function RoadmapSection() {
  const t = useReveal(0);

  return (
    <section id="roadmap" style={{ padding: "100px 0", background: "#ffffff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px" }}>
        <div ref={t} className="reveal" style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 72px" }}>
          <div className="section-label" style={{ justifyContent: "center" }}>The Trajectory</div>
          <h2 className="display-lg" style={{ marginBottom: 18 }}>
            From app to infrastructure.
            <br /><span className="text-gradient">Three phases. One mission.</span>
          </h2>
          <p className="body-lg">Every phase compounds the last. The data asset built in Phase 1 powers Phase 2. The network built in Phase 2 makes Phase 3 inevitable.</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {phases.map((p, i) => <PhaseCard key={i} {...p} delay={i * 0.12} />)}
        </div>
      </div>
    </section>
  );
}

function PhaseCard({ num, phase, name, status, statusColor, tag, goal, desc, items, delay }: {
  num: string; phase: string; name: string; status: string; statusColor: string; tag: string;
  goal: string; desc: string; items: string[]; delay: number;
}) {
  const ref = useReveal(delay);
  const [open, setOpen] = useState(false);

  return (
    <div ref={ref} className="reveal">
      <div style={{
        background: "#ffffff",
        border: `1px solid ${open ? statusColor + "40" : "#e5e7eb"}`,
        borderRadius: 20,
        overflow: "hidden",
        transition: "border-color 0.25s ease",
        boxShadow: open ? `0 8px 32px ${statusColor}15` : "none",
      }}>
        {/* Accent top bar */}
        <div style={{ height: 3, background: statusColor, width: open ? "100%" : "0%", transition: "width 0.4s ease" }} />

        {/* Header row */}
        <div style={{ padding: "28px 32px", display: "flex", alignItems: "center", gap: 24, cursor: "pointer" }} onClick={() => setOpen(!open)}>
          <div style={{ width: 52, height: 52, background: `${statusColor}10`, border: `1px solid ${statusColor}25`, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontSize: 20, fontWeight: 900, fontFamily: "monospace", color: statusColor }}>{num}</span>
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
              <span style={{ fontSize: 11, color: "#9ca3af", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>{phase} · {tag}</span>
              <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 10px", background: `${statusColor}12`, border: `1px solid ${statusColor}30`, borderRadius: 100, color: statusColor, letterSpacing: "0.06em", textTransform: "uppercase" }}>{status}</span>
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#0b1e4f", letterSpacing: "-0.03em" }}>{name}</div>
            <div style={{ fontSize: 13, color: "#6b7280", marginTop: 3 }}>{goal}</div>
          </div>

          <div style={{ width: 36, height: 36, borderRadius: 10, border: "1px solid #e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#6b7280", fontSize: 16, transition: "transform 0.3s ease", transform: open ? "rotate(180deg)" : "rotate(0)" }}>▾</div>
        </div>

        {/* Expanded content */}
        {open && (
          <div style={{ padding: "0 32px 32px", borderTop: "1px solid #f3f4f6" }}>
            <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.75, padding: "24px 0 20px", maxWidth: 720 }}>{desc}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }} className="phase-items">
              {items.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", background: "#f8f9fb", borderRadius: 8, fontSize: 13, color: "#374151" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: statusColor, flexShrink: 0 }} />
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <style>{`
        .phase-items { grid-template-columns: 1fr 1fr; }
        @media (max-width: 600px) { .phase-items { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
