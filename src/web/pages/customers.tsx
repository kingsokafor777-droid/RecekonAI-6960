import { useLocation } from "wouter";
import { Page } from "../components/Layout";
import { useModal } from "../components/ModalContext";

const STORIES = [
  {
    name: "Sarah K.",
    role: "Freelance Designer",
    loc: "Toronto, CA",
    flag: "🇨🇦",
    emoji: "👩‍🎨",
    tag: "Zombie Detector™ + Stitching Engine™",
    tagColor: "#7c3aed",
    headline: "Found $272 in monthly waste in 48 hours.",
    quote: "RECEKON found $272 in monthly waste in the first 48 hours. The Stitching Engine matched every single receipt automatically. I didn't do anything.",
    story: "Sarah runs a one-woman design studio. Her business expenses blur with personal spending across multiple credit cards and a business checking account. At tax time, she would spend days reconstructing the year's expenses from shoeboxes of receipts and scrolling through bank statements.\n\nWithin 48 hours of connecting her accounts, the Stitching Engine had matched every transaction to its corresponding receipt — something she had never achieved manually in a decade of freelancing. Zombie Detector found six forgotten subscriptions totalling $272 per month, including two software tools she had stopped using years ago and simply forgot to cancel.\n\n\"This isn't a budgeting app. It's like having an accountant who actually does the work instead of telling me what I should do.\"",
    stats: [["$272", "monthly waste found in 48 hrs"], ["6", "zombie subscriptions killed"], ["100%", "receipts matched automatically"]],
  },
  {
    name: "Amir S.",
    role: "Entrepreneur",
    loc: "Dubai, UAE",
    flag: "🇦🇪",
    emoji: "👨‍🦱",
    tag: "Zombie Detector™",
    tagColor: "#ef4444",
    headline: "8 subscriptions bleeding $180/mo. He had no idea.",
    quote: "The zombie subscription feature alone saved me $180 a month. I had no idea I was still paying for 8 services I hadn't touched in over a year.",
    story: "Amir runs a logistics consulting firm that requires a constant stream of SaaS tools — some he tests once and forgets, some used briefly for a project, some that seemed essential at signup but became irrelevant. The result: a slow financial bleed he never noticed because each charge was small and none triggered any alert.\n\nZombie Detector identified eight active subscriptions with zero usage signals in the past year. The charges ranged from $7 to $45 per month — individually invisible, collectively significant. One-tap cancellation through Kill Switch™ ended the bleeding permanently.\n\n\"I thought I had maybe three or four subscriptions. Finding out I was paying for eight I didn't use was embarrassing. Having them cancelled in under five minutes was liberating.\"",
    stats: [["$180/mo", "saved from zombie subs"], ["8", "subscriptions killed"], ["< 5 min", "total setup to cancellation"]],
  },
  {
    name: "Lena M.",
    role: "Product Manager",
    loc: "Berlin, DE",
    flag: "🇩🇪",
    emoji: "👩‍💼",
    tag: "TaxLink™ + Stitching Engine™",
    tagColor: "#16a34a",
    headline: "Expense reconciliation across 12 countries. Now automatic.",
    quote: "As someone who travels for work, tracking expenses across currencies was a nightmare. RECEKON handles it automatically — every receipt matched, every category correct.",
    story: "Lena's role requires monthly travel across European and Asian markets. Every trip generates dozens of receipts in different languages, currencies, and formats. Her previous workflow involved photographing every receipt, manually categorizing each expense, and hoping exchange rate conversions matched what her corporate card actually charged.\n\nRECEKON eliminated the entire workflow. Email receipts are captured automatically. The Stitching Engine matches them to card transactions regardless of currency. TaxLink categorizes expenses according to her company's policy. She submits a clean, auditable expense report without ever opening a scanner app.\n\n\"I used to dread the monthly expense reconciliation. Now I don't even think about it. The system does everything.\"",
    stats: [["€340", "monthly spend fully clarified"], ["12", "countries tracked automatically"], ["0", "manual receipt uploads required"]],
  },
  {
    name: "Marcus T.",
    role: "Startup Founder",
    loc: "Austin, TX",
    flag: "🇺🇸",
    emoji: "👨‍💼",
    tag: "Cash Flow Oracle™",
    tagColor: "#0ea5e9",
    headline: "Oracle predicted a cash crisis. He fixed it 3 months early.",
    quote: "Cash Flow Oracle predicted we'd run short before our Series A closed. We adjusted, secured bridge funding early, and avoided a crisis that would have killed the company.",
    story: "Marcus's B2B SaaS startup was burning $80K per month with a Series A round scheduled to close in four months. The numbers looked fine — until Cash Flow Oracle projected a cash shortfall at week 11. The model had detected patterns Marcus missed: seasonal churn accelerating, delayed enterprise payments, and a large vendor payment he had forgotten was coming due.\n\nArmed with 90-day visibility, Marcus accelerated conversations with existing investors and secured a bridge round three weeks before the projected shortfall. The company survived what would have been a terminal cash crisis.\n\n\"Dashboards show you what happened. Oracle shows you what's going to happen. That's the difference between reacting to a crisis and preventing one.\"",
    stats: [["3 months", "runway extended"], ["$47K", "cash crisis avoided"], ["Weeks early", "bridge funding secured"]],
  },
  {
    name: "Jennifer L.",
    role: "Working Parent",
    loc: "Seattle, WA",
    flag: "🇺🇸",
    emoji: "👩‍👧",
    tag: "Price Guardian™",
    tagColor: "#22c55e",
    headline: "$89 refund. Zero effort. She didn't contact anyone.",
    quote: "Price Guardian found a price drop on a TV we bought for the kids. $89 refund appeared in my account three days later. I didn't contact anyone. I didn't fill out a form. It just happened.",
    story: "Jennifer's family made a significant electronics purchase for the holidays. Two weeks later, the same item went on sale. Like most people, she would never have noticed — she wasn't checking prices after buying, and Amazon certainly wasn't going to volunteer that she overpaid.\n\nPrice Guardian detected the drop, verified it fell within Amazon's price-match window, and submitted the refund request automatically. Jennifer received a notification only after the $89 had been processed back to her card. Since then, the system has secured similar refunds on clothing, toys, and household items.\n\n\"It's found money I didn't know existed. I shop the same way I always have. The difference is, now I get money back when prices drop.\"",
    stats: [["$89", "refund on a single purchase"], ["$400+", "recovered in annual savings"], ["0", "forms filled, calls made, effort spent"]],
  },
  {
    name: "CloudScale Technologies",
    role: "Finance Department",
    loc: "San Francisco, CA",
    flag: "🇺🇸",
    emoji: "🏢",
    tag: "TaxLink™ B2B",
    tagColor: "#f59e0b",
    headline: "3 people doing expense reconciliation. Now: 1 person, a few hours.",
    quote: "We had three people doing expense reconciliation. Now one person handles it in a few hours a week. TaxLink paid for itself in the first month.",
    story: "CloudScale's 120-employee company was drowning in expense reports. Three finance team members spent the equivalent of a full work week each month chasing receipts, categorizing expenses, and correcting errors before month-end close.\n\nTaxLink B2B transformed the process. Employees submit expenses through the mobile app. Receipts are automatically matched. Categories are pre-assigned according to company policy. The finance team reviews flagged items and exports clean data directly to QuickBooks. What took three people now takes one person a few hours.\n\n\"Our old process was expensive and error-prone. Now it's inexpensive and accurate. That's not an incremental improvement — that's a different paradigm.\"",
    stats: [["40 hrs/mo", "saved in finance team labor"], ["$12K/yr", "labor cost recovered"], ["0", "audit findings since implementation"]],
  },
];

