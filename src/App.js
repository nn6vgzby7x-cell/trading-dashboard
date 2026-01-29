export default function App() {
  return (
    <div style={{ padding: 40, fontFamily: "Arial, sans-serif" }}>
      <h1>Trading Dashboard</h1>

      {/* Stats */}
      <div style={{ marginTop: 20 }}>
        <p><strong>Total Trades:</strong> 3</p>
        <p><strong>Win Rate:</strong> 67%</p>
        <p><strong>Total P&L:</strong> $360</p>
      </div>

      {/* Recent Trades Table */}
      <h2 style={{ marginTop: 40 }}>Recent Trades</h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: 10,
        }}
      >
        <thead>
          <tr>
            <th style={th}>Asset</th>
            <th style={th}>Position</th>
            <th style={th}>P&L</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={td}>AAPL</td>
            <td style={td}>Long</td>
            <td style={{ ...td, color: "green" }}>+120</td>
          </tr>
          <tr>
            <td style={td}>TSLA</td>
            <td style={td}>Short</td>
            <td style={{ ...td, color: "red" }}>-40</td>
          </tr>
          <tr>
            <td style={td}>BTC</td>
            <td style={td}>Long</td>
            <td style={{ ...td, color: "green" }}>+280</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

const th = {
  textAlign: "left",
  padding: "10px",
  borderBottom: "2px solid #ddd",
};

const td = {
  padding: "10px",
  borderBottom: "1px solid #eee",
};
