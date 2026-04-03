import { useState } from "react";
import { useLocation } from "wouter";
import { Page } from "../../components/Layout";

const STEPS = [
  {
    n: "01",
    title: "Get your API key",
    desc: "Create a RECEKON account and generate an API key from the dashboard. Keys are scoped — issue one per environment.",
    code: `# Set your key once
export RECEKON_API_KEY="rk_live_..."

# Or use a .env file
RECEKON_API_KEY=rk_live_...`,
    lang: "bash",
    callout: { icon: "💡", text: "Use test-mode keys (rk_test_...) during development. They hit real logic with sandboxed data — no actual financial accounts touched." },
  },
  {
    n: "02",
    title: "Install the SDK",
    desc: "One package. Full API coverage. Works in Node 18+, Bun, and edge runtimes.",
    code: `npm install @recekon/sdk

# or
yarn add @recekon/sdk

# or
pnpm add @recekon/sdk`,
    lang: "bash",
    callout: null,
  },
  {
    n: "03",
    title: "Initialize the client",
    desc: "Pass your API key at startup. The client handles retries, rate limiting, and token refresh automatically.",
    code: `import { Recekon } from '@recekon/sdk';

const recekon = new Recekon({
  apiKey: process.env.RECEKON_API_KEY,
  // Optional: choose data region
  region: 'us-east-1',
  // Optional: set timeout
  timeout: 30_000,
});`,
    lang: "typescript",
    callout: null,
  },
  {
    n: "04",
    title: "Register a webhook",
    desc: "Tell RECEKON where to send events. You choose which event types you care about.",
    code: `const webhook = await recekon.webhooks.register({
  url: 'https://your-api.com/hooks/recekon',
  events: [
    'transaction.matched',   // SKU-level reconciliation done
    'zombie.detected',       // Unused subscription found
    'receipt.parsed',        // Email receipt processed
    'tax.deduction_found',   // Deductible expense identified
  ],
  secret: process.env.WEBHOOK_SECRET,
});

console.log('Webhook active:', webhook.id);
// → wh_7f3a9b2c`,
    lang: "typescript",
    callout: { icon: "🔒", text: "The secret is used to sign every outgoing payload. Keep it in an environment variable — never hardcode it." },
  },
  {
    n: "05",
    title: "Handle the first event",
    desc: "Set up an endpoint in your backend to receive and verify payloads. Verification is one function call.",
    code: `// Express route
app.post('/hooks/recekon', express.raw({ type: '*/*' }), (req, res) => {

  // 1. Verify signature
  const sig = req.headers['x-recekon-signature'];
  if (!recekon.webhooks.verify(req.body, sig, process.env.WEBHOOK_SECRET)) {
    return res.status(401).send('Invalid signature');
  }

  // 2. Parse event
  const event = JSON.parse(req.body.toString());

  // 3. Handle by type
  switch (event.type) {
    case 'transaction.matched':
      // event.data.skus — full line-item breakdown
      await db.transactions.update(event.data);
      break;
    case 'zombie.detected':
      // event.data.savings_per_month
      await notifyUser(event.data.user_id, event.data);
      break;
  }

  res.status(200).send('ok');
});`,
    lang: "typescript",
    callout: null,
  },
  {
    n: "06",
    title: "Go live",
    desc: "Swap your test key for a live key. Everything else stays identical.",
    code: `# .env.production
RECEKON_API_KEY=rk_live_...

# That's it. Same SDK. Same endpoints.
# Live mode processes real financial data.`,
    lang: "bash",
    callout: { icon: "✅", text: "No migration steps. No endpoint changes. The SDK detects live vs test mode from the key prefix automatically." },
  },
];

const TIMES = [
  { step: "Account + key",     time: "< 2 min" },
  { step: "SDK install",       time: "< 30 sec" },
  { step: "Client init",       time: "< 1 min" },
  { step: "First webhook",     time: "< 5 min" },
  { step: "First event fired", time: "< 10 min" },
];

