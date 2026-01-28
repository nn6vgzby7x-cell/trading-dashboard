import { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";

export default function App() {
  const chartRef = useRef(null);

  const [trades, setTrades] = useState([
    { id: 1, symbol: "AAPL", pnl: 120 },
    { id: 2, symbol: "TSLA", pnl: -60 },
    { id: 3, symbol: "BTC", pnl: 300 },
  ]);

  const [symbol, setSymbol] = useState("");
  const [pnl, setPnl] = useState("");

  const totalTrades = trades.length;
  const wins = trades.filter(t => t.pnl > 0).length;
  const winRate = totalTrades ? Math.round((wins / totalTrades) * 100) : 0;
  const totalPnL = trades.reduce((sum, t) => sum + t.pnl, 0);

  // Chart
  useEffect(() => {
    if (!chartRef.current) return;

    chartRef.current.innerHTML = "";

    const chart = createChart(chartRef.current, {
      width: chartRef.current.clientWidth,
      height: 300,
      layout: {
        background: { color: "#020617" },
        textColor: "#e5e7eb",
      },
      grid: {
        vertLines: { color: "#1e293b" },
        horzLines: { color: "#1e293b" },
      },
    });

    const lineSeries = chart.addLineSeries({
      color: "#22c55e",
      lineWidth: 2,
    });

    let equity = 0;
    const data = trades.map((t, i) => {
      equity += t.pnl;
      return { time: i + 1, value: equity };
    });

    lineSeries.setData(data);

    return () => chart.remove();
  }, [trades]);

  function addTrade(e) {
    e.preventDefault();
    if (!symbol || !pnl) return;

    setTrades([
      ...trades,
      {
        id: Date.now(),
        symbol: symbol.toUpperCase(),
        pnl: Number(pnl),
      },
    ]);

    setSymbol("");
    setPnl("");
  }

  return (
    <div style={{ padding: 40, maxWidth: 1100, margin: "0 auto" }}>
      <h1>Trading Dashboard</h1>
      <p style={{ color: "#94a3b8" }}>Status: Live</p>

      {/* Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginTop: 20 }}>
        <Card title="Total Trades" value={totalTrades} />
        <Card title="Win Rate" value={`${winRate}%`} />
        <Card title="Total P&L" value={`$${totalPnL}`} highlight={totalPnL >= 0} />
      </div>

      {/* Add Trade Form */}
      <h2 style={{ marginTop: 40 }}>Add Trade</h2>
      <form onSubmit={addTrade} style={{ display: "flex", gap: 10, marginTop: 10 }}>
        <input
          placeholder="Symbol (e.g. AAPL)"
          value={symbol}
          onChange={e => setSymbol(e.target.value)}
        />
        <input
          placeholder="P&L (e.g. 150 or -50)"
          type="number"
          value={pnl}
          onChange={e => setPnl(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      {/* Chart */}
      <h2 style={{ marginTop: 40 }}>Equity Curve</h2>
      <div ref={chartRef} style={{ marginTop: 10 }} />

      {/* Trades Table */}
      <h2 style={{ marginTop: 40 }}>Recent Trades</h2>
      <div style={{ background: "#020617", borderRadius: 10 }}>
        <table width="100%" cellPadding="10">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>P&L</th>
            </tr>
          </thead>
          <tbody>
            {trades.map(t => (
              <tr key={t.id}>
                <td>{t.symbol}</td>
                <td style={{ color: t.pnl >= 0 ? "#22c55e" : "#ef4444" }}>
                  {t.pnl >= 0 ? "+" : ""}{t.pnl}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Card({ title, value, highlight }) {
  return (
    <div style={{
      background: "#020617",
      padding: 20,
      borderRadius: 12,
      boxShadow: "0 0 0 1px #1e293b"
    }}>
      <p style={{ color: "#94a3b8", fontSize: 13 }}>{title}</p>
      <p style={{
        fontSize: 28,
        marginTop: 8,
        color: highlight ? "#22c55e" : "white"
      }}>
        {value}
      </p>
    </div>
  );
}
