import { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";

export default function App() {
  const chartRef = useRef(null);

  const [trades, setTrades] = useState([
    { asset: "AAPL", type: "Long", pnl: 120 },
    { asset: "TSLA", type: "Short", pnl: -40 },
    { asset: "BTC", type: "Long", pnl: 280 },
  ]);

  useEffect(() => {
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
  }, []);

  const wins = trades.filter(t => t.pnl > 0).length;
  const winRate = Math.round((wins / trades.length) * 100);
  const totalPnL = trades.reduce((sum, t) => sum + t.pnl, 0);

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>Trading Dashboard</h1>

      {/* Stats */}
      <div style={{ display: "flex", gap: 20, marginBottom: 30 }}>
        <Stat label="Total Trades" value={trades.length} />
        <Stat label="Win Rate" value={`${winRate}%`} />
        <Stat label="Total P&L" value={`$${totalPnL}`} positive />
      </div>

      {/* Chart */}
      <h2>Market Chart</h2>
      <div
        ref={chartRef}
        style={{ width: "100%", border: "1px solid #ddd", marginBottom: 40 }}
      />

      {/* Trades Table */}
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