export default function QuickstartPage() {
  const [, navigate] = useLocation();
  const [activeStep, setActiveStep] = useState(0);
  const step = STEPS[activeStep];

  return (
    <Page>
      {/* Hero */}
      <section style={{ background: "#0a0a0a", padding: "clamp(56px,8vw,100px) clamp(16px,3.5vw,40px) clamp(40px,5vw,64px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
            <button onClick={() => navigate("/developers")}
              style={{ background: "none", border: "none", color: "rgba(255,255,255,0.35)", fontSize: 13, cursor: "pointer", fontFamily: "inherit", padding: 0 }}>
              ← Developers
            </button>
            <span style={{ color: "rgba(255,255,255,0.15)", fontSize: 13 }}>/</span>
            <span style={{ color: "#f5c518", fontSize: 13, fontWeight: 600 }}>Quickstart</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 48, alignItems: "start" }} className="dev-split">
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(245,197,24,0.1)", border: "1px solid rgba(245,197,24,0.25)", borderRadius: 100, padding: "5px 14px", marginBottom: 20 }}>
                <span style={{ fontSize: 12 }}>⚡</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#f5c518", letterSpacing: "0.08em", textTransform: "uppercase" }}>10-minute integration</span>
              </div>
              <h1 style={{ fontSize: "clamp(36px,4.5vw,58px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05, color: "#fff", marginBottom: 20 }}>
                Zero to live.<br/><span style={{ color: "#f5c518" }}>In 10 minutes.</span>
              </h1>
              <p style={{ fontSize: 17, color: "rgba(255,255,255,0.5)", lineHeight: 1.8, maxWidth: 480, marginBottom: 0 }}>
                Six steps. No infrastructure changes. No compliance forms. Connect RECEKON to your existing backend and get SKU-level financial intelligence in your product today.
              </p>
            </div>

            {/* Timeline card */}
            <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 16, padding: "24px 28px", minWidth: 220, flexShrink: 0 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 20 }}>Time to live</div>
              {TIMES.map((t, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: i < TIMES.length - 1 ? 14 : 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 22, height: 22, borderRadius: "50%", background: i < TIMES.length - 1 ? "#1a1a1a" : "rgba(245,197,24,0.15)", border: `1px solid ${i < TIMES.length - 1 ? "#2a2a2a" : "rgba(245,197,24,0.4)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontSize: 9, fontWeight: 800, color: i < TIMES.length - 1 ? "#555" : "#f5c518" }}>{i + 1}</span>
                    </div>
                    <span style={{ fontSize: 12, color: i === TIMES.length - 1 ? "#fff" : "rgba(255,255,255,0.4)", fontWeight: i === TIMES.length - 1 ? 700 : 400 }}>{t.step}</span>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: i === TIMES.length - 1 ? "#f5c518" : "rgba(255,255,255,0.3)", marginLeft: 16 }}>{t.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section style={{ background: "#fff", padding: "clamp(56px,8vw,96px) clamp(16px,3.5vw,40px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 40 }} className="dev-split">
            {/* Step nav */}
            <div>
              <div style={{ position: "sticky", top: 88 }}>
                {STEPS.map((s, i) => (
                  <button key={i} onClick={() => setActiveStep(i)}
                    style={{
                      display: "flex", alignItems: "center", gap: 12,
                      width: "100%", padding: "12px 14px", borderRadius: 10, cursor: "pointer",
                      background: i === activeStep ? "#0a0a0a" : "transparent",
                      border: `1px solid ${i === activeStep ? "#0a0a0a" : "#e5e5e5"}`,
                      textAlign: "left", fontFamily: "inherit", transition: "all 0.15s",
                      marginBottom: 6,
                    }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: i === activeStep ? "#f5c518" : "#9ca3af", minWidth: 24, fontFamily: "monospace" }}>{s.n}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: i === activeStep ? "#fff" : "#6b7280" }}>{s.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step content */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <span style={{ fontSize: 28, fontWeight: 900, color: "#f0f0f0", fontFamily: "monospace", letterSpacing: "-0.04em" }}>{step.n}</span>
                <h2 style={{ margin: 0, fontSize: "clamp(22px,2.5vw,32px)", fontWeight: 800, letterSpacing: "-0.02em", color: "#0a0a0a" }}>{step.title}</h2>
              </div>
              <p style={{ fontSize: 16, color: "#6b7280", lineHeight: 1.75, marginBottom: 28, maxWidth: 540 }}>{step.desc}</p>

              {/* Code block */}
              <div style={{ background: "#0a0a0a", borderRadius: 14, overflow: "hidden", marginBottom: step.callout ? 16 : 32 }}>
                <div style={{ background: "#080808", borderBottom: "1px solid #1a1a1a", padding: "11px 18px", display: "flex", alignItems: "center", gap: 8 }}>
                  {["#ff5f57","#ffbd2e","#28c840"].map((c,i) => <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c }}/>)}
                  <span style={{ marginLeft: 8, fontSize: 11, color: "#444", fontFamily: "monospace" }}>{step.lang}</span>
                </div>
                <pre style={{ margin: 0, padding: "20px 22px", fontFamily: "'JetBrains Mono','Fira Code',monospace", fontSize: 12.5, lineHeight: 1.9, color: "#9ca3af", overflowX: "auto" }}>
                  {step.code.split("\n").map((line, i) => {
                    const isCmt  = line.trim().startsWith("#") || line.trim().startsWith("//") || line.trim().startsWith("//");
                    const isKw   = /\b(import|const|let|await|return|switch|case|break|async)\b/.test(line);
                    const isStr  = line.includes('"') || line.includes("'");
                    const isGreen = line.includes("matched") || line.includes("detected") || line.includes("✅");
                    return (
                      <div key={i}>
                        <span style={{ color: isCmt ? "#555" : isGreen ? "#4ade80" : isKw ? "#569cd6" : isStr ? "#ce9178" : "#9ca3af" }}>{line}</span>
                      </div>
                    );
                  })}
                </pre>
              </div>

              {/* Callout */}
              {step.callout && (
                <div style={{ background: "#f9fafb", border: "1px solid #e5e5e5", borderRadius: 10, padding: "14px 18px", display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 32 }}>
                  <span style={{ fontSize: 16, flexShrink: 0 }}>{step.callout.icon}</span>
                  <p style={{ margin: 0, fontSize: 13, color: "#4b5563", lineHeight: 1.65 }}>{step.callout.text}</p>
                </div>
              )}

              {/* Nav */}
              <div style={{ display: "flex", gap: 12 }}>
                {activeStep > 0 && (
                  <button onClick={() => setActiveStep(activeStep - 1)}
                    style={{ background: "#f5f5f5", border: "1px solid #e5e5e5", borderRadius: 8, padding: "11px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", color: "#374151" }}>
                    ← {STEPS[activeStep - 1].title}
                  </button>
                )}
                {activeStep < STEPS.length - 1 ? (
                  <button onClick={() => setActiveStep(activeStep + 1)}
                    style={{ background: "#0a0a0a", border: "none", borderRadius: 8, padding: "11px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", color: "#fff" }}>
                    Next: {STEPS[activeStep + 1].title} →
                  </button>
                ) : (
                  <button onClick={() => navigate("/developers/documentation")}
                    style={{ background: "#0a0a0a", border: "none", borderRadius: 8, padding: "11px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", color: "#fff" }}>
                    Explore full API reference →
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section style={{ background: "#f9f9f9", padding: "clamp(56px,7vw,96px) clamp(16px,3.5vw,40px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 800, letterSpacing: "-0.025em", color: "#0a0a0a", marginBottom: 12 }}>
            What your users get on day one.
          </h2>
          <p style={{ fontSize: 16, color: "#6b7280", lineHeight: 1.75, maxWidth: 480, margin: "0 auto 48px" }}>
            One integration. Every financial intelligence layer unlocked.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="feat-grid">
            {[
              { icon: "🧵", title: "SKU-level receipts", body: "Every transaction broken down to the exact product, price, and category. Not just the merchant name." },
              { icon: "⛔", title: "Zombie killer", body: "Unused subscriptions surface automatically. One API call cancels them — no credentials needed." },
              { icon: "📊", title: "Tax-ready reports", body: "Deductions auto-categorized to CRA, IRS, HMRC standards. Audit trail attached." },
              { icon: "🛡️", title: "Price refunds", body: "If a price drops after purchase, RECEKON files the refund claim automatically." },
              { icon: "🔮", title: "Cash flow forecast", body: "90-day balance prediction built from transaction history and recurring patterns." },
              { icon: "🔒", title: "Zero config security", body: "Zero-knowledge vault. PII isolated. OAuth-only. Nothing sensitive touches your servers." },
            ].map((f, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid #e5e5e5", borderRadius: 14, padding: "24px 22px", textAlign: "left" }}>
                <div style={{ fontSize: 28, marginBottom: 14 }}>{f.icon}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#0a0a0a", marginBottom: 8 }}>{f.title}</div>
                <p style={{ margin: 0, fontSize: 13, color: "#6b7280", lineHeight: 1.65 }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Page>
  );
}
