const items = [
  { text: "Zombie subscription killed — Netflix $15.99/mo", icon: "🔴" },
  { text: "Transaction matched — Target $54.32 · 4 SKUs reconciled", icon: "✓" },
  { text: "Tax report generated — $2,847 in deductions found", icon: "📊" },
  { text: "Merchant blocked — Gym membership cancelled instantly", icon: "⛔" },
  { text: "Zombie killed — Adobe $54.99/mo · unused 90 days", icon: "🔴" },
  { text: "Receipt matched — Amazon $89.99 · 3 SKUs reconciled", icon: "✓" },
  { text: "$312 saved this month vs last month", icon: "💚" },
  { text: "Price increase detected — Internet bill up 18%", icon: "⚠️" },
  { text: "Zombie killed — Hulu $17.99/mo", icon: "🔴" },
  { text: "SKU data extracted — Whole Foods $127.43 · 22 items", icon: "✓" },
];

export function TickerBar() {
  const doubled = [...items, ...items];
  return (
    <div className="ticker-strip">
      <div className="ticker-inner">
        {doubled.map((item, i) => (
          <span key={i} className="ticker-item">
            <span>{item.icon}</span>
            {item.text}
            <span className="ticker-dot" />
          </span>
        ))}
      </div>
    </div>
  );
}
