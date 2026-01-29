import { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";

export default function App() {
  const [isProUser, setIsProUser] = useState(false);
  const [asset, setAsset] = useState("AAPL");

  const chartRef = useRef(null);

  const tradeData = {
    AAPL: [
      { time: "2024-01-01", open: 100, high: 110, low: 95, close: 105 },
      { time: "2024-01-02", open: 105, high: 115, low: 100, close: 112 },
      { time: "2024-01-03", open: 112, high: 118, low: 108, close: 110 },
    ],
    TSLA: [
      { time: "2024-01-01", open: 220, high: 240, low: 210, close: 235 },
      { time: "2024-01-02", open: 235, high: 245, low: 225, close: 230 },
      { time: "2024-01-03", open: 230, high: 250, low: 228, close: 245 },
    ],
    BTC: [
      { time: "2024-01-01", open: 42000, high: 44000, low: 41000, close: 43500 },
      { time: "2024-01-02", open: 43500, high: 45000, low: 43000, close: 44500 },
      { time: "2024-01-03", open: 44500, high: 47000, low: 44000, close: 46500 },
    ],
  };

  const trades = [
    { asset: "AAPL", type: "Long", pnl: 120 },
    { asset: "TSLA", type: "Short", pnl: -40 },
    { asset: "BTC", type: "Long", pnl: 280 },
  ];

  const filteredTrades = trades.filter(t => t.asset === asset);

  useEffect(() => {
    if (!isProUser) return;

    const chart = createChart(chartRef.current, {
      width: chartRef.current.clientWidth,
      height: 300,
      layout: { background: { color: "#fff" }, textColor: "#333" },
      grid: { vertLines: { color: "#eee" }, horzLines: { color: "#eee" } },
    });

    const series = chart.addCandlestickSeries();
    series.setData(tradeData[asset]);

    return () => chart.remove();
  }, [asset, isProUser]);

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>Trading Dashboard</h1>

      {!isProUser ? (
        <div style={lockBox}>
          <h2>🔒 Pro Feature</h2>
          <p>Upgrade to unlock charts and asset switching.</p>

          <a
            href="https://buy.stripe.com/4gM9AM0iy5Q91PldkE2Ji01"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button style={button}>Upgrade to Pro</button>
          </a>

          <div style={{ marginTop: 10 }}>
            <button onClick={() => setIsProUser(true)} style={{ fontSize: 12 }}>
              (Dev) Unlock Pro
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Asset Selector */}
          <div style={{ marginBottom: 20 }}>
            <label>
              Asset:&nbsp;
              <select value={asset} onChange={e => setAsset(e.target.value)}>
                <option value="AAPL">AAPL</option>
                <option value="TSLA">TSLA</option>
                <option value="BTC">BTC</option>
              </select>
            </label>
          </div>

          {/* Chart */}
          <div
            ref={chartRef}
            style={{ border: "1px solid #ddd", marginBottom: 30 }}
          />

          {/* Trades */}
          <table width="100%" border="1" cellPadding="8">
            <thead>
              <tr>
                <th>Asset</th>
                <th>Type</th>
                <th>P&L</th>
              </tr>
            </thead>
            <tbody>
              {filteredTrades.map((t, i) => (
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

/* Styles */
const lockBox = {
  padding: 30,
  background: "#f8f9fb",
  border: "1px solid #ddd",
  borderRadius: 8,
};

const button = {
  padding: "14px 24px",
  fontSize: 16,
  background: "#0070f3",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
};
