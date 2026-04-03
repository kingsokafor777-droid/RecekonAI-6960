import { useEffect, useRef } from "react";

function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.style.transitionDelay = `${delay}s`; el.classList.add("visible"); } }, { threshold: 0.12 });
    obs.observe(el); return () => obs.disconnect();
  }, [delay]);
  return ref;
}

const features = [
  { icon: "🧵", title: "The Stitching Engine", desc: "World's first automatic reconciliation of bank transactions to receipt line items. No consumer has had this. Ever.", tag: "Core Innovation", color: "#1a3cff", big: true },
  { icon: "⛔", title: "Kill Switch", desc: "Block any merchant on your virtual card with one tap. No cancellation flows. No hold music. Instant.", tag: "Execution", color: "#ef4444", big: false },
  { icon: "🤖", title: "Zombie Detector", desc: "AI agent monitors every recurring charge. If you haven't used it in 60 days, you'll know — and you can stop it.", tag: "AI Agent", color: "#7c3aed", big: false },
  { icon: "🏷️", title: "SKU Intelligence", desc: "Know exactly what you bought — not just 'Target.' The first consumer SKU-level financial intelligence layer in existence.", tag: "Data", color: "#0ea5e9", big: false },
  { icon: "📊", title: "Tax-Ready Reports", desc: "Auto-generate itemized tax reports with attached receipt documentation. One click. PDF. Done.", tag: "Automation", color: "#10b981", big: false },
  { icon: "🔐", title: "Zero-Knowledge Vault", desc: "Your identity and financial data live in separate systems. A breach of one reveals nothing about the other.", tag: "Security", color: "#0b1e4f", big: false },
  { icon: "💳", title: "RECEKON Card", desc: "A smart virtual card with programmable spending rules. Set limits by category, merchant, or time. You define the firewall.", tag: "Phase 2", color: "#7c3aed", big: true },
];

export function FeaturesSection() {
  const t = useReveal(0);

  return (
    <section id="features" style={{ padding: "100px 0", background: "#f8f9fb" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div ref={t} className="reveal" style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 64px" }}>
          <div className="section-label" style={{ justifyContent: "center" }}>The Arsenal</div>
          <h2 className="display-lg" style={{ marginBottom: 16 }}>Not features. Weapons.</h2>
          <p className="body-lg">Every capability built to give you control that financial institutions have deliberately never given you.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="features-bento">
          {features.map((f, i) => <FeatureCard key={i} {...f} delay={i * 0.07} />)}
        </div>
      </div>

      <style>{`
        .features-bento { grid-template-columns: repeat(3, 1fr); }
        @media (max-width: 900px) { .features-bento { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 600px) { .features-bento { grid-template-columns: 1fr !important; } }
        .feat-big { grid-column: span 2; }
        @media (max-width: 900px) { .feat-big { grid-column: span 1 !important; } }
      `}</style>
    </section>
  );
}

function FeatureCard({ icon, title, desc, tag, color, big, delay }: { icon: string; title: string; desc: string; tag: string; color: string; big: boolean; delay: number }) {
  const ref = useReveal(delay);
  return (
    <div ref={ref} className={`reveal ${big ? "feat-big" : ""}`}>
      <div className="card" style={{ height: "100%", display: "flex", flexDirection: big ? "row" : "column", gap: big ? 28 : 0, alignItems: big ? "center" : "flex-start" }}>
        <div style={{ width: big ? 64 : 52, height: big ? 64 : 52, borderRadius: big ? 18 : 14, background: `${color}10`, border: `1px solid ${color}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: big ? 28 : 22, flexShrink: 0, marginBottom: big ? 0 : 16 }}>
          {icon}
        </div>
        <div>
          <div style={{ fontSize: 10, color: color, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>{tag}</div>
          <div style={{ fontSize: big ? 20 : 17, fontWeight: 800, color: "#0b1e4f", marginBottom: 10, letterSpacing: "-0.025em" }}>{title}</div>
          <div style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.65 }}>{desc}</div>
        </div>
      </div>
    </div>
  );
}
