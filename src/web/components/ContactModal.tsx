import { useState, useEffect } from "react";

/* ════════════════════════════════════════════════════
   RECEKON — Contact / Request a Demo Modal
   KnotAPI reference design:
   - Full-screen overlay
   - Left: dark panel "See RECEKON in action" + bullets + trusted by
   - Right: white panel "Request a demo" form
   - Bottom chat section for customer service queries
   ════════════════════════════════════════════════════ */

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
  defaultMessage?: string;
}

export function ContactModal({ open, onClose, defaultMessage = "" }: ContactModalProps) {
  const [form, setForm] = useState({
    firstName: "", lastName: "",
    email: "", company: "",
    agenda: defaultMessage,
    discovery: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [chatMsg, setChatMsg] = useState("");
  const [chatLog, setChatLog] = useState<{ role: "user" | "agent"; text: string }[]>([
    { role: "agent", text: "👋 Hi! I'm RECEKON's AI support agent. Ask me anything about how RECEKON works, pricing, or getting started." },
  ]);
  const [chatLoading, setChatLoading] = useState(false);

  // Prevent body scroll when open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Update agenda if defaultMessage changes
  useEffect(() => {
    if (defaultMessage) setForm(f => ({ ...f, agenda: defaultMessage }));
  }, [defaultMessage]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, ...form }),
      });
    } catch {}
    setLoading(false);
    setSubmitted(true);
  };

  const handleChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMsg.trim()) return;
    const userMsg = chatMsg.trim();
    setChatMsg("");
    setChatLog(l => [...l, { role: "user", text: userMsg }]);
    setChatLoading(true);

    // Smart pre-defined responses for common questions
    const responses: Record<string, string> = {
      "pricing": "RECEKON offers a Free tier, Pro at $9/mo, and Business at $29/mo. The Pro plan pays for itself the first zombie subscription you kill. Check our Pricing page for full details.",
      "how": "RECEKON connects to your bank (via Plaid) and email inbox, then automatically matches every transaction to its receipt — extracting SKU-level item data. No manual input needed.",
      "zombie": "Zombie Detector™ runs 24/7, monitoring all recurring charges. When a subscription goes unused for 60+ days, you get an alert and a one-tap Kill option.",
      "kill": "Kill Switch™ blocks the merchant directly on your RECEKON Virtual Card. The subscription can never charge you again — no login, no hold music, no cancellation flow.",
      "start": "Getting started takes about 2 minutes: connect your bank account via Plaid, connect your email, and RECEKON starts working immediately. Fill the form above to request a demo.",
      "secure": "RECEKON uses a zero-knowledge vault architecture — your identity and financial data live in separate systems. We use AES-256 encryption and are PCI-DSS compliant via Stripe.",
    };

    const lower = userMsg.toLowerCase();
    let reply = "Great question! Our team will follow up shortly. In the meantime, fill out the demo request form above and we'll show you RECEKON in action. 🚀";
    for (const [key, val] of Object.entries(responses)) {
      if (lower.includes(key)) { reply = val; break; }
    }

    setTimeout(() => {
      setChatLog(l => [...l, { role: "agent", text: reply }]);
      setChatLoading(false);
    }, 800);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "11px 14px",
    border: "1px solid #e5e5e5", borderRadius: 8,
    fontSize: 14, fontFamily: "inherit", color: "#0a0a0a",
    outline: "none", transition: "border-color 0.15s",
    background: "#fff",
  };

  const bullets = [
    "Stop zombie subscriptions bleeding your money",
    "Get SKU-level visibility into every purchase",
    "Auto-generate tax deductions globally",
    "Set up in under 2 minutes, no code needed",
  ];

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(0,0,0,0.6)",
      backdropFilter: "blur(4px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "20px",
      animation: "modalFadeIn 0.25s ease",
    }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        width: "100%", maxWidth: 960,
        maxHeight: "90vh",
        overflowY: "auto",
        borderRadius: 20,
        boxShadow: "0 40px 120px rgba(0,0,0,0.35)",
        display: "grid",
        gridTemplateColumns: "320px 1fr",
        animation: "modalSlideUp 0.3s ease",
      }} className="contact-modal-grid">

        {/* ── LEFT: Dark panel ── */}
        <div style={{
          background: "#0a0a0a",
          padding: "40px 32px",
          borderRadius: "20px 0 0 20px",
          display: "flex", flexDirection: "column",
          justifyContent: "space-between",
          minHeight: 500,
        }}>
          <div>
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 36 }}>
              <div style={{ width: 28, height: 28, background: "#fff", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M2 11L5 4L8.5 7.5L12 2" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <span style={{ fontSize: 17, fontWeight: 800, letterSpacing: "-0.03em", color: "#fff" }}>RECEKON</span>
            </div>

            <h2 className="contact-modal-header-text" style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.03em", color: "#fff", lineHeight: 1.2, marginBottom: 12 }}>
              See RECEKON in action
            </h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginBottom: 28 }}>
              Our team can help you find the right solution. Complete the form and we'll get in touch shortly.
            </p>

            <div className="contact-modal-bullets" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {bullets.map((b, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "flex-start", gap: 12,
                  padding: "10px 14px",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 10,
                }}>
                  <span style={{ color: "#22c55e", fontWeight: 800, fontSize: 12, marginTop: 1, flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.5 }}>{b}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 32 }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.25)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
              Trusted by leading financial brands
            </div>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              {["Plaid", "Stripe", "AWS", "OpenAI"].map((l, i) => (
                <span key={i} style={{ fontSize: 12, fontWeight: 800, color: "rgba(255,255,255,0.3)" }}>{l}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Form + Chat ── */}
        <div style={{
          background: "#fff",
          borderRadius: "0 20px 20px 0",
          overflowY: "auto",
          maxHeight: "90vh",
        }}>
          {/* Close button */}
          <div style={{ display: "flex", justifyContent: "flex-end", padding: "16px 20px 0" }}>
            <button onClick={onClose} style={{
              background: "#f5f5f5", border: "none", borderRadius: "50%",
              width: 32, height: 32, fontSize: 16, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#6b7280", fontFamily: "inherit",
            }}>✕</button>
          </div>

          {/* Form */}
          <div style={{ padding: "8px 40px 32px" }}>
            <h3 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.025em", marginBottom: 6 }}>Request a demo</h3>
            <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 28 }}>We'll reach out within one business day.</p>

            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: "#22c55e", marginBottom: 8 }}>Request sent!</div>
                <p style={{ fontSize: 14, color: "#6b7280" }}>We'll be in touch within 24 hours.</p>
                <button onClick={onClose} style={{ marginTop: 24, background: "#0a0a0a", color: "#fff", border: "none", borderRadius: 8, padding: "12px 28px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Close</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }} className="form-cols">
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>First Name</label>
                    <input style={inputStyle} placeholder="Enter your first name" value={form.firstName} onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))} required
                      onFocus={e => (e.target.style.borderColor = "#0a0a0a")} onBlur={e => (e.target.style.borderColor = "#e5e5e5")} />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Last Name</label>
                    <input style={inputStyle} placeholder="Enter your last name" value={form.lastName} onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))} required
                      onFocus={e => (e.target.style.borderColor = "#0a0a0a")} onBlur={e => (e.target.style.borderColor = "#e5e5e5")} />
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }} className="form-cols">
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Business Email</label>
                    <input style={inputStyle} type="email" placeholder="Enter your business email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required
                      onFocus={e => (e.target.style.borderColor = "#0a0a0a")} onBlur={e => (e.target.style.borderColor = "#e5e5e5")} />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Company</label>
                    <input style={inputStyle} placeholder="Enter your company" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                      onFocus={e => (e.target.style.borderColor = "#0a0a0a")} onBlur={e => (e.target.style.borderColor = "#e5e5e5")} />
                  </div>
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Agenda</label>
                  <textarea style={{ ...inputStyle, minHeight: 80, resize: "vertical" }} placeholder="What would you want to chat about?"
                    value={form.agenda} onChange={e => setForm(f => ({ ...f, agenda: e.target.value }))}
                    onFocus={e => (e.target.style.borderColor = "#0a0a0a")} onBlur={e => (e.target.style.borderColor = "#e5e5e5")} />
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Discovery</label>
                  <input style={inputStyle} placeholder="How did you hear about us?" value={form.discovery} onChange={e => setForm(f => ({ ...f, discovery: e.target.value }))}
                    onFocus={e => (e.target.style.borderColor = "#0a0a0a")} onBlur={e => (e.target.style.borderColor = "#e5e5e5")} />
                </div>
                <button type="submit" disabled={loading} style={{
                  width: "100%", background: "#0a0a0a", color: "#fff", border: "none",
                  borderRadius: 10, padding: "14px", fontSize: 15, fontWeight: 700,
                  cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit",
                  opacity: loading ? 0.7 : 1, transition: "all 0.2s",
                }}
                  onMouseEnter={e => { if (!loading) e.currentTarget.style.background = "#1a1a1a"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#0a0a0a"; }}>
                  {loading ? "Submitting…" : "Submit →"}
                </button>
              </form>
            )}
          </div>

          {/* ── Chat section ── */}
          <div style={{ borderTop: "1px solid #e5e5e5", padding: "24px 40px 32px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", overflow: "hidden", background: "#f5f5f5" }}>
                <img src="/ai-agent-cs.png" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700 }}>RECEKON AI Support</div>
                <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#22c55e" }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
                  Online · Typically replies instantly
                </div>
              </div>
            </div>

            {/* Chat log */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 14, maxHeight: 200, overflowY: "auto" }}>
              {chatLog.map((msg, i) => (
                <div key={i} style={{
                  display: "flex",
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                }}>
                  <div style={{
                    maxWidth: "80%", padding: "9px 14px",
                    background: msg.role === "user" ? "#0a0a0a" : "#f5f5f5",
                    color: msg.role === "user" ? "#fff" : "#0a0a0a",
                    borderRadius: msg.role === "user" ? "14px 14px 2px 14px" : "14px 14px 14px 2px",
                    fontSize: 13, lineHeight: 1.6,
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {chatLoading && (
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                  <div style={{ padding: "9px 14px", background: "#f5f5f5", borderRadius: "14px 14px 14px 2px", fontSize: 13, color: "#9ca3af" }}>
                    <span style={{ display: "inline-block", animation: "chatDots 1.2s infinite" }}>●●●</span>
                  </div>
                </div>
              )}
            </div>

            {/* Chat input */}
            <form onSubmit={handleChat} style={{ display: "flex", gap: 8 }}>
              <input
                style={{ ...inputStyle, flex: 1, fontSize: 13 }}
                placeholder="Ask about pricing, features, how it works…"
                value={chatMsg}
                onChange={e => setChatMsg(e.target.value)}
                onFocus={e => (e.target.style.borderColor = "#0a0a0a")}
                onBlur={e => (e.target.style.borderColor = "#e5e5e5")}
              />
              <button type="submit" style={{
                background: "#0a0a0a", color: "#fff", border: "none",
                borderRadius: 8, padding: "0 16px", fontSize: 16,
                cursor: "pointer", fontFamily: "inherit", flexShrink: 0,
              }}>›</button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modalFadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes modalSlideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes chatDots     { 0%,100%{opacity:0.3} 50%{opacity:1} }
        .contact-modal-grid { grid-template-columns: 320px 1fr; }
        .form-cols { grid-template-columns: 1fr 1fr; }
        @media(max-width:700px) {
          .contact-modal-grid { grid-template-columns: 1fr !important; }
          .contact-modal-grid > div:first-child {
            border-radius: 20px 20px 0 0 !important;
            min-height: auto !important;
            padding: 24px 20px !important;
          }
          .contact-modal-grid > div:last-child  { border-radius: 0 0 20px 20px !important; }
          .form-cols { grid-template-columns: 1fr !important; }
          /* Hide bullet list on mobile to save space */
          .contact-modal-bullets { display: none !important; }
          /* Compact header on mobile */
          .contact-modal-header-text { margin-bottom: 8px !important; }
        }
      `}</style>
    </div>
  );
}
