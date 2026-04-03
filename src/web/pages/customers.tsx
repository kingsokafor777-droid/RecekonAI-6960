import { Page } from "../components/Layout";

const stories = [
  { name:"Sarah K.", role:"Freelance Designer", loc:"Toronto, CA 🇨🇦", emoji:"👩‍🎨", quote:"RECEKON found $272 in monthly waste in the first 48 hours. The Stitching Engine matched every single receipt automatically. I didn't do anything.", savings:"$272/mo found", stats:[["$272","monthly waste found"],["6","zombies killed"],["100%","receipts matched"]] },
  { name:"Marcus T.", role:"Small Business Owner", loc:"Vancouver, CA 🇨🇦", emoji:"👨‍💼", quote:"Tax season used to take me 3 days. RECEKON had my Q4 report ready by January 2nd — every receipt attached, every deduction documented.", savings:"$2,847 in deductions", stats:[["$2,847","in deductions found"],["3 days","saved on tax prep"],["48","receipts auto-attached"]] },
  { name:"James O.", role:"Consultant", loc:"New York, US 🇺🇸", emoji:"👨‍💻", quote:"The SKU-level data is unreal. I can see my Tide Pods spend went up 22% this month. No other app does this.", savings:"Full spend visibility", stats:[["22%","Tide Pods increase spotted"],["97.4%","SKU match accuracy"],["1st","to know about price creep"]] },
  { name:"Priya N.", role:"Software Engineer", loc:"London, UK 🇬🇧", emoji:"👩‍💻", quote:"I had 6 zombie subscriptions totalling £98/mo I completely forgot about. One tap to kill each. Done.", savings:"£98/mo saved", stats:[["£98/mo","saved instantly"],["6","subscriptions killed"],["< 1 min","to cancel all 6"]] },
  { name:"Lena M.", role:"Product Manager", loc:"Berlin, DE 🇩🇪", emoji:"👩‍💼", quote:"As someone who travels for work, tracking expenses across currencies was a nightmare. RECEKON handles it automatically — every receipt matched, every category correct.", savings:"€340/mo clarity", stats:[["€340","monthly spend clarity"],["12","countries tracked"],["0","manual uploads"]] },
  { name:"Amir S.", role:"Entrepreneur", loc:"Dubai, UAE 🇦🇪", emoji:"👨‍🦱", quote:"The zombie subscription feature alone saved me $180 a month. I had no idea I was still paying for 8 services I hadn't touched in over a year.", savings:"$180/mo saved", stats:[["$180/mo","zombie savings"],["8","subscriptions killed"],["< 5 min","total setup"]] },
];

export default function CustomersPage() {
  return (
    <Page>
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e5e5", padding: "clamp(40px,7vw,80px) clamp(16px,3.5vw,40px) clamp(32px,5vw,60px)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>Customers</p>
          <h1 className="kn-display" style={{ marginBottom: 20 }}>Real people. Real savings.</h1>
          <p className="kn-body" style={{ color: "#6b7280" }}>Early access users are finding hundreds of dollars in monthly waste — automatically, without lifting a finger.</p>
        </div>
      </div>

      {stories.map((s, i) => (
        <section key={i} style={{ padding: "clamp(48px,8vw,100px) clamp(16px,3.5vw,40px)", background: i % 2 === 0 ? "#fff" : "#f9f9f9", borderBottom: "1px solid #e5e5e5" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 clamp(16px,3.5vw,40px)" }}>
            <div style={{ borderTop: "3px solid #0a0a0a", paddingTop: 48, marginBottom: 48 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 24 }}>Customer Story</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }} className="story-split">
                <div>
                  <p style={{ fontSize: "clamp(20px,3vw,36px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.25, color: "#0a0a0a", marginBottom: 32 }}>
                    "{s.quote}"
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>{s.emoji}</div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700 }}>{s.name}</div>
                      <div style={{ fontSize: 13, color: "#6b7280" }}>{s.role} · {s.loc}</div>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {s.stats.map(([n, l], j) => (
                    <div key={j} style={{ padding: "20px 24px", background: j === 0 ? "#0a0a0a" : "#fff", border: j !== 0 ? "1px solid #e5e5e5" : "none", borderRadius: 12 }}>
                      <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: "-0.04em", color: j === 0 ? "#22c55e" : "#0a0a0a" }}>{n}</div>
                      <div style={{ fontSize: 13, color: j === 0 ? "rgba(255,255,255,0.5)" : "#6b7280", marginTop: 4 }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <style>{`.story-split{grid-template-columns:1fr 1fr} @media(max-width:768px){.story-split{grid-template-columns:1fr!important}}`}</style>
        </section>
      ))}
    </Page>
  );
}
