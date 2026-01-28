export default function App() {
  const stats = [
    { label: "Total Trades", value: 3 },
    { label: "Win Rate", value: "67%" },
    { label: "Total P&L", value: "$360" },
  ];

  const trades = [
    { symbol: "AAPL", pnl: 120 },
    { symbol: "TSLA", pnl: -80 },
    { symbol: "BTC", pnl: 320 },
  ];

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>Trading Dashboard</h1>

      {/* Cards */}
      <div style={{ display: "flex", gap: 20, marginTop: 30 }}>
        {stats.map((stat, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              borderRadius: 8,
              padding: 20,
              minWidth: 150,
              textAlign: "center",
              background: "#f9f9f9",
            }}
          >
            <h3>{stat.label}</h3>
            <p style={{ fontSize: 24, fontWeight: "bold" }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Trades Table */}
      <h2 style={{ marginTop: 40 }}>Trades</h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: 10,
        }}
      >
        <thead>
          <tr>
            <th style={{ borderBottom: "2px solid #ccc", textAlign: "left" }}>
              Symbol
            </th>
            <th style={{ borderBottom: "2px solid #ccc", textAlign: "left" }}>
              P&L
            </th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade, index) => (
            <tr key={index}>
              <td style={{ padding: "8px 0" }}>{trade.symbol}</td>
              <td
                style={{
                  padding: "8px 0",
                  color: trade.pnl >= 0 ? "green" : "red",
                  fontWeight: "bold",
                }}
              >
                {trade.pnl >= 0 ? "+" : "-"}${Math.abs(trade.pnl)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
