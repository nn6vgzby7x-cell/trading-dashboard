import { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";

export default function App() {
  // 🔐 Toggle this later with real Stripe auth
  const [isProUser, setIsProUser] = useState(false);

  const chartRef = useRef(null);

  const trades = [
    { asset: "AAPL", type: "Long", pnl: 120 },
    { asset: "TSLA", type: "Short", pnl: -40 },
    { asset: "BTC", type: "Long", pnl: 280 },
  ];

  const wins = trades.filter(t => t.pnl > 0).length;
  const winRate = Math.round((wins / trades.length) * 100);
  const totalPnL = trades.reduce((sum, t) => sum + t.pnl, 0);

  useEffect(() => {
    if (!isProUser) return;

    const chart = createChart(chartRef.current, {
      width: chartRef.current.clientWidth,
      height: 300,
      layout: {
        background: { color: "#ffffff" },
        textColor: "#333",
      },
      grid: {
        vertLines: { color: "#eee" },
        horzLines: { color: "#eee" },
      },
    });

    const candleSeries = chart.addCandlestickSeries();

    candleSeries.setData([
      { time: "2024-01-01", open: 100, high: 110, low: 95, close: 105 },
      { time: "2024-01-02", open: 105, high: 115, low: 100, close: 112 },
      { time: "2024-01-03", open: 112, high: 118, low: 108, close: 110 },
      { time: "2024-01-04", open: 110, high: 120, low: 109, close: 118 },
      { time: "2024-01-05", open: 118, high: 125, low: 115, close: 122 },
    ]);

    return () => chart.remove();
  }, [isProUser]);

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>Trading Dashboard</h1>

      {/* Stats */}
      <div style={{ display: "flex", gap: 20, marginBottom: 30 }}>
        <Stat label="Total Trades" value={trades.length} />
        <Stat label="Win Rate" value={`${winRate}%`} />
        <Stat label="Total P&L" value={`$${totalPnL}`} positive />
      </div>

      {/* PRO CONTENT */}
      {!isProUser ? (
        <div
          style={{
            padding: 30,
            background: "#f8f9fb",
            border: "1px solid #ddd",
            borderRadius: 8,
          }}
        >
          <h2>🔒 Pro Feature</h2>
          <p>Upgrade to Pro to unlock live charts and detailed trade data.</p>

          <a
            href="https://buy.stripe.com/4gM9AM0iy5Q91PldkE2Ji01"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button style={buttonStyle}>Upgrade to Pro</button>
          </a>

          {/* TEMP BUTTON FOR TESTING */}
          <div style={{ marginTop: 10 }}>
            <button
              onClick={() => setIsProUser(true)}
              style={{ fontSize: 12 }}
            >
              (Dev) Unlock Pro
            </button>
          </div>
        </div>
      ) : (
        <>
          <h2>Market Chart</h2>
          <div
            ref={chartRef}
            style={{ width: "100%", border: "1px solid #ddd", marginBottom: 40 }}
          />

          <table width="100%" border="1" cellPadding="8">
            <thead>
              <tr>
                <th>Asset</th>
                <th>Type</th>
                <th>P&L</th>
              </tr>
            </thead>
            <tbody>
              {trades.map((t, i) => (
                <tr key={i}>
                  <td>{t.asset}</td>
                  <td>{t.type}</td>
                  <td style={{ color: t.pnl >= 0 ? "green" : "red" }}>
                    {t.pnl}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

function Stat({ label, value, positive }) {
  return (
    <div style={{ padding: 20, background: "#f2f2f2", minWidth: 140 }}>
      <div>{label}</div>
      <strong style={{ color: positive ? "green" : "black" }}>
        {value}
      </strong>
    </div>
  );
}

const buttonStyle = {
  padding: "14px 24px",
  fontSize: 16,
  background: "#0070f3",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
};
