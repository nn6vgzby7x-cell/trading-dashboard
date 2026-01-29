import { useState } from "react";

export default function App() {
  const [trades, setTrades] = useState([
    { asset: "AAPL", type: "Long", pnl: 120 },
    { asset: "TSLA", type: "Short", pnl: -40 },
    { asset: "BTC", type: "Long", pnl: 280 },
  ]);

  const [asset, setAsset] = useState("");
  const [type, setType] = useState("Long");
  const [pnl, setPnl] = useState("");

  const addTrade = () => {
    if (!asset || !pnl) return;

    setTrades([
      ...trades,
      { asset, type, pnl: Number(pnl) },
    ]);

    setAsset("");
    setPnl("");
  };

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
        <Stat
          label="Total P&L"
          value={`$${totalPnL}`}
          positive={totalPnL > 0}
        />
      </div>

      {/* Add Trade */}
      <h2>Add Trade</h2>
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <input
          placeholder="Asset (e.g. AAPL)"
          value={asset}
          onChange={e => setAsset(e.target.value)}
        />
        <select value={type} onChange={e => setType(e.target.value)}>
          <option>Long</option>
          <option>Short</option>
        </select>
        <input
          placeholder="P&L"
          type="number"
          value={pnl}
          onChange={e => setPnl(e.target.value)}
        />
        <button onClick={addTrade}>Add</button>
      </div>

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
