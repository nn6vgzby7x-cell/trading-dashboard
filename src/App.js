export default function App() {
  const trades = [
    { id: 1, symbol: "AAPL", type: "Buy", result: "Win", pnl: 120 },
    { id: 2, symbol: "TSLA", type: "Sell", result: "Loss", pnl: -60 },
    { id: 3, symbol: "BTC", type: "Buy", result: "Win", pnl: 300 },
  ];

  const totalTrades = trades.length;
  const wins = trades.filter(t => t.result === "Win").length;
  const winRate = Math.round((wins / totalTrades) * 100);
  const totalPnL = trades.reduce((sum, t) => sum + t.pnl, 0);

  return (
    <div style={{ padding: 30, fontFamily: "Arial", background: "#f4f6fa", minHeight: "100vh" }}>
      
      {/* Header */}
      <h1>Trading Dashboard</h1>
      <p>Status: <strong>Live</strong></p>

      {/* Summary Cards */}
      <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
        <Card title="Total Trades" value={totalTrades} />
        <Card title="Win Rate" value={`${winRate}%`} />
        <Card title="Total P&L" value={`$${totalPnL}`} />
      </div>

      {/* Trades Table */}
      <h2 style={{ marginTop: 40 }}>Recent Trades</h2>
      <table width="100%" cellPadding="10" style={{ background: "white", borderRadius: 8 }}>
        <thead>
          <tr style={{ textAlign: "left", background: "#eee" }}>
            <th>Symbol</th>
            <th>Type</th>
            <th>Result</th>
            <th>P&L</th>
          </tr>
        </thead>
        <tbody>
          {trades.map(trade => (
            <tr key={trade.id}>
              <td>{trade.symbol}</td>
              <td>{trade.type}</td>
              <td>{trade.result}</td>
              <td style={{ color: trade.pnl >= 0 ? "green" : "red" }}>
                {trade.pnl >= 0 ? "+" : ""}{trade.pnl}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

function Card({ title, value }) {
  return (
    <div style={{
      background: "white",
      padding: 20,
      borderRadius: 8,
      minWidth: 150,
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
    }}>
      <h3 style={{ margin: 0 }}>{title}</h3>
      <p style={{ fontSize: 24, marginTop: 10 }}>{value}</p>
    </div>
  );
}
