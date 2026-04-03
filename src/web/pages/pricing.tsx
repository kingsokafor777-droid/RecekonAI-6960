import { useLocation } from "wouter";
import { Page } from "../components/Layout";

export default function PricingPage() {
  const [, navigate] = useLocation();
  const plans = [
    { name:"Free", price:"$0", period:"forever", desc:"Get started. See what you're losing.", featured:false, cta:"Get Started",
      features:["Bank account connection","5 receipt matches/month","Zombie subscription scan","Basic spending dashboard"] },
    { name:"Pro", price:"$9", period:"/month", desc:"Full visibility. Full control.", featured:true, cta:"Start Free Trial",
      features:["Unlimited receipt matching","SKU-level analytics","Tax report generation","Kill Switch (virtual card)","Priority support","Export CSV / PDF"] },
    { name:"Business", price:"$29", period:"/month", desc:"For freelancers and small teams.", featured:false, cta:"Contact Sales",
      features:["Everything in Pro","Multi-user (up to 5)","Accountant export mode","Dedicated onboarding","SLA support","API access (Phase 2)"] },
  ];

  return (
    <Page>
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e5e5", padding: "clamp(40px,7vw,80px) clamp(16px,3.5vw,40px) clamp(32px,5vw,60px)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>Pricing</p>
          <h1 className="kn-display" style={{ marginBottom: 20 }}>Simple, honest pricing.</h1>
          <p className="kn-body" style={{ color: "#6b7280" }}>No hidden fees. No "contact us for pricing" games. The Pro plan pays for itself the first zombie subscription you kill.</p>
        </div>
      </div>

      <section style={{ padding: "clamp(40px,7vw,80px) clamp(16px,3.5vw,40px)", background: "#f9f9f9" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 clamp(16px,3.5vw,40px)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }} className="price-grid">
            {plans.map((plan, i) => (
              <div key={i} style={{
                border: `1.5px solid ${plan.featured ? "#0a0a0a" : "#e5e5e5"}`,
                borderRadius: 16, padding: "32px",
                background: plan.featured ? "#0a0a0a" : "#fff",
                position: "relative",
              }}>
                {plan.featured && (
                  <div style={{ position:"absolute",top:-12,left:"50%",transform:"translateX(-50%)",background:"#22c55e",color:"#fff",fontSize:11,fontWeight:700,padding:"3px 14px",borderRadius:100,whiteSpace:"nowrap" }}>Most Popular</div>
                )}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize:13,fontWeight:700,color:plan.featured?"rgba(255,255,255,0.5)":"#9ca3af",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8 }}>{plan.name}</div>
                  <div style={{ display:"flex",alignItems:"baseline",gap:4,marginBottom:8 }}>
                    <span style={{ fontSize:40,fontWeight:800,letterSpacing:"-0.04em",color:plan.featured?"#fff":"#0a0a0a" }}>{plan.price}</span>
                    <span style={{ fontSize:14,color:plan.featured?"rgba(255,255,255,0.4)":"#9ca3af" }}>{plan.period}</span>
                  </div>
                  <p style={{ fontSize:14,color:plan.featured?"rgba(255,255,255,0.6)":"#6b7280" }}>{plan.desc}</p>
                </div>
                <button onClick={() => navigate("/#waitlist")}
                  style={{ width:"100%",padding:"12px",borderRadius:8,fontFamily:"inherit",fontWeight:700,fontSize:14,cursor:"pointer",marginBottom:24,
                    background:plan.featured?"#fff":"#0a0a0a",color:plan.featured?"#0a0a0a":"#fff",border:"none",transition:"all 0.15s" }}>
                  {plan.cta} →
                </button>
                <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
                  {plan.features.map((f,fi) => (
                    <div key={fi} style={{ display:"flex",alignItems:"center",gap:10,fontSize:13,color:plan.featured?"rgba(255,255,255,0.75)":"#374151" }}>
                      <span style={{ color:"#22c55e",fontWeight:700,flexShrink:0 }}>✓</span>{f}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`.price-grid{grid-template-columns:repeat(3,1fr)} @media(max-width:768px){.price-grid{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* FAQ */}
      <section style={{ padding: "clamp(40px,7vw,80px) clamp(16px,3.5vw,40px)", background: "#fff" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 clamp(16px,3.5vw,40px)" }}>
          <h2 className="kn-h2" style={{ textAlign: "center", marginBottom: 48 }}>Frequently asked questions</h2>
          {[
            ["Is my bank data safe?","Yes. We use Plaid for read-only bank access. Your bank credentials never touch our servers. Financial data is AES-256 encrypted and stored in a separate system from your identity."],
            ["How does the Stitching Engine work?","We connect to your email inbox (read-only) and bank account. When a transaction occurs, our AI scans for the matching receipt email, extracts line items using OCR, and reconciles the two records automatically."],
            ["What happens if a receipt isn't found?","The transaction is flagged as PENDING RECEIPT and surfaced in your dashboard. You can manually attach a receipt or dismiss it. Over time, the engine learns your merchant patterns."],
            ["Can I cancel anytime?","Yes. No contracts. Cancel from your account settings at any time. Your data is exported as a full CSV on request."],
            ["When is the Virtual Card available?","Phase 2 — expected Q1 2027. Join the waitlist to be first in line when it launches."],
          ].map(([q,a],i) => (
            <div key={i} style={{ borderBottom: "1px solid #e5e5e5", padding: "20px 0" }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#0a0a0a", marginBottom: 8 }}>{q}</div>
              <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.7 }}>{a}</p>
            </div>
          ))}
        </div>
      </section>
    </Page>
  );
}
