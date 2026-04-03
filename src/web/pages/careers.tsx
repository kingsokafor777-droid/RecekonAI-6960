import { Page } from "../components/Layout";

const roles = [
  { title:"Senior Backend Engineer",     team:"Engineering",  type:"Full-time", loc:"Remote (Canada)" },
  { title:"ML Engineer — Receipt Parsing",team:"AI/ML",       type:"Full-time", loc:"Remote (Canada)" },
  { title:"Product Designer",             team:"Design",       type:"Full-time", loc:"Remote" },
  { title:"Growth Lead",                  team:"Marketing",    type:"Full-time", loc:"Toronto or Remote" },
  { title:"Full-Stack Engineer",          team:"Engineering",  type:"Full-time", loc:"Remote (Canada)" },
  { title:"Data Engineer — SKU Pipeline", team:"Data",         type:"Full-time", loc:"Remote (Canada)" },
];

export default function CareersPage() {
  return (
    <Page>
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e5e5", padding: "clamp(40px,7vw,80px) clamp(16px,3.5vw,40px) clamp(32px,5vw,60px)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 clamp(16px,3.5vw,40px)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60 }} className="career-hero">
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>Careers</p>
              <h1 className="kn-display" style={{ marginBottom: 0 }}>Build the financial infrastructure layer.</h1>
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
              <p className="kn-body" style={{ color: "#6b7280", marginBottom: 20 }}>We're a small team with enormous ambitions. Remote-first, Canada-based, mission-driven.</p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {["Remote-first","Equity-heavy","Well-funded","Mission-driven"].map(b => (
                  <span key={b} style={{ fontSize: 12, fontWeight: 700, padding: "5px 14px", background: "#f5f5f5", border: "1px solid #e5e5e5", borderRadius: 100, color: "#374151" }}>{b}</span>
                ))}
              </div>
            </div>
          </div>
          <style>{`.career-hero{grid-template-columns:1fr 1fr} @media(max-width:768px){.career-hero{grid-template-columns:1fr!important}}`}</style>
        </div>
      </div>

      <section style={{ padding: "clamp(40px,7vw,80px) clamp(16px,3.5vw,40px)", background: "#f9f9f9" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 clamp(16px,3.5vw,40px)" }}>
          <h2 className="kn-h2" style={{ marginBottom: 32 }}>Open positions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {roles.map((r, i) => (
              <div key={i}
                style={{ background: "#fff", border: "1px solid #e5e5e5", borderRadius: 10, padding: "18px 24px", display: "flex", alignItems: "center", gap: 20, cursor: "pointer", transition: "all 0.15s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor="#0a0a0a"; e.currentTarget.style.boxShadow="0 4px 16px rgba(0,0,0,0.06)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor="#e5e5e5"; e.currentTarget.style.boxShadow="none"; }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#0a0a0a", marginBottom: 4 }}>{r.title}</div>
                  <div style={{ fontSize: 13, color: "#9ca3af" }}>{r.team} · {r.loc}</div>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", background: "#f0f0f0", borderRadius: 5, color: "#374151" }}>{r.type}</span>
                  <span style={{ color: "#9ca3af", fontSize: 18 }}>›</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 40, padding: "28px 32px", background: "#0a0a0a", borderRadius: 14, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 6 }}>Don't see your role?</div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>We're always looking for exceptional people.</div>
            </div>
            <button style={{ background: "#fff", color: "#0a0a0a", border: "none", borderRadius: 8, padding: "12px 22px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
              Send us your resume →
            </button>
          </div>
        </div>
      </section>
    </Page>
  );
}
