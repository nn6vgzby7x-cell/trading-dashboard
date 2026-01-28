import { useState } from "react";

export default function App() {
  const [trades, setTrades] = useState([
    { symbol: "AAPL", pnl: 120 },
    { symbol: "TSLA", pnl: -80 },
    { symbol: "BTC", pnl: 320 },
  ]);

  const [symbol, setSymbol] = useState("");
  const [pnl, setPnl] = useState("");

  const totalTrades = trades.length;
  const wins = trades.filter(t => t.pnl > 0).length;
  const winRate = totalTrades ? Math.round((wins / totalTrades) * 100) + "%" : "0%";
  const totalPnL = trades.reduce((sum, t) => sum + t.pnl, 0);

  const addTrade = (e) => {
    e.preventDefault();
    if (!symbol || pnl === "") return;

    setTrades([...trades, { symbol: symbol.toUpperCase(), pnl: Number(pnl) }]);
    setSymbol("");
    setPnl("");
  };

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>Trading Dashboard</h1>

      {/* Stats */}
      <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
        {[
          { label: "Total Trades", value: totalTrades },
          { label: "Win Rate", value: winRate },
          { label: "Total P&L", value: `$${totalPnL}` },
        ].map((s, i) => (
          <div key={i} style={{ border: "1px solid #ccc", padding: 20, borderRadius: 8 }}>
            <h3>{s.label}</h3>
            <strong>{s.value}</strong>
          </div>
        ))}
      </div>

      {/* Add Trade Form */}
      <h2 style={{ marginTop: 30 }}>Add Trade</h2>
      <form onSubmit={addTrade} style={{ display: "flex", gap: 10 }}>
        <input
          placeholder="Symbol (e.g. AAPL)"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />
        <input
          placeholder="P&L (e.g. 120 or -80)"
          type="number"
          value={pnl}
          onChange={(e) => setPnl(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      {/* Trades Table */}
      <h2 style={{ marginTop: 30 }}>Trades</h2>
      <table width="100%">
        <thead>
          <tr>
            <th align="left">Symbol</th>
            <th align="left">P&L</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((t, i) => (
            <tr key={i}>
              <td>{t.symbol}</td>
              <td style={{ color: t.pnl >= 0 ? "green" : "red" }}>
                {t.pnl >= 0 ? "+" : "-"}${Math.abs(t.pnl)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