const BEFORE_AFTER = [
  ["Manual receipt tracking", "Automatic SKU-level matching"],
  ["Unknown zombie subscriptions", "Autonomous detection and cancellation"],
  ["Surprise cash shortfalls", "90-day predictive warnings"],
  ["Missed price drops", "Automatic refund requests filed"],
  ["Expense reconciliation drudgery", "One-click audit-ready reports"],
];

export default function CustomersPage() {
  const [, navigate] = useLocation();
  const { openContact } = useModal();

  return (
    <Page>
      {/* Hero */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e5e5", padding: "clamp(40px,7vw,80px) clamp(16px,3.5vw,40px) clamp(32px,5vw,60px)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>Customers</p>
          <h1 className="kn-display" style={{ marginBottom: 20 }}>Real people. Real savings.</h1>
          <p className="kn-body" style={{ color: "#6b7280", maxWidth: 580, margin: "0 auto" }}>
            These are not cherry-picked outliers. These are early access users who connected their accounts and watched autonomous systems identify waste, recover money, and eliminate financial drudgery — without lifting a finger.
          </p>
        </div>
      </div>

      {/* Aggregate stats bar */}
      <div style={{ background: "#0a0a0a", padding: "clamp(28px,4vw,48px) clamp(16px,3.5vw,40px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 2 }} className="stats-bar">
          {[
            ["$272", "avg monthly waste found, day one"],
            ["94.7%", "subscription cancellation success rate"],
            ["$1,200", "avg annual deductions recovered"],
            ["Zero", "manual steps required after setup"],
          ].map(([n, l], i) => (
            <div key={i} style={{ textAlign: "center", padding: "20px 16px", borderRight: i < 3 ? "1px solid #1a1a1a" : "none" }}>
              <div style={{ fontSize: "clamp(22px,3vw,36px)", fontWeight: 900, letterSpacing: "-0.04em", color: "#22c55e", marginBottom: 6 }}>{n}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.4 }}>{l}</div>
            </div>
          ))}
        </div>
        <style>{`.stats-bar{grid-template-columns:repeat(4,1fr)} @media(max-width:640px){.stats-bar{grid-template-columns:1fr 1fr!important}}`}</style>
      </div>

      {/* Stories */}
      {STORIES.map((s, i) => (
        <section key={i} style={{ padding: "clamp(56px,8vw,100px) clamp(16px,3.5vw,40px)", background: i % 2 === 0 ? "#fff" : "#f9f9f9", borderBottom: "1px solid #e5e5e5" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>

            {/* Story header */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40, flexWrap: "wrap" }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>{s.emoji}</div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 16, fontWeight: 800, color: "#0a0a0a" }}>{s.name}</span>
                  <span style={{ fontSize: 13, color: "#9ca3af" }}>·</span>
                  <span style={{ fontSize: 13, color: "#6b7280" }}>{s.role}</span>
                  <span style={{ fontSize: 13, color: "#9ca3af" }}>·</span>
                  <span style={{ fontSize: 13, color: "#6b7280" }}>{s.flag} {s.loc}</span>
                </div>
                <div style={{ marginTop: 4 }}>
                  <span style={{ fontSize: 10, fontWeight: 800, color: s.tagColor, background: `${s.tagColor}12`, border: `1px solid ${s.tagColor}25`, padding: "2px 9px", borderRadius: 100, letterSpacing: "0.06em" }}>{s.tag}</span>
                </div>
              </div>
              <div style={{ marginLeft: "auto", padding: "6px 14px", background: "#f9f9f9", border: "1px solid #e5e5e5", borderRadius: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#0a0a0a" }}>{s.headline}</span>
              </div>
            </div>

            {/* Main split */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 60, alignItems: "start" }} className="story-split">

              {/* Left: quote + story */}
              <div>
                <p style={{ fontSize: "clamp(20px,2.8vw,30px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.3, color: "#0a0a0a", marginBottom: 32, borderLeft: `4px solid ${s.tagColor}`, paddingLeft: 20 }}>
                  "{s.quote}"
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {s.story.split("\n\n").map((para, j) => (
                    <p key={j} style={{ fontSize: 15, color: para.startsWith('"') ? "#0a0a0a" : "#374151", lineHeight: 1.8, margin: 0, fontStyle: para.startsWith('"') ? "italic" : "normal", fontWeight: para.startsWith('"') ? 600 : 400 }}>
                      {para}
                    </p>
                  ))}
                </div>
              </div>

              {/* Right: stats */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {s.stats.map(([n, l], j) => (
                  <div key={j} style={{
                    padding: "22px 24px",
                    background: j === 0 ? "#0a0a0a" : "#fff",
                    border: j !== 0 ? "1px solid #e5e5e5" : "none",
                    borderRadius: 14,
                    borderLeft: j !== 0 ? `3px solid ${s.tagColor}` : undefined,
                  }}>
                    <div style={{ fontSize: 34, fontWeight: 900, letterSpacing: "-0.04em", color: j === 0 ? "#22c55e" : "#0a0a0a", lineHeight: 1 }}>{n}</div>
                    <div style={{ fontSize: 13, color: j === 0 ? "rgba(255,255,255,0.5)" : "#6b7280", marginTop: 6 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <style>{`.story-split{grid-template-columns:1fr 380px} @media(max-width:900px){.story-split{grid-template-columns:1fr!important}}`}</style>
        </section>
      ))}

      {/* The RECEKON Effect */}
      <section style={{ background: "#0a0a0a", padding: "clamp(56px,8vw,100px) clamp(16px,3.5vw,40px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }} className="effect-split">

            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#22c55e", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>The RECEKON Effect</p>
              <h2 style={{ fontSize: "clamp(28px,3.5vw,46px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#fff", marginBottom: 20, lineHeight: 1.05 }}>
                What every customer<br/>has in common.
              </h2>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.8, marginBottom: 32 }}>
                They did not get a budgeting app that told them what to do. They received a system that did the work for them. They did not gain visibility into problems — they gained solutions to problems they did not know they had.
              </p>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.35)", lineHeight: 1.75, fontStyle: "italic" }}>
                "The financial technology industry is filled with products that promise transformation and deliver dashboards. RECEKON was built on a different premise: what if the system did the work for you?"
              </p>
            </div>

            {/* Before / After table */}
            <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 16, overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", background: "#0d0d0d", borderBottom: "1px solid #1a1a1a" }} className="ba-header">
                <div style={{ padding: "12px 20px", borderRight: "1px solid #1a1a1a" }}>
                  <span style={{ fontSize: 10, fontWeight: 800, color: "#ef4444", textTransform: "uppercase", letterSpacing: "0.08em" }}>Before RECEKON</span>
                </div>
                <div style={{ padding: "12px 20px" }}>
                  <span style={{ fontSize: 10, fontWeight: 800, color: "#22c55e", textTransform: "uppercase", letterSpacing: "0.08em" }}>After RECEKON</span>
                </div>
              </div>
              {BEFORE_AFTER.map(([before, after], i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: i < BEFORE_AFTER.length - 1 ? "1px solid #1a1a1a" : "none" }} className="ba-row">
                  <div style={{ padding: "14px 20px", borderRight: "1px solid #1a1a1a", display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#ef4444", flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>{before}</span>
                  </div>
                  <div style={{ padding: "14px 20px", display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: "#4ade80", lineHeight: 1.5 }}>{after}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <style>{`.effect-split{grid-template-columns:1fr 1fr} @media(max-width:768px){.effect-split{grid-template-columns:1fr!important}} .ba-row{grid-template-columns:1fr 1fr} @media(max-width:480px){.ba-row{grid-template-columns:1fr!important}} .ba-header{grid-template-columns:1fr 1fr} @media(max-width:480px){.ba-header{grid-template-columns:1fr!important}}`}</style>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#fff", padding: "clamp(56px,8vw,100px) clamp(16px,3.5vw,40px)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 20 }}>Join them</p>
          <h2 style={{ fontSize: "clamp(28px,4vw,50px)", fontWeight: 800, letterSpacing: "-0.035em", color: "#0a0a0a", lineHeight: 1.05, marginBottom: 20 }}>
            The next wave of<br/>transformation is opening.
          </h2>
          <p style={{ fontSize: 17, color: "#6b7280", lineHeight: 1.75, maxWidth: 520, margin: "0 auto 40px" }}>
            If you're tired of financial software that monitors but doesn't act — dashboards that inform but don't solve — tools that add to your workload instead of eliminating it — RECEKON was built for you.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => openContact("I'd like early access to RECEKON.")}
              style={{ background: "#0a0a0a", color: "#fff", border: "none", borderRadius: 10, padding: "15px 32px", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
              Get Early Access →
            </button>
            <button onClick={() => navigate("/use-cases")}
              style={{ background: "#fff", color: "#0a0a0a", border: "1px solid #e5e5e5", borderRadius: 10, padding: "15px 28px", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
              See use cases
            </button>
          </div>
          <p style={{ fontSize: 13, color: "#9ca3af", marginTop: 20 }}>Real people. Real savings. Real automation.</p>
        </div>
      </section>
    </Page>
  );
}
