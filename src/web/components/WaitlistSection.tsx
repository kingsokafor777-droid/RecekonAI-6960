import { useState } from "react";

export function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) { setError("Enter a valid email."); return; }
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) { setSubmitted(true); }
      else {
        const data = await res.json() as { error?: string };
        setError(data.error || "Something went wrong. Try again.");
      }
    } catch { setError("Network error. Try again."); }
    setLoading(false);
  };

  return (
    <section id="waitlist" style={{ padding: "0", background: "#ffffff" }}>
      {/* Dark CTA band */}
      <div style={{ background: "#0b1e4f", padding: "96px 32px" }}>
        <div style={{ maxWidth: 840, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 16px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 100, fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.7)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 28 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", animation: "pulse-dot 1.5s infinite" }} />
            Early Access — Limited Spots
          </div>

          <h2 style={{ fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.0, marginBottom: 20, color: "#ffffff" }}>
            Stop watching money<br />
            <span style={{ background: "linear-gradient(135deg, #00d9a5, #0ea5e9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>disappear.</span>
          </h2>

          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, maxWidth: 520, margin: "0 auto 48px" }}>
            Join the waitlist. Be first to gain complete visibility and control over every dollar — down to the SKU level. No credit card required.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} style={{ maxWidth: 480, margin: "0 auto", padding: "0 clamp(16px,3.5vw,40px)" }}>
              <div style={{ display: "flex", gap: 0, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12, overflow: "hidden", padding: "4px", marginBottom: 8 }} className="waitlist-row">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ flex: 1, background: "transparent", border: "none", outline: "none", padding: "12px 16px", fontSize: 16, color: "#ffffff", fontFamily: "inherit" }}
                />
                <button
                  type="submit"
                  disabled={loading}
                  style={{ background: "linear-gradient(135deg, #1a3cff, #0ea5e9)", color: "#fff", border: "none", borderRadius: 10, padding: "12px 28px", fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, whiteSpace: "nowrap", fontFamily: "inherit" }}
                >
                  {loading ? "..." : "Get Early Access →"}
                </button>
              </div>
              {error && <div style={{ color: "#f87171", fontSize: 13, marginBottom: 8 }}>{error}</div>}
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>No spam. No BS. Just early access when we launch.</div>
            </form>
          ) : (
            <div style={{ maxWidth: 440, margin: "0 auto", padding: "32px", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: 16, textAlign: "center" }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>✓</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#10b981", marginBottom: 8, letterSpacing: "-0.02em" }}>You're on the list.</div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>We'll reach out when early access opens. Smart move.</div>
            </div>
          )}

          {/* Trust items */}
          <div style={{ marginTop: 48, display: "flex", justifyContent: "center", gap: 40, flexWrap: "wrap" }}>
            {["No credit card required", "Zero data sold", "Cancel any time"].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>
                <span style={{ color: "#10b981" }}>✓</span> {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom avatars band */}
      <div style={{ background: "#f8f9fb", padding: "64px 32px", borderTop: "1px solid #e5e7eb" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <img src="/avatars-group.png" alt="Users" style={{ height: 80, width: "auto", filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.1))" }} />
            <div>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#0b1e4f", letterSpacing: "-0.03em" }}>2,400+</div>
              <div style={{ fontSize: 14, color: "#6b7280" }}>professionals on the waitlist</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
            {[
              { n: "97.4%", label: "Matching accuracy" },
              { n: "< 2s", label: "Average reconcile time" },
              { n: "$312", label: "Avg monthly savings found" },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 26, fontWeight: 900, color: "#0b1e4f", letterSpacing: "-0.04em" }}>{s.n}</div>
                <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2, fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 500px) {
          .waitlist-row { flex-direction: column !important; }
        }
      `}</style>
    </section>
  );
}
