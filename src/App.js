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
    <div style={{ padding: 40, maxWidth: 1100, margin: "0 auto" }}>
      
      {/* Header */}
      <header style={{ marginBottom: 30 }}>
        <h1 style={{ fontSize: 32 }}>Trading Dashboard</h1>
        <p style={{ color: "#94a3b8" }}>Status: Live</p>
      </header>

      {/* Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
        <Card title="Total Trades" value={totalTrades} />
        <Card title="Win Rate" value={`${winRate}%`} />
        <Card
          title="Total P&L"
          value={`$${totalPnL}`}
          highlight={totalPnL >= 0}
        />
      </div>

      {/* Table */}
      <section style={{ marginTop: 40 }}>
        <h2 style={{ marginBottom: 12 }}>Recent Trades</h2>

        <div style={{ background: "#020617", borderRadius: 10, overflow: "hidden" }}>
          <table width="100%">
            <thead style={{ background: "#020617" }}>
              <tr>
                <th>Symbol</th>
                <th>Type</th>
                <th>Result</th>
                <th>P&L</th>
              </tr>
            </thead>
            <tbody>
              {trades.map(trade => (
                <tr key={trade.id} style={{ borderTop: "1px solid #1e293b" }}>
                  <td>{trade.symbol}</td>
                  <td>{trade.type}</td>
                  <td>{trade.result}</td>
                  <td style={{ color: trade.pnl >= 0 ? "#22c55e" : "#ef4444" }}>
                    {trade.pnl >= 0 ? "+" : ""}{trade.pnl}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
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
